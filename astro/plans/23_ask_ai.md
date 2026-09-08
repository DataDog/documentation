# Ask AI component package

## Prompt

Hugo has an Ask AI component. Astro will need to use this component as well, so the component should be extracted into the `shared` folder at the top level of this repo. Maybe something like `shared/packages/ask-ai`.

Because we're moving this package out of Hugo, we have the advantage of being able to write it in TypeScript. Because this component is not required to be available in the statically rendered HTML at build time (an exception to our usual rules for SEO friendliness), we can make the invocation code/templates in Astro and Hugo very thin, keeping the vast majority of the rendering logic inside the package itself.

## Claude's plan

### Scope: two commits here, and Hugo's adoption is its own plan

The package must be **cherry-pickable onto `master` on its own**, without dragging
Astro's setup along with it. That constraint sets the commit boundaries, and they are
the most important thing in this plan:

| Commit | Contents | Depends on |
| --- | --- | --- |
| **1. The package** | `shared/packages/ask-ai/**` and nothing else. No host `package.json` edit, no mount site, no Hugo change. | Nothing. Cherry-picks onto `master` cleanly. |
| **2. Astro adoption** | Astro's dependency entry, dev/prebuild wiring, the mount component, and the searchbar row. | Commit 1, plus [22_add_rum.md](22_add_rum.md) for telemetry. |

Commit 1 is inert on its own: a package nobody depends on. That is the point — it
compiles, its tests run, and it changes no rendered page, so it can land on `master`
ahead of everything else without a feature flag or a revert risk.

**Hugo's adoption is [25_migrate_hugo_to_ask_ai_package.md](25_migrate_hugo_to_ask_ai_package.md).**
It is the largest and least reversible part of the work — it deletes a live
implementation from every Hugo page — so it gets its own plan, its own PR, and its own
preview verification. Splitting it out means Astro's copy can be exercised on a preview
deploy while Hugo still runs its own code, and only then does Hugo cut over.

This plan still has to design *for* two hosts, because plan 25 must not require
changing the package. Wherever a decision below is shaped by Hugo rather than by Astro
— the styles being injected rather than imported, the markup being package-owned, the
`window.askDocsAI` global staying a host concern — that is why, and it is called out
where it happens.

The consequence for the Manual verification section below: the rows that require Hugo
to be consuming the package — every side-by-side row in **B**, the Hugo rows in **A**,
and all of **E** — belong to plan 25 and cannot be run before it. What *is* runnable
after commit 2 is the Astro column of B, all of D, and the Astro half of A. This is
noted here rather than by editing that section, since it is the checklist for the
package as a whole across both plans.

### Confirmed decisions

| Question | Decision |
| --- | --- |
| Hugo adoption | **Its own plan** — [25_migrate_hugo_to_ask_ai_package.md](25_migrate_hugo_to_ask_ai_package.md). Hugo keeps its current code until then. |
| Package consumption | **Built artifact.** The package builds its own `dist/`; each host declares a workspace-local dependency on it. Chosen over both hosts compiling the TS source, for cleaner isolation. |
| Committed `dist/` | **No.** Built by each host's `prebuild`, so a fresh clone → install → build works with nothing generated in git. |
| Third-party deps | **Declared and bundled by the package** — `marked`, `marked-highlight`, `highlight.js`. |
| RUM / Logs | **Read from globals**, never imported. `window.DD_RUM` / `window.DD_LOGS`, no-op when absent. Importing would give a Hugo page two RUM instances. |
| Feature flags | **Injected resolver**, not bundled. Defaults to enabled when absent. See [24_feature_flags.md](24_feature_flags.md). |
| `getIsDatadogUser` | **Injected callback.** Lives in the host as generic site functionality; the `is_datadog_user` tag is omitted when the callback is absent. |
| Environment config | **Package owns the table.** It reads `data-env` off `<html>` and looks up its own `apiUrl` / `apiKey`, the way Hugo's `getConfig(env).docsAi` does today. |
| Styles | **Shipped by the package**, injected at runtime from JS. Values hardcoded to match Hugo's current SCSS. |
| Markup | **Owned by the package.** No `<template>` cloning, no host-rendered panel HTML, SVGs inlined. |
| Entry-point UI | **Host-owned.** The package owns the floating button and the panel; the hosts own the homepage hero button and the searchbar row, and call `askDocsAI()`. |
| i18n | **Hardcoded English**, with a `TODO`. Adding keys to Hugo's bundle is out of bounds. |
| `highlight.js` | **`lib/core` + a registered subset.** 24 KB gzipped instead of 303 KB. The one deliberate divergence from Hugo. |
| Tests | **The package's own**, inside the package. |
| Port fidelity | **Faithful**, except where parity would force bad TypeScript. No `any`; add guards where the JS relied on looseness. |
| Node target | **Node 20**, so a build invoked from Hugo's toolchain works. Both hosts are on Yarn 4.10.3. |
| Bundler | **esbuild**, matching what Hugo's `js.Build` already uses. |

### Core idea

Hugo's widget is 1,461 lines of JS across seven modules plus a 154-line Hugo partial
of `<template>` markup and 1,719 lines of SCSS. The port moves all of it into one
package and inverts one relationship: today the **host** supplies the markup and the
script clones it, and after the port the **package** supplies the markup and the host
supplies only a mount call.

That inversion is what makes the invocation thin, and it is the only structural change
to the design. Everything else is a faithful translation.

Three things stay outside the package, and they are the ones a reviewer should check
rather than skim:

- **Telemetry is read, not imported** (`window.DD_RUM` / `window.DD_LOGS`). The
  package has no Datadog SDK dependency and silently does nothing when the globals
  are absent.
- **Flags and Datadog-user status are injected**, both optional, both defaulting to
  the permissive value. The package works with neither.
- **The hosts keep their own entry points.** The searchbar row and the hero button
  are host UI calling a package function, not package UI.

### Steps summary

| Step | What it does | Why it is separate |
| --- | --- | --- |
| 1. Package skeleton | `package.json`, `tsconfig`, esbuild config, test setup, under `shared/packages/ask-ai`. | Everything else lands inside it. Also the whole of the cherry-pickable commit's risk: a third Node project in a repo that has two. |
| 2. Public API | `mountAskAi(config)` returning a handle, plus the `askDocsAI(query, options)` entry-point function. | The contract both hosts write against. Fixing it first means steps 3–7 cannot accidentally widen it. |
| 3. Port the modules | The seven JS modules to TS, faithfully. | The bulk of the diff, and the part with the least judgment in it. |
| 4. Own the markup | Build the panel in code instead of cloning `<template>`s; inline the eight SVGs. | Deletes the host's 154-line partial and the "template not in DOM" failure mode with it. |
| 5. Styles | Compile the four SCSS partials into one stylesheet the package injects itself. | Self-contained already — no Hugo variables or mixins are referenced — so this is a move, not a rewrite. |
| 6. Narrow `highlight.js` | `lib/core` plus ~20 registered languages. | 279 KB of gzipped payload, on every page. The only place the port knowingly changes behavior. |
| 7. Injected capabilities | The flag resolver, `getIsDatadogUser`, and the telemetry globals. | The three seams between package and host. Each has a documented absent-case. |
| 8. Build and consumption | `dist/` output, and how each host's `prebuild` produces it. | Spans two hosts' `package.json`s and Hugo's `Makefile`; the only part that touches files outside the package. |
| 9. Astro wiring | The mount component and the searchbar row. | Commit 2. The first real consumer, and the proof the API from step 2 is usable. |

### 1. Package skeleton (`shared/packages/ask-ai/`)

```
shared/packages/ask-ai/
  package.json          name "@dd/ask-ai", private, main "./dist/ask-ai.js"
  tsconfig.json         strict, target ES2020, DOM lib
  esbuild.config.mjs    one ESM bundle + one IIFE?  → see step 8
  vitest.config.ts      happy-dom environment
  src/
    index.ts            mountAskAi, askDocsAI — the public surface
    config.ts           per-env apiUrl / apiKey table
    panel.ts            the ConversationalSearch class (from index.js)
    markup.ts           DOM construction, replacing the Hugo <template>s
    icons.ts            the eight inlined SVGs
    markdown.ts         marked + highlight config, source extraction
    highlight.ts        lib/core + registered languages
    sources.ts          tooltips and source cards
    actions.ts          thumbs / copy / code-copy buttons
    client.ts           the SSE streaming client
    logger.ts           the DD_RUM / DD_LOGS reader
    suggestedQuestions.ts
    styles.css          compiled from Hugo's four SCSS partials
    types.ts            AskAiConfig, Source, ChatMessage, ViewMode…
```

`shared/` currently holds only `i18n/`, so `shared/packages/` is new. Nothing in
`shared/i18n/` is a Node package, so there is no existing convention to follow and no
root workspace to join — the package stands alone, with its own lockfile.

The `@dd/` scope is a private placeholder; nothing is published. Both hosts reference
it by path, so the name matters only for readability in their dependency lists.

**Node 20, not 24.** Hugo's `engines` is `>= 20.11.0` and Astro's is `>= 24.0.0`. The
package build runs from inside both toolchains, so it targets the lower bound. Yarn is
`4.10.3` in both hosts, so the package uses it too and the version split is only Node.

### 2. The public API (`src/index.ts`)

Two exports, and they are the entire contract:

```ts
export interface AskAiConfig {
  /** Overrides the `data-env` read off <html>. Hosts should not normally pass it. */
  env?: SiteEnv;
  /** Absent → the package behaves as if the flag were true. */
  isEnabled?: () => Promise<boolean>;
  /** Absent → the `is_datadog_user` tag is omitted rather than sent as false. */
  getIsDatadogUser?: () => Promise<boolean>;
}

export interface AskAiHandle {
  /** Opens the panel, optionally prefilling and auto-submitting a query. */
  ask(query: string, options?: { source?: TriggerSource }): void;
  /** Removes every node the package added and aborts any in-flight request. */
  teardown(): void;
}

export function mountAskAi(config?: AskAiConfig): AskAiHandle;
```

`mountAskAi` is idempotent — a second call returns the existing handle rather than a
second widget.

The `ask()` method replaces Hugo's `window.askDocsAI` global. The package does **not**
assign that global; each host does, from the handle it holds, so the package has no
side effect on `window` beyond the nodes it appends. Hugo's `searchbarHits.js` and
`instantsearch.js` both call `window.askDocsAI`, so plan 25 keeps that global for
them; Astro's searchbar calls the handle directly and needs no global.

Auto-submit stays as it is: a query of `AUTO_SUBMIT_MIN_LENGTH` (10) or more submits
after a 100 ms delay, a shorter one only prefills. Only on a fresh conversation.

### 3. Port the modules

Faithful translation, module by module. What follows is only the places where "faithful"
needs a decision.

**`panel.ts`** — the `ConversationalSearch` class, essentially unchanged: view modes
(`fullscreen` / `floating` / `sidebar`) persisted to `localStorage`, the
`RESIZABLE_MODES` clamp table, pointer-capture resize handles, the `Escape` ordering
(mode menu first, then panel), the Safari IME guard (`e.isComposing || e.keyCode === 229`),
the 50 ms render throttle, the rotating `LOADING_MESSAGES` and the `THINKING_MESSAGES`
server-message map.

Two members become host-conditional rather than being dropped:

- `isHomepage` (`document.querySelector('.kind-home')`) and the
  `IntersectionObserver` on `.home-ai-btn`. Astro has no homepage, so both are
  no-ops there — but they are host-agnostic DOM queries, so they stay in the package
  rather than being pushed into Hugo's invocation.
- `applySidebarTopOffset()` reads `.announcement-banner`. Astro has an
  `AnnouncementBanner` component using a different class. Add the Astro class to the
  selector rather than parameterizing it; two literals in a `querySelector` is
  cheaper than a config option, and one of them dies with Hugo.

**TypeScript, where looseness has to go.** These are the improvements the port is
authorized to make, and each replaces a real implicit-`any` or a silent `undefined`:

- `readStoredViewMode()` returns `VIEW_MODES.includes(stored)` where `stored` is
  `string | null`. Narrow with a type predicate to `ViewMode` instead of a cast.
- `RESIZABLE_MODES[mode]?.[dim]` is indexed by strings throughout. Type it as
  `Record<ResizableMode, Partial<Record<Dimension, SizeConfig>>>` so `floating`
  having a `height` and `sidebar` not having one is expressed rather than guarded.
- `readStoredSize()` does `parseInt(localStorage.getItem(key), 10)` on a possibly-null
  value — which works by coincidence. Guard it.
- The `catch (_) {}` blocks around every `localStorage` access stay: they are there
  for Safari private mode, not for tidiness.
- `logAction(message, data, ctx)` takes a free-form `data` object. Give it a
  discriminated payload type keyed by `action`, so a typo in an action name is a
  compile error rather than a junk facet in RUM.

**`markdown.ts`** — `marked` + `marked-highlight`, `breaks: true, gfm: true`, the
custom `link` renderer adding `target="_blank" rel="noopener noreferrer"`, the
`inlineRefChips` regex that skips `<pre>`/`<code>`, and both source formats: the
pipe-delimited `[sources]` block and the legacy fenced-JSON fallback with its relaxed
JSON repair. `normalizeHref()` keeps rejecting anything that is not `http:`/`https:` —
this is the `javascript:` guard the verification checklist tests, so it gets a unit
test naming that case.

**`client.ts`** — the SSE reader, unchanged: `POST {apiUrl}/chat` with
`X-Docs-Ai-Api-Key`, `data: ` line framing, `[DONE]` sentinel, `thinking` and
`markdown_fragment` event types. Type the parsed events as a discriminated union and
ignore unknown `type` values rather than trusting the shape.

**`logger.ts`** — reads `window.DD_LOGS?.logger` and `window.DD_RUM` and does nothing
when either is absent. Declare them as optional on `Window` in the package's own
ambient types; do not import the SDKs to get their types, since that would add the
dependency this decision exists to avoid. A structural minimum (`addAction`,
`addError`, `logger.info`, `logger.error`) is enough and does not couple the package
to an SDK version.

**`suggestedQuestions.ts`** — the 23-question list and `pickQuestions()` returning
three distinct random ones, verbatim.

### 4. Own the markup (`markup.ts`, `icons.ts`)

Hugo's `conversational-search.html` partial is four `<template>` elements the script
clones: the main dialog, the empty state, a suggestion button shell, and the message
actions row. The package builds all four in code instead.

What this deletes:

- The partial itself, and its four inclusion sites (`_default`, `api`, `partners`,
  `index`) — in plan 25.
- `createElements()`'s early return and the
  `#conv-search-template not in DOM` console warning. It exists because Hugo's 404
  layout omits the partial. With the markup in the package there is no missing
  template and no warning to emit. The verification checklist's 404 row therefore
  changes meaning at plan 25: the expectation becomes *no warning and no widget
  problem*, not *the existing warning still logs*.
- `getElementById('conv-search-actions-template')` in `actions.ts`, and with it the
  fallback icon paths it reads out of the template.

**The eight SVGs.** Hugo resolves `spark-ai`, `spark-purple`, `info-outlined`, `plus`,
`thumbs-up`, `thumbs-down`, `copy`, and `check-light` through its `img-resource.html`
partial, which fingerprints them and serves them from the image CDN. The package
inlines them as strings in `icons.ts`, since a URL would have to come from the host and
would differ per host — exactly the kind of config this design is trying not to have.

One knock-on: Hugo's copy button toggles `.copy-icon` / `.check-icon` `<img>` elements
by `style.display`. Inlined SVGs keep the same two class names and the same toggle, so
the CSS and the confirmation behavior are unchanged.

Build the DOM with `document.createElement` and explicit `textContent` for anything
derived from a message or a source label. Hugo already does this for user messages
(`contentDiv.textContent = content`), which is why the `<script>alert(1)</script>` row
in the checklist passes today; keep it deliberate rather than incidental, and unit-test
it.

### 5. Styles (`styles.css`)

The four SCSS partials — `_conversational-search.scss`, `_dialog.scss`,
`_resources.scss`, `_message-actions.scss` — are **already self-contained**. They
reference no Hugo mixin, no global `@import`, and no shared variable: all nineteen
`$conv-*` values are declared at the top of `_conversational-search.scss`, and even the
`.hljs-*` syntax theme is hand-written rather than imported from `highlight.js/styles`.
So this is a compile-and-move, not a rewrite. Convert the `$conv-*` variables to custom
properties on the panel root so the eventual dark-mode work has somewhere to hook.

`_home-ask-ai.scss` **stays in Hugo.** It styles the homepage hero button, which is
host-rendered server-side markup — injecting its CSS from JS would flash unstyled. It
is also the one file with no Astro counterpart.

**Injected at runtime**, not shipped as a separate file for each host to link. The
whole widget is constructed in JS and appended to `document.body`, so the package
injects its `<style>` before appending anything and there is no window in which
unstyled markup can paint. Zero host wiring is the reason to prefer it: Hugo's
`js.Build` cannot process an `import "./styles.css"` inside a JS bundle, so the
alternative is a hand-linked stylesheet per host.

Note this diverges from `astro/CLAUDE.md`'s CSS-modules-and-design-tokens rule. That
rule governs Astro components; this is a foreign package that also has to run inside
Hugo, and it ships plain CSS with hardcoded values to match Hugo exactly. Say so in a
comment at the top of the file, or the next reader will read it as an oversight.

### 6. Narrow `highlight.js` (`highlight.ts`)

Measured with esbuild against Hugo's installed `highlight.js`, minified:

| | minified | gzipped |
| --- | --- | --- |
| Full `highlight.js` (~190 languages, Hugo today) | 1055 KB | 303 KB |
| `lib/core` + 20 registered languages | 78 KB | 24 KB |

279 KB of gzipped payload, on every page load, since the widget mounts optimistically
everywhere. That is more than the rest of the package weighs combined.

Register: `bash`, `json`, `yaml`, `python`, `go`, `javascript`, `typescript`, `java`,
`ruby`, `sql`, `dockerfile`, `xml`, `csharp`, `php`, `rust`, `scala`, `ini`, `diff`,
`plaintext`, `markdown`. Each additional language is 1–3 KB gzipped.

**The behavior change**, which is the plan's one deliberate divergence: Hugo calls
`hljs.highlightAuto(code)` on a fence with no language, guessing across all ~190. With
a registered subset, `highlightAuto` can only guess among the 20, and a labeled fence
in an unregistered language falls through to plain text. Escaped and readable, not
broken — but not highlighted either. The checklist tests exactly this.

Keep `emptyLangClass: 'hljs'` and `langPrefix: 'hljs language-'` so the ported
stylesheet's selectors still match.

Not chosen: a dynamic `import()` on the first code fence. Better payload again, but it
makes the package emit multiple chunks, and then both Hugo's `js.Build` and Astro need
a public base URL to fetch the extra chunk from. Not worth it for a package with a
planned end of life.

### 7. Injected capabilities

Three seams, each optional, each with a defined absent-case. The absent-cases are the
point: they are what lets commit 1 be inert and commit 2 land before plan 24.

| Seam | Mechanism | Absent |
| --- | --- | --- |
| RUM / Logs | `window.DD_RUM`, `window.DD_LOGS` | Telemetry silently does nothing. No console noise — the checklist asserts this. |
| Feature flag | `config.isEnabled?: () => Promise<boolean>` | Treated as enabled. |
| Datadog user | `config.getIsDatadogUser?: () => Promise<boolean>` | The `is_datadog_user` tag is **omitted**, not sent as `false`. |

That last row is a small, deliberate divergence from Hugo, whose `logger.js` sends
`is_datadog_user: isDatadogUser ?? false`. Omitting is better in a shared RUM
application: `false` from Astro would be indistinguishable from a real signed-out
visitor, whereas an absent key is queryable as "not measured".

**The optimistic mount stays.** Hugo mounts assuming the flag is `true` and calls
`teardownConversationalSearch()` if it resolves `false` — accepting a brief flash
during a rare incident in exchange for never shifting layout on a normal page load.
Port it as-is, including the impression log firing only when enabled.

Astro passes no `isEnabled` until plan 24 lands, so the mount site carries the `TODO`
that [24_feature_flags.md](24_feature_flags.md) specifies verbatim.

**Config table** (`config.ts`) — the package reads `document.documentElement.dataset.env`
and looks up `apiUrl` / `apiKey`, mirroring Hugo's `getConfig(env).docsAi`. Plan 22
already puts `data-env` on `<html>` in `BaseLayout`, and Hugo has always had it. The
values are copied from `hugo/assets/scripts/config/config-docs.js`: live points at
`app.datadoghq.com`, preview and development both at `dd.datad0g.com`. The `apiKey` is
a `ddpub_`-prefixed publishable key already committed in this public repo — note that
in a comment, so a future reader does not read it as a leak.

Development falls back to `preview` rather than erroring, matching what
`feature-flags.js` does with its `rawEnv === 'development' ? 'preview' : rawEnv` line.

### 8. Build and consumption

**The package's build.** esbuild, matching what Hugo's `js.Build` already uses, so a
construct that bundles here bundles there. Emit ESM to `dist/ask-ai.js`, with
`marked`, `marked-highlight`, and `highlight.js` bundled in and the CSS inlined as a
string (esbuild's `text` loader). Sourcemaps external. `dist/` is git-ignored.

**Each host's consumption** is one dependency entry plus one `prebuild` hook:

- `astro/package.json` — a `"@dd/ask-ai": "portal:../shared/packages/ask-ai"`
  dependency, and `"prebuild": "yarn --cwd ../shared/packages/ask-ai build"`. `portal:`
  rather than `file:` so Yarn 4 symlinks rather than copies, and an edit to the package
  is visible without a reinstall.
- `astro/package.json` `dev` — build the package first, so `yarn dev` shows package
  changes. The user's expectation from the design conversation, and the reason
  `prebuild` alone is not enough.
- Hugo's `Makefile` `start` / `start-no-pre-build` targets get the same build step —
  **plan 25**, and one of the few Hugo-side edits `astro/CLAUDE.md` permits at all
  (`hugo/Makefile`, dev/deploy targets only).

Production CI is the real constraint here and the reason `prebuild` is the hook:
`documentation-ci` runs `yarn install` and `yarn build:*`, not `make`. Hanging the
package build off `prebuild` means it runs in CI with no change to that repo. Verify
this claim against the actual Astro CI job before relying on it — plan 22 established
that `documentation-ci` has no Astro build job on `main` at all, so "CI already runs
`yarn build`" is an assumption about a job that does not yet exist.

**A third Node project** is the real cost of this step. Two lockfiles become three,
and `yarn install` in a host no longer fully describes what has to be installed. The
mitigation is that the package's dependency list is three libraries deep and it is
scheduled for deletion.

### 9. Astro wiring (commit 2)

**The mount site.** A `src/components/AskAi/AskAi.astro` carrying a bundled
`<script>`, following `Telemetry.astro`'s shape — a component whose only job is to
carry a script that imports from npm. Rendered once by `BaseLayout`, so every route
gets it. It calls `mountAskAi()`, passes `getIsDatadogUser` from
`@lib/telemetry/datadogUserStatus`, passes no `isEnabled`, and assigns the returned
handle to a module-scoped variable the searchbar can reach.

Bundled scripts do not re-execute on view-transition soft navigation, so the
mount-once shape needs no guard — same reasoning as `Telemetry.astro`.

**The searchbar row is already stubbed.** `SearchResultsPopup.tsx:61-70` renders a
placeholder div with `data-placeholder-name='"Ask AI" Button Goes Here'`, the
`Selection` union already has an `{ kind: "ai" }` member, arrow-key navigation already
moves through it (`SearchBar.tsx:217-235`), and `SearchBar.tsx:151` carries
`// Enter on the Ask AI placeholder is a no-op for now (Placeholder)`. So this step
replaces a placeholder rather than adding a feature:

- Render the row's real label, updating as the user types — "Ask AI anything" when the
  query is empty, "Ask AI about *{query}*" otherwise, matching
  `setAskAISuggestionContent` in Hugo's `searchbarHits.js`.
- Wire the click and the `Enter`-on-selected paths to the handle's `ask(query, { source: 'search_suggestion' })`.
- Emit the same `search_suggestion_clicked` log Hugo's `logDocsAIEvent` emits, with
  `source: 'searchbar_dropdown'`, `query`, and `query_length`.

Astro gets **no hero button** — there is no Astro homepage. `_home-ask-ai.scss`, the
`.home-ai-btn` listener, and the `IntersectionObserver` that swaps between hero and
floating button are Hugo-only for as long as Hugo exists.

**Preact, not the hybrid pattern.** The searchbar is already a Preact component and the
row is a few elements; there are no large props to avoid passing, so the isolated-scope
default applies.

### i18n

Every string stays hardcoded English, matching Hugo, which hardcodes them too. The
package cannot use `shared/i18n` without adding keys to Hugo's bundle, which
`astro/CLAUDE.md` forbids. One `TODO` at the top of the strings module rather than one
per string — there are roughly thirty, across the panel chrome, the loading messages,
the disclaimer, and the 23 suggested questions.

Worth flagging as a real gap rather than a formality: Astro's `/api` pages are
translated (`fr`, `ja`, `ko`, `es`), so an English-only widget on a Japanese API page
is visibly wrong in a way it never was on Hugo's English-only pages. The `TODO` should
say that.

### Files

| File | Change |
| --- | --- |
| `shared/packages/ask-ai/**` | New — the whole package. **Commit 1, cherry-pickable.** |
| `astro/package.json` | Add the `portal:` dependency; add the package build to `dev` and `prebuild` |
| `astro/src/components/AskAi/AskAi.astro` | New — the mount script, with plan 24's flag `TODO` |
| `astro/src/layouts/BaseLayout.astro` | Render `<AskAi />` |
| `astro/src/components/SearchBar/SearchResultsPopup.tsx` | Replace the placeholder row with the real one |
| `astro/src/components/SearchBar/SearchBar.tsx` | Wire click and Enter to the handle; drop the no-op comment |
| `hugo/**` | **Not this plan** — see [25_migrate_hugo_to_ask_ai_package.md](25_migrate_hugo_to_ask_ai_package.md) |

### Testing (red → green)

Inside the package (`vitest`, `happy-dom`), written first and verified failing. These
run in commit 1, with no host present — which is itself the test that the package is
self-contained:

- `markdown.unit.test.ts` — `[N]` tokens become chips; tokens inside `<pre>` and
  `<code>` do **not**; both source formats parse; the relaxed-JSON fallback survives
  single quotes and trailing commas; `normalizeHref` rejects `javascript:` and
  `data:` and resolves relative URLs against the origin.
- `highlight.unit.test.ts` — a registered language highlights; an unregistered one
  falls through to escaped plain text rather than throwing. The divergence, asserted
  rather than described.
- `markup.unit.test.ts` — a user message containing `<script>alert(1)</script>`
  renders as literal text; the built panel exposes every class the stylesheet and the
  event handlers select on.
- `panel.unit.test.ts` — view mode round-trips through `localStorage` and falls back
  to `fullscreen` on a junk value; sizes clamp at min and at the viewport-percentage
  max; `Escape` closes the mode menu before the panel; `keyCode === 229` mid-composition
  does not submit; a 10-character query auto-submits and a 9-character one does not.
- `client.unit.test.ts` — a mocked SSE stream fires `onThinking` and `onToken` in
  order, stops at `[DONE]`, ignores unknown event types, and surfaces a non-OK
  response as an error.
- `logger.unit.test.ts` — with no globals, nothing throws and nothing is logged; with
  fakes, `docs_ai: true` is always present, and `is_datadog_user` is absent rather
  than `false` when no callback was supplied.
- `mount.unit.test.ts` — `mountAskAi` twice returns one widget; `teardown()` leaves
  `document.body` with no package nodes and aborts an in-flight request; an
  `isEnabled` resolving `false` tears down, and one resolving `true` logs the
  impression exactly once.

In Astro (commit 2):

- `SearchBar` unit tests — the row's label tracks the query; click and `Enter` call
  the handle with `source: 'search_suggestion'`. Existing tests assert the
  placeholder, so they change in the same commit.
- One browser test — after load, the floating button exists, clicking it opens the
  panel, and the page reports **zero** console errors. Plan 22's experience is the
  argument for that last clause: a widget that mounts while throwing looks identical
  to one that works, in any test that only checks for the button.

### TODOs to leave in the code

Following plan 22's convention — `// TODO: <what> once <condition>`, with a pointer to
whoever owns the answer.

| Location | TODO | Kind |
| --- | --- | --- |
| `astro/src/components/AskAi/AskAi.astro`, the mount call | No flag resolver is passed, so `docs-ai-enabled` does not govern Astro. Text specified verbatim in [24_feature_flags.md](24_feature_flags.md). | Blocked |
| `shared/packages/ask-ai/src/strings.ts` | Hardcoded English. Needs `shared/i18n` keys, which cannot be added from this repo's Astro side. Names the translated-`/api`-page gap. | Blocked |
| `shared/packages/ask-ai/src/styles.css` | Plain CSS with hardcoded values, deliberately, because the package also runs inside Hugo — not an oversight of `astro/CLAUDE.md`'s CSS-modules rule. | Dies with Hugo |
| `shared/packages/ask-ai/src/highlight.ts` | The registered-subset divergence from Hugo's `highlightAuto` across all languages, and how to add a language. | Permanent |
| `shared/packages/ask-ai/src/config.ts` | Copied from Hugo's `config-docs.js`; the package becomes sole owner at the cutover. Mirrors `astro/src/config/telemetry.ts`'s TODO. | Dies with Hugo |
| `shared/packages/ask-ai/src/panel.ts`, `applySidebarTopOffset` | Two banner class selectors, one per host. The Hugo one goes at the cutover. | Dies with Hugo |
| `shared/packages/ask-ai/src/logger.ts` | Structural `Window` types rather than the SDKs' own, specifically to avoid taking the dependency. | Permanent |
| `astro/package.json`, the `prebuild` hook | Assumes the Astro CI job runs `yarn build`. No such job exists in `documentation-ci` yet — confirm when it is written. | Blocked |

### Risks and open questions

- **The Astro CI job does not exist**, so "the package build hangs off `prebuild`, which
  CI already runs" is unverifiable today. If the eventual job invokes Astro some other
  way, the package silently is not built and the widget silently is not there. The
  cheapest guard is for the mount script to fail loudly on a missing package rather
  than optionally — a build error beats a missing widget.
- **A third Node project.** Two lockfiles become three; `yarn install` in one host no
  longer describes everything that must be installed. Accepted for isolation, and
  bounded by the package's planned deletion.
- **`portal:` across directories** is the piece most likely to misbehave in CI rather
  than locally — a `portal:` outside the project root depends on the install being
  run from a checkout that contains `shared/`, which it always is here, but shallow or
  filtered checkouts would break it. Worth confirming on the first preview build.
- **One package, two bundlers.** The entire risk this plan's verification section
  exists for. esbuild for the package and Vite for Astro agree on ESM, but Hugo's
  `js.Build` is a *different* esbuild invocation with its own target and no CSS
  handling, which is why the styles are injected as a string rather than imported.
- **Bundle weight on Astro.** Even narrowed, the package is new JS on pages that ship
  very little — and it mounts on every page, not just where it is used. Plan 22 already
  added ~100 KB of SDKs. Neither is on the critical path, but together they change the
  site's JS profile materially.
- **The optimistic mount is inherited, not chosen.** It is the right trade for a
  default-on kill switch, but it means a flag-off page shows the button briefly. Plan
  24's verification tests it on Slow 3G, which is where it looks worst.
- **`highlightAuto` regression is invisible.** Nothing errors when an unlabeled fence
  in an unregistered language renders unhighlighted; it just looks slightly worse. If
  Datadog's answers routinely include, say, Kotlin or Elixir fences, the subset is
  wrong and the only way to find out is to look at real answers.
- **English-only on translated pages.** Called out above; the one parity gap that gets
  *worse* on Astro than it was on Hugo, because Astro's `/api` pages are translated
  and Hugo's widget only ever ran on English ones.
- **Plan 25 deletes a live implementation.** Splitting it out reduces the risk but
  does not remove it, and it constrains this plan: every seam the package exposes has
  to be one Hugo can actually reach, or plan 25 turns into a package rewrite.

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