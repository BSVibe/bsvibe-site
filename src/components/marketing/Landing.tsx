import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import BrowserFrame from './BrowserFrame';
import {
  hero,
  buttons,
  whyDifferent,
  whyDifferentHeading,
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
      <section style={{ maxWidth: 880, margin: '0 auto', padding: '24px 24px 104px' }} className="fade-up">
        <BrowserFrame
          src={screenshots.deliveryReport.src}
          alt={screenshots.deliveryReport.alt[locale]}
          caption={screenshots.deliveryReport.caption[locale]}
          width={1440}
          height={900}
          priority
        />
      </section>

      {/* WHY DIFFERENT */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 104px' }}>
        <h2
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            color: 'var(--text)',
            letterSpacing: '-0.03em',
            textAlign: 'center',
            margin: '0 0 48px',
          }}
        >
          {whyDifferentHeading[locale]}
        </h2>
        <div className="why-cols">
          {whyDifferent.map((p) => (
            <div className="why-col" key={p.title.en}>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text)', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
                {p.title[locale]}
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>{p.body[locale]}</p>
            </div>
          ))}
        </div>
        <style>{`
          .why-cols { display: grid; grid-template-columns: repeat(3, 1fr); }
          .why-col { padding: 0 32px; }
          .why-col:first-child { padding-left: 0; }
          .why-col:last-child { padding-right: 0; }
          .why-col + .why-col { border-left: 1px solid var(--border); }
          @media (max-width: 760px) {
            .why-cols { grid-template-columns: 1fr; }
            .why-col, .why-col:first-child, .why-col:last-child { padding: 24px 0; }
            .why-col + .why-col { border-left: none; border-top: 1px solid var(--border); }
          }
        `}</style>
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
            width={1440}
            height={900}
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
