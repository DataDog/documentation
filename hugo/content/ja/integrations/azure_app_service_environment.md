---
app_id: azure-appserviceenvironment
app_uuid: 918d0126-a4b0-4d8d-b38b-718c6115938d
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.web_hostingenvironments_multirolepools.cpu_percentage
      metadata_path: metadata.csv
      prefix: azure.web_hostingenv
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 278
    source_type_name: Azure App Service Environment
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- クラウド
- azure
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_app_service_environment
integration_id: azure-appserviceenvironment
integration_title: Azure App Service Environment
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_app_service_environment
public_title: Azure App Service Environment
short_description: Azure App Service Environment のキーメトリクスを追跡
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure App Service Environment のキーメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure App Service Environment
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Azure App Service Environment は、App Service アプリを大規模かつ安全に実行するために完全に分離された専用の環境を提供する Azure App Service の機能です。

Datadog Azure インテグレーションを使用して、Azure App Service Environment からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{ get-metrics-from-git "azure-appserviceenvironment" }}


### イベント

Azure App Service Environment インテグレーションには、イベントは含まれません。

### サービスチェック

Azure App Service Environment インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_service_environment/azure_app_service_environment_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/