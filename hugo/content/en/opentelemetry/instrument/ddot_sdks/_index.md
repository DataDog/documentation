---
title: Using DDOT SDKs
description: Use DDOT SDKs, Datadog's version of OpenTelemetry SDKs, with support for OpenTelemetry APIs, OTLP, and additional Datadog-specific capabilities.
aliases:
    - /opentelemetry/instrument/dd_sdks/
    - /opentelemetry/instrument/dd_otel_sdks/
further_reading:
    - link: '/opentelemetry/compatibility/'
      text: 'OpenTelemetry feature compatibility'
      tag: 'Documentation'
    - link: '/opentelemetry/setup/ddot_collector/'
      text: 'Datadog Distribution of the OpenTelemetry Collector (DDOT Collector)'
      tag: 'Documentation'
    - link: 'https://opentelemetry.io/docs/platforms/kubernetes/operator/automatic/'
      text: 'OpenTelemetry Operator automatic instrumentation'
      tag: 'External Site'
algolia:
  tags: ['otel custom instrumentation']
---

DDOT SDKs are Datadog's version of OpenTelemetry SDKs and are in Preview. They emit traces, metrics, and logs that follow OpenTelemetry Semantic Conventions over OTLP. They use standard OpenTelemetry configuration and deployment tooling, and add Datadog-specific capabilities. DDOT SDKs are available for Java, .NET, Node.js, Python, and Go.

DDOT SDKs add capabilities such as Live Debugger, Dynamic Instrumentation, SQL query-level Database Monitoring, and Data Streams Monitoring. Some capabilities require the Datadog Agent for Remote Configuration or data delivery. See [feature compatibility][8] for additional capabilities and requirements.

You can replace a DDOT SDK with its upstream equivalent and keep OpenTelemetry API instrumentation and standard OpenTelemetry configuration. Change the SDK package or auto-instrumentation image, or, for Go, the build-time instrumentation. OpenTelemetry telemetry remains available; Datadog-specific capabilities are no longer available. Code that uses Datadog-specific APIs or initializes the SDK directly may need changes.

## Deployment methods

DDOT SDKs support OpenTelemetry deployment methods, including Operator injection and installation in the application build or deployment.

| Environment | Method | What it does |
|---|---|---|
| Kubernetes | [OpenTelemetry Operator][9] | Injects the auto-instrumentation image configured in an `Instrumentation` resource. |
| Kubernetes, other containers, hosts, or serverless | [Language-specific SDK setup][5] | Installs the SDK in the application build or deployment. |

### Kubernetes deployment

The Operator's `Instrumentation` resource selects the SDK images injected into workloads. DDOT SDK images replace the default upstream images for Java, Python, Node.js, and .NET. For Operator installation, custom image configuration, and workload annotations, see [OpenTelemetry Operator automatic instrumentation][9].

Go applications include the SDK and instrumentation at build time. The Operator's `instrumentation.opentelemetry.io/inject-sdk` annotation supplies configuration to the application; it does not install an SDK.

### Application installation

For installation without the Operator, see the [language-specific SDK setup][5] and configure OpenTelemetry mode as described below.

## Configure OpenTelemetry mode and export

DDOT SDKs send traces, metrics, and logs over OTLP to an OpenTelemetry Collector. The Collector can batch, enrich, and route telemetry before exporting it to Datadog or another OTLP-compatible backend. A Datadog Agent is optional for these signals.

Set the following environment variables to enable OpenTelemetry APIs, trace semantic conventions, and OTLP export:

```shell
OTEL_TRACES_EXPORTER=otlp
DD_TRACE_OTEL_ENABLED=true
DD_TRACE_OTEL_SEMANTICS_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_LOGS_OTEL_ENABLED=true
```

Configure the OTLP endpoints and protocols to match your Collector. Support varies by language, signal, and SDK version. For configuration details, see [OTLP trace export][2], [OpenTelemetry API support][1], and the [environment variable reference][7].

Live Debugger, Dynamic Instrumentation, and remotely configured head sampling require the Datadog Agent for configuration or data delivery. Traces, metrics, and logs continue to use OTLP through the Collector.

## Configure capabilities

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/ddot_sdks/api_support/" >}}
    <h3>Use the OpenTelemetry API</h3>
    Create custom traces, metrics, and logs with OpenTelemetry APIs. Review support for your language and signal.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/instrument/ddot_sdks/otlp_trace_export/" >}}
    <h3>Export traces in OTLP format</h3>
    Configure a Datadog SDK to send traces to an OTLP-compatible receiver.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/instrument/ddot_sdks/instrumentation_libraries/" >}}
    <h3>Use OpenTelemetry instrumentation libraries</h3>
    Review which OpenTelemetry instrumentation libraries work with Datadog and DDOT SDKs while preventing duplicate spans.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/environment_variable_support/" >}}
    <h3>Configure environment variables</h3>
    Review the OpenTelemetry SDK and OTLP exporter environment variables supported by DDOT SDKs.
    {{< /nextlink >}}
{{< /whatsnext >}}

## View your telemetry

View your application's traces in [Trace Explorer][10], metrics in [Metrics Explorer][11], and logs in [Log Explorer][12]. For missing telemetry, see [OpenTelemetry troubleshooting][13].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/instrument/ddot_sdks/api_support/
[2]: /opentelemetry/instrument/ddot_sdks/otlp_trace_export/
[5]: /tracing/trace_collection/dd_libraries/
[7]: /opentelemetry/config/environment_variable_support/
[8]: /opentelemetry/compatibility/#ddot-sdk-setups
[9]: https://opentelemetry.io/docs/platforms/kubernetes/operator/automatic/
[10]: /tracing/trace_explorer/
[11]: /metrics/explorer/
[12]: /logs/explorer/
[13]: /opentelemetry/troubleshooting/
