---
title: Sumo Logic Hosted Collector Destination
disable_toc: false
products:
- name: Logs
  icon: logs
---

{{< product-availability >}}

Use Observability Pipelines' Sumo Logic destination to send logs to your Sumo Logic Hosted Collector.

## Setup

Set up the Sumo Logic destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

<div class="alert alert-danger">Only enter the identifier for the Sumo Logic endpoint URL. Do <b>not</b> enter the actual value.</div>

- Enter the identifier for your endpoint URL. If you leave it blank, the [default](#set-secrets) is used.

#### Optional settings

1. In the **Encoding** dropdown menu, select whether you want to encode your pipeline's output in `JSON`, `Logfmt`, or `Raw` text. If no decoding is selected, the decoding defaults to JSON.
1. Enter a **source name** to override the default `name` value configured for your Sumo Logic collector's source.
1. Enter a **host name** to override the default `host` value configured for your Sumo Logic collector's source.
1. Enter a **category name** to override the default `category` value configured for your Sumo Logic collector's source.
1. Click **Add Header** to add any custom header fields and values.
1. Optionally, toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
	- If left disabled, the maximum size for buffering is 500 events.
	- If enabled:
		1. Select the buffer type you want to set (**Memory** or **Disk**).
		1. Enter the buffer size and select the unit.

### Set secrets

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Sumo Logic HTTP Collector URL identifier:
	- References the Sumo Logic HTTP Source endpoint. The Observability Pipelines Worker sends processed logs to this endpoint. For example, `https://<ENDPOINT>.collection.sumologic.com/receiver/v1/http/<UNIQUE_HTTP_COLLECTOR_CODE>`, where:   
        - `<ENDPOINT>` is your Sumo collection endpoint.
        - `<UNIQUE_HTTP_COLLECTOR_CODE>` is the string that follows the last forward slash (`/`) in the upload URL for the HTTP source.
	- The default identifier is `DESTINATION_SUMO_LOGIC_HTTP_COLLECTOR_URL`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sumo_logic %}}

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