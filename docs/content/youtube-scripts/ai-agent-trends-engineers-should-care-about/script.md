# YouTube script: The AI Agent Trends Engineers Should Actually Care About

Source post:
[`src/content/blog/ai-agent-trends-engineers-should-care-about.mdx`](../../../src/content/blog/ai-agent-trends-engineers-should-care-about.mdx)

Working title:
`The AI Agent Trends Engineers Should Actually Care About`

Format: AI engineering trends, conference-backed commentary

Estimated length: 8 to 10 minutes

Target audience: software engineers, tech leads, platform engineers, and people
building with AI agents at work.

Tone: calm, direct, practical, thoughtful. No hype.

Primary promise: after watching, the viewer understands the AI agent trends that
matter for real engineering teams: skills, harnesses, context, security, evals,
and review.

Primary CTA: read the full notes on the site.

## Script

### Hook: 0:00 to 0:20

A lot of AI agent trend videos are looking in the wrong place.

They focus on model names, demos, and big predictions. That stuff matters, but
it is not where most engineering teams are going to win or lose with agents.

The trends I think engineers should care about are more practical: skills,
context, harnesses, sandboxes, evals, and the way teams review work.

That is what decides whether agent work is repeatable, or just impressive once.

Visual cue: direct to camera. Quick cuts of the conference page, notes, terminal,
docs, and an agent diff.

### Intro: 0:20 to 0:55

This video comes from two days of notes at AI Native DevCon London, but the
conference is not really the point.

The useful part is the pattern that kept showing up across the talks. The same
things kept coming back: skills, context, harnesses, sandboxes, evals, and team
habits.

The model still matters. But for engineers building with agents, the bigger
shift is happening around the model.

Once an agent is good enough to be useful, the question changes. Can the system
around it make good work happen again tomorrow?

Visual cue: show the blog post briefly, then zoom into a simple trend list.

### Trend 1: Skills are becoming software dependencies: 0:55 to 2:10

The first trend is that skills are becoming software dependencies.

Guy Podjarny's keynote framed this really clearly: a skill changes how an agent
behaves. If it can steer an agent into editing code, calling tools, or touching
secrets, then it deserves the same treatment as code.

Version it. Review it. Test it. Give it an owner. Delete it when it goes stale.

That sounds obvious once you say it, but it is not how a lot of teams treat
agent instructions today. They end up as scattered markdown files, old prompt
experiments, or clever shortcuts that nobody fully trusts.

The useful breakdown from Macey Baker and Baruch Sadogursky was to stop putting
everything into one giant prompt. Split the system into rules, skills, scripts,
hooks, and evals.

Rules constrain. Skills carry judgment. Scripts do deterministic work. Hooks
connect the system. Evals tell you whether it still behaves.

That shape feels much easier to maintain than a mega-prompt that tries to be
policy, workflow, memory, and test suite at the same time.

Visual cue: show a messy prompt file becoming five labelled blocks: rules,
skills, scripts, hooks, evals.

Retention beat: "The key point for me is this: if a skill can change production
work, it belongs in your engineering system."

### Trend 2: Reliability is moving into the harness: 2:10 to 3:25

The second trend is harness engineering.

Ryan Lopopolo described the harness as the deterministic software around the
probabilistic model. That means the context you give it, the tools it can use,
the autonomy it has, the feedback loop, and the checks after it finishes.

That framing matters because it moves the reliability conversation away from
"is the model smart enough?"

A better question is: what happens when the agent is wrong?

If a test fails, does that failure feed back into the next run? If the agent
used the wrong file, does the context get better? If it needed too much access,
does the tool boundary get narrower? If it makes the same mistake twice, do we
write an eval for the third time?

A demo only has to work once. A harness has to learn from the misses.

That is the part I think a lot of teams are underinvesting in. They are buying
or building agents, but not building the loop that makes those agents improve
inside their actual environment.

Visual cue: diagram of model in the middle, surrounded by context, tools,
feedback, verification, and permissions.

### Trend 3: Context engineering is becoming product work: 3:25 to 4:45

The third trend is context engineering becoming product work.

Rob Sloan's talk pushed harness thinking beyond code, which I found useful.
Agents do not just need source files and commands. They need the product goal,
the design intent, the constraints, the acceptance criteria, and the decisions
that led to the current shape of the work.

Most teams already have that information somewhere.

That is the problem.

It is in meeting notes, Slack threads, ticket comments, private docs, and the
heads of people who have been around long enough to know why something is weird.
A human can often fill those gaps from memory. An agent acts on what is actually
present.

So context becomes a product surface. It needs ownership. It needs review. It
needs provenance. It needs to be easy to inspect.

The phrase from Lamis at Anthropic that stuck with me was filesystem-as-memory.
Markdown, search, versioning, permissions, and human review. Not fancy. Just
maintainable.

And I like that because shared context does not need to be magical. It needs to
be visible enough that people and agents can use the same version of the truth.

Visual cue: show scattered sources merging into a single "context packet":
goal, constraints, decisions, acceptance criteria, owner.

### Trend 4: Agent experience is becoming developer experience: 4:45 to 6:10

Dana Lawson's Netlify talk was probably my favourite because it was painfully
practical.

Netlify was built around a human loop. Then agents started using it and exposed
the weak spots.

Humans skim logs. Agents retry.

Humans infer intent from a dashboard. Agents need structured state.

Humans carry tribal knowledge. Agents need blueprints, recipes, and decision
records.

That is Agent Experience, or AX.

I like the term because it points at real interfaces: logs, APIs, CLIs, CI
output, deploy flows, docs, errors, and rollbacks. All the places where a human
can improvise but an agent cannot.

The nice twist is that improving AX also improves developer experience.
Machine-readable build errors help agents, but they also make dashboards clearer
for people. Intent-level capabilities help agents, but they also make APIs less
awkward.

So this is not about making weird agent-only infrastructure. It is about taking
the rough edges humans have tolerated for years and making them explicit.

Visual cue: split screen. Left side: noisy build log. Right side: structured
error with file, reason, command, and suggested next step.

### Trend 5: Sandboxing is becoming part of the product: 6:10 to 7:10

The security thread was just as concrete.

Oleg Selajev's Docker talk made the point directly: prompts are not security
boundaries.

If agents can run commands, edit files, call tools, and move between repos, then
isolation is part of the product. Not a policy paragraph. Not a "click yes to
continue" prompt. The product.

That means hard isolation, controlled file sharing, network policy, secret
isolation, sandbox policy, and audit logs.

None of that is glamorous. It is what makes speed survivable.

This is the part where I think the industry needs to be careful. Agent velocity
is useful, but speed without boundaries just moves mistakes faster.

Visual cue: show an agent workflow entering a sandbox with labelled boundaries:
files, network, secrets, audit log.

### Trend 6: Review is moving before the diff: 7:10 to 8:25

The team impact was the final theme.

Hannah Foxwell's talk made this feel very real. If agents make implementation
faster, the bottleneck moves upstream.

Product clarity matters more. Spec quality matters more. Release safety matters
more. Operations matter more.

And review has to move earlier.

Reviewing thousands of lines of generated code is miserable. The better review
target is the goal, the constraints, the acceptance criteria, and the shape of
the solution before the agent starts producing the diff.

That changes what senior engineering work looks like.

Less waiting until the end to approve a diff. More shaping the work before the
system starts moving.

Robert Overweg's "one brain" idea connected to the same point. Teams need a
shared, inspectable knowledge surface with provenance and review. People and
agents should draw from the same source instead of each building their own
private pile of notes.

Otherwise agent speed just spreads confusion faster.

Visual cue: show a pull request with a huge diff, then rewind to a reviewed spec
and context packet.

### Trend 7: Agent infrastructure is becoming normal infrastructure: 8:25 to 9:15

The last trend is less flashy, but important: agent infrastructure is starting
to look like normal infrastructure.

Shaun Smith's talk was a reminder that the plumbing is still early. MCP is how
agents connect to tools and data, and the current shape still has too much
connection setup, repeated tool discovery, and stateful protocol work.

The direction he described felt like normal web infrastructure catching up:
stateless HTTP transport, shared tool lists, routing through headers, and one
authorised URL for a scoped set of tools.

That is less exciting than an agent demo, but probably more important if agents
are going to fit into real engineering systems.

The line from the Q&A was blunt: what separates real agent infrastructure from
wrapping LLM APIs?

Testing, mostly.

Visual cue: simple MCP diagram. Agent connects through one authorised URL to a
scoped tool set.

### Conclusion: 9:15 to 10:00

Those are the AI agent trends I think engineers should actually care about.

The work is not just proving that an agent can do something useful once. The
work is building enough context, discipline, and taste around it that the work
can be trusted again tomorrow.

The ideas I am taking forward are:

Treat skills like code.

Put reliability in the harness.

Make context owned and inspectable.

Design for agents as real users.

Give autonomous agents real security boundaries.

Move review before the generated diff.

For me, the biggest immediate gap is evals. A small suite per skill would give
us a way to change context with confidence instead of vibes.

I have written the full conference notes up on my site, so if you want the more
detailed version with the talks and examples, I will link that below.

And if you are building agent workflows in your own team, I would be curious
which of these is the biggest gap for you: skills, context, harnesses, security,
or review.

Visual cue: end on the blog post, then comments prompt on screen.

## Description draft

Most AI agent trend videos focus on models and demos. These are the trends I
think engineers should actually care about: skills as code, harness engineering,
context ownership, agent experience, sandboxing, evals, and earlier review.

Full notes:
https://danielbeck.dev/blog/ai-agent-trends-engineers-should-care-about/

## Pinned comment draft

The full write-up is here:
https://danielbeck.dev/blog/ai-agent-trends-engineers-should-care-about/

The biggest gap for me is evals next to skills. What is the biggest gap in your
agent setup right now?

## Thumbnail ideas

Saved concepts:

- [`thumbnails/ai-agent-trends.png`](./thumbnails/ai-agent-trends.png): broad
  trends packaging.
- [`thumbnails/stop-watching-the-model.png`](./thumbnails/stop-watching-the-model.png):
  stronger hook around the model being the wrong focus.
- [`thumbnails/agents-need-systems.png`](./thumbnails/agents-need-systems.png):
  recommended direction. It is the clearest match for the thesis.

Upload-ready exports:

- [`thumbnails/upload-ready/ai-agent-trends.jpg`](./thumbnails/upload-ready/ai-agent-trends.jpg)
- [`thumbnails/upload-ready/stop-watching-the-model.jpg`](./thumbnails/upload-ready/stop-watching-the-model.jpg)
- [`thumbnails/upload-ready/agents-need-systems.jpg`](./thumbnails/upload-ready/agents-need-systems.jpg)

Thumbnail text directions:

- `AI agent trends that matter`
- `Stop watching the model`
- `Agents need systems`

Visual direction: portrait-led thumbnail with a model in the centre, surrounded
by context, harness, skills, evals, security, and review.

## Production notes

- Keep delivery conversational. It should feel like talking through notes with
  another engineer, not performing a keynote.
- Use screen recordings of the blog post, docs, terminal, structured logs, and
  simple diagrams.
- Avoid stock AI imagery where possible. The subject is engineering practice,
  not generic AI.
- Add light chapter cards for each major idea.
- Keep the CTA soft and useful: read the full notes, then comment with the
  biggest gap in their team.

## Edit checklist

- First 20 seconds gets to the actual thesis.
- Intro does not repeat the hook.
- Each section has one practical point.
- Visual cues support the spoken line instead of decorating it.
- No em dashes or en dashes in visible script copy.
- No hype phrases or generic YouTube filler.
