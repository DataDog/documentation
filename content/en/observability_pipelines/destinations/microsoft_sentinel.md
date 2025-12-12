---
title: Microsoft Sentinel Destination
disable_toc: false
products:
- name: Logs
  icon: logs
---

{{< product-availability >}}

Use Observability Pipelines' Microsoft Sentinel destination to send logs to Microsoft Sentinel. See [Logs Ingestion API][3] for API call limits in Microsoft Sentinel.

## Setup

Set up the Microsoft Sentinel destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI, except for [Prerequisites](#prerequisites) which provides instructions on how to find the information you need in Microsoft Azure.

### Set up the destination

{{% observability_pipelines/destination_settings/microsoft_sentinel %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/microsoft_sentinel %}}

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| None           | 10,000,000       | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: https://learn.microsoft.com/en-us/azure/azure-monitor/fundamentals/service-limits#logs-ingestion-api