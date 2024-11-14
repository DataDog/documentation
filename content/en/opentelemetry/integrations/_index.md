---
title: Integrations
further_reading:
- link: "/opentelemetry/schema_semantics/metrics_mapping/"
  tag: "Documentation"
  text: "OpenTelemetry Metrics Mapping"
---

This page covers Datadog-supported OpenTelemetry (OTel) integrations. These integrations allow you to collect and monitor your observability data using OpenTelemetry in Datadog.

## Overview

OpenTelemetry (OTel) integrations are components that enable the collection of observability data (metrics, traces, and logs) from various sources using the OpenTelemetry standard. These integrations are designed to work with the OpenTelemetry Collector, which receives, processes, and exports telemetry data to observability backends like Datadog.

For a comprehensive list of all OpenTelemetry integrations, see the [OpenTelemetry Registry][1]. This registry provides information on receivers, exporters, and other components in the OpenTelemetry ecosystem.

## Datadog-supported OpenTelemetry integrations

Datadog supports the following OpenTelemetry integrations:

### APM (Application Performance Monitoring)

Monitor and optimize your application's performance:

- [Trace Metrics][2]
- [Runtime Metrics][3]

### Collector

Monitor the health and performance of your OpenTelemetry Collector:

- [Collector Health Metrics][8]

### Containers and hosts

Gain insights into your containerized environments and host systems:

- [Docker Metrics][4]
- [Host Metrics][5]

### Vendor technologies

Extend your observability to popular vendor technologies:

- [Kafka Metrics][6]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/ecosystem/registry/
[2]: /opentelemetry/integrations/trace_metrics
[3]: /opentelemetry/integrations/runtime_metrics/
[4]: /opentelemetry/integrations/docker_metrics/
[5]: /opentelemetry/integrations/host_metrics/
[6]: /opentelemetry/integrations/kafka_metrics/
[8]: /opentelemetry/integrations/collector_health_metrics/