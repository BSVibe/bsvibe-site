// Single source of truth for the /account dashboard navigation.
//
// DashboardShell renders these as the sidebar; the /account overview page
// renders the non-overview entries as cards. Driving both from one list
// means the bug class B4 (sidebar has Tokens, overview cards don't) is
// impossible by construction — the invariant is enforced by the type, not
// by a separate sync test.

import type { Locale } from '@/lib/i18n';

export type AccountNavKey = 'overview' | 'profile' | 'tokens' | 'billing' | 'team';

export interface AccountNavItem {
  key: AccountNavKey;
  href: string;
  label: string;
  description: string;
}

const KO: Omit<AccountNavItem, 'href'>[] = [
  { key: 'overview', label: '개요', description: '계정 개요와 빠른 액세스' },
  { key: 'profile', label: '프로필', description: '계정 정보를 관리합니다' },
  { key: 'tokens', label: '토큰', description: 'CLI · API 용 PAT 를 발급/취소합니다' },
  { key: 'billing', label: '결제', description: '구독과 결제 수단을 관리합니다' },
  { key: 'team', label: '팀', description: '팀원을 초대하고 권한을 관리합니다' },
];

const EN: Omit<AccountNavItem, 'href'>[] = [
  { key: 'overview', label: 'Overview', description: 'Account summary and quick access.' },
  { key: 'profile', label: 'Profile', description: 'Manage your account information.' },
  { key: 'tokens', label: 'Tokens', description: 'Issue and revoke Personal Access Tokens for the CLI and API.' },
  { key: 'billing', label: 'Billing', description: 'Manage subscription and payment methods.' },
  { key: 'team', label: 'Team', description: 'Invite teammates and manage roles.' },
];

function hrefFor(prefix: string, key: AccountNavKey): string {
  return key === 'overview' ? `${prefix}/account` : `${prefix}/account/${key}`;
}

/** Sidebar — every entry, including Overview. */
export function getAccountNavItems(locale: Locale): AccountNavItem[] {
  const source = locale === 'en' ? EN : KO;
  const prefix = `/${locale}`;
  return source.map((item) => ({ ...item, href: hrefFor(prefix, item.key) }));
}

/** Overview page cards — every entry except the Overview link itself. */
export function getAccountCardItems(locale: Locale): AccountNavItem[] {
  return getAccountNavItems(locale).filter((item) => item.key !== 'overview');
}
