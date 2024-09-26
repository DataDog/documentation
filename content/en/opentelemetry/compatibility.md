---
title: Datadog and OpenTelemetry Compatibility
disable_sidebar: true
further_reading:
- link: /opentelemetry/troubleshooting/
  tag: "Documentation"
  text: "OpenTelemetry Troubleshooting"
---

## Overview

Datadog offers multiple setup options to accommodate various use cases, from full OpenTelemetry (OTel) implementations to hybrid setups using both OpenTelemetry and Datadog components. This page covers the compatibility between different setups and supported Datadog products and features, helping you choose the best configuration for your needs.

## Setups

The following setups are supported:

- **Full OpenTelemetry setup**: OTel API + OTel SDK + OTel Collector
- OTel API + OTel SDK + OTLP Ingest in the Datadog Agent
- OTel API + DD SDK + Datadog Agent
- (Preview) OTel API + OTel SDK + Datadog Agent with embedded Collector
- **Full Datadog setup**: DD API + DD SDK + Datadog Agent

## Feature compatibility

The following tables show feature compatibility across different setups:

### Fully supported features

| Feature                                | All Setups |
|----------------------------------------|------------|
| Cloud SIEM                             | {{< X >}} |
| Correlated Traces, Metrics, Logs       | {{< X >}} |
| Real User Monitoring (RUM)             | {{< X >}} |

### Partially supported features

| Feature                                | OTel API + DD SDK + Agent | DD API + DD SDK + Agent     | OTel API + OTel SDK + OTel Collector | OTel API + OTel SDK + OTLP Ingest in Agent | OTel API + OTel SDK + Agent with embedded Collector |
|----------------------------------------|---------------------------|-----------------------------|--------------------------------------|--------------------------------------------|-----------------------------------------------------|
| Application Security Monitoring (ASM)  | {{< X >}}                 | {{< X >}}                   |                                      |                                            |                                                     |
| Continuous Profiler                    | {{< X >}}                 | {{< X >}}                   |                                      |                                            |                                                     |
| Data Journaling Monitoring (DJM)       | {{< X >}}                 | {{< X >}}                   |                                      |                                            |                                                     |
| Database Monitoring (DBM)              | {{< X >}}                 | {{< X >}}                   |                                      |                                            |                                                     |
| Digital Security Monitoring (DSM)      | {{< X >}}                 | {{< X >}}                   |                                      |                                            |                                                     |
| Live Container Monitoring/K8s Explorer | {{< X >}}                 | {{< X >}}                   |                                      | {{< X >}}                                  | {{< X >}}                                           |
| Live Processes                         | {{< X >}}                 | {{< X >}}                   |                                      | {{< X >}}                                  |                                                     |
| Mobile SDKs                            | {{< X >}}                 | {{< X >}} (iOS and Android) |                                      |                                            |                                                     |
| Network Performance Monitoring (NPM)   | {{< X >}}                 | {{< X >}}                   |                                      | {{< X >}}                                  | {{< X >}}                                           |
| Runtime Metrics                        | {{< X >}}                 | {{< X >}}                   | {{< X >}} (Java, .NET, Go only)      | {{< X >}} (Java, .NET, Go only)            | {{< X >}} (Java, .NET, Go only)                     |
| Source code integration                | {{< X >}}                 | {{< X >}}                   | {{< X >}}                            | {{< X >}}                                  |                                                     |
| Universal Service Monitoring (USM)     | {{< X >}}                 | {{< X >}}                   |                                      |                                            |                                                     |

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




## Supported Setups

Datadog supports the following setups:

1. OTel API + OTel SDK + OTel Collector
   - Full OpenTelemetry implementation
2. OTel API + OTel SDK + OTLP Ingest in the Datadog Agent
   - OpenTelemetry instrumentation with Datadog Agent ingestion
3. OTel API + DD SDK + Datadog Agent
   - OpenTelemetry API with Datadog SDK and Agent
4. (Preview) OTel API + OTel SDK + Datadog Agent with embedded Collector
   - OpenTelemetry implementation with Datadog Agent integration
5. DD API + DD SDK + Datadog Agent
   - Full Datadog implementation


## Feature Details

### Application Security Monitoring (ASM)
Currently only supported in setups using the Datadog SDK. ASM provides real-time protection against application-level attacks.

[Learn more about ASM](https://docs.datadoghq.com/security_platform/application_security/)

### Cloud SIEM
Supported across all setups. Cloud SIEM aggregates security signals from multiple sources to detect threats.

[Learn more about Cloud SIEM](https://docs.datadoghq.com/security_platform/cloud_siem/)

### Continuous Profiler
Available only in setups using the Datadog SDK. It helps identify performance bottlenecks in your code.

[Learn more about Continuous Profiler](https://docs.datadoghq.com/tracing/profiler/)

...

[Additional feature details would be added here]

...

## Setup Decision Guide

To choose the best setup for your needs:

1. If you require full OpenTelemetry compatibility:
   - Use "OTel API + OTel SDK + OTel Collector"
2. If you need Datadog-specific features like ASM or Continuous Profiler:
   - Choose "OTel API + DD SDK + Datadog Agent" or "DD API + DD SDK + Datadog Agent"
3. For a hybrid approach with OpenTelemetry instrumentation and Datadog ingestion:
   - Select "OTel API + OTel SDK + OTLP Ingest in the Datadog Agent"