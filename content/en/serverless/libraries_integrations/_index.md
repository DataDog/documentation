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

{{< whatsnext desc="You need either the Lambda extension or the Forwarder to send telemetry from your Lambda functions. You may also need the Forwarder to collect logs for non-Lambda serverless resources, such as Amazon API Gateway." >}}
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

## Datadog AWS Integration

{{< whatsnext desc="In addition to collecting telemetry directly from your Lambda functions, Datadog can also collect telemetry through the Datadog AWS integration for resources utilized by your serverless application." >}}
    {{< nextlink href="/integrations/amazon_lambda/" >}}AWS Lambda Integration{{< /nextlink >}}
    {{< nextlink href="/integrations/amazon_step_functions/" >}}AWS Step Functions Integration{{< /nextlink >}}
    {{< nextlink href="/integrations/amazon_appsync/" >}}AWS AppSync Integration{{< /nextlink >}}
    {{< nextlink href="/integrations/amazon_api_gateway/" >}}Amazon API Gateway Integration{{< /nextlink >}}
    {{< nextlink href="/integrations/amazon_sqs/" >}}Amazon SQS Integration{{< /nextlink >}}
    {{< nextlink href="/integrations/amazon_sns/" >}}Amazon SNS Integration{{< /nextlink >}}
{{< /whatsnext >}}