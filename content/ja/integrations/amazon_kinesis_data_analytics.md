---
categories:
- cloud
- AWS
- ログの収集
dependencies: []
description: Amazon Kinesis Data Analytics のキーメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_kinesis_data_analytics/
draft: false
git_integration_title: amazon_kinesis_data_analytics
has_logo: true
integration_id: amazon-kinesis-data-analytics
integration_title: Amazon Kinesis Data Analytics
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_kinesis_data_analytics
public_title: Datadog-Amazon Kinesis Data Analytics インテグレーション
short_description: Amazon Kinesis Data Analytics のキーメトリクスを追跡します。
version: '1.0'
---

## 概要

Amazon Kinesis Data Analytics は、Apache Flink を使用して、ストリーミングデータを簡単に変換、クエリ、およびリアルタイムで分析することができます。

このインテグレーションを有効にすると、Datadog で Amazon Kinesis Data Analytics のすべてのメトリクスを見ることができます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]で、メトリクスコレクションの下にある `KinesisAnalytics` にチェックが入っていることを
   確認します。
2. [Datadog - Amazon Kinesis Data Analytics インテグレーション][3]をインストールします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_kinesis_data_analytics" >}}


### イベント

Amazon Kinesis Data Analytics インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon Kinesis Data Analytics インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-kinesis-data-analytics
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_kinesis_data_analytics/amazon_kinesis_data_analytics_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/