---
title: Azure Metric Discrepancy

description: "Troubleshooting steps for Azure metric discrepancy"
further_reading:
- link: "https://docs.datadoghq.com/integrations/azure/"
  tag: "Integration"
  text: "Azure Integration"
---

## Overview

Use this guide to troubleshoot metric discrepancies between Azure and Datadog.

## Metric discrepancies

Metric discrepancies between Datadog and Azure typically arise from differences in time or space aggregation. Datadog collects the [following metrics][1] from Azure Monitor with all dimensions available, lowest time grain available and the primary aggregation type. 
These information are visible in the response of the [Metric Definitions - List API][2] (source of truth) or in the [Azure documentation][3]. 

To compare metrics in Azure Monitor and in Datadog, make sure that your query includes:

- The most granular set of dimensions available 
- The primary aggregation type 
- Lowest time granularity

The following steps reconcile the metric `azure.storage_storageaccounts_blobservices.ingress` between Azure and Datadog.

  1. Find the corresponding metric in Azure.

     Datadog converts metrics from Azure monitor into the format `azure.RESOURCE_PROVIDER_RESOURCE_TYPE.METRIC_NAME`. For the [example metric][4], the Azure Resource Provider is **storage**, the Azure Resource Type is **storageaccounts_blobservices** and the metric name is **ingress**.

  2. Find the most granular dimensions, time grain and primary aggregation type for the metric

     Source of Truth from [Metric Definitions - List API][2]:

    ```json
    {
      "id": "/subscriptions/<subscription_id>/resourceGroups/<resource_group>/providers/Microsoft.Storage/storageAccounts/<resource_name>/providers/microsoft.insights/metricdefinitions/Ingress",
      "resourceId": "/subscriptions/<subscription_id>/resourceGroups/<resource_group>/providers/Microsoft.Storage/storageAccounts/<resource_name>",
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
    ```

   4. Graph the metric in Azure Monitor Metrics Explorer or by going to the individual Resource view > Monitoring > Metrics in the left panel.

      - Time: Last 30 minutes or Last 1 hour (ideally in UTC)
      - Metric name: Ingress
      - Dimensions: GeoType, ApiName, Authentication
      - Primary Aggregation: Total (= Sum)
      - Time Grain: 1m 

   {{< img src="integrations/guide/azure-metric-discrepancy/azure_metric_explorer.jpg" alt="Azure Metrics Explorer" >}}

   5. Graph the metric in the Datadog Metrics Explorer:

   {{< img src="integrations/guide/azure-metric-discrepancy/datadog_metric_explorer.jpg" alt="Datadog Metrics Explorer" >}}

   **Note:** If you are interested in collecting additional aggregation types, contact [Datadog Support][5]. 


[1]: https://learn.microsoft.com/en-us/azure/azure-monitor/reference/metrics-index
[2]: https://learn.microsoft.com/en-us/rest/api/monitor/metric-definitions/list?view=rest-monitor-2023-10-01&tabs=HTTP
[3]: https://learn.microsoft.com/en-us/azure/azure-monitor/reference/metrics-index
[4]: https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-storage-storageaccounts-blobservices-metrics#:~:text=ingress%20within%20Azure.-,Ingress,-Bytes
[5]: https://www.datadoghq.com/support/?_gl=1*16y4k0m*_gcl_au*Nzk2MDcyODA2LjE3NTMzNDM3NDcuMTU2MDg0MjQwNC4xNzU1MDkzNDEwLjE3NTUwOTM0MDk.*_ga*NjQzMjQxMzMxLjE3NTM2NDM2NjA.*_ga_KN80RDFSQK*czE3NTg1NDIzMTEkbzEzNSRnMSR0MTc1ODU0MjMxMiRqNTkkbDAkaDE1NDI5OTgyMQ..*_fplc*SDdHRHlxOU85Z1c4RURhS09HczVDM01aYkoySVBWSEtCTjFKd3FIdUl4aWolMkIyY1o3YmUyQU9EbTF3TVF4OGJETVE3SW14ViUyRkVaQUdlV0VmeTIyN3pHSDY5JTJCNkYyV0hac0t1SzVyc0c5R2dQdE5BVGFCOG8wWHhmZiUyRnJGYnclM0QlM0Q.
