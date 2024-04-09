---
app_id: amazon-mediaconvert
app_uuid: 9ec40305-4c25-41ee-afd8-cc6cc820dc36
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - aws.mediaconvert.hdoutput_duration
      metadata_path: metadata.csv
      prefix: aws.mediaconvert.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 245
    source_type_name: Amazon MediaConvert
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- AWS
- メトリクス
- ログの収集
- クラウド
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_mediaconvert
integration_id: amazon-mediaconvert
integration_title: Amazon MediaConvert
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: amazon_mediaconvert
public_title: Amazon MediaConvert
short_description: テレビ、コネクテッドデバイス向けビデオコンテンツのフォーマットと圧縮
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Log Collection
  - Category::Cloud
  configuration: README.md#Setup
  description: テレビ、コネクテッドデバイス向けビデオコンテンツのフォーマットと圧縮
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon MediaConvert
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Amazon Elemental MediaConvert は、オフラインビデオコンテンツをテレビや接続デバイスへの配信用にフォーマットして圧縮するサービスです。

このインテグレーションを有効にすると、Datadog にすべての Elemental MediaConvert メトリクスを表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `MediaConvert` が有効になっていることを確認します。
2. [Datadog - Amazon Elemental MediaConvert インテグレーション][3]をインストールします。

### 収集データ

#### ログの有効化

Amazon Elemental MediaConvert から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_mediaconvert` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][4]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールで、Amazon Elemental MediaConvert ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_mediaconvert" >}}


### ヘルプ

Amazon Elemental MediaConvert インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon Elemental MediaConvert インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-mediaconvert
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mediaconvert/amazon_mediaconvert_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/