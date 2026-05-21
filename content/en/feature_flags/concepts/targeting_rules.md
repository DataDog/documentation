---
title: Targeting Rules and Filters
description: Learn how targeting rules, filters, and rollout types control which variants your application serves.
further_reading:
- link: "/feature_flags/concepts/traffic_splitting"
  tag: "Documentation"
  text: "Traffic Splitting and Randomization"
- link: "/feature_flags/concepts/environments"
  tag: "Documentation"
  text: "Environments"
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side SDKs"
---

## Overview

Targeting rules define which variant to serve to which subjects. Each rule can include a filter, one or more variants, and an optional percentage rollout. Rules are evaluated in order until a match is found.

## Targeting rule types

Datadog supports different targeting rule types depending on your rollout strategy:

| Type | Description |
|------|-------------|
| **Feature gate** | Roll out immediately to a percentage of subjects matching your filter (randomized or not) |
| **Progressive rollout** | Randomized rollout over a schedule with multiple steps. See [Progressive Rollouts & Canaries](/feature_flags/use_cases/progressive_rollouts/) |
| **Experiment** | Randomized allocation associated with an experiment |

## Configure targeting rules

To configure targeting rules for a flag:

1. Navigate to **Feature Flags** and select your flag.
2. Select the environment whose rules you want to modify.
3. Click **Edit Targeting Rules**.

For each targeting rule:

1. **Define a filter** (optional): If you do not define a filter, the rule matches all subjects in that environment.
2. **Select variant(s)**: Choose which variant(s) to serve to matching subjects.
3. **Set the audience percentage** (optional): Serve the variant to a percentage of matching subjects. See [Traffic Splitting and Randomization](/feature_flags/concepts/traffic_splitting/).

{{< img src="getting_started/feature_flags/ff-targeting-rules-and-rollouts.png" alt="Targeting Rules and Rollouts section on a feature flag" style="width:100%;" >}}

## Filters and evaluation context

Filters use attributes from your SDK's **evaluation context**. Define attributes when you set the evaluation context before evaluating flags. Attributes must be flat primitive values (strings, numbers, booleans). Nested objects and arrays are not supported.

### Example evaluation contexts

Given the following evaluation context, you can construct filters such as `country == "US"`, `tier == "premium"`, or `user_role == "admin"`:

{{< programming-lang-wrapper langs="javascript,python,go" >}}

{{< programming-lang lang="javascript" >}}

```javascript
await OpenFeature.setContext({
  targetingKey: 'user-123',
  user_id: 'user-123',
  user_role: 'admin',
  email: 'user@example.com',
  country: 'US',
  tier: 'premium',
});
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
        "email": "user@example.com",
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
        "email":     "user@example.com",
        "country":   "US",
        "tier":      "premium",
    },
)
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

**Note**: Other SDKs follow the same pattern. See your platform's [client](/feature_flags/client/) or [server](/feature_flags/server/) SDK documentation for evaluation context setup.

## Rule hierarchy

Targeting rules are evaluated **in order** from top to bottom:

1. The SDK evaluates the first rule. If the subject matches the filter (or no filter is defined), the rule may serve a variant.
2. If the subject does not match, evaluation passes through to the next rule.
3. If no rule matches, the SDK serves the **default variant** for that environment.

## When targeting rules apply

Targeting rules are evaluated only when **both** of the following are true:

- The flag is **enabled** in the given environment.
- The flag is **not overridden** with a fixed variant in that environment.

If a feature flag is overridden with a variant in the environment, SDKs ignore all targeting rules and return the overridden variant.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
