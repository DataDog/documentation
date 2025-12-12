---
title: OpenTelemetry Terms and Concepts
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Reference > OpenTelemetry Terms and Concepts
sourceUrl: https://docs.datadoghq.com/opentelemetry/reference/concepts/index.html
---

# OpenTelemetry Terms and Concepts

This page describes essential terms and concepts for OpenTelemetry and Datadog. For additional definitions and descriptions, see the [OpenTelemetry Glossary](https://opentelemetry.io/docs/concepts/glossary/).

| Concept                                                                                                          | Description                                                                                                                                                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Telemetry                                                                                                        | The collection of metrics, logs, traces, and profiles that provide observations about the behaviors and performance of applications and infrastructure.                                                                                                                  |
| [OpenTelemetry Collector](https://docs.datadoghq.com/opentelemetry/collector_exporter/)                          | A vendor-agnostic implementation for collecting and exporting telemetry data emitted by many processes. It can be configured to receive, process, and export telemetry to one or multiple destinations including storage backends and analysis tools.                    |
| [Datadog Exporter](https://docs.datadoghq.com/opentelemetry/collector_exporter/otel_collector_datadog_exporter/) | An OTel Collector component that lets you forward trace, metric, and logs data from OpenTelemetry SDKs to Datadog.                                                                                                                                                       |
| [OTLP Receiver](https://docs.datadoghq.com/opentelemetry/collector_exporter/otlp_receiver/)                      | A component within the OpenTelemetry Collector responsible for accepting telemetry data in the OpenTelemetry Protocol (OTLP) format. OTLP is the native protocol for OpenTelemetry, designed for transferring telemetry data between the SDKs and the Collector.         |
| [Context Propagation](https://docs.datadoghq.com/opentelemetry/reference/trace_context_propagation/)             | The mechanism used in distributed tracing to maintain trace context across different services.                                                                                                                                                                           |
| [Semantic Conventions](https://docs.datadoghq.com/opentelemetry/schema_semantics/semantic_mapping/)              | Standardized naming patterns and attribute definitions that establish consistent terminology for telemetry data across different systems and implementations. These conventions ensure that data collected from diverse sources can be uniformly processed and analyzed. |

## Further reading{% #further-reading %}

- [OpenTelemetry Concepts](https://opentelemetry.io/docs/concepts/)
- [OpenTelemetry Glossary](https://opentelemetry.io/docs/concepts/glossary/)
- [Datadog Glossary](https://docs.datadoghq.com/glossary/)
