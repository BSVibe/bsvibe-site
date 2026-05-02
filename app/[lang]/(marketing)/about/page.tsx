import type { Metadata } from 'next';
import Link from 'next/link';
import { isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: '소개',
  description: 'BSVibe의 비전, 미션, 그리고 함께하는 사람들',
};

const copy = {
  ko: {
    title: '만들고, 지키고, 기억한다.',
    lead: 'BSVibe는 네 개의 독립적인 AI 소프트웨어가 하나의 경험으로 연결되는 생태계입니다.',
    visionH: '비전',
    visionP1:
      'Apple은 하드웨어를 만들었습니다. 각각의 기기는 독립적으로 훌륭하지만, 함께 사용하면 경험이 달라집니다. AirDrop, Handoff, iCloud — 경계가 사라지고 자연스러운 흐름만 남습니다.',
    visionP2: 'BSVibe는 그 철학을 소프트웨어에 적용합니다.',
    missionH: '미션',
    missionP1:
      'AI 도구가 폭발적으로 늘어나는 시대, 사용자는 점점 더 많은 선택을 강요받고 있습니다. 어떤 모델이 좋은지, 어떤 에이전트가 안전한지, 어떤 지식이 필요한지 — 매번 고민하고 결정해야 합니다.',
    missionP2:
      'BSVibe는 이런 결정을 줄여줍니다. 기술의 복잡함은 우리가 처리하고, 사용자에게는 결과만 남깁니다.',
    productsH: '제품',
    products: [
      ['BSGateway', '스마트 LLM 라우팅', 'bsgateway'],
      ['BSNexus', 'AI 에이전트 오케스트레이션', 'bsnexus'],
      ['BSupervisor', 'AI 감사 및 안전 관리', 'bsupervisor'],
      ['BSage', '온톨로지 기반 지식 관리', 'bsage'],
    ],
    valuesH: '가치',
    values: [
      ['독립성', '각 제품은 따로 써도 충분한 가치를 제공합니다. 하나에 묶이지 않는 자유.'],
      ['연결성', '같이 쓰면 곱셈처럼 가치가 커집니다. 하나의 계정, 하나의 경험.'],
      ['안전성', 'AI의 모든 행동은 추적 가능하고 통제 가능합니다. 잠든 사이에도 안심.'],
      ['투명성', '가격, 데이터, 의사결정. 숨길 것이 없습니다.'],
    ],
    contactH: '연락하기',
    contactP: 'BSVibe에 대해 궁금한 점이나 협력 제안이 있다면',
    contactLink: '문의 페이지',
    contactSuffix: '를 통해 연락 주세요.',
  },
  en: {
    title: 'Build. Guard. Remember.',
    lead: 'BSVibe is an ecosystem of four independent AI products connected as one experience.',
    visionH: 'Vision',
    visionP1:
      'Apple built hardware. Each device is great on its own; together, the experience is different. AirDrop, Handoff, iCloud — boundaries disappear and only flow remains.',
    visionP2: 'BSVibe applies that philosophy to software.',
    missionH: 'Mission',
    missionP1:
      'In an era of exploding AI tooling, users face more and more decisions. Which model? Which agent? What knowledge?',
    missionP2:
      'BSVibe reduces those decisions. We handle the complexity; you keep the results.',
    productsH: 'Products',
    products: [
      ['BSGateway', 'Smart LLM Routing', 'bsgateway'],
      ['BSNexus', 'AI Agent Orchestration', 'bsnexus'],
      ['BSupervisor', 'AI Auditing & Safety', 'bsupervisor'],
      ['BSage', 'Ontology-based Knowledge', 'bsage'],
    ],
    valuesH: 'Values',
    values: [
      ['Independence', 'Each product is enough on its own. Freedom from lock-in.'],
      ['Connection', 'Used together, value compounds. One account, one experience.'],
      ['Safety', 'Every AI action is traceable and controllable. Sleep easy.'],
      ['Transparency', 'Pricing, data, decisions. Nothing to hide.'],
    ],
    contactH: 'Contact',
    contactP: 'For questions or partnership inquiries,',
    contactLink: 'contact us',
    contactSuffix: '.',
  },
} as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'ko';
  const c = copy[locale];
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '16px 24px 120px' }}>
      <header style={{ textAlign: 'center', marginBottom: 64 }}>
        <h1
          style={{
            color: '#f2f3f7',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            marginBottom: 16,
          }}
        >
          {c.title}
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#8187a8', lineHeight: 1.7 }}>
          {c.lead}
        </p>
      </header>

      <Section heading={c.visionH}>
        <p>{c.visionP1}</p>
        <p>{c.visionP2}</p>
      </Section>

      <Section heading={c.missionH}>
        <p>{c.missionP1}</p>
        <p>{c.missionP2}</p>
      </Section>

      <Section heading={c.productsH}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {c.products.map(([name, tagline, slug]) => (
            <li
              key={slug}
              style={{ padding: '14px 0', borderBottom: '1px solid #1e2033' }}
            >
              <Link
                href={`/${locale}/products/${slug}`}
                style={{ color: '#a8adc6', fontSize: '1rem', textDecoration: 'none' }}
              >
                <strong style={{ color: '#f2f3f7', marginRight: 8 }}>{name}</strong>
                — {tagline}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section heading={c.valuesH}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 14,
          }}
        >
          {c.values.map(([h, p]) => (
            <div
              key={h}
              style={{
                padding: 24,
                borderRadius: 12,
                border: '1px solid #2a2d42',
                backgroundColor: '#111218',
              }}
            >
              <h3
                style={{
                  color: '#f2f3f7',
                  fontSize: '1.0625rem',
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                {h}
              </h3>
              <p style={{ color: '#8187a8', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                {p}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section heading={c.contactH}>
        <p>
          {c.contactP}{' '}
          <Link href={`/${locale}/contact`} style={{ color: '#818cf8' }}>
            {c.contactLink}
          </Link>
          {c.contactSuffix}
        </p>
      </Section>
    </div>
  );
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 56 }}>
      <h2
        style={{
          color: '#f2f3f7',
          fontSize: '1.5rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          marginBottom: 16,
        }}
      >
        {heading}
      </h2>
      <div style={{ color: '#a8adc6', fontSize: '1rem', lineHeight: 1.8 }}>
        {children}
      </div>
    </section>
  );
}
