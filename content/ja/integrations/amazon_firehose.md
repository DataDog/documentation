---
aliases:
  - /ja/integrations/awsfirehose/
categories:
  - cloud
  - processing
  - aws
  - log collection
ddtype: クローラー
dependencies: []
description: Amazon Firehose のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_firehose/'
git_integration_title: amazon_firehose
has_logo: true
integration_title: Amazon Firehose
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_firehose
public_title: Datadog-Amazon Firehose インテグレーション
short_description: Amazon Firehose のキーメトリクスを追跡
version: '1.0'
---
## 概要

Amazon Firehose は、AWS にストリーミングデータをロードする最も簡単な方法です。

このインテグレーションを有効にすると、Datadog にすべての Firehose メトリクスを表示できます。

## セットアップ 
### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### コンフィグレーション

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`Firehose` をオンにします。

2. [Datadog - AWS Firehose インテグレーション][3]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_firehose" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント
AWS Kinesis Firehose インテグレーションには、イベントは含まれません。

### サービスのチェック
AWS AWS Kinesis Firehose インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_firehose
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_firehose/amazon_firehose_metadata.csv
[5]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}