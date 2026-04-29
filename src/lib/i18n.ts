// Minimal locale dictionary for marketing surfaces (preserves the existing
// Astro `src/i18n/{ko,en}.ts` shape). Loaded by client + server components.

export type Locale = 'ko' | 'en';

export interface Translations {
  nav: {
    products: string;
    docs: string;
    blog: string;
    pricing: string;
    getStarted: string;
    login: string;
    logout: string;
    account: string;
  };
  menu: string;
  hero: {
    badge: string;
    h1: string;
    h1Gradient: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
  };
  productsHeading: string;
  vision: string;
  footer: { docs: string; privacy: string; terms: string };
}

export const ko: Translations = {
  nav: {
    products: '제품',
    docs: '문서',
    blog: '블로그',
    pricing: '가격',
    getStarted: '시작하기',
    login: '로그인',
    logout: '로그아웃',
    account: '내 계정',
  },
  menu: '메뉴',
  hero: {
    badge: 'AI, 새로운 감각',
    h1: '만들고, 지키고, 기억한다.',
    h1Gradient: '나머지는 알아서.',
    subtitle: '따로 써도 충분하고, 같이 쓰면 놀랍습니다.',
    cta: '둘러보기',
    ctaSecondary: '계정 만들기',
  },
  productsHeading: '서로 다른 제품. 하나의 경험.',
  vision: '하나의 계정, 하나의 경험. 경계 없이, 자연스럽게.',
  footer: {
    docs: '문서',
    privacy: '개인정보처리방침',
    terms: '이용약관',
  },
};

export const en: Translations = {
  nav: {
    products: 'Products',
    docs: 'Docs',
    blog: 'Blog',
    pricing: 'Pricing',
    getStarted: 'Get Started',
    login: 'Log in',
    logout: 'Log out',
    account: 'Account',
  },
  menu: 'Menu',
  hero: {
    badge: 'AI, a new sense',
    h1: 'Build. Guard. Remember.',
    h1Gradient: 'The rest is automatic.',
    subtitle: 'Great on their own. Remarkable together.',
    cta: 'Explore',
    ctaSecondary: 'Create Account',
  },
  productsHeading: 'Different products. One experience.',
  vision: 'One account, one experience. No boundaries, just flow.',
  footer: {
    docs: 'Docs',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
  },
};

const dict: Record<Locale, Translations> = { ko, en };
export function getTranslations(locale: Locale): Translations {
  return dict[locale];
}
export function isLocale(v: string | undefined): v is Locale {
  return v === 'ko' || v === 'en';
}
