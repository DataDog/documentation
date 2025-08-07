---
title: AWS Step Functions の拡張メトリクス
---

AWS からのインテグレーション メトリクスを取り込むだけでなく [AWS][3]、Datadog は AWS Step Functions 用の拡張メトリクスも生成します。これは [AWS Lambda の拡張メトリクス][1] と同様です。拡張 Step Functions メトリクスは `aws.states.enhanced.*` ネームスペースで区別されます。拡張メトリクスを追加するには、[AWS Step Functions 監視のインストール手順][3] に従い、`DD_ENHANCED_METRICS` を `true` に設定してください。

利用可能な拡張 Step Functions メトリクス

`aws.states.enhanced.execution.started`
: 開始された実行の合計回数をカウントします。

`aws.states.enhanced.execution.succeeded`
: 成功した実行の合計回数をカウントします。

`aws.states.enhanced.execution.failed`
: 失敗した実行の合計回数をカウントします。

`aws.states.enhanced.execution.execution_time`
: 個々の実行時間の分布を示します。

`aws.states.enhanced.task.execution.tasks_started`
: 開始されたタスクの合計回数をカウントします。

`aws.states.enhanced.task.execution.tasks_succeeded`
: 成功したタスクの合計回数をカウントします。

`aws.states.enhanced.task.execution.tasks_failed`
: 失敗したタスクの合計回数をカウントします。

`aws.states.enhanced.task.execution.task_duration`
: 個々のタスク所要時間の分布を示します。

`aws.states.enhanced.state.run_duration`
: ステートの実行時間をゲージで示します。

`aws.states.enhanced.state.duration`
: リトライを含むステートの実行時間をゲージで示します。

`aws.states.enhanced.state.invocation_count`
: ステートが呼び出された回数をカウントします。

`aws.states.enhanced.state.retry_count`
: ステートのリトライ回数をゲージで示します。

[1]: /ja/serverless/aws_lambda/metrics#enhanced-lambda-metrics
[2]: /ja/integrations/amazon_web_services/
[3]: /ja/serverless/step_functions/installation