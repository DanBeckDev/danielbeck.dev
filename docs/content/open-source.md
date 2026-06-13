# Open Source page (auto-fetched contributions)

The Open Source page lists merged pull requests to external libraries, fetched
live from the GitHub API at build time. It is deliberately curated, not a blanket
"all my PRs" feed, so low-signal contributions (tutorial repos, one-off fixes) do
not appear.

## Adding a contribution

You only maintain a list of repositories. Add an entry to `trackedRepos` in
`src/consts/contributions.ts`:

```ts
export const trackedRepos: TrackedRepo[] = [
  { repo: 'QwikDev/partytown' },
  { repo: 'module-federation/vite' },
  { repo: 'owner/new-repo', blurb: 'Optional fallback description.' },
];
```

That is it. At the next build, `src/lib/contributions.ts` queries GitHub for the
merged pull requests authored by `siteConfig.githubUsername` in that repository,
along with the repo description, star count, and language, and renders them. The
author comes from `site.ts`, so changing the GitHub username updates this too.

Repos are ordered by most recent contribution. Within a repo, PRs are newest
first.

## `blurb`

The optional `blurb` is a fallback description, shown only if the GitHub API call
fails (for example, if the build is rate-limited). When the fetch succeeds, the
repo's real GitHub description is used instead.

## GITHUB_TOKEN

Unauthenticated GitHub requests from shared CI IP addresses are often
rate-limited, which would trigger the fallback (repo links, no PR list). Set a
`GITHUB_TOKEN` build environment variable in Cloudflare for reliable fetches. A
read-only token with no scopes is enough, since it only reads public data. The
build never fails if the token is missing; the page just degrades to links.

Locally, the fetch runs without a token and is fine for a single build. The
result is cached per process, so the dev server only fetches once per session.
