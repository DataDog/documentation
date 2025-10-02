---
title: Batch and Memory Settings
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > OpenTelemetry Configuration > Batch and
  Memory Settings
sourceUrl: >-
  https://docs.datadoghq.com/opentelemetry/config/collector_batch_memory/index.html
---

# Batch and Memory Settings

## Overview{% #overview %}

To edit your OpenTelemetry Collector batch and memory settings, configure the [batch processor](https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/batchprocessor) in your Datadog Exporter.

For more information, see the OpenTelemetry project documentation for the [batch processor](https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/batchprocessor).

## Setup{% #setup %}

{% tab title="Host" %}
Add the following lines to your Collector configuration:

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

{% /tab %}

{% tab title="Kubernetes" %}
Add the following lines to `values.yaml`:

```yaml
resources:
  limits:
    cpu: 512m
    memory: 1Gi
```

Add the following in the Collector configuration:

```yaml
processors:
  batch:
    # Datadog APM Intake limit is 3.2MB.    
    send_batch_max_size: 1000
    send_batch_size: 100
    timeout: 10s
```

{% /tab %}

## Data collected{% #data-collected %}

None.

## Full example configuration{% #full-example-configuration %}

For a full working example configuration with the Datadog exporter, see [`batch-memory.yaml`](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/batch-memory.yaml).

## Example logging output{% #example-logging-output %}

```
2023-12-05T09:52:58.568Z	warn	memorylimiterprocessor@v0.90.1/memorylimiter.go:276	
Memory usage is above hard limit. Forcing a GC.	
{"kind": "processor", "name": "memory_limiter", "pipeline": "traces", "cur_mem_mib": 44}
2023-12-05T09:52:58.590Z	info	memorylimiterprocessor@v0.90.1/memorylimiter.go:266	
Memory usage after GC.	
{"kind": "processor", "name": "memory_limiter", "pipeline": "traces", "cur_mem_mib": 34}
```
