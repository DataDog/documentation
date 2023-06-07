---
categories:
- cloud
- aws
- ログの収集
dependencies: []
description: Amazon Shield のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/amazon_shield/
draft: false
git_integration_title: amazon_shield
has_logo: true
integration_id: amazon-shield
integration_title: Amazon Shield
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_shield
public_title: Datadog-Amazon Shield インテグレーション
short_description: Amazon Shield のキーメトリクスを追跡
version: '1.0'
---

## 概要

DDoS 攻撃に対する保護のため、Amazon は Shield Standard と Shield Advanced を提供しています。

このインテグレーションを有効にすると、Datadog にすべての Shield メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `DDoSProtection` が有効になっていることを確認します。
2. [Datadog - Amazon Shield インテグレーション][3]をインストールします。

### ログの収集

#### ログの有効化

Amazon Shield から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、`amazon_shield` に _Target prefix_ が設定されていることを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][4]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールで、Amazon Shield ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_shield" >}}


### イベント

Amazon Shield インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon Shield インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-shield
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_shield/amazon_shield_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/