---
app_id: azure-hdinsight
app_uuid: 2b5359ca-2d39-4a43-8f8a-49ec30f6bee3
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.hdinsight_clusters.gateway_requests
      metadata_path: metadata.csv
      prefix: azure.hdinsight_clusters
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 294
    source_type_name: Azure HD Insight
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
git_integration_title: azure_hd_insight
integration_id: azure-hdinsight
integration_title: Azure HD Insight
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_hd_insight
public_title: Azure HD Insight
short_description: Track key Azure HD Insight metrics.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Track key Azure HD Insight metrics.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure HD Insight
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Azure HDInsight は、膨大な量のデータを簡単、迅速かつコスト効率よく処理できるようにするクラウドサービスです。

Datadog Azure インテグレーションを使用すると、Azure HDInsight からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_hd_insight" >}}


### イベント

Azure HDInsight インテグレーションには、イベントは含まれません。

### サービスチェック

Azure HDInsight インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_hd_insight/azure_hd_insight_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/