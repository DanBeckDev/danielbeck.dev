/**
 * External open-source libraries Daniel has contributed to. This is the only
 * thing you maintain by hand — add a repo here and the Open Source page will
 * automatically pull your merged PRs, the repo description, stars, and language
 * at build time (see src/lib/contributions.ts).
 *
 * `blurb` is a fallback description used only if the GitHub API is unavailable
 * during the build.
 */
export interface TrackedRepo {
  repo: string; // "owner/name"
  blurb?: string;
}

export const trackedRepos: TrackedRepo[] = [
  {
    repo: 'QwikDev/partytown',
    blurb: 'Run resource-intensive third-party scripts from a web worker, off the main thread.',
  },
  {
    repo: 'module-federation/vite',
    blurb: 'Module Federation support for Vite and Rspack.',
  },
];
