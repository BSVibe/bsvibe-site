import { headers } from 'next/headers';
import {
  validateSession,
  getSessionAccessToken,
  AUTH_API_URL,
} from '@/lib/auth.server';
import { isLocale } from '@/lib/i18n';
import ServiceAccountsList from '@/components/account/ServiceAccountsList';

export const dynamic = 'force-dynamic';

const C = {
  ko: {
    h1: '서비스 계정',
    desc: 'CI/CD · 서버 자동화 용 OAuth client_credentials 자격 증명을 발급/회수합니다. client_id + client_secret 으로 /oauth/token 에서 액세스 토큰을 교환하세요.',
    loadErr: '서비스 계정 목록을 불러올 수 없습니다',
    list: {
      empty: '발급된 서비스 계정이 없습니다.',
      create: '새 서비스 계정',
      revoke: '회수',
      revokeConfirm:
        '이 서비스 계정을 회수합니다. 즉시 비활성화되며 복구할 수 없습니다.',
      revokeFailed: '회수 실패',
      createFailed: '발급 실패',
      formNamePlaceholder: '이름 (예: github-actions-ci)',
      formAudienceLabel: 'Audience (콤마 구분)',
      formScopesLabel: 'Scopes (스페이스 구분)',
      formSubmit: '발급',
      formCancel: '취소',
      newSecretH: '서비스 계정이 발급되었습니다',
      newSecretWarn:
        '⚠️ client_secret 은 이 화면을 떠나면 다시 볼 수 없습니다. 안전한 곳에 즉시 저장하세요.',
      copy: '복사',
      copied: '✓ 복사됨',
      cols: {
        clientId: 'Client ID',
        name: '이름',
        scopes: 'Scopes',
        created: '생성일',
        status: '상태',
      },
      statusActive: '활성',
      statusRevoked: '회수됨',
    },
  },
  en: {
    h1: 'Service accounts',
    desc: 'OAuth client_credentials credentials for CI/CD and server-side automation. Exchange the client_id + client_secret at /oauth/token for an access token.',
    loadErr: 'Could not load service accounts',
    list: {
      empty: 'No service accounts yet.',
      create: 'New service account',
      revoke: 'Revoke',
      revokeConfirm:
        'Revoke this service account? It is disabled immediately and cannot be recovered.',
      revokeFailed: 'Revoke failed',
      createFailed: 'Issue failed',
      formNamePlaceholder: 'Name (e.g. github-actions-ci)',
      formAudienceLabel: 'Audience (comma-separated)',
      formScopesLabel: 'Scopes (space-separated)',
      formSubmit: 'Issue',
      formCancel: 'Cancel',
      newSecretH: 'Service account issued',
      newSecretWarn:
        '⚠️ The client_secret is shown only once. Copy it somewhere safe now.',
      copy: 'Copy',
      copied: '✓ Copied',
      cols: {
        clientId: 'Client ID',
        name: 'Name',
        scopes: 'Scopes',
        created: 'Created',
        status: 'Status',
      },
      statusActive: 'Active',
      statusRevoked: 'Revoked',
    },
  },
} as const;

interface ClientRow {
  client_id: string;
  description: string | null;
  client_type: string;
  tenant_id: string;
  allowed_audiences: string[];
  allowed_scopes: string[];
  created_at: string;
  revoked_at: string | null;
  last_used_at: string | null;
}

async function fetchInitialClients(
  cookieHeader: string | null,
): Promise<{ clients: ClientRow[]; error: string | null }> {
  const { accessToken } = await getSessionAccessToken(cookieHeader);
  if (!accessToken) return { clients: [], error: 'unauthenticated' };
  try {
    const res = await fetch(`${AUTH_API_URL}/api/oauth/clients`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    });
    if (!res.ok) {
      return { clients: [], error: `HTTP ${res.status}` };
    }
    const data = (await res.json()) as { clients?: ClientRow[] };
    return { clients: data.clients ?? [], error: null };
  } catch (err) {
    return {
      clients: [],
      error: err instanceof Error ? err.message : 'unknown',
    };
  }
}

export default async function ServiceAccountsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'ko';
  const c = C[locale];

  const cookieHeader = (await headers()).get('cookie');
  const { user } = await validateSession(cookieHeader);
  if (!user) return null;

  const { clients, error } = await fetchInitialClients(cookieHeader);

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

      <ServiceAccountsList
        initial={clients}
        initialError={error ? `${c.loadErr}: ${error}` : null}
        strings={c.list}
      />
    </>
  );
}
