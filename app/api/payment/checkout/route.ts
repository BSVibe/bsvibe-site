import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@/lib/auth.server';
import { createCheckout, getProvider } from '@/lib/payment.server';
import { getSupabaseAnon } from '@/lib/supabase.server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie');
  const { user } = await validateSession(cookieHeader);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { priceId?: string; locale?: string };
  try {
    body = (await req.json()) as { priceId?: string; locale?: string };
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { priceId, locale = 'ko' } = body;
  if (!priceId) {
    return NextResponse.json({ error: 'Missing priceId' }, { status: 400 });
  }

  const supabase = getSupabaseAnon();
  const { data: price, error } = await supabase
    .from('prices')
    .select('id, stripe_price_id, is_contact_only')
    .eq('id', priceId)
    .eq('is_active', true)
    .maybeSingle();

  if (error || !price) {
    return NextResponse.json({ error: 'Price not found' }, { status: 404 });
  }
  if (price.is_contact_only) {
    return NextResponse.json(
      { error: 'This plan requires contacting sales' },
      { status: 400 },
    );
  }

  try {
    const session = await createCheckout({
      provider: getProvider(locale),
      stripePriceId: price.stripe_price_id,
      priceId: price.id,
      userId: user.id,
      userEmail: user.email,
      successUrl: `https://bsvibe.dev/${locale}/account/billing?success=true`,
      cancelUrl: `https://bsvibe.dev/${locale}/account/billing?canceled=true`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Checkout failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
