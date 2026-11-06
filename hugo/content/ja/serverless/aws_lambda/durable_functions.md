---
description: AWS Lambda Durable Functions のための Datadog Serverless Monitoring を設定します。
further_reading:
- link: https://www.datadoghq.com/blog/trace-aws-lambda-durable-functions/
  tag: ブログ
  text: Datadog で AWS Lambda Durable Functions をトレースする
title: AWS Lambda Durable Functions のモニタリング
---
Datadog は、AWS Lambda Durable Function を実行するためのメトリクス、ログ、トレースに対する完全な可視性を提供します。単一ビューで、AWS Lambda Durable Functions を他のサーバーレスコンピューティングサービスと一緒に監視し、ボトルネックの特定やエラーの修正を行うことができます。

**サポートされているランタイム:** Node.js、Python

## セットアップ {#setup}

### Lambda 関数をインスツルメントする {#instrument-your-lambda-function}

1. [Lambda 関数のインスツルメンテーションの手順][1]に従い、Datadog Lambda ライブラリがインストールされていること、およびトレースと[ログ収集][9]の両方が有効になっていることを確認します (ログ収集はデフォルトで有効になっています)。次のバージョンを使用します。

    - Datadog Lambda Extension: v99+
    - Datadog Node.js Lambda レイヤー: v142+
    - Datadog Python Lambda レイヤー: v127+

2. Datadog Lambda Extension v99 を使用する場合は、Lambda 関数に次の環境変数を設定します。v100+ の場合、デフォルト値はすでに `5` であるため、明示的に設定する必要はありません。

    ```text
    DD_LAMBDA_DURABLE_FUNCTION_LOG_BUFFER_SIZE=5
    ```

    This environment variable configures the Datadog Lambda Extension to buffer logs and enrich them with the durable execution context sent by the Datadog Lambda Library. Set its value to a non-negative integer specifying the maximum number of invocations whose logs are buffered. A value of `0` disables enrichment, so durable executions do not appear in Datadog. In v99, the default is `0`; in v100+, the default is `5`.

### Durable Execution イベントを転送する {#forward-durable-execution-events}

**CloudFormation スタックをデプロイする**

Durable Execution ステータス変更イベントを Datadog に転送するには、CloudFormation スタックを AWS アカウントにデプロイしてください。

1. Durable 関数が実行されている AWS アカウントとリージョンにログインし、**Launch Stack** をクリックしてスタックを開きます。

    [![Launch Stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)][2]

2. 次のいずれかのパラメーターを使用して、Datadog API キーを指定します。

    - `DdApiKey`: プレーンテキストの [Datadog API キー][3]
    - `DdApiKeySecretArn`: 値が Datadog API キーである AWS Secrets Manager シークレットの ARN。
    - `DdApiKeySsmParameterName`: Datadog API キーを保持する AWS Systems Manager Parameter Store `SecureString` パラメーターの名前

3. `DdSite` を [Datadog サイト][4]に設定します。デフォルトは `datadoghq.com` です。
4. オプションとして、転送するイベントを制限します。

    - `Statuses`: 転送する実行ステータスのカンマ区切りリスト。有効な値は、`RUNNING`、`SUCCEEDED`、`FAILED`、`TIMED_OUT`、および `STOPPED` です。すべてのステータスを転送するには、これを空白のままにします。
    - `FunctionArnFilter1` ～ `FunctionArnFilter5`: 最大 5 つの非修飾 Lambda 関数 ARN または EventBridge ワイルドカードパターン (`arn:aws:lambda:us-east-2:123456789012:function:my-durable-*` など)。バージョンまたはエイリアスサフィックスは含めないでください。リージョン内のすべての関数からイベントを転送するには、5 つすべてを空白のままにします。
    - `BufferIntervalSeconds`: Amazon Data Firehose バッファ間隔 (秒単位、`60`～`900`、デフォルト `60`)。値を大きくすると、鮮度は低下しますが、アウトバウンドリクエストの数は減少します。

5. スタックを作成**をクリックして、スタックの作成が完了するまで待ちます。**
6. Durable 関数が複数の AWS リージョンで実行されている場合は、各リージョンでこれらの手順を繰り返します。

**AWS Lambda インテグレーションをインストールする**

Datadog で [AWS Lambda インテグレーション][5]をインストールします。これにより、転送されたイベントを変換するすぐに使えるログパイプラインが提供されます。

### トレース保持フィルターを作成する {#create-a-trace-retention-filter}

保持クエリ `operation_name:aws.durable.execute` を使用して[トレース保持フィルター][6]を作成します。

## Datadog でのクエリ {#querying-in-datadog}

Lambda 関数ページの **Executions** タブには、Durable Execution が一覧表示されます。以下のログ属性、スパンタグ、およびメトリクスを使用して、Durable Execution を検索したり、ダッシュボードやモニターを構築したりします。

### ログ {#logs}

ログクエリを 1 つの関数にスコープするには、関数 ARN でフィルタリングします。

```text
@lambda.arn:"<FUNCTION_ARN>"
```

Datadog Lambda Extension は、Durable Function のログに以下の属性を追加します。

| ログ属性 | 説明 |
|---|---|
| `@lambda.durable_function.execution_name` | 実行名。1 つの実行からのすべてのログをグループ化します。|
| `@lambda.durable_function.execution_id` | 実行 ID。|
| `@lambda.durable_function.first_invocation` | `true` が実行の最初の呼び出しとなり、それ以外の場合は `false` となります。|
| `@lambda.durable_function.execution_status` | 呼び出し終了時の実行状態: `SUCCEEDED`、`FAILED`、または `PENDING`。ここでの `PENDING` は、実行が中断され、後の呼び出しで再開されることを意味します。`END` ログ、または [Lambda Managed Instances][10] での実行の場合は `REPORT` ログとなります。|

クエリの例 (`@lambda.arn:"<FUNCTION_ARN>"` を追加して 1 つの関数にスコープします):

- 1 つの Durable Execution のすべてのログ:

    ```text
    @lambda.durable_function.execution_name:"<EXECUTION_NAME>"
    ```

- 各実行の `START` ログ (開始を示します):

    ```text
    "START RequestId:" @lambda.durable_function.first_invocation:true
    ```

- 各実行の最後のログ (終了を示します):

    ```text
    "END RequestId:" OR "REPORT RequestId:"
    ```

    Lambda Managed Instances emit no `END` log, so query both.

### ステータス変更イベント {#status-change-events}

CloudFormation スタックによって転送されたイベントはログとして到着し、以下によって照合されます。

```text
@detail-type:"Durable Execution Status Change"
```

AWS Lambda インテグレーションパイプラインは、これらのイベントを以下の属性にマッピングします。

| ログ属性 | 説明 |
|---|---|
| `@lambda.durable_function.execution_status` | 次のいずれか: `RUNNING`、`SUCCEEDED`、`FAILED`、`TIMED_OUT`、または `STOPPED`。|
| `@lambda.durable_function.execution_start_time` | 実行開始時刻 (UNIX ミリ秒単位)。|
| `@lambda.durable_function.execution_end_time` | 実行が終了ステータスに達した時刻 (UNIX ミリ秒単位)。|

これらのイベントを終了ステータスの信頼できる情報源として扱ってください。`END` および `REPORT` ログでは `TIMED_OUT` や `STOPPED` を報告できないためです。

終了イベントには実行が完了した時刻がタイムスタンプとして記録されるため、タイムレンジを指定することで、その範囲内に完了した実行を選択できます。

### トレース {#traces}

スパンクエリを 1 つの関数にスコープするには、関数 ARN でフィルタリングします。

```text
@function_arn:"<FUNCTION_ARN>"
```

**Durable Execution スパン**

トレーサーは呼び出しごとに 1 つの `aws.durable.execute` スパンを作成し、実行の呼び出しを単一のトレースに結合します。

| スパンタグ | 説明 |
|---|---|
| `@aws.durable.execution_arn` | Durable Execution ARN (実行名を含む)。このスパンには、実行名が個別のタグとして付与されていません。|
| `@aws.durable.invocation_status` | この呼び出しが終了した時点での実行状態: `succeeded`、`failed`、または `pending`。`pending` は、実行が中断され、後の呼び出しで再開されることを意味します。|
| `@aws.durable.replayed` | `false` は実行を開始する呼び出しに、`true` は中断後に実行を再開する後続の各呼び出しに付与されます。|

**Lambda 呼び出しスパン**

各呼び出しは、Durable Execution コンテキストでタグ付けされた標準的な `aws.lambda` スパンも生成します。

| スパンタグ | 説明 |
|---|---|
| `@aws.durable.execution_name` | 実行名。|
| `@aws.durable.execution_id` | 実行 ID。|
| `@aws.durable.first_invocation` | `true`: 実行の最初の呼び出し時。|
| `@aws.durable.execution_status` | 呼び出しが終了した時点での実行状態: `SUCCEEDED`、`FAILED`、または `PENDING`。|

**オペレーションスパン**

Durable コンテキストで呼び出された各オペレーションは、子スパンを生成します。

| オペレーション名 | Node.js メソッド | Python メソッド |
|---|---|---|
| `aws.durable.step` | `step` | `step` |
| `aws.durable.invoke` | `invoke` | `invoke` |
| `aws.durable.wait` | `wait` | `wait` |
| `aws.durable.wait_for_condition` | `waitForCondition` | `wait_for_condition` |
| `aws.durable.wait_for_callback` | `waitForCallback` | `wait_for_callback` |
| `aws.durable.create_callback` | `createCallback` | `create_callback` |
| `aws.durable.map` | `map` | `map` |
| `aws.durable.parallel` | `parallel` | `parallel` |
| `aws.durable.child_context` | `runInChildContext` | `run_in_child_context` |

| スパンタグ | 説明 |
|---|---|
| `@aws.durable.operation_name` | オペレーションの名前。|
| `@aws.durable.operation_id` | オペレーションのステップ ID のハッシュ。|
| `@aws.durable.operation_attempt` | 再試行可能なオペレーション `aws.durable.step` および `aws.durable.wait_for_condition` における試行回数。`0` は最初の試行、`1` は 1 回目の再試行です。|
| `@aws.durable.replayed` | `true`オペレーションの結果が実行されずにチェックポイントから提供された場合、その保存された結果が成功か失敗かを示します。|
| `@aws.durable.invoke.function_name` | ターゲット関数 (`aws.durable.invoke` スパン上)。|

### メトリクス {#metrics}

AWS は、これらの Durable Execution メトリクスを CloudWatch に公開します。これらは [AWS Lambda インテグレーション][5]を通じて Datadog に到達し、`functionname` でタグ付けされます。

| メトリクス | 説明 | 集計 |
|---|---|---|
| `aws.lambda.durable_execution_started` | 開始された Durable Execution の数。| `sum` as count |
| `aws.lambda.durable_execution_succeeded` | 正常に完了した Durable Execution の数。| `sum` as count |
| `aws.lambda.durable_execution_failed` | 失敗した Durable Execution の数。| `sum` as count |
| `aws.lambda.durable_execution_timed_out` | タイムアウトを超過した Durable Execution の数。| `sum` as count |
| `aws.lambda.durable_execution_stopped` | Durable Execution が`StopDurableExecution` API で停止した数。| `sum` as count |
| `aws.lambda.durable_execution_duration` | Durable Execution が `RUNNING` 状態で費やしたウォールクロック時間 (ミリ秒単位)。| `avg` |
| `aws.lambda.durable_execution_operations` | Durable Execution によって実行されたオペレーションの累積数。| `sum` as count |
| `aws.lambda.durable_execution_storage_written_bytes` | Durable Execution によって永続化されたデータの累積量 (バイト単位)。| `sum` |
| `aws.lambda.approximate_running_durable_executions` | `RUNNING` 状態にある Durable Execution の数。| `avg` |
| `aws.lambda.approximate_running_durable_executions_utilization` | 使用中の Durable Execution クォータの割合。| `avg` |

たとば、1 つの関数で失敗した実行をグラフ化するには、次のようにします。

```text
sum:aws.lambda.durable_execution_failed{functionname:<FUNCTION_NAME>}.as_count()
```

## 制限事項とフィードバック {#limitations-and-feedback}

Node.js および Python 以外のランタイムはサポートされていません。他のランタイムで問題が発生した場合は、[datadog-lambda-extension GitHub リポジトリ][7]で問題を作成します。

CloudFormation スタックで問題が発生した場合は、[cloudformation-template GitHub リポジトリ][8]で問題を作成します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/serverless/aws_lambda/instrumentation
[2]: https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-durable-function-event-forwarder&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/lambda-durable-function-event-forwarder/latest.yaml
[3]: /ja/account_management/api-app-keys/#api-keys
[4]: /ja/getting_started/site/
[5]: /ja/integrations/amazon_lambda/
[6]: /ja/tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
[7]: https://github.com/DataDog/datadog-lambda-extension
[8]: https://github.com/DataDog/cloudformation-template/tree/master/aws_durable_function_event_forwarder
[9]: /ja/serverless/aws_lambda/logs/#enable-log-collection
[10]: /ja/serverless/aws_lambda/managed_instances/