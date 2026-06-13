# MDX components

These components are available inside any blog post with no import statement.
They are registered in `src/components/mdx/index.ts` and injected by
`BlogPostLayout`. Source lives in `src/components/mdx/`.

## Callout

Highlight a note, tip, warning, or danger. Uses a Lucide icon, no emoji.

```mdx
<Callout type="warning" title="The drift trap">
  Body text. Markdown works in here.
</Callout>
```

- `type`: `note` (default) | `tip` | `warning` | `danger`
- `title`: optional. Defaults to a label based on the type.

## YouTubeEmbed

Privacy-friendly facade. Shows a thumbnail and only loads the YouTube iframe on
click.

```mdx
<YouTubeEmbed id="XYDUfa08-r8" title="Optional accessible label" />
```

- `id`: the 11-character YouTube id (not a URL).

## MermaidDiagram

Renders a Mermaid diagram, theme-synced to light or dark. Loaded lazily, only
when it scrolls into view.

```mdx
<MermaidDiagram
  title="Optional caption"
  code={`flowchart LR
  A[Input] --> B[Process]
  B --> C[Output]`}
/>
```

- `code`: the diagram source as a template literal.
- Avoid angle brackets (`<`, `>`) in node labels; they break the parser.

## CodeBlock

Wraps a fenced code block to add a filename bar. The fence is still highlighted
by Shiki and gets a copy button.

````mdx
<CodeBlock filename="render.ts" lang="ts">
  ```ts export function render() {}
  ```
</CodeBlock>
````

- `filename`, `lang`: both optional.
- For plain code without a filename bar, just use a fenced block directly.

## GitHubRepo

A compact repo card. Pass details directly.

```mdx
<GitHubRepo
  name="owner/repo"
  url="https://github.com/owner/repo"
  description="Optional one-liner."
  language="TypeScript"
  stars={1200}
/>
```

All props optional except that you want at least `name` and `url`. `stars` only
renders when greater than zero.

## ProjectCard

A richer card with tech badges and status. Standalone props (not tied to a
collection).

```mdx
<ProjectCard
  displayName="Design System Kit"
  description="A themeable component library."
  repoUrl="https://github.com/owner/repo"
  homepageUrl="https://..."
  tech={['TypeScript', 'React']}
  status="active"
/>
```

- `status`: `active` | `maintained` | `archived` | `experimental`.

## ArticleCard

Renders a post as a list item. Takes a blog collection entry, so it is mostly
used by pages rather than inside prose.

```astro
<ArticleCard post={post} />
```

## NewsletterSignup

A placeholder signup band. Currently disabled (shows "Coming soon"). Wire its
form `action` to an email provider and remove the disabled state when ready.

```mdx
<NewsletterSignup title="Optional heading" blurb="Optional line." />
```
