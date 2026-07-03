import type { Locale } from '@/lib/i18n';
import BrowserFrame from './BrowserFrame';
import Reveal from './Reveal';
import { howItWorks as H, screenshots, authLinks } from '@/content/marketing';

export default function HowItWorks({ locale = 'ko' }: { locale?: Locale }) {
  return (
    <div style={{ overflow: 'hidden' }}>
      {/* HERO */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '72px 24px 48px', textAlign: 'center' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '6px 14px',
            borderRadius: 999,
            backgroundColor: 'var(--surface-2)',
            color: 'var(--text-muted)',
            fontSize: '0.8125rem',
            fontWeight: 600,
          }}
        >
          {H.hero.badge[locale]}
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.035em', margin: '20px 0 16px' }}>
          {H.hero.h1[locale]}
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
          {H.hero.subtitle[locale]}
        </p>
      </section>

      {/* 4-STEP FLOW */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px 96px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {H.steps.map((step, i) => (
            <div
              key={step.title.en}
              style={{
                display: 'flex',
                gap: 20,
                padding: '24px 0',
                borderBottom: i < H.steps.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div
                style={{
                  flex: '0 0 auto',
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  border: '1px solid var(--border-strong)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                }}
              >
                {i + 1}
              </div>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text)', margin: '4px 0 8px', letterSpacing: '-0.02em' }}>
                  {step.title[locale]}
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{step.body[locale]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GLASS BOX — Delivery Report */}
      <FeatureBlock
        heading={H.glassBox.heading[locale]}
        body={H.glassBox.body[locale]}
        shot={screenshots.deliveryReport}
        locale={locale}
        w={1440}
        h={900}
      />

      {/* SKILLS — reusable capabilities (a live side-tab) */}
      <FeatureBlock
        heading={H.skills.heading[locale]}
        body={H.skills.body[locale]}
        shot={screenshots.skills}
        locale={locale}
        w={1440}
        h={900}
      />

      {/* KNOWLEDGE — the graph corrections accumulate into */}
      <FeatureBlock
        heading={H.knowledge.heading[locale]}
        body={H.knowledge.body[locale]}
        shot={screenshots.knowledge}
        locale={locale}
        w={1440}
        h={900}
      />

      {/* UNDER THE HOOD */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '32px 24px 96px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.03em', margin: '0 0 8px' }}>
          {H.underHood.heading[locale]}
        </h2>
        <p style={{ textAlign: 'center', fontSize: '0.9375rem', color: 'var(--text-faint)', margin: '0 0 36px' }}>
          {H.underHood.caption[locale]}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {H.underHood.tiles.map((tile) => (
            <div key={tile.title.en} style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)', borderRadius: 12, padding: 24 }}>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text)', margin: '0 0 6px', letterSpacing: '-0.01em' }}>
                {tile.title[locale]}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{tile.body[locale]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: 'var(--surface-2)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em', margin: '0 0 28px' }}>
            {H.cta.heading[locale]}
          </h2>
          <a
            href={authLinks.start}
            className="cta-press"
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
            {H.cta.button[locale]}
          </a>
        </div>
      </section>
    </div>
  );
}

function FeatureBlock({
  heading,
  body,
  shot,
  locale,
  w,
  h,
  maxFrame,
}: {
  heading: string;
  body: string;
  shot: (typeof screenshots)[keyof typeof screenshots];
  locale: Locale;
  w: number;
  h: number;
  maxFrame?: number;
}) {
  return (
    <section style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px 80px' }}>
      <Reveal>
        <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 32px' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.03em', margin: '0 0 12px' }}>
            {heading}
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{body}</p>
        </div>
        <div style={{ maxWidth: maxFrame ?? 880, margin: '0 auto' }}>
          <BrowserFrame src={shot.src} alt={shot.alt[locale]} caption={shot.caption[locale]} width={w} height={h} />
        </div>
      </Reveal>
    </section>
  );
}
