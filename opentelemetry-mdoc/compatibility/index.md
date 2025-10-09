---
title: Datadog and OpenTelemetry Compatibility
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Datadog and OpenTelemetry Compatibility
---

# Datadog and OpenTelemetry Compatibility

## Overview{% #overview %}

Datadog offers multiple setup options to accommodate various use cases, from full OpenTelemetry (OTel) implementations to hybrid setups using both OpenTelemetry and Datadog components. This page covers the compatibility between different setups and supported Datadog products and features, helping you choose the best configuration for your needs.

## Setups{% #setups %}

Datadog supports several configurations for using OpenTelemetry. The primary difference between these setups is the choice of SDK (OpenTelemetry or Datadog) and the collector used to process and forward telemetry data.

| Setup Type                                                                                       | API                     | SDK         | Collector/Agent                               |
| ------------------------------------------------------------------------------------------------ | ----------------------- | ----------- | --------------------------------------------- |
| [**Datadog SDK + DDOT (Recommended)**](http://localhost:1313/opentelemetry/setup/ddot_collector) | Datadog API or OTel API | Datadog SDK | Datadog Distribution of OTel Collector (DDOT) |
| [**OTel SDK + DDOT**](http://localhost:1313/opentelemetry/setup/ddot_collector)                  | OTel API                | OTel SDK    | Datadog Distribution of OTel Collector (DDOT) |
| [**OTel SDK + OSS Collector**](http://localhost:1313/opentelemetry/collector_exporter/)          | OTel API                | OTel SDK    | OTel Collector (OSS)                          |
| [**Direct OTLP Ingest**](http://localhost:1313/opentelemetry/setup/agentless)                    | OTel API                | OTel SDK    | N/A (Direct to Datadog endpoint)              |

## Feature compatibility{% #feature-compatibility %}

The following table shows feature compatibility across different setups:

| Feature                                                                                                                          | Datadog SDK + DDOT (Recommended) | OTel SDK + DDOT                             | OTel SDK + OSS Collector                    | Direct OTLP Ingest                                                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Cloud SIEM](http://localhost:1313/security/cloud_siem/)                                                                         | yes                              | yes                                         | yes                                         | yes                                                                                                                                                                |
| [Correlated Traces, Metrics, Logs](http://localhost:1313/opentelemetry/correlate/)                                               | yes                              | yes                                         | yes                                         | yes                                                                                                                                                                |
| [Distributed Tracing](http://localhost:1313/tracing/trace_collection/)                                                           | yes                              | yes                                         | yes                                         | yes                                                                                                                                                                |
| [Runtime Metrics](http://localhost:1313/tracing/metrics/runtime_metrics/)                                                        | yes                              | yes(Java, .NET, Go only)                    | yes(Java, .NET, Go only)                    | yes(Java, .NET, Go only)                                                                                                                                           |
| [Span Links](http://localhost:1313/tracing/trace_collection/span_links/)                                                         | yes                              | yes                                         | yes                                         | yes                                                                                                                                                                |
| [Trace Metrics](http://localhost:1313/tracing/metrics/metrics_namespace/)                                                        | yes                              | yes                                         | yes                                         | yes(Sampled (Trace metrics are calculated on the backend based on ingested spans that have passed through sampling, not on 100% of local traces before sampling.)) |
| [Database Monitoring](http://localhost:1313/opentelemetry/correlate/dbm_and_traces/) (DBM)                                       | yes                              | yes                                         | yes                                         |
| [Cloud Network Monitoring](http://localhost:1313/network_monitoring/performance/) (CNM)                                          | yes                              | yes                                         |
| [Live Container Monitoring/Kubernetes Explorer](http://localhost:1313/containers/)                                               | yes                              | yes                                         |
| [Live Processes](http://localhost:1313/infrastructure/process/)                                                                  | yes                              | yes                                         |
| [Universal Service Monitoring](http://localhost:1313/universal_service_monitoring/) (USM)                                        | yes                              | yes                                         |
| [App and API Protection](http://localhost:1313/security/application_security/) (AAP)                                             | yes                              |
| [Continuous Profiler](http://localhost:1313/profiler/)                                                                           | yes                              |
| [Data Jobs Monitoring](http://localhost:1313/data_jobs/) (DJM)                                                                   | yes                              |
| [Data Streams Monitoring](http://localhost:1313/data_streams/) (DSM)                                                             | yes                              | N/A (OTel does not offer DSM functionality) | N/A (OTel does not offer DSM functionality) |
| [Real User Monitoring](http://localhost:1313/opentelemetry/correlate/rum_and_traces/?tab=browserrum#opentelemetry-support) (RUM) | yes                              |
| [Source code integration](http://localhost:1313/integrations/guide/source-code-integration/)                                     | yes                              |

## More details{% #more-details %}

### Runtime metrics{% #runtime-metrics %}

Setups using the OpenTelemetry SDK follow the [OpenTelemetry Runtime Metrics](http://localhost:1313/opentelemetry/integrations/runtime_metrics/) specification.

### Real User Monitoring (RUM){% #real-user-monitoring-rum %}

To enable full RUM functionality, you need to [inject supported headers](http://localhost:1313/real_user_monitoring/correlate_with_other_telemetry/apm/) to correlate RUM and traces.

### Cloud Network Monitoring (CNM){% #cloud-network-monitoring-cnm %}

Span-level or endpoint-level monitoring is **not** supported.

For more information, see [Cloud Network Monitoring Setup](http://localhost:1313/network_monitoring/cloud_network_monitoring/setup/).

### Source Code Integration{% #source-code-integration %}

For unsupported languages in OpenTelemetry setups, [configure telemetry tagging](http://localhost:1313/integrations/guide/source-code-integration/?tab=go#configure-telemetry-tagging) to link data to a specific commit.

## Best practices{% #best-practices %}

When using Datadog and OpenTelemetry together, Datadog recommends the following best practices to ensure optimal performance and to avoid potential issues:

- **Avoid mixed instrumentation**: Do not use both a Datadog SDK and an OpenTelemetry SDK to instrument the same application, as this leads to undefined behavior.
- **Avoid Agent and separate Collector on same host**: Do not run the Datadog Agent and a separate OpenTelemetry Collector on the same host, as this may cause issues. However, you can run Agents and Collectors on different hosts within the same fleet.

## Further reading{% #further-reading %}

- [OpenTelemetry Troubleshooting](http://localhost:1313/opentelemetry/troubleshooting/)
