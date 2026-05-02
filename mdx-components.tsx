// Nextra 4 — MDX wrapper for the docs theme.
// Used by `app/[lang]/[[...mdxPath]]/page.tsx`.
// See: https://nextra.site/docs/file-conventions/mdx-components-file
import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs';
import type { MDXComponents } from 'nextra/mdx-components';

const themeComponents = getThemeComponents();

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...themeComponents,
    ...components,
  };
}
