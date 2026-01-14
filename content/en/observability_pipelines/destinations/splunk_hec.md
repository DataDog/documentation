---
title: Splunk HTTP Event Collector (HEC) Destination
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- name: Rehydration
  icon: archive-wui
  url: /observability_pipelines/rehydration/
---

{{< product-availability >}}

Use Observability Pipelines' Splunk HTTP Event Collector (HEC) destination to send logs to Splunk HEC.

## Setup

Set up the Splunk HEC destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

<div class="alert alert-danger">Observability Pipelines compresses logs with the gzip (level 6) algorithm.</div>

The following fields are optional:
1. Enter the name of the Splunk index you want your data in. This has to be an allowed index for your HEC. See [template syntax][3] if you want to route logs to different indexes based on specific fields in your logs.
1.  Select whether the timestamp should be auto-extracted. If set to `true`, Splunk extracts the timestamp from the message with the expected format of `yyyy-mm-dd hh:mm:ss`.
1. Optionally, set the `sourcetype` to override Splunk's default value, which is `httpevent` for HEC data. See [template syntax][3] if you want to route logs to different source types based on specific fields in your logs.
1. Optionally, toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
	- If left disabled, the maximum size for buffering is 500 events.
	- If enabled:
		1. Select the buffer type you want to set (**Memory** or **Disk**).
		1. Enter the buffer size and select the unit.

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/splunk_hec %}}

### How the destination works

#### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| None           | 1,000,000       | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: /observability_pipelines/destinations/#template-syntax