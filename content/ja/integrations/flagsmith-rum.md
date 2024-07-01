---
"app_id": "flagsmith-rum"
"app_uuid": "a88f10b6-aef7-41df-979e-d70b720c6752"
"assets": {}
"author":
  "homepage": "https://flagsmith.com/"
  "name": Flagsmith
  "sales_email": support@flagsmith.com
  "support_email": support@flagsmith.com
"categories":
- configuration & deployment
- issue tracking
- developer tools
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/flagsmith-rum/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "flagsmith-rum"
"integration_id": "flagsmith-rum"
"integration_title": "Flagsmith"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "flagsmith-rum"
"public_title": "Flagsmith"
"short_description": "Enriches your RUM data with your feature flags from Flagsmith"
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Configuration & Deployment"
  - "Category::Issue Tracking"
  - "Category::Developer Tools"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": Enriches your RUM data with your feature flags from Flagsmith
  "media":
  - "caption": Datadog RUM with Flagsmith Flags overview
    "image_url": images/flag_rum_overview.png
    "media_type": image
  - "caption": Datadog RUM with Flagsmith Flags details
    "image_url": images/flag_rum_details.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Flagsmith
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[Flagsmith][1] facilitates feature management across web, mobile, and server side applications.

The Datadog Flagsmith RUM integration enriches your RUM data with your feature flags to provide visibility into performance monitoring and behavioral changes. Determine which users are shown a user experience and if it is negatively affecting the user's performance.

## Setup

Feature flag tracking is available in the RUM Browser SDK. For detailed set up instructions, visit the [Getting started with Feature Flag data in RUM][2] guide.

1. Update your Browser RUM SDK version to 4.25.0 or above.
2. Initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with `["feature_flags"]`.
3. Initialize Flagsmith's SDK with the `datadogRum` option, which reports feature flag evaluations to Datadog using the snippet of code shown below.

```javascript
flagsmith.init({
     datadogRum: {
        client: datadogRum,
        trackTraits: true,
    },
    ...
})
```

## Troubleshooting

Need help? See the [Flagsmith documentation][3] or contact [Datadog Support][4].

[1]: https://flagsmith.com/
[2]: https://docs.datadoghq.com/real_user_monitoring/guide/setup-feature-flag-data-collection/
[3]: https://docs.flagsmith.com/clients/javascript#datadog-rum-javascript-sdk-integration
[4]: https://docs.datadoghq.com/help/

