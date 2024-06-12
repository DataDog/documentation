---
aliases:
- /ja/integrations/awsmq/
categories:
- cloud
- aws
- log collection
dependencies: []
description: AWS MQ のキーメトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_mq/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-amazonmq-metrics-with-datadog
  tag: ブログ
  text: Datadog で Amazon MQ のメトリクスを監視
git_integration_title: amazon_mq
has_logo: true
integration_id: ''
integration_title: Amazon MQ
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_mq
public_title: Datadog-Amazon MQ インテグレーション
short_description: AWS MQ のキーメトリクスを追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon MQ は、クラウドでメッセージブローカーを容易にセットアップして運用できる、Apache ActiveMQ 向けのマネージド型メッセージブローカーサービスです。

このインテグレーションを有効にすると、すべての Amazon MQ メトリクスを Datadog に表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `MQ` が有効になっていることを確認します。

2. [Datadog - AWS Amazon MQ インテグレーション][3]をインストールします。

### 収集データ

#### ログの有効化

Amazon MQ から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_mq` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][4]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon MQ ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_mq" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### ヘルプ

AWS Amazon MQ インテグレーションには、イベントは含まれません。

### ヘルプ

AWS Amazon MQ インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-mq
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mq/amazon_mq_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/