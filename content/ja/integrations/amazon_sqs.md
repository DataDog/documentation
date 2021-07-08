---
aliases:
  - /ja/integrations/awssqs/
categories:
  - cloud
  - processing
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: キューサイズ、平均メッセージサイズ、メッセージ数などを追跡。
doc_link: 'https://docs.datadoghq.com/integrations/amazon_sqs/'
draft: false
git_integration_title: amazon_sqs
has_logo: true
integration_id: amazon-sqs
integration_title: Amazon SQS
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_sqs
public_title: Datadog-Amazon SQS インテグレーション
short_description: キューサイズ、平均メッセージサイズ、メッセージ数などを追跡。
version: '1.0'
---
{{< img src="integrations/amazon_sqs/sqsdashboard.png" alt="SQS ダッシュボード" popup="true">}}

## 概要

Amazon Simple Queue Service (SQS) は、高速、高信頼性、スケーラブルなフルマネージド型のメッセージキューサービスです。

このインテグレーションを有効にすると、Datadog にすべての SQS メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`SQS` をオンにします。
2. Amazon SQS のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    - `sqs:ListQueues`: 有効なキューを一覧表示するために使用されます。
    - `tag:GetResources`: SQS のキューに適用されているカスタムタグを取得します。

    SQS ポリシーの詳細については、[AWS Web サイトのガイド][4]を参照してください。

3. [Datadog - AWS SQS インテグレーション][5]をインストールします。

### ログの収集

#### SQS ログの有効化

証跡の構成方法については、[AWS CloudTrail を使用した Amazon SQS API コールのログ記録][6]を参照してください。証跡を定義する場合は、ログの書き込み先となる S3 バケットを選択します。

{{< img src="integrations/amazon_cloudtrail/cloudtrail_logging.png" alt="CloudTrail ロギング" popup="true" style="width:70%;">}}

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][7]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから手動で、Amazon SQS ログを含む S3 バケットにトリガーを追加します。Lambda で、トリガーリストから S3 をクリックします。
   {{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="S3 トリガーコンフィギュレーション" popup="true" style="width:70%;">}}
   Amazon SQS ログを含む S3 バケットを選択してトリガーを構成し、イベントタイプを `Object Created (All)` に変更して、Add ボタンをクリックします。
   {{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="S3 Lambda トリガーコンフィギュレーション" popup="true" style="width:70%;">}}

完了したら、[Datadog ログエクスプローラー][8]を使用してログを確認します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_sqs" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント

AWS SQS インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS SQS インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_sqs.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_sqs
[6]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/logging-using-cloudtrail.html
[7]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#create-a-new-lambda-function
[8]: https://app.datadoghq.com/logs
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_sqs/amazon_sqs_metadata.csv
[10]: https://docs.datadoghq.com/ja/help/