import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
});

const TITLE = 'BSVibe — 믿으라 하지 않습니다, 보여줍니다.';
const DESCRIPTION =
  'AI가 만들고 스스로 검증해 증거로 답합니다. 한 번 가르치면, 같은 실수는 두 번 없습니다.';

export const metadata: Metadata = {
  metadataBase: new URL('https://bsvibe.dev'),
  title: { default: TITLE, template: '%s — BSVibe' },
  description: DESCRIPTION,
  icons: {
    icon: '/images/bsvibe-symbol.svg',
    apple: '/images/bsvibe-logo.png',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'BSVibe',
    type: 'website',
    url: 'https://bsvibe.dev',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

// Resolve the theme preference before first paint (no flash). 3-state pref
// (light/dark/system) under a fresh key; default is LIGHT (the site's theme)
// when unset, so dark-OS visitors and anyone with the old binary key get light.
const themeScript = `(function(){try{var p=localStorage.getItem('bsvibe-theme2');if(p!=='light'&&p!=='dark'&&p!=='system'){p='light';}var d=p==='dark'||(p==='system'&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.setAttribute('data-theme',d?'dark':'light');}catch(e){}})();`;

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: { lang?: string };
}) {
  const lang = params?.lang === 'en' ? 'en' : 'ko';
  return (
    <html lang={lang} dir="ltr" suppressHydrationWarning>
      <head>
        {/* Strict color-scheme signal at parse time — defeats UA "Force Dark"
            (Brave mobile Night Mode, Chrome Android forced-dark) which would
            otherwise repaint a light page into a fake dark palette. The CSS
            `color-scheme: only light` in globals.css reinforces this. */}
        <meta name="color-scheme" content="light" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} ${jetBrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
