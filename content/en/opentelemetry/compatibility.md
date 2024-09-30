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

| Feature                                | Full OTel                          | OTel to Datadog (OTLP)             | OTel API with Datadog API and Agent | OTel with embedded Datadog Collector (Preview) | Full Datadog                       |
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
| Source code integration                | {{< X >}}                          | {{< X >}}                          | {{< X >}}                           | {{< X >}}                                      | {{< X >}}                          |

## More details

### Application Security Monitoring (ASM)

Currently only supported in setups using the Datadog SDK.

### Cloud SIEM

Supported across all setups.

### Continuous Profiler

Currently available only in setups using the Datadog SDK.

### Correlated Traces, Metrics, and Logs

All setups support correlated traces, metrics, and logs, providing a unified view of your application's performance.

### Data Journaling Monitoring (DJM)

This feature is currently only supported in setups using the Datadog SDK.

### Database Monitoring (DBM)

This feature is currently only supported in setups using the Datadog SDK.

### Digital Security Monitoring (DSM)

This feature is currently only supported in setups using the Datadog SDK.

### Live Container Monitoring/K8s Explorer

Supported in most setups except for the pure OpenTelemetry configuration. Follow internal documentation for specific requirements.

### Live Processes

Supported in setups using the Datadog Agent. Requires enabling the process agent and container IDs.

### Mobile SDKs

Full iOS and Android support is available for setups using the Datadog SDK.

### Network Performance Monitoring (NPM)

Supported in setups using the Datadog Agent, providing visibility into network traffic between services and containers. Note: Span level/endpoint monitoring is not currently supported.

### Real User Monitoring (RUM)

Supported across all setups. OpenTelemetry setups require injecting supported headers.

### Runtime Metrics

OpenTelemetry setups support runtime metrics for Java, .NET, and Go. Datadog SDK setups support runtime metrics for all supported languages.

### Source Code Integration

Supported in most setups. For unsupported languages, follow the guide on configuring telemetry tagging.

### Universal Service Monitoring (USM)

Currently only supported in setups using the Datadog SDK.

## Best practices

**Avoid Mixed Instrumentation**: Don't use both Datadog SDK and OpenTelemetry SDK to instrument the same application.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}