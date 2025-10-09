---
title: Datadog OTLP Logs Intake Endpoint
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Send OpenTelemetry Data to Datadog > Datadog
  OTLP Intake Endpoint > Datadog OTLP Logs Intake Endpoint
---

# Datadog OTLP Logs Intake Endpoint

{% callout %}
# Important note for users on the following Datadog sites: app.ddog-gov.com

{% alert level="warning" %}
This product is not supported for your selected [Datadog site](http://localhost:1313/getting_started/site). ().
{% /alert %}

{% /callout %}

## Overview{% #overview %}

Datadog's OpenTelemetry Protocol (OTLP) logs intake API endpoint allows you to send logs directly to Datadog. With this feature, you don't need to run the [Datadog Agent](http://localhost:1313/opentelemetry/otlp_ingest_in_the_agent/) or [OpenTelemetry Collector + Datadog Exporter](http://localhost:1313/opentelemetry/collector_exporter/).

Choose this option for a straightforward setup to send logs directly to Datadog without using the Datadog Agent or OpenTelemetry Collector.

## Configuration{% #configuration %}

To send OTLP data to the Datadog OTLP logs intake endpoint, you must configure the OTLP HTTP Protobuf exporter. The process differs depending on whether you are using automatic or manual instrumentation for OpenTelemetry.

{% alert level="info" %}
Based on your [Datadog site](http://localhost:1313/getting_started/site/), which is : Replace `${YOUR_ENDPOINT}` with  in the following examples.
{% /alert %}

#### Automatic instrumentation{% #automatic-instrumentation %}

If you are using [OpenTelemetry automatic instrumentation](https://opentelemetry.io/docs/specs/otel/glossary/#automatic-instrumentation), set the following environment variables:

```shell
export OTEL_EXPORTER_OTLP_LOGS_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_LOGS_ENDPOINT="${YOUR_ENDPOINT}" // Replace this with the correct endpoint
export OTEL_EXPORTER_OTLP_LOGS_HEADERS="dd-api-key=${DD_API_KEY}"
```

#### Manual instrumentation{% #manual-instrumentation %}

If you are using manual instrumentation with OpenTelemetry SDKs, configure the OTLP HTTP Protobuf exporter programmatically using the following examples.

{% alert level="info" %}
OpenTelemetry SDK logs support for JavaScript and Python is in development. For the latest statuses, see [OpenTelemetry Status and Releases](https://opentelemetry.io/docs/languages/#status-and-releases).
{% /alert %}

{% tab title="Java" %}
The Java exporter is `OtlpHttpLogRecordExporter`. To configure the exporter, use the following code snippet:

```java
import io.opentelemetry.exporter.otlp.http.logs.OtlpHttpLogRecordExporter;

OtlpHttpLogRecordExporter exporter = OtlpHttpLogRecordExporter.builder()
    .setEndpoint("${YOUR_ENDPOINT}") // Replace this with the correct endpoint
    .addHeader("dd-api-key", System.getenv("DD_API_KEY"))
    .build();
```

{% /tab %}

{% tab title="Go" %}
The Go exporter is `otlploghttp`. To configure the exporter, use the following code snippet:

```go
import "go.opentelemetry.io/otel/exporters/otlp/otlplog/otlploghttp"

logExporter, err := otlploghttp.New(
    ctx,
    otlploghttp.WithEndpointURL("${YOUR_ENDPOINT}"), // Replace this with the correct endpoint, minus the URL path
    otlploghttp.WithURLPath("/v1/logs"),
    otlploghttp.WithHeaders(
        map[string]string{
            "dd-api-key": os.Getenv("DD_API_KEY"),
        }),
)
```

{% /tab %}

## OpenTelemetry Collector{% #opentelemetry-collector %}

If you are using the OpenTelemetry Collector and don't want to use the Datadog Exporter, you can configure [`otlphttpexporter`](https://github.com/open-telemetry/opentelemetry-collector/tree/main/exporter/otlphttpexporter) to export logs to the Datadog OTLP logs intake endpoint.

Configure your `config.yaml` like this:

```yaml
exporters:
  otlphttp:
    logs_endpoint: ${YOUR_ENDPOINT} // Replace this with the correct endpoint
    headers:
      dd-api-key: ${env:DD_API_KEY}

service:
  pipelines:
    logs:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlphttp]
```

## Troubleshooting{% #troubleshooting %}

### Error: 403 Forbidden{% #error-403-forbidden %}

If you receive a `403 Forbidden` error when sending logs to the Datadog OTLP logs intake endpoint, it indicates one potential issue:

- The endpoint URL is incorrect for your organization.**Solution**: Use the correct endpoint URL for your organization. Your site is , so you need to use the  endpoint.

## Further reading{% #further-reading %}

- [General OpenTelemetry SDK Configuration](https://opentelemetry.io/docs/concepts/sdk-configuration/general-sdk-configuration/)
- [OpenTelemetry Environment Variable Spec](https://opentelemetry.io/docs/reference/specification/sdk-environment-variables/)
- [OpenTelemetry Protocol Exporter](https://opentelemetry.io/docs/reference/specification/protocol/exporter/)
