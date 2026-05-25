import type { Metadata } from 'next';
import Landing from '@/components/marketing/Landing';
import { isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'BSVibe — 믿으라 하지 않습니다, 보여줍니다.',
  description:
    'AI가 만들고 스스로 검증해 증거로 답합니다. 한 번 가르치면, 같은 실수는 두 번 없습니다.',
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
