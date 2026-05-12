import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { AUTH_API_URL, getSessionAccessToken } from '@/lib/auth.server';

/**
 * DELETE /api/auth/oauth-clients/:id — revoke a service account.
 *
 * Proxies to ``auth.bsvibe.dev/api/oauth/clients/:id``. The auth-app
 * scopes the lookup + PATCH by the caller's tenant so cross-tenant
 * revocation is already blocked server-side.
 */

export const dynamic = 'force-dynamic';

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await ctx.params;
  const cookieHeader = (await headers()).get('cookie');
  const { accessToken, newCookie } = await getSessionAccessToken(cookieHeader);
  if (!accessToken) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  }
  const res = await fetch(
    `${AUTH_API_URL}/api/oauth/clients/${encodeURIComponent(id)}`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  const body = await res.text();
  const out = new NextResponse(body, {
    status: res.status,
    headers: {
      'content-type':
        res.headers.get('content-type') ?? 'application/json',
    },
  });
  if (newCookie) out.headers.append('set-cookie', newCookie);
  return out;
}
