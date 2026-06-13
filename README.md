# danielbeck.dev

The personal technical website of Daniel Beck — Senior Software Engineer,
"Building Reliable Systems at Scale." A durable, self-owned platform for
long-form writing, YouTube, and open source, where each article anchors a
content cluster (post → video → repo → LinkedIn → talk).

**Stack:** [Astro](https://astro.build) (static, no adapter) · MDX content
collections · [Tailwind CSS v4](https://tailwindcss.com) · self-hosted fonts ·
build-time OG images · deployed on **Cloudflare Pages**. No CMS, no database.

## Commands

| Command           | Action                                           |
| :---------------- | :----------------------------------------------- |
| `npm install`     | Install dependencies                             |
| `npm run dev`     | Start the dev server at `localhost:4321`         |
| `npm run build`   | Build the production site to `./dist/`           |
| `npm run preview` | Preview the production build locally             |
| `npm run check`   | Type-check + validate content collection schemas |
| `npm run format`  | Format with Prettier                             |

Requires Node `>= 22.12` (see `.nvmrc`, which pins 24 for Cloudflare).

## Project structure

```
src/
├── consts/        site.ts (identity + nav) · categories.ts · contributions.ts (tracked OSS repos)
├── content.config.ts   Zod schemas for the collections (blog · videos · speaking)
├── content/       blog/*.mdx · speaking/*.md
├── data/          videos.yaml (videos collection)
├── lib/           content.ts (queries + cross-link checks) · contributions.ts (GitHub PRs) · seo.ts · date.ts
├── layouts/       BaseLayout · BlogPostLayout
├── components/    mdx/ (MDX components) · layout/ · blog/ · home/ · youtube/ · speaking/ · opensource/ · seo/ · ui/
├── pages/         routes (incl. blog tag/category pagination, rss.xml, og/[...route].ts)
└── styles/        global.css  ← design tokens, dark-mode flip, prose, Shiki theming
```

## Editing identity & links

All identity lives in **`src/consts/site.ts`**: email, GitHub, LinkedIn,
YouTube, handles, and channel id. Change it once and it updates the header,
footer, contact page, Person JSON-LD, OG tags, and RSS. GitHub is the real
account (`github.com/DanBeckDev`); LinkedIn (`linkedin.com/in/danielbeck`) and
email (`hello@danielbeck.dev`) are still placeholders to swap before launch.

## Writing a new article

1. Create `src/content/blog/<slug>.mdx`.
2. Add frontmatter (validated at build — a bad `category` or dangling cross-link
   fails the build):

   ```yaml
   ---
   title: 'Your Title'
   description: 'One-sentence summary (also used for OG + cards).'
   pubDate: 2026-06-20
   category: Design Systems # one of the 9 in src/consts/categories.ts
   tags: [react, tokens]
   draft: true # hidden in production until set false
   # Optional reputation-system cross-links:
   video: { youtubeId: 'abc123', title: 'Watch the walkthrough' }
   repo: { url: 'https://github.com/you/repo', name: 'you/repo', language: 'TypeScript' }
   talk: { title: 'My Talk', event: 'SomeConf' }
   discussion: { linkedinUrl: 'https://www.linkedin.com/posts/...' }
   ---
   ```

3. Write in MDX. These components are available with **no imports**:
   `<Callout type="warning" title="...">`, `<MermaidDiagram code={\`...\`} />`,
`<CodeBlock filename="x.ts">`, `<GitHubRepo name="..." url="..." />`,
`<YouTubeEmbed id="..." />`, `<ArticleCard>`, `<ProjectCard>`,
`<NewsletterSignup />`. Plain fenced code is syntax-highlighted automatically
   (dual light/dark themes, with a copy button).
4. `npm run dev` to preview; flip `draft: false` when ready.
5. Commit & push — Cloudflare rebuilds. Tags, categories, RSS, sitemap, and the
   OG image regenerate automatically.

**Videos** live in `src/data/videos.yaml` and **talks/podcasts** in
`src/content/speaking/*.md`; their `relatedPost` fields wire up cross-links,
validated at build time.

## Open Source page (auto-fetched contributions)

The Open Source page lists your **merged pull requests to external libraries**,
pulled live from GitHub at build time. You only maintain a list of repos in
**`src/consts/contributions.ts`** — add an `owner/name` entry and the page
auto-populates that repo's PRs, description, stars, and language:

```ts
export const trackedRepos = [{ repo: 'QwikDev/partytown' }, { repo: 'module-federation/vite' }];
```

The author is taken from `siteConfig.githubUsername`. Without a token the fetch
works at low volume but GitHub may rate-limit CI IPs — in that case each repo
still renders with its fallback blurb and a link to the live PR list, so the
page is never empty. Set **`GITHUB_TOKEN`** in Cloudflare for reliable builds.

## Deployment (Cloudflare Workers, static assets)

This is a fully static site: no adapter, no Worker script. It deploys to
Cloudflare Workers as static assets, configured by `wrangler.jsonc`:

```jsonc
{
  "name": "danielbeckdev",
  "compatibility_date": "2026-06-13",
  "assets": { "directory": "./dist" }
}
```

The project/worker **name cannot contain a dot** (lowercase letters, numbers,
and dashes only), so it is `danielbeckdev`. The domain `danielbeck.dev` is added
separately as a custom domain.

1. Push to GitHub.
2. Cloudflare dashboard: **Workers & Pages**, then **Import a repository**, and
   pick `DanBeckDev/danielbeck.dev`.
3. Build command `npm run build`; the build deploys via the committed
   `wrangler.jsonc`. Set `NODE_VERSION = 24`.
4. Every push to `main` rebuilds and deploys.
5. Add the custom domain `danielbeck.dev` under the project's Domains & Routes.

Classic Cloudflare Pages also works (build `npm run build`, output `dist`);
either way the project name cannot contain a dot.

### Recommended: `GITHUB_TOKEN` for the Open Source page

Set a `GITHUB_TOKEN` build environment variable in Cloudflare so the Open Source
page reliably fetches your merged PRs (see above). A read-only token with no
scopes is enough; it only reads public data. Without it the build still
succeeds; the contributions section just falls back to repo links.
