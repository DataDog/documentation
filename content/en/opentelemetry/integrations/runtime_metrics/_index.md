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
- NodeJS
- Python

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

{{% tab "NodeJS" %}}

#### Automatic instrumentation

If you use [OpenTelemetry automatic instrumentation][3] for Node.js applications, runtime metrics are enabled by default through the [`@opentelemetry/instrumentation-runtime-node`][5] package.

**Note**: Runtime metrics are only exported if a `MeterProvider` and metric exporter are configured. Set the `OTEL_METRICS_EXPORTER` environment variable or programmatically configure a `metricReader` in your SDK initialization.

#### Manual instrumentation

If you use [OpenTelemetry manual instrumentation][4], see the documentation for the [`@opentelemetry/instrumentation-runtime-node`][5] library.

[3]: https://opentelemetry.io/docs/zero-code/js/
[4]: https://opentelemetry.io/docs/languages/js/instrumentation/
[5]: https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/packages/instrumentation-runtime-node

{{% /tab %}}

{{% tab "Python" %}}

Runtime metrics are not enabled by default for Python applications. Install the [`opentelemetry-instrumentation-system-metrics`][5] package:

```shell
pip install opentelemetry-instrumentation-system-metrics
```

If you use [automatic instrumentation][3], `opentelemetry-instrument` discovers and enables the package after installation. If you use [manual instrumentation][4], enable it in your application:

```python
from opentelemetry.instrumentation.system_metrics import SystemMetricsInstrumentor

SystemMetricsInstrumentor().instrument()
```

[3]: https://opentelemetry.io/docs/languages/python/automatic/
[4]: https://opentelemetry.io/docs/languages/python/instrumentation/
[5]: https://github.com/open-telemetry/opentelemetry-python-contrib/tree/main/instrumentation/opentelemetry-instrumentation-system-metrics

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

The following tables list the OpenTelemetry runtime metrics used in Datadog's out-of-the-box in-app experiences. "N/A" indicates that no OpenTelemetry equivalent metric is available.

<div class="alert alert-danger"> OpenTelemetry runtime metrics are mapped to Datadog by metric name. Do not rename host metrics for OpenTelemetry runtime metrics as this breaks the mapping.</div>

[100]: /opentelemetry/setup/collector_exporter/
[101]: /opentelemetry/setup/otlp_ingest_in_the_agent

{{< tabs >}}
{{% tab "Java" %}}

| Datadog metric | Description |  OpenTelemetry metric |
| --- | --- | --- |
| `jvm.heap_memory` | The total Java heap memory used. | `jvm.memory.heap.used` |
| `jvm.heap_memory_committed` | The total Java heap memory committed to be used. | `jvm.memory.heap.committed` |
| `jvm.heap_memory_init` | The initial Java heap memory allocated. | `jvm.memory.heap.init` |
| `jvm.heap_memory_max` | The maximum Java heap memory available. | `jvm.memory.heap.max` |
| `jvm.non_heap_memory` | The total Java non-heap memory used. Non-heap memory is: `Metaspace + CompressedClassSpace + CodeCache`. | `jvm.memory.nonheap.used` |
| `jvm.non_heap_memory_committed` | The total Java non-heap memory committed to be used. | `jvm.memory.nonheap.committed` |
| `jvm.non_heap_memory_init` | The initial Java non-heap memory allocated. | `jvm.memory.nonheap.init` |
| `jvm.non_heap_memory_max` | The maximum Java non-heap memory available. | `jvm.memory.nonheap.max` |
| `jvm.gc.old_gen_size` | The current Java heap memory usage of the Old Generation memory pool. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` <br> `jvm.memory.pool.used` |
| `jvm.gc.eden_size` | The current Java heap memory usage of the Eden memory pool. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` <br> `jvm.memory.pool.used` |
| `jvm.gc.survivor_size` | The current Java heap memory usage of the Survivor memory pool. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` <br> `jvm.memory.pool.used` |
| `jvm.gc.metaspace_size` | The current Java non-heap memory usage of the Metaspace memory pool. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` <br> `jvm.memory.pool.used` |
| `jvm.thread_count` | The number of live threads. | `jvm.threads.count` |
| `jvm.loaded_classes` | Number of classes currently loaded. | `process.runtime.jvm.classes.current_loaded` <br> `jvm.class.count` <br> `jvm.classes.loaded` |
| `jvm.cpu_load.system` | Recent CPU utilization for the whole system. | `process.runtime.jvm.system.cpu.utilization` <br> `jvm.system.cpu.utilization` |
| `jvm.cpu_load.process` | Recent CPU utilization for the process. | `process.runtime.jvm.cpu.utilization` <br> `jvm.cpu.recent_utilization` |
| `jvm.buffer_pool.direct.used` | Measure of memory used by direct buffers. | `process.runtime.jvm.buffer.usage` <br> `jvm.buffer.memory.used` |
| `jvm.buffer_pool.direct.count` | Number of direct buffers in the pool. | `process.runtime.jvm.buffer.count` <br> `jvm.buffer.count` |
| `jvm.buffer_pool.direct.capacity` | Measure of total memory capacity of direct buffers. | `jvm.buffer.memory.limit` |
| `jvm.buffer_pool.mapped.used` | Measure of memory used by mapped buffers. | `process.runtime.jvm.buffer.usage` <br> `jvm.buffer.memory.used` |
| `jvm.buffer_pool.mapped.count` | Number of mapped buffers in the pool. | `process.runtime.jvm.buffer.count` <br> `jvm.buffer.count` |
| `jvm.buffer_pool.mapped.capacity` | Measure of total memory capacity of mapped buffers. | `jvm.buffer.memory.limit` |
| `jvm.gc.parnew.time` | The approximate accumulated garbage collection time elapsed. | N/A |
| `jvm.gc.cms.count` | The total number of garbage collections that have occurred. | N/A |
| `jvm.gc.major_collection_count` | The rate of major garbage collections. Set `new_gc_metrics: true` to receive this metric. | `jvm.gc.collections.count` |
| `jvm.gc.minor_collection_count` | The rate of minor garbage collections. Set `new_gc_metrics: true` to receive this metric. | `jvm.gc.collections.count` |
| `jvm.gc.major_collection_time` | The fraction of time spent in major garbage collection. Set `new_gc_metrics: true` to receive this metric. | `jvm.gc.collections.elapsed` |
| `jvm.gc.minor_collection_time` | The fraction of time spent in minor garbage collection. Set `new_gc_metrics: true` to receive this metric. | `jvm.gc.collections.elapsed` |
| `jvm.os.open_file_descriptors` | The number of open file descriptors. | `jvm.file_descriptor.count` |

{{% /tab %}}

{{% tab "Go" %}}

| Datadog metric | Description |  OpenTelemetry metric |
| --- | --- | --- |
| `runtime.go.num_goroutine` | Number of goroutines spawned. | `process.runtime.go.goroutines` |
| `runtime.go.num_cgo_call` | Number of CGO calls made. | `process.runtime.go.cgo.calls` |
| `runtime.go.mem_stats.lookups` | Number of pointer lookups performed by the runtime. | N/A |
| `runtime.go.mem_stats.heap_alloc` | Bytes of allocated heap objects. | `process.runtime.go.mem.heap_alloc` |
| `runtime.go.mem_stats.heap_sys` | Bytes of heap memory obtained from the operating system. | `process.runtime.go.mem.heap_sys` |
| `runtime.go.mem_stats.heap_idle` | Bytes in idle (unused) spans. | `process.runtime.go.mem.heap_idle` |
| `runtime.go.mem_stats.heap_inuse` | Bytes in in-use spans. | `process.runtime.go.mem.heap_inuse` |
| `runtime.go.mem_stats.heap_released` | Bytes of physical memory returned to the operating system. | `process.runtime.go.mem.heap_released` |
| `runtime.go.mem_stats.heap_objects` | Number of allocated heap objects. | `process.runtime.go.mem.heap_objects` |
| `runtime.go.mem_stats.pause_total_ns` | Cumulative nanoseconds in garbage collection (GC). | `process.runtime.go.gc.pause_total_ns` |
| `runtime.go.mem_stats.num_gc` | Number of completed GC cycles. | `process.runtime.go.gc.count` |
| `runtime.go.metrics.gc_gomemlimit.bytes` | A soft memory limit to the Go runtime. | `go.memory.limit` |
| `runtime.go.metrics.gc_heap_goal.bytes` | Heap size target for the end of the GC cycle. | `go.memory.gc.goal` |
| `runtime.go.metrics.sched_goroutines.goroutines` | Number of live goroutines. | `go.goroutine.count` |
| `runtime.go.metrics.sched_gomaxprocs.threads` | The current GOMAXPROCS setting. | `go.processor.limit` |
| `runtime.go.metrics.gc_gogc.percent` | The current GOGC setting. | `go.config.gogc` |
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
| `runtime.go.gc_stats.pause_quantiles.95p` | Distribution of GC pause times: 95th percentile. | N/A |
| `runtime.go.gc_stats.pause_quantiles.max` | Distribution of GC pause times: maximum values. | N/A |

{{% /tab %}}

{{% tab ".NET" %}}

| Datadog metric | Description |  OpenTelemetry metric |
| --- | --- | --- |
| `runtime.dotnet.threads.contention_count` | The number of times a thread stopped to wait on a lock. | N/A |
| `runtime.dotnet.exceptions.count` | The number of first-chance exceptions. | N/A |
| `runtime.dotnet.gc.size.gen0` | The size of the gen 0 heap. | `dotnet.gc.last_collection.heap.size` <br> `process.runtime.dotnet.gc.heap.size` |
| `runtime.dotnet.gc.size.gen1` | The size of the gen 1 heap. | `dotnet.gc.last_collection.heap.size` <br> `process.runtime.dotnet.gc.heap.size` |
| `runtime.dotnet.gc.size.gen2` | The size of the gen 2 heap. | `dotnet.gc.last_collection.heap.size` <br> `process.runtime.dotnet.gc.heap.size` |
| `runtime.dotnet.gc.size.loh` | The size of the large object heap. | `dotnet.gc.last_collection.heap.size` <br> `process.runtime.dotnet.gc.heap.size` |
| `runtime.dotnet.gc.count.gen0` | The number of gen 0 garbage collections. | `dotnet.gc.collections` <br> `process.runtime.dotnet.gc.collections.count` |
| `runtime.dotnet.gc.count.gen1` | The number of gen 1 garbage collections. | `dotnet.gc.collections` <br> `process.runtime.dotnet.gc.collections.count` |
| `runtime.dotnet.gc.count.gen2` | The number of gen 2 garbage collections. | `dotnet.gc.collections` <br> `process.runtime.dotnet.gc.collections.count` |
| `runtime.dotnet.cpu.system` | The number of milliseconds executing in the kernel. | `dotnet.process.cpu.time` |
| `runtime.dotnet.cpu.user` | The number of milliseconds executing outside the kernel. | `dotnet.process.cpu.time` |
| `runtime.dotnet.cpu.percent` | The percentage of total CPU used by the application. | N/A |
| `runtime.dotnet.mem.committed` | Memory usage. | N/A |
| `runtime.dotnet.threads.count` | The number of threads. | `process.thread.count` |
| `runtime.dotnet.threads.workers_count` | The number of workers in the threadpool. (.NET Core only) | `process.runtime.dotnet.thread_pool.threads.count` |
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

{{% tab "NodeJS" %}}

| Datadog metric | Description |  OpenTelemetry metric |
| --- | --- | --- |
| `runtime.node.cpu.user` | CPU usage in user code. | N/A |
| `runtime.node.cpu.system` | CPU usage in system code. | N/A |
| `runtime.node.cpu.total` | Total CPU usage. | N/A |
| `runtime.node.mem.rss` | Resident set size. | `process.memory.usage` |
| `runtime.node.mem.heap_total` | Total heap memory. | N/A |
| `runtime.node.mem.heap_used` | Heap memory usage. | N/A |
| `runtime.node.mem.total` | Total system memory size. | N/A |
| `runtime.node.mem.free` | Free system memory size. | `system.memory.usage` |
| `runtime.node.mem.external` | External memory. | N/A |
| `runtime.node.heap.total_heap_size` | Total heap size. | N/A |
| `runtime.node.heap.total_heap_size_executable` | Total executable heap size. | N/A |
| `runtime.node.heap.total_physical_size` | Total physical heap size. | N/A |
| `runtime.node.heap.used_heap_size` | Used heap size. | N/A |
| `runtime.node.heap.heap_size_limit` | Heap size limit. | N/A |
| `runtime.node.heap.malloced_memory` | Malloced memory. | N/A |
| `runtime.node.heap.peak_malloced_memory` | Peak allocated memory. | N/A |
| `runtime.node.heap.size.by.space` | Heap space size. | `v8js.memory.heap.limit` |
| `runtime.node.heap.used_size.by.space` | Heap space used size. | `v8js.memory.heap.used` |
| `runtime.node.heap.available_size.by.space` | Heap space available size. | `v8js.memory.heap.space.available_size` |
| `runtime.node.heap.physical_size.by.space` | Heap space physical size. | `v8js.memory.heap.space.physical_size` |
| `runtime.node.process.uptime` | Process uptime. | N/A |
| `runtime.node.event_loop.delay.max` | Maximum event loop delay. | N/A |
| `runtime.node.event_loop.delay.min` | Minimum event loop delay. | N/A |
| `runtime.node.event_loop.delay.avg` | Average event loop delay. | N/A |
| `runtime.node.event_loop.delay.sum` | Total event loop delay. | N/A |
| `runtime.node.event_loop.delay.median` | Median event loop delay. | N/A |
| `runtime.node.event_loop.delay.95percentile` | 95th percentile event loop delay. | N/A |
| `runtime.node.event_loop.delay.count` | Event loop iteration count where a delay is detected. | N/A |
| `runtime.node.event_loop.utilization` | Fraction of time the event loop is active. | `nodejs.eventloop.utilization` |
| `runtime.node.gc.pause.max` | Maximum garbage collection pause. | N/A |
| `runtime.node.gc.pause.min` | Minimum garbage collection pause. | N/A |
| `runtime.node.gc.pause.avg` | Average garbage collection pause. | N/A |
| `runtime.node.gc.pause.sum` | Total garbage collection pause. | N/A |
| `runtime.node.gc.pause.median` | Median garbage collection pause. | N/A |
| `runtime.node.gc.pause.95percentile` | 95th percentile garbage collection pause. | N/A |
| `runtime.node.gc.pause.count` | Number of garbage collections. | N/A |
| `runtime.node.gc.pause.by.type.max` | Maximum garbage collection pause by type. | N/A |
| `runtime.node.gc.pause.by.type.min` | Minimum garbage collection pause by type. | N/A |
| `runtime.node.gc.pause.by.type.avg` | Average garbage collection pause by type. | N/A |
| `runtime.node.gc.pause.by.type.sum` | Total garbage collection pause by type. | N/A |
| `runtime.node.gc.pause.by.type.median` | Median garbage collection pause by type. | N/A |
| `runtime.node.gc.pause.by.type.95percentile` | 95th percentile garbage collection pause by type. | N/A |
| `runtime.node.gc.pause.by.type.count` | Number of garbage collections by type. | N/A |

{{% /tab %}}

{{% tab "Python" %}}

The following table lists the conceptual equivalences between OpenTelemetry and Datadog Python runtime metrics. There are no direct mappings due to mismatching metric types between the two systems.

| Datadog metric | Description | OpenTelemetry metric |
| --- | --- | --- |
| `runtime.python.cpu.time.sys` | Number of seconds executing in the kernel. | `process.cpu.time` (`type: system`) |
| `runtime.python.cpu.time.user` | Number of seconds executing outside the kernel. | `process.cpu.time` (`type: user`) |
| `runtime.python.cpu.percent` | CPU utilization percentage. OTel divides by 100 × number of cores. | `process.cpu.utilization` |
| `runtime.python.cpu.ctx_switch.voluntary` | Number of voluntary context switches. | `process.context_switches` (`type: voluntary`) |
| `runtime.python.cpu.ctx_switch.involuntary` | Number of involuntary context switches. | `process.context_switches` (`type: involuntary`) |
| `runtime.python.gc.count.gen0` | Number of generation 0 objects. | `process.runtime.{python_implementation}.gc_count` (`count: 0`) |
| `runtime.python.gc.count.gen1` | Number of generation 1 objects. | `process.runtime.{python_implementation}.gc_count` (`count: 1`) |
| `runtime.python.gc.count.gen2` | Number of generation 2 objects. | `process.runtime.{python_implementation}.gc_count` (`count: 2`) |
| `runtime.python.mem.rss` | Resident set memory. | `process.memory.usage` |
| `runtime.python.thread_count` | Number of threads. | `process.thread.count` |

{{% /tab %}}

{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/mapping/metrics_mapping/
[2]: /opentelemetry/setup/
[3]: https://app.datadoghq.com/integrations
[5]: /tracing/metrics/runtime_metrics/
[7]: https://app.datadoghq.com/dash/integration/256/jvm-metrics