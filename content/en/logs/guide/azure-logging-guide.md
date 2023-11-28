---
title: Send Azure Logs to Datadog
kind: documentation
further_reading:
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
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

[1]: /integrations/guide/azure-troubleshooting/#automated-log-collection
{{% /tab %}}

{{% tab "Manual installation" %}}

To send logs from Azure to Datadog, follow this general process:

1. Create an [Azure Event Hub][1].
2. Set up the Datadog-Azure [function with an Event hub trigger][2] to forward logs to Datadog.
3. Configure your Azure services to stream logs to the Event Hub by creating a [diagnostic setting][3].

The instructions below walk through a basic, initial setup using the Azure Portal. All of these steps can be performed with the CLI, Powershell, or resource templates by referring to the Azure documentation.

#### Azure Event Hub

Create an [Azure Event Hub][1]:

Create a new namespace or add a new Event Hub to an existing namespace by following the instructions below.

1. In the Azure portal, navigate to the **Event Hubs** overview and click **Create**.
2. Enter the name, pricing tier, subscription, and resource group.
3. Select Location. **Note**: The Event Hub must be in the same Location as the resource you want to submit logs from. For activity logs or other account-wide log sources, you can choose any region.
4. Select your desired options for throughput units, availability-zones, and auto-inflation.
5. Click **Create**.

Add an Event Hub to your Event Hub namespace.

1. In the Azure portal, navigate to a new or existing namespace.
2. Click **+ Event Hub**.
3. Select your desired options for name, partition-count, and message-retention.
4. Click **Create**.

#### Datadog Azure function

Set up the Datadog-Azure [Function with an Event Hub trigger][2] to forward logs to Datadog:

Create a new Function App or use an existing Function App and skip to the next section.

1. In the Azure portal, navigate to the **Function Apps** overview and click **Create**.
2. Select a subscription, resource group, region, and enter a name for your function app.
3. Select **Publish to Code, Runtime stack to Node.js, and Version to 18 LTS**.
4. Select an operating system and plan type.
5. Click **Next:Hosting**.
6. Select a storage account.
7. Review and create the new function app.
8. Wait for your deployment to finish.

Add a new function to your Function App using the Event Hub trigger template.

1. Select a new/existing function app from the function apps list.
2. Select **Functions** from the functions menu and click **Create**. 
3. Select [Azure Event Hub trigger][2] from the templates menu.
4. Under **Event Hub connection**, select your namespace and Event Hub.
5. Click **Create**.

Point your Event Hub trigger to Datadog.

1. Select your new Event Hub trigger from the functions view.
2. Click on **Code + Test** under the developer side menu.
3. Add the [Datadog-Azure Function code][4] to your index.js file.
4. Add your API key by creating a `DD_API_KEY` environment variable under the configuration tab of your function app, or copy it into the function code by replacing `<DATADOG_API_KEY>` on line 22.  
5. If you're not using the Datadog US1 site, set your [Datadog site][7] with a `DD_SITE` environment variable under the configuration tab of your function app, or copy the site parameter into the function code on line 23.
6. Save the function.
7. Click on **Integration** then **Azure Event Hubs** under trigger and check the following settings:  
    a. Event Parameter Name is set to `eventHubMessages`.  
    b. Event Hub Cardinality is set to `Many`.  
    c. Event Hub Data Type is left empty.  
8. Click **Save**.
9. Verify your setup is correct by running the function and then checking the [Datadog log explorer][6] for the test message.  
**Note**: The test log event must be in valid JSON format.

#### Activity logs

1. In the Azure portal, navigate to the **Activity Log**.
2. Click on **Diagnostic Settings**.
3. Click **Add diagnostic setting**.
4. Under category details, select the categories of logs you want to send to Datadog.
5. Under destination details, select **Stream to an event hub**.
6. Set the Event Hub namespace and name. These should match the Event Hub namespace and name that you used to create your Event Hub trigger.
7. Set the shared access key. This key should be configured with send or manage access.
8. Click **Save**.
9. Verify your setup is correct by checking the [Datadog log explorer][6] for logs from this resource.

#### Resource logs

Configure your Azure services to forward their logs to the Event Hub by creating a [diagnostic setting][3].

1. In the Azure portal, navigate to the resource of the logs you want to send to Datadog.
2. Under the monitoring section of the resource blade, click **Diagnostic settings**.
3. Click **Add diagnostic setting**.
4. Under category details, select the categories of logs you want to send to Datadog.
5. Under destination details, select **Stream to an event hub**.
6. Set the Event Hub namespace and name. These should match the Event Hub namespace and name that you used to create your Event Hub trigger.
7. Set the shared access key. This key should be configured with send or manage access.
8. Click **Save**.
9. Verify your setup is correct by checking the [Datadog log explorer][6] for logs from this resource.

[1]: https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-create
[2]: https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-event-hubs-trigger
[3]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/diagnostic-settings
[4]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/activity_logs_monitoring/index.js
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/logs
[7]: https://docs.datadoghq.com/getting_started/site/

{{% /tab %}}

{{% tab "Blob Storage" %}}

{{% site-region region="us3,us5,gov,ap1" %}}
<div class="alert alert-warning">
  This is not supported for Datadog {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

Datadog recommends using the Event Hub setup for Azure log collection. However, you can also follow the steps below to forward all of your Azure App Services logs from Blob storage:

1. Set up [Azure Blob Storage][1] from the [Azure portal][2], [Azure Storage Explorer][3], [Azure CLI][4], or [Powershell][5].
2. Set up the [Datadog-Azure Function](#create-a-new-azure-blob-storage-function) which forwards logs from your blob storage to Datadog.
3. Configure your Azure App Services to [forward their logs to the Blob Storage][6].

#### Create a new Azure Blob Storage function

If you are unfamiliar with Azure functions, see [Getting started with Azure Functions][7].

1. In the [Azure portal][2], navigate to the **Function Apps** overview and click **Create**.
2. Select a subscription, resource group, region, and enter a name for your function apps. 
3. Select **Publish to Code, Runtime stack to Node.js, and Version to 18 LTS**.
4. Select Operating System **Windows** and a plan type.
5. Click **Next:Hosting**.
6. Select a storage account.
7. Review and **Create** the new function.
8. Once deployment has finished, select your new function from the function apps list.
9. Select to build your function **In-portal** and use the Blog Storage trigger template (under **More templates…**). If prompted, install the `Microsoft.Azure.WebJobs.Extensions.EventHubs` extension.
10. Select or add your **Storage account connection** and click **Create**.
11. Create an `index.js` file and add the [Datadog-Azure Function code][8] (replace `<DATADOG_API_KEY>` with your [Datadog API Key][9]).
12. Save the function.
13. Under **Integrate**, set the **Blob Parameter Name** to `blobContent` and click **Save**.
14. Verify your setup is correct by checking the [Datadog Log explorer][10] for your logs.

[1]: https://azure.microsoft.com/en-us/services/storage/blobs/
[2]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-storage-explorer
[4]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-cli
[5]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-powershell
[6]: https://docs.microsoft.com/en-us/learn/modules/store-app-data-with-azure-blob-storage/
[7]: https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function
[8]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: https://app.datadoghq.com/logs

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
