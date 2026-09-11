---
app_id: azure-analysisservices
app_uuid: 1705f0be-a2cb-4ebe-83f4-edc42bf735f6
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.analysisservices_servers.command_pool_job_queue_length
      metadata_path: metadata.csv
      prefix: azure.analysisservices_servers
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 276
    source_type_name: Azure Analysis Services
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
git_integration_title: azure_analysis_services
integration_id: azure-analysisservices
integration_title: Azure Analysis Services
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_analysis_services
public_title: Azure Analysis Services
short_description: Azure Analysis Services のキーメトリクスを追跡
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Analysis Services のキーメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Analysis Services
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Azure Analysis Services は、クラウド上でエンタープライズレベルのデータモデル提供する、フルマネージド型の「サービスとしてのプラットフォーム (PaaS)」です。

Datadog Azure インテグレーションを使用して、Azure Analysis Services からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{ get-metrics-from-git "azure-analysisservices" }}


### イベント

Azure Analysis Services インテグレーションには、イベントは含まれません。

### サービスチェック

Azure Analysis Services インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_analysis_services/azure_analysis_services_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/