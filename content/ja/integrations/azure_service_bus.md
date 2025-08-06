---
app_id: azure-service-bus
app_uuid: 9db052dc-1cb1-405a-833d-dfb77a2db9df
assets:
  dashboards:
    azure_service_bus: assets/dashboards/azure_service_bus.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.servicebus_namespaces.count
      metadata_path: metadata.csv
      prefix: azure.servicebus_namespaces
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 227
    source_type_name: Azure Service Bus
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
git_integration_title: azure_service_bus
integration_id: azure-service-bus
integration_title: Azure Service Bus
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_service_bus
public_title: Azure Service Bus
short_description: Azure Service Bus のキーメトリクスを追跡
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Service Bus のキーメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Service Bus
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Microsoft Azure Service Bus は、フルマネージド型のエンタープライズ統合メッセージブローカーです。

Azure Service Bus からメトリクスを取得すると、以下のことができます。

- サービスバスのパフォーマンスを視覚化できます。
- サービスバスのパフォーマンスをアプリケーションと関連付けることができます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_service_bus" >}}


### イベント

Azure Service Bus インテグレーションには、イベントは含まれません。

### サービスチェック

Azure Service Bus インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_service_bus/azure_service_bus_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/