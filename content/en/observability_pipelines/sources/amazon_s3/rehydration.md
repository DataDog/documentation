---
title: Amazon S3
disable_toc: false
code_lang: rehydration
type: multi-code-lang
weight: 2
---

{{< callout url="https://www.datadoghq.com/product-preview/rehydration-for-observability-pipelines/"
 btn_hidden="false">}}
Rehydration is in Preview. Fill out the form to request access.
{{< /callout >}}

## Overview

Use the Amazon S3 Rehydration source in a Rehydration pipeline to pull archived logs from Amazon S3 and process them in Observability Pipelines.

## When to use this source

Common scenarios when you might use this source:

* You want to retrieve archived logs on demand.
* You want to process historical logs with Observability Pipelines.
* You want to route rehydrated data to different destinations.

See the [How Rehydration works][1] documentation for more details.

## Prerequisites

To use Observability Pipelines' Amazon S3 Rehydration source, you must configure a SQS queue to receive your S3 bucket notifications.

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline in the UI][2]. You can also set up a pipeline using the [API][3] or [Terraform][4]. The information below is for the source settings in the pipeline UI.

1. Select the time frame for rehydrating your logs.
1. Enter the name of the S3 bucket from which you want to rehydrate logs.
1. Select the AWS region in the dropdown menu.
1. Enter a key prefix to apply to all object keys.
- Prefixes are useful for partitioning objects. For example, you can use a prefix as an object key to store objects under a particular directory. If using a prefix for this purpose, it must end in `/` to act as a directory path; a trailing `/` is not automatically added.
- See [template syntax][5] if you want to route logs to different object keys based on specific fields in your logs.
- **Note**: Datadog recommends that you start your prefixes with the directory name and without a lead slash (`/`). For example, `app-logs/` or `service-logs/`.

#### Optional settings

##### AWS authentication

Select an AWS authentication option. If you select Assume role:
1. Enter the ARN of the IAM role you want to assume.
1. (Optional) Enter the assumed role session name and external ID.

### Set the environment variables

- Amazon S3 SQS URL:
    - The URL of the SQS queue to which the S3 bucket sends the notification events.
    -Stored in the environment variable: `DD_OP_SOURCE_AWS_S3_SQS_URL`

- AWS_CONFIG_FILE path:
    - The path to the AWS configuration file local to this node.
    - Stored in the environment variable `AWS_CONFIG_FILE`.

- AWS_PROFILE name:
    - The name of the profile to use within these files.
    - Stored in the environment variable `AWS_PROFILE`.

- AWS S3 TLS passphrase (when enabled):
    - Stored in the environment variable `DD_OP_SOURCE_AWS_S3_KEY_PASS`.

## AWS authentication

The Observability Pipelines Worker uses the standard AWS credential provider chain for authentication. See [AWS SDKs and Tools standardized credential providers][6] for more information.

### Permissions

For Observability Pipelines to collect logs from Amazon S3, the following policy permissions are required:

- `s3:GetObject`
- `sqs:ReceiveMessage`
- `sqs:DeleteMessage`

[1]: /observability_pipelines/rehydration/#how-rehydration-works
[2]: /observability_pipelines/configuration/set_up_pipelines/?tab=rehydration#set-up-a-pipeline-in-the-ui
[3]: /observability_pipelines/configuration/set_up_pipelines/?tab=logs#set-up-a-pipeline-with-the-api
[4]: /observability_pipelines/configuration/set_up_pipelines/?tab=logs#set-up-a-pipeline-with-terraform
[5]: /observability_pipelines/destinations/#template-syntax
[6]: https://docs.aws.amazon.com/sdkref/latest/guide/standardized-credentials.html
