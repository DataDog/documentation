---
title: Datadog Metrics
description: Learn how to set up the Datadog Metrics destination.
disable_toc: false
products:
- name: Metrics
  icon: metrics
---

{{< product-availability >}}

Use Observability Pipelines' Datadog Metrics destination to send metrics to Datadog. You can also use [AWS PrivateLink](#aws-privatelink) to send metrics from Observability Pipelines to Datadog.

## Setup

Set up the Datadog Metrics destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

{{< img src="observability_pipelines/destinations/datadog_metrics_settings.png" alt="The Datadog Metrics destination settings" style="width:40%;" >}}

### Set up the destination

Optionally, toggle **Buffering Options** to configure how events are buffered before being sent.
**Note**: Buffering options is in {{< tooltip glossary="preview" case="title" >}}. Contact your account manager to request access.

- If disabled, the buffer holds a maximum of 500 events. Events beyond this limit are dropped.
- If enabled:
  - Select the buffer type you want to set (Memory or Disk).
  - Enter the buffer size and select the unit.

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}

## How the destination works

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| 100,000        | None            | 2                   |

## AWS PrivateLink

To send metrics from Observability Pipelines to Datadog using AWS PrivateLink, see [Connect to Datadog over AWS PrivateLink][3] for setup instructions. The two endpoints you need to set up are:

- Metrics: {{< region-param key=metrics_endpoint_private_link code="true" >}}
- Remote Configuration: {{< region-param key=remote_config_endpoint_private_link code="true" >}}

**Note**: The `obpipeline-intake.datadoghq.com` endpoint is used for Live Capture and is not available as a PrivateLink endpoint.

[1]: https://app.datadoghq.com/observability-pipelines
[2]: https://docs.datadoghq.com/observability_pipelines/destinations/#event-batching
[3]: https://docs.datadoghq.com/agent/guide/private-link/?tab=crossregionprivatelinkendpoints
[4]: http://config.datadoghq.com
