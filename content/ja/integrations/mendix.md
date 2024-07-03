---
app_id: mendix
app_uuid: 4119b134-c828-4e14-95b5-585bb13d314a
assets:
  dashboards:
    Mendix Application Overview: assets/dashboards/MendixApplicationOverview.json
  integration:
    auto_install: true
    metrics:
      check: mx.database.diskstorage_size
      metadata_path: metadata.csv
      prefix: mx.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10344
    source_type_name: Mendix
author:
  homepage: https://mendix.com/
  name: Mendix
  sales_email: mxsupport@mendix.com
  support_email: mxsupport@mendix.com
categories:
- cloud
- automation
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/mendix/README.md
display_on_public_website: true
draft: false
git_integration_title: mendix
integration_id: mendix
integration_title: Mendix
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: mendix
public_title: Mendix
short_description: Monitor Mendix environment metrics
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::Cloud
  - Category::Automation
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitor Mendix environment metrics
  media:
  - caption: Page Editor
    image_url: images/page-editor.png
    media_type: image
  - caption: Domain model with Data Hub
    image_url: images/domain-model-with-data-hub.png
    media_type: image
  - caption: Cloud developer portal view of resource packs
    image_url: images/cloud_resource_pack_overview.png
    media_type: image
  - caption: Mendix Application Overview dashboard
    image_url: images/mendix_dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Mendix
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[Mendix][1] is a [low-code IDE][2] and a visual model-driven development environment that developers can use to build apps on the Mendix Platform.

With Mendix, you can easily create, change, integrate, test, and deploy your applications. You can manage branch lines and security as well as extend your app with custom code by using the built-in editors.

[The Mendix integration][3] allows you to monitor your Mendix ecosystem, including Mendix Runtime metrics, Java Virtual Machine (JVM) metrics, database, SaaS(Software as a Service) environment metrics. Customize the metrics you send to Datadog in Mendix Studio Pro.

**Note**: This integration is applicable to Mendix Cloud and Mendix Cloud Dedicated deployment models.

## セットアップ

To enable the Datadog integration for Mendix applications running on Mendix Cloud, see the [Datadog for Mendix cloud documentation][4].


## 収集データ

### メトリクス

For a list of metrics available once the integration is enabled, see the [official Mendix documentation][5].

### イベント

The Mendix integration does not include any events.

### サービスチェック

The Mendix integration does not include any service checks.


## トラブルシューティング

Need help? Contact [Mendix support][6].

[1]: https://mendix.com/
[2]: https://www.mendix.com/blog/a-low-code-leader-composing-the-modern-enterprise-with-mendix/
[3]: https://docs.mendix.com/developerportal/operate/monitoring-with-apm/
[4]: https://docs.mendix.com/developerportal/operate/datadog-metrics/#2-setting-up-datadog-for-your-mendix-app
[5]: https://docs.mendix.com/developerportal/operate/monitoring-with-apm/#environment
[6]: https://support.mendix.com/hc/en-us