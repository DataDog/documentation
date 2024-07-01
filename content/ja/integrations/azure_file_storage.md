---
aliases:
- /ja/integrations/azure_filestorage
categories:
- azure
- クラウド
- data store
dependencies: []
description: Azure File Storage のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_file_storage/
draft: false
git_integration_title: azure_file_storage
has_logo: true
integration_id: azure-filestorage
integration_title: Microsoft Azure File Storage
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_file_storage
public_title: Datadog-Microsoft Azure File Storage インテグレーション
short_description: Azure File Storage のキーメトリクスを追跡
version: '1.0'
---

## 概要

Azure File Storage は、業界標準のサーバーメッセージブロック (SMB) プロトコルを使用してアクセスできるフルマネージド型のファイル共有をクラウドで提供します。

Datadog Azure インテグレーションを使用すると、Azure File Storage からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_file_storage" >}}


### イベント

Azure File Storage インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure File Storage インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_file_storage/azure_file_storage_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/