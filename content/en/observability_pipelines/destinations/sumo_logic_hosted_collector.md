---
title: Sumo Logic Hosted Collector Destination
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

Use Observability Pipelines' Sumo Logic destination to send logs to your Sumo Logic Hosted Collector.

## Setup

Set up the Sumo Logic destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

The following fields are optional:

1. In the **Encoding** dropdown menu, select whether you want to encode your pipeline's output in `JSON`, `Logfmt`, or `Raw` text. If no decoding is selected, the decoding defaults to JSON.
1. Enter a **source name** to override the default `name` value configured for your Sumo Logic collector's source.
1. Enter a **host name** to override the default `host` value configured for your Sumo Logic collector's source.
1. Enter a **category name** to override the default `category` value configured for your Sumo Logic collector's source.
1. Click **Add Header** to add any custom header fields and values.
{{% observability_pipelines/destination_buffer_numbered %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sumo_logic %}}

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| None           | 10,000,000      | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching