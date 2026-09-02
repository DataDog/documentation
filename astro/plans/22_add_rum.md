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

### No prerequisite: Astro shares Hugo's RUM application

Astro reports into the **same** RUM application as Hugo, reusing the
`ddApplicationId` and `ddClientToken` already committed in
[`config-docs.js`](../../hugo/assets/scripts/config/config-docs.js). Astro traffic is
distinguished by the `stack: 'astro'` global context property, not by a separate
application. There is nothing to create and no user action blocking implementation.

This reverses an earlier decision to create a separate `docs-astro` application. The
reasoning:

1. **The two sites share an origin, so they share sessions.** `deriveSiteUrl()`
   returns `https://docs.datadoghq.com` on live (`siteUrl.ts:52-54`) — the same
   origin Hugo serves. A visitor reading a Hugo page and then clicking into `/api/`
   is one visit on one domain. RUM's session cookie is scoped to the domain, not the
   application, so two applications would split that single journey across them:
   the funnel is unqueryable in one place and a Session Replay of a cross-site visit
   is cut in two at the `/api` boundary. That cost is permanent, not
   migration-scoped.
2. **Datadog feature flags are scoped per application.** A new application is the
   entire reason [24_feature_flags.md](24_feature_flags.md) carried a warning that
   `docs-ai-enabled` might resolve to its `true` default on Astro — an inert kill
   switch. Sharing the application removes that failure mode and the need for a
   decision from the flag's owner.
3. **It matches the existing pattern.** Hugo already puts `preview` and `live`
   traffic in one application, separated by the `env` field. Separating Hugo from
   Astro by a `stack` tag within one application is the same mechanism the current
   setup already depends on.
4. **History stays continuous through the cutover.** Existing dashboards keep
   working, and before/after comparisons remain possible in one application rather
   than spanning two.

**What this gives up** is sandboxing. A misconfigured Astro init — a runaway custom
action, a wrong sampling rate, a Session Replay privacy mistake — pollutes the
production application's data rather than a throwaway one. This is the real cost of
the decision, and it is blunted rather than eliminated by the fact that Hugo's
preview traffic already lands in that same production application today.

The second cost: the application selector no longer isolates Astro. Every
Astro-scoped query becomes `@context.stack:astro`, and because this plan cannot edit
Hugo to emit `stack: 'hugo'`, Hugo-scoped queries become `-@context.stack:astro`.
Unambiguous, but a filter to remember rather than a dropdown to pick.

### Confirmed decisions

| Question | Decision |
| --- | --- |
| SDK loading | **npm import, deferred.** Import `@datadog/browser-rum` and `@datadog/browser-logs`, assign `window.DD_RUM` / `window.DD_LOGS`, then `init()`. Not Hugo's blocking head script. |
| Subresource Integrity | **Not reproduced.** Hugo's SRI protects a hand-concatenated CDN asset; Astro's bundle is emitted and hashed by Vite. |
| RUM application | **Hugo's existing application, shared.** Reuse the committed application ID and client token; separate the two sites by tag, not by application. See above. |
| `service` tag | **`docs`**, matching Hugo, so queries and dashboards survive the Hugo cutover. |
| Distinguishing tag | Global context property **`stack: 'astro'`**. Load-bearing, not cosmetic — it is the only thing separating Astro traffic from Hugo's. |
| Branch tag | **Included**, on both RUM and Logs, from `CI_COMMIT_REF_NAME`. Astro deliberately goes beyond Hugo here — see below. |
| Env gating | **Mirror Hugo.** RUM initializes in `preview` and `live` only. Logs initializes in every environment, with the handler set to `console` in development. |
| `_dd_device_id` cookie | **Included**, live only, same logic as Hugo. Both sites share the domain, so they share the cookie. |
| Sampling | **Match Hugo:** `sessionSampleRate: 100`, `sessionReplaySampleRate: 50`. |
| Build-time constants | **Astro's `PUBLIC_` env prefix**, not `vite.define`. Defines are replaced at build time only, so they break under `astro dev` — see section 1. |
| `IA_SUBDOMAIN` | Read from env with an empty default, plus a `TODO` in the code — CI may not expose the variable to the Astro job. |
| `CI_COMMIT_SHORT_SHA` | Same: read from env, empty default, `TODO` in the code. |
| `fetchDatadogUserStatus()` | **Duplicated here, not shared.** Ten lines of generic site functionality; Hugo's copy dies with Hugo. |
| Sourcemaps | **Emitted as `hidden`, uploaded from CI.** Astro emits the `.map` files and a declarative upload manifest; the `datadog-ci` invocation itself belongs to `documentation-ci`. See section 8. |

### Core idea

One small, testable config layer plus one entry-point script, mirroring Hugo's split
between `config-docs.js` (the credentials table) and `dd-browser-logs-rum.js` (the
initialization).

Everything that can be a pure function of its inputs is: the credentials lookup, the
RUM and Logs init options, and the device-ID cookie logic all take explicit
arguments and get unit tested. The entry point is the thin, untestable shell that
reads build-time constants and touches `window`.

### Steps summary

The eight sections below, in one line each. Steps 1–7 are RUM and Logs themselves;
step 8 is independent — it makes the errors RUM captures readable, and could land
separately.

| Step | What it does | Why it is separate |
| --- | --- | --- |
| 1. Build-time constants | Carries four CI values — environment, branch, deploy SHA, analytics subdomain — from the build into the browser bundle. | Nothing else can reach `process.env` from client code, so every later step depends on this one. |
| 2. Credentials table | Holds the RUM application ID and client token per environment. | A copy of Hugo's table, which stays upstream until the cutover; isolating it keeps the drift risk in one file. |
| 3. Init options builders | Turns credentials plus constants into the two SDK option objects, and the context properties applied after init. | Pure functions, so Hugo parity is assertable in unit tests. RUM never starts in development, so this is the only part of the init path a test can reach. |
| 4. Device ID | Reads or mints the `_dd_device_id` cookie that ties page views to a Datadog app user. | Live only, and shared with Hugo through the domain — so it must read before it writes. |
| 5. Datadog user status | Answers whether the visitor is signed into the Datadog app. | Generic site functionality, not telemetry-specific; the planned Ask AI package consumes it too. |
| 6. Entry point | The one component that imports the SDKs, applies the environment gate, and calls `init()`. | The only piece that touches `window`, and therefore the only piece unit tests cannot cover. |
| 7. `data-env` on `<html>` | Publishes the environment name in the markup. | Not used by telemetry — it's Hugo convention, useful for debugging, and expected by the planned Ask AI package. |
| 8. Sourcemaps | Emits `.map` files and a manifest describing how to upload them. | Without it, every captured error is a stack trace through minified bundles. The upload itself belongs to `documentation-ci` and does not exist yet. |

Three things a reviewer should look at rather than skim:

- **The environment gate** (steps 1, 2, 6). RUM starts on preview and live only, Logs
  everywhere. Two independent mechanisms enforce it — the environment check and the
  absence of a development application ID — because the consequence of getting it
  wrong is production data, not a local annoyance.
- **`stack: 'astro'`** (step 3). One tag is the only thing separating Astro's data
  from Hugo's, because the two share a RUM application.
- **Three values that must agree across two repos** (steps 3 and 8): `service`,
  `version`, and the public asset URL prefix. A mismatch produces a *successful*
  sourcemap upload that never matches an error — no failing build, no error log.

### 1. Build-time constants (`astro.config.mjs`, `src/env.d.ts`)

Hugo injects `CI_COMMIT_SHORT_SHA` and `IA_SUBDOMAIN` into its client bundle through
`js.Build` defines. Astro's equivalent is **not** `vite.define`. Republish the
variables under Astro's `PUBLIC_` env prefix in `astro.config.mjs`:

```js
process.env.PUBLIC_CI_ENV = process.env.CI_ENVIRONMENT_NAME ?? '';
process.env.PUBLIC_CI_COMMIT_REF_NAME = branchRef() ?? '';
process.env.PUBLIC_CI_COMMIT_SHORT_SHA = process.env.CI_COMMIT_SHORT_SHA ?? '';
process.env.PUBLIC_IA_SUBDOMAIN = process.env.IA_SUBDOMAIN ?? '';
```

and read them through one module, `src/lib/telemetry/buildConstants.ts`:

```ts
export const CI_COMMIT_SHORT_SHA = import.meta.env.PUBLIC_CI_COMMIT_SHORT_SHA ?? '';
```

Declare the keys on `ImportMetaEnv` in `src/env.d.ts` so TypeScript sees them as
`string`. Assigning to `process.env` in the config file works because Vite resolves
the env *after* evaluating it, so nothing needs `PUBLIC_` set in CI.

**Why not `vite.define`.** Its replacement runs at build time only. A define
referenced from client-side code is replaced correctly by `astro build`, but under
`astro dev` it survives into the browser as an undefined identifier and throws on
the first line that touches it. In this component that is the very first statement,
so telemetry silently does nothing for the whole of local development — while both
SDK globals still exist, because the npm packages assign `window.DD_RUM` /
`window.DD_LOGS` on import. A test that only checks for the globals passes. This was
found by an actual page error during implementation, not by reasoning, which is the
argument for the browser test asserting *zero* page errors alongside a working
`getInitConfiguration()`.

Moving the reference into a `.ts` module does not help — the replacement is
build-only regardless of the module's extension. `import.meta.env.PUBLIC_*` is
statically replaced in both dev and build, which is why it is the mechanism here.

Reading `process.env` in component frontmatter is the other option, and is rejected:
it would work for prerendered routes but would require the CI variables to be
present in the *running server's* environment for on-demand ones, which this repo
cannot promise.

Keep all four behind `buildConstants.ts` rather than reading `import.meta.env`
directly at each use site, so the config-side assignments have exactly one
counterpart to stay in agreement with.

`PUBLIC_CI_COMMIT_REF_NAME` reuses the existing
[`branchRef()`](../src/lib/site/siteUrl.ts) helper rather than reading the env var
directly, so the branch string is normalized identically to the one in the deploy
path prefix and the canonical URLs. Availability is not in question: preview builds
already **throw** when `CI_COMMIT_REF_NAME` is unset (`siteUrl.ts:44-49`).

Two constants carry a `TODO`, both in `buildConstants.ts`. `CI_COMMIT_SHORT_SHA` is
a GitLab predefined variable, present in every job, but it is load-bearing twice
over — no `version` tag *and* broken sourcemap matching — so it is worth confirming
rather than assuming. `IA_SUBDOMAIN` is a custom variable, and whether it is exposed
to the Astro job is owned by `DataDog/documentation-ci`, which this repo cannot
edit. An empty value degrades gracefully to the default telemetry intake, so this is
safe to ship unresolved, but it should be searchable.

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

All three environments reuse Hugo's committed values verbatim: preview and live
share Hugo's application ID and client token, and development reuses Hugo's
development client token with no application ID — so development RUM cannot init
even if the env gate were removed.

Since every value is copied from `config-docs.js`, the table should say so in a
comment and point at the file. A future reader finding two identical credential
tables in two languages needs to know that is deliberate, and which one is
upstream.

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

### 8. Sourcemaps, so RUM errors are readable

Without this, every JS error RUM captures on Astro arrives as a stack trace through
minified, hash-named bundles — `_astro/Telemetry.C4k9x2.js:1:8471` — which is
effectively unusable. Hugo already solves this, and the solution spans two repos.

**What Hugo does.** Its `js.Build` calls emit external sourcemaps in prod
(`hugo/layouts/partials/header-scripts.html`: `$sourcemap := cond $isProd "external" "inline"`),
and `documentation-ci` uploads them in a `post-deploy` job:

```sh
# ci-templates/preview.yml:259 (production.yml:124 is the same with a live prefix)
datadog-ci sourcemaps upload ./public/static \
  --service docs \
  --minified-path-prefix "https://docs-staging.datadoghq.com/${CI_COMMIT_REF_NAME}/static/" \
  --release-version "${CI_COMMIT_SHORT_SHA}"
```

Both jobs are `allow_failure: true`, so a broken upload degrades error readability
without failing the pipeline. Worth keeping for the Astro equivalent.

**Astro today emits no sourcemaps at all.** `astro.config.mjs` sets no
`vite.build.sourcemap`, and Vite's default for a production build is `false`. So
this is a gap, not a regression.

#### The in-repo half

1. **Emit them.** Add to `astro.config.mjs`:

   ```js
   vite: {
     build: {
       // `hidden` emits the .map files but omits the //# sourceMappingURL=
       // comment, so the maps are uploaded to Datadog without being advertised
       // to every visitor's devtools. datadog-ci matches maps to minified files
       // by path, not by that comment.
       sourcemap: 'hidden',
     },
   }
   ```

   This applies to the server build too, putting unused maps in `dist/server/`.
   Harmless — only `dist/client` is uploaded — but it does cost build time and
   disk.

   No guard changes are needed: client maps land in `dist/client/_astro/`, which
   both [`staticApiGuard`](../src/integrations/staticApiGuard.ts) and
   [`verifyDist.mjs`](../scripts/verifyDist.mjs) already allow via `_astro/`.

2. **Add the CLI as a devDependency.** `@datadog/datadog-ci`, so the CI job can run
   `./node_modules/.bin/datadog-ci` after `yarn install --immutable`, exactly as
   Hugo's job does. Hugo pins `^2.36.0`; use the current major and note the
   divergence.

3. **Emit an upload manifest.** The `--minified-path-prefix` must exactly match the
   public URL prefix of the emitted assets, which this repo computes and CI does
   not: it is the site origin plus [`pathPrefix()`](../src/lib/site/pathPrefix.ts)
   plus `_astro/`. Hardcoding that URL in `documentation-ci` duplicates the
   derivation across repos, where it will silently drift the first time
   `assetsPrefix` or the deploy origin changes — and the failure is invisible,
   because upload still *succeeds*, it just never matches anything.

   So add a small integration writing `dist/sourcemap-upload.json` at
   `build:done`:

   ```json
   {
     "uploadDir": "dist/client",
     "service": "docs",
     "releaseVersion": "<CI_COMMIT_SHORT_SHA>",
     "minifiedPathPrefix": "https://<origin><pathPrefix>/"
   }
   ```

   `dist/` rather than `dist/client/` deliberately — a sibling of the existing
   `dist/stats.html`, so it is never deployed and never reaches the output guards.
   The CI job reads these four values instead of reconstructing them. This stays
   inside the no-deploy-code rule: it names no bucket, distribution, or
   credential, and describes only the shape of the build output.

   Note the prefix points at `dist/client`, not `dist/client/_astro`, so the
   relative path datadog-ci derives (`_astro/foo.js`) composes with a prefix that
   ends at the site root — one fewer place for `_astro` to be spelled.

   The integration carries a `TODO` naming the missing CI step, following the same
   convention as the `IA_SUBDOMAIN` and `CI_COMMIT_SHORT_SHA` TODOs — the manifest
   is dead weight until something consumes it, and the only way that gets noticed
   is a grep for `TODO`:

   ```ts
   // TODO: nothing consumes this manifest yet. `documentation-ci` needs a
   // post-deploy job for the Astro app, mirroring `sourcemaps_preview` /
   // `sourcemaps_live` in its ci-templates, running:
   //   ./node_modules/.bin/datadog-ci sourcemaps upload <uploadDir> \
   //     --service <service> \
   //     --minified-path-prefix <minifiedPathPrefix> \
   //     --release-version <releaseVersion>
   // with DATADOG_API_KEY from `get_secret 'dd-api-key'` and
   // allow_failure: true. Until then, RUM error stack traces for Astro stay
   // minified. See plans/22_add_rum.md section 8.
   ```

   Write the whole invocation out rather than a bare "wire this up": the person
   who picks it up is likely working in the other repo without this context, and
   the command is the deliverable.

4. **Three values must agree** with the RUM init from section 3, or matching fails
   silently:

   | Manifest | RUM init |
   | --- | --- |
   | `service: "docs"` | `service: 'docs'` |
   | `releaseVersion` | `version` |
   | `minifiedPathPrefix` | the URL the browser actually loaded |

   This promotes the `CI_COMMIT_SHORT_SHA` `TODO` from cosmetic to load-bearing:
   an empty `version` was previously just a missing deploy tag, but it also breaks
   sourcemap matching outright. Assert the coupling in a unit test — the manifest
   builder and `buildRumInitOptions` should be shown to produce the same `service`
   and version string from the same inputs.

5. **Do not copy Hugo's rename hack.** Hugo's job runs a `find … mv` over
   `./public` to re-insert the fingerprint hash into `.map` filenames, because
   Hugo Pipes loses it. Vite emits `foo.[hash].js` alongside `foo.[hash].js.map`
   correctly, so the Astro job needs nothing equivalent.

#### The CI half (blocked, and not blocking)

The `datadog-ci` invocation belongs in `documentation-ci` as a `post-deploy` job
mirroring `sourcemaps_preview` / `sourcemaps_live`, reading the manifest above.

That work cannot start here, and not only because of the no-deploy-code rule:
**`documentation-ci` has no Astro build or deploy job on `main` at all** — `astro`
appears there only in comments in `dynamic-build-preview.yml` and
`spike-dynamic-build.yml`. Whoever wires up the Astro deploy job owns adding the
sourcemap step next to it.

Everything in the in-repo half is worth doing before that lands. It is inert
without the upload job, costs only build time, and means the CI-side change is a
handful of `script:` lines reading a manifest rather than a URL-derivation puzzle.

### Interaction with view transitions

`BaseLayout` conditionally renders `<ClientRouter />` (currently for cdocs). Under
view transitions, bundled scripts do not re-execute on soft navigation, so the
init-once shape is correct and needs no guard. RUM tracks `pushState` navigations as
new views on its own, so soft navigations are still recorded.

### Files

| File | Change |
| --- | --- |
| `astro/package.json` | Add `@datadog/browser-rum`, `@datadog/browser-logs`; add `@datadog/datadog-ci` as a devDependency |
| `astro/astro.config.mjs` | Republish the four CI variables under `PUBLIC_`, add `build.sourcemap: 'hidden'` and the manifest integration |
| `astro/src/env.d.ts` | Declare the four `ImportMetaEnv` keys and the two SDK `Window` globals |
| `astro/src/config/telemetry.ts` | New — credentials table and env resolution |
| `astro/src/lib/telemetry/initOptions.ts` | New — pure option builders |
| `astro/src/lib/telemetry/buildConstants.ts` | New — the four `PUBLIC_` build-time constants |
| `astro/src/lib/telemetry/deviceId.ts` | New — cookie read/write/generate |
| `astro/src/lib/telemetry/datadogUserStatus.ts` | New — memoized `/locate` fetch |
| `astro/src/components/Telemetry/Telemetry.astro` | New — the deferred init script |
| `astro/src/layouts/BaseLayout.astro` | Render `<Telemetry />`, add `data-env` |
| `astro/src/integrations/sourcemapManifest.ts` | New — writes `dist/sourcemap-upload.json`, carries the `datadog-ci` TODO |

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
- `sourcemapManifest.unit.test.ts` — the manifest's `minifiedPathPrefix` composes
  the origin with `pathPrefix()` and ends in a single trailing slash for preview,
  live, and local builds; and its `service` and `releaseVersion` equal the
  `service` and `version` that `buildRumInitOptions` produces from the same
  inputs. That equality is the test that matters — it is the coupling that fails
  silently in production.

Browser (`playwright`), covering only what unit tests cannot:

- `window.DD_RUM` and `window.DD_LOGS` are defined after page load, proving the
  bundled script executes and assigns the globals — the contract plan 23 relies on.
- In development, RUM is **not** initialized (no session started) while Logs **is**,
  proving the env gate.

RUM `init()` itself is not asserted end to end, since dev never initializes it. The
option objects are covered by unit tests instead.

### TODOs to leave in the code

Everything this plan knowingly defers gets a `TODO` at the place it will need to be
changed, so `grep -rn TODO` is a complete ledger of the deferred work rather than a
partial one. Follow the established convention in this repo — `// TODO: <what> once
<condition>`, with a pointer to the authority — as in
[`ApiSideNav.astro:36`](../src/components/ApiSideNav/ApiSideNav.astro) and
[`filters.ts:58`](../src/lib/cdocs/filters.ts).

Two kinds appear below, and they should read differently: **blocked-on-someone-else**
TODOs name who owns the answer, and **dies-with-Hugo** TODOs name the cutover as
their trigger. The second kind is the easier to lose, because nothing fails when it
is missed — the code just quietly keeps a workaround alive after the reason for it
is gone.

| Location | TODO | Kind |
| --- | --- | --- |
| `src/lib/telemetry/buildConstants.ts`, `IA_SUBDOMAIN` | Whether CI exposes the variable to the Astro job is owned by `documentation-ci`. Empty means public intake. | Blocked |
| `src/lib/telemetry/buildConstants.ts`, `CI_COMMIT_SHORT_SHA` | Confirm the variable reaches the Astro job. Empty means no `version` tag *and* broken sourcemap matching. | Blocked |
| `src/integrations/sourcemapManifest.ts` | The full `datadog-ci` invocation that `documentation-ci` still needs — see section 8. | Blocked |
| `src/lib/telemetry/initOptions.ts`, `enableExperimentalFeatures` | `'feature_flags'` is copied from Hugo but inert on Astro until [24_feature_flags.md](24_feature_flags.md) lands. Say so, or the next reader assumes flags work. | Blocked |
| `src/config/telemetry.ts` | The credentials are copied from Hugo's `config-docs.js`, which is upstream. Astro becomes the owner at the cutover, when that file is deleted. | Dies with Hugo |
| `src/lib/telemetry/initOptions.ts`, `buildGlobalContext` | `stack: 'astro'` is the only thing separating Astro traffic from Hugo's in a shared application, so **do not remove it** until Hugo is gone — at which point every session is Astro and the property becomes a facet with one value. | Dies with Hugo |
| `src/lib/telemetry/deviceId.ts` | A deliberate duplicate of Hugo's cookie logic, which Hugo's own comment calls a temporary solution. Astro becomes sole owner at cutover. | Dies with Hugo |
| `src/lib/telemetry/datadogUserStatus.ts` | Deliberate duplicate of Hugo's `fetchDatadogUserStatus()`. Cross-reference the twin so a change to one is not made blind to the other. | Dies with Hugo |
| `src/components/Telemetry/Telemetry.astro`, the global assignments | `window.DD_RUM` / `window.DD_LOGS` are assigned *only* because plan 23's package reads globals rather than importing. Non-obvious next to two real imports, and droppable once the package is folded into Astro. | Dies with Hugo |

`data-env` on `<html>` is the one deferred item I would **not** make a TODO. It is
also Hugo-parity scaffolding, but it stays useful after the cutover for debugging
and env-conditional styling, so a plain comment explaining why it exists is enough.

### Follow-ups that cannot be TODOs here

Neither of these lives in this repo, so they need somewhere else to be tracked:

- **Existing dashboards, monitors, and SLOs will silently start including Astro
  traffic.** This is the flip side of sharing the application: nothing
  under-reports, but every "all docs traffic" panel changes meaning without
  announcement, and any monitor with a tuned threshold — error rate, LCP, session
  count — sees a new population mixed in. Mostly desirable, since `/api` is docs
  traffic either way. But it should be announced to whoever owns those monitors
  before the first live deploy, not discovered when one pages. Anything that needs
  to stay Hugo-only can add `-@context.stack:astro`.
- **The `IA_SUBDOMAIN` and Astro-CI-job questions** belong to whoever owns
  `documentation-ci`. The TODOs above mark the code, but the answer has to come from
  a conversation there.

### Risks and open questions

- **`IA_SUBDOMAIN` may be Hugo-scoped in CI.** If so, Astro telemetry goes to the
  public intake while Hugo's goes internal, making the two sites awkward to compare
  during the migration. Needs an answer from whoever owns `documentation-ci`; the
  `TODO` marks the spot.
- **`CI_COMMIT_SHORT_SHA`** is a GitLab predefined variable, so it should be present,
  but it is worth confirming in the first preview deploy. Without it there is no
  `version` tag, so regressions cannot be attributed to a deploy.
- **Branch tag verification.** The first preview deploy should be checked in the RUM
  Explorer (`@context.branch:*` scoped with `@context.stack:astro`) to confirm the
  tag lands — precisely the check that would have caught Hugo's defect.
- **A misconfiguration now pollutes production data.** The accepted cost of sharing
  Hugo's application. The mitigations are that this plan changes no sampling rate or
  privacy setting from Hugo's, and that `stack: 'astro'` makes any bad Astro data
  identifiable and excludable after the fact. The unmitigated case is a Session
  Replay privacy regression, which cannot be un-recorded — so
  `defaultPrivacyLevel: 'mask-user-input'` is the one option to double-check by hand
  rather than trust to a unit test.
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
- **The deploy origin for `minifiedPathPrefix` is not knowable from this repo.**
  Hugo's assets are served from `docs-staging.datadoghq.com/${branch}/static/`, but
  the Astro app deploys to its own bucket and distribution, and the comment on
  `build.assetsPrefix` in `astro.config.mjs` describes the platform as serving at
  its distribution root — which does not obviously agree with
  `assetsPrefix: pathPrefix()`. The manifest should derive the prefix from the same
  helpers the build already uses, and the **first upload must be checked against a
  real deployed asset URL** rather than trusted. This is the single most likely
  thing to be wrong on the first attempt.
- **Sourcemap matching fails silently.** A wrong prefix, service, or version
  produces a *successful* upload that never matches an error. There is no failing
  build and no error log — only stack traces that stay minified. Hence the explicit
  verification step, and hence `allow_failure: true` being safe.
- **Sourcemaps are uploaded but not published.** `hidden` means devtools will not
  auto-fetch maps for local debugging of a deployed page, unlike Hugo, which serves
  its maps openly. Deliberate: the maps go to Datadog, where the stack traces are
  actually read. If someone wants devtools parity, that is a one-word change to
  `true`.

## Manual verification

Automated tests cover the pure logic and the fact that the globals get assigned.
They cannot prove that data reaches Datadog, because RUM never initializes in
development. These steps do.

Throughout, `{branch}` is your branch name as it appears in the preview URL. Because
Astro shares Hugo's RUM application, **every Datadog query below must be scoped with
`@context.stack:astro`** — there is no application selector to isolate Astro, and an
unscoped query returns Hugo's traffic too, which will look like success whether or
not Astro is reporting anything. Verifying a shared application means every positive
result needs that filter to mean anything.

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

1. **Digital Experience → Real User Monitoring → Explorer.** Select the `docs`
   application, then query:
   ```
   @context.stack:astro
   ```
   Confirm sessions exist at all — the positive control before any narrower query.
   If this returns nothing while the browser checks in B all passed, the events are
   arriving without their global context, which points at `buildGlobalContext` being
   applied after the first events were already sent.

2. **Branch tag.** Query:
   ```
   @context.stack:astro @context.branch:{branch}
   ```
   Expect your sessions. Then broaden to `@context.stack:astro @context.branch:*` and
   use **Group by → `@context.branch`** to see one row per branch — this is the
   per-PR filtering you wanted, and the grouping view is how you will use it day to
   day.

   Confirm the count here is *lower* than the same query without
   `@context.stack:astro`, which proves the filter is actually discriminating rather
   than being ignored because of a mistyped attribute path.

3. **Raw event inspection.** Open any view event and switch to the **JSON** tab.
   Confirm `context.branch`, `context.stack: "astro"`, `service: "docs"`, and
   `version`. Reading the raw JSON avoids being fooled by a mistyped facet name.

4. **Facets exist.** In the left sidebar, search facets for "branch" and "stack".
   Both should now appear. A facet only materializes after the attribute has been
   seen in real data, so their presence is itself evidence.

5. **Session Replay.** Filter `@context.stack:astro @session.has_replay:true`.
   Roughly half of Astro sessions should qualify. Open one and confirm it plays, and
   while it is open confirm that form inputs are masked — the `mask-user-input`
   check from the risks section, which is worth doing by eye once because it cannot
   be undone retroactively.

6. **Logs.** **Logs → Explorer**:
   ```
   service:docs env:preview @stack:astro @branch:{branch}
   ```
   Expect entries. Note that Browser Logs puts global context at the top level
   (`@stack`, `@branch`), whereas RUM nests it under `@context.*` — the two query
   shapes differ, which is easy to trip over.

7. **Hugo still looks normal.** This replaces the old "the applications are cleanly
   separated" check, which no longer applies. Instead, confirm sharing has not
   disrupted Hugo:
   - `-@context.stack:astro` over the same window returns Hugo sessions at a normal
     volume, with no gap or spike starting at your deploy.
   - No Hugo session has picked up `@context.stack:astro`, and no Astro session is
     missing it. Overlap in either direction would mean global context is leaking
     across the two SDKs' shared session state.

8. **Cross-site session continuity** — the benefit that motivated sharing the
   application, and therefore worth confirming rather than assuming. In one browser
   session, load a Hugo preview page, then navigate to an Astro `/api` preview page.
   In the Explorer, find that session and confirm it contains views from **both**
   sites — Hugo URLs and `/api` URLs under one session ID, with `@context.stack`
   varying between views within it. If instead you see two separate sessions, the
   session cookie is not being shared as expected and the main argument for a shared
   application does not hold in practice. Note this test only works where the two
   sites share an origin, so it is meaningful on live and on any preview where the
   Astro app is served under `docs-staging.datadoghq.com` rather than its own
   distribution.

### D. After merging to live

1. **Device ID cookie.** On `docs.datadoghq.com`, Application → Cookies: `_dd_device_id`
   is present, `Domain=.datadoghq.com`, roughly one-year expiry.
2. **Shared with Hugo.** Note the value, navigate to a Hugo page on the same domain,
   and confirm the cookie value is unchanged. Then do the reverse — clear it, load a
   Hugo page first, then an Astro page — and confirm Astro reuses Hugo's value rather
   than overwriting it. This is the whole point of duplicating the logic.
3. **In Datadog:** `@context.stack:astro env:live @usr.device_id:*` returns sessions.
4. **No branch tag on live.** `@context.stack:astro env:live @context.branch:*`
   should return **nothing** — `CI_COMMIT_REF_NAME` is a preview-only concern, and a
   branch tag on live traffic would mean the define leaked.
5. **Session volume sanity.** Compare total `docs` application session volume for
   the day before and the day after the deploy. Astro `/api` traffic is now inside
   that number, so expect an increase rather than a flat line — and if the increase
   is much larger than `/api`'s share of pageviews, check for duplicate
   initialization before it accrues a billing surprise. This check only exists
   because the application is shared; with a separate application the number would
   have been isolated.

### E. Sourcemaps

The in-repo half is verifiable now; the upload is not, until the CI job exists.

**Locally, after a preview-shaped build** (`yarn build:preview`):

| Check | Expected |
| --- | --- |
| `dist/client/_astro/` | Contains `*.js` **and** matching `*.js.map` files |
| A built `.js` file | Contains **no** `//# sourceMappingURL=` comment (`hidden`) |
| `dist/sourcemap-upload.json` | Exists, with all four keys populated |
| `dist/client/` | Does **not** contain `sourcemap-upload.json` |
| `yarn verify:dist` | Still passes — the `.map` files must not trip the guard |

Then confirm the manifest is actually correct, which is the part that silently
breaks:

1. Read `minifiedPathPrefix` from the manifest.
2. Pick any `.js` filename from `dist/client/_astro/`.
3. Concatenate: `${minifiedPathPrefix}_astro/${filename}`.
4. On a real preview deploy, open that URL. It must return the JS file — not a 404
   and not an HTML error page. If it 404s, the prefix is wrong and every uploaded
   map will be orphaned.
5. Confirm `releaseVersion` in the manifest matches what the browser reports:
   `window.DD_RUM.getInitConfiguration().version`.

**Once the CI job lands:**

1. In the job log, `datadog-ci sourcemaps upload` reports a nonzero count of
   sourcemaps found and uploaded, and lists no skipped or unmatched files.
2. In Datadog, check the sourcemap list for `service:docs` and confirm entries for
   the new `releaseVersion`.
3. **The real test — deobfuscate an actual error.** Throw one deliberately from the
   console on a deployed Astro page (`window.DD_RUM.addError(new Error('sourcemap test'))`
   does not exercise the stack the same way; better to trigger a genuine throw from
   bundled code, or temporarily add one). Then find it in Error Tracking and confirm
   the stack frame shows an original filename and a plausible line number, not
   `_astro/*.[hash].js:1:NNNN`.
4. Confirm Hugo's uploads still work, since both services are `docs` and the two now
   share a namespace distinguished only by `releaseVersion`. Different commits mean
   different versions, so they should not collide — but verify a Hugo error still
   deobfuscates after an Astro upload has run.

### F. If something is missing

| Symptom | Likely cause |
| --- | --- |
| No `@context.stack:astro` sessions at all | The env gate did not open (check `dataset.env`), or the credentials were not copied correctly from `config-docs.js` |
| Sessions appear but `@context.stack:astro` matches nothing | `buildGlobalContext` was not applied, or was applied after the first events flushed — the events are Astro's but indistinguishable from Hugo's, which is the shared-application failure mode |
| A query returns results but they look like Hugo's | The `@context.stack:astro` filter was omitted or mistyped; compare counts with and without it |
| Sessions exist, no `branch` | The Vite define resolved empty — check `branchRef()` at build time, not runtime |
| `version` empty | `CI_COMMIT_SHORT_SHA` not exposed to the Astro CI job |
| Events in the browser's network tab but nothing in Datadog | Wrong intake — check whether `IA_SUBDOMAIN` was set unexpectedly |
| Duplicate sessions | The `<Telemetry />` component was included more than once, or a soft navigation re-ran init |
| Errors arrive, stacks stay minified | No upload job yet (grep `TODO` for `datadog-ci`); or `minifiedPathPrefix` does not match the deployed asset URL; or `version` is empty so nothing matches `releaseVersion` |
| Upload job succeeds, still minified | Silent mismatch — verify the prefix by fetching `${minifiedPathPrefix}_astro/<file>` directly (verification E, step 4) |
| No `.map` files in `dist/client/_astro/` | `vite.build.sourcemap` not set, or set to `false` for the client build |
