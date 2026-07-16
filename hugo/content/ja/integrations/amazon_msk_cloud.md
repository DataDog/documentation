---
app_id: amazon-msk
app_uuid: 1d3bab8a-f99a-45ad-b1c6-69e919125029
assets:
  dashboards:
    amazon_msk: assets/dashboards/amazon_msk.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: aws.kafka.zoo_keeper_request_latency_ms_mean
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.kafka.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 235
    source_type_name: Amazon MSK
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- クラウド
- aws
- ログの収集
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_msk_cloud
integration_id: amazon-msk
integration_title: Amazon MSK
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_msk_cloud
public_title: Amazon MSK
short_description: ストリーミング データを処理するアプリケーションの構築と実行を簡素化します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::AWS
  - Category::Log Collection
  - Offering::Integration
  - 製品::Data Streams Monitoring
  configuration: README.md#Setup
  description: ストリーミングデータを処理するアプリケーションの構築と実行を簡素化します。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-amazon-msk/
  support: README.md#Support
  title: Amazon MSK
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Amazon Managed Streaming for Apache Kafka (MSK) は、Apache Kafka を使用してストリーミングデータを処理するアプリケーションを、簡単に構築して実行できるフルマネージド型のサービスです。

このインテグレーションでは、CloudWatch からメトリクスを収集するクローラーを使用します。Datadog Agent による MSK の監視については、[Amazon MSK (Agent)][1] のページをお読みください。

## セットアップ

Amazon MSK クローラーを有効にして、CloudWatch からの MSK メトリクスを Datadog で確認できるようにします。

### インストール

[Amazon Web Services インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][3]で、`Metric Collection` タブの下にある `Kafka` が有効になっていることを確認します。

2. [Amazon MSK インテグレーション][4]をインストールします。

### ログ収集

#### ログの有効化

Amazon MSK から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**:
- S3 バケットにログを送る場合は、_Target prefix_ が `amazon_msk` に設定されているかを確認してください。
- CloudWatch のロググループにログを送る場合は、その名前に `msk` という部分文字列が含まれていることを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][5]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon MSK ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][6]
    - [CloudWatch ロググループに手動トリガーを追加][7]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_msk_cloud" >}}


### イベント

Amazon MSK クローラーには、イベントは含まれません。

### サービスチェック

Amazon MSK インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/amazon_msk/
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-msk
[5]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_msk_cloud/assets/metrics/metric-spec.yaml
[9]: https://docs.datadoghq.com/ja/help/