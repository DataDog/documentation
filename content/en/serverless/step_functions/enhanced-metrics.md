---
title: Enhanced metrics for AWS Step Functions
---

In addition to [ingesting integration metrics from AWS][3], Datadog generates enhanced metrics for AWS Step Functions, similar to [enhanced metrics for AWS Lambda][1]. Enhanced Step Functions metrics are distinguished by being in the `aws.states.enhanced.*` namespace. To add enhanced metrics, follow the [AWS Step Function monitoring installation instructions][3] and ensure that `DD_ENHANCED_METRICS` is set to `true`. 

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

[1]: /serverless/aws_lambda/metrics#enhanced-lambda-metrics
[2]: /integrations/amazon_web_services/
[3]: /serverless/step_functions/installation