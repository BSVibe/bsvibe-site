import type { Metadata } from 'next';
import Landing from '@/components/marketing/Landing';
import { isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'BSVibe — 확인된 일만, 올라옵니다.',
  description:
    'AI가 직접 일하고, 스스로 검증하고, 증거와 함께 보여줍니다. 같은 실수는 두 번 하지 않습니다.',
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
