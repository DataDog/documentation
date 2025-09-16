---
title: Send Azure Logs to Datadog from a Blob Storage account
further_reading:
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "/logs/guide/reduce_data_transfer_fees"
  tag: "Guide"
  text: "How to send logs to Datadog while reducing data transfer fees"
---

## Overview

Use this guide to set up log forwarding from an Azure Blob Storage account to any Datadog site.

**Note**: To collect logs from Azure Log Analytics workspaces, use the [automated ARM template][1] or [Azure Event Hub][18] process.

<div class="alert alert-info">
Starting April 30, 2025, Azure no longer supports Node.js 18. To ensure compatibility, update using the Azure Resource Manager (ARM) template with the same parameters.
</div>

## Setup

1. If you haven't already set up [Azure Blob Storage][5], use one of the following methods to get started:
   - [Azure portal][6]
   - [Azure Storage Explorer][7]
   - [Azure CLI][8]
   - [PowerShell][9]
2. Set up the Datadog-Azure Function to forward logs from Blob Storage using the instructions below.
3. Configure your Azure App Services to [forward their logs to Blob Storage][10].

##### Create a function app

If you already have a function app configured for this purpose, skip to [Add a new function to your Function App using the Event Hub trigger template](#add-a-new-function-to-your-function-app-using-the-azure-blob-storage-trigger-template).

1. In the Azure portal, navigate to the [Function App overview][11] and click **Create**.
2. In the **Instance Details** section, configure the following settings:
  a. Select the **Code** radio button
  b. For **Runtime stack**, select `Node.js`
  c. For **Version**, select `18 LTS`.
  d. For **Operating System**, select `Windows`.
3. Configure other settings as desired.
4. Click **Review + create** to validate the resource. If validation is successful, click **Create**.

##### Add a new function to your Function App using the Azure Blob Storage trigger template

1. Select your new or existing function app from the [Function App overview][11].
2. Under the **Functions** tab, click **Create**.
3. For the **Development environment** field, select **Develop in portal**.
4. Under **Select a template**, choose [Azure Blob storage trigger][12].
5. Select your **Storage account connection**.
   **Note**: See [Configure a connection string for an Azure storage account][13] for more information.
6. Click **Create**.

See [Getting started with Azure Functions][14] for more information.

##### Point your Blob Storage trigger to Datadog

1. On the detail page of your Event Hub trigger function, click **Code + Test** under the **Developer** side menu.
2. Add the [Datadog-Azure Function code][15] to the function's `index.js` file.
3. Add your Datadog API key with a `DD_API_KEY` environment variable, or copy it into the function code by replacing `<DATADOG_API_KEY>` on line 20.
4. If you're not using the Datadog US1 site, set your [Datadog site][16] with a `DD_SITE` environment variable under the configuration tab of your function app, or copy the site parameter into the function code on line 21.
5. **Save** the function.
6. Click **Integration** under the **Developer** side menu.
7. Click **Azure Blob Storage** under **Trigger and inputs**.
8. Set the **Blob Parameter Name** to `blobContent` and click **Save**.
9. Verify your setup is correct by checking the [Datadog Log Explorer][17] for logs from this resource.

{{% azure-log-archiving %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /logs/guide/azure-automated-log-forwarding/
[2]: https://learn.microsoft.com/en-us/azure/azure-monitor/fundamentals/data-sources
[3]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/overview
[4]: /logs/guide/azure-native-logging-guide/
[5]: https://azure.microsoft.com/en-us/services/storage/blobs/
[6]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal
[7]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-storage-explorer
[8]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-cli
[9]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-powershell
[10]: https://learn.microsoft.com/en-us/training/modules/store-app-data-with-azure-blob-storage/
[11]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[12]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-blob-trigger?tabs=python-v2%2Cisolated-process%2Cnodejs-v4%2Cextensionv5&pivots=programming-language-csharp
[13]: https://learn.microsoft.com/en-us/azure/storage/common/storage-configure-connection-string#configure-a-connection-string-for-an-azure-storage-account
[14]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-get-started
[15]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[16]: https://docs.datadoghq.com/getting_started/site/
[17]: https://app.datadoghq.com/logs
[18]: /logs/guide/azure-event-hub-log-forwarding/
