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
