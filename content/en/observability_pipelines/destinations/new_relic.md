---
title: New Relic Destination
disable_toc: false
---

Use Observability Pipelines' New Relic destination to send logs to New Relic.

## Setup

Set up the New Relic destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

{{% observability_pipelines/destination_settings/new_relic %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/new_relic %}}

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| 100            | 1,000,000       | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching