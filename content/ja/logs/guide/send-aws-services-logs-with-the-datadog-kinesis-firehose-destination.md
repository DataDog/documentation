---
further_reading:
- link: /logs/explorer/
  tag: Documentation
  text: ログの調査方法
- link: /logs/explorer/#visualize
  tag: Documentation
  text: ログ分析の実行
- link: /logs/log_configuration/processors
  tag: Documentation
  text: ログの処理方法
- link: https://www.datadoghq.com/blog/send-amazon-vpc-flow-logs-to-data-firehose-and-datadog/
  tag: GitHub
  text: Amazon VPC フローログを Amazon Kinesis Data Firehose と Datadog に送信する
kind: ドキュメント
title: Datadog Amazon Data Firehose Destination を使用して AWS サービスログを送信する
---

## 概要

CloudWatch Log グループに格納された AWS サービスログを Amazon Kinesis データストリームに転送し、その後 Amazon Data Firehose を通じて 1 つまたは複数の宛先に送信することが可能です。Datadog は、Amazon Data Firehose 配信ストリームのデフォルトの宛先の 1 つです。

AWS は Amazon Data Firehose を完全に管理しているため、ログをストリーミングするための追加のインフラストラクチャーや転送構成を維持する必要はありません。AWS Firehose コンソールで Amazon Data Firehose 配信ストリームを設定するか、CloudFormation テンプレートを使って自動的に転送先を設定することができます。

## セットアップ

{{< tabs >}}
{{% tab "Amazon Data Firehose 配信ストリーム" %}}

Datadog は、Amazon Data Firehose で Datadog の宛先を使用する場合、入力として Kinesis データストリームを使用することをお勧めします。Datadog がログの唯一のコンシューマーではない場合に備えて、ログを複数の宛先に転送する機能が用意されています。Datadog がログの唯一の宛先である場合、またはすでにログを含む Kinesis データストリームを持っている場合、ステップ 1 を無視することができます。

1. オプションとして、AWS の Amazon Kinesis Data Streams 開発者ガイドの[データストリームの作成][1]セクションを使用して、新しい Kinesis データストリームを作成します。ストリームには `DatadogLogStream` のような分かりやすい名前を付けます。
2. [Amazon Data Firehose][2] に移動します。  
3. **Create Firehose stream** をクリックします。
   a. ソースを設定します。
      - ログが Kinesis データストリームから取得されている場合は、`Amazon Kinesis Data Streams`
      - ログが CloudWatch のロググループから直接送られてくる場合は、`Direct PUT`

   b. 宛先を `Datadog` にします。 
   c. 配信ストリームの名前を指定します。
   d. **Destination settings** で、[Datadog サイト][5]に対応する `Datadog logs` HTTP エンドポイント URL を選択します。 
   e. API キーを **API key** フィールドに貼り付けます。API キーは、[Datadog API Keys ページ][3]から取得または作成できます。 
   f. オプションとして、**Retry duration**、バッファの設定を構成するか、またはログにタグとしてアタッチされる **Parameters** を追加することができます。 
   **注**: Datadog は、ログが 1 行のメッセージである場合、**Buffer size** を `2 MiB` に設定することを推奨します。
   g. **Backup settings** で、再試行期間を超える失敗したイベントを受け取る S3 バックアップバケットを選択します。 
   **注**: 配信ストリームで失敗したすべてのログが引き続き Datadog に送信されるようにするには、この S3 バケットから[ログを転送][4]するように Datadog Forwarder Lambda 関数を設定します。
   h. **Create Firehose stream** をクリックします。

[1]: https://docs.aws.amazon.com/streams/latest/dev/tutorial-stock-data-kplkcl-create-stream.html
[2]: https://console.aws.amazon.com/firehose/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=automaticcloudformation#collecting-logs-from-s3-buckets
[5]: /ja/getting_started/site/
{{% /tab %}}

{{% tab "CloudFormation template" %}}

[Kinesis CloudFormation テンプレート][1]を完全にカスタマイズして、AWS コンソールからインストールします。

[1]: /resources/json/kinesis-logs-cloudformation-template.json
{{% /tab %}}
{{< /tabs >}}

## AWS ログを Firehose ストリームに送信する

CloudWatch ログは、どちらのアプローチを採用するかによって、Kinesis データストリームか Amazon Data Firehose 配信ストリームにデータを入れる権限を必要とします。[IAM ロールとポリシーを作成](#create-an-iam-role-and-policy)します。次に、Datadog に取り込みたい CloudWatch ロググループに、新しい Kinesis ストリームまたは Amazon Data Firehose 配信ストリームを サブスクライブします。サブスクリプションは、[AWS コンソール](#console)または [CLI](#cli) を通じて作成することができます。  
   **注**: 各 CloudWatch ロググループに許可されるサブスクリプションは 2 つのみです。

### IAM ロールとポリシーの作成

CloudWatch Log が Kinesis ストリームにデータを入れることができるように、IAM ロールと権限ポリシーを作成します。
  1. ロールの **Trust relationships** で `logs.amazonaws.com` または `logs.<region>.amazonaws.com` がサービスプリンシパルとして構成されていることを確認してください。例:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Statement1",
      "Effect": "Allow",
      "Principal": {
        "Service": "logs.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```
  2. ロールのアタッチされた権限ポリシーで、`firehose:PutRecord`、`firehose:PutRecordBatch`、`kinesis:PutRecord`、`kinesis:PutRecords` の各アクションが許可されていることを確認してください。Kinesis データストリームを使用している場合は、**Resource** フィールドでその ARN を指定します。データストリームを使用して**いない**場合は、**Resource** フィールドで Amazon Data Firehose ストリームの ARN を指定してください。
  例:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "firehose:PutRecord",
        "firehose:PutRecordBatch",
        "kinesis:PutRecord",
        "kinesis:PutRecords"
      ],
      "Resource": "arn:aws:kinesis:<REGION>:<ACCOUNT_ID>:stream/<DELIVERY_STREAM>
    }
  ]
}
```
AWS CLI で設定する例としては、[Kinesis データストリームを使ったサブスクリプションフィルター][2]の例 (ステップ 3～6) を使用します。

### サブスクリプションフィルターの作成

#### CLI

以下の例では、AWS CLI でサブスクリプションフィルターを作成しています。

```
  aws logs put-subscription-filter \
    --log-group-name "<MYLOGGROUPNAME>" \
    --filter-name "<MyFilterName>" \
    --filter-pattern "" \
    --destination-arn "<DESTINATIONARN> (データストリームまたは配信ストリーム)" \
    --role-arn "<MYROLEARN>"
```

#### コンソール

以下の手順に従って、次のまた、AWS コンソールからサブスクリプションフィルターを作成します。

1. [CloudWatch][1] のロググループに移動し、**Subscription filters** タブをクリックし、**Create** をクリックします。
   - Kinesis データストリームでログを送信する場合、`Create Kinesis subscription filter` を選択します。
   - ロググループから Amazon Data Firehose 配信ストリームに直接ログを送信する場合、`Create Amazon Data Firehose subscription filter` を選択します。

2. データストリームまたは Firehose 配信ストリームを選択し、以前に作成した [IAM ロール](#create-an-iam-role-and-policy)も同様に選択します。

3. サブスクリプションフィルターの名前を入力し、**Start streaming** をクリックします。

**重要**: [Amazon CloudWatch Logs API Reference][3] で説明されているように、サブスクリプションフィルターの宛先はロググループと同じアカウントである必要があります。

### 検証

[CloudWatch][1] のロググループの詳細ページの **Subscription filters** 田部井をチェックして、新しい Kinesis ストリームまたは Amazon Data Firehose ストリームがロググループをサブスクライブしているかを確認します。

### Datadog でログを確認する

Amazon Data Firehose 配信ストリームを設定した後、Datadog で配信ストリームにサブスクライブされたログを分析できます。

ARN ですべてのログにデータを入力するには

1. Datadog で [Log Explorer][5] に移動します。
2. 検索バーに `@aws.firehose.arn:"<ARN>"` と入力し、`<ARN>` を Amazon Data Firehose ARN に置き換えて、**Enter** を押すと、サブスクライブされたログがすべて表示されます。

**注**: 1 つの Kinesis ペイロードは、65,000 以上のログメッセージであってはなりません。この制限を超えたログメッセージは削除されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://console.aws.amazon.com/cloudwatch/home
[2]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs//SubscriptionFilters.html#DestinationKinesisExample
[3]: https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutSubscriptionFilter.html
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#FirehoseExample
[5]: /ja/logs/explorer/