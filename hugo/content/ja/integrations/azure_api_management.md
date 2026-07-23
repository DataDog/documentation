---
app_id: azure-apimanagement
app_uuid: 122539f9-dc11-4099-9d64-cbd6f50159a5
assets:
  dashboards:
    azure_api_management: assets/dashboards/azure_api_management.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.apimanagement_service.capacity
      metadata_path: metadata.csv
      prefix: azure.apimanagement_service
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 277
    source_type_name: Azure API Management
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
git_integration_title: azure_api_management
integration_id: azure-apimanagement
integration_title: Azure API Management
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_api_management
public_title: Azure API Management
short_description: Azure API Management のキーメトリクスを追跡
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure API Management のキーメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure API Management
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Azure API Management は、顧客が API を公開、セキュリティ保護、変換、保守、および監視できるフルマネージド型サービスです。

Datadog Azure インテグレーションを使用して、Azure API Management からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{ get-metrics-from-git "azure-apimanagement" }}


### イベント

Azure API Management インテグレーションには、イベントは含まれません。

### サービスチェック

Azure API Management インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_api_management/azure_api_management_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/