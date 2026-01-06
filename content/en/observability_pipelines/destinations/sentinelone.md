---
title: SentinelOne Destination
disable_toc: false
further_reading:
- link: "https://www.datadoghq.com/blog/observability-pipelines-sentinelone/"
  tag: "blog"
  text: "Optimize EDR logs and route them to SentinelOne with Observability Pipelines"
products:
- name: Logs
  icon: logs
---

{{< product-availability >}}

Use Observability Pipelines' SentinelOne destination to send logs to SentinelOne.

## Setup

Set up the SentinelOne destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

1. Select your SentinelOne logs environment in the dropdown menu.
1. Optionally, toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
	- If left disabled, the maximum size for buffering is 500 events.
	- If enabled:
		1. Select the buffer type you want to set (**Memory** or **Disk**).
		1. Enter the buffer size and select the unit.

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sentinelone %}}

## View logs in a SentinelOne cluster

After you've set up the pipeline to send logs to the SentinelOne destination, you can view the logs in a SentinelOne cluster:

1. Log into the [S1 console][2].
2. Navigate to the Singularity Data Lake (SDL)  "Search" page. To access it from the console, click on "Visibility" on the left menu to go to SDL, and make sure you're on the "Search" tab.
3. Make sure the filter next to the search bar is set to **All Data**.
4. This page shows the logs you sent from Observability Pipelines to SentinelOne.

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][3] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| None           | 1,000,000       | 1                   |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: https://usea1-partners.sentinelone.net/login
[3]: /observability_pipelines/destinations/#event-batching