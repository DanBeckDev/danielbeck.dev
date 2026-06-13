/**
 * The closed set of blog categories — the single source of truth that powers
 * the Zod `enum` in src/content.config.ts, category index pages, and display
 * labels. A post may have exactly one category. Adding one is deliberate;
 * a typo in frontmatter fails the build.
 */

export const categories = [
  { slug: 'infrastructure', name: 'Infrastructure', blurb: 'Platforms, provisioning, and the foundations systems run on.' },
  { slug: 'network-automation', name: 'Network Automation', blurb: 'Source of truth, config pipelines, and programmable networks.' },
  { slug: 'kubernetes', name: 'Kubernetes', blurb: 'Operating workloads on Kubernetes without surprises.' },
  { slug: 'cloud', name: 'Cloud', blurb: 'Cloud-native architecture and the tradeoffs that come with it.' },
  { slug: 'architecture', name: 'Architecture', blurb: 'Designing systems that hold up as they grow.' },
  { slug: 'python', name: 'Python', blurb: 'Python for automation, tooling, and backend services.' },
  { slug: 'go', name: 'Go', blurb: 'Go for infrastructure, CLIs, and high-throughput services.' },
  { slug: 'open-source', name: 'Open Source', blurb: 'Building, maintaining, and contributing to open source.' },
  { slug: 'engineering-leadership', name: 'Engineering Leadership', blurb: 'Growing as a senior engineer and raising the bar.' },
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];

/** Category display names, used as the frontmatter value (one per post). */
export const categoryNames = categories.map((c) => c.name);
export type CategoryName = (typeof categories)[number]['name'];

const bySlug = new Map(categories.map((c) => [c.slug, c]));
const byName = new Map(categories.map((c) => [c.name, c]));

export const getCategoryBySlug = (slug: string) => bySlug.get(slug as CategorySlug);
export const getCategoryByName = (name: string) => byName.get(name as CategoryName);
