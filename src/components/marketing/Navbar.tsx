'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { getTranslations } from '@/lib/i18n';
import { navItems, authLinks, buttons } from '@/content/marketing';

interface UserInfo {
  email: string;
}

const locales: { code: Locale; label: string }[] = [
  { code: 'ko', label: 'KO' },
  { code: 'en', label: 'EN' },
];

/** Swap the locale prefix while preserving the current page. */
function pathForLocale(pathname: string, target: Locale): string {
  const stripped = pathname.replace(/^\/(ko|en)(?=\/|$)/, '') || '/';
  return `/${target}${stripped === '/' ? '' : stripped}`;
}

function resolveTheme(): 'light' | 'dark' {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'dark' || attr === 'light') return attr;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function Navbar({ locale = 'ko' }: { locale?: Locale }) {
  const l = getTranslations(locale);
  const prefix = `/${locale}`;
  const pathname = usePathname() ?? prefix;
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  const init = useCallback(async () => {
    setMounted(true);
    setTheme(resolveTheme());
    try {
      const res = await fetch('/api/auth/session');
      if (res.ok) {
        const data = await res.json();
        if (data.user) setUser({ email: data.user.email });
      }
    } catch {
      /* not authenticated */
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => void init(), 0);
    return () => window.clearTimeout(timer);
  }, [init]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try {
        localStorage.setItem('bsvibe-theme', next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const handleLogout = useCallback(async () => {
    await fetch('/api/auth/session', { method: 'DELETE' });
    setUser(null);
    window.location.href = prefix;
  }, [prefix]);

  const linkStyle: React.CSSProperties = { fontSize: '0.8125rem', fontWeight: 500 };

  const langToggle = (size: number) => (
    <div
      role="group"
      aria-label="Language"
      data-testid="lang-switcher"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: 4,
        borderRadius: 999,
        backgroundColor: 'var(--surface-2)',
        fontSize: 10,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}
    >
      {locales.map((loc) => {
        const active = loc.code === locale;
        const cell = (
          <span
            data-testid={`lang-switcher-${loc.code}`}
            aria-pressed={active}
            style={{
              minHeight: size,
              minWidth: size,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px 10px',
              borderRadius: 999,
              transition: 'color 150ms, background-color 150ms',
              backgroundColor: active ? 'var(--verified-soft)' : 'transparent',
              color: active ? 'var(--text)' : 'var(--text-muted)',
              cursor: active ? 'default' : 'pointer',
            }}
          >
            {loc.label}
          </span>
        );
        return active ? (
          <span key={loc.code}>{cell}</span>
        ) : (
          <Link key={loc.code} href={pathForLocale(pathname, loc.code)} style={{ textDecoration: 'none' }}>
            {cell}
          </Link>
        );
      })}
    </div>
  );

  const themeButton = (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 34,
        height: 34,
        borderRadius: 999,
        border: '1px solid var(--border)',
        background: 'none',
        color: 'var(--text-muted)',
        cursor: 'pointer',
      }}
    >
      {mounted && theme === 'dark' ? (
        // sun
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
        </svg>
      ) : (
        // moon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );

  return (
    <>
      <nav
        className="fade-in"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: '0 32px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--bg)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <Link href={prefix} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <Image src="/images/bsvibe-symbol.svg" alt="BSVibe" width={22} height={22} style={{ borderRadius: 4 }} />
          <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>BSVibe</span>
        </Link>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {navItems.map((item) => (
            <Link key={item.href} href={`${prefix}${item.href}`} className="nav-link" style={linkStyle}>
              {item.label[locale]}
            </Link>
          ))}

          {langToggle(32)}
          {themeButton}

          {user ? (
            <>
              <Link
                href={`${prefix}/account`}
                style={{ fontSize: '0.8125rem', color: 'var(--text)', fontWeight: 500, textDecoration: 'none' }}
              >
                {user.email}
              </Link>
              <button
                onClick={handleLogout}
                className="nav-link"
                style={{ ...linkStyle, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {l.nav.logout}
              </button>
            </>
          ) : (
            <>
              <a href={authLinks.login} className="nav-link" style={linkStyle}>
                {buttons.login[locale]}
              </a>
              <a
                href={authLinks.signup}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  backgroundColor: 'var(--primary)',
                  color: 'var(--on-primary)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                {buttons.start[locale]}
              </a>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 8 }}
          aria-label={l.menu}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 64,
            left: 0,
            right: 0,
            zIndex: 49,
            backgroundColor: 'var(--bg)',
            borderBottom: '1px solid var(--border)',
            padding: '16px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={`${prefix}${item.href}`}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: '0.875rem' }}
            >
              {item.label[locale]}
            </Link>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {langToggle(36)}
            {themeButton}
          </div>
          {user ? (
            <Link href={`${prefix}/account`} style={{ fontSize: '0.875rem', color: 'var(--text)', textDecoration: 'none' }}>
              {user.email}
            </Link>
          ) : (
            <a
              href={authLinks.signup}
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                padding: '10px 16px',
                borderRadius: 8,
                backgroundColor: 'var(--primary)',
                color: 'var(--on-primary)',
                textDecoration: 'none',
                alignSelf: 'flex-start',
              }}
            >
              {buttons.start[locale]}
            </a>
          )}
        </div>
      )}

      <style jsx>{`
        .mobile-menu {
          display: none;
        }
        @media (max-width: 760px) {
          :global(.desktop-nav) {
            display: none !important;
          }
          .mobile-menu {
            display: block;
          }
        }
      `}</style>
    </>
  );
}
