---
"app_id": "eppo"
"app_uuid": "1d7b7957-82d6-4e9d-8ba1-b697f01fc850"
"assets":
  "dashboards":
    "Eppo Dashboard": assets/dashboards/eppo_dashboard.json
"author":
  "homepage": "https://www.geteppo.com/"
  "name": Eppo
  "sales_email": support@geteppo.com
  "support_email": support@geteppo.com
"categories":
- configuration & deployment
- developer tools
- event management
- cloud
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/eppo/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "eppo"
"integration_id": "eppo"
"integration_title": "Eppo"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "eppo"
"public_title": "Eppo"
"short_description": "Enrich your Datadog RUM data with feature flag information from Eppo"
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
  - "Category::Cloud"
  - "Submitted Data Type::Traces"
  "configuration": "README.md#Setup"
  "description": Enrich your Datadog RUM data with feature flag information from Eppo
  "media":
  - "caption": Datadog RUM with Eppo Flags overview
    "image_url": images/eppo_datadog1.png
    "media_type": image
  - "caption": Datadog RUM with Eppo Flags details
    "image_url": images/eppo_datadog2.png
    "media_type": image
  - "caption": Datadog RUM with session view of Eppo Flags
    "image_url": images/eppo_datadog3.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Eppo
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[Eppo][1] is the experimentation and feature management platform that makes advanced A/B testing accessible to everyone in your organization.

The Datadog Eppo RUM integration enriches your Datadog RUM data with your feature flag information, including flag name and variation, to provide visibility into performance monitoring and behavioral changes. You can use this to determine which users are shown a feature and if it is negatively affecting the user's performance.

## Setup

Feature flag tracking is available in the RUM Browser SDK. For detailed set up instructions, visit the [Getting started with Feature Flag data in RUM][2] guide.

1. Update your Browser RUM SDK version to 4.25.0 or above.
2. Initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with `["feature_flags"]`.
3. Initialize Eppo's SDK with the `datadogRum` option, which reports feature flag evaluations to Datadog. 

The following is a JavaScript example:

```typescript
const assignmentLogger: IAssignmentLogger = {
  logAssignment(assignment) {
    // Send the assignment event to customers' event logging
    analytics.track({
      userId: assignment.subject,
      event: "Eppo Randomized Assignment",
      type: "track",
      properties: { ...assignment },
    });

    // Assuming `exposure` is defined in this context and has a property `variation`
    datadogRum.addFeatureFlagEvaluation(assignment.experiment, exposure.variation);
  },
};

await eppoInit({
  apiKey: "<API_KEY>",
  assignmentLogger,
});
```

## Troubleshooting

Need help? See the [Eppo documentation][3].

[1]: https://www.geteppo.com/
[2]: https://docs.datadoghq.com/real_user_monitoring/guide/setup-feature-flag-data-collection/
[3]: https://docs.geteppo.com/sdks/datadog

