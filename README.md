# CardMagic — Greeting Card Generator MVP

A mobile-first, installable static web app. No account, database, paid domain, or build step is required.

## Included
- Christmas and Thank You card templates
- Live text preview, sender name, accent color, style choice
- Optional photo upload (local browser only)
- Download card as PNG and native share where supported
- AI design-prompt assistant (creates a prompt to use in an AI art service)
- PWA manifest and service worker for install/offline app shell

## Important AI limitation
This MVP does **not** call an AI image-generation API. The AI assistant creates a detailed prompt locally, so it costs nothing and needs no API key. Live AI image generation should be added only after choosing a provider and confirming its current free tier, rate limits, and terms. Never place a private API key in browser code or a public GitHub repository.

## Deploy free with GitHub Pages
1. Create a new public GitHub repository named `cardmagic`.
2. Upload `index.html`, `manifest.json`, `sw.js`, and `icon.svg` to the repository root.
3. Open **Settings → Pages**.
4. Under Build and deployment, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
5. Wait for the Pages URL, normally `https://YOUR-USERNAME.github.io/cardmagic/`.
6. Open the HTTPS URL on your phone. Use the browser's **Add to Home Screen / Install app** option.

## Monetization (test before investing)
- Keep basic templates free.
- Offer paid premium template packs, branded business cards, and watermark-free/high-resolution exports.
- Add live AI generation as a limited-credit paid feature only after testing provider costs.
- Do not assume ads or paid upgrades will generate income until you validate demand with real users.

## Privacy
The app stores no card text or uploaded photos on a server. Photos are processed in the browser. Sharing/downloads are initiated by the user.
