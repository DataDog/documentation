---
title: Azure Storage Destination
disable_toc: false
---

The Azure Storage destination is available for the [Archive Logs template][1]. Use this destination to send your logs in Datadog-rehydratable format to an Azure Storage bucket for archiving. You need to set up [Datadog Log Archives][2] if you haven't already, and then set up the destination in the pipeline UI.

## Configure Log Archives

If you already have a Datadog Log Archive configured for Observability Pipelines, skip to [Set up the destination for your pipeline](#set-up-the-destination-for-your-pipeline).

You need to have Datadog's [Google Cloud Platform integration][3] installed to set up Datadog Log Archives.

{{% observability_pipelines/configure_log_archive/azure_storage/instructions %}}

## Set up the destination for your pipeline

Set up the Amazon S3 destination and its environment variables when you [set up an Archive Logs pipeline][1]. The information below is configured in the pipelines UI.

{{% observability_pipelines/destination_settings/datadog_archives_azure_storage %}}

### Set the environment variables

{{% observability_pipelines/destination_env_vars/datadog_archives_azure_storage %}}

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][4] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------| ----------------| --------------------|
| None           | 100,000,000     | 900                 |

[1]: /observability_pipelines/archive_logs/
[2]: /logs/log_configuration/archives/
[3]: /integrations/google_cloud_platform/#setup
[4]: /observability_pipelines/destinations/#event-batching