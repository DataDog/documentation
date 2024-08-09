---
app_id: amazon-bedrock
app_uuid: ca7ffbc0-a346-4880-ab41-d6ef2dbd0ba3
assets:
  dashboards:
    amazon-bedrock: assets/dashboards/amazon_bedrock_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - aws.bedrock.invocations
      metadata_path: metadata.csv
      prefix: aws.bedrock.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 370
    source_type_name: Amazon Bedrock
author:
  homepage: https://www.datadoghq.com
  name: Ruby
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- AWS
- モニター
- クラウド
- ai/ml
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_bedrock
integration_id: amazon-bedrock
integration_title: Amazon Bedrock
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: amazon_bedrock
public_title: Amazon Bedrock
short_description: Amazon Bedrock は、API を通じて AI 基盤モデルを利用可能にします。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  - Category::AI/ML
  configuration: README.md#Setup
  description: Amazon Bedrock は、API を通じて AI 基盤モデルを利用可能にします。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon Bedrock
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Amazon Bedrock は、Amazon および先進的な AI スタートアップの[基盤モデル][1] (FM) を API 経由で提供する完全マネージド型のサービスで、用途に最適なモデルを様々な FM から選べます。

このインテグレーションを有効にすると、Datadog にすべての Bedrock メトリクスを表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][3]で、`Metric Collection` タブの下にある `Bedrock` が有効になっていることを確認します。
2. [Datadog - Amazon Bedrock インテグレーション][4]をインストールします。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_bedrock" >}}


### ヘルプ

Amazon Bedrock インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon Bedrock インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog を使用した Amazon Bedrock の監視][7]

[1]: https://aws.amazon.com/what-is/foundation-models/
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-bedrock
[5]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_bedrock/metadata.csv
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://www.datadoghq.com/blog/monitor-amazon-bedrock-with-datadog/