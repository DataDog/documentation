---
app_id: azure-eventgrid
app_uuid: 55b5c82c-bba0-4bb5-b9a7-50096b97f0bb
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.eventgrid_topics.publish_success_count
      metadata_path: metadata.csv
      prefix: azure.eventgrid
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 291
    source_type_name: Azure Event Grid
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
git_integration_title: azure_event_grid
integration_id: azure-eventgrid
integration_title: Azure Event Grid
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_event_grid
public_title: Azure Event Grid
short_description: Azure Event Grid のキーメトリクスを追跡
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Event Grid のキーメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Event Grid
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Azure Event Grid は、公開/サブスクライブモデルを使用して均一なイベント消費を可能にするフルマネージド型のインテリジェントなイベントルーティングサービスです。

Datadog Azure インテグレーションを使用して、Azure Event Grid からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{ get-metrics-from-git "azure-eventgrid" }}


### イベント

Azure Event Grid インテグレーションには、イベントは含まれません。

### サービスチェック

Azure Event Grid インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_event_grid/azure_event_grid_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/