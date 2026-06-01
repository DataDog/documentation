---
title: Export Traces from Datadog SDKs in OTLP Format
private: true
further_reading:
- link: "/opentelemetry/instrument/dd_sdks/"
  tag: "Documentation"
  text: "OpenTelemetry API Support in Datadog SDKs"
- link: "/opentelemetry/"
  tag: "Documentation"
  text: "OpenTelemetry Support in Datadog"
- link: "/tracing/"
  tag: "Documentation"
  text: "Datadog APM"
---

{{< callout url="#" btn_hidden="true" header="Preview">}}
OTLP trace export is in Preview. To provide feedback or request support, contact your Datadog account team.
{{< /callout >}}

## Overview

Datadog SDKs support exporting traces in [OpenTelemetry Protocol (OTLP)][3] format to any OTLP-compliant receiver or backend, including [DDOT][1] or any OpenTelemetry Collector.

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
- **Requirements**: .NET 6 or later
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Enable OTLP trace export

To export traces in OTLP format, set the following environment variables on the instrumented service:

```shell
OTEL_TRACES_EXPORTER=otlp
DD_TRACE_OTEL_ENABLED=true
```

By default, traces are sent to `http://localhost:4318/v1/traces`.

To send traces to a different endpoint, set `OTEL_EXPORTER_OTLP_ENDPOINT` or the trace-specific `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT`. See the [OTLP Exporter Configuration][2] documentation for details.

## Current limitations

- OTLP trace export is in Preview and supports core APM functionality for automatic and manually created traces. Other Datadog features and capabilities may not be supported, or may require the Datadog Agent even if traces are not sent through it.
- Traces are exported with Datadog semantics.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/setup/ddot_collector/
[2]: https://opentelemetry.io/docs/specs/otel/protocol/exporter/
[3]: https://opentelemetry.io/docs/specs/otlp/
