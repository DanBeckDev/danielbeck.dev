import { trackedRepos } from '../consts/contributions';
import { siteConfig } from '../consts/site';

/**
 * Build-time aggregation of Daniel's merged pull requests in the external
 * libraries listed in src/consts/contributions.ts.
 *
 * - No GITHUB_TOKEN: works at low volume but GitHub may rate-limit shared CI
 *   IPs (HTTP 403). On any failure a repo still renders with its fallback blurb
 *   and a link to the live PR list on GitHub — the page is never empty.
 * - With GITHUB_TOKEN set as a build env var, fetches are authenticated and
 *   reliable. Recommended for production builds.
 */

const USERNAME = siteConfig.githubUsername;
const TOKEN = import.meta.env.GITHUB_TOKEN as string | undefined;

export interface ContributionPR {
  title: string;
  url: string;
  number: number;
  mergedAt: string;
}

export interface RepoContribution {
  repo: string; // owner/name
  owner: string;
  name: string;
  url: string;
  prsUrl: string; // live "my PRs in this repo" search on GitHub
  description?: string;
  stars?: number;
  language?: string;
  prs: ContributionPR[];
  /** true if live PR data was fetched; false means fallback-only. */
  live: boolean;
}

const ghHeaders = () => ({
  Accept: 'application/vnd.github+json',
  'User-Agent': 'danielbeck.dev',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
});

async function fetchMeta(repo: string) {
  const res = await fetch(`https://api.github.com/repos/${repo}`, { headers: ghHeaders() });
  if (!res.ok) return null;
  return (await res.json()) as {
    description: string | null;
    stargazers_count: number;
    language: string | null;
  };
}

async function fetchMergedPRs(repo: string): Promise<ContributionPR[]> {
  const q = encodeURIComponent(`repo:${repo} author:${USERNAME} is:pr is:merged`);
  const res = await fetch(
    `https://api.github.com/search/issues?q=${q}&per_page=50&sort=created&order=desc`,
    { headers: ghHeaders() },
  );
  if (!res.ok) throw new Error(`search ${res.status}`);
  const data = (await res.json()) as {
    items?: { title: string; html_url: string; number: number; closed_at: string }[];
  };
  return (data.items ?? []).map((it) => ({
    title: it.title,
    url: it.html_url,
    number: it.number,
    mergedAt: it.closed_at,
  }));
}

let cache: RepoContribution[] | null = null;

export async function getContributions(): Promise<RepoContribution[]> {
  if (cache) return cache;

  const result = await Promise.all(
    trackedRepos.map(async ({ repo, blurb }): Promise<RepoContribution> => {
      const [owner, name] = repo.split('/');
      const base: RepoContribution = {
        repo,
        owner,
        name,
        url: `https://github.com/${repo}`,
        prsUrl: `https://github.com/${repo}/pulls?q=${encodeURIComponent(`is:pr author:${USERNAME}`)}`,
        description: blurb,
        prs: [],
        live: false,
      };
      try {
        const [meta, prs] = await Promise.all([fetchMeta(repo), fetchMergedPRs(repo)]);
        if (meta) {
          base.description = meta.description ?? blurb;
          base.stars = meta.stargazers_count;
          base.language = meta.language ?? undefined;
        }
        base.prs = prs;
        base.live = true;
      } catch {
        /* keep fallback blurb + GitHub link */
      }
      return base;
    }),
  );

  // Order repos by most recent contribution (latest merged PR first).
  // Repos with no fetched PRs fall to the end, keeping their config order.
  const latestMerge = (r: RepoContribution) =>
    r.prs.reduce((max, pr) => Math.max(max, Date.parse(pr.mergedAt) || 0), 0);
  result.sort((a, b) => latestMerge(b) - latestMerge(a));

  cache = result;
  return result;
}

export const totalMergedPRs = (repos: RepoContribution[]) =>
  repos.reduce((sum, r) => sum + r.prs.length, 0);
