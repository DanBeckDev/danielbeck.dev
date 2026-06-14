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

## Before choosing a date

Treat a scheduled blog post and its social posts as one campaign. Do not pick a
blog date from the repo alone.

Before setting `pubDate`:

- Check existing scheduled blog posts in `src/content/blog/*.mdx`.
- Check Buffer for scheduled LinkedIn and X posts.
- Avoid putting a new campaign on the same day as an existing campaign unless
  Daniel explicitly asks for that.
- Aim for up to **three posts per week**, on weekdays, when there is enough
  backlog. A simple pattern is Monday, Wednesday, Friday.
- If there is already a Monday campaign, Wednesday is usually a better next slot
  than adding another Monday post.

The publish date should leave Daniel room to build a backlog. If a post is ready
early, schedule it for the next sensible content slot rather than the earliest
possible date.

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
is **Tuesday to Thursday**, with Wednesday strongest.

That guidance is for picking a single high-quality slot. For an ongoing content
calendar, use weekday spacing first, then choose the strongest open day.

Publish the blog earlier than the social posts. The default pattern is:

- Blog post goes live at **12:00 UK**.
- LinkedIn and X go out later the same day, usually from **15:00 UK** onward.

This gives the static rebuild, cache, RSS, OG image, and link preview time to
settle before Buffer posts the link.

The rebuild cron is set to **`0 11,12,14,15 * * *`** to hit 12:00 and 15:00 UK
in both seasons. GitHub cron is UTC-only, so 11:00/14:00 UTC cover BST
(summer), and 12:00/15:00 UTC cover GMT (winter). The runs that do not match the
season are harmless no-ops.

### Writing the pubDate in UK time

The build runs in UTC, so put the UK offset on `pubDate` to land exactly on the
UK publish time:

- **Summer (BST, late Mar to late Oct):** `pubDate: 2026-07-15T12:00:00+01:00`
- **Winter (GMT, late Oct to late Mar):** `pubDate: 2026-01-15T12:00:00+00:00`

If you only set a date (`pubDate: 2026-07-15`), the post goes live at the first
daily run instead of an exact time. Use the full offset form when the exact hour
matters.

To change the slot, edit the two hours in the workflow `cron` (and your
`pubDate` times to match). Each build re-evaluates the whole schedule, so
multiple scheduled posts are handled correctly.

## Scheduling social for the same campaign

After the blog `pubDate` is chosen, schedule Buffer posts for the same calendar
day unless Daniel asks otherwise.

Use precise language:

- **Blog scheduled** means the post has a future `pubDate` and `draft: false`.
- **Campaign scheduled** means the blog is scheduled and Buffer contains the
  approved LinkedIn and X posts.

Do not tell Daniel "it is scheduled" or "the schedule is done" if only the blog
frontmatter has been updated. Say "the blog is scheduled, but Buffer is not
scheduled yet" and either ask for copy approval or schedule the approved posts.

Default campaign shape:

- Blog: 12:00 UK.
- LinkedIn: 15:00 UK or later.
- X: same day, staggered from LinkedIn.

Always get Daniel's approval for the exact social copy and timing before creating
Buffer posts. If the user has already approved exact copy and timing, create the
Buffer posts in the same workflow before reporting completion. See
[../social/sharing-playbook.md](../social/sharing-playbook.md).

## Verifying

Run `npm run build` locally: scheduled posts are listed in the build log, e.g.

```
[blog] 1 scheduled post(s) hidden until their pubDate:
  - a-post-for-next-week -> 2026-06-21T00:00:00.000Z
```

They are excluded from the build until their date passes.

Before saying the campaign is scheduled:

- Confirm the blog frontmatter has the intended future `pubDate`.
- Confirm `draft: false`.
- Confirm Buffer contains the LinkedIn and X posts at the approved times.
- Report the blog time and Buffer post ids back to Daniel.

If Buffer is not scheduled yet, do not call it a scheduled campaign. Report the
missing Buffer step plainly.
