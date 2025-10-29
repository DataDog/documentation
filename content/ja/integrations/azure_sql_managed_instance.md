---
categories:
- cloud
- azure
custom_kind: integration
dependencies: []
description: Azure SQL Managed Instance のキーメトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/azure_sql_managed_instance/
draft: false
git_integration_title: azure_sql_managed_instance
has_logo: true
integration_id: azure-sql-managed-instance
integration_title: Microsoft Azure SQL Managed Instance
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_sql_managed_instance
public_title: Datadog-Microsoft Azure SQL Managed Instance インテグレーション
short_description: Azure SQL Managed Instance のキーメトリクスを追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure SQL Managed Instance は、広範な SQL サーバーエンジンの互換性と、サービスとしてフルマネージド型のプラットフォームの利点を備えるスケーラブルなクラウドデータベースサービスです。

Datadog Azure インテグレーションを使用して SQL Managed Instances からメトリクスを収集できます。

## セットアップ
### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "azure-sql-managed-instance" >}}


### イベント
Azure SQL Managed Instances インテグレーションには、イベントは含まれません。

### サービスチェック
Azure SQL Managed Instances インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

## その他の参考資料

- [https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/][4]

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_sql_managed_instance/azure_sql_managed_instance_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/
