---
"app_id": "devcycle"
"app_uuid": "a550d328-e35d-445b-8d13-d12b2c7da5d2"
"assets": {}
"author":
  "homepage": "https://devcycle.com"
  "name": DevCycle
  "sales_email": sales@devcycle.com
  "support_email": support@devcycle.com
"categories":
- configuration & deployment
- notifications
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/devcycle/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "devcycle"
"integration_id": "devcycle"
"integration_title": "DevCycle"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "devcycle"
"public_title": "DevCycle"
"short_description": "Feature Flags That Work the Way You Code"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Configuration & Deployment"
  - "Category::Notifications"
  - "Offering::Integration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Feature Flags That Work the Way You Code
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": other
    "url": "https://devcycle.com"
  - "resource_type": documentation
    "url": "https://docs.devcycle.com/tools-and-integrations/datadog-rum"
  "support": "README.md#Support"
  "title": DevCycle
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

DevCycle provides the following integrations with Datadog:

### Feature flag tracking integration

DevCycle's feature flag tracking integration enriches your RUM data with your feature's variable evaluations to provide visibility into performance monitoring and behavioral changes. Determine which users are shown a specific user experience and if it is negatively affecting the user's performance.

## Setup

### Feature flag tracking setup

Feature flag tracking is available in the RUM Browser SDK. For detailed setup instructions, visit the [Getting started with Feature Flag data in RUM][1] guide.

1. Update your Browser RUM SDK version 4.25.0 or above.
2. Initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with `["feature_flags"]`.
3. Initialize DevCycle's SDK and subscribe to the `variableEvaluated` event, calling `addFeatureFlagEvaluation` from within the subscription callback.

```
// initialize the dvcClient

const user = { user_id: "my_user" };
const dvcOptions = { logLevel: "debug" };
const dvcClient = initialize("<DVC_CLIENT_SDK_KEY>", user, dvcOptions); 

// for all variable evaluations

dvcClient.subscribe(
    "variableEvaluated:*",
    (key, variable) => {
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)

// for a particular variable's evaluations

dvcClient.subscribe(
    "variableEvaluated:my-variable-key",
    (key, variable) => {
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)
```

## Data Collected

### Metrics

The DevCycle integration does not include any metrics.

### Events

The DevCycle integration does not include any events.

### Service Checks

The DevCycle integration does not include any service checks.

## Support

Need help? Contact [Datadog Support][2].

## Further Reading

Learn more about [DevCycle][3] and the [DataDog RUM integration][4].

[1]: https://docs.datadoghq.com/real_user_monitoring/guide/setup-feature-flag-data-collection/
[2]: https://docs.datadoghq.com/help/
[3]: https://devcycle.com
[4]: https://docs.devcycle.com/tools-and-integrations/datadog-rum

