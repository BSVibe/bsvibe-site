import Link from 'next/link';
import { headers } from 'next/headers';
import { validateSession } from '@/lib/auth.server';
import { isLocale } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export default async function AccountIndex({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'ko';
  const cookieHeader = (await headers()).get('cookie');
  const { user } = await validateSession(cookieHeader);
  // Layout already redirected if no user; this is just for type safety.
  if (!user) return null;

  const cards =
    locale === 'en'
      ? [
          { href: `/${locale}/account/profile`, h: 'Profile', p: 'Manage your account information.' },
          { href: `/${locale}/account/billing`, h: 'Billing', p: 'Manage subscription and payment methods.' },
          { href: `/${locale}/account/team`, h: 'Team', p: 'Invite teammates and manage roles.' },
        ]
      : [
          { href: `/${locale}/account/profile`, h: '프로필', p: '계정 정보를 관리합니다' },
          { href: `/${locale}/account/billing`, h: '결제', p: '구독과 결제 수단을 관리합니다' },
          { href: `/${locale}/account/team`, h: '팀', p: '팀원을 초대하고 권한을 관리합니다' },
        ];

  return (
    <>
      <h1
        style={{
          color: '#f2f3f7',
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: 8,
          letterSpacing: '-0.02em',
        }}
      >
        {locale === 'en' ? `Welcome, ${user.email}` : `안녕하세요, ${user.email}`}
      </h1>
      <p style={{ color: '#8187a8', fontSize: '0.9375rem', marginBottom: 32 }}>
        {locale === 'en'
          ? 'Welcome to your BSVibe dashboard.'
          : 'BSVibe 대시보드에 오신 것을 환영합니다.'}
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 12,
        }}
      >
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            style={{
              padding: 20,
              borderRadius: 12,
              border: '1px solid #2a2d42',
              backgroundColor: '#111218',
              textDecoration: 'none',
            }}
          >
            <h3
              style={{
                color: '#f2f3f7',
                fontSize: '1rem',
                fontWeight: 600,
                margin: '0 0 4px',
              }}
            >
              {card.h}
            </h3>
            <p style={{ color: '#5a5f7d', fontSize: '0.8125rem', margin: 0 }}>
              {card.p}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
