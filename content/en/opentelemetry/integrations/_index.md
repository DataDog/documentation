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

For a comprehensive list of all OpenTelemetry integrations, see the [OpenTelemetry Registry][1]. This registry provides information on receivers, exporters, and other components of the OpenTelemetry ecosystem.

## Datadog-supported OpenTelemetry integrations

Datadog supports the following OpenTelemetry integrations:

### APM (Application Performance Monitoring)

| Integration | Support |
|-------------|---------|
| [Trace Metrics][2] | Full support |
| [Runtime Metrics][3] | Full support |

### Containers and hosts

| Integration | Support |
|-------------|---------|
| [Docker Metrics][4] | Full support |
| [Host Metrics][5] | Full support |

### Vendor technologies

| Integration | Support |
|-------------|---------|
| [Kafka Metrics][6] | Full support |
| [Log Collection][7] | Full support |
| [Collector Health Metrics][8] | Full support |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/ecosystem/registry/
[2]: /opentelemetry/integrations/trace_metrics
[3]: /opentelemetry/integrations/runtime_metrics/
[4]: /opentelemetry/integrations/docker_metrics/
[5]: /opentelemetry/integrations/host_metrics/
[6]: /opentelemetry/integrations/kafka_metrics/
[7]: /opentelemetry/integrations/log_collection/
[8]: /opentelemetry/integrations/collector_health_metrics/