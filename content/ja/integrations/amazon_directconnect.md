---
aliases:
- /ja/integrations/awsdirectconnect/
categories:
- cloud
- aws
- log collection
dependencies: []
description: AWS Direct Connect のキーメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_directconnect/
draft: false
git_integration_title: amazon_directconnect
has_logo: true
integration_id: ''
integration_title: AWS Direct Connect
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_directconnect
public_title: Datadog-AWS Direct Connect インテグレーション
short_description: AWS Direct Connect のキーメトリクスを追跡します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

このインテグレーションは、AWS Direct Connect から接続状態、送受信ビットレート、送受信パケットレートなどのメトリクスを収集します。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `DirectConnect` が有効になっていることを確認します。
2. AWS Direct Connect メトリクスの収集には、これらの権限を [Datadog IAM ポリシー][3] に追加してください。

    - `directconnect:DescribeConnections`: 使用できる Direct Connect 接続をリストするために使用されます。
    - `directconnect:DescribeTags`: Direct Connect 接続に適用されるカスタムタグを収集するために使用されます。

    詳細については、AWS ウェブサイト上の [Direct Connect ポリシー][4]を参照してください。

3. [Datadog - AWS Direct Connect インテグレーション][5]をインストールします。

### 収集データ

#### ログの有効化

AWS Direct Connect を構成して、ログを S3 バケットか CloudWatch のいずれかに送信します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_directconnect` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][6]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、AWS Direct Connect ログを含む S3 バケットまたは CloudWatch ロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][7]
    - [CloudWatch ロググループに手動トリガーを追加][8]

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_directconnect" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### ヘルプ

AWS Direct Connect インテグレーションには、イベントは含まれません。

### ヘルプ

AWS Direct Connect インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/directconnect/latest/UserGuide/security-iam.html
[5]: https://app.datadoghq.com/integrations/amazon-directconnect
[6]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[7]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[8]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_directconnect/amazon_directconnect_metadata.csv
[10]: https://docs.datadoghq.com/ja/help/