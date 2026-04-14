---
title: Correlate OpenTelemetry Traces and Metrics
further_reading:
- link: "/opentelemetry/otel_tracing/"
  tag: "Documentation"
  text: "Send OpenTelemetry Traces to Datadog"
---

## Overview

Correlating traces with host metrics allows you to pivot from a slow request directly to the CPU and memory metrics of the host or container it ran on. This helps you determine if resource contention was the root cause of a performance issue.

Correlation between traces and metrics relies on the following resource attributes:

- `host.name`: For correlating with host metrics (CPU, memory, disk).
- `container.id`: For correlating with container metrics.

## Requirements

Before you begin, ensure you have configured [unified service tagging][1]. This is required for all data correlation in Datadog.

## Setup

To correlate traces and metrics, you must:

1. **Collect Host Metrics**: You must have the OpenTelemetry Collector configured to collect and send host metrics to Datadog.

2. **Ensure Consistent Tagging**: Your traces and metrics must share a consistent `host.name` (for hosts) or `container.id` (for containers) attribute for Datadog to link them.


### 1. Collect host metrics

To collect system-level metrics from your infrastructure, enable the `hostmetrics` receiver in your OpenTelemetry Collector configuration. This receiver gathers metrics like CPU, memory, disk, and network usage.

Add the `hostmetrics` receiver to the `receivers` section of your Collector configuration and enable it in your `metrics` pipeline:


```yaml
receivers:
  hostmetrics:
    collection_interval: 10s
    scrapers:
      cpu:
      memory:
      disk:
      ...

service:
  pipelines:
    metrics:
      receivers: [hostmetrics, ...]
      processors: [...]
      exporters: [...]
```

For the complete, working configuration, including Kubernetes-specific setup, see the [Host Metrics][2] documentation.

### 2. Ensure consistent host and container tagging

For correlation to work, the `host.name` (or `container.id`) attribute on your traces must match the corresponding attribute on the metrics collected by the `hostmetrics` receiver.

## View correlated data in Datadog

After your application is sending traces and the Collector is sending host metrics, you can see the correlation in the APM Trace View.

1. Navigate to [**APM** > **Traces**][3].
2. Find and click on a trace from your instrumented service.
3. In the trace's flame graph, select a span that ran on the instrumented host.
4. In the details panel, click the **Infrastructure** tab. You should see the host metrics, like CPU and memory utilization, from the host that executed that part of the request.

This allows you to immediately determine if a spike in host metrics corresponds with the performance of a specific request.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/correlate/#prerequisite-unified-service-tagging
[2]: /opentelemetry/integrations/host_metrics
[3]: https://app.datadoghq.com/apm/traces