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

1. Enter the identifier for your Azure connection string.
    - **Note**: Only enter the identifier for the connection string. Do **not** enter the actual connection string.
    - If left blank, the default is used: `DESTINATION_DATADOG_ARCHIVES_AZURE_BLOB_CONNECTION_STRING`.
1. Enter the name of the Azure container you created earlier.

### Optional settings

#### Prefix to apply to all key objects

Enter a prefix that you want to apply to all key objects.

- Prefixes are useful for partitioning objects. For example, you can use a prefix as an object key to store objects under a particular directory. If using a prefix for this purpose, it must end in `/` to act as a directory path; a trailing `/` is not automatically added.
- See [template syntax][6] if you want to route logs to different object keys based on specific fields in your logs.
	- **Note**: Datadog recommends that you start your prefixes with the directory name and without a lead slash (`/`). For example, `app-logs/` or `service-logs/`.

#### Buffering options

Toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
- If left disabled, the maximum size for buffering is 500 events.
- If enabled:
	1. Select the buffer type you want to set (**Memory** or **Disk**).
	1. Enter the buffer size and select the unit.

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
[4]: /observability_pipelines/configuration/explore_templates/?tab=logs#archive-logs
[5]: /observability_pipelines/destinations/#event-batching
[6]: /observability_pipelines/destinations/#template-syntax