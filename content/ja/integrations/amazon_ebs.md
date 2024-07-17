---
aliases:
- /ja/integrations/awsebs/
categories:
- cloud
- data stores
- aws
- log collection
dependencies: []
description: スナップショットの経過時間、IOPS、読み取り/書き込み回数などを追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_ebs/
draft: false
git_integration_title: amazon_ebs
has_logo: true
integration_id: ''
integration_title: Amazon Elastic Block Store
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_ebs
public_title: Datadog-Amazon Elastic Block Store インテグレーション
short_description: スナップショットの経過時間、IOPS、読み取り/書き込み回数などを追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon EBS は、AWS Cloud 内の Amazon EC2 インスタンスと共に使用される永続的ブロックストレージボリュームです。

このインテグレーションを有効にすると、Datadog にすべての EBS メトリクスを表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `EBS` が有効になっていることを確認します。
2. [Datadog - Amazon EBS インテグレーション][3]をインストールします。

**注**: このインテグレーションは、監視対象の EC2 に接続された EBS ボリュームのメトリクスを収集します。すべての EBS メトリクスを収集するには、[AWS インテグレーションページ][2]で EC2 にチェックを入れ、[リソース収集を制限する][4]設定で EC2 を監視対象から除外していないことを確認します。

### 収集データ

#### ログの有効化

Amazon EBS から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_ebs` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][5]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon EBS ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][6]
    - [CloudWatch ロググループに手動トリガーを追加][7]

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_ebs" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### ヘルプ

Amazon EBS インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon EBS インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

## その他の参考資料

- [Amazon EBS 監視のキーメトリクス][10]
- [Amazon EBS メトリクスの収集][11]
- [Datadog で Amazon EBS ボリュームを監視][12]

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-ebs
[4]: https://docs.datadoghq.com/ja/account_management/billing/aws/#aws-resource-exclusion
[5]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ebs/amazon_ebs_metadata.csv
[9]: https://docs.datadoghq.com/ja/help/
[10]: https://www.datadoghq.com/blog/amazon-ebs-monitoring
[11]: https://www.datadoghq.com/blog/collecting-amazon-ebs-metrics
[12]: https://www.datadoghq.com/blog/monitoring-amazon-ebs-volumes-with-datadog