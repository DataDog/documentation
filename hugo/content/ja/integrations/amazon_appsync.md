---
app_id: amazon-appsync
app_uuid: fcd7b517-45ee-4281-8735-42728f4dc6c3
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: aws.appsync.latency
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.appsync.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 238
    source_type_name: Amazon AppSync
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- AWS
- クラウド
- data stores
- ログの収集
custom_kind: インテグレーション
dependencies: []
description: AWS AppSync のキーメトリクスを追跡。
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/amazon_appsync/
draft: false
git_integration_title: amazon_appsync
has_logo: true
integration_id: amazon-appsync
integration_title: AWS AppSync
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_appsync
public_title: AWS AppSync
short_description: Simplify app development with AppSync's flexible, secure API for
  accessing and combining data from various sources.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Cloud
  - Category::Data Stores
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: Simplify app development with AppSync's flexible, secure API for accessing
    and combining data from various sources.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS AppSync
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

AWS AppSync は、1 つ以上のデータソースのデータに安全にアクセス、操作、結合するための柔軟な API の作成を可能にして、アプリケーション開発を簡略化します。

このインテグレーションを有効にすると、Datadog にすべての AppSync メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `AppSync` が有効になっていることを確認します。
2. [Datadog - AWS AppSync インテグレーション][3]をインストールします。

### ログ収集

#### ログの有効化

AWS AppSync から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_appsync` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][4]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、AWS AppSync ログを含む S3 バケットまたは CloudWatch ロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_appsync" >}}


### イベント

AWS AppSync インテグレーションには、イベントは含まれません。

### サービスチェック

AWS AppSync インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-appsync
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_appsync/assets/metrics/metric-spec.yaml
[8]: https://docs.datadoghq.com/ja/help/