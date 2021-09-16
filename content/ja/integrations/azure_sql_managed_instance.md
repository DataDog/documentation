---
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Azure SQL Managed Instance のキーメトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/azure_sql_managed_instance/
draft: false
git_integration_title: azure_sql_managed_instance
has_logo: true
integration_id: ''
integration_title: Microsoft Azure SQL Managed Instance
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_sql_managed_instance
public_title: Datadog-Microsoft Azure SQL Managed Instance インテグレーション
short_description: Azure SQL Managed Instance のキーメトリクスを追跡。
version: '1.0'
---
## 概要

Azure SQL Managed Instance は、広範な SQL サーバーエンジンの互換性と、サービスとしてフルマネージド型のプラットフォームの利点を備えるスケーラブルなクラウドデータベースサービスです。

Datadog Azure インテグレーションを使用して SQL Managed Instances からメトリクスを収集できます。

## セットアップ
### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "azure_sql_managed_instance" >}}


### イベント
Azure SQL Managed Instances インテグレーションには、イベントは含まれません。

### サービスのチェック
Azure SQL Managed Instances インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_sql_managed_instance/azure_sql_managed_instance_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/