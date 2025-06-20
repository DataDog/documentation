---
title: Datadog Logs Destination
disable_toc: false
---

Use Observability Pipelines' Datadog Logs destination to send logs to Datadog Log Management.

## Setup

Set up the Datadog Logs destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

{{% observability_pipelines/destination_settings/datadog %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| 1,000          | 4,250,000       | 5                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching