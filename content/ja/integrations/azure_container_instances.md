---
aliases:
  - /ja/integrations/azure_containerinstances
categories:
  - cloud
  - コンテナ
  - azure
ddtype: crawler
dependencies: []
description: Azure Container Instances のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_container_instances/
draft: false
git_integration_title: azure_container_instances
has_logo: true
integration_id: azure-containerinstances
integration_title: Microsoft Azure Container Instances
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_container_instances
public_title: Datadog-Microsoft Azure Container Instances インテグレーション
short_description: Azure Container Instances のキーメトリクスを追跡
version: '1.0'
---
## 概要

Azure Container Instances は、開発者が基底のインフラストラクチャーをプロビジョニングおよび管理する必要なくコンテナをデプロイできるサービスです。

Datadog Azure インテグレーションを使用して Azure Container Instances からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_container_instances" >}}


### イベント

Azure Container Instances インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure Container Instances インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_instances/azure_container_instances_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/