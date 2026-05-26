---
title: Azure Storage Destination
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

{{% observability_pipelines/configure_log_archive/azure_storage/instructions %}}

## Set up the destination for your pipeline

Configure the Azure Storage destination when you [set up a pipeline][4]. You can set up a pipeline in the [UI][7], using the [API][8], or with [Terraform][9]. The steps in this section are configured in the UI.

After you select the Azure Storage destination in the pipeline UI:

1. Enter the identifier for your Azure connection string. If you leave it blank, the [default](#secret-defaults) is used.
    - **Note**: Only enter the identifier for the connection string. Do **not** enter the actual connection string.
1. Enter the name of the Azure container you created earlier.

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

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][5] for more information.

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