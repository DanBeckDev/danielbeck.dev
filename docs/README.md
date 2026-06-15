# danielbeck.dev documentation

This folder explains how the site is built and how to add to it. It is written
for both humans and AI assistants. If you are an AI agent making changes, read
[ai-agent-guide.md](./ai-agent-guide.md) first, then
[writing/voice-and-tone.md](./writing/voice-and-tone.md) before writing any
copy, and follow it exactly.

## The golden rules

1. **No em dashes or en dashes in any visible copy.** They read as AI-written.
   Use a full stop, a comma, a colon, or parentheses instead. Normal hyphens
   in compound words (`senior-level`, `open-source`) are fine. See
   [writing/voice-and-tone.md](./writing/voice-and-tone.md).
2. **All identity lives in `src/consts/site.ts`.** Name, role, email, social
   links, handles. Never hard-code these anywhere else.
3. **Content is data, not markup.** Posts, videos, talks, and tracked
   repositories live in content collections and config files, not in page
   templates. Pages read from them.
4. **The build is the test.** `npm run check` validates content schemas and
   types, and a dangling cross-link fails the build on purpose. Run it before
   you commit.
5. **Scheduled content is a campaign.** Check existing scheduled blog posts and
   Buffer posts before choosing dates. Blog posts should publish earlier than
   social posts on the same day.

## Where to look

| You want to...                         | Read                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------ |
| Get the fast AI-agent version          | [ai-agent-guide.md](./ai-agent-guide.md)                                 |
| Get a machine-readable map             | [agent-map.json](../agent-map.json)                                      |
| Write a blog post with an agent        | [content/blog-agent-playbook.md](./content/blog-agent-playbook.md)       |
| Check blog quality                     | [writing/technical-blog-quality.md](./writing/technical-blog-quality.md) |
| Understand the stack and layout        | [architecture/overview.md](./architecture/overview.md)                   |
| Understand collections and cross-links | [architecture/content-model.md](./architecture/content-model.md)         |
| Change styles, colours, or dark mode   | [architecture/styling.md](./architecture/styling.md)                     |
| Write a blog post                      | [content/blog-posts.md](./content/blog-posts.md)                         |
| Schedule a post for a future date      | [content/scheduling-posts.md](./content/scheduling-posts.md)             |
| Share a post or video on social        | [social/sharing-playbook.md](./social/sharing-playbook.md)               |
| Write social copy                      | [social/social-posting-conventions.md](./social/social-posting-conventions.md) |
| Produce a YouTube video                | Use sibling repo `../danielbeck-video-studio`                            |
| Edit a specific page's content         | [content/pages.md](./content/pages.md)                                   |
| Add an open-source contribution        | [content/open-source.md](./content/open-source.md)                       |
| Add a video or a talk                  | [content/videos-and-speaking.md](./content/videos-and-speaking.md)       |
| Use a component inside MDX             | [components/mdx-components.md](./components/mdx-components.md)           |
| Get the tone and wording right         | [writing/voice-and-tone.md](./writing/voice-and-tone.md)                 |

## Quick start

```sh
npm install
npm run dev        # http://localhost:4321
npm run check      # type + content-schema validation
npm run build      # production build to ./dist
npm run format     # Prettier
```
