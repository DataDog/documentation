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

The recommended Collector configuration uses the exporter's sending queue for batching and does not include the batch processor.

For production deployments, configure the [memory limiter processor][3] to limit the memory the OpenTelemetry Collector uses.

## Setup

Add `memory_limiter` to the `processors` list for each pipeline in your configuration. Place it first in the list so that it applies backpressure before other processors allocate memory.

Size its limits for the memory available to your Collector, and keep the limit below the process or container memory limit. Total process memory runs above the configured limit, so leave headroom.

For the available options and sizing guidance, see the OpenTelemetry project documentation for the [memory limiter processor][3].

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
