# AGENTS.md

Guidance for AI assistants (and humans) working on danielbeck.dev. Full
documentation is in [`docs/`](./docs/README.md). Read it before non-trivial work.

## Non-negotiable rules

1. **No long dash characters in any visible copy.** They read as AI-written.
   Use a full stop, comma, colon, or parentheses. Normal hyphens in compound
   words are fine. This is the project owner's top priority. See
   [`docs/writing/voice-and-tone.md`](./docs/writing/voice-and-tone.md).
2. **Write in the site's voice**: plain, direct, specific, peer-to-peer, no hype
   or buzzwords. The voice guide is the source of truth for all copy.
3. **Identity lives only in `src/consts/site.ts`.** Never hard-code name, email,
   handles, or social links elsewhere.
4. **Content is data.** Posts, videos, talks, and tracked repos live in
   collections and config files. Pages read from them. Do not put content in
   page templates.
5. **Run `npm run check` before committing.** It validates content schemas and
   types, and a dangling cross-link fails the build by design.

## Gotcha that has bitten us

Astro scopes component styles. Do not style a class in a parent component's
`<style>` if that class is passed to a child component (for example
`<Container class="foo">`); the scoped selector will not match. Put the class on
a plain element you render, or use global Tailwind utilities. Details in
[`docs/architecture/styling.md`](./docs/architecture/styling.md).

## Stack and commands

Astro 6 (static) + MDX + Tailwind v4, deployed as Cloudflare Workers static
assets. No CMS.

```sh
npm run dev      # localhost:4321
npm run check    # type + content-schema validation
npm run build    # production build to ./dist
npm run format   # Prettier
```

## Where things live

- Identity and nav: `src/consts/site.ts`
- Blog categories: `src/consts/categories.ts`
- Tracked open-source repos: `src/consts/contributions.ts`
- Collections and schemas: `src/content.config.ts`
- Posts: `src/content/blog/*.mdx`
- Videos: `src/data/videos.yaml`
- Working YouTube packages: `../danielbeck-video-studio/content/youtube-scripts/<video-slug>/`
- Talks: `src/content/speaking/*.md`
- Design tokens and theming: `src/styles/global.css`
- Social sharing docs: `docs/social/`
- Scheduled blog campaigns: `docs/content/scheduling-posts.md`

## If you are writing a blog post

Start with:

- [`docs/content/blog-agent-playbook.md`](./docs/content/blog-agent-playbook.md)
- [`docs/writing/blog-agent-rules.md`](./docs/writing/blog-agent-rules.md)
- [`docs/writing/technical-blog-quality.md`](./docs/writing/technical-blog-quality.md)
- [`docs/writing/blog-editing-loop.md`](./docs/writing/blog-editing-loop.md)
- [`docs/content/blog-posts.md`](./docs/content/blog-posts.md)

If the post is technical, read the source code or repo first. Do not draft
from memory when the code is available.

If the post is being scheduled, treat the blog and Buffer posts as one campaign.
Check existing scheduled blog posts and Buffer posts before proposing a date.

## If you are writing or scheduling social posts

Read:

- [`docs/social/social-posting-conventions.md`](./docs/social/social-posting-conventions.md)
- [`docs/social/sharing-playbook.md`](./docs/social/sharing-playbook.md)

Never schedule, queue, publish, or save public social posts in Buffer until the
user has approved the exact copy and timing.

Before proposing timing, check the existing Buffer queue and scheduled blog
posts. The default campaign rhythm is weekdays, up to three posts per week, with
the blog published earlier than social on the same day.

Use precise scheduling language. A blog is scheduled when `pubDate` is in the
future and `draft: false`. A campaign is scheduled only after the approved
LinkedIn and X posts also exist in Buffer and have been verified.

See [`docs/`](./docs/README.md) for the full guide to each.

## If you are creating YouTube material

Work in the sibling repo `../danielbeck-video-studio`, not inside this website
repo. Read `../danielbeck-video-studio/AGENTS.md` and
`../danielbeck-video-studio/docs/workflow.md`.

Treat each video as a production package, not only a script. For substantial
videos, create:

- `script.md` for the spoken structure.
- `scenes.json` for generated on-screen visuals.
- `production-notes.md` for the Remotion handoff.
- `thumbnails/` for concepts and upload-ready exports.

The website repo should only be updated when a finished public video needs to be
added to `src/data/videos.yaml` or embedded in site content.
