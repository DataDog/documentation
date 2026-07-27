---
title: Traffic Splitting and Randomization
description: Learn how Datadog Feature Flags use deterministic randomization for percentage-based rollouts.
further_reading:
- link: "/feature_flags/concepts/targeting_rules"
  tag: "Documentation"
  text: "Targeting Rules and Filters"
---

## Overview

When you define a targeting rule, you can serve a variant to a percentage of subjects that match your targeting filter. Datadog uses **deterministic randomization** based on the `targetingKey` in your evaluation context so the same subject consistently receives the same variant for a given flag.

## Percentage rollouts

In the **Targeting Rules & Rollouts** section, set the percentage of the audience that should receive each variant. For a **single-variant** targeting rule, assign your desired traffic exposure to one variant. For example, roll out the **Free Shipping** variant of your promo banner to 50% of subjects matching your filter:

{{< img src="feature_flags/concepts/single-variant-traffic-exposure-2.png" alt="Targeting rule with a single-variant percentage rollout." style="width:75%;" >}}

For a **multi-variant** rollout, assign percentages across multiple variants in the same targeting rule by selecting **Serve > Split Traffic** when editing or creating your targeting rule. The SDK distributes matching subjects across those variants according to the percentages you configure.

{{< img src="feature_flags/concepts/multi-variant-traffic-split-2.png" alt="Targeting rule with percentages split across multiple variants." style="width:75%;" >}}

## How the SDK evaluates percentage rollouts

When the SDK evaluates a targeting rule with a percentage rollout, it first checks whether the evaluation context matches the rule's filter. If it matches, the SDK uses the flag key and the `targetingKey` from the evaluation context to assign the subject to a rollout bucket. That bucket determines whether the subject receives a variant from the current rule or passes through to the next rule.

Randomization is **deterministic**: a subject with the same `targetingKey` always lands in the same bucket for a given flag, so they receive the same variant on repeat evaluations. If you increase a rollout percentage later (for example, from 30% to 50%), subjects already in the treatment bucket stay there.

For multi-variant rules, the SDK applies the same bucketing logic to distribute subjects across variants according to the percentages defined on the rule.

### Example evaluation context

{{< programming-lang-wrapper langs="javascript,python,go" >}}

{{< programming-lang lang="javascript" >}}

```javascript
await OpenFeature.setContext({
  targetingKey: 'user-123',
  user_id: 'user-123',
});
```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

```python
eval_ctx = EvaluationContext(
    targeting_key="user-123",
    attributes={"user_id": "user-123"},
)
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```go
evalCtx := openfeature.NewEvaluationContext(
    "user-123",
    map[string]interface{}{"user_id": "user-123"},
)
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
