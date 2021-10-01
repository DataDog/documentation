---
aliases:
  - /ja/integrations/azure_containerservice
categories:
  - cloud
  - コンテナ
  - azure
ddtype: crawler
dependencies: []
description: Azure Kubernetes Services のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_container_service/
draft: false
git_integration_title: azure_container_service
has_logo: true
integration_id: azure-containerservice
integration_title: Microsoft Azure Kubernetes Service
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_container_service
public_title: Datadog-Microsoft Azure Kubernetes Service インテグレーション
short_description: Azure Kubernetes Services のキーメトリクスを追跡
version: '1.0'
---
## 概要

Azure Kubernetes Service を使用すると、実稼働準備が整った Kubernetes クラスターを迅速にデプロイできます。

Datadog Azure インテグレーションを使用して Azure Kubernetes Service からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_container_service" >}}


### イベント

Azure Kubernetes Service インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure Kubernetes Service インテグレーションには、サービスチェックは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_service/azure_container_service_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/