---
app_id: azure-publicipaddress
app_uuid: a829d4e6-53b4-4cd2-8e83-941066bca46b
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.network_publicipaddresses.byte_count
      metadata_path: metadata.csv
      prefix: azure.network_publicipaddresses
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 299
    source_type_name: Azure Public IP Address
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
git_integration_title: azure_public_ip_address
integration_id: azure-publicipaddress
integration_title: Azure Public IP Address
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_public_ip_address
public_title: Azure Public IP Address
short_description: Azure パブリック IP アドレスのキーメトリクスを追跡
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure パブリック IP アドレスのキーメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Public IP Address
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Azure パブリック IP アドレスがリソースに割り当てられると、インターネットとのインバウンド通信およびアウトバウンド接続が可能になります。

Datadog Azure インテグレーションを使用して、Azure パブリック IP アドレスからメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{ get-metrics-from-git "azure-publicipaddress" }}


### イベント

Azure Public IP Address インテグレーションには、イベントは含まれません。

### サービスチェック

Azure Public IP Address インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_public_ip_address/azure_public_ip_address_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/