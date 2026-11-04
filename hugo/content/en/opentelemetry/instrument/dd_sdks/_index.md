---
title: DDOT SDKs
description: Set up DDOT SDKs, the Datadog SDKs configured to send OpenTelemetry data over OTLP to your Collector.
aliases:
    - /opentelemetry/instrument/dd_sdks/otlp_trace_export/
    - /opentelemetry/instrument/dd_sdks/ddot_setup/
further_reading:
    - link: '/opentelemetry/setup/ddot_collector/'
      text: 'DDOT Collector'
      tag: 'Documentation'
    - link: '/opentelemetry/compatibility/'
      text: 'Datadog and OpenTelemetry Compatibility'
      tag: 'Documentation'
    - link: '/tracing/'
      text: 'Datadog APM'
      tag: 'Documentation'
algolia:
  tags: ['otel custom instrumentation', 'ddot sdk', 'otlp export']
---

{{< callout header="false" btn_hidden="true" >}}
DDOT SDKs are in Preview.
{{< /callout >}}

A Datadog OpenTelemetry (DDOT) SDK is the Datadog SDK for your language, configured to send OpenTelemetry data over [OTLP][1] to an OTLP receiver, such as the [DDOT Collector][2] or the [upstream OpenTelemetry Collector][3]. You don't need the Datadog Agent.

Already use a Datadog SDK that sends data to the Datadog Agent? To keep that setup and add the OpenTelemetry API, see [OpenTelemetry API Support][4].

## Prerequisites

- **The Datadog SDK installed and attached to your service.** Pick your language in [Add the Datadog SDK][5], and skip the Agent steps: the DDOT SDK sends to your receiver instead. On Kubernetes, the OpenTelemetry Operator can inject the DDOT SDK instead. See the [Kubernetes quickstart][6].
- **An OTLP receiver that forwards data to Datadog**, such as the [DDOT Collector][2] or the [upstream OpenTelemetry Collector][3]. The DDOT SDK sends to the receiver rather than directly to Datadog, so the receiver must be reachable from your service.

## Language support

Select your language to see the minimum SDK version and supported OTLP protocols. **[Placeholder: Is a DDOT SDK any Datadog SDK at these versions, or only the `dd-otel-autoinstrumentation-*` builds? Which languages send metrics and logs?]**

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

**Note**: The OpenTelemetry specification defaults OTLP to `http/protobuf`, but DDOT SDK defaults vary by language. Node.js and .NET default to `http/json`, and Python defaults to `http/json` before v4.14.0. Java, Go, and Python v4.14.0+ default to `http/protobuf`. Where a language supports multiple protocols, set `OTEL_EXPORTER_OTLP_PROTOCOL` to override the default. Make sure your receiver accepts the protocol you use. By convention, OTLP over HTTP uses port `4318`, and OTLP over gRPC uses port `4317`.

## Turn on the DDOT SDK

Set the following environment variables on your service:

```shell
OTEL_TRACES_EXPORTER=otlp
DD_TRACE_OTEL_ENABLED=true
```

To also send OpenTelemetry metrics and logs, set `DD_METRICS_OTEL_ENABLED=true` and `DD_LOGS_OTEL_ENABLED=true`. **[Placeholder: Which other settings should every DDOT SDK use, such as `DD_TRACE_OTEL_SEMANTICS_ENABLED`?]**

By default, the SDK sends to `http://localhost:4318`. To send to a receiver at a different address, set `OTEL_EXPORTER_OTLP_ENDPOINT`. See the [OTLP Exporter Configuration][7] documentation for details.

## Verify

After you turn on the DDOT SDK and your service receives traffic, confirm that traces appear in the [Trace Explorer][8]. If traces don't arrive, check that your receiver is running, reachable at the configured endpoint, and forwarding data to Datadog.

## Limitations

- DDOT SDKs are in Preview and support core APM functionality for automatic and manually created traces. Other Datadog features may not be supported, or may require the Datadog Agent. See [Feature Compatibility][9].
- Traces are exported with Datadog semantics. For example, an HTTP status code is represented as `http.status_code` in Datadog semantics and `http.response.status_code` in OpenTelemetry semantics.
- The DDOT SDK supports the OpenTelemetry API, not OpenTelemetry SDK components such as span processors and exporters. If your code sets up the OpenTelemetry SDK, review it before you switch. In Node.js, register Datadog's tracer provider so spans you create with the OpenTelemetry API aren't dropped. See [OpenTelemetry API Support for Node.js][10].

## Configure and extend

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/dd_sdks/api_support/" >}}
    <h3>Use the OpenTelemetry API</h3>
    Add custom spans, metrics, and logs with the OpenTelemetry API, for each language.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/instrument/dd_sdks/instrumentation_libraries/" >}}
    <h3>Instrumentation Libraries</h3>
    Add OpenTelemetry instrumentation libraries to capture telemetry from third-party components alongside Datadog SDK instrumentation.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/environment_variable_support/" >}}
    <h3>Configuration</h3>
    Configure Datadog SDKs with OpenTelemetry SDK environment variables.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/specs/otlp/
[2]: /opentelemetry/setup/ddot_collector/
[3]: /opentelemetry/setup/collector_exporter/
[4]: /opentelemetry/instrument/dd_sdks/api_support/
[5]: /tracing/trace_collection/dd_libraries/#instrument-your-application
[6]: /opentelemetry/getting_started/kubernetes/?tab=ddot
[7]: https://opentelemetry.io/docs/specs/otel/protocol/exporter/
[8]: /tracing/trace_explorer/
[9]: /opentelemetry/compatibility/#feature-compatibility
[10]: /opentelemetry/instrument/dd_sdks/api_support/?prog_lang=node_js&platform=traces
