---

title: Monitoring AWS Lambda Durable Functions
description: Set up Datadog Serverless Monitoring for AWS Lambda Durable Functions.

---

Datadog provides full visibility into the metrics, logs, and traces for AWS Lambda Durable Function executions. In a single view, you can monitor your AWS Lambda Durable Functions alongside your other serverless compute services to spot bottlenecks and fix errors.

**Supported runtimes:** Node.js, Python

## Setup

### Instrument your Lambda function

1. Follow [the steps for instrumenting a Lambda function][1], confirming that the Datadog Lambda Library is installed and that both tracing and [log collection][9] are enabled (log collection is enabled by default). Use the following versions:

    - Datadog Lambda Extension: v99+
    - Datadog Node.js Lambda layer: v142+
    - Datadog Python Lambda layer: v127+

2. Set the following environment variable on your Lambda function:

    ```text
    DD_LAMBDA_DURABLE_FUNCTION_LOG_BUFFER_SIZE=5
    ```

    This environment variable configures the Datadog Lambda Extension to buffer logs and enrich them with the durable execution context sent by the Datadog Lambda Library. Set its value to a non-negative integer specifying the maximum number of invocations whose logs are buffered. The default, `0`, disables enrichment, so durable executions do not appear in Datadog.

### Forward durable execution events

**Deploy the CloudFormation stack**

To forward durable execution status change events to Datadog, deploy the CloudFormation stack to your AWS account:

1. Log in to the AWS account and region where your durable functions run, then click **Launch Stack** to open the stack:

    [![Launch Stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)][2]

2. Provide your Datadog API key using exactly one of the following parameters:

    - `DdApiKey`: your [Datadog API key][3] in plaintext
    - `DdApiKeySecretArn`: the ARN of an AWS Secrets Manager secret whose value is your Datadog API key
    - `DdApiKeySsmParameterName`: the name of an AWS Systems Manager Parameter Store `SecureString` parameter that holds your Datadog API key

3. Set `DdSite` to your [Datadog site][4]. The default is `datadoghq.com`.
4. Optionally, restrict which events are forwarded:

    - `Statuses`: a comma-separated list of execution statuses to forward. Valid values are `RUNNING`, `SUCCEEDED`, `FAILED`, `TIMED_OUT`, and `STOPPED`. Leave this empty to forward all statuses.
    - `FunctionArnFilter1` through `FunctionArnFilter5`: up to five unqualified Lambda function ARNs or EventBridge wildcard patterns, such as `arn:aws:lambda:us-east-2:123456789012:function:my-durable-*`. Do not include a version or alias suffix. Leave all five empty to forward events from every function in the region.
    - `BufferIntervalSeconds`: the Amazon Data Firehose buffer interval, in seconds (`60`-`900`, default `60`). Higher values reduce the number of outbound requests at the cost of freshness.

5. Click **Create stack** and wait for the stack to finish creating.
6. If your durable functions run in multiple AWS regions, repeat these steps in each region.

**Install the AWS Lambda integration**

In Datadog, install the [AWS Lambda integration][5], which provides the out-of-the-box logs pipeline that transforms the forwarded events.

### Create a trace retention filter

Create a [trace retention filter][6] with the retention query `operation_name:aws.durable.execute`.

## Querying durable executions in Datadog

The **Executions** tab on the Lambda function page lists durable executions. Use the log attributes, span tags, and metrics below to query this data directly, or to build dashboards and monitors.

### Logs

To scope a log query to one function, filter on the function ARN:

```text
@lambda.arn:"<FUNCTION_ARN>"
```

The Datadog Lambda Extension adds these attributes to a durable function's logs:

| Log attribute | Description |
|---|---|
| `@lambda.durable_function.execution_name` | The execution name. Groups all logs from one execution. |
| `@lambda.durable_function.execution_id` | The execution ID. |
| `@lambda.durable_function.first_invocation` | `true` on logs from the execution's first invocation, `false` otherwise. |
| `@lambda.durable_function.execution_status` | The execution's state when the invocation ended: `SUCCEEDED`, `FAILED`, or `PENDING`, where `PENDING` means the execution suspended and resumes in a later invocation. On the `END` log, or on the `REPORT` log for executions on Lambda Managed Instances. |

Example queries:

- All logs for one durable execution:

    ```text
    @lambda.durable_function.execution_name:"<EXECUTION_NAME>"
    ```

- Each execution's `START` log, which marks when it began:

    ```text
    "START RequestId:" @lambda.durable_function.first_invocation:true
    ```

- Each execution's last log, which marks when it ended:

    ```text
    "END RequestId:" OR "REPORT RequestId:"
    ```

    Lambda Managed Instances emit no `END` log, so query both.

### Status change events

The events forwarded by the CloudFormation stack arrive as logs, matched by:

```text
@detail-type:"Durable Execution Status Change"
```

The AWS Lambda integration pipeline maps these events onto the same `@lambda.durable_function.*` attributes, plus two timestamps:

| Log attribute | Description |
|---|---|
| `@lambda.durable_function.execution_status` | One of `RUNNING`, `SUCCEEDED`, `FAILED`, `TIMED_OUT`, or `STOPPED`. |
| `@lambda.durable_function.execution_start_time` | When the execution started, in UNIX milliseconds. |
| `@lambda.durable_function.execution_end_time` | When the execution reached a terminal status, in UNIX milliseconds. |

Treat these events as the source of truth for terminal status, as `END` and `REPORT` logs cannot report `TIMED_OUT` or `STOPPED`.

Terminal events are timestamped when the execution finished, so a time range selects executions that finished within it.

### Traces

To scope a span query to one function, filter on the function ARN:

```text
@function_arn:"<FUNCTION_ARN>"
```

**The durable execution span**

The tracer creates one `aws.durable.execute` span per invocation and stitches an execution's invocations into a single trace.

```text
operation_name:aws.durable.execute
```

| Span tag | Description |
|---|---|
| `@aws.durable.execution_arn` | The full durable execution ARN, which contains the execution name. This span does not carry the name as a separate tag. |
| `@aws.durable.invocation_status` | The execution's state when this invocation ended: `succeeded`, `failed`, or `pending`. `pending` means the execution suspended and resumes in a later invocation. |
| `@aws.durable.replayed` | `false` on the invocation that starts an execution, `true` on each later invocation that resumes it after a suspend. |

**The Lambda invocation span**

Each invocation also produces the standard `aws.lambda` span, tagged with the durable execution context:

| Span tag | Description |
|---|---|
| `@aws.durable.execution_name` | The execution name. |
| `@aws.durable.execution_id` | The execution ID. |
| `@aws.durable.first_invocation` | `true` on the first invocation of an execution. |
| `@aws.durable.execution_status` | The execution's state when the invocation ended: `SUCCEEDED`, `FAILED`, or `PENDING`. |

**Operation spans**

Each operation called on the durable context produces a child span:

| Operation name | Node.js method | Python method |
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

| Span tag | Description |
|---|---|
| `@aws.durable.operation_name` | The operation's name. |
| `@aws.durable.operation_id` | A hash of the operation's step ID. |
| `@aws.durable.operation_attempt` | The attempt number, on the retryable operations `aws.durable.step` and `aws.durable.wait_for_condition`. `0` is the original attempt, `1` the first retry. |
| `@aws.durable.replayed` | `true` when the operation's result was served from a checkpoint instead of executed. Failed checkpoints count as well as successful ones. |
| `@aws.durable.invoke.function_name` | The target function, on `aws.durable.invoke` spans. |

Cross-invocation trace propagation adds synthetic `_datadog_<N>` step operations carrying the trace headers to your durable execution log. To turn it off, set `DD_DURABLE_CROSS_INVOCATION_TRACING_ENABLED=false`.

### Metrics

AWS publishes these durable execution metrics to CloudWatch. They reach Datadog through the [AWS Lambda integration][5], not the Datadog Lambda Extension, and are tagged with `functionname`.

| Metric | Description | Aggregation |
|---|---|---|
| `aws.lambda.durable_execution_started` | Number of durable executions started. | `sum` as count |
| `aws.lambda.durable_execution_succeeded` | Number of durable executions that completed successfully. | `sum` as count |
| `aws.lambda.durable_execution_failed` | Number of durable executions that completed with failure. | `sum` as count |
| `aws.lambda.durable_execution_timed_out` | Number of durable executions that exceeded their timeout. | `sum` as count |
| `aws.lambda.durable_execution_stopped` | Number of durable executions stopped with the `StopDurableExecution` API. | `sum` as count |
| `aws.lambda.durable_execution_duration` | Wall-clock time a durable execution spent in the `RUNNING` state, in milliseconds. | `avg` |
| `aws.lambda.durable_execution_operations` | Cumulative number of operations performed by durable executions. | `sum` as count |
| `aws.lambda.durable_execution_storage_written_bytes` | Cumulative amount of data persisted by durable executions, in bytes. | `sum` |
| `aws.lambda.approximate_running_durable_executions` | Number of durable executions in the `RUNNING` state. | `avg` |
| `aws.lambda.approximate_running_durable_executions_utilization` | Percentage of the durable execution quota in use. | `avg` |

For example, to graph failed executions for one function:

```text
sum:aws.lambda.durable_execution_failed{functionname:<FUNCTION_NAME>}.as_count()
```

These metrics count whole executions and do not depend on the durable log enrichment described under [Setup](#setup). They come from a different source than `aws.lambda.enhanced.invocations`, which the Datadog Lambda Extension generates per invocation.

### Correlating logs and traces

The execution name joins the three sources, but its attribute name differs:

| Concept | Logs and status events | Spans |
|---|---|---|
| Execution name | `@lambda.durable_function.execution_name` | `@aws.durable.execution_name` |
| Execution ID | `@lambda.durable_function.execution_id` | `@aws.durable.execution_id` |
| Full execution ARN | — | `@aws.durable.execution_arn` |

## Limitations and feedback

Runtimes other than Node.js and Python are not supported. If you encounter an issue with another runtime, open an issue in the [datadog-lambda-extension GitHub repository][7].

If you encounter an issue with the CloudFormation stack, open an issue in the [cloudformation-template GitHub repository][8].

[1]: /serverless/aws_lambda/instrumentation
[2]: https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-durable-function-event-forwarder&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/lambda-durable-function-event-forwarder/latest.yaml
[3]: /account_management/api-app-keys/#api-keys
[4]: /getting_started/site/
[5]: /integrations/amazon_lambda/
[6]: /tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
[7]: https://github.com/DataDog/datadog-lambda-extension
[8]: https://github.com/DataDog/cloudformation-template/tree/master/aws_durable_function_event_forwarder
[9]: /serverless/aws_lambda/logs/#enable-log-collection