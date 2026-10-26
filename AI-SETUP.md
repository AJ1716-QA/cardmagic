# CardMagic AI setup (free tier)

CardMagic's website is hosted on GitHub Pages. This separate Cloudflare Worker calls Workers AI so no secret API key is placed in the public website.

## 1. Create the Worker

1. Sign in at https://dash.cloudflare.com/
2. Open **Workers & Pages**.
3. Choose **Create** / **Create application**, then create a **Worker** (not a Pages site). Start with a simple/Hello World Worker.
4. Name it `cardmagic-ai` (or another name you prefer) and deploy it.
5. Open the Worker and choose **Edit code**.
6. Replace the starter code with the complete contents of `worker.js` from this repository, then **Deploy**.

## 2. Add the Workers AI binding

1. Open the Worker settings.
2. Find **Bindings** and choose **Add**.
3. Select **Workers AI**.
4. Set the variable/binding name to exactly `AI`, save, then redeploy if prompted.

Cloudflare's Workers AI free allowance is currently 10,000 Neurons per day shared across AI models. The allowance resets daily; requests can fail when it is exhausted. Check the current Cloudflare pricing page before relying on it: https://developers.cloudflare.com/workers-ai/platform/pricing/

## 3. Connect the website

1. Open the deployed Worker overview and copy its `workers.dev` URL, for example `https://cardmagic-ai.YOUR-SUBDOMAIN.workers.dev`.
2. Open https://aj1716-qa.github.io/cardmagic/
3. In **Make it yours**, expand **Connect AI service (one-time setup)**.
4. Paste the Worker URL and press **Save**.
5. Describe a card and press **Generate My Card**.

The website remembers the URL on that device/browser only. Repeat the connection step on another device.

## Security and limits

- The Worker only accepts browser requests from the CardMagic GitHub Pages origin and limits each IP to four generation requests per minute in each active Worker instance. This is a basic safeguard, not a full authentication system.
- Do not publish API tokens or secrets in the GitHub repository.
- The Cloudflare free allowance is limited; it is not unlimited and may change.
