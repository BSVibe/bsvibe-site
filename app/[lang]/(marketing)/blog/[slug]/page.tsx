import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/lib/i18n';
import { getPost, listAllPosts } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';

export function generateStaticParams() {
  const posts = listAllPosts();
  const langs: Locale[] = ['ko', 'en'];
  // Generate per-locale slug pairs (slug locale gating handled in render).
  return langs.flatMap((lang) =>
    posts.map((p) => ({ lang, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : 'ko';
  const post = getPost(slug);
  if (!post) notFound();
  // If user requests post in wrong locale, still render (URLs are
  // intentionally not locale-gated, mirroring Astro behaviour).
  const dateFmt = new Intl.DateTimeFormat(post.locale === 'en' ? 'en-US' : 'ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article style={{ maxWidth: 720, margin: '0 auto', padding: '16px 24px 120px' }}>
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

      <header style={{ marginBottom: 48 }}>
        <h1
          style={{
            color: '#f2f3f7',
            fontSize: '2rem',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            marginBottom: 12,
          }}
        >
          {post.title}
        </h1>
        <div
          style={{
            color: '#5a5f7d',
            fontSize: '0.875rem',
            marginBottom: 16,
            display: 'flex',
            gap: 4,
          }}
        >
          <time>{dateFmt.format(post.date)}</time>
          <span>· {post.author}</span>
        </div>
        {post.tags.length > 0 && (
          <div style={{ display: 'flex', gap: 8 }}>
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/${locale}/blog/tags/${tag}`}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#818cf8',
                  padding: '2px 10px',
                  borderRadius: 9999,
                  backgroundColor: 'rgba(99,102,241,0.08)',
                  border: '1px solid rgba(99,102,241,0.15)',
                  textDecoration: 'none',
                }}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      <div className="prose-body">
        <MDXRemote source={post.body} />
      </div>
    </article>
  );
}
