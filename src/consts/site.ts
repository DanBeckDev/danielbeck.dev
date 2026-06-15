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
  locale: 'en-GB',
  description:
    'Daniel Beck is a senior software engineer specialising in frontend architecture at scale: micro-frontends, design systems, and developer experience. He also builds AI-augmented engineering systems, where autonomous agents implement, test, and ship code.',

  // Identity. All real and in use.
  email: 'hello@danielbeck.dev',
  social: {
    github: 'https://github.com/DanBeckDev',
    linkedin: 'https://www.linkedin.com/in/daniel-beck-dev',
    youtube: 'https://www.youtube.com/@danielbeckdev',
    x: 'https://x.com/DanielBeckDev',
  },
  githubUsername: 'DanBeckDev',
  youtubeHandle: '@danielbeckdev',
  /** Channel id (UC...) for the build-time "latest videos" RSS fetch. The
   *  feed renders automatically once the channel has uploads. */
  youtubeChannelId: 'UCAdBTWlnlVbpcTa1DIUm9EQ',
  twitterHandle: '@DanielBeckDev',

  /** Cloudflare Web Analytics beacon token (a public token, safe to commit).
   *  Get it from the Cloudflare dashboard: Web Analytics → Add a site → copy
   *  the token. The beacon only loads in production when this is set; leave
   *  empty to disable. Privacy-friendly, no cookies, no consent banner needed. */
  cloudflareAnalyticsToken: '',

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
