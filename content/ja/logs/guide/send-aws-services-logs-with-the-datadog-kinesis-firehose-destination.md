---
title: Datadog Kinesis Firehose Destination を使用して AWS サービスログを送信する
kind: ドキュメント
further_reading:
  - link: /logs/explorer/
    tag: Documentation
    text: ログの調査方法
  - link: '/logs/explorer/#visualize'
    tag: Documentation
    text: ログ分析の実行
  - link: /logs/processing/
    tag: Documentation
    text: ログの処理方法
---
​
AWS サービスログは通常、S3 バケットまたは CloudWatch Log グループに保存されます。これらのログをサブスクライブし、Amazon Kinesis ストリームに転送して、1 つまたは複数の宛先に転送することが可能です。Datadog は、Amazon Kinesis Delivery ストリームのデフォルトの宛先の 1 つです。

AWS は Amazon Kinesis Data Firehose を完全に管理しているため、ストリーミングログ用の追加のインフラストラクチャーや転送構成を維持する必要はありません。

AWS Firehose コンソールで Kinesis Firehose Delivery Stream を設定するか、CloudFormation テンプレートを使用して宛先を自動的に設定できます。
​
{{< tabs >}}
{{% tab "Kinesis Firehose Delivery ストリーム" %}}
## Kinesis Firehose Delivery Stream での Datadog Destination のセットアップ

Datadog は、Datadog Kinesis 宛先を使用する場合、入力として Kinesis ストリームを使用することをお勧めします。Datadog がログの唯一のコンシューマーではない場合に備えて、ログを複数の宛先に転送する機能が用意されています。

ログを Datadog に送信するだけの場合、またはログに Kinesis  Datastream がすでにある場合は、ステップ 1 を無視してください。
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
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=automaticcloudformation#collecting-logs-from-s3-buckets
{{% /tab %}}

{{% tab "CloudFormation template" %}}
## CloudFormation テンプレートを使用してアップロードする

または、この CloudFormation テンプレートをカスタマイズして、AWS コンソールからインストールします。

[こちらから Kinesis CloudFormation テンプレート全体をご覧ください。][1]



[1]: /resources/json/kinesis-logs-cloudformation-template.json
{{% /tab %}}
{{< /tabs >}}

## AWS ログを Kinesis ストリームに送信する

1. [ロググループインデックスページ][1]の `Subscriptions` 列を確認して、関連するロググループの現在のサブスクリプションを確認します。CloudWatch ロググループは 1 つのサブスクリプションしか持つことができないため、新しい Kinesis ストリームをサブスクライバーとして追加する前に、ロググループへの既存のサブスクリプションをすべて削除します。
  * **注**: 別のものにサブスクライブする場合は、このセットアップを完了後、新しい Kinesis ストリームにサブスクライブすることができます。
2. Datadog に取り込みたい CloudWatch ロググループに、新しい Kinesis ストリームをサブスクライブさせます。[この CloudWatch Logs ドキュメントセクション][2] (ステップ 3〜6) を参照して、
  a. `aws iam create-role` コマンドを使い、Kinesis ストリームにログデータを置く権限をCloudWatch Logs に付与する IAM ロールを作成します。
  b. `firehose:PutRecord` `firehose:PutRecordBatch`、`kinesis:PutRecord`、`kinesis:PutRecordBatch` アクションを許可するアクセス許可ポリシーを作成します。
  c. `aws iam put-role-policy` コマンドを使用して、新しく作成した IAM ロールにアクセス許可ポリシーを関連づけます。
  d. Use the `aws logs put-subscription-filter` コマンドを使い、Datadog に取り込みたい CloudWatch ロググループに Kinesis ストリームを サブスクライブさせます。
​
​
   サブスクリプションフィルターの例:
​
    ```
    aws logs put-subscription-filter \
        --log-group-name "MYLOGGROUPNAME" \
        --filter-name "MyFilterName" \
        --filter-pattern "" \
        --destination-arn "DESTINATIONARN (data stream or delivery stream)" \
        --role-arn "MYROLEARN"
    ```
​
    **重要**: [AWS ドキュメント][3]で説明されているように、サブスクリプションフィルターの宛先はロググループと同じアカウントである必要があります。
3. [ロググループインデックスページ][1] の `Subscriptions` をチェックして、新しい Kinesis ストリームがロググループをサブスクライブしているかを確認します。
​
Kinesis データストリームを経由せずにログを配信ストリームに直接プッシュする場合は、[AWS サブスクリプションフィルターのドキュメント][4] (ステップ 12) に示すとおり、サブスクリプションフィルターの `destination-arn` パラメーターに Kinesis Firehose ARN を追加することで、CloudWatch ロググループを直接 Kinesis Firehose Destination にサブスクライブできます。
​

[1]: https://console.aws.amazon.com/cloudwatch/home
[2]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs//SubscriptionFilters.html#DestinationKinesisExample
[3]: https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutSubscriptionFilter.html
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#FirehoseExample