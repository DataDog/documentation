---
app_id: datadog-operator
app_uuid: 8ea2f311-02dd-478b-9b3b-3fbef310d82c
assets:
  dashboards:
    Datadog Operator Overview: assets/dashboards/operator_overview.json
  integration:
    auto_install: true
    metrics:
      check: datadog.operator.go_info
      metadata_path: metadata.csv
      prefix: datadog.operator.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10341
    source_type_name: Datadog Operator
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories: []
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/datadog_operator/README.md
display_on_public_website: true
draft: false
git_integration_title: datadog_operator
integration_id: datadog-operator
integration_title: Datadog Operator
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: datadog_operator
public_title: Datadog Operator
short_description: Datadog Operator を監視する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Datadog Operator を監視する
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Datadog Operator
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [Datadog Operator][1] を監視します。

## 計画と使用

### インフラストラクチャーリスト

[Datadog Operator][1] のドキュメントを参照してください。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "datadog_operator" >}}


### ヘルプ

Datadog Operator インテグレーションには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "datadog_operator" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://docs.datadoghq.com/ja/containers/datadog_operator/
[2]: https://github.com/DataDog/integrations-core/blob/master/datadog_operator/metadata.csv
[3]: https://github.com/DataDog/integrations-core/blob/master/datadog_operator/assets/service_checks.json
[4]: https://docs.datadoghq.com/ja/help/