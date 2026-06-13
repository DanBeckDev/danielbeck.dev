import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;
export type Project = CollectionEntry<'projects'>;
export type Video = CollectionEntry<'videos'>;
export type Talk = CollectionEntry<'speaking'>;

/** lowercase, hyphenated, ASCII slug — shared by tag links AND getStaticPaths
 *  so a tag's URL is always identical on both ends. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const postUrl = (id: string) => `/blog/${id}/`;
export const tagUrl = (tag: string) => `/blog/tags/${slugify(tag)}/`;
export const categoryUrl = (categorySlug: string) => `/blog/category/${categorySlug}/`;
export const projectUrl = (id: string) => `/open-source/#${id}`;

const isProd = import.meta.env.PROD;
const byDateDesc = (a: { data: { pubDate?: Date; publishedAt?: Date; date?: Date } }, b: typeof a) => {
  const da = a.data.pubDate ?? a.data.publishedAt ?? a.data.date ?? new Date(0);
  const db = b.data.pubDate ?? b.data.publishedAt ?? b.data.date ?? new Date(0);
  return db.getTime() - da.getTime();
};

/** Published posts, newest first. Drafts are hidden in production builds
 *  but visible during `astro dev`. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !isProd || data.draft !== true);
  return posts.sort(byDateDesc);
}

export async function getFeaturedPosts(limit = 3): Promise<Post[]> {
  const posts = await getPosts();
  const featured = posts.filter((p) => p.data.featured);
  return (featured.length ? featured : posts).slice(0, limit);
}

export async function getPostsByCategoryName(name: string): Promise<Post[]> {
  return (await getPosts()).filter((p) => p.data.category === name);
}

export async function getPostsByTagSlug(tagSlug: string): Promise<Post[]> {
  return (await getPosts()).filter((p) => p.data.tags.some((t) => slugify(t) === tagSlug));
}

export type TagInfo = { tag: string; slug: string; count: number };

/** All tags actually used by published posts, with counts (desc, then alpha). */
export async function getAllTags(): Promise<TagInfo[]> {
  const posts = await getPosts();
  const map = new Map<string, TagInfo>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = slugify(tag);
      const existing = map.get(slug);
      if (existing) existing.count += 1;
      else map.set(slug, { tag, slug, count: 1 });
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** Rough reading time from the raw MDX body (~200 wpm). */
export function readingTime(body: string | undefined): number {
  if (!body) return 1;
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Posts related to `post`: same series first, then shared-tag overlap. */
export async function getRelatedPosts(post: Post, limit = 2): Promise<Post[]> {
  const posts = (await getPosts()).filter((p) => p.id !== post.id);
  const scored = posts
    .map((p) => {
      const sameSeries = post.data.series && p.data.series === post.data.series ? 5 : 0;
      const shared = p.data.tags.filter((t) => post.data.tags.includes(t)).length;
      const sameCategory = p.data.category === post.data.category ? 1 : 0;
      return { p, score: sameSeries + shared * 2 + sameCategory };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.p);
}

// ── Non-blog collections (with cross-link integrity assertions) ──────────

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`[content] ${message}`);
}

export async function getProjects(): Promise<Project[]> {
  const [projects, posts, videos] = await Promise.all([
    getCollection('projects'),
    getPosts(),
    getCollection('videos'),
  ]);
  const postIds = new Set(posts.map((p) => p.id));
  const videoIds = new Set(videos.map((v) => v.id));
  for (const project of projects) {
    for (const slug of project.data.relatedPosts) {
      assert(postIds.has(slug), `project "${project.id}" references missing post "${slug}"`);
    }
    for (const id of project.data.relatedVideos) {
      assert(videoIds.has(id), `project "${project.id}" references missing video "${id}"`);
    }
  }
  return projects.sort(
    (a, b) => a.data.order - b.data.order || a.data.displayName.localeCompare(b.data.displayName),
  );
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.data.featured);
  return (featured.length ? featured : projects).slice(0, limit);
}

export async function getVideos(): Promise<Video[]> {
  const [videos, posts, projects] = await Promise.all([
    getCollection('videos'),
    getPosts(),
    getCollection('projects'),
  ]);
  const postIds = new Set(posts.map((p) => p.id));
  const projectIds = new Set(projects.map((p) => p.id));
  for (const video of videos) {
    if (video.data.relatedPost) {
      assert(postIds.has(video.data.relatedPost), `video "${video.id}" references missing post "${video.data.relatedPost}"`);
    }
    if (video.data.relatedProject) {
      assert(projectIds.has(video.data.relatedProject), `video "${video.id}" references missing project "${video.data.relatedProject}"`);
    }
  }
  return videos.sort(byDateDesc);
}

export async function getFeaturedVideos(limit = 3): Promise<Video[]> {
  const videos = await getVideos();
  const featured = videos.filter((v) => v.data.featured);
  return (featured.length ? featured : videos).slice(0, limit);
}

export async function getSpeaking(): Promise<Talk[]> {
  const [talks, posts] = await Promise.all([getCollection('speaking'), getPosts()]);
  const postIds = new Set(posts.map((p) => p.id));
  for (const talk of talks) {
    if (talk.data.relatedPost) {
      assert(postIds.has(talk.data.relatedPost), `talk "${talk.id}" references missing post "${talk.data.relatedPost}"`);
    }
  }
  return talks.sort(byDateDesc);
}
