---
title: Azure Troubleshooting

aliases:
  - /integrations/faq/azure-troubleshooting
further_reading:
- link: "/integrations/azure/"
  tag: "Documentation"
  text: "Azure integration"
---

## Find your tenant name

1. Navigate to [portal.azure.com][1].
2. In the left sidebar, select **Azure Active Directory**.
3. Under **Basic information**, find the **Name** value.

## Unable to login

If you experience an error logging in while trying to install the Azure integration, contact [Datadog support][3]. When possible, attach a screenshot.

## Missing metrics

Ensure you completed the installation process, which includes giving read permissions to the Azure application for the subscriptions you want to monitor.

For ARM deployed virtual machines, you must also turn on Diagnostics and select the VM metrics you would like to collect. See **Enable Diagnostics** below for instructions.

For other missing metrics, contact [Datadog support][3] with the following information about the metric:
- dimensions
- resource group
- resource name
- subscription ID or subscription name 

Attach a screenshot of a graph from Azure Monitor that shows a graph of the metric. **Important**: Graph 1-minute data points in the screenshot.


### Enable diagnostics

Turning on Diagnostics allows ARM deployed VMs to collect logging information which includes metrics for CPU, Network, etc. Follow these instructions:

1. Navigate to the [Azure portal][1] and locate your VM.
2. Click on **Diagnostics settings** under the **Monitoring** section.
3. Pick a storage account and click **Enable guest-level monitoring**.
4. By default, basic metrics and logs are enabled. Adjust based on your preferences.
5. Click **Save** to save any changes.

    {{< img src="integrations/guide/azure_troubleshooting/azure_enable_diagnostics.png" alt="azure diagnostics settings overview displayed with No storage account highlighted under Pick a storage account and enable guest level monitoring enabled" style="width:70%">}}

## Automated log collection

### Naming conflicts

If you have Azure resources with the same resource name as one of the default parameters, it can lead to naming conflicts. Azure does not allow resources to share resource names within an individual subscription. Datadog recommends renaming the default parameter with a unique name that does not already exist within your environment.

For example, use the -EventhubName flag to change the default name of the Eventhub resource, if you already possess an Eventhub named `datadog-eventhub`. 

{{< code-block lang="powershell" filename="Example" >}}

./resource_deploy.ps1 -ApiKey <your_api_key> -SubscriptionId <your_subscription_id> -EventhubName <new-name>

{{< /code-block >}}

**Note:** Navigate to the [Optional Parameters][4] section to find the list of configurable parameters. 

**Note:** If you are re-running the script due to this failure, it is also advised that you remove the entire resource group to create a fresh execution. 

### Unregistered resource provider

If your script execution is failing due to the error **The subscription is not registered to use namespace 'Microsoft.EventHub'**:

Azure has resource providers for each of its services, for example: `Microsoft.EventHub` for the Azure EventHub. If your Azure subscription is not registered to a required resource provider the script fails. You can fix this issue by registering with the resource provider. Run this command in CloudShell. 

{{< code-block lang="powershell" filename="Example" >}}

az provider register --namespace Microsoft.EventHub

{{< /code-block >}}

### Exceeding log quota

Did you install the script successfully, but you are still not seeing activity/platform logs within the Logs Explorer? 

Ensure that you have not exceeded your [daily quota][5] for log retention.

**Note:** It is advised that you take at least five minutes after the execution of the script to start looking for logs in the Logs Explorer.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://portal.azure.com
[2]: https://manage.windowsazure.com
[3]: /help/
[4]: /integrations/azure/?tab=azurecliv20#optional-parameters
[5]: /logs/indexes/#set-daily-quota
