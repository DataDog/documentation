---
app_id: azure-applicationgateway
app_uuid: f797ba91-33c8-49e8-9316-159ca6c83764
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.network_applicationgateways.current_connections
      metadata_path: metadata.csv
      prefix: azure.network_applicationgateways
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 280
    source_type_name: Azure Application Gateway
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- クラウド
- azure
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_application_gateway
integration_id: azure-applicationgateway
integration_title: Azure Application Gateway
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_application_gateway
public_title: Azure Application Gateway
short_description: Azure Application Gateway のキーメトリクスを追跡
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Application Gateway のキーメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Application Gateway
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Azure Application Gateway は、Web アプリケーションへのトラフィックを管理できる Web トラフィックロードバランサーです。

Datadog Azure インテグレーションを使用して、Azure Application Gateway からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{ get-metrics-from-git "azure-applicationgateway" }}


### イベント

Azure Application Gateway インテグレーションには、イベントは含まれません。

### サービスチェック

Azure Application Gateway インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_application_gateway/azure_application_gateway_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/