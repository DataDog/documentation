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

| Setup Type                                         | API         | SDK         | Collector/Agent                         |
|----------------------------------------------------|-------------|-------------|-----------------------------------------|
| **Full OpenTelemetry**                             | OTel API    | OTel SDK    | OTel Collector                          |
| **OTel to Datadog (OTLP)**                         | OTel API    | OTel SDK    | Datadog Agent (OTLP Ingest)             |
| **OTel API with Datadog SDK and Agent**            | OTel API    | Datadog SDK | Datadog Agent                           |
| **OTel with embedded Datadog Collector (Preview)** | OTel API    | OTel SDK    | Datadog Agent (with embedded Collector) |
| **Full Datadog**                                   | Datadog API | Datadog SDK | Datadog Agent                           |

## Feature compatibility

### Supported features

The following table shows feature compatibility across different setups:

| Feature                                | Full OTel                          | OTel to Datadog (OTLP)             | OTel API with Datadog SDK and Agent | OTel with embedded Datadog Collector (Preview) | Full Datadog                       |
|----------------------------------------|------------------------------------|------------------------------------|-------------------------------------|------------------------------------------------|------------------------------------|
| Application Security Monitoring (ASM)  |                                    |                                    | {{< X >}}                           |                                                | {{< X >}}                          |
| Continuous Profiler                    |                                    |                                    | {{< X >}}                           |                                                | {{< X >}}                          |
| Data Journaling Monitoring (DJM)       |                                    |                                    | {{< X >}}                           |                                                | {{< X >}}                          |
| Database Monitoring (DBM)              |                                    |                                    | {{< X >}}                           |                                                | {{< X >}}                          |
| Data Streams Monitoring (DSM)          |                                    |                                    | {{< X >}}                           |                                                | {{< X >}}                          |
| Live Processes                         |                                    | {{< X >}}                          | {{< X >}}                           |                                                | {{< X >}}                          |
| Mobile SDKs                            |                                    |                                    | {{< X >}}                           |                                                | {{< X >}}                          |
| Universal Service Monitoring (USM)     |                                    |                                    | {{< X >}}                           |                                                | {{< X >}}                          |
| Cloud SIEM                             | {{< X >}}                          | {{< X >}}                          | {{< X >}}                           | {{< X >}}                                      | {{< X >}}                          |
| Correlated Traces, Metrics, Logs       | {{< X >}}                          | {{< X >}}                          | {{< X >}}                           | {{< X >}}                                      | {{< X >}}                          |
| Live Container Monitoring/K8s Explorer |                                    | {{< X >}}                          | {{< X >}}                           | {{< X >}}                                      | {{< X >}}                          |
| Network Performance Monitoring (NPM)   |                                    | {{< X >}}                          | {{< X >}}                           | {{< X >}}                                      | {{< X >}}                          |
| Real User Monitoring (RUM)             | {{< X >}}                          | {{< X >}}                          | {{< X >}}                           | {{< X >}}                                      | {{< X >}}                          |
| Runtime Metrics                        | {{< X >}}<br>(Java, .NET, Go only) | {{< X >}}<br>(Java, .NET, Go only) | {{< X >}}                           | {{< X >}}                                      | {{< X >}}<br>(Java, .NET, Go only) |
| Source code integration                | {{< X >}}                          | {{< X >}}                          | {{< X >}}                           |                                                | {{< X >}}                          |

## More details

### Runtime Metrics

Setups using the OpenTelemetry SDK follow the [OpenTelemetry Runtime Metrics][1] specification.

### Real User Monitoring (RUM)

To enable full RUM functionality, you need to [inject supported headers][2] to correlate RUM and traces.

### Network Performance Monitoring (NPM)

For **OTel to Datadog (OTLP)** and **OTel with embedded Datadog Collector (Preview)** setups, span-level or endpoint-level monitoring is **not** supported.

For more information, see [Network Performance Monitoring Setup][3].

### Live Processes

For **OTel to Datadog (OTLP)**, you must enable the [Process Agent][4].

### Source Code Integration

For unsupported languages in OpenTelemetry setups, [configure telemetry tagging][5] to link data to a specific commit.

## Best practices

- **Avoid Mixed Instrumentation**: Don't use both Datadog SDK and OpenTelemetry SDK to instrument the same application.
- **Avoid Agent and Separate Collector**: Don't use the Datadog Agent and a separate OpenTelemetry Collector at the same time.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/integrations/runtime_metrics/
[2]: /real_user_monitoring/platform/connect_rum_and_traces/
[3]: /network_monitoring/performance/setup/
[4]: /infrastructure/process/
[5]: /integrations/guide/source-code-integration/?tab=go#configure-telemetry-tagging