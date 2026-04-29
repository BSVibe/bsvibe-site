import type { Metadata } from 'next';
import { isLocale } from '@/lib/i18n';
import { getProductsWithPrices, formatPrice, formatPeriod } from '@/lib/pricing.repository';

export const metadata: Metadata = {
  title: '가격',
  description: 'BSVibe 제품별 가격 플랜',
};

// Always rendered fresh on the server — talks to Supabase via service role.
export const dynamic = 'force-dynamic';

const copy = {
  ko: {
    h1: '심플한 가격, 투명한 비용',
    sub: '모든 제품은 무료로 시작할 수 있습니다. 필요한 만큼만 사용하세요.',
    empty: '가격 정보를 불러올 수 없습니다.',
    hint: '관리자: Supabase 환경 변수와 마이그레이션을 확인하세요.',
    faqH: '자주 묻는 질문',
    faq: [
      ['무료 플랜에 제한이 있나요?', '무료 플랜은 개인 프로젝트와 소규모 사용에 적합합니다. 사용량 제한이 있지만, 핵심 기능은 모두 사용할 수 있습니다.'],
      ['결제 수단은 무엇을 지원하나요?', '한국에서는 토스페이먼츠를 통해 카드, 카카오페이, 네이버페이를 지원합니다. 해외에서는 Stripe를 통해 주요 카드를 지원합니다.'],
      ['플랜을 변경할 수 있나요?', '언제든지 플랜을 업그레이드하거나 다운그레이드할 수 있습니다. 차액은 일할 계산됩니다.'],
      ['환불 정책은 어떻게 되나요?', '구독 취소 시 현재 결제 기간이 끝날 때까지 서비스를 이용할 수 있습니다. 별도 환불은 지원하지 않습니다.'],
    ],
    ctaSignup: '시작하기',
    ctaContact: '문의하기',
  },
  en: {
    h1: 'Simple pricing, transparent costs',
    sub: 'Start free on every product. Pay only for what you use.',
    empty: 'Pricing information unavailable.',
    hint: 'Admin: check Supabase env vars + migrations.',
    faqH: 'FAQ',
    faq: [
      ['Are there limits on the free plan?', 'Free is great for personal and small projects. It has usage limits, but all core features are available.'],
      ['What payment methods are supported?', 'In Korea: Toss Payments (cards, KakaoPay, Naver Pay). Globally: Stripe (major cards).'],
      ['Can I change my plan?', 'Yes — upgrade or downgrade anytime. Charges are prorated.'],
      ['What is the refund policy?', 'On cancellation, you keep service until the current period ends. Separate refunds are not supported.'],
    ],
    ctaSignup: 'Get Started',
    ctaContact: 'Contact Us',
  },
} as const;

export default async function PricingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'ko';
  const c = copy[locale];

  let products: Awaited<ReturnType<typeof getProductsWithPrices>> = [];
  try {
    products = await getProductsWithPrices(locale);
  } catch {
    /* swallow, render empty state */
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '16px 24px 120px' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <h1
          style={{
            color: '#f2f3f7',
            fontSize: '2rem',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            marginBottom: 12,
          }}
        >
          {c.h1}
        </h1>
        <p style={{ color: '#8187a8', fontSize: '1.0625rem' }}>{c.sub}</p>
      </div>

      {products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 24px', color: '#5a5f7d' }}>
          <p>{c.empty}</p>
          <p style={{ fontSize: '0.8125rem', marginTop: 8, color: '#3d4160' }}>
            {c.hint}
          </p>
        </div>
      ) : (
        products.map((product) => (
          <div key={product.id} style={{ marginBottom: 64 }}>
            <h2
              style={{
                color: product.accentColor,
                fontSize: '1.25rem',
                fontWeight: 700,
                marginBottom: 20,
                letterSpacing: '-0.02em',
              }}
            >
              {product.name}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 14,
              }}
            >
              {product.prices.map((tier) => {
                const ctaLabel = tier.isContactOnly ? c.ctaContact : c.ctaSignup;
                const ctaHref = tier.isContactOnly
                  ? 'mailto:contact@bsvibe.dev'
                  : 'https://auth.bsvibe.dev/signup';
                return (
                  <div
                    key={tier.id}
                    style={{
                      borderRadius: 14,
                      border: '1px solid',
                      borderColor: tier.isHighlighted
                        ? `${product.accentColor}40`
                        : '#2a2d42',
                      backgroundColor: tier.isHighlighted ? '#13141f' : '#111218',
                      padding: 28,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div style={{ marginBottom: 20 }}>
                      <h3
                        style={{
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: '#8187a8',
                          marginBottom: 8,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {tier.displayName}
                      </h3>
                      <div style={{ marginBottom: 8 }}>
                        <span
                          style={{
                            fontSize: '2rem',
                            fontWeight: 800,
                            color: '#f2f3f7',
                            letterSpacing: '-0.03em',
                          }}
                        >
                          {formatPrice(tier, locale)}
                        </span>
                        <span style={{ fontSize: '0.875rem', color: '#5a5f7d' }}>
                          {formatPeriod(tier, locale)}
                        </span>
                      </div>
                      {tier.description && (
                        <p style={{ fontSize: '0.8125rem', color: '#5a5f7d', margin: 0 }}>
                          {tier.description}
                        </p>
                      )}
                    </div>
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: '0 0 24px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                      }}
                    >
                      {tier.features.map((f, i) => (
                        <li
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            fontSize: '0.875rem',
                            color: '#a8adc6',
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke={product.accentColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3.5 8l3 3 6-6" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={ctaHref}
                      style={{
                        display: 'block',
                        textAlign: 'center',
                        padding: '10px 20px',
                        borderRadius: 8,
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        border: tier.isHighlighted
                          ? 'none'
                          : '1px solid #2a2d42',
                        color: tier.isHighlighted ? '#fff' : '#8187a8',
                        backgroundColor: tier.isHighlighted ? product.accentColor : 'transparent',
                      }}
                    >
                      {ctaLabel}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}

      <div
        style={{
          marginTop: 32,
          paddingTop: 48,
          borderTop: '1px solid #1e2033',
        }}
      >
        <h2
          style={{
            color: '#f2f3f7',
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: 32,
            textAlign: 'center',
            letterSpacing: '-0.02em',
          }}
        >
          {c.faqH}
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {c.faq.map(([h, p]) => (
            <div
              key={h}
              style={{
                padding: 20,
                borderRadius: 12,
                border: '1px solid #2a2d42',
                backgroundColor: '#111218',
              }}
            >
              <h3
                style={{
                  color: '#e4e6ee',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                {h}
              </h3>
              <p
                style={{
                  color: '#8187a8',
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {p}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
