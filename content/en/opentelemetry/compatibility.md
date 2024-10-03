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

| Setup Type                                               | API         | SDK                     | Collector/Agent                         |
|----------------------------------------------------------|-------------|-------------------------|-----------------------------------------|
| **[Full OpenTelemetry][7]**                              | OTel API    | OTel SDK                | OTel Collector                          |
| **[OTel to Datadog Agent (OTLP)][6]**                    | OTel API    | OTel SDK                | Datadog Agent (OTLP Ingest)             |
| **[OTel API with Datadog SDK and Agent][8]**             | OTel API    | Datadog SDK             | Datadog Agent                           |
| **Datadog Agent with embedded OTel Collector (Preview)** | OTel API    | OTel SDK or Datadog SDK | Datadog Agent (with embedded Collector) |
| **Full Datadog**                                         | Datadog API | Datadog SDK             | Datadog Agent                           |

<div class="alert alert-info">The <strong>Agent with embedded OTel Collector (Preview)</strong> supports two data flow options:
    <li>OTel SDK &#8594; embedded Collector, or</li>
    <li>Datadog SDK &#8594; Datadog Agent</li></div>

## Feature compatibility

### Supported features

The following table shows feature compatibility across different setups:

| Feature                                       | Full OTel                          | OTel to Datadog Agent (OTLP)       | OTel API with Datadog SDK and Agent | Datadog Agent with embedded OTel Collector (Preview) | Full Datadog                       |
|-----------------------------------------------|------------------------------------|------------------------------------|-------------------------------------|------------------------------------------------------|------------------------------------|
| Application Security Monitoring (ASM)         |                                    |                                    | {{< X >}}                           | {{< X >}}<br>(Datadog SDK only)                      | {{< X >}}                          |
| Continuous Profiler                           |                                    |                                    | {{< X >}}                           | {{< X >}}<br>(Datadog SDK only)                      | {{< X >}}                          |
| Data Journaling Monitoring (DJM)              |                                    |                                    | {{< X >}}                           | {{< X >}}<br>(Datadog SDK only)                      | {{< X >}}                          |
| Database Monitoring (DBM)                     |                                    |                                    | {{< X >}}                           | {{< X >}}<br>(Datadog SDK only)                      | {{< X >}}                          |
| Data Streams Monitoring (DSM)                 |                                    |                                    | {{< X >}}                           | {{< X >}}<br>(Datadog SDK only)                      | {{< X >}}                          |
| Live Processes                                |                                    | {{< X >}}                          | {{< X >}}                           | {{< X >}}<br>(Datadog SDK only)                      | {{< X >}}                          |
| Universal Service Monitoring (USM)            |                                    |                                    | {{< X >}}                           | {{< X >}}<br>(Datadog SDK only)                      | {{< X >}}                          |
| Cloud SIEM                                    | {{< X >}}                          | {{< X >}}                          | {{< X >}}                           | {{< X >}}                                            | {{< X >}}                          |
| Correlated Traces, Metrics, Logs              | {{< X >}}                          | {{< X >}}                          | {{< X >}}                           | {{< X >}}                                            | {{< X >}}                          |
| Live Container Monitoring/Kubernetes Explorer |                                    | {{< X >}}                          | {{< X >}}                           | {{< X >}}                                            | {{< X >}}                          |
| Network Performance Monitoring (NPM)          |                                    | {{< X >}}                          | {{< X >}}                           | {{< X >}}                                            | {{< X >}}                          |
| Real User Monitoring (RUM)                    | {{< X >}}                          | {{< X >}}                          | {{< X >}}                           | {{< X >}}                                            | {{< X >}}                          |
| Runtime Metrics                               | {{< X >}}<br>(Java, .NET, Go only) | {{< X >}}<br>(Java, .NET, Go only) | {{< X >}}                           | {{< X >}}<br>(Java, .NET, Go only)                   | {{< X >}}                          |
| Source code integration                       | {{< X >}}                          | {{< X >}}                          | {{< X >}}                           | {{< X >}}<br>(Datadog SDK only)                      | {{< X >}}                          |

## More details

### Runtime Metrics

Setups using the OpenTelemetry SDK follow the [OpenTelemetry Runtime Metrics][1] specification.

### Real User Monitoring (RUM)

To enable full RUM functionality, you need to [inject supported headers][2] to correlate RUM and traces.

### Network Performance Monitoring (NPM)

Span-level or endpoint-level monitoring is **not** supported.

For more information, see [Network Performance Monitoring Setup][3].

### Live Processes

For **OTel to Datadog Agent (OTLP)**, you must enable the [Process Agent][4].

### Source Code Integration

For unsupported languages in OpenTelemetry setups, [configure telemetry tagging][5] to link data to a specific commit.

## Best practices

When using Datadog and OpenTelemetry together, Datadog recommends the following best practices to ensure optimal performance and to avoid potential issues:

- **Avoid Mixed Instrumentation**: Do not use both a Datadog SDK and a OpenTelemetry SDK to instrument the same application, as this leads to undefined behavior.
- **Avoid Agent and Separate Collector on Same Host**: Do not run the Datadog Agent and a separate OpenTelemetry Collector on the same host, as this may cause issues. However, you can run Agents and Collectors on different hosts within the same fleet.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/integrations/runtime_metrics/
[2]: /real_user_monitoring/platform/connect_rum_and_traces/
[3]: /network_monitoring/performance/setup/
[4]: /infrastructure/process/
[5]: /integrations/guide/source-code-integration/?tab=go#configure-telemetry-tagging
[6]: /opentelemetry/interoperability/otlp_ingest_in_the_agent/
[7]: /opentelemetry/collector_exporter/
[8]: /tracing/trace_collection/custom_instrumentation/otel_instrumentation/