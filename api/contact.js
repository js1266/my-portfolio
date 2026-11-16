// Vercel serverless entry (used only when the site is deployed on Vercel).
// Set SMTP_USER, SMTP_PASS and MAIL_TO in the Vercel project's environment variables.
import { createTransporter, handleContact } from "../server/contact.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }
  const { status, body } = await handleContact(req.body, {
    transporter: createTransporter(process.env),
    env: process.env,
  });
  return res.status(status).json(body);
}
