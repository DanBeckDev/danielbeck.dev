# Videos and speaking

Both are small content collections. Videos are one YAML file; talks are one
markdown file each. The YouTube page shows two sections: a curated **Featured**
list (from `videos.yaml`) and an automatic **Latest from the channel** feed.

Working YouTube scripts live in
[`docs/content/youtube-scripts/`](./youtube-scripts/README.md). They are planning
documents, not public site content. Use them when turning a post, talk, or notes
file into a recording script.

## Latest from the channel (automatic)

The "Latest from the channel" section pulls recent uploads from YouTube's public
RSS feed at build time (no API key). It only renders once you set the channel id
in `src/consts/site.ts`:

```ts
youtubeChannelId: 'UCxxxxxxxxxxxxxxxxxxxxxx',
```

This is the `UC...` channel id, not the `@handle`. To find it: open
`youtube.com/@danielbeckdev`, View Source, and search for `"channelId"`. With it
empty (the default), the section is simply hidden and the fetch never runs. The
fetch fails gracefully, so a YouTube outage will not break the build. Code is in
`src/lib/youtube.ts`.

## Videos (`src/data/videos.yaml`)

Each entry needs a unique `id`. Order in the file does not matter; the site sorts
by `publishedAt`, newest first.

```yaml
- id: coder-career-podcast # unique, used as the entry id
  youtubeId: XYDUfa08-r8 # the 11-char YouTube id (drives the embed + thumbnail)
  title: 'The Coder Career Podcast: JavaScript, Self-Teaching & Productivity'
  description: >-
    One or two sentences. Shown on the card.
  publishedAt: 2021-06-01 # required
  duration: 'PT12M40s' # optional, ISO 8601
  tags: [javascript, career] # optional
  relatedPost: building-react-from-scratch # optional, a blog post id
  featured: true # optional. Featured videos show on the home page.
```

Notes:

- The thumbnail comes from the real `youtubeId`, so a placeholder id shows a
  broken image that falls back to a gradient. Use real ids.
- `relatedPost` must be an existing post id or the build fails. It renders a
  "Read the write-up" link on the card.
- The embed is privacy-friendly: it shows a thumbnail and only loads the YouTube
  iframe (`youtube-nocookie.com`) when clicked.

## Speaking (`src/content/speaking/*.md`)

One file per talk or podcast. The filename is the entry id.

```md
---
title: "Let's make a module bundler!"
event: Brum.js # required
location: Birmingham, UK # optional
date: 2021-08-26 # required
type: meetup # conference | meetup | podcast | workshop
slidesUrl: https://... # optional
recordingUrl: https://... # optional
relatedPost: some-post-id # optional, a blog post id
abstract: >- # optional, shown on the timeline
  One short paragraph describing the talk.
status: past # upcoming | past | proposed
---
```

The Speaking page renders these as a vertical timeline, newest first, with
links to slides, a recording, and a related article where present. The page is
designed to look intentional even with a single entry, so it is fine to add
talks one at a time.
