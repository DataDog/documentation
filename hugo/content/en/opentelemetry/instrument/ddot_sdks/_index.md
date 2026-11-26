---
title: Using DDOT SDKs
description: Use DDOT SDKs, Datadog's version of OpenTelemetry SDKs, with support for OpenTelemetry APIs, OTLP, and additional Datadog-specific capabilities.
aliases:
    - /opentelemetry/instrument/dd_sdks/
    - /opentelemetry/instrument/dd_otel_sdks/
    - /opentelemetry/instrument/ddot_sdks/otlp_trace_export/
    - /opentelemetry/instrument/dd_sdks/otlp_trace_export/
    - /opentelemetry/instrument/dd_otel_sdks/otlp_trace_export/
further_reading:
    - link: '/opentelemetry/compatibility/'
      text: 'OpenTelemetry feature compatibility'
      tag: 'Documentation'
    - link: '/opentelemetry/setup/ddot_collector/'
      text: 'DDOT Collector'
      tag: 'Documentation'
    - link: 'https://opentelemetry.io/docs/platforms/kubernetes/operator/automatic/'
      text: 'OpenTelemetry Operator automatic instrumentation'
      tag: 'External Site'
algolia:
  tags: ['otel custom instrumentation']
---

{{< callout header="false" btn_hidden="true" >}}
DDOT SDKs are in Preview.
{{< /callout >}}

DDOT SDKs are Datadog's version of OpenTelemetry SDKs. They emit traces, metrics, and logs that follow OpenTelemetry Semantic Conventions over OTLP. They use standard OpenTelemetry configuration and deployment tooling, and add Datadog-specific capabilities. DDOT SDKs are available for Java, .NET, Node.js, Python, and Go.

DDOT SDKs add capabilities such as Live Debugger, Dynamic Instrumentation, SQL query-level Database Monitoring, and Data Streams Monitoring. Some capabilities require the Datadog Agent. See [feature compatibility][8] for additional capabilities and requirements.

## Prerequisites

Install and attach a DDOT SDK to your service, and provide a reachable OTLP-compatible receiver that forwards telemetry to Datadog. Datadog recommends the [DDOT Collector][export-2]. DDOT SDKs also work well with the [upstream OpenTelemetry Collector][export-3].

## Deployment methods

Install DDOT SDKs the same way as upstream OpenTelemetry SDKs. Every installation method available for upstream OpenTelemetry SDKs works for DDOT SDKs, including OpenTelemetry Operator injection and installation in the application build or deployment.

| Environment | Method | What it does |
|---|---|---|
| Kubernetes | [OpenTelemetry Operator][9] | Injects the auto-instrumentation image configured in an `Instrumentation` resource. |
| Kubernetes, other containers, hosts, or serverless | [SDK package installation][5] | Installs the SDK in the application build or deployment. |

### Kubernetes deployment

The OpenTelemetry Operator's `Instrumentation` resource selects the SDK images injected into workloads. DDOT SDK images replace the default upstream images for Java, Python, Node.js, and .NET.

The [DDOT Kubernetes installation guide][14] includes OpenTelemetry SDK instrumentation images, an `Instrumentation` resource, and workload annotations. For an existing Operator or Collector deployment, see [Adapt an existing configuration for DDOT][15]. For OpenTelemetry Operator concepts and configuration options, see [OpenTelemetry Operator automatic instrumentation][9].

Go applications include the SDK and instrumentation at build time, typically in the Dockerfile. For DDOT Go, use [Orchestrion][16]. The upstream OpenTelemetry Go SDK uses OpenTelemetry Go compile-time instrumentation (`otelc`) instead. The OpenTelemetry Operator's `instrumentation.opentelemetry.io/inject-sdk` annotation supplies configuration to the application, but it doesn't install an SDK.

### Application installation

For installation without the OpenTelemetry Operator, follow the [installation instructions for your language][5], then apply the [OpenTelemetry configuration below](#configure-opentelemetry-mode-and-export) to send OTLP telemetry to your Collector. Some capabilities require the Datadog Agent; see [feature compatibility][8].

## Configure OpenTelemetry mode and export

DDOT SDKs send traces, metrics, and logs over OTLP to an OpenTelemetry Collector. The Collector can batch, enrich, and route telemetry before exporting it to Datadog or another OTLP-compatible backend. These signals don't go through the Datadog Agent. Datadog recommends running a Datadog Agent alongside the Collector for capabilities such as Live Debugger, Dynamic Instrumentation, and Continuous Profiler. The Agent proxies Remote Configuration and receives profiles. Traces, metrics, and logs keep flowing over OTLP to the Collector. See [feature compatibility][8] for language support and capability requirements.

### Language support

Select your language to see the minimum SDK version and supported protocols for OTLP trace export.

{{< programming-lang-wrapper langs="java,python,nodejs,go,.net" >}}

{{< programming-lang lang="java" >}}
- **Minimum version**: v1.62.0
- **Supported protocols**: `http/protobuf` (default), `grpc`, `http/json` (v1.65.0+)
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}
- **Minimum version**: v4.8.0
- **Supported protocols**: `http/protobuf` (v4.14.0+, default), `http/json` (default before v4.14.0), `grpc` (v4.17.0+)
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
- **Supported protocols**: `http/protobuf` (v3.45.0+, default from v3.58.0), `http/json` (default before v3.58.0)
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Activate OpenTelemetry mode {#enable-otlp-trace-export}

Set the following environment variables to activate OpenTelemetry mode: OTLP export of traces, metrics, and logs, the OpenTelemetry APIs, and OpenTelemetry trace semantic conventions:

```text
OTEL_TRACES_EXPORTER=otlp
DD_TRACE_OTEL_ENABLED=true
DD_TRACE_OTEL_SEMANTICS_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_LOGS_OTEL_ENABLED=true
```

To send traces to a receiver at a different address, set `OTEL_EXPORTER_OTLP_ENDPOINT` or the trace-specific `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT`. DDOT Go versions 2.8.0 to 2.11.2 ignore `OTEL_EXPORTER_OTLP_ENDPOINT`; with these versions, set `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` (for example, `http://<collector>:4318/v1/traces`), or upgrade to 2.12.0 or later. See the [OTLP Exporter Configuration][export-4] documentation for details. See [OpenTelemetry API support][1] and the [environment variable reference][7] for signal-specific configuration.

### OpenTelemetry trace semantics

Set `DD_TRACE_OTEL_SEMANTICS_ENABLED=true` to enable OpenTelemetry trace conventions. For HTTP client and server instrumentation, use the versions below or later:

| SDK | Version |
|---|---|
| Java | [1.68.0][export-15] |
| Python | [4.17.0][export-16] |
| Node.js | [5.110.0][export-17] |
| Go | [2.12.0][export-18] |
| .NET | [3.55.0][export-14] |

These versions provide a baseline for HTTP instrumentation. OTLP export versions and protocols are listed in [Language support](#language-support). Semantic convention coverage varies by instrumentation; see the linked SDK release notes for details.

### Sampling and trace metrics

DDOT SDKs apply sampling before OTLP export and record the sampling probability in spans' `tracestate`. Use the versions below and a [compatible receiver][export-8] to extrapolate trace metrics from that probability.

| DDOT SDK | Minimum version for sampling probability in OTLP spans |
| --- | --- |
| Java | [1.67.0][export-9] |
| Python | [4.15.0][export-10] |
| Node.js | [6.20.0][export-11] or [5.131.0][export-12] |
| Go | [2.11.0][export-13] |
| .NET | [3.55.0][export-14] |

## Switch instrumentation

- **From a Datadog SDK using Datadog semantics and protocols:** Apply the [OpenTelemetry settings above](#configure-opentelemetry-mode-and-export) to the installed SDK. Keep the existing installation method and intentional instrumentation settings. If Single Step Instrumentation (SSI) manages the installation, see [Adapt an existing configuration for DDOT][15] before changing injection or export settings.
- **From an upstream OpenTelemetry SDK:** Replace the SDK package, auto-instrumentation image, or build-time instrumentation. Keep OpenTelemetry API instrumentation and standard configuration, and review SDK-specific provider, processor, and exporter configuration.
- **To an upstream OpenTelemetry SDK:** Change the SDK package or auto-instrumentation image, or, for Go, the build-time instrumentation. OpenTelemetry API instrumentation and standard configuration remain available. Datadog-specific capabilities are no longer available, and code that uses Datadog-specific APIs may need changes.

The [existing-configuration guide][15] covers these migration paths.

<span id="current-limitations"></span>

**Note**: For OpenTelemetry trace conventions, enable [OpenTelemetry trace semantics](#opentelemetry-trace-semantics). Without this setting, traces use Datadog semantics, such as `http.status_code` instead of `http.response.status_code`.

## Configure capabilities

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/ddot_sdks/api_support/" >}}
    <h3>Use the OpenTelemetry API</h3>
    Create custom traces, metrics, and logs with OpenTelemetry APIs. Review support for your language and signal.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/instrument/ddot_sdks/instrumentation_libraries/" >}}
    <h3>Use OpenTelemetry instrumentation libraries</h3>
    Review which OpenTelemetry instrumentation libraries work with DDOT SDKs and how to avoid duplicate spans.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/environment_variable_support/" >}}
    <h3>Configure environment variables</h3>
    Review the OpenTelemetry SDK and OTLP exporter environment variables supported by DDOT SDKs.
    {{< /nextlink >}}
{{< /whatsnext >}}

### Enable Continuous Profiler

DDOT SDKs support [Continuous Profiler][18] when profiling is enabled in the application and the SDK can reach the Datadog Agent. Support depends on the language, runtime, and SDK version; follow the [profiler setup instructions for your language][19].

Keep the OpenTelemetry mode and OTLP export settings above. Enable profiling using the language-specific instructions, and configure the SDK to reach the Datadog Agent's profiling intake. For a Java application using the Agent's HTTP intake on port `8126`, set:

```text
DD_PROFILING_ENABLED=true
DD_AGENT_HOST=<DATADOG_AGENT_HOST>
```

Profiles use the Datadog profiling protocol and go to the Datadog Agent. Traces, metrics, and logs continue over OTLP to the Collector.

## View your telemetry

<span id="verify"></span>

Use the [SDK startup logs][17] to check the effective OpenTelemetry configuration when troubleshooting missing telemetry or unexpected behavior. The settings reported depend on the SDK language and version.

View your application's traces in [Trace Explorer][10], metrics in [Metrics Explorer][11], and logs in [Log Explorer][12]. For missing telemetry, see [OpenTelemetry troubleshooting][13].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/instrument/ddot_sdks/api_support/
[5]: /tracing/trace_collection/dd_libraries/#instrument-your-application
[7]: /opentelemetry/config/environment_variable_support/
[8]: /opentelemetry/compatibility/?otel_sdk=ddot_sdk#ddot-sdk-setups
[9]: https://opentelemetry.io/docs/platforms/kubernetes/operator/automatic/
[10]: /tracing/trace_explorer/
[11]: /metrics/explorer/
[12]: /logs/explorer/
[13]: /opentelemetry/troubleshooting/
[14]: https://github.com/DataDog/opentelemetry-examples/tree/main/guides/kubernetes/configuration/opentelemetry-kube-stack/ddot#instrument-kubernetes-workloads-with-ddot-sdks
[15]: https://github.com/DataDog/opentelemetry-examples/blob/main/guides/kubernetes/configuration/opentelemetry-kube-stack/ddot/ADAPT-EXISTING-CONFIG.md
[16]: /tracing/guide/orchestrion_dockerfile/
[17]: /tracing/troubleshooting/tracer_startup_logs/#opentelemetry-configuration
[18]: /profiler/
[19]: /profiler/enabling/

[export-2]: /opentelemetry/setup/ddot_collector/
[export-3]: /opentelemetry/setup/collector_exporter/
[export-4]: https://opentelemetry.io/docs/specs/otel/protocol/exporter/
[export-8]: /opentelemetry/ingestion_sampling/#trace-metric-extrapolation-for-datadog-sdks
[export-9]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.67.0
[export-10]: https://github.com/DataDog/dd-trace-py/releases/tag/v4.15.0
[export-11]: https://github.com/DataDog/dd-trace-js/releases/tag/v6.20.0
[export-12]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.131.0
[export-13]: https://github.com/DataDog/dd-trace-go/releases/tag/v2.11.0
[export-14]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v3.55.0
[export-15]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.68.0
[export-16]: https://github.com/DataDog/dd-trace-py/releases/tag/v4.17.0
[export-17]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.110.0
[export-18]: https://github.com/DataDog/dd-trace-go/releases/tag/v2.12.0
