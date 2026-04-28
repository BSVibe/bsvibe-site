import { NextRequest, NextResponse } from 'next/server';
import {
  handleStripeWebhook,
  handleTossWebhook,
} from '@/lib/payment.server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const stripeSignature = req.headers.get('stripe-signature');
  const tossSignature =
    req.headers.get('tosspayments-webhook-signature') ??
    req.headers.get('x-toss-signature') ??
    req.headers.get('toss-signature');
  const tossTimestamp = req.headers.get('x-toss-timestamp');

  try {
    if (stripeSignature) {
      await handleStripeWebhook(body, stripeSignature);
    } else if (tossSignature) {
      await handleTossWebhook(body, tossSignature, tossTimestamp);
    } else {
      return NextResponse.json(
        { error: 'Missing signature header' },
        { status: 400 },
      );
    }
    return NextResponse.json({ received: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Webhook processing failed';
    console.error('webhook error', message);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
