import type { Metadata } from 'next';
import { Head } from 'nextra/components';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://bsvibe.dev'),
  title: {
    default: 'BSVibe — 만들고, 지키고, 기억한다.',
    template: '%s — BSVibe',
  },
  description: '따로 써도 충분하고, 같이 쓰면 놀랍습니다. BSVibe.',
  icons: {
    icon: '/images/bsvibe-symbol.svg',
    apple: '/images/bsvibe-logo.png',
  },
  openGraph: {
    title: 'BSVibe — 만들고, 지키고, 기억한다.',
    description: '따로 써도 충분하고, 같이 쓰면 놀랍습니다.',
    siteName: 'BSVibe',
    type: 'website',
    url: 'https://bsvibe.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BSVibe — 만들고, 지키고, 기억한다.',
    description: '따로 써도 충분하고, 같이 쓰면 놀랍습니다.',
  },
};

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
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>{children}</body>
    </html>
  );
}
