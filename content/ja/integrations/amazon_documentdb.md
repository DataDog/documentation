---
categories:
  - cloud
  - data store
  - aws
  - ログの収集
ddtype: crawler
dependencies: []
description: AWS DocumentDB のメトリクスとログを監視
doc_link: https://docs.datadoghq.com/integrations/amazon_documentdb/
draft: false
further_reading:
  - link: https://www.datadoghq.com/blog/monitor-documentdb-with-datadog/
    tag: ブログ
    text: Amazon DocumentDB のメトリクスとログを Datadog で収集
git_integration_title: amazon_documentdb
has_logo: true
integration_id: amazon-documentdb
integration_title: Amazon DocumentDB
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_documentdb
public_title: Datadog-Amazon DocumentDB インテグレーション
short_description: AWS DocumentDB のメトリクスとログを監視
version: '1.0'
---
## 概要

Amazon DocumentDB は、MongoDB のワークロードをサポートする、高速で、スケーラブル、高可用性、フルマネージド型のドキュメントデータベースサービスです。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`DocumentDB` をオンにします。
2. [Datadog - AWS DocumentDB インテグレーション][3]をインストールします。

### ログの収集

#### ログの有効化

Amazon DocumentDB から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_documentdb` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][4] をまだ設定していない場合は、設定を行ってください。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon DocumentDB ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_documentdb" >}}


AWS から取得される各メトリクスには、dbinstanceidentifier、dbclusteridentifier など、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント

AWS DocumentDB インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS DocumentDB インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_documentdb
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_documentdb/amazon_documentdb_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/