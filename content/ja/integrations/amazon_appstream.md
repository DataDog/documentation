---
categories:
- AWS
- クラウド
- 構成 & デプロイ
- ログの収集
custom_kind: integration
dependencies: []
description: Amazon AppStream のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/amazon_appstream/
draft: false
git_integration_title: amazon_appstream
has_logo: true
integration_id: ''
integration_title: Amazon AppStream
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_appstream
public_title: Datadog-Amazon AppStream インテグレーション
short_description: Amazon AppStream のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon AppStream は、AWS から Web ブラウザへデスクトップアプリケーションをストリーミングできるフルマネージド型の安全なアプリケーションストリーミングサービスです。

このインテグレーションを有効にすると、Datadog にすべての AppStream メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `AppStream` が有効になっていることを確認します。
2. [Datadog - Amazon AppStream インテグレーション][3]をインストールします。

### 収集データ

#### ログの有効化

Amazon AppStream から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_appstream` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][4]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon AppStream ログを含む S3 バケットまたは CloudWatch ロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon-appstream" >}}


### イベント

Amazon AppStream インテグレーションには、イベントは含まれません。

### サービスチェック

Amazon AppStream インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-appstream
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_appstream/amazon_appstream_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/
