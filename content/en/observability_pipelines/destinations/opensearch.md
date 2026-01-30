---
title: OpenSearch Destination
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

Use Observability Pipelines' OpenSearch destination to send logs to OpenSearch.

## Setup

Set up the OpenSearch destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

1. Optionally, enter the name of the OpenSearch index. See [template syntax][3] if you want to route logs to different indexes based on specific fields in your logs.
{{% observability_pipelines/destination_buffer_numbered %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opensearch %}}

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| None           | 10,000,000      | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: /observability_pipelines/destinations/#template-syntax