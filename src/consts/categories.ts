/**
 * The closed set of blog categories — the single source of truth that powers
 * the Zod `enum` in src/content.config.ts, category index pages, and display
 * labels. A post may have exactly one category. Adding one is deliberate;
 * a typo in frontmatter fails the build.
 */

export const categories = [
  {
    slug: 'frontend-architecture',
    name: 'Frontend Architecture',
    blurb: 'Designing frontends that hold up as teams and codebases grow.',
  },
  {
    slug: 'micro-frontends',
    name: 'Micro-Frontends',
    blurb: 'Composing independently-deployable frontends without the chaos.',
  },
  {
    slug: 'design-systems',
    name: 'Design Systems',
    blurb: 'Shared component libraries, tokens, and the contracts behind them.',
  },
  {
    slug: 'developer-experience',
    name: 'Developer Experience',
    blurb: 'Tooling, build pipelines, and the ergonomics that make teams fast.',
  },
  {
    slug: 'ai-engineering',
    name: 'AI Engineering',
    blurb: 'Autonomous agents and AI-augmented workflows that ship real code.',
  },
  {
    slug: 'typescript',
    name: 'TypeScript',
    blurb: 'Types, patterns, and tooling for frontend at scale.',
  },
  {
    slug: 'web-performance',
    name: 'Web Performance',
    blurb: 'Shipping fast, resilient interfaces and keeping them fast.',
  },
  {
    slug: 'open-source',
    name: 'Open Source',
    blurb: 'Building, maintaining, and contributing to open source.',
  },
  {
    slug: 'engineering-leadership',
    name: 'Engineering Leadership',
    blurb: 'Mentoring, raising the bar, and growing as a senior engineer.',
  },
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];

/** Category display names, used as the frontmatter value (one per post). */
export const categoryNames = categories.map((c) => c.name);
export type CategoryName = (typeof categories)[number]['name'];

const bySlug = new Map(categories.map((c) => [c.slug, c]));
const byName = new Map(categories.map((c) => [c.name, c]));

export const getCategoryBySlug = (slug: string) => bySlug.get(slug as CategorySlug);
export const getCategoryByName = (name: string) => byName.get(name as CategoryName);
