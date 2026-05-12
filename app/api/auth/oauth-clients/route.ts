import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { AUTH_API_URL, getSessionAccessToken } from '@/lib/auth.server';

/**
 * GET /api/auth/oauth-clients — list the caller's tenant service accounts.
 * POST /api/auth/oauth-clients — create one (returns client_secret once).
 *
 * Proxies to ``auth.bsvibe.dev/api/oauth/clients`` with the user's
 * access_token extracted from the bsvibe_session cookie.
 */

export const dynamic = 'force-dynamic';

async function withAccessToken(): Promise<
  { accessToken: string; setCookie?: string } | NextResponse
> {
  const cookieHeader = (await headers()).get('cookie');
  const { accessToken, newCookie } = await getSessionAccessToken(cookieHeader);
  if (!accessToken) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  }
  return { accessToken, setCookie: newCookie };
}

function applyRotatedCookie(
  res: NextResponse,
  setCookie?: string,
): NextResponse {
  if (setCookie) res.headers.append('set-cookie', setCookie);
  return res;
}

export async function GET(): Promise<NextResponse> {
  const auth = await withAccessToken();
  if (auth instanceof NextResponse) return auth;
  const res = await fetch(`${AUTH_API_URL}/api/oauth/clients`, {
    headers: { Authorization: `Bearer ${auth.accessToken}` },
    cache: 'no-store',
  });
  const body = await res.text();
  const out = new NextResponse(body, {
    status: res.status,
    headers: {
      'content-type':
        res.headers.get('content-type') ?? 'application/json',
    },
  });
  return applyRotatedCookie(out, auth.setCookie);
}

export async function POST(req: Request): Promise<NextResponse> {
  const auth = await withAccessToken();
  if (auth instanceof NextResponse) return auth;
  const body = await req.text();
  const res = await fetch(`${AUTH_API_URL}/api/oauth/clients`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type':
        req.headers.get('content-type') ?? 'application/json',
    },
    body,
  });
  const respBody = await res.text();
  const out = new NextResponse(respBody, {
    status: res.status,
    headers: {
      'content-type':
        res.headers.get('content-type') ?? 'application/json',
    },
  });
  return applyRotatedCookie(out, auth.setCookie);
}
