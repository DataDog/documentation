---
title: Batch and Memory Settings
aliases:
- /opentelemetry/collector_exporter/collector_batch_memory
further_reading:
- link: "/opentelemetry/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

To manage the OpenTelemetry Collector's memory use, configure the [memory limiter processor][3]. The memory limiter must be enabled in every pipeline and should be the first processor so that it can apply backpressure before other processors allocate memory.

The recommended OTLP HTTP exporter configuration handles batching in the exporter's sending queue. Do not add the batch processor to that configuration. If you maintain an existing Datadog Exporter configuration that uses the [batch processor][1], you can continue to use it.

## Setup

The following example assumes that the Collector can use up to approximately 1 GiB of memory. Adjust `limit_mib` and `spike_limit_mib` for the memory available to your Collector. Set `limit_mib` below the process or container memory limit so the Collector has headroom before the operating system terminates it.

```yaml
processors:
  memory_limiter:
    check_interval: 1s
    limit_mib: 800
    spike_limit_mib: 200

service:
  pipelines:
    logs:
      processors: [memory_limiter, resource_detection]
    metrics:
      processors: [memory_limiter, resource_detection, cumulativetodelta]
    traces:
      processors: [memory_limiter, resource_detection]
    traces/sample:
      processors: [memory_limiter]
    metrics/span_metrics:
      processors: [memory_limiter]
```

For Kubernetes, also set a container memory limit above `limit_mib`. Update the `resources` block in the example Helm `values.yaml` file:

```yaml
resources:
  requests:
    cpu: 500m
    memory: 512Mi
  limits:
    memory: 1Gi
```

## Data collected

None.

## Full example configuration

For a full working example that uses the Datadog Exporter, see [`batch-memory.yaml`][2]. The Datadog Exporter remains fully supported for existing configurations.

## Example logging output

```
2023-12-05T09:52:58.568Z	warn	memorylimiterprocessor@v0.90.1/memorylimiter.go:276	
Memory usage is above hard limit. Forcing a GC.	
{"kind": "processor", "name": "memory_limiter", "pipeline": "traces", "cur_mem_mib": 44}
2023-12-05T09:52:58.590Z	info	memorylimiterprocessor@v0.90.1/memorylimiter.go:266	
Memory usage after GC.	
{"kind": "processor", "name": "memory_limiter", "pipeline": "traces", "cur_mem_mib": 34}
```


[1]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/batchprocessor
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/batch-memory.yaml
[3]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/memorylimiterprocessor
