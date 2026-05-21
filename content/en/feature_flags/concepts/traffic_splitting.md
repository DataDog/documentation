---
title: Traffic Splitting and Randomization
description: Learn how Datadog Feature Flags use deterministic randomization for percentage-based rollouts.
further_reading:
- link: "/feature_flags/concepts/targeting_rules"
  tag: "Documentation"
  text: "Targeting Rules and Filters"
- link: "/feature_flags/use_cases/progressive_rollouts"
  tag: "Documentation"
  text: "Progressive Rollouts and Canaries"
---

## Overview

When you define a targeting rule, you can serve a variant to a percentage of subjects that match your targeting filter. Datadog uses **deterministic randomization** based on the `targetingKey` in your evaluation context so the same subject consistently receives the same variant for a given flag.

## Percentage rollouts

In the **Targeting Rules & Rollouts** section, set the percentage of the audience that should receive each variant. For example, you might serve `true` to 30% of subjects matching your filter.

{{< img src="getting_started/feature_flags/ff-targeting-rules-and-rollouts.png" alt="Targeting rule with percentage rollout configured" style="width:100%;" >}}

## How randomization works

When evaluating a flag, Datadog hashes the flag key and the `targetingKey` from your evaluation context to generate a value between 0 and 10000. That value determines whether the subject falls into the rollout percentage.

For example, if you serve `true` to 30% of subjects:

1. Compute a hash from the flag key and `targetingKey`.
2. Map the hash to a value between 0 and 10000.
3. If the value is less than or equal to 3000, serve `true`.
4. Otherwise, pass through to the next targeting rule.

This approach provides **deterministic** randomization: if you increase the percentage from 30% to 50%, subjects who were already in the 30% group remain in the treatment group.

### Example

{{< programming-lang-wrapper langs="javascript,python,go" >}}

{{< programming-lang lang="javascript" >}}

```javascript
await OpenFeature.setContext({
  targetingKey: 'user-123', // Used for percentage rollouts
  user_id: 'user-123',
});
```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

```python
eval_ctx = EvaluationContext(
    targeting_key="user-123",  # Used for percentage rollouts
    attributes={"user_id": "user-123"},
)
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```go
evalCtx := openfeature.NewEvaluationContext(
    "user-123", // Used for percentage rollouts
    map[string]interface{}{"user_id": "user-123"},
)
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

<div class="alert alert-info">The <code>targetingKey</code> is the randomization subject for percentage-based targeting. Subjects with the same <code>targetingKey</code> always receive the same variant for a given flag.</div>

## Multiple variants

You can randomize across multiple variants in a single targeting rule. Datadog distributes subjects across variants according to the percentages you configure.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
