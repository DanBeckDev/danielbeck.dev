import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;
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

const isProd = import.meta.env.PROD;
/** Build timestamp. A post whose pubDate is after this is "scheduled" and is
 *  excluded from production builds until a later build passes its date. */
const buildNow = Date.now();
let loggedSchedule = false;
const byDateDesc = (
  a: { data: { pubDate?: Date; publishedAt?: Date; date?: Date } },
  b: typeof a,
) => {
  const da = a.data.pubDate ?? a.data.publishedAt ?? a.data.date ?? new Date(0);
  const db = b.data.pubDate ?? b.data.publishedAt ?? b.data.date ?? new Date(0);
  return db.getTime() - da.getTime();
};

/** Published posts, newest first.
 *  - Drafts (`draft: true`) are hidden in production, shown during `astro dev`.
 *  - Scheduled posts (a `pubDate` in the future) are hidden in production until
 *    a build runs on or after that date; they are shown in `astro dev` so you
 *    can preview them. Set `pubDate` to a future date/time to schedule a post.
 *    Note: the site must rebuild after that time for the post to appear (see the
 *    scheduled-rebuild workflow). */
export async function getPosts(): Promise<Post[]> {
  // Drafts are excluded in production by the collection filter.
  const published = await getCollection('blog', ({ data }) => !isProd || data.draft !== true);
  if (!isProd) return published.sort(byDateDesc);

  const live = published.filter((p) => p.data.pubDate.getTime() <= buildNow);

  // Surface scheduled posts once in the build log so they aren't a silent no-op.
  if (!loggedSchedule) {
    loggedSchedule = true;
    const scheduled = published.filter((p) => p.data.pubDate.getTime() > buildNow);
    if (scheduled.length) {
      console.log(`[blog] ${scheduled.length} scheduled post(s) hidden until their pubDate:`);
      for (const p of scheduled) console.log(`  - ${p.id} -> ${p.data.pubDate.toISOString()}`);
    }
  }

  return live.sort(byDateDesc);
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

export async function getVideos(): Promise<Video[]> {
  const [videos, posts] = await Promise.all([getCollection('videos'), getPosts()]);
  const postIds = new Set(posts.map((p) => p.id));
  for (const video of videos) {
    if (video.data.relatedPost) {
      assert(
        postIds.has(video.data.relatedPost),
        `video "${video.id}" references missing post "${video.data.relatedPost}"`,
      );
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
      assert(
        postIds.has(talk.data.relatedPost),
        `talk "${talk.id}" references missing post "${talk.data.relatedPost}"`,
      );
    }
  }
  return talks.sort(byDateDesc);
}
