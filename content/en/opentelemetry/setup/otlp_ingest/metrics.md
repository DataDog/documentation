---
title: Datadog OTLP Metrics Intake Endpoint
aliases:
  - "/opentelemetry/otlp_metrics"
  - "/opentelemetry/setup/intake_endpoint/otlp_metrics"
  - /opentelemetry/setup/agentless/metrics
further_reading:
  - link: "https://opentelemetry.io/docs/concepts/sdk-configuration/general-sdk-configuration/"
    tag: "External Site"
    text: "General OpenTelemetry SDK Configuration"
  - link: "https://opentelemetry.io/docs/reference/specification/sdk-environment-variables/"
    tag: "External Site"
    text: "OpenTelemetry Environment Variable Spec"
  - link: "https://opentelemetry.io/docs/specs/otel/protocol/exporter/"
    tag: "External Site"
    text: "OpenTelemetry Protocol Exporter"
  - link: "https://opentelemetry.io/docs/specs/otel/metrics/sdk_exporters/otlp/ "
    tag: "External Site"
    text: "OTLP Metrics Exporter"
  - link: "/opentelemetry/guide/otlp_delta_temporality/"
    tag: "Documentation"
    text: "Configure delta temporality in OpenTelemetry"
  - link: "/metrics/otlp/?tab=summary#mapping"
    tag: "Documentation"
    text: "OTLP Metrics Mapping in Datadog"
  - link: "https://www.datadoghq.com/blog/otlp-metrics-api/"
    tag: "Blog"
    text: "Ingest OTLP metrics directly into Datadog with the new OTLP Metrics API"
site_support_id: otlp_agentless
---

## Overview

Datadog's OpenTelemetry Protocol (OTLP) metrics intake API endpoint allows you to send metrics directly to Datadog. With this feature, you don't need to run the [Datadog Agent][2] or [OpenTelemetry Collector + Datadog Exporter][1].

You might prefer this option if you're looking for a straightforward setup and want to send metrics directly to Datadog without using the Datadog Agent or OpenTelemetry Collector.

This endpoint is particularly useful in the following scenarios:

- **OpenTelemetry distributions without Datadog Exporter support**: Some OpenTelemetry distributions, such as the [AWS Distro for OpenTelemetry (ADOT)][8], have removed vendor-specific exporters in favor of a unified OTLP exporter. The OTLP metrics endpoint enables these distributions to send metrics directly to Datadog seamlessly.

- **Technical constraints using the Datadog Exporter or Agent**: Ideal for scenarios where installing additional software is impractical or restrictive, such as third-party managed services (for example, Vercel), applications on customer devices, or environments requiring streamlined, Agentless observability pipelines. The OTLP metrics endpoint enables direct OTLP metric ingestion in these scenarios.

<div class="alert alert-danger">Host metadata sent to this endpoint will not populate the <a href="/infrastructure/list/">Infrastructure Host List</a>.</div>

## Configuration

To export OTLP metrics data to the Datadog OTLP metrics intake endpoint:

1. [Ensure only delta metrics are sent](#ensure-only-delta-metrics-are-sent).
1. [Configure the OTLP HTTP exporter](#configure-the-exporter).
   - Set the Datadog OTLP metrics intake endpoint.
   - Configure the required HTTP headers.
1. (Optional) [Set the `dd-otel-metric-config` HTTP header](#optional-configure-the-metric-translator) to configure the metric translator behavior.

### Configure the exporter

To send OTLP data to the Datadog OTLP metrics intake endpoint, use the OTLP HTTP exporter. For metrics, the exporter supports both HTTP Protobuf and HTTP JSON. HTTP Protobuf is recommended for better performance.

The process differs depending on whether you're using automatic or manual instrumentation for OpenTelemetry.

<div class="alert alert-info">Based on your <a href="/getting_started/site/">Datadog site</a>, which is {{< region-param key=dd_datacenter code="true" >}}: Replace your endpoint with {{< region-param key="otlp_metrics_endpoint" code="true" >}} in the following examples.</div>

#### Ensure only delta metrics are sent

The Datadog OTLP metrics intake endpoint accepts only **delta** metrics. If you attempt to send **cumulative** metrics (the default in most SDKs), you will receive an error. Make sure to configure your OpenTelemetry SDK or Collector to produce delta metrics.

- For [supported languages][7], set the `OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE` environment variable to `delta`.
- Otherwise, set the temporality preference in your code. For more information, read [Configure delta temporality in OpenTelemetry][5].

#### Automatic instrumentation

If you are using [OpenTelemetry automatic instrumentation][3], set the following environment variables:

```shell
export OTEL_EXPORTER_OTLP_METRICS_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_METRICS_ENDPOINT="{{< region-param key="otlp_metrics_endpoint" >}}"
export OTEL_EXPORTER_OTLP_METRICS_HEADERS="dd-api-key=${DD_API_KEY}"
export OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE="delta"
```

#### Manual instrumentation

If you are using manual instrumentation with OpenTelemetry SDKs, configure the OTLP HTTP Protobuf exporter programmatically.

{{< tabs >}}
{{% tab "JavaScript" %}}

The JavaScript exporter is [`@opentelemetry/exporter-metrics-otlp-proto`][100]. To configure the exporter, use the following code snippet:

```javascript
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-proto');

const exporter = new OTLPMetricExporter({
  url: 'https://otlp.datadoghq.com/v1/metrics',
  temporalityPreference: AggregationTemporalityPreference.DELTA, // Ensure delta temporality
  headers: {
    'dd-api-key': process.env.DD_API_KEY,
    'dd-otel-metric-config': '{"resource_attributes_as_tags": true}',
  },
});
```

[100]: https://www.npmjs.com/package/@opentelemetry/exporter-metrics-otlp-proto

{{% /tab %}}

{{% tab "Java" %}}

The Java exporter is [`OtlpHttpMetricExporter`][200]. To configure the exporter, use the following code snippet:

```java
import io.opentelemetry.exporter.otlp.http.metrics.OtlpHttpMetricExporter;

OtlpHttpMetricExporter exporter = OtlpHttpMetricExporter.builder()
    .setEndpoint("https://otlp.datadoghq.com/v1/metrics")
    .setAggregationTemporalitySelector(
      AggregationTemporalitySelector.deltaPreferred()) // Ensure delta temporality
    .addHeader("dd-api-key", System.getenv("DD_API_KEY"))
    .addHeader("dd-otel-metric-config", "{\"resource_attributes_as_tags\": true}")
    .build();
```

[200]: https://javadoc.io/doc/io.opentelemetry/opentelemetry-exporter-otlp-http-metrics/

{{% /tab %}}

{{% tab "Go" %}}

The Go exporter is [`otlpmetrichttp`][300]. To configure the exporter, use the following code snippet:

```go
import "go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetrichttp"

metricExporter, err := otlpmetrichttp.New(
  ctx,
  otlpmetrichttp.WithEndpoint("otlp.datadoghq.com"),
  otlpmetrichttp.WithURLPath("/v1/metrics"),
      otlpmetrichttp.WithTemporalitySelector(deltaSelector), // Ensure delta temporality
  otlpmetrichttp.WithHeaders(
    map[string]string{
      "dd-api-key": os.Getenv("DD_API_KEY"),
      "dd-otel-metric-config": "{\"resource_attributes_as_tags\": true}",
    }),
)
```

[300]: https://pkg.go.dev/go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetrichttp

{{% /tab %}}

{{% tab "Python" %}}

The Python exporter is [`OTLPMetricExporter`][400]. To configure the exporter, use the following code snippet:

```python
from opentelemetry.exporter.otlp.proto.http.metric_exporter import OTLPMetricExporter

exporter = OTLPMetricExporter(
    endpoint="https://otlp.datadoghq.com/v1/metrics",
    preferred_temporality=deltaTemporality, # Ensure delta temporality
    headers={
        "dd-api-key": os.environ.get("DD_API_KEY"),
        "dd-otel-metric-config": '{"resource_attributes_as_tags": true}',
    },
)
```

[400]: https://pypi.org/project/opentelemetry-exporter-otlp-proto-http/

{{% /tab %}}
{{< /tabs >}}

### (Optional) Configure the metric translator

Use the `dd-otel-metric-config` header to configure how metrics are translated and sent to Datadog. The JSON header contains the following fields:

`resource_attributes_as_tags`
: **Type**: Boolean <br>
**Default**: `false` <br>
If set to `true`, transforms all resource attributes into metric labels, which are then converted into tags.

`instrumentation_scope_metadata_as_tags`
: **Type**: Boolean <br>
**Default**: `false` <br>
If set to `true`, adds the name and version of the instrumentation scope that created a metric to the metric tags.

`histograms.mode`
: **Type**: String <br>
Mode for exporting histograms. Valid values are:
  - `distributions`: sends histograms as Datadog distributions (recommended).
  - `counters`: sends histograms as Datadog counts, one metric per bucket.
  - `nobuckets`: sends no bucket histogram metrics.

`histograms.send_aggregation_metrics`
: **Type**: Boolean <br>
If set to `true`, writes additional `.sum`, `.count`, `.min`, and `.max` metrics for histograms.

`summaries.mode`
: **Type**: String <br>
Mode for exporting OTLP summaries. Valid values are:
  - `noquantiles`: sends no `.quantile` metrics. `.sum` and `.count` metrics are still sent.
  - `gauges`: sends `.quantile` metrics as gauges tagged by the quantile.

For example:

```json
{
  "resource_attributes_as_tags": true,
  "instrumentation_scope_metadata_as_tags": true,
  "histograms": {
    "mode": "distributions",
    "send_aggregation_metrics": true
  },
  "summaries": {
    "mode": "gauges"
  }
}
```

## OpenTelemetry Collector

If you are using an OpenTelemetry Collector distribution that doesn't support the Datadog Exporter, you can configure the [`otlphttpexporter`][4] to export metrics to the Datadog OTLP metrics intake endpoint.

For example, your `config.yaml` file would look like this:

```yaml
...
exporters:
  otlphttp:
    metrics_endpoint: {{< region-param key="otlp_metrics_endpoint" >}}
    headers:
      dd-api-key: ${env:DD_API_KEY}
      dd-otel-metric-config: '{"resource_attributes_as_tags": true}'
...

service:
  pipelines:
    metrics:
      receivers: [otlp]
      processors: [batch, cumulativetodelta]
      exporters: [otlphttp]
```
<div class="alert alert-info">The <code>cumulativetodelta</code> processor in the pipeline converts cumulative metrics to delta metrics. Delta metrics are required for the OTLP metrics intake endpoint. For more information, see <a href="/opentelemetry/guide/otlp_delta_temporality/">Configure delta temporality in OpenTelemetry</a>.</div>

## Troubleshooting

### Error: 403 Forbidden

If you receive a `403 Forbidden` error when sending metrics to the Datadog OTLP metrics intake endpoint, it indicates one of the following issues:

- The endpoint URL is incorrect for your organization.  
   **Solution**: Use the correct endpoint URL for your organization. Your site is {{< region-param key=dd_datacenter code="true" >}}, so you need to use the {{< region-param key="otlp_metrics_endpoint" code="true" >}} endpoint.

### Error: 413 Request Entity Too Large

If you receive a `413 Request Entity Too Large` error when sending metrics to the Datadog OTLP metrics intake endpoint, it indicates that the payload size sent by the OTLP exporter exceeds the Datadog metrics intake endpoint's limit of 500KB for uncompressed payloads, or 5MB for compressed payloads after decompression.

This error usually occurs when the OpenTelemetry SDK batches too much telemetry data in a single request payload.

**Solution**: Reduce the export batch size of the SDK's batch processor. For example, in the OpenTelemetry Java SDK, you can adjust `BatchMetricExportProcessor`.

### Issue: Missing datapoints or lower than expected metric values

If you notice missing datapoints or lower than expected metric values, it may be because you are sending multiple datapoints for a metric that have the same timestamp (in seconds) and same dimensions. In such cases, Datadog only accepts the last datapoint, and previous datapoints are dropped (last-write-wins). Datadog requires the timeseries data of a metric to be unique in the context of {timestamp + dimensions}.

**Solution**: Ensure that your datapoints of a given metric at one timestamp are uniquely tagged. For example, if you send multiple datapoints for a metric simultaneously from multiple AWS Lambda invocations, make sure to include unique identifiers (such as the Lambda ARN) as resource attributes in your metrics. Use the `resource_attributes_as_tags` option to add these resource attributes as metric tags.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/collector_exporter/
[2]: /opentelemetry/otlp_ingest_in_the_agent/
[3]: https://opentelemetry.io/docs/reference/specification/glossary/#automatic-instrumentation
[4]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/exporter/otlphttpexporter
[5]: /opentelemetry/guide/otlp_delta_temporality/
[6]: /metrics/otlp/?tab=summary#mapping
[7]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/spec-compliance-matrix.md#environment-variables
[8]: https://aws-otel.github.io/docs/getting-started/lambda
