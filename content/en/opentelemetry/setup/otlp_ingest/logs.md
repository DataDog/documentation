---
title: Datadog OTLP Logs Intake Endpoint
aliases:
  - /opentelemetry/otlp_logs
  - /opentelemetry/setup/intake_endpoint/otlp_logs
  - /opentelemetry/setup/agentless/logs
further_reading:
  - link: "https://opentelemetry.io/docs/concepts/sdk-configuration/general-sdk-configuration/"
    tag: "External Site"
    text: "General OpenTelemetry SDK Configuration"
  - link: "https://opentelemetry.io/docs/reference/specification/sdk-environment-variables/"
    tag: "External Site"
    text: "OpenTelemetry Environment Variable Spec"
  - link: "https://opentelemetry.io/docs/reference/specification/protocol/exporter/"
    tag: "External Site"
    text: "OpenTelemetry Protocol Exporter"
site_support_id: otlp_agentless
---

## Overview

Datadog's OpenTelemetry Protocol (OTLP) logs intake API endpoint allows you to send logs directly to Datadog. With this feature, you don't need to run the [Datadog Agent][2] or [OpenTelemetry Collector + Datadog Exporter][1].

Choose this option for a straightforward setup to send logs directly to Datadog without using the Datadog Agent or OpenTelemetry Collector.

## Configuration

To send OTLP data to the Datadog OTLP logs intake endpoint, you must configure the OTLP HTTP Protobuf exporter. The process differs depending on whether you are using automatic or manual instrumentation for OpenTelemetry.

<div class="alert alert-info">Based on your <a href="/getting_started/site/">Datadog site</a>, which is {{< region-param key=dd_datacenter code="true" >}}: Replace <code>${YOUR_ENDPOINT}</code> with {{< region-param key="otlp_logs_endpoint" code="true" >}} in the following examples.</div>

#### Automatic instrumentation

If you are using [OpenTelemetry automatic instrumentation][3], set the following environment variables:

```shell
export OTEL_EXPORTER_OTLP_LOGS_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_LOGS_ENDPOINT="${YOUR_ENDPOINT}" // Replace this with the correct endpoint
export OTEL_EXPORTER_OTLP_LOGS_HEADERS="dd-api-key=${DD_API_KEY}"
```

#### Manual instrumentation

If you are using manual instrumentation with OpenTelemetry SDKs, configure the OTLP HTTP Protobuf exporter programmatically using the following examples.

<div class="alert alert-info">OpenTelemetry SDK logs support for JavaScript and Python is in development. For the latest statuses, see <a href="https://opentelemetry.io/docs/languages/#status-and-releases">OpenTelemetry Status and Releases</a>.</div>

{{< tabs >}}
{{% tab "Java" %}}
The Java exporter is `OtlpHttpLogRecordExporter`. To configure the exporter, use the following code snippet:

```java
import io.opentelemetry.exporter.otlp.http.logs.OtlpHttpLogRecordExporter;

OtlpHttpLogRecordExporter exporter = OtlpHttpLogRecordExporter.builder()
    .setEndpoint("${YOUR_ENDPOINT}") // Replace this with the correct endpoint
    .addHeader("dd-api-key", System.getenv("DD_API_KEY"))
    .build();
```
{{% /tab %}}

{{% tab "Go" %}}
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
{{% /tab %}}
{{< /tabs >}}

## OpenTelemetry Collector

If you are using the OpenTelemetry Collector and don't want to use the Datadog Exporter, you can configure [`otlphttpexporter`][4] to export logs to the Datadog OTLP logs intake endpoint.

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

## Troubleshooting

### Error: 403 Forbidden

If you receive a `403 Forbidden` error when sending logs to the Datadog OTLP logs intake endpoint, it indicates one potential issue:

- The endpoint URL is incorrect for your organization.  
   **Solution**: Use the correct endpoint URL for your organization. Your site is {{< region-param key=dd_datacenter code="true" >}}, so you need to use the {{< region-param key="otlp_logs_endpoint" code="true" >}} endpoint.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/collector_exporter/
[2]: /opentelemetry/otlp_ingest_in_the_agent/
[3]: https://opentelemetry.io/docs/specs/otel/glossary/#automatic-instrumentation
[4]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/exporter/otlphttpexporter
