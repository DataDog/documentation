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
- **Index exclusion**: ensure that your logs are not excluded by [exclusion filters][6]
- **Incorrect log search**: ensure that you used the correct [search syntax][7] and/or attributes/tags to search logs
- **Diagnostic setting**: ensure that a [diagnostic setting][8] has been added to the resource(s) and/or the activity/Entra Id logs you want to send to Datadog

**Notes**: 
- When using the automated log forwarder and the native integrations methods to send logs, Entra Id diagnostic setting is not added automatically and should be set manually.
- If a diagnostic setting has not been added automatically to your resources/activity logs, check if the maxinimum number of diagnostic settings has been reached and/or if a lock exists on the resource, preventing modifications. 

## Automated Log Forwarder 

**Note**: All logs sent with the automated log forwarder are tagged with `forwarder:lfo`

1. Check logs are present in the storage account container(s)

   Take note of the region of the resource(s) missing logs in Datadog (if the logs missing are azure [resource logs][8]). Then go to the storage account deployed by the ARM template in the same     region as the resource(s) and look if there is a container with the expected logs.

   {{< img src="integrations/guide/gcp-metric-discrepancy/storage_account_container.png" alt="storage account container" >}}

   {{< img src="integrations/guide/gcp-metric-discrepancy/storage_account_container_logs.png" alt="storage account container logs" >}}

2. Check the `containerAppConsole` logs of the forwarder jobs

   These logs capture the standard output and standard error streams from the forwarder's containers. They help diagnose issues such as Application Errors and Exceptions.
   
   To inspect these logs, enable them and send them to a destination: select the forwarder container apps environment from the same region as your resource and storage account. For instance, if     your resource and storage account are in Japan West, choose the forwarder container apps environment from that region. 
   Next, go to logging options and select to send logs to Azure Monitor or a Log Analytics workspace.

   {{< img src="integrations/guide/azure-log-troubleshooting/list_forwarder_env.png" alt="list of forwarder container apps environment" >}}

   {{< img src="integrations/guide/azure-log-troubleshooting/forwarder_env_log_config.png" alt="diagnostic setting config in forwarder container apps environment" >}}

## Event Hub + Forwarder

**Note**: All logs sent with the event hub + forwarder are tagged with `forwarder:<forwarder_function_name>`

## Blob Storage 

## Native 

**Note**: All logs sent with the native integration are tagged with `forwarder:native`
   
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
[9]: https://learn.microsoft.com/en-us/azure/azure-monitor/reference/logs-index
