---
aliases:
  - /ja/integrations/awskinesis/
categories:
  - cloud
  - processing
  - messaging
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Amazon Kinesis のキーメトリクスを追跡。
doc_link: 'https://docs.datadoghq.com/integrations/amazon_kinesis/'
git_integration_title: amazon_kinesis
has_logo: true
integration_title: Amazon Kinesis
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_kinesis
public_title: Datadog-Amazon Kinesis インテグレーション
short_description: Amazon Kinesis のキーメトリクスを追跡。
version: '1.0'
---
## 概要

Amazon Kinesis は、膨大な分散型データストリームをリアルタイムに処理するクラウドベースのフルマネージド型サービスです。

このインテグレーションを有効にすると、すべての Kinesis メトリクスが Datadog に表示され、カスタム Kinesis タグが収集されます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`Kinesis` をオンにします。
2. Amazon Kinesis のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    - `kinesis:ListStreams`: 使用できるストリームを一覧表示します。
    - `kinesis:DescribeStream`: Kinesis ストリームのタグと新しいメトリクスを追加します。
    - `kinesis:ListTagsForStream`: カスタムタグを追加します。

    Kinesis ポリシーの詳細については、[AWS Web サイトのガイド][4]を参照してください。

3. [Datadog - AWS Kinesis インテグレーション][5]をインストールします。

### ログの収集

#### ログの有効化

Amazon Kinesis から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_kinesis` に設定されているかを確認してください。

#### Datadog へのログの送信

1. [Datadog ログ コレクション AWS Lambda 関数][6]をまだ実行していない場合は、セットアップします。
2. lambda 関数がインストールされたら、AWS コンソールから、Amazon Kinesis ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][7]
    - [Cloudwatch ロググループに手動トリガーを追加][8]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_kinesis" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント

AWS Kinesis インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS AWS Kinesis インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_kinesis.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_kinesis
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[7]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[8]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_kinesis/amazon_kinesis_metadata.csv
[10]: https://docs.datadoghq.com/ja/help/