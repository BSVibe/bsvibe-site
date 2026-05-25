import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n';
import { footerColumns, footerTagline } from '@/content/marketing';

export default function Footer({ locale = 'ko' }: { locale?: Locale }) {
  const prefix = `/${locale}`;
  return (
    <footer style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg)' }}>
      <div
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          padding: '56px 32px 32px',
          display: 'grid',
          gridTemplateColumns: 'minmax(220px, 1.4fr) repeat(3, 1fr)',
          gap: 40,
        }}
        className="footer-grid"
      >
        {/* Brand column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Image src="/images/bsvibe-symbol.svg" alt="BSVibe" width={20} height={20} style={{ borderRadius: 4 }} />
            <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              BSVibe
            </span>
          </div>
          <p style={{ marginTop: 12, fontSize: '0.8125rem', color: 'var(--text-muted)', maxWidth: 240, lineHeight: 1.6 }}>
            {footerTagline[locale]}
          </p>
        </div>

        {/* Link columns */}
        {footerColumns.map((col) => (
          <div key={col.title.en}>
            <div
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-faint)',
                marginBottom: 14,
              }}
            >
              {col.title[locale]}
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={`${prefix}${link.href}`} className="nav-link" style={{ fontSize: '0.8125rem' }}>
                    {link.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          padding: '20px 32px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>© 2026 BSVibe</span>
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

      <style>{`
        @media (max-width: 760px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  );
}
