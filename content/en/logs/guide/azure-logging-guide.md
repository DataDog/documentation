---
title: Send Azure Logs to Datadog
further_reading:
- link: "https://www.datadoghq.com/blog/azure-log-forwarding/"
  tag: "Blog"
  text: "Send Azure logs to Datadog faster and more easily with automated log forwarding"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "/logs/guide/reduce_data_transfer_fees"
  tag: "Guide"
  text: "How to send logs to Datadog while reducing data transfer fees"
- link: "https://github.com/Azure-Samples/terraform-azure-datadog-log-forwarder"
  tag: "External Site"
  text: "Terraform Azure Datadog Log Forwarder"
---

## Overview

Use this guide to set up logging from your Azure subscriptions to any Datadog site.

Datadog recommends using the Agent or DaemonSet to send logs from Azure. If direct streaming isn't possible, you can use an Azure Resource Manager (ARM) template to [automate log forwarding setup][9] across your Azure environment with no manual configuration. This feature automatically manages and scales log forwarding services.

Alternatively, you can manually set up a log forwarding pipeline using an Azure Event Hub to collect [Azure logs][2]. For resources that cannot stream to an Event Hub, you can use the Blob Storage forwarding option. To collect logs from Azure Log Analytics workspaces, use the automated ARM template or Azure Event Hub process.

**US3**: Organizations on the Datadog US3 site can simplify Azure log forwarding using the Azure Native integration. This method is recommended and is configured through the [Datadog resource in Azure][5], replacing the Azure Event Hub process. See the [Azure Native Logging Guide][4] for more details.

<div class="alert alert-info">
Starting April 30, 2025, Azure no longer supports Node.js 18. To ensure compatibility, update using the Azure Resource Manager (ARM) template with the same parameters.
</div>

## Setup

{{< tabs >}}

{{% tab "Automated" %}}

1. Open the [Automated Log Forwarding ARM template][201] in Azure.
2. Configure your Azure project and instance details on the [Basics tab][202].
3. Enter your Datadog credentials on the [Datadog Configuration tab][203].
4. Acknowledge deployment warnings on the [Deployment tab][204].
5. Start the deployment process on the [Review + create tab][205].

See [Azure Automated Log Forwarding Architecture and Configuration][206] for more details.

[201]: https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fddazurelfo.blob.core.windows.net%2Ftemplates%2Fazuredeploy.json/createUIDefinitionUri/https%3A%2F%2Fddazurelfo.blob.core.windows.net%2Ftemplates%2FcreateUiDefinition.json
[202]: /logs/guide/azure-automated-log-forwarding/#basics
[203]: /logs/guide/azure-automated-log-forwarding/#datadog-configuration
[204]: /logs/guide/azure-automated-log-forwarding/#deployment
[205]: /logs/guide/azure-automated-log-forwarding/#review--create
[206]: /logs/guide/azure-automated-logs-architecture/
{{% /tab %}}

{{% tab "Event Hub" %}}

To get started, click the button below and fill in the form on Azure Portal. The Azure resources required to get activity logs streaming into your Datadog account will be deployed for you. To forward Activity Logs, set the **Send Activity Logs** option to true.

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdatadog-serverless-functions%2Frefs%2Fheads%2Fmaster%2Fazure%2Feventhub_log_forwarder%2Fparent_template.json)

### Azure platform logs

After the template deployment finishes, set up diagnostic settings for each log source to send Azure platform logs (including resource logs) to the Event Hub created during deployment.

**Note**: Resources can only stream to Event Hubs in the same Azure region.

If you run into any problems during deployment, see [Automated log collection][100] for common error cases.


[100]: /integrations/guide/azure-troubleshooting/#automated-log-collection

{{% /tab %}}

{{% tab "Blob Storage" %}}

Datadog recommends using the Event Hub setup for Azure log collection. However, you can also follow the steps in this section to forward all of your Azure App Services logs from Azure Blob Storage:

1. If you haven't already set up [Azure Blob Storage][301], use one of the following methods to get started:
   - [Azure portal][302]
   - [Azure Storage Explorer][303]
   - [Azure CLI][304]
   - [PowerShell][305]
2. Set up the Datadog-Azure Function to forward logs from Blob Storage using the instructions below.
3. Configure your Azure App Services to [forward their logs to Blob Storage][306].

##### Create a function app

If you already have a function app configured for this purpose, skip to [Add a new function to your Function App using the Event Hub trigger template](#add-a-new-function-to-your-function-app-using-the-azure-blob-storage-trigger-template).

1. In the Azure portal, navigate to the [Function App overview][309] and click **Create**.
2. In the **Instance Details** section, configure the following settings:
  a. Select the **Code** radio button
  b. For **Runtime stack**, select `Node.js`
  c. For **Version**, select `18 LTS`.
  d. For **Operating System**, select `Windows`.
3. Configure other settings as desired.
4. Click **Review + create** to validate the resource. If validation is successful, click **Create**.

##### Add a new function to your Function App using the Azure Blob Storage trigger template

1. Select your new or existing function app from the [Function App overview][309].
2. Under the **Functions** tab, click **Create**.
3. For the **Development environment** field, select **Develop in portal**.
4. Under **Select a template**, choose [Azure Blob storage trigger][313].
5. Select your **Storage account connection**.
   **Note**: See [Configure a connection string for an Azure storage account][311] for more information.
6. Click **Create**.

See [Getting started with Azure Functions][307] for more information.

##### Point your Blob Storage trigger to Datadog

1. On the detail page of your Event Hub trigger function, click **Code + Test** under the **Developer** side menu.
2. Add the [Datadog-Azure Function code][308] to the function's `index.js` file.
3. Add your Datadog API key with a `DD_API_KEY` environment variable, or copy it into the function code by replacing `<DATADOG_API_KEY>` on line 20.
4. If you're not using the Datadog US1 site, set your [Datadog site][312] with a `DD_SITE` environment variable under the configuration tab of your function app, or copy the site parameter into the function code on line 21.
5. **Save** the function.
6. Click **Integration** under the **Developer** side menu.
7. Click **Azure Blob Storage** under **Trigger and inputs**.
8. Set the **Blob Parameter Name** to `blobContent` and click **Save**.
9. Verify your setup is correct by checking the [Datadog Log Explorer][310] for logs from this resource.

[301]: https://azure.microsoft.com/en-us/services/storage/blobs/
[302]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal
[303]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-storage-explorer
[304]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-cli
[305]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-powershell
[306]: https://learn.microsoft.com/en-us/training/modules/store-app-data-with-azure-blob-storage/
[307]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-get-started
[308]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[309]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[310]: https://app.datadoghq.com/logs
[311]: https://learn.microsoft.com/en-us/azure/storage/common/storage-configure-connection-string#configure-a-connection-string-for-an-azure-storage-account
[312]: https://docs.datadoghq.com/getting_started/site/
[313]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-blob-trigger?tabs=python-v2%2Cisolated-process%2Cnodejs-v4%2Cextensionv5&pivots=programming-language-csharp

{{% /tab %}}
{{< /tabs >}}

## Log Archiving

Archiving logs to Azure Blob Storage requires an App Registration even if you are using the Azure Native integration. To archive logs to Azure Blob Storage, follow the [automatic][7] or [manual][8] setup instructions to configure the integration using an App Registration. App Registrations created for archiving purposes do not need the `Monitoring Reader` role assigned.

After configuring an App Registration, you can [create a log archive][3] that writes to Azure Blob Storage.

**Note**: If your storage bucket is in a subscription being monitored through the Azure Native integration, a warning is displayed in the Azure Integration Tile about the App Registration being redundant. You can ignore this warning.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site/
[2]: https://learn.microsoft.com/en-us/azure/azure-monitor/fundamentals/data-sources
[3]: /logs/log_configuration/archives/?tab=azurestorage#configure-an-archive
[4]: /logs/guide/azure-native-logging-guide/
[5]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/overview
[7]: /integrations/guide/azure-programmatic-management/#datadog-azure-integration
[8]: /integrations/guide/azure-manual-setup/#setup
[9]: /logs/guide/azure-automated-log-forwarding/
