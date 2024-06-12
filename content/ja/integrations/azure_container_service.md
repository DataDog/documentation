---
aliases:
- /ja/integrations/azure_containerservice
categories:
- cloud
- コンテナ
- azure
dependencies: []
description: Azure Kubernetes Services のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_container_service/
draft: false
git_integration_title: azure_container_service
has_logo: true
integration_id: azure-containerservice
integration_title: Microsoft Azure Kubernetes Service
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_container_service
public_title: Datadog-Microsoft Azure Kubernetes Service インテグレーション
short_description: Azure Kubernetes Services のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Kubernetes Service を使用すると、実稼働準備が整った Kubernetes クラスターを迅速にデプロイできます。

Datadog Azure インテグレーションを使用して Azure Kubernetes Service からメトリクスを収集できます。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_container_service" >}}


### ヘルプ

Azure Kubernetes Service インテグレーションには、イベントは含まれません。

### ヘルプ

Azure Kubernetes Service インテグレーションには、サービスチェックは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_service/azure_container_service_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/