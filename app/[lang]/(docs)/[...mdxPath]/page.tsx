import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { useMDXComponents as getMDXComponents } from '../../../../mdx-components';

export const generateStaticParams = generateStaticParamsFor('mdxPath', 'lang');

interface PageProps {
  params: Promise<{ mdxPath?: string[]; lang: string }>;
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath, params.lang);
  return metadata;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const result = await importPage(params.mdxPath, params.lang);
  const { default: MDXContent, toc, metadata } = result;
  const Wrapper = getMDXComponents().wrapper as React.ComponentType<{
    toc: typeof toc;
    metadata: typeof metadata;
    children: React.ReactNode;
  }>;
  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
