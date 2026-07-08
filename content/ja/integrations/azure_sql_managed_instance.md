---
app_id: azure-sql-managed-instance
app_uuid: 877e3fb4-8192-4f54-942d-0d11363ab525
assets:
  dashboards:
    azure-sql-managed-instance-overview: assets/dashboards/azure_sql_managed_instance_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.sql_managedinstances.count
      metadata_path: metadata.csv
      prefix: azure.sql_managedinstances
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 39934830
    source_type_name: Azure SQL Managed Instance
  monitors:
    Azure SQL Managed Instance CPU Utilization: assets/monitors/azure_sql_managed_instance_cpu_utilization.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- azure
- モニター
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_sql_managed_instance
integration_id: azure-sql-managed-instance
integration_title: Azure SQL Managed Instance
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_sql_managed_instance
public_title: Azure SQL Managed Instance
short_description: SQL Managed Instance インテグレーションを利用すれば、SQL Managed Instance データベースの利用率とアクティビティを追跡できます。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Metrics
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Installation
  description: SQL Managed Instance インテグレーションを利用すれば、SQL Managed Instance データベースの利用率とアクティビティを追跡できます。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure SQL Managed Instance
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Azure SQL Managed Instance は、エンタープライズ向け SQL Server データベース エンジンの完全マネージド版です。SQL Managed Instance インテグレーションを利用すると、SQL Managed Instance データベースの利用率とアクティビティを追跡できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_sql_managed_instance" >}}


### サービスチェック

Azure SQL Managed Instance にはサービス チェックは含まれません。

### イベント

Azure SQL Managed Instance にはイベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog Database Monitoring で SQL Server のパフォーマンスを最適化する][4]
- [Database Monitoring ドキュメント][5]
- [Database Monitoring 推奨事項でデータベース ホストとクエリ パフォーマンスを改善する][6]

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://www.datadoghq.com/blog/optimize-sql-server-performance-with-datadog/
[5]: https://docs.datadoghq.com/ja/database_monitoring/
[6]: https://www.datadoghq.com/blog/database-monitoring-recommendations/