import type { Metadata } from 'next';
import Landing from '@/components/marketing/Landing';
import { isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'BSVibe — 만들고, 지키고, 기억한다.',
  description: '따로 써도 충분하고, 같이 쓰면 놀랍습니다.',
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'ko';
  return <Landing locale={locale} />;
}
