# Instructions for Claude

This is a Cloudflare Worker that proxies requests to the Telegram Bot API. The server on Timeweb Cloud (Russia) has no direct access to `api.telegram.org`, so all requests go through this worker.

## Keeping this file up to date

Update this file whenever you learn something new about the project that isn't obvious from the code — constraints, decisions, gotchas, or context that would help future Claude instances work more effectively.

## After changing src/index.js

Run `npm run lint` and fix any errors before finishing.

## Docs — check only when in doubt or hitting errors

- [Cloudflare Workers Limits](https://developers.cloudflare.com/workers/platform/limits/) — free plan limits (currently: 50 external subrequests per invocation, 128 MB memory)
- [Cloudflare Workers Request API](https://developers.cloudflare.com/workers/runtime-apis/request/) — behavior of `Request`, `Headers`, `fetch()` in the CF runtime
- [Telegram Bot API](https://core.telegram.org/bots/api) — endpoints and request format

## Key facts

- The secret is stored in Cloudflare as an encrypted secret (`wrangler secret put SECRET`), not in code or `wrangler.toml`
- Local secrets for `wrangler dev` go in `.dev.vars` (listed in `.gitignore`)
- Wrangler only deploys what is imported from `main` — files like `CLAUDE.md` and `README.md` are not included in the worker bundle
