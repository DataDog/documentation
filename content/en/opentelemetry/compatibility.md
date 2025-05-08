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

The following setups are supported:

| Setup Type                                                    | API         | SDK                     | Collector/Agent                         |
|---------------------------------------------------------------|-------------|-------------------------|-----------------------------------------|
| **[Full OpenTelemetry][7]**                                   | OTel API    | OTel SDK                | OTel Collector                          |
| **[OTel to Datadog Agent (OTLP)][6]**                         | OTel API    | OTel SDK                | Datadog Agent (OTLP Ingest)             |
| **[OTel API with Datadog SDK and Agent][8]**                  | OTel API    | Datadog SDK             | Datadog Agent                           |
| **[Datadog Distribution of OTel Collector (DDOT)][9]** | OTel API    | OTel SDK or Datadog SDK | Datadog Agent (with DDOT Collector) |
| **[Full Datadog][10]**                                        | Datadog API | Datadog SDK             | Datadog Agent                           |

<div class="alert alert-info">The <strong>Datadog Distribution of OTel Collector</strong> supports two data flow options:
    <li>OTel SDK &#8594; DDOT Collector, or</li>
    <li>Datadog SDK &#8594; Datadog Agent</li></div>

## Feature compatibility

### Supported Datadog features

The following table shows Datadog feature compatibility across different setups:

| Feature                                             | Full OTel                          | OTel to Datadog Agent (OTLP)       | OTel API with Datadog SDK and Agent | DDOT Collector | Full Datadog |
|-----------------------------------------------------|------------------------------------|------------------------------------|-------------------------------------|------------------------------------------------------|--------------|
| [Distributed Tracing][27]                           | {{< X >}}                          | {{< X >}}                          | {{< X >}}                           | {{< X >}}                                            | {{< X >}}    |
| [Trace Metrics][26]                                 | {{< X >}}                          | {{< X >}}                          | {{< X >}}                           | {{< X >}}                                            | {{< X >}}    |
| [Correlated Traces, Metrics, Logs][19]              | {{< X >}}                          | {{< X >}}                          | {{< X >}}                           | {{< X >}}                                            | {{< X >}}    |
| [Runtime Metrics][23]                               | {{< X >}}<br>(Java, .NET, Go only) | {{< X >}}<br>(Java, .NET, Go only) | {{< X >}}                           | {{< X >}}<br>(Java, .NET, Go only)                   | {{< X >}}    |
| [Source code integration][24]                       | {{< X >}}                          | {{< X >}}                          | {{< X >}}                           | {{< X >}}<br>(Datadog SDK required)                  | {{< X >}}    |
| [Real User Monitoring][22] (RUM)                    | {{< X >}}                          | {{< X >}}                          | {{< X >}}                           | {{< X >}}                                            | {{< X >}}    |
| [Cloud SIEM][18]                                    | {{< X >}}                          | {{< X >}}                          | {{< X >}}                           | {{< X >}}                                            | {{< X >}}    |
| [Cloud Network Monitoring][21] (CNM)                |                                    | {{< X >}}                          | {{< X >}}                           | {{< X >}}                                            | {{< X >}}    |
| [Live Container Monitoring/Kubernetes Explorer][20] |                                    | {{< X >}}                          | {{< X >}}                           | {{< X >}}                                            | {{< X >}}    |
| [Live Processes][16]                                |                                    | {{< X >}}                          | {{< X >}}                           | {{< X >}}                                            | {{< X >}}    |
| [Universal Service Monitoring][17] (USM)            |                                    |{{< X >}}                           | {{< X >}}                           | {{< X >}}                                            | {{< X >}}    |
| [App and API Protection][11] (AAP)         |                                    |                                    | {{< X >}}                           | {{< X >}}<br>(Datadog SDK required)                  | {{< X >}}    |
| [Continuous Profiler][12]                           |                                    |                                    | {{< X >}}                           | {{< X >}}<br>(Datadog SDK required)                  | {{< X >}}    |
| [Data Jobs Monitoring][13] (DJM)                    |                                    |                                    | {{< X >}}<br>(Datadog SDK required) | {{< X >}}<br>(Datadog SDK required)                  | {{< X >}}    |
| [Data Streams Monitoring][15] (DSM)                 | {{< tooltip text="N/A" tooltip="OTel does not offer DSM functionality" >}}|   | {{< X >}}               | {{< X >}}                                            | {{< X >}}    |
| [Database Monitoring][14] (DBM)                     | {{< tooltip text="N/A" tooltip="OTel does not offer DBM functionality" >}}|   | {{< X >}}<br>(Datadog SDK required) | {{< X >}}<br>(Datadog SDK required)                  | {{< X >}}    |

### Supported OpenTelemetry features

The following table shows OpenTelemetry feature compatibility across different setups:

| Feature                                             | Full OTel                          | OTel to Datadog Agent (OTLP)       | OTel API with Datadog SDK and Agent | DDOT Collector | Full Datadog |
|-----------------------------------------------------|------------------------------------|------------------------------------|-------------------------------------|------------------------------------------------------|--------------|
| [Span Links][25]                                    | {{< X >}}                          | {{< X >}}                          | {{< X >}}                           | {{< X >}}                                            |              |

## More details

### Runtime metrics

Setups using the OpenTelemetry SDK follow the [OpenTelemetry Runtime Metrics][1] specification.

### Real User Monitoring (RUM)

To enable full RUM functionality, you need to [inject supported headers][2] to correlate RUM and traces.

### Cloud Network Monitoring (CNM)

Span-level or endpoint-level monitoring is **not** supported.

For more information, see [Cloud Network Monitoring Setup][3].

### Live Processes

For **OTel to Datadog Agent (OTLP)**, you must enable the [Process Agent][4].

### Source Code Integration

For unsupported languages in OpenTelemetry setups, [configure telemetry tagging][5] to link data to a specific commit.

## Best practices

When using Datadog and OpenTelemetry together, Datadog recommends the following best practices to ensure optimal performance and to avoid potential issues:

- **Avoid mixed instrumentation**: Do not use both a Datadog SDK and an OpenTelemetry SDK to instrument the same application, as this leads to undefined behavior.
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
[14]: /database_monitoring/
[15]: /data_streams/
[16]: /infrastructure/process/
[17]: /universal_service_monitoring/
[18]: /security/cloud_siem/
[19]: /tracing/other_telemetry/
[20]: /containers/
[21]: /network_monitoring/performance/
[22]: /real_user_monitoring/
[23]: /tracing/metrics/runtime_metrics/
[24]: /integrations/guide/source-code-integration/
[25]: /tracing/trace_collection/span_links/
[26]: /tracing/metrics/metrics_namespace/
[27]: /tracing/trace_collection/
