---
categories:
- cloud
- aws
- ログの収集
dependencies: []
description: Amazon Elemental MediaConnect のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/amazon_mediaconnect/
draft: false
git_integration_title: amazon_mediaconnect
has_logo: true
integration_id: amazon-mediaconnect
integration_title: Amazon Elemental MediaConnect
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_mediaconnect
public_title: Datadog-Amazon Elemental MediaConnect インテグレーション
short_description: Amazon Elemental MediaConnect のキーメトリクスを追跡
version: '1.0'
---

## 概要

Amazon Elemental MediaConnect は、ライブビデオのトランスポートサービスです。

このインテグレーションを有効にすると、Datadog にすべての Elemental MediaConnect メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `MediaConnect` が有効になっていることを確認します。
2. [Datadog - Amazon Elemental MediaConnect インテグレーション][3]をインストールします。

### ログの収集

#### ログの有効化

Amazon Elemental MediaConnect から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_mediaconnect` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][4]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon Elemental MediaConnect ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_mediaconnect" >}}


### イベント

Amazon Elemental MediaConnect インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon Elemental MediaConnect インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-mediaconnect
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mediaconnect/amazon_mediaconnect_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/