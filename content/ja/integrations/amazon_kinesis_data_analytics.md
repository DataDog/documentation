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
integration_id: ''
integration_title: Amazon Kinesis Data Analytics
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_kinesis_data_analytics
public_title: Datadog-Amazon Kinesis Data Analytics インテグレーション
short_description: Amazon Kinesis Data Analytics のキーメトリクスを追跡します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon Kinesis Data Analytics は、Apache Flink を使用して、ストリーミングデータを簡単に変換、クエリ、およびリアルタイムで分析することができます。

このインテグレーションを有効にすると、Datadog で Amazon Kinesis Data Analytics のすべてのメトリクスを見ることができます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `Kinesis Analytics` が有効になっていることを確認します。
2. [Datadog - Amazon Kinesis Data Analytics インテグレーション][3]をインストールします。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_kinesis_data_analytics" >}}


### ヘルプ

Amazon Kinesis Data Analytics インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon Kinesis Data Analytics インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-kinesis-data-analytics
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_kinesis_data_analytics/amazon_kinesis_data_analytics_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/