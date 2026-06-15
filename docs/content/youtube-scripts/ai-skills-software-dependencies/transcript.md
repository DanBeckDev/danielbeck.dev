# Transcript: AI Skills Are Becoming Software Dependencies

I think "skill" is starting to become the wrong mental model for AI agents.

A skill sounds like a prompt snippet. A little markdown file. A useful trick.

But if that skill changes how an agent plans work, reviews code, drives a
browser, ships a release, or writes memory, then it is doing something much
heavier.

At that point, it starts to look like a software dependency.

This is a follow-up to two things I have been writing about recently.

First, the broader trend that useful AI agents need more engineering around the
model. Skills, context, harnesses, evals, security, and review.

Second, a code-level look at gstack, Garry Tan's Claude Code setup.

The gstack piece made this more concrete for me. Its skill files are generated
from templates and TypeScript source, checked in CI, adapted for different
agent hosts, and backed by evals.

That is not how I think about a prompt file.

That is how I think about a dependency.

Dependencies change what your software can do.

Skills change what your agent can do.

That sounds obvious, but it changes the risk model.

If a normal package changes, your app might build differently, call a different
API, or fail a test.

If a skill changes, your agent might plan differently, choose different files,
trust different context, run different checks, or call a different tool.

The output is less direct, but the effect is still real.

That is why the "just prompts" framing feels too weak.

A production skill can decide which context the agent loads, which tools it can
use, which files it writes as handoff state, which reviewer it asks for a second
opinion, and which safety rules it applies to untrusted input.

That is a lot of authority for something teams often treat as documentation.

The dependency framing gives us a better checklist.

You do not need a philosophy of prompts. You need the boring engineering
questions.

Where is the source?

What is the built artifact?

What consumes it?

What evals prove it still behaves?

Which agent hosts is it compatible with?

How do we detect drift?

Who owns upgrades?

How do we retire it?

That is the practical shift.

If a skill is allowed to influence production work, it should not live as a
mystery file in someone's home directory.

It needs a lifecycle.

gstack is useful because it shows this lifecycle in code.

It has more than a pile of `SKILL.md` files. The generated files are build
output.

The source lives in `SKILL.md.tmpl` files plus resolver code. A generator reads
the templates, resolves placeholders from source, and writes the final Markdown
that the agent host consumes.

The browser skill is the clearest example. The command reference is generated
from TypeScript metadata in the browser package.

So if a browser command changes, the skill can be regenerated from the same
source the runtime uses.

That matters because handwritten skills rot in a very normal way.

A command changes. A flag is renamed. A workflow moves from one script to
another. The skill still sounds confident, but now it is teaching the agent the
old system.

Generated artifacts do not solve everything, but they make drift visible.

Once a skill has a build step, stale output becomes a real failure mode.

gstack has a GitHub workflow that regenerates the skill docs and checks the git
diff. It does that for Claude, Codex, and Factory outputs.

If the generated skill files are stale, CI fails.

That is exactly how we already treat generated clients, lockfiles, schema
output, snapshots, and compiled assets.

The repo does not rely on someone remembering to regenerate the files. It
checks.

That matters because stale skills often fail as behaviour, not as syntax.

The agent uses an old command. It skips a new guardrail. It misses a required
handoff. It gives a plausible answer based on yesterday's workflow.

Freshness checks turn at least one class of skill failure back into a normal
software failure.

The next piece is evals.

A skill has a syntax surface and a behaviour surface.

The Markdown needs to parse. The frontmatter needs to be valid. The command
references need to exist.

But the agent also needs to keep doing the thing the skill exists to make it do.

That is where evals matter.

If a review skill should catch a certain bug, write an eval.

If a planning skill should produce a certain structure, write an eval.

If a browser skill should handle a workflow, write an eval.

Evals do not make agents deterministic. But they give you a place to put the
behaviours that would hurt if they broke.

Without evals, every skill edit is partly vibes.

With evals, you can start asking whether a change made the skill better or just
different.

The dependency model gets stronger when you look at host support.

The same source skill might need different output for Claude, Codex, Factory, or
another agent host.

Some hosts support different frontmatter. Some have different invocation
models. Some need different paths. Some should suppress helpers that do not make
sense in that runtime.

That is compatibility logic.

And it looks a lot like package distribution.

You have source. You have targets. You have transforms. You have host-specific
constraints. You have generated artifacts. You have checks.

The useful question is bigger than "did we write a skill?"

It is "which artifact is this host actually loading?"

If skills are dependencies, then versioning gets uncomfortable.

Which version of the skill did the agent use when it made this change?

Was it a global install?

Was it repo-local?

Was it a generated Codex variant?

Was memory support enabled?

Did the skill update halfway through the work?

Those questions sound fussy until something goes wrong.

When an agent makes a bad change, you need to know what shaped its behaviour.
The model matters. The tools matter. The prompt matters. The loaded skills
matter too.

That points towards a skill manifest, or maybe even a lockfile, for serious
agent workflows.

At minimum, I want to know the skill name, source, version or commit, generated
artifact, enabled feature flags, eval result, owner, and retirement status.

Without that, skill upgrades become invisible production changes.

I do not think every team needs a huge skill system.

Most teams should probably start smaller. A few repo-local skills. A clear
owner. A couple of evals. A freshness check if anything is generated. A deletion
path for stale skills.

But the bar should move.

A prompt can be tossed into a shared folder.

A dependency needs a maintainer.

That language matters because it changes how seriously we take the work.

The next wave of agent quality will come from better models, but also from
it will come from treating the things around the model with the same discipline
we already apply to the rest of the software stack.

Skills are a good place to start, because they are where intent becomes
execution.

