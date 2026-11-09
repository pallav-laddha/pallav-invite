# Pallav & Aiswarya — Wedding Celebration Invitation

Interactive two-chapter wedding invitation celebrating **Pallav & Aiswarya** across **West Bengal (Howrah, Dec 4–5, 2026)** and **Rajasthan (Kota, Dec 11–12, 2026)**.

## Features
- **3D Heritage Khorkhori Window Opening**: Interactive 3D louvered green shutters that swing open and fly into the Heritage Rajbari courtyard.
- **Chapter I — West Bengal**: Shubh Bibaho countdown, Segmented Kolkata Rickshaw timeline, and Bengali Bridal stationery.
- **Interactive S-Curve Airplane Flight Transition**: Scroll-driven biplane journey from the Bengal pink lotus/onion finial to the royal parking crest in Kota, Rajasthan.
- **Ceremonial Scroll-Pin Lock & Reveal-Driven Audio Switch**: Pauses scroll on touchdown, unveils the 3D *Padharo Mhare Des* Hathi Pol archway after a 1-second dramatic hush, and crossfades from `kolkata-sitar-soft.mp3` into `rajasthan-dhol-soft.mp3` directly on the reveal.
- **Chapter II — Kota, Rajasthan**: Royal Marwari Wedding countdown, Kachhi Ghodi timeline, and RSVP modal.

---

## Local Development

```bash
npm install
npm run dev
```

---

## Deploying with Vercel CLI (Pre-Installed)

The `vercel` CLI is pre-configured in `package.json` alongside `vercel.json` and `.vercelignore`.

```bash
# 1. Authenticate with your Vercel account (one-time)
npm run vercel:login

# 2. Deploy a preview URL
npm run deploy:preview

# 3. Deploy to production
npm run deploy
```

---

## Pushing to GitHub & Connecting to Vercel

A local Git repository (`main` branch) and GitHub Actions workflow (`.github/workflows/deploy.yml`) are already initialized.

```bash
# 1. Add your GitHub repository remote
git remote add origin https://github.com/<your-username>/<your-repo>.git

# 2. Push the main branch to GitHub
git push -u origin main
```

Once pushed, import the repository at [vercel.com/new](https://vercel.com/new) for automatic production deployments on every push to `main`.
