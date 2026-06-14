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

`.github/workflows/scheduled-rebuild.yml` handles this. It runs on a schedule
(every 6 hours by default) and pings a Cloudflare deploy hook, which triggers a
rebuild. At that rebuild, any post whose `pubDate` has passed becomes live.

### One-time setup

1. Cloudflare dashboard: **Workers & Pages > your Worker > Settings > Builds >
   Deploy Hooks**. Create a hook for the `main` branch and copy its URL.
2. GitHub: **Settings > Secrets and variables > Actions**. Add a repository
   secret named `CLOUDFLARE_DEPLOY_HOOK` with that URL.

Until the secret is set, the workflow runs but does nothing (it skips safely).

### Timing

A scheduled post appears at the first rebuild after its `pubDate`, so with the
default every-6-hours cron it can be up to ~6 hours late. To tighten this, edit
the `cron` in the workflow (for example hourly: `0 * * * *`), or align the cron
near the time you usually publish. Each build re-evaluates the whole schedule,
so multiple scheduled posts are handled correctly.

## Verifying

Run `npm run build` locally: scheduled posts are listed in the build log, e.g.

```
[blog] 1 scheduled post(s) hidden until their pubDate:
  - a-post-for-next-week -> 2026-06-21T00:00:00.000Z
```

They are excluded from the build until their date passes.
