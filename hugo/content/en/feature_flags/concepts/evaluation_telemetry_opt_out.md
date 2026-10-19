---
title: Per-Subject Evaluation Telemetry Opt-Out
description: Suppress new feature flag evaluation telemetry for selected users or devices without changing flag results or experiment exposures.
---

## Overview

Per-subject evaluation telemetry opt-out lets your application exclude selected users or devices from feature flag monitoring data. A **subject** is the user, account, or device identified by the evaluation context's targeting key.

Your application determines who opts out. For example, combine a user's preference with your own eligibility rules. Pass the resulting Boolean to the SDK. You do not need to send the underlying personal information solely for this decision.

## Availability

The examples describe upcoming SDK support. The options are not yet available in released SDK versions.

| SDK | Configuration and evaluation example |
| --- | --- |
| Browser JavaScript | [Browser example][1] |
| iOS, including the Swift OpenFeature provider | [iOS examples][2] |
| Android | [Android examples][3] |
| Dart and Flutter | [Dart and Flutter examples][4] |
| Go | [Go example][5] |
| Java | [Java example][6] |
| Node.js | [Node.js example][7] |
| Python | [Python example][8] |
| Ruby | [Ruby example][9] |
| PHP OpenFeature provider | [PHP example][10] |
| .NET | [.NET example][11] |

## Enable the control

1. Enable per-subject opt-out when you create the provider or flags client. Support is disabled by default.
2. Set `dd_evaluation_telemetry_opt_out` to Boolean `true` in the subject's evaluation context before evaluating flags.
3. Evaluate flags with the same methods as before.

Use the exact attribute name in every language. Do not rename or capitalize it to match a language's naming conventions. Android's direct `FlagsClient` API uses a typed setter instead of its string-valued context; see the [Android example][3].

| Support enabled | Attribute value | New evaluation telemetry |
| --- | --- | --- |
| No | Any value | Existing behavior |
| Yes | Boolean `true` | Suppressed |
| Yes | Boolean `false` or missing | Existing behavior |
| Yes | String `"true"`, number, null, or another non-Boolean value | Existing behavior |

Existing telemetry settings still apply. An opt-out value of `false` does not enable a telemetry channel that you disabled elsewhere.

### Server environment variable

Enable support before the application starts:

{{< code-block lang="shell" >}}
export DD_FEATURE_FLAGS_EVALUATION_TELEMETRY_PER_SUBJECT_OPT_OUT_ENABLED=true
{{< /code-block >}}

Then create the provider without an explicit opt-out option. The provider reads this setting when it is created. An explicit provider option overrides the environment variable, including an explicit `false`. The default is `false`.

This setting enables the context parameter. It does not opt out every subject. For concurrent server requests, supply each subject's decision in the per-evaluation context, not a shared global context.

## What the control changes

When a subject opts out, the SDK suppresses new evaluation events, evaluation counts or metrics, and automatic flag annotations on traces or RUM views. The affected channels depend on which telemetry the SDK supports and your application enables. These evaluations do not contribute to the affected flag monitoring charts.

The control does not change:

- Flag values, targeting, or application defaults.
- Experiment participation or experiment exposure events.
- Unrelated application, trace, or RUM data.
- Custom OpenFeature hooks or manually added annotations.
- Events already queued or sent, or annotations already recorded.

The opt-out attribute remains available to targeting rules and normal exposure reporting. If you write a targeting rule against it, that rule can change assignments. Suppression itself does not change assignments.

This control is not a general consent system or a deletion mechanism. Assignment requests and exposure events can still contain subject data. Configure other SDK consent controls and experimentation eligibility separately when your policy requires them.

## Update a subject's decision

Your application owns the decision and updates it when the subject or preference changes. Client SDKs use the current evaluation context; server SDKs use the context supplied for each evaluation. Set Boolean `false` to resume normal evaluation telemetry for that subject.

Supply the decision before the first evaluation that must honor it. Keep the subject's targeting key and other required attributes when replacing a client context.

[1]: /feature_flags/client/javascript/#per-subject-evaluation-telemetry-opt-out
[2]: /feature_flags/client/ios/#per-subject-evaluation-telemetry-opt-out
[3]: /feature_flags/client/android/#per-subject-evaluation-telemetry-opt-out
[4]: /feature_flags/client/flutter/#per-subject-evaluation-telemetry-opt-out
[5]: /feature_flags/server/go/#per-subject-evaluation-telemetry-opt-out
[6]: /feature_flags/server/java/#per-subject-evaluation-telemetry-opt-out
[7]: /feature_flags/server/nodejs/#per-subject-evaluation-telemetry-opt-out
[8]: /feature_flags/server/python/#per-subject-evaluation-telemetry-opt-out
[9]: /feature_flags/server/ruby/#per-subject-evaluation-telemetry-opt-out
[10]: /feature_flags/server/php/#per-subject-evaluation-telemetry-opt-out
[11]: /feature_flags/server/dotnet/#per-subject-evaluation-telemetry-opt-out
