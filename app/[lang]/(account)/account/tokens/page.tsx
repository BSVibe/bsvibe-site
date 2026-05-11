import { headers } from 'next/headers';
import { validateSession, getSessionAccessToken, AUTH_API_URL } from '@/lib/auth.server';
import { isLocale } from '@/lib/i18n';
import TokensList from '@/components/account/TokensList';

export const dynamic = 'force-dynamic';

const C = {
  ko: {
    h1: '토큰 관리',
    desc: 'CLI · API · 자동화 워크플로 용 PAT(개인 액세스 토큰)를 발급/관리합니다.',
    loadErr: '토큰 목록을 불러올 수 없습니다',
    list: {
      empty: '발급된 토큰이 없습니다. "새 토큰 발급" 으로 시작하세요.',
      create: '새 토큰 발급',
      revoke: '취소',
      revokeConfirm: '정말 이 토큰을 취소하시겠습니까? 즉시 비활성화되며 복구할 수 없습니다.',
      revokeFailed: '토큰 취소 실패',
      createFailed: '토큰 발급 실패',
      formNamePlaceholder: '토큰 이름 (예: claude-code-laptop)',
      formScopesLabel: 'Scopes (스페이스 구분)',
      formAudienceLabel: 'Audience (콤마 구분)',
      formExpiresLabel: '만료',
      formExpiresHelp: '기본 30일. CLI 자동화는 30~90일이 일반적, 일회성 작업은 1시간/1일을 권장합니다.',
      formSubmit: '발급',
      formCancel: '취소',
      newTokenH: '토큰이 발급되었습니다',
      newTokenWarn: '⚠️ 이 화면을 떠나면 다시 볼 수 없습니다. 안전한 곳에 즉시 저장하세요.',
      copy: '복사',
      copied: '✓ 복사됨',
      cols: { name: '이름', created: '생성일', lastUsed: '마지막 사용', status: '상태' },
      statusActive: '활성',
      statusRevoked: '취소됨',
      expiresPresets: {
        oneHour: '1시간',
        oneDay: '1일',
        sevenDays: '7일',
        thirtyDays: '30일',
        ninetyDays: '90일',
        custom: '직접 선택',
        customDateLabel: '만료일 (최대 1년)',
        noExpiry: '만료 없음',
        noExpiryWarning:
          '⚠️ 이 키는 만료되지 않습니다.\n유출 시 수동 revoke 이외 사용자 안전장치가 없습니다.\n자동화/서버용 키에만 사용하세요.',
      },
    },
  },
  en: {
    h1: 'Tokens',
    desc: 'Issue and manage Personal Access Tokens (PATs) for the CLI, API, and automation.',
    loadErr: 'Could not load tokens',
    list: {
      empty: 'No tokens yet. Click "New token" to start.',
      create: 'New token',
      revoke: 'Revoke',
      revokeConfirm: 'Revoke this token? It is disabled immediately and cannot be recovered.',
      revokeFailed: 'Revoke failed',
      createFailed: 'Issue failed',
      formNamePlaceholder: 'Token name (e.g. claude-code-laptop)',
      formScopesLabel: 'Scopes (space-separated)',
      formAudienceLabel: 'Audience (comma-separated)',
      formExpiresLabel: 'Expires',
      formExpiresHelp: 'Default 30 days. CLI automation typically wants 30–90 days; one-off tasks fit 1 hour or 1 day.',
      formSubmit: 'Issue',
      formCancel: 'Cancel',
      newTokenH: 'Token issued',
      newTokenWarn: '⚠️ This is the only time you will see this secret. Copy it somewhere safe now.',
      copy: 'Copy',
      copied: '✓ Copied',
      cols: { name: 'Name', created: 'Created', lastUsed: 'Last used', status: 'Status' },
      statusActive: 'Active',
      statusRevoked: 'Revoked',
      expiresPresets: {
        oneHour: '1 hour',
        oneDay: '1 day',
        sevenDays: '7 days',
        thirtyDays: '30 days',
        ninetyDays: '90 days',
        custom: 'Custom',
        customDateLabel: 'Expires on (up to 1 year)',
        noExpiry: 'No expiry',
        noExpiryWarning:
          '⚠️ This key never expires.\nIf leaked, manual revoke is the only safety net.\nUse only for automation / server-side keys.',
      },
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
