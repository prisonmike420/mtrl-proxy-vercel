export const config = { runtime: "edge" };

export default function handler(request) {
  const target = process.env.MTRL_WEBHOOK_URL;

  if (!target) {
    return new Response("MTRL_WEBHOOK_URL is not configured", { status: 500 });
  }

  return fetch(new Request(target, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: request.redirect,
  }));
}
