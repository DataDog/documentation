---
title: OpenTelemetry Destination
description: Learn how to send metrics to an OpenTelemetry Collector or OTLP-compatible endpoint using the Observability Pipelines Worker.
disable_toc: false
code_lang: metrics
type: multi-code-lang
weight: 1
---

## Overview

Use Observability Pipelines' {{< tooltip text=" OpenTelemetry destination" tooltip="Contact your account manager to request access." >}} to send metrics over HTTP/S to an OpenTelemetry (OTel) Collector or another OpenTelemetry Protocol (OTLP)-compatible endpoint.

## Set up destination

<div class="alert alert-danger">For Secrets Management: Only enter the identifier for the HTTP/S Client URI and, if applicable, the TLS key pass. Do <b>not</b> enter the actual values.</div>

Configure the OpenTelemetry destination when you [set up a pipeline][3]. You can set up a pipeline in the [UI][1], using the [API][4], or with [Terraform][5]. The steps in this section are configured in the UI.

After you select the OpenTelemetry destination in the pipeline UI, enter the identifier for your HTTP/S Client URI. An example of the HTTP/S URI endpoint that the identifier references: `http://localhost:4319/v1/metrics`. If you leave the identifier field blank, the [default](#secret-defaults) is used.

**Notes**:
- The Worker can only send counter, gauge, and histogram metrics to OpenTelemetry. OpenTelemetry does not support other metrics types, so the Worker drops them. See [Filter out unsupported metrics](#filter-out-unsupported-metrics) for more information.
- Datadog recommends setting your OTLP receiver to allow out-of-order samples because the Worker doesn't reorder metrics and some OTLP receivers reject out-of-order samples. See [Allow out-of-order samples](#allow-out-of-order-samples) for more information.
- If you enter secret identifiers and then choose to use environment variables, the environment variable is the identifier entered and prepended with `DD_OP_`. For example, if you entered `PASSWORD_1` for a password identifier, the environment variable for that password is `DD_OP_PASSWORD_1`.

### Optional settings

#### Enable TLS

{{% observability_pipelines/tls_settings %}}

#### Buffering

{{% observability_pipelines/destination_buffer %}}

## Filter out unsupported metrics

The Worker can only send counter, gauge, and histogram metrics to OpenTelemetry. The following Datadog metrics are not supported because they cannot be converted to OTLP format:

- StatsD-type metrics
- Distribution metrics
- Sketch metrics

If one of these metrics is in a batch to be encoded and sent to OpenTelemetry, the Worker drops the unsupported metric, logs an error, and updates the `component_error_total` metric. Datadog recommends using a [filter processor][9] to filter out unsupported metric types.

## Allow out-of-order samples

The Worker doesn't always send metrics in the correct order for a given series because it doesn't reorder metrics. For example, if the first batch of metrics contains metrics with timestamps: `10:03`, `10:04`, `10:05` and the second batch contains metrics with timestamps: `10:01`, `10:02`, `10:06`, the Worker does not reorder those metrics before sending them out.

Because some OTLP receivers, such as the Prometheus OTLP receiver, reject out-of-order samples, the second batch of metrics gets rejected by the receiver. As a result, the Worker logs a Bad Request (`400`) error and the entire batch that was rejected gets dropped, even if the OTLP receiver accepted some of the valid metrics in the batch.

Datadog recommends setting your OTLP receiver to allow out-of-order samples to prevent out-of-order samples from getting dropped.

## Secret defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- HTTP/S Client URI endpoint identifier
  - References the HTTP/S URI endpoint to which the Worker sends OpenTelemetry data. An example of the HTTP/S URI endpoint that the identifier references: `http://localhost:4319/v1/metrics`.
  - The default identifier is `DESTINATION_OTEL_HTTP_CLIENT_URI`.
- HTTP/S Client TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `DESTINATION_OTEL_HTTP_CLIENT_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opentelemetry_metrics %}}

{{% /tab %}}
{{< /tabs >}}

## Metrics

For [component metrics][6] and [destination buffer metrics][7] emitted by all destinations, see the [Pipelines Usage Metrics][8] documentation. To filter or group by OpenTelemetry destination metrics, use the tag `component_type:opentelemetry`.

## How the destination works

### Event batching

A batch of events is flushed when one of these conditions occurs. See [event batching][2] for more information.

| Maximum Events | Maximum Size (MB) | Timeout (seconds)   |
|----------------|-------------------|---------------------|
| N/A            | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: /observability_pipelines/configuration/set_up_pipelines/
[4]: /api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[8]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[9]: /observability_pipelines/processors/filter/
