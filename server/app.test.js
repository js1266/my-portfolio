// @vitest-environment node
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createApp } from "./app.js";

const env = { SMTP_USER: "sender@example.com", SMTP_PASS: "secret", MAIL_TO: "me@example.com" };
const payload = {
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "+91 98765 43210",
  subject: "Hello",
  message: "I would like to talk about a project.",
};

let transporter;
const makeApp = (options = {}) => createApp({ env, transporter, ...options });

beforeEach(() => {
  transporter = { sendMail: vi.fn().mockResolvedValue({}) };
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("POST /api/contact", () => {
  it("emails the owner with Reply-To set to the visitor", async () => {
    const res = await request(makeApp()).post("/api/contact").send(payload);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
    expect(transporter.sendMail).toHaveBeenCalledTimes(1);
    const mail = transporter.sendMail.mock.calls[0][0];
    expect(mail.to).toBe("me@example.com");
    expect(mail.replyTo).toEqual({ name: "Jane Doe", address: "jane@example.com" });
    expect(mail.subject).toBe("[Portfolio] Hello — Jane Doe");
  });

  it("returns 422 with per-field errors and sends nothing when input is invalid", async () => {
    const res = await request(makeApp())
      .post("/api/contact")
      .send({ name: "J", email: "nope", message: "hi" });

    expect(res.status).toBe(422);
    expect(Object.keys(res.body.errors).sort()).toEqual(["email", "message", "name"]);
    expect(transporter.sendMail).not.toHaveBeenCalled();
  });

  it("silently accepts but ignores honeypot submissions", async () => {
    const res = await request(makeApp())
      .post("/api/contact")
      .send({ ...payload, website: "http://spam" });
    expect(res.status).toBe(200);
    expect(transporter.sendMail).not.toHaveBeenCalled();
  });

  it("strips newlines from the subject so headers cannot be injected", async () => {
    await request(makeApp())
      .post("/api/contact")
      .send({ ...payload, subject: "Hi\r\nBcc: evil@example.com" });
    const { subject } = transporter.sendMail.mock.calls[0][0];
    expect(subject).not.toMatch(/[\r\n]/);
  });

  it("escapes HTML in the message body", async () => {
    await request(makeApp())
      .post("/api/contact")
      .send({ ...payload, message: "<script>alert(1)</script> hello there" });
    const { html } = transporter.sendMail.mock.calls[0][0];
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("returns 503 when SMTP credentials are not configured", async () => {
    const res = await request(makeApp({ env: {} }))
      .post("/api/contact")
      .send(payload);
    expect(res.status).toBe(503);
    expect(transporter.sendMail).not.toHaveBeenCalled();
  });

  it("returns 500 when the mail provider fails", async () => {
    transporter.sendMail.mockRejectedValue(new Error("SMTP down"));
    const res = await request(makeApp()).post("/api/contact").send(payload);
    expect(res.status).toBe(500);
    expect(res.body.error).toMatch(/try again/i);
  });

  it("returns 400 for malformed JSON", async () => {
    const res = await request(makeApp())
      .post("/api/contact")
      .set("Content-Type", "application/json")
      .send("{not json");
    expect(res.status).toBe(400);
  });

  it("rate-limits repeated submissions", async () => {
    const app = makeApp({ rateLimitMax: 2 });
    await request(app).post("/api/contact").send(payload);
    await request(app).post("/api/contact").send(payload);
    const res = await request(app).post("/api/contact").send(payload);
    expect(res.status).toBe(429);
  });

  it("sets security headers and hides the framework", async () => {
    const res = await request(makeApp()).post("/api/contact").send(payload);
    expect(res.headers["x-powered-by"]).toBeUndefined();
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
  });

  it("404s unknown API routes with JSON", async () => {
    const res = await request(makeApp()).get("/api/nothing");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});
