# mtrl-proxy-vercel

Vercel Edge Functions, проксирующие запросы к Telegram Bot API и пробрасывающие входящие webhook-обновления на сервер mtrl.io.

Нужен потому что сервер на Timeweb (Россия) не имеет прямого доступа к `api.telegram.org`, а Telegram не может достучаться до mtrl.io напрямую.

## Архитектура

```text
Исходящие (бот → Telegram):
  mtrl.io → https://mtrl-proxy-vercel.vercel.app/bot<token>/method → api.telegram.org

Входящие (Telegram → бот):
  Telegram → https://mtrl-proxy-vercel.vercel.app/webhook → https://mtrl.io/api/tg-auth
```

## Эндпоинты

| Путь       | Файл              | Назначение                                                    |
|------------|-------------------|---------------------------------------------------------------|
| `/webhook` | `api/webhook.js`  | Принимает обновления от Telegram, пробрасывает на `MTRL_WEBHOOK_URL` |
| `/*`       | `api/proxy.js`    | Все остальные запросы пробрасывает на `api.telegram.org`      |

## Переменные окружения

| Переменная        | Где задаётся     | Описание                                                              |
|-------------------|------------------|-----------------------------------------------------------------------|
| `MTRL_WEBHOOK_URL` | Vercel dashboard | URL куда relay пробрасывает webhook. Значение: `https://mtrl.io/api/tg-auth` |

## Деплой

```bash
npm install
vercel deploy --prod
```

## Настройка на сервере mtrl.io

**1. Добавь в `.env`:**

```env
TELEGRAM_API_PROXY_URL=https://mtrl-proxy-vercel.vercel.app
```

**2. Зарегистрируй webhook** (один раз, после деплоя или смены URL):

```bash
curl "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook" \
  -d "url=https://mtrl-proxy-vercel.vercel.app/webhook" \
  -d "secret_token=<TELEGRAM_WEBHOOK_SECRET>"
```

Ответ должен быть `{"ok":true,"result":true}`.

**3. Проверь регистрацию:**

```bash
curl "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getWebhookInfo"
```

Поле `url` должно быть `https://mtrl-proxy-vercel.vercel.app/webhook`.
