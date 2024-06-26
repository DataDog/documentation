---
title: OpenTelemetry Go Runtime Metrics
aliases:
- /opentelemetry/runtime_metrics/go/
kind: documentation
code_lang: go
type: multi-code-lang
code_lang_weight: 30
---

## Prerequisites

- You are successfully [sending OpenTelemetry metrics to Datadog][1].
- You have installed the language integration for [Go][2].

## OpenTelemetry SDK configuration

OpenTelemetry (OTel) Go applications are [instrumented manually][3]. To enable runtime metrics, see the documentation for the [runtime package][4].

## Runtime metric mappings

The following table lists the Datadog runtime metrics that are supported by mapping OpenTelemetry runtime metrics, with "N/A" indicating that there is no OpenTelemetry counterpart.

| Datadog metric | Description |  OpenTelemetry counterpart |
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

[1]: /opentelemetry/otel_metrics
[2]: https://app.datadoghq.com/integrations/go
[3]: https://opentelemetry.io/docs/instrumentation/go/manual/
[4]: https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/runtime
