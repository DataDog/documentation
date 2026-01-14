---
title: Datadog CloudPrem Destination
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

Use Observability Pipelines' CloudPrem destination to send logs to Datadog CloudPrem.


## Prerequisites

Before configuring the destination, you need to deploy a CloudPrem cluster. Learn how to install it in the [CloudPrem installation section][3].

## Setup

Set up the CloudPrem destination and its environment variables when you [set up a pipeline][1].

### Set up the destination

Optionally, toggle the switch to enable **Buffering Options** (Preview).<br>**Note**: Contact your account manager to request access.
- If disabled (default): Up to 500 events are buffered before flush.
- If enabled:
	1. Select the buffer type you want to set.
		- **Memory**: Fast, limited by RAM
		- **Buffer size**: Durable, survives restarts
	1. Enter the buffer size and select the unit.
		- Maximum capacity in MB or GB.

{{< img src="observability_pipelines/destinations/cloudprem_settings.png" alt="The CloudPrem destination settings" style="width:35%;" >}}

### Set the environment variables

{{< img src="observability_pipelines/destinations/cloudprem_env_vars.png" alt="The install page showing the CloudPrem environment variable field" style="width:75%;" >}}

- CloudPrem endpoint URL
	- Observability Pipelines sends logs to the CloudPrem intake endpoint. Define the cluster URL, such as `http://cloudprem.acme.internal:7280`. **Note**: The URL must include the port.
	- The Worker appends `/api/v2/logs` and `/api/v1/validate` to the endpoint URL, so these endpoints must be allowed if you are using forwarding or firewall rules.
  - Stored as the environment variable: `DD_OP_DESTINATION_CLOUDPREM_ENDPOINT_URL`.

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| 1,000          | 4,250,000       | 5                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: /cloudprem/install/
