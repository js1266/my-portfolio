import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Contact from "./Contact";

const jsonResponse = (status, body) => ({ ok: status < 400, status, json: async () => body });

async function fillValidForm(user) {
  await user.type(screen.getByLabelText(/your name/i), "  Jane Doe ");
  await user.type(screen.getByLabelText(/your email/i), "jane@example.com");
  await user.type(screen.getByLabelText(/your message/i), "I would like to talk about a project.");
}

let fetchMock;

beforeEach(() => {
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
});

describe("<Contact />", () => {
  it("shows an error for every required field and does not call the API when empty", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByText("Please enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Please enter your email address.")).toBeInTheDocument();
    expect(screen.getByText("Please write a message.")).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByLabelText(/your name/i)).toHaveFocus();
    expect(screen.getByLabelText(/your name/i)).toHaveAttribute("aria-invalid", "true");
  });

  it("validates a field on blur and clears the error as soon as it is fixed", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    const email = screen.getByLabelText(/your email/i);

    await user.type(email, "not-an-email");
    await user.tab();
    expect(screen.getByText(/valid email address/i)).toBeInTheDocument();

    await user.clear(email);
    await user.type(email, "jane@example.com");
    expect(screen.queryByText(/valid email address/i)).not.toBeInTheDocument();
    expect(email).toHaveAttribute("aria-invalid", "false");
  });

  it("rejects an invalid phone number but allows leaving it blank", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    const phone = screen.getByLabelText(/phone number/i);

    await user.type(phone, "abc");
    await user.tab();
    expect(screen.getByText(/phone can only contain digits/i)).toBeInTheDocument();

    await user.clear(phone);
    await user.tab();
    expect(screen.queryByText(/phone can only contain digits/i)).not.toBeInTheDocument();
  });

  it("sends cleaned values, shows success and resets the form", async () => {
    fetchMock.mockResolvedValue(jsonResponse(200, { ok: true }));
    const user = userEvent.setup();
    render(<Contact />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() =>
      expect(screen.getByText(/your message has been sent/i)).toBeInTheDocument()
    );
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/contact");
    expect(JSON.parse(options.body)).toMatchObject({ name: "Jane Doe", email: "jane@example.com" });
    expect(screen.getByLabelText(/your name/i)).toHaveValue("");
  });

  it("maps server-side field errors back onto the form", async () => {
    fetchMock.mockResolvedValue(
      jsonResponse(422, {
        error: "Please correct the highlighted fields.",
        errors: { email: "Server says no." },
      })
    );
    const user = userEvent.setup();
    render(<Contact />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText("Server says no.")).toBeInTheDocument();
    expect(screen.getByText("Please correct the highlighted fields.")).toBeInTheDocument();
  });

  it("shows the server's message when sending fails", async () => {
    fetchMock.mockResolvedValue(
      jsonResponse(503, { error: "Messaging is temporarily unavailable." })
    );
    const user = userEvent.setup();
    render(<Contact />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText("Messaging is temporarily unavailable.")).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toHaveValue("  Jane Doe "); // input is kept for a retry
  });

  it("shows a helpful message on network failure", async () => {
    fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));
    const user = userEvent.setup();
    render(<Contact />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/network error/i)).toBeInTheDocument();
  });

  it("disables the button while sending to prevent double submits", async () => {
    let resolve;
    fetchMock.mockReturnValue(new Promise((r) => (resolve = r)));
    const user = userEvent.setup();
    render(<Contact />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();
    resolve(jsonResponse(200, { ok: true }));
    await waitFor(() => expect(screen.getByText(/has been sent/i)).toBeInTheDocument());
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
