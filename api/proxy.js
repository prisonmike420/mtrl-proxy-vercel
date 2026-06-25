export const config = { runtime: "edge" };

const TELEGRAM_BASE = "https://api.telegram.org";

export default function handler(request) {
  const url = new URL(request.url);
  const telegramUrl = new URL(url.pathname + url.search, TELEGRAM_BASE);

  const headers = new Headers(request.headers);

  return fetch(new Request(telegramUrl.toString(), {
    method: request.method,
    headers,
    body: request.body,
    redirect: request.redirect,
  }));
}
