---
title: SentinelOne Destination
disable_toc: false
---

Use Observability Pipelines' SentinelOne destination to send logs to SentinelOne.

## Setup

Set up the SentinelOne destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

{{% observability_pipelines/destination_settings/sentinelone %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sentinelone %}}

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| None           | 1,000,000       | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching