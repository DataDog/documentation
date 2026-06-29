---
app_id: amazon-sqs
app_uuid: 3a036cf4-b953-441a-ad13-a99f2b8a684e
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.sqs.sent_message_size
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.sqs.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 102
    source_type_name: Amazon SQS
  monitors:
    SQS Message Processing Time Monitor: assets/monitors/sqs_message_processing_time.json
    SQS Message Queue Anomaly Monitor: assets/monitors/sqs_message_queue_anomaly.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- metrics
- cloud
- log collection
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_sqs
integration_id: amazon-sqs
integration_title: Amazon SQS
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_sqs
public_title: Amazon SQS
short_description: Amazon Simple Queue Service (SQS) は、高速、高信頼性、スケーラブルなフルマネージド型のメッセージキューサービスです。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::クラウド
  - Category::ログの収集
  - Offering::Integration
  - Product::Data Streams Monitoring
  configuration: README.md#Setup
  description: Amazon Simple Queue Service (SQS) は、高速、高信頼性、スケーラブルなフルマネージド型のメッセージキューサービスです。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon SQS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
![SQS ダッシュボード][1]

## 概要

Amazon Simple Queue Service (SQS) は、高速、高信頼性、スケーラブルなフルマネージド型のメッセージキューサービスです。

このインテグレーションを有効にすると、Datadog にすべての SQS メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][3]で、`Metric Collection` タブで `SQS` が有効になっていることを確認します。
2. Amazon SQS のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][4]に追加します。

    - `sqs:ListQueues`: 有効なキューを一覧表示するために使用されます。
    - `tag:GetResources`: SQS のキューに適用されているカスタムタグを取得します。

    詳細については、AWS ウェブサイトの [SQS ポリシー][5]を参照してください。

3. [Datadog - Amazon SQS インテグレーション][6]をインストールします。

### ログ収集

#### SQS ログの有効化

証跡の構成方法については、[AWS CloudTrail を使用した Amazon SQS API コールのログ記録][7]を参照してください。証跡を定義する場合は、ログの書き込み先となる S3 バケットを選択します。

![CloudTrail によるログ記録][8]

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][9]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから手動で、Amazon SQS ログを含む S3 バケットにトリガーを追加します。Lambda で、トリガーリストから S3 をクリックします。
   ![S3 トリガーの構成][10]
   Amazon SQS ログを含む S3 バケットを選択してトリガーを構成し、イベントタイプを `Object Created (All)` に変更して、Add ボタンをクリックします。
   ![S3 Lambda トリガーの構成][11]

トリガーが追加されたら、[Datadog Log Explorer][12] を使用してログを確認します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_sqs" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント

Amazon SQS インテグレーションには、イベントは含まれません。

### サービスチェック

Amazon SQS インテグレーションには、サービスのチェック機能は含まれません。

## すぐに使える監視

Amazon SQS インテグレーションは、パフォーマンスを監視し最適化するために、すぐに使える監視機能を提供します。

- Amazon SQS Dashboard: すぐに使える [Amazon SQS ダッシュボード][14]で、SQS キューの全体像を把握できます。
- Recommended Monitors: [Amazon SQS の推奨モニター][15]を有効にすることで、問題を事前に検知し、タイムリーにアラートを受け取ることができます。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][16]までお問合せください。

[1]: images/sqsdashboard.png
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[5]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-authentication-and-access-control.html
[6]: https://app.datadoghq.com/integrations/amazon-sqs
[7]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/logging-using-cloudtrail.html
[8]: images/cloudtrail_logging.png
[9]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[10]: images/s3_trigger_configuration.png
[11]: images/s3_lambda_trigger_configuration.png
[12]: https://app.datadoghq.com/logs
[13]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_sqs/assets/metrics/metric-spec.yaml
[14]: https://app.datadoghq.com/dash/integration/6/aws-sqs
[15]: https://app.datadoghq.com/monitors/recommended
[16]: https://docs.datadoghq.com/ja/help/