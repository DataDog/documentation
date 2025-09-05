---
app_id: amazon-config
app_uuid: 43ee05ac-8a93-4328-92e7-3bfe76d7839e
assets:
  integration:
    auto_install: false
    events:
      creates_events: true
    metrics:
      check:
      - aws.config.configuration_recorder_insufficient_permissions_failure
      metadata_path: metadata.csv
      prefix: aws.config.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 376
    source_type_name: Amazon Config
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- AWS
- モニター
- クラウド
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_config
integration_id: amazon-config
integration_title: AWS Config
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_config
public_title: AWS Config
short_description: AWS Config では、AWS リソースの構成を監査および評価することができます。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  - Offering::Integration
  configuration: README.md#Setup
  description: AWS Config では、AWS リソースの構成を監査および評価することができます。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS Config
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

[AWS Config][1] では、AWS アカウントの AWS リソースの構成が詳細に表示されます。これには、リソース同士の関係性や過去の構成が含まれ、時間の経過とともに構成や関係性がどのように変化しているかを見ることができます。

このインテグレーションを有効にすると、Datadog にすべての AWS Config メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][3]で、`Metric Collection` タブの下にある `Config` が有効になっていることを確認します。
2. [Datadog - AWS Config インテグレーション][4]をインストールします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon-config" >}}


### イベント

AWS Config が構成スナップショットおよび履歴の変化を検出した際、Datadog でイベントを受け取ることができます。以下の [CloudFormation][6] スタックを使用して、必要なリソースを作成および構成してください。

[![スタックを起動][7]](https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-aws-config-stream&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/main_config_stream.yaml)

[リソースカタログ][8]のリソースのサイドパネルにある **Recent Changes** タブで、構成の変更を調べることができます。

### サービスチェック

AWS Config インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-config
[5]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_config/metadata.csv
[6]: https://docs.aws.amazon.com/cloudformation/
[7]: https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png
[8]: https://docs.datadoghq.com/ja/infrastructure/resource_catalog/
[9]: https://docs.datadoghq.com/ja/help/
