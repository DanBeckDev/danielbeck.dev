#!/usr/bin/env node
// Prints the channel's latest YouTube uploads as JSON, so an agent can grab a
// video URL to share without parsing XML by hand. See
// docs/social/sharing-playbook.md. Read-only: it only fetches the public RSS feed.
//
//   npm run videos:latest            # latest 15
//   npm run videos:latest -- 5       # latest 5
//
// The channel id is read from src/consts/site.ts so it stays single-sourced.

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function decodeXml(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

async function getChannelId() {
  const src = await readFile(join(root, 'src/consts/site.ts'), 'utf8');
  return src.match(/youtubeChannelId:\s*'([^']*)'/)?.[1] ?? '';
}

async function main() {
  const limit = Number.parseInt(process.argv[2] ?? '15', 10) || 15;

  const channelId = await getChannelId();
  if (!channelId) {
    process.stderr.write('No youtubeChannelId set in src/consts/site.ts.\n');
    process.stdout.write('[]\n');
    return;
  }

  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
    headers: { 'User-Agent': 'danielbeck.dev' },
  });
  if (!res.ok) throw new Error(`YouTube feed returned ${res.status}`);
  const xml = await res.text();

  const videos = [];
  for (const match of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
    const block = match[1];
    const id = block.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1];
    const title = block.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    const published = block.match(/<published>(.*?)<\/published>/)?.[1];
    if (id && title && published) {
      videos.push({
        id,
        title: decodeXml(title.trim()),
        url: `https://www.youtube.com/watch?v=${id}`,
        publishedAt: published,
      });
    }
  }

  process.stdout.write(`${JSON.stringify(videos.slice(0, limit), null, 2)}\n`);
}

main().catch((err) => {
  process.stderr.write(`${err.message}\n`);
  process.exit(1);
});
