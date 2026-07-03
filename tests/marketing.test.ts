import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as M from '../src/content/marketing';

// Serialized view of every string in the content module — used to assert that
// retired 4-product-era vocabulary never appears in external marketing copy.
const allCopy = JSON.stringify(M);

// Static legal pages (KO + EN inline JSX) — the marketing.ts banned-name guard
// missed these once (terms §1 carried the 4-product enumeration through to
// prod), so scan their raw source verbatim from now on.
const ROOT = join(__dirname, '..');
const legalSources = ['app/[lang]/(marketing)/terms/page.tsx', 'app/[lang]/(marketing)/privacy/page.tsx']
  .map((p) => readFileSync(join(ROOT, p), 'utf8'))
  .join('\n');

describe('BSVibe is a single product (4-product era retired)', () => {
  it('never names the internal layers in marketing copy', () => {
    for (const banned of ['BSGateway', 'BSNexus', 'BSupervisor', 'BSage']) {
      expect(allCopy).not.toContain(banned);
    }
  });

  it('never names the internal layers in /terms or /privacy either', () => {
    for (const banned of ['BSGateway', 'BSNexus', 'BSupervisor', 'BSage']) {
      expect(legalSources).not.toContain(banned);
    }
  });

  // Legal pages must stay product-agnostic — the company will keep shipping
  // new products under the BSVibe umbrella, and we don't want to re-amend
  // terms every time. So no '단일 제품' / 'single product' wording, no
  // tech-stack enumeration ('LLM API') that ties us to today's shape.
  it('keeps legal copy product-agnostic — no single-product or stack-specific claims', () => {
    for (const banned of ['단일 제품', 'single product', 'single AI product', 'LLM API']) {
      expect(legalSources).not.toContain(banned);
    }
  });

  it('does not pitch the "AI agent OS / company / control plane" category', () => {
    for (const banned of ['agent OS', 'AI company', 'control plane']) {
      expect(allCopy.toLowerCase()).not.toContain(banned.toLowerCase());
    }
  });

  it('drops the old 4-product hero headline', () => {
    expect(M.hero.h1.ko).not.toContain('만들고, 지키고, 기억한다');
    // Hero KO: tight nominal contrast paralleling EN 'Proof, not promises.'
    // (was the longer verbal '믿으라 하지 않습니다. 보여줍니다.' — kept the
    //  semantic, dropped the implied subject + extra syllables).
    expect(M.hero.h1.ko).toBe('믿음이 아닌, 증명.');
  });
});

describe('primary nav', () => {
  const koLabels = M.navItems.map((n) => n.label.ko);
  it('contains 작동 방식 + 블로그', () => {
    expect(koLabels).toContain('작동 방식');
    expect(koLabels).toContain('블로그');
  });
  it('omits 제품 / 회사 / 가격 / 데모', () => {
    for (const gone of ['제품', '회사', '가격', '데모']) {
      expect(koLabels).not.toContain(gone);
    }
  });
  it('every nav href is a locale-less path', () => {
    for (const item of M.navItems) {
      expect(item.href.startsWith('/')).toBe(true);
      expect(item.href).not.toMatch(/^\/(ko|en)\//);
    }
  });
});

describe('auth is off-site (CTAs only)', () => {
  // Single CTA targeting /login — the product has no separate signup form,
  // so the site doesn't pretend one exists. Pre-Round 11 carried a /signup
  // link that 404'd in prod, which the PWA worked around with a redirect;
  // unifying the site CTA is the right primitive.
  it('start CTA points to https://app.bsvibe.dev/login', () => {
    expect(M.authLinks.start).toBe('https://app.bsvibe.dev/login');
  });
  it('no /signup link is shipped (would 404 + misleads about a non-existent form)', () => {
    expect(JSON.stringify(M.authLinks)).not.toContain('/signup');
  });
});

describe('wedge content', () => {
  it('has exactly the three "why different" props', () => {
    expect(M.whyDifferent).toHaveLength(3);
    expect(M.whyDifferent.every((p) => p.title.ko && p.title.en && p.body.ko && p.body.en)).toBe(true);
  });
  it('learning loop is a 3-step flow', () => {
    expect(M.learningLoop.steps).toHaveLength(3);
  });
});

describe('real app screenshots are embedded (not re-mocked)', () => {
  it('maps the 4 genuine app screens under /images/screens/', () => {
    const shots = Object.values(M.screenshots);
    expect(shots).toHaveLength(4);
    for (const s of shots) {
      expect(s.src).toMatch(/^\/images\/screens\/.+\.png$/);
      expect(s.alt.ko).toBeTruthy();
      expect(s.caption.ko).toContain('실제 BSVibe 화면');
    }
  });
});

describe('footer', () => {
  const titles = M.footerColumns.map((c) => c.title.ko);
  it('has no 회사/About column', () => {
    expect(titles).not.toContain('회사');
    expect(JSON.stringify(M.footerColumns)).not.toContain('About');
  });
  it('keeps 제품 / 리소스 / 법적 고지 columns', () => {
    expect(titles).toEqual(expect.arrayContaining(['제품', '리소스', '법적 고지']));
  });
  // Round 10 lockin — footer tagline is the hero slogan repeated as a brand
  // seal. Founder decision; any future edit must move them as a pair.
  it('tagline mirrors the hero slogan verbatim (KO + EN)', () => {
    expect(M.footerTagline.ko).toBe(M.hero.h1.ko);
    expect(M.footerTagline.en).toBe(M.hero.h1.en);
  });
});

describe('how-it-works page', () => {
  it('has a 4-step flow', () => {
    expect(M.howItWorks.steps).toHaveLength(4);
  });
  it("step 2 is non-contradictory — no 'never stops' claim, asks + resumes", () => {
    const step2 = M.howItWorks.steps[1].body.ko;
    expect(step2).not.toContain('멈추지 않고');
    expect(step2).toContain('이어서 진행');
  });
  it('under-the-hood copy is fully Korean (no English leak)', () => {
    for (const tile of M.howItWorks.underHood.tiles) {
      expect(tile.title.ko).toMatch(/[가-힣]/);
      expect(tile.body.ko).toMatch(/[가-힣]/);
    }
  });
});

// The 2026-07 app refresh sharpened the wedge (SoT §1): per-result proof is now
// an *honest, graded* verdict (Evidence grade A–D, independent acceptance gate,
// no faked pass), and Knowledge (the graph corrections accumulate into) + Skills
// (reusable capabilities) are first-class app surfaces. The marketing surface
// must carry these or it under-sells the current product.
describe('current-app positioning (2026-07 refresh)', () => {
  it('the honesty-graded proof claim leads the wedge, not a bare "verified"', () => {
    // Evidence grade A–D honesty ladder is the moat — copy must name the grade
    // and the no-faked-pass promise somewhere, not just say "검증됨".
    expect(allCopy).toContain('등급');
    expect(allCopy).toMatch(/꾸며내지|위조|정직/);
    expect(allCopy.toLowerCase()).toMatch(/grade|honest/);
  });

  it('surfaces the Knowledge graph as where corrections accumulate', () => {
    expect(allCopy).toContain('지식 그래프');
    expect(allCopy.toLowerCase()).toContain('knowledge graph');
  });

  it('surfaces Skills as a reusable-capability platform affordance', () => {
    expect(allCopy).toContain('스킬');
    expect(allCopy.toLowerCase()).toContain('skill');
    expect(M.platform.points.some((p) => p.title.ko.includes('스킬'))).toBe(true);
  });

  it('screenshot captions match the shipped surface name (Decisions, not legacy Decide-only)', () => {
    expect(M.screenshots.decide.caption.en).toContain('Decisions');
    expect(M.screenshots.decide.caption.ko).not.toContain('Decide');
  });
});
