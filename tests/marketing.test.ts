import { describe, it, expect } from 'vitest';
import * as M from '../src/content/marketing';

// Serialized view of every string in the content module — used to assert that
// retired 4-product-era vocabulary never appears in external marketing copy.
const allCopy = JSON.stringify(M);

describe('BSVibe is a single product (4-product era retired)', () => {
  it('never names the internal layers in marketing copy', () => {
    for (const banned of ['BSGateway', 'BSNexus', 'BSupervisor', 'BSage']) {
      expect(allCopy).not.toContain(banned);
    }
  });

  it('does not pitch the "AI agent OS / company / control plane" category', () => {
    for (const banned of ['agent OS', 'AI company', 'control plane']) {
      expect(allCopy.toLowerCase()).not.toContain(banned.toLowerCase());
    }
  });

  it('drops the old 4-product hero headline', () => {
    expect(M.hero.h1.ko).not.toContain('만들고, 지키고, 기억한다');
    expect(M.hero.h1.ko).toBe('확인된 일만, 올라옵니다.');
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
  it('login + signup point to app.bsvibe.dev', () => {
    expect(M.authLinks.login).toMatch(/^https:\/\/app\.bsvibe\.dev\//);
    expect(M.authLinks.signup).toMatch(/^https:\/\/app\.bsvibe\.dev\//);
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
