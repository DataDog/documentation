---
title: Export Traces from Datadog SDKs in OTLP Format
description: Configure a Datadog SDK to export traces in OpenTelemetry Protocol (OTLP) format to a DDOT Collector or any OTLP-compatible receiver.
aliases:
    - /opentelemetry/instrument/dd_sdks/otlp_trace_export/
    - /opentelemetry/instrument/dd_otel_sdks/otlp_trace_export/
further_reading:
    - link: '/opentelemetry/instrument/ddot_sdks/'
      text: 'Using Datadog OpenTelemetry SDKs'
      tag: 'Documentation'
    - link: '/opentelemetry/setup/ddot_collector/'
      text: 'Datadog Distribution of the OpenTelemetry Collector (DDOT Collector)'
      tag: 'Documentation'
    - link: '/tracing/'
      text: 'Datadog APM'
      tag: 'Documentation'
---

Datadog SDKs can export traces in [OTLP][1] format to an OTLP-compatible receiver, including a [DDOT Collector][2] or any OpenTelemetry Collector.

## Prerequisites

OTLP export requires:

- **The Datadog SDK installed and attached to your service.** A Datadog Agent is optional for OTLP trace export. See [feature compatibility][7] for capabilities that require the Datadog Agent.
- **An OTLP-compatible receiver that forwards data to Datadog**, such as the [DDOT Collector][2] or an [OpenTelemetry Collector][3]. OTLP export sends data to a receiver rather than directly to Datadog, so the receiver must be reachable from your instrumented service. For production workloads, Datadog recommends DDOT for batching, performance, and processing benefits. You aren't required to use DDOT.

## Language support

Select your language to see the minimum SDK version and supported OTLP protocols.

{{< programming-lang-wrapper langs="java,python,nodejs,go,.net" >}}

{{< programming-lang lang="java" >}}
- **Minimum version**: v1.62.0
- **Supported protocols**: `http/protobuf` (default), `grpc`
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}
- **Minimum version**: v4.8.0
- **Supported protocols**: `http/protobuf` (v4.14.0+, default), `http/json` (default before v4.14.0)
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

**Note**: The OpenTelemetry specification defaults OTLP to `http/protobuf`, but Datadog SDK defaults vary by language. Node.js and .NET default to `http/json`, and Python defaults to `http/json` before v4.14.0. Java, Go, and Python v4.14.0+ default to `http/protobuf`. Where a language supports multiple protocols, set `OTEL_EXPORTER_OTLP_PROTOCOL` or `OTEL_EXPORTER_OTLP_TRACES_PROTOCOL` to override the default. Make sure your receiver accepts the protocol you use. By convention, OTLP/HTTP (`http/protobuf` or `http/json`) uses port `4318`, and OTLP/gRPC (`grpc`) uses port `4317`.

## Enable OTLP trace export

To export traces in OTLP format, set the following environment variables on the instrumented service:

```shell
OTEL_TRACES_EXPORTER=otlp
DD_TRACE_OTEL_ENABLED=true
```

By default, traces are sent to `http://localhost:4318/v1/traces`.

To send traces to a receiver at a different address, set `OTEL_EXPORTER_OTLP_ENDPOINT` or the trace-specific `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT`. See the [OTLP Exporter Configuration][4] documentation for details.

## Sampling and trace metrics

DDOT SDKs (Datadog SDKs in OpenTelemetry mode) apply sampling before OTLP export and record the sampling probability in spans' `tracestate`. Use the versions below and a [compatible receiver][8] to extrapolate trace metrics from that probability.

| Datadog SDK | Minimum version for sampling probability in OTLP spans |
| --- | --- |
| Java | [1.67.0][9] |
| Python | [4.15.0][10] |
| Node.js | [6.20.0][11] or [5.131.0][12] |
| Go | [2.11.0][13] |
| .NET | [3.55.0][14] |

## Verify

After you enable OTLP export and your service receives traffic, confirm that traces appear in the [Trace Explorer][5]. If traces don't arrive, verify that your [receiver][6] is running, reachable at the configured endpoint, and forwarding data to Datadog.

## Current limitations

- OTLP trace export supports core APM functionality for automatic and manually created traces. Other Datadog features and capabilities may not be supported, or may require the Datadog Agent even if traces are not sent through it.
- OpenTelemetry semantic conventions require `DD_TRACE_OTEL_SEMANTICS_ENABLED=true` and a supported SDK version. Without this setting, traces use Datadog semantics, such as `http.status_code` instead of `http.response.status_code`.

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
[8]: /opentelemetry/ingestion_sampling/#trace-metric-extrapolation-for-datadog-sdks
[9]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.67.0
[10]: https://github.com/DataDog/dd-trace-py/releases/tag/v4.15.0
[11]: https://github.com/DataDog/dd-trace-js/releases/tag/v6.20.0
[12]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.131.0
[13]: https://github.com/DataDog/dd-trace-go/releases/tag/v2.11.0
[14]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v3.55.0
