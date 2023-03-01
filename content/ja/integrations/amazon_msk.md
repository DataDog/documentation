---
categories:
- cloud
- AWS
- ログの収集
dependencies: []
description: Amazon Managed Streaming for Apache Kafka (MSK) のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/amazon_msk/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-amazon-msk/
  tag: GitHub
  text: Datadog による Amazon Managed Streaming for Apache Kafka の監視
git_integration_title: amazon_msk
has_logo: true
integration_id: amazon-msk
integration_title: Amazon Managed Streaming for Apache Kafka
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_msk
public_title: Datadog-Amazon Managed Streaming for Apache Kafka インテグレーション
short_description: Amazon MSK のキーメトリクスを追跡
version: '1.0'
---

## 概要

Amazon Managed Streaming for Apache Kafka (MSK) は、Apache Kafka を使用してストリーミングデータを処理するアプリケーションを、簡単に構築して実行できるフルマネージド型のサービスです。

このインテグレーションでは、CloudWatch からメトリクスを収集するクローラーを使用します。Datadog Agent による MSK の監視については、[Amazon MSK (Agent)][1] のページをお読みください。

## セットアップ

Amazon MSK クローラーを有効にして、CloudWatch からの MSK メトリクスを Datadog で確認できるようにします。

### APM に Datadog Agent を構成する

[Amazon Web Services インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][3]で、`Metric Collection` タブの下にある `Kafka` が有効になっていることを確認します。

2. [Amazon MSK インテグレーション][4]をインストールします。

### ログの収集

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
{{< get-metrics-from-git "amazon_msk" >}}


### イベント

Amazon MSK クローラーには、イベントは含まれません。

### サービスのチェック

Amazon MSK インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/amazon_kafka/
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-msk
[5]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_msk/amazon_msk_metadata.csv
[9]: https://docs.datadoghq.com/ja/help/