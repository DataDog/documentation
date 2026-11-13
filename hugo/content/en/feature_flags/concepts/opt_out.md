---
title: Flag Evaluation and Experimentation Opt-Out
description: Understand subject-level controls for flag evaluation telemetry and experiment participation in client and server applications.
further_reading:
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side Feature Flags"
- link: "/feature_flags/concepts/experiments/"
  tag: "Documentation"
  text: "Feature Flags and Experiments"
- link: "/feature_flags/concepts/evaluation_context/"
  tag: "Documentation"
  text: "Evaluation Context"
---

## Overview

Applications can have separate preferences for flag evaluation telemetry collection and experiment participation. Flag evaluation opt-out controls the collection of flag evaluation data. Experimentation opt-out controls which experiment allocations can assign variants to a subject.

These controls are independent. Suppressing flag evaluation telemetry does not exclude a subject from experiments. Excluding a subject from experiments does not suppress flag evaluation telemetry.

This page describes the shared concepts for client and server SDK integrations. Support, configuration names, and context update behavior depend on the SDK and version. Check the SDK support tables below before using a control. Each SDK guide provides configuration and examples.

## SDK support

### Client SDKs

The controls have different minimum SDK versions:

| SDK | Flag evaluation telemetry opt-out | Experimentation opt-out |
| --- | --- | --- |
| [Browser][2] (`@datadog/openfeature-browser`) | `2.2.0` | `2.2.0` |
| [iOS][4] (`DatadogFlags`) | `3.21.0` | `3.22.0` |
| [Android][5] (`dd-sdk-android-flags` and `dd-sdk-android-flags-openfeature`) | `3.16.0` | `3.17.0` |

Use Android Flags and OpenFeature artifacts from the same release. Precomputed experimentation opt-out also requires delivery-service support for the selected policy.

### Server SDKs

| SDK | Flag evaluation telemetry opt-out | Experimentation opt-out |
| --- | --- | --- |
| [Go][6] (`dd-trace-go/v2`) | `2.12.0` | `2.12.0` |
| [Java][7] (`dd-openfeature`) | `1.68.0` | `1.69.0` (planned; unreleased) |
| [Ruby][8] (`datadog`) | `2.47.0` | `2.49.0` (planned; unreleased) |

All three server SDKs support immediate and future-experiments-only modes in the listed versions. Planned entries describe upcoming support. Use a published release containing the control before enabling it.

The SDK APIs use the term *experimentation opt-out* for randomization opt-out. Configuration can also mark percentage rollouts and completed experiments that still randomize as eligible for exclusion. The control does not force a control variant.

## Choose a control

An *evaluation* reads a flag value. An *exposure* records the experiment variant served to a subject. An *allocation* defines how targeting rules assign flag variants.

| Goal | Control | Effect on flag values | Effect on experiment exposures |
| --- | --- | --- | --- |
| Suppress flag evaluation telemetry for a subject | Flag evaluation opt-out | The control does not override flag values. | Exposures remain enabled. |
| Withdraw a subject from experiment allocations | Immediate experimentation opt-out | Skip experiment allocations and continue through ordinary feature allocations. | Skipped allocations do not produce exposures. |
| Exclude experiment allocations activated at or after a subject's preference timestamp | Future-experiments-only opt-out | Earlier experiment allocations remain eligible; skip later allocations. | Eligible earlier allocations can still produce exposures. |

Use both controls if the application requires both behaviors. Do not use exposure logging settings as a substitute for experimentation opt-out. Disabling exposure logging stops exposure records but does not prevent experiment assignment.

## Flag evaluation opt-out

Subject-level flag evaluation opt-out requires explicit SDK activation. Browser, iOS, and OpenFeature integrations use Boolean `true` in the `dd_evaluation_telemetry_opt_out` evaluation context attribute. Missing attributes, `false`, and other types do not activate suppression. For example, the string `'true'` is not Boolean `true`.

For the native Android client, use `setEvaluationTelemetryOptOut(true)`. Its targeting context contains strings, so a string context attribute cannot activate telemetry suppression.

The control suppresses new evaluation events, aggregated evaluation counts, evaluation metrics, and automatic RUM or trace span annotations where the SDK provides them. It does not suppress exposures or change experiment eligibility. It does not remove queued events or existing RUM annotations.

The control itself does not change targeting or flag values. If targeting rules use the opt-out attribute, changing its value can change assignments. Context refresh behavior depends on the SDK.

To resume flag evaluation telemetry, set the attribute to `false` or remove it through the SDK's context update API. For native Android, call `setEvaluationTelemetryOptOut(false)`. Preserve the subject identifier and other targeting attributes.

### Client-wide telemetry settings

Client-wide settings determine which telemetry integrations run for the client. Subject-level opt-out selectively suppresses flag evaluation telemetry for a subject. It does not enable an integration that the application disabled.

For example, disabling aggregated evaluation tracking for the client stops those counts for every subject. Subject-level flag evaluation opt-out leaves tracking available for subjects who have not opted out.

See [Telemetry options by platform][3] for client-wide settings.

## Experimentation opt-out modes

The application selects an experimentation policy and stores each subject's preference timestamp. The `dd_experimentation_opt_out_at` context attribute carries that timestamp. Omit the attribute for subjects who have not opted out.

| Mode | Behavior |
| --- | --- |
| Disabled | Ignore the opt-out attribute. |
| Immediate | Skip every allocation that logs experiment exposures when a valid preference timestamp is present. |
| Future experiments only | Keep exposure-logging allocations activated strictly before the preference timestamp. Skip allocations activated at or after it, or without activation metadata. |

The policy applies to control variants, treatment variants, and 100% experiment allocations. Browser holdouts use the same policy. Evaluation continues through ordinary feature allocations in their existing order. If none match, the SDK returns the application default.

### Immediate withdrawal

Immediate mode excludes the subject as soon as the SDK applies the preference. It does not wait until the timestamp. A valid future timestamp also causes immediate exclusion.

A subject who already received an experiment variant can receive a different value after withdrawal. Account for this change when interpreting experiment results. Opt-out does not delete previous exposures or rewrite experiment history.

### Future experiments only

This mode compares the allocation's activation time with the subject's preference timestamp. It does not check whether the subject previously enrolled.

For example, a subject opts out at `2026-10-19T12:00:00Z`:

- An allocation activated at `2026-10-18T12:00:00Z` remains eligible, even if the subject has never received it.
- An allocation activated exactly at `2026-10-19T12:00:00Z` is excluded.
- An allocation activated after that time is excluded.
- An allocation without activation metadata is excluded.

The cutoff applies immediately. A future cutoff permits allocations activated before that cutoff; it does not schedule a future preference change.

### Store and update the preference

Store the timestamp when the subject makes the preference decision. Reuse that timestamp across application restarts and clients that share the preference. Generating a new timestamp at each initialization changes which experiments remain eligible in future-experiments-only mode.

Use a timestamp with a timezone, such as `2026-10-19T12:00:00Z`. Follow the SDK's timestamp validation requirements. Do not use Boolean values or an empty string for this attribute.

Keep the subject identifier, such as `targetingKey`, unchanged when updating the preference. To permit experimentation again, remove the timestamp attribute through the SDK's context update API.

For precomputed assignments, the delivery service must support the selected policy. The client must obtain assignments for the updated context. Check the SDK guide for refresh, cache, and error behavior before choosing application default values.

### Server request contexts

Configure the provider before initialization. Then supply the subject's preferences in each evaluation's context. Use a request-local context when the SDK supports one. Do not replace a shared global context for individual requests.

In server SDKs, these deployment settings activate support independently:

```bash
export DD_FEATURE_FLAGS_EVALUATION_TELEMETRY_PER_SUBJECT_OPT_OUT_ENABLED=true
export DD_FEATURE_FLAGS_EXPERIMENTATION_OPT_OUT_MODE=immediate
```

The first setting enables the Boolean telemetry attribute; it does not suppress telemetry for every subject. The second selects the experimentation policy. Both controls default to disabled. Explicit provider options take precedence where available.

For each subject who opts out, supply Boolean `true` and the stored timestamp in the corresponding context attributes. To resume telemetry, supply Boolean `false` or remove the attribute from its owning context layer. To permit experimentation again, remove the timestamp from its owning context layer. Omitting an attribute from one evaluation does not remove an inherited value. Do not send `null` or an empty string as an opt-in value.

After configuration is ready, enabled experimentation modes reject malformed timestamps with an invalid-context error and return the application's default. Disabled mode ignores the timestamp attribute. Only SDKs with future-experiments-only support accept `future_experiments_only`.

## Scope of these controls

These controls do not replace the application's consent system. The application owns preference collection, storage, and propagation to each client.

Assignment requests and permitted exposures can still contain subject data. Neither control disables unrelated application telemetry or customer-defined hooks. Configure other SDK integrations separately when the application requires broader collection controls.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/client/
[2]: /feature_flags/client/javascript/#control-flag-evaluation-telemetry-and-experiment-participation
[3]: /feature_flags/client/#telemetry-options-by-platform

[4]: /feature_flags/client/ios/#control-flag-evaluation-telemetry-and-experiment-participation
[5]: /feature_flags/client/android/#control-flag-evaluation-telemetry-and-experiment-participation

[6]: /feature_flags/server/go/#control-flag-evaluation-telemetry-and-experiment-participation
[7]: /feature_flags/server/java/#control-flag-evaluation-telemetry-and-experiment-participation
[8]: /feature_flags/server/ruby/#control-flag-evaluation-telemetry-and-experiment-participation
