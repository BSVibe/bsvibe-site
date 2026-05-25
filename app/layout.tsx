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

// Applies the saved theme before first paint to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('bsvibe-theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

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
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} ${jetBrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
