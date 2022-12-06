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
- link: https://www.datadoghq.com/blog/send-amazon-vpc-flow-logs-to-kinesis-firehose-and-datadog/
  tag: GitHub
  text: Amazon VPC フローログを Amazon Kinesis Data Firehose と Datadog に送信する
kind: ドキュメント
title: Datadog Kinesis Firehose Destination を使用して AWS サービスログを送信する
---

## 概要

AWS サービスのログは通常、S3 バケットや CloudWatch ロググループに保存されています。これらのログを購読し、Amazon Kinesis ストリームに転送して、1 つまたは複数の宛先に転送することができます。Datadog は、Amazon Kinesis 配信ストリームのデフォルトの転送先の 1 つです。

AWS は Amazon Kinesis Data Firehose を完全に管理しているため、ログをストリーミングするための追加のインフラストラクチャーや転送構成を維持する必要はありません。AWS Firehose コンソールで Kinesis Firehose Delivery Stream を設定するか、CloudFormation テンプレートを使って自動的に転送先を設定することができます。

## セットアップ

{{< tabs >}}
{{% tab "Kinesis Firehose Delivery stream" %}}

Datadog は、Datadog Kinesis 宛先を使用する場合、入力として Kinesis ストリームを使用することをお勧めします。Datadog がログの唯一のコンシューマーではない場合に備えて、ログを複数の宛先に転送する機能が用意されています。ログを Datadog に送信するだけの場合、またはログに Kinesis  Datastream がすでにある場合は、ステップ 1 を無視してください。

1. (オプション) 新しい Kinesis ストリームを作成します（[Kinesis ガイド][1]を参照）。ストリームに `DatadogLogStream` など分かりやすい名前を付け、シャードカウントを 1 にします（必要な各 MB/s スループットのシャード数を増やします）。
2. [新しい配信ストリーム][2]を作成し、`DatadogLogsforwarder` という名前を付けます。
3. ソースを "Kinesis stream" に設定し (Kinesis ストリームを使用しない場合は、ソースを `Direct PUT or other sources` のままにします)、`DatadogLogStream` (またはすでにログが含まれている既存の Kinesis ストリーム) を選択します。
4. データ変換とレコード変換を無効にして、`next` をクリックします。
5. アカウントの Datadog リージョンに応じて、`Datadog` 宛先を選択し、`Datadog US` または `Datadog EU` リージョンを選択します。
  {{< img src="logs/guide/choose-destination.png" alt="宛先を選ぶ" style="width:100%;">}}
6. `APIKEY` を `AccessKey` ボックスに貼り付けます ([Datadog API 設定ページ][3]から API キーを取得できます)。
7. (オプション) ログにカスタムタグとして追加されるカスタム `parameters` を追加します。
{{< img src="logs/guide/kinesis_logs_datadog_destination.png" alt="Datadog 送信先のコンフィギュレーション" style="width:100%;">}}
8. 失敗したイベントを S3 バケットにバックアップすることを選択します。
9. 配信ストリームパラメーターを構成します。重要なパラメーターが 2 つあります。
    * Retry time: イベントをバックアップ S3 バケットに送信する前に配信ストリームが再試行する時間。
    * Batch size: Datadog は 1MB から 4MB の間の値を推奨します。バッチサイズまたは残存時間 (最小 60 秒) に達した場合、ログは配信ストリームによって送信されます。Datadog は、バッチサイズをできるだけリアルタイムに近づけるように縮小することを推奨しています。
    {{< img src="logs/guide/kinesis_logs_datadog_batch.png" alt="バッチコンフィギュレーション" style="width:100%;" >}}

Delivery Stream で失敗したログが引き続き Datadog に送信されるようにするには、[この S3 バケットでトリガーするように Datadog Lambda 関数を構成します][4]。

[1]: https://docs.aws.amazon.com/kinesisanalytics/latest/dev/app-hotspots-prepare.html#app-hotspots-create-two-streams
[2]: https://console.aws.amazon.com/firehose/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=automaticcloudformation#collecting-logs-from-s3-buckets
{{< /tabs >}}

{{% tab "CloudFormation template" %}}

または、この CloudFormation テンプレートをカスタマイズして、AWS コンソールからインストールします。[Kinesis CloudFormation テンプレート][1]全体をご覧ください。

[1]: /resources/json/kinesis-logs-cloudformation-template.json
{{% /tab %}}
{{< /tabs >}}

## AWS ログを Kinesis ストリームに送信する

1. [ロググループインデックスページ][1]の `Subscriptions` 列を確認して、関連するロググループの現在のサブスクリプションを確認します。新しい Kinesis ストリームをサブスクライバーとして追加します。
   * **注**: 各 CloudWatch Log グループは、2 つのサブスクリプションしか持つことができません。2 つ以上のソースにサブスクライブする場合、このセットアップを完了後、新しい Kinesis ストリームにサブスクライブすることができます。
2. Datadog に取り込みたい CloudWatch ロググループに、新しい Kinesis ストリームをサブスクライブさせます。[この CloudWatch Logs ドキュメントセクション][2] (ステップ 3〜6) を参照して、
   - `aws iam create-role` コマンドを使い、Kinesis ストリームにログデータを置く権限をCloudWatch Logs に付与する IAM ロールを作成します。
   - `firehose:PutRecord` `firehose:PutRecordBatch`、`kinesis:PutRecord`、`kinesis:PutRecords` アクションを許可するアクセス許可ポリシーを作成します。
   - ロールの **Trust relationships** で `logs.amazonaws.com` または `logs.<region>.amazonaws.com` がサービスプリンシパルとして構成されていることを確認してください。
   - `aws iam put-role-policy` コマンドを使用して、新しく作成した IAM ロールにアクセス許可ポリシーを関連づけます。
   - Use the `aws logs put-subscription-filter` コマンドを使い、Datadog に取り込みたい CloudWatch ロググループに Kinesis ストリームを サブスクライブさせます。

   サブスクリプションフィルターの例:
    ```
    aws logs put-subscription-filter \
        --log-group-name "MYLOGGROUPNAME" \
        --filter-name "MyFilterName" \
        --filter-pattern "" \
        --destination-arn "DESTINATIONARN (data stream or delivery stream)" \
        --role-arn "MYROLEARN"
    ```
    **重要**: [AWS ドキュメント][3]で説明されているように、サブスクリプションフィルターの宛先はロググループと同じアカウントである必要があります。

3. [ロググループインデックスページ][1] の `Subscriptions` をチェックして、新しい Kinesis ストリームがロググループをサブスクライブしているかを確認します。

Kinesis データストリームを経由せずにログを配信ストリームに直接プッシュする場合は、[AWS サブスクリプションフィルターのドキュメント][4] (ステップ 12) に示すとおり、サブスクリプションフィルターの `destination-arn` パラメーターに Kinesis Firehose ARN を追加することで、CloudWatch ロググループを直接 Kinesis Firehose Destination にサブスクライブできます。

## Datadog で AWS Kinesis ログを検索する

Amazon Kinesis 配信ストリームを設定した後、Datadog で配信ストリームにサブスクライブされたログを分析できます。

ARN ですべてのログにデータを入力するには

1. Datadog の [Logs Explorer][5] に移動して、サブスクライブされたすべてのログを表示します。
2. 検索バーに `@aws.firehose.arn:"<ARN>"` と入力し、`<ARN>` を Amazon Kinesis Data Firehose ARN に置き換えて、**Enter** を押します。

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://console.aws.amazon.com/cloudwatch/home
[2]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs//SubscriptionFilters.html#DestinationKinesisExample
[3]: https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutSubscriptionFilter.html
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#FirehoseExample
[5]: /ja/logs/explorer/