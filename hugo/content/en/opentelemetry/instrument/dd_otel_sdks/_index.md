---
title: Using Datadog OpenTelemetry SDKs
description: Use Datadog SDKs with the OpenTelemetry API, or export traces from supported Datadog SDKs in OTLP format.
aliases:
    - /opentelemetry/instrument/dd_sdks/
further_reading:
    - link: '/opentelemetry/compatibility/'
      text: 'OpenTelemetry feature compatibility'
      tag: 'Documentation'
    - link: '/opentelemetry/setup/ddot_collector/'
      text: 'Datadog Distribution of the OpenTelemetry Collector (DDOT)'
      tag: 'Documentation'
    - link: '/tracing/trace_collection/single-step-apm/'
      text: 'Single Step Instrumentation'
      tag: 'Documentation'
algolia:
  tags: ['otel custom instrumentation']
---

In this guide, **Datadog OpenTelemetry SDKs** refers to Datadog SDKs used with one or both of the following interoperability features:

- **OpenTelemetry API support** lets your application use vendor-neutral OpenTelemetry API calls while a Datadog SDK provides the implementation.
- **OTLP trace export** lets a supported Datadog SDK send traces in OTLP format to an OTLP-compatible receiver. This feature is in Preview.

These features are independent. You can use the OpenTelemetry API without OTLP export, or export Datadog SDK traces in OTLP format without changing your instrumentation API. If your application already uses a Datadog SDK and does not need either feature, you do not need to migrate it.

## Adapt an existing deployment

Before adding or changing an SDK, identify what is already attached to the application process:

- **A Datadog SDK is attached:** Keep the existing installation method. Enable only the [OpenTelemetry API support][1] or [OTLP trace export][2] that you need, and preserve intentional instrumentation settings.
- **An upstream OpenTelemetry SDK is attached:** Do not attach a Datadog SDK to the same process unless the [language-specific API support documentation][1] explicitly supports the combination. Preserve existing providers, processors, exporters, and disabled instrumentations while you plan the change.
- **SSI injects a Datadog SDK:** Do not add another SDK. To replace it with an upstream OpenTelemetry SDK, [exclude only the affected workloads from SSI][3]. Use a workload-scoped `DatadogInstrumentation` resource when supported, or use scoped instrumentation rules. Recreate the workload's pods after changing SSI configuration.

## Choose a deployment method

Use only one SDK deployment method for each application process.

| Environment | Recommended method | What it does |
|---|---|---|
| Kubernetes or supported Linux hosts | [Datadog Single Step Instrumentation][4] | Centrally injects and configures a Datadog SDK for supported languages without changing application code. |
| Kubernetes, other containers, hosts, or serverless | [Language-specific Datadog SDK setup][5] | Installs the Datadog SDK in the application image, build, or deployment. |

### With the OpenTelemetry Operator (Kubernetes)

The standard OpenTelemetry Operator injects upstream OpenTelemetry auto-instrumentation, not Datadog SDKs. Installing the Operator alone does not instrument workloads. If you want the Operator-managed upstream SDK, follow [Using Upstream OpenTelemetry SDKs][6]. If you want a Datadog SDK, use SSI or a language-specific Datadog installation instead.

If a Datadog SDK is already installed in the application, the Operator's `instrumentation.opentelemetry.io/inject-sdk: "true"` annotation can inject configuration environment variables from an `Instrumentation` resource. It does not install the SDK or an auto-instrumentation agent. Review the [OpenTelemetry environment variables supported by Datadog SDKs][7] before using this configuration-only option.

### Without the OpenTelemetry Operator (Kubernetes or other environments)

Use [SSI][4] to centrally deploy Datadog SDKs to supported Kubernetes or Linux workloads. For other deployments, install the Datadog SDK by following the [language-specific tracing setup][5], then build and deploy the application through your normal release process.

Do not combine SSI with a Datadog SDK already installed in the application image. When you change injection labels, targeting rules, or application images, replace the existing pods or processes so the new SDK configuration takes effect.

## Choose how traces reach Datadog

With native trace export, Datadog SDKs send traces to a Datadog Agent. Some features also use Agent endpoints such as DogStatsD. A standalone OpenTelemetry Collector is not required for this route.

With [OTLP trace export][2], supported Datadog SDKs send traces to an OTLP receiver such as the DDOT Collector or another OpenTelemetry Collector. The Collector can batch, enrich, and route telemetry before exporting it to Datadog. The way you install the SDK does not determine which Collector deployment you use.

Metrics, logs, runtime metrics, and traces can use different exporters or Agent endpoints. Review [support for your language and signal][1] instead of applying the trace route to every telemetry type.

## Configure interoperability features

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/dd_otel_sdks/api_support/" >}}
    <h3>Use the OpenTelemetry API</h3>
    Review signal and language support, and configure the Datadog SDK as the OpenTelemetry API implementation.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/instrument/dd_otel_sdks/otlp_trace_export/" >}}
    <h3>Export traces in OTLP format</h3>
    Configure supported Datadog SDKs to send traces to an OTLP-compatible receiver. In Preview.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/instrument/dd_otel_sdks/instrumentation_libraries/" >}}
    <h3>Use OpenTelemetry instrumentation libraries</h3>
    Extend supported Datadog SDKs with OpenTelemetry instrumentation libraries while preventing duplicate spans.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/environment_variable_support/" >}}
    <h3>Configure environment variables</h3>
    Review the OpenTelemetry SDK environment variables supported by Datadog SDKs.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Verify the deployment

After you roll out the workload:

1. Confirm that only the intended SDK is attached to each process.
1. Generate application traffic and check that traces appear in Datadog.
1. Check traces for duplicate spans or unexpected service names.
1. If you use OTLP export, verify that the receiver is healthy and exporting data to Datadog.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/instrument/dd_otel_sdks/api_support/
[2]: /opentelemetry/instrument/dd_otel_sdks/otlp_trace_export/
[3]: /tracing/trace_collection/single-step-apm/kubernetes/#remove-instrumentation-for-specific-services
[4]: /tracing/trace_collection/single-step-apm/
[5]: /tracing/trace_collection/dd_libraries/
[6]: /opentelemetry/instrument/upstream_otel_sdks/
[7]: /opentelemetry/config/environment_variable_support/
