# Scheduling a blog post

You can write a post now and have it go live on a future date.

## How to schedule

Set the post's `pubDate` to a future date (or date and time) and leave
`draft: false`:

```yaml
---
title: 'A post for next week'
description: '...'
pubDate: 2026-06-21 # future date: scheduled
category: Frontend Architecture
tags: [...]
---
```

That is the whole mechanism:

- In production, a post whose `pubDate` is in the future is **hidden** from the
  blog, RSS, sitemap, tag and category pages, and its own URL (it returns 404).
- In `npm run dev`, scheduled posts are **shown**, so you can preview them.
- When a production build runs on or after the `pubDate`, the post is included
  and goes live everywhere automatically.

For a specific time, use a full ISO datetime (UTC): `pubDate: 2026-06-21T09:00:00Z`.

## Scheduled vs draft

- **Scheduled**: `draft: false` with a future `pubDate`. Publishes automatically
  at that date.
- **Draft**: `draft: true`. Hidden in production indefinitely, regardless of
  date, until you set it to `false`.

## Why it needs a scheduled rebuild

A static site only decides what is published when it builds. Setting a future
`pubDate` is not enough on its own; the site has to **rebuild after that time**
for the post to appear.

`.github/workflows/scheduled-rebuild.yml` handles this. It pings a Cloudflare
deploy hook on a schedule, which triggers a rebuild. At that rebuild, any post
whose `pubDate` has passed becomes live.

### One-time setup

1. Cloudflare dashboard: **Workers & Pages > your Worker > Settings > Builds >
   Deploy Hooks**. Create a hook for the `main` branch and copy its URL.
2. GitHub: **Settings > Secrets and variables > Actions**. Add a repository
   secret named `CLOUDFLARE_DEPLOY_HOOK` with that URL.

Until the secret is set, the workflow runs but does nothing (it skips safely).

## Recommended slot and the UK-time setup

Based on 2026 engagement data (blog studies, LinkedIn, Hacker News/Reddit), the
best slot for a UK author with a professional and globally-distributed audience
is **Tuesday to Thursday, 15:00 UK** (Wednesday strongest). 3pm UK is LinkedIn's
afternoon peak for a UK/Europe network, lands at ~10am US Eastern (prime for
Hacker News, Reddit, and US LinkedIn), and is still European afternoon. You pick
the day by which date you put on a post; aim for Tue/Thu/Wed.

The rebuild cron is set to **`0 14,15 * * *`** to hit 15:00 UK in both seasons:
GitHub cron is UTC-only, so 14:00 UTC covers BST (summer) and 15:00 UTC covers
GMT (winter). The run that does not match the season is a harmless no-op.

### Writing the pubDate in UK time

The build runs in UTC, so put the UK offset on `pubDate` to land exactly on
15:00 UK:

- **Summer (BST, late Mar to late Oct):** `pubDate: 2026-07-15T15:00:00+01:00`
- **Winter (GMT, late Oct to late Mar):** `pubDate: 2026-01-15T15:00:00+00:00`

If you only set a date (`pubDate: 2026-07-15`), the post goes live at the first
daily run (~15:00 in summer, ~14:00 in winter) instead of an exact time. That is
usually fine; use the full offset form when the exact hour matters.

To change the slot, edit the two hours in the workflow `cron` (and your
`pubDate` times to match). Each build re-evaluates the whole schedule, so
multiple scheduled posts are handled correctly.

## Verifying

Run `npm run build` locally: scheduled posts are listed in the build log, e.g.

```
[blog] 1 scheduled post(s) hidden until their pubDate:
  - a-post-for-next-week -> 2026-06-21T00:00:00.000Z
```

They are excluded from the build until their date passes.
