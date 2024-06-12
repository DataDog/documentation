---
categories:
- azure
- クラウド
- data store
dependencies: []
description: Azure Table Storage のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_table_storage/
draft: false
git_integration_title: azure_table_storage
has_logo: true
integration_id: azure-table-storage
integration_title: Microsoft Azure Table Storage
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_table_storage
public_title: Datadog-Microsoft Azure Table Storage インテグレーション
short_description: Azure Table Storage のキーメトリクスを追跡
version: '1.0'
---

## 概要

Azure Table Storage は、大量の半構造化データセットを使用して迅速な開発を行うための NoSQL key-value ストアです。

Azure Table Storage からメトリクスを取得すると、以下のことができます。

- テーブルストレージのパフォーマンスを視覚化できます。
- テーブルストレージのパフォーマンスをアプリケーションと関連付けることができます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_table_storage" >}}


### イベント

Azure Table Storage インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure Table Storage インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_table_storage/azure_table_storage_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/