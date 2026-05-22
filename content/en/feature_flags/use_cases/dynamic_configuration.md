---
title: Dynamic Configuration
description: Change application behavior with feature flag configuration instead of code deployments.
further_reading:
- link: "/feature_flags/concepts/variants_and_flag_types"
  tag: "Documentation"
  text: "Variants and Flag Types"
- link: "/feature_flags/concepts/json_schema_validation"
  tag: "Documentation"
  text: "JSON Schema Validation"
---

## Overview

**Dynamic configuration** lets you change application behavior from the Datadog UI without a code deployment. Your application reads configuration values from feature flag variants—strings, numbers, or JSON objects—and you update those values in Datadog when you want to change behavior.

## How it works

1. Define variables in your application that read from a feature flag variant.
2. Create a flag with the appropriate [variant type](/feature_flags/concepts/variants_and_flag_types/) (string, integer, number, or JSON).
3. Update variant values or [targeting rules](/feature_flags/concepts/targeting_rules/) in Datadog.
4. The SDK picks up changes on the next configuration refresh.

For JSON configuration, use [JSON Schema validation](/feature_flags/concepts/json_schema_validation/) to help enforce type safety on variant values.

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

2. Optionally add a [JSON Schema](/feature_flags/concepts/json_schema_validation/) to validate future variant values.

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

Create additional variants with different configuration values and use an **experiment** targeting rule to compare behavior. See [Targeting Rules and Filters](/feature_flags/concepts/targeting_rules/).

## Common use cases

- **Marketing**: Update headline copy, CTA text, or colors without deploying.
- **AI and ML**: Compare model parameters or feature toggles across variants in experiments.
- **Operations**: Adjust limits, timeouts, or feature thresholds per environment.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
