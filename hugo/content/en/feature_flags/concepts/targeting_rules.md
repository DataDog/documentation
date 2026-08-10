---
title: Targeting Rules and Filters
description: Learn how targeting rules, filters, and rollout types control which variants your application serves.
further_reading:
- link: "/feature_flags/concepts/saved_filters"
  tag: "Documentation"
  text: "Saved Filters"
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

**Targeting rules** define which variant to serve to which subjects. Each rule can include a **filter**, one or more variants, and an optional percentage rollout. Rules are evaluated in order until a match is found.

## Targeting rule types

Datadog supports different targeting rule types depending on your rollout strategy:

| Type | Description |
|------|-------------|
| **Feature gate** | Roll out immediately to a percentage of subjects matching your filter (randomized or not) |
| **Progressive rollout** | Randomized rollout over a schedule with multiple steps |
| **Experiment** | Randomized allocation associated with an experiment |

## Configure targeting rules

To configure targeting rules for a flag:

1. Navigate to **Feature Flags** and select your flag.
2. Select the environment whose rules you want to modify.
3. Click **Add Targeting Rule** (or click the targeting rule you want to modify).

{{< img src="feature_flags/concepts/ff-targeting-rules-and-rollouts-2.png" alt="Targeting Rules and Rollouts section on a feature flag." style="width:100%;" >}}

For each targeting rule, configure the following:

- **Name your targeting rule**: Give your targeting rule a name to describe the group it targets.
- **Define a filter** (optional): If you do not define a filter, the rule matches all subjects in that environment. To reuse the same conditions across multiple flags, add a [saved filter][1] instead of redefining them on each flag.
- **Select variants**: Choose which variants to serve to matching subjects. Click **Split Traffic** to randomize across multiple variants (see [Traffic Splitting and Randomization](/feature_flags/concepts/traffic_splitting/)).
- **Set the traffic exposure** (optional): Serve the variant to a percentage of matching subjects (see [Traffic Splitting and Randomization](/feature_flags/concepts/traffic_splitting/)).

{{< img src="feature_flags/concepts/configure-targeting-rule-3.png" alt="Targeting Rule editor side panel on a feature flag." style="width:70%;" >}}

After configuring your targeting rules, click **Save**, then enable the flag in the environment so SDKs can evaluate targeting rules.

<div class="alert alert-info">
SDKs do not evaluate targeting rules when the flag is <b>disabled</b> or <b>overridden</b> in an environment. If the flag is overridden with a fixed variant, the SDK returns that variant instead. If the flag is disabled, the SDK returns the coded default variant.
</div>

## Schedule a rollout start

Instead of activating a targeting rule immediately, you can schedule it to start automatically at a future date and time. This is available for both **feature gates** and **progressive rollouts**.

To schedule a start time:

1. When configuring your targeting rule, select **Schedule a start time**.

2. Choose a date and time for the rule to begin. The picker defaults to the next full hour, and past dates and times cannot be selected.

3. Click **Save**.

{{< img src="feature_flags/concepts/schedule-a-rollout-start.png" alt="Targeting Rule editor side panel on a feature flag with a scheduled start." style="width:70%;" >}}

The rule remains inactive until the scheduled time arrives, at which point it activates automatically. No further action is required.

<div class="alert alert-info">

If the flag is disabled in the environment, a message appears. Enable the flag before the scheduled rollout for it to take effect.

</div>

You can reschedule to a new time at any time before the scheduled start. To cancel it, uncheck **Schedule a start time**.

## Filters and evaluation context

Filters use attributes from your SDK's **evaluation context**. Define attributes when you set the evaluation context before evaluating flags. Attributes must be flat primitive values (strings, numbers, Booleans). Nested objects and arrays are not supported.

### Example evaluation contexts and filters

With the following evaluation context, you can build filters with different operators, such as equality, **is one of**, **is not**, or numeric comparisons:

**Evaluation context:**

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
  account_age_days: 120,
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
        "account_age_days": 120,
    },
)
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```go
evalCtx := openfeature.NewEvaluationContext(
    "user-123",
    map[string]interface{}{
        "user_id":          "user-123",
        "user_role":        "admin",
        "email":            "user@example.com",
        "country":          "US",
        "tier":             "premium",
        "account_age_days": 120,
    },
)
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

#### Example filters

- `country` **is one of** `US`, `CA`
- `tier` **equals** `premium`
- `user_role` **is not** `guest`
- `account_age_days` **greater than** `90`

**Note**: Other SDKs follow the same pattern. See your platform's [client](/feature_flags/client/) or [server](/feature_flags/server/) SDK documentation for evaluation context setup.

## Rule hierarchy

Targeting rules are evaluated **in order** from top to bottom:

1. The SDK evaluates the first rule. If the subject matches the filter (or no filter is defined), the rule may serve a variant.
2. If the subject does not match, evaluation passes through to the next rule.
3. If no rule matches, the SDK serves the **default variant** for that environment.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/concepts/saved_filters/
