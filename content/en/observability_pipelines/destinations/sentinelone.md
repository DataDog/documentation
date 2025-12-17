---
title: SentinelOne Destination
disable_toc: false
further_reading:
- link: "https://www.datadoghq.com/blog/observability-pipelines-sentinelone/"
  tag: "blog"
  text: "Optimize EDR logs and route them to SentinelOne with Observability Pipelines"
---

Use Observability Pipelines' SentinelOne destination to send logs to SentinelOne.

## Setup

Set up the SentinelOne destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

<div class="alert alert-danger">Only enter the identifier for the token. Do <b>not</b> enter the actual value.</a></div>

1. Enter the identifier for your token. If you leave it blank, the [default](#set-secrets) is used.
1. Select your SentinelOne logs environment in the dropdown menu.
1. Optionally, toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
	- If left disabled, the maximum size for buffering is 500 events.
	- If enabled:
		1. Select the buffer type you want to set (**Memory** or **Disk**).
		1. Enter the buffer size and select the unit.

### Set secrets

The following are the defaults used for secret identifiers and environment variables.

**Note**: If you entered identifiers for yours secrets and then choose to use environment variables, the environment variable is the identifier entered prepended with `DD_OP`. For example, if you entered `PASSWORD_1` for the a password identifier, the environment variable for the password is `DD_OP_PASSWORD_1`.

{{< tabs >}}
{{% tab "Secrets Management" %}}

- SentinelOne write access token identifier:
	- The default identifier is `DESTINATION_SENTINEL_ONE_TOKEN`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sentinelone %}}

{{% /tab %}}
{{< /tabs >}}

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