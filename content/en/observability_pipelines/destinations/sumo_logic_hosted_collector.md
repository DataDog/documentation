---
title: Sumo Logic Hosted Collector Destination
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' Sumo Logic destination to send logs to your Sumo Logic Hosted Collector.

## Setup

Configure this destination when you [set up a pipeline][3]. You can set up a pipeline in the [UI][1], using the [API][4], or with [Terraform][5]. The instructions in this section are for configuring the destination in the UI.

After you select the Sumo Logic destination in the pipeline UI:

- Enter the identifier for your endpoint URL. If you leave it blank, the [default](#secrets-defaults) is used.
  - **Note**: Only enter the identifier for the Sumo Logic endpoint URL. Do **not** enter the actual value.

#### Optional settings

1. In the **Encoding** dropdown menu, select whether you want to encode your pipeline's output in `JSON`, `Logfmt`, or `Raw` text. If no decoding is selected, the decoding defaults to JSON.
1. Enter a **source name** to override the default `name` value configured for your Sumo Logic collector's source.
1. Enter a **host name** to override the default `host` value configured for your Sumo Logic collector's source.
1. Enter a **category name** to override the default `category` value configured for your Sumo Logic collector's source.
1. Click **Add Header** to add any custom header fields and values.

##### Buffering options

{{% observability_pipelines/destination_buffer %}}

## Secrets defaults

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

| Maximum Events | Maximum Size (MB) | Timeout (seconds)   |
|----------------|-------------------|---------------------|
| None           | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: /observability_pipelines/configuration/set_up_pipelines/
[4]: /api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
