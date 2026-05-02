import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Locale } from './i18n';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: Date;
  author: string;
  tags: string[];
  locale: Locale;
  draft: boolean;
  image?: string;
}

export interface BlogPost extends BlogPostMeta {
  body: string;
}

function safeReadDir(): string[] {
  try {
    return fs
      .readdirSync(BLOG_DIR)
      .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
  } catch {
    return [];
  }
}

export function listAllPosts(): BlogPostMeta[] {
  return safeReadDir()
    .map((file) => {
      const full = path.join(BLOG_DIR, file);
      const raw = fs.readFileSync(full, 'utf-8');
      const { data } = matter(raw);
      const slug = file.replace(/\.mdx?$/, '');
      const tags = Array.isArray(data.tags) ? data.tags : [];
      return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ''),
        date: new Date(data.date),
        author: String(data.author ?? 'BSVibe Team'),
        tags,
        locale: (data.locale ?? 'ko') as Locale,
        draft: Boolean(data.draft),
        image: data.image ? String(data.image) : undefined,
      };
    })
    .filter((p) => !p.draft)
    .sort((a, b) => b.date.valueOf() - a.date.valueOf());
}

export function listPostsByLocale(locale: Locale): BlogPostMeta[] {
  return listAllPosts().filter((p) => p.locale === locale);
}

export function getPost(slug: string): BlogPost | null {
  const candidates = ['mdx', 'md'].map((ext) =>
    path.join(BLOG_DIR, `${slug}.${ext}`),
  );
  const file = candidates.find((c) => fs.existsSync(c));
  if (!file) return null;
  const raw = fs.readFileSync(file, 'utf-8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    date: new Date(data.date),
    author: String(data.author ?? 'BSVibe Team'),
    tags: Array.isArray(data.tags) ? data.tags : [],
    locale: (data.locale ?? 'ko') as Locale,
    draft: Boolean(data.draft),
    image: data.image ? String(data.image) : undefined,
    body: content,
  };
}

export function listAllTags(locale: Locale): string[] {
  const tagSet = new Set<string>();
  for (const p of listPostsByLocale(locale)) {
    for (const t of p.tags) tagSet.add(t);
  }
  return Array.from(tagSet).sort();
}

export function listPostsByTag(locale: Locale, tag: string): BlogPostMeta[] {
  return listPostsByLocale(locale).filter((p) => p.tags.includes(tag));
}
