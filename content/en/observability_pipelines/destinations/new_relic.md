---
title: New Relic Destination
disable_toc: false
---

Use Observability Pipelines' New Relic destination to send logs to New Relic.

## Setup

Set up the New Relic destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

<div class="alert alert-danger">Only enter the identifiers for the account ID and license. Do <b>not</b> enter the actual values.</div>

1.  Enter the identifier for your account ID.
	- If left blank, the default is used: `DESTINATION_NEW_RELIC_ACCOUNT_ID`.
1.  Enter the identifier for your license.
	- If left blank, the default is used: `DESTINATION_NEW_RELIC_LICENSE_KEY`.
1. Select the data center region (**US** or **EU**) of your New Relic account.
1. Optionally, toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
	- If left disabled, the maximum size for buffering is 500 events.
	- If enabled:
		1. Select the buffer type you want to set (**Memory** or **Disk**).
		1. Enter the buffer size and select the unit.

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