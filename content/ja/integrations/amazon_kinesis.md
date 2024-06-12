---
aliases:
- /ja/integrations/awskinesis/
categories:
- aws
- cloud
- log collection
dependencies: []
description: Amazon Kinesis のキーメトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_kinesis/
draft: false
git_integration_title: amazon_kinesis
has_logo: true
integration_id: ''
integration_title: Amazon Kinesis
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_kinesis
public_title: Datadog-Amazon Kinesis インテグレーション
short_description: Amazon Kinesis のキーメトリクスを追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon Kinesis は、膨大な分散型データストリームをリアルタイムに処理するクラウドベースのフルマネージド型サービスです。

このインテグレーションを有効にすると、すべての Kinesis メトリクスが Datadog に表示され、カスタム Kinesis タグが収集されます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `Kinesis` が有効になっていることを確認します。
2. Amazon Kinesis のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    - `kinesis:ListStreams`: 使用できるストリームを一覧表示します。
    - `kinesis:DescribeStream`: Kinesis ストリームのタグと新しいメトリクスを追加します。
    - `kinesis:ListTagsForStream`: カスタムタグを追加します。

    詳細については、AWS ウェブサイト上の [Kinesis ポリシー][4]を参照してください。

3. [Datadog - Amazon Kinesis インテグレーション][5]をインストールします。

### 収集データ

#### ログの有効化

Datadog は、Amazon Kinesis Data Firehose 配信ストリームのデフォルトの宛先の一つです。AWS が Amazon Kinesis Data Firehose を完全に管理するため、ログのストリーミングに追加のインフラストラクチャーや転送構成を用意する必要はありません。

AWS Firehose コンソールで Amazon Data 配信ストリームを設定するか、CloudFormation テンプレートを使用して宛先を自動的に設定できます。

- [AWS Firehose コンソール][6]
- [CloudFormation テンプレート][7]

ただし、S3 バケットにログを送る場合は、AWS Lambda 関数を使用します。`amazon_kinesis` が _Target prefix_ として設定されていることを確認します。

1. [Datadog Forwarder Lambda 関数][8]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon Kinesis ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][9]
    - [CloudWatch ロググループに手動トリガーを追加][10]

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_kinesis" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### ヘルプ

Amazon Kinesis インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon Kinesis インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/streams/latest/dev/controlling-access.html
[5]: https://app.datadoghq.com/integrations/amazon-kinesis
[6]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=amazondatafirehosedeliverystream
[7]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=cloudformationtemplate
[8]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[9]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[10]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[11]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_kinesis/amazon_kinesis_metadata.csv
[12]: https://docs.datadoghq.com/ja/help/