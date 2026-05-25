import type { Metadata } from 'next';
import HowItWorks from '@/components/marketing/HowItWorks';
import { isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: '작동 방식',
  description: '한 줄 던지면 AI가 일하고, 스스로 검증하고, 증거와 함께 돌려줍니다.',
};

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'ko';
  return <HowItWorks locale={locale} />;
}
