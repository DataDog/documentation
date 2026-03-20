---
app_id: amazon-es
app_uuid: c00f4e38-7cc5-42ae-9ea1-519776f5f350
assets:
  dashboards:
    aws_es: assets/dashboards/amazon_es_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.es.cpuutilization
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.es.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 148
    source_type_name: Amazon ES
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- aws
- モニター
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_es
integration_id: amazon-es
integration_title: Amazon OpenSearch Service
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_es
public_title: Amazon OpenSearch Service
short_description: Amazon OpenSearch Service は、OpenSearch のデプロイと運用を容易にします。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Amazon OpenSearch Service は、OpenSearch のデプロイと運用を簡単にします。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon OpenSearch Service
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Amazon OpenSearch Service は、AWS Cloud における OpenSearch クラスターのデプロイ、運用、スケーリングを容易にするマネージドサービスです。OpenSearch は、ログ分析、リアルタイムアプリケーション監視、クリックストリーム分析などのユースケースに対応する、完全にオープンソースの検索・分析エンジンです。

このインテグレーションを有効にすると、OpenSearch Service のカスタムタグをすべて Datadog で確認することができます。なお、このインテグレーションは Amazon AWS OpenSearch Service 用であり、Amazon AWS の外部でホストされているスタンドアロンの Elasticsearch インスタンス用ではありません (そのようなインスタンスの場合は、代わりに [Elasticsearch インテグレーション][1]を使用してください)。

注: このインテグレーションでは、'es:ListTags'、'es:ListDomainNames'、'es:DescribeElasticsearchDomains' の権限が完全に有効になっている必要があります。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][3]で、`Metric Collection` タブの下にある `ES` が有効になっていることを確認します。
2. [Datadog - Amazon OpenSearch Service インテグレーション][4]をインストールします。

### ログ収集

#### ログの有効化

Amazon OpenSearch Service から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送信する場合は、_Target prefix_ に `amazon_elasticsearch` が設定されていることを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][5]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon Elasticsearch ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][6]
    - [CloudWatch ロググループに手動トリガーを追加][7]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_es" >}}


### イベント

Amazon OpenSearch Service インテグレーションには、イベントは含まれません。

### サービスチェック

Amazon OpenSearch Service インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/elastic
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-es
[5]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#manually-set-up-triggers
[8]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_es/assets/metrics/metric-spec.yaml
[9]: https://docs.datadoghq.com/ja/help/