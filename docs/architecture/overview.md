# Architecture overview

## Stack

| Concern       | Choice                                                          |
| ------------- | --------------------------------------------------------------- |
| Framework     | Astro 6, `output: 'static'`, no adapter                         |
| Content       | MDX content collections (blog, videos, speaking)                |
| Styling       | Tailwind CSS v4 via the `@tailwindcss/vite` plugin              |
| Fonts         | Self-hosted with Fontsource (Inter, JetBrains Mono, Newsreader) |
| Icons         | `astro-icon` with Lucide (UI) and Simple Icons (brands)         |
| Social images | Generated at build time with `astro-og-canvas`                  |
| Hosting       | Cloudflare Pages (Git integration), no server, no database      |

There is no CMS. Everything is files in the repo, rendered to static HTML.

## Directory layout

```
src/
├── consts/
│   ├── site.ts            Identity, nav, social links. Single source of truth.
│   ├── categories.ts      The 9 blog categories (powers the schema enum + index pages).
│   └── contributions.ts   The list of external repos shown on the Open Source page.
├── content.config.ts      Zod schemas for the blog, videos, and speaking collections.
├── content/
│   ├── blog/              One .mdx file per post.
│   └── speaking/          One .md file per talk or podcast.
├── data/
│   └── videos.yaml        The videos collection (one entry per video).
├── lib/
│   ├── content.ts         Queries: getPosts, getAllTags, getRelatedPosts, getVideos, getSpeaking. Cross-link checks live here.
│   ├── contributions.ts   Build-time GitHub fetch for the Open Source page.
│   ├── seo.ts             OG image URLs and JSON-LD builders.
│   └── date.ts            Date formatting.
├── layouts/
│   ├── BaseLayout.astro   <html>, <head>, SEO, theme script, header, footer.
│   └── BlogPostLayout.astro
├── components/
│   ├── mdx/               Components usable inside MDX (Callout, GitHubRepo, etc.).
│   ├── layout/            Header, Footer, Nav, ThemeToggle, etc.
│   ├── blog/ home/ youtube/ speaking/ opensource/ seo/ ui/
├── pages/                 Routes. File-based.
└── styles/
    └── global.css         Design tokens, dark mode, prose, Shiki theming.
```

## Commands

| Command           | What it does                                      |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Dev server at `localhost:4321` with hot reload    |
| `npm run build`   | Production build to `./dist`                      |
| `npm run preview` | Serve the built `./dist` locally                  |
| `npm run check`   | `astro check`: type and content-schema validation |
| `npm run format`  | Prettier across the project                       |

Node 22.12 or newer is required (see `.nvmrc`, which pins 24 for Cloudflare).

## Build and deploy

The site is fully static, so no adapter is involved. Cloudflare Pages builds it
on every push to `main` through the dashboard Git integration:

- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `NODE_VERSION = 24`
- Optional: `GITHUB_TOKEN` so the Open Source page fetches contributions
  reliably (see [content/open-source.md](../content/open-source.md)).

At build time Astro also generates the RSS feed (`/rss.xml`), the sitemap
(`/sitemap-index.xml`), and a social image per page under `/og/`.
