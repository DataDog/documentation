---
title: Azure Log Troubleshooting

description: "Troubleshooting steps for sending logs with Azure"
further_reading:
- link: "https://docs.datadoghq.com/integrations/azure/"
  tag: "Integration"
  text: "Azure Integration"
---

## Overview

Use this guide to troubleshoot missing azure logs forwarded with the following methods:
- [Automated log Forwarder][1]
- [Event Hub + Forwarder][2]
- [Native integration][3]
- [Blob storage][4]

## All log methods

- **Exceeding log quota**: ensure that you have not exceeded your [daily quota][5] for log retention.
- **Excluded logs**: ensure that your logs are not excluded by [exclusion filters][6]
- **Incorrect log search**: ensure that you used the correct [search syntax][7] and/or attributes/tags to search logs
- **Diagnostic setting not present**: ensure that a [diagnostic setting][8] has been added to the resource(s) and/or the activity/Entra Id logs you want to send to Datadog

**Notes**: 
- When using the automated log forwarder and the native integrations methods to send logs, Entra Id diagnostic setting is not added automatically and should be set manually.
- If a diagnostic setting has not been added automatically to your resource(s)/activity logs, check if the maxinimum number of diagnostic settings has been reached and/or if a lock exists on the resource(s), preventing modifications.
- Entra id logs can be searched in Datadog log platform using `source:azure.activedirectory`

## Automated Log Forwarder 

**Note**: All logs sent with the automated log forwarder are tagged with `forwarder:lfo`

### Check DD_SITE and DD_API_KEY values

If all logs are missing, verify your [Datadog site][9] and API key:

1. In the resource group where the LFO resources were deployed, go to Settings > Deployments.
2. Select the most recent deployment.
3. Click Redeploy to check and modify the values.

### Verify logs are present in the storage account container(s)

For missing Azure resource logs, find the ARM-deployed storage account in the resource's region and check for the container with the expected logs.

{{< img src="integrations/guide/gcp-metric-discrepancy/storage_account_container.png" alt="storage account container" >}}

{{< img src="integrations/guide/gcp-metric-discrepancy/storage_account_container_logs.png" alt="storage account container logs" >}}

### Inspect the `containerAppConsole` logs of the forwarder jobs

[These logs][11] help you diagnose application errors and exceptions. To inspect them, enable logging within the container apps environment that is in the same region as your resource(s) missing the logs.

{{< img src="integrations/guide/azure-log-troubleshooting/list_forwarder_env.png" alt="list of forwarder container apps environment" >}}

{{< img src="integrations/guide/azure-log-troubleshooting/forwarder_env_log_config.png" alt="diagnostic setting config in forwarder container apps environment" >}}

## Event Hub + Forwarder

**Note**: All logs sent with the event hub + forwarder are tagged with `forwardername:<forwarder_function_name>`

### Check if the resource provider is unregistered

If your template deployment is failing due to the error **The subscription is not registered to use namespace 'Microsoft.EventHub'**:

Azure has resource providers for each of its services, for example: `Microsoft.EventHub` for the Azure EventHub. If your Azure subscription is not registered to a required resource provider the script fails. You can fix this issue by registering with the resource provider. Run this command in CloudShell. 

{{< code-block lang="shell" filename="Example" >}}

az provider register --namespace Microsoft.EventHub

{{< /code-block >}}

### Check DD_SITE and DD_API_KEY values

If you are missing all logs, ensure that the [selected DC][9] is correct and that the api key points to the correct org. 

**Note**: if the datadog site and api key have been set in the function app settings, your app may restart if you modify them. 

### Identify potential Event Hub Bottlenecks

A spike in incoming messages with a drop in outgoing ones suggests a bottleneck. Use these metrics to investigate:

- `azure.eventhub_namespaces.incoming_messages`
- `azure.eventhub_namespaces.incoming_bytes`
- `azure.eventhub_namespaces.outgoing_messages`
- `azure.eventhub_namespaces.outgoing_bytes`
- `azure.eventhub_namespaces.throttled_requests`
- `azure.eventhub_namespaces.server_errors`

**Note**: Increasing log delays can cause data loss, as [logs older than 18 hours][12] are dropped. 

In response to these symptoms there are two suggestions:

- To handle higher throughput, [scale up your Event Hub partitions][13] (maximum 32). Because in-place scaling is only available for Premium or Dedicated tiers, you must create a new event hub with the desired partition count and then reconfigure its diagnostic settings and forwarder trigger. Consult [Azure support][14] for scaling advice.
- Split the Azure log forwarder into multiple pipelines in Datadog, with each one processing a specific subset of resources based on rules like priority. This would allow to handle more logs simultaneously.

### Inspect function metrics

Ensure the function app is executing by looking at the following function metrics:

- `azure.functions.function_execution_count`
- `azure.functions.bytes_received`
- `azure.functions.bytes_sent`
- `azure.functions.http2xx`
- `azure.functions.http4xx`
- `azure.functions.http5xx`

**Notes**: 
- The log forwarder uses the [Azure Functions V4 Programming model][15], which is package-based and disables direct code editing in the Azure portal. To update or customize your function if you had previously set it up manually, you must contact [Datadog support][17] for instructions.
- For more reliable, efficient, and cost-effective log collection, you can transition to the [Automated Log Forwarder (LFO)][18]. It fully automates the process of forwarding logs from all your Azure resources directly to Datadog.

## Blob Storage 

**Notes**: 
- All logs sent with the native integration are tagged with `forwardername:<forwarder_function_name>`
- Be aware that when new logs are added to a blob file, the function is triggered to send the entirety of the file's content, rather than the recent additions only.

### Check DD_SITE and DD_API_KEY values

If you are missing all logs, ensure that the [selected DC][9] is correct and that the api key points to the correct org. 

### Verify the forwarder config

Make sure that the forwarder is using the latest version, running Node.js 22 TLS or later on Windows OS. The code is publicly available at [index.js][19]

### Inspect the Blob Trigger

Verify the blob storage trigger is configured with the following options:

- **Binding Type**: Azure Blob Storage
- **Blob parameter name**: blobContent
- **Path**: the path within the storage account
- **Storage account connection**: the name of the app setting containing the storage account connection string

### Inspect Blob Storage Metrics

Make sure that data is making it in and out of the blob storage container by looking at the Azure Blob storage metrics:

- azure.storage_storageaccounts_blobservices.egress
- azure.storage_storageaccounts_blobservices.ingress
- azure.storage_storageaccounts_blobservices.transactions

For the transactions metric, use the following metric query to view the number of successful or failed Put operations:

`azure.storage_storageaccounts_blobservices.transactions{responsetype:success , apiname:put*} by {apiname}`
`azure.storage_storageaccounts_blobservices.transactions{!responsetype:success , apiname:put*} by {responsetype}`

### Inspect Function Metrics

Ensure the function app is executing by looking at the following metrics:

- `azure.functions.function_execution_count`
- `azure.functions.bytes_received`
- `azure.functions.bytes_sent`
- `azure.functions.http2xx`
- `azure.functions.http4xx`
- `azure.functions.http5xx`

## Native 

**Note**: All logs sent with the native integration are tagged with `forwarder:native`

### Check resource logs tag rule(s)

Check that your tag rule(s) in the Datadog resource config match the tags set on your resource logs

{{< img src="integrations/guide/azure-logs-troubleshooting/tag_rules.png" alt="tag rules in datadog resource config" >}}
   
### Contact Datadog Support

If you don't spot any issue with the tag rules, contact [Datadog Support][17] and share the following information:
- **Tenant Id**: go to Entra Id, under Basic information find the Tenant ID value
- **Subscription Id(s)**: the subscription in which the logs are missing
- **Datadog Resource Id**: visible in the settings > properties of the Datadog resource blade. Example: `/subscriptions/<subscription_id>/resourceGroups/myresourcegroup/providers/Microsoft.Datadog/monitors/mydatadogresource`
- **Resource Id(s)**: if the logs are missing for specific resources such as web apps, sql databases etc. 
   
## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/logs/guide/azure-logging-guide/?tab=automated#setup
[2]: https://docs.datadoghq.com/logs/guide/azure-logging-guide/?tab=eventhub#setup
[3]: https://docs.datadoghq.com/integrations/guide/azure-portal/?tab=vmextension&site=us3#log-collection
[4]: https://docs.datadoghq.com/logs/guide/azure-logging-guide/?tab=blobstorage#setup
[5]: https://docs.datadoghq.com/logs/log_configuration/indexes/#set-daily-quota
[6]: https://docs.datadoghq.com/logs/log_configuration/indexes/#exclusion-filters
[7]: https://docs.datadoghq.com/logs/explorer/search/
[8]: https://learn.microsoft.com/en-us/azure/azure-monitor/platform/diagnostic-settings?tabs=portal
[9]: https://docs.datadoghq.com/getting_started/site/#access-the-datadog-site
[10]: https://learn.microsoft.com/en-us/azure/azure-monitor/reference/logs-index
[11]: https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/containerappconsolelogs
[12]: https://docs.datadoghq.com/logs/troubleshooting/#missing-logs---timestamp-outside-of-the-ingestion-window
[13]: https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-scalability
[14]: https://azure.microsoft.com/en-us/support
[15]: https://techcommunity.microsoft.com/blog/appsonazureblog/azure-functions-node-js-v4-programming-model-is-generally-available/3929217
[16]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/activity_logs_monitoring/index.js
[17]: https://www.datadoghq.com/support/
[18]: https://www.datadoghq.com/blog/azure-log-forwarding/
[19]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
