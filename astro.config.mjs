// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

import { unified } from '@astrojs/markdown-remark';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
  site: 'https://danielbeck.dev',
  output: 'static',
  trailingSlash: 'always',
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [
    mdx(),
    icon(),
    sitemap({
      // OG image endpoints and the 404 page should not appear in the sitemap.
      filter: (page) => !page.includes('/og/') && !page.endsWith('/404/'),
    }),
  ],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      // Dual themes — light is the literal color, dark is swapped in via CSS
      // (see the `html.dark .astro-code` rule in src/styles/global.css).
      themes: {
        light: 'github-light',
        dark: 'github-dark-dimmed',
      },
      wrap: true,
    },
    processor: unified({
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap', properties: { className: ['heading-anchor'] } }],
        [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
      ],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
    // Mermaid is a large, lazily-loaded chunk (only fetched when a diagram is
    // on screen); raise the warning threshold so the build stays quiet.
    build: { chunkSizeWarningLimit: 1200 },
  },
});
