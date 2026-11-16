# Jagadeesh Sahu — Developer Portfolio

A fast, accessible, single-page portfolio built with **React 18**, **Vite** and **Tailwind CSS**.
It includes a downloadable resume and a contact form that delivers messages straight to my inbox.

<!-- Add a screenshot after you deploy:
![Portfolio preview](./docs/preview.png)
-->



**Live site:** `https://your-site-url.com` &nbsp;·&nbsp; **LinkedIn:** [jagadeesh-sahu](https://linkedin.com/in/jagadeesh-sahu) &nbsp;·&nbsp; **GitHub:** [js1266](https://github.com/js1266)

---

## Features

- **Sections:** Hero, About, Projects (filterable), Expertise, Skills, Experience & Education, Contact
- **Resume download** from the navbar, hero and experience section
- **Contact form** that emails me via Nodemailer, with Reply-To set to the visitor
- **Validation on both sides:** one shared rule set used by the browser (instant, per-field messages) and the server (the real check)
- **Spam and abuse protection:** rate limiting, honeypot field, HTML escaping, header-injection guard, `helmet` security headers
- **Lazy loading:** every section below the hero is code-split and loads only when it nears the viewport
- **Smooth transitions:** scroll-reveal, count-up stats, hover lift and glow, animated filters, skills marquee, back-to-top button (all disabled for users who prefer reduced motion)
- **Accessibility and SEO:** semantic landmarks, skip link, labelled form fields with `aria-invalid`, Open Graph and JSON-LD metadata
- **Responsive** from phones to large desktops

## Tech stack

| Area      | Tools                                                  |
| --------- | ------------------------------------------------------ |
| Frontend  | React 18, Vite, Tailwind CSS                           |
| Backend   | Node.js, Express, Nodemailer, helmet, express-rate-limit |
| Quality   | ESLint, Prettier, EditorConfig, PropTypes              |
| Testing   | Vitest, Testing Library, Supertest                     |
| CI        | GitHub Actions                                         |

## Project structure

```
├── api/                 # Vercel serverless version of the contact endpoint
├── public/              # Static files (resume.pdf lives here)
├── server/              # Express app and email handler
├── shared/              # Contact validation rules (used by client and server)
├── src/
│   ├── components/      # Page sections and UI pieces
│   ├── test/            # Test setup
│   ├── data.js          # All site content
│   ├── hooks.js         # Scroll-reveal, count-up, active-section hooks
│   └── main.jsx
├── .env.example
└── vite.config.js
```

## Getting started

**Requirements:** Node.js 20 or newer (see `.nvmrc`)

```bash
# 1. Clone and install
git clone https://github.com/js1266/<repo-name>.git
cd <repo-name>
npm install

# 2. Configure email (see below)
cp .env.example .env

# 3. Run the site and the email API together
npm start
```

Open **http://localhost:5173**. The email API runs on port 5000 and Vite proxies `/api` to it.

## Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable      | Description                                                    |
| ------------- | -------------------------------------------------------------- |
| `SMTP_HOST`   | SMTP server (default `smtp.gmail.com`)                         |
| `SMTP_PORT`   | SMTP port (default `465`)                                      |
| `SMTP_SECURE` | `true` for port 465, `false` for 587                           |
| `SMTP_USER`   | Sending account, e.g. your Gmail address                       |
| `SMTP_PASS`   | **App Password** (not your normal password)                    |
| `MAIL_TO`     | Where contact messages are delivered (defaults to `SMTP_USER`) |
| `PORT`        | API port (default `5000`)                                      |
| `CORS_ORIGIN` | Optional, comma-separated origins if the frontend is hosted separately |

**Gmail setup:** Google Account → Security → turn on 2-Step Verification → App passwords → create one and paste it into `SMTP_PASS`.

> Never commit your `.env` file. It is already listed in `.gitignore`.

If `SMTP_USER` or `SMTP_PASS` is missing, the form returns a clear "Messaging is temporarily unavailable" message and the server logs the reason.

## Customising the content

- **All text, projects, skills and experience:** edit [`src/data.js`](./src/data.js)
- **Resume:** replace `public/resume.pdf` (the download name is set in `data.js`)
- **Profile photo:** add `public/me.png`, then set `photo: "/me.png"` in `data.js`
- **Project images and links:** add `image` and `link` to a project in `data.js`
- **Colours and fonts:** `tailwind.config.js`
- **Page title and SEO tags:** `index.html`

## Scripts

| Command            | Description                                      |
| ------------------ | ------------------------------------------------ |
| `npm start`        | Frontend and email API together (development)    |
| `npm run dev`      | Frontend only                                    |
| `npm run server`   | Express server (serves `dist/` and the API)      |
| `npm run build`    | Production build into `dist/`                    |
| `npm run preview`  | Preview the production build locally             |
| `npm run lint`     | Run ESLint                                       |
| `npm run format`   | Format with Prettier                             |
| `npm test`         | Run the test suite                               |
| `npm run check`    | Lint, format check, tests and build (same as CI) |

## Testing

```bash
npm test
```

Covers the shared validation rules, the contact API (validation, honeypot, rate limit, mail failures,
security headers), the contact form behaviour and lazy section loading.

## Deployment

**Single server (Render, Railway, VPS):**

```bash
npm run build
npm run server
```

Set the variables from `.env.example` in the host's environment settings.

**Vercel:** the repo includes `api/contact.js`, a serverless version of the same handler. Add `SMTP_USER`,
`SMTP_PASS` and `MAIL_TO` under Project Settings → Environment Variables. Vercel functions don't include
rate limiting, so enable Vercel's firewall rules if you receive spam.

**Static host + separate API:** host `dist/` on Netlify or GitHub Pages and the `server/` folder elsewhere,
then set `CORS_ORIGIN` on the server and point the `fetch` URL in `src/components/Contact.jsx` at it.
(GitHub Pages cannot run the email API on its own.)

## Contributing

This is a personal portfolio, but suggestions and bug reports are welcome. Open an issue first, and run
`npm run check` before sending a pull request.

## License

Released under the [MIT License](./LICENSE). Add a `LICENSE` file, or change this line to match the
license you choose. Personal content (resume, name, project descriptions) remains © Jagadeesh Sahu.

## Contact

**Jagadeesh Sahu** — Senior Software Developer
📧 [jsahu1266@gmail.com](mailto:jsahu1266@gmail.com) · 📍 Odisha, India
