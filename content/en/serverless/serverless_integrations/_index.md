---
title: Serverless Integrations
kind: documentation
---

The following Lambda function integrations provide additional functionality for monitoring serverless applications:

## AWS Step Functions

Enable the [AWS Step Functions integration][1] to automatically get additional tags on your Lambda metrics to identify which state machines a particular function belongs to. Use these tags to get an aggregated view of your Lambda metrics and logs per Step Function on the [Serverless view][2].

1. Install the [AWS Step Functions integration][1].
2. Add the following permissions to your [Datadog IAM policy][3] to add additional tags to your Lambda metrics.

    | AWS Permission     | Description                                  |
    | ------------------ | -------------------------------------------- |
    | `states:ListStateMachines`     | List active Step Functions.   |
    | `states:DescribeStateMachine` | Get Step Function metadata, and tags.  |
3. Configure [distributed tracing and logging][4] for AWS Step Functions.
4. Once done, go to the [Serverless Homepage][2] and filter your Lambda functions by `statemachinename`, `statemachinearn` or `stepname`.

{{< img src="serverless/step-function-trace.jpeg" alt="AWS Step Function Tracing" >}}

## Amazon EFS for Lambda

Enable [Amazon EFS for Lambda][5] to automatically get additional tags on your Lambda metrics to identify which EFS a particular function belongs to. Use these tags to get an aggregated view of your Lambda metrics and logs per EFS on the [Serverless view][4].

1. Install the [Amazon EFS integration][6].
2. Add the following permissions to your [Datadog IAM policy][3] to collect EFS metrics from Lambda.

    | AWS Permission     | Description                                  |
    | ------------------ | -------------------------------------------- |
    | `elasticfilesystem:DescribeAccessPoints`     | Lists active EFS connected to Lambda functions. |

3. Once done, go to the [Serverless Homepage][2] to use the new `filesystemid` tag on your Lambda functions.

{{< img src="integrations/amazon_lambda/efs_for_lambda.gif" alt="Amazon EFS for Lambda" >}}

## Lambda@Edge

Use the `at_edge`, `edge_master_name`, and `edge_master_arn` tags to get an aggregated view of your Lambda function metrics and logs as they run in Edge locations.


[1]: /integrations/amazon_step_functions/
[2]: https://app.datadoghq.com/functions
[3]: /integrations/amazon_web_services/#installation
[4]: /integrations/amazon_step_functions/#log-collection
[5]: /integrations/amazon_efs/#amazon-efs-for-lambda
[6]: /integrations/amazon_efs/
