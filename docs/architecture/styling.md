# Styling and theming

All design tokens and global styles live in `src/styles/global.css`. The site is
dark-first with a light mode, using Tailwind CSS v4.

## Design tokens

Colours are defined as semantic CSS variables that flip between themes, then
exposed to Tailwind through an `@theme inline` block. Use the semantic utilities,
not raw colours:

| Utility class                     | Meaning                       |
| --------------------------------- | ----------------------------- |
| `bg-base`, `bg-subtle`            | Page and deepest backgrounds  |
| `bg-surface`, `bg-elevated`       | Cards and raised surfaces     |
| `border-line`, `border-line-soft` | Hairlines                     |
| `text-ink`                        | Primary text                  |
| `text-muted`, `text-faint`        | Secondary and tertiary text   |
| `text-accent` / `bg-accent`       | The single accent (cyan-blue) |
| `text-on-accent`                  | Text on an accent fill        |

Do not introduce new raw hex values in components. If you need a new semantic
colour, add it to the `:root` and `.dark` blocks in `global.css` and to the
`@theme inline` map.

Fonts are `--font-sans` (Inter), `--font-mono` (JetBrains Mono), and
`--font-display` (Newsreader, used for hero and article titles only).

## Dark mode

The site defaults to dark. `<html>` ships with `class="dark"` so dark renders
even before JavaScript runs. A small inline script in `BaseLayout.astro` reads
`localStorage` and the OS preference and removes the class for light. The
`ThemeToggle` component flips and persists the choice. Tokens flip automatically,
so you rarely need the `dark:` variant.

## The Astro scoping gotcha (read this before adding layout CSS)

Astro scopes a component's `<style>` to that component's own elements by adding a
`data-astro-cid-xxxx` attribute. A scoped rule like `.foo { ... }` compiles to
`.foo[data-astro-cid-xxxx]` and only matches elements that carry that id.

**A child component's root element gets the child's id, not the parent's.** So if
you pass a class to a child component and try to style it from the parent:

```astro
<!-- BROKEN: .header__inner is styled in this component's <style>,
     but Container's root div has Container's id, not this one's. -->
<Container class="header__inner">...</Container>
```

the rule silently does nothing. We hit this with the header, hero, and footer,
and it caused a broken mobile layout. Two correct options:

```astro
<!-- Option A: wrap in a plain div that lives in THIS component's template. -->
<Container>
  <div class="header__inner">...</div>
</Container>
```

```astro
<!-- Option B: use global Tailwind utilities, which are not scoped. -->
<Container class="flex h-16 items-center justify-between">...</Container>
```

Rule of thumb: never style a class in a parent's `<style>` that you pass to a
child component. Put the class on an element you actually render, or use Tailwind
utilities.

## Code blocks

Fenced code in MDX is highlighted by Shiki with dual themes (`github-light` and
`github-dark-dimmed`). The light theme is applied inline and the dark theme is
swapped in by a CSS rule under `html.dark`. A copy button is added to every code
block by a script in `BaseLayout.astro`. You do not need to do anything special
to get highlighting; just use a fenced block with a language.
