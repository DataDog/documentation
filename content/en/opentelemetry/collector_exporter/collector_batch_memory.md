---
title: Datadog Exporter Collector Batch and Memory Settings
further_reading:
- link: "/opentelemetry/collector_exporter/"
  tag: "Documentation"
  text: "OpenTelemetry Collector Datadog Exporter"
---

## Overview

You can configure the OpenTelemetry Collector batch and memory settings.

For more information, see the OpenTelemetry project documentation for the [Batch Processor][1].

## Setup

{{< tabs >}}
{{% tab "Host" %}}

```yaml
processors:
  batch:
    # Datadog APM Intake limit is 3.2MB.    
    send_batch_max_size: 1000
    send_batch_size: 100
    timeout: 10s
  memory_limiter:
    check_interval: 1s
    limit_mib: 1000
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

In `values.yaml`:

```yaml
resources:
  limits:
    cpu: 512m
    memory: 1Gi
```

Collector configuration:

```yaml
processors:
  batch:
    # Datadog APM Intake limit is 3.2MB.    
    send_batch_max_size: 1000
    send_batch_size: 100
    timeout: 10s
```

{{% /tab %}}
{{< /tabs >}}
```yaml
receivers:
  prometheus:
    config:
      scrape_configs:
      - job_name: 'otelcol'
        scrape_interval: 10s
        static_configs:
        - targets: ['0.0.0.0:8888']
```

## Data collected

None.

## Full example configuration

For a full working example, see the Datadog Exporter example in [`batch-memory.yaml`][2].

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