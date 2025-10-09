---
title: Datadog OTLP Metrics Intake Endpoint
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Send OpenTelemetry Data to Datadog > Datadog
  OTLP Intake Endpoint > Datadog OTLP Metrics Intake Endpoint
---

# Datadog OTLP Metrics Intake Endpoint

{% callout %}
# Important note for users on the following Datadog sites: app.ddog-gov.com

{% alert level="warning" %}
This product is not supported for your selected [Datadog site](http://localhost:1313/getting_started/site). ().
{% /alert %}

{% /callout %}

## Overview{% #overview %}

Datadog's OpenTelemetry Protocol (OTLP) metrics intake API endpoint allows you to send metrics directly to Datadog. With this feature, you don't need to run the [Datadog Agent](http://localhost:1313/opentelemetry/otlp_ingest_in_the_agent/) or [OpenTelemetry Collector + Datadog Exporter](http://localhost:1313/opentelemetry/collector_exporter/).

You might prefer this option if you're looking for a straightforward setup and want to send metrics directly to Datadog without using the Datadog Agent or OpenTelemetry Collector.

This endpoint is particularly useful in the following scenarios:

- **OpenTelemetry distributions without Datadog Exporter support**: Some OpenTelemetry distributions, such as the [AWS Distro for OpenTelemetry (ADOT)](https://aws-otel.github.io/docs/getting-started/lambda), have removed vendor-specific exporters in favor of a unified OTLP exporter. The OTLP metrics endpoint enables these distributions to send metrics directly to Datadog seamlessly.

- **Technical constraints using the Datadog Exporter or Agent**: Ideal for scenarios where installing additional software is impractical or restrictive, such as third-party managed services (for example, Vercel), applications on customer devices, or environments requiring streamlined, Agentless observability pipelines. The OTLP metrics endpoint enables direct OTLP metric ingestion in these scenarios.

## Configuration{% #configuration %}

To export OTLP metrics data to the Datadog OTLP metrics intake endpoint:

1. Ensure only delta metrics are sent.
1. Configure the OTLP HTTP exporter.
   - Set the Datadog OTLP metrics intake endpoint.
   - Configure the required HTTP headers.
1. (Optional) Set the `dd-otel-metric-config` HTTP header to configure the metric translator behavior.

### Configure the exporter{% #configure-the-exporter %}

To send OTLP data to the Datadog OTLP metrics intake endpoint, use the OTLP HTTP exporter. For metrics, the exporter supports both HTTP Protobuf and HTTP JSON. HTTP Protobuf is recommended for better performance.

The process differs depending on whether you're using automatic or manual instrumentation for OpenTelemetry.

{% alert level="info" %}
Based on your [Datadog site](http://localhost:1313/getting_started/site/), which is : Replace your endpoint with  in the following examples.
{% /alert %}

#### Ensure only delta metrics are sent{% #ensure-only-delta-metrics-are-sent %}

The Datadog OTLP metrics intake endpoint accepts only **delta** metrics. If you attempt to send **cumulative** metrics (the default in most SDKs), you will receive an error. Make sure to configure your OpenTelemetry SDK or Collector to produce delta metrics.

- For [supported languages](https://github.com/open-telemetry/opentelemetry-specification/blob/main/spec-compliance-matrix.md#environment-variables), set the `OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE` environment variable to `delta`.
- Otherwise, set the temporality preference in your code. For more information, read [Configure delta temporality in OpenTelemetry](http://localhost:1313/opentelemetry/guide/otlp_delta_temporality/).

#### Automatic instrumentation{% #automatic-instrumentation %}

If you are using [OpenTelemetry automatic instrumentation](https://opentelemetry.io/docs/reference/specification/glossary/#automatic-instrumentation), set the following environment variables:

```shell
export OTEL_EXPORTER_OTLP_METRICS_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=""
export OTEL_EXPORTER_OTLP_METRICS_HEADERS="dd-api-key=${DD_API_KEY}"
export OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE="delta"
```

#### Manual instrumentation{% #manual-instrumentation %}

If you are using manual instrumentation with OpenTelemetry SDKs, configure the OTLP HTTP Protobuf exporter programmatically.

{% tab title="JavaScript" %}
The JavaScript exporter is [`@opentelemetry/exporter-metrics-otlp-proto`](https://www.npmjs.com/package/@opentelemetry/exporter-metrics-otlp-proto). To configure the exporter, use the following code snippet:

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

{% /tab %}

{% tab title="Java" %}
The Java exporter is [`OtlpHttpMetricExporter`](https://javadoc.io/doc/io.opentelemetry/opentelemetry-exporter-otlp-http-metrics/). To configure the exporter, use the following code snippet:

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

{% /tab %}

{% tab title="Go" %}
The Go exporter is [`otlpmetrichttp`](https://pkg.go.dev/go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetrichttp). To configure the exporter, use the following code snippet:

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

{% /tab %}

{% tab title="Python" %}
The Python exporter is [`OTLPMetricExporter`](https://pypi.org/project/opentelemetry-exporter-otlp-proto-http/). To configure the exporter, use the following code snippet:

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

{% /tab %}

### (Optional) Configure the metric translator{% #optional-configure-the-metric-translator %}

Use the `dd-otel-metric-config` header to configure how metrics are translated and sent to Datadog. The JSON header contains the following fields:

{% dl %}

{% dt %}
`resource_attributes_as_tags`
{% /dt %}

{% dd %}
**Type**: Boolean**Default**: `false`If set to `true`, transforms all resource attributes into metric labels, which are then converted into tags.
{% /dd %}

{% dt %}
`instrumentation_scope_metadata_as_tags`
{% /dt %}

{% dd %}
**Type**: Boolean**Default**: `false`If set to `true`, adds the name and version of the instrumentation scope that created a metric to the metric tags.
{% /dd %}

{% dt %}
`histograms.mode`
{% /dt %}

{% dd %}
**Type**: StringMode for exporting histograms. Valid values are:
- `distributions`: sends histograms as Datadog distributions (recommended).
- `counters`: sends histograms as Datadog counts, one metric per bucket.
- `nobuckets`: sends no bucket histogram metrics.

{% /dd %}

{% dt %}
`histograms.send_aggregation_metrics`
{% /dt %}

{% dd %}
**Type**: BooleanIf set to `true`, writes additional `.sum`, `.count`, `.min`, and `.max` metrics for histograms.
{% /dd %}

{% dt %}
`summaries.mode`
{% /dt %}

{% dd %}
**Type**: StringMode for exporting OTLP summaries. Valid values are:
- `noquantiles`: sends no `.quantile` metrics. `.sum` and `.count` metrics are still sent.
- `gauges`: sends `.quantile` metrics as gauges tagged by the quantile.

{% /dd %}

{% /dl %}

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

## OpenTelemetry Collector{% #opentelemetry-collector %}

If you are using an OpenTelemetry Collector distribution that doesn't support the Datadog Exporter, you can configure the [`otlphttpexporter`](https://github.com/open-telemetry/opentelemetry-collector/tree/main/exporter/otlphttpexporter) to export metrics to the Datadog OTLP metrics intake endpoint.

For example, your `config.yaml` file would look like this:

```yaml
...
exporters:
  otlphttp:
    metrics_endpoint: 
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

{% alert level="info" %}
Note the `cumulativetodelta` processor in the pipeline, which converts cumulative metrics to delta metrics. Delta metrics are required for the OTLP metrics intake endpoint. For more information, see [Configure delta temporality in OpenTelemetry](http://localhost:1313/opentelemetry/guide/otlp_delta_temporality/).
{% /alert %}

## Troubleshooting{% #troubleshooting %}

### Error: 403 Forbidden{% #error-403-forbidden %}

If you receive a `403 Forbidden` error when sending metrics to the Datadog OTLP metrics intake endpoint, it indicates one of the following issues:

- The endpoint URL is incorrect for your organization.**Solution**: Use the correct endpoint URL for your organization. Your site is , so you need to use the  endpoint.

### Error: 413 Request Entity Too Large{% #error-413-request-entity-too-large %}

If you receive a `413 Request Entity Too Large` error when sending metrics to the Datadog OTLP metrics intake endpoint, it indicates that the payload size sent by the OTLP exporter exceeds the Datadog metrics intake endpoint's limit of 500KB for uncompressed payloads, or 5MB for compressed payloads after decompression.

This error usually occurs when the OpenTelemetry SDK batches too much telemetry data in a single request payload.

**Solution**: Reduce the export batch size of the SDK's batch processor. For example, in the OpenTelemetry Java SDK, you can adjust `BatchMetricExportProcessor`.

### Issue: Missing datapoints or lower than expected metric values{% #issue-missing-datapoints-or-lower-than-expected-metric-values %}

If you notice missing datapoints or lower than expected metric values, it may be because you are sending multiple datapoints for a metric that have the same timestamp (in seconds) and same dimensions. In such cases, Datadog only accepts the last datapoint, and previous datapoints are dropped (last-write-wins). Datadog requires the timeseries data of a metric to be unique in the context of {timestamp + dimensions}.

**Solution**: Ensure that your datapoints of a given metric at one timestamp are uniquely tagged. For example, if you send multiple datapoints for a metric simultaneously from multiple AWS Lambda invocations, make sure to include unique identifiers (such as the Lambda ARN) as resource attributes in your metrics. Use the `resource_attributes_as_tags` option to add these resource attributes as metric tags.

## Further reading{% #further-reading %}

- [General OpenTelemetry SDK Configuration](https://opentelemetry.io/docs/concepts/sdk-configuration/general-sdk-configuration/)
- [OpenTelemetry Environment Variable Spec](https://opentelemetry.io/docs/reference/specification/sdk-environment-variables/)
- [OpenTelemetry Protocol Exporter](https://opentelemetry.io/docs/specs/otel/protocol/exporter/)
- [OTLP Metrics Exporter](https://opentelemetry.io/docs/specs/otel/metrics/sdk_exporters/otlp/%20)
- [Configure delta temporality in OpenTelemetry](http://localhost:1313/opentelemetry/guide/otlp_delta_temporality/)
- [OTLP Metrics Mapping in Datadog](http://localhost:1313/metrics/otlp/?tab=summary#mapping)
