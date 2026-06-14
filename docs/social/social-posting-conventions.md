# Social posting conventions

Use this before writing or scheduling LinkedIn and X posts for Daniel.

This is the social-specific companion to:

- [../writing/voice-and-tone.md](../writing/voice-and-tone.md)
- [./sharing-playbook.md](./sharing-playbook.md)

The sharing playbook explains Buffer mechanics. This file explains the copy
standard.

## Where this came from

These rules come from this site's voice guide, the first Buffer scheduling test,
and useful ideas from external social-writing systems:

- `charlie947/social-media-skills post-writer`: useful for reading voice files
  first, planning before writing, using platform-specific structure, avoiding
  hashtags unless they fit the voice, and asking for feedback before shipping.
- `mcpmarket social-content-strategy`: useful for repurposing long-form content,
  platform-specific templates, hook testing, and turning blogs or videos into
  smaller social assets.

Only the parts that fit Daniel's voice are included. Do not import generic
growth-hacking patterns, engagement bait, or fake urgency.

## Non-negotiables

- Never schedule, publish, or queue a public social post without Daniel seeing
  the final copy and timing first.
- Never call a campaign scheduled unless Buffer contains the approved LinkedIn
  and X posts. A scheduled blog post alone is not a scheduled campaign.
- No em dashes or en dashes.
- No generic hype.
- No "new post" default opener unless Daniel explicitly asks for a simple
  announcement.
- No hashtags by default.
- No engagement bait CTAs.
- No invented claims, numbers, or lessons.
- One post per channel. LinkedIn and X should not use identical copy.

## Workflow

1. Read the source material.
2. Read [../writing/voice-and-tone.md](../writing/voice-and-tone.md).
3. Extract one social angle in plain language.
4. Draft LinkedIn and X separately.
5. Explain the angle and why the structure fits the platform.
6. Check the content calendar: scheduled blog posts and scheduled Buffer posts.
7. Show the exact copy and proposed timing to Daniel.
8. Wait for explicit approval before creating Buffer posts.
9. Check Buffer for duplicates.
10. Schedule through Buffer only after approval.
11. Re-list Buffer after scheduling and confirm the posts landed at the approved
    times.
12. Report the Buffer post ids. If Buffer was not scheduled, say that plainly
    instead of saying the campaign is scheduled.

Approval can be short, but it must be explicit. Examples:

- "Ship it"
- "Schedule these"
- "Use Buffer queue"
- "Post LinkedIn only"

Do not treat "sure", "looks better", or a discussion about wording as approval
to schedule.

## Pick one angle

Social copy should not summarize the whole article. It should pick one sharp
reason to click.

Good angles:

- A practical claim from the post.
- A mistake teams are making.
- A specific lesson Daniel is taking into his work.
- A tension or tradeoff engineers will recognize.

Weak angles:

- "I wrote a post about..."
- "Here are my notes from..."
- "Check out my latest blog..."
- "AI is changing everything..."

For conference posts, the event is provenance. The social angle should be the
reader-facing idea.

Example:

```txt
Source: AI Native DevCon London notes
Social angle: useful agents need better systems around the model
```

## LinkedIn conventions

LinkedIn can carry more context, but it should still be tight.

Default shape:

```txt
<Plain tension, question, or claim.>

<Daniel's judgement on that tension.>

<Short supporting context or examples.>

<Link>
```

Good LinkedIn posts:

- Sound like Daniel talking to other engineers.
- Use short paragraphs.
- Make one clear point.
- Give enough context to be useful without clicking.
- Include Daniel's judgement, not just the article's contents.
- Link plainly at the end.

Avoid:

- Brochure tone.
- Long list of every section in the article.
- Five-bullet takeaway summaries.
- "Excited to share".
- "Thrilled to announce".
- "What do you think?" unless it is a real question Daniel would ask.

Target length: 80 to 180 words for a link share. Longer is fine only when the
post has a real standalone argument.

## X conventions

X should be one tight thought.

Default shape:

```txt
<One sharp claim or observation>. <link>
```

Good X posts:

- Fit comfortably under 280 characters.
- Leave room for the URL.
- Use the article's strongest single idea.
- Avoid thread format unless Daniel asks for a thread.

Avoid:

- Packing every takeaway into one post.
- Hashtag stuffing.
- "Read more".
- Corporate launch language.

## Better defaults for this post type

For AI engineering posts, prefer copy like:

```txt
The more I use agents, the less I think the interesting question is "which
model?"

The harder question is: what system are you putting around it?

At AI Native DevCon London, the talks I kept coming back to were about that
layer:

skills that need owners
context that needs provenance
harnesses that need feedback loops
sandboxes that need real boundaries
reviews that need to happen before the diff

That is the work I think engineering teams are underestimating.

<link>
```

Avoid copy like:

```txt
New post: The AI agent trends engineers should actually care about.

I wrote up my notes from AI Native DevCon London...
```

The second version sounds like a feed announcement. The first version gives the
reader the idea first.

For LinkedIn, one good tension beats a complete list of takeaways. If the draft
reads like a mini table of contents, rewrite it around the judgement Daniel is
making.

## Timing and Buffer

Buffer's native queue is the default mechanism, but Daniel still approves it
before posts are created.

Do not invent a date. Before proposing timing, check the existing Buffer queue
and the scheduled blog posts in the repo. Treat the blog and social posts as one
campaign.

Before scheduling, show:

- channel names
- proposed mode (`addToQueue` or `customScheduled`)
- visible queue slots if using `addToQueue`
- exact custom times if using `customScheduled`
- final copy for each channel

LinkedIn and X should share the same article or video on the same calendar day.
If Buffer's native queue would split them across different days, use a custom
schedule instead and ask Daniel to approve the exact times.

For scheduled blog campaigns, the blog should publish earlier on the same day.
The default is 12:00 UK for the blog, then social posts from 15:00 UK onward.
This gives the build, cache, RSS, OG image, and link preview time to settle.

For the broader content calendar, aim for up to three campaigns per week on
weekdays when there is enough backlog. Monday, Wednesday, Friday is the simple
default rhythm. If a campaign is already planned for Monday, prefer Wednesday for
the next one instead of stacking posts on the same day.

If Daniel has not approved the timing and copy together, do not create the posts.
In that case, say "the blog is scheduled, but Buffer is not scheduled yet" and
show the copy for approval.

## Review checklist

Before asking for approval:

- The hook leads with the useful idea.
- LinkedIn and X are different.
- The copy sounds like the site's voice guide.
- There are no em dashes or en dashes.
- There are no hashtags unless Daniel asked for them.
- The link is correct and has a trailing slash for site URLs.
- The post does not overclaim beyond the source material.
- The proposed Buffer action is clear.
- The proposed timing does not collide with an existing campaign.
- The final response distinguishes between blog scheduled, Buffer scheduled, and
  campaign scheduled.
