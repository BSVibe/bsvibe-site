import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { getTranslations } from '@/lib/i18n';

export default function Footer({ locale = 'ko' }: { locale?: Locale }) {
  const l = getTranslations(locale);
  const prefix = `/${locale}`;
  return (
    <footer
      style={{
        borderTop: '1px solid #1e2033',
        padding: '40px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 960,
        margin: '0 auto',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <img
          src="/images/bsvibe-logo.png"
          alt="BSVibe"
          width={16}
          height={16}
          style={{ borderRadius: 2 }}
        />
        <span
          style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#5a5f7d' }}
        >
          BSVibe
        </span>
        <span
          style={{ fontSize: '0.75rem', color: '#3d4160', marginLeft: 4 }}
        >
          &copy; 2026
        </span>
      </div>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <Link
          href={`${prefix}/about`}
          className="nav-link"
          style={{ fontSize: '0.8125rem' }}
        >
          {locale === 'en' ? 'About' : '소개'}
        </Link>
        <Link
          href={`${prefix}/bsgateway/getting-started`}
          className="nav-link"
          style={{ fontSize: '0.8125rem' }}
        >
          {l.footer.docs}
        </Link>
        <Link
          href={`${prefix}/contact`}
          className="nav-link"
          style={{ fontSize: '0.8125rem' }}
        >
          {locale === 'en' ? 'Contact' : '문의'}
        </Link>
        <Link
          href={`${prefix}/privacy`}
          className="nav-link"
          style={{ fontSize: '0.8125rem' }}
        >
          {l.footer.privacy}
        </Link>
        <Link
          href={`${prefix}/terms`}
          className="nav-link"
          style={{ fontSize: '0.8125rem' }}
        >
          {l.footer.terms}
        </Link>
        <a
          href="https://github.com/BSVibe"
          className="nav-link"
          style={{ fontSize: '0.8125rem' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
