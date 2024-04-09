---
categories:
- cloud
- aws
- ログの収集
dependencies: []
description: AWS Elemental MediaPackage のキーメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_mediapackage/
draft: false
git_integration_title: amazon_mediapackage
has_logo: true
integration_id: ''
integration_title: AWS Elemental MediaPackage
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_mediapackage
public_title: Datadog-AWS Elemental MediaPackage インテグレーション
short_description: AWS Elemental MediaPackage のキーメトリクスを追跡します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

AWS Elemental MediaPackage は、さまざまな再生デバイスに安全性、拡張性、信頼性の高いビデオストリームを配信するジャストインタイムのビデオパッケージングおよびオリジネーションサービスです。

このインテグレーションを有効にすると、Datadog にすべての Elemental MediaPackage メトリクスを表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `MediaPackage` が有効になっていることを確認します。
2. [Datadog - AWS Elemental MediaPackage インテグレーション][3]をインストールします。

### 収集データ

#### ログの有効化

AWS Elemental MediaPackage から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_mediapackage` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][4]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールで、AWS Elemental MediaPackage ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_mediapackage" >}}


### ヘルプ

AWS Elemental MediaPackage インテグレーションには、イベントは含まれません。

### ヘルプ

AWS Elemental MediaPackage インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-mediapackage
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mediapackage/amazon_mediapackage_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/