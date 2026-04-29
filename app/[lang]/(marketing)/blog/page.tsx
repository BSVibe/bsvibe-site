import type { Metadata } from 'next';
import Link from 'next/link';
import { isLocale } from '@/lib/i18n';
import { listPostsByLocale } from '@/lib/blog';

export const metadata: Metadata = {
  title: '블로그',
  description: 'BSVibe의 기술, 제품, AI에 대한 이야기',
};

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'ko';
  const posts = listPostsByLocale(locale);
  const dateFmt = new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '16px 24px 120px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 16,
        }}
      >
        <div>
          <h1
            style={{
              color: '#f2f3f7',
              fontSize: '2rem',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              marginBottom: 8,
            }}
          >
            {locale === 'en' ? 'Blog' : '블로그'}
          </h1>
          <p style={{ color: '#8187a8', fontSize: '1rem', marginBottom: 48 }}>
            {locale === 'en'
              ? 'Stories about engineering, products, and AI.'
              : '기술, 제품, 그리고 AI에 대한 이야기.'}
          </p>
        </div>
        <Link
          href={`/${locale}/blog/rss.xml`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: '#5a5f7d',
            fontSize: '0.75rem',
            fontWeight: 600,
            textDecoration: 'none',
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid #2a2d42',
            flexShrink: 0,
            marginTop: 4,
          }}
        >
          RSS
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {posts.length === 0 ? (
          <p style={{ color: '#5a5f7d', fontSize: '0.9375rem' }}>
            {locale === 'en' ? 'No posts yet.' : '아직 포스트가 없습니다.'}
          </p>
        ) : (
          posts.map((post) => (
            <article
              key={post.slug}
              style={{
                padding: 24,
                borderRadius: 12,
                border: '1px solid #2a2d42',
                backgroundColor: '#111218',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 8,
                }}
              >
                <time style={{ color: '#5a5f7d', fontSize: '0.8125rem' }}>
                  {dateFmt.format(post.date)}
                </time>
                {post.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: 6 }}>
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/${locale}/blog/tags/${tag}`}
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          color: '#818cf8',
                          padding: '1px 8px',
                          borderRadius: 9999,
                          backgroundColor: 'rgba(99,102,241,0.08)',
                          textDecoration: 'none',
                        }}
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link
                href={`/${locale}/blog/${post.slug}`}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <h2
                  style={{
                    color: '#f2f3f7',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    margin: '0 0 6px',
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
            </article>
          ))
        )}
      </div>
    </div>
  );
}
