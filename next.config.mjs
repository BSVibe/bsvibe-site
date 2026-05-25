import nextra from 'nextra';
import { cwd } from 'node:process';

const withNextra = nextra({
  // Nextra 4 App Router config — docs theme is wired via app/[lang]/(docs)/layout.tsx
  search: {
    codeblocks: false,
  },
  defaultShowCopyCode: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow MDX page extensions throughout the app
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // i18n: only consumed by Nextra 4 to seed NEXTRA_LOCALES at build time.
  // App Router doesn't actually use this config for routing — we route via
  // [lang] segments — but Nextra needs `locales` to scan `content/<locale>/`.
  i18n: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
    localeDetection: false,
  },
  experimental: {
    optimizePackageImports: ['nextra-theme-docs', 'nextra'],
  },
  outputFileTracingRoot: cwd(),
  // Retired in the single-product redesign: the 4-product `/products/*` pages
  // and the one-person-company `/about` page. Redirect gracefully.
  async redirects() {
    return [
      { source: '/:lang(ko|en)/products/:path*', destination: '/:lang/how-it-works', permanent: false },
      { source: '/:lang(ko|en)/about', destination: '/:lang', permanent: false },
    ];
  },
};

export default withNextra(nextConfig);
