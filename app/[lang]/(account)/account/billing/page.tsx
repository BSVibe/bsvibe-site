import { headers } from 'next/headers';
import Link from 'next/link';
import { validateSession } from '@/lib/auth.server';
import { getActiveSubscription, getPaymentHistory } from '@/lib/subscription.repository';
import { getProductsWithPrices } from '@/lib/pricing.repository';
import { isLocale } from '@/lib/i18n';
import BillingActions from '@/components/account/BillingActions';

export const dynamic = 'force-dynamic';

const C = {
  ko: {
    h1: '결제 관리',
    desc: '구독, 결제 내역, 플랜 변경을 관리합니다.',
    success: '결제가 완료되었습니다. 구독 상태는 잠시 후 업데이트됩니다.',
    canceled: '결제가 취소되었습니다.',
    loadErr: '결제 정보를 불러올 수 없습니다',
    subH: '현재 구독',
    nextDue: '다음 결제일',
    method: '결제 수단',
    plans: '플랜 선택',
    noSub: '현재 활성 구독이 없습니다.',
    seePlans: '플랜 보기',
    history: '결제 내역',
    noHistory: '결제 내역이 없습니다.',
    cancel: '구독 취소',
    cancelConfirm: '정말 구독을 취소하시겠습니까? 현재 결제 기간 종료까지 서비스를 이용할 수 있습니다.',
    cancelFailed: '취소 실패',
    startCheckout: '시작하기',
    checkoutFailed: '결제 시작 실패',
    pendingCancel: '기간 만료 시 취소 예정',
    statuses: {
      active: '활성',
      trialing: '체험 중',
      canceled: '취소됨',
      past_due: '결제 지연',
      incomplete: '미완료',
    } as Record<string, string>,
    paymentStatuses: {
      succeeded: '성공',
      failed: '실패',
      pending: '대기',
      refunded: '환불',
    } as Record<string, string>,
    cols: { date: '날짜', desc: '설명', amount: '금액', status: '상태' },
  },
  en: {
    h1: 'Billing',
    desc: 'Manage subscriptions, payment history, and plan changes.',
    success: 'Payment complete. Subscription status will update shortly.',
    canceled: 'Payment canceled.',
    loadErr: 'Could not load billing data',
    subH: 'Current subscription',
    nextDue: 'Next due date',
    method: 'Method',
    plans: 'Choose a plan',
    noSub: 'No active subscription.',
    seePlans: 'See plans',
    history: 'Payment history',
    noHistory: 'No payment history.',
    cancel: 'Cancel subscription',
    cancelConfirm: 'Cancel? You keep service until the period ends.',
    cancelFailed: 'Cancel failed',
    startCheckout: 'Get started',
    checkoutFailed: 'Checkout failed',
    pendingCancel: 'Cancels at period end',
    statuses: {
      active: 'Active',
      trialing: 'Trialing',
      canceled: 'Canceled',
      past_due: 'Past due',
      incomplete: 'Incomplete',
    } as Record<string, string>,
    paymentStatuses: {
      succeeded: 'Succeeded',
      failed: 'Failed',
      pending: 'Pending',
      refunded: 'Refunded',
    } as Record<string, string>,
    cols: { date: 'Date', desc: 'Description', amount: 'Amount', status: 'Status' },
  },
} as const;

function formatAmount(amount: number, currency: string): string {
  if (currency === 'KRW') return `₩${amount.toLocaleString('ko-KR')}`;
  return `$${(amount / 100).toFixed(2)}`;
}

export default async function BillingPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { lang } = await params;
  const sp = await searchParams;
  const locale = isLocale(lang) ? lang : 'ko';
  const c = C[locale];
  const cookieHeader = (await headers()).get('cookie');
  const { user } = await validateSession(cookieHeader);
  if (!user) return null;

  const success = sp.success === 'true';
  const canceled = sp.canceled === 'true';

  let subscription: Awaited<ReturnType<typeof getActiveSubscription>> = null;
  let payments: Awaited<ReturnType<typeof getPaymentHistory>> = [];
  let plansData: Awaited<ReturnType<typeof getProductsWithPrices>> = [];
  let loadError: string | null = null;
  try {
    [subscription, payments, plansData] = await Promise.all([
      getActiveSubscription(user.id),
      getPaymentHistory(user.id, 10),
      getProductsWithPrices(locale),
    ]);
  } catch (err) {
    loadError = err instanceof Error ? err.message : 'unknown';
  }

  const dateFmt = new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const activePlan = subscription
    ? plansData
        .flatMap((p) => p.prices.map((price) => ({ price, product: p })))
        .find((it) => it.price.id === subscription!.priceId)
    : null;

  const checkoutOptions = !subscription
    ? plansData.flatMap((product) =>
        product.prices
          .filter((p) => !p.isContactOnly && p.tier !== 'free')
          .map((price) => ({
            id: price.id,
            name: product.name,
            tier: price.displayName,
            accentColor: product.accentColor,
          })),
      )
    : [];

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

      {success && <Alert kind="success">{c.success}</Alert>}
      {canceled && <Alert kind="info">{c.canceled}</Alert>}
      {loadError && (
        <Alert kind="error">{`${c.loadErr}: ${loadError}`}</Alert>
      )}

      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            color: '#f2f3f7',
            fontSize: '1.0625rem',
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          {c.subH}
        </h2>
        {subscription && activePlan ? (
          <div
            style={{
              padding: 24,
              borderRadius: 12,
              border: '1px solid #2a2d42',
              backgroundColor: '#111218',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 16,
                marginBottom: 20,
              }}
            >
              <div>
                <h3
                  style={{
                    color: '#f2f3f7',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    margin: '0 0 6px',
                  }}
                >
                  {activePlan.product.name} {activePlan.price.displayName}
                </h3>
                <p
                  style={{
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      padding: '2px 10px',
                      borderRadius: 9999,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      backgroundColor: 'rgba(16,185,129,0.1)',
                      color: '#34d399',
                    }}
                  >
                    {c.statuses[subscription.status] ?? subscription.status}
                  </span>
                  {subscription.cancelAtPeriodEnd && (
                    <span style={{ fontSize: '0.75rem', color: '#8187a8' }}>
                      {c.pendingCancel}
                    </span>
                  )}
                </p>
              </div>
              {!subscription.cancelAtPeriodEnd && (
                <BillingActions
                  hasActiveSub
                  cancelLabel={c.cancel}
                  cancelConfirm={c.cancelConfirm}
                  cancelFailed={c.cancelFailed}
                  startCheckoutLabel={c.startCheckout}
                  checkoutFailed={c.checkoutFailed}
                  locale={locale}
                  plans={[]}
                />
              )}
            </div>
            <dl
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: 16,
                margin: 0,
                paddingTop: 20,
                borderTop: '1px solid #1e2033',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <dt
                  style={{
                    fontSize: '0.75rem',
                    color: '#5a5f7d',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {c.nextDue}
                </dt>
                <dd
                  style={{
                    color: '#e4e6ee',
                    fontSize: '0.9375rem',
                    margin: 0,
                  }}
                >
                  {subscription.currentPeriodEnd
                    ? dateFmt.format(subscription.currentPeriodEnd)
                    : '—'}
                </dd>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <dt
                  style={{
                    fontSize: '0.75rem',
                    color: '#5a5f7d',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {c.method}
                </dt>
                <dd
                  style={{
                    color: '#e4e6ee',
                    fontSize: '0.9375rem',
                    margin: 0,
                  }}
                >
                  {subscription.provider === 'stripe' ? 'Stripe' : '토스페이먼츠'}
                </dd>
              </div>
            </dl>
          </div>
        ) : (
          <div
            style={{
              padding: 32,
              borderRadius: 12,
              border: '1px dashed #2a2d42',
              textAlign: 'center',
            }}
          >
            <p style={{ color: '#8187a8', marginBottom: 16 }}>{c.noSub}</p>
            <Link
              href={`/${locale}/pricing`}
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                borderRadius: 8,
                backgroundColor: '#6366f1',
                color: '#fff',
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              {c.seePlans}
            </Link>
          </div>
        )}
      </section>

      {!subscription && checkoutOptions.length > 0 && (
        <section style={{ marginBottom: 40 }}>
          <h2
            style={{
              color: '#f2f3f7',
              fontSize: '1.0625rem',
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            {c.plans}
          </h2>
          <BillingActions
            hasActiveSub={false}
            cancelLabel={c.cancel}
            cancelConfirm={c.cancelConfirm}
            cancelFailed={c.cancelFailed}
            startCheckoutLabel={c.startCheckout}
            checkoutFailed={c.checkoutFailed}
            locale={locale}
            plans={checkoutOptions}
          />
        </section>
      )}

      <section>
        <h2
          style={{
            color: '#f2f3f7',
            fontSize: '1.0625rem',
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          {c.history}
        </h2>
        {payments.length === 0 ? (
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
            {c.noHistory}
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
                {Object.values(c.cols).map((h) => (
                  <th
                    key={h}
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
              {payments.map((p) => (
                <tr key={p.id}>
                  <td
                    style={{
                      padding: '12px 16px',
                      fontSize: '0.875rem',
                      color: '#a8adc6',
                    }}
                  >
                    {dateFmt.format(p.paidAt ?? p.createdAt)}
                  </td>
                  <td
                    style={{
                      padding: '12px 16px',
                      fontSize: '0.875rem',
                      color: '#a8adc6',
                    }}
                  >
                    {p.description ?? '—'}
                  </td>
                  <td
                    style={{
                      padding: '12px 16px',
                      fontSize: '0.875rem',
                      color: '#a8adc6',
                    }}
                  >
                    {formatAmount(p.amount, p.currency)}
                  </td>
                  <td
                    style={{
                      padding: '12px 16px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color:
                        p.status === 'succeeded'
                          ? '#34d399'
                          : p.status === 'failed'
                            ? '#fb7185'
                            : p.status === 'pending'
                              ? '#f59e0b'
                              : '#8187a8',
                    }}
                  >
                    {c.paymentStatuses[p.status] ?? p.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}

function Alert({
  kind,
  children,
}: {
  kind: 'success' | 'info' | 'error';
  children: React.ReactNode;
}) {
  const colours = {
    success: { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', fg: '#34d399' },
    info: { bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.2)', fg: '#818cf8' },
    error: { bg: 'rgba(244,63,94,0.08)', border: 'rgba(244,63,94,0.2)', fg: '#fb7185' },
  }[kind];
  return (
    <div
      style={{
        padding: '12px 16px',
        borderRadius: 8,
        marginBottom: 24,
        fontSize: '0.875rem',
        backgroundColor: colours.bg,
        border: `1px solid ${colours.border}`,
        color: colours.fg,
      }}
    >
      {children}
    </div>
  );
}
