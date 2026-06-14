# YouTube scripts

Use this folder for working video packages derived from posts, talks, or notes.
These are production planning documents, not public site content.

Each video should have its own folder:

```txt
docs/content/youtube-scripts/
  video-slug/
    README.md
    script.md
    thumbnails/
      concept-name.png
      upload-ready/
        concept-name.jpg
```

The folder slug should match the viewer-facing video frame, not necessarily the
source post, talk, or event title.

Good scripts for this site should:

- Keep Daniel's voice: plain, direct, specific, and peer-to-peer.
- Use a strong hook without sounding clickbait.
- Move quickly from context to value.
- Include timestamps, visual cues, and B-roll ideas.
- Keep one clear call to action.
- Avoid em dashes and en dashes in all visible script copy.

When adapting a blog post, preserve the post's thesis and examples. Do not add
claims that are not in the source material unless they have been checked.

## Repeatable workflow

Use this workflow when turning a post, talk, or notes file into a YouTube video
package.

1. Read the source material first.
2. Extract the core idea in one plain sentence.
3. Choose the viewer-facing frame before writing the script.
4. Write 5 to 8 section beats that support that frame.
5. Create a folder for the video package.
6. Draft the hook, intro, main sections, conclusion, description, pinned comment,
   thumbnail ideas, and production notes in `script.md`.
7. Save thumbnail concepts in `thumbnails/`.
8. Summarise the package and current recommendation in the video folder
   `README.md`.
9. Run the edit checklist at the end of this file.

Do not default to the source title. A blog post, conference note, or talk title
is often too narrow for YouTube. The video title should sell the viewer problem
or useful idea, while the source material provides credibility.

Example:

```md
Source frame: AI Native DevCon 2026 notes
Better YouTube frame: The AI agent trends engineers should actually care about
```

## Packaging rules

Packaging means the title, thumbnail, first 20 seconds, and description. Decide
it before writing the full script.

Good packaging for this channel should:

- Name the viewer: engineers, senior engineers, frontend engineers, platform
  teams, or people building with AI agents.
- Name the useful idea: trends, mistakes, architecture, workflow, tradeoffs, or
  lessons.
- Make the scope clear without sounding generic.
- Keep the source visible but secondary.
- Avoid clickbait, hype, and fake urgency.

Prefer:

- `The AI Agent Trends Engineers Should Actually Care About`
- `AI Agents Need More Than Better Models`
- `The Engineering Work Behind Useful AI Agents`

Avoid:

- `AI Native DevCon 2026 Recap`
- `My Thoughts From A Conference`
- `The Future Of AI Is Here`

## Video package structure

Use this package structure unless the user asks for a different format:

```txt
docs/content/youtube-scripts/[video-slug]/
  README.md
  script.md
  thumbnails/
```

Use this script structure inside `script.md`:

```md
# YouTube script: [viewer-facing title]

Source post:
[source link]

Working title:
`[viewer-facing title]`

Format: [trend video, tutorial, commentary, walkthrough, demo]

Estimated length: [target length]

Target audience: [specific audience]

Tone: [voice notes]

Primary promise: [what the viewer gets]

Primary CTA: [one clear action]

## Script

### Hook: 0:00 to 0:20

### Intro: 0:20 to 0:55

### [Section or trend 1]: 0:55 to ...

### Conclusion: ...

## Description draft

## Pinned comment draft

## Thumbnail ideas

## Production notes

## Edit checklist
```

## Thumbnail assets

If thumbnail images are generated, save the selected concepts inside the video
folder rather than leaving them in a temporary generation directory.

Use readable filenames:

- `agents-need-systems.png`
- `ai-agent-trends.png`
- `stop-watching-the-model.png`

For each thumbnail set, record the recommendation in the video folder
`README.md`. Explain why the recommended option matches the video thesis.

Keep upload-ready exports in `thumbnails/upload-ready/`. Prefer 16:9 JPG files
at 1280x720 or larger, with file sizes that stay inside YouTube upload limits.

## Thumbnail generation workflow

Use this workflow when the user provides a portrait or asks for YouTube
thumbnail concepts.

1. Treat the portrait as the creator anchor.
2. Generate 3 distinct concepts, not 3 tiny variants of the same idea.
3. Keep the text to 2 to 4 words.
4. Use the video thesis, not the source event, as the visual frame.
5. Save source PNG concepts in `thumbnails/`.
6. Export upload-ready JPGs to `thumbnails/upload-ready/`.
7. Inspect every thumbnail before naming or recommending it.
8. Record the recommendation in the video folder `README.md`.

Strong creator-led thumbnails usually have:

- A clear portrait cutout on the left or right third.
- One large text idea.
- A simple technical visual that supports the text.
- High contrast at small sizes.
- A restrained colour palette.
- A white or light outline around the portrait.
- Enough negative space that the text can breathe.

Avoid:

- More than 4 words of main text.
- Tiny labels that carry the main point.
- Stock robot imagery unless the topic needs it.
- Conference logos as the main visual hook.
- Overcrowded diagrams.
- Facial expressions that feel fake for Daniel's voice.

## Thumbnail prompt pattern

Use a prompt like this and adapt the bracketed parts:

```txt
Create a 16:9 YouTube thumbnail concept at 1280x720 using the provided portrait
as the creator image. Preserve the creator's face, hair, beard, expression, and
clothing identity. Crop him as a clean cutout on the [left or right] third,
shoulders visible, with a subtle white outline and soft shadow.

Background: [specific technical visual that supports the video thesis].

Large readable text: "[2 to 4 word thumbnail text]".

Supporting details: [small labels or visual elements], but keep them secondary
to the main text.

Style: professional software engineering creator thumbnail, crisp, high
contrast, mobile-readable, not clickbait, no watermarks, no extra faces, no
distorted text.
```

For a single video, generate concepts with different jobs:

- Broad reach: speaks to the trend or audience.
- Contrarian hook: challenges the common assumption.
- Thesis match: states the video argument as simply as possible.

Example for this video:

- Broad reach: `AI AGENT TRENDS`
- Contrarian hook: `STOP WATCHING THE MODEL`
- Thesis match: `AGENTS NEED SYSTEMS`

## Thumbnail QA

Before committing thumbnails:

- Open each image and check the text matches the filename.
- Check the portrait still looks like Daniel.
- Check the main text is readable at small size.
- Check the visual supports the title and script.
- Check there are no watermarks or extra people.
- Check generated labels are not misspelled.
- Export upload-ready versions at 16:9.
- Keep source concepts and upload-ready exports together.

## Writing the hook

The hook should make the viewer feel the video is for them within the first 20
seconds.

Good hooks:

- Challenge a common assumption.
- Name a practical problem.
- Promise a useful lens.
- Move fast.

Avoid:

- Long event setup.
- "In this video I will..."
- Generic AI predictions.
- Big claims the script cannot prove.

## Adapting source material

Keep the source material honest.

- If the source is a conference, use the talks as evidence for broader ideas.
- If the source is a blog post, preserve the thesis and examples.
- If the source is code, check the repo before describing behaviour.
- If a claim is not in the source, verify it or leave it out.
- If the broader video frame changes, update the title, intro, section headings,
  description, pinned comment, and thumbnail ideas together.

## Edit checklist

Before handing back a script, check:

- The title is viewer-facing, not only source-facing.
- The first 20 seconds get to the actual thesis.
- The intro does not repeat the hook.
- Each section has one practical point.
- The source material is visible but not allowed to shrink the audience.
- Visual cues support the spoken line instead of decorating it.
- The CTA is specific and singular.
- There are no em dashes or en dashes in visible script copy.
- There are no hype phrases or generic YouTube filler.
