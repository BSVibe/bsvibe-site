import { cwd } from 'node:process';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  outputFileTracingRoot: cwd(),
  // Retired in the single-product redesign: the 4-product `/products/*` pages,
  // the one-person-company `/about`, and the legacy 4-product docs (the whole
  // nextra docs surface). Redirect gracefully.
  async redirects() {
    return [
      { source: '/:lang(ko|en)/products/:path*', destination: '/:lang/how-it-works', permanent: false },
      { source: '/:lang(ko|en)/about', destination: '/:lang', permanent: false },
      { source: '/:lang(ko|en)/docs/:path*', destination: '/:lang/how-it-works', permanent: false },
      { source: '/:lang(ko|en)/docs', destination: '/:lang/how-it-works', permanent: false },
      { source: '/:lang(ko|en)/bsgateway/:path*', destination: '/:lang/how-it-works', permanent: false },
      { source: '/:lang(ko|en)/bsnexus/:path*', destination: '/:lang/how-it-works', permanent: false },
      { source: '/:lang(ko|en)/bsupervisor/:path*', destination: '/:lang/how-it-works', permanent: false },
      { source: '/:lang(ko|en)/bsage/:path*', destination: '/:lang/how-it-works', permanent: false },
      { source: '/:lang(ko|en)/auth-migration-guide', destination: '/:lang/how-it-works', permanent: false },
      { source: '/:lang(ko|en)/payment-setup-guide', destination: '/:lang/how-it-works', permanent: false },
    ];
  },
};

export default nextConfig;
