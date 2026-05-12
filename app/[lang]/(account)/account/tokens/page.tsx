import { headers } from 'next/headers';
import { validateSession, getSessionAccessToken, AUTH_API_URL } from '@/lib/auth.server';
import { isLocale } from '@/lib/i18n';
import TokensList from '@/components/account/TokensList';

export const dynamic = 'force-dynamic';

const C = {
  ko: {
    h1: '토큰 관리',
    desc: 'Claude Code · CLI · 자동화 워크플로의 PAT(개인 액세스 토큰) 목록 및 회수. 새 토큰은 OAuth(authorization_code + PKCE) 흐름으로 발급됩니다.',
    loadErr: '토큰 목록을 불러올 수 없습니다',
    list: {
      empty: '발급된 토큰이 없습니다.',
      revoke: '취소',
      revokeConfirm: '정말 이 토큰을 취소하시겠습니까? 즉시 비활성화되며 복구할 수 없습니다.',
      revokeFailed: '토큰 취소 실패',
      createFailed: '토큰 목록 갱신 실패',
      cols: { name: '이름', created: '생성일', lastUsed: '마지막 사용', status: '상태' },
      statusActive: '활성',
      statusRevoked: '취소됨',
    },
  },
  en: {
    h1: 'Tokens',
    desc: 'List + revoke PATs for Claude Code / CLI / automation. New tokens are now issued via the OAuth (authorization_code + PKCE) flow.',
    loadErr: 'Could not load tokens',
    list: {
      empty: 'No tokens yet.',
      revoke: 'Revoke',
      revokeConfirm: 'Revoke this token? It is disabled immediately and cannot be recovered.',
      revokeFailed: 'Revoke failed',
      createFailed: 'Token list refresh failed',
      cols: { name: 'Name', created: 'Created', lastUsed: 'Last used', status: 'Status' },
      statusActive: 'Active',
      statusRevoked: 'Revoked',
    },
  },
} as const;

interface TokenRow {
  id: string;
  name: string | null;
  type: 'pat' | 'api_key';
  audience?: string[] | null;
  scopes?: string[] | null;
  created_at: string;
  expires_at: string | null;
  last_used_at: string | null;
  revoked_at: string | null;
}

async function fetchInitialTokens(
  cookieHeader: string | null,
): Promise<{ tokens: TokenRow[]; error: string | null }> {
  const { accessToken } = await getSessionAccessToken(cookieHeader);
  if (!accessToken) return { tokens: [], error: 'unauthenticated' };
  try {
    const res = await fetch(`${AUTH_API_URL}/api/tokens?type=pat`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    });
    if (!res.ok) {
      return { tokens: [], error: `HTTP ${res.status}` };
    }
    const data = (await res.json()) as { tokens?: TokenRow[] };
    return { tokens: data.tokens ?? [], error: null };
  } catch (err) {
    return {
      tokens: [],
      error: err instanceof Error ? err.message : 'unknown',
    };
  }
}

export default async function TokensPage({
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

  const { tokens, error } = await fetchInitialTokens(cookieHeader);

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

      <TokensList
        initial={tokens}
        initialError={error ? `${c.loadErr}: ${error}` : null}
        strings={c.list}
      />
    </>
  );
}
