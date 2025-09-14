---
title: Datadog CloudPrem Destination
disable_toc: false
---

Use Observability Pipelines' CloudPrem destination to send logs to Datadog CloudPrem.


## Prerequisites

Before configuring the destination, you need to deploy a CloudPrem cluster. Learn how to install it in our [dedicated installation section](/cloudprem/install).

## Setup

Set up the CloudPrem destination and its environment variables when you [set up a pipeline][1].

### Set up the destination

Optionally, toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options are in Preview. Contact your account manager to request access.
	- If left disabled, the maximum size for buffering is 500 events.
	- If enabled:
		1. Select the buffer type you want to set (**Memory** or **Disk**).
		1. Enter the buffer size and select the unit.

### Set the environment variables

- CloudPrem endpoint URL
	- Observability Pipelines sends logs to the CloudPrem intake endpoint. Define the cluster URL such as s `http://cloudprem.acme.internal:7280`. **Note**: The URL must include the port.
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
