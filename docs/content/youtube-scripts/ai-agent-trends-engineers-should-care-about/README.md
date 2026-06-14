# The AI Agent Trends Engineers Should Actually Care About

Working folder for the YouTube video based on the blog post:
[`src/content/blog/ai-agent-trends-engineers-should-care-about.mdx`](../../../../src/content/blog/ai-agent-trends-engineers-should-care-about.mdx).

## Files

- [`script.md`](./script.md): recording script, description, pinned comment, and
  production notes.
- [`thumbnails/ai-agent-trends.png`](./thumbnails/ai-agent-trends.png):
  broad trends concept.
- [`thumbnails/stop-watching-the-model.png`](./thumbnails/stop-watching-the-model.png):
  stronger model-focused hook.
- [`thumbnails/agents-need-systems.png`](./thumbnails/agents-need-systems.png):
  systems-focused concept.
- [`thumbnails/upload-ready/agents-need-systems.jpg`](./thumbnails/upload-ready/agents-need-systems.jpg):
  upload-ready export of the recommended candidate.

## Current recommendation

Use `agents-need-systems.png` as the leading thumbnail candidate. It is the
clearest match for the thesis and should stay useful after the conference timing
has passed. Upload the JPG from `thumbnails/upload-ready/`.

## Thumbnail prompt notes

The thumbnail concepts use Daniel's portrait as the creator anchor and frame the
video around AI agent systems rather than the conference itself.

The three concepts were intentionally generated with different jobs:

- `ai-agent-trends`: broad reach and direct topic match.
- `stop-watching-the-model`: stronger contrarian hook.
- `agents-need-systems`: best thesis match.

Future thumbnail iterations should:

- Keep the portrait prominent.
- Use 2 to 4 words of large text.
- Prefer systems language over conference language.
- Preserve the video thesis: agents need skills, context, harnesses, security,
  evals, and review.
- Avoid stock AI imagery where possible.

Prompt pattern used:

```txt
Create a 16:9 YouTube thumbnail concept at 1280x720 using the provided portrait
as the creator image. Preserve the creator's face, hair, beard, expression, and
clothing identity. Crop him as a clean cutout on one third of the frame,
shoulders visible, with a subtle white outline and soft shadow.

Use a bold AI engineering background with a simple systems diagram around an AI
model. Keep the main text large, readable, and limited to 2 to 4 words. Use
small labels like skills, context, harness, evals, security, and review only as
supporting details.

Style: professional software engineering creator thumbnail, crisp, high
contrast, mobile-readable, not clickbait, no watermarks, no extra faces, no
distorted text.
```

One lesson from this pass: generated output order can differ from prompt order.
Inspect each image before naming it. The filename should describe the visible
thumbnail text, not the prompt that was sent first.

## Export notes

Keep generated source concepts in `thumbnails/` and upload-ready exports in
`thumbnails/upload-ready/`.

Upload-ready thumbnails should be:

- 16:9 aspect ratio.
- 1280x720 or larger.
- JPG or PNG.
- Small enough for YouTube upload limits.
