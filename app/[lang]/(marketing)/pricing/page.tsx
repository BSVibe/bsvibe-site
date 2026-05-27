import type { Metadata } from 'next';
import { isLocale } from '@/lib/i18n';
import { pricingPlaceholder as P, authLinks } from '@/content/marketing';

export const metadata: Metadata = {
  title: '가격',
  description: '가격은 곧 공개됩니다. 지금은 무료로 시작할 수 있습니다.',
};

export default async function PricingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'ko';

  return (
    <div style={{ maxWidth: 620, margin: '0 auto', padding: '120px 24px', textAlign: 'center', minHeight: '60vh' }}>
      <span
        style={{
          display: 'inline-block',
          padding: '6px 14px',
          borderRadius: 999,
          backgroundColor: 'var(--action-soft)',
          color: 'var(--text-muted)',
          fontSize: '0.8125rem',
          fontWeight: 600,
        }}
      >
        {P.badge[locale]}
      </span>
      <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em', margin: '20px 0 16px' }}>
        {P.h1[locale]}
      </h1>
      <p style={{ fontSize: '1.0625rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: '0 auto 32px', maxWidth: 480 }}>
        {P.body[locale]}
      </p>
      <a
        href={authLinks.start}
        style={{
          display: 'inline-block',
          padding: '13px 26px',
          borderRadius: 10,
          backgroundColor: 'var(--primary)',
          color: 'var(--on-primary)',
          fontSize: '0.9375rem',
          fontWeight: 700,
          textDecoration: 'none',
        }}
      >
        {P.cta[locale]}
      </a>
    </div>
  );
}
