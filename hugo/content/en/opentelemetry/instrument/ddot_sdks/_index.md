---
title: Using Datadog OpenTelemetry SDKs
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

DDOT SDKs are Datadog's version of the OpenTelemetry APM SDKs. They emit traces, metrics, and logs that follow OpenTelemetry Semantic Conventions over OTLP. They use standard OpenTelemetry configuration and deployment tooling, and add Datadog-specific capabilities. DDOT SDKs are available for Java, .NET, Node.js, Python, and Go.

DDOT SDKs add Live Debugger, Dynamic Instrumentation, SQL query-level Database Monitoring, and Data Streams Monitoring. They also support App and API Protection, Feature Flag Management, and Code Security. Some capabilities require the Datadog Agent for Remote Configuration or data delivery. Review [feature compatibility][8] for details.

## Adapt an existing deployment

Before adding or changing an SDK, identify what is already attached to the application process:

- **A Datadog SDK is attached:** Keep the existing installation method and preserve intentional instrumentation settings. For supported languages, the same binary becomes a DDOT SDK when you activate OpenTelemetry mode; no separate SDK installation is required.
- **An upstream OpenTelemetry SDK is attached:** Do not attach a DDOT SDK to the same process. Replace the upstream SDK package or auto-instrumentation image with its DDOT equivalent, and preserve existing OpenTelemetry providers, processors, exporters, and disabled instrumentations.

## Choose a deployment method

Use only one SDK deployment method for each application process.

| Environment | Method | What it does |
|---|---|---|
| Kubernetes | OpenTelemetry Operator | Injects the auto-instrumentation image configured in an `Instrumentation` resource. |
| Kubernetes, other containers, hosts, or serverless | [Language-specific SDK setup][5] | Installs the DDOT SDK the same way you would install its upstream OpenTelemetry equivalent. |

### With the OpenTelemetry Operator (Kubernetes)

The OpenTelemetry Operator injects the auto-instrumentation image configured in its `Instrumentation` resource. The default images contain upstream OpenTelemetry SDKs. Configure DDOT SDK images for Java, Python, Node.js, and .NET. For Go, instrument the application at build time and use `instrumentation.opentelemetry.io/inject-sdk` to inject only the configuration. Installing the Operator alone does not instrument workloads; add the appropriate injection annotation to the pod template.

If another tool already injects an SDK, disable that injection for the application before enabling OpenTelemetry Operator injection. Restart the application pods to apply the change.

The `instrumentation.opentelemetry.io/inject-sdk: "true"` annotation has a different purpose: it injects configuration environment variables from an `Instrumentation` resource into an application that already contains an SDK. It does not install an SDK or auto-instrumentation agent. Review the [supported OpenTelemetry environment variables][7] before using this configuration-only option.

### Without the OpenTelemetry Operator (Kubernetes or other environments)

Install the SDK by following the [language-specific setup][5], then build and deploy the application through your normal release process. DDOT SDKs support the same deployment methods as their upstream OpenTelemetry equivalents.

Restart the application after changing its SDK installation or configuration.

## Configure OpenTelemetry mode and export

DDOT SDKs send traces, metrics, and logs over OTLP to an OpenTelemetry Collector. The Collector can batch, enrich, and route telemetry before exporting it to Datadog or another OTLP-compatible backend. A Datadog Agent is optional for these signals.

DDOT SDKs use the same binaries as Datadog SDKs. Activate OpenTelemetry mode with the following settings, and configure an `OTEL_EXPORTER_OTLP_*_ENDPOINT` that points to your Collector:

```shell
OTEL_TRACES_EXPORTER=otlp
DD_TRACE_OTEL_ENABLED=true
DD_TRACE_OTEL_SEMANTICS_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_LOGS_OTEL_ENABLED=true
```

There is no single activation switch for all signals. Supported versions may use separate exporters or endpoints for traces, metrics, logs, and runtime metrics. This is a temporary limitation while Datadog works toward a unified OTLP configuration for core telemetry. Review [support for your language and signal][1] and the [supported environment variables][7].

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

## Verify the deployment

After you roll out the workload:

1. Confirm that only the intended SDK is attached to each process.
1. Generate application traffic and verify that each configured signal appears in Datadog.
1. Check traces for duplicate spans or unexpected service names.
1. If you use OTLP export, verify that the receiver is healthy and exporting every configured signal to Datadog.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/instrument/ddot_sdks/api_support/
[2]: /opentelemetry/instrument/ddot_sdks/otlp_trace_export/
[5]: /tracing/trace_collection/dd_libraries/
[7]: /opentelemetry/config/environment_variable_support/
[8]: /opentelemetry/compatibility/#ddot-sdk-setups
