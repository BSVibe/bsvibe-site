import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/lib/i18n';
import { listAllTags, listPostsByTag } from '@/lib/blog';

export function generateStaticParams() {
  const langs: Locale[] = ['ko', 'en'];
  return langs.flatMap((lang) =>
    listAllTags(lang).map((tag) => ({ lang, tag })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag}`,
    description: `${tag} 태그가 포함된 포스트`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ lang: string; tag: string }>;
}) {
  const { lang, tag } = await params;
  const locale = isLocale(lang) ? lang : 'ko';
  const posts = listPostsByTag(locale, tag);
  if (posts.length === 0) notFound();
  const dateFmt = new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '16px 24px 120px' }}>
      <Link
        href={`/${locale}/blog`}
        style={{
          display: 'inline-block',
          marginBottom: 32,
          color: '#8187a8',
          fontSize: '0.875rem',
          textDecoration: 'none',
        }}
      >
        {locale === 'en' ? '← Back to Blog' : '← 블로그로 돌아가기'}
      </Link>
      <h1
        style={{
          color: '#f2f3f7',
          fontSize: '2rem',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          marginBottom: 8,
        }}
      >
        <span style={{ color: '#6366f1' }}>#</span>
        {tag}
      </h1>
      <p style={{ color: '#5a5f7d', fontSize: '0.875rem', marginBottom: 32 }}>
        {locale === 'en'
          ? `${posts.length} post${posts.length === 1 ? '' : 's'}`
          : `${posts.length}개의 포스트`}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            style={{
              padding: 24,
              borderRadius: 12,
              border: '1px solid #2a2d42',
              backgroundColor: '#111218',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <time style={{ color: '#5a5f7d', fontSize: '0.8125rem' }}>
              {dateFmt.format(post.date)}
            </time>
            <h2
              style={{
                color: '#f2f3f7',
                fontSize: '1.25rem',
                fontWeight: 600,
                margin: '8px 0 6px',
                letterSpacing: '-0.02em',
              }}
            >
              {post.title}
            </h2>
            <p
              style={{
                color: '#8187a8',
                fontSize: '0.9375rem',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
