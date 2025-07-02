---
app_id: azure-container-apps
app_uuid: 4cfaeef2-96d5-4497-be6a-8d06169e8ddb
assets:
  dashboards:
    azure_container_apps: assets/dashboards/azure_container_apps.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.app_containerapps.requests
      metadata_path: metadata.csv
      prefix: azure.app_containerapps
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 800
    source_type_name: Azure Container Apps
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- クラウド
- incident-teams
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_container_apps
integration_id: azure-container-apps
integration_title: Azure Container Apps
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_container_apps
public_title: Azure Container Apps
short_description: Track key Azure Container Apps metrics.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Containers
  - Offering::Integration
  configuration: README.md#Setup
  description: Track key Azure Container Apps metrics.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Container Apps
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Azure Container Apps を使用すると、サーバーレスコンテナを使用してモダンなアプリやマイクロサービスを構築およびデプロイすることができます。詳細については、Azure Container Apps の [Microsoft のドキュメント][1]を参照してください。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure-container-apps" >}}


### イベント

Azure Container Apps インテグレーションには、イベントは含まれません。

### サービスチェック

Azure Container Apps インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://docs.microsoft.com/en-us/azure/container-apps/overview
[2]: https://docs.datadoghq.com/ja/integrations/azure/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_apps/azure_container_apps_metadata.csv
[4]: https://docs.datadoghq.com/ja/help/