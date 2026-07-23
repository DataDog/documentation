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

Configure the Sumo Logic destination when you [set up a pipeline][3]. You can set up a pipeline in the [UI][1], using the [API][4], or with [Terraform][5]. The steps in this section are configured in the UI.

<div class="alert alert-danger">For Secrets Management: Only enter the identifier for the endpoint URL. Do <b>not</b> enter the actual value.</div>

{{% observability_pipelines/secrets_env_var_note %}}

After you select the Sumo Logic destination in the pipeline UI, enter the identifier for your endpoint URL. If you leave it blank, the [default](#secret-defaults) is used.

### Optional settings

1. In the {{< ui >}}Encoding{{< /ui >}} dropdown menu, select whether you want to encode your pipeline's output in `JSON`, `Logfmt`, or `Raw` text. If no decoding is selected, the decoding defaults to JSON.
1. Enter a {{< ui >}}source name{{< /ui >}} to override the default `name` value configured for your Sumo Logic collector's source.
1. Enter a {{< ui >}}host name{{< /ui >}} to override the default `host` value configured for your Sumo Logic collector's source.
1. Enter a {{< ui >}}category name{{< /ui >}} to override the default `category` value configured for your Sumo Logic collector's source.
1. Click {{< ui >}}Add Header{{< /ui >}} to add any custom header fields and values.

#### Buffering options

{{% observability_pipelines/destination_buffer %}}

## Secret defaults

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

## Metrics

For [component metrics][6] and [destination buffer metrics][7] emitted by all destinations, see the [Pipelines Usage Metrics][8] documentation. To filter or group by Sumo Logic destination metrics, use the tag `component_type:sumo_logic`.

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
[6]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[8]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
