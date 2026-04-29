import { NextRequest, NextResponse } from 'next/server';
import {
  validateSession,
  createSessionCookie,
  clearSessionCookie,
} from '@/lib/auth.server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie');
  const { user, newCookie } = await validateSession(cookieHeader);

  const headers = new Headers({ 'Content-Type': 'application/json' });
  if (newCookie) headers.set('Set-Cookie', newCookie);

  return new NextResponse(JSON.stringify({ user: user ?? null }), {
    status: 200,
    headers,
  });
}

export async function POST(req: NextRequest) {
  let body: { refresh_token?: string };
  try {
    body = (await req.json()) as { refresh_token?: string };
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  const refreshToken = body.refresh_token;
  if (!refreshToken || typeof refreshToken !== 'string') {
    return NextResponse.json({ error: 'Missing refresh_token' }, { status: 400 });
  }
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Set-Cookie': createSessionCookie(refreshToken),
  });
  return new NextResponse(JSON.stringify({ ok: true }), { status: 200, headers });
}

export async function DELETE() {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Set-Cookie': clearSessionCookie(),
  });
  return new NextResponse(JSON.stringify({ ok: true }), { status: 200, headers });
}
