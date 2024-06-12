---
aliases:
- /ja/integrations/azure_datalakeanalytics
categories:
- azure
- クラウド
- data store
dependencies: []
description: Azure Data Lake Analytics のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_data_lake_analytics/
draft: false
git_integration_title: azure_data_lake_analytics
has_logo: true
integration_id: azure-datalakeanalytics
integration_title: Microsoft Azure Data Lake Analytics
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_data_lake_analytics
public_title: Datadog-Microsoft Azure Data Lake Analytics インテグレーション
short_description: Azure Data Lake Analytics のキーメトリクスを追跡
version: '1.0'
---

## 概要

Azure Data Lake Analytics は、ビッグデータを簡略化するオンデマンド分析ジョブサービスです。

Datadog Azure インテグレーションを使用して、Data Lake Analytics からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_data_lake_analytics" >}}


### イベント

Azure Data Lake Analytics インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure Data Lake Analytics インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_lake_analytics/azure_data_lake_analytics_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/