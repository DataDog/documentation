---
app_id: microsoft-fabric
app_uuid: 6bc8105a-8d3a-4d3a-9cf2-d28d78e49b31
assets:
  dashboards:
    microsoft-fabric: assets/dashboards/microsoft_fabric_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.synapse_workspaces_sqlpools.active_queries
      metadata_path: metadata.csv
      prefix: azure.synapse_workspaces
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 18661396
    source_type_name: Microsoft Fabric
  monitors:
    Synapse DWU Utilization: assets/monitors/azure_fabric_dwu_usage_high.json
    Synapse SQL CPU Utilization: assets/monitors/azure_fabric_cpu_usage_high.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- azure
- ai/ml
- モニター
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: microsoft_fabric
integration_id: microsoft-fabric
integration_title: Microsoft Fabric
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: microsoft_fabric
public_title: Microsoft Fabric
short_description: Datadog インテグレーションを使用して、Microsoft Fabric 内の Azure Synapse からメトリクスを収集します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::AI/ML
  - Category::Metrics
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Datadog インテグレーションを使用して、Microsoft Fabric 内の Azure Synapse からメトリクスを収集します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Microsoft Fabric
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Microsoft Fabric は、エンタープライズ向けのエンドツーエンド データ＆アナリティクス プラットフォームです。Fabric は Synapse Data Engineering、Synapse Warehousing、Power BI などのワークロードを単一の SaaS ソリューションに統合します。Datadog インテグレーションを使用して、Microsoft Fabric 内の Azure Synapse からメトリクスを収集します。

## セットアップ

### インストール
[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "microsoft_fabric" >}}


### サービスチェック

Microsoft Fabric インテグレーションにはサービス チェックが含まれていません。

### イベント

Microsoft Fabric インテグレーションにはイベントが含まれていません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog で Microsoft Fabric を監視する][4]

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/integrations-internal-core/blob/main/microsoft_fabric/metadata.csv
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://www.datadoghq.com/blog/monitor-microsoft-fabric-datadog/