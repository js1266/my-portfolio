import "dotenv/config";
import { createApp } from "./app.js";

const port = Number(process.env.PORT || 5000);

if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.warn(
    "⚠  SMTP_USER / SMTP_PASS missing in .env — the contact form will respond with 503."
  );
}

createApp().listen(port, () => console.log(`Server running on http://localhost:${port}`));
