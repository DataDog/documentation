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

**Note:** If you are re-running the template due to this failure, it is also advised that you remove the entire resource group to create a fresh deployment. 

### Unregistered resource provider

If your template deployment is failing due to the error **The subscription is not registered to use namespace 'Microsoft.EventHub'**:

Azure has resource providers for each of its services, for example: `Microsoft.EventHub` for the Azure EventHub. If your Azure subscription is not registered to a required resource provider the script fails. You can fix this issue by registering with the resource provider. Run this command in CloudShell. 

{{< code-block lang="shell" filename="Example" >}}

az provider register --namespace Microsoft.EventHub

{{< /code-block >}}

### Exceeding log quota

Did you install the script successfully, but you are still not seeing activity/platform logs within the Logs Explorer? 

Ensure that you have not exceeded your [daily quota][4] for log retention.

**Note:** It is advised that you take at least five minutes after the execution of the script to start looking for logs in the Logs Explorer.

## Metric discrepancies

Metric discrepancies between Datadog and Azure typically arise from differences in [time or space aggregation][5]. Datadog collects all of the [Azure Monitor supported metrics][6], with all available dimensions, the lowest time granularity, and the primary aggregation type. 

**Note**: In addition to the [Azure Monitor supported metrics][6] page, you can also find this information by querying Azure's [Metric Definitions - List API][10]. 

### Compare metric values

To compare metrics in Azure Monitor with metrics in Datadog, make sure that your query includes:

- The most granular dimension available 
- The primary aggregation type 
- The lowest time granularity

The following steps reconcile the metric `azure.storage_storageaccounts_blobservices.ingress` between Azure and Datadog.

  1. Find the corresponding metric in Azure.

     Datadog converts metrics from Azure monitor into the format `azure.<RESOURCE_PROVIDER_RESOURCE_TYPE>.<METRIC_NAME>`. For the [example metric][8], the Azure Resource Provider is **storage**, the Azure Resource Type is **storageaccounts_blobservices**, and the metric name is **ingress**.

  2. Find the most granular dimensions, time interval, and the primary aggregation type for the metric. 
  
  Click the section below to see an example Azure API response for the `azure.storage_storageaccounts_blobservices.ingress` with these fields highlighted.

{{% collapse-content title="Example Azure API response" level="h4" expanded=false id="example-azure-api-response" %}}
  {{< highlight json "hl_lines=13 22 60-61" >}}
    {
      "id": "/subscriptions/<SUBSCRIPTION_ID>/resourceGroups/<RESOURCE_GROUP>/providers/Microsoft.Storage/storageAccounts/<RESOURCE_NAME>/providers/microsoft.insights/metricdefinitions/Ingress",
      "resourceId": "/subscriptions/<SUBSCRIPTION_ID>/resourceGroups/<RESOURCE_GROUP>/providers/Microsoft.Storage/storageAccounts/<RESOURCE_NAME>",
        "namespace": "Microsoft.Storage/storageAccounts",
        "category": "Transaction",
        "name": {
          "value": "Ingress",
          "localizedValue": "Ingress"
        },
        "displayDescription": "The amount of ingress data, in bytes. This number includes ingress from an external client into Azure Storage as well as ingress within Azure.",
        "isDimensionRequired": false,
        "unit": "Bytes",
        "primaryAggregationType": "Total",
        "supportedAggregationTypes": [
          "Total",
          "Average",
          "Minimum",
          "Maximum"
        ],
        "metricAvailabilities": [
          {
            "timeGrain": "PT1M",
            "retention": "P93D"
          },
          {
            "timeGrain": "PT5M",
            "retention": "P93D"
          },
          {
            "timeGrain": "PT15M",
            "retention": "P93D"
          },
          {
            "timeGrain": "PT30M",
            "retention": "P93D"
          },
          {
            "timeGrain": "PT1H",
            "retention": "P93D"
          },
          {
            "timeGrain": "PT6H",
            "retention": "P93D"
          },
          {
            "timeGrain": "PT12H",
            "retention": "P93D"
          },
          {
            "timeGrain": "P1D",
            "retention": "P93D"
          }
        ],
        "dimensions": [
          {
            "value": "GeoType",
            "localizedValue": "Geo type"
          },
          {
            "value": "ApiName",
            "localizedValue": "API name"
          },
          {
            "value": "Authentication",
            "localizedValue": "Authentication"
          }
      ]
    }
    {{< /highlight >}}

{{% /collapse-content %}} 

   **Note**: `Total` is the same as `Sum`. See [Aggregation types][7] in the Azure Monitor documentation for more information.

   3. Graph the metric in the Azure Monitor Metrics Explorer, or by opening the resource in Azure and clicking **Monitoring → Metrics** in the left panel.

   4. Graph the metric in the [Datadog Metrics Explorer][9] over the same time frame. If you use the same values for time and space aggregation, the metric values should match.

## Monitoring multiple app registrations

Subscriptions monitored by multiple app registrations can introduce overlapping access configurations. This setup is not recommended and may result in integration issues or system conflicts, and may also increase your Azure Monitor costs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://portal.azure.com
[2]: https://manage.windowsazure.com
[3]: /help/
[4]: /logs/indexes/#set-daily-quota
[5]: /metrics/#time-and-space-aggregation
[6]: https://learn.microsoft.com/azure/azure-monitor/reference/metrics-index
[7]: https://learn.microsoft.com/azure/azure-monitor/metrics/metrics-aggregation-explained#aggregation-types
[8]: https://learn.microsoft.com/azure/azure-monitor/reference/supported-metrics/microsoft-storage-storageaccounts-blobservices-metrics#:~:text=ingress%20within%20Azure.-,Ingress,-Bytes
[9]: https://app.datadoghq.com/metric/explorer
[10]: https://learn.microsoft.com/rest/api/monitor/metric-definitions/list
