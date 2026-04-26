import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@/lib/auth.server';
import {
  getActiveSubscription,
  upsertSubscription,
} from '@/lib/subscription.repository';
import {
  cancelStripeSubscription,
  cancelTossSubscription,
} from '@/lib/payment.server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie');
  const { user } = await validateSession(cookieHeader);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const subscription = await getActiveSubscription(user.id);
  return NextResponse.json({ subscription });
}

export async function DELETE(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie');
  const { user } = await validateSession(cookieHeader);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const subscription = await getActiveSubscription(user.id);
  if (!subscription) {
    return NextResponse.json(
      { error: 'No active subscription' },
      { status: 404 },
    );
  }
  if (!subscription.providerSubscriptionId) {
    return NextResponse.json(
      { error: 'Subscription has no provider id' },
      { status: 400 },
    );
  }
  try {
    if (subscription.provider === 'stripe') {
      await cancelStripeSubscription(subscription.providerSubscriptionId);
    } else {
      await cancelTossSubscription(subscription.providerSubscriptionId);
    }
    await upsertSubscription({
      ...subscription,
      cancelAtPeriodEnd: true,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Cancellation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
