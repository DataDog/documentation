---
title: Evaluation Context
description: Learn how Datadog Feature Flags uses evaluation context and the targeting key to evaluate flags for a subject.
further_reading:
- link: "/feature_flags/concepts/targeting_rules"
  tag: "Documentation"
  text: "Targeting Rules and Filters"
- link: "/feature_flags/concepts/traffic_splitting"
  tag: "Documentation"
  text: "Traffic Splitting and Randomization"
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side SDKs"
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Server-Side SDKs"
---

## Overview

An **evaluation context** is the set of attributes an SDK passes to Datadog when it evaluates a flag. Datadog Feature Flags uses [OpenFeature][1]'s evaluation context: a flat map of attributes describing the subject being evaluated, such as a user, session, or device. [Targeting rules][2] and [percentage rollouts][3] read these attributes to decide which variant a subject receives.

Without an evaluation context, the SDK can still evaluate Boolean on/off flags. It cannot match targeting rules that filter on subject attributes, or produce a consistent rollout assignment for that subject.

## The targeting key

The `targetingKey` is the primary identifier in an evaluation context. It's typically a user ID, session ID, or device ID. Datadog uses the `targetingKey` for [deterministic randomization][3], so the same subject consistently receives the same variant for a flag.

Use a stable, consistent identifier for the same subject across sessions. For logged-out or anonymous subjects, use a persistent identifier, such as a UUID stored in local storage or `SharedPreferences`, instead of omitting the `targetingKey` or regenerating it each session.

## Context attributes

Beyond the `targetingKey`, an evaluation context can include any number of additional attributes, such as `user_role`, `country`, or `tier`. Reference these attributes in targeting rule [filters][2] to control who sees each variant.

<div class="alert alert-warning">Datadog Feature Flags requires evaluation context attributes to be flat primitive values: strings, numbers, and Booleans. Nested objects and arrays are not supported and can cause exposure data to be dropped.</div>

### Example evaluation context

{{< programming-lang-wrapper langs="javascript,python,go" >}}

{{< programming-lang lang="javascript" >}}

```javascript
const evaluationContext = {
  targetingKey: 'user-123',
  user_id: 'user-123',
  user_role: 'admin',
  country: 'US',
  tier: 'premium',
};
```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

```python
from openfeature.evaluation_context import EvaluationContext

eval_ctx = EvaluationContext(
    targeting_key="user-123",
    attributes={
        "user_id": "user-123",
        "user_role": "admin",
        "country": "US",
        "tier": "premium",
    },
)
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```go
evalCtx := openfeature.NewEvaluationContext(
    "user-123",
    map[string]interface{}{
        "user_id":   "user-123",
        "user_role": "admin",
        "country":   "US",
        "tier":      "premium",
    },
)
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Client-side vs. server-side context

Client and server SDKs set the evaluation context differently:

- **Client-side SDKs** hold a single global evaluation context for the SDK instance. Set it once during initialization, then call `OpenFeature.setContext()` to update it when subject attributes change, such as after a user logs in. All subsequent flag evaluations use the updated context.
- **Server-side SDKs** don't hold a global context. Build an evaluation context for each incoming request, based on the current user or session, and pass it explicitly to every flag evaluation call for that request. Reuse the same context object across evaluations within a request, and only rebuild it if subject attributes change.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/docs/reference/concepts/evaluation-context
[2]: /feature_flags/concepts/targeting_rules/
[3]: /feature_flags/concepts/traffic_splitting/
