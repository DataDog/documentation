---
title: Ingestion Sampling with OpenTelemetry
aliases:
  - /opentelemetry/guide/ingestion_sampling_with_opentelemetry/
further_reading:
- link: "/tracing/guide/trace_ingestion_volume_control"
  tag: "Guide"
  text: "Trace Ingestion Volume Control"
- link: "/tracing/trace_pipeline/ingestion_controls"
  tag: "Documentation"
  text: "Ingestion Controls"
- link: "/opentelemetry/"
  tag: "Documentation"
  text: "OpenTelemetry Support in Datadog"
---

## Overview

OpenTelemetry SDKs and the OpenTelemetry Collector provide sampling capabilities, as ingesting 100% of traces is often unnecessary to gain visibility into the health of your applications. Configure sampling rates before sending traces to Datadog to ingest data that is most relevant to your business and observability goals, while controlling and managing overall costs.

This document demonstrates two primary methods for sending traces to Datadog with OpenTelemetry:

- Send traces to the **[OpenTelemetry Collector][1]**, and use the Datadog Exporter to forward them to Datadog.
- Send traces to the **[Datadog Agent OTLP ingest][3]**, which forwards them to Datadog.

**Note**: Datadog doesn't support running the OpenTelemetry Collector and the Datadog Agent on the same host.

### Using the OpenTelemetry Collector

With this method, the OpenTelemetry Collector receives traces from OpenTelemetry SDKs and exports them to Datadog using the Datadog Exporter. In this scenario, [APM trace metrics][4] are computed by the Datadog Connector:

{{< img src="/opentelemetry/guide/ingestion_otel/otel_apm_metrics_computation_collector.png" alt="OpenTelemetry APM Metrics computation using the Collector" style="width:100%;" >}}

Choose this method if you require the advanced processing capabilities of the OpenTelemetry Collector, such as tail-based sampling. To configure the Collector to receive traces, follow the instructions on [OpenTelemetry Collector and Datadog Exporter][16].

### Using Datadog Agent OTLP ingestion

With this method, the Datadog Agent receives traces directly from OpenTelemetry SDKs using the OTLP protocol. This allows you to send traces to Datadog without running a separate OpenTelemetry Collector service. In this scenario, APM trace metrics are computed by the Agent:

{{< img src="/opentelemetry/guide/ingestion_otel/otel_apm_metrics_computation_agent.png" alt="OpenTelemetry APM Metrics computation using the Datadog Agent" style="width:100%;" >}}

Choose this method if you prefer a simpler setup without the need for a separate OpenTelemetry Collector service. To configure the Datadog Agent to receive traces using OTLP, follow the instructions on [OTLP Ingestion by the Datadog Agent][15].

## Reducing ingestion volume

With OpenTelemetry, you can configure sampling both in the OpenTelemetry libraries and in the OpenTelemetry Collector:

- **Head-based sampling** in the OpenTelemetry SDKs
- **Tail-based sampling** in the OpenTelemetry Collector
- **Probabilistic sampling** in the Datadog Agent

### Head-based sampling

At the SDK level, you can implement _head-based sampling_. This is when the sampling decision is made at the beginning of the trace. This type of sampling is particularly useful for high-throughput applications, where you have a clear understanding of which traces are most important to ingest and want to make sampling decisions early in the tracing process.

#### Configuring

To configure head-based sampling, use the [TraceIdRatioBased][5] or [ParentBased][6] samplers provided by the OpenTelemetry SDKs. These allow you to implement deterministic head-based sampling based on the `trace_id` at the SDK level.

#### Considerations

Head-based sampling affects the computation of APM metrics. Only sampled traces are sent to the OpenTelemetry Collector or Datadog Agent, which perform metrics computation.

To approximate unsampled metrics from sampled metrics, use [formulas and functions][7] with the sampling rate configured in the SDK.

Use the [ingestion volume control guide][8] to read more about the implications of setting up trace sampling on trace analytics monitors and metrics from spans.


### Tail-based sampling

At the OpenTelemetry Collector level, you can do _tail-based sampling_, which allows you to define more advanced rules to maintain visibility over traces with errors or high latency.

#### Configuring

To configure tail-based sampling, use the [Tail Sampling Processor][9] or [Probabilistic Sampling Processor][10] to sample traces based on a set of rules at the collector level.

#### Considerations

A limitation of tail-based sampling is that all spans for a given trace must be received by the same collector instance for effective sampling decisions. If a trace is distributed across multiple collector instances, and tail-based sampling is used, some parts of that trace may not be sent to Datadog.

To ensure that APM metrics are computed based on 100% of the applications' traffic while using collector-level tail-based sampling, use the [Datadog Connector][11].

<div class="alert alert-info">The Datadog Connector is available starting v0.83.0. Read <a href="/opentelemetry/guide/switch_from_processor_to_connector">Switch from Datadog Processor to Datadog Connector for OpenTelemetry APM Metrics</a> if migrating from an older version.</div>

See the [ingestion volume control guide][8] for information about the implications of setting up trace sampling on trace analytics monitors and metrics from spans.

### Probabilistic sampling

When using Datadog Agent OTLP ingest, a probabilistic sampler is available starting with Agent v7.54.0.

#### Configuring

To configure probabilistic sampling, do one of the following:

- Set `DD_APM_PROBABILISTIC_SAMPLER_ENABLED` to `true` and `DD_APM_PROBABILISTIC_SAMPLER_SAMPLING_PERCENTAGE` to the percentage of traces you'd like to sample (between `0` and `100`).
- Add the following YAML to your Agent's configuration file:

  ```yaml
  apm_config:
    # ...
    probabilistic_sampler:
        enabled: true
        sampling_percentage: 50 #In this example, 50% of traces are captured.
        hash_seed: 22 #A seed used for the hash algorithm. This must match other agents and OTel
  ```

**If you use a mixed setup of Datadog tracing libraries and OTel SDKs**:

- Probabilistic sampling will apply to spans originating from both Datadog and OTel tracing libraries.
- If you send spans both to the Datadog Agent **and** OTel collector instances, set the same seed between Datadog Agent (`DD_APM_PROBABILISTIC_SAMPLER_HASH_SEED`) and OTel collector (`hash_seed`) to ensure consistent sampling.

<div class="alert alert-warning"><code>DD_OTLP_CONFIG_TRACES_PROBABILISTIC_SAMPLER_SAMPLING_PERCENTAGE</code> is deprecated and has been replaced by <code>DD_APM_PROBABILISTIC_SAMPLER_SAMPLING_PERCENTAGE</code>.</div>

#### Considerations

- The probabilistic sampler will ignore the sampling priority of spans that are set at the tracing library level. As a result, probabilistic sampling is **incompatible with [head-based sampling][16]**. This means that head-based sampled traces might still be dropped by probabilistic sampling.
- Spans not captured by the probabilistic sampler may still be captured by the Datadog Agent's [error and rare samplers][12].
- For consistent sampling all tracers must support [128-bit trace IDs][17].

## Monitoring ingested volumes in Datadog

Use the [APM Estimated Usage dashboard][13] and the `datadog.estimated_usage.apm.ingested_bytes` metric to get visibility into your ingested volumes over a specific time period. Filter the dashboard to specific environments and services to see which services are responsible for the largest shares of the ingested volume.

If the ingestion volume is higher than expected, consider adjusting your sampling rates.

## Unified service tagging

When sending data from OpenTelemetry to Datadog, it's important to tie trace data together with unified service tagging.

Setting unified service tags ensures that traces are accurately linked to their corresponding services and environments. This prevents hosts from being misattributed, which can lead to unexpected increases in usage and costs.

For more information, see [Unified Service Tagging][18].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/otel_collector_datadog_exporter
[2]: /opentelemetry/otel_collector_datadog_exporter/?tab=alongsidetheagent#step-5---run-the-collector
[3]: /opentelemetry/otlp_ingest_in_the_agent
[4]: /tracing/metrics/metrics_namespace/
[5]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#traceidratiobased
[6]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#parentbased
[7]: /dashboards/functions/#add-a-function
[8]: /tracing/guide/trace_ingestion_volume_control/#effects-of-reducing-trace-ingestion-volume
[9]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/tailsamplingprocessor/README.md
[10]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/probabilisticsamplerprocessor/README.md
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector#datadog-connector
[12]: /tracing/trace_pipeline/ingestion_mechanisms/#error-and-rare-traces
[13]: https://app.datadoghq.com/dash/integration/apm_estimated_usage
[14]: /opentelemetry/guide/migration/
[15]: /opentelemetry/interoperability/otlp_ingest_in_the_agent/?tab=host
[16]: /tracing/trace_pipeline/ingestion_mechanisms#head-based-sampling
[17]: /opentelemetry/interoperability/otel_api_tracing_interoperability/#128-bit-trace-ids
[18]: /getting_started/tagging/unified_service_tagging/#opentelemetry
