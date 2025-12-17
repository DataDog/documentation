---
title: OpenSearch Destination
disable_toc: false
---

Use Observability Pipelines' OpenSearch destination to send logs to OpenSearch.

## Setup

Set up the OpenSearch destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

<div class="alert alert-danger">Only enter the identifiers for the OpenSearch endpoint URL, username, and password. Do <b>not</b> enter the actual values.</div>

1. Enter the identifier for your OpenSearch endpoint URL. If you leave it blank, the [default](#set-secrets) is used.
1. Enter the identifier for your OpenSearch username. If you leave it blank, the [default](#set-secrets) is used.
1. Enter the identifier for your OpenSearch password. If you leave it blank, the [default](#set-secrets) is used.
1. (Optional) Enter the name of the OpenSearch index. See [template syntax][3] if you want to route logs to different indexes based on specific fields in your logs.
1. (Optional) Toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
	- If left disabled, the maximum size for buffering is 500 events.
	- If enabled:
		1. Select the buffer type you want to set (**Memory** or **Disk**).
		1. Enter the buffer size and select the unit.

### Set secrets

The following are the defaults used for secret identifiers and environment variables.

**Note**: If you entered identifiers for yours secrets and then choose to use environment variables, the environment variable is the identifier entered prepended with `DD_OP`. For example, if you entered `PASSWORD_1` for the a password identifier, the environment variable for the password is `DD_OP_PASSWORD_1`.

{{< tabs >}}
{{% tab "Secrets Management" %}}

- OpenSearch endpoint URL identifier:
	- The default identifier is `DESTINATION_OPENSEARCH_ENDPOINT_URL`.
- OpenSearch authentication username identifier:
	- The default identifier is `DESTINATION_OPENSEARCH_USERNAME`.
- OpenSearch authentication password identifier:
	- The default identifier is `DESTINATION_OPENSEARCH_PASSWORD`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opensearch %}}

{{% /tab %}}
{{< /tabs >}}

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| None           | 10,000,000      | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: /observability_pipelines/destinations/#template-syntax