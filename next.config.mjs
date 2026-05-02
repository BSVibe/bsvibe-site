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
};

export default withNextra(nextConfig);
