import { isLocale } from '@/lib/i18n';
import { listPostsByLocale } from '@/lib/blog';

export const dynamic = 'force-static';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ lang: string }> },
) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'ko';
  const posts = listPostsByLocale(locale);
  const siteUrl = 'https://bsvibe.dev';

  const items = posts
    .map((p) => {
      const link = `${siteUrl}/${locale}/blog/${p.slug}/`;
      const cats = p.tags.map((t) => `<category>${escape(t)}</category>`).join('');
      return `
    <item>
      <title>${escape(p.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${p.date.toUTCString()}</pubDate>
      <description>${escape(p.description)}</description>
      <author>${escape(p.author)}</author>
      ${cats}
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${locale === 'en' ? 'BSVibe Blog' : 'BSVibe 블로그'}</title>
    <link>${siteUrl}/${locale}/blog/</link>
    <description>${
      locale === 'en'
        ? 'Stories about engineering, products, and AI.'
        : 'BSVibe의 기술, 제품, AI에 대한 이야기'
    }</description>
    <language>${locale}</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600',
    },
  });
}

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
