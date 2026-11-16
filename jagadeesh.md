# Jagadeesh Sahu — Developer Portfolio

React 18 + Vite + Tailwind CSS single-page portfolio with a working contact form that emails you.

## Quick start

```bash
npm install
cp .env.example .env     # add your SMTP details (see "Contact form emails")
npm start                # site on http://localhost:5173, email API on :5000
```

## Scripts

| Command          | What it does                                      |
| ---------------- | ------------------------------------------------- |
| `npm start`      | Vite dev server + email API together              |
| `npm run build`  | Production build into `dist/`                     |
| `npm run server` | Express server: serves `dist/` and `/api/contact` |
| `npm run lint`   | ESLint (React, hooks and accessibility rules)     |
| `npm run format` | Prettier                                          |
| `npm test`       | Vitest + Testing Library + Supertest              |
| `npm run check`  | lint + format check + tests + build (same as CI)  |

## Editing content

Everything shown on the site comes from **`src/data.js`** (taken from your resume).
The resume download button serves **`public/resume.pdf`** — replace that file when your resume changes.

## Contact form emails

1. Gmail: enable 2-Step Verification, then create an **App Password** (Google Account → Security).
2. Fill `.env`: `SMTP_USER`, `SMTP_PASS` (the app password) and `MAIL_TO`.
3. Messages arrive with **Reply-To** set to the visitor, so you can just hit Reply.

If SMTP is not configured the form shows "Messaging is temporarily unavailable" (HTTP 503) and the
server logs why, instead of failing silently.

**Validation** lives in one file, `shared/contactSchema.js`, used by both the form (instant,
per-field messages) and the server (the real gate), so they can never disagree.
Extra protection: rate limit (5 per 15 min per IP), honeypot field, HTML escaping, newline stripping
in headers, `helmet` security headers.

## Deploying

- **Single server (Render, Railway, VPS):** `npm run build && npm run server` — set the `.env` values as
  environment variables.
- **Vercel:** the project includes `api/contact.js`, a serverless version of the same handler. Add
  `SMTP_USER`, `SMTP_PASS`, `MAIL_TO` in the Vercel project settings. (Vercel functions have no built-in
  rate limiting; add one such as Vercel's firewall rules if you get spam.)

## Standards used

- Code-split, on-demand loading: every below-the-fold section is `React.lazy` and mounts only when it nears
  the viewport (`LazySection`); React is its own vendor chunk.
- Accessibility: semantic landmarks, skip link, labelled form controls with `aria-invalid` /
  `aria-describedby`, focus moves to the first invalid field, `prefers-reduced-motion` respected.
- SEO: title, description, Open Graph, JSON-LD `Person` data.
- Quality gates: ESLint (incl. `jsx-a11y`, `react-hooks`), Prettier, EditorConfig, PropTypes, Vitest tests,
  GitHub Actions CI, error boundary.
