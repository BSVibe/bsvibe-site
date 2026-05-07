import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { isLocale, type Locale } from '@/lib/i18n';

type ProductId = 'bsgateway' | 'bsnexus' | 'bsupervisor' | 'bsage';

interface FeatureCard {
  h: string;
  p: string;
}

interface ProductCopy {
  title: string;
  tagline: string;
  features: FeatureCard[];
  description: string;
  cases: { name: string; detail: string }[];
}

const productCopy: Record<
  ProductId,
  { ko: ProductCopy; en: ProductCopy; accent: string; appUrl: string; demoUrl: string }
> = {
  bsgateway: {
    accent: '#f59e0b',
    appUrl: 'https://gateway.bsvibe.dev',
    demoUrl: 'https://demo-gateway.bsvibe.dev',
    ko: {
      title: 'BSGateway',
      tagline:
        '어떤 모델이 좋을지, 고민하지 않아도 됩니다. 비용, 성능, 가용성을 자동으로 판단해 최적의 LLM으로 라우팅합니다.',
      features: [
        { h: '스마트 라우팅', p: '요청의 특성을 분석해 GPT-4, Claude, Gemini 등 최적의 모델을 자동 선택합니다.' },
        { h: '비용 최적화', p: '단순 작업에는 경량 모델, 복잡한 작업에는 고급 모델. 토큰당 비용을 최대 90% 절감합니다.' },
        { h: '폴백 체인', p: '프로바이더 장애 시 자동으로 대체 모델로 전환. 다운타임 없이 안정적인 서비스를 제공합니다.' },
        { h: '사용량 분석', p: '모델별, 작업별, 시간대별 사용량과 비용을 실시간으로 추적합니다.' },
      ],
      description: '기존 코드를 한 줄도 바꾸지 않고 시작할 수 있습니다. base URL만 변경하면 BSGateway가 나머지를 처리합니다.',
      cases: [
        { name: '스타트업', detail: '한정된 예산으로 최대 성능. 자동 비용 최적화로 LLM 비용 관리' },
        { name: '에이전시', detail: '다양한 클라이언트, 다양한 요구. 프로젝트별 라우팅 정책 설정' },
        { name: '엔터프라이즈', detail: '멀티 프로바이더 전략. 벤더 종속 없는 유연한 인프라' },
      ],
    },
    en: {
      title: 'BSGateway',
      tagline:
        'Stop choosing models. BSGateway routes requests to the best LLM based on cost, quality, and availability.',
      features: [
        { h: 'Smart Routing', p: 'Analyzes request signal to pick GPT-4, Claude, Gemini, or others.' },
        { h: 'Cost Optimization', p: 'Lightweight models for simple tasks, premium for complex. Up to 90% lower cost per token.' },
        { h: 'Fallback Chain', p: 'Auto-switches to a fallback model on provider outages. Zero-downtime service.' },
        { h: 'Usage Analytics', p: 'Real-time usage and cost per model, per task, per time window.' },
      ],
      description: 'Drop-in OpenAI-compatible API. Change the base URL — BSGateway handles the rest.',
      cases: [
        { name: 'Startups', detail: 'Maximum performance on a tight budget via auto cost optimization.' },
        { name: 'Agencies', detail: 'Per-project routing for many clients, many requirements.' },
        { name: 'Enterprises', detail: 'Multi-provider strategy without vendor lock-in.' },
      ],
    },
  },
  bsnexus: {
    accent: '#3b82f6',
    appUrl: 'https://nexus.bsvibe.dev',
    demoUrl: 'https://demo-nexus.bsvibe.dev',
    ko: {
      title: 'BSNexus',
      tagline:
        'AI가 일하고, 당신은 결정합니다. BSNexus는 AI-native company의 지휘 레이어로, 첫 vertical slice는 AI-native software company입니다.',
      features: [
        {
          h: 'Direction',
          p: '프로젝트당 단일 대화. 한 줄 지시가 Request가 되고, 내부 execution run으로 분해되어 작업이 시작됩니다. 에이전트 배정 없음.',
        },
        {
          h: 'Decision Inbox',
          p: '취향 / 범위 / 위험 / 예산 / 배포 승인처럼 founder 판단이 필요한 fork만 inbox에 올라옵니다. 합리적 디폴트는 조용히 처리.',
        },
        {
          h: '검증된 Deliverable',
          p: 'verification 명령, exit code, PR / preview / screenshot / 테스트 결과가 붙은 결과물. proof가 없으면 shipped라고 주장하지 않습니다.',
        },
        {
          h: '컴퓨터에 묶이지 않는 운영',
          p: '모바일 웹/PWA가 첫 computer-independent interface. Slack, 이메일, CLI, 음성은 그 다음 단계로 같은 primitive에 매핑됩니다.',
        },
      ],
      description:
        'BSNexus는 prompt-to-app 빌더가 아니고, Kanban 도구도 아니고, 에이전트 조직도 대시보드도 아닙니다. founder가 회사 일을 낮은 touch time으로 굴릴 수 있게 하는 지휘 레이어입니다.',
      cases: [
        {
          name: '1인 기술 창업자',
          detail: 'IDE에 묶여 모든 prompt를 직접 몰지 않아도, 폰에서 결정만 내리면 회사 일이 흘러갑니다.',
        },
        {
          name: 'BSVibe 내부 도그푸딩',
          detail: 'BSNexus 자체 개발과 시블링 제품 작업이 BSNexus 위에서 돌아갑니다.',
        },
        {
          name: 'AI-native software company',
          detail: 'proof가 붙은 deliverable로 유지보수 가능한 소프트웨어를 운영합니다.',
        },
      ],
    },
    en: {
      title: 'BSNexus',
      tagline:
        'AI handles the work. You make the decisions. BSNexus is the command layer for AI-native companies, starting with the AI-native software company.',
      features: [
        {
          h: 'Direction',
          p: 'One conversation per project. A short instruction becomes a Request, decomposes into internal execution runs, and starts work. No agent assignment.',
        },
        {
          h: 'Decision Inbox',
          p: 'Only forks that need founder judgment — taste, scope, risk, budget, deploy approval — surface as decisions. Sensible defaults stay silent.',
        },
        {
          h: 'Verified Deliverables',
          p: 'Outputs ship with verification command, exit code, and proof refs (PR, preview, screenshot, test result). No proof, no "shipped".',
        },
        {
          h: 'Computer-independent',
          p: 'Mobile web/PWA is the first computer-independent interface. Slack, email, CLI, and voice follow, all mapped to the same primitives.',
        },
      ],
      description:
        'BSNexus is not a prompt-to-app builder, not a Kanban tool, not an agent org-chart dashboard. It is the command layer that lets founders run company work with low touch time.',
      cases: [
        {
          name: 'Technical solo founder',
          detail: 'Resolve decisions from your phone instead of driving every prompt from an IDE.',
        },
        {
          name: 'BSVibe internal dogfooding',
          detail: 'BSNexus development itself and sibling product work runs on BSNexus.',
        },
        {
          name: 'AI-native software company',
          detail: 'Operate maintainable software with proof-attached deliverables, not chat summaries.',
        },
      ],
    },
  },
  bsupervisor: {
    accent: '#f43f5e',
    appUrl: 'https://supervisor.bsvibe.dev',
    demoUrl: 'https://demo-supervisor.bsvibe.dev',
    ko: {
      title: 'BSupervisor',
      tagline: '잠든 사이에도, 묵묵히 지켜보고 있습니다. AI의 모든 행동을 추적하고 검증합니다.',
      features: [
        { h: '실시간 모니터링', p: '모든 AI 호출을 실시간으로 감시하고 이상 징후를 즉시 감지합니다.' },
        { h: '감사 로그', p: '누가, 언제, 어떤 모델에, 어떤 입력을, 어떤 결과를 받았는지 완벽히 기록.' },
        { h: '정책 기반 차단', p: '프롬프트 인젝션, PII 노출, 정책 위반을 자동으로 차단합니다.' },
        { h: '컴플라이언스', p: 'GDPR, HIPAA, SOC 2 요구사항을 지원하는 감사 가능한 인프라.' },
      ],
      description: 'AI의 모든 행동을 추적 가능하고 통제 가능하게 만듭니다. 안전한 AI는 BSupervisor에서 시작합니다.',
      cases: [
        { name: '금융', detail: '규제 요구사항을 충족하는 감사 로그' },
        { name: '의료', detail: 'PII 차단과 HIPAA 컴플라이언스' },
        { name: '엔터프라이즈', detail: '내부 AI 사용 정책 자동 강제' },
      ],
    },
    en: {
      title: 'BSupervisor',
      tagline: 'Watching quietly, even while you sleep. Track and verify every AI action.',
      features: [
        { h: 'Real-time Monitoring', p: 'Live observation of every AI call; anomalies surface instantly.' },
        { h: 'Audit Log', p: 'Who, when, which model, what input, what output — completely recorded.' },
        { h: 'Policy-based Blocking', p: 'Auto-block prompt injection, PII leaks, and policy violations.' },
        { h: 'Compliance', p: 'Auditable infrastructure for GDPR, HIPAA, SOC 2.' },
      ],
      description: 'Make every AI action traceable and controllable. Safe AI starts with BSupervisor.',
      cases: [
        { name: 'Finance', detail: 'Audit logs that meet regulatory requirements.' },
        { name: 'Healthcare', detail: 'PII blocking and HIPAA compliance.' },
        { name: 'Enterprise', detail: 'Auto-enforce internal AI usage policies.' },
      ],
    },
  },
  bsage: {
    accent: '#10b981',
    appUrl: 'https://sage.bsvibe.dev',
    demoUrl: 'https://demo-sage.bsvibe.dev',
    ko: {
      title: 'BSage',
      tagline: '정리하지 않아도, 기억하고 연결해 줍니다. 온톨로지 기반의 지식 비서.',
      features: [
        { h: '온톨로지 그래프', p: '문서, 사람, 개념을 자동으로 연결해 의미 있는 지식 그래프를 구축합니다.' },
        { h: '맥락 인식 검색', p: '키워드 매칭이 아닌 의미 기반 검색으로 필요한 정보를 정확히 찾습니다.' },
        { h: '플러그인 생태계', p: 'Slack, Notion, Drive 등 기존 도구와 자연스럽게 통합.' },
        { h: '프라이빗 운영', p: '데이터는 당신 통제 하에. 자체 인프라 또는 BSage Cloud 선택.' },
      ],
      description: 'BSage는 흩어진 정보를 의미로 연결해, 필요한 순간에 필요한 지식을 꺼내줍니다.',
      cases: [
        { name: '연구자', detail: '논문, 노트, 메모를 자동으로 연결하고 검색' },
        { name: '제품팀', detail: '디자인 결정, 회의록, 사양을 한 곳에서 추적' },
        { name: '컨설턴트', detail: '여러 클라이언트의 컨텍스트를 분리해 관리' },
      ],
    },
    en: {
      title: 'BSage',
      tagline: 'Remembers and connects — no organizing needed. Ontology-based knowledge assistant.',
      features: [
        { h: 'Ontology Graph', p: 'Auto-link documents, people, and concepts into a meaningful knowledge graph.' },
        { h: 'Context-aware Search', p: 'Semantic, not keyword. Find what you need by meaning.' },
        { h: 'Plugin Ecosystem', p: 'Native integrations with Slack, Notion, Drive, and more.' },
        { h: 'Private Deployment', p: 'Your data, your control. Self-host or use BSage Cloud.' },
      ],
      description: 'BSage links scattered information by meaning, surfacing the right knowledge at the right moment.',
      cases: [
        { name: 'Researchers', detail: 'Auto-link papers, notes, and memos for instant retrieval.' },
        { name: 'Product teams', detail: 'Track design decisions, meeting notes, and specs in one place.' },
        { name: 'Consultants', detail: 'Keep multiple clients separated with full context.' },
      ],
    },
  },
};

export function generateStaticParams() {
  const langs: Locale[] = ['ko', 'en'];
  const ids: ProductId[] = ['bsgateway', 'bsnexus', 'bsupervisor', 'bsage'];
  return langs.flatMap((lang) => ids.map((id) => ({ lang, id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  const locale = isLocale(lang) ? lang : 'ko';
  const data = productCopy[id as ProductId];
  if (!data) return {};
  const c = data[locale];
  return {
    title: c.title,
    description: c.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  const locale = isLocale(lang) ? lang : 'ko';
  const data = productCopy[id as ProductId];
  if (!data) notFound();
  const c = data[locale];
  return (
    <article
      style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '32px 24px 120px',
      }}
    >
      <header style={{ marginBottom: 48 }}>
        <h1
          style={{
            color: data.accent,
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            marginBottom: 12,
          }}
        >
          {c.title}
        </h1>
        <p
          style={{
            color: '#a8adc6',
            fontSize: '1.125rem',
            lineHeight: 1.7,
            marginBottom: 24,
          }}
        >
          {c.tagline}
        </p>
        <a
          href={data.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            borderRadius: 10,
            backgroundColor: data.accent,
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.875rem',
            textDecoration: 'none',
          }}
        >
          {locale === 'en' ? 'Try the demo →' : '데모 체험하기 →'}
        </a>
        <a
          href={data.appUrl}
          style={{
            display: 'inline-block',
            marginLeft: 12,
            padding: '10px 20px',
            borderRadius: 10,
            border: '1px solid #2a2d42',
            color: '#8187a8',
            fontWeight: 500,
            fontSize: '0.875rem',
            textDecoration: 'none',
          }}
        >
          {locale === 'en' ? `Open ${c.title} →` : `${c.title} 열기 →`}
        </a>
        <Link
          href={`/${locale}/${id}/getting-started`}
          style={{
            display: 'inline-block',
            marginLeft: 12,
            padding: '10px 20px',
            borderRadius: 10,
            border: '1px solid #2a2d42',
            color: '#8187a8',
            fontWeight: 500,
            fontSize: '0.875rem',
            textDecoration: 'none',
          }}
        >
          {locale === 'en' ? 'Read the docs →' : '문서 보기 →'}
        </Link>
      </header>

      <h2
        style={{
          color: '#f2f3f7',
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: 20,
        }}
      >
        {locale === 'en' ? 'Core Features' : '핵심 기능'}
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 14,
          marginBottom: 48,
        }}
      >
        {c.features.map((f) => (
          <div
            key={f.h}
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
                fontSize: '1rem',
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              {f.h}
            </h3>
            <p
              style={{
                color: '#8187a8',
                fontSize: '0.875rem',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {f.p}
            </p>
          </div>
        ))}
      </div>

      <section style={{ marginBottom: 48 }}>
        <p style={{ color: '#a8adc6', fontSize: '1rem', lineHeight: 1.8 }}>
          {c.description}
        </p>
      </section>

      <h2
        style={{
          color: '#f2f3f7',
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: 16,
        }}
      >
        {locale === 'en' ? 'Use Cases' : '사용 사례'}
      </h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {c.cases.map((cs) => (
          <li
            key={cs.name}
            style={{
              padding: '14px 0',
              borderBottom: '1px solid #1e2033',
              color: '#a8adc6',
              fontSize: '1rem',
            }}
          >
            <strong style={{ color: '#f2f3f7', marginRight: 8 }}>{cs.name}</strong>—{' '}
            {cs.detail}
          </li>
        ))}
      </ul>
    </article>
  );
}
