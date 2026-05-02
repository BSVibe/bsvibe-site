'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n';
import { getTranslations } from '@/lib/i18n';

interface UserInfo {
  email: string;
}

const locales: { code: Locale; label: string; path: string }[] = [
  { code: 'ko', label: 'KO', path: '/ko' },
  { code: 'en', label: 'EN', path: '/en' },
];

export default function Navbar({ locale = 'ko' }: { locale?: Locale }) {
  const l = getTranslations(locale);
  const prefix = `/${locale}`;
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  const checkAuth = useCallback(async () => {
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
    const timer = window.setTimeout(() => {
      void checkAuth();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [checkAuth]);

  const handleLogout = useCallback(async () => {
    await fetch('/api/auth/session', { method: 'DELETE' });
    setUser(null);
    window.location.href = `${prefix}`;
  }, [prefix]);

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
          backgroundColor: 'rgba(10,11,15,0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(42,45,66,0.5)',
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
          <Image
            src="/images/bsvibe-logo.png"
            alt="BSVibe"
            width={22}
            height={22}
            style={{ borderRadius: 4 }}
          />
          <span
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: '#f2f3f7',
              letterSpacing: '-0.02em',
            }}
          >
            BSVibe
          </span>
        </Link>

        {/* Desktop nav */}
        <div
          className="desktop-nav"
          style={{ display: 'flex', alignItems: 'center', gap: 28 }}
        >
          <Link
            href={`${prefix}#products`}
            className="nav-link"
            style={{ fontSize: '0.8125rem', fontWeight: 500 }}
          >
            {l.nav.products}
          </Link>
          <Link
            href={`${prefix}/bsgateway/getting-started`}
            className="nav-link"
            style={{ fontSize: '0.8125rem', fontWeight: 500 }}
          >
            {l.nav.docs}
          </Link>
          <Link
            href={`${prefix}/blog`}
            className="nav-link"
            style={{ fontSize: '0.8125rem', fontWeight: 500 }}
          >
            {l.nav.blog}
          </Link>
          <Link
            href={`${prefix}/pricing`}
            className="nav-link"
            style={{ fontSize: '0.8125rem', fontWeight: 500 }}
          >
            {l.nav.pricing}
          </Link>

          {/* Language toggle — mirrors @bsvibe/layout LanguageToggle visual */}
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
              backgroundColor: 'rgba(17,18,24,0.9)',
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
                    minHeight: 32,
                    minWidth: 32,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px 10px',
                    borderRadius: 999,
                    transition: 'color 150ms, background-color 150ms',
                    backgroundColor: active
                      ? 'rgba(129,140,248,0.15)'
                      : 'transparent',
                    color: active ? '#818cf8' : '#8187a8',
                    cursor: active ? 'default' : 'pointer',
                  }}
                >
                  {loc.label}
                </span>
              );
              return active ? (
                <span key={loc.code}>{cell}</span>
              ) : (
                <Link
                  key={loc.code}
                  href={loc.path}
                  style={{ textDecoration: 'none' }}
                >
                  {cell}
                </Link>
              );
            })}
          </div>

          {/* Auth */}
          {user ? (
            <>
              <Link
                href={`${prefix}/account`}
                style={{
                  fontSize: '0.8125rem',
                  color: '#818cf8',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                {user.email}
              </Link>
              <button
                onClick={handleLogout}
                className="nav-link"
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#8187a8',
                }}
              >
                {l.nav.logout}
              </button>
            </>
          ) : (
            <a
              href="https://auth.bsvibe.dev/signup"
              style={{
                padding: '6px 16px',
                borderRadius: 8,
                backgroundColor: 'rgba(99,102,241,0.10)',
                color: '#818cf8',
                fontSize: '0.8125rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              {l.nav.getStarted}
            </a>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#8187a8',
            cursor: 'pointer',
            padding: 8,
          }}
          aria-label={l.menu}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
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
            backgroundColor: 'rgba(10,11,15,0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #2a2d42',
            padding: '16px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <Link
            href={`${prefix}#products`}
            className="nav-link"
            onClick={() => setMenuOpen(false)}
            style={{ fontSize: '0.875rem' }}
          >
            {l.nav.products}
          </Link>
          <Link
            href={`${prefix}/bsgateway/getting-started`}
            className="nav-link"
            style={{ fontSize: '0.875rem' }}
          >
            {l.nav.docs}
          </Link>
          <Link
            href={`${prefix}/blog`}
            className="nav-link"
            style={{ fontSize: '0.875rem' }}
          >
            {l.nav.blog}
          </Link>
          <Link
            href={`${prefix}/pricing`}
            className="nav-link"
            style={{ fontSize: '0.875rem' }}
          >
            {l.nav.pricing}
          </Link>
          <div
            role="group"
            aria-label="Language"
            style={{
              display: 'inline-flex',
              alignSelf: 'flex-start',
              gap: 4,
              padding: 4,
              borderRadius: 999,
              backgroundColor: 'rgba(17,18,24,0.9)',
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {locales.map((loc) => {
              const active = loc.code === locale;
              const cell = (
                <span
                  aria-pressed={active}
                  style={{
                    minHeight: 36,
                    minWidth: 36,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '6px 12px',
                    borderRadius: 999,
                    backgroundColor: active
                      ? 'rgba(129,140,248,0.15)'
                      : 'transparent',
                    color: active ? '#818cf8' : '#8187a8',
                    cursor: active ? 'default' : 'pointer',
                  }}
                >
                  {loc.label}
                </span>
              );
              return active ? (
                <span key={loc.code}>{cell}</span>
              ) : (
                <Link
                  key={loc.code}
                  href={loc.path}
                  style={{ textDecoration: 'none' }}
                >
                  {cell}
                </Link>
              );
            })}
          </div>
          {user ? (
            <Link
              href={`${prefix}/account`}
              style={{
                fontSize: '0.875rem',
                color: '#818cf8',
                textDecoration: 'none',
              }}
            >
              {user.email}
            </Link>
          ) : (
            <a
              href="https://auth.bsvibe.dev/signup"
              className="nav-link"
              style={{ fontSize: '0.875rem' }}
            >
              {l.nav.getStarted}
            </a>
          )}
        </div>
      )}

      <style jsx>{`
        .mobile-menu {
          display: none;
        }
        @media (max-width: 640px) {
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
