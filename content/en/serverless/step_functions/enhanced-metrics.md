---
title: Enhanced metrics for AWS Step Functions
kind: documentation
---

Datadog generates enhanced metrics for AWS Step Functions, similarly to [enhanced metrics for AWS Lambda][1]. Enhanced Step Functions metrics are distinguished by being in the `aws.states.enhanced.*` namespace.

The following enhanced Step Functions metrics are available.

`aws.states.enhanced.execution.started`
: Counts the total number of executions that have started.

`aws.states.enhanced.execution.succeeded`
: Counts the total number of executions that have succeeded.

`aws.states.enhanced.execution.failed`
: Counts the total number of executions that failed.

`aws.states.enhanced.execution.execution_time`
: Distribution of the duration of individual executions.

`aws.states.enhanced.task.execution.tasks_started`
: Counts the total number of tasks that have started.

`aws.states.enhanced.task.execution.tasks_succeeded`
: Counts the total number of tasks that have succeeded.

`aws.states.enhanced.task.execution.tasks_failed`
: Counts the total number of tasks that have failed.

`aws.states.enhanced.task.execution.task_duration`
: Distribution of the durations of individual tasks.

`aws.states.enhanced.task.execution.tasks_timed_out`
: Counts the total number of tasks that timed out.

`aws.states.enhanced.state.run_duration`
: Gauge for durations of a state's runs.

`aws.states.enhanced.state.duration`
: Gauge for duration of a state's runs, including retries.

`aws.states.enhanced.state.invocation_count`
: Count of the number of times a state is invoked.

`aws.states.enhanced.state.retry_count`
: Gauge of the number of retries for a state.

[1]: /serverless/aws_lambda/metrics#enhanced-lambda-metr