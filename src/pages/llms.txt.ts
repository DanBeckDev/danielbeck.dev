import type { APIContext } from 'astro';
import { siteConfig } from '../consts/site';
import { getPosts } from '../lib/content';

/**
 * /llms.txt — a markdown index for LLMs and AI agents (https://llmstxt.org).
 * Generated from site content so it stays current as posts are published.
 */
export async function GET(_context: APIContext) {
  const posts = await getPosts();
  const url = siteConfig.url;

  const lines = [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.description}`,
    '',
    '## Pages',
    `- [Home](${url}/): overview, latest writing, talks, and open-source contributions`,
    `- [Writing](${url}/blog/): long-form articles on frontend architecture, design systems, developer experience, and AI-driven development`,
    `- [Open Source](${url}/open-source/): merged pull requests to external libraries, fetched live from GitHub`,
    `- [Speaking](${url}/speaking/): talks and podcast appearances`,
    `- [YouTube](${url}/youtube/): talks, podcasts, and walkthroughs`,
    `- [About](${url}/about/): background and areas of focus`,
    `- [Contact](${url}/contact/): email and social links`,
    '',
    '## Writing',
    ...posts.map((p) => `- [${p.data.title}](${url}/blog/${p.id}/): ${p.data.description}`),
    '',
    '## Feeds',
    `- [RSS feed](${url}/rss.xml)`,
    `- [Sitemap](${url}/sitemap-index.xml)`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
