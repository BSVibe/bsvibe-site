import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import BrowserFrame from './BrowserFrame';
import Reveal from './Reveal';
import {
  hero,
  buttons,
  whyDifferent,
  whyDifferentHeading,
  briefSection,
  platform,
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
            margin: '24px 0 28px',
            wordBreak: 'keep-all',
            textWrap: 'balance',
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
            wordBreak: 'keep-all',
            textWrap: 'balance',
          }}
        >
          {hero.subtitle[locale]}
        </p>

        <div
          className="fade-up"
          style={{ animationDelay: '0.3s', display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href={authLinks.start} className="cta-press" style={primaryBtn}>
            {buttons.ctaPrimary[locale]}
          </a>
          <Link href={howItWorksHref} className="cta-press" style={secondaryBtn}>
            {buttons.ctaSecondary[locale]}
          </Link>
        </div>
        <p style={{ marginTop: 16, fontSize: '0.8125rem', color: 'var(--text-faint)' }}>{hero.ctaCaption[locale]}</p>
      </section>

      {/* HERO PROOF — real Delivery Report screen */}
      <section style={{ maxWidth: 880, margin: '0 auto', padding: '24px 24px 104px' }}>
        <Reveal>
          <BrowserFrame
            src={screenshots.deliveryReport.src[locale]}
            alt={screenshots.deliveryReport.alt[locale]}
            caption={screenshots.deliveryReport.caption[locale]}
            width={1440}
            height={900}
            priority
          />
        </Reveal>
      </section>

      {/* WHY DIFFERENT */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 104px' }}>
        <Reveal>
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
          /* Mobile-first: stacked, hairline only BETWEEN rows (top border,
             first row none). Desktop overrides to 3 columns with left dividers.
             Each breakpoint fully owns its borders so neither leaks. */
          .why-cols { display: grid; grid-template-columns: 1fr; }
          .why-col { padding: 24px 0; border-top: 1px solid var(--border); }
          .why-col:first-child { border-top: none; padding-top: 4px; }
          @media (min-width: 761px) {
            .why-cols { grid-template-columns: repeat(3, 1fr); }
            .why-col { padding: 0 32px; border-top: none; border-left: 1px solid var(--border); }
            .why-col:first-child { padding-left: 0; padding-top: 0; border-left: none; }
            .why-col:last-child { padding-right: 0; }
          }
        `}</style>
        </Reveal>
      </section>

      {/* BRIEF — real Brief screen */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px 96px' }}>
        <Reveal>
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
            src={screenshots.brief.src[locale]}
            alt={screenshots.brief.alt[locale]}
            caption={screenshots.brief.caption[locale]}
            width={1440}
            height={900}
          />
        </div>
        </Reveal>
      </section>

      {/* PLATFORM — web-based · connectors · model routing */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 96px' }}>
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 40px' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.03em', margin: '0 0 12px' }}>
              {platform.heading[locale]}
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{platform.body[locale]}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 28 }}>
            {platform.points.map((p) => (
              <div
                key={p.title.en}
                className="hover-lift"
                style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)', borderRadius: 12, padding: 24 }}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                  {p.title[locale]}
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{p.body[locale]}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {platform.connectors.map((c) => (
              <span
                key={c}
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  padding: '6px 14px',
                  borderRadius: 999,
                  backgroundColor: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* LEARNING LOOP */}
      <section style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px 96px', textAlign: 'center' }}>
        <Reveal>
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
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section style={{ backgroundColor: 'var(--surface-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <Reveal>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em', margin: '0 0 28px' }}>
            {finalCta.heading[locale]}
          </h2>
          <a href={authLinks.start} className="cta-press" style={primaryBtn}>
            {finalCta.button[locale]}
          </a>
        </div>
        </Reveal>
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
