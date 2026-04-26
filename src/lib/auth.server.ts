// Auth helpers — Next.js port of the Astro `auth.server.ts`.
// `validateSession` calls auth.bsvibe.dev /api/session with the inbound cookie.

const AUTH_URL = process.env.AUTH_URL || 'https://auth.bsvibe.dev';
const COOKIE_NAME = 'bsvibe_session';
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days

const IS_DEV = process.env.NODE_ENV !== 'production';
const SECURE_FLAG = IS_DEV ? '' : ' Secure;';

export interface AuthUser {
  id: string;
  email: string;
  tenantId: string;
  role: string;
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const pad = base64.length % 4;
    if (pad) base64 += '='.repeat(4 - pad);
    return JSON.parse(
      Buffer.from(base64, 'base64').toString('utf-8'),
    ) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function validateSession(
  cookieHeader: string | null,
): Promise<{ user: AuthUser | null; newCookie?: string }> {
  if (!cookieHeader) return { user: null };

  const cookies = Object.fromEntries(
    cookieHeader.split(';').map((c) => {
      const [k, ...v] = c.trim().split('=');
      return [k, v.join('=')];
    }),
  );

  const refreshToken = cookies[COOKIE_NAME];
  if (!refreshToken) return { user: null };

  try {
    const res = await fetch(`${AUTH_URL}/api/session`, {
      method: 'GET',
      headers: { Cookie: `${COOKIE_NAME}=${refreshToken}` },
    });

    if (!res.ok) return { user: null };

    const data = (await res.json()) as {
      access_token: string;
      refresh_token?: string;
    };
    const payload = decodeJwtPayload(data.access_token);
    if (!payload) return { user: null };

    const user: AuthUser = {
      id: payload.sub as string,
      email: payload.email as string,
      tenantId:
        (payload.app_metadata as Record<string, string>)?.tenant_id ?? '',
      role: (payload.app_metadata as Record<string, string>)?.role ?? 'member',
    };

    const newCookie = data.refresh_token
      ? `${COOKIE_NAME}=${data.refresh_token}; HttpOnly;${SECURE_FLAG} SameSite=Lax; Path=/; Max-Age=${COOKIE_MAX_AGE}`
      : undefined;

    return { user, newCookie };
  } catch {
    return { user: null };
  }
}

export function createSessionCookie(refreshToken: string): string {
  return `${COOKIE_NAME}=${refreshToken}; HttpOnly;${SECURE_FLAG} SameSite=Lax; Path=/; Max-Age=${COOKIE_MAX_AGE}`;
}

export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; HttpOnly;${SECURE_FLAG} SameSite=Lax; Path=/; Max-Age=0`;
}
