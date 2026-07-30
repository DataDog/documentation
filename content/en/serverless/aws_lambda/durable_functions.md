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