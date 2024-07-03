---
app_id: buoyant-cloud
app_uuid: dee4b74f-34b7-457e-98b1-7bb8306f2c18
assets:
  dashboards:
    Buoyant Cloud: assets/dashboards/buoyant_cloud_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check:
      - buoyant_cloud.cp_workload.inbound_response.rate1m
      metadata_path: metadata.csv
      prefix: buoyant_cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10320
    source_type_name: Buoyant Cloud
  oauth: assets/oauth_clients.json
author:
  homepage: https://buoyant.io/cloud
  name: Buoyant
  sales_email: cloud@buoyant.io
  support_email: cloud@buoyant.io
categories:
- cloud
- network
- security
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/buoyant_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: buoyant_cloud
integration_id: buoyant-cloud
integration_title: Buoyant Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: buoyant_cloud
public_title: Buoyant Cloud
short_description: Buoyant Cloud provides fully managed Linkerd, right on your cluster.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Network
  - Category::Security
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Buoyant Cloud provides fully managed Linkerd, right on your cluster.
  media:
  - caption: 'Buoyant Cloud: Datadog dashboard'
    image_url: images/bcloud_datadog_dashboard.png
    media_type: image
  - caption: 'Buoyant Cloud: Overview page'
    image_url: images/bcloud_01.png
    media_type: image
  - caption: 'Buoyant Cloud: Linkerd health view'
    image_url: images/bcloud_02.png
    media_type: image
  - caption: 'Buoyant Cloud: Managed Linkerd event'
    image_url: images/bcloud_03.png
    media_type: image
  - caption: 'Buoyant Cloud: Traffic page'
    image_url: images/bcloud_04.png
    media_type: image
  - caption: 'Buoyant Cloud: Topology page'
    image_url: images/bcloud_05.png
    media_type: image
  - caption: 'Buoyant Cloud: Metrics page'
    image_url: images/bcloud_06.png
    media_type: image
  - caption: 'Buoyant Cloud: Workload Detail page'
    image_url: images/bcloud_07.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Buoyant Cloud
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[Buoyant Cloud][1] provides fully managed Linkerd on your cluster to monitor the health of Linkerd and deployments. With this integration, you can monitor and be alerted on Linkerd's health, workload traffic, rollout events, and metrics.

## セットアップ

### インストール

You need to have an account at [Buoyant Cloud][1] to use this integration. You can also sign up for Buoyant Cloud in the Datadog Marketplace.

### 構成

1. Click the **Connect Accounts** button on the tile to complete the OAuth flow.
2. Browse to the [Buoyant Cloud Notifications][2] page.
3. Add or edit a rule under **Events** or **Metrics**.
4. Go to the **Destinations** section and select your Datadog account to send all events or metrics matching the notification rule to Datadog.

### Validation

As Buoyant Cloud creates events, they appear in the Datadog [event explorer][3]. Metrics appear in the Datadog [metrics explorer][4].

## Uninstallation

1. Browse to the [Buoyant Cloud Settings][5] page.
2. Click the kebab menu to the right of your Datadog org.
3. Click **Remove**.

Additionally, ensure that all API keys associated with this integration have been disabled by searching for the integration name on the [API Keys page][6].

## 収集データ

### イベント

Buoyant Cloud sends [events][3] to Datadog, including:

- Linkerd health alerts
- Linkerd configuration alerts
- Workload traffic alerts
- Workload rollouts
- Manual events

### メトリクス

See [metadata.csv][7] for a list of metrics provided by this integration.

## トラブルシューティング

Need help? Get support from the following sources:

- Browse the [Buoyant Cloud docs][8]
- Reach out in [Linkerd Slack][9]
- [Email the Buoyant Cloud team][10]

[1]: https://buoyant.io/cloud
[2]: https://buoyant.cloud/notifications
[3]: https://app.datadoghq.com/event/explorer
[4]: https://app.datadoghq.com/metric/explorer
[5]: https://buoyant.cloud/settings
[6]: https://app.datadoghq.com/organization-settings/api-keys?filter=Buoyant%20Cloud
[7]: https://github.com/DataDog/integrations-extras/blob/master/buoyant_cloud/metadata.csv
[8]: https://docs.buoyant.cloud
[9]: https://slack.linkerd.io
[10]: mailto:cloud@buoyant.io