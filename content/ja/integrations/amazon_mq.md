---
aliases:
  - /ja/integrations/awsmq/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: AWS MQ のキーメトリクスを追跡。
doc_link: 'https://docs.datadoghq.com/integrations/amazon_mq/'
draft: false
further_reading:
  - link: 'https://www.datadoghq.com/blog/monitor-amazonmq-metrics-with-datadog'
    tag: ブログ
    text: Datadog で Amazon MQ のメトリクスを監視
git_integration_title: amazon_mq
has_logo: true
integration_id: amazon-mq
integration_title: Amazon MQ
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_mq
public_title: Datadog-Amazon MQ インテグレーション
short_description: AWS MQ のキーメトリクスを追跡。
version: '1.0'
---
## 概要

Amazon MQ は、クラウドでメッセージブローカーを容易にセットアップして運用できる、Apache ActiveMQ 向けのマネージド型メッセージブローカーサービスです。

このインテグレーションを有効にすると、すべての Amazon MQ メトリクスを Datadog に表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`MQ` をオンにします。

2. [Datadog - AWS Amazon MQ インテグレーション][3]をインストールします。

### ログの収集

#### ログの有効化

Amazon MQ から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_mq` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][4] をまだ設定していない場合は、設定を行ってください。
2. lambda 関数がインストールされたら、AWS コンソールから、Amazon MQ ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_mq" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント

AWS Amazon MQ インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS Amazon MQ インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_mq
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mq/amazon_mq_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/