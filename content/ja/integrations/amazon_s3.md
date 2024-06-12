---
app_id: amazon-s3
app_uuid: e7f3a9d8-7ddc-4ed4-b70c-9c95ef5f8581
assets:
  dashboards:
    aws_s3: assets/dashboards/amazon_s3_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.s3.bucket_size_bytes
      metadata_path: metadata.csv
      prefix: aws.s3
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 157
    source_type_name: Amazon S3
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- metrics
- cloud
- data stores
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_s3
integration_id: amazon-s3
integration_title: Amazon S3
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_s3
public_title: Amazon S3
short_description: Amazon S3 は、可用性と拡張性に優れたクラウドストレージサービスです。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::クラウド
  - Category::Data Stores
  configuration: README.md#Setup
  description: Amazon S3 は、可用性と拡張性に優れたクラウドストレージサービスです。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon S3
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Amazon S3 は、可用性と拡張性に優れたクラウドストレージサービスです。

このインテグレーションを有効にすると、Datadog にすべての S3 メトリクスを表示できます。

注: このインテグレーションでは、's3:GetBucketTagging' の権限が完全に有効になっている必要があります。

注: S3 リクエストメトリクスはバケット自体で有効にする必要があります。[AWS ドキュメント][1]を参照してください。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][3]で、`Metric Collection` タブの下にある `S3` が有効になっていることを確認します。
2. [Datadog - Amazon S3 インテグレーション][4]をインストールします。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_s3" >}}


### ヘルプ

Amazon S3 インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon S3 インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-billing
[5]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_s3/metadata.csv
[6]: https://docs.datadoghq.com/ja/help/