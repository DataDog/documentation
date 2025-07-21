---
app_id: azure-containerinstances
app_uuid: 88867a91-04d4-41d3-8ced-36cd87c2a887
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.containerinstance_containergroups.cpu_usage
      metadata_path: metadata.csv
      prefix: azure.containerinstance_containergroups
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 283
    source_type_name: Azure Container Instances
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- クラウド
- incident-teams
- プロビジョニング
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_container_instances
integration_id: azure-containerinstances
integration_title: Azure Container Instances
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_container_instances
public_title: Azure Container Instances
short_description: Azure Container Instances のキーメトリクスを追跡
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Containers
  - Category::Provisioning
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Container Instances のキーメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Container Instances
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Azure Container Instances は、開発者が基底のインフラストラクチャーをプロビジョニングおよび管理する必要なくコンテナをデプロイできるサービスです。

Datadog Azure インテグレーションを使用して Azure Container Instances からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{ get-metrics-from-git "azure-containerinstances" }}


### イベント

Azure Container Instances インテグレーションには、イベントは含まれません。

### サービスチェック

Azure Container Instances インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_instances/azure_container_instances_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/