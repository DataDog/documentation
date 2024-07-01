---
"app_id": "harness-cloud-cost-management"
"app_uuid": "3eb2e9ef-2c9c-45b6-8f1c-8a900910f948"
"assets":
  "dashboards":
    "harness_cloud_cost_management_overview": assets/dashboards/harness_cloud_cost_management_overview.json
"author":
  "homepage": "https://www.harness.io"
  "name": Harness IO
  "sales_email": akash.bhardwaj@harness.io
  "support_email": akash.bhardwaj@harness.io
"categories":
- cost management
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/harness_cloud_cost_management/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "harness_cloud_cost_management"
"integration_id": "harness-cloud-cost-management"
"integration_title": "Harness Cloud Cost Mgmt"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "harness_cloud_cost_management"
"public_title": "Harness Cloud Cost Mgmt"
"short_description": "View your Harness cloud and cluster cost metrics over a range of dates"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Cost Management"
  - "Offering::UI Extension"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": View your Harness cloud and cluster cost metrics over a range of dates
  "media":
  - "caption": Cloud Cost Management Video Overview
    "image_url": images/ccm_dashboard_video_thumbnail.png
    "media_type": video
    "vimeo_id": !!int "637675885"
  - "caption": Cloud Cost Management Dashboard on Datadog
    "image_url": images/ccm_dashboard_on_datadog.png
    "media_type": image
  - "caption": Cloud Cost Management Dashboard on Harness
    "image_url": images/ccm_dashboard_on_harness.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Harness Cloud Cost Mgmt
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Harness provides cloud cost management and transparency across infrastructure, engineering, and finance teams with robust business intelligence, and the ability to reduce wasted cloud costs with Intelligent Cloud AutoStopping and machine learning-based recommendations.

With Datadog and Harness, you can:

- Visualize the cloud and cluster cost data from Harness
- Identify cost trends and cost forecasting
- Get recommendations for resource rightsizing
- Review top spending resources


## Setup

1. If you have not yet started using Harness Cloud Cost Management, [sign up][1] for a 14 day trial.

2. Install the integration.
3. Go to the Harness Cloud Cost Management Dashboard and connect in any of the widgets by logging in with your Harness user ID. This authenticates you for all the widgets.

### Events

The Harness Cloud Cost Management check does not include any events.

### Service Checks

The Harness Cloud Cost Management check does not include any service checks.

## Support

Need help? Contact [Datadog support][2].

[1]: https://app.harness.io/auth/#/signup/
[2]: https://docs.datadoghq.com/help/

