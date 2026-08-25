---
title: Kill Switches
description: Use Boolean feature flags as kill switches to disable features instantly without redeploying.
further_reading:
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side SDKs"
---

A **kill switch** is a Boolean feature flag where the default state is **on** (`true`). The feature runs normally until you enact the kill switch by adding a targeting rule that serves `false`.

Use a kill switch when you need to turn off risky or broken functionality by using Datadog, without waiting for a deploy. During incidents, that gives operations and engineering a fast path to stop customer impact while the rest of the application keeps running.

## Set up a kill switch

### Step 1: Create a Boolean flag

1. Navigate to [**Create Feature Flag**][1].
2. Set the variant type to **Boolean**.
3. Mark the flag as **Permanent**.
4. In the **Variants** section, click **Make Default** next to the **True** variant. This sets `true` as the value served to all subjects by default.

    {{< img src="feature_flags/kill_switch_make_default.png" alt="The Variants section of the create flag form, showing Boolean variants with Make Default highlighted next to the True variant." style="width:90%;" >}}

5. Save the flag.

### Step 2: Evaluate the flag in your application

Wrap the feature code with a Boolean evaluation and a fallback of `true`. The fallback keeps the feature enabled if the flag configuration is unavailable:

{{< programming-lang-wrapper langs="javascript,python,go" >}}

{{< programming-lang lang="javascript" >}}

```javascript
import { OpenFeature } from '@openfeature/web-sdk';

const client = OpenFeature.getClient();
const fallback = true;
const showFeature = await client.getBooleanValue('my-kill-switch-flag', fallback);

if (showFeature) {
  // Feature code here
}
```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

```python
enabled = client.get_boolean_value("my-kill-switch-flag", True, eval_ctx)
if enabled:
    # Feature code here
    pass
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```go
enabled, _ := client.BooleanValue(ctx, "my-kill-switch-flag", true, evalCtx)
if enabled {
    // Feature code here
}
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

Deploy the application with the flag check in place before enabling the flag in production.

### Step 3: Enable the flag

Enable the flag in the target environment. No targeting rules are needed at this stage — the flag serves `true` (feature on) to all subjects by default.

### Step 4: Enact the kill switch

When you need to disable the feature — for example, during a regression or to stop a third-party integration from sending requests — add a targeting rule that serves `false`:

1. Navigate to the flag in Datadog.
2. Add a targeting rule to serve `false` to the affected subjects.
3. Save the rule. The SDK serves `false` on the next configuration refresh, and the feature code path stops running for the affected subjects.

## Best practices

- Use a fallback of `true` so the feature stays enabled if the flag is unavailable — you don't want the feature to accidentally turn off due to a connectivity issue.
- Mark the flag as **Permanent**. Kill switches are intended to be long-lived, and marking them permanent prevents them from being flagged as [stale][2].
- Test the kill switch in staging before relying on it in production.
- Use evaluation tracking to confirm the flag state during an incident.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/feature-flags/create
[2]: /feature_flags/concepts/stale_flags/
