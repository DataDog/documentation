---
"app_id": "split-rum"
"app_uuid": "750d9e38-2856-44fe-98d0-9fbbc617d876"
"assets": {}
"author":
  "homepage": "https://split.io/"
  "name": Split
  "sales_email": partners@split.io
  "support_email": support@split.io
"categories":
- configuration & deployment
- issue tracking
- developer tools
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/split-rum/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "split-rum"
"integration_id": "split-rum"
"integration_title": "Split - RUM"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "split-rum"
"public_title": "Split - RUM"
"short_description": "Enriches your RUM data with your feature flags from Split"
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
  "description": Enriches your RUM data with your feature flags from Split
  "media":
  - "caption": Datadog RUM with Split Feature Flags overview (list of flags)
    "image_url": images/split-feature-flags-list-in-dd-rum.png
    "media_type": image
  - "caption": Datadog RUM with Split Feature Flag details
    "image_url": images/split-feature-flag-detail-in-dd-rum.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Troubleshooting"
  "title": Split - RUM
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->

## Overview

[Split][1] is an Intelligent Feature Management [platform][2] that pairs the speed and reliability of feature flags with data to measure the impact of every feature. With Split, organizations have a secure way to release features, target them to customers, and measure the impact of features on their customer experience metrics.

With The Datadog Split RUM integration, product teams can view feature flag information overlaid on RUM data. This enables proactive monitoring of the real-time activity and experience of individual users and, if necessary, quick roll back or shut off of features that may be causing degradations.

## Setup

Feature flag tracking is available in the RUM Browser SDK. For detailed setup instructions, see the [Getting started with Feature Flag data in RUM][3] guide.

1. Update your Browser RUM SDK version to 4.25.0 or later.
2. Initialize the RUM SDK and configure the `enableExperimentalFeatures` initialization parameter with `["feature_flags"]`.
3. Initialize the Split SDK and create an impression listener to report feature flag evaluations to Datadog using the following snippet of code:


```javascript
const factory = SplitFactory({
    core: {
      authorizationKey: "<APP_KEY>",
      key: "<USER_ID>",
    },
    impressionListener: {
      logImpression(impressionData) {              
          datadogRum
              .addFeatureFlagEvaluation(
                   impressionData.impression.feature,
                   impressionData.impression.treatment
              );
     },
  },
});

const client = factory.client();
```

## Troubleshooting

Need help? See the [JavaScript SDK page][4] in the Split documentation or contact [Datadog Support][5].

[1]: https://split.io
[2]: https://www.split.io/product/
[3]: https://docs.datadoghq.com/real_user_monitoring/guide/setup-feature-flag-data-collection/
[4]: https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#2-instantiate-the-sdk-and-create-a-new-split-client
[5]: https://docs.datadoghq.com/help/

