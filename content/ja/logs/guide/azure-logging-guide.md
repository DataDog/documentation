---
title: Send Azure Logs to Datadog
kind: documentation
further_reading:
- link: /logs/explorer/
  tag: Documentation
  text: Learn how to explore your logs
---

## Overview

Use this guide to set up logging from your Azure subscriptions to Datadog.

Datadog recommends sending logs from Azure to Datadog with the Agent or DaemonSet. For some resources it may not be possible. In these cases, you can create a log forwarding pipeline using an Azure Event Hub to collect [Azure Platform Logs][2]. For resources that cannot stream Azure Platform Logs to an Event Hub, you can use the Blob Storage forwarding option.

**All sites**: All Datadog sites can use the steps on this page to send Azure logs to Datadog.

**US3**: If your organization is on the Datadog US3 site, you can use the Azure Native integration to simplify configuration for your Azure log forwarding. Datadog recommends using this method when possible. Configuration is done through the [Datadog resource in Azure][5]. This replaces the Azure Event Hub process for log forwarding. See the [Azure Native Logging Guide][4] for more information.

{{< tabs >}}

{{% tab "Automated Installation" %}}

To get started, click the button below and fill in the form on Azure Portal. The Azure resources required to get activity logs streaming into your Datadog account will be deployed for you.

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdatadog-serverless-functions%2Fmaster%2Fazure%2Fdeploy-to-azure%2Fparent_template.json)

Alternatively, Datadog provides automated scripts you can use for sending Azure activity logs and Azure platform logs (including resource logs).

### Azure activity logs

Follow these steps to run the script that creates and configures the Azure resources required to stream activity logs into your Datadog account. These resources include activity log diagnostic settings, Azure Functions, Event Hub namespaces, and Event Hubs.

1. In the Azure portal, navigate to your **Cloud Shell**.

{{< img src="integrations/azure/azure_cloud_shell.png" alt="azure cloud shell" popup="true" style="width:100%">}}

2. Run the command below to download the automation script into your Cloud Shell environment. 

{{< code-block lang="powershell" filename="Activity Logs Step 1" >}}

(New-Object System.Net.WebClient).DownloadFile("https://raw.githubusercontent.com/DataDog/datadog-serverless-functions/master/azure/eventhub_log_forwarder/activity_logs_deploy.ps1", "activity_logs_deploy.ps1")

{{< /code-block >}}

You can also [view the contents of the script](https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/eventhub_log_forwarder/activity_logs_deploy.ps1).

3. Invoke the script by running the command below, while replacing **`<API_KEY>`**, with your [Datadog API token](https://app.datadoghq.com/organization-settings/api-keys), and **`<SUBSCRIPTION_ID>`**, with your Azure Subscription ID. Add [Optional Parameters](#optional-parameters) to configure your deployment.

{{< code-block lang="powershell" filename="Activity Logs Step 2" >}}

./activity_logs_deploy.ps1 -ApiKey <API_KEY> -SubscriptionId <SUBSCRIPTION_ID> 

{{< /code-block >}}

### Azure platform logs

To send Azure platform logs (including resource logs), you can deploy an Event Hub and log forwarder function pair. 
After deploying, create diagnostic settings for each of the log sources to stream logs to Datadog.

1. In the Azure portal, navigate to your **Cloud Shell**.

2. Run the Powershell command below to download the automation script into your Cloud Shell environment. 

   {{< code-block lang="powershell" filename="Platform Logs Step 1" >}}

   (New-Object System.Net.WebClient).DownloadFile("https://raw.githubusercontent.com/DataDog/datadog-serverless-functions/master/azure/eventhub_log_forwarder/resource_deploy.ps1", "resource_deploy.ps1")

   {{< /code-block >}}

   You can also [view the contents of the script](https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/eventhub_log_forwarder/resource_deploy.ps1).

3. Invoke the script by running the Powershell command below, replacing **`<API_KEY>`**, with your [Datadog API token](https://app.datadoghq.com/organization-settings/api-keys), and **`<SUBSCRIPTION_ID>`**, with your Azure Subscription ID. You can also add other optional parameters to configure your deployment. See [Optional Parameters](#optional-parameters).

   {{< code-block lang="powershell" filename="Platform Logs Step 2" >}}

   ./resource_deploy.ps1 -ApiKey <API_KEY> -SubscriptionId <SUBSCRIPTION_ID> 

   {{< /code-block >}}

4. Create diagnostic settings for all Azure resources sending logs to Datadog. Configure these diagnostic settings to stream to the Event Hub you just created.

All of the Azure resources deployed for the Platform Logs pipeline contain its ResourceGroup-Location appended to its default name. For example, `datadog-eventhub-westus`. However, you can alter this convention by overriding the parameter.

**Note**: Resources can only stream to Event Hubs in the same Azure region, so you need to replicate step 2 for each region you want to stream resource logs from.

### Set up both activity and resource logs

To stream both activity logs and resource logs, run the first script including the optional parameter `-ResourceGroupLocation <REGION>`. Activity logs are a subscription-level source, so you can create your pipeline for them in any region. Once this is deployed, send resource logs through the same Event Hub by adding diagnostic settings on your resources in `westus`.

**Note**: This integration does not collect events.

### Optional parameters

**Note**: Ensure that your custom resource names are unique when you customize the following parameters. Validate that the resource name does not already exist within your list of other Azure resources.

| -Flag `<Default Parameter>`                                         | Description                                                                                                                                                           |
|---------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| -DatadogSite `<datadoghq.com>`                                      | Customize your Datadog instance by adding this flag with another Datadog site as a parameter. Your Datadog site is: {{< region-param key="dd_site" code="true" >}}.    |
| -Environment `<AzureCloud>`                                         | Manage storage in Azure independent clouds by adding this flag as a parameter. Additional options are `AzureChinaCloud`, `AzureGermanCloud`, and `AzureUSGovernment`. |
| -ResourceGroupLocation `<westus2>`                                  | You can choose the region in which your Azure resource group and resources are getting deployed by adding this flag with an updated Azure region.                     |
| -ResourceGroupName `<datadog-log-forwarder-rg>`                     | Customize the name of your Azure resource group by adding this flag with an updated parameter.                                                                        |
| -EventhubNamespace `<datadog-ns-4c6c53b4-1abd-4798-987a-c8e671a5c25e>` | Customize your Azure Event Hub namespace by adding this flag with an updated parameter. By default, `datadog-ns-<globally-unique-ID>` is generated.                              |
| -EventhubName `<datadog-eventhub>`                                  | Customize the name of your Azure Event Hub by adding this flag with an updated parameter.                                                                             |
| -FunctionAppName `<datadog-functionapp-1435ad2f-7c1f-470c-a4df-bc7289d8b249>`                            | Customize the name of your Azure function app by adding this flag with an updated parameter. By default, `datadog-functionapp-<globally-unique-ID>` is generated.                                                                         |
| -FunctionName `<datadog-function>`                                  | Customize the name of your Azure Function by adding this flag with an updated parameter.                                                                              |
| -DiagnosticSettingName `<datadog-activity-logs-diagnostic-setting>` | Customize the name of your Azure diagnostic setting by adding this flag with an updated parameter. **(Only relevant for sending activity logs)**                      |

Installation errors? See [Automated log collection][1] for common error cases.

[101]: /integrations/guide/azure-troubleshooting/#automated-log-collection
{{% /tab %}}

{{% tab "Manual installation" %}}

This section describes the manual setup process to forward your Azure logs to Datadog:

1. Create an [Azure Event Hub](#create-an-azure-event-hub).
2. Set up the [Datadog-Azure function with an Event hub trigger](#create-the-datadog-azure-function) to forward logs to Datadog.
3. Create [diagnostic settings](#create-diagnostic-settings) to forward your Azure [Activity logs](#activity-logs), [resource logs](#resource-logs), or both to your Event Hub.

The instructions below walk through a basic, initial setup using the Azure Portal. All of these steps can be performed with the CLI, Powershell, or resource templates by referring to the Azure documentation.

#### Create an Azure Event Hub

##### Create an Event Hubs namespace

If you already have an Event Hubs namespace configured with an Event Hub connection string, skip to [Add an Event Hub to your Event Hubs namespace](#add-an-event-hub-to-your-event-hubs-namespace).

1. In the Azure portal, navigate to the [Event Hubs][208] overview and click **Create**.
2. Fill in the **Project Details** and **Instance Details** sections as desired.  
  **Note**: If you plan to collect [Azure resource logs][209], the Event Hub must be in the same **Location** as the resource you want to collect logs from. For activity logs or other account-wide log sources, you can choose any region.
3. Click **Review + create** to validate the resource. If validation is successful, click **Create**.

See the [Azure Event Hubs Quickstart][201] for additional information.

##### Add an Event Hub to your Event Hubs namespace

1. In the Azure portal, navigate to your new or existing Event Hubs namespace.
2. Click **+ Event Hub**.
3. Configure the **Basics** and **Capture** tabs as desired.
4. Click **Review + create** to validate the resource. If validation is successful, click **Create**.

##### Configure shared access

1. In the detail page of your Event Hub, click **Shared access policies** under the **Settings** tab to the left.
2. Click **+ Add**.
3. Provide a policy name and select **Listen**.
4. Copy the **Connection string-primary key** value and keep it somewhere safe. This is needed to allow the Datadog-Azure function to communicate with the Event Hub.

{{< img src="integrations/azure/eventhub_connection_string.png" alt="The connection string primary-key value of an event hub's shared access policy" popup="true" style="width:100%">}}

#### Create the Datadog-Azure function

##### Create a function app

If you already have a function app configured with an Event Hub connection string, skip to [Add a new function to your Function App using the Event Hub trigger template](#add-a-new-function-to-your-function-app-using-the-event-hub-trigger-template).

1. In the Azure portal, navigate to the [Function App overview][211] and click **Create**.
2. In the **Instance Details** section, configure the following settings:
   a. Select the **Code** radio button
   b. For **Runtime stack**, select `Node.js` 
   c. For **Version**, select `18 LTS`.
3. Configure other settings as desired.
4. Click **Review + create** to validate the resource. If validation is successful, click **Create**.

See [Azure Event Hubs trigger for Azure Functions][202] for more information.

##### Configure your function app with the Event Hub connection string

1. In the detail page of your function app, click **Environment variables** under the **Settings** tab to the left.
2. In the **App settings** tab, provide a name for the connection string.
3. Paste the value obtained earlier from the [Configure shared access section](#configure-shared-access).
4. Click **Apply**.

**Note**: If you don't want to paste your Datadog API key value directly into the function's code, create an additional environment variable for the Datadog API key value.

##### Add a new function to your Function App using the Event Hub trigger template

1. Select your new or existing function app from the [Function App overview][211].
2. Under the **Functions** tab, click **Create**. 
3. For the **Development environment** field, select **Develop in portal**.
3. Under **Select a template**, choose [Azure Event Hub trigger][202].
4. Under **Event Hub connection**, select your namespace and Event Hub.
5. Click **Create**.

See [Getting started with Azure functions][215] for more information.

##### Point your Event Hub trigger to Datadog

1. On the detail page of your Event Hub trigger function, click **Code + Test** under the **Developer** side menu.
2. Add the [Datadog-Azure Function code][204] to the function's `index.js` file.
3. Add your Datadog API key through a `DD_API_KEY` environment variable, or copy it into the function code by replacing `<DATADOG_API_KEY>` on line 21.  
4. If you're not using the Datadog US1 site, set your [Datadog site][207] with a `DD_SITE` environment variable under the configuration tab of your function app, or copy the site parameter into the function code on line 22.
5. **Save** the function.
6. Click **Integration** under the **Developer** side menu.
7. Click **Azure Event Hubs** under **Trigger and inputs**.
8. Confirm the following settings are in place:  
  a. **Event hub connection** is set to the name of your connection string environment variable.  
  b. **Event parameter name** is set to `eventHubMessages`.  
  c. **Event hub name** is set to the name of your Event Hub.  
  d. **Event hub cardinality** is set to `Many`.  
  e. **Event hub data type** is left empty.  
9. To validate your setup, click **Code + Test** under the **Developer** side menu.
10. Click **Test/Run** and enter a test message in valid JSON format. 
11. Find your test message in the [Datadog Log Explorer][206].  

#### Create diagnostic settings

##### Activity logs

1. In the Azure portal, navigate to the [Activity log][212].
2. Click **Export Activity Logs**.
3. Click **+ Add diagnostic setting**.
4. Under **Categories**, select the categories of logs you want to send to Datadog.
5. Under **Destination details**, select **Stream to an event hub**.
6. Set the **Event hub namespace** and **Event hub name** with the names of the Event Hub namespace and Event Hub name, respectively, that were used to create your Event Hub trigger.
7. For **Event hub policy name**, you can select `RootManageSharedAccessKey` if desired. **Optionally**, create your own shared access policy at the Event Hub **namespace** level:  
  a. In the Event Hub **namespace**, click **Shared access policies** under the **Settings** tab to the left.  
  b. Click **+ Add**.  
  c. Provide a policy name and select **Send** or **Manage**.  
  d. Click **Save**.  
  e. Return to the diagnostic setting page and select your shared access policy for the **Event hub policy name** field. You may need to refresh the page.  
  **Note**: See [Authorizing access to Event Hubs resources using Shared Access Signatures][214] for more information.  
8. Verify your setup is correct by checking the [Datadog Log Explorer][206] for your activity logs.

See [Diagnostic settings in Azure monitor][213] for more information.

##### Resource logs

Configure your Azure resources to forward their logs to the Event Hub with a [diagnostic setting][203].

1. In the Azure portal, navigate to the resource that you want to forward logs to Datadog.
2. In the **Monitoring** section of the resource blade, click **Diagnostic settings**.
3. Click **Add diagnostic setting**.
4. Provide a name and select the sources of the data you want to forward..
5. Under **Destination details**, select **Stream to an event hub**.
6. Set the **Event hub namespace** and **Event hub name** with the names of the Event Hub namespace and Event Hub name, respectively, that were used to create your Event Hub trigger.
7. For **Event hub policy name**, you can select `RootManageSharedAccessKey` if desired. **Optionally**, create your own shared access policy at the Event Hub **namespace** level:  
  a. In the Event Hub **namespace**, click **Shared access policies** under the **Settings** tab to the left.  
  b. Click **+ Add**.  
  c. Provide a policy name and select **Send** or **Manage**.  
  d. Click **Save**.  
  e. Return to the diagnostic setting page and select your shared access policy for the **Event hub policy name** field. You may need to refresh the page.  
  **Note**: See [Authorizing access to Event Hubs resources using Shared Access Signatures][214] for more information.  
8. Click **Save**.
9. Verify your setup is correct by checking the [Datadog Log Explorer][206] for logs from this resource.

See [Diagnostic settings in Azure monitor][213] for more information.

[201]: https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-create
[202]: https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-event-hubs-trigger
[203]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/diagnostic-settings
[204]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/activity_logs_monitoring/index.js
[205]: https://app.datadoghq.com/organization-settings/api-keys
[206]: https://app.datadoghq.com/logs
[207]: https://docs.datadoghq.com/getting_started/site/
[208]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.EventHub%2Fnamespaces
[209]: https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/tutorial-resource-logs
[210]: https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function
[211]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[212]: https://portal.azure.com/#view/Microsoft_Azure_Monitoring/AzureMonitoringBrowseBlade/~/activityLog
[213]: https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?WT.mc_id=Portal-Microsoft_Azure_Monitoring
[214]: https://learn.microsoft.com/en-us/azure/event-hubs/authorize-access-shared-access-signature
[215]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-get-started
{{% /tab %}}

{{% tab "Blob Storage" %}}

{{% site-region region="us3,us5,gov,ap1" %}}
<div class="alert alert-warning">
  This is not supported for Datadog {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

Datadog recommends using the Event Hub setup for Azure log collection. However, you can also follow the steps in this section to forward all of your Azure App Services logs from Azure Blob Storage:

1. If you haven't already set up [Azure Blob Storage][301], use one of the following methods to get started: 
   - [Azure portal][302]
   - [Azure Storage Explorer][303]
   - [Azure CLI][304]
   - [Powershell][305]
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

Archiving logs to Azure Blob Storage requires an App Registration even if you are using the Azure Native integration. To archive logs to Azure Blob Storage, follow the setup instructions to configure the integration using an App Registration. App Registrations created for archiving purposes do not need the `Monitoring Reader` role assigned.

Once you have an App Registration configured, you can [create a log archive][3] that writes to Azure Blob Storage. 

**Note**: If your storage bucket is in a subscription being monitored through the Azure Native integration, a warning is displayed in the Azure Integration Tile about the App Registration being redundant. You can ignore this warning.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site/
[2]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/platform-logs-overview
[3]: /logs/log_configuration/archives/
[4]: /logs/guide/azure-native-logging-guide/
[5]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/overview
