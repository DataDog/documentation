---
app_id: azure-relay
app_uuid: 7334eb73-4a8e-4b0a-9c18-9a755c63ca69
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.relay_namespaces.active_connections
      metadata_path: metadata.csv
      prefix: azure.relay_namespaces
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 300
    source_type_name: Azure Relay
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- クラウド
- ネットワーク
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_relay
integration_id: azure-relay
integration_title: Azure Relay
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_relay
public_title: Azure Relay
short_description: Azure Relay のキーメトリクスを追跡
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Network
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Relay のキーメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Relay
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Azure Relay サービスを使用すると、ファイアウォールでポートを解放したり企業ネットワークインフラストラクチャーの内部に及んだりするような変更を加える必要なく、企業ネットワーク内で実行されているサービスをパブリッククラウドに安全に公開することができます。

Datadog Azure インテグレーションを使用して、Azure Relay からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_relay" >}}


### イベント

Azure Relay インテグレーションには、イベントは含まれません。

### サービスチェック

Azure Relay インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_relay/azure_relay_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/