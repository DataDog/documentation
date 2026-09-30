---
app_id: amazon-privatelink
app_uuid: a61f0481-5b69-4c7b-9777-12d626f2486d
assets:
  dashboards:
    Amazon PrivateLink: assets/dashboards/amazon_privatelink_dashboard.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - aws.privatelinkendpoints.active_connections
      metadata_path: metadata.csv
      prefix: aws.privatelink
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 360
    source_type_name: Amazon PrivateLink
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- モニター
- aws
- クラウド
- ログの収集
- ネットワーク
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_privatelink
integration_id: amazon-privatelink
integration_title: Amazon PrivateLink
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_privatelink
public_title: Amazon PrivateLink
short_description: AWS PrivateLink のキーメトリクスを追跡します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::AWS
  - Category::Cloud
  - Category::Log Collection
  - Category::Network
  - Offering::Integration
  configuration: README.md#Setup
  description: AWS PrivateLink のキーメトリクスを追跡します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon PrivateLink
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

AWS PrivateLink は、VPC、AWS サービス、およびお客様のオンプレミスネットワーク間のプライベート接続を提供します。

このインテグレーションを有効にすると、VPC のエンドポイントやエンドポイントサービスの健全性とパフォーマンスを Datadog で監視することができます。

**重要:** PrivateLink 経由でテレメトリーデータを Datadog に送信したい場合は、[こちらの手順][1]で行ってください。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][3]で、`Metric Collection` タブで `PrivateLinkEndPoints` と `PrivateLinkServices` が
   有効になっていることを確認します。
2. [Datadog - AWS PrivateLink インテグレーション][4]をインストールします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon-privatelink" >}}


### イベント

AWS PrivateLink インテグレーションには、イベントは含まれません。

### サービスチェック

AWS PrivateLink インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://docs.datadoghq.com/ja/agent/guide/private-link/
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-privatelink
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_privatelink/amazon_privatelink_metadata.csv
[6]: https://docs.datadoghq.com/ja/help/
