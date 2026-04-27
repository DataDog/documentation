---
title: Lambda Search Offloading
description: Learn how to configure Lambda-based search offloading for BYOC Logs on AWS
further_reading:
- link: "/byoc-logs/configure/"
  tag: "Documentation"
  text: "Configure BYOC Logs"
- link: "/byoc-logs/operate/sizing/"
  tag: "Documentation"
  text: "Size your cluster"
aliases:
  - /cloudprem/configure/lambda/
---

{{< callout btn_hidden="true" header="Join the Preview!" >}}
  BYOC Logs is in Preview.
{{< /callout >}}

<div class="alert alert-warning">Lambda search offloading is an experimental feature.</div>

<div class="alert alert-info">Lambda search offloading is only available on AWS.</div>

## Overview

BYOC Logs can offload leaf search operations to AWS Lambda for horizontal scaling. When the local search queue becomes saturated, overflow splits are automatically sent to Lambda functions for processing.
This allows BYOC Logs to handle traffic spikes without provisioning additional searcher nodes.

## Startup validation

When a Lambda configuration is defined, BYOC Logs performs a dry run invocation at startup to verify that:
- The Lambda function exists
- The function version matches the running BYOC Logs binary
- The invoker has permission to call the function

## Prerequisite: IAM permissions

Lambda search offloading requires specific permissions for two separate IAM roles:
- **The BYOC Logs node role**: the role attached to the Kubernetes nodes (or pod identity) running BYOC Logs.  The role is defined in the `serviceAccount` section of your `values.yaml`. This role needs permissions to invoke and deploy the Lambda function.
- **The Lambda execution role**: the role assumed by the Lambda function itself at runtime. This role needs read access to your index data in S3. Its ARN must be set in the `config.searcher.lambda.auto_deploy.execution_role_arn` key. For more details, see the [Configuration](#configuration) section.

### BYOC Logs node permissions

The IAM role running BYOC Logs needs the following permissions to invoke and deploy the Lambda function:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "lambda:CreateFunction",
        "lambda:GetFunction",
        "lambda:UpdateFunctionCode",
        "lambda:PublishVersion",
        "lambda:ListVersionsByFunction",
        "lambda:DeleteFunction",
        "lambda:InvokeFunction",
        "lambda:TagResource"
      ],
      "Resource": "arn:aws:lambda:<REGION>:<ACCOUNT_ID>:function:cloudprem-*"
    },
    {
      "Effect": "Allow",
      "Action": "iam:PassRole",
      "Resource": "<LAMBDA_EXECUTION_ROLE_ARN>",
      "Condition": {
        "StringEquals": {
          "iam:PassedToService": "lambda.amazonaws.com"
        }
      }
    }
  ]
}
```

Replace `<REGION>`, `<ACCOUNT_ID>`, and `<LAMBDA_EXECUTION_ROLE_ARN>` with values matching your environment.

### Lambda execution role

The Lambda function requires its own execution role with read access to your S3 bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::<YOUR_INDEX_BUCKET>/*"
    }
  ]
}
```

The execution role must also have a trust policy allowing Lambda to assume it:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Optionally, to capture Lambda logs in CloudWatch, add the following permissions to the execution role:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:<REGION>:<ACCOUNT_ID>:*"
    }
  ]
}
```

## Configuration

<div class="alert alert-warning">The Lambda configuration <strong>must be valid</strong> for the BYOC Logs searcher to start.</div>

After setting up the [IAM permissions](#prerequisite-iam-permissions), add a `lambda` section under `config.searcher` in your Helm chart values file to enable Lambda offloading:

{{< code-block lang="yaml" filename="datadog-values.yaml">}}
config:
  searcher:
    lambda:
      function_name: cloudprem-search
      offload_threshold: 100
      auto_deploy:
        execution_role_arn: arn:aws:iam::123456789012:role/cloudprem-lambda-role
        invocation_timeout_secs: 15
{{< /code-block >}}

Replace `arn:aws:iam::123456789012:role/cloudprem-lambda-role` with the Lambda execution role you have created.

You can then upgrade the Helm chart release:

```shell
helm upgrade <RELEASE_NAME> datadog/cloudprem \
  -n <NAMESPACE_NAME> \
  -f datadog-values.yaml
```

### Lambda configuration options

| Parameter | Description | Default |
| --- | --- | --- |
| `max_splits_per_invocation` | Maximum number of splits to send in a single Lambda invocation. Must be at least 1. | `10` |
| `offload_threshold` | Number of pending local searches before offloading to Lambda. Set to `0` to offload all searches to Lambda. | `100` |
| `auto_deploy` | Auto-deployment configuration. See below. | (none) |

### Auto-deploy configuration options

| Parameter | Description | Default |
| --- | --- | --- |
| `execution_role_arn` | **Required.** IAM role ARN for the Lambda function's execution role. | |
| `memory_size` | Memory allocated to the Lambda function. More memory provides more CPU. | `5 GiB` |
| `invocation_timeout_secs` | Timeout for Lambda invocations in seconds. | `15` |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
