---
categories:
- AWS
- クラウド
- コンプライアンス
- ログの収集
dependencies: []
description: Amazon Inspector のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/amazon_inspector/
draft: false
git_integration_title: amazon_inspector
has_logo: true
integration_id: ''
integration_title: Amazon Inspector
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_inspector
public_title: Datadog-Amazon Inspector インテグレーション
short_description: Amazon Inspector のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon Inspector は、AWS リソースのセキュリティとコンプライアンスの強化を支援するセキュリティ脆弱性評価サービスです。

このインテグレーションを有効にすると、Datadog にすべての Inspector メトリクスを表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `Inspector` が有効になっていることを確認します。
2. [Datadog - Amazon Inspector インテグレーション][3]をインストールします。

### 収集データ

#### ログの有効化

S3 バケットまたは CloudWatch のいずれかにログを送信するように Amazon Inspector を構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_inspector` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][4]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon Inspector ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_inspector" >}}


### ヘルプ

Amazon Inspector インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon Inspector インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-inspector
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_inspector/amazon_inspector_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/