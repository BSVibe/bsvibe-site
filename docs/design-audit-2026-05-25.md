# Design Audit — BSVibe Marketing Site

Date: 2026-05-25 · Branch: `feat/marketing-single-product` · Reviewer: design-review rubric
applied against the live site (`next dev`, light+dark, desktop 1280 / mobile 390, ko+en).
Classifier: **MARKETING / LANDING PAGE** → Landing Page rules.

## Headline scores

- **Design Score: A−** — intentional, calm, Notion-level restraint; strong hierarchy.
- **AI Slop Score: A** (after fix) — the one slop pattern present was removed.

## Litmus checks (home)

| # | Check | Verdict |
|---|-------|---------|
| 1 | Brand/product unmistakable in first screen? | ✅ wordmark + wedge H1 |
| 2 | One strong visual anchor? | ✅ real Delivery Report screen |
| 3 | Scannable by headlines only? | ✅ (added "왜 다른가" heading) |
| 4 | Each section one job? | ✅ |
| 5 | Are cards actually necessary? | ✅ now only where they carry a real artifact |
| 6 | Motion improves hierarchy? | ◑ minimal fade-up only (intentional for calm) |
| 7 | Premium with shadows removed? | ✅ hairline-border depth, no heavy shadow |

Hard-rejection criteria: none triggered (first impression is hero + proof, not a card mosaic).

## Findings

### Fixed (commit 143e8a0)
- **F1 · AI-slop 3-column card grid** (high). "왜 다른가" was icon-tile + title + 2-line
  cards ×3 — the #1 AI-generated layout. → rebuilt as borderless editorial columns with
  hairline dividers; icons removed.
- **F2 · Missing section heading** (medium). The why-different trio had no heading, hurting
  the "scannable by headlines" litmus. → added "왜 다른가 / Why BSVibe".
- **F3 · Hero proof image towered** (polish). Portrait Delivery Report at 620px container
  rendered ~900px tall. → container 620→500 for a focused artifact.

### Verified good (no change)
- Typography: single family (Inter), systematic scale, tight tracking on headings, -0.04em H1.
- Color: status-only (green=verified, amber=needs-you); WCAG-safe text on warm near-white.
- Dark mode: token-driven, surfaces via elevation not pure inversion, primary button inverts.
- Spacing: 4/8 scale, ~96–104px section rhythm, hairline borders for depth.
- Responsive: hamburger + stacked cards + 2-col footer at 390; no horizontal scroll.
- Content: active voice, claim-free (no testimonials/logos — honest for a first product),
  specific CTAs ("무료로 시작하기"), `·` separators.

### Flagged (founder decision / out of scope)
- **Motion** — only fade-up. Landing rules suggest 2–3 intentional motions; deliberately kept
  minimal for Notion-calm. Leave as-is unless more life is wanted.
- **Screenshots** — intentionally low-res (≤512px) placeholders; hi-res 2× export pending.
- **Hero slogan** — proof-angle default; final slogan still parked.

## Per-category grades

| Category | Grade |
|----------|-------|
| Visual Hierarchy | A |
| Typography | A |
| Spacing & Layout | A |
| Color & Contrast | A− |
| Interaction States | B+ (theme toggle 34px < 44 touch target; nav hover present) |
| Responsive | A |
| Content Quality | A |
| AI Slop | A (was B before F1) |
| Motion | B (minimal by choice) |
| Performance feel | A (static, hairline depth, lazy images) |

## Quick wins (optional, <30 min each)
1. Bump nav theme-toggle hit area 34→40px+ (touch-target polish).
2. One scroll-reveal on the Brief/How-it-works screenshots for a touch of life.
3. Swap in hi-res screenshots when available (already tracked as a follow-up).
