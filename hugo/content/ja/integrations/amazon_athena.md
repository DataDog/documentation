---
app_id: amazon-athena
app_uuid: 99ab7fc9-5c16-4411-b0e9-a8e8ebe55792
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: aws.athena.total_execution_time
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.athena.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 239
    source_type_name: Amazon Athena
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- クラウド
- aws
- ログの収集
custom_kind: インテグレーション
dependencies: []
description: Amazon Athena のキーメトリクスを追跡
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/amazon_athena/
draft: false
git_integration_title: amazon_athena
has_logo: true
integration_id: amazon-athena
integration_title: Amazon Athena
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_athena
public_title: Amazon Athena
short_description: 標準的な SQL を使用して Amazon S3 のデータ分析を簡素化するインタラクティブなクエリ サービス。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::AWS
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: 標準的な SQL を使用して Amazon S3 のデータ分析を簡素化するインタラクティブなクエリサービスです。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon Athena
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Amazon Athena は、標準 SQL を使用して Amazon Simple Storage Service (Amazon S3) でデータを直接、簡単に分析できるようにするインタラクティブなクエリサービスです。

このインテグレーションを有効にすると、Datadog にすべての Athena メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `Athena` が有効になっていることを確認します。
2. [Datadog - Amazon Athena インテグレーション][3]をインストールします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_athena" >}}


### イベント

Amazon Athena インテグレーションには、イベントは含まれません。

### サービスチェック

Amazon Athena インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-athena
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_athena/assets/metrics/metric-spec.yaml
[5]: https://docs.datadoghq.com/ja/help/