---
categories:
- cloud
- aws
- ログの収集
dependencies: []
description: Amazon Translate のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/amazon_translate/
draft: false
git_integration_title: amazon_translate
has_logo: true
integration_id: ''
integration_title: Amazon Translate
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_translate
public_title: Datadog-Amazon Translate インテグレーション
short_description: Amazon Translate のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon Translate は、英語とサポートされているさまざまな言語の間でテキストを相互に翻訳するためのニューラル機械翻訳サービスです。

このインテグレーションを有効にすると、Datadog にすべての Translate メトリクスを表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `Translate` が有効になっていることを確認します。
2. [Datadog - Amazon Translate インテグレーション][3]をインストールします。

### 収集データ

#### ログの有効化

Amazon Translate から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_translate` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][4]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから手動で、ログを含む CloudWatch ロググループにトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_translate" >}}


### ヘルプ

Amazon Translate インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon Translate インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-translate
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_translate/amazon_translate_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/