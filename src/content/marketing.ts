// Single source of truth for the BSVibe marketing surface.
//
// BSVibe is ONE product (the 4-product era — BSGateway/BSNexus/BSupervisor/
// BSage — is retired; those are now invisible internal layers). The external
// pitch leads with the wedge: *honestly* verified work (per-result proof with
// an Evidence grade A–D, never a faked pass) + agents that stop repeating
// mistakes (corrections accumulate in a browsable knowledge graph), for the
// solo founder running many products. Knowledge (the graph) and Skills
// (reusable capabilities) are first-class app surfaces, so the copy names
// them. The site is CTAs-only (no login on the site itself) — auth links
// point to app.bsvibe.dev.
//
// Copy voice: drop explicit subjects (we / you / 당신 / the brand name as a
// sentence subject). Korean elides subjects naturally; English uses subjectless
// phrasing. No em dashes.
//
// Copy/structure is data-driven so it stays testable (see tests/marketing.test.ts).

export type Locale = 'ko' | 'en';
type L<T = string> = Record<Locale, T>;

/** The product app lives on its own domain; the site only links to it. */
export const APP_URL = 'https://app.bsvibe.dev';

// Single auth entry. The product has no separate signup form — Supabase OAuth
// auto-provisions accounts on first sign-in, email/pw users authenticate at
// /login directly — so the marketing surface ships ONE CTA ("시작하기") that
// lands everyone on the same page. (Previous shape had two affordances
// 로그인 + 시작하기 hinting at separate flows, which never existed.)
export const authLinks = {
  start: `${APP_URL}/login`,
} as const;

export interface NavItem {
  label: L;
  /** Locale-less path; components prepend `/${locale}`. */
  href: string;
}

/** Primary nav — no 제품/회사/가격 (products & About retired, pricing held). */
export const navItems: NavItem[] = [
  { label: { ko: '작동 방식', en: 'How it works' }, href: '/how-it-works' },
  { label: { ko: '블로그', en: 'Blog' }, href: '/blog' },
];

export const buttons = {
  ctaPrimary: { ko: '무료로 시작하기', en: 'Get started free' },
  ctaSecondary: { ko: '작동 방식 보기', en: 'See how it works' },
  start: { ko: '시작하기', en: 'Start' },
} satisfies Record<string, L>;

export const hero = {
  badge: { ko: 'AI가 만들고, 검증까지', en: 'AI builds, and verifies' },
  h1: { ko: '믿음이 아닌, 증명.', en: 'Proof, not promises.' },
  subtitle: {
    ko: 'AI가 만들고 스스로 검증해 증거로 답합니다. 한 번 가르치면, 같은 실수는 두 번 없습니다.',
    en: 'AI builds it, verifies it, and answers with proof. One correction sticks, and the same mistake never returns.',
  },
  ctaCaption: {
    ko: '지금 바로 시작 · 1분이면 충분합니다',
    en: 'Start now · ready in a minute',
  },
} satisfies Record<string, L>;

export interface ValueProp {
  title: L;
  body: L;
}
export const whyDifferentHeading: L = { ko: '왜 다른가', en: 'Why BSVibe' };
export const whyDifferent: ValueProp[] = [
  {
    title: { ko: '정직하게 검증된 결과', en: 'Honestly verified work' },
    body: {
      ko: '결과마다 무엇을 어떻게 확인했는지 증거가 붙습니다. 통과를 꾸며내지 않고, 확신의 정도를 등급으로 밝힙니다.',
      en: 'Every result carries proof of what was checked and how. A pass is never faked, and how sure comes as a grade.',
    },
  },
  {
    title: { ko: '같은 실수는 한 번만', en: 'Never the same mistake twice' },
    body: {
      ko: '한 번의 교정이 쌓입니다. 다음부터는 알아서 피해 갑니다.',
      en: 'One correction sticks. The same mistake is avoided from then on.',
    },
  },
  {
    title: { ko: '혼자서, 여러 제품', en: 'One founder, many products' },
    body: {
      ko: '여러 작업을 한눈에. 평범한 말로 지금 무슨 일이 일어나는지 알려줍니다.',
      en: 'Many work streams at a glance, in plain language.',
    },
  },
];

export interface Screenshot {
  src: string;
  alt: L;
  caption: L;
}
/** Real BSVibe app screens, embedded as-is (not re-mocked). */
export const screenshots = {
  deliveryReport: {
    src: '/images/screens/delivery-report.png',
    alt: { ko: 'BSVibe Delivery Report 화면', en: 'BSVibe Delivery Report screen' },
    caption: {
      ko: '실제 BSVibe 화면 — Delivery Report (검증된 결과)',
      en: 'Actual BSVibe — Delivery Report (verified work)',
    },
  },
  brief: {
    src: '/images/screens/brief.png',
    alt: { ko: 'BSVibe Brief 현황 화면', en: 'BSVibe Brief overview screen' },
    caption: {
      ko: '실제 BSVibe 화면 — Brief (현황 한눈에)',
      en: 'Actual BSVibe — Brief (everything at a glance)',
    },
  },
  decide: {
    src: '/images/screens/decide.png',
    alt: { ko: 'BSVibe 결정(Decisions) 화면', en: 'BSVibe Decisions screen' },
    caption: { ko: '실제 BSVibe 화면 — 결정(Decisions)', en: 'Actual BSVibe — Decisions' },
  },
  triggered: {
    src: '/images/screens/triggered.png',
    alt: {
      ko: 'BSVibe 자동 트리거 & Safe Mode 화면',
      en: 'BSVibe trigger & Safe Mode screen',
    },
    caption: {
      ko: '실제 BSVibe 화면 — 자동 트리거 & Safe Mode',
      en: 'Actual BSVibe — Auto-trigger & Safe Mode',
    },
  },
} satisfies Record<string, Screenshot>;

export const briefSection = {
  heading: { ko: '한눈에, 전부 다', en: 'Everything, at a glance' },
  body: {
    ko: '운영 콘솔이 아니라, 사람이 말하듯 설명하는 현황판. 무엇이 진행 중이고 무엇이 기다리는지 5초면 압니다.',
    en: 'Not an ops console, but a status ledger in plain language. Five seconds shows what is running and what needs a decision.',
  },
} satisfies Record<string, L>;

// ─── Platform: web-based, connectors, model routing ──────────────────
export const platform = {
  heading: { ko: '어디서든, 무엇과도', en: 'Anywhere. With everything.' },
  body: {
    ko: '웹 기반이라 설치 없이 브라우저만 있으면 됩니다. 쓰던 도구를 연결하고, 모델은 작업에 맞게 알아서 고릅니다.',
    en: 'Web-based, so a browser is all it takes. Connect the tools already in use; models route themselves to each job.',
  },
  points: [
    {
      title: { ko: '웹 어디서든', en: 'Anywhere on the web' },
      body: {
        ko: '설치 없이 브라우저에서 바로. 데스크톱이든 모바일이든.',
        en: 'No install. Straight from the browser, on desktop or mobile.',
      },
    },
    {
      title: { ko: '다양한 커넥터', en: 'Connect your tools' },
      body: {
        ko: 'GitHub · Slack · Figma · Notion · 이메일까지 연결합니다.',
        en: 'GitHub, Slack, Figma, Notion, email, and more.',
      },
    },
    {
      title: { ko: '똑똑한 모델 라우팅', en: 'Smart model routing' },
      body: {
        ko: '작업에 맞는 모델을 비용까지 고려해 자동으로 고릅니다.',
        en: 'The right model per task, cost included, chosen automatically.',
      },
    },
    {
      title: { ko: '재사용 스킬', en: 'Reusable skills' },
      body: {
        ko: '자주 하는 일은 스킬로 저장해, 어느 제품에서든 다시 부릅니다.',
        en: 'Recurring work saved as a skill, callable again on any product.',
      },
    },
  ] as ValueProp[],
  connectors: ['GitHub', 'Slack', 'Figma', 'Notion', 'Email'],
};

export const learningLoop = {
  heading: { ko: '한 번 배우면, 잊지 않습니다', en: 'Learns once. Never forgets.' },
  steps: [
    { ko: '일한다', en: 'Works' },
    { ko: '한 번 바로잡으면', en: 'Corrected once' },
    { ko: '다음엔 알아서', en: 'Next time, on its own' },
  ] as L[],
  caption: {
    ko: '한 번 바로잡은 것은 지식 그래프에 쌓여, 다음 작업이 알아서 참고합니다. 감독할 일은 시간이 지날수록 줄어듭니다.',
    en: 'Each correction accumulates in a knowledge graph the next task draws on by itself. Supervision shrinks over time.',
  },
};

export const finalCta = {
  heading: { ko: '다음 제품을, 오늘 시작하세요.', en: 'Start your next product today.' },
  button: { ko: '무료로 시작하기', en: 'Get started free' },
} satisfies Record<string, L>;

export interface FooterColumn {
  title: L;
  links: { label: L; href: string; external?: boolean }[];
}
/** No 회사/About column (one-person company). No Docs link — the legacy
 *  4-product docs were removed; new docs ship with the product later. */
export const footerColumns: FooterColumn[] = [
  {
    title: { ko: '제품', en: 'Product' },
    links: [
      { label: { ko: '작동 방식', en: 'How it works' }, href: '/how-it-works' },
    ],
  },
  {
    title: { ko: '리소스', en: 'Resources' },
    links: [
      { label: { ko: '블로그', en: 'Blog' }, href: '/blog' },
      { label: { ko: '문의', en: 'Contact' }, href: '/contact' },
    ],
  },
  {
    title: { ko: '법적 고지', en: 'Legal' },
    links: [
      { label: { ko: '개인정보 처리방침', en: 'Privacy' }, href: '/privacy' },
      { label: { ko: '이용약관', en: 'Terms' }, href: '/terms' },
    ],
  },
];
// Footer = hero verbatim. Same slogan stamped at the bottom of every page as
// a brand seal — repetition over re-statement. KO/EN both match the hero
// nominal-contrast (Round 10 unification).
export const footerTagline: L = {
  ko: '믿음이 아닌, 증명.',
  en: 'Proof, not promises.',
};

// ─── How it works page ──────────────────────────────────────────────
export interface FlowStep {
  title: L;
  body: L;
}
export const howItWorks = {
  hero: {
    badge: { ko: '지시하면, 증거로 답합니다', en: 'Ask once, get proof' },
    h1: { ko: '어떻게 작동하나요', en: 'How it works' },
    subtitle: {
      ko: '한 줄 던지면 AI가 일하고, 스스로 검증하고, 사람이 읽을 수 있는 증거와 함께 돌려줍니다.',
      en: 'Toss in one line. AI works, verifies itself, and returns proof a human can read.',
    },
  },
  steps: [
    {
      title: { ko: '던지세요', en: 'Toss it in' },
      body: {
        ko: '한 줄 지시면 충분합니다. 이메일이나 GitHub 이슈가 들어오면 자리에 없어도 알아서 일이 시작됩니다.',
        en: 'One line is enough. An incoming email or GitHub issue starts the work, even while away.',
      },
    },
    {
      title: { ko: 'AI가 일합니다', en: 'AI does the work' },
      body: {
        ko: '계획·실행·검증을 스스로 반복합니다. 혼자 정하면 안 되는 갈림길에서는 물어보고, 답을 받으면 그 지점부터 이어서 진행합니다.',
        en: 'Plan, act, verify, on a loop. Genuine forks get a question; the answer resumes the work from that point.',
      },
    },
    {
      title: { ko: '검증하고 증거를 냅니다', en: 'It verifies and shows proof' },
      body: {
        ko: '끝났다고 그냥 믿지 않습니다. 별도 검증이 독립적으로 확인하고, 무엇을 확인했는지·얼마나 확신하는지 등급과 함께 보여줍니다. 통과를 꾸며내지 않습니다.',
        en: '"Done" is never taken on faith. A separate check verifies independently and shows what was checked and how sure, as a grade. A pass is never faked.',
      },
    },
    {
      title: { ko: '기억합니다', en: 'It remembers' },
      body: {
        ko: '한 번 바로잡은 것은 지식 그래프에 쌓입니다. 다음부터 같은 실수는 알아서 피하고, 쌓인 지식은 언제든 열어볼 수 있습니다.',
        en: 'Each correction accumulates in a knowledge graph. The same mistake is avoided from then on, and the knowledge is there to browse anytime.',
      },
    },
  ] as FlowStep[],
  glassBox: {
    heading: { ko: '유리상자처럼 투명한 결과', en: 'Results, transparent as glass' },
    body: {
      ko: '모든 결과는 의도·작업·검증·판정·산출물이 한 장에 담긴 Delivery Report로 옵니다. 무엇을 확인했고 얼마나 확신하는지, 등급까지 정직하게 보여줍니다.',
      en: 'Every result arrives as one Delivery Report: intent, work, checks, verdict, artifact. What was checked and how sure, shown honestly down to the grade.',
    },
  },
  decide: {
    heading: { ko: '결정이 필요할 때만 부릅니다', en: 'Calls only when a decision is needed' },
    body: {
      ko: '취향·범위·방향처럼 혼자 정하면 안 되는 갈림길만 올라옵니다. 답하는 순간 그 자리에서 이어서 진행하고, 그 선택은 다음을 위한 기준으로 기억됩니다.',
      en: 'Only genuine forks (taste, scope, direction) come up. The moment one is answered, the work resumes, and that choice becomes the standard next time.',
    },
  },
  safeMode: {
    heading: { ko: '밖으로 나가는 건, 승인 후에', en: 'Nothing leaves until approved' },
    body: {
      ko: '푸시·머지·발송처럼 되돌리기 어려운 작업은 승인 전엔 밖으로 나가지 않습니다.',
      en: 'Hard-to-undo actions (push, merge, send) never go out before approval.',
    },
  },
  underHood: {
    heading: { ko: '보이지 않는 곳에서', en: 'Under the hood' },
    caption: {
      ko: '결과만 보입니다. 나머지는 안에서 돌아갑니다.',
      en: 'Only the results show. The rest runs inside.',
    },
    tiles: [
      {
        title: { ko: '실행', en: 'Execution' },
        body: { ko: '일을 끝까지 해내는 엔진', en: 'The engine that carries work to done' },
      },
      {
        title: { ko: '비용 최적 라우팅', en: 'Cost-aware routing' },
        body: { ko: '작업에 맞는 모델을 알아서 고릅니다', en: 'Picks the right model for the job' },
      },
      {
        title: { ko: '안전 가드레일', en: 'Safety guardrails' },
        body: { ko: '위험을 막고 규칙을 지킵니다', en: 'Blocks risk and holds the rules' },
      },
      {
        title: { ko: '기억·개인화', en: 'Memory & personalization' },
        body: { ko: '쓰는 방식 그대로 배웁니다', en: 'Learns how the work gets done' },
      },
    ] as ValueProp[],
  },
  cta: {
    heading: { ko: '직접 한번 시켜보세요.', en: 'Put it to work yourself.' },
    button: { ko: '무료로 시작하기', en: 'Get started free' },
  },
};

/** Pricing page is held (보류) — a calm "preparing" placeholder. */
export const pricingPlaceholder = {
  badge: { ko: '준비 중', en: 'Coming soon' },
  h1: { ko: '가격은 곧 공개됩니다', en: 'Pricing is on the way' },
  body: {
    ko: '한 사람이 여러 제품을 굴리는 데 맞는 단순한 가격을 다듬고 있습니다. 지금은 무료로 시작할 수 있습니다.',
    en: 'Simple pricing for a solo founder running many products is on the way. Free to start for now.',
  },
  cta: { ko: '무료로 시작하기', en: 'Get started free' },
} satisfies Record<string, L>;
