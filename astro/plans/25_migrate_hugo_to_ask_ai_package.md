# Migrate Hugo to the Ask AI package

## Prompt

[23_ask_ai.md](23_ask_ai.md) extracts Hugo's Ask AI widget into
`shared/packages/ask-ai` and wires Astro up as its first consumer, deliberately leaving
Hugo running its own copy. This plan is the other half: Hugo drops
`assets/scripts/components/conversational-search/`, its SCSS partials, and its
`<template>` partial, and consumes the package instead.

It is separated out because it is the only irreversible part of the work. Astro's
adoption adds a widget to pages that never had one; Hugo's replaces a widget that is
live on every page of the production docs site. Those deserve different reviews.

## Claude's plan

### Prerequisite and authorization

Depends on [23_ask_ai.md](23_ask_ai.md) being merged — both commits, not just the
package. Astro's adoption comes first on purpose: it exercises the package's public API
on a preview deploy while Hugo still runs known-good code, so an API problem surfaces
before it can take down the live widget.

**This plan edits Hugo, which `astro/CLAUDE.md` otherwise forbids.** The permitted
exception list covers `hugo/Makefile` dev targets but not `assets/` or `layouts/`. The
authorization is explicit and predates this plan — Hugo adopting the package was
decided in the design conversation that produced plan 23 — but it should be restated in
the PR description rather than assumed, because a reviewer checking the rule will
otherwise be right to object.

### Confirmed decisions

| Question | Decision |
| --- | --- |
| Cutover shape | **One PR, all four layouts at once.** No dual-run period. |
| Feature flags | **Hugo keeps `helpers/feature-flags.js`** and passes `isEnabled` into the package. The searchbar keeps using the same helper. |
| `fetchDatadogUserStatus` | **Stays in Hugo's `feature-flags.js`**, passed into the package as `getIsDatadogUser`. Not deleted — the file is Hugo's, and Astro already has its own copy. |
| `window.askDocsAI` | **Kept**, assigned by Hugo's thin invocation module. `searchbarHits.js` and `instantsearch.js` both call it and are not being rewritten. |
| Hero button | **Stays in Hugo**, along with `_home-ask-ai.scss` and `.home-ai-btn`. Host-owned entry-point UI. |
| `DOCS_AI_ENABLED_FLAG_KEY` | **Moves into `feature-flags.js`.** It currently lives in the widget, which is why the searchbar imports from the widget. |
| Package build | Hooked into `hugo/package.json`'s `prebuild` plus the `Makefile`'s `start` and `start-no-pre-build` targets. |
| Rollback | **Revert the PR.** No flag-gated dual path — see below. |

### Core idea

Almost all of this plan is deletion. The additions are one thin invocation module, one
dependency, one build hook, and one moved constant.

| | Before | After |
| --- | --- | --- |
| JS | 1,461 lines across 7 modules | ~30 lines, one module |
| Markup | 154-line `<template>` partial, 4 inclusion sites | none |
| SCSS | 1,719 lines across 5 partials | 80 lines (`_home-ask-ai.scss` only) |
| npm deps | `highlight.js`, `marked-highlight` | removed |

The risk is not in any one of those; it is that they are one atomic change to a
production page template. Which is the argument for the ordering below: replace the
consumer first, verify, and only then delete.

### Why no dual-run period

The obvious safer shape — ship the package alongside the old implementation behind a
flag, compare, then delete — does not work here, and it is worth saying why rather than
leaving it as an omission.

Both implementations append a floating button and a panel to `document.body`, register
`window.askDocsAI`, and inject styles for the same class names. Running both means two
widgets, two impression logs, and one set of CSS overwriting the other. Making them
coexist would mean namespacing the package's classes and DOM — work that exists only
for the dual-run period and would then be deleted.

So the mitigation is ordinary rather than clever: the package is already proven on
Astro before this lands, the parity checklist in plan 23 section B is run on a Hugo
preview before merge, and rollback is a revert of one PR that touches no data and no
schema.

### Steps summary

| Step | What it does | Why it is separate |
| --- | --- | --- |
| 1. Depend and build | Hugo declares the package and builds it in `prebuild` and the dev targets. | Nothing else can be tested until the package is resolvable from Hugo's bundle. |
| 2. Move the flag key | `DOCS_AI_ENABLED_FLAG_KEY` from the widget into `feature-flags.js`. | Breaks the searchbar's dependency on the widget module *before* the widget is deleted. Doing it after means a broken intermediate state. |
| 3. Thin invocation module | ~30 lines replacing the widget: mount, inject the two callbacks, assign the global, wire the hero button. | The only new code in the plan. |
| 4. Delete the old implementation | 7 JS modules, 4 SCSS partials, the `<template>` partial and its 4 inclusion sites. | The irreversible step. Last, so every step before it is verifiable on its own. |
| 5. Drop the dead dependencies | `highlight.js` and `marked-highlight`. | Independent of the rest and the easiest to get wrong — `marked` must stay. |

### 1. Depend on the package and build it

`hugo/package.json`:

- `"@dd/ask-ai": "portal:../shared/packages/ask-ai"`, same reference style Astro uses.
- `"prebuild": "yarn --cwd ../shared/packages/ask-ai build && rimraf public && npx hugo mod clean"` —
  prepended to the existing `prebuild`, so `yarn build` and `yarn build:preview` both
  build the package first. This is what makes it work in `documentation-ci` with no
  change to that repo, since those jobs run `yarn build:hugo:*` through `yarn`.

`hugo/Makefile` — add the same build step to `start` and `start-no-pre-build`, so local
dev picks up package edits. `hugo/Makefile` dev targets are on `astro/CLAUDE.md`'s
permitted-exception list; content and build-script targets are not, and none are touched.

**Verify `prebuild` actually runs in the CI job** rather than trusting it. Hugo's
`build` script chains `prebuild` explicitly (`"build": "yarn run prebuild && yarn run build:hugo"`)
but `build:preview` and `build:live` call `build:hugo:*` **directly**, bypassing
`prebuild` entirely. So a `prebuild` hook is not sufficient for the preview and live
jobs, and the package build must be added to those two scripts as well. This is the
single most likely thing to be wrong in this plan, and its symptom is a missing widget
in preview with a green build.

Hugo's esbuild (`js.Build`) must be able to consume the package's ESM output. Plan 23
chose esbuild for the package's own bundle specifically so this holds, but Hugo's
invocation has its own target setting — confirm the emitted output is within it rather
than assuming, since a syntax-level mismatch here fails the Hugo build rather than
degrading at runtime.

### 2. Move the flag key

`assets/scripts/components/instantsearch/searchbarHits.js:3` imports
`DOCS_AI_ENABLED_FLAG_KEY` from `../../components/conversational-search` — the module
about to be deleted. Move the constant into `helpers/feature-flags.js`, which is where
a flag key belongs and which the searchbar already imports from, and update the one
import.

Do this **before** step 4, as its own commit. Then the searchbar never has a moment
where it imports from a deleted module, and this step is independently revertable.

### 3. The thin invocation module

`assets/scripts/components/ask-ai.js`, replacing
`import './components/conversational-search'` at `main-dd-js.js:22`:

```js
import { mountAskAi } from '@dd/ask-ai';
import {
  initializeFeatureFlags,
  getBooleanFlag,
  fetchDatadogUserStatus,
  DOCS_AI_ENABLED_FLAG_KEY,
} from '../helpers/feature-flags';

const handle = mountAskAi({
  isEnabled: async () => {
    const client = await initializeFeatureFlags();
    return getBooleanFlag(client, DOCS_AI_ENABLED_FLAG_KEY, true);
  },
  getIsDatadogUser: fetchDatadogUserStatus,
});

// `searchbarHits.js` and `instantsearch.js` both call this.
window.askDocsAI = (query, options) => handle.ask(query, options);

// Homepage hero. Host-owned entry-point UI, so it stays here rather than in
// the package — see plans/23_ask_ai.md.
document.querySelector('.home-ai-btn')?.addEventListener('click', () => {
  const searchInput = document.querySelector('.ais-SearchBox-input');
  handle.ask(searchInput?.value ?? '', { source: 'home_hero' });
});
```

Three things this deliberately keeps, all because something else in Hugo depends on
them:

- **`window.askDocsAI`.** Two call sites, neither being rewritten here.
- **The hero button listener**, including reading the InstantSearch input's current
  value. The package cannot do this — `.ais-SearchBox-input` is Hugo's search
  implementation, which Astro does not have.
- **The flag resolver**, so Hugo's kill switch behaves exactly as it does today, and so
  Hugo's searchbar and the widget continue to share one provider and one exposure
  stream.

What it does **not** keep is the hero/floating-button `IntersectionObserver` and the
`.hidden` toggling: plan 23 keeps those inside the package, since they are host-agnostic
DOM queries against `.home-ai-btn`. Confirm on the homepage specifically — it is the
one page where the package's behavior depends on host markup existing.

### 4. Delete the old implementation

| Path | Action |
| --- | --- |
| `assets/scripts/components/conversational-search/` | Delete all 7 modules |
| `layouts/partials/conversational-search.html` | Delete |
| `layouts/_default/baseof.html:90`, `layouts/api/baseof.html:57`, `layouts/partners/baseof.html:75`, `layouts/index.html:111` | Remove the partial call |
| `assets/styles/components/conversational-search/_conversational-search.scss`, `_dialog.scss`, `_resources.scss`, `_message-actions.scss` | Delete |
| `assets/styles/components/conversational-search/_home-ask-ai.scss` | **Keep** |
| `assets/styles/style.scss:86` | Import `_home-ask-ai.scss` directly instead of `_conversational-search`, which is what currently `@import`s it |
| `assets/scripts/main-dd-js.js:22` | Point at the new module |

That `style.scss` row is the trap. `_conversational-search.scss` is the entry point and
`@import`s the other four including `_home-ask-ai`, so deleting the entry point silently
removes the hero button's styles too. The homepage hero is also the one surface with no
Astro equivalent, so nothing in Astro's testing would have caught it.

Two behaviors disappear with these files, and both are improvements rather than losses:

- The `#conv-search-template not in DOM` console warning on Hugo's 404 layout, which
  exists only because that layout omits the partial. With no partial there is nothing to
  omit. The 404 page gets the widget for the first time — check that this is wanted
  rather than assuming; it is a behavior change, and if not wanted the mount call needs
  a layout guard.
- The template-cloning path and its early return.

### 5. Drop the dead dependencies

Remove `highlight.js` and `marked-highlight` from `hugo/package.json`. Both are imported
**only** by `conversational-search/markdown.js`.

**`marked` must stay.** It is also required by `assets/scripts/build-api-pages.js:17`
and `build-reference-pages.js:16`, which are build-time Node scripts, not browser code.
Removing it breaks the API page build — a failure a long way from this diff.

### Files

| File | Change |
| --- | --- |
| `hugo/package.json` | Add the package; add its build to `prebuild`, `build:preview`, `build:live`; drop `highlight.js` and `marked-highlight` |
| `hugo/Makefile` | Build the package in `start` and `start-no-pre-build` |
| `hugo/assets/scripts/helpers/feature-flags.js` | Gains `DOCS_AI_ENABLED_FLAG_KEY` |
| `hugo/assets/scripts/components/instantsearch/searchbarHits.js` | Import the key from `feature-flags` instead of the widget |
| `hugo/assets/scripts/components/ask-ai.js` | New — the thin invocation module |
| `hugo/assets/scripts/main-dd-js.js` | Import the new module |
| `hugo/assets/scripts/components/conversational-search/` | Deleted (7 files) |
| `hugo/layouts/partials/conversational-search.html` | Deleted |
| `hugo/layouts/{_default,api,partners}/baseof.html`, `hugo/layouts/index.html` | Remove the partial call |
| `hugo/assets/styles/components/conversational-search/` | Deleted except `_home-ask-ai.scss` |
| `hugo/assets/styles/style.scss` | Import `_home-ask-ai` directly |

### Testing

The package's own tests already cover its behavior and do not change here. What this
plan needs is evidence that Hugo's bundle still builds and that nothing else broke.

- `yarn jest-test` in `hugo/` — the existing suite. It does not cover the widget, so
  the value is confirming the dependency and dep-removal changes broke nothing else,
  particularly the `marked`-consuming build scripts.
- `yarn test:e2e` in `hugo/` — Hugo's Playwright suite. Check whether any spec selects
  on `.conv-search-*` classes or `#conv-search-template`; the class names survive the
  port but the template does not, so a spec asserting the template's presence fails and
  should be rewritten to assert the mounted widget instead.
- One new Hugo e2e spec: the floating button exists on a normal page, opens the panel,
  and the page reports zero console errors. Hugo has no equivalent today, and its
  absence is why a broken widget could ship unnoticed.

No new unit tests. The logic all lives in the package now, where plan 23's tests cover
it; adding Hugo-side unit tests would test the package a second time through a worse
harness.

### TODOs to leave in the code

| Location | TODO | Kind |
| --- | --- | --- |
| `hugo/assets/scripts/components/ask-ai.js` | The hero-button listener and `window.askDocsAI` are Hugo-only shims; both die with Hugo rather than moving into the package. | Dies with Hugo |
| `hugo/assets/scripts/helpers/feature-flags.js`, `fetchDatadogUserStatus` | Astro has its own copy (`src/lib/telemetry/datadogUserStatus.ts`) — deliberately, not by oversight. Cross-reference the twin. | Dies with Hugo |

### Risks and open questions

- **`build:preview` and `build:live` bypass `prebuild`.** Called out in step 1 and
  repeated here because it is the highest-probability failure in the plan, and its
  symptom is a green build with no widget. Verify by reading the emitted bundle in a
  preview deploy, not by reading the scripts.
- **One PR, every Hugo page.** The widget is on all four `baseof` layouts. There is no
  partial rollout and no flag-gated dual path (see above), so the blast radius of a
  mistake is the whole docs site and the mitigation is a revert.
- **`_home-ask-ai.scss` orphaned by the import chain.** Step 4's trap. It fails
  silently, on the one page Astro cannot help verify.
- **The 404 page gains the widget.** A behavior change nobody asked for, arriving as a
  side effect of deleting the partial. Decide it deliberately.
- **Hugo's esbuild target versus the package's output.** A mismatch fails the Hugo
  build, which is the good failure mode — but it fails it in CI rather than locally if
  the local Node version differs from the build image's.
- **Bundle size should drop, and if it does not, something is still bundled.**
  `main-dd-js.js` loses the widget and gains a 30-line module, and `highlight.js` goes
  from ~303 KB gzipped to ~24 KB inside the package. Compare before and after: a flat
  or larger bundle means the old code is still reachable or the package's dependencies
  were double-bundled.
- **Two `marked` copies.** Hugo's build scripts keep `marked` at `^17`, and the package
  bundles its own. Different major lines are possible. Harmless — one is Node-side and
  one is browser-side, and they never meet — but a reader seeing two versions should
  find that written down.

## Manual verification

The parity checklist is [23_ask_ai.md](23_ask_ai.md) section B, and this is the plan
that makes its Hugo column runnable. Run every row there against a Hugo preview page
before merging, then the checks below, which are specific to the cutover rather than to
the widget.

### A. Build and wiring

| Check | Expected |
| --- | --- |
| `make start-no-pre-build` in `hugo/` | Builds the package first, then serves; widget appears |
| Edit package source, re-run | Change appears on the Hugo dev server |
| `yarn build:preview` in `hugo/` | Package build runs; **check this specifically**, since this script bypasses `prebuild` |
| `yarn build:live` in `hugo/` | Same |
| Fresh clone → `yarn install` → `yarn build` | Works with no committed `dist/` |
| The emitted `main-dd-js.js` | Contains the package's code; contains no `conv-search-template` string |

### B. Nothing else broke

- `yarn jest-test` passes — in particular nothing that depends on `marked`.
- The API reference pages still build (`yarn build:apiPages`), which is the real test
  that `marked` survived the dependency removal.
- `yarn test:e2e` passes, after rewriting any spec that asserted on the `<template>`.
- **Page source has no `<template id="conv-search-*">` anywhere.** Grep a built page.
  Orphaned template markup would mean a `baseof` was missed.
- **No duplicate widget.** One floating button, one panel, one impression log per page.
  Two means both implementations are somehow live.

### C. The homepage, which nothing else covers

- The hero button opens the panel, and prefills it with whatever is in the search box.
- The floating button hides while the hero is on screen and reappears when it scrolls
  away.
- The hero button and its `or` divider are **styled** — this is the
  `_home-ask-ai.scss` import-chain check, and it is why this section exists.
- With the kill switch off, both the hero button and the divider are removed, as they
  are today.

### D. The 404 page

- The widget now appears there. Confirm that is acceptable.
- No console warning, and specifically not the old
  `#conv-search-template not in DOM` one — its absence is the evidence the template
  path is gone rather than merely unused.

### E. Bundle size

Compare `main-dd-js.js` before and after, gzipped. It should **drop**. Then check the
package's own bundle is not double-counting: `marked` and `highlight.js` should appear
once each in the emitted output, not twice.

### F. Telemetry, after deploying

Hugo's events are identified by `-@context.stack:astro` (see
[22_add_rum.md](22_add_rum.md)). Scope every query that way, or Astro's events will look
like proof that Hugo's cutover worked.

- Impressions, opens with each trigger source, and response latencies continue at
  normal volume across the deploy. A gap starting at the deploy means the widget is not
  mounting for real users even if it mounted for you.
- `is_datadog_user` is still present on Hugo's events. It now arrives through the
  injected callback rather than being read inside the widget, so it is the tag most
  likely to go quietly missing.
- Exposure logs for `docs-ai-enabled` are unchanged in shape and volume — one provider,
  not two, which is what keeping Hugo's `feature-flags.js` was for.
