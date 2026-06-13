import { OGImageRoute } from 'astro-og-canvas';
import { getPosts } from '../../lib/content';
import { siteConfig } from '../../consts/site';

// Static (non-post) pages that want a tailored social card.
const staticPages: Record<string, { title: string; description: string }> = {
  home: { title: siteConfig.name, description: siteConfig.tagline },
  writing: {
    title: 'Writing',
    description: 'Frontend architecture, design systems, and AI-driven development.',
  },
  youtube: {
    title: 'Talks & podcasts',
    description: 'Talks, podcasts, and walkthroughs on frontend and AI engineering.',
  },
  'open-source': {
    title: 'Open Source',
    description: 'Design systems and frontend tooling, built in the open.',
  },
  speaking: { title: 'Speaking', description: 'Talks, podcasts, and workshops.' },
  about: { title: `About ${siteConfig.name}`, description: siteConfig.role },
  contact: { title: 'Contact', description: 'Get in touch with Daniel Beck.' },
};

const posts = await getPosts();
const postPages = Object.fromEntries(
  posts.map((post) => [post.id, { title: post.data.title, description: post.data.description }]),
);

const pages = { ...staticPages, ...postPages };

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    bgGradient: [
      [16, 19, 26],
      [10, 12, 16],
    ],
    border: { color: [42, 159, 214], width: 8, side: 'inline-start' },
    padding: 72,
    font: {
      title: {
        color: [230, 233, 239],
        size: 62,
        weight: 'Bold',
        lineHeight: 1.15,
        families: ['Inter'],
      },
      description: {
        color: [153, 162, 178],
        size: 30,
        weight: 'Normal',
        lineHeight: 1.4,
        families: ['Inter'],
      },
    },
    fonts: ['./public/fonts/Inter-Bold.ttf', './public/fonts/Inter-Regular.ttf'],
  }),
});
