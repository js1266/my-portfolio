import nodemailer from "nodemailer";
import { validateContact } from "../shared/contactSchema.js";

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]
  );

export function createTransporter(env = process.env) {
  return nodemailer.createTransport({
    host: env.SMTP_HOST || "smtp.gmail.com",
    port: Number(env.SMTP_PORT || 465),
    secure: String(env.SMTP_SECURE ?? "true") === "true",
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  });
}

export function buildMail(values, env = process.env) {
  const { name, email, phone, subject, message } = values;
  return {
    from: `"Portfolio Contact" <${env.SMTP_USER}>`,
    to: env.MAIL_TO || env.SMTP_USER,
    replyTo: { name, address: email }, // pressing "Reply" answers the visitor directly
    subject: `[Portfolio] ${subject || "New message"} — ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\nSubject: ${subject || "-"}\n\n${message}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px">
        <h2 style="margin:0 0 12px">New portfolio message</h2>
        <p>
          <b>Name:</b> ${escapeHtml(name)}<br/>
          <b>Email:</b> ${escapeHtml(email)}<br/>
          <b>Phone:</b> ${escapeHtml(phone || "-")}<br/>
          <b>Subject:</b> ${escapeHtml(subject || "-")}
        </p>
        <p style="white-space:pre-wrap;border-left:4px solid #FBC548;padding-left:12px">${escapeHtml(message)}</p>
      </div>`,
  };
}

/**
 * Framework-agnostic handler used by both the Express server and the Vercel function.
 * @returns {Promise<{ status: number, body: object }>}
 */
export async function handleContact(body, { transporter, env = process.env }) {
  const { valid, errors, values } = validateContact(body);

  // Honeypot: real visitors never see this field. Pretend success so bots learn nothing.
  if (values.website) return { status: 200, body: { ok: true } };

  if (!valid) {
    return { status: 422, body: { error: "Please correct the highlighted fields.", errors } };
  }

  if (!env.SMTP_USER || !env.SMTP_PASS) {
    console.error("Contact form: SMTP_USER / SMTP_PASS are not configured.");
    return {
      status: 503,
      body: { error: "Messaging is temporarily unavailable. Please email me directly instead." },
    };
  }

  try {
    await transporter.sendMail(buildMail(values, env));
    return { status: 200, body: { ok: true } };
  } catch (error) {
    console.error("Contact form: mail error:", error.message);
    return {
      status: 500,
      body: { error: "Could not send your message right now. Please try again later." },
    };
  }
}
