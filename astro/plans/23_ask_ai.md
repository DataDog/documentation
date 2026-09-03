# Ask AI component package

## Prompt

Hugo has an Ask AI component. Astro will need to use this component as well, so the component should be extracted into the `shared` folder at the top level of this repo. Maybe something like `shared/packages/ask-ai`.

Because we're moving this package out of Hugo, we have the advantage of being able to write it in TypeScript. Because this component is not required to be available in the statically rendered HTML at build time (an exception to our usual rules for SEO friendliness), we can make the invocation code/templates in Astro and Hugo very thin, keeping the vast majority of the rendering logic inside the package itself.

## Claude's plan

## Manual verification

The goal of this plan is parity, so the verification is comparative: the same
checklist run against a Hugo page and an Astro `/api` page, looking for differences.
Run both from the same branch preview so the two sites are built from the same
package source.

Automated tests cover the package's units and its DOM behavior in isolation. What
they cannot cover is that one package, built once, behaves identically inside two
different host bundlers — which is the entire risk of this plan.

### A. Build and wiring

| Check | Expected |
| --- | --- |
| `yarn dev` in `astro/` | Builds the package first, then starts; widget appears |
| `make start-no-pre-build` in `hugo/` | Same, on the Hugo side |
| Editing package source, then re-running each dev command | Change appears on both sites |
| `yarn build` in each host | Package build runs as part of `prebuild`, no manual step |
| Fresh clone → install → build | Works with no committed `dist/` |

### B. Side-by-side parity checklist

Run every row on **both** a Hugo page and an Astro `/api` page.

1. **Entry points.** Floating button appears bottom-right on every page. Search
   dropdown shows the "Ask AI about …" row, and its label updates as you type,
   before results arrive. Pressing Enter on the selected suggestion opens the panel.
   On Hugo's homepage only: the hero button opens it, and the floating button hides
   while the hero is on screen.
2. **Auto-submit.** A query of 10+ characters from a search suggestion submits
   automatically; a shorter one prefills the input without submitting.
3. **View modes.** Switch between fullscreen, floating, and sidebar. Sidebar pushes
   the page content over and docks below the announcement banner. Reload — the mode
   persists.
4. **Resizing.** Drag the handles in floating and sidebar modes. Sizes clamp at the
   min/max bounds and survive a reload.
5. **Streaming.** Ask a question. A loading indicator appears and cycles status
   messages, then server-sent status text replaces it, then the answer streams in
   without visible flicker.
6. **Citations.** Inline `[1]` tokens render as numbered chips. Hovering a chip shows
   a tooltip positioned on screen. A "Sources" card list appears below the answer.
   Chips inside code blocks are **not** converted.
7. **Code blocks.** Highlighted, with a copy button per block that copies the right
   snippet. Verify a fenced block in a language *outside* the registered subset
   renders as plain text rather than breaking — this is the one deliberate
   divergence from Hugo.
8. **Actions.** Thumbs up, thumbs down, and copy-full-response all work and show
   their confirmation states.
9. **Follow-ups.** A second question keeps conversation context. "New Question"
   clears the thread, aborts any in-flight request, and shows three suggested
   questions — different ones each time.
10. **Keyboard and IME.** Esc closes the mode menu first, then the panel. In Japanese
    or Korean input, Enter mid-composition does not submit. Test in Safari
    specifically, which reports composition differently.
11. **Safety.** A user message containing `<script>alert(1)</script>` renders as
    literal text. A source URL with a `javascript:` scheme is rejected rather than
    linked.
12. **Visual diff.** Screenshot the open panel on both sites at the same viewport and
    compare. Fonts, spacing, and colors should match — the package ships its own
    styles, so any difference means host CSS is leaking in.

### C. Things that should differ

These are expected, not bugs:

- The Hugo homepage hero button has no Astro equivalent; Astro has no homepage.
- The kill switch governs Hugo only until [24_feature_flags.md](24_feature_flags.md)
  lands.

### D. Telemetry

Both sites report to the same RUM application ([22_add_rum.md](22_add_rum.md)), so
Astro's events are identified by `@context.stack:astro` and Hugo's by
`-@context.stack:astro`. Scope every query that way — otherwise an event emitted by
Hugo looks like proof that Astro's copy of the package works, which is exactly the
confusion this checklist exists to avoid.

After exercising the widget on each site, confirm events arrive in RUM and in Logs
under the right `stack`, tagged `docs_ai: true`:

- Impression, first open with the correct trigger source (`floating_button`,
  `home_hero`, or `search_suggestion` — check each entry point produces the right
  one), suggestion click, view-mode change, resize, source chip and card clicks,
  in-answer link clicks, thumbs up/down, copy, close with message counts, and
  response latency.
- `is_datadog_user` is present and correct. Check both states: logged into the
  Datadog app, and in a private window.

On Astro this requires [22_add_rum.md](22_add_rum.md) to be deployed; without it the
globals are absent and the package silently skips telemetry. Confirm that skipping is
in fact silent — no console errors.

### E. Regression checks on Hugo

The Hugo cutover deletes the old implementation, so verify nothing else broke:

- Pages that intentionally lack the widget (404) still log the existing warning and
  do not error.
- The searchbar's own feature-flag usage still works, since it keeps using Hugo's
  `helpers/feature-flags.js`.
- No duplicate widget, and no orphaned `<template>` markup left in the HTML source.
- Hugo's bundle size: compare `main-dd-js.js` before and after. It should **drop**,
  since the widget code moved out and `highlight.js` shrank from ~303 KB to ~24 KB
  gzipped.