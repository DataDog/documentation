---
aliases:
- /ja/integrations/amazon_vpc/
categories:
- cloud
- aws
- ログの収集
dependencies: []
description: AWS VPC ログを収集
doc_link: https://docs.datadoghq.com/integrations/amazon_vpc/
draft: false
git_integration_title: amazon_vpc
has_logo: false
integration_id: ''
integration_title: Amazon VPC
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_vpc
public_title: Datadog-Amazon VPC インテグレーション
short_description: AWS VPC ログを収集
version: '1.0'
---

## 概要

Amazon Virtual Private Cloud (Amazon VPC) を使用すると、仮想ネットワーク内で AWS リソースを起動できます。VPC フローログは、VPC 内のネットワークインターフェイスを行き来する IP トラフィックに関する情報をキャプチャできる機能です。

## セットアップ

### インストール

Datadog で [Amazon Web Services インテグレーション][1]がセットアップされている必要があります。

### メトリクスの収集

`aws.vpc.flowlogs.*` 以外の AWS VPC メトリクスを収集するための追加の手順は必要ありません。`aws.vpc.flowlogs.*` で始まるメトリクスは、[Datadog VPC Flow Logs][2] インテグレーションによって生成されます。フローログメトリクスの収集を有効にする方法については、[ログ収集](#log-collection)セクションを参照してください。

`aws.vpc.subnet.*` メトリクスについては [Datadog サポート][3]にお問い合わせいただき、お使いのアカウントでの収集を有効化してください。

### ログの収集

#### VPC フローログ記録の有効化

VPC のフローログは、S3 バケットまたは CloudWatch のロググループに送信することができます。

1. AWS コンソールで、監視したい VPC に移動します。
2. **Flow logs** タブに移動します。
3. **Create flow log** をクリックします。
4. `All` フィルターを選択すると、受け入れた接続と拒否した接続の両方を取得することができます。
5. ログを送信する S3 バケットまたは CloudWatch のロググループを選択します。

**注**: Lambda が自動的に `vpc` ソースをログに設定するようにするには、S3 ファイル名または CloudWatch ロググループ名のプレフィックスとして `vpc` を指定します。

#### ログを Datadog に送信する方法

1. AWS アカウントで [Datadog Forwarder Lambda 関数][4] をまだセットアップしていない場合は、セットアップします。
2. 設定したら、Datadog Forwarder Lambda 関数に移動します。Function Overview セクションで、**Add Trigger** をクリックします。
3. Trigger Configuration で **S3** または **CloudWatch Logs** トリガーを選択します。
4. VPC のログが含まれる S3 バケットまたは CloudWatch のロググループを選択します。
5. イベントの種類は `All object create events` のままにしておきます。
6. **Add** をクリックすると、Lambda にトリガーが追加されます。

[ログエクスプローラー][5]に移動して、ログを確認します。

AWS Services のログを収集する方法については、[Datadog Lambda 関数で AWS Services のログを送信する][6]を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_vpc" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント

AWS VPC インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS VPC インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:464622532012:applications~Datadog-VPC-Flow-Logs
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ja/logs/explorer/
[6]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_vpc/amazon_vpc_metadata.csv