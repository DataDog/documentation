---
title: Prometheus Destination
disable_toc: false
products:
- name: Metrics
  icon: metrics
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' Prometheus destination to send metrics to Prometheus.

## Set up destination

<div class="alert alert-danger">For Secrets Management: Only enter the identifiers for the endpoint URL and, if applicable, the username and password for basic authorization, the bearer token, and the TLS key pass. Do <b>not</b> enter the actual values.</div>

Configure the Prometheus destination when you [set up a pipeline][3]. You can set up a pipeline in the [UI][1], using the [API][4], or with [Terraform][5]. The steps in this section are configured in the UI.

After you select the Prometheus destination in the pipeline UI:

1. Enter the identifier for your {{< ui >}}Remote Write Endpoint URL{{< /ui >}}, such as `http://localhost:9090/api/v1/write`. If you leave it blank, the [default](#secret-defaults) is used.
1. Select your authorization strategy ({{< ui >}}None{{< /ui >}}, {{< ui >}}Basic{{< /ui >}}, or {{< ui >}}Bearer{{< /ui >}}). If you selected:
    - {{< ui >}}Basic{{< /ui >}}: Enter the identifier for your username and password. If you leave it blank, the [default](#secret-defaults) is used.
    - {{< ui >}}Bearer{{< /ui >}}: Enter the identifier for your bearer token. If you leave it blank, the [default](#secret-defaults) is used.

{{% observability_pipelines/secrets_env_var_note %}}

### Optional settings

#### Default namespace

Enter the default namespace for any metrics sent. This namespace is only used if a metric has no existing namespace. It is added as a prefix to the metric name, separated by an underscore (`_`). The namespace must follow the Prometheus naming convention.

#### Tenant ID

Enter the tenant ID to add to outgoing requests. This field supports [template syntax][6], but the template must have a literal prefix, such as `prefix-{{ tenant_id }}` or `prefix/{{ tenant_id }}`. A template that doesn't have a literal prefix, such as `{{ tenant_id }}`, is rejected.

#### Enable TLS

{{% observability_pipelines/tls_settings %}}
- (Optional) Enter the server name to use for certificate validation. If left blank, the hostname from the endpoint URL is used.

#### Buffering

{{% observability_pipelines/destination_buffer %}}

## Allow out-of-order samples

The Worker doesn't always send metrics in the correct order for a given series because it doesn't reorder metrics. For example, if the first batch of metrics contains metrics with timestamps: `10:03`, `10:04`, `10:05` and the second batch contains metrics with timestamps: `10:01`, `10:02`, `10:06`, the Worker does not reorder those metrics before sending them out.

Because the Prometheus OTLP receiver rejects out-of-order samples, the Worker logs a Bad Request (`400`) error and the entire second batch of metrics gets dropped, even if the OTLP receiver accepted some of the valid metrics in the batch.

Datadog recommends setting your OTLP receiver to allow out-of-order samples to prevent out-of-order samples from getting dropped.

## Troubleshooting

### Debug error logs

If you see `400` or `500` error logs from this destination, you can enable debug logs to see the response returned by the server. To enable logs for this HTTP-based destination only and not every Worker module, set `VECTOR_LOG` to `info,vector::sinks::util::http=debug`:

```
docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
   -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
   -e VECTOR_LOG=info,vector::sinks::util::http=debug \
   datadog/observability-pipelines-worker run
```

See [Enable debug logs][8] for instruction on enabling full debug logs.

## Secret defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Prometheus endpoint URL identifier:
	- The default identifier is `DESTINATION_PROMETHEUS_ENDPOINT`.
- Prometheus TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `DESTINATION_PROMETHEUS_KEY_PASS`.
- If you are using basic authentication:
	- Prometheus username identifier:
		- The default identifier is `DESTINATION_PROMETHEUS_USERNAME`.
	- Prometheus password identifier:
		- The default identifier is `DESTINATION_PROMETHEUS_PASSWORD`.
- If you are using bearer authentication:
	- Prometheus bearer token identifier:
		- The default identifier is `DESTINATION_PROMETHEUS_BEARER_TOKEN`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/prometheus %}}

{{% /tab %}}
{{< /tabs >}}

[1]: https://app.datadoghq.com/observability-pipelines
[3]: /observability_pipelines/configuration/set_up_pipelines/
[4]: /api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /observability_pipelines/destinations/#template-syntax
[8]: /observability_pipelines/monitoring_and_troubleshooting/troubleshooting/#enable-debug-logs
