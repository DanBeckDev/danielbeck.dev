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

## Buffer MCP capabilities

The installed Buffer MCP connection is OAuth-backed and exposes capability
groups for:

- account and channel information
- reading, creating, scheduling, and managing posts
- reading and saving ideas
- reading supported insights

Exact tool names can vary by MCP client and server version. Before posting, ask
the connected agent to list the Buffer tools and choose the tools that correspond
to:

- list channels or accounts
- list scheduled posts
- create or schedule a post
- create a draft or idea, if manual review is needed
- update, delete, or manage a post, if the server exposes those tools

If a management action is not exposed by the MCP tools in the current client,
use the Buffer app for that action rather than guessing another API path.

## Preconditions

1. The Buffer MCP server is connected to your agent and authenticated. If tool
   calls fail with an auth error, stop and point Daniel at
   [./connecting-buffer.md](./connecting-buffer.md). Do not try to post any other
   way.
2. Daniel's LinkedIn profile and X account are connected as channels in Buffer.

Discover the channels first. Call the Buffer MCP tool that lists channels,
accounts, or profiles, and read off the id for LinkedIn and the id for X. The
exact tool names come from the connected server, so introspect what is available
rather than assuming.

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

3. **Pick the time.** Default to Buffer's native queue for each channel
   (`addToQueue`). Buffer stores channel-specific posting slots, and those slots
   are likely based on its own engagement testing. Use custom scheduling only if
   Daniel asks for a specific time or the queue is clearly wrong for the launch.

4. **Check for duplicates.** Before creating anything, list Buffer's existing
   scheduled posts and look for the same URL on the same channel. If it is already
   queued, do not schedule it again. Say so and stop.

5. **Create the posts.** Call the Buffer create or schedule tool twice: once with
   the LinkedIn channel id and the LinkedIn copy, once with the X channel id and
   the X copy. Use `mode: addToQueue` unless Daniel asked for a custom time.
   Report the post ids, channel names, and scheduled times back to Daniel.

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

- Prefer Buffer's native queue (`addToQueue`) for normal sharing. It already has
  channel-specific slots for LinkedIn and X, and those slots may differ by
  platform.
- Use `get_channel` before creating posts so you can see each channel's posting
  schedule and confirm the queue is active.
- If Daniel asks for a custom time, use `mode: customScheduled` and construct the
  `dueAt` value in the timezone returned by `get_account` (usually
  `Europe/London`). Do not assume UTC for a human-specified local time.
- If using custom times, target Tue, Wed, or Thu at ~15:00 UK for LinkedIn, and
  stagger X rather than posting both platforms at the same instant. The blog
  publishing rationale is in
  [../content/scheduling-posts.md](../content/scheduling-posts.md), but Buffer
  social sharing does not need to match the site's rebuild schedule.

## Safety and idempotency

- **No duplicates.** Always list the queue and check the URL before creating. If a
  run is repeated, it must detect the existing post and skip.
- **Cancel or reschedule** through the Buffer MCP if update/delete tools are
  exposed in the current client. Otherwise use the Buffer app. Do not create a
  second post to "fix" a first one without removing the first.
- **Want a manual check first?** Create the posts as Buffer drafts instead of
  scheduled, or save them as Buffer ideas if that is the safer available tool.
  Nothing publishes until Daniel reviews and schedules them in Buffer. Use this
  if the copy is sensitive or you are unsure.
- These post publicly to Daniel's real accounts. When in doubt, draft and ask.
