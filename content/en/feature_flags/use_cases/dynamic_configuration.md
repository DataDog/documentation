---
title: Dynamic Configuration
description: Change application behavior with feature flag configuration instead of code deployments.
---

## Overview

**Dynamic configuration** lets you change application behavior from the Datadog UI without a code deployment. Your application reads configuration values (Strings, Numbers, or JSON objects) from feature flag variants. To change behavior, update those values in Datadog.

## How it works

1. Define variables in your application that read from a feature flag variant.
2. Create a flag with the appropriate variant type (String, Integer, Number, or JSON).
3. Update variant values or targeting rules in Datadog.
4. The SDK picks up changes on the next configuration refresh.

For JSON configuration, use JSON Schema validation to help enforce type safety on variant values.

## Example: JSON configuration flag

### Create the flag

1. Create a JSON feature flag with a control variant, for example:

```json
{
  "headline": "Welcome",
  "cta_color": "blue",
  "show_banner": true
}
```

2. Optionally add a JSON Schema to validate future variant values.

### Read configuration in code

{{< programming-lang-wrapper langs="javascript,python,go" >}}

{{< programming-lang lang="javascript" >}}

```javascript
const client = OpenFeature.getClient();
const config = await client.getObjectValue('homepage-config', {
  headline: 'Welcome',
  cta_color: 'blue',
  show_banner: false,
});

document.title = config.headline;
```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

```python
import json

default = {"headline": "Welcome", "cta_color": "blue", "show_banner": False}
raw = client.get_string_value("homepage-config", json.dumps(default), eval_ctx)
config = json.loads(raw)
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```go
defaultVal := map[string]interface{}{
    "headline": "Welcome", "cta_color": "blue", "show_banner": false,
}
config, _ := client.ObjectValue(ctx, "homepage-config", defaultVal, evalCtx)
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Run experiments

Create additional variants with different configuration values and use an **experiment** targeting rule to compare behavior.

## Common use cases

- **Marketing**: Update headline copy, CTA text, or colors without deploying.
- **AI and ML**: Compare model parameters or feature toggles across variants in experiments.
- **Operations**: Adjust limits, timeouts, or feature thresholds per environment.
