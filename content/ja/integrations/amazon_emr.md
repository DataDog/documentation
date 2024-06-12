---
aliases:
- /ja/integrations/awsemr/
categories:
- aws
- cloud
- log collection
dependencies: []
description: Amazon EMR のキーメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_emr/
draft: false
git_integration_title: amazon_emr
has_logo: true
integration_id: ''
integration_title: Amazon EMR
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_emr
public_title: Datadog-Amazon EMR インテグレーション
short_description: Amazon EMR のキーメトリクスを追跡します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon EMR は、膨大な量のデータを迅速かつコスト効率よく簡単に処理できる Web サービスです。

このインテグレーションを有効にすると、EMR メトリクスを Datadog に表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `EMR` が有効になっていることを確認します。
2. Amazon EMR のメトリクスを収集するには、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。詳細については、AWS ウェブサイト上の [EMR ポリシー][4]を参照してください。

    | AWS アクセス許可                     | 説明                         |
    | ---------------------------------- | ----------------------------------- |
    | `elasticmapreduce:ListClusters`    | 使用できるクラスターを一覧表示します。          |
    | `elasticmapreduce:DescribeCluster` | CloudWatch EMR メトリクスにタグを追加します。|

3. [Datadog - Amazon EMR インテグレーション][5]をインストールします。

### 収集データ

#### ログの有効化

Amazon EMR から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_emr` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][6]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon EMR ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][7]
    - [CloudWatch ロググループに手動トリガーを追加][8]

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_emr" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### ヘルプ

Amazon EMR インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon EMR インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/load-balancer-authentication-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-emr
[6]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[7]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[8]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_emr/amazon_emr_metadata.csv
[10]: https://docs.datadoghq.com/ja/help/