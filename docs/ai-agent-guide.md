# AI agent guide

This repo already has good human docs. This page is the short version for AI
agents that need to change the site without breaking its rules.

## Read first

1. `docs/README.md`
2. `docs/writing/voice-and-tone.md`
3. `docs/architecture/content-model.md`
4. `docs/architecture/styling.md`

If you only read one page, read `docs/README.md` and then follow the links
above.

## Source of truth

- Identity, navigation, social links: `src/consts/site.ts`
- Blog categories: `src/consts/categories.ts`
- Open source repos: `src/consts/contributions.ts`
- Content schemas: `src/content.config.ts`
- Blog posts: `src/content/blog/*.mdx`
- Videos: `src/data/videos.yaml`
- Talks and podcasts: `src/content/speaking/*.md`
- Global styles and theme tokens: `src/styles/global.css`
- Blog-specific writing guidance: `docs/content/blog-agent-playbook.md`
- Blog quality rubric: `docs/writing/technical-blog-quality.md`

## Edit the right file

- Change copy on a page: edit the page or the content file it reads from.
- Add a post, video, or talk: edit the content collection, not the template.
- Schedule a post for a future date: set a future `pubDate` with `draft: false`
  (see `docs/content/scheduling-posts.md`). Check scheduled blog posts and
  Buffer posts before proposing the date.
- Change identity or social links: edit `src/consts/site.ts` only.
- Change colours or typography: edit `src/styles/global.css`.
- Change content rules or validation: edit `src/content.config.ts` or the
  relevant collection file.

## Watch outs

- Do not use em dashes or en dashes in visible copy.
- Do not hard-code identity in pages or components.
- Do not put content in templates if it belongs in data.
- Do not style a class in a parent component if that class is passed to a child
  component in Astro. The scoped selector will not match.
- Always run `npm run check` before committing. It catches schema problems and
  broken cross-links.
- Treat scheduled blog posts and social posts as one campaign. Do not guess a
  date without checking the current Buffer queue.

## Useful commands

```sh
npm run dev
npm run check
npm run build
npm run format
```

## If you are unsure

Pick the smallest change that fits the existing pattern, then verify it with
`npm run check`. If a page already reads from data, extend the data instead of
adding new logic in the page template.
