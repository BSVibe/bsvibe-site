import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import { isLocale, type Locale } from '@/lib/i18n';

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function MarketingLayout({ children, params }: Props) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'ko';
  return (
    <>
      <Navbar locale={locale} />
      <main style={{ paddingTop: 64 }}>{children}</main>
      <Footer locale={locale} />
    </>
  );
}
