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

### Known external dependency

`DatadogProvider` is configured with an `applicationId`, and Datadog feature flags
are scoped per application and environment. If [22_add_rum.md](22_add_rum.md) gives
Astro a new RUM application, `docs-ai-enabled` likely won't resolve against it and
will fall back to its `true` default — a silently inert kill switch. Before
implementing, confirm with the flag's owner whether the flag should be extended to
the new application, or whether the provider should keep using Hugo's application ID
even when RUM does not.

### Note: the kill switch is asymmetric until this plan ships

While Hugo and Astro run side by side, `docs-ai-enabled` governs Hugo only. Hugo
passes a resolver backed by its existing `helpers/feature-flags.js`, so its kill
switch behaves exactly as it does today. Astro passes no resolver, so the Ask AI
package falls back to its `true` default there.

The practical consequence: flipping the flag off disables Ask AI across Hugo but
leaves it live on Astro's `/api` pages. This was accepted deliberately — Ask AI is
rolled out to 100% of users, and the flag is a rarely-used kill switch. If it ever
needs to be pulled during that window, Astro requires a separate action.

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

The whole risk is that `docs-ai-enabled` is scoped to Hugo's RUM application and
silently does not resolve for Astro's.

1. In Datadog, set `docs-ai-enabled` to **false**, targeted at the Astro application
   and preview environment.
2. Hard-reload the Astro preview page.
3. The widget must **disappear**: the floating button is gone, the panel is not in
   the DOM, and the searchbar's "Ask AI about …" row is absent.
4. Confirm the teardown is clean — no layout shift beyond the button vanishing, no
   console errors, no orphaned nodes left in `document.body`.
5. Set the flag back to **true**, reload, and confirm the widget returns.

If step 3 shows no change, the flag is not reaching Astro. That is the exact defect
this verification exists to catch, and it is invisible from the Datadog UI alone —
the flag will look correctly configured.

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

If exposure logging is enabled, confirm exposure events appear for the Astro
application, and — importantly — that a single page load produces **one** exposure
per flag evaluation rather than duplicates. Duplicates would indicate more than one
provider was initialized, which is the specific problem that choosing host-injected
flags (option C) was meant to avoid.

### F. Hugo is untouched

This plan does not modify Hugo. Confirm on a Hugo page in the same deploy:

- Toggling the flag still controls the Hugo widget and searchbar row as before.
- Hugo still initializes exactly one provider.

### G. Then decide whether to keep it

Given Ask AI is at 100% rollout, run one final check before adopting this
permanently: with the flag on and everything working, confirm that anyone who would
need to flip it in an incident knows where it lives and that the Astro side responds.
An untested kill switch is worse than none, because it invites false confidence.
