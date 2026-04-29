import type { Metadata } from 'next';
import { isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: '문의',
  description: 'BSVibe 팀에 문의하세요',
};

const copy = {
  ko: {
    title: '문의하기',
    lead: '제품, 협력, 채용에 대한 모든 문의를 환영합니다.',
    cards: [
      ['📧', '이메일', '가장 빠른 응답을 위해 이메일로 문의해 주세요.', 'mailto:contact@bsvibe.dev', 'contact@bsvibe.dev'],
      ['💼', '비즈니스', '엔터프라이즈 플랜, 파트너십, 컨설팅 문의.', 'mailto:contact@bsvibe.dev?subject=비즈니스 문의', '비즈니스 문의 보내기 →'],
      ['🐛', '버그 신고', '발견한 문제를 알려주세요. 빠르게 수정하겠습니다.', 'mailto:contact@bsvibe.dev?subject=버그 신고', '버그 신고하기 →'],
      ['💡', '피드백', '제품에 대한 의견과 제안을 들려주세요.', 'mailto:contact@bsvibe.dev?subject=피드백', '피드백 보내기 →'],
    ],
    channels: '다른 채널',
    response: '응답 시간',
    responseV: '평일 24시간 이내',
  },
  en: {
    title: 'Contact',
    lead: 'Questions about products, partnership, or hiring — all welcome.',
    cards: [
      ['📧', 'Email', 'For the fastest response.', 'mailto:contact@bsvibe.dev', 'contact@bsvibe.dev'],
      ['💼', 'Business', 'Enterprise plans, partnerships, consulting.', 'mailto:contact@bsvibe.dev?subject=Business inquiry', 'Send a business inquiry →'],
      ['🐛', 'Bug report', "Tell us what's broken; we'll fix it fast.", 'mailto:contact@bsvibe.dev?subject=Bug report', 'Report a bug →'],
      ['💡', 'Feedback', 'Share thoughts and ideas.', 'mailto:contact@bsvibe.dev?subject=Feedback', 'Send feedback →'],
    ],
    channels: 'Other channels',
    response: 'Response time',
    responseV: 'Within 24 business hours',
  },
} as const;

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'ko';
  const c = copy[locale];
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '16px 24px 120px' }}>
      <header style={{ textAlign: 'center', marginBottom: 64 }}>
        <h1
          style={{
            color: '#f2f3f7',
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            marginBottom: 16,
          }}
        >
          {c.title}
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#8187a8' }}>{c.lead}</p>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 14,
          marginBottom: 64,
        }}
      >
        {c.cards.map(([icon, h, p, href, cta]) => (
          <div
            key={h}
            style={{
              padding: 28,
              borderRadius: 14,
              border: '1px solid #2a2d42',
              backgroundColor: '#111218',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: 12 }}>{icon}</div>
            <h2
              style={{
                color: '#f2f3f7',
                fontSize: '1.125rem',
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              {h}
            </h2>
            <p
              style={{
                color: '#8187a8',
                fontSize: '0.875rem',
                lineHeight: 1.6,
                marginBottom: 16,
              }}
            >
              {p}
            </p>
            <a
              href={href}
              style={{
                color: '#818cf8',
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              {cta}
            </a>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: 32,
          borderRadius: 12,
          border: '1px solid #1e2033',
          backgroundColor: 'rgba(99,102,241,0.04)',
        }}
      >
        <h2
          style={{
            color: '#f2f3f7',
            fontSize: '1rem',
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          {c.channels}
        </h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ color: '#a8adc6', fontSize: '0.875rem', marginBottom: 8 }}>
            <strong style={{ color: '#e4e6ee', marginRight: 8 }}>GitHub</strong>:{' '}
            <a
              href="https://github.com/BSVibe"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#818cf8' }}
            >
              github.com/BSVibe
            </a>
          </li>
          <li style={{ color: '#a8adc6', fontSize: '0.875rem', marginBottom: 8 }}>
            <strong style={{ color: '#e4e6ee', marginRight: 8 }}>{c.response}</strong>:{' '}
            {c.responseV}
          </li>
        </ul>
      </div>
    </div>
  );
}
