import { siteConfig } from '../consts/site';

export interface ChannelVideo {
  id: string;
  title: string;
  publishedAt: Date;
  url: string;
}

function decodeXml(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

let cache: ChannelVideo[] | null = null;

/**
 * Latest uploads from the YouTube channel, read from YouTube's public RSS feed
 * at build time. No API key required.
 *
 * Returns [] if `siteConfig.youtubeChannelId` is empty or the fetch fails, so
 * the section simply does not render until a channel id is set. The feed is the
 * `UC...` channel id, not the @handle: find it at youtube.com/@handle via
 * "View source" and search for `"channelId"`.
 */
export async function getLatestChannelVideos(limit = 6): Promise<ChannelVideo[]> {
  if (cache) return cache.slice(0, limit);

  const channelId = siteConfig.youtubeChannelId;
  if (!channelId) {
    cache = [];
    return [];
  }

  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
      headers: { 'User-Agent': 'danielbeck.dev' },
    });
    if (!res.ok) throw new Error(`youtube ${res.status}`);
    const xml = await res.text();

    const videos: ChannelVideo[] = [];
    for (const match of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
      const block = match[1];
      const id = block.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1];
      const title = block.match(/<title>([\s\S]*?)<\/title>/)?.[1];
      const published = block.match(/<published>(.*?)<\/published>/)?.[1];
      if (id && title && published) {
        videos.push({
          id,
          title: decodeXml(title.trim()),
          publishedAt: new Date(published),
          url: `https://www.youtube.com/watch?v=${id}`,
        });
      }
    }

    cache = videos;
    return videos.slice(0, limit);
  } catch {
    cache = [];
    return [];
  }
}
