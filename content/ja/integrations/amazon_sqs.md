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
      metadata_path: metadata.csv
      prefix: aws.sqs.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 102
    source_type_name: Amazon SQS
  monitors:
    sqs_message_processing_time: assets/monitors/sqs_message_processing_time.json
    sqs_message_queue_anomaly: assets/monitors/sqs_message_queue_anomaly.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
- cloud
- log collection
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_sqs
integration_id: amazon-sqs
integration_title: Amazon SQS
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: amazon_sqs
public_title: Amazon SQS
short_description: Amazon Simple Queue Service (SQS) は、高速、高信頼性、スケーラブルなフルマネージド型のメッセージキューサービスです。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::クラウド
  - Category::ログの収集
  configuration: README.md#Setup
  description: Amazon Simple Queue Service (SQS) は、高速、高信頼性、スケーラブルなフルマネージド型のメッセージキューサービスです。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon SQS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
{{< img src="integrations/amazon_sqs/sqsdashboard.png" alt="SQS ダッシュボード" popup="true">}}

## 概要

Amazon Simple Queue Service (SQS) は、高速、高信頼性、スケーラブルなフルマネージド型のメッセージキューサービスです。

このインテグレーションを有効にすると、Datadog にすべての SQS メトリクスを表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `SQS` が有効になっていることを確認します。
2. Amazon SQS のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    - `sqs:ListQueues`: 有効なキューを一覧表示するために使用されます。
    - `tag:GetResources`: SQS のキューに適用されているカスタムタグを取得します。

    詳細については、AWS ウェブサイト上の [SQS ポリシー][4]を参照してください。

3. [Datadog - Amazon SQS インテグレーション][5]をインストールします。

### 収集データ

#### SQS ログの有効化

証跡の構成方法については、[AWS CloudTrail を使用した Amazon SQS API コールのログ記録][6]を参照してください。証跡を定義する場合は、ログの書き込み先となる S3 バケットを選択します。

{{< img src="integrations/amazon_cloudtrail/cloudtrail_logging.png" alt="CloudTrail ロギング" popup="true" style="width:70%;">}}

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][7]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから手動で、Amazon SQS ログを含む S3 バケットにトリガーを追加します。Lambda で、トリガーリストから S3 をクリックします。
   {{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="S3 トリガーコンフィギュレーション" popup="true" style="width:70%;">}}
   Amazon SQS ログを含む S3 バケットを選択してトリガーを構成し、イベントタイプを `Object Created (All)` に変更して、Add ボタンをクリックします。
   {{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="S3 Lambda トリガーコンフィギュレーション" popup="true" style="width:70%;">}}

トリガーが追加されたら、[Datadog ログエクスプローラー][8]を使用してログを確認します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_sqs" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント

Amazon SQS インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon SQS インテグレーションには、サービスのチェック機能は含まれません。

## すぐに使える監視

Amazon SQS インテグレーションは、パフォーマンスを監視し最適化するために、すぐに使える監視機能を提供します。

- Amazon SQS ダッシュボード: すぐに使える [Amazon SQS ダッシュボード][10]を使用して、SQS キューの包括的な概要を得ることができます。
- 推奨モニター: [Amazon SQS の推奨モニター][11]を有効にすると、問題をプロアクティブに検出し、タイムリーなアラートを受信することができます。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-authentication-and-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-sqs
[6]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/logging-using-cloudtrail.html
[7]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[8]: https://app.datadoghq.com/logs
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_sqs/amazon_sqs_metadata.csv
[10]: https://app.datadoghq.com/dash/integration/6/aws-sqs
[11]: https://app.datadoghq.com/monitors/recommended
[12]: https://docs.datadoghq.com/ja/help/