---
title: Export Traces from Datadog SDKs in OTLP Format
description: Configure a Datadog SDK to export traces in OpenTelemetry Protocol (OTLP) format to a DDOT Collector or any OTLP-compatible receiver.
further_reading:
    - link: '/opentelemetry/instrument/dd_sdks/'
      text: 'Using Datadog SDKs with OpenTelemetry'
      tag: 'Documentation'
    - link: '/opentelemetry/setup/ddot_collector/'
      text: 'Datadog Distribution of the OpenTelemetry Collector (DDOT)'
      tag: 'Documentation'
    - link: '/tracing/'
      text: 'Datadog APM'
      tag: 'Documentation'
---

{{< callout url="#" btn_hidden="true" header="Preview">}}
OTLP export from Datadog SDKs is in Preview. To provide feedback or request support, contact your Datadog account team.
{{< /callout >}}

Datadog SDKs can export traces in [OTLP][1] format to any OTLP-compatible receiver or backend, including [DDOT][2] or any OpenTelemetry Collector.

## Prerequisites

OTLP export sends data to a receiver rather than directly to Datadog. Before you enable it, you need an OTLP-compatible receiver that is configured to forward data to Datadog, such as the [DDOT Collector][2] or an [OpenTelemetry Collector][3].

For production workloads, Datadog recommends DDOT for batching, performance, and processing benefits. You aren't required to use DDOT, but the receiver must be reachable from your instrumented service.

## Language support

Select your language to see the minimum SDK version and supported OTLP protocols.

{{< programming-lang-wrapper langs="java,python,nodejs,go,.net" >}}

{{< programming-lang lang="java" >}}
- **Minimum version**: v1.62.0
- **Supported protocols**: `http/protobuf` (default), `grpc`
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}
- **Minimum version**: v4.8.0
- **Supported protocols**: `http/json`
{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}
- **Minimum version**: v5.98.0
- **Supported protocols**: `http/json`
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
- **Minimum version**: v2.8.0
- **Supported protocols**: `http/protobuf`
{{< /programming-lang >}}

{{< programming-lang lang=".net" >}}
- **Minimum version**: v3.41.0
- **Supported protocols**: `http/json` (default), `http/protobuf` (v3.45.0+)
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Enable OTLP trace export

To export traces in OTLP format, set the following environment variables on the instrumented service:

```shell
OTEL_TRACES_EXPORTER=otlp
DD_TRACE_OTEL_ENABLED=true
```

By default, traces are sent to `http://localhost:4318/v1/traces`.

To send traces to a different endpoint, set `OTEL_EXPORTER_OTLP_ENDPOINT` or the trace-specific `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT`. See the [OTLP Exporter Configuration][4] documentation for details.

## Verify

After you enable OTLP export and your service receives traffic, confirm that traces appear in the [Trace Explorer][5]. If traces don't arrive, verify that your [receiver][6] is running, reachable at the configured endpoint, and forwarding data to Datadog.

## Current limitations

- OTLP trace export is in Preview and supports core APM functionality for automatic and manually created traces. Other Datadog features and capabilities may not be supported, or may require the Datadog Agent even if traces are not sent through it.
- Traces are exported with Datadog semantics. For example, an HTTP status code is represented as `http.status_code` in Datadog semantics and `http.response.status_code` in OTel semantics.

For details on which Datadog features each setup supports, see the [feature compatibility table][7].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/specs/otlp/
[2]: /opentelemetry/setup/ddot_collector/
[3]: /opentelemetry/setup/collector_exporter/
[4]: https://opentelemetry.io/docs/specs/otel/protocol/exporter/
[5]: /tracing/trace_explorer/
[6]: /opentelemetry/setup/
[7]: /opentelemetry/compatibility/#feature-compatibility
