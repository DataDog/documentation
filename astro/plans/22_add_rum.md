# RUM and Browser Logs on Astro

## Prompt

The Astro site has no RUM or Browser Logs wiring at all. Hugo initializes both in
[`header-scripts.html#L50-L62`](../../hugo/layouts/partials/header-scripts.html) and
[`dd-browser-logs-rum.js`](../../hugo/assets/scripts/components/dd-browser-logs-rum.js):
it loads the prebuilt `datadog-rum.js` / `datadog-logs.js` bundles (which set
`window.DD_RUM` and `window.DD_LOGS`), then runs a deferred config script that calls
`init()` on both.

Astro needs equivalent telemetry. This is a prerequisite for
[23_ask_ai.md](23_ask_ai.md) — the Ask AI package reads `window.DD_RUM` and
`window.DD_LOGS` rather than bundling the SDKs, so without this plan Ask AI telemetry
silently no-ops on Astro.

Aim for parity with Hugo's configuration, adapted where Astro's toolchain differs
(npm imports instead of Hugo Pipes resource concatenation, Vite defines instead of
`js.Build` defines).

## Claude's plan

### Prerequisite: a new RUM application (user action, blocking)

Astro reports into its **own** RUM application, not Hugo's. Before implementation,
create it in the Datadog app:

1. **Digital Experience → Real User Monitoring → Applications** (`/rum/list`), in the
   same org that owns the existing `docs` application.
2. **New Application**, type **Browser**, named `docs-astro`.
3. Copy the generated **Application ID** (UUID) and **Client Token** (`pub…`). Skip
   the install snippet — the SDK is wired up by this plan.
4. Session Replay and sampling are configured in code here, not in that dialog.

Both values are public browser credentials; Hugo's equivalents are already committed
in [`config-docs.js`](../../hugo/assets/scripts/config/config-docs.js), so committing
Astro's to this public repo is consistent with existing practice.

One application covers both `preview` and `live`, exactly as Hugo's does — the
environments are separated by the `env` field, not by application. Implementation is
blocked until the two values exist; everything else can be written against
placeholders.

### Confirmed decisions

| Question | Decision |
| --- | --- |
| SDK loading | **npm import, deferred.** Import `@datadog/browser-rum` and `@datadog/browser-logs`, assign `window.DD_RUM` / `window.DD_LOGS`, then `init()`. Not Hugo's blocking head script. |
| Subresource Integrity | **Not reproduced.** Hugo's SRI protects a hand-concatenated CDN asset; Astro's bundle is emitted and hashed by Vite. |
| RUM application | **New, separate application** (`docs-astro`), shared across preview and live. |
| `service` tag | **`docs`**, matching Hugo, so queries and dashboards survive the Hugo cutover. |
| Distinguishing tag | Global context property **`stack: 'astro'`**. |
| Branch tag | **Included**, on both RUM and Logs, from `CI_COMMIT_REF_NAME`. Astro deliberately goes beyond Hugo here — see below. |
| Env gating | **Mirror Hugo.** RUM initializes in `preview` and `live` only. Logs initializes in every environment, with the handler set to `console` in development. |
| `_dd_device_id` cookie | **Included**, live only, same logic as Hugo. Both sites share the domain, so they share the cookie. |
| Sampling | **Match Hugo:** `sessionSampleRate: 100`, `sessionReplaySampleRate: 50`. |
| `IA_SUBDOMAIN` | Read from env with an empty default, plus a `TODO` in the code — CI may not expose the variable to the Astro job. |
| `CI_COMMIT_SHORT_SHA` | Same: read from env, empty default, `TODO` in the code. |
| `fetchDatadogUserStatus()` | **Duplicated here, not shared.** Ten lines of generic site functionality; Hugo's copy dies with Hugo. |

### Core idea

One small, testable config layer plus one entry-point script, mirroring Hugo's split
between `config-docs.js` (the credentials table) and `dd-browser-logs-rum.js` (the
initialization).

Everything that can be a pure function of its inputs is: the credentials lookup, the
RUM and Logs init options, and the device-ID cookie logic all take explicit
arguments and get unit tested. The entry point is the thin, untestable shell that
reads build-time constants and touches `window`.

### 1. Build-time constants (`astro.config.mjs`, `src/env.d.ts`)

Hugo injects `CI_COMMIT_SHORT_SHA` and `IA_SUBDOMAIN` into its client bundle through
`js.Build` defines. Vite's `define` is the direct equivalent:

```js
vite: {
  define: {
    __CI_ENVIRONMENT_NAME__: JSON.stringify(process.env.CI_ENVIRONMENT_NAME ?? 'development'),
    __CI_COMMIT_REF_NAME__: JSON.stringify(branchRef() ?? ''),
    __CI_COMMIT_SHORT_SHA__: JSON.stringify(process.env.CI_COMMIT_SHORT_SHA ?? ''),
    __IA_SUBDOMAIN__: JSON.stringify(process.env.IA_SUBDOMAIN ?? ''),
  },
}
```

These are needed because `process.env` is unavailable in a client bundle, and the
values are known at build time. Declare them in `src/env.d.ts` so TypeScript sees
them as `string` rather than errors.

`__CI_COMMIT_REF_NAME__` reuses the existing
[`branchRef()`](../src/lib/site/siteUrl.ts) helper rather than reading the env var
directly, so the branch string is normalized identically to the one in the deploy
path prefix and the canonical URLs. Availability is not in question: preview builds
already **throw** when `CI_COMMIT_REF_NAME` is unset (`siteUrl.ts:44-49`).

Only **`__IA_SUBDOMAIN__`** carries a `TODO`. `CI_COMMIT_REF_NAME` and
`CI_COMMIT_SHORT_SHA` are GitLab predefined variables, present in every job;
`IA_SUBDOMAIN` is a custom variable, and whether it is exposed to the Astro job is
owned by `DataDog/documentation-ci`, which this repo cannot edit. An empty value
degrades gracefully — default telemetry intake — so this is safe to ship unresolved,
but it should be searchable.

### 2. Credentials table (`src/config/telemetry.ts`)

Mirrors `config-docs.js`, narrowed to the telemetry keys:

```ts
export type TelemetryEnv = 'development' | 'preview' | 'live';

interface TelemetryCredentials {
  applicationId?: string;   // absent in development — RUM does not init there
  clientToken: string;
  loggingHandler: 'http' | 'console';
}

export function resolveTelemetryEnv(raw: string | undefined): TelemetryEnv;
export function getTelemetryConfig(env: TelemetryEnv): TelemetryCredentials;
```

`resolveTelemetryEnv` mirrors
[`getConfig.js`](../../hugo/assets/scripts/helpers/getConfig.js): `live` and
`preview` pass through, anything else becomes `development`.

Development reuses Hugo's development client token and has no application ID, which
matches Hugo — development RUM cannot init even if the env gate were removed.

### 3. Init options builders (`src/lib/telemetry/initOptions.ts`)

Two pure functions returning the SDK option objects, so the configuration itself is
assertable in tests without loading an SDK:

```ts
buildRumInitOptions({ credentials, env, version, internalAnalyticsSubdomain })
buildLogsInitOptions({ credentials, env, version, internalAnalyticsSubdomain })
```

A third builder covers the properties that are set *after* `init()` rather than
passed to it, so they are assertable too:

```ts
buildGlobalContext({ branch, stack: 'astro' })  // omits `branch` when empty
```

RUM options match Hugo field for field: `service: 'docs'`, `trackUserInteractions`,
`enableExperimentalFeatures: ['zero_lcp_telemetry', 'feature_flags']`,
`sessionSampleRate: 100`, `sessionReplaySampleRate: 50`, `trackResources`,
`trackLongTasks`, `defaultPrivacyLevel: 'mask-user-input'`, and
`allowedTracingUrls: [window.location.origin]`.

Logs options likewise: `forwardErrorsToLogs: true`, `service: 'docs'`, `env`,
`version`, `internalAnalyticsSubdomain`.

### 4. Device ID (`src/lib/telemetry/deviceId.ts`)

A faithful port of Hugo's three helpers — generate, read from `document.cookie`,
write back with `Domain=.datadoghq.com`, one-year `Max-Age`,
`SameSite=None; Secure; Partitioned` — with the domain derived from
`window.location.hostname` the same way Hugo derives it.

Reads before generating, so it is idempotent and safe to run alongside Hugo's copy
on the shared domain. Live only.

The TypeScript improvement over Hugo's version: `getRumDeviceId()` returns
`string | null` for "no cookie present" instead of conflating that with a freshly
generated ID, and the caller decides. Same behavior, clearer types.

### 5. Datadog user status (`src/lib/telemetry/datadogUserStatus.ts`)

Duplicate of Hugo's `fetchDatadogUserStatus()`: a memoized `fetch` of
`https://www.datadoghq.com/locate` with `credentials: 'include'`, resolving to a
boolean and swallowing errors as `false`.

It lives here rather than in the Ask AI package because it is generic site
functionality. Plan 23's package receives the value through an injected
`getIsDatadogUser?: () => Promise<boolean>` callback and omits the
`is_datadog_user` tag when the callback is absent.

### 6. Entry point (`src/components/Telemetry/Telemetry.astro`)

Follows the existing pattern of
[`HeaderScroll.astro`](../src/components/Header/HeaderScroll.astro) — a component
whose only job is to carry a script — but uses a **bundled** `<script>` rather than
`is:inline`, since it needs npm imports. Astro bundles it as a deferred module.

The script:

1. Imports both SDKs and assigns `window.DD_RUM = datadogRum` /
   `window.DD_LOGS = datadogLogs`, so the globals that Hugo's SDK bundles create
   exist here too — this is the contract plan 23 depends on.
2. Resolves env from `__CI_ENVIRONMENT_NAME__` and looks up credentials.
3. Initializes RUM when env is `preview` or `live` and an application ID exists.
   Then `startSessionReplayRecording()`, applies `buildGlobalContext(...)` — which
   sets `stack` and, on preview, `branch` — and on live, the device-ID cookie.
4. Initializes Logs in all environments, sets the `host` / `referrer` / `lang`
   global context properties as Hugo does, applies the same `branch` and `stack`
   properties, and in development sets the console handler.

#### The branch tag: Astro deliberately exceeds Hugo here

Hugo intends to tag telemetry with the branch but does not succeed. Its layouts emit
the attribute as `data-commit-ref` (`hugo/layouts/_default/baseof.html:3` and the
other four `baseof` variants), while
[`dd-browser-logs-rum.js:3`](../../hugo/assets/scripts/components/dd-browser-logs-rum.js)
destructures `dataset.branch` — which corresponds to `data-branch`, an attribute
nothing emits. The value is always `undefined`, so the `if (branch)` guards at lines
47 and 74 never fire and no Hugo RUM session or log has ever carried the tag.

Astro implements it correctly rather than reproducing the defect. Per-branch preview
filtering is genuinely wanted on the new site: `sessionSampleRate` is 100 on preview,
each branch deploys to its own path prefix, and being able to scope RUM to a single
PR's preview is a primary reason to have RUM on Astro at all.

Fixing Hugo's copy is out of scope for this plan — it is a Hugo-side change requiring
separate sign-off. If it is ever fixed, the two sites will already agree on the
property name (`branch`) and the value's normalization (both derived from
`CI_COMMIT_REF_NAME`), so the data will be directly comparable.

Included once in
[`BaseLayout.astro`](../src/layouts/BaseLayout.astro), which every route already
uses.

### 7. `data-env` on `<html>` (`BaseLayout.astro`)

Add `data-env={resolveTelemetryEnv(process.env.CI_ENVIRONMENT_NAME)}` to the `<html>`
element, mirroring Hugo. Not strictly required by this plan — the script gets env
from a Vite define — but it matches Hugo's convention, is useful for debugging and
env-conditional styling, and plan 23's package expects the same attribute on both
hosts.

### Interaction with view transitions

`BaseLayout` conditionally renders `<ClientRouter />` (currently for cdocs). Under
view transitions, bundled scripts do not re-execute on soft navigation, so the
init-once shape is correct and needs no guard. RUM tracks `pushState` navigations as
new views on its own, so soft navigations are still recorded.

### Files

| File | Change |
| --- | --- |
| `astro/package.json` | Add `@datadog/browser-rum`, `@datadog/browser-logs` |
| `astro/astro.config.mjs` | Add the three Vite defines, with TODOs |
| `astro/src/env.d.ts` | Declare the three global constants |
| `astro/src/config/telemetry.ts` | New — credentials table and env resolution |
| `astro/src/lib/telemetry/initOptions.ts` | New — pure option builders |
| `astro/src/lib/telemetry/deviceId.ts` | New — cookie read/write/generate |
| `astro/src/lib/telemetry/datadogUserStatus.ts` | New — memoized `/locate` fetch |
| `astro/src/components/Telemetry/Telemetry.astro` | New — the deferred init script |
| `astro/src/layouts/BaseLayout.astro` | Render `<Telemetry />`, add `data-env` |

### Testing (red → green)

Unit (`vitest`), written first and verified failing:

- `telemetry.unit.test.ts` — `resolveTelemetryEnv` maps `live`/`preview`/anything
  else correctly; development config has no application ID and uses the `console`
  handler; preview and live use `http`.
- `initOptions.unit.test.ts` — RUM options match Hugo's field for field, including
  sampling rates and experimental features; an empty `version` or
  `internalAnalyticsSubdomain` is omitted rather than passed as `''`.
  `buildGlobalContext` always sets `stack: 'astro'`, includes `branch` when the ref
  is non-empty, and omits the key entirely when it is empty (rather than emitting
  `branch: ''`, which would create a junk facet value in RUM).
- `deviceId.unit.test.ts` — generates when no cookie exists; returns the existing
  value when one does; writes the expected `Domain`, `Max-Age`, and `SameSite`
  attributes; derives the domain from the hostname.
- `datadogUserStatus.unit.test.ts` — memoizes across calls (one `fetch`), returns
  `true` only for a truthy `user_status`, resolves `false` on network failure.

Browser (`playwright`), covering only what unit tests cannot:

- `window.DD_RUM` and `window.DD_LOGS` are defined after page load, proving the
  bundled script executes and assigns the globals — the contract plan 23 relies on.
- In development, RUM is **not** initialized (no session started) while Logs **is**,
  proving the env gate.

RUM `init()` itself is not asserted end to end, since dev never initializes it. The
option objects are covered by unit tests instead.

### Risks and open questions

- **`IA_SUBDOMAIN` may be Hugo-scoped in CI.** If so, Astro telemetry goes to the
  public intake while Hugo's goes internal, making the two sites awkward to compare
  during the migration. Needs an answer from whoever owns `documentation-ci`; the
  `TODO` marks the spot.
- **`CI_COMMIT_SHORT_SHA`** is a GitLab predefined variable, so it should be present,
  but it is worth confirming in the first preview deploy. Without it there is no
  `version` tag, so regressions cannot be attributed to a deploy.
- **Branch tag verification.** The first preview deploy should be checked in the RUM
  Explorer (`@context.branch:*` scoped to the new application) to confirm the tag
  lands — precisely the check that would have caught Hugo's defect.
- **Deferred init loses early errors.** Accepted: JS errors thrown before the module
  executes are not captured, and Session Replay starts a moment into the page.
  Page-load performance data is unaffected, since RUM backfills from the browser's
  Performance Timeline.
- **Bundle size.** The two SDKs add roughly 100 KB to every Astro page's JS. Deferred,
  so not on the critical path, but it is new weight on a site that currently ships
  very little.
- **Billing.** Astro `/api` traffic becomes billed RUM sessions, half of them with
  Session Replay. Matching Hugo's rates was the deliberate choice; worth a second
  look if `/api` volume is higher than expected.

## Manual verification

Automated tests cover the pure logic and the fact that the globals get assigned.
They cannot prove that data reaches Datadog, because RUM never initializes in
development. These steps do.

Throughout: `{branch}` is your branch name as it appears in the preview URL, and
`{app}` is the new `docs-astro` RUM application.

### A. Local, before deploying

Run `yarn dev` and open any page, then in the browser console:

| Check | Expected |
| --- | --- |
| `window.DD_RUM` | Defined (the SDK is assigned) |
| `window.DD_LOGS` | Defined |
| `window.DD_RUM.getInternalContext()` | `undefined` or no `session_id` — RUM did **not** init |
| `window.DD_LOGS.logger.info('hello')` | Prints to the console; **no** network request |
| Network tab, filter `browser-intake` | No requests |
| `document.documentElement.dataset.env` | `"development"` |

The point of the last four rows is the env gate: development must not send anything.

### B. Preview deploy — in the browser

Deploy the branch and open a preview page (`docs-staging.datadoghq.com/{branch}/api/...`).

1. **Globals and context.** In the console:
   ```js
   window.DD_RUM.getGlobalContext()
   // → { stack: "astro", branch: "{branch}" }
   window.DD_LOGS.getGlobalContext()
   // → { stack: "astro", branch: "{branch}", host: "...", referrer: "...", lang: "en" }
   window.DD_RUM.getInternalContext()
   // → has a session_id — RUM initialized
   ```
   The `branch` value must match the path segment in the URL exactly. This is the
   check Hugo would have failed.

2. **Init config.** `window.DD_RUM.getInitConfiguration()` — confirm
   `service: "docs"`, `env: "preview"`, `sessionSampleRate: 100`,
   `sessionReplaySampleRate: 50`, and that `version` is your commit's short SHA
   (empty means `CI_COMMIT_SHORT_SHA` did not reach the build).

3. **Data is actually leaving the page.** Network tab, filter `browser-intake`.
   You should see POSTs. If `IA_SUBDOMAIN` reached the build, the hostname carries
   that subdomain; if it is empty, it is the standard public intake. Either is
   acceptable — note which one you see, since it answers the open CI question.

4. **No device-ID cookie on preview.** Application → Cookies: `_dd_device_id` must
   be **absent**. It is live-only.

5. **Console is clean** — no SDK errors, no "RUM already initialized" warnings.

### C. Preview deploy — in Datadog

Allow a minute or two; RUM batches events, and some are flushed on page unload.

1. **Digital Experience → Real User Monitoring → Explorer.** Switch the application
   selector to `{app}`. Confirm sessions exist at all — this is the positive control
   before testing any narrower query.

2. **Branch tag.** Query:
   ```
   @application.name:{app} @context.branch:{branch}
   ```
   Expect your sessions. Then broaden to `@context.branch:*` and use **Group by →
   `@context.branch`** to see one row per branch — this is the per-PR filtering you
   wanted, and the grouping view is how you will use it day to day.

3. **Raw event inspection.** Open any view event and switch to the **JSON** tab.
   Confirm `context.branch`, `context.stack: "astro"`, `service: "docs"`, and
   `version`. Reading the raw JSON avoids being fooled by a mistyped facet name.

4. **Facets exist.** In the left sidebar, search facets for "branch" and "stack".
   Both should now appear for `{app}`. A facet only materializes after the attribute
   has been seen in real data, so their presence is itself evidence.

5. **Session Replay.** Filter to `@session.has_replay:true`. Roughly half of sessions
   should qualify. Open one and confirm it plays.

6. **Logs.** **Logs → Explorer**:
   ```
   service:docs env:preview @branch:{branch}
   ```
   Expect entries. Note that Browser Logs puts global context at the top level
   (`@branch`), whereas RUM nests it under `@context.branch` — the two query shapes
   differ, which is easy to trip over.

7. **Hugo is unaffected.** Query the *Hugo* RUM application for the same time window
   and confirm its session volume looks normal and that no `stack:astro` events
   appear there. This proves the two applications are cleanly separated.

### D. After merging to live

1. **Device ID cookie.** On `docs.datadoghq.com`, Application → Cookies: `_dd_device_id`
   is present, `Domain=.datadoghq.com`, roughly one-year expiry.
2. **Shared with Hugo.** Note the value, navigate to a Hugo page on the same domain,
   and confirm the cookie value is unchanged. Then do the reverse — clear it, load a
   Hugo page first, then an Astro page — and confirm Astro reuses Hugo's value rather
   than overwriting it. This is the whole point of duplicating the logic.
3. **In Datadog:** `@application.name:{app} env:live @usr.device_id:*` returns
   sessions.
4. **No branch tag on live.** `@application.name:{app} env:live @context.branch:*`
   should return **nothing** — `CI_COMMIT_REF_NAME` is a preview-only concern, and a
   branch tag on live traffic would mean the define leaked.

### E. If something is missing

| Symptom | Likely cause |
| --- | --- |
| No sessions at all in `{app}` | Wrong application ID or client token; or the env gate did not open (check `dataset.env`) |
| Sessions exist, no `branch` | The Vite define resolved empty — check `branchRef()` at build time, not runtime |
| `version` empty | `CI_COMMIT_SHORT_SHA` not exposed to the Astro CI job |
| Events in the browser's network tab but nothing in Datadog | Wrong intake — check whether `IA_SUBDOMAIN` was set unexpectedly |
| Duplicate sessions | The `<Telemetry />` component was included more than once, or a soft navigation re-ran init |
