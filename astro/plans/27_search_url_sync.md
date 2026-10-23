# Sync the search query to the URL (`?s=`)

## Prompt

In Hugo, if I type "RUM" into the search bar, the URL syncs as I type, adding the param `?s=RUM` to the URL. If I reload in Hugo, RUM is still in the search bar, with the search results still displayed. In my understanding, Astro does not have this functionality. Write a plan for adding it.

Follow-up: The mobile instance should control the URL param if the user is typing there. If I type "RUM" into the left nav search bar, then shrink the page, it should transition to the mobile one, with RUM still there.

## Research

### What Hugo does

Hugo's search bar is InstantSearch, and the URL sync is InstantSearch's built-in `routing` option — Hugo only supplies the state↔route mapping ([instantsearch.js:217-234](../../hugo/assets/scripts/components/instantsearch.js#L217-L234)):

```js
routing: {
  stateMapping: {
    stateToRoute(uiState) {
      const trimmedQuery = uiState[docsIndex].query?.trim();
      return { ...(trimmedQuery && { s: trimmedQuery }) };
    },
    routeToState(routeState) {
      return { [docsIndex]: { query: routeState.s } };
    },
  },
},
```

Two behaviors fall out of that, and they are the two halves of the request:

1. **Write.** InstantSearch's default history router writes the mapped route to the URL as the query changes, debounced (~400ms), using `history.pushState`. An empty/whitespace query drops the `s` key entirely, because `stateToRoute` spreads it conditionally.
2. **Read.** On load, the router parses `location.search` and seeds the search state through `routeToState`, so the input renders with the query already in it and the search fires immediately — hence "results still displayed" after a reload. `searchFunction` ([instantsearch.js:237-252](../../hugo/assets/scripts/components/instantsearch.js#L237-L252)) then adds `active-search` / un-hides the hits container whenever the query is non-empty, which is what makes the popup visible rather than merely populated.

Hugo also only ever has **one** search box in the document: a single `.searchbox-container` node that gets *moved* between the desktop and mobile wrappers on resize ([instantsearch.js:468-474](../../hugo/assets/scripts/components/instantsearch.js#L468-L474)). That is why Hugo never has to decide which search box owns the URL.

### What Astro has today

- [`SearchBar.tsx`](../src/components/SearchBar/SearchBar.tsx) holds `query` in `useState("")` with no URL involvement at all. Confirmed: nothing under `src/components/SearchBar/` touches `URLSearchParams`, `location.search`, `replaceState`, `pushState`, or `popstate`. So the premise in the prompt is correct — neither the write nor the read exists.
- The `s` param *is* already understood in one direction: `navigateToSearchPage` ([SearchBar.tsx:129-135](../src/components/SearchBar/SearchBar.tsx#L129-L135)) sends the user to `${HUGO_ORIGIN}/search/?s=<query>`. The param name is therefore already settled; this plan reuses it.
- Popup visibility is `open && trimmedQuery.length > 0` ([SearchBar.tsx:79](../src/components/SearchBar/SearchBar.tsx#L79)), and the search itself is driven purely off `trimmedQuery` via `useDebouncedSearch` ([SearchBar.tsx:77](../src/components/SearchBar/SearchBar.tsx#L77)). **Consequence: restoring is just `setQuery(param)` + `setOpen(true)`.** The debounced search and the popup follow for free. No new fetch plumbing.
- The input is controlled and the island advertises `data-hydrated` ([SearchBar.tsx:107-114](../src/components/SearchBar/SearchBar.tsx#L107-L114)), precisely so tests can wait for the input to actually hold a value. Restore-on-load lands inside that same window, so the attribute is already the right signal to wait on.

### Two live instances, not one — so the query must be shared state

Unlike Hugo, Astro renders **two independent `SearchBar` islands** and both are always mounted:

| Instance | Mount site | Present on |
| --- | --- | --- |
| Side nav (`variant="default"`) | [ApiSideNav.astro:55](../src/components/ApiSideNav/ApiSideNav.astro#L55) | API pages only ([ApiLayout.astro:48](../src/layouts/ApiLayout.astro#L48)) |
| Mobile nav (`variant="mobile"`) | [MobileNav.astro:158](../src/components/MobileNav/MobileNav.astro#L158) | Every page ([Header.astro:246](../src/components/Header/Header.astro#L246)) |

Neither is conditionally rendered. They are hidden by complementary `display: none` rules at the same 992px breakpoint:

- Side nav — `.api-shell > nav { display: none }` **below** 992px ([ApiLayout.astro](../src/layouts/ApiLayout.astro)).
- Mobile panel — `.mobile-nav__panel { display: none }` **at and above** 992px ([MobileNav.module.css:32-36](../src/components/MobileNav/MobileNav.module.css#L32-L36)). Below that it is rendered but parked offscreen (`right: var(--hugo-mobile-nav-offscreen-x)`) until `MobileNavToggle` adds `mobile-nav__panel--open`.

So both islands hydrate at every width, but **at any given width exactly one of them is laid out**. That is the whole design constraint, and it cuts two ways:

1. Either instance can be the one the user types into, so **neither can be the sole URL owner**. Ownership must be dynamic: whoever is typing writes.
2. Resizing across 992px swaps which instance is visible *without any component remounting*. For "type RUM in the left nav, shrink, RUM is still there" to work, the mobile instance must already be holding `RUM` **before** the resize happens.

Point 2 is the one that kills a naive design. A resize listener that copies state across at the breakpoint would be the obvious approach and the wrong one — it adds a listener, a breakpoint constant duplicated from CSS, and a race with the CSS transition. **If the two inputs mirror each other continuously as the user types, the resize needs no code at all**: the mobile input already says `RUM` when it becomes the visible one. The resize requirement reduces to a mirroring requirement.

Note this is *not* what the global `/` and Cmd+K shortcuts do ([useGlobalSearchShortcuts.ts](../src/components/SearchBar/hooks/useGlobalSearchShortcuts.ts), `enabled: variant !== "mobile"` at [SearchBar.tsx:121](../src/components/SearchBar/SearchBar.tsx#L121)). Static single-ownership is right for a page-wide keyboard listener, where a second listener is pure duplication. It is wrong for the query, which is user data both instances need. Different problem, different answer.

### Prior art for cross-island state

[`regionState.ts`](../src/components/RegionSelector/regionState.ts) already solves the shape of this: `setActiveRegion` writes the cookie and `?site=` param, then broadcasts `REGION_CHANGE_EVENT` on `document` ([regionState.ts:62-72](../src/components/RegionSelector/regionState.ts#L62-L72)) so unrelated islands can react. A `document` CustomEvent is the house channel for island-to-island state, and it has a property worth keeping: correctness does not depend on Vite giving both islands the same module instance.

### Existing URL-writing conventions in this project

There are two prior art sites, and they agree:

- [`tabSync.ts:116-143`](../src/components/Tabs/tabSync.ts#L116-L143) — `buildSyncUrl` edits a `URL` object so other params and the hash survive, and `writeSyncQueryParam` calls `history.replaceState(window.history.state, "", …)`, **passing the existing state through** because Astro's `ClientRouter` keeps navigation data there.
- [`regionState.ts:62-66`](../src/components/RegionSelector/regionState.ts#L62-L66) — same shape for `?site=`.

Both use `replaceState`, never `pushState`. Both preserve unrelated params. The `?site=` param in particular coexists with search on API pages, so "preserve other params" is a real requirement, not a hypothetical.

`ClientRouter` is opt-in per page (`enableViewTransitions`, [BaseLayout.astro:116](../src/layouts/BaseLayout.astro#L116)) and is used by cdocs, not by the API pages. It still matters here — see the decision on restoring after a client-side swap.

## Confirmed decisions

| Question | Decision |
| --- | --- |
| Param name | **`s`** — same as Hugo, and already what `navigateToSearchPage` emits. |
| Write method | **`history.replaceState`**, matching `tabSync`/`regionState`. Deliberate divergence from Hugo, which `pushState`es: typing "RUM" through Hugo's debounce can leave several history entries, so Back walks the query backwards a character at a time. Reload behavior — the thing actually asked for — is identical either way. |
| Preserve `history.state` | **Yes**, pass `window.history.state` through, same as `writeSyncQueryParam`. |
| Other params / hash | **Preserved.** Build with `new URL(...)`, `searchParams.set("s", …)`. |
| Empty query | **Deletes the param**, not `?s=`. Matches Hugo's conditional spread. |
| Trimming | **Write the trimmed query**, matching Hugo's `stateToRoute`. Restore writes the raw param into the input. |
| Write debounce | **Reuse `DEBOUNCE_MS` (200ms)**, the constant the search itself already uses, rather than importing Hugo's 400ms router default. One timer concept in the component, not two. One shared timer in the store, so two instances cannot schedule competing writes. |
| Who writes | **Whichever instance the user typed into.** No static owner. The store holds the single debounced writer, so "last typer wins" falls out rather than being arbitrated. |
| Keeping the two inputs in sync | **Continuous mirroring** over a `document` CustomEvent, the `regionState` pattern. Every keystroke publishes; the other instance adopts the text. This is what makes the resize case work with no resize handling. |
| Does mirroring open the other popup? | **No.** A mirrored update sets the text only. `open` stays per-instance — the user is typing in one bar, and a second popup portaled to `document.body` behind the first is never wanted. |
| Echo loops | **Guarded by an origin id.** Each island generates one at mount (`useId`-style) and ignores events it published. |
| Who restores the input text on load | **Both instances**, from the same `?s=` param. No ordering dependency between them. |
| Who auto-opens the popup on load | **The instance that is currently laid out**, tested with `form.getClientRects().length > 0` rather than by variant. At ≥992px that is the side nav. Below 992px it is the mobile instance — but its panel is closed, so see the next row. |
| Phone reload | **Text restored, no popup.** The mobile panel is offscreen until opened, so auto-opening would portal a popup next to an invisible input. Matches Hugo, where the single search node lives in a closed drawer. |
| Popup when its anchor stops being laid out | **Closes.** `usePopupPosition` returns `null` for an unrendered anchor and `popupVisible` requires a rect — otherwise crossing 992px mid-search leaves a stale popup pinned at `top: 0, left: 0` with zero width. |
| Auto-focus on restore | **No.** Hugo doesn't, and stealing focus on load hurts keyboard and screen-reader users. |
| Restore after a `ClientRouter` swap | **Restore the text, don't re-open the popup.** Guard with a module-scoped flag set from an `astro:after-swap` listener. Module state survives view-transition swaps (the document is never reloaded), so the flag is a precise test for "this mount is a client-side navigation". *Implementation correction:* the first draft made this a has-restored-once flag, which is wrong — both islands mount during a single real load, so whichever hydrated first would consume the restore and leave the visible one closed. Without it, every cdocs client-side navigation would re-pop the results. |
| Back/forward | **`popstate` listener in the store**, broadcast to every instance. One listener, not one per island. |
| Non-API pages | **Work unchanged.** With dynamic ownership, a page carrying only the mobile instance syncs normally — no gap, and no seam to revisit at the SSR cutover. |

## Implementation

### 1. `src/components/SearchBar/searchUrlState.ts` (new, pure)

No DOM reads beyond the ones passed in, so this is the unit-testable core. Mirrors `tabSync.ts`'s split between pure builders and the one impure writer.

```ts
export const SEARCH_QUERY_PARAM = "s";

/** The `?s=` value from a `location.search` string, or "" when absent. */
export function readSearchQueryFromUrl(search: string): string;

/** `href` with `?s=<query>` set, or removed when `query` is empty. Other
 *  params and the hash are kept. */
export function buildSearchUrl(href: string, query: string): string;

/** Write the query to the address bar without a history entry. */
export function writeSearchQueryParam(query: string): void;
```

`writeSearchQueryParam` is the only impure function and is a near-copy of `writeSyncQueryParam`, including the `window.history.state` pass-through.

### 2. `src/components/SearchBar/searchQueryStore.ts` (new)

The single writer and the broadcast channel. Framework-free, so it is testable without mounting anything.

```ts
export const SEARCH_QUERY_CHANGE_EVENT = "dd-search-query-change";

export interface SearchQueryChangeDetail {
  query: string;
  /** Id of the island that published, so it can ignore its own echo. */
  originId: string;
}

/** Record a user edit: broadcast it now, write `?s=` after `debounceMs`. */
export function publishSearchQuery(
  query: string,
  originId: string,
  debounceMs: number,
): void;

/** Subscribe to query changes from any island or from Back/forward. */
export function subscribeToSearchQuery(
  listener: (detail: SearchQueryChangeDetail) => void,
): () => void;
```

Internals:

- One module-scoped `timerId`. `publishSearchQuery` clears and reschedules it, so interleaved keystrokes from two instances still produce one write.
- The broadcast is **immediate**; only the URL write is debounced. Mirroring is what keeps the inputs consistent, and delaying it by 200ms would be a visible lag if the user resized mid-keystroke.
- A `popstate` listener, attached lazily on first subscribe, re-reads the param and broadcasts it with a sentinel `originId` no island matches, so every instance adopts it.

Why an event rather than a plain exported singleton: both islands import the same `SearchBar.tsx`, so Vite should give them one module instance — but "should" depends on chunking, and `regionState.ts` already established the event as the house channel. The event is correct either way.

### 3. `src/components/SearchBar/hooks/useSearchQuerySync.ts` (new)

Binds one island to the store. Replaces the single-owner hook the earlier draft of this plan proposed.

```ts
interface Args {
  query: string;
  setQuery: Dispatch<StateUpdater<string>>;
  setOpen: Dispatch<StateUpdater<boolean>>;
  /** The form element, to test whether this instance is the laid-out one. */
  anchorRef: { current: HTMLElement | null };
  debounceMs: number;
}
```

Three effects:

1. **Restore (mount).** Read `?s=`. If non-empty, `setQuery(param)` — both instances do this, unconditionally. Then `setOpen(true)` only if this is the first mount in the document **and** `anchorRef.current.getClientRects().length > 0`. The visibility test is what replaces variant-based gating: at ≥992px only the side-nav form has rects, below it only the mobile form does, and the mobile one is offscreen-but-laid-out, so pair it with a check that the panel is open (`mobile-nav__panel--open`) — or simply treat "offscreen" as not-visible by rejecting rects whose `left >= window.innerWidth`. Prefer the latter: it is one rule, not a special case per variant.
2. **Publish (on user input).** Not a `query` effect — a `query` effect cannot distinguish a user edit from a mirrored one without extra state. Instead expose a `publish(value)` callback the component calls from `onInput`, and from nothing else. Mirrored and restored updates go through `setQuery` directly and never republish.
3. **Subscribe.** `subscribeToSearchQuery` → if `detail.originId !== myId`, `setQuery(detail.query)`. Text only; `open` is untouched.

Escape-to-clear (`setQuery("")` in `useGlobalSearchShortcuts`) needs one extra wire: it must publish too, or clearing on desktop would leave `RUM` in the mobile input and in the URL. Pass the publish callback into that hook, or have it call the component's clear handler rather than `setQuery` directly.

Keeping this as a hook matches the four already in `hooks/`, and keeps the component body readable per the "top-level driver code reads as a narrative" guideline in [CLAUDE.md](../CLAUDE.md).

### 4. `src/components/SearchBar/SearchBar.tsx` (edit)

- Generate a stable per-island `originId` at mount.
- Call `useSearchQuerySync` alongside the other hooks at [SearchBar.tsx:116-123](../src/components/SearchBar/SearchBar.tsx#L116-L123).
- `onInput` ([SearchBar.tsx:221-224](../src/components/SearchBar/SearchBar.tsx#L221-L224)) calls `publish(value)` in addition to `setQuery` / `setOpen`.
- `popupVisible` ([SearchBar.tsx:79](../src/components/SearchBar/SearchBar.tsx#L79)) gains `&& popupRect !== null`. This requires reordering: `popupRect` is currently computed *from* `popupVisible` ([SearchBar.tsx:82](../src/components/SearchBar/SearchBar.tsx#L82)). Split into `popupRequested` (the current expression, fed to `usePopupPosition`) and `popupVisible = popupRequested && popupRect !== null` used at the portal.

No prop changes, so neither call site is touched.

### 5. `src/components/SearchBar/hooks/usePopupPosition.ts` (edit)

In `recompute`, return `null` instead of a zeroed rect when the anchor is not laid out:

```ts
const el = anchorRef.current;
if (!el || el.getClientRects().length === 0) {
  setRect(null);
  return;
}
```

The hook already listens for `resize` ([usePopupPosition.ts:30](../src/components/SearchBar/hooks/usePopupPosition.ts#L30)), so crossing 992px with a popup open already triggers a recompute — today that recompute produces `{top: 0, left: 0, width: 0}` from a `display: none` form. This is the fix for the stale-popup case, and it is a latent bug independent of this feature.

### 6. Call sites

No change required. Both mount sites keep passing only `variant`; ownership is no longer a prop.

### 7. Watch items during implementation

- **Popup position on restore.** `usePopupPosition` measures the form. On a restore the popup opens in the same tick the island mounts, which is earlier than any previously exercised path. Verify the rect is correct under the sticky sidebar and after the header's scroll-state shift.
- **`getClientRects()` during the drawer transition.** The panel animates `right` over 300ms, so a rect read mid-transition is valid but moving. Only the restore path reads it once at mount, when no transition is running — but if the visibility rule ever moves into a resize or toggle handler, this becomes a real hazard.
- **Two popups.** The mirroring rule says a mirrored update must not set `open`. Assert this directly in a test rather than trusting it by inspection: it is the one bug in this design that would look fine on desktop and broken only while resizing.
- **Selection reset across mirroring.** `setSelection({kind: "none"})` already fires on every `hits` change ([SearchBar.tsx:103-105](../src/components/SearchBar/SearchBar.tsx#L103-L105)), so a mirrored query cannot leave a stale keyboard index. No work, but worth confirming once the mirror lands.

## Testing

Red-to-green, per [CLAUDE.md](../CLAUDE.md): each test below is written and seen failing before the corresponding code lands.

### Unit — `src/components/SearchBar/tests/searchUrlState.unit.test.ts` (new)

Pure-function coverage, no component:

- `readSearchQueryFromUrl` — present, absent, empty, URL-encoded (`?s=foo%20bar`).
- `buildSearchUrl` — sets `s`; removes it for `""`; preserves an existing `?site=eu`; preserves the hash; overwrites an existing `s`.

### Unit — `src/components/SearchBar/tests/searchQueryStore.unit.test.ts` (new)

Store behavior with fake timers, no component:

- `publishSearchQuery` broadcasts synchronously but writes `?s=` only after the debounce.
- Two publishes inside the debounce window produce **one** `replaceState` call carrying the later value.
- Publishes from two different `originId`s share the one timer.
- Subscribers receive `originId` so they can filter their own echo.
- `popstate` broadcasts the new param with an origin no island matches.
- Unsubscribe actually detaches.

### Unit — `src/components/SearchBar/tests/unit.test.ts` (extend)

The existing suite already stubs the network with the `search` prop and the `__fixtures__/*.json` payloads, so these need no new infrastructure. Set the URL with `window.history.replaceState(null, "", …)` first, the way `Tabs/tests/unit.test.ts` does.

Single instance:

- Mount at `/api/?s=RUM` → input value is `RUM` and the popup renders hits.
- Mount at `/api/` → no popup, URL untouched.
- Type `RUM` → after the debounce, `location.search` contains `s=RUM`.
- Clear the input → `s` is gone and `location.search` is `""`, not `"?"`.
- Escape with focus in the bar → input, URL, and popup all clear together.
- Type with `?site=eu` already present → both params survive.
- `variant="mobile"` typing → URL updates. (The inverse of the old plan's assertion; this is the behavior change the prompt asked for.)

Both instances mounted together — the core of the new design:

- Type into the `default` instance → the `mobile` instance's input reads `RUM`, and its popup is **not** open.
- Type into the `mobile` instance → the `default` instance mirrors, same rules.
- Interleaved input across both → exactly one `replaceState`, carrying the last value typed.
- Clear in one → the other clears too, and the param is dropped.
- Mount both at `/api/?s=RUM` → both inputs hold `RUM`; at most one popup.

### Browser — `src/components/SearchBar/tests/browser.test.ts` (extend)

Only what unit tests cannot reach — real reload, real history, real CSS breakpoints. The last two are the prompt's scenario and cannot be unit-tested at all, since they depend on `display: none` actually applying:

- Load an API page with `?s=RUM`, wait for `[data-hydrated]`, assert the popup is visible with results.
- Type into the side-nav bar, `page.reload()`, assert the query and results come back.
- Back after searching lands on the searched URL with the query restored — `replaceState` replaces the clean entry rather than adding one, so there is no pre-search entry to return to. (The first draft of this plan asserted the opposite; the test proved it wrong.)
- **Type `RUM` at desktop width, `setViewportSize` to a phone, open the drawer → the mobile input holds `RUM`.** The literal request.
- **The reverse**: type in the drawer at phone width, widen past 992px, assert the side-nav input holds the query.
- Resize across 992px with the popup open → the old popup is gone, not stranded at the top-left corner.
- At a mobile viewport, load with `?s=RUM` and assert no popup is painted before the drawer is opened.

Snapshots under `browser.test.ts-snapshots` may need refreshing if any existing case navigates with an `s` param already set; check before assuming a diff is a regression.

### Commands

```
yarn test:headless-ai src/components/SearchBar
yarn test:browser-ai src/components/SearchBar/tests/browser.test.ts
yarn test-ai          # once, before calling it done
npx prettier --write <touched files>
```

## Manual verification

On a preview deploy, on an API page:

| # | Steps | Expected |
| --- | --- | --- |
| 1 | Type `RUM` in the side-nav bar | URL becomes `…?s=RUM` within ~200ms of the last keystroke; results show |
| 2 | Reload | Input still holds `RUM`, results still displayed, page not scrolled or focus-stolen |
| 3 | Clear the input | `?s=` disappears; no bare `?` left behind |
| 4 | Press Escape with focus in the bar | Query clears, popup closes, param removed |
| 5 | Switch region, then search | `?site=eu&s=RUM` — neither param clobbers the other |
| 6 | Press Back after searching | Lands on the searched URL with the query restored — `replaceState` left no separate pre-search entry |
| 7 | Narrow to a phone width, reload with `?s=RUM` | No stray popup; open the drawer and the input holds `RUM` |
| 8 | Click a result | Navigates normally; the destination URL carries no `s` (matches Hugo) |
| 9 | Submit the form | Still lands on `HUGO_ORIGIN/search/?s=RUM` — unchanged |
| 10 | **Type `RUM` in the left nav, then shrink past 992px and open the drawer** | The drawer's input holds `RUM`; URL still `?s=RUM` |
| 11 | **Type in the drawer at phone width, then widen past 992px** | The left-nav input holds the query |
| 12 | Shrink past 992px with the popup open | The popup disappears cleanly — no zero-width box at the top-left |
| 13 | Type in the drawer, then clear it, then widen | Left-nav input is empty and the param is gone |

## Known gaps, deliberately not solved here

- **No `pushState` history trail** while typing, unlike Hugo. Reload parity is met; back-button-through-a-query is not, and is worse UX anyway.
- **The `s` param is not carried onto a clicked result's URL.** Hugo behaves the same way.
- **Scroll position and keyboard selection are not mirrored** between instances — only the query text is. Mirroring the popup's selected index across two popups that are never visible at the same time would be work with no observer.
