---
kind: documentation
title: AWS Step Functions のサーバーレスモニタリングのトラブルシューティング
---

## トレースが表示されない

### Step Function がすべてのログを送信するように構成されていることを検証する

- Ensure that the `DD_TRACE_ENABLED` environment variable is set to `true` on the Lambda function in your AWS console.
- AWS コンソールで、Step Function の logging タブを開きます。_Log level_ が `ALL` に設定され、_Include execution data_ が選択されていることを確認します。
- CloudWatch のロググループ (logging タブにもある) に、同じリージョンの Datadog Lambda Forwarder へのサブスクリプションフィルターがあることを確認します。

### ログが Datadog に正常に転送されることを検証する
- Datadog Lambda Forwarder のエラーメッセージを確認します。API キーと Datadog サイトが正しく設定されていることを確認します。
- 環境変数 `DD_LOG_LEVEL` を `debug` に設定することで、Datadog Lambda Forwarder で `DEBUG` ログを有効にします。

### Verify that logs are searchable on Live Search and have DD_TRACE_ENABLED tag
In Datadog, go to [**Logs > Log Stream**][2]. Search for `source:stepfunction`. You may need to trigger the state machine a few times. If you need to upgrade Datadog Lambda Forwarder from an older version, check that after the upgrade, the Forwarder has the `DD_FETCH_STEP_FUNCTIONS_TAGS` tag set to `true`. If the upgraded Forwarder does not have the `DD_FETCH_STEP_FUNCTIONS_TAGS` tag, your Forwarder may not be upgraded correctly. 

If the Forwarder and state machine tags are set up correctly with the previous steps, the logs are tagged with `DD_TRACE_ENABLED:true`.

#### 履歴ログを検索する
To enable searching historic logs, add a temporary index to the forwarded logs. In Datadog, open the Logs [**Indexes**][3] tab. Click the **New Index** button in the upper right.

名前を決め、インデックスフィルターを `Source:stepfunction` に設定し、他はデフォルト値のままにして保存します。

{{< img src="serverless/step_functions/log_index.png" alt="New Log インデックス" style="width:80%;" >}}

組織が低い上限を持つ既存のすべてを網羅するインデックスを持っている場合、新しいインデックスを一番上に配置します。

**注**: ログのインデックス化はトレース取得の必須条件ではなく、追加コストが発生する場合があります。特定の問題をトラブルシューティングしている場合、一時的にログをインデックスに送信し、デバッグを行い、その後インデックスを削除することができます。詳細は[インデックス][6]を参照してください。

## Lambda のトレースが Step Function のトレースにマージされない
- Lambda のトレースと Step Function のトレースの両方が Datadog で確認できることを検証します。
- Verify that you are using Python layer v95+ or Node.js layer v112+.
- AWS コンソールで Step Function を開き、ステートマシンが `"Payload.$": "States.JsonMerge($$, $, false)"` を Lambda ステップに持っていることを確認してください。
- Execute your Step Function once and verify that the `TaskScheduled` event log of the Lambda step has the payload containing data from the [Step Function context object][4]. If you do not have a `TaskScheduled` event and only have a `LambdaFunctionScheduled` event, update the task in Step Functions definition to use the recommended Lambda integration. See the [AWS documentation][5] for instructions on how to do this.

## `aws.stepfunctions` の root スパンは見えるが、ステップスパンが見えない
ステートマシンのロギングで `Include execution data` オプションを有効にしてください。このオプションを有効にすると、ログ実行入力、ステート間で渡されたデータ、および実行出力がログに記録されます。Datadog バックエンドは、ログを使用してこれらのステップスパンを自動的に構築します。

## トレースにいくつかのステップスパンがない
- アクションについては、Lambda と DynamoDB の基本的なアクションに対応しています。例えば、Lambda Invoke、DynamoDB GetItem、DynamoDB PutItem、DynamoDB UpdateItem などです。
- `Wait`、`Choice`、`Success`、`Fail`、`Pass` はサポートされていますが、`Map` と `Parallel` はサポートされていません。並行して実行されているスパンは、互いに重なって表示されますが、フレームグラフには `Parallel` スパンは表示されません。

## カスタマイズした方法で Datadog Lambda Forwarder をデプロイする
カスタマイズした方法で Datadog Lambda Forwarder をデプロイしている場合、Step Functions のトレースを有効にするデバッグに役立つヒントをいくつか紹介します。
- フォワーダーで、環境変数 `DD_FETCH_STEP_FUNCTIONS_TAGS` を `true` に設定します。
- Datadog バックエンドで Step Functions のトレース生成を有効にするには、Datadog-Forwarder レイヤーのバージョンが 31 を超えている必要があります。このバージョンは、必要な `DD_TRACE_ENABLED` タグを含むステートマシンタグをフェッチすることができます。
- フォワーダーの IAM ロールには `tags:getResources` 権限が必要です。
- ステートマシンの CloudWatch ロググループに Datadog フォワーダー向けのサブスクリプションフィルターをセットアップします。
- ログが Datadog バックエンドに届いているかどうかを確認するには、Log Explorer ページを開き、`source:stepfunction` を `Live` 検索タイムフレームで検索します (これは Datadog のログインテークに入るすべてのログを表示します)。ログが表示されない場合は、Datadog Forwarder に API キーの間違いや無効などのエラーログがないか確認します。環境変数 `DD_LOG_LEVEL` に `DEBUG` を追加すると、Forwarder の問題のデバッグに役立ちます。Step Functions のログが表示される場合、ログに `dd_trace_enable:true` タグがあるか確認してください (すべてのタグは正規化されます)。その後、数分以内にログに関連する Step Functions のトレースが表示されるはずです。


#### 注
レガシー Lambda API を使用する Lambda ステップはマージできません。Lambda ステップの定義が `"Resource": "arn:aws:states:::lambda:invoke"` の代わりに `"Resource": "<Lambda function ARN>"` となっている場合、そのステップはレガシー Lambda API を使用しています。

Lambda に `DD_TRACE_EXTRACTOR` 環境変数が設定されている場合、そのトレースはマージできません。

[1]: https://app.datadoghq.com/logs
[2]: https://app.datadoghq.com/logs/livetail
[3]: https://app.datadoghq.com/logs/pipelines/indexes
[4]: https://docs.aws.amazon.com/step-functions/latest/dg/input-output-contextobject.html
[5]: https://docs.aws.amazon.com/step-functions/latest/dg/connect-lambda.html
[6]: /ja/logs/log_configuration/indexes/