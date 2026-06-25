export const config = { runtime: "edge" };

const TELEGRAM_BASE = "https://api.telegram.org";

const allowedTokens = new Set(
  [process.env.BOT_TOKEN, process.env.BOT_TOKEN_DEV].filter(Boolean)
);

export default function handler(request) {
  const url = new URL(request.url);

  const tokenMatch = url.pathname.match(/^\/bot([^/]+)\//);
  const token = tokenMatch?.[1];

  if (!token || !allowedTokens.has(token)) {
    return new Response("Forbidden", { status: 403 });
  }

  const telegramUrl = new URL(url.pathname + url.search, TELEGRAM_BASE);
  const headers = new Headers(request.headers);

  return fetch(new Request(telegramUrl.toString(), {
    method: request.method,
    headers,
    body: request.body,
    redirect: request.redirect,
  }));
}
