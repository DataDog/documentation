---
title: Serverless Libraries and Integrations
kind: documentation
aliases:
  - /serverless/serverless_integrations
  - /serverless/datadog_lambda_library/
  - /serverless/libraries_integrations/library/
---

## Serverless Development Tool Integrations

{{< whatsnext desc="Datadog integrates with popular serverless development tools to install the Datadog Lambda extension and library to your applications automatically." >}}
    {{< nextlink href="/serverless/libraries_integrations/plugin/" >}}Datadog Plugin for Serverless Framework{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/cli/" >}}Datadog Lambda CLI{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/cdk/" >}}Datadog Construct for AWS CDK{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/macro/" >}}Datadog Serverless Macro for AWS SAM{{< /nextlink >}}
{{< /whatsnext >}}

## Datadog Lambda Extension and Forwarder

{{< whatsnext desc="You need either the Lambda extension or the Forwarder to send telemetry from your Lambda functions. You may also need the Forwarder to collect logs for non-Lambda serverless resources, such as AWS API Gateway." >}}
    {{< nextlink href="/serverless/libraries_integrations/extension/" >}}Datadog Lambda Extension{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring" >}}Datadog Forwarder Lambda Function{{< /nextlink >}}
{{< /whatsnext >}}

## Datadog Lambda Libraries

{{< whatsnext desc="Certain runtime requires the Datadog Lambda library in addition to the Datadog Lambda extension to collect the telemetry." >}}
    {{< nextlink href="https://github.com/DataDog/datadog-lambda-python" >}}Datadog Lambda Library for Python{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/datadog-lambda-js" >}}Datadog Lambda Library for Node.js{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/datadog-lambda-go" >}}Datadog Lambda Library for Go{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/datadog-lambda-rb" >}}Datadog Lambda Library for Ruby{{< /nextlink >}}
{{< /whatsnext >}}

## AWS Step Functions

Enable the [AWS Step Functions integration][1] for metrics, traces, and logs.

Datadog automatically adds tags `statemachinename`, `statemachinearn`, and `stepname` on your Lambda telemetry to identify which state machines a particular function belongs to. You can use these tags to get an aggregated view of your Lambda functions on the [Serverless view][2].

{{< img src="serverless/step-function-trace.jpeg" alt="AWS Step Function Tracing" >}}

## Lambda@Edge

Enable the [AWS Lambda integration][3] for metrics and logs. Datadog automatically adds tags `at_edge`, `edge_master_name`, and `edge_master_arn` tags on your Lambda metrics to get an aggregated view of your Lambda function metrics and logs as they run in Edge locations.

Distributed tracing is _not_ yet supported for Lambda@Edge functions.

[1]: /integrations/amazon_step_functions/
[2]: https://app.datadoghq.com/functions
[3]: /integrations/amazon_lambda/
