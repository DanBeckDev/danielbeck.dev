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
  url: z.url(),
  name: z.string(),
  description: z.string().optional(),
  language: z.string().optional(),
  stars: z.number().optional(),
});
const talkLink = z.object({
  title: z.string(),
  event: z.string().optional(),
  url: z.url().optional(),
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
      canonicalUrl: z.url().optional(),
      series: z.string().optional(),
      video: videoLink.optional(),
      repo: repoLink.optional(),
      talk: talkLink.optional(),
      discussion: z.object({ linkedinUrl: z.url() }).optional(),
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
    slidesUrl: z.url().optional(),
    recordingUrl: z.url().optional(),
    relatedPost: z.string().optional(),
    abstract: z.string().optional(),
    status: z.enum(['upcoming', 'past', 'proposed']).default('upcoming'),
  }),
});

export const collections = { blog, videos, speaking };
