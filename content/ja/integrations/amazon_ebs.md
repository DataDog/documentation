---
aliases:
  - /ja/integrations/awsebs/
categories:
  - cloud
  - data store
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: スナップショットの経過時間、IOPS、読み取り/書き込み回数などを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_ebs/
draft: false
git_integration_title: amazon_ebs
has_logo: true
integration_id: amazon-ebs
integration_title: Amazon Elastic Block Store
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_ebs
public_title: Datadog-Amazon Elastic Block Store インテグレーション
short_description: スナップショットの経過時間、IOPS、読み取り/書き込み回数などを追跡。
version: '1.0'
---
## 概要

Amazon EBS は、AWS Cloud 内の Amazon EC2 インスタンスと共に使用される永続的ブロックストレージボリュームです。

このインテグレーションを有効にすると、Datadog にすべての EBS メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`EBS` をオンにします。
2. [Datadog - AWS EBS インテグレーション][3]をインストールします。

### ログの収集

#### ログの有効化

Amazon EBS から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_ebs` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][4] をまだ設定していない場合は、設定を行ってください。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon EBS ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_ebs" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント

AWS EBS インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS EBS インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

- [Amazon EBS 監視用のキーメトリクス][9]
- [Amazon EBS メトリクスの収集][10]
- [Datadog で Amazon EBS ボリュームを監視][11]

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_ebs
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ebs/amazon_ebs_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/
[9]: https://www.datadoghq.com/blog/amazon-ebs-monitoring
[10]: https://www.datadoghq.com/blog/collecting-amazon-ebs-metrics
[11]: https://www.datadoghq.com/blog/monitoring-amazon-ebs-volumes-with-datadog