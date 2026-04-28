'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';

interface Props {
  user: { email: string };
  locale: Locale;
  children: React.ReactNode;
}

export default function DashboardShell({ user, locale, children }: Props) {
  const pathname = usePathname() ?? '';
  const prefix = `/${locale}`;
  const items =
    locale === 'en'
      ? [
          { href: `${prefix}/account`, label: 'Overview' },
          { href: `${prefix}/account/profile`, label: 'Profile' },
          { href: `${prefix}/account/billing`, label: 'Billing' },
          { href: `${prefix}/account/team`, label: 'Team' },
        ]
      : [
          { href: `${prefix}/account`, label: '개요' },
          { href: `${prefix}/account/profile`, label: '프로필' },
          { href: `${prefix}/account/billing`, label: '결제' },
          { href: `${prefix}/account/team`, label: '팀' },
        ];

  async function handleLogout() {
    await fetch('/api/auth/session', { method: 'DELETE' });
    window.location.href = `${prefix}`;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          height: 56,
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #1e2033',
          backgroundColor: 'rgba(10,11,15,0.95)',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        <Link
          href={prefix}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            textDecoration: 'none',
          }}
        >
          <img
            src="/images/bsvibe-logo.png"
            alt="BSVibe"
            width={22}
            height={22}
            style={{ borderRadius: 4 }}
          />
          <span
            style={{
              fontSize: '0.9375rem',
              fontWeight: 700,
              color: '#f2f3f7',
              letterSpacing: '-0.02em',
            }}
          >
            BSVibe
          </span>
        </Link>
        <nav
          className="account-top-nav"
          style={{
            display: 'flex',
            gap: 24,
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Link href={prefix} className="nav-link" style={{ fontSize: '0.8125rem' }}>
            {locale === 'en' ? 'Home' : '홈'}
          </Link>
          <Link
            href={`${prefix}/blog`}
            className="nav-link"
            style={{ fontSize: '0.8125rem' }}
          >
            {locale === 'en' ? 'Blog' : '블로그'}
          </Link>
          <Link
            href={`${prefix}/pricing`}
            className="nav-link"
            style={{ fontSize: '0.8125rem' }}
          >
            {locale === 'en' ? 'Pricing' : '가격'}
          </Link>
          <Link
            href={`${prefix}/bsgateway/getting-started`}
            className="nav-link"
            style={{ fontSize: '0.8125rem' }}
          >
            {locale === 'en' ? 'Docs' : '문서'}
          </Link>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span
            style={{ fontSize: '0.8125rem', color: '#818cf8', fontWeight: 500 }}
          >
            {user.email}
          </span>
          <button
            onClick={handleLogout}
            className="nav-link"
            style={{
              fontSize: '0.8125rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#8187a8',
            }}
          >
            {locale === 'en' ? 'Log out' : '로그아웃'}
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        <aside
          className="account-sidebar"
          style={{
            width: 220,
            borderRight: '1px solid #1e2033',
            padding: '16px 12px',
            flexShrink: 0,
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {items.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== `${prefix}/account` &&
                  pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: 'block',
                    padding: '8px 12px',
                    borderRadius: 8,
                    fontSize: '0.875rem',
                    color: active ? '#f2f3f7' : '#8187a8',
                    backgroundColor: active
                      ? 'rgba(99,102,241,0.1)'
                      : 'transparent',
                    fontWeight: active ? 500 : undefined,
                    textDecoration: 'none',
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main
          className="account-main"
          style={{ flex: 1, padding: 32, maxWidth: 900 }}
        >
          {children}
        </main>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.account-top-nav) {
            display: none !important;
          }
          :global(.account-sidebar) {
            display: none !important;
          }
          :global(.account-main) {
            padding: 24px 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
