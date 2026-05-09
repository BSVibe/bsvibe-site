import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { AUTH_API_URL, getSessionAccessToken } from '@/lib/auth.server';

/**
 * DELETE /api/auth/tokens/[id] — revoke a PAT (idempotent).
 *
 * Forwards to auth.bsvibe.dev/api/tokens/[id]. Server-side proxy so
 * the access_token never leaves the bsvibe-site origin.
 */

export const dynamic = 'force-dynamic';

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await ctx.params;
  if (!id) {
    return NextResponse.json({ error: 'missing_token_id' }, { status: 400 });
  }
  const cookieHeader = (await headers()).get('cookie');
  const { accessToken, newCookie } = await getSessionAccessToken(cookieHeader);
  if (!accessToken) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  }

  const res = await fetch(
    `${AUTH_API_URL}/api/tokens/${encodeURIComponent(id)}`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  const body = await res.text();
  const out = new NextResponse(body, {
    status: res.status,
    headers: { 'content-type': res.headers.get('content-type') ?? 'application/json' },
  });
  if (newCookie) out.headers.append('set-cookie', newCookie);
  return out;
}
