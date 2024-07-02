---
title: OpenTelemetry Terms and Concepts
further_reading:
    - link: "https://opentelemetry.io/docs/concepts/"
      tag: 外部サイト
      text: OpenTelemetry Concepts
    - link: "https://opentelemetry.io/docs/concepts/glossary/"
      tag: 外部サイト
      text: OpenTelemetry Glossary
    - link: "https://docs.datadoghq.com/glossary/"
      tag: Documentation
      text: Datadog Glossary
---

This page describes essential terms and concepts for OpenTelemetry and Datadog. For additional definitions and descriptions, see the [OpenTelemetry Glossary][6].

| コンセプト                      | 説明                                                                                                                                                                                                                                                               |
|------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Telemetry                    | The collection of metrics, logs, and traces that provide observations about the behaviors and performance of applications and infrastructure.                                                                                                                             |
| [OpenTelemetry Collector][1] | A vendor-agnostic implementation for collecting and exporting telemetry data emitted by many processes. It can be configured to receive, process, and export telemetry to one or multiple destinations including storage backends and analysis tools.                      |
| [Datadog Exporter][2]        | A component that lets you forward trace, metric, and logs data from OpenTelemetry SDKs to Datadog.                                                                                                                                                                     |
| [OTLP Receiver][3]           | A component within the OpenTelemetry Collector responsible for accepting telemetry data in the OpenTelemetry Protocol (OTLP) format. OTLP is the native protocol for OpenTelemetry, designed for transferring telemetry data between the SDKs and the Collector. |
| [Context Propagation][4]     | The mechanism used in distributed tracing to maintain trace context across different services.                                                                                                                                                                            |
| [Semantic Conventions][5]    | OpenTelemetry makes use of a number of semantic conventions that specify names for different types of data.                                                                                                                                                               |

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/collector_exporter/
[2]: /opentelemetry/collector_exporter/otel_collector_datadog_exporter/
[3]: /opentelemetry/collector_exporter/otlp_receiver/
[4]: /opentelemetry/interoperability/
[5]: /opentelemetry/schema_semantics/semantic_mapping/
[6]: https://opentelemetry.io/docs/concepts/glossary/