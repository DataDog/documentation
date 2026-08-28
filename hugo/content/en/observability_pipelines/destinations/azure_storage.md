---
title: Azure Storage Destination
description: Learn how to send logs to an Azure Storage bucket, optionally for archiving and rehydration in Datadog.
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use the Azure Storage destination to send logs to an Azure Storage bucket. If you want to send logs to Azure Storage for [archiving][1] and [rehydration][2], you must [configure Log Archives](#configure-log-archives). If you don't want to rehydrate logs in Datadog, skip to [Set up the destination for your pipeline](#set-up-the-destination-for-your-pipeline).

## Configure Log Archives

This step is only required if you want to send logs to Azure Storage in Datadog-rehydratable format for [archiving][1] and [rehydration][2], and you don't already have a Datadog Log Archive configured for Observability Pipelines. If you already have a Datadog Log Archive configured or don't want to rehydrate logs in Datadog, skip to [Set up the destination for your pipeline](#set-up-the-destination-for-your-pipeline).

You need to have Datadog's [Azure integration][3] installed to set up Datadog Log Archives.

#### Create a storage account

Create an [Azure storage account][13] if you don't already have one.

1. Navigate to [Storage accounts][14].
1. Click **Create**.
1. Select the subscription name and resource name you want to use.
1. Enter a name for your storage account.
1. Select a region in the dropdown menu.
1. Select  **Standard** performance or **Premium** account type.
1. Click **Next**.
1. In the **Blob storage** section, select **Hot** or **Cool** storage.
1. Click **Review + create**.

#### Create a storage bucket

1. In your storage account, click **Containers** under **Data storage** in the left navigation menu.
1. Click **+ Container** at the top to create a container.
1. Enter a name for the new container. This name is used later when you set up the Observability Pipelines Azure Storage destination.

**Note**: Do not set [immutability policies][15] because the most recent data might need to be rewritten in rare cases (typically when there is a timeout).

#### Connect the Azure container to Datadog Log Archives

1. Navigate to Datadog [Log Forwarding][16].
1. Click **New archive**.
1. Enter a descriptive archive name.
1. Add a query that filters out all logs going through log pipelines so that none of those logs go into this archive. For example, add the query `observability_pipelines_read_only_archive`, assuming no logs going through the pipeline have that tag added.
1. Select **Azure Storage**.
1. Select the Azure tenant and client your storage account is in.
1. Enter the name of the storage account.
1. Enter the name of the container you created earlier.
1. Optionally, enter a path.
1. Optionally, set permissions, add tags, and define the maximum scan size for rehydration. See [Advanced settings][17] for more information.
1. Click **Save**.

See the [Log Archives documentation][1] for additional information.

## Set up the destination for your pipeline

<div class="alert alert-danger">For Secrets Management: Only enter the identifier for the Azure connection string. Do <b>not</b> enter the actual value.</div>

Configure the Azure Storage destination when you [set up a pipeline][4]. You can set up a pipeline in the [UI][7], using the [API][8], or with [Terraform][9]. The steps in this section are configured in the UI.

After you select the Azure Storage destination in the pipeline UI:

1. Enter the identifier for your Azure connection string. If you leave it blank, the [default](#secret-defaults) is used.
1. Enter the name of the Azure container you created earlier.

{{% observability_pipelines/secrets_env_var_note %}}

### Optional settings

#### Prefix to apply to all key objects

Enter a prefix that you want to apply to all key objects.

- Prefixes are useful for partitioning objects. For example, you can use a prefix as an object key to store objects under a particular directory. If using a prefix for this purpose, it must end in `/` to act as a directory path; a trailing `/` is not automatically added.
- See [template syntax][6] if you want to route logs to different object keys based on specific fields in your logs.
	- **Note**: Datadog recommends that you start your prefixes with the directory name and without a lead slash (`/`). For example, `app-logs/` or `service-logs/`.

#### Buffering

{{% observability_pipelines/destination_buffer %}}

## Secret defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Azure connection string identifier:
	- References the connection string that gives the Worker access to your Azure Storage bucket.
	- The default identifier is `DESTINATION_DATADOG_ARCHIVES_AZURE_BLOB_CONNECTION_STRING`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_azure_storage %}}

{{% /tab %}}
{{< /tabs >}}

## Health metrics

See [Component metrics][10] and [Destination buffer metrics][11] for more information on metrics emitted by all destinations. To filter or group by Azure Storage destination metrics, use the tag `component_type:datadog_archives_azure_blob`.

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [Destinations event batching][5] for more information.

| Maximum Events | Maximum Size (MB) | Timeout (seconds)   |
|----------------|-------------------|---------------------|
| None           | 100               | 900                 |

[1]: /logs/log_configuration/archives/
[2]: /logs/log_configuration/rehydrating/
[3]: /integrations/azure/#setup
[4]: /observability_pipelines/configuration/set_up_pipelines/
[5]: /observability_pipelines/destinations/#event-batching
[6]: /observability_pipelines/destinations/#template-syntax
[7]: https://app.datadoghq.com/observability-pipelines
[8]: /api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[10]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[11]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[13]: https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[14]: https://portal.azure.com/#browse/Microsoft.Storage%2FStorageAccounts
[15]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
[16]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[17]: /logs/log_configuration/archives/?tab=awss3#advanced-settings
