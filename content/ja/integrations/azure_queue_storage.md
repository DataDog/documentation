---
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Azure Queue Storage のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_queue_storage/
draft: false
git_integration_title: azure_queue_storage
has_logo: true
integration_id: azure-queue-storage
integration_title: Microsoft Azure Queue Storage
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_queue_storage
public_title: Datadog-Microsoft Azure Queue Storage インテグレーション
short_description: Azure Queue Storage のキーメトリクスを追跡
version: '1.0'
---
## 概要

Azure Queue Storage は、多数のメッセージを格納するためのサービスです。メッセージには、HTTP または HTTPS を使用し、認証された呼び出しを介して世界中のどこからでもアクセスできます。

Azure Queue Storage からメトリクスを取得すると、以下のことができます。

- Queue Storage のパフォーマンスを視覚化できます。
- Queue Storage のパフォーマンスをアプリケーションと関連付けることができます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_queue_storage" >}}


### イベント

Azure Queue Storage インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure Queue Storage インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_queue_storage/azure_queue_storage_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/