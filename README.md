# Rishabh Kharbanda — Portfolio

Senior Marketing Analyst & Data Strategist portfolio built with React, Vite, and Tailwind CSS.

## Features

- Interactive Marketing Growth Simulator
- KPI Bento metrics dashboard
- Experience chronology timeline
- Skills arsenal & certifications
- Featured projects gallery
- Contact form with success screen
- Light / dark theme toggle
- Mobile-responsive navigation drawer

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build for production

```bash
npm run build
npm run preview
```

## GitHub Pages

The live site is at **https://rishabhkharbanda.github.io/Rishabh-Resume/**

After you push to `main`, GitHub Actions builds the app and commits the production files (`index.html`, `assets/`, `avatar.png`) to the repo root. GitHub Pages serves those directly from the `main` branch — no extra settings required.

For local development, use `dev.html` as the Vite entry (via `npm run dev`).

## Contact form (email delivery)

Submissions are sent to **rishabhkharbanda08@gmail.com** via a free Google Apps Script web app.

### One-time setup

1. Open [Google Apps Script](https://script.google.com) → **New project**
2. Paste the code from `scripts/contact-form-google-apps-script.gs` and save
3. **Deploy** → **New deployment** → type **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy the **Web app URL**
5. Either:
   - Set `VITE_CONTACT_FORM_URL` in `.env` locally, or
   - Add a GitHub repo secret `VITE_CONTACT_FORM_URL` with that URL (used during deploy)

After deploying the script, test the contact form on the live site — you should receive an email for every submission.
