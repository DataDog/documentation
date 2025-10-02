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
- If a diagnostic setting has not been added automatically to your resources/activity logs, check if the maxinimum number of diagnostic settings has been reached and/or if a lock exists on the resource, preventing modifications. 

## Automated Log Forwarder 

**Note**: All logs sent with the automated log forwarder are tagged with `forwarder:lfo`

### Check DD_SITE and DD_API_KEY values

If you are missing all logs, ensure that the [selected DC][9] is correct and that the api key points to the correct org. To check these values go to the resource group where all the resources deployed by the ARM template are present, click on settings > deployment then click on your latest deployment and redeploy. 

### Check logs are present in the storage account container(s)

Take note of the region of the resource(s) missing logs in Datadog (if the logs missing are azure [resource logs][10]). Then go to the storage account deployed by the ARM template in the same region as the resource(s) and look if there is a container with the expected logs.

{{< img src="integrations/guide/gcp-metric-discrepancy/storage_account_container.png" alt="storage account container" >}}

{{< img src="integrations/guide/gcp-metric-discrepancy/storage_account_container_logs.png" alt="storage account container logs" >}}

### Check the `containerAppConsole` logs of the forwarder jobs

[These logs][11] capture the standard output and standard error streams from the forwarder's containers. They help diagnose issues such as Application Errors and Exceptions.
   
To inspect these logs, enable them and send them to a destination: select the forwarder container apps environment from the same region as your resource and storage account. 
For instance, if your resource and storage account are in Japan West, choose the forwarder container apps environment from that region. Next, go to logging options and select to send logs to Azure Monitor or a Log Analytics workspace.

{{< img src="integrations/guide/azure-log-troubleshooting/list_forwarder_env.png" alt="list of forwarder container apps environment" >}}

{{< img src="integrations/guide/azure-log-troubleshooting/forwarder_env_log_config.png" alt="diagnostic setting config in forwarder container apps environment" >}}

## Event Hub + Forwarder

**Note**: All logs sent with the event hub + forwarder are tagged with `forwarder:<forwarder_function_name>`

### Check if the resource provider is unregistered

If your template deployment is failing due to the error **The subscription is not registered to use namespace 'Microsoft.EventHub'**:

Azure has resource providers for each of its services, for example: `Microsoft.EventHub` for the Azure EventHub. If your Azure subscription is not registered to a required resource provider the script fails. You can fix this issue by registering with the resource provider. Run this command in CloudShell. 

{{< code-block lang="shell" filename="Example" >}}

az provider register --namespace Microsoft.EventHub

{{< /code-block >}}

### Check DD_SITE and DD_API_KEY values

If you are missing all logs, ensure that the [selected DC][9] is correct and that the api key points to the correct org. To check the values of these environement variables go to your function app > setting > environment variables and edit the app settings. 

**Note**: once you modified the app settings, Azure will warn you that your app may restart if you are updating app settings.

### Identifying Event Hub Bottlenecks

If there is a spike in the number of incoming messages while outgoing messages drop, it could indicate a bottleneck.  Use the following metrics to investigate potential bottlenecks:

- `azure.eventhub_namespaces.incoming_messages`
- `azure.eventhub_namespaces.incoming_bytes`
- `azure.eventhub_namespaces.outgoing_messages`
- `azure.eventhub_namespaces.outgoing_bytes`
- `azure.eventhub_namespaces.throttled_requests`
- `azure.eventhub_namespaces.server_errors`

**Note**: If the bottleneck is not addressed and log delay starts increasing, it is possible this could lead to missing events as [logs that are delayed][12] by 18 hours or more will be dropped by logs intake. 

In response to these symptoms there are two suggestions:

- [Scale up the event hub partitions][13] in Azure to handle your expected throughput (maximum 32). Azure does not allow you to scale partitions in place unless it's a premium or dedicated event hub namespace, therefore a new event hub must be created with the desired partitions and reconfigured (diagnostic settings and forwarder trigger).  It’s recommended you consult [Azure support][14] for advice on your scaling needs.
- Split the Azure log forwarder pipelines in Datadog and have each one process the logs from a subset of resources (based on priority, or some kind of other rule). This would reduce the number of logs that one individual pipeline would need to process and allow to handle more logs simultaneously.

### Check the forwarder execution

Ensure the function app is executing by looking at the following function metrics:

- `azure.functions.function_execution_count`
- `azure.functions.bytes_received`
- `azure.functions.bytes_sent`
- `azure.functions.http2xx`
- `azure.functions.http4xx`
- `azure.functions.http5xx`

**Notes**: 
- The log forwarder function has been updated to use the [Azure Functions V4 Programming model][15]. As a consequence, if you had installed this log forwarding pipeline before the change and you wish to do some manual updates, it is no longer possible to edit the function code directly in the Azure portal as the v4 programming model is designed to be deployment-package-based. If you need to update your azure function code to the [latest version][16] or customize the code, contact [Datadog support][17] for detailed instructions. 
- We recommend transitioning to log collection through the [Automated Log Forwarder (LFO)][18] to enhance efficiency and reliability while reducing costs. This method automates the entire process of collecting and forwarding logs from all your Azure resources to Datadog.

## Blob Storage 

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
[3]: https://docs.datadoghq.com/logs/guide/azure-logging-guide/?tab=blobstorage#setup
[4]: https://docs.datadoghq.com/integrations/guide/azure-portal/?tab=vmextension&site=us3#log-collection
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

