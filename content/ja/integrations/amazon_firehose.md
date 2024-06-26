---
aliases:
- /ja/integrations/awsfirehose/
categories:
- aws
- cloud
- log collection
dependencies: []
description: Amazon Data Firehose のキーメトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_firehose/
draft: false
git_integration_title: amazon_firehose
has_logo: true
integration_id: ''
integration_title: Amazon Data Firehose
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_firehose
public_title: Datadog-Amazon Data Firehose インテグレーション
short_description: Amazon Data Firehose のキーメトリクスを追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon Data Firehose は、AWS にストリーミングデータをロードする最も簡単な方法です。

このインテグレーションを有効にすると、Datadog にすべての Firehose メトリクスを表示できます。

**注**: Amazon Data Firehose は、以前は Amazon Kinesis Data Firehose と呼ばれていました。詳しくは、[AWS の最新情報][1]の記事をご覧ください。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][3]で、`Metric Collection` タブの下にある `Firehose` が有効になっていることを確認します。
2. [Datadog - Amazon Data Firehose インテグレーション][4]をインストールします。

### 収集データ

#### ログの有効化

Amazon Data Firehose から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_firehose` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][5]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon Data Firehose ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][6]
    - [CloudWatch ロググループに手動トリガーを追加][7]

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_firehose" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### ヘルプ

Amazon Data Firehose インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon Data Firehose インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://aws.amazon.com/about-aws/whats-new/2024/02/amazon-data-firehose-formerly-kinesis-data-firehose/
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-firehose
[5]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_firehose/amazon_firehose_metadata.csv
[9]: https://docs.datadoghq.com/ja/help/