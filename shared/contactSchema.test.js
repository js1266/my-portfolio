import { describe, expect, it } from "vitest";
import { LIMITS, validateContact, validateField } from "./contactSchema.js";

const valid = {
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "+91 98765 43210",
  subject: "Hello",
  message: "I would like to talk about a project.",
};

describe("validateContact", () => {
  it("accepts a complete, valid submission and returns cleaned values", () => {
    const result = validateContact({
      ...valid,
      name: "  Jane   Doe  ",
      email: " Jane@Example.COM ",
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
    expect(result.values).toMatchObject({
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+919876543210",
    });
  });

  it("only requires name, email and message", () => {
    const result = validateContact({ name: "Jo", email: "jo@x.io", message: "Ten chars!!" });
    expect(result.valid).toBe(true);
  });

  it("reports every missing required field at once", () => {
    const { valid: ok, errors } = validateContact({});
    expect(ok).toBe(false);
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name"]);
  });

  it("treats whitespace-only input as empty", () => {
    expect(validateContact({ ...valid, name: "   ", message: "\n\n  " }).errors).toHaveProperty(
      "name"
    );
    expect(validateContact({ ...valid, message: "\n\n  " }).errors).toHaveProperty("message");
  });

  it("does not throw on non-object or non-string input", () => {
    expect(validateContact(null).valid).toBe(false);
    expect(validateContact("nope").valid).toBe(false);
    expect(validateContact({ ...valid, name: 42, email: ["a@b.co"] }).valid).toBe(false);
  });

  it("strips line breaks from single-line fields (header-injection guard)", () => {
    const { values } = validateContact({ ...valid, subject: "Hi\r\nBcc: evil@example.com" });
    expect(values.subject).not.toMatch(/[\r\n]/);
  });

  it("keeps line breaks inside the message", () => {
    const { values } = validateContact({ ...valid, message: "Line one here\nLine two here" });
    expect(values.message).toBe("Line one here\nLine two here");
  });

  it("exposes the honeypot value", () => {
    expect(validateContact({ ...valid, website: "http://spam" }).values.website).toBe(
      "http://spam"
    );
  });
});

describe("validateField", () => {
  it.each([
    "plainaddress",
    "a@b",
    "a@b.",
    "@example.com",
    "a b@example.com",
    "a@@example.com",
    "a..b@example.com",
    "a@example.c",
  ])("rejects invalid email %s", (email) => expect(validateField("email", email)).not.toBe(""));

  it.each(["a@example.com", "first.last+tag@sub.example.co.in", "x_y@my-site.org"])(
    "accepts valid email %s",
    (email) => expect(validateField("email", email)).toBe("")
  );

  it("validates names", () => {
    expect(validateField("name", "J")).toMatch(/at least/);
    expect(validateField("name", "John123")).toMatch(/letters/);
    expect(validateField("name", "x".repeat(LIMITS.name.max + 1))).toMatch(/or fewer/);
    expect(validateField("name", "Zoë O'Brien-Smith Jr.")).toBe("");
    expect(validateField("name", "जगदीश साहू")).toBe("");
  });

  it("treats phone as optional but strict when present", () => {
    expect(validateField("phone", "")).toBe("");
    expect(validateField("phone", "(+91) 79782-83226")).toBe("");
    expect(validateField("phone", "12345")).toMatch(/digits/);
    expect(validateField("phone", "call me")).toMatch(/digits/);
    expect(validateField("phone", "1".repeat(16))).toMatch(/digits/);
  });

  it("enforces message length", () => {
    expect(validateField("message", "short")).toMatch(/at least/);
    expect(validateField("message", "x".repeat(LIMITS.message.max + 1))).toMatch(/or fewer/);
    expect(validateField("message", "x".repeat(LIMITS.message.min))).toBe("");
  });

  it("enforces subject length", () => {
    expect(validateField("subject", "x".repeat(LIMITS.subject.max + 1))).toMatch(/or fewer/);
  });

  it("ignores unknown fields", () => {
    expect(validateField("unknown", "anything")).toBe("");
  });
});
