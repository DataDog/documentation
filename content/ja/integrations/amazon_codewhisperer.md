---
app_id: amazon-codewhisperer
app_uuid: 63669bbe-096f-4391-9654-bc0cae65fc73
assets:
  dashboards:
    amazon-codewhisperer: assets/dashboards/amazon_codewhisperer_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - aws.codewhisperer.invocations
      metadata_path: metadata.csv
      prefix: aws.codewhisperer.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 369
    source_type_name: Amazon CodeWhisperer
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- aws
- メトリクス
- クラウド
- ai/ml
- 開発ツール
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_codewhisperer
integration_id: amazon-codewhisperer
integration_title: Amazon CodeWhisperer
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_codewhisperer
public_title: Amazon CodeWhisperer
short_description: Amazon CodeWhisperer は ML を搭載したコード提案サービスです。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  - Category::AI/ML
  - Category::Developer Tools
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Amazon CodeWhisperer は ML を搭載したコード提案サービスです。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon CodeWhisperer
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Amazon CodeWhisperer は、自然言語によるコメントと統合開発環境 (IDE) 内のコードに基づいてコードの提案を生成することで、開発者の生産性向上を支援する機械学習搭載サービスです。

このインテグレーションを有効にすると、Datadog にすべての CodeWhisperer メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `CodeWhisperer` が有効になっていることを確認します。
2. [Datadog - Amazon CodeWhisperer インテグレーション][3]をインストールします。

## データ収集

### メトリクス
{{< get-metrics-from-git "amazon_codewhisperer" >}}


### イベント

Amazon CodeWhisperer インテグレーションには、イベントは含まれません。

### サービスチェック

Amazon CodeWhisperer インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-codewhisperer
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_codewhisperer/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/