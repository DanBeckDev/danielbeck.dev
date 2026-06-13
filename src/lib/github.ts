import type { Project } from './content';

/**
 * Optional build-time enrichment of project cards with live star/fork counts.
 *
 * - With no GITHUB_TOKEN set, or on any network/API error, the static
 *   frontmatter values are returned unchanged — the build never fails here.
 * - Set GITHUB_TOKEN as a Cloudflare Pages build env var to enable it.
 */

type Enriched = { stars?: number; forks?: number };

const TOKEN = import.meta.env.GITHUB_TOKEN as string | undefined;

/** Parse "owner/repo" out of a GitHub URL or "owner/repo" string. */
function ownerRepo(repoUrl: string): string | null {
  const match = repoUrl.match(/github\.com\/([^/]+\/[^/#?]+)/i) ?? repoUrl.match(/^([^/]+\/[^/]+)$/);
  return match ? match[1].replace(/\.git$/, '') : null;
}

async function fetchRepo(slug: string): Promise<Enriched | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${slug}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'danielbeck.dev',
        ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
      },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: number; forks_count?: number };
    return { stars: data.stargazers_count, forks: data.forks_count };
  } catch {
    return null;
  }
}

/** Returns a Map keyed by project id with any successfully fetched counts. */
export async function enrichProjects(projects: Project[]): Promise<Map<string, Enriched>> {
  const result = new Map<string, Enriched>();
  if (!TOKEN) return result; // opt-in: skip the network entirely without a token
  await Promise.all(
    projects.map(async (project) => {
      const slug = ownerRepo(project.data.repoUrl);
      if (!slug) return;
      const enriched = await fetchRepo(slug);
      if (enriched) result.set(project.id, enriched);
    }),
  );
  return result;
}
