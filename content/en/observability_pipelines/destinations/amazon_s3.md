---
title: Amazon S3 Destination
description: Learn how to configure the Amazon S3 destination.
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use the Amazon S3 destination to send logs in JSON or Parquet format to Amazon S3. For Parquet, the Observability Pipelines Worker automatically generates a Parquet schema based on the batch file the events are being written to, which means the schema can vary between batches.

You can also [route logs to Snowflake using the Amazon S3 destination](#route-logs-to-snowflake-using-the-datadog-archives-destination).

**Note**: If you want to send logs to a S3 bucket and be able to [rehydrate][1] them to Datadog, use the [Datadog Archives][2] destination.

## Set up an Amazon S3 bucket

{{% observability_pipelines/configure_log_archive/amazon_s3/instructions %}}

{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/docker %}}

{{% /tab %}}
{{% tab "Amazon EKS" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/amazon_eks %}}

{{% /tab %}}
{{% tab "Linux (APT)" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/linux_apt %}}

{{% /tab %}}
{{% tab "Linux (RPM)" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/linux_rpm %}}

{{% /tab %}}
{{< /tabs >}}

## Set up the destination for your pipeline

Set up the Amazon S3 destination and its environment variables when you create a pipeline. The information below is configured in the pipelines UI.

1. Enter your S3 bucket name. If you configured Log Archives, it's the name of the bucket you created earlier.
1. Enter the AWS region the S3 bucket is in.
1. (Optional) Enter the key prefix.
    - Prefixes are useful for partitioning objects. For example, you can use a prefix as an object key to store objects under a particular directory. If using a prefix for this purpose, it must end in `/` to act as a directory path; a trailing `/` is not automatically added.
      - See [template syntax][8] if you want to route logs to different object keys based on specific fields in your logs.
      - **Note**: Datadog recommends that you start your prefixes with the directory name and without a lead slash (`/`). For example, `app-logs/` or `service-logs/`.
1. Select the storage class for your S3 bucket in the **Storage Class** dropdown menu.
1. Select the encoding you want to use in the **Encoding** dropdown menu (**JSON** or **Parquet**).
    - **Note**: For **Parquet**, the Observability Pipelines Worker automatically generates a Parquet schema based on the batch file the events are being written to, which means the schema can vary between batches.
1. Select a compression algorithm in the **Compression - Algorithm** dropdown menu. **Note**: Datadog recommends using `snappy` or a low-compression level if you choose `zstd`.

### Optional settings

1. Enter a maximum batching size and select the unit (**MB** or **GB**) in the dropdown menu. If not configured, the default is `100` MB.
1. Enter a batching timeout in seconds. If not configured, the default is `900` seconds.

#### AWS authentication

Select an AWS authentication option. If you are only using the [user or role you created earlier](#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket) for authentication, do not select **Assume role**. The **Assume role** option should only be used if the user or role you created earlier needs to assume a different role to access the specific AWS resource and that permission has to be explicitly defined.<br>If you select **Assume role**:
1. Enter the ARN of the IAM role you want to assume.
    - **Note:** The [user or role you created earlier](#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket) must have permission to assume this role so that the Worker can authenticate with AWS.
1. (Optional) Enter the assumed role session name and external ID.

#### Buffering options

{{% observability_pipelines/destination_buffer %}}

### Set secrets

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

There are no secret identifiers to configure.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/destination_env_vars/datadog_archives_amazon_s3 %}}

{{% /tab %}}
{{< /tabs >}}

## Route logs to Snowflake using the Amazon S3 destination

You can route logs from Observability Pipelines to Snowflake using the Amazon S3 destination by configuring Snowpipe in Snowflake to automatically ingest those logs. To set this up:
1. [Set up a pipeline][5] to use Amazon S3 as the log destination. When logs are collected by Observability Pipelines, they are written to an S3 bucket using the same configuration detailed in [Set up the destination for your pipeline](#set-up-the-destination-for-your-pipeline), which includes AWS authentication, region settings, and permissions.
1. Set up Snowpipe in Snowflake. See [Automating Snowpipe for Amazon S3][6] for instructions. Snowpipe continuously monitors your S3 bucket for new files and automatically ingests them into your Snowflake tables, ensuring near real-time data availability for analytics or further processing.

## How the destination works

### AWS Authentication

{{% observability_pipelines/aws_authentication/instructions %}}

#### Permissions

To send logs to Amazon S3, the Observability Pipelines Worker requires the following policy permissions:

- `s3:GetObject`

### Automatically generated Parquet schema

The Observability Pipelines Worker collects a batch of events, generates a schema for those events, and then flushes the batch to S3. The schema can vary between batches because the schema is based on the current batch of events only.

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][7] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------| ----------------| --------------------|
| None           | 100,000,000     | 900                 |

[1]: /logs/log_configuration/rehydrating/
[2]: /observability_pipelines/destinations/datadog_archives/
[3]: /integrations/amazon_web_services/#setup
[4]: /observability_pipelines/configuration/explore_templates/?tab=logs#archive-logs
[5]: /observability_pipelines/configuration/set_up_pipelines/
[6]: https://docs.snowflake.com/en/user-guide/data-load-snowpipe-auto-s3
[7]: /observability_pipelines/destinations/#event-batching
[8]: /observability_pipelines/destinations/#template-syntax
[9]: /logs/log_configuration/archives/?tab=awss3#storage-class
[10]: https://aws.amazon.com/s3/storage-classes/intelligent-tiering/
