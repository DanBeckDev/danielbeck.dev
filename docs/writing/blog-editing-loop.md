# Blog editing loop

Use this after the first draft. It is a practical review loop for AI agents,
based on what went wrong while drafting the AI Native DevCon notes.

## Pass 1: Source fidelity

Check every load-bearing claim against the source material.

- Is it in the user's notes, code, repo, or linked source?
- Did the draft add a stronger claim than the source supports?
- Are names, event URLs, talk titles, and quotes accurate?
- Are speculative lines clearly framed as the author's interpretation?

If a claim is plausible but unsupported, verify it or cut it.

## Pass 2: Voice fit

Read the opening and ending out loud.

Flag lines that sound like:

- a conference abstract
- a marketing recap
- a generic AI think-piece
- a LinkedIn engagement post
- an AI trying hard to sound human

The site voice is direct, specific, and peer-to-peer. It can be opinionated, but
it should not sound staged.

## Pass 3: Structure

Check whether the post has one through-line.

- Does the title match the body?
- Does the summary preview the body?
- Does each H2 carry one part of the argument?
- Could the sections be reordered without changing the meaning? If yes, the
  structure is probably too list-like.
- Does the ending say what changes, what matters, or what comes next?

For event notes, the best structure is usually idea-led, not chronology-led.

## Pass 4: Information density

Cut lines that only move the reader from one paragraph to another.

Watch for:

- repeated setup sentences
- section endings that restate the heading
- lists that duplicate the summary
- abstract nouns where a concrete thing exists
- over-explaining familiar terms to senior engineers

Every paragraph should either make a point, prove a point, or move the reader
to the next point.

## Pass 5: AI-slop check

Search manually for structural tells:

- repeated first words across paragraphs
- too many sentences starting with `That is` or `This is`
- uniform sentence lengths
- every section following the same rhythm
- forced rule-of-three patterns
- dramatic lines that do not match the source material
- generic closing lines about the future of work

Fix rhythm by cutting, varying sentence length, and adding concrete source
material. Do not solve it by sprinkling casual phrases over generic prose.

## Pass 6: Skim path

A reader should understand the post by reading:

- title
- description
- opening
- summary bullets
- H2 headings
- final section

If that path is unclear, revise before polishing individual sentences.

## Pass 7: Mechanical checks

Before handing back a draft:

- Search for long dash characters.
- Run `npm run check`.
- Confirm the post is `draft: true` unless explicitly publishing. To publish on a
  future date instead, set `draft: false` with a future `pubDate` (see
  [../content/scheduling-posts.md](../content/scheduling-posts.md)).
- Confirm links are real.
- Confirm the category and tags match `src/consts/categories.ts`.

Do not present a draft that fails these checks.
