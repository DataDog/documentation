---
title: OpenTelemetry Runtime Metrics
kind: documentation
aliases:
- /opentelemetry/guide/runtime_metrics
---

## Overview

Runtime metrics are application metrics about memory usage, garbage collection, or parallelization. Datadog provides [runtime metrics collection](https://docs.datadoghq.com/tracing/metrics/runtime_metrics/) with the officially supported Datadog native libraries. OpenTelemetry (OTel) has also started adding the collection of runtime metrics which can be sent to Datadog through OTel SDKs.

Datadog supports OTel runtime metrics in the following languages:
- [Java][1]
- [.NET][2]
- [Go][3]

## Metric naming conventions

Runtime metrics follow different naming conventions between their implementations in Datadog and OTel.
When using OTel runtime metrics with Datadog, you receive both the original OTel runtime metrics as well as mapped Datadog runtime metrics for equivalent metrics.
The following conventions are used for runtime metric prefixes:
| OTel convention (Datadog Agent OTLP Ingest) | OTel convention (OTel Collector Datadog Exporter) |  Datadog convention |
| --- | --- | --- |
| <code>process.runtime.<sup>*</sup></code> | <code>otel.process.runtime.<sup>*</sup></code> | <code>runtime.dotnet.<sup>*</sup></code> |

**Note**: OTel runtime metrics are mapped to Datadog by metric name. It is not recommended to do host metrics mapping renaming for OTel runtime metrics, as this is a breaking change for this feature.

## Setup

This guide assumes you already have a [functioning setup for sending OpenTelemetry metrics to Datadog][4].

### OpenTelemetry SDK configuration

If you are producing metrics from an OTel SDK, follow the corresponding language guide to configure them:
- [Java][1]
- [.NET][2]
- [Go][3]

### Install language integration

Datadog runtime metric dashboards are linked to their respective language integrations, so ensure that your respective language integration is installed:
- [Java](https://app.datadoghq.com/integrations/java)
- [.NET](https://app.datadoghq.com/integrations/dotnet)
- [Go](https://app.datadoghq.com/integrations/go)

### View runtime metric dashboards

After setup is complete, runtime metrics can be viewed in your [APM Service Page](https://app.datadoghq.com/apm/services), the flame graph metrics tab, and in [default runtime dashboards](https://app.datadoghq.com/dash/integration/256/jvm-metrics).

[1]: /opentelemetry/guide/runtime_metrics/java
[2]: /opentelemetry/guide/runtime_metrics/dotnet
[3]: /opentelemetry/guide/runtime_metrics/go
[4]: /opentelemetry/otel_metrics
