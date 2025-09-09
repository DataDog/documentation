---
title: CloudPrem Destination
disable_toc: false
---

Use Observability Pipelines' CloudPrem destination to send logs to Datadog CloudPrem.

## Setup

Set up the CloudPRem destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

1. Optionally, toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
	- If left disabled, the maximum size for buffering is 500 events.
	- If enabled:
		1. Select the buffer type you want to set (**Memory** or **Disk**).
		1. Enter the buffer size and select the unit.

### Set the environment variables

- CloudPrem endpoint URL
	- Observability Pipelines sends logs to this CloudPrem endpoint, such as `http://cloudprem.acme.internal:7280`. **Note**: The URL must include the port
    - Stored as the environment variable: `DD_OP_DESTINATION_CLOUDPREM_ENDPOINT_URL`.

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| 1,000          | 4,250,000       | 5                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching