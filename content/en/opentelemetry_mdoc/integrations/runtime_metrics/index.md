---
title: OpenTelemetry Runtime Metrics
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Integrations > OpenTelemetry Runtime Metrics
sourceUrl: >-
  https://docs.datadoghq.com/opentelemetry/integrations/runtime_metrics/index.html
---

# OpenTelemetry Runtime Metrics

## Overview{% #overview %}

Runtime metrics provide insights into application performance, including memory usage, garbage collection, and parallelization. Datadog tracing libraries offer [runtime metrics collection](https://docs.datadoghq.com/tracing/metrics/runtime_metrics/) for each supported language, and OpenTelemetry (OTel) also collects compatible runtime metrics that can be sent to Datadog through the OpenTelemetry SDKs.

## Compatibility{% #compatibility %}

Datadog supports OpenTelemetry runtime metrics for the following languages:

- Java
- .NET
- Go

For details about host and container metrics mapping, see [OpenTelemetry Metrics Mapping](https://docs.datadoghq.com/opentelemetry/mapping/metrics_mapping/).

## Setup instructions{% #setup-instructions %}

### 1. Prerequisites

- You have successfully [configured OpenTelemetry metrics to send to Datadog](https://docs.datadoghq.com/opentelemetry/setup/).
- You have installed the [corresponding language integration in Datadog](https://app.datadoghq.com/integrations).

### 2. Configure your application

Select your language to see instructions for configuring the OpenTelemetry SDK to send runtime metrics:

{% tab title="Java" %}
#### Automatic instrumentation{% #automatic-instrumentation %}

If you use [OpenTelemetry automatic instrumentation](https://opentelemetry.io/docs/instrumentation/java/automatic/) for Java applications, runtime metrics are enabled by default.

#### Manual instrumentation{% #manual-instrumentation %}

If you use [OpenTelemetry manual instrumentation](https://opentelemetry.io/docs/instrumentation/java/manual/), follow the guides for your Java version:

- [Java 8](https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/runtime-telemetry/runtime-telemetry-java8/library)
- [Java 17](https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/runtime-telemetry/runtime-telemetry-java17/library)

{% /tab %}

{% tab title="Go" %}
OpenTelemetry Go applications are [instrumented manually](https://opentelemetry.io/docs/instrumentation/go/manual/). To enable runtime metrics, see the documentation for the [runtime package](https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/runtime).
{% /tab %}

{% tab title=".NET" %}

{% alert level="warning" %}
The minimum supported version of the .NET OpenTelemetry SDK is [1.5.0](https://github.com/open-telemetry/opentelemetry-dotnet/releases/tag/core-1.5.0)
{% /alert %}

#### Automatic instrumentation{% #automatic-instrumentation %}

If you use [OpenTelemetry automatic instrumentation](https://opentelemetry.io/docs/instrumentation/net/automatic/) for .NET applications, runtime metrics are enabled by default.

#### Manual instrumentation{% #manual-instrumentation %}

If you use [OpenTelemetry manual instrumentation](https://opentelemetry.io/docs/instrumentation/net/manual/), see the documentation for the [OpenTelemetry.Instrumentation.Runtime library](https://github.com/open-telemetry/opentelemetry-dotnet-contrib/tree/main/src/OpenTelemetry.Instrumentation.Runtime).

#### Metric export interval{% #metric-export-interval %}

The default metric export interval for the .NET OTel SDK differs from the default for the Datadog .NET SDK. Datadog recommends setting the [OTEL_METRIC_EXPORT_INTERVAL](https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/#periodic-exporting-metricreader) environment variable on your .NET service to match the default Datadog metric export interval:

```
OTEL_METRIC_EXPORT_INTERVAL=10000
```

{% /tab %}

## View runtime metric dashboards{% #view-runtime-metric-dashboards %}

After setup is complete, you can view runtime metrics in:

- The service's details page (see Java example below)
- The flame graph metrics tab
- Default [runtime dashboards](https://app.datadoghq.com/dash/integration/256/jvm-metrics)

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/otel_runtime_metrics_service_page.684ee9c34c52d62f70b570d67b94e32b.png?auto=format"
   alt="Service page showing OpenTelemetry runtime metrics on the JVM Metrics tab" /%}

## Data collected{% #data-collected %}

When using OpenTelemetry runtime metrics with Datadog, you receive both:

- Original OpenTelemetry runtime metrics
- Mapped Datadog runtime metrics for equivalent metrics

The OpenTelemetry runtime metrics have the following prefixes based on their source:

| Source                                                                                                | Prefix                   |
| ----------------------------------------------------------------------------------------------------- | ------------------------ |
| [OTel Collector Datadog Exporter](https://docs.datadoghq.com/opentelemetry/setup/collector_exporter/) | `otel.process.runtime.*` |
| [Datadog Agent OTLP Ingest](https://docs.datadoghq.com/opentelemetry/setup/otlp_ingest_in_the_agent)  | `process.runtime.*`      |

The following tables list the Datadog runtime metrics that are supported through OpenTelemetry mapping. "N/A" indicates that there is no OpenTelemetry equivalent metric available.

{% alert level="warning" %}
OpenTelemetry runtime metrics are mapped to Datadog by metric name. Do not rename host metrics for OpenTelemetry runtime metrics as this breaks the mapping.
{% /alert %}

{% tab title="Java" %}

| Datadog metric                  | Description                                                                                                | OpenTelemetry metric                                                     |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `jvm.heap_memory`               | The total Java heap memory used.                                                                           | `process.runtime.jvm.memory.usage``jvm.memory.used`                      |
| `jvm.heap_memory_committed`     | The total Java heap memory committed to be used.                                                           | `process.runtime.jvm.memory.committed``jvm.memory.committed`             |
| `jvm.heap_memory_init`          | The initial Java heap memory allocated.                                                                    | `process.runtime.jvm.memory.init``jvm.memory.init`                       |
| `jvm.heap_memory_max`           | The maximum Java heap memory available.                                                                    | `process.runtime.jvm.memory.limit``jvm.memory.limit`                     |
| `jvm.non_heap_memory`           | The total Java non-heap memory used. Non-heap memory is: `Metaspace + CompressedClassSpace + CodeCache`.   | `process.runtime.jvm.memory.usage``jvm.memory.used`                      |
| `jvm.non_heap_memory_committed` | The total Java non-heap memory committed to be used.                                                       | `process.runtime.jvm.memory.committed``jvm.memory.committed`             |
| `jvm.non_heap_memory_init`      | The initial Java non-heap memory allocated.                                                                | `process.runtime.jvm.memory.init``jvm.memory.init`                       |
| `jvm.non_heap_memory_max`       | The maximum Java non-heap memory available.                                                                | `process.runtime.jvm.memory.limit``jvm.memory.limit`                     |
| `jvm.gc.old_gen_size`           | The current Java heap memory usage of the Old Generation memory pool.                                      | `process.runtime.jvm.memory.usage``jvm.memory.used`                      |
| `jvm.gc.eden_size`              | The current Java heap memory usage of the Eden memory pool.                                                | `process.runtime.jvm.memory.usage``jvm.memory.used`                      |
| `jvm.gc.survivor_size`          | The current Java heap memory usage of the Survivor memory pool.                                            | `process.runtime.jvm.memory.usage``jvm.memory.used`                      |
| `jvm.gc.metaspace_size`         | The current Java non-heap memory usage of the Metaspace memory pool.                                       | `process.runtime.jvm.memory.usage``jvm.memory.used`                      |
| `jvm.thread_count`              | The number of live threads.                                                                                | `process.runtime.jvm.threads.count``jvm.thread.count`                    |
| `jvm.loaded_classes`            | Number of classes currently loaded.                                                                        | `process.runtime.jvm.classes.current_loaded``jvm.class.count`            |
| `jvm.cpu_load.system`           | Recent CPU utilization for the whole system.                                                               | `process.runtime.jvm.system.cpu.utilization``jvm.system.cpu.utilization` |
| `jvm.cpu_load.process`          | Recent CPU utilization for the process.                                                                    | `process.runtime.jvm.cpu.utilization``jvm.cpu.recent_utilization`        |
| `jvm.buffer_pool.direct.used`   | Measure of memory used by direct buffers.                                                                  | `process.runtime.jvm.buffer.usage``jvm.buffer.memory.usage`              |
| `jvm.buffer_pool.direct.count`  | Number of direct buffers in the pool.                                                                      | `process.runtime.jvm.buffer.count``jvm.buffer.count`                     |
| `jvm.buffer_pool.direct.limit`  | Measure of total memory capacity of direct buffers.                                                        | `process.runtime.jvm.buffer.limit``jvm.buffer.memory.limit`              |
| `jvm.buffer_pool.mapped.used`   | Measure of memory used by mapped buffers.                                                                  | `process.runtime.jvm.buffer.usage``jvm.buffer.memory.usage`              |
| `jvm.buffer_pool.mapped.count`  | Number of mapped buffers in the pool.                                                                      | `process.runtime.jvm.buffer.count``jvm.buffer.count`                     |
| `jvm.buffer_pool.mapped.limit`  | Measure of total memory capacity of mapped buffers.                                                        | `process.runtime.jvm.buffer.limit``jvm.buffer.memory.limit`              |
| `jvm.gc.parnew.time`            | The approximate accumulated garbage collection time elapsed.                                               | N/A                                                                      |
| `jvm.gc.cms.count`              | The total number of garbage collections that have occurred.                                                | N/A                                                                      |
| `jvm.gc.major_collection_count` | The rate of major garbage collections. Set `new_gc_metrics: true` to receive this metric.                  | N/A                                                                      |
| `jvm.gc.minor_collection_count` | The rate of minor garbage collections. Set `new_gc_metrics: true` to receive this metric.                  | N/A                                                                      |
| `jvm.gc.major_collection_time`  | The fraction of time spent in major garbage collection. Set `new_gc_metrics: true` to receive this metric. | N/A                                                                      |
| `jvm.gc.minor_collection_time`  | The fraction of time spent in minor garbage collection. Set `new_gc_metrics: true` to receive this metric. | N/A                                                                      |
| `jvm.os.open_file_descriptors`  | The number of open file descriptors.                                                                       | N/A                                                                      |

{% /tab %}

{% tab title="Go" %}

| Datadog metric                            | Description                                                                             | OpenTelemetry metric                   |
| ----------------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------- |
| `runtime.go.num_goroutine`                | Number of goroutines spawned.                                                           | `process.runtime.go.goroutines`        |
| `runtime.go.num_cgo_call`                 | Number of CGO calls made.                                                               | `process.runtime.go.cgo.calls`         |
| `runtime.go.mem_stats.lookups`            | Number of pointer lookups performed by the runtime.                                     | `process.runtime.go.mem.lookups`       |
| `runtime.go.mem_stats.heap_alloc`         | Bytes of allocated heap objects.                                                        | `process.runtime.go.mem.heap_alloc`    |
| `runtime.go.mem_stats.heap_sys`           | Bytes of heap memory obtained from the operating system.                                | `process.runtime.go.mem.heap_sys`      |
| `runtime.go.mem_stats.heap_idle`          | Bytes in idle (unused) spans.                                                           | `process.runtime.go.mem.heap_idle`     |
| `runtime.go.mem_stats.heap_inuse`         | Bytes in in-use spans.                                                                  | `process.runtime.go.mem.heap_inuse`    |
| `runtime.go.mem_stats.heap_released`      | Bytes of physical memory returned to the operating system.                              | `process.runtime.go.mem.heap_released` |
| `runtime.go.mem_stats.heap_objects`       | Number of allocated heap objects.                                                       | `process.runtime.go.mem.heap_objects`  |
| `runtime.go.mem_stats.pause_total_ns`     | Cumulative nanoseconds in garbage collection (GC).                                      | `process.runtime.go.gc.pause_total_ns` |
| `runtime.go.mem_stats.num_gc`             | Number of completed GC cycles.                                                          | `process.runtime.go.gc.count`          |
| `runtime.go.num_cpu`                      | Number of CPUs detected by the runtime.                                                 | N/A                                    |
| `runtime.go.mem_stats.alloc`              | Bytes of allocated heap objects.                                                        | N/A                                    |
| `runtime.go.mem_stats.total_alloc`        | Cumulative bytes allocated for heap objects.                                            | N/A                                    |
| `runtime.go.mem_stats.sys`                | Total bytes of memory obtained from the operating system.                               | N/A                                    |
| `runtime.go.mem_stats.mallocs`            | Cumulative count of heap objects allocated.                                             | N/A                                    |
| `runtime.go.mem_stats.frees`              | Cumulative count of heap objects freed.                                                 | N/A                                    |
| `runtime.go.mem_stats.stack_inuse`        | Bytes in stack spans.                                                                   | N/A                                    |
| `runtime.go.mem_stats.stack_sys`          | Bytes of stack memory obtained from the operating system.                               | N/A                                    |
| `runtime.go.mem_stats.m_span_inuse`       | Bytes of allocated mspan structures.                                                    | N/A                                    |
| `runtime.go.mem_stats.m_span_sys`         | Bytes of memory obtained from the operating system for mspan structures.                | N/A                                    |
| `runtime.go.mem_stats.m_cache_inuse`      | Bytes of allocated mcache structures.                                                   | N/A                                    |
| `runtime.go.mem_stats.m_cache_sys`        | Bytes of memory obtained from the operating system for mcache structures.               | N/A                                    |
| `runtime.go.mem_stats.buck_hash_sys`      | Bytes of memory in profiling bucket hash tables.                                        | N/A                                    |
| `runtime.go.mem_stats.gc_sys`             | Bytes of memory in garbage collection metadata.                                         | N/A                                    |
| `runtime.go.mem_stats.other_sys`          | Bytes of memory in miscellaneous off-heap.                                              | N/A                                    |
| `runtime.go.mem_stats.next_gc`            | Target heap size of the next GC cycle.                                                  | N/A                                    |
| `runtime.go.mem_stats.last_gc`            | Last garbage collection finished, as nanoseconds since the UNIX epoch.                  | N/A                                    |
| `runtime.go.mem_stats.num_forced_gc`      | Number of GC cycles that were forced by the application calling the GC function.        | N/A                                    |
| `runtime.go.mem_stats.gc_cpu_fraction`    | Fraction of this program's available CPU time used by the GC since the program started. | N/A                                    |
| `runtime.go.gc_stats.pause_quantiles.min` | Distribution of GC pause times: minimum values.                                         | N/A                                    |
| `runtime.go.gc_stats.pause_quantiles.25p` | Distribution of GC pause times: 25th percentile.                                        | N/A                                    |
| `runtime.go.gc_stats.pause_quantiles.50p` | Distribution of GC pause times: 50th percentile.                                        | N/A                                    |
| `runtime.go.gc_stats.pause_quantiles.75p` | Distribution of GC pause times: 75th percentile.                                        | N/A                                    |
| `runtime.go.gc_stats.pause_quantiles.max` | Distribution of GC pause times: maximum values.                                         | N/A                                    |

{% /tab %}

{% tab title=".NET" %}

| Datadog metric                                         | Description                                                                                                                                              | OpenTelemetry metric                                     |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `runtime.dotnet.threads.contention_count`              | The number of times a thread stopped to wait on a lock.                                                                                                  | `process.runtime.dotnet.``monitor.lock_contention.count` |
| `runtime.dotnet.exceptions.count`                      | The number of first-chance exceptions.                                                                                                                   | `process.runtime.dotnet.``exceptions.count`              |
| `runtime.dotnet.gc.size.gen0`                          | The size of the gen 0 heap.                                                                                                                              | `process.runtime.dotnet.``gc.heap.size`                  |
| `runtime.dotnet.gc.size.gen1`                          | The size of the gen 1 heap.                                                                                                                              | `process.runtime.dotnet.``gc.heap.size`                  |
| `runtime.dotnet.gc.size.gen2`                          | The size of the gen 2 heap.                                                                                                                              | `process.runtime.dotnet.``gc.heap.size`                  |
| `runtime.dotnet.gc.size.loh`                           | The size of the large object heap.                                                                                                                       | `process.runtime.dotnet.``gc.heap.size`                  |
| `runtime.dotnet.gc.count.gen0`                         | The number of gen 0 garbage collections.                                                                                                                 | `process.runtime.dotnet.``gc.collections.count`          |
| `runtime.dotnet.gc.count.gen1`                         | The number of gen 1 garbage collections.                                                                                                                 | `process.runtime.dotnet.``gc.collections.count`          |
| `runtime.dotnet.gc.count.gen2`                         | The number of gen 2 garbage collections.                                                                                                                 | `process.runtime.dotnet.``gc.collections.count`          |
| `runtime.dotnet.cpu.system`                            | The number of milliseconds executing in the kernel.                                                                                                      | N/A                                                      |
| `runtime.dotnet.cpu.user`                              | The number of milliseconds executing outside the kernel.                                                                                                 | N/A                                                      |
| `runtime.dotnet.cpu.percent`                           | The percentage of total CPU used by the application.                                                                                                     | N/A                                                      |
| `runtime.dotnet.mem.committed`                         | Memory usage.                                                                                                                                            | N/A                                                      |
| `runtime.dotnet.threads.count`                         | The number of threads.                                                                                                                                   | N/A                                                      |
| `runtime.dotnet.threads.workers_count`                 | The number of workers in the threadpool. (.NET Core only)                                                                                                | N/A                                                      |
| `runtime.dotnet.threads.contention_time`               | The cumulated time spent by threads waiting on a lock. (.NET Core only)                                                                                  | N/A                                                      |
| `runtime.dotnet.gc.memory_load`                        | The percentage of the total memory used by the process. The garbage collection (GC) changes its behavior when this value gets above 85. (.NET Core only) | N/A                                                      |
| `runtime.dotnet.gc.pause_time`                         | The amount of time the GC paused the application threads. (.NET Core only)                                                                               | N/A                                                      |
| `runtime.dotnet.aspnetcore.``requests.total`           | The total number of HTTP requests received by the server. (.NET Core only)                                                                               | N/A                                                      |
| `runtime.dotnet.aspnetcore.``requests.failed`          | The number of failed HTTP requests received by the server. (.NET Core only)                                                                              | N/A                                                      |
| `runtime.dotnet.aspnetcore.``requests.current`         | The total number of HTTP requests that have started but not yet stopped. (.NET Core only)                                                                | N/A                                                      |
| `runtime.dotnet.aspnetcore.``requests.queue_length`    | The current length of the server HTTP request queue. (.NET Core only)                                                                                    | N/A                                                      |
| `runtime.dotnet.aspnetcore.``connections.total`        | The total number of HTTP connections established to the server. (.NET Core only)                                                                         | N/A                                                      |
| `runtime.dotnet.aspnetcore.``connections.current`      | The current number of active HTTP connections to the server. (.NET Core only)                                                                            | N/A                                                      |
| `runtime.dotnet.aspnetcore.``connections.queue_length` | The current length of the HTTP server connection queue. (.NET Core only)                                                                                 | N/A                                                      |

{% /tab %}

## Further reading{% #further-reading %}

- [APM Runtime Metrics](https://docs.datadoghq.com/tracing/metrics/runtime_metrics/)
- [OpenTelemetry Metrics Mapping](https://docs.datadoghq.com/opentelemetry/mapping/metrics_mapping/)
