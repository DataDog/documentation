---
app_id: azure-appserviceplan
app_uuid: a44b7b0f-fd60-4a5a-8a18-03498111db31
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.web_serverfarms.cpu_percentage
      metadata_path: metadata.csv
      prefix: azure.web_serverfarms
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 279
    source_type_name: Azure App Service Plan
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
git_integration_title: azure_app_service_plan
integration_id: azure-appserviceplan
integration_title: Azure App Service Plan
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_app_service_plan
public_title: Azure App Service Plan
short_description: Azure App Service Plan のキーメトリクスを追跡
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure App Service Plan のキーメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure App Service Plan
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Azure App Service Plan defines a set of compute resources used to run a web app, similar to a server farm in traditional web hosting. 

Datadog Azure インテグレーションを使用して、Azure App Service Plan からメトリクスを収集できます。

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1]. No additional installation steps are required.

## 収集データ

### メトリクス
{{ get-metrics-from-git "azure-appserviceplan" }}


### イベント

Azure App Service Plan インテグレーションには、イベントは含まれません。

### サービスチェック

Azure App Service Plan インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_service_plan/azure_app_service_plan_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/