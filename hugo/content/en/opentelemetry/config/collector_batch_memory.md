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

For production deployments, configure the [memory limiter processor][3] to limit the memory the OpenTelemetry Collector uses.

The recommended OTLP HTTP exporter configuration handles batching in the exporter's sending queue. Do not add the batch processor to that configuration.

For more information, see the OpenTelemetry project documentation for the [memory limiter processor][3].

## Setup

Add the processor to your Collector configuration:

```yaml
processors:
  memory_limiter:
    check_interval: 1s
    limit_mib: 1000
```

Add `memory_limiter` to the `processors` list for each pipeline in your configuration.

For Kubernetes, set container resource limits in your Helm `values.yaml` file:

```yaml
resources:
  limits:
    cpu: 512m
    memory: 1Gi
```

## Data collected

None.

## Example logging output

```
2023-12-05T09:52:58.568Z	warn	memorylimiterprocessor@v0.90.1/memorylimiter.go:276	
Memory usage is above hard limit. Forcing a GC.	
{"kind": "processor", "name": "memory_limiter", "pipeline": "traces", "cur_mem_mib": 44}
2023-12-05T09:52:58.590Z	info	memorylimiterprocessor@v0.90.1/memorylimiter.go:266	
Memory usage after GC.	
{"kind": "processor", "name": "memory_limiter", "pipeline": "traces", "cur_mem_mib": 34}
```


[3]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/memorylimiterprocessor
