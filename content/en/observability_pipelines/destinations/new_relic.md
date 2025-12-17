---
title: New Relic Destination
disable_toc: false
---

Use Observability Pipelines' New Relic destination to send logs to New Relic.

## Setup

Set up the New Relic destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

<div class="alert alert-danger">Only enter the identifiers for the account ID and license. Do <b>not</b> enter the actual values.</div>

1.  Enter the identifier for your account ID. If you leave it blank, the [default](#set-secrets) is used.
1.  Enter the identifier for your license. If you leave it blank, the [default](#set-secrets) is used.
1. Select the data center region (**US** or **EU**) of your New Relic account.
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

- New Relic account ID identifier:
	- The default identifier is `DESTINATION_NEW_RELIC_ACCOUNT_ID`.
- New Relic license identifier:
	- The default identifier is `DESTINATION_NEW_RELIC_LICENSE_KEY`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/new_relic %}}

{{% /tab %}}
{{< /tabs >}}

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| 100            | 1,000,000       | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching