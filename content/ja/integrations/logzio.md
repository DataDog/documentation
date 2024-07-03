---
app_id: logz-io
app_uuid: a637cc4e-f31f-4b35-9fff-76a8e7557d66
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: logz-io.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10009
    source_type_name: Logz.io
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Logz.io
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- event management
- ai/ml
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/logzio/README.md
display_on_public_website: true
draft: false
git_integration_title: logzio
integration_id: logz-io
integration_title: Logz.io
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: logzio
public_title: Logz.io
short_description: AI-Powered ELK as a Service
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Event Management
  - Category::AI/ML
  - Supported OS::macOS
  configuration: README.md#Setup
  description: AI-Powered ELK as a Service
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Logz.io
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Logz.io is a unified SaaS platform that collects and analyzes logs, metrics, and traces. The platform includes AI features to improve troubleshooting, reduce response time, and help you manage costs.

This integration allows you to

- View real-time Logz.io alerts in Datadog

![import_alert_from_logz][1]

- Incorporate alert events into a dashboard to identify correlations with metrics

![dashboard][2]

## セットアップ

### インストール

Import your alerts into Datadog with the following steps:

1. Use a [Datadog API key][3] to create a new alert endpoint in Logz.io.
2. Create a new alert in Logz.io for a specific query.

For a more detailed setup description, see [Log Correlation with Logz.io and Datadog][4].

## 収集データ

### メトリクス

The Logz.io check does not include any metrics.

### イベント

The Logz.io check does not include any events.

### サービスチェック

The Logz.io check does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/logzio/images/import_alert_from_logz.jpg
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/logzio/images/dashboard.png
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: http://logz.io/blog/log-correlation-datadog
[5]: https://docs.datadoghq.com/ja/help/