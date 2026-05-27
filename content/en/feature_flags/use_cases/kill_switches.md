---
title: Kill Switches
description: Use Boolean feature flags as kill switches to disable features instantly without redeploying.
further_reading:
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side SDKs"
---

Use a **kill switch** when you need to turn off risky or broken functionality in seconds from Datadog, without waiting for a deploy. During incidents, that gives operations and engineering a fast path to stop customer impact while the rest of the application keeps running.

Kill switches work well for new features, third-party integrations, and experimental code paths where you want a reliable off switch in Production.

## Overview

A kill switch is a Boolean feature flag. When the flag is disabled or overridden to `false`, the SDK skips the feature code path on the next configuration refresh.

## Set up a kill switch

### Step 1: Create a Boolean flag

1. Navigate to [**Create Feature Flag**][1].
2. Set the variant type to **Boolean**.
3. Choose the distribution channels based on where the feature runs (client, server, or both).
4. Save the flag.

### Step 2: Evaluate the flag in your application

Wrap the feature code with a Boolean evaluation and a safe default of `false` (feature off):

{{< programming-lang-wrapper langs="javascript,python,go" >}}

{{< programming-lang lang="javascript" >}}

```javascript
import { OpenFeature } from '@openfeature/web-sdk';

const client = OpenFeature.getClient();
const fallback = false;
const showFeature = await client.getBooleanValue('my-kill-switch-flag', fallback);

if (showFeature) {
  // Feature code here
}
```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

```python
enabled = client.get_boolean_value("my-kill-switch-flag", False, eval_ctx)
if enabled:
    # Feature code here
    pass
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```go
enabled, _ := client.BooleanValue(ctx, "my-kill-switch-flag", false, evalCtx)
if enabled {
    // Feature code here
}
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

Deploy the application with the flag check in place before enabling the flag in production.

### Step 3: Enable and target the flag

1. Add targeting rules if you want to limit the feature to specific subjects.
2. Enable the flag in the target environment.

### Step 4: Disable the feature in an emergency

To kill the feature:

1. Navigate to the flag in Datadog.
2. **Disable** the flag in the affected environment, or **override** the environment to serve `false`.

The SDK returns the default value (`false`) on the next configuration refresh, and the feature code path stops running.

## Best practices

- Use a default value of `false` so the feature is off when the flag is disabled or unavailable.
- Test the kill switch in Staging before relying on it in Production.
- Use evaluation tracking to confirm the flag state during an incident.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/feature-flags/create
