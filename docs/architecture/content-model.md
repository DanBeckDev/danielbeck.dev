# Content model

All content is typed and validated. The schemas live in `src/content.config.ts`
and are enforced at build time, so a typo in frontmatter or a broken cross-link
will fail `npm run build` and `npm run check` rather than ship.

## Collections

There are three collections:

| Collection | Source                      | Loader   | Each entry is...      |
| ---------- | --------------------------- | -------- | --------------------- |
| `blog`     | `src/content/blog/*.mdx`    | `glob()` | A long-form article   |
| `videos`   | `src/data/videos.yaml`      | `file()` | A single video record |
| `speaking` | `src/content/speaking/*.md` | `glob()` | A talk or podcast     |

There is no "projects" collection. Open-source work is fetched live from GitHub
instead (see [../content/open-source.md](../content/open-source.md)).

## Categories and tags

- **Category**: exactly one per post. It must be one of the nine names in
  `src/consts/categories.ts` (the schema is a Zod `enum` built from that list).
  Adding a category is a deliberate edit to that file. A typo fails the build.
- **Tags**: zero or more per post, free-form, lower-case and hyphenated
  (`design-systems`, `react`). Tag index pages are generated only for tags that
  are actually used.

The nine categories: Frontend Architecture, Micro-Frontends, Design Systems,
Developer Experience, AI Engineering, TypeScript, Web Performance, Open Source,
Engineering Leadership.

## Cross-links (the reputation system)

The site connects each article to the video, repo, talk, or discussion that goes
with it. These links are plain data:

- A **blog post** can declare `video`, `repo`, `talk`, and `discussion` in its
  frontmatter. The post page renders them as blocks at the end.
- A **video** (`videos.yaml`) can declare `relatedPost`. Its card shows a "Read
  the write-up" link.
- A **talk** (`speaking/*.md`) can declare `relatedPost`.

`relatedPost` values are blog post ids (the filename without extension). They are
validated in `src/lib/content.ts`: if a video or talk points at a post that does
not exist, the build throws. Keep ids in sync when you rename or delete a post.

## Queries

Use the helpers in `src/lib/content.ts` rather than calling `getCollection`
directly, so draft filtering and sorting stay consistent:

- `getPosts()` returns published posts, newest first. Drafts are hidden in
  production builds and visible in `npm run dev`.
- `getAllTags()` returns used tags with counts.
- `getRelatedPosts(post)` scores by shared series, tags, and category.
- `getVideos()`, `getSpeaking()` return their collections sorted by date and run
  the cross-link checks.

## Drafts

Set `draft: true` in a post's frontmatter while writing. It stays visible in the
dev server and is excluded from the production build, the blog index, RSS, the
sitemap, and tag and category pages. Flip it to `false` to publish.
