---
further_reading:
- link: https://www.datadoghq.com/blog/aws-lambda-telemetry-api/
  tag: GitHub
  text: AWS Lambda テレメトリー API による Datadog Lambda 拡張機能の拡張
kind: documentation
title: Lambda 関数によるログ収集のトラブルシューティングガイド
---

ログエクスプローラーに、Datadog Forwarder の Lambda 関数から転送されたログが表示されない場合は、以下のトラブルシューティングを実行してください。それでも問題が解決しない場合は、[Datadog サポート][1]までお問い合わせください。

## Datadog にログが送信されたかを確認する

1. [ログエクスプローラーの Live Tail ビュー][2]を開きます。
2. 検索バーで Live Tail ビューにフィルターを適用し、Lambda 関数経由で送られたログのみを表示します。検索には以下のようなクエリを利用できます。
    * ソースで検索: ソースは通常 `source:lambda`、`source:aws` または `source:cloudwatch` に設定されています。[Lambda 関数][3]の `parse_event_source` 関数にあるソースも設定可能です。
    * Forwarder 名で検索: Lambda 関数は転送するすべてのログに対して `forwardername` タグを付加します。このタグを `forwardername:*` または `forwardername:<FORWARDER_FUNCTION_NAME>` で絞り込み、検索できます。
3. ログエクスプローラーではなく Live Tail にログが表示される場合は、ログインデックスに[除外フィルター][4]が設定されています。このフィルターによりログが除外されているのです。
4. Live Tail にログが表示されない場合は、ログが Datadog に到達していません。

## Lambda 関数の Monitoring タブを確認する

[AWS コンソールから][5]

1. Forwarder の Lambda 関数を開きます。

2. Monitoring タブをクリックします。

    {{< img src="logs/guide/lambda-monitoring-tab.png" alt="Monitoring タブ" style="width:80%;" >}}

3. Monitoring タブには、Lambda 関数に関する以下の情報を示す一連のグラフが表示されます。
    * 呼び出し
    * エラー
    * logs

4. **Invocations** グラフにデータポイントが表示されない場合は、関数に対して設定したトリガーに問題が発生している可能性があります。[関数のトリガーを管理する](#関数のトリガーを管理する) を参照してください。Monitoring タブを使用せずに Lambda 関数の呼び出しについてのインサイトを取得する場合は、[Datadog で Lambda メトリクスを表示する](#Datadog で Lambda メトリクスを表示する) をご確認ください。
5. 「Error count and success rate」グラフにデータポイントが表示されている場合は、[Lambda 関数のログを確認する](#Lambda 関数のログを確認する) で報告されたエラーメッセージの内容を確認してください。

### Datadog で Lambda メトリクスを表示する

AWS Lambda 関数を有効にすると、Datadog 内での Lambda 関数の呼び出しとエラーに関連するメトリクスを確認することができます。以下のメトリクスはすべて `functionname` でタグ付けされています。

| メトリクス                        | 説明                                                                                        |
|-------------------------------|----------------------------------------------------------------------------------------------------|
| `aws.lambda.invocations `     | Lambda 関数がトリガー/呼び出された回数                                      |
| `aws.lambda.errors `          | 関数が呼び出された際に起こったエラー数                                        |
| `aws.lambda.duration `        | Lambda 関数の実行完了までに要した平均時間 (ミリ秒)  |
| `aws.lambda.duration.maximum` | Lambda 関数の実行完了までに要した最大時間 (ミリ秒)  |
| `aws.lambda.throttles`        | 呼び出し率が既定の上限を超えたために抑制された呼び出し試行回数 |

これらおよびその他の AWS Lambda メトリクスについては、[AWS Lambda のメトリクス][6]を参照してください。

### 関数のトリガーを管理する

ログが転送されるには、Forwarder の Lambda 関数にトリガー (CloudWatch ログまたは S3) が設定されている必要があります。以下のステップに従い、トリガーを正しく設定してください。

1. ログのソース (CloudWatch ロググループまたは S3 バケット) が、Forwarder の Lambda コンソールで "Triggers" リストに表示されますか？表示される場合は、有効であることを確認します。表示されない場合は、以下のステップに従い S3 または CloudWatch ロググループコンソールを確認します。Lambda コンソールに表示される "Triggers" リストは包括的でないことがあります。

2. S3 バケットの場合は、バケットの "Properties" タブへ移動し、スクロールして "Advanced settings" の "Events" タイルを表示するか、以下の AWS CLI コマンドを使用してクエリを作成します。Forwarder の Lambda 関数をトリガーするよう構成されたイベント通知が表示されますか？表示されない場合は、トリガーを構成する必要があります。
   ```
   aws s3api get-bucket-notification-configuration --bucket <BUCKET_NAME>
   ```

3. CloudWatch ロググループの場合は、ロググループのコンソールで "Log group details" セクションにある "Subscriptions" フィールドに移動します。または、以下の AWS CLI コマンドを使用してクエリを作成します。ロググループが Forwarder の Lambda 関数によりサブスクライブされていない場合は、トリガーを構成する必要があります。
   ```
   aws logs describe-subscription-filters --log-group-name <LOG_GROUP_NAME>
   ```

4. トリガーを[自動][7]または[手動][8]で設定します。

CloudWatch ロググループの場合は、Datadog のプラットフォーム内で以下のメトリクスを使用して、ログがロググループから Forwarder の Lambda 関数へ送信されたことを確認できます。メトリクスを表示する際は、`log_group` タグでデータを絞り込みます。

| メトリクス                          | 説明                                                                                        |
|---------------------------------|----------------------------------------------------------------------------------------------------|
| `aws.logs.incoming_log_events`  | CloudWatch ログにアップロードされたログイベントの数                                               |
| `aws.logs.forwarded_log_events` | サブスクリプションの送信先に転送されたログイベントの数                                 |
| `aws.logs.delivery_errors`      | サブスクリプション先への送信に失敗したログイベントの数                    |
| `aws.logs.delivery_throttling`  | サブスクリプションの先への送信を制限されたログイベントの数                  |

## Lambda 関数のログを確認する

1. Monitoring タブで **View logs in Cloudwatch** をクリックします。

{{< img src="logs/guide/lambda-logs-cloudwatch.png" alt="Cloudwatch 内での Lambda ログ" style="width:80%;" >}}

2. 最新のログストリームを確認。

3. エラーが発生した場合は、"?ERROR ?Error ?error" で検索してみてください。

4. Forwarder の Lambda 関数で、環境変数 "DD_LOG_LEVEL" を "debug" に設定してデバッグログを有効にし、さらなるデバッグを実行します。デバッグログは非常に詳細になるため、デバッグが終了したら無効にしましょう。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/ja/help
[2]: https://docs.datadoghq.com/ja/logs/live_tail/#live-tail-view
[3]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/lambda_function.py
[4]: https://docs.datadoghq.com/ja/logs/indexes/#exclusion-filters
[5]: https://console.aws.amazon.com/lambda/home
[6]: https://docs.datadoghq.com/ja/integrations/amazon_lambda/?tab=awsconsole#metrics
[7]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
[8]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#manually-set-up-triggers