---
title: Batch and Memory Settings
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentation
  text: Setting Up the OpenTelemetry Collector
---

## Overview

To edit your OpenTelemetry Collector batch and memory settings, configure the [batch processor][1] in your Datadog Exporter.

For more information, see the OpenTelemetry project documentation for the [batch processor][1].

## セットアップ

{{< tabs >}}
{{% tab "Host" %}}
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

{{% /tab %}}

{{% tab "Kubernetes" %}}

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

{{% /tab %}}
{{< /tabs >}}


## データ収集

None.

## Full example configuration

For a full working example configuration with the Datadog exporter, see [`batch-memory.yaml`][2].

## Example logging output

```
2023-12-05T09:52:58.568Z    warn    memorylimiterprocessor@v0.90.1/memorylimiter.go:276 
Memory usage is above hard limit. Forcing a GC. 
{"kind": "processor", "name": "memory_limiter", "pipeline": "traces", "cur_mem_mib": 44}
2023-12-05T09:52:58.590Z    info    memorylimiterprocessor@v0.90.1/memorylimiter.go:266 
Memory usage after GC.  
{"kind": "processor", "name": "memory_limiter", "pipeline": "traces", "cur_mem_mib": 34}
```


[1]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/batchprocessor
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/batch-memory.yaml