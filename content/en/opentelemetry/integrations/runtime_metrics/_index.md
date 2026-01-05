---
title: OpenTelemetry Runtime Metrics
aliases:
- /opentelemetry/runtime_metrics/
- /opentelemetry/integrations/runtime_metrics/go/
- /opentelemetry/integrations/runtime_metrics/dotnet/
- /opentelemetry/integrations/runtime_metrics/java/
further_reading:
- link: "/tracing/metrics/runtime_metrics/"
  tag: "Documentation"
  text: "APM Runtime Metrics"
- link: "/opentelemetry/mapping/metrics_mapping/"
  tag: "Documentation"
  text: "OpenTelemetry Metrics Mapping"
---

## Overview

Runtime metrics provide insights into application performance, including memory usage, garbage collection, and parallelization. Datadog tracing libraries offer [runtime metrics collection][5] for each supported language, and OpenTelemetry (OTel) also collects compatible runtime metrics that can be sent to Datadog through the OpenTelemetry SDKs.

## Compatibility

Datadog supports OpenTelemetry runtime metrics for the following languages:
- Java
- .NET
- Go

For details about host and container metrics mapping, see [OpenTelemetry Metrics Mapping][1].

## Setup instructions

### 1. Prerequisites

- You have successfully [configured OpenTelemetry metrics to send to Datadog][2].
- You have installed the [corresponding language integration in Datadog][3].

### 2. Configure your application

Select your language to see instructions for configuring the OpenTelemetry SDK to send runtime metrics:

{{< tabs >}}
{{% tab "Java" %}}

#### Automatic instrumentation

If you use [OpenTelemetry automatic instrumentation][3] for Java applications, runtime metrics are enabled by default.

#### Manual instrumentation

If you use [OpenTelemetry manual instrumentation][4], follow the guides for your Java version:
- [Java 8][5]
- [Java 17][6]

[3]: https://opentelemetry.io/docs/instrumentation/java/automatic/
[4]: https://opentelemetry.io/docs/instrumentation/java/manual/
[5]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/runtime-telemetry/runtime-telemetry-java8/library
[6]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/runtime-telemetry/runtime-telemetry-java17/library

{{% /tab %}}

{{% tab "Go" %}}

OpenTelemetry Go applications are [instrumented manually][3]. To enable runtime metrics, see the documentation for the [runtime package][4].

[3]: https://opentelemetry.io/docs/instrumentation/go/manual/
[4]: https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/runtime

{{% /tab %}}

{{% tab ".NET" %}}

<div class="alert alert-danger">The minimum supported version of the .NET OpenTelemetry SDK is <a href="https://github.com/open-telemetry/opentelemetry-dotnet/releases/tag/core-1.5.0">1.5.0</a></div>

#### Automatic instrumentation

If you use [OpenTelemetry automatic instrumentation][3] for .NET applications, runtime metrics are enabled by default.

#### Manual instrumentation

If you use [OpenTelemetry manual instrumentation][4], see the documentation for the [OpenTelemetry.Instrumentation.Runtime library][5].

#### Metric export interval

The default metric export interval for the .NET OTel SDK differs from the default for the Datadog .NET SDK. Datadog recommends setting the [OTEL_METRIC_EXPORT_INTERVAL][7] environment variable on your .NET service to match the default Datadog metric export interval:

```
OTEL_METRIC_EXPORT_INTERVAL=10000
```

[3]: https://opentelemetry.io/docs/instrumentation/net/automatic/
[4]: https://opentelemetry.io/docs/instrumentation/net/manual/
[5]: https://github.com/open-telemetry/opentelemetry-dotnet-contrib/tree/main/src/OpenTelemetry.Instrumentation.Runtime
[7]: https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/#periodic-exporting-metricreader

{{% /tab %}}

{{< /tabs >}}

## View runtime metric dashboards

After setup is complete, you can view runtime metrics in:
- The service's details page (see Java example below)
- The flame graph metrics tab
- Default [runtime dashboards][7]

{{< img src="opentelemetry/otel_runtime_metrics_service_page.png" alt="Service page showing OpenTelemetry runtime metrics on the JVM Metrics tab" style="width:100%;" >}}

## Data collected

When using OpenTelemetry runtime metrics with Datadog, you receive both:
- Original OpenTelemetry runtime metrics
- Mapped Datadog runtime metrics for equivalent metrics

The OpenTelemetry runtime metrics have the following prefixes based on their source:

| Source | Prefix |
| --- | --- |
| [OTel Collector Datadog Exporter][100] | `otel.process.runtime.*` |
| [Datadog Agent OTLP Ingest][101] | `process.runtime.*` |

The following tables list the Datadog runtime metrics that are supported through OpenTelemetry mapping. "N/A" indicates that there is no OpenTelemetry equivalent metric available.

<div class="alert alert-danger"> OpenTelemetry runtime metrics are mapped to Datadog by metric name. Do not rename host metrics for OpenTelemetry runtime metrics as this breaks the mapping.</div>

[100]: /opentelemetry/setup/collector_exporter/
[101]: /opentelemetry/setup/otlp_ingest_in_the_agent

{{< tabs >}}
{{% tab "Java" %}}

| Datadog metric | Description |  OpenTelemetry metric |
| --- | --- | --- |
| `jvm.heap_memory` | The total Java heap memory used. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.heap_memory_committed` | The total Java heap memory committed to be used. | `process.runtime.jvm.memory.committed` <br> `jvm.memory.committed` |
| `jvm.heap_memory_init` | The initial Java heap memory allocated. | `process.runtime.jvm.memory.init` <br> `jvm.memory.init` |
| `jvm.heap_memory_max` | The maximum Java heap memory available. | `process.runtime.jvm.memory.limit` <br> `jvm.memory.limit` |
| `jvm.non_heap_memory` | The total Java non-heap memory used. Non-heap memory is: `Metaspace + CompressedClassSpace + CodeCache`. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.non_heap_memory_committed` | The total Java non-heap memory committed to be used. | `process.runtime.jvm.memory.committed` <br> `jvm.memory.committed` |
| `jvm.non_heap_memory_init` | The initial Java non-heap memory allocated. | `process.runtime.jvm.memory.init` <br> `jvm.memory.init` |
| `jvm.non_heap_memory_max` | The maximum Java non-heap memory available. | `process.runtime.jvm.memory.limit` <br> `jvm.memory.limit` |
| `jvm.gc.old_gen_size` | The current Java heap memory usage of the Old Generation memory pool. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.gc.eden_size` | The current Java heap memory usage of the Eden memory pool. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.gc.survivor_size` | The current Java heap memory usage of the Survivor memory pool. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.gc.metaspace_size` | The current Java non-heap memory usage of the Metaspace memory pool. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.thread_count` | The number of live threads. | `process.runtime.jvm.threads.count` <br> `jvm.thread.count` |
| `jvm.loaded_classes` | Number of classes currently loaded. | `process.runtime.jvm.classes.current_loaded` <br> `jvm.class.count` |
| `jvm.cpu_load.system` | Recent CPU utilization for the whole system. | `process.runtime.jvm.system.cpu.utilization` <br> `jvm.system.cpu.utilization` |
| `jvm.cpu_load.process` | Recent CPU utilization for the process. | `process.runtime.jvm.cpu.utilization` <br> `jvm.cpu.recent_utilization` |
| `jvm.buffer_pool.direct.used` | Measure of memory used by direct buffers. | `process.runtime.jvm.buffer.usage` <br> `jvm.buffer.memory.usage` |
| `jvm.buffer_pool.direct.count` | Number of direct buffers in the pool. | `process.runtime.jvm.buffer.count`<br> `jvm.buffer.count` |
| `jvm.buffer_pool.direct.limit` | Measure of total memory capacity of direct buffers. | `process.runtime.jvm.buffer.limit` <br> `jvm.buffer.memory.limit` |
| `jvm.buffer_pool.mapped.used` | Measure of memory used by mapped buffers. | `process.runtime.jvm.buffer.usage`<br> `jvm.buffer.memory.usage` |
| `jvm.buffer_pool.mapped.count` | Number of mapped buffers in the pool. | `process.runtime.jvm.buffer.count`<br> `jvm.buffer.count` |
| `jvm.buffer_pool.mapped.limit` | Measure of total memory capacity of mapped buffers. | `process.runtime.jvm.buffer.limit` <br> `jvm.buffer.memory.limit` |
| `jvm.gc.parnew.time` | The approximate accumulated garbage collection time elapsed. | N/A |
| `jvm.gc.cms.count` | The total number of garbage collections that have occurred. | N/A |
| `jvm.gc.major_collection_count` | The rate of major garbage collections. Set `new_gc_metrics: true` to receive this metric. | N/A |
| `jvm.gc.minor_collection_count` | The rate of minor garbage collections. Set `new_gc_metrics: true` to receive this metric. | N/A |
| `jvm.gc.major_collection_time` | The fraction of time spent in major garbage collection. Set `new_gc_metrics: true` to receive this metric. | N/A |
| `jvm.gc.minor_collection_time` | The fraction of time spent in minor garbage collection. Set `new_gc_metrics: true` to receive this metric. | N/A |
| `jvm.os.open_file_descriptors` | The number of open file descriptors. | N/A |

{{% /tab %}}

{{% tab "Go" %}}

| Datadog metric | Description |  OpenTelemetry metric |
| --- | --- | --- |
| `runtime.go.num_goroutine` | Number of goroutines spawned. | `process.runtime.go.goroutines` |
| `runtime.go.num_cgo_call` | Number of CGO calls made. |`process.runtime.go.cgo.calls` |
| `runtime.go.mem_stats.lookups` | Number of pointer lookups performed by the runtime. | `process.runtime.go.mem.lookups` |
| `runtime.go.mem_stats.heap_alloc` | Bytes of allocated heap objects. | `process.runtime.go.mem.heap_alloc` |
| `runtime.go.mem_stats.heap_sys` | Bytes of heap memory obtained from the operating system. | `process.runtime.go.mem.heap_sys` |
| `runtime.go.mem_stats.heap_idle` | Bytes in idle (unused) spans. | `process.runtime.go.mem.heap_idle` |
| `runtime.go.mem_stats.heap_inuse` | Bytes in in-use spans. | `process.runtime.go.mem.heap_inuse` |
| `runtime.go.mem_stats.heap_released` | Bytes of physical memory returned to the operating system. | `process.runtime.go.mem.heap_released` |
| `runtime.go.mem_stats.heap_objects` | Number of allocated heap objects. | `process.runtime.go.mem.heap_objects` |
| `runtime.go.mem_stats.pause_total_ns` | Cumulative nanoseconds in garbage collection (GC). | `process.runtime.go.gc.pause_total_ns` |
| `runtime.go.mem_stats.num_gc` | Number of completed GC cycles. | `process.runtime.go.gc.count` |
| `runtime.go.num_cpu` | Number of CPUs detected by the runtime. | N/A |
| `runtime.go.mem_stats.alloc` | Bytes of allocated heap objects. | N/A |
| `runtime.go.mem_stats.total_alloc` | Cumulative bytes allocated for heap objects. | N/A |
| `runtime.go.mem_stats.sys` | Total bytes of memory obtained from the operating system. | N/A |
| `runtime.go.mem_stats.mallocs` | Cumulative count of heap objects allocated. | N/A |
| `runtime.go.mem_stats.frees` | Cumulative count of heap objects freed. | N/A |
| `runtime.go.mem_stats.stack_inuse` | Bytes in stack spans. | N/A |
| `runtime.go.mem_stats.stack_sys` | Bytes of stack memory obtained from the operating system. | N/A |
| `runtime.go.mem_stats.m_span_inuse` | Bytes of allocated mspan structures. | N/A |
| `runtime.go.mem_stats.m_span_sys` | Bytes of memory obtained from the operating system for mspan structures. | N/A |
| `runtime.go.mem_stats.m_cache_inuse` | Bytes of allocated mcache structures. | N/A |
| `runtime.go.mem_stats.m_cache_sys` | Bytes of memory obtained from the operating system for mcache structures. | N/A |
| `runtime.go.mem_stats.buck_hash_sys` | Bytes of memory in profiling bucket hash tables. | N/A |
| `runtime.go.mem_stats.gc_sys` | Bytes of memory in garbage collection metadata. | N/A |
| `runtime.go.mem_stats.other_sys` | Bytes of memory in miscellaneous off-heap. | N/A |
| `runtime.go.mem_stats.next_gc` | Target heap size of the next GC cycle. | N/A |
| `runtime.go.mem_stats.last_gc` | Last garbage collection finished, as nanoseconds since the UNIX epoch. | N/A |
| `runtime.go.mem_stats.num_forced_gc` | Number of GC cycles that were forced by the application calling the GC function. | N/A |
| `runtime.go.mem_stats.gc_cpu_fraction` | Fraction of this program's available CPU time used by the GC since the program started. | N/A |
| `runtime.go.gc_stats.pause_quantiles.min` | Distribution of GC pause times: minimum values. | N/A |
| `runtime.go.gc_stats.pause_quantiles.25p` | Distribution of GC pause times: 25th percentile. | N/A |
| `runtime.go.gc_stats.pause_quantiles.50p` | Distribution of GC pause times: 50th percentile. | N/A |
| `runtime.go.gc_stats.pause_quantiles.75p` | Distribution of GC pause times: 75th percentile. | N/A |
| `runtime.go.gc_stats.pause_quantiles.max` | Distribution of GC pause times: maximum values. | N/A |

{{% /tab %}}

{{% tab ".NET" %}}

| Datadog metric | Description |  OpenTelemetry metric |
| --- | --- | --- |
| `runtime.dotnet.threads.contention_count` | The number of times a thread stopped to wait on a lock. | `process.runtime.dotnet.`<br>`monitor.lock_contention.count` |
| `runtime.dotnet.exceptions.count` | The number of first-chance exceptions. | `process.runtime.dotnet.`<br>`exceptions.count` |
| `runtime.dotnet.gc.size.gen0` | The size of the gen 0 heap. | `process.runtime.dotnet.`<br>`gc.heap.size` |
| `runtime.dotnet.gc.size.gen1` | The size of the gen 1 heap. | `process.runtime.dotnet.`<br>`gc.heap.size` |
| `runtime.dotnet.gc.size.gen2` | The size of the gen 2 heap. | `process.runtime.dotnet.`<br>`gc.heap.size` |
| `runtime.dotnet.gc.size.loh` | The size of the large object heap. | `process.runtime.dotnet.`<br>`gc.heap.size` |
| `runtime.dotnet.gc.count.gen0` | The number of gen 0 garbage collections. | `process.runtime.dotnet.`<br>`gc.collections.count` |
| `runtime.dotnet.gc.count.gen1` | The number of gen 1 garbage collections. | `process.runtime.dotnet.`<br>`gc.collections.count` |
| `runtime.dotnet.gc.count.gen2` | The number of gen 2 garbage collections. | `process.runtime.dotnet.`<br>`gc.collections.count` |
| `runtime.dotnet.cpu.system` | The number of milliseconds executing in the kernel. | N/A |
| `runtime.dotnet.cpu.user` | The number of milliseconds executing outside the kernel. | N/A |
| `runtime.dotnet.cpu.percent` | The percentage of total CPU used by the application. | N/A |
| `runtime.dotnet.mem.committed` | Memory usage. | N/A |
| `runtime.dotnet.threads.count` | The number of threads. | N/A |
| `runtime.dotnet.threads.workers_count` | The number of workers in the threadpool. (.NET Core only) | N/A |
| `runtime.dotnet.threads.contention_time` | The cumulated time spent by threads waiting on a lock. (.NET Core only) | N/A |
| `runtime.dotnet.gc.memory_load` | The percentage of the total memory used by the process. The garbage collection (GC) changes its behavior when this value gets above 85. (.NET Core only) | N/A |
| `runtime.dotnet.gc.pause_time` | The amount of time the GC paused the application threads. (.NET Core only) | N/A |
| `runtime.dotnet.aspnetcore.`<br>`requests.total` | The total number of HTTP requests received by the server. (.NET Core only) | N/A |
| `runtime.dotnet.aspnetcore.`<br>`requests.failed` | The number of failed HTTP requests received by the server. (.NET Core only) | N/A |
| `runtime.dotnet.aspnetcore.`<br>`requests.current` | The total number of HTTP requests that have started but not yet stopped. (.NET Core only) | N/A |
| `runtime.dotnet.aspnetcore.`<br>`requests.queue_length` | The current length of the server HTTP request queue. (.NET Core only) | N/A |
| `runtime.dotnet.aspnetcore.`<br>`connections.total` | The total number of HTTP connections established to the server. (.NET Core only) | N/A |
| `runtime.dotnet.aspnetcore.`<br>`connections.current` | The current number of active HTTP connections to the server. (.NET Core only) | N/A |
| `runtime.dotnet.aspnetcore.`<br>`connections.queue_length` | The current length of the HTTP server connection queue. (.NET Core only) | N/A |

{{% /tab %}}

{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/mapping/metrics_mapping/
[2]: /opentelemetry/setup/
[3]: https://app.datadoghq.com/integrations
[5]: /tracing/metrics/runtime_metrics/
[7]: https://app.datadoghq.com/dash/integration/256/jvm-metrics