# E2E Checklist — Marketing Single-Product Redesign

Branch: `feat/marketing-single-product`. Verified via Playwright MCP against
`next dev` (port 3939) on 2026-05-25. Unit contract in `tests/marketing.test.ts`
(vitest, 15/15). No committed `playwright.config` — these browser items are
verified manually (the commit hook runs vitest only).

## Routing
- [x] `/ko` returns 200 (home)
- [x] `/ko/how-it-works` returns 200 (new page)
- [x] `/ko/pricing` returns 200 (held placeholder)
- [x] `/ko/blog` returns 200 (restyled index)
- [x] `/ko/about` → 307 redirect to `/ko` (page retired)
- [x] `/ko/products/bsage` → 307 redirect to `/ko/how-it-works` (pages retired)

## Single-product framing
- [x] Hero headline is the wedge copy "확인된 일만, 올라옵니다." (old "만들고, 지키고, 기억한다" gone)
- [x] No 4-product card grid; no BSGateway/BSNexus/BSupervisor/BSage names in marketing chrome
- [x] Primary nav = 작동 방식 · 블로그 (no 제품 / 회사 / 가격 / 데모)
- [x] No testimonials / customer logos / interview section anywhere
- [x] How-it-works step 2 is non-contradictory (asks at forks, then resumes — no "멈추지 않고")

## Real app screenshots embedded (not re-mocked)
- [x] Home hero shows the real Delivery Report screen in a browser frame
- [x] Home "한눈에 보는 Brief" shows the real Brief screen
- [x] How-it-works shows real Delivery Report / Decide / Triggered screens (lazy-load on scroll)

## Auth is off-site (CTAs only)
- [x] 로그인 → app.bsvibe.dev/login
- [x] 시작하기 / 무료로 시작하기 → app.bsvibe.dev/signup
- [x] No login form rendered on the site

## Theme (light + dark)
- [x] Light Zenith is the default (warm near-white, Inter, hairline borders)
- [x] Theme toggle in nav switches to dark; persists via localStorage; no flash on reload
- [x] Dark mode legible across nav / cards / CTA band / footer (primary button inverts)

## i18n
- [x] `/ko` Korean copy; `/en` English copy (hero, cards, loop, footer)
- [x] KO/EN toggle preserves the current page

## Responsive
- [x] Desktop (1280) layout: 3-col why-different, 2-col footer grid
- [x] Mobile (390): hamburger menu, stacked cards, 2-col footer
- [x] No horizontal overflow

## Quality gates
- [x] `pnpm test` → 15/15 pass
- [x] `pnpm lint` → 0 errors
- [x] `pnpm build` → success (56/56 static pages)
- [x] 0 console errors in browser

## Known follow-ups (out of this design pass)
- [ ] Replace the low-res (≤512px) app screenshots in `public/images/screens/`
      with crisp 2× exports once the app UI is captured at higher resolution.
- [ ] Blog *post content* (MDX in `content/`) still references the retired
      4 products — a content rewrite task, separate from this chrome redesign.
- [ ] Hero headline copy is a tasteful default (proof angle); final slogan is
      still parked per the founder.
- [ ] `/contact`, `/privacy`, `/terms`, `/demo` got a legibility token-pass
      only (not a full Zenith redesign).
