import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { validateSession } from '@/lib/auth.server';
import { isLocale } from '@/lib/i18n';
import DashboardShell from '@/components/account/DashboardShell';

export const dynamic = 'force-dynamic';

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function AccountLayout({ children, params }: Props) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'ko';
  const cookieHeader = (await headers()).get('cookie');
  const { user } = await validateSession(cookieHeader);
  if (!user) {
    redirect('https://auth.bsvibe.dev/login');
  }
  return (
    <DashboardShell user={{ email: user.email }} locale={locale}>
      {children}
    </DashboardShell>
  );
}
