---
aliases:
  - /ja/integrations/azure_containerservice
categories:
  - クラウド
  - コンテナ
  - azure
ddtype: クローラー
dependencies: []
description: Azure Container Services のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/azure_container_service/'
git_integration_title: azure_container_service
has_logo: true
integration_title: Microsoft Azure Container Service
is_public: true
kind: インテグレーション
manifest_version: 1
name: azure_container_service
public_title: Datadog-Microsoft Azure Container Service インテグレーション
short_description: Azure Container Services のキーメトリクスを追跡
version: 1
---
## 概要

Azure Container Service を使用すると、実稼働準備が整った Kubernetes、DC/OS、または Docker Swarm クラスターを迅速にデプロイできます。

Datadog Azure インテグレーションを使用して Azure Container Service からメトリクスを収集できます。

## セットアップ
### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外のインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "azure_container_service" >}}


### イベント
Azure Container Service インテグレーションには、イベントは含まれません。

### サービスのチェック
Azure Container Service インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_service/azure_container_service_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/