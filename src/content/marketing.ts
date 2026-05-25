// Single source of truth for the BSVibe marketing surface.
//
// BSVibe is ONE product (the 4-product era — BSGateway/BSNexus/BSupervisor/
// BSage — is retired; those are now invisible internal layers). The external
// pitch leads with the wedge: verified work + agents that stop repeating
// mistakes, for the solo founder running many products. The site is CTAs-only
// (no login on the site itself) — auth links point to app.bsvibe.dev.
//
// Copy/structure is data-driven so it stays testable (see tests/marketing.test.ts).

export type Locale = 'ko' | 'en';
type L<T = string> = Record<Locale, T>;

/** The product app lives on its own domain; the site only links to it. */
export const APP_URL = 'https://app.bsvibe.dev';
export const authLinks = {
  login: `${APP_URL}/login`,
  signup: `${APP_URL}/signup`,
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
  login: { ko: '로그인', en: 'Log in' },
  start: { ko: '시작하기', en: 'Start' },
} satisfies Record<string, L>;

export const hero = {
  badge: { ko: 'AI가 만들고, 검증까지', en: 'AI builds, and verifies' },
  h1: { ko: '믿으라 하지 않습니다. 보여줍니다.', en: "We don't ask for trust. We show you." },
  subtitle: {
    ko: 'AI가 만들고 스스로 검증해 증거로 답합니다. 한 번 가르치면, 같은 실수는 두 번 없습니다.',
    en: 'AI builds it and verifies it, then answers with proof. Teach it once, and the same mistake never happens twice.',
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
    title: { ko: '검증된 결과', en: 'Verified work' },
    body: {
      ko: '결과마다 사람이 읽을 수 있는 증명이 붙습니다. PR을 그냥 믿지 않습니다.',
      en: 'Every result comes with proof a human can read. It never just trusts a PR.',
    },
  },
  {
    title: { ko: '같은 실수는 한 번만', en: 'Never the same mistake twice' },
    body: {
      ko: '당신의 한 번의 교정이 쌓입니다. 다음부터는 알아서 피해 갑니다.',
      en: 'Your one correction sticks. From then on it steers around it on its own.',
    },
  },
  {
    title: { ko: '혼자서, 여러 제품', en: 'One founder, many products' },
    body: {
      ko: '여러 작업을 한눈에. 평범한 말로 지금 무슨 일이 일어나는지 알려줍니다.',
      en: 'Many work streams at a glance — described in plain language.',
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
    alt: { ko: 'BSVibe 결정 화면', en: 'BSVibe Decide screen' },
    caption: { ko: '실제 BSVibe 화면 — 결정(Decide)', en: 'Actual BSVibe — Decide' },
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
    ko: '운영 콘솔이 아니라, 사람이 말하듯 설명하는 현황판. 무엇이 진행 중이고 무엇이 당신을 기다리는지 5초면 압니다.',
    en: 'Not an ops console — a status ledger told in plain language. In five seconds you know what is running and what needs you.',
  },
} satisfies Record<string, L>;

export const learningLoop = {
  heading: { ko: '한 번 배우면, 잊지 않습니다', en: 'Learns once. Never forgets.' },
  steps: [
    { ko: '일한다', en: 'It works' },
    { ko: '당신이 바로잡는다', en: 'You correct it' },
    { ko: '다음엔 알아서', en: 'Next time, on its own' },
  ] as L[],
  caption: {
    ko: '감독할 일이 시간이 지날수록 줄어듭니다. 이것이 BSVibe가 약속하는 단 하나입니다.',
    en: 'The supervision you owe shrinks over time. That is the one promise BSVibe makes.',
  },
};

export const finalCta = {
  heading: { ko: '다음 제품을, 오늘 시작하세요.', en: 'Start your next product today.' },
  button: { ko: '무료로 시작하기', en: 'Get started free' },
} satisfies Record<string, L>;

export interface FooterColumn {
  title: L;
  links: { label: L; href: string }[];
}
/** No 회사/About column (one-person company). */
export const footerColumns: FooterColumn[] = [
  {
    title: { ko: '제품', en: 'Product' },
    links: [
      { label: { ko: '작동 방식', en: 'How it works' }, href: '/how-it-works' },
      { label: { ko: '문서', en: 'Docs' }, href: '/docs' },
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
export const footerTagline: L = {
  ko: '확인된 일만, 올라옵니다.',
  en: 'Only verified work surfaces.',
};

// ─── How it works page ──────────────────────────────────────────────
export interface FlowStep {
  title: L;
  body: L;
}
export const howItWorks = {
  hero: {
    badge: { ko: '지시하면, 증거로 답합니다', en: 'You ask. It answers with proof.' },
    h1: { ko: '어떻게 작동하나요', en: 'How it works' },
    subtitle: {
      ko: '한 줄 던지면 AI가 일하고, 스스로 검증하고, 사람이 읽을 수 있는 증거와 함께 돌려줍니다.',
      en: 'Toss in one line — AI works, verifies itself, and returns proof a human can read.',
    },
  },
  steps: [
    {
      title: { ko: '던지세요', en: 'Toss it in' },
      body: {
        ko: '한 줄 지시면 충분합니다. 이메일이나 GitHub 이슈가 들어오면 자리에 없어도 알아서 일이 시작됩니다.',
        en: 'One line is enough. An incoming email or GitHub issue can start the work while you are away.',
      },
    },
    {
      title: { ko: 'AI가 일합니다', en: 'AI does the work' },
      body: {
        ko: '계획·실행·검증을 스스로 반복합니다. 혼자 정하면 안 되는 갈림길에서는 당신에게 묻고, 답을 받으면 그 지점부터 이어서 진행합니다.',
        en: 'It loops through plan, act, verify on its own. At forks it should not decide alone, it asks you — then resumes right from that point.',
      },
    },
    {
      title: { ko: '검증하고 증거를 냅니다', en: 'It verifies and shows proof' },
      body: {
        ko: '끝났다고 그냥 믿지 않습니다. 무엇을 어떻게 확인했는지 증거와 판정을 함께 보여줍니다.',
        en: 'It does not just trust "done." It shows what it checked, how, and the verdict.',
      },
    },
    {
      title: { ko: '기억합니다', en: 'It remembers' },
      body: {
        ko: '당신이 바로잡은 것은 쌓입니다. 다음부터 같은 실수는 알아서 피합니다.',
        en: 'Your corrections accumulate. From then on it avoids the same mistake by itself.',
      },
    },
  ] as FlowStep[],
  glassBox: {
    heading: { ko: '유리상자처럼 투명한 결과', en: 'Results, transparent as glass' },
    body: {
      ko: '모든 결과는 의도·작업·검증·판정·산출물이 한 장에 담긴 Delivery Report로 옵니다.',
      en: 'Every result arrives as one Delivery Report: intent, work, checks, verdict, artifact.',
    },
  },
  decide: {
    heading: { ko: '결정이 필요할 때만 부릅니다', en: 'It calls you only when a decision is needed' },
    body: {
      ko: '취향·범위·방향처럼 AI가 혼자 정하면 안 되는 갈림길만 당신에게 옵니다. 당신이 답하는 순간 그 자리에서 이어서 진행하고, 당신의 선택은 다음을 위한 기준으로 기억됩니다.',
      en: 'Only genuine forks — taste, scope, direction — reach you. The moment you answer, it resumes, and your choice is remembered as the standard next time.',
    },
  },
  safeMode: {
    heading: { ko: '밖으로 나가는 건, 승인 후에', en: 'Nothing leaves until you approve' },
    body: {
      ko: '푸시·머지·발송처럼 되돌리기 어려운 작업은 당신 승인 전엔 밖으로 나가지 않습니다.',
      en: 'Hard-to-undo actions — push, merge, send — never leave BSVibe before you approve.',
    },
  },
  underHood: {
    heading: { ko: '보이지 않는 곳에서', en: 'Under the hood' },
    caption: {
      ko: '당신은 결과만 봅니다. 나머지는 안에서 돌아갑니다.',
      en: 'You see only the results. The rest runs inside.',
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
        body: { ko: '당신의 방식대로 배웁니다', en: 'Learns the way you work' },
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
    en: 'We are refining simple pricing for a solo founder running many products. For now, you can start free.',
  },
  cta: { ko: '무료로 시작하기', en: 'Get started free' },
} satisfies Record<string, L>;
