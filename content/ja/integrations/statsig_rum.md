---
"app_id": "statsig-rum"
"app_uuid": "86a69c7d-8042-4f93-96b1-f139b2058644"
"assets":
  "dashboards":
    "statsig_rum": assets/dashboards/statsig_rum_overview.json
"author":
  "homepage": "https://statsig.com"
  "name": Statsig
  "sales_email": support@statsig.com
  "support_email": support@statsig.com
"categories":
- configuration & deployment
- developer tools
- event management
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/statsig_rum/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "statsig_rum"
"integration_id": "statsig-rum"
"integration_title": "Statsig - RUM"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "statsig_rum"
"public_title": "Statsig - RUM"
"short_description": "Enrich your Datadog RUM data with feature gate information from Statsig"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Offering::Integration"
  - "Category::Configuration & Deployment"
  - "Category::Developer Tools"
  - "Category::Event Management"
  - "Submitted Data Type::Traces"
  "configuration": "README.md#Setup"
  "description": Enrich your Datadog RUM data with feature gate information from Statsig
  "media":
  - "caption": Datadog dashboard showing inspection of user session and their enabled feature gates
    "image_url": images/dd-view-1.jpg
    "media_type": image
  - "caption": Datadog dashboard showing overview of all gates and the user volumes assigned to each
    "image_url": images/dd-view-2.jpg
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Statsig - RUM
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## Overview

Statsig's feature flag tracking integration enriches your Datadog RUM data with feature gate information, allowing you to measure causality between your product features and your system and performance metrics.

## セットアップ

### Feature flag tracking setup

Feature flag tracking is available in the RUM Browser SDK. For detailed set up instructions, visit [Getting started with feature flag data in RUM][1].

1. Update your Browser RUM SDK version to 4.25.0 or above.
2. Initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with `["feature_flags"]`.
3. Initialize Statsig's SDK (`>= v4.34.0`) and implement the `gateEvaluationCallback` option as shown below:

```js
await statsig.initialize('client-<STATSIG CLIENT KEY>',
  {userID: '<USER ID>'},
  {     
    gateEvaluationCallback: (key, value) => {
      datadogRum.addFeatureFlagEvaluation(key, value);
    }
  }
); 
```

## Support 

Join the [Statsig Slack community][2] for support on enabling this integration. [1]: https://docs.datadoghq.com/real_user_monitoring/guide/setup-feature-flag-data-collection
[2]: https://join.slack.com/t/statsigcommunity/shared_invite/zt-pbp005hg-VFQOutZhMw5Vu9eWvCro9g

