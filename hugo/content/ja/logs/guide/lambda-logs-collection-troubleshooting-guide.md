---
further_reading:
- link: https://www.datadoghq.com/blog/aws-lambda-telemetry-api/
  tag: ブログ
  text: AWS Lambda テレメトリー API による Datadog Lambda 拡張機能の拡張
title: Lambda 関数によるログ収集のトラブルシューティングガイド
---
Datadog Forwarder Lambda 関数から転送されたログがログエクスプローラー に表示されない場合は、以下のトラブルシューティング手順に従ってください。これらの手順を実行しても問題が解決しない場合は、[Datadog サポートにお問い合わせ][1] ください。

## ログは Datadog に送信されていますか?{#are-your-logs-sent-to-datadog}

1. [ログエクスプローラーの Live Tail ビュー][2] を開きます。
2. 検索バーで Live Tail ビューにフィルターを適用して、Lambda 関数経由で送られたログのみを表示します。検索には以下のようなクエリを利用できます。
    * ソース別: ソースには多くの場合 `source:lambda`、`source:aws`、`source:s3`、または `source:cloudwatch` が設定されます。
    * フォワーダー名別: Lambda 関数は、転送するすべてのログに `forwardername` タグを追加します。このタグでフィルタリングするには、`forwardername:*` または `forwardername:<FORWARDER_FUNCTION_NAME>` を検索します。
3. ログが Live Tail に出現しているのにログエクスプローラーで見当たらない場合、その不一致は以下のいずれかの理由による可能性があります (詳細は [ログのトラブルシューティングドキュメント][4] を参照してください)。
   * ログインデックスに、これらのログをアクティブに除外する除外フィルターが設定されています。
   * 1 日あたりのログ割り当て量を超過しています。
   * ログのタイムスタンプが 18 時間以上前になっています。
4. Live Tail にログが表示されない場合は、ログが Datadog に到達していません。

## Lambda 関数の権限をチェックする {#check-the-lambda-function-permissions}

権限の問題により、フォワーダーがログソースにアクセスできなくなっている可能性もあります。Lambda 関数は、リソースベースのポリシー (Datadog インテグレーションロールのポリシーとは無関係) を使用して、ログソースへのアクセス権を付与します。

次のコマンドを実行して、フォワーダーのポリシーを確認します。
   ```
   get-policy command aws lambda get-policy --function-name <FUNCTION_NAME>
   ```

このコマンドは、フォワーダー関数の呼び出しを許可されている AWS サービスとリソース (特定の S3 バケットなど) を指定するリソースベースのポリシーを返します。

<div class="alert alert-danger">
ポリシードキュメント内の Action 要素と Resource 要素は、<strong>必ず</strong><a href="/logs/guide/forwarder/?tab=cloudformation#permissions">Datadog Forwarder の権限</a>の仕様と完全に一致している必要があります。
</div>

## Lambda 関数の Monitoring タブをチェックする {#check-the-lambda-function-monitoring-tab}

[AWS コンソールから][6]

1. フォワーダーの Lambda 関数を開きます。

2. [{{< ui >}}Monitoring{{< /ui >}}] タブをクリックします。

    {{< img src="logs/guide/lambda-monitoring-tab.png" alt="[Monitoring] タブ" style="width:80%;" >}}

3. [Monitoring] タブには、Lambda 関数に関する以下の情報を示す一連のグラフが表示されます。
    * 呼び出し
    * エラー
    * ログ

4. [{{< ui >}}Invocations{{< /ui >}}] グラフにデータポイントが表示されない場合は、関数に設定したトリガーに問題がある可能性があります。[関数のトリガーを管理する](#manage-your-function-triggers) を参照してください。[Monitoring] タブを使用せずに Lambda の呼び出しに関するインサイトを得るには、[Datadog で Lambda メトリクスを表示する](#viewing-lambda-metrics-in-datadog) を参照してください。
5. 「Error count and success rate」(エラー数と成功率) グラフにデータポイントが表示されている場合は、[Lambda 関数のログをチェックして](#check-the-lambda-function-logs)、報告されているエラーメッセージを確認してください。

### Datadog で Lambda メトリクスを表示する {#viewing-lambda-metrics-in-datadog}

AWS Lambda メトリクスを有効にしている場合は、Lambda の呼び出しとエラーに関連するメトリクスを Datadog 内で表示できます。以下のメトリクスにはすべて `functionname` タグが付けられています。

| メトリクス                        | 説明                                                                                        |
|-------------------------------|----------------------------------------------------------------------------------------------------|
| `aws.lambda.invocations `     | Lambda 関数がトリガー/呼び出された回数                                      |
| `aws.lambda.errors `          | 関数が呼び出された際に起こったエラー数                                        |
| `aws.lambda.duration `        | Lambda 関数の実行完了までに要した平均時間 (ミリ秒)  |
| `aws.lambda.duration.maximum` | Lambda 関数の実行完了までに要した最大時間 (ミリ秒)  |
| `aws.lambda.throttles`        | 呼び出し率が顧客の上限を超えたために抑制された呼び出し試行回数 |

これらおよびその他の AWS Lambda メトリクスについては、[AWS Lambda のメトリクス][7] を参照してください。

### 関数のトリガーを管理する {#manage-your-function-triggers}

ログを転送するには、フォワーダーの Lambda 関数にトリガー (CloudWatch Logs または S3) が設定されている必要があります。トリガーが正しく設定されていることを確認するには、以下の手順に従ってください。

1. ログのソース (CloudWatch ロググループまたは S3 バケット) は、フォワーダーの Lambda コンソールの [Triggers] リストに表示されていますか?表示されている場合は、それが有効になっていることを確認してください。表示されていない場合は、Lambda コンソールに表示される [Triggers] リストは網羅的ではないことが知られているため、以下の手順に従って S3 または CloudWatch ロググループのコンソールでチェックしてください。

2. S3 バケットの場合は、バケットの [Properties] タブに移動し、[Advanced settings] と [Events] のタイルまで下にスクロールするか、以下の AWS CLI コマンドを使用してクエリを実行します。フォワーダーの Lambda 関数をトリガーするように構成されたイベント通知はありますか?ない場合は、トリガーを構成する必要があります。
   ```
   aws s3api get-bucket-notification-configuration --bucket <BUCKET_NAME>
   ```

3. CloudWatch ロググループの場合は、ロググループのコンソールの [Log group details] セクションにある [Subscriptions] フィールドに移動します。または、以下の AWS CLI コマンドを使用してクエリを実行することもできます。ロググループがフォワーダーの Lambda 関数によってサブスクライブされていない場合は、トリガーを構成する必要があります。
   ```
   aws logs describe-subscription-filters --log-group-name <LOG_GROUP_NAME>
   ```

4. トリガーを [自動][8] または [手動][9] で設定してください。

CloudWatch ロググループの場合は、Datadog のプラットフォーム内で以下のメトリクスを使用して、ログがロググループからフォワーダーの Lambda 関数へ送信されているかどうかを確認できます。メトリクスを表示する際は、`log_group` タグでデータを絞り込みます。

| メトリクス                          | 説明                                                                                        |
|---------------------------------|----------------------------------------------------------------------------------------------------|
| `aws.logs.incoming_log_events`  | CloudWatch ログにアップロードされたログイベントの数                                               |
| `aws.logs.forwarded_log_events` | サブスクリプション先へ転送されたログイベントの数                                 |
| `aws.logs.delivery_errors`      | サブスクリプション先への送信に失敗したログイベントの数                    |
| `aws.logs.delivery_throttling`  | サブスクリプション先への送信を制限されたログイベントの数                  |

### 自動トリガー {#automatic-trigger}

Datadog が自動的にトリガーを作成できない場合は、次のトラブルシューティングチェックリストに従ってください。

1. AWS インテグレーションの [Log Collection] タブに Forwarder ARN が表示されていることを確認します。
2. [必要な権限][10] がインテグレーションロールに割り当てられていることを確認します。
3. ログソースが Lambda ロググループである場合は、Lambda 関数に [拡張機能][11] がインストールされていることを確認します。
4. ログソースが CloudWatch ロググループである場合は、すでに 2 つのサブスクライバー (許可される最大数) が存在していないことを確認します。

## Lambda 関数のログをチェックする {#check-the-lambda-function-logs}

1. [Monitoring] タブから、[{{< ui >}}View logs in Cloudwatch{{< /ui >}}] をクリックしてください。

{{< img src="logs/guide/lambda-logs-cloudwatch.png" alt="CloudWatch の Lambda ログ" style="width:80%;" >}}

2. 最新のログストリームを見つけてください。

3. エラーは表示されていますか?"?ERROR ?Error ?error" で検索してみてください。

4. デバッグログを有効にして詳細なデバッグを行うには、フォワーダーの Lambda 関数で環境変数 "DD_LOG_LEVEL" を "debug" に設定してください。デバッグログは非常に冗長です。デバッグ終了後は必ず無効にしてください。

### Lambda 関数によってフィルタリングされたログ {#logs-filtered-by-the-lambda-function}

Lambda フォワーダーは、次の [環境変数][12] を使用してログをフィルタリングします。

* INCLUDE_AT_MATCH
* EXCLUDE_AT_MATCH

フォワーダーの DEBUG ログでこれらの変数を検索すると、特定のログがフィルターによって破棄されたかどうかを確認できます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/help
[2]: /ja/logs/live_tail/#live-tail-view
[3]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/lambda_function.py
[4]: /ja/logs/troubleshooting/
[5]: /ja/logs/guide/forwarder/?tab=cloudformation#permissions
[6]: https://console.aws.amazon.com/lambda/home
[7]: /ja/integrations/amazon_lambda/?tab=awsconsole#metrics
[8]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
[9]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#manually-set-up-triggers
[10]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
[11]: /ja/serverless/libraries_integrations/extension/
[12]: /ja/logs/guide/forwarder/?tab=cloudformation#log-filtering-optional