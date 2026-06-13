/**
 * Single source of truth for site identity, navigation, and social links.
 * Swap the placeholder handles/email here and they update everywhere
 * (header, footer, contact page, Person JSON-LD `sameAs`, OG tags, RSS).
 */

export const siteConfig = {
  name: 'Daniel Beck',
  title: 'Daniel Beck, Senior Software Engineer',
  role: 'Senior Software Engineer',
  tagline: 'Building Reliable Systems at Scale',
  url: 'https://danielbeck.dev',
  locale: 'en',
  description:
    'Daniel Beck is a senior software engineer specialising in frontend architecture at scale: micro-frontends, design systems, and developer experience. He also builds AI-augmented engineering systems, where autonomous agents implement, test, and ship code.',

  // Identity. PLACEHOLDERS — replace with real handles when ready.
  email: 'hello@danielbeck.dev',
  social: {
    github: 'https://github.com/DanBeckDev',
    linkedin: 'https://www.linkedin.com/in/danielbeck',
    youtube: 'https://www.youtube.com/@danielbeckdev',
  },
  githubUsername: 'DanBeckDev',
  youtubeHandle: '@danielbeckdev',
  /** Resolve once at https://www.youtube.com/@danielbeckdev (View source → channelId)
   *  to enable the optional build-time "latest videos" RSS fetch. */
  youtubeChannelId: '',
  twitterHandle: '@danielbeckdev',

  // OpenGraph / Person
  jobTitle: 'Senior Software Engineer',
  knowsAbout: [
    'Frontend Architecture',
    'Micro-Frontends',
    'Design Systems',
    'Component Libraries',
    'Developer Experience',
    'TypeScript',
    'AI-Augmented Engineering',
    'Web Performance',
    'Engineering Leadership',
  ],
} as const;

export type NavItem = { label: string; href: string };

/** Primary navigation. `href` values use trailing slashes to match
 *  `trailingSlash: 'always'` in astro.config.mjs. */
export const navItems: NavItem[] = [
  { label: 'Writing', href: '/blog/' },
  { label: 'YouTube', href: '/youtube/' },
  { label: 'Open Source', href: '/open-source/' },
  { label: 'Speaking', href: '/speaking/' },
  { label: 'About', href: '/about/' },
];

/** Build a YouTube subscribe URL that opens the subscribe confirmation dialog. */
export const youtubeSubscribeUrl = `${siteConfig.social.youtube}?sub_confirmation=1`;
