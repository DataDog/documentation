---
title: Datadog and OpenTelemetry Compatibility
disable_sidebar: false
further_reading:
- link: /opentelemetry/troubleshooting/
  tag: "Documentation"
  text: "OpenTelemetry Troubleshooting"
---

## Overview

Datadog offers multiple setup options to accommodate various use cases, from full OpenTelemetry (OTel) implementations to hybrid setups using both OpenTelemetry and Datadog components. This page covers the compatibility between different setups and supported Datadog products and features, helping you choose the best configuration for your needs.

## Setups

Datadog supports several configurations for using OpenTelemetry. The primary difference between these setups is the choice of SDK (OpenTelemetry or Datadog) and the collector used to process and forward telemetry data.

| Setup Type                                 | API                     | SDK         | Collector/Agent                               |
|--------------------------------------------|-------------------------|-------------|-----------------------------------------------|
| [**Datadog SDK + DDOT (Recommended)**][29] | Datadog API or OTel API | Datadog SDK | Datadog Distribution of OTel Collector (DDOT) |
| [**OTel SDK + DDOT**][29]                  | OTel API                | OTel SDK    | Datadog Distribution of OTel Collector (DDOT) |
| [**OTel SDK + OSS Collector**][7]          | OTel API                | OTel SDK    | OTel Collector (OSS)                          |
| [**Direct OTLP Ingest**][28]                   | OTel API                | OTel SDK    | N/A (Direct to Datadog endpoint)              |

## Feature compatibility

The following table shows feature compatibility across different setups:

| Feature | Datadog SDK + DDOT (Recommended) | OTel SDK + DDOT | OTel SDK + OSS Collector | Direct OTLP Ingest |
|---|---|---|---|---|
| [Cloud SIEM][18] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Correlated Traces, Metrics, Logs][19] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Distributed Tracing][27] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [LLM Observability][38] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Runtime Metrics][23] | {{< X >}} | {{< X >}}<br>(Java, .NET, Go only) | {{< X >}}<br>(Java, .NET, Go only) | {{< X >}}<br>(Java, .NET, Go only) |
| [Span Links][25] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Trace Metrics][26] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}<br>({{< tooltip text="Sampled" tooltip="Calculated from spans that reach Datadog; reflects any OTel-side sampling you configure." >}}) |
| [Database Monitoring][14] (DBM) | {{< X >}} | {{< X >}} | {{< X >}} |  |
| [Infrastructure Host List][30] | {{< X >}} | {{< X >}} | {{< X >}} |  |
| [Cloud Network Monitoring][21] (CNM) | {{< X >}} | {{< X >}} | | |
| [Live Container Monitoring/Kubernetes Explorer][20] | {{< X >}} | {{< X >}} | | |
| [Live Processes][16] | {{< X >}} | {{< X >}} | | |
| [Universal Service Monitoring][17] (USM) | {{< X >}} | {{< X >}} | | |
| [App and API Protection][11] (AAP) | {{< X >}} | | | |
| [Continuous Profiler][12] | {{< X >}} | | | |
| [Data Jobs Monitoring][13] (DJM) | {{< X >}} | | | |
| [Data Streams Monitoring][15] (DSM) | {{< X >}} | | {{< tooltip text="N/A" tooltip="OTel does not offer DSM functionality" >}} | {{< tooltip text="N/A" tooltip="OTel does not offer DSM functionality" >}} |
| [Real User Monitoring][22] (RUM) | {{< X >}} | | | |
| [Source code integration][24] | {{< X >}} | | | |

## API support

Datadog provides support for the OpenTelemetry Traces, Metrics, and Logs APIs across various languages. Find your language in the table below for setup guides and support details.

| Language | Traces API | Metrics API | Logs API |
| :--- | :---: | :---: | :---: |
| [.NET][31] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Python][32] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Node.js][33] | {{< X >}} | *Not Yet Supported* | {{< X >}} |
| [Java][34] | {{< X >}} | *Not Yet Supported* | *Not Yet Supported* |
| [Go][35] | {{< X >}} | *Not Yet Supported* | *Not Yet Supported* |
| [Ruby][36] | {{< X >}} | *Not Yet Supported* | *Not Yet Supported* |
| [PHP][37] | {{< X >}} | *Not Yet Supported* | *Not Yet Supported* |

## More details

### LLM Observability

OpenTelemetry traces that have [generative AI attributes](https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/) are automatically converted into LLM Observability traces. To disable this conversion, see [Disabling LLM Observability conversion][38].

### Runtime metrics

Setups using the OpenTelemetry SDK follow the [OpenTelemetry Runtime Metrics][1] specification.

### Real User Monitoring (RUM)

To enable full RUM functionality, you need to [inject supported headers][2] to correlate RUM and traces.

### Cloud Network Monitoring (CNM)

Span-level or endpoint-level monitoring is **not** supported.

For more information, see [Cloud Network Monitoring Setup][3].

### Source Code Integration

For unsupported languages in OpenTelemetry setups, [configure telemetry tagging][5] to link data to a specific commit.

## Platform and environment support

While the OpenTelemetry Collector can be deployed in many environments, certain platforms have specific limitations or support requirements.

* **AWS EKS Fargate**: This environment is **not currently supported** and will result in incorrect infrastructure host billing when used with the OpenTelemetry Collector. Official support is planned for a future release. See the [Collector setup guide][7] for the most up-to-date information.

## Best practices

When using Datadog and OpenTelemetry together, Datadog recommends the following best practices to ensure optimal performance and to avoid potential issues:

- **Avoid mixed instrumentation**: In most cases, you should not use both a Datadog SDK and an OpenTelemetry SDK in the same application, as this leads to undefined behavior.
  - **Exception**: Support for some languages, such as Python, requires both the Datadog SDK and the OpenTelemetry SDK to be installed.
  - Always follow the specific [language-specific instrumentation documentation][8] to ensure you are using the correct and supported setup.
- **Avoid Agent and separate Collector on same host**: Do not run the Datadog Agent and a separate OpenTelemetry Collector on the same host, as this may cause issues. However, you can run Agents and Collectors on different hosts within the same fleet.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/integrations/runtime_metrics/
[2]: /real_user_monitoring/correlate_with_other_telemetry/apm/
[3]: /network_monitoring/cloud_network_monitoring/setup/
[4]: /infrastructure/process/
[5]: /integrations/guide/source-code-integration/?tab=go#configure-telemetry-tagging
[6]: /opentelemetry/interoperability/otlp_ingest_in_the_agent/
[7]: /opentelemetry/collector_exporter/
[8]: /tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[9]: /opentelemetry/agent
[10]: /tracing/trace_collection/
[11]: /security/application_security/
[12]: /profiler/
[13]: /data_jobs/
[14]: /opentelemetry/correlate/dbm_and_traces/
[15]: /data_streams/
[16]: /infrastructure/process/
[17]: /universal_service_monitoring/
[18]: /security/cloud_siem/
[19]: /opentelemetry/correlate/
[20]: /containers/
[21]: /network_monitoring/performance/
[22]: /opentelemetry/correlate/rum_and_traces/?tab=browserrum#opentelemetry-support
[23]: /tracing/metrics/runtime_metrics/
[24]: /integrations/guide/source-code-integration/
[25]: /tracing/trace_collection/span_links/
[26]: /tracing/metrics/metrics_namespace/
[27]: /tracing/trace_collection/
[28]: /opentelemetry/setup/agentless
[29]: /opentelemetry/setup/ddot_collector
[30]: /infrastructure/list/
[31]: /opentelemetry/instrument/api_support/dotnet/
[32]: /opentelemetry/instrument/api_support/python/
[33]: /opentelemetry/instrument/api_support/nodejs/
[34]: /opentelemetry/instrument/api_support/java/
[35]: /opentelemetry/instrument/api_support/go/
[36]: /opentelemetry/instrument/api_support/ruby/
[37]: /opentelemetry/instrument/api_support/php/
[38]: /llm_observability/instrumentation/otel_instrumentation/
