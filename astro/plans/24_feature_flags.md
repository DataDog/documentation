# Feature flags on Astro (OpenFeature)

## Prompt

Speculative — write this plan, but don't implement it unless we decide we need it.
Ask AI appears to be rolled out to 100% of users, so the `docs-ai-enabled` kill
switch may not be worth reproducing on Astro at all. This plan exists so the work is
scoped if we change our minds, or if Astro grows other flags.

Hugo resolves flags through
[`helpers/feature-flags.js`](../../hugo/assets/scripts/helpers/feature-flags.js):
`@openfeature/web-sdk` plus the `@datadog/openfeature-browser` provider, initialized
once per page against a memoized promise, with the RUM session ID as the targeting
key and exposure logging on. There is exactly one flag today, `docs-ai-enabled`, a
boolean kill switch defaulting to `true`, consumed by the Ask AI widget and the
searchbar's "Ask AI about…" row.

Astro has no equivalent. Build one, owned by the host rather than by any single
component, so future flags have somewhere to live.

This plan is downstream of [23_ask_ai.md](23_ask_ai.md), which deliberately does
*not* bundle OpenFeature: the Ask AI package accepts an injected flag resolver and
defaults to enabled when no resolver is supplied. Astro passes nothing until this
plan lands. Implementing this plan means supplying that resolver from the Astro host.

### Resolved: no external dependency

An earlier draft of this plan flagged a likely blocker. `DatadogProvider` is
configured with an `applicationId`, and Datadog feature flags are scoped per
application and environment — so if Astro had reported to a new RUM application,
`docs-ai-enabled` would probably not have resolved against it and would have fallen
back to its `true` default: a silently inert kill switch, requiring a decision from
the flag's owner before this plan could be implemented.

[22_add_rum.md](22_add_rum.md) now has Astro **share Hugo's RUM application**,
distinguishing the two sites by a `stack: 'astro'` global context property instead.
Removing this blocker was one of the reasons for that decision. Astro's provider
therefore uses the same `applicationId` as Hugo's, and `docs-ai-enabled` resolves
identically on both sites with no flag-configuration change and no owner sign-off.

What remains is only the wiring described below.

### Note: the kill switch is asymmetric until this plan ships

While Hugo and Astro run side by side, `docs-ai-enabled` governs Hugo only. Hugo
passes a resolver backed by its existing `helpers/feature-flags.js`, so its kill
switch behaves exactly as it does today. Astro passes no resolver, so the Ask AI
package falls back to its `true` default there.

Note the cause: the flag *would* resolve correctly on Astro now that it shares
Hugo's RUM application. Nothing external is missing — the asymmetry is purely that
Astro has no resolver wired up yet. That makes it cheap to fix if the kill switch
is ever needed before this plan ships, which is a better position than the earlier
design left us in.

The practical consequence: flipping the flag off disables Ask AI across Hugo but
leaves it live on Astro's `/api` pages. This was accepted deliberately — Ask AI is
rolled out to 100% of users, and the flag is a rarely-used kill switch. If it ever
needs to be pulled during that window, Astro requires a separate action.

Because that asymmetry is invisible from either site — nothing errors, nothing
warns, and the Datadog UI shows the flag as configured — plan 23 should leave a
`TODO` at the Astro mount site where the resolver would be passed. Otherwise the
only record of it is this document, and the person reaching for the kill switch
during an incident is not reading plans:

```ts
// TODO: no flag resolver is passed here, so `docs-ai-enabled` does not govern
// Astro — the package falls back to its `true` default. Flipping the flag off
// disables Ask AI on Hugo only. Supply a resolver once plans/24_feature_flags.md
// lands, or if the kill switch is ever needed on Astro before then.
```

## Claude's plan

### Confirmed decisions

| Question | Decision |
| --- | --- |
| Ownership | **The host owns flags**, not the Ask AI package. Option C from the design discussion, chosen so a second flag has somewhere to live that is not inside one component's package. |
| Library | **`@openfeature/web-sdk` + `@datadog/openfeature-browser`**, matching Hugo. One provider, one vendor. |
| Credentials | **Reuse `src/config/telemetry.ts`.** Its `applicationId` / `clientToken` are exactly what `DatadogProvider` needs, and they are already the same values Hugo's provider uses. No second table. |
| Initialization | **One memoized promise**, module-scoped, mirroring Hugo's `feature-flags.js`. Repeated callers share one provider and one exposure stream. |
| Targeting key | **RUM session ID**, falling back to `crypto.randomUUID()`. Same as Hugo. |
| Exposure logging | **On** (`enableExposureLogging: true`), matching Hugo. |
| Development env | **Mapped to `preview`**, as Hugo does. Development has no `applicationId`, so without the mapping flags cannot resolve locally at all. |
| Failure behavior | **Return `null`, log a warning, let every read fall back to its default.** A flag-service outage must not take Ask AI down. |
| Astro delivery | A bundled `<script>`-carrying component, ordered **after** `<Telemetry />` so the session ID exists when the targeting key is read. |
| Scope of this plan | **Astro only.** Hugo's `helpers/feature-flags.js` is untouched, including by [25_migrate_hugo_to_ask_ai_package.md](25_migrate_hugo_to_ask_ai_package.md). |

### Core idea

This is a small plan pretending to be a large one. The whole deliverable is a port of
Hugo's 56-line `feature-flags.js`, minus the ten lines of `fetchDatadogUserStatus()`
that [22_add_rum.md](22_add_rum.md) already duplicated into
`src/lib/telemetry/datadogUserStatus.ts`, plus one line at the Ask AI mount site.

What makes it worth a plan at all is not the code, it is two orderings and one absent
default:

- **RUM must initialize before the targeting key is read**, or every page load buckets
  the visitor under a fresh random UUID and a percentage rollout becomes noise.
- **The provider must resolve before a read is trusted**, which the web SDK's
  fetch-then-read-synchronously shape handles — but the Ask AI package mounts
  optimistically *before* that resolution, so the flag arrives late by design.
- **Absent means enabled.** Every layer defaults permissive: no resolver means enabled,
  a failed provider means enabled, an unknown flag means enabled. A kill switch that
  fails closed would take the feature down on a flag-service outage.

Structurally it mirrors the telemetry work: one pure-ish module with the logic, one
thin component that touches `window`.

### Steps summary

| Step | What it does | Why it is separate |
| --- | --- | --- |
| 1. Dependencies | Adds the two OpenFeature packages. | Two new runtime deps on a site that ships very little JS; worth its own line in the diff. |
| 2. Flag resolution module | The memoized provider setup and the typed read helpers. | The only part with logic, and therefore the only part a unit test can reach. |
| 3. Flag keys | One module naming `docs-ai-enabled` and its default. | So the string exists once. Hugo exports it from the widget, which is backwards. |
| 4. Entry point | The component that kicks off initialization, ordered after `<Telemetry />`. | The ordering *is* the step. Everything else works and quietly buckets wrong. |
| 5. Supply the resolver to Ask AI | Pass `isEnabled` at the mount site and delete the `TODO`. | The only user-visible change in the plan. Everything above is inert without it. |

### 1. Dependencies

```
@openfeature/web-sdk
@datadog/openfeature-browser
```

Hugo pins `^1.7.2` and `^0.3.1`. Match those majors so both sites resolve the same flag
against the same provider version — a provider disagreement between hosts would be
invisible until the switch was thrown. Note the Datadog provider is pre-1.0, so treat
its minor bumps as breaking.

### 2. Flag resolution (`src/lib/flags/featureFlags.ts`)

```ts
export function initializeFeatureFlags(): Promise<Client | null>;
export function getBooleanFlag(client: Client | null, key: string, fallback: boolean): boolean;
```

A port of Hugo's, with the differences all being things TypeScript forces:

- The memoized `clientPromise` is module-scoped, so N callers produce one provider.
  Same as Hugo, and the reason Hugo's two consumers do not double-log exposures.
- The env is resolved through `resolveSiteEnv(import.meta.env.PUBLIC_CI_ENV)` and then
  **mapped `development` → `preview`**, reproducing Hugo's
  `rawEnv === 'development' ? 'preview' : rawEnv`. Hugo's line carries a
  "remove once rollout is complete" TODO; carry that forward rather than silently
  keeping the mapping, but do keep it — development has no `applicationId`, so without
  it local flag resolution is impossible rather than merely unrepresentative.
- Credentials come from `getTelemetryConfig(env)`. `applicationId` is optional on
  `TelemetryCredentials`, so the guard Hugo writes as
  `if (!config?.ddClientToken || !config?.ddApplicationId)` becomes a real narrowing
  rather than a runtime check — which is the whole reason not to add a second
  credentials table.
- Hugo's unused `getStringFlag` is not ported. Add it when something needs it.

`getBooleanFlag` keeps Hugo's shape — `client?.getBooleanValue(key, fallback) ?? fallback`
— so a null client from a failed init is indistinguishable from a resolved default at
the call site. That is intentional: the caller should not be able to tell, because both
mean "use the default".

Do **not** read `document.documentElement.dataset.env` the way Hugo does. Astro has
`data-env` on `<html>` (plan 22, section 7) and it would work, but the build-time
constant is the authority everywhere else in Astro's client code and two sources for
one value is how they drift.

### 3. Flag keys (`src/lib/flags/keys.ts`)

```ts
export const DOCS_AI_ENABLED = { key: "docs-ai-enabled", default: true } as const;
```

One place, with the default beside the key so they cannot disagree between call sites.
Hugo exports `DOCS_AI_ENABLED_FLAG_KEY` from the Ask AI widget itself and
`searchbarHits.js` imports it from there — which is why Hugo's searchbar depends on the
widget module. Astro does not repeat that.

### 4. Entry point (`src/components/FeatureFlags/FeatureFlags.astro`)

A bundled `<script>` carrier following `Telemetry.astro`'s shape, rendered by
`BaseLayout` **after** `<Telemetry />`.

The ordering is the entire content of this step. Astro emits bundled scripts as
deferred modules that execute in document order, and `datadogRum.init()` is synchronous
within Telemetry's script, so a later script sees a session ID. Rendering
`<FeatureFlags />` before `<Telemetry />` would still work — and would silently bucket
every visitor under a random UUID. Comment the ordering at the render site, not just
here, since the failure is invisible and the fix is a one-line reorder.

Two things follow from that ordering:

- **In development there is no session ID**, because plan 22's env gate means RUM never
  initializes locally. The targeting key falls back to `crypto.randomUUID()`, so local
  flag evaluation is unbucketed. Same as Hugo, and acceptable, but it means percentage
  rollouts cannot be tested locally at all — only on preview.
- **Soft navigation does not re-run it**, since bundled scripts do not re-execute under
  `<ClientRouter />`. Correct: the provider should be set once per page load, and the
  memoized promise would no-op anyway.

The script calls `initializeFeatureFlags()` and does nothing with the result. It exists
to start the fetch early; consumers await the same memoized promise themselves.

### 5. Supply the resolver to Ask AI

At Astro's Ask AI mount site (`src/components/AskAi/AskAi.astro`, from
[23_ask_ai.md](23_ask_ai.md)), replace the `TODO` quoted above with:

```ts
mountAskAi({
  isEnabled: async () => {
    const client = await initializeFeatureFlags();
    return getBooleanFlag(client, DOCS_AI_ENABLED.key, DOCS_AI_ENABLED.default);
  },
  getIsDatadogUser: fetchDatadogUserStatus,
});
```

That is the whole integration. The package already implements the optimistic mount and
the teardown-on-false; this plan only supplies the boolean.

**Delete the `TODO` in the same commit.** It is the record of the asymmetry this plan
removes, and a stale one is worse than none — the next person reaching for the kill
switch during an incident would read it and conclude Astro is not covered when it is.

Astro's searchbar row (also from plan 23) is a second consumer: it should hide the
"Ask AI about …" row when the flag is off, the way `searchbarHits.js` does. It reads
the same memoized promise, so this adds no second provider — the thing the host-owned
design exists to guarantee.

### Files

| File | Change |
| --- | --- |
| `astro/package.json` | Add `@openfeature/web-sdk`, `@datadog/openfeature-browser` |
| `astro/src/lib/flags/featureFlags.ts` | New — memoized provider setup and read helpers |
| `astro/src/lib/flags/keys.ts` | New — `docs-ai-enabled` and its default |
| `astro/src/components/FeatureFlags/FeatureFlags.astro` | New — starts initialization, ordered after `<Telemetry />` |
| `astro/src/layouts/BaseLayout.astro` | Render `<FeatureFlags />` after `<Telemetry />` |
| `astro/src/components/AskAi/AskAi.astro` | Pass `isEnabled`; delete the asymmetry `TODO` |
| `astro/src/components/SearchBar/SearchResultsPopup.tsx` | Hide the Ask AI row when the flag is off |

### Testing (red → green)

Unit (`vitest`), written first and verified failing. The provider is mocked throughout
— none of these should reach the network:

- `featureFlags.unit.test.ts` — `initializeFeatureFlags()` called three times sets one
  provider (the assertion that the memoization holds, and therefore that exposures are
  not duplicated); returns `null` and warns when `applicationId` is absent; returns
  `null` rather than throwing when `setProviderAndWait` rejects; passes the RUM session
  ID as `targetingKey` when `window.DD_RUM.getInternalContext()` supplies one, and a
  UUID when it does not; resolves `development` to the `preview` credentials.
- `getBooleanFlag` — returns the client's value when there is one, the fallback for a
  `null` client, and the fallback for an unknown key.

Browser (`playwright`), covering what unit tests cannot:

- The Ask AI widget is present with no flag configuration reachable — the
  fail-open default, which is the behavior that matters during an outage and the one
  most likely to regress silently.
- Zero console errors on a page where the provider cannot initialize. Development is
  exactly that page, since flags resolve against preview credentials from a localhost
  origin.

The flag actually being *off* is not automatable here — it needs a real flag change in
Datadog, which is verification section C.

### TODOs to leave in the code

| Location | TODO | Kind |
| --- | --- | --- |
| `src/lib/flags/featureFlags.ts`, the env mapping | `development` → `preview` is carried over from Hugo's own "remove once Feature Flag Rollout is complete" TODO. Reproduced deliberately; drop it when Hugo's goes. | Dies with Hugo |
| `src/lib/flags/featureFlags.ts` | Deliberate duplicate of Hugo's `helpers/feature-flags.js`, which stays in place for the searchbar. Cross-reference the twin so a change to one is not made blind to the other. | Dies with Hugo |
| `src/lib/flags/keys.ts` | `docs-ai-enabled` is the only flag, and it is a kill switch at 100% rollout. If it is retired without a replacement, this whole module goes with it — see verification G. | Permanent |

### Risks and open questions

- **This plan may not be worth implementing.** Stated in the prompt and still true: Ask
  AI is at 100% rollout, the flag is a kill switch nobody has needed, and the fail-open
  default means the only scenario this plan improves is one where someone deliberately
  turns Ask AI off. Verification section G is the decision point, and "revert it" is a
  legitimate outcome.
- **One switch now governs two sites.** The upside of sharing Hugo's RUM application.
  Testing the flag on Astro's preview also disables Ask AI on Hugo's preview for
  whoever is targeted — called out in verification C, and worth telling the flag's
  owner before the first test rather than after.
- **Two OpenFeature registries on one origin** is the untested configuration. Hugo's
  bundle and Astro's bundle each carry their own module instance, so a visitor moving
  between the two sites within a session initializes two providers and produces two
  exposure records. Not a correctness problem for a boolean, but it means exposure
  counts on a shared application are not visitor counts. Nothing in this plan can fix
  it while both sites exist.
- **The targeting-key ordering fails silently.** If `<FeatureFlags />` ever renders
  before `<Telemetry />`, or if RUM's init becomes async, every visitor gets a fresh
  UUID and bucketing breaks with no error. The unit test covers the fallback path but
  cannot cover the ordering; verification B is the only real check.
- **Bundle weight, again.** Two more packages on top of plan 22's two SDKs and plan
  23's widget. Deferred, so off the critical path, but the cumulative JS on a page that
  used to ship almost none is now worth measuring once rather than assuming.
- **Exposure logging on a kill switch is cost without benefit.** It exists for
  experiment analysis, and there is no experiment. It matches Hugo, which is the reason
  to keep it, but if exposure volume ever matters it is the first thing to turn off.

## Manual verification

A kill switch that has never been tested is not a kill switch. The point of these
steps is to prove the flag actually reaches Astro and actually tears the widget down
— the failure mode this plan exists to prevent is a flag that resolves to its `true`
default forever and looks fine right up until someone needs it.

Do all of this on a **preview** deploy before touching anything on live.

### A. The provider resolves at all

On a preview page, in the browser console:

| Check | Expected |
| --- | --- |
| Network tab during load | A request to the Datadog flag-config endpoint |
| Console | No `[Flags] Missing Datadog config` or initialization warnings |
| Flag evaluation returns | `true` (the flag's real value, not merely its default) |

Distinguishing a real `true` from a defaulted `true` is the crux — see C.

### B. Targeting key

Confirm the targeting key is the RUM session ID rather than a random UUID, since a
random key per page load would make percentage rollouts behave incoherently. In the
console, compare the key used for flag evaluation against
`window.DD_RUM.getInternalContext().session_id`. They should match, and both should
be stable across a soft navigation.

This depends on RUM initializing before flags are evaluated. If the key is a UUID
instead, that ordering is wrong.

### C. The flag actually controls Astro (the critical test)

Sharing Hugo's RUM application means the flag should resolve on Astro with no
configuration change. That makes this test cheaper than it would have been — but not
optional, because a flag that resolves is not the same as a flag that is wired to
anything.

**Warning: this test affects Hugo too.** One application and one flag now means one
kill switch governing both sites. Flipping `docs-ai-enabled` off to test Astro will
also disable Ask AI on Hugo for whoever is targeted. Scope the change to the preview
environment, and do not run this against live.

1. In Datadog, set `docs-ai-enabled` to **false** for the preview environment.
2. Hard-reload the Astro preview page.
3. The widget must **disappear**: the floating button is gone, the panel is not in
   the DOM, and the searchbar's "Ask AI about …" row is absent.
4. Confirm the teardown is clean — no layout shift beyond the button vanishing, no
   console errors, no orphaned nodes left in `document.body`.
5. Set the flag back to **true**, reload, and confirm the widget returns.

If step 3 shows no change, the flag is not reaching Astro's widget — the resolver is
not wired to the package, or the package is ignoring it. Invisible from the Datadog
UI alone, which will show the flag as correctly configured and, now that the
application is shared, correctly resolving.

6. **Confirm the blast radius while the flag is off.** Load a Hugo preview page in
   the same state and confirm its widget is *also* gone. This is expected, and
   confirming it is how you learn the switch is genuinely global rather than
   accidentally half-connected.

### D. Optimistic mount

The widget mounts assuming the flag is on, then tears down if it resolves false. With
the flag set to false, throttle the network to Slow 3G and reload. You should see the
button appear briefly and then be removed. Confirm this reads as acceptable rather
than as a glitch — that tradeoff is documented in the Hugo implementation and is
being inherited deliberately.

Also confirm the fallback: block the flag-config request entirely in devtools. The
widget must stay **up**, since the default is `true` and a flag service outage must
not take Ask AI down.

### E. Exposure logging

Confirm exposure events appear, scoped with `@context.stack:astro` since Hugo's
exposures land in the same application — an unscoped query will show Hugo's and look
like success.

Then confirm a single Astro page load produces **one** exposure per flag evaluation
rather than duplicates. Duplicates would indicate more than one provider was
initialized, which is the specific problem that choosing host-injected flags
(option C) was meant to avoid.

### F. Hugo still behaves as before

This plan does not modify Hugo's code, but it now shares an application and a flag
with it, so "untouched" needs checking rather than assuming:

- Hugo still initializes exactly one provider, and its exposures are unchanged in
  shape.
- Astro's provider initialization does not interfere with Hugo's within a session
  that visits both sites — load a Hugo page, navigate to `/api`, and confirm both
  resolve the flag and neither logs a provider error or an "already initialized"
  warning. Two OpenFeature registries in two separately-bundled apps on one origin
  is the untested configuration here.
- Flag changes affect both sites together. Already covered in C, and restated here
  because it is a behavior change from the pre-Astro world worth communicating to
  whoever might flip this switch.

### G. Then decide whether to keep it

Given Ask AI is at 100% rollout, run one final check before adopting this
permanently: with the flag on and everything working, confirm that anyone who would
need to flip it in an incident knows where it lives and that the Astro side responds.
An untested kill switch is worse than none, because it invites false confidence.
