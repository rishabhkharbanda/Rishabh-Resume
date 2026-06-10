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

## Contact form & visit analytics

Both run through one free **Google Apps Script** backend (contact emails + unique visit tracking).

### One-time setup

1. Open [Google Apps Script](https://script.google.com) → **New project**
2. Paste the code from `scripts/portfolio-backend-google-apps-script.gs` and save
3. **Project settings** → **Script properties** → add:
   - `STATS_SECRET` = your private PIN (e.g. `rk2026`) — used to view stats
4. **Run** → select `authorizeSetup` → **Run** → **Allow** all permissions (spreadsheet + email)
5. **Deploy** → **New deployment** → **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy the **Web app URL** → GitHub secret `VITE_PORTFOLIO_API_URL` (or `.env` locally)
7. Push to `main` to rebuild the site

**If you see "Failed to fetch" or permission errors:** run `authorizeSetup` again in Apps Script, then **Deploy → Manage deployments → Edit → New version → Deploy**.

### What you get

| Feature | How it works |
|--------|----------------|
| **Contact emails** | Every form submission → `rishabhkharbanda08@gmail.com` |
| **Unique visitors** | Tracked in an auto-created Google Sheet |
| **New visitor email** | You get an email when someone visits for the first time |
| **Daily summary email** | Optional: add a time trigger for `sendDailyVisitDigest` in Apps Script |
| **Hidden stats panel** | Triple-click **RK.** in the header, or open `?rkstats` on the site URL, then enter your PIN |

Default PIN in the script is `rk2026` until you set `STATS_SECRET` in Script properties.

## Profile photo

Replace `public/avatar.png` with your professional headshot (square or portrait, min. 500×500px). It appears in the hero section and navigation drawer.

```bash
cp /path/to/your-photo.jpg public/avatar.png
git add public/avatar.png
git commit -m "Update profile photo"
git push origin main
```
