# bsvibe.dev

Official site for the BSVibe AI software ecosystem. Includes landing page, product documentation, and blog.

## Structure

```
src/
├── app/                      # Next.js App Router pages and API routes
├── components/               # Shared React UI
├── content/                  # Product docs and blog content
├── i18n/                     # Locale dictionaries and routing helpers
└── lib/                      # Auth, billing, content, and Supabase helpers
```

## Tech Stack

- [Next.js](https://nextjs.org) + [Nextra](https://nextra.site) for docs
- React 19 (interactive islands)
- Tailwind CSS 4
- i18n: Korean (default), English (`/en/` prefix)

## Development

```bash
pnpm install
pnpm run dev      # localhost:3000
pnpm run lint
pnpm run build    # .next/
```

## Deployment

Connected to Vercel — auto-deploys on push to `main`.

- **Production**: https://bsvibe.dev
- **Docs**: https://bsvibe.dev/ko/bsgateway/getting-started

## Routes

| Path | Content |
|------|---------|
| `/` | Landing page |
| `/bsgateway/...` | BSGateway docs (Korean) |
| `/bsnexus/...` | BSNexus docs |
| `/bsupervisor/...` | BSupervisor docs |
| `/bsage/...` | BSage docs |
| `/en/bsgateway/...` | English docs |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
