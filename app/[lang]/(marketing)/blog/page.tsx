import type { Metadata } from 'next';
import Link from 'next/link';
import { isLocale } from '@/lib/i18n';
import { listAllTags, listPostsByLocale } from '@/lib/blog';
import type { BlogPostMeta } from '@/lib/blog';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const en = lang === 'en';
  return {
    title: en ? 'Blog' : '블로그',
    description: en
      ? 'Stories about engineering, products, and AI.'
      : 'BSVibe의 기술, 제품, AI에 대한 이야기',
  };
}

function TagChip({
  tag,
  locale,
  size = 'sm',
}: {
  tag: string;
  locale: string;
  size?: 'sm' | 'md';
}) {
  return (
    <Link
      href={`/${locale}/blog/tags/${tag}`}
      style={{
        fontSize: size === 'md' ? '0.75rem' : '0.6875rem',
        fontWeight: 600,
        color: 'var(--text-muted)',
        padding: size === 'md' ? '3px 10px' : '2px 9px',
        borderRadius: 9999,
        backgroundColor: 'var(--surface-2)',
        border: '1px solid var(--border)',
        textDecoration: 'none',
      }}
    >
      {tag}
    </Link>
  );
}

function Thumb({ post, height }: { post: BlogPostMeta; height: number }) {
  return (
    <div
      style={{
        width: '100%',
        height,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'var(--surface-2)',
        backgroundImage: post.image ? `url(${post.image})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        flexShrink: 0,
        border: '1px solid var(--border)',
      }}
      aria-hidden="true"
    />
  );
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'ko';
  const posts = listPostsByLocale(locale);
  const tags = listAllTags(locale);
  const dateFmt = new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const [featured, ...rest] = posts;

  return (
    <div style={{ maxWidth: 1040, margin: '0 auto', padding: '16px 24px 120px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div>
          <h1
            style={{
              color: 'var(--text)',
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: 10,
            }}
          >
            {locale === 'en' ? 'Blog' : '블로그'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.0625rem', margin: 0 }}>
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
            color: 'var(--text-muted)',
            fontSize: '0.75rem',
            fontWeight: 600,
            textDecoration: 'none',
            padding: '6px 12px',
            borderRadius: 8,
            border: '1px solid var(--border)',
            backgroundColor: 'var(--surface)',
            flexShrink: 0,
            marginTop: 4,
          }}
        >
          RSS
        </Link>
      </div>

      {tags.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 48,
          }}
        >
          {tags.map((tag) => (
            <TagChip key={tag} tag={tag} locale={locale} size="md" />
          ))}
        </div>
      )}

      {posts.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
          {locale === 'en' ? 'No posts yet.' : '아직 포스트가 없습니다.'}
        </p>
      ) : (
        <>
          {/* Featured post */}
          <Link
            href={`/${locale}/blog/${featured.slug}`}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
              gap: 28,
              alignItems: 'center',
              padding: 24,
              borderRadius: 14,
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              textDecoration: 'none',
              color: 'inherit',
              marginBottom: 48,
            }}
          >
            <Thumb post={featured} height={240} />
            <div>
              {featured.tags.length > 0 && (
                <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        color: 'var(--text-muted)',
                        padding: '2px 9px',
                        borderRadius: 9999,
                        backgroundColor: 'var(--surface-2)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h2
                style={{
                  color: 'var(--text)',
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 700,
                  margin: '0 0 12px',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}
              >
                {featured.title}
              </h2>
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '1rem',
                  margin: '0 0 16px',
                  lineHeight: 1.6,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {featured.description}
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: 'var(--text-faint)',
                  fontSize: '0.8125rem',
                }}
              >
                <time>{dateFmt.format(featured.date)}</time>
                <span>·</span>
                <span>{featured.author}</span>
              </div>
            </div>
          </Link>

          {/* Rest as 2-column grid */}
          {rest.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: 20,
              }}
            >
              {rest.map((post) => (
                <article
                  key={post.slug}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 20,
                    borderRadius: 12,
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--surface)',
                  }}
                >
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <Thumb post={post} height={150} />
                    {post.tags.length > 0 && (
                      <div style={{ display: 'flex', gap: 6 }}>
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: '0.6875rem',
                              fontWeight: 600,
                              color: 'var(--text-muted)',
                              padding: '2px 9px',
                              borderRadius: 9999,
                              backgroundColor: 'var(--surface-2)',
                              border: '1px solid var(--border)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2
                      style={{
                        color: 'var(--text)',
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        margin: 0,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.3,
                      }}
                    >
                      {post.title}
                    </h2>
                    <p
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.875rem',
                        margin: 0,
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {post.description}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        color: 'var(--text-faint)',
                        fontSize: '0.75rem',
                        marginTop: 4,
                      }}
                    >
                      <time>{dateFmt.format(post.date)}</time>
                      <span>·</span>
                      <span>{post.author}</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
