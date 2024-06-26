---
title: Azure Configuration Guide for Cloud SIEM
further_reading:
- link: "/security/default_rules/#cat-cloud-siem-log-detection"
  tag: "Documentation"
  text: "Explore Cloud SIEM default detection rules"
- link: "/security/cloud_siem/investigate_security_signals"
  tag: "Documentation"
  text: "Learn about the Security Signals Explorer"
- link: "/security/cloud_siem/log_detection_rules/"
  tag: "Documentation"
  text: "Create new detection rules"
---

## Overview

Cloud SIEM applies detection rules to all processed logs in Datadog to detect threats, like a targeted attack, a threat intel listed IP communicating with your systems, or an insecure resource modification. The threats are surfaced as Security Signals in the Security Signals Explorer for triaging.

This guide walks you through configuring Microsoft Azure to send logs to Datadog so that you can start detecting threats on your Azure Platform logs.

<div class="alert alert-info">The Azure Native integration (available for customers on Datadog's US3 site) has different log collection setup instructions. If you are using the Azure Native integration, select <strong>US3</strong> in the Datadog Site dropdown menu and follow the instructions in <a href="https://docs.datadoghq.com/logs/guide/azure-native-logging-guide/">Microsoft Azure log collection</a>. </div>

{{< tabs >}}
{{% tab "Automated Installation" %}}

Click the button below and fill in the form on Azure portal. After completing the form, the Azure resources required to send activity logs into your Datadog account are deployed for you.

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdatadog-serverless-functions%2Fmaster%2Fazure%2Fdeploy-to-azure%2Fparent_template.json)

1. Select an existing resource group or create a new one.
1. Select a region.
1. Select **true** for **Send Activity Logs**.
1. Enter your Datadog API key.
1. Enter names for your resources. See [Optional Parameters][1] for more information.
1. Click **Create + review**.
1. After the validation passes, click **Create**.

After the deployment is completed successfully, go to [Log Explorer][2] and enter `service:azure` in the search query to view your Azure logs.

[1]: /logs/guide/azure-logging-guide/?tab=automatedinstallation#optional-parameters
[2]: https://app.datadoghq.com/logs

{{% /tab %}}

{{% tab "Manual Installation" %}}

The section walks you through the manual installation steps so that you can send Azure Platform logs to Datadog:

1. [Create a resource group](#create-a-resource-group)
1. [Create an Event Hubs namespace](#create-an-event-hubs-namespace)
1. [Create an Azure event hub](#create-an-event-hub)
1. [Create an Azure Function App](#create-an-azure-function-app)
1. [Add a new function to your Function App](#add-a-new-function-to-your-function-app)
1. [Forward Azure services logs to the event hub](#forward-azure-services-logs-to-event-hub)

### Create a resource group

If you want to use an existing resource group, skip to Create an Event Hubs namespace.

1. Go to [Azure Resource groups][1] page.
1. Click **Create**.
1. Enter a name for the resource group.
1. Optionally, click **Next: Tags** if you want to add tags.
1. Click **Review + create**.
1. After the validation passes, click **Create**.

### Create an Event Hubs namespace

1. Navigate to [Azure Event Hubs][2].
1. Click **Create**.
1. In the **Resource group** dropdown menu, select the resource group you want to add the Event Hub to.
1. Enter a name for the namespace.
1. Select a location for the namespace.
     **Note**: The Event Hub must be in the same Location as the resource you want to submit logs from. For activity logs or other account-wide log sources, you can choose any region.
1. Select a pricing tier.
1. Leave the throughput units (for standard tier) or processing units (for premium tier) as it is.
1. Click **Review + create**.
1. After validation succeeds, click **Create**.
1. After the deployment is completed successfully, click **Go to resource**.

### Create an event hub

1. In the Event Hubs namespace you just created, click **+ Event Hub**.
1. Enter a name for the event hub.
1. Optionally, configure the partition count and retention options.
1. Click **Review + create**.
1. After validation succeeds, click **Create**.

### Create an Azure Function App
Create a new Function App. If you are using an existing function app, skip to Add a new function to your Function App.

1. Navigate to [Function App][3].
1. Click **Create**.
1. Select a resource group for the function app.
1. Enter a name for the function app.
1. Leave the selection to deploy to code.
1. In the **Runtime stack** dropdown menu, select **Node.js**.
1. Select a region for your function app.
1. Select an operating system and plan type.
1. Click **Next: Storage**.
1. Select a storage account in the dropdown menu.
1. Click **Review + create**.
1. After validation succeeds, click **Create**.
1. After the deployment is completed successfully, click **Create a function**.

### Add a new function to your Function App

1. Navigate to the function app if you are using an existing one. Click **Functions** in the left side menu.
1. Click **Create**.
1. Select **Azure Event Hub trigger**.
1. Enter a name for the new function.
1. In **Event Hub connection**, click **New**.
1. In the **Event Hub connection** dropdown menu, select the event hub you created earlier.
1. Click **OK**.
1. In the **Event Hub name**, enter the name of the event hub you created earlier.
1. Click **Create**.

### Add the Datadog Azure function

1. In the new function, select **Code + Test** in the left side menu.
1. Copy and paste the [Datadog-Azure function code][4] to your `index.js` file.
1. Replace `<DATADOG_API_KEY>` with your Datadog API on line 22 of the function code.
1. If you are not using the Datadog US1 site, replace `DD_SITE` with your [Datadog site][5] parameter on line 23 of the function code.
1. Click **Save**.
1. Click **Integrations** in the left side menu.
1. Click **Azure Event Hubs**.
1. Set `Event parameter name` to `eventHubMessages`.
1. `Event Hub Cardinality` must be set to `Many`.
1. Set `Event Hub Data Type` to empty.
1. Click **Save**.
1. Verify your setup is correct by running the function and then checking the Datadog log explorer for the test message. The test log event must be in valid JSON format. For example:
    ```
    {
        is_test:true,
        name: "Datadog Test"
    }
    ```

### Forward Azure services logs to Event Hub

#### Forward Activity logs to Event Hub

1. Navigate to [Azure Activity log][6].
1. Click **Export Activity Logs**.
1. Click **Add diagnostic settings**.
1. Enter a name for the diagnostic setting.
1. Select the categories of logs you want to send to Datadog.
1. Select **Stream to an event hub**.
1. Select the event hub namespace created previously.
1. Click **Save**.

#### Forward resource logs to Event Hub

1. Navigate to the resource from which you want to send resource logs.
1. Under **Monitor** in the left side menu, click **Diagnostic settings**.
1. Click **Add diagnostic setting**.
1. Enter a name for the diagnostic setting.
1. Select **allLogs**.
1. Under the **Destination details** section, select **Stream to an event hub**.
1. Select the event hub namespace created previously.
1. Click **Save**.

Go to [Log Explorer][7] and enter `service:azure` in the search query to view your Azure logs.

[1]: https://portal.azure.com/#view/HubsExtension/BrowseResourceGroups
[2]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.EventHub%2Fnamespaces
[3]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[4]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/activity_logs_monitoring/index.js
[5]: https://docs.datadoghq.com/getting_started/site/
[6]: https://portal.azure.com/#view/Microsoft_Azure_Monitoring/AzureMonitoringBrowseBlade/~/activityLog
[7]: https://app.datadoghq.com/logs

{{% /tab %}}
{{< /tabs >}}

## Use Cloud SIEM to triage Security Signals

Cloud SIEM applies out-of-the-box detection rules to all processed logs, including the Azure Platform logs you have just set up. When a threat is detected with a detection rule, a Security Signal is generated and can be viewed in the Security Signals Explorer.

- Go to the Cloud SIEM Signals Explorer to view and triage threats. See Security Signals Explorer for further details.
- See out-of-the-box detection rules that are applied to your logs.
- Create new rules to detect threats that match your specific use case.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
