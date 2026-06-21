const SECRET_HEADER = "X-Proxy-Secret";
const TELEGRAM_HOSTNAME = "api.telegram.org";

export default {
  async fetch(request, env) {
    if (request.headers.get(SECRET_HEADER) !== env.SECRET) {
      return new Response("Forbidden", { status: 403 });
    }

    const url = new URL(request.url);
    url.hostname = TELEGRAM_HOSTNAME;

    const headers = new Headers(request.headers);
    headers.delete(SECRET_HEADER);

    return fetch(new Request(url.toString(), {
      method: request.method,
      headers,
      body: request.body,
      redirect: request.redirect,
    }));
  },
};
