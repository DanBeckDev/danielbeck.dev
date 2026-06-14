# Blog agent rules

These are hard-won rules for AI agents writing posts for this site. They exist
because a valid draft can still sound wrong.

Use this with:

- [technical-blog-quality.md](./technical-blog-quality.md)
- [blog-editing-loop.md](./blog-editing-loop.md)
- [../content/blog-agent-playbook.md](../content/blog-agent-playbook.md)

## Where these rules came from

These rules are adapted from this site's own drafting iterations plus a few
external agent-writing systems:

- `blader/humanizer`: useful for spotting formulaic AI prose, fake polish,
  repeated rhythm, and generic conclusions.
- `mcpmarket blog-writer`: useful for voice capture, preserving the author's
  point of view, and running a de-AI pass after drafting.
- `AgriciDaniel/claude-blog`: useful for review gates, heading contracts,
  answer-first sections, information gain, source fidelity, and AI-slop checks.

Only the parts that fit this site are included here. Do not import generic SEO
machinery by default: question-heading quotas, stats in every H2, FAQ sections,
image-density rules, and scoring gates usually make Daniel's posts worse.

## Start from the source material

Do not begin with a generic blog outline. Start with the user's notes, code,
talk, repo, transcript, or examples.

For conference notes and reflections:

- Preserve the author's actual takeaway before inventing a cleaner one.
- Use talks as evidence for a through-line, not as isolated summaries.
- Keep claims tied to the notes unless you verify them elsewhere.
- If a sentence sounds plausible but is not in the source, either verify it or
  remove it.

## Separate source frame from reader frame

The source material is where the post came from. The reader frame is why someone
outside that context should read it.

Do not automatically use the source title as the post title. Conference notes,
talk titles, and repo names are often too narrow for the final post.

Example:

```md
Source frame: AI Native DevCon 2026 notes
Reader frame: The AI agent trends engineers should actually care about
```

The reader frame should shape:

- title
- description
- opening paragraph
- section headings
- closing takeaway

The source frame should still be visible in:

- provenance
- links
- speaker or repo references
- evidence inside the sections

This is not permission to exaggerate. If the source material does not support
the broader reader frame, narrow the frame.

## Draft the thesis in plain language

A thesis should sound like something Daniel would say to another engineer.

Prefer:

- "The work now is making the system around the model reliable."
- "Skills are becoming production artifacts."
- "Review needs to move before the generated diff."

Avoid:

- "The frontier has shifted across the AI-native paradigm."
- "The next evolution of software development is unfolding."
- "This marks a pivotal moment."

If the thesis sounds like a conference abstract, rewrite it.

## Use a human opening

The first paragraph should do three things:

- Say where the post came from.
- Give the reader the actual point.
- Move quickly into the post.

Do not stack four versions of the same idea. Event, thesis, summary, and first
section should each do a different job.

For event notes, this shape usually works when the event itself is the main
draw:

```md
I spent [time] at [event] and wanted to get my notes down while they are still fresh.

The talks kept coming back to the same point: [plain-language thesis].
```

When the event is source material for a broader post, use this shape instead:

```md
I spent [time] at [event], but the useful takeaway is bigger than the event itself.

The pattern that kept showing up was [reader-facing thesis].
```

## Use the right summary label

Avoid `TL;DR` on this site. It is clear, but too casual for the tone.

Prefer one of:

- `What I am taking back:`
- `The short version:`
- `Main takeaways:`
- `What stood out:`

For conference notes, use `What I am taking back:`. For broader trend posts
based on conference notes, use `The ideas I am taking forward:`.

## Keep the post from becoming a talk list

A conference post should not read like:

1. Speaker A said X.
2. Speaker B said Y.
3. Speaker C said Z.

Instead, group the material by the ideas the author is taking away. Mention
speakers inside those sections as evidence.

Weak:

```md
## Skills Everywhere
Kevin Groetzinger said skills need owners.
```

Better:

```md
## Skills are not prompt snippets
Kevin Groetzinger made the maintenance side explicit: skills need trigger
phrases, ownership, and a path to retirement.
```

## Make every section answer first

Each section should open with the point, then use the talk, code, or example as
evidence.

Bad shape:

- biographical setup
- talk summary
- final sentence with the point

Better shape:

- point
- source or example
- consequence for the reader or author

## Do not flatten repo analysis

When writing from a repo, the first draft should not be a neutral list of
features. A good repo post separates the public framing from the actual
mechanisms in the code.

Before drafting, identify:

- What the repo says it is.
- What it actually is when you inspect the tree.
- The mechanisms that make it work.
- The caveats around claims, numbers, or marketing language.

Then make the mechanisms the structure of the post.

Weak:

```md
The repo includes skills, browser automation, evals, and memory.
```

Better:

```md
The interesting part is that the skill files are generated from templates and
TypeScript metadata, so the agent instructions can be checked against the
runtime.
```

## Add information gain

Add the author's judgment instead of only restating what happened.

Good signals:

- "The gap for me is..."
- "This maps to a problem I keep seeing..."
- "The part I want to bring back into our work is..."
- "That changes how I think about..."

Use these sparingly. The goal is perspective, not diary prose.

## Avoid polished AI scaffolding

Watch for these patterns:

- repeated `That is...` sentence starts
- generic transitions like `This is where...`
- dramatic false stakes like `one uncomfortable thought`
- abstract phrases like `the next round of progress`
- neat three-part summaries in every section
- conclusions that restate the title

When you see them, replace with a more direct sentence or cut the line.

## Keep source fidelity

Do not over-interpret the notes.

If the notes say:

```md
malicious skills, no safety boundaries, leaking tokens to logs
```

Do not rewrite that as:

```md
skills blur permissions or smuggle behaviour into workflows
```

The second version may be plausible, but it is not what the source says.

## Prefer site-fit over SEO machinery

External blog-writing systems often push:

- stats in every section
- question headings
- FAQ blocks
- heavy keyword placement
- image density rules

Use those only when they serve the post. This site values technical clarity,
specificity, and owned perspective over generic SEO completeness.
