---
title: Azure Storage Destination
disable_toc: false
---

Use the Azure Storage destination to send logs to an Azure Storage bucket. If you want to send logs to Azure Storage for [archiving][1] and [rehydration][2], you must [configure Log Archives](#configure-log-archives). If you don't want to rehydrate logs in Datadog, skip to [Set up the destination for your pipeline](#set-up-the-destination-for-your-pipeline).

## Configure Log Archives

This step is only required if you want to send logs to Azure Storage in Datadog-rehydratable format for [archiving][1] and [rehydration][2], and you don't already have a Datadog Log Archive configured for Observability Pipelines. If you already have a Datadog Log Archive configured or don't want to rehydrate logs in Datadog, skip to [Set up the destination for your pipeline](#set-up-the-destination-for-your-pipeline).

You need to have Datadog's [Azure integration][3] installed to set up Datadog Log Archives.

{{% observability_pipelines/configure_log_archive/azure_storage/instructions %}}

## Set up the destination for your pipeline

Set up the Azure Storage destination and its environment variables when you [set up an Archive Logs pipeline][4]. The information below is configured in the pipelines UI.

{{% observability_pipelines/destination_settings/datadog_archives_azure_storage %}}

### Set the environment variables

{{% observability_pipelines/destination_env_vars/datadog_archives_azure_storage %}}

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][5] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------| ----------------| --------------------|
| None           | 100,000,000     | 900                 |

[1]: /logs/log_configuration/archives/
[2]: /logs/log_configuration/rehydrating/
[3]: /integrations/azure/#setup
[4]: /observability_pipelines/archive_logs/
[5]: /observability_pipelines/destinations/#event-batching