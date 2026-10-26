const MODEL = "@cf/black-forest-labs/flux-1-schnell";
const ALLOWED_ORIGIN = "https://aj1716-qa.github.io";
const recentRequests = new Map();

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": origin || ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    }
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (origin !== ALLOWED_ORIGIN) return json({ error: "This service only accepts requests from the CardMagic website." }, 403, ALLOWED_ORIGIN);
    if (request.method === "OPTIONS") return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
        "Vary": "Origin"
      }
    });
    if (request.method !== "POST") return json({ error: "Use POST to generate an image." }, 405, origin);

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const now = Date.now();
    const times = (recentRequests.get(ip) || []).filter(t => now - t < 60_000);
    if (times.length >= 4) return json({ error: "Please wait a minute before generating more images." }, 429, origin);
    times.push(now);
    recentRequests.set(ip, times);
    if (recentRequests.size > 1000) recentRequests.clear();

    let body;
    try { body = await request.json(); }
    catch { return json({ error: "Please provide a valid JSON request." }, 400, origin); }
    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
    if (!prompt || prompt.length > 1200) return json({ error: "Please enter a description under 1,200 characters." }, 400, origin);

    try {
      const result = await env.AI.run(MODEL, { prompt, steps: 4 });
      if (!result || typeof result.image !== "string") throw new Error("The image model returned no image.");
      return json({ image: "data:image/jpeg;base64," + result.image }, 200, origin);
    } catch (error) {
      return json({ error: "Image generation is temporarily unavailable or the daily free allowance has been reached. Please try again later." }, 503, origin);
    }
  }
};
