# CLAUDE.md

Guidance for AI assistants (and humans) working on danielbeck.dev. Full
documentation is in [`docs/`](./docs/README.md). Read it before non-trivial work.

## Non-negotiable rules

1. **No em dashes (`—`) or en dashes (`–`) in any visible copy.** They read as
   AI-written. Use a full stop, comma, colon, or parentheses. Normal hyphens in
   compound words are fine. This is the project owner's top priority. See
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

Astro 6 (static) + MDX + Tailwind v4, deployed on Cloudflare Pages. No CMS.

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
- Talks: `src/content/speaking/*.md`
- Design tokens and theming: `src/styles/global.css`

See [`docs/`](./docs/README.md) for the full guide to each.
