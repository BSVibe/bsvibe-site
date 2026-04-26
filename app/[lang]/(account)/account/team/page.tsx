import { headers } from 'next/headers';
import { validateSession } from '@/lib/auth.server';
import { isLocale } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export default async function TeamPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'ko';
  const cookieHeader = (await headers()).get('cookie');
  const { user } = await validateSession(cookieHeader);
  if (!user) return null;

  const c =
    locale === 'en'
      ? {
          h1: 'Team',
          desc: 'Invite teammates and manage roles.',
          memberH: 'Members',
          email: 'Email',
          role: 'Role',
          you: 'YOU',
          inviteH: 'Invite teammates',
          proNote: 'Team collaboration is available on the Pro plan.',
          comingH: 'Team invites coming soon',
          comingP:
            'Single-user mode for now. Need team features? Contact ',
        }
      : {
          h1: '팀 관리',
          desc: '팀원을 초대하고 권한을 관리합니다.',
          memberH: '현재 멤버',
          email: '이메일',
          role: '역할',
          you: 'YOU',
          inviteH: '팀원 초대',
          proNote: '팀 협업 기능은 Pro 플랜에서 제공됩니다.',
          comingH: '팀원 초대 기능 준비 중',
          comingP: '현재 단일 사용자 모드로 동작합니다. 팀 기능이 필요하면 ',
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
        {c.h1}
      </h1>
      <p style={{ color: '#8187a8', fontSize: '0.9375rem', marginBottom: 32 }}>
        {c.desc}
      </p>

      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            color: '#f2f3f7',
            fontSize: '1rem',
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          {c.memberH}
        </h2>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            border: '1px solid #2a2d42',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#111218' }}>
              <th
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  borderBottom: '1px solid #1e2033',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: '#5a5f7d',
                  fontWeight: 600,
                }}
              >
                {c.email}
              </th>
              <th
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  borderBottom: '1px solid #1e2033',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: '#5a5f7d',
                  fontWeight: 600,
                }}
              >
                {c.role}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  padding: '12px 16px',
                  fontSize: '0.875rem',
                  color: '#a8adc6',
                }}
              >
                {user.email}{' '}
                <span
                  style={{
                    display: 'inline-block',
                    marginLeft: 8,
                    padding: '1px 6px',
                    borderRadius: 4,
                    backgroundColor: 'rgba(99,102,241,0.12)',
                    color: '#818cf8',
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                  }}
                >
                  {c.you}
                </span>
              </td>
              <td
                style={{
                  padding: '12px 16px',
                  fontSize: '0.875rem',
                  color: '#a8adc6',
                }}
              >
                {user.role}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2
          style={{
            color: '#f2f3f7',
            fontSize: '1rem',
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          {c.inviteH}
        </h2>
        <p style={{ color: '#8187a8', fontSize: '0.875rem', marginBottom: 16 }}>
          {c.proNote}
        </p>
        <div
          style={{
            padding: 32,
            borderRadius: 12,
            border: '1px dashed #2a2d42',
            textAlign: 'center',
          }}
        >
          <p style={{ color: '#5a5f7d', fontSize: '0.875rem', margin: 0 }}>
            {c.comingH}
          </p>
          <p
            style={{
              color: '#5a5f7d',
              fontSize: '0.8125rem',
              marginTop: 8,
            }}
          >
            {c.comingP}
            <a
              href="mailto:contact@bsvibe.dev"
              style={{ color: '#818cf8', textDecoration: 'none' }}
            >
              contact@bsvibe.dev
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
