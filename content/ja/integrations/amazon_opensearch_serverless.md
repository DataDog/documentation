---
app_id: amazon-opensearch-serverless
app_uuid: d9d5508c-1d26-4923-a49e-e679eec28d53
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.aoss.active_collection
      metadata_path: metadata.csv
      prefix: aws.aoss.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 17708826
    source_type_name: Amazon OpenSearch Serverless
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- aws
- クラウド
- モニター
custom_custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_opensearch_serverless
integration_id: amazon-opensearch-serverless
integration_title: Amazon OpenSearch Serverless
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_opensearch_serverless
public_title: Amazon OpenSearch Serverless
short_description: Amazon OpenSearch Serverless は、多様なワークロードを処理するために自動的に調整される検索コンフィギュレーションです。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Cloud
  - Category::Metrics
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Amazon OpenSearch Serverless は、多様なワークロードを処理するために自動的に調整される検索コンフィギュレーションです。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon OpenSearch Serverless
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Amazon OpenSearch Serverlessは、OpenSearch 向けのオンデマンドのサーバーレスコンフィギュレーションで、大量のデータのクエリと分析が簡単に行えるようになります。OpenSearch Serverless コレクションは、自己管理型クラスターと同じメリットを提供し、コンフィギュレーションとチューニングが複雑化することもありません。

ベクトル検索コレクションは、機械学習 (ML) および人工知能 (AI) アプリケーションで高性能な類似検索を実現するために特別に設計されており、Bedrock 上でナレッジベースを自動的に作成するために使用することができます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### 構成

1. [AWS インテグレーションページ][2]で、**Metric Collection** タブの下にある OpenSearch Serverless が有効になっていることを確認します。
2. [Datadog - Amazon OpenSearch Serverless インテグレーション][3]をインストールします。


## 収集データ

### Metrics
{{< get-metrics-from-git "amazon_opensearch_serverless" >}}


### サービスチェック

Amazon OpenSearch Serverless には、サービスのチェック機能は含まれません。

### イベント

Amazon OpenSearch Serverless には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-opensearch-serverless
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_opensearch_serverless/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/