'use client';

import { useCallback, useState } from 'react';

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

interface Strings {
  empty: string;
  revoke: string;
  revokeConfirm: string;
  revokeFailed: string;
  createFailed: string;
  cols: { name: string; created: string; lastUsed: string; status: string };
  statusActive: string;
  statusRevoked: string;
}

interface Props {
  initial: TokenRow[];
  initialError: string | null;
  strings: Strings;
}

/*
 * Round 5 (OAuth on-connect): PATs are no longer self-issued from this
 * dashboard. Claude Code (and any MCP client) obtains them via the
 * OAuth 2.0 authorization_code + PKCE flow against auth.bsvibe.dev.
 * This page now only lists + revokes tokens that already exist
 * (whether issued via OAuth, device-flow, or the legacy bsvibe-cli).
 * Service-account / API-client provisioning (bsv_sk_* via
 * client_credentials) is a planned follow-up UI.
 */
export default function TokensList({ initial, initialError, strings }: Props) {
  const [rows, setRows] = useState<TokenRow[]>(initial);
  const [error, setError] = useState<string | null>(initialError);

  const refresh = useCallback(async () => {
    const res = await fetch('/api/auth/tokens?type=pat', { cache: 'no-store' });
    if (!res.ok) {
      setError(strings.createFailed);
      return;
    }
    const data = (await res.json()) as { tokens?: TokenRow[] };
    setRows(data.tokens ?? []);
  }, [strings.createFailed]);

  const onRevoke = useCallback(
    async (id: string) => {
      if (!confirm(strings.revokeConfirm)) return;
      try {
        const res = await fetch(
          `/api/auth/tokens/${encodeURIComponent(id)}`,
          { method: 'DELETE' },
        );
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `HTTP ${res.status}`);
        }
        await refresh();
      } catch (err) {
        setError(
          `${strings.revokeFailed}: ${err instanceof Error ? err.message : 'unknown'}`,
        );
      }
    },
    [refresh, strings.revokeConfirm, strings.revokeFailed],
  );

  const dateFmt = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
      {error && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 8,
            marginBottom: 16,
            fontSize: '0.875rem',
            backgroundColor: 'rgba(244,63,94,0.08)',
            border: '1px solid rgba(244,63,94,0.2)',
            color: '#fb7185',
          }}
        >
          {error}
        </div>
      )}

      {rows.length === 0 ? (
        <div
          style={{
            padding: 32,
            borderRadius: 12,
            border: '1px dashed #2a2d42',
            textAlign: 'center',
            color: '#5a5f7d',
            fontSize: '0.875rem',
          }}
        >
          {strings.empty}
        </div>
      ) : (
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
              {[
                strings.cols.name,
                strings.cols.created,
                strings.cols.lastUsed,
                strings.cols.status,
                '',
              ].map((h, i) => (
                <th
                  key={i}
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
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => {
              const revoked = t.revoked_at !== null;
              return (
                <tr key={t.id}>
                  <td
                    style={{
                      padding: '12px 16px',
                      fontSize: '0.875rem',
                      color: revoked ? '#5a5f7d' : '#e4e6ee',
                    }}
                  >
                    {t.name ?? '—'}
                  </td>
                  <td style={cell}>{dateFmt.format(new Date(t.created_at))}</td>
                  <td style={cell}>
                    {t.last_used_at
                      ? dateFmt.format(new Date(t.last_used_at))
                      : '—'}
                  </td>
                  <td
                    style={{
                      ...cell,
                      color: revoked ? '#fb7185' : '#34d399',
                      fontWeight: 600,
                    }}
                  >
                    {revoked ? strings.statusRevoked : strings.statusActive}
                  </td>
                  <td style={{ padding: '8px 16px', textAlign: 'right' }}>
                    {!revoked && (
                      <button
                        type="button"
                        onClick={() => onRevoke(t.id)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 6,
                          border: '1px solid rgba(244,63,94,0.3)',
                          background: 'transparent',
                          color: '#fb7185',
                          fontSize: '0.8125rem',
                          cursor: 'pointer',
                        }}
                      >
                        {strings.revoke}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

const cell: React.CSSProperties = {
  padding: '12px 16px',
  fontSize: '0.875rem',
  color: '#a8adc6',
};
