# Transcript: Garry Tan's Claude Code Setup Is More Than Prompts

Garry Tan open sourced his exact Claude Code setup, and that is why the repo got
so much attention.

But the interesting part is not that a well-known founder has a prompt folder.

The interesting part is that gstack treats agent workflow like software.

Generated skills, file handoffs, evals, browser infrastructure, second-model
review, and memory. That is the part worth studying.

In this video I want to walk through what gstack actually is.

The short version is that it is not a framework, a server, or a normal app. It
is a skills monorepo, a generated prompt system, a browser automation runtime,
and a memory layer wrapped around Claude Code.

That makes it a useful repo to read even if you do not want to copy it exactly.

The value is in the shape of the system.

The first thing to notice is that gstack is organised around work stages.

At the top level you see folders like `office-hours`, `plan-eng-review`,
`review`, `qa`, `ship`, `retro`, `learn`, `codex`, and `setup-gbrain`.

Each one is a skill.

That is the conceptual leap. The unit of design is not "ask Claude to code". The
unit of design is the stage of work.

One skill helps shape an idea before implementation. Another pushes on
architecture and tests. Another reviews the diff. Another drives a browser.
Another handles the release path. Another turns completed work back into
learning.

You may not want that exact workflow. I probably would not copy it one for one.

But I would copy the move underneath it: make the delivery process explicit
enough that an agent can participate in it.

The clever bit is that the `SKILL.md` files are not all hand-edited prompt
files.

The generated files start with a warning: auto-generated from `SKILL.md.tmpl`,
do not edit directly, regenerate with `bun run gen:skill-docs`.

That matters.

The source is a template plus resolver code. The generator reads templates,
finds placeholders, resolves them from source, and writes the final Markdown
that the agent host consumes.

The browser skill is the best example. Parts of the agent-facing instructions
are generated from TypeScript metadata in the browser package. If a command or
snapshot flag changes, the skill docs can be regenerated from the same source
the runtime uses.

That is a much stronger setup than a handwritten prompt file that slowly falls
behind the code.

Prompt drift is one of the easiest ways agent systems rot. gstack attacks that
by treating skill files as build artifacts.

Another pattern I like is that the skills do not rely only on chat history.

The generated preambles create session state under `~/.gstack/sessions`. They
derive the current repo slug. They look for project learnings under
`~/.gstack/projects/<repo>/learnings.jsonl`. Some skills can also load prior
sessions, design docs, analytics, or project-specific memory.

That gives the workflow a visible memory surface.

Markdown files, JSONL logs, and repo-scoped state are not glamorous. That is the
point. They are easy to grep, review, back up, and delete.

For multi-step agent work, that is often the difference between a demo and a
workflow.

A plan can become a document. A review can become a report. A release skill can
read what the planning skill produced. The handoff lives on disk instead of
inside a giant context window.

gstack also tests the skills.

There is an eval workflow in GitHub Actions that runs a matrix of suites on pull
requests: LLM judging, browser evals, planning evals, deploy evals, design evals,
QA evals, review evals, routing evals, Codex evals, and Gemini evals.

That is the part a lot of agent setups are missing.

If a skill changes how an agent plans, reviews, tests, or ships, then the skill
needs tests of its own.

Otherwise the agent can look productive while the instructions quietly degrade.

I would still be careful with any productivity numbers in the README. Treat
those as the author's claim, not an independent benchmark.

But the architecture is useful regardless of the headline number. The important
lesson is that skills need evals next to them, because they are part of the
runtime behaviour.

The browser package is where gstack becomes more than Markdown.

It has a compiled CLI binary that talks to a persistent local Chromium daemon
over HTTP. The daemon uses Playwright. The CLI reads state, sends a command, and
prints the result.

The rough shape is: agent to browse CLI, browse CLI to Bun HTTP daemon, daemon
to Playwright, Playwright to Chromium.

The first call starts the daemon. Later calls reuse it, so the agent is not
launching a fresh browser for every command.

That sounds like a small implementation detail, but it changes the workflow. The
agent can test pages, click through flows, inspect state, and produce evidence
without constantly paying the startup cost.

The security work is also serious. Pair-agent mode has separate local and tunnel
listeners. The remote path gets a smaller command surface. There are scoped
tokens, command allowlists, deny-default CDP access, canary token checks, hidden
element stripping, and classifier checks for prompt-injection risk.

That is the part that feels like systems engineering rather than prompt craft.

If an agent can browse, click, submit, and read page content, the browser harness
is part of the trust boundary.

gstack also includes a `/codex` skill.

This is a real second-opinion path. It supports review,
challenge, and consult modes. The review path can call `codex review` with a
pass/fail gate. The consult paths use `codex exec` in read-only mode, with JSONL
output for longer-running work.

The point is not that Codex is always right. The point is that a second model
with a separate prompt path can catch different failures.

Then there is gbrain for memory. It supports local PGLite, Supabase or Postgres,
and a remote HTTP MCP path. It also asks for per-repo policy: read-write,
read-only, or deny.

That policy matters.

Not every repo should write to memory. Not every agent should see every project.
Once memory becomes shared infrastructure, it needs the same controls as the
rest of the system.

I would not copy gstack exactly.

It is intentionally maximalist. That is why it is useful to read, but it is not
where every team should start.

The parts I would copy are smaller.

Make the workflow explicit.

Treat skills as generated, reviewed, tested software artifacts.

Move long-lived handoffs onto disk.

Give browser agents a real harness and a real security boundary.

Use evals to test the instructions as well as the code the agent writes.

Add memory with trust levels, not as an invisible global bucket.

That is the takeaway for me. gstack is not interesting because it is a famous
person's prompt pack. It is interesting because it shows what a personal Claude
Code setup looks like when it grows into an agent system.

If you are building with coding agents, I think this is the direction to watch.

Less magic prompt.

More explicit workflow.

More generated context.

More evals.

More real infrastructure around the agent.

I have written the full code-level breakdown on my site, so I will link that
below.

And if you have looked through gstack, I would be interested to know which part
you think is most worth copying: the generated skills, the browser daemon, the
evals, the review flow, or the memory layer.

