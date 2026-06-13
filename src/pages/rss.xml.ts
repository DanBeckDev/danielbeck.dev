import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/content';
import { siteConfig } from '../consts/site';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `Writing by ${siteConfig.name}`,
    description: siteConfig.description,
    site: context.site ?? siteConfig.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: `<language>en-gb</language>`,
  });
}
