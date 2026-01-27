---
title: OpenSearch Destination
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

Use Observability Pipelines' OpenSearch destination to send logs to OpenSearch.

## Setup

Set up the OpenSearch destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

<div class="alert alert-danger">Only enter the identifiers for the OpenSearch endpoint URL, username, and password. Do <b>not</b> enter the actual values.</div>

1. Enter the identifier for your OpenSearch endpoint URL. If you leave it blank, the [default](#set-secrets) is used.
1. Enter the identifier for your OpenSearch username. If you leave it blank, the [default](#set-secrets) is used.
1. Enter the identifier for your OpenSearch password. If you leave it blank, the [default](#set-secrets) is used.
1. Optionally, Enter the name of the OpenSearch index. See [template syntax][3] if you want to route logs to different indexes based on specific fields in your logs.
{{% observability_pipelines/destination_buffer_numbered %}}

### Set secrets

{{% observability_pipelines/set_secrets_intro %}}

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