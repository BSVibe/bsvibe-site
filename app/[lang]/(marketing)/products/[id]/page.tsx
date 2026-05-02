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

const productCopy: Record<ProductId, { ko: ProductCopy; en: ProductCopy; accent: string; appUrl: string }> = {
  bsgateway: {
    accent: '#f59e0b',
    appUrl: 'https://gateway.bsvibe.dev',
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
    ko: {
      title: 'BSNexus',
      tagline: '아이디어만 던지면, 알아서 만들어집니다. AI 에이전트가 협력해 작업을 완수합니다.',
      features: [
        { h: '에이전트 오케스트레이션', p: '여러 AI 에이전트가 역할을 나누고, 협업하고, 결과를 만들어냅니다.' },
        { h: 'No-code 워크플로우', p: '코딩 없이 복잡한 자동화를 설계하고 실행합니다.' },
        { h: '실시간 협업', p: '팀원과 함께 같은 보드에서 작업하며 진행을 추적합니다.' },
        { h: '확장 가능한 도구', p: 'API, 스크립트, 외부 통합으로 무한 확장.' },
      ],
      description: 'BSNexus는 아이디어를 작업으로, 작업을 결과물로 자동 변환합니다.',
      cases: [
        { name: '제품팀', detail: 'Spec → 디자인 → 구현 → 테스트, 한 흐름으로 자동화' },
        { name: '리서처', detail: '문헌 수집, 요약, 분석을 동시에 진행' },
        { name: '운영팀', detail: '반복 업무를 에이전트에게 맡기고 본업에 집중' },
      ],
    },
    en: {
      title: 'BSNexus',
      tagline: 'Throw an idea in; AI agents collaborate to deliver. Project management for AI-native work.',
      features: [
        { h: 'Agent Orchestration', p: 'Multiple agents split roles, collaborate, and ship results.' },
        { h: 'No-code Workflows', p: 'Design complex automation without writing code.' },
        { h: 'Real-time Collaboration', p: 'Work alongside teammates on the same board.' },
        { h: 'Extensible Tools', p: 'APIs, scripts, integrations — extend without limits.' },
      ],
      description: 'BSNexus turns ideas into tasks, tasks into deliverables — automatically.',
      cases: [
        { name: 'Product teams', detail: 'Spec → design → build → test in one continuous flow.' },
        { name: 'Researchers', detail: 'Run literature collection, summarization, and analysis in parallel.' },
        { name: 'Ops teams', detail: 'Hand recurring work to agents; focus on what only humans do.' },
      ],
    },
  },
  bsupervisor: {
    accent: '#f43f5e',
    appUrl: 'https://supervisor.bsvibe.dev',
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
          href={data.appUrl}
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
