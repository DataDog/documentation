---
app_id: azure-load-balancer
app_uuid: a97ccfda-404d-4972-a995-63885350075a
assets:
  dashboards:
    azure_load_balancer: assets/dashboards/azure_load_balancer.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.network_loadbalancers.byte_count
      metadata_path: metadata.csv
      prefix: azure.network_loadbalancers
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 296
    source_type_name: Azure Load Balancer
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
git_integration_title: azure_load_balancer
integration_id: azure-load-balancer
integration_title: Azure Load Balancer
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_load_balancer
public_title: Azure Load Balancer
short_description: Azure Load Balancer のキーメトリクスを追跡
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Load Balancer のキーメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Load Balancer
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Azure Load Balancer は、インバウンドとアウトバウンドのどちらのシナリオもサポートし、低レイテンシーと高スループットを実現して、あらゆる TCP および UDP アプリケーションの数百万のフローにスケールアップできます。

Datadog Azure インテグレーションを使用して、Azure Load Balancer からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure-load-balancer" >}}


### イベント

Azure Load Balancer インテグレーションには、イベントは含まれません。

### サービスチェック

Azure Load Balancer インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_load_balancer/azure_load_balancer_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/