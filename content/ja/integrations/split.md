---
"app_id": "split"
"app_uuid": "690989fe-dca5-4394-b38a-86f9770dd470"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": []
      "metadata_path": "metadata.csv"
      "prefix": "split."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10008"
    "source_type_name": "Split"
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": "Split"
  "sales_email": "help@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "configuration & deployment"
- "notifications"
- "event management"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/split/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "split"
"integration_id": "split"
"integration_title": "Split"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "split"
"public_title": "Split"
"short_description": "Feature Experimentation Platform for Engineering and Product Teams."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Configuration & Deployment"
  - "Category::Notifications"
  - "Category::Event Management"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Feature Experimentation Platform for Engineering and Product Teams."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Split"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[Split][1] is a platform for [controlled rollouts][2], helping businesses of all sizes deliver exceptional user experiences and mitigate risk by providing an easy, secure way to target features to customers.

Integrate Split with Datadog to:

- See feature changes in context by including Split changelogs in your event stream
- Correlate feature impact with application performance
- Avoid critical issues before they happen. Disable features proactively based on Datadog metrics and alerts

To enrich Real User Monitoring (RUM) data with your Split feature flags for visibility into performance and behavioral changes, see the [Split-RUM integration page][3].

## セットアップ

- **In Datadog**: Create an API Key <span class="hidden-api-key">\${api_key}</span>

- **In Split**: Go to **Admin Settings** and click **Integrations** and navigate to the Marketplace. Click Add next to Datadog.<br/>

![Split Screenshot][4]

- Paste your Datadog API Key and click Save.

![Split Screenshot][5]

Split data should be flowing into Datadog.

### Feature Flag Tracking integration

See the [Split-RUM integration page][3] for information about setting up feature flag tracking with the RUM Browser SDK.

## 収集データ

### メトリクス

The Split check does not include any metrics.

### イベント

Push your Split listing/de-listing events into your [Datadog Event Stream][6].

### サービスチェック

The Split check does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][7].

[1]: http://www.split.io
[2]: http://www.split.io/articles/controlled-rollout
[3]: https://docs.datadoghq.com/integrations/split-rum/
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/split/images/in-split.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/split/images/integrations-datadog.png
[6]: https://docs.datadoghq.com/events/
[7]: https://docs.datadoghq.com/help/

