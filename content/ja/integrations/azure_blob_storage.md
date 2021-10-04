---
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Azure Blob Storage のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/azure_blob_storage/'
draft: false
git_integration_title: azure_blob_storage
has_logo: true
integration_id: azure-blob-storage
integration_title: Microsoft Azure Blob Storage
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_blob_storage
public_title: Datadog-Microsoft Azure Blob Storage インテグレーション
short_description: Azure Blob Storage のキーメトリクスを追跡
version: '1.0'
---
## 概要

Azure Blob Storage は、Microsoft のクラウド用オブジェクトストレージソリューションです。Blob ストレージは、大量の非構造化データを格納できるように最適化されています。Azure Blob Storage からメトリクスを取得すると、以下のことができます。

- Blob Storage のパフォーマンスを視覚化できます。
- Blob Storage のパフォーマンスをアプリケーションと関連付けることができます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_blob_storage" >}}


### イベント

Azure Blob Storage インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure Blob Storage インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_blob_storage/azure_blob_storage_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/