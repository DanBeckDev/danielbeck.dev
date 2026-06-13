# danielbeck.dev

The personal technical website of Daniel Beck — Senior Software Engineer,
"Building Reliable Systems at Scale." A durable, self-owned platform for
long-form writing, YouTube, and open source, where each article anchors a
content cluster (post → video → repo → LinkedIn → talk).

**Stack:** [Astro](https://astro.build) (static, no adapter) · MDX content
collections · [Tailwind CSS v4](https://tailwindcss.com) · self-hosted fonts ·
build-time OG images · deployed on **Cloudflare Pages**. No CMS, no database.

## Commands

| Command            | Action                                            |
| :----------------- | :------------------------------------------------ |
| `npm install`      | Install dependencies                              |
| `npm run dev`      | Start the dev server at `localhost:4321`          |
| `npm run build`    | Build the production site to `./dist/`            |
| `npm run preview`  | Preview the production build locally              |
| `npm run check`    | Type-check + validate content collection schemas  |
| `npm run format`   | Format with Prettier                              |

Requires Node `>= 22.12` (see `.nvmrc`, which pins 24 for Cloudflare).

## Project structure

```
src/
├── consts/        site.ts (identity + nav, single source of truth) · categories.ts
├── content.config.ts   Zod schemas for the 4 collections
├── content/       blog/*.mdx · projects/*.md · speaking/*.md
├── data/          videos.yaml (videos collection)
├── lib/           content.ts (queries + cross-link checks) · seo.ts · github.ts · date.ts
├── layouts/       BaseLayout · BlogPostLayout
├── components/    mdx/ (the 8 MDX components) · layout/ · blog/ · home/ · youtube/ · speaking/ · seo/ · ui/
├── pages/         routes (incl. blog tag/category pagination, rss.xml, og/[...route].ts)
└── styles/        global.css  ← design tokens, dark-mode flip, prose, Shiki theming
```

## Editing identity & links

All identity lives in **`src/consts/site.ts`** — email, GitHub/LinkedIn/YouTube,
handle, channel id. Change it once and it updates the header, footer, contact
page, Person JSON-LD, OG tags, and RSS. The current GitHub/LinkedIn/email values
are **placeholders** (`github.com/danielbeck`, `linkedin.com/in/danielbeck`,
`hello@danielbeck.dev`) — swap them in before launch.

## Writing a new article

1. Create `src/content/blog/<slug>.mdx`.
2. Add frontmatter (validated at build — a bad `category` or dangling cross-link
   fails the build):

   ```yaml
   ---
   title: 'Your Title'
   description: 'One-sentence summary (also used for OG + cards).'
   pubDate: 2026-06-20
   category: Kubernetes # one of the 9 in src/consts/categories.ts
   tags: [reliability, sre]
   draft: true # hidden in production until set false
   # Optional reputation-system cross-links:
   video: { youtubeId: 'abc123', title: 'Watch the walkthrough' }
   repo: { url: 'https://github.com/you/repo', name: 'you/repo', language: 'Go' }
   talk: { title: 'My Talk', event: 'SomeConf' }
   discussion: { linkedinUrl: 'https://www.linkedin.com/posts/...' }
   ---
   ```

3. Write in MDX. These components are available with **no imports**:
   `<Callout type="warning" title="...">`, `<MermaidDiagram code={\`...\`} />`,
   `<CodeBlock filename="x.go">`, `<GitHubRepo slug="..." />`, `<YouTubeEmbed id="..." />`,
   `<ArticleCard>`, `<ProjectCard>`, `<NewsletterSignup />`. Plain fenced code is
   syntax-highlighted automatically (dual light/dark themes, with a copy button).
4. `npm run dev` to preview; flip `draft: false` when ready.
5. Commit & push — Cloudflare rebuilds. Tags, categories, RSS, sitemap, and the
   OG image regenerate automatically.

**Projects** live in `src/content/projects/*.md`, **videos** in
`src/data/videos.yaml`, **talks** in `src/content/speaking/*.md`. Their
`relatedPosts` / `relatedProject` / `relatedPost` fields wire up the
cross-links and are validated against existing entries at build time.

## Deployment — Cloudflare Pages (Git integration)

This is a fully static site, so **no adapter is needed**.

1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Pick the repo. Cloudflare detects the Astro preset; confirm:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variable:** `NODE_VERSION = 24`
4. Deploy. Every push to `main` rebuilds and deploys automatically.
5. Add the custom domain `danielbeck.dev` in the Pages project.

> Make sure the project is created under **Pages** (serves at `*.pages.dev`),
> not Workers.

### Optional: live GitHub stars on project cards

Set a `GITHUB_TOKEN` build environment variable in Cloudflare to fetch live
star/fork counts at build time. Without it, the static counts in each project's
frontmatter are used and the build still succeeds.
