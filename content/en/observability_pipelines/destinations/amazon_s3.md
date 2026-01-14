---
title: Amazon S3 Destination
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- name: Rehydration
  icon: archive-wui
  url: /observability_pipelines/rehydration/
---

{{< product-availability >}}

Use the Amazon S3 destination to send logs to Amazon S3. If you want to send logs to Amazon S3 for [archiving][1] and [rehydration][2], you must [configure Log Archives](#configure-log-archives). If you don't want to rehydrate your logs in Datadog, skip to [Set up the destination for your pipeline](#set-up-the-destination-for-your-pipeline).

You can also [route logs to Snowflake using the Amazon S3 destination](#route-logs-to-snowflake-using-the-amazon-s3-destination).

## Configure Log Archives

This step is only required if you want to send logs to Amazon S3 for [archiving][1] and [rehydration][2], and you don't already have a Datadog Log Archive configured for Observability Pipelines. If you already have a Datadog Log Archive configured or don't want to rehydrate logs in Datadog, skip to [Set up the destination for your pipeline](#set-up-the-destination-for-your-pipeline).

You need to have Datadog's [AWS integration][3] installed to set up Datadog Log Archives.

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

{{% observability_pipelines/configure_log_archive/amazon_s3/connect_s3_to_datadog_log_archives %}}

## Set up the destination for your pipeline

Set up the Amazon S3 destination and its environment variables when you [set up an Archive Logs pipeline][4]. The information below is configured in the pipelines UI.

1. Enter your S3 bucket name. If you configured Log Archives, it's the name of the bucket you created earlier.
1. Enter the AWS region the S3 bucket is in.
1. Enter the key prefix.
    - Prefixes are useful for partitioning objects. For example, you can use a prefix as an object key to store objects under a particular directory. If using a prefix for this purpose, it must end in `/` to act as a directory path; a trailing `/` is not automatically added.
    - See [template syntax][8] if you want to route logs to different object keys based on specific fields in your logs.
     - **Note**: Datadog recommends that you start your prefixes with the directory name and without a lead slash (`/`). For example, `app-logs/` or `service-logs/`.
1. Select the storage class for your S3 bucket in the **Storage Class** dropdown menu. If you are going to archive and rehydrate your logs:
    - **Note**: Rehydration only supports the following [storage classes][9]:
        - Standard
        - Intelligent-Tiering, only if [the optional asynchronous archive access tiers][10] are both disabled.
        - Standard-IA
        - One Zone-IA
    - If you wish to rehydrate from archives in another storage class, you must first move them to one of the supported storage classes above.
    - See the [Example destination and log archive setup](#example-destination-and-log-archive-setup) section of this page for how to configure your Log Archive based on your Amazon S3 destination setup.
1. Optionally, select an AWS authentication option. If you are only using the [user or role you created earlier](#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket) for authentication, do not select **Assume role**. The **Assume role** option should only be used if the user or role you created earlier needs to assume a different role to access the specific AWS resource and that permission has to be explicitly defined.<br>If you select **Assume role**:
    1. Enter the ARN of the IAM role you want to assume.
    1. Optionally, enter the assumed role session name and external ID.
    - **Note:** The [user or role you created earlier](#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket) must have permission to assume this role so that the Worker can authenticate with AWS.
1. Optionally, toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
	- If left disabled, the maximum size for buffering is 500 events.
	- If enabled:
		1. Select the buffer type you want to set (**Memory** or **Disk**).
		1. Enter the buffer size and select the unit.

#### Example destination and log archive setup

If you enter the following values for your Amazon S3 destination:
- S3 Bucket Name: `test-op-bucket`
- Prefix to apply to all object keys: `op-logs`
- Storage class for the created objects: `Standard`

{{< img src="observability_pipelines/setup/amazon_s3_destination.png" alt="The Amazon S3 destination setup with the example values" style="width:40%;" >}}

Then these are the values you enter for configuring the S3 bucket for Log Archives:

- S3 bucket: `test-op-bucket`
- Path: `op-logs`
- Storage class: `Standard`

{{< img src="observability_pipelines/setup/amazon_s3_archive.png" alt="The log archive configuration with the example values" style="width:70%;" >}}

### Set the environment variables

{{% observability_pipelines/destination_env_vars/datadog_archives_amazon_s3 %}}

## Route logs to Snowflake using the Amazon S3 destination

You can route logs from Observability Pipelines to Snowflake using the Amazon S3 destination by configuring Snowpipe in Snowflake to automatically ingest those logs. To set this up:
1. Configure [Log Archives](#configure-log-archives) if you want to [archive][1] and [rehydrate][2] your logs. If you only want to send logs to Amazon S3, skip to step 2.
1. [Set up a pipeline][5] to use Amazon S3 as the log destination. When logs are collected by Observability Pipelines, they are written to an S3 bucket using the same configuration detailed in [Set up the destination for your pipeline](#set-up-the-destination-for-your-pipeline), which includes AWS authentication, region settings, and permissions.
1. Set up Snowpipe in Snowflake. See [Automating Snowpipe for Amazon S3][6] for instructions. Snowpipe continuously monitors your S3 bucket for new files and automatically ingests them into your Snowflake tables, ensuring near real-time data availability for analytics or further processing.

## How the destination works

### AWS Authentication

{{% observability_pipelines/aws_authentication/instructions %}}

#### Permissions

{{% observability_pipelines/aws_authentication/amazon_security_lake/permissions %}}

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][7] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------| ----------------| --------------------|
| None           | 100,000,000     | 900                 |

[1]: /logs/log_configuration/archives/
[2]: /logs/log_configuration/rehydrating/
[3]: /integrations/amazon_web_services/#setup
[4]: /observability_pipelines/configuration/explore_templates/?tab=logs#archive-logs
[5]: /observability_pipelines/configuration/set_up_pipelines/
[6]: https://docs.snowflake.com/en/user-guide/data-load-snowpipe-auto-s3
[7]: /observability_pipelines/destinations/#event-batching
[8]: /observability_pipelines/destinations/#template-syntax
[9]: /logs/log_configuration/archives/?tab=awss3#storage-class
[10]: https://aws.amazon.com/s3/storage-classes/intelligent-tiering/
