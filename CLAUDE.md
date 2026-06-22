# Instructions for Claude

This is a Vercel Edge Function that proxies requests to the Telegram Bot API. The server on Timeweb Cloud (Russia) has no direct access to `api.telegram.org`, so all requests go through this proxy.

## Keeping this file up to date

Update this file whenever you learn something new about the project that isn't obvious from the code — constraints, decisions, gotchas, or context that would help future Claude instances work more effectively.

## After changing api/[...path].js

Run `npm run lint` and fix any errors before finishing.

## Docs — check only when in doubt or hitting errors

- [Vercel Edge Functions](https://vercel.com/docs/functions/edge-functions) — runtime, limits, and Web API support
- [Vercel Edge Runtime](https://vercel.com/docs/functions/edge-functions/edge-runtime) — available globals (`fetch`, `Request`, `Headers`, etc.)
- [Telegram Bot API](https://core.telegram.org/bots/api) — endpoints and request format

## Key facts

- The secret is stored in Vercel as an environment variable (`SECRET`), set via the Vercel dashboard or `vercel env add SECRET`
- Local secrets for `vercel dev` go in `.env.local` (listed in `.gitignore`)
- The Edge Function lives in `api/[...path].js` — Vercel catch-all route that forwards any path to `api.telegram.org`
- Authentication uses the `X-Proxy-Secret` header checked against `process.env.SECRET`
- Edge Functions use Web standard APIs — `fetch()`, `Request`, `Headers` work natively, no Node.js polyfills needed
