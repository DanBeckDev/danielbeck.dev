# Writing a blog post

A post is one `.mdx` file in `src/content/blog/`. The filename (without `.mdx`)
becomes the slug and the URL: `building-react-from-scratch.mdx` is served at
`/blog/building-react-from-scratch/`. Use lower-case, hyphenated filenames.

Read [../writing/voice-and-tone.md](../writing/voice-and-tone.md) before writing
the body.

If you are an AI agent, also read
[./blog-agent-playbook.md](./blog-agent-playbook.md) before drafting, then
[../writing/technical-blog-quality.md](../writing/technical-blog-quality.md)
before you polish the draft.

## Frontmatter

```mdx
---
title: 'Building React from Scratch' # required, max 120 chars
description: >- # required, max 220 chars. Reused for cards, OG, meta, RSS.
  A from-scratch reimplementation of React and ReactDOM, plus a custom Babel
  JSX transform.
pubDate: 2026-06-10 # required
updatedDate: 2026-06-12 # optional
category: Frontend Architecture # required, one of the 9 in consts/categories.ts
tags: [react, javascript, jsx] # optional, lower-case and hyphenated
draft: false # optional, default false. true hides it in production.
featured: true # optional. Featured posts surface on the home page.
heroImage: ./hero.png # optional, co-located image
heroImageAlt: 'Description' # required if heroImage is set
canonicalUrl: 'https://...' # optional. Set if cross-posted elsewhere.
series: 'react-internals' # optional. Groups related posts.

# Optional cross-links. Each renders a block at the end of the post.
video:
  youtubeId: abc123XYZ_0 # the 11-char id, not a URL
  title: 'Watch the walkthrough' # optional label
repo:
  url: https://github.com/you/repo
  name: you/repo
  description: 'Optional one-liner.'
  language: TypeScript
talk:
  title: 'My Talk'
  event: 'SomeConf' # optional
discussion:
  linkedinUrl: https://www.linkedin.com/posts/...
---
```

Only `title`, `description`, `pubDate`, and `category` are required. Everything
else is optional.

## Body

Write in MDX. These components are available with no import statement (they are
injected by the post layout). See
[../components/mdx-components.md](../components/mdx-components.md) for full props.

- `<Callout type="tip" title="...">...</Callout>`
- `<MermaidDiagram code={\`flowchart LR; A --> B\`} title="..." />`
- `<GitHubRepo name="you/repo" url="https://github.com/you/repo" language="Go" />`
- `<YouTubeEmbed id="abc123XYZ_0" title="..." />`
- `<CodeBlock filename="render.ts">` wrapping a fenced block (adds a filename bar)
- `<ArticleCard>`, `<ProjectCard>`, `<NewsletterSignup />`

Plain fenced code is highlighted automatically:

````md
```ts
const x: number = 1;
```
````

Headings should start at `##` (the layout renders the `<h1>` from `title`).
Headings get anchor links and feed the on-page table of contents automatically.

## Publishing flow

1. Create the file with `draft: true`.
2. `npm run dev` and preview at the slug URL.
3. Fill in any cross-links (`video`, `repo`, `talk`, `discussion`).
4. Run `npm run check`. A bad category, a too-long description, or a missing
   `heroImageAlt` will be caught here.
5. Set `draft: false`, commit, and push. Cloudflare rebuilds. The tag and
   category pages, RSS, sitemap, and the social image all regenerate.
