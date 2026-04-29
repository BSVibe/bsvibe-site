import { Layout, Navbar } from 'nextra-theme-docs';
import { Search } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import Image from 'next/image';
import 'nextra-theme-docs/style.css';

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function DocsLayout({ children, params }: Props) {
  const { lang } = await params;
  const pageMap = await getPageMap(`/${lang}`);

  const navbar = (
    <Navbar
      logo={
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <Image
            src="/images/bsvibe-logo.png"
            alt="BSVibe"
            width={20}
            height={20}
            style={{ borderRadius: 4 }}
          />
          <span style={{ fontWeight: 700 }}>BSVibe</span>
        </span>
      }
      projectLink="https://github.com/BSVibe"
    />
  );

  return (
    <Layout
      navbar={navbar}
      pageMap={pageMap}
      docsRepositoryBase="https://github.com/BSVibe/bsvibe-site/tree/main/content"
      i18n={[
        { locale: 'ko', name: '한국어' },
        { locale: 'en', name: 'English' },
      ]}
      sidebar={{
        defaultMenuCollapseLevel: 1,
        autoCollapse: true,
      }}
      editLink={lang === 'en' ? 'Edit this page' : '이 페이지 수정'}
      feedback={{
        content:
          lang === 'en' ? 'Question? Give us feedback' : '문의 / 피드백',
        labels: 'feedback',
      }}
      search={<Search />}
    >
      {children}
    </Layout>
  );
}
