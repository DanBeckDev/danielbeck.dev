# Editing each page

Most pages assemble themselves from content collections and config. This is
where each page's content actually comes from, so you know what to edit.

## Identity, navigation, and footer

`src/consts/site.ts` is the single source of truth for the name, role, tagline,
contact email, social links, and handles. The header wordmark, footer, contact
page, `Person` JSON-LD, OG tags, and RSS all read from it. Change a link once
here and it updates everywhere.

Navigation items are the `navItems` array in the same file.

## Home (`src/pages/index.astro`)

Assembles from data:

- **Hero** copy (the intro paragraph and focus tags) is in
  `src/components/home/Hero.astro`. The big title is `siteConfig.tagline`.
- **Latest writing**: newest 3 posts.
- **Talks & podcasts**: featured videos.
- **Open source contributions**: top tracked repos by recent activity.

To change what the home page features, edit the underlying content, not this
file.

## Writing (`/blog/`)

- `src/pages/blog/index.astro` lists all posts grouped by year, with a category
  filter and a tag cloud. It reads from the blog collection.
- Category pages (`/blog/category/<slug>/`) and tag pages (`/blog/tags/<tag>/`)
  generate automatically with pagination.
- To add a post, see [./blog-posts.md](./blog-posts.md).

## YouTube (`/youtube/`)

`src/pages/youtube/index.astro` holds the positioning copy and Subscribe CTA. The
video grid reads from `src/data/videos.yaml`. To add a video, see
[./videos-and-speaking.md](./videos-and-speaking.md).

## Open Source (`/open-source/`)

`src/pages/open-source.astro` renders merged pull requests fetched live from
GitHub. You do not edit this page to add work. You add a repository to
`src/consts/contributions.ts`. See [./open-source.md](./open-source.md).

## Speaking (`/speaking/`)

`src/pages/speaking.astro` holds the intro copy and the topics list. The timeline
reads from `src/content/speaking/*.md`. To add a talk or podcast, see
[./videos-and-speaking.md](./videos-and-speaking.md).

## About (`/about/`)

`src/pages/about.astro` contains the bio prose directly (it is the one page with
hand-written long-form copy), plus an `expertise` list and a `facts` rail near
the top of the file. Edit those arrays and the prose in place. Keep it in the
voice described in [../writing/voice-and-tone.md](../writing/voice-and-tone.md).

## Contact (`/contact/`)

`src/pages/contact.astro` builds its links from `siteConfig`. To change the
email or socials, edit `src/consts/site.ts`, not this page.

## Social images and SEO

Per-page OG images are generated at build from `src/pages/og/[...route].ts`. Page
titles, descriptions, canonical URLs, and JSON-LD are handled by `BaseLayout` and
`src/lib/seo.ts`. A post's `description` is reused as its meta description, OG
description, and card text, so write it to stand alone.
