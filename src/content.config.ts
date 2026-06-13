import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';
import { categoryNames } from './consts/categories';

/** Reputation-system cross-links embedded on a post (all optional). */
const videoLink = z.object({
  youtubeId: z.string(),
  title: z.string().optional(),
});
const repoLink = z.object({
  url: z.string().url(),
  name: z.string(),
  description: z.string().optional(),
  language: z.string().optional(),
  stars: z.number().optional(),
});
const talkLink = z.object({
  title: z.string(),
  event: z.string().optional(),
  url: z.string().url().optional(),
  date: z.coerce.date().optional(),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(120),
      description: z.string().max(220),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.enum(categoryNames as unknown as [string, ...string[]]),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
      canonicalUrl: z.string().url().optional(),
      series: z.string().optional(),
      video: videoLink.optional(),
      repo: repoLink.optional(),
      talk: talkLink.optional(),
      discussion: z.object({ linkedinUrl: z.string().url() }).optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    displayName: z.string(),
    description: z.string(),
    repoUrl: z.string().url(),
    homepageUrl: z.string().url().optional(),
    tech: z.array(z.string()).default([]),
    status: z.enum(['active', 'maintained', 'archived', 'experimental']).default('active'),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    stars: z.number().optional(),
    forks: z.number().optional(),
    relatedPosts: z.array(z.string()).default([]),
    relatedVideos: z.array(z.string()).default([]),
  }),
});

const videos = defineCollection({
  loader: file('./src/data/videos.yaml'),
  schema: z.object({
    youtubeId: z.string(),
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    duration: z.string().optional(),
    tags: z.array(z.string()).default([]),
    relatedPost: z.string().optional(),
    relatedProject: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const speaking = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/speaking' }),
  schema: z.object({
    title: z.string(),
    event: z.string(),
    location: z.string().optional(),
    date: z.coerce.date(),
    type: z.enum(['conference', 'meetup', 'podcast', 'workshop']),
    slidesUrl: z.string().url().optional(),
    recordingUrl: z.string().url().optional(),
    relatedPost: z.string().optional(),
    abstract: z.string().optional(),
    status: z.enum(['upcoming', 'past', 'proposed']).default('upcoming'),
  }),
});

export const collections = { blog, projects, videos, speaking };
