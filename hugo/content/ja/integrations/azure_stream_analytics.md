---
app_id: azure-streamanalytics
app_uuid: 190f11bb-ba6e-42ed-bdf8-b86c747d64be
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.streamanalytics_streamingjobs.input_events
      metadata_path: metadata.csv
      prefix: azure.streamanalytics_streamingjobs
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 302
    source_type_name: Azure Stream Analytics
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
git_integration_title: azure_stream_analytics
integration_id: azure-streamanalytics
integration_title: Azure Stream Analytics
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_stream_analytics
public_title: Azure Stream Analytics
short_description: Azure Stream Analytics のキーメトリクスを追跡
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Stream Analytics のキーメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Stream Analytics
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Azure Stream Analytics は、デバイスからの大量のデータストリーミングを調べることができるイベント処理エンジンです。

Datadog Azure インテグレーションを使用して、Azure Stream Analytics からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{ get-metrics-from-git "azure-streamanalytics" }}


### イベント

Azure Stream Analytics インテグレーションには、イベントは含まれません。

### サービスチェック

Azure Stream Analytics インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_stream_analytics/azure_stream_analytics_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/