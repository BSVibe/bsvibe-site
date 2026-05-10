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
  create: string;
  revoke: string;
  revokeConfirm: string;
  revokeFailed: string;
  createFailed: string;
  formNamePlaceholder: string;
  formScopesLabel: string;
  formAudienceLabel: string;
  formExpiresLabel: string;
  formExpiresHelp: string;
  formSubmit: string;
  formCancel: string;
  newTokenH: string;
  newTokenWarn: string;
  copy: string;
  copied: string;
  cols: { name: string; created: string; lastUsed: string; status: string };
  statusActive: string;
  statusRevoked: string;
  expiresPresets: ExpiresPresetStrings;
}

export interface ExpiresPresetStrings {
  oneHour: string;
  oneDay: string;
  sevenDays: string;
  thirtyDays: string;
  ninetyDays: string;
  custom: string;
  customPlaceholder: string;
}

const SCOPE_DEFAULTS = 'gateway:* sage:* nexus:* supervisor:*';
const AUDIENCE_DEFAULTS = 'gateway,sage,nexus,supervisor';

interface Props {
  initial: TokenRow[];
  initialError: string | null;
  strings: Strings;
}

export default function TokensList({ initial, initialError, strings }: Props) {
  const [rows, setRows] = useState<TokenRow[]>(initial);
  const [error, setError] = useState<string | null>(initialError);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [issued, setIssued] = useState<{ name: string; secret: string } | null>(
    null,
  );

  const refresh = useCallback(async () => {
    const res = await fetch('/api/auth/tokens?type=pat', { cache: 'no-store' });
    if (!res.ok) {
      setError(strings.createFailed);
      return;
    }
    const data = (await res.json()) as { tokens?: TokenRow[] };
    setRows(data.tokens ?? []);
  }, [strings.createFailed]);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      setSubmitting(true);
      try {
        const fd = new FormData(e.currentTarget);
        const name = String(fd.get('name') ?? '').trim();
        const scopeRaw = String(fd.get('scopes') ?? '').trim();
        const audienceRaw = String(fd.get('audience') ?? '').trim();
        const expiresIn = String(fd.get('expires_in_s') ?? '').trim();
        const body: Record<string, unknown> = {
          type: 'pat',
          name: name || `cli-${new Date().toISOString().slice(0, 10)}`,
        };
        if (scopeRaw) body.scopes = scopeRaw.split(/\s+/).filter(Boolean);
        if (audienceRaw) {
          body.audience = audienceRaw
            .split(/[\s,]+/)
            .map((s) => s.trim())
            .filter(Boolean);
        }
        if (expiresIn) {
          const n = Number.parseInt(expiresIn, 10);
          if (Number.isFinite(n) && n > 0) body.expires_in_s = n;
        }
        const res = await fetch('/api/auth/tokens', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `HTTP ${res.status}`);
        }
        const data = (await res.json()) as {
          token?: { name?: string | null; raw_secret?: string };
        };
        if (data.token?.raw_secret) {
          setIssued({
            name: data.token.name ?? body.name as string,
            secret: data.token.raw_secret,
          });
        }
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

      {issued && <IssuedTokenBanner issued={issued} strings={strings} onClose={() => setIssued(null)} />}

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
            label={strings.formScopesLabel}
            input={
              <input
                name="scopes"
                defaultValue={SCOPE_DEFAULTS}
                style={inputStyle}
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
            label={strings.formExpiresLabel}
            help={strings.formExpiresHelp}
            input={<ExpiresInPicker presets={strings.expiresPresets} />}
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

function IssuedTokenBanner({
  issued,
  strings,
  onClose,
}: {
  issued: { name: string; secret: string };
  strings: Strings;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(issued.secret);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // best-effort
    }
  }, [issued.secret]);
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
        {strings.newTokenH}
      </h3>
      <p style={{ color: '#fbbf24', fontSize: '0.8125rem', margin: '0 0 12px' }}>
        {strings.newTokenWarn}
      </p>
      <div
        style={{
          display: 'flex',
          gap: 8,
          alignItems: 'stretch',
          flexWrap: 'wrap',
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
          {issued.secret}
        </code>
        <button type="button" onClick={onCopy} style={btnSecondary}>
          {copied ? strings.copied : strings.copy}
        </button>
        <button type="button" onClick={onClose} style={btnSecondary}>
          ×
        </button>
      </div>
    </div>
  );
}

/**
 * Token expiry picker — preset radio buttons + a custom-seconds input
 * that reveals when the user picks "Custom".
 *
 * Why preset-first: Phase 8 dogfood (2026-05-11) caught an empty
 * `expires_in_s` defaulting to 1 hour on the auth-app side. A typed
 * 4-digit number ("3600") gave no signal that the resulting PAT
 * would die in an hour. Surface the duration in human terms ("1 hour",
 * "30 days"), default to 30 days, and let advanced users still drop
 * to a raw seconds value via "Custom".
 *
 * The form remains driven by a single `<input name="expires_in_s">`
 * — a hidden field whose value is the resolved seconds. The token
 * create handler (`onSubmit`) keeps reading `fd.get('expires_in_s')`
 * unchanged, which means the auth-app contract is unaffected.
 */
function ExpiresInPicker({ presets }: { presets: ExpiresPresetStrings }) {
  const PRESETS: { id: string; label: string; seconds: number }[] = [
    { id: '1h', label: presets.oneHour, seconds: 3600 },
    { id: '1d', label: presets.oneDay, seconds: 86_400 },
    { id: '7d', label: presets.sevenDays, seconds: 604_800 },
    { id: '30d', label: presets.thirtyDays, seconds: 2_592_000 },
    { id: '90d', label: presets.ninetyDays, seconds: 7_776_000 },
  ];
  const DEFAULT_ID = '30d';

  const [selectedId, setSelectedId] = useState<string>(DEFAULT_ID);
  const [customValue, setCustomValue] = useState<string>('');

  const resolvedSeconds =
    selectedId === 'custom'
      ? customValue.trim()
      : String(PRESETS.find((p) => p.id === selectedId)?.seconds ?? '');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {PRESETS.map((p) => (
          <PresetChip
            key={p.id}
            active={selectedId === p.id}
            label={p.label}
            onClick={() => setSelectedId(p.id)}
          />
        ))}
        <PresetChip
          active={selectedId === 'custom'}
          label={presets.custom}
          onClick={() => setSelectedId('custom')}
        />
      </div>
      {selectedId === 'custom' && (
        <input
          type="number"
          min={1}
          placeholder={presets.customPlaceholder}
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
          style={inputStyle}
        />
      )}
      {/* Hidden field — keeps the form payload contract unchanged so the
          create handler still reads expires_in_s without knowing about
          the picker. */}
      <input type="hidden" name="expires_in_s" value={resolvedSeconds} />
    </div>
  );
}

function PresetChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '6px 12px',
        borderRadius: 6,
        border: active ? '1px solid #6366f1' : '1px solid #2a2d42',
        background: active ? 'rgba(99,102,241,0.1)' : 'transparent',
        color: active ? '#a5b4fc' : '#a8adc6',
        fontSize: '0.8125rem',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}

function Field({
  label,
  input,
  help,
}: {
  label: string;
  input: React.ReactNode;
  help?: string;
}) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: '0.75rem', color: '#8187a8', fontWeight: 600 }}>
        {label}
      </span>
      {input}
      {help && (
        <span style={{ fontSize: '0.6875rem', color: '#5a5f7d' }}>{help}</span>
      )}
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
