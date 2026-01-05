---
app_id: azure-containerservice
app_uuid: 6146f70c-cb70-419e-afbc-318b79b70864
assets:
  dashboards:
    azure_container_service: assets/dashboards/azure_container_service.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.containerservice_managedclusters.kube_pod_status_ready
      metadata_path: metadata.csv
      prefix: azure.containerservice_managedclusters
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 284
    source_type_name: Azure Container Service
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- クラウド
- incident-teams
- azure
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_container_service
integration_id: azure-containerservice
integration_title: Azure Container Service
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_container_service
public_title: Azure Container Service
short_description: Azure Container Services のキーメトリクスを追跡
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Containers
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Container Services のキーメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Container Service
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Azure Kubernetes Service を使用すると、実稼働準備が整った Kubernetes クラスターを迅速にデプロイできます。

Datadog Azure インテグレーションを使用して Azure Kubernetes Service からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{ get-metrics-from-git "azure-containerservice" }}


### イベント

Azure Kubernetes Service インテグレーションには、イベントは含まれません。

### サービスチェック

Azure Kubernetes Service インテグレーションには、サービスチェックは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_service/azure_container_service_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/