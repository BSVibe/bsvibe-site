'use client';

import { useCallback, useState } from 'react';

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

interface IssuedClient {
  client_id: string;
  client_secret: string;
  name: string;
}

interface Strings {
  empty: string;
  create: string;
  revoke: string;
  revokeConfirm: string;
  revokeFailed: string;
  createFailed: string;
  formNamePlaceholder: string;
  formAudienceLabel: string;
  formScopesLabel: string;
  formSubmit: string;
  formCancel: string;
  newSecretH: string;
  newSecretWarn: string;
  copy: string;
  copied: string;
  cols: {
    clientId: string;
    name: string;
    scopes: string;
    created: string;
    status: string;
  };
  statusActive: string;
  statusRevoked: string;
}

const AUDIENCE_DEFAULTS = 'gateway,sage,nexus,supervisor';
const SCOPE_DEFAULTS = 'gateway:* sage:* nexus:* supervisor:*';

interface Props {
  initial: ClientRow[];
  initialError: string | null;
  strings: Strings;
}

export default function ServiceAccountsList({
  initial,
  initialError,
  strings,
}: Props) {
  const [rows, setRows] = useState<ClientRow[]>(initial);
  const [error, setError] = useState<string | null>(initialError);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [issued, setIssued] = useState<IssuedClient | null>(null);

  const refresh = useCallback(async () => {
    const res = await fetch('/api/auth/oauth-clients', { cache: 'no-store' });
    if (!res.ok) {
      setError(strings.createFailed);
      return;
    }
    const data = (await res.json()) as { clients?: ClientRow[] };
    setRows(data.clients ?? []);
  }, [strings.createFailed]);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      setSubmitting(true);
      try {
        const fd = new FormData(e.currentTarget);
        const name = String(fd.get('name') ?? '').trim();
        const audienceRaw = String(fd.get('audience') ?? '').trim();
        const scopeRaw = String(fd.get('scopes') ?? '').trim();
        const allowedAudiences = audienceRaw
          .split(/[\s,]+/)
          .map((s) => s.trim())
          .filter(Boolean);
        const allowedScopes = scopeRaw.split(/\s+/).filter(Boolean);
        const res = await fetch('/api/auth/oauth-clients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name || `svc-${new Date().toISOString().slice(0, 10)}`,
            allowed_audiences: allowedAudiences,
            allowed_scopes: allowedScopes,
          }),
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `HTTP ${res.status}`);
        }
        const data = (await res.json()) as {
          client_id: string;
          client_secret: string;
        };
        setIssued({
          client_id: data.client_id,
          client_secret: data.client_secret,
          name: name || data.client_id,
        });
        setShowForm(false);
        await refresh();
      } catch (err) {
        setError(
          `${strings.createFailed}: ${err instanceof Error ? err.message : 'unknown'}`,
        );
      } finally {
        setSubmitting(false);
      }
    },
    [refresh, strings.createFailed],
  );

  const onRevoke = useCallback(
    async (clientId: string) => {
      if (!confirm(strings.revokeConfirm)) return;
      try {
        const res = await fetch(
          `/api/auth/oauth-clients/${encodeURIComponent(clientId)}`,
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

      {issued && (
        <IssuedSecretBanner
          issued={issued}
          strings={strings}
          onClose={() => setIssued(null)}
        />
      )}

      {!showForm && (
        <div style={{ marginBottom: 16 }}>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            style={btnPrimary}
          >
            {strings.create}
          </button>
        </div>
      )}

      {showForm && (
        <form onSubmit={onSubmit} style={formCard}>
          <Field
            label={strings.formNamePlaceholder}
            input={
              <input
                name="name"
                placeholder={strings.formNamePlaceholder}
                style={inputStyle}
                required
                maxLength={120}
              />
            }
          />
          <Field
            label={strings.formAudienceLabel}
            input={
              <input
                name="audience"
                defaultValue={AUDIENCE_DEFAULTS}
                style={inputStyle}
              />
            }
          />
          <Field
            label={strings.formScopesLabel}
            input={
              <input
                name="scopes"
                defaultValue={SCOPE_DEFAULTS}
                style={inputStyle}
              />
            }
          />
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <button type="submit" disabled={submitting} style={btnPrimary}>
              {submitting ? '...' : strings.formSubmit}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              disabled={submitting}
              style={btnSecondary}
            >
              {strings.formCancel}
            </button>
          </div>
        </form>
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
                strings.cols.clientId,
                strings.cols.name,
                strings.cols.scopes,
                strings.cols.created,
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
            {rows.map((c) => {
              const revoked = c.revoked_at !== null;
              return (
                <tr key={c.client_id}>
                  <td style={{ ...cell, fontFamily: 'ui-monospace, monospace' }}>
                    {c.client_id}
                  </td>
                  <td
                    style={{
                      ...cell,
                      color: revoked ? '#5a5f7d' : '#e4e6ee',
                    }}
                  >
                    {c.description ?? '—'}
                  </td>
                  <td style={cell}>
                    <code style={{ fontSize: '0.75rem', color: '#a8adc6' }}>
                      {(c.allowed_scopes ?? []).join(' ') || '—'}
                    </code>
                  </td>
                  <td style={cell}>{dateFmt.format(new Date(c.created_at))}</td>
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
                        onClick={() => onRevoke(c.client_id)}
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

function IssuedSecretBanner({
  issued,
  strings,
  onClose,
}: {
  issued: IssuedClient;
  strings: Strings;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(issued.client_secret);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // best-effort
    }
  }, [issued.client_secret]);
  return (
    <div
      style={{
        padding: 20,
        borderRadius: 12,
        marginBottom: 24,
        border: '1px solid rgba(99,102,241,0.4)',
        backgroundColor: 'rgba(99,102,241,0.08)',
      }}
    >
      <h3
        style={{
          color: '#f2f3f7',
          fontSize: '1rem',
          fontWeight: 600,
          margin: '0 0 8px',
        }}
      >
        {strings.newSecretH}
      </h3>
      <p
        style={{
          color: '#fbbf24',
          fontSize: '0.8125rem',
          margin: '0 0 12px',
          whiteSpace: 'pre-line',
        }}
      >
        {strings.newSecretWarn}
      </p>
      <div style={{ marginBottom: 8 }}>
        <span
          style={{ fontSize: '0.75rem', color: '#8187a8', fontWeight: 600 }}
        >
          client_id
        </span>
        <div
          style={{
            padding: '8px 12px',
            borderRadius: 6,
            backgroundColor: '#0a0b0f',
            border: '1px solid #1e2033',
            color: '#a8adc6',
            fontSize: '0.8125rem',
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            marginTop: 4,
          }}
        >
          {issued.client_id}
        </div>
      </div>
      <div>
        <span
          style={{ fontSize: '0.75rem', color: '#8187a8', fontWeight: 600 }}
        >
          client_secret
        </span>
        <div
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'stretch',
            flexWrap: 'wrap',
            marginTop: 4,
          }}
        >
          <code
            style={{
              flex: 1,
              minWidth: 240,
              padding: '10px 12px',
              borderRadius: 6,
              backgroundColor: '#0a0b0f',
              border: '1px solid #1e2033',
              color: '#a8adc6',
              fontSize: '0.8125rem',
              fontFamily: 'ui-monospace, SFMono-Regular, monospace',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
            }}
          >
            {issued.client_secret}
          </code>
          <button type="button" onClick={onCopy} style={btnSecondary}>
            {copied ? strings.copied : strings.copy}
          </button>
          <button type="button" onClick={onClose} style={btnSecondary}>
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  input,
}: {
  label: string;
  input: React.ReactNode;
}) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: '0.75rem', color: '#8187a8', fontWeight: 600 }}>
        {label}
      </span>
      {input}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: 6,
  border: '1px solid #2a2d42',
  backgroundColor: '#0a0b0f',
  color: '#e4e6ee',
  fontSize: '0.875rem',
};

const cell: React.CSSProperties = {
  padding: '12px 16px',
  fontSize: '0.875rem',
  color: '#a8adc6',
};

const btnPrimary: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: 6,
  border: 'none',
  backgroundColor: '#6366f1',
  color: '#fff',
  fontSize: '0.875rem',
  fontWeight: 600,
  cursor: 'pointer',
};

const btnSecondary: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: 6,
  border: '1px solid #2a2d42',
  backgroundColor: 'transparent',
  color: '#a8adc6',
  fontSize: '0.875rem',
  cursor: 'pointer',
};

const formCard: React.CSSProperties = {
  padding: 20,
  borderRadius: 12,
  border: '1px solid #2a2d42',
  backgroundColor: '#111218',
  marginBottom: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
};
