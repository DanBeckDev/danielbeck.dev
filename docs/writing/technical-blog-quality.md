# Technical blog quality

This guide defines what a strong technical post looks like on this site. It is
for AI agents and humans who already know how to write, but want a higher bar
for technical clarity, usefulness, and proof.

Use this with:

- [blog-agent-playbook.md](../content/blog-agent-playbook.md)
- [voice-and-tone.md](./voice-and-tone.md)
- [blog-posts.md](../content/blog-posts.md)

## What a great post does

A great technical post teaches one concrete thing well.

It does not try to cover everything. It makes one claim, shows the evidence,
and leaves the reader with a mental model, a pattern, or a decision they can
reuse.

The reader is usually another engineer. Write for someone who knows the basics
and wants the real story: how the system works, what tradeoffs mattered, and
what proved true in practice.

The best posts here usually do four things:

- State the point early.
- Prove the point with code, data, or a real example.
- Explain the tradeoffs instead of pretending there are none.
- End with something the reader can apply.

## The quality bar

Treat every post as a product with a few non-negotiable quality checks.

### 1. Thesis

The post needs one clear thesis. If a reader skims the title, intro, and first
heading, they should know what the post is about and why it matters.

Good theses are specific:

- "We replaced X with Y and cut build time by 40 percent."
- "Here is how this JSX transform works."
- "This is the mistake we made in our design system and how we fixed it."

Bad theses are vague:

- "Some thoughts on architecture."
- "A few lessons from working on the project."
- "Why performance matters."

### 2. Evidence

Claims need proof.

Use:

- Real code from the repo.
- Concrete examples.
- Measured results.
- Exact tradeoffs.
- Clear before and after states.

If a post makes a claim about behavior, the reader should be able to trace that
claim back to code, a config file, or a reproducible observation.

If the source is a repo or a live system, the draft should reflect what is
actually in front of you, not what you remember or wish the code did.

### 3. Structure

The post should move in a straight line:

1. Problem or result.
2. What you changed or built.
3. Why that choice made sense.
4. What the reader should take away.

Good structure is visible in the headings. Each heading should tell the reader
what they will learn, not just mark a section break.

### 4. Readability

Technical depth does not require dense prose.

Use short paragraphs. Prefer active voice. Cut filler. If a sentence only exists
to bridge between ideas, it probably can be shorter or removed.

When code explains the point faster than prose, show the code.

### 5. Accuracy

The post must be true.

- No invented APIs.
- No fake numbers.
- No vague claims about "performance" without saying what changed.
- No repo links that do not match the code being discussed.

If the source material is incomplete, say that. Strong technical writing can be
honest about gaps.

## Pick the right post shape

Not every post should be written the same way. Pick the shape that matches the
material.

### Walkthrough

Use when the post explains how a system works end to end.

Best for:

- Reimplementation posts.
- Deep dives into a compiler, renderer, or build step.
- Architecture explanations.

The reader should leave with a model of the system, not just a list of parts.

### Experiment

Use when the post reports a change, test, or benchmark.

Best for:

- Performance work.
- Migration notes.
- Tooling comparisons.

The reader should understand the setup, the results, and why the result is
credible.

### Retrospective

Use when the post is about a project, failure, or decision.

Best for:

- A shipped feature.
- A bad decision and the fix.
- A technical lesson learned in practice.

The reader should see the decision process, not just the conclusion.

### Tutorial with constraints

Use when the post teaches a method or technique.

Best for:

- A small tool or library.
- A practical pattern.
- A limited, useful slice of a bigger topic.

The post should show enough to make the method repeatable, while staying honest
about what it does not cover.

## What to avoid

- Broad summaries that do not teach anything new.
- Long intros that postpone the point.
- Buzzwords and motivational filler.
- Overexplaining basics the reader already knows.
- "Here is everything" posts that do not have a clear angle.
- Examples that are only illustrative when real code exists.

If a draft starts sounding generic, narrow it. Pick one example, one problem, or
one decision and build around that.

## Why it was written

The site exists to publish owned, technical writing that stands on its own.
That means the post should help a real reader, not simply chase a keyword or
fill a slot in a content calendar.

Good posts here usually come from one of these reasons:

- A real project taught something worth sharing.
- A repo or system is small enough to explain clearly.
- A technical decision deserves a record.
- A talk, podcast, or demo needs a written companion.

## Self-editing checklist

Before shipping a post, verify:

- The title says the real topic.
- The description still stands on its own.
- The intro states the point quickly.
- Every section earns its place.
- Every code sample is real or clearly labeled.
- Every claim is backed by the repo, a link, or an observation.
- The ending is specific.
- The visible copy has no long dash characters.
- `npm run check` passes.

## Fast scoring rubric

Use this if you need a quick quality check.

- 5: Specific, true, well structured, and useful without the repo open.
- 4: Solid post with one weak section or a small amount of drift.
- 3: Correct but too generic, too broad, or too light on evidence.
- 2: Reads cleanly but does not teach enough.
- 1: Polite filler. Not publishable.

If a draft scores below 4, revise before it ships.
