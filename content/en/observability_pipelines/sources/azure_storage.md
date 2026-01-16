---
title: Azure Storage
description: Learn how to set up the Azure Storage source.
disable_toc: false
products:
- name: Rehydration
  icon: archive-wui
  url: /observability_pipelines/configuration/?tab=rehydration#pipeline-types
---

{{< product-availability >}}

{{< callout url="https://www.datadoghq.com/product-preview/rehydration-for-observability-pipelines/"
 btn_hidden="false">}}
Rehydration is in Preview. Fill out the form to request access.
{{< /callout >}}

## Overview

Use the Amazon S3 Rehydration source to pull archived logs from Azure Blob Storage and process them in Observability Pipelines. This is only available for the [Rehydration][1] pipeline.

## When to use this source

Common scenarios when you might use this source:

- You want to retrieve archived logs on demand
- You want to process historical logs with Observability Pipelines
- You want to route rehydrated data to different destinations

See the [How Rehydration works][2] documentation for more details.

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline in the UI][3]. You can also set up a pipeline using the [API][4] or [Terraform][5]. The information below is for the source settings in the pipeline UI.

1. Select the time frame for rehydrating your logs.
1. Enter the name of the Azure container from which you want to rehydrate logs.

#### Optional settings

Enter a key prefix to apply to all object keys.

- Prefixes are useful for partitioning objects. For example, you can use a prefix as an object key to store objects under a particular directory. If using a prefix for this purpose, it must end in `/` to act as a directory path; a trailing `/` is not automatically added.
- See [template syntax][6] if you want to route logs to different object keys based on specific fields in your logs.
- **Note**: Datadog recommends that you start your prefixes with the directory name and without a lead slash (`/`). For example, `app-logs/` or `service-logs/`.

### Set the environment variables

- Azure connections string to give the Worker access to your Azure Storage bucket.
- Stored in the environment variable `DD_OP_DESTINATION_DATADOG_ARCHIVES_AZURE_BLOB_CONNECTION_STRING`.

To get the connection string:

1. Navigate to [Azure Storage accounts][7].
2. Click Access keys under Security and networking in the left navigation menu.
3. Copy the connection string for the storage account and paste it into the Azure connection string field on the Observability Pipelines Worker installation page.

[1]: /observability_pipelines/rehydration/
[2]: /observability_pipelines/rehydration/#how-rehydration-works
[3]: /observability_pipelines/configuration/set_up_pipelines/?tab=rehydration#set-up-a-pipeline-in-the-ui
[4]: /observability_pipelines/configuration/set_up_pipelines/?tab=logs#set-up-a-pipeline-with-the-api
[5]: /observability_pipelines/configuration/set_up_pipelines/?tab=logs#set-up-a-pipeline-with-terraform
[6]: /observability_pipelines/destinations/#template-syntax
[7]: https://portal.azure.com/#browse/Microsoft.Storage%2FStorageAccounts
