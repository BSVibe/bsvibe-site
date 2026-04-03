# bsvibe.dev

Official site for the BSVibe AI software ecosystem. Includes landing page, product documentation, and blog.

## Structure

```
src/
├── components/Landing.tsx    # Landing page (React island)
├── content/docs/             # Starlight docs (MDX)
│   ├── bsgateway/            # BSGateway user guide
│   ├── bsnexus/              # BSNexus user guide
│   ├── bsupervisor/          # BSupervisor user guide
│   ├── bsage/                # BSage user guide
│   └── en/                   # English translations
├── pages/
│   ├── index.astro           # Landing page
│   ├── privacy.astro         # Privacy policy
│   └── terms.astro           # Terms of service
└── styles/custom.css         # BSVibe dark theme overrides
```

## Tech Stack

- [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) for docs
- React 19 (interactive islands)
- Tailwind CSS 4
- i18n: Korean (default), English (`/en/` prefix)

## Development

```bash
npm install
npm run dev      # localhost:4321
npm run build    # dist/
```

## Deployment

Connected to Vercel — auto-deploys on push to `main`.

- **Production**: https://bsvibe.dev
- **Docs**: https://bsvibe.dev/bsgateway/getting-started

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
