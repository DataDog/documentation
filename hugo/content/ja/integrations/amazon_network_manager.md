---
app_id: amazon-network-manager
app_uuid: 294d91c5-7746-40f1-a314-103f7b6ffd9f
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - aws.ec2.infrastructureperformance.aggregate_aws_network_performance
      - aws.networkmanager.bytes_drop_count_blackhole
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10414
    source_type_name: AWS Network Manager
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- aws
- モニター
- クラウド
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_network_manager
integration_id: amazon-network-manager
integration_title: AWS Network Manager
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_network_manager
public_title: AWS Network Manager
short_description: AWS Network Manager を利用すると、グローバルネットワークを一元的にモニタリングできます。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  - Offering::Integration
  configuration: README.md#Setup
  description: AWS Network Manager を利用すると、グローバルネットワークを一元的にモニタリングできます。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS Network Manager
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

AWS Network Manager は、すべての AWS アカウント、リージョン、オンプレミスの場所を対象に、AWS クラウド WAN コアネットワークおよび AWS トランジットゲートウェイネットワークを管理するための一元的なモニタリングサービスです。 

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### 構成

1. [AWS インテグレーションページ][2]で、**Metric Collection** タブの下にある Network Manager が有効になっていることを確認します。
2. [Datadog - Amazon Network Manager インテグレーション][3]をインストールします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon-network-manager" >}}


### サービスチェック

Amazon Network Manager には、サービスのチェック機能は含まれません。

### イベント

Amazon Network Manager には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-network-manager
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_network_manager/assets/metrics/metric-spec.yaml
[5]: https://docs.datadoghq.com/ja/help/