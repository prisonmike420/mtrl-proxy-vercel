export const config = { runtime: "edge" };

const SECRET_HEADER = "X-Proxy-Secret";
const TELEGRAM_BASE = "https://api.telegram.org";

export default function handler(request) {
  if (request.headers.get(SECRET_HEADER) !== process.env.SECRET) {
    return new Response("Forbidden", { status: 403 });
  }

  const url = new URL(request.url);
  const telegramUrl = new URL(url.pathname + url.search, TELEGRAM_BASE);

  const headers = new Headers(request.headers);
  headers.delete(SECRET_HEADER);

  return fetch(new Request(telegramUrl.toString(), {
    method: request.method,
    headers,
    body: request.body,
    redirect: request.redirect,
  }));
}
