---
aliases: []
categories:
- AWS
- クラウド
- ログの収集
- ネットワーク
dependencies: []
description: Amazon VPC ログを収集します。
doc_link: https://docs.datadoghq.com/integrations/amazon_vpc/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/vpc-security-flowlogs/
  tag: GitHub
  text: Datadog でフローログを監視し、VPC のセキュリティを確保する
git_integration_title: amazon_vpc
has_logo: false
integration_id: ''
integration_title: Amazon VPC
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_vpc
public_title: Datadog-Amazon VPC インテグレーション
short_description: Amazon VPC ログを収集します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon Virtual Private Cloud (Amazon VPC) を使用すると、仮想ネットワーク内で AWS リソースを起動できます。VPC フローログは、VPC 内のネットワークインターフェイスを行き来する IP トラフィックに関する情報をキャプチャできる機能です。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

`aws.vpc.flowlogs.*` 以外の Amazon VPC メトリクスを収集するための追加の手順は必要ありません。`aws.vpc.flowlogs.*` で始まるメトリクスは、[Datadog VPC Flow Logs][2] インテグレーションによって生成されます。フローログメトリクスの収集を有効にする方法については、[ログ収集](#log-collection)セクションを参照してください。

`aws.vpc.subnet.*` メトリクスについては [Datadog サポート][3]にお問い合わせいただき、お使いのアカウントでの収集を有効化してください。

### 収集データ


#### VPC フローのログの送信先リソースをAWSで探す、または作成する

VPC フローログは、Datadog に送信する前に、まず中間送信先に送信する必要があります。Amazon Data Firehose に直接送ることもできますし、S3 バケットや CloudWatch Log グループに保存することも可能です。

VPC フローログを Datadog に送信する場合、運用のオーバーヘッドが少なく、費用対効果が期待できる Amazon Data Firehose がおすすめです。詳しくは [Amazon VPC Flow Logs to Kinesis Data Firehose のご紹介][4]をお読みください。

1. 以下を新規で作成するか、既存のものを選択します。
   - Amazon Data Firehose (推奨)。Datadog にログを送信するための既存の Amazon Data Firehose の配信ストリームがない場合は、[Datadog Amazon Firehose Destination で AWS サービスのログを送信する][5]ガイドの手順に従って作成してください。**注:** VPC とは別の AWS アカウントで、ログ収集と配信を一元化するための配信ストリームをオプションで選択することができます。
   - S3 バケットまたはフォルダのパス。
   - CloudWatch Log グループ。

**注**: Lambda が自動的に `vpc` ソースをログにタグ付けするようにするには、S3 パス名または CloudWatch ロググループ名のプレフィックスとして `vpc` を指定します。


#### VPC フローログ記録の有効化

1. AWS コンソールで、監視したい VPC に移動します。
2. **Flow logs** タブに移動します。
3. **Create flow log** をクリックします。
4. `All` フィルターを選択すると、受け入れた接続と拒否した接続の両方を取得することができます。
5. ログの保存先の種類 (Amazon Data Firehose、S3 バケット、CloudWatch ロググループ) を選択します。
6. 送信先リソースの詳細を入力します。
7. **Create flow log** をクリックします。

#### ログを Datadog に送信する方法

Amazon Data Firehose を保存先として選択した場合は、設定はこれで完了です。

S3 バケットまたは CloudWatch のロググループを保存先として選択した場合

1. AWS アカウントで [Datadog Forwarder Lambda 関数][6]をまだセットアップしていない場合は、セットアップします。
2. 設定したら、Datadog Forwarder Lambda 関数に移動します。Function Overview セクションで、**Add Trigger** をクリックします。
3. Trigger Configuration で **S3** または **CloudWatch Logs** トリガーを選択します。
4. VPC のログが含まれる S3 バケットまたは CloudWatch のロググループを選択します。
5. S3 の場合、イベントタイプは `All object create events` のままにしておきます。
6. **Add** をクリックすると、Lambda にトリガーが追加されます。

[ログエクスプローラー][7]に移動して、ログを確認します。

AWS Services のログを収集する方法については、[Datadog Lambda 関数で AWS Services のログを送信する][8]を参照してください。

## Datadog Operator

### データセキュリティ
{{< get-metrics-from-git "amazon_vpc" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### ヘルプ

Amazon VPC インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon VPC インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:464622532012:applications~Datadog-VPC-Flow-Logs
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://aws.amazon.com/blogs/networking-and-content-delivery/introducing-amazon-vpc-flow-logs-kinesis-data-firehose/
[5]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
[6]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[7]: https://docs.datadoghq.com/ja/logs/explorer/
[8]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_vpc/amazon_vpc_metadata.csv