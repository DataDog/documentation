---
title: Collector Memory Limits
aliases:
- /opentelemetry/collector_exporter/collector_batch_memory
further_reading:
- link: "/opentelemetry/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

For production deployments, configure the [memory limiter processor][3] to manage the OpenTelemetry Collector's memory use. Enable it in every pipeline and make it the first processor so that it can apply backpressure before other processors allocate memory.

The recommended OTLP HTTP exporter configuration handles batching in the exporter's sending queue. Do not add the batch processor to that configuration. If you maintain an existing Datadog Exporter configuration that uses the [batch processor][1], you can continue to use it.

## Setup

The following example assumes that the Collector can use up to approximately 1 GiB of memory. Adjust `limit_mib` and `spike_limit_mib` for the memory available to your Collector. Set `limit_mib` below the process or container memory limit so the Collector has headroom before the operating system terminates it.

Add the processor to your configuration:

```yaml
processors:
  memory_limiter:
    check_interval: 1s
    limit_mib: 800
    spike_limit_mib: 200
```

Then add `memory_limiter` as the first entry in the `processors` list for every pipeline in your environment's complete configuration. Retain the other processors already configured for that pipeline. Pipelines without a `processors` list, including `traces/sample` and `metrics/span_metrics` in the recommended setup, also need `processors: [memory_limiter]`.

For Kubernetes, also set a container memory limit above `limit_mib`. Update the `resources` block in the example Helm `values.yaml` file:

```yaml
resources:
  requests:
    memory: 512Mi
  limits:
    memory: 1Gi
```

Retain any other resource requests or limits required for your deployment.

## Data collected

None.

## Full example configuration

For a legacy batching and memory-limiter example that uses the Datadog Exporter, see [`batch-memory.yaml`][2]. The Datadog Exporter remains fully supported for existing configurations.

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
