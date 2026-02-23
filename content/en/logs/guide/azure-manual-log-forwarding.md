---
title: Azure Manual Log Forwarding Setup
further_reading:
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "/logs/guide/reduce_data_transfer_fees"
  tag: "Guide"
  text: "How to send logs to Datadog while reducing data transfer fees"
---

## Overview

Use this guide to manually set up log forwarding from Azure to any Datadog site.

**Note**: To collect logs from Azure Log Analytics workspaces, use the [automated ARM template][1] or [Azure Container App][2] process.

<div class="alert alert-info">
Starting April 30, 2025, Azure no longer supports Node.js 18. To ensure compatibility, update using the Azure Resource Manager (ARM) template with the same parameters.
</div>

## Setup

You can forward your logs through an [Azure Container App][4], or [Azure Blob Storage][3] account.

{{< tabs >}}

{{% tab "Container App (recommended)" %}}

1. Click the button below, and fill in the form on the Azure Portal. Datadog automatically deploys the Azure resources required to forward logs into your Datadog account.

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)][200]

2. After the template deployment finishes, set up [diagnostic settings][201] for each log source to send Azure platform logs (including resource logs) to the Storage Account created during deployment.

**Note**: Resources can only stream to a Storage Account in the same Azure region.

[200]: https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fddazurelfo.blob.core.windows.net%2Ftemplates%2Fforwarder.json
[201]: https://learn.microsoft.com/azure/azure-monitor/platform/diagnostic-settings
{{% /tab %}}

{{% tab "Blob Storage" %}}

1. If you haven't already set up [Azure Blob Storage][100], use one of the following methods to get started:
   - [Azure portal][101]
   - [Azure Storage Explorer][102]
   - [Azure CLI][103]
   - [PowerShell][104]
2. Set up the Datadog-Azure Function to forward logs from Blob Storage using the instructions below.
3. Configure your Azure App Services to [forward their logs to Blob Storage][105].

##### Create a function app

If you already have a function app configured for this purpose, skip to [Add a new function to your Function App using the Event Hub trigger template](#add-a-new-function-to-your-function-app-using-the-azure-blob-storage-trigger-template).

1. In the Azure portal, navigate to the [Function App overview][106] and click **Create**.
2. In the **Instance Details** section, configure the following settings:
   1. Select the **Code** radio button.
   1. For **Runtime stack**, select `Node.js`.
   1. For **Version**, select `18 LTS`.
   1. For **Operating System**, select `Windows`.
3. Configure other settings as desired.
4. Click **Review + create** to validate the resource. If validation is successful, click **Create**.

##### Add a new function to your Function App using the Azure Blob Storage trigger template

1. Select your new or existing function app from the [Function App overview][106].
2. Under the **Functions** tab, click **Create**.
3. For the **Development environment** field, select **Develop in portal**.
4. Under **Select a template**, choose [Azure Blob storage trigger][107].
5. Select your **Storage account connection**.
   **Note**: See [Configure a connection string for an Azure storage account][108] for more information.
6. Click **Create**.

See [Getting started with Azure Functions][109] for more information.

##### Point your Blob Storage trigger to Datadog

1. On the detail page of your Event Hub trigger function, click **Code + Test** under the **Developer** side menu.
2. Add the [Datadog-Azure Function code][110] to the function's `index.js` file.
3. Add your Datadog API key with a `DD_API_KEY` environment variable, or copy it into the function code by replacing `<DATADOG_API_KEY>` on line 20.
4. If you're not using the Datadog US1 site, set your [Datadog site][111] with a `DD_SITE` environment variable under the configuration tab of your function app, or copy the site parameter into the function code on line 21.
5. **Save** the function.
6. Click **Integration** under the **Developer** side menu.
7. Click **Azure Blob Storage** under **Trigger and inputs**.
8. Set the **Blob Parameter Name** to `blobContent` and click **Save**.
9. Verify your setup is correct by checking the [Datadog Log Explorer][112] for logs from this resource.


[100]: https://learn.microsoft.com/azure/storage/blobs/
[101]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-portal
[102]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-storage-explorer
[103]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-cli
[104]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-powershell
[105]: https://learn.microsoft.com/training/modules/store-app-data-with-azure-blob-storage/
[106]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[107]: https://learn.microsoft.com/azure/azure-functions/functions-bindings-storage-blob-trigger?tabs=python-v2%2Cisolated-process%2Cnodejs-v4%2Cextensionv5&pivots=programming-language-csharp
[108]: https://learn.microsoft.com/azure/storage/common/storage-configure-connection-string#configure-a-connection-string-for-an-azure-storage-account
[109]: https://learn.microsoft.com/azure/azure-functions/functions-get-started
[110]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[111]: https://docs.datadoghq.com/getting_started/site/
[112]: https://app.datadoghq.com/logs
{{% /tab %}}

{{< /tabs >}}

{{% azure-log-archiving %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/guide/azure-automated-log-forwarding/
[2]: /getting_started/integrations/azure/#container-app-log-forwarding-setup
[3]: https://learn.microsoft.com/azure/storage/blobs/
[4]: https://learn.microsoft.com/azure/container-apps/
