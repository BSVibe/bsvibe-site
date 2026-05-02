import { headers } from 'next/headers';
import { validateSession } from '@/lib/auth.server';
import { isLocale } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'ko';
  const cookieHeader = (await headers()).get('cookie');
  const { user } = await validateSession(cookieHeader);
  if (!user) return null;

  const labels =
    locale === 'en'
      ? {
          h1: 'Profile',
          desc: 'View account information.',
          email: 'Email',
          uid: 'User ID',
          tenant: 'Tenant ID',
          role: 'Role',
          changePw: 'Change password →',
          danger: 'Delete account',
          dangerDesc:
            'Deleting your account permanently erases all data within 30 days.',
          dangerCta: 'Send a deletion request',
        }
      : {
          h1: '프로필',
          desc: '계정 정보를 확인합니다.',
          email: '이메일',
          uid: '사용자 ID',
          tenant: '테넌트 ID',
          role: '역할',
          changePw: '비밀번호 변경 →',
          danger: '계정 삭제',
          dangerDesc: '계정을 삭제하면 모든 데이터가 30일 이내에 영구 삭제됩니다.',
          dangerCta: '삭제 요청 보내기',
        };

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
        {labels.h1}
      </h1>
      <p style={{ color: '#8187a8', fontSize: '0.9375rem', marginBottom: 32 }}>
        {labels.desc}
      </p>

      <div
        style={{
          padding: 24,
          borderRadius: 12,
          border: '1px solid #2a2d42',
          backgroundColor: '#111218',
          marginBottom: 32,
        }}
      >
        <dl style={{ display: 'flex', flexDirection: 'column', gap: 16, margin: 0 }}>
          {(
            [
              [labels.email, user.email],
              [labels.uid, user.id, true],
              [labels.tenant, user.tenantId || '—', true],
              [labels.role, user.role],
            ] as [string, string, boolean?][]
          ).map(([k, v, code]) => (
            <div
              key={k}
              style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gap: 16,
                alignItems: 'baseline',
              }}
            >
              <dt
                style={{
                  fontSize: '0.8125rem',
                  color: '#5a5f7d',
                  fontWeight: 500,
                }}
              >
                {k}
              </dt>
              <dd
                style={{
                  color: '#e4e6ee',
                  fontSize: '0.9375rem',
                  margin: 0,
                }}
              >
                {code ? (
                  <code
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      backgroundColor: 'rgba(99,102,241,0.08)',
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: '0.8125rem',
                      color: '#818cf8',
                    }}
                  >
                    {v}
                  </code>
                ) : (
                  v
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div
          style={{
            marginTop: 24,
            paddingTop: 20,
            borderTop: '1px solid #1e2033',
          }}
        >
          <a
            href="https://auth.bsvibe.dev/account"
            style={{
              color: '#818cf8',
              fontSize: '0.875rem',
              textDecoration: 'none',
            }}
          >
            {labels.changePw}
          </a>
        </div>
      </div>

      <div
        style={{
          padding: 24,
          borderRadius: 12,
          border: '1px solid rgba(244,63,94,0.2)',
          backgroundColor: 'rgba(244,63,94,0.04)',
        }}
      >
        <h2
          style={{
            color: '#fb7185',
            fontSize: '1rem',
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          {labels.danger}
        </h2>
        <p
          style={{
            color: '#8187a8',
            fontSize: '0.875rem',
            marginBottom: 16,
          }}
        >
          {labels.dangerDesc}
        </p>
        <a
          href="mailto:contact@bsvibe.dev?subject=Account%20deletion%20request"
          style={{
            display: 'inline-block',
            padding: '8px 16px',
            borderRadius: 6,
            border: '1px solid rgba(244,63,94,0.3)',
            color: '#fb7185',
            fontSize: '0.8125rem',
            textDecoration: 'none',
          }}
        >
          {labels.dangerCta}
        </a>
      </div>
    </>
  );
}
