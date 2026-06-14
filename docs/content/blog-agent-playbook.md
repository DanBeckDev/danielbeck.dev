# Blog agent playbook

Use this when an AI agent is drafting or editing a blog post for the site.
It is the blog-specific companion to [../ai-agent-guide.md](../ai-agent-guide.md)
and [../writing/voice-and-tone.md](../writing/voice-and-tone.md).
For quality standards, also read
[../writing/technical-blog-quality.md](../writing/technical-blog-quality.md).
Before drafting, read [../writing/blog-agent-rules.md](../writing/blog-agent-rules.md).
Before handing back a draft, run the loop in
[../writing/blog-editing-loop.md](../writing/blog-editing-loop.md).

## What a good post does here

A good post teaches one thing well. It should explain a real problem, show the
actual code or design choices, and leave the reader with something they can use
without needing the full repo in front of them.

The strongest posts on this site usually do three things:

- Start with a clear point, not a warm-up.
- Use real code or diagrams when they explain the idea faster than prose.
- End with takeaways that are specific, not generic.

## Before you draft

Gather the facts first.

- What is the post about?
- What is the angle or thesis?
- Who is it for?
- What code, repo, talk, or demo is the source of truth?
- What is the source-facing frame, and what is the reader-facing frame?
- Does it need a `video`, `repo`, `talk`, or `discussion` cross-link?
- Is there a real example, benchmark, or bug that proves the point?

If any of those are unclear, pause and ask. Do not fill the gaps with invented
details.

## Choose the reader-facing frame

Do not default to the title of the source material. A conference, talk, repo, or
YouTube video can be the provenance without being the best headline for the
post.

Before drafting, separate:

- **Source-facing frame**: where the material came from.
- **Reader-facing frame**: why a reader should care now.

Example:

```md
Source-facing frame: AI Native DevCon 2026 notes
Reader-facing frame: The AI agent trends engineers should actually care about
```

Use the reader-facing frame for the title, opening, section headings, and
description. Use the source-facing frame for provenance in the intro and links.

Good reader-facing frames:

- Name the useful idea instead of only the event.
- Speak to the site's audience of engineers.
- Make the post useful after the event has passed.
- Stay faithful to the source material.

Avoid:

- Titles that only work for people who already know the event.
- Generic trend bait that the post cannot prove.
- Reframing so far that the source material no longer supports the claim.

## Know the audience

Most posts on this site are for other engineers, not beginners. Write for
people who already know the basics and want the concrete version: how it works,
what changed, what broke, what you learned, and what tradeoff you made.

The site leans toward frontend architecture, design systems, module bundling,
developer experience, and AI-augmented engineering. If a post fits none of
those shapes, check whether it belongs here at all.

## Show provenance

Readers should be able to tell where the post came from.

- If it is based on a repo, link the real repo and keep the write-up faithful to
  the code.
- If it is based on a talk or podcast, say so.
- If AI helped draft or structure the post, the final text still needs to read
  like a human engineer wrote it with care. Do not hide behind generic phrasing
  or vague summaries.

## What to read in the repo

For a technical post, read the code before writing the prose.

- The relevant source files or packages.
- `src/consts/site.ts` if the post mentions identity or social links.
- `src/content.config.ts` if the post needs a new frontmatter field.
- `docs/content/blog-posts.md` for the current post format.
- `docs/writing/voice-and-tone.md` for tone and copy rules.

If the post is about this site itself, also read the page or component the post
is referencing so the write-up matches reality.

## Shape of the post

This site works best with posts that move from concrete to general.

1. Lead with the problem or result.
2. Show the implementation or experiment.
3. Explain the tradeoffs.
4. End with what changed, what is left out, or what to watch next.

Good section headings are specific. They should tell the reader what each part
does, instead of only labelling the section.

## Frontmatter checklist

- `title` is concrete and specific.
- `description` stands alone and fits under 220 characters.
- `category` is one of the allowed values in `src/consts/categories.ts`.
- `tags` are lower-case and hyphenated.
- `draft` is `true` until the post is ready to ship.
- `pubDate` is today's date to publish now, or a future date to schedule it (see
  [./scheduling-posts.md](./scheduling-posts.md)).
- `heroImageAlt` is present if `heroImage` is set.
- Any `repo`, `video`, `talk`, or `discussion` link is real and reachable.

Do not guess at these fields. Verify them.

## Writing rules that matter most

- Use the site voice: plain, direct, specific, peer-to-peer.
- No em dashes or en dashes in visible copy.
- No hype words, filler openers, or fake certainty.
- Keep paragraphs short.
- Prefer real code snippets over paraphrased code.
- Use components like `Callout`, `MermaidDiagram`, and `CodeBlock` only when
  they add clarity.

## Accuracy rules

Technical posts should be grounded in something that exists in the repo or in a
linked source.

- Do not invent APIs, repo names, benchmarks, or features.
- If you mention a code path, make sure it exists.
- If you mention a result, make sure the numbers or behavior match the code.
- If something is a simplification, say so.

When in doubt, search the repo first. If the claim cannot be verified, rewrite it
or leave it out.

## Drafting workflow for agents

1. Read the source material.
2. Extract the main point in one sentence.
3. Choose the reader-facing frame.
4. Write a section outline with 3 to 7 headings.
5. Draft the body with code, examples, talks, or evidence.
6. Write the title and description against the reader-facing frame.
7. Run the editing loop in `docs/writing/blog-editing-loop.md`.
8. Check frontmatter, links, and tone.
9. Run `npm run check`.

## Final pass

Before shipping a post, confirm:

- The opening sentence says the point.
- The title and description are reader-facing, rather than only source-facing.
- Every code sample is real or clearly marked as illustrative.
- The description still makes sense on its own.
- The post links to the right repo, video, or discussion.
- There are no long dash characters in the visible copy.
- The build passes.
