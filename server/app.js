import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createTransporter, handleContact } from "./contact.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(dirname, "..", "dist");

export function createApp({
  env = process.env,
  transporter = createTransporter(env),
  rateLimitMax = 5,
} = {}) {
  const app = express();

  app.disable("x-powered-by");
  app.set("trust proxy", 1);
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          "img-src": ["'self'", "data:", "https:"],
        },
      },
    })
  );
  app.use(express.json({ limit: "20kb" }));
  app.use(cors({ origin: env.CORS_ORIGIN ? env.CORS_ORIGIN.split(",") : false }));

  const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: rateLimitMax,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many messages. Please try again in a few minutes." },
  });

  app.post("/api/contact", contactLimiter, async (req, res) => {
    const { status, body } = await handleContact(req.body, { transporter, env });
    res.status(status).json(body);
  });

  app.use("/api", (_req, res) => res.status(404).json({ error: "Not found." }));

  // Serve the built React app (npm run build → npm run server)
  app.use(express.static(distDir));
  app.get("*", (_req, res, next) =>
    res.sendFile(path.join(distDir, "index.html"), (err) => err && next())
  );

  app.use((err, _req, res, _next) => {
    const status = err.type === "entity.parse.failed" ? 400 : err.status || 500;
    res
      .status(status)
      .json({ error: status === 400 ? "Invalid request." : "Something went wrong." });
  });

  return app;
}
