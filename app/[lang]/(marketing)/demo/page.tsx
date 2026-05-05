import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/lib/i18n';

type ProductId = 'bsgateway' | 'bsnexus' | 'bsupervisor' | 'bsage';

interface DemoCard {
  id: ProductId;
  title: string;
  tagline: { ko: string; en: string };
  accent: string;
  demoUrl: string;
}

const DEMO_CARDS: DemoCard[] = [
  {
    id: 'bsgateway',
    title: 'BSGateway',
    accent: '#f59e0b',
    demoUrl: 'https://demo-gateway.bsvibe.dev',
    tagline: {
      ko: '복잡도 기반 LLM 라우팅과 사용량 분석을 라이브 데이터로 클릭해 보세요.',
      en: 'Click through complexity-based LLM routing + live usage analytics.',
    },
  },
  {
    id: 'bsnexus',
    title: 'BSNexus',
    accent: '#3b82f6',
    demoUrl: 'https://demo-nexus.bsvibe.dev',
    tagline: {
      ko: 'AI 멀티에이전트 회사를 운영하는 Direction/Decisions 화면을 둘러보세요.',
      en: 'Explore the Direction + Decisions surfaces of an AI multi-agent company.',
    },
  },
  {
    id: 'bsupervisor',
    title: 'BSupervisor',
    accent: '#f43f5e',
    demoUrl: 'https://demo-supervisor.bsvibe.dev',
    tagline: {
      ko: '실시간 audit 로그, 비용 트렌드, 정책 차단을 갖춘 안전 감사 대시보드.',
      en: 'Safety audit dashboard with live audit log, cost trends, and policy blocking.',
    },
  },
  {
    id: 'bsage',
    title: 'BSage',
    accent: '#10b981',
    demoUrl: 'https://demo-sage.bsvibe.dev',
    tagline: {
      ko: '온톨로지 그래프와 Vault 기반 2nd Brain 인터페이스 체험.',
      en: "Try the ontology graph + Vault-backed 2nd Brain interface.",
    },
  },
];

export const metadata: Metadata = {
  title: 'Live Demo — BSVibe',
  description:
    'Try BSGateway, BSNexus, BSupervisor, and BSage live without signing up. '
    + 'Per-visitor sandbox tenants, isolated demo backends.',
  robots: { index: false, follow: false },
};

const COPY = {
  ko: {
    h1: '직접 클릭해 보세요.',
    h2: '4개 제품, 가입 없이 2시간 샌드박스.',
    sub: '방문할 때마다 신규 샌드박스 테넌트가 생성됩니다. 다른 방문자와 격리되며 2시간 후 자동 삭제됩니다.',
    cta: '데모 시작 →',
    how: '데모는 어떻게 동작하나요?',
    bullets: [
      '진입 시 백엔드가 새 tenant_id (UUID)를 발급하고 시드 데이터를 채워 줍니다.',
      '브라우저별로 격리됩니다. 다른 사람의 작업은 보이지 않습니다.',
      '실제 LLM 호출은 차단됩니다 (mock 응답). 외부 알림도 0건.',
      '2시간 비활성 후 자동 삭제. 영구 보관이 필요하면 가입하세요.',
    ],
    signup: '가입해서 본격적으로 사용하기 →',
  },
  en: {
    h1: 'Click around for real.',
    h2: '4 products, 2-hour sandbox, no signup.',
    sub: 'Each visit gets a fresh sandbox tenant. Isolated from other visitors, auto-deleted after 2 hours.',
    cta: 'Start demo →',
    how: 'How does it work?',
    bullets: [
      'On entry, the backend issues a new tenant_id (UUID) and seeds your sandbox.',
      'Per-browser isolation. You can\'t see other visitors\' work.',
      'Real LLM calls are blocked (mock responses). Zero external notifications.',
      'Auto-deleted after 2h of inactivity. Sign up to persist.',
    ],
    signup: 'Sign up for the real thing →',
  },
};

export default async function DemoPortalPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'ko';
  const c = COPY[locale];

  return (
    <article
      style={{
        maxWidth: 980,
        margin: '0 auto',
        padding: '32px 24px 120px',
      }}
    >
      <header style={{ marginBottom: 56 }}>
        <h1
          style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            marginBottom: 12,
            color: '#f2f3f7',
          }}
        >
          {c.h1}
        </h1>
        <p
          style={{
            color: '#a8adc6',
            fontSize: '1.25rem',
            lineHeight: 1.6,
            marginBottom: 8,
          }}
        >
          {c.h2}
        </p>
        <p
          style={{
            color: '#8187a8',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            margin: 0,
            maxWidth: 640,
          }}
        >
          {c.sub}
        </p>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 18,
          marginBottom: 64,
        }}
      >
        {DEMO_CARDS.map((card) => (
          <a
            key={card.id}
            href={card.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: 28,
              borderRadius: 14,
              border: '1px solid #2a2d42',
              backgroundColor: '#111218',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              transition: 'border-color 150ms, transform 150ms',
            }}
          >
            <h2
              style={{
                color: card.accent,
                fontSize: '1.5rem',
                fontWeight: 700,
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              {card.title}
            </h2>
            <p
              style={{
                color: '#a8adc6',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                margin: 0,
                flex: 1,
              }}
            >
              {card.tagline[locale]}
            </p>
            <span
              style={{
                color: card.accent,
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              {c.cta}
            </span>
          </a>
        ))}
      </div>

      <section
        style={{
          padding: '32px 28px',
          borderRadius: 14,
          border: '1px solid #1e2033',
          backgroundColor: '#0d0e14',
        }}
      >
        <h3
          style={{
            color: '#f2f3f7',
            fontSize: '1.25rem',
            fontWeight: 700,
            marginTop: 0,
            marginBottom: 18,
          }}
        >
          {c.how}
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {c.bullets.map((b, i) => (
            <li
              key={i}
              style={{
                color: '#a8adc6',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                marginBottom: i === c.bullets.length - 1 ? 0 : 10,
                paddingLeft: 20,
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  color: '#3b82f6',
                  fontWeight: 700,
                }}
              >
                ›
              </span>
              {b}
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 24 }}>
          <a
            href="https://auth.bsvibe.dev/signup"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              borderRadius: 10,
              backgroundColor: '#3b82f6',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.95rem',
              textDecoration: 'none',
            }}
          >
            {c.signup}
          </a>
        </div>
      </section>
    </article>
  );
}
