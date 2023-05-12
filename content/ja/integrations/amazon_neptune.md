---
categories:
- AWS
- クラウド
- data store
- ログの収集
dependencies: []
description: Amazon Neptune のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/amazon_neptune/
draft: false
git_integration_title: amazon_neptune
has_logo: true
integration_id: amazon-neptune
integration_title: Amazon Neptune
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_neptune
public_title: Datadog-Amazon Neptune インテグレーション
short_description: Amazon Neptune のキーメトリクスを追跡
version: '1.0'
---

## 概要

Amazon Neptune は、高速かつ信頼性の高いフルマネージド型グラフデータベースサービスです。高度に接続されたデータセットと連携するアプリケーションを簡単に構築および実行できます。

このインテグレーションを有効にすると、Datadog にすべての Neptune メトリクスを表示できます。

## セットアップ

### APM に Datadog Agent を構成する

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `Neptune` が有効になっていることを確認します。
2. [Datadog - Amazon Neptune インテグレーション][3]をインストールします。

### ログの収集

#### ログの有効化

Amazon Neptune から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_neptune` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][4]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon Neptune ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_neptune" >}}


### イベント

Amazon Neptune インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon Neptune インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-neptune
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_neptune/amazon_neptune_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/