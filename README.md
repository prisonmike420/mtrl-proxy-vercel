# mtrl-proxy

Cloudflare Worker, проксирующий запросы к `api.telegram.org`. Нужен для серверов, у которых нет прямого доступа к Telegram.

## Деплой воркера

```bash
npm install
wrangler secret put SECRET   # введи любую длинную случайную строку, например: openssl rand -hex 32
npm run deploy
```

После деплоя Cloudflare выдаст URL вида `https://mtrl-proxy.<subdomain>.workers.dev`.

## Настройка сервера (Timeweb)

**1. Добавь переменные в `.env`:**

```
TELEGRAM_API_PROXY_URL=https://mtrl-proxy.<subdomain>.workers.dev
TELEGRAM_API_PROXY_SECRET=<тот же секрет что вводил в wrangler secret put>
```

**2. В коде бота при каждом запросе к Telegram Bot API добавляй заголовок `X-Proxy-Secret`.**

Пример на Node.js (axios):

```js
const axios = require("axios");

const telegram = axios.create({
  baseURL: process.env.TELEGRAM_API_PROXY_URL,
  headers: {
    "X-Proxy-Secret": process.env.TELEGRAM_API_PROXY_SECRET,
  },
});

// вместо https://api.telegram.org/bot<TOKEN>/sendMessage
await telegram.post(`/bot${TOKEN}/sendMessage`, { chat_id, text });
```

Пример на Node.js (fetch):

```js
await fetch(`${process.env.TELEGRAM_API_PROXY_URL}/bot${TOKEN}/sendMessage`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Proxy-Secret": process.env.TELEGRAM_API_PROXY_SECRET,
  },
  body: JSON.stringify({ chat_id, text }),
});
```

Без заголовка `X-Proxy-Secret` воркер вернёт `403 Forbidden`.
