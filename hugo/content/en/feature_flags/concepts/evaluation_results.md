---
title: Flag Evaluation Results
description: Understand the values and evaluation details returned by Datadog Feature Flags SDKs.
further_reading:
- link: "/feature_flags/concepts/evaluation_context"
  tag: "Documentation"
  text: "Evaluation Context"
- link: "/feature_flags/concepts/targeting_rules"
  tag: "Documentation"
  text: "Targeting Rules and Filters"
- link: "/feature_flags/concepts/evaluation_tester"
  tag: "Documentation"
  text: "Evaluation Tester"
---

## Overview

Datadog Feature Flags SDKs use the [OpenFeature evaluation API][1]. Each flag evaluation requires your application to provide a default value. If the provider cannot resolve the flag, the SDK returns that value. Detailed evaluation methods also return information such as the resolved variant, resolution reason, and error code.

## Disabled flags

OpenFeature defines [`FLAG_NOT_FOUND`][3] for evaluations where the provider cannot find the requested flag in its available configuration. Datadog applies this condition to the runtime configuration delivered for the selected environment.

When you disable a flag in a Datadog environment, Datadog omits it from the runtime configuration delivered to client-side and server-side SDKs. The provider therefore cannot distinguish a disabled flag from an unknown flag key. Both conditions produce the following detailed evaluation result:

| Field | Result |
|---|---|
| Value | The default value supplied by your application |
| Reason | `ERROR` |
| Error code | `FLAG_NOT_FOUND` |
| Variant | None |

OpenFeature also defines [`DISABLED`][2] as a resolution reason for providers that receive a flag marked as disabled. Because Datadog providers do not receive disabled flags in Datadog-delivered runtime configurations, they return `FLAG_NOT_FOUND` instead of `DISABLED`.

The returned value is the default value from the evaluation call, not the default variant configured in Datadog. No Datadog variant is resolved for a disabled flag.

### Handle disabled flag results

- Provide a safe default value for every evaluation.
- Avoid writing an error log for every `FLAG_NOT_FOUND` result. Disabled flags can return this code during normal operation; aggregate, sample, or rate-limit these logs instead.
- If your application must distinguish an inactive flag from an unknown key, keep the flag enabled and serve an explicit control or off variant. Inspect the returned variant to identify that state.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/specification/sections/flag-evaluation/
[2]: https://openfeature.dev/specification/types/#resolution-reason
[3]: https://openfeature.dev/specification/types/#error-code
