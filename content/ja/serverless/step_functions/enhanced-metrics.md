---
kind: ドキュメント
title: AWS Step Functions の拡張メトリクス
---

In addition to [ingesting integration metrics from AWS][3], Datadog generates enhanced metrics for AWS Step Functions, similar to [enhanced metrics for AWS Lambda][1]. Enhanced Step Functions metrics are distinguished by being in the `aws.states.enhanced.*` namespace. To add enhanced metrics, follow the [AWS Step Function monitoring installation instructions][3] and ensure that `DD_ENHANCED_METRICS` is set to `true`. 

以下の Step Functions 拡張メトリクスが利用可能です。

`aws.states.enhanced.execution.started`
: 開始した実行の総数を数えます。

`aws.states.enhanced.execution.succeeded`
: 成功した実行の総数を数えます。

`aws.states.enhanced.execution.failed`
: 失敗した実行の総数を数えます。

`aws.states.enhanced.execution.execution_time`
: 個別実行の期間の分布。

`aws.states.enhanced.task.execution.tasks_started`
: 開始したタスクの総数を数えます。

`aws.states.enhanced.task.execution.tasks_succeeded`
: 成功したタスクの総数を数えます。

`aws.states.enhanced.task.execution.tasks_failed`
: 失敗したタスクの総数を数えます。

`aws.states.enhanced.task.execution.task_duration`
: 個別タスクの期間の分布。

`aws.states.enhanced.task.execution.tasks_timed_out`
: タイムアウトしたタスクの総数を数えます。

`aws.states.enhanced.state.run_duration`
: ステート実行の期間を測るゲージ。

`aws.states.enhanced.state.duration`
: リトライを含む、ステート実行の期間を測るゲージ。

`aws.states.enhanced.state.invocation_count`
: ステートが呼び出された回数のカウント。

`aws.states.enhanced.state.retry_count`
: ステートの再試行回数を測るゲージ。

[1]: /ja/serverless/aws_lambda/metrics#enhanced-lambda-metrics
[2]: /ja/integrations/amazon_web_services/
[3]: /ja/serverless/step_functions/installation