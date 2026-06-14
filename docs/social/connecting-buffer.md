# Connecting Buffer (one-time setup)

Social sharing runs through Buffer's official remote MCP server. Buffer holds the
LinkedIn and X connections and does the posting. Your agent talks to Buffer over
MCP. There is nothing to host and no API key to store in this repo: the connection
is authenticated with a browser sign-in to Buffer.

This is a one-time setup that only Daniel can do, because the sign-in links the MCP
to his Buffer account.

## 1. Connect the Buffer MCP to your agent

Pick the agent you use. The server URL is the same either way:
`https://mcp.buffer.com/mcp`.

**Codex CLI:**

```sh
codex mcp add buffer --url https://mcp.buffer.com/mcp
```

**Claude Code:**

```sh
claude mcp add --transport http buffer https://mcp.buffer.com/mcp
```

A browser window opens. Sign in to Buffer if prompted and approve access. Because
the server is remote, the same setup works for any MCP client, including ChatGPT
later, with no extra hosting.

For Codex, a successful connection should show:

```txt
buffer  https://mcp.buffer.com/mcp  enabled  OAuth
```

You can check that with:

```sh
codex mcp list
codex mcp get buffer
```

The installed Codex connection uses OAuth, not a repository API key.

## 2. Connect your channels in Buffer

In the Buffer app, connect the channels you want to post to:

- The LinkedIn profile (`linkedin.com/in/daniel-beck-dev`).
- The X account (`x.com/DanielBeckDev`).

Confirm your Buffer plan includes X, since some plans gate it.

## Why this avoids the X paid API

Posting to X normally requires a paid X developer account (X removed the free
write tier in early 2026). Going through Buffer sidesteps that entirely: Buffer
posts to X under its own access, as part of your Buffer subscription. You do not
need an X API key, and there is no per-post X cost on your side.

## Checking it works

Ask your agent to list your Buffer channels. If it returns the LinkedIn and X
channels with their ids, you are connected. If a call fails with an auth error,
run:

```sh
codex mcp login buffer
```

If that does not work, remove and re-add the server:

```sh
codex mcp remove buffer
codex mcp add buffer --url https://mcp.buffer.com/mcp
```

Then follow [./sharing-playbook.md](./sharing-playbook.md) to schedule a share.

## Capability check

The Buffer MCP connection requested these OAuth capability groups when installed
in Codex:

- `account:read` and `account:write`: read account, organisation, and channel
  information, and manage supported account-level actions.
- `posts:read` and `posts:write`: list, create, schedule, and manage Buffer
  posts where the connected account allows it.
- `ideas:read` and `ideas:write`: read and save ideas in Buffer.
- `insights:read`: read supported performance and analytics data.

Tool names are client-dependent. Do not hard-code names in docs or scripts. Ask
the connected agent to list available Buffer tools, then map the workflow to the
closest available tool.

## Troubleshooting

- **Auth errors on tool calls:** the MCP session expired or was never approved.
  Run `codex mcp login buffer`. If that fails, remove and re-add the server.
- **No X channel listed:** connect X in the Buffer app, and check your plan
  includes it.
- **Posts not going live:** check the Buffer queue. A scheduled post sits there
  until its time. A draft never publishes until you schedule it in Buffer.
