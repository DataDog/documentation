---
title: OpenTelemetry Traces Destination
disable_toc: false
products:
- name: Traces
  icon: apm
  url: /observability_pipelines/configuration/?tab=traces#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' OpenTelemetry Traces destination to send traces to an OpenTelemetry (OTel) Collector.

**Note**: You must use an OpenTelemetry source to use the OpenTelemetry Traces destination.

## Set up destination

<div class="alert alert-danger">For Secrets Management: Only enter the identifier for the HTTP/S Client URI and, if applicable, the TLS key pass. Do <b>not</b> enter the actual values.</div>

Configure the OpenTelemetry Traces destination when you [set up a pipeline][3]. You can set up a pipeline in the [UI][1], using the [API][4], or with [Terraform][5]. The steps in this section are configured in the UI.

After you select the OpenTelemetry Traces destination in the pipeline UI, enter the identifier for your HTTP/S Client URI Key. An example of the URI endpoint the identifier references: `http://localhost:4319/v1/traces`. If you leave the identifier field blank, the [default](#secret-defaults) is used.

{{% observability_pipelines/secrets_env_var_note %}}

### Optional settings

#### Enable TLS

{{% observability_pipelines/tls_settings %}}

#### Buffering

{{% observability_pipelines/destination_buffer %}}

## Allow out-of-order samples

The Worker doesn't always send metrics in the correct order for a given series because it doesn't reorder metrics. For example, if the first batch of metrics contains metrics with timestamps: `10:03`, `10:04`, `10:05` and the second batch contains metrics with timestamps: `10:01`, `10:02`, `10:06`, the Worker does not reorder those metrics before sending them out.

Because the OTLP receiver rejects out-of-order samples, the Worker logs a Bad Request (`400`) error and the entire second batch of metrics gets dropped, even if the OTLP receiver accepted some of the valid metrics in the batch.

Datadog recommends setting your OTLP receiver to allow out-of-order samples to prevent out-of-order samples from getting dropped.

## Troubleshooting

### Debug error logs

If you see `400` or `500` error logs from this destination, you can enable debug logs to see the response returned by the server. To enable logs for this HTTP-based destination only and not every Worker module, set `VECTOR_LOG` to `info,vector::sinks::util::http=debug`:Expand commentComment on line R62Resolved

```
docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
   -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
   -e VECTOR_LOG=info,vector::sinks::util::http=debug \
   datadog/observability-pipelines-worker run
```

See [Enable debug logs][6] for instruction on enabling full debug logs.

## Secret defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- HTTP/S Client URI endpoint identifier:
  - References the HTTP/S URI endpoint to which the Worker sends OpenTelemetry data. An example of the URI endpoint the identifier references: `http://localhost:4319/v1/traces`.
	- The default identifier is `DESTINATION_OTEL_HTTP_CLIENT_URI`.
- OpenTelemetry Traces TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `DESTINATION_OTEL_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opentelemetry_traces %}}

{{% /tab %}}
{{< /tabs >}}

[1]: https://app.datadoghq.com/observability-pipelines
[3]: /observability_pipelines/configuration/set_up_pipelines/
[4]: /api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /observability_pipelines/monitoring_and_troubleshooting/troubleshooting/#enable-debug-logs
