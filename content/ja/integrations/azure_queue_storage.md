---
app_id: azure-queue-storage
app_uuid: fafca6a4-8820-4a42-bc84-1d53f322366e
assets:
  dashboards:
    azure_queue_storage: assets/dashboards/azure_queue_storage.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.storage_storageaccounts_queueservices.queue_count
      metadata_path: metadata.csv
      prefix: azure.storage_storageaccounts_queueservices
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 224
    source_type_name: Azure Queue Storage
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
git_integration_title: azure_queue_storage
integration_id: azure-queue-storage
integration_title: Azure Queue Storage
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_queue_storage
public_title: Azure Queue Storage
short_description: Azure Queue Storage のキーメトリクスを追跡
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Queue Storage のキーメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Queue Storage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Azure Queue Storage は、多数のメッセージを格納するためのサービスです。メッセージには、HTTP または HTTPS を使用し、認証された呼び出しで世界中のどこからでもアクセスできます。

Azure Queue Storage からメトリクスを取得すると、以下のことができます。

- Queue Storage のパフォーマンスを視覚化できます。
- Queue Storage のパフォーマンスをアプリケーションと関連付けることができます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_queue_storage" >}}


### イベント

Azure Queue Storage インテグレーションには、イベントは含まれません。

### サービスチェック

Azure Queue Storage インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_queue_storage/azure_queue_storage_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/