'use client';

import { useCallback } from 'react';

interface Props {
  hasActiveSub: boolean;
  cancelLabel: string;
  cancelConfirm: string;
  cancelFailed: string;
  startCheckoutLabel: string;
  checkoutFailed: string;
  locale: 'ko' | 'en';
  plans: Array<{
    id: string;
    name: string;
    tier: string;
    accentColor: string;
  }>;
}

export default function BillingActions({
  hasActiveSub,
  cancelLabel,
  cancelConfirm,
  cancelFailed,
  startCheckoutLabel,
  checkoutFailed,
  locale,
  plans,
}: Props) {
  const handleCancel = useCallback(async () => {
    if (!confirm(cancelConfirm)) return;
    const res = await fetch('/api/payment/subscription', { method: 'DELETE' });
    if (res.ok) {
      window.location.reload();
    } else {
      const err = await res.json().catch(() => ({}));
      alert(`${cancelFailed}: ${err.error ?? res.statusText}`);
    }
  }, [cancelConfirm, cancelFailed]);

  const handleCheckout = useCallback(
    async (priceId: string) => {
      const res = await fetch('/api/payment/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, locale }),
      });
      if (res.ok) {
        const { url } = await res.json();
        window.location.href = url;
      } else {
        const err = await res.json().catch(() => ({}));
        alert(`${checkoutFailed}: ${err.error ?? res.statusText}`);
      }
    },
    [locale, checkoutFailed],
  );

  if (hasActiveSub) {
    return (
      <button
        onClick={handleCancel}
        style={{
          padding: '8px 16px',
          borderRadius: 8,
          border: '1px solid #2a2d42',
          background: 'none',
          color: '#8187a8',
          fontSize: '0.8125rem',
          cursor: 'pointer',
        }}
      >
        {cancelLabel}
      </button>
    );
  }

  if (plans.length === 0) return null;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 12,
      }}
    >
      {plans.map((plan) => (
        <button
          key={plan.id}
          onClick={() => handleCheckout(plan.id)}
          style={{
            padding: 16,
            borderRadius: 10,
            border: '1px solid',
            borderColor: `${plan.accentColor}40`,
            backgroundColor: '#111218',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.15s ease',
          }}
        >
          <div
            style={{
              fontSize: '0.875rem',
              fontWeight: 700,
              marginBottom: 4,
              color: plan.accentColor,
            }}
          >
            {plan.name}
          </div>
          <div style={{ color: '#8187a8', fontSize: '0.75rem' }}>{plan.tier}</div>
          <div
            style={{
              color: '#f2f3f7',
              fontSize: '0.75rem',
              fontWeight: 600,
              marginTop: 12,
            }}
          >
            {startCheckoutLabel}
          </div>
        </button>
      ))}
    </div>
  );
}
