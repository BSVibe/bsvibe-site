import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { AUTH_API_URL, getSessionAccessToken } from '@/lib/auth.server';

/**
 * GET /api/auth/tokens — list the current user's PATs.
 * POST /api/auth/tokens — create a new PAT.
 *
 * Proxies to ``auth.bsvibe.dev/api/tokens`` with the user's access_token
 * extracted server-side from the bsvibe_session cookie. Same-origin from
 * the browser's perspective so no CORS plumbing is required on the
 * auth-app side.
 */

export const dynamic = 'force-dynamic';

async function withAccessToken(): Promise<{
  accessToken: string;
  setCookie?: string;
} | NextResponse> {
  const cookieHeader = (await headers()).get('cookie');
  const { accessToken, newCookie } = await getSessionAccessToken(cookieHeader);
  if (!accessToken) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  }
  return { accessToken, setCookie: newCookie };
}

function applyRotatedCookie(res: NextResponse, setCookie?: string): NextResponse {
  if (setCookie) res.headers.append('set-cookie', setCookie);
  return res;
}

export async function GET(req: Request): Promise<NextResponse> {
  const auth = await withAccessToken();
  if (auth instanceof NextResponse) return auth;

  const inUrl = new URL(req.url);
  const upstream = new URL(`${AUTH_API_URL}/api/tokens`);
  inUrl.searchParams.forEach((v, k) => upstream.searchParams.append(k, v));

  const res = await fetch(upstream.toString(), {
    headers: { Authorization: `Bearer ${auth.accessToken}` },
    cache: 'no-store',
  });
  const body = await res.text();
  const out = new NextResponse(body, {
    status: res.status,
    headers: { 'content-type': res.headers.get('content-type') ?? 'application/json' },
  });
  return applyRotatedCookie(out, auth.setCookie);
}

export async function POST(req: Request): Promise<NextResponse> {
  const auth = await withAccessToken();
  if (auth instanceof NextResponse) return auth;

  const body = await req.text();
  const res = await fetch(`${AUTH_API_URL}/api/tokens`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': req.headers.get('content-type') ?? 'application/json',
    },
    body,
  });
  const respBody = await res.text();
  const out = new NextResponse(respBody, {
    status: res.status,
    headers: { 'content-type': res.headers.get('content-type') ?? 'application/json' },
  });
  return applyRotatedCookie(out, auth.setCookie);
}
