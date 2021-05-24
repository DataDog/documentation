---
title: Libraries & Integrations
kind: documentation
further_reading:
- link: "/serverless/serverless_integrations/plugin/"
  tag: "Datadog Serverless Plugin"
  text: "Documentation"
- link: "/serverless/serverless_integrations/macro/"
  tag: "Documentation"
  text: "Datadog Serverless Macro"
- link: "/serverless/serverless_integrations/cli/"
  tag: "Documentation"
  text: "Datadog Serverless CLI"
aliases:
- /serverless/serverless_integrations
---

{{< whatsnext desc="Serverless Libraries & Integrations:" >}}
    {{< nextlink href="/serverless/libraries_integrations/extension/" >}}Datadog Lambda Extension{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/library/" >}}Datadog Lambda Library{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/forwarder/" >}}Datadog Lambda Forwarder{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/plugin/" >}}Datadog Lambda Plugin{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/macro/" >}}Datadog Lambda Macro{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/cli/" >}}Datadog Lambda CLI{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/lambda_code_signing/" >}}Lambda Code Signing{{< /nextlink >}}
{{< /whatsnext >}}

## AWS Step Functions

Enable the [AWS Step Functions integration][1] to automatically get additional tags on your Lambda metrics to identify which state machines a particular function belongs to. Use these tags to get an aggregated view of your Lambda metrics and logs per Step Function on the [Serverless view][2].

1. Install the [AWS Step Functions integration][1].
2. Add the following permissions to your [Datadog IAM policy][3] to add additional tags to your Lambda metrics.

    | AWS Permission     | Description                                  |
    | ------------------ | -------------------------------------------- |
    | `states:ListStateMachines`     | List active Step Functions.   |
    | `states:DescribeStateMachine` | Get Step Function metadata, and tags.  |
3. Configure [distributed tracing and logging][1] for AWS Step Functions.
4. Once done, go to the [Serverless Homepage][4] and filter your Lambda functions by `statemachinename`, `statemachinearn` or `stepname`.

{{< img src="serverless/step-function-trace.jpeg" alt="AWS Step Function Tracing" >}}

## Amazon EFS for Lambda

Enable [Amazon EFS for Lambda][5] to automatically get additional tags on your Lambda metrics to identify which EFS a particular function belongs to. Use these tags to get an aggregated view of your Lambda metrics and logs per EFS on the [Serverless view][6].

1. Install the [Amazon EFS integration][7].
2. Add the following permissions to your [Datadog IAM policy][3] to collect EFS metrics from Lambda.

    | AWS Permission     | Description                                  |
    | ------------------ | -------------------------------------------- |
    | `elasticfilesystem:DescribeAccessPoints`     | Lists active EFS connected to Lambda functions. |

3. Once done, go to the [Serverless view][2] to use the new `filesystemid` tag on your Lambda functions.

{{< img src="integrations/amazon_lambda/efs_for_lambda.gif" alt="Amazon EFS for Lambda" >}}

## Lambda@Edge

Use the `at_edge`, `edge_master_name`, and `edge_master_arn` tags to get an aggregated view of your Lambda function metrics and logs as they run in Edge locations.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /integrations/amazon_step_functions/
[2]: https://app.datadoghq.com/functions
[3]: /integrations/amazon_web_services/#installation
[4]: /serverless/serverless_integrations/macro/
[5]: /integrations/amazon_efs/#amazon-efs-for-lambda
[6]: /serverless/serverless_integrations/plugin/
[7]: /integrations/amazon_efs/
