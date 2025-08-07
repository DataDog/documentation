---
app_id: azure-datafactory
app_uuid: b85b780d-5e7f-4406-b2e6-d958445cb4f6
assets:
  dashboards:
    azure_data_factory: assets/dashboards/azure_data_factory.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.datafactory_factories.integration_runtime_available_memory
      - azure.datafactory_factories.trigger_succeeded_runs
      - azure.datafactory_factories.activity_succeeded_runs
      - azure.datafactory_factories.pipeline_succeeded_runs
      metadata_path: metadata.csv
      prefix: azure.datafactory_factories
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 287
    source_type_name: Azure Data Factory
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- クラウド
- data stores
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_data_factory
integration_id: azure-datafactory
integration_title: Azure Data Factory
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_data_factory
public_title: Azure Data Factory
short_description: Azure Data Factory のキーメトリクスを追跡
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Data Factory のキーメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Data Factory
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Azure Data Factory は、データの保管・移動・処理サービスを自動化されたデータパイプラインとして構築するクラウドデータ統合サービスです。

Datadog Azure インテグレーションを使用して、Data Factory からメトリクスを収集できます。

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1]. No additional installation steps are required.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_data_factory" >}}


### イベント

Azure Data Factory インテグレーションには、イベントは含まれません。

### サービスチェック

Azure Data Factory インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_factory/azure_data_factory_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/