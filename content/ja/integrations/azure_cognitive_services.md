---
app_id: azure-cognitiveservices
app_uuid: 0d77c8ca-d9b6-46a5-925e-c942e00425a2
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.cognitiveservices_accounts.total_calls
      metadata_path: metadata.csv
      prefix: azure.cognitiveservices_accounts
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 282
    source_type_name: Azure Cognitive Services
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
git_integration_title: azure_cognitive_services
integration_id: azure-cognitiveservices
integration_title: Azure Cognitive Services
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_cognitive_services
public_title: Azure Cognitive Services
short_description: Azure Cognitive Services のキーメトリクスを追跡
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Cognitive Services のキーメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Cognitive Services
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Azure Cognitive Services は、開発者に AI やデータサイエンスに関する直接的なスキルや知識がなくても、インテリジェントなアプリケーションを構築するために使用できる API、SDK、およびサービスです。

Datadog Azure インテグレーションを使用して、Azure Cognitive Services からメトリクスを収集できます。

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1]. No additional installation are required.

## 収集データ

### メトリクス
{{ get-metrics-from-git "azure-cognitiveservices" }}


### イベント

Azure Cognitive Services インテグレーションには、イベントは含まれません。

### サービスチェック

Azure Cognitive Services インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_cognitive_services/azure_cognitive_services_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/