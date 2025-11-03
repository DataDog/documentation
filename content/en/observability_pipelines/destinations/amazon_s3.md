---
title: Amazon S3 Destination
disable_toc: false
---

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

{{% observability_pipelines/destination_settings/datadog_archives_amazon_s3 %}}

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
[4]: /observability_pipelines/archive_logs/
[5]: /observability_pipelines/configuration/set_up_pipelines/
[6]: https://docs.snowflake.com/en/user-guide/data-load-snowpipe-auto-s3
[7]: /observability_pipelines/destinations/#event-batching
