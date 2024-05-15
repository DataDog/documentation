---
aliases:
- /ja/integrations/awsml/
categories:
- cloud
- aws
- log collection
- ai/ml
dependencies: []
description: AWS Machine Learning の予測カウントおよび失敗数を追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_machine_learning/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/ml-model-monitoring-in-production-best-practices/
  tag: ブログ
  text: 本番環境で ML モデルを監視するためのベストプラクティス
git_integration_title: amazon_machine_learning
has_logo: true
integration_id: ''
integration_title: Amazon Machine Learning
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_machine_learning
public_title: Datadog-Amazon Machine Learning インテグレーション
short_description: AWS Machine Learning の予測カウントおよび失敗数を追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

AWS Machine Learning は、どのレベルの開発者でも機械学習技術を容易に使用できるようにするサービスです。

このインテグレーションを有効にすると、Datadog にすべての Machine Learning メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `ML` が有効になっていることを確認します。
2. [Datadog - AWS Machine Learning インテグレーション][3]をインストールします。

### ログ収集

#### ログの有効化

AWS Machine Learning から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_machine_learning` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][4]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、AWS Machine Learning ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## データ収集

### メトリクス
{{< get-metrics-from-git "amazon_machine_learning" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント

AWS Machine Learning インテグレーションには、イベントは含まれません。

### サービスチェック

AWS Machine Learning インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-machine-learning
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_machine_learning/amazon_machine_learning_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/