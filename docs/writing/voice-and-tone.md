# Voice and tone

This is the most important doc for anyone, human or AI, writing copy for the
site. The goal is writing that sounds like a specific senior engineer talking to
a peer, not like a language model. Follow it for posts, page copy, descriptions,
abstracts, and commit-adjacent content alike.

## Who is writing

Daniel Beck: a senior software engineer who works on frontend platforms,
micro-frontends, design systems, developer experience, and AI-augmented
engineering. The voice is:

- **Plain and direct.** Short sentences. Say the thing.
- **Confident, not salesy.** State what is true. No hype words.
- **Specific.** Name the real tool, the real number, the real tradeoff. Show
  real code over hand-waving.
- **Peer-to-peer.** Assume the reader is also an engineer. Do not over-explain
  the basics or talk down.
- **Honest about scope.** If something is unfinished or simplified, say so.

## Rule 1: no long dashes

Do not use long dash characters in visible copy. They are the clearest tell of
AI-generated text and Daniel does not write with them.

Use a full stop, a comma, a colon, or parentheses instead. Normal hyphens inside
compound words are fine (`senior-level`, `open-source`, `AI-augmented`).

Before and after:

| Avoid a long dash here                          | Write instead                                    |
| ----------------------------------------------- | ------------------------------------------------ |
| `I build platforms and the tooling in between.` | `I build platforms, and the tooling in between.` |
| `It does one thing render.`                     | `It does one thing: render.`                     |
| `The fix is simple diff first.`                 | `The fix is simple. Diff first.`                 |
| `React, ReactDOM plus a JSX transform.`         | `React and ReactDOM, plus a JSX transform.`      |
| `It's changing how I work fundamentally.`       | `It's fundamentally changing how I work.`        |

If you find yourself wanting a long dash, the sentence usually wants to be two
sentences.

## Rule 2: avoid the other AI tells

- **No "not just X, but Y" / "it's not about X, it's about Y."** Just say Y.
- **No forced rule-of-three lists** in every sentence. Vary the rhythm. Real
  writing has lists of two and four, and sentences with none.
- **No filler openers**: "In today's fast-paced world", "Let's dive in", "It's
  worth noting that", "At the end of the day".
- **No buzzwords**: leverage, seamless, robust, cutting-edge, game-changer,
  unlock, supercharge, delve, tapestry, realm.
- **No empty conclusions**: do not end with "In conclusion" or a paragraph that
  restates everything. End on a concrete point or a next step.
- **No over-hedging**: "might perhaps possibly". Commit to the claim.
- **Vary sentence openings.** Do not start five sentences in a row the same way.

## Rule 3: structure

- Lead with the point. The first sentence of a post or section should carry the
  idea, not warm up to it.
- Short paragraphs. Two to four sentences.
- Use real `##` and `###` headings that describe content, not "Introduction".
- Show code when it makes the point faster than prose. Keep snippets short and
  real (copy from the actual project where possible).
- Use a `Callout` sparingly for a genuine aside or warning, not decoration.
- Contractions are good (`it's`, `you'll`, `don't`). They read human.

## Rule 4: specifics for this site

- A post `description` is reused as the meta description, the OG card text, and
  the blog card. Write it as one or two sentences that stand alone and make
  sense out of context. Max 220 characters.
- Titles are concrete. "Building React from Scratch" beats "A Deep Dive Into How
  React Works Under the Hood".
- When writing about Daniel's own work, link to the real repo and be accurate to
  what the code actually does. Do not invent features.
- Keep British or American spelling consistent within a piece. The existing copy
  leans British (`specialise`, `behaviour`).

## Pre-publish checklist

1. Search the text for long dash characters. There should be none.
2. Read it out loud. If a sentence sounds like a brochure or a chatbot, rewrite
   it shorter and plainer.
3. Cut the first sentence if it is a warm-up. Start at the real point.
4. Check every claim about code or projects against reality.
5. Run `npm run check` and confirm the build is clean.
