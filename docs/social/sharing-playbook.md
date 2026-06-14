# Sharing a post or video on social

This is the agent recipe for promoting site content on LinkedIn and X. It is for
an AI agent (Codex CLI, Claude Code, or any MCP client) acting on Daniel's behalf.

The site is not changed by any of this. Blog posts publish normally, and YouTube
videos appear automatically. Sharing is a separate step: you create scheduled
posts in Buffer, and Buffer publishes them to LinkedIn and X at the chosen time.

## How the pieces fit

- **Buffer is the backend.** It holds the LinkedIn and X connections and does the
  actual posting. You never touch the LinkedIn or X APIs.
- **Buffer's MCP server is the interface.** Once it is connected (see
  [./connecting-buffer.md](./connecting-buffer.md)), you call its tools to list
  channels and create scheduled posts.
- **One post per channel.** Buffer schedules a single channel per post, so you
  create one post for LinkedIn and one for X. That is what makes the per-platform
  copy work: each gets its own text.

## Preconditions

1. The Buffer MCP server is connected to your agent and authenticated. If tool
   calls fail with an auth error, stop and point Daniel at
   [./connecting-buffer.md](./connecting-buffer.md). Do not try to post any other
   way.
2. Daniel's LinkedIn profile and X account are connected as channels in Buffer.

Discover the channels first. Call the Buffer MCP's list-channels tool and read off
the `channelId` for LinkedIn and the `channelId` for X. The exact tool names come
from the connected server, so introspect what is available rather than assuming;
you are looking for "list channels" and "create post" (or "schedule post").

## Share a blog post

1. **Resolve the URL and metadata.** The canonical URL is `siteConfig.url` +
   `/blog/<slug>/`, for example `https://danielbeck.dev/blog/building-react-from-scratch/`.
   The slug is the post filename without `.mdx`. Take the title and `description`
   from the post frontmatter (`src/content/blog/<slug>.mdx`). Always use the
   trailing slash, to match `trailingSlash: 'always'`.

2. **Write the copy, per platform.** Follow
   [../writing/voice-and-tone.md](../writing/voice-and-tone.md) exactly. The most
   important rule: no long dashes (em or en). Plain, direct, specific, peer to
   peer. No hype words, no filler openers. See the templates below.

3. **Pick the time.** Default to the next high-exposure UK slot: Tuesday to
   Thursday, around 15:00 UK (Wednesday is strongest). The rationale and the
   UK-to-UTC conversion are in
   [../content/scheduling-posts.md](../content/scheduling-posts.md). Stagger the
   two platforms so they do not post the same minute (see "Timing" below).

4. **Check for duplicates.** Before creating anything, list Buffer's existing
   scheduled posts and look for the same URL on the same channel. If it is already
   queued, do not schedule it again. Say so and stop.

5. **Create the posts.** Call the Buffer create/schedule tool twice: once with the
   LinkedIn `channelId` and the LinkedIn copy, once with the X `channelId` and the
   X copy. Pass the scheduled time as a UTC ISO timestamp (Buffer's `dueAt`, for
   example `2026-07-15T14:00:00.000Z`). Report the two scheduled times back to
   Daniel with the post links Buffer returns.

## Share a YouTube video

This is agent-initiated. Daniel says something like "share my latest video."

1. **Find the video.** Fetch the channel feed:
   `https://www.youtube.com/feeds/videos.xml?channel_id=UCAdBTWlnlVbpcTa1DIUm9EQ`
   (the channel id is `siteConfig.youtubeChannelId`). Take the latest entry, or the
   one Daniel names. Read its title and video id, and build the watch URL
   `https://www.youtube.com/watch?v=<id>`. (Optional shortcut: `npm run videos:latest`
   prints the recent uploads as JSON if that script is present.)

2. From here it is identical to a blog post: write per-platform copy, pick the
   time, check for duplicates, create one post per channel.

## Copy templates

These are starting points, not fill-in-the-blanks. Rewrite so it sounds like
Daniel, not a template. No long dashes anywhere.

**LinkedIn** (room to breathe, up to 3000 chars; aim for 3 to 6 short lines):

```
New post: <concrete title or the real hook>.

<One or two sentences on what it covers and who it helps. Name the real thing:
the tool, the tradeoff, the result.>

<link>
```

**X** (one tight thought, 280 chars total including the link):

```
<The sharpest single point of the post.> <link>
```

Copy rules that bite:

- **X length.** The hard limit is 280 characters. X wraps every URL to ~23
  characters via t.co, so budget 23 for the link regardless of its real length.
- **Hashtags.** At most 1 to 2 on X, and only if genuinely relevant. LinkedIn can
  take a few more but keep it tasteful. No hashtag stuffing.
- **Links.** Put the plain URL in the text on both platforms; each generates its
  own preview card. Do not use a shortener.
- **Voice.** Different audiences, different copy. LinkedIn leans professional and
  a little more context. X is punchier. Neither should read like marketing.

## Timing

- Target Tue, Wed, or Thu at ~15:00 UK. Convert to the UTC `dueAt` Buffer wants:
  in summer (BST) 15:00 UK is `14:00Z`; in winter (GMT) it is `15:00Z`. Full
  detail in [../content/scheduling-posts.md](../content/scheduling-posts.md).
- Stagger the platforms. A simple default that works: LinkedIn at 15:00 UK, X at
  12:00 UK the same day. Do not fire identical posts to both at the same instant.
- If the next good slot has already passed for today, schedule the next eligible
  Tue/Wed/Thu rather than posting at a weak time.

## Safety and idempotency

- **No duplicates.** Always list the queue and check the URL before creating. If a
  run is repeated, it must detect the existing post and skip.
- **Cancel or reschedule** through the Buffer MCP (its delete/update tool) or in
  the Buffer app. Do not create a second post to "fix" a first one without
  removing the first.
- **Want a manual check first?** Create the posts as Buffer drafts instead of
  scheduled. Nothing publishes until Daniel reviews and schedules them in Buffer.
  Use this if the copy is sensitive or you are unsure.
- These post publicly to Daniel's real accounts. When in doubt, draft and ask.
