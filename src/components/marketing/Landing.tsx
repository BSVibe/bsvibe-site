import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import BrowserFrame from './BrowserFrame';
import {
  hero,
  buttons,
  whyDifferent,
  briefSection,
  learningLoop,
  finalCta,
  screenshots,
  authLinks,
} from '@/content/marketing';

export default function Landing({ locale = 'ko' }: { locale?: Locale }) {
  const howItWorksHref = `/${locale}/how-it-works`;

  return (
    <div style={{ overflow: 'hidden' }}>
      {/* HERO */}
      <section style={{ maxWidth: 820, margin: '0 auto', padding: '72px 24px 32px', textAlign: 'center' }}>
        <span
          className="fade-up"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            padding: '6px 14px',
            borderRadius: 999,
            backgroundColor: 'var(--verified-soft)',
            color: 'var(--text-muted)',
            fontSize: '0.8125rem',
            fontWeight: 600,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: 'var(--verified)' }} />
          {hero.badge[locale]}
        </span>

        <h1
          className="fade-up"
          style={{
            animationDelay: '0.1s',
            fontSize: 'clamp(2.25rem, 5.5vw, 3.5rem)',
            fontWeight: 800,
            color: 'var(--text)',
            lineHeight: 1.12,
            letterSpacing: '-0.04em',
            margin: '24px 0 18px',
          }}
        >
          {hero.h1[locale]}
        </h1>

        <p
          className="fade-up"
          style={{
            animationDelay: '0.2s',
            fontSize: 'clamp(1rem, 2vw, 1.1875rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            maxWidth: 560,
            margin: '0 auto 32px',
          }}
        >
          {hero.subtitle[locale]}
        </p>

        <div
          className="fade-up"
          style={{ animationDelay: '0.3s', display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href={authLinks.signup} style={primaryBtn}>
            {buttons.ctaPrimary[locale]}
          </a>
          <Link href={howItWorksHref} style={secondaryBtn}>
            {buttons.ctaSecondary[locale]}
          </Link>
        </div>
        <p style={{ marginTop: 16, fontSize: '0.8125rem', color: 'var(--text-faint)' }}>{hero.ctaCaption[locale]}</p>
      </section>

      {/* HERO PROOF — real Delivery Report screen */}
      <section style={{ maxWidth: 620, margin: '0 auto', padding: '24px 24px 96px' }} className="fade-up">
        <BrowserFrame
          src={screenshots.deliveryReport.src}
          alt={screenshots.deliveryReport.alt[locale]}
          caption={screenshots.deliveryReport.caption[locale]}
          width={355}
          height={512}
          priority
        />
      </section>

      {/* WHY DIFFERENT */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {whyDifferent.map((p, i) => (
            <div
              key={p.title.en}
              style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)', borderRadius: 12, padding: 28 }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  backgroundColor: 'var(--surface-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--verified)',
                  marginBottom: 16,
                }}
              >
                {ICONS[i]}
              </div>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                {p.title[locale]}
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{p.body[locale]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BRIEF — real Brief screen */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.03em', margin: '0 0 16px' }}>
              {briefSection.heading[locale]}
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0, maxWidth: 420 }}>
              {briefSection.body[locale]}
            </p>
          </div>
          <BrowserFrame
            src={screenshots.brief.src}
            alt={screenshots.brief.alt[locale]}
            caption={screenshots.brief.caption[locale]}
            width={512}
            height={472}
          />
        </div>
      </section>

      {/* LEARNING LOOP */}
      <section style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px 96px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.03em', margin: '0 0 36px' }}>
          {learningLoop.heading[locale]}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          {learningLoop.steps.map((s, i) => (
            <div key={s.en} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  padding: '14px 22px',
                  borderRadius: 999,
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface)',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: 'var(--text)',
                }}
              >
                {s[locale]}
              </div>
              {i < learningLoop.steps.length - 1 && (
                <span style={{ color: 'var(--text-faint)', fontSize: '1.25rem' }} aria-hidden>
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 520, margin: '28px auto 0' }}>
          {learningLoop.caption[locale]}
        </p>
      </section>

      {/* FINAL CTA */}
      <section style={{ backgroundColor: 'var(--surface-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em', margin: '0 0 28px' }}>
            {finalCta.heading[locale]}
          </h2>
          <a href={authLinks.signup} style={primaryBtn}>
            {finalCta.button[locale]}
          </a>
        </div>
      </section>
    </div>
  );
}

const primaryBtn: React.CSSProperties = {
  display: 'inline-block',
  padding: '13px 26px',
  borderRadius: 10,
  backgroundColor: 'var(--primary)',
  color: 'var(--on-primary)',
  fontSize: '0.9375rem',
  fontWeight: 700,
  letterSpacing: '-0.01em',
  textDecoration: 'none',
};

const secondaryBtn: React.CSSProperties = {
  display: 'inline-block',
  padding: '13px 26px',
  borderRadius: 10,
  border: '1px solid var(--border-strong)',
  color: 'var(--text)',
  fontSize: '0.9375rem',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  textDecoration: 'none',
};

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};
const ICONS = [
  <svg key="0" width="20" height="20" viewBox="0 0 24 24" {...stroke}>
    <path d="m9 12 2 2 4-4" />
    <path d="M12 3l2.5 1.5L17 4l1 2.8L20.5 8 20 11l.5 3-2.5 1.2L17 18l-2.8-.5L12 19l-2.2-1.5L7 18l-1-2.8L3.5 14 4 11l-.5-3L6 6.8 7 4l2.5.5z" />
  </svg>,
  <svg key="1" width="20" height="20" viewBox="0 0 24 24" {...stroke}>
    <path d="M17 2l4 4-4 4" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <path d="M7 22l-4-4 4-4" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>,
  <svg key="2" width="20" height="20" viewBox="0 0 24 24" {...stroke}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>,
];
