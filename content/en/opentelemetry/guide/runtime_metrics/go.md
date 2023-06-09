---
title: OpenTelemetry Go Runtime Metrics
kind: documentation
code_lang: go
type: multi-code-lang
code_lang_weight: 10
aliases:
- /opentelemetry/guide/runtime_metrics/go
---

## OpenTelemetry SDK Configuration

OpenTelemetry (OTel) Go applications can be instrumented [manually](https://opentelemetry.io/docs/instrumentation/go/manual/). In order to enable runtime metrics when using manual instrumentation, refer to the documentation for the [runtime package](https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/runtime).

## Runtime Metric Mappings

This table lists all of the Datadog runtime metrics that we currently support by mapping OTel runtime metrics. At the bottom, metrics with a N/A OTel counterpart are metrics that don't have mappings because there is no OTel counterpart yet.

| Datadog metric | Description |  OTel counterpart |
| --- | --- | --- |
| **runtime.go.num_goroutine** | goroutines spawned. | process.runtime.go.goroutines |
| **runtime.go.num_cgo_call** | CGO calls made. | process.runtime.go.cgo.calls |
| **runtime.go.mem_stats.lookups** | Lookups is the number of pointer lookups performed by the | process.runtime.go.mem.lookups |
| **runtime.go.mem_stats.heap_alloc** | HeapAlloc is bytes of allocated heap objects. | process.runtime.go.mem.heap_alloc |
| **runtime.go.mem_stats.heap_sys** | HeapSys is bytes of heap memory obtained from the OS. | process.runtime.go.mem.heap_sys |
| **runtime.go.mem_stats.heap_idle** | HeapIdle is bytes in idle (unused) spans. | process.runtime.go.mem.heap_idle |
| **runtime.go.mem_stats.heap_inuse** | HeapInuse is bytes in in-use spans. | process.runtime.go.mem.heap_inuse |
| **runtime.go.mem_stats.heap_released** | HeapReleased is bytes of physical memory returned to the OS. | process.runtime.go.mem.heap_released |
| **runtime.go.mem_stats.heap_objects** | HeapObjects is the number of allocated heap objects. | process.runtime.go.mem.heap_objects |
| **runtime.go.mem_stats.pause_total_ns** | PauseTotalNs is the cumulative nanoseconds in GC | process.runtime.go.gc.pause_total_ns |
| **runtime.go.mem_stats.num_gc** | NumGC is the number of completed GC cycles. | process.runtime.go.gc.count |
| **runtime.go.num_cpu** | CPUs detected by the runtime. | N/A |
| **runtime.go.mem_stats.alloc** | Alloc is bytes of allocated heap objects. | N/A |
| **runtime.go.mem_stats.total_alloc** | TotalAlloc is cumulative bytes allocated for heap objects. | N/A |
| **runtime.go.mem_stats.sys** | Sys is the total bytes of memory obtained from the OS. | N/A |
| **runtime.go.mem_stats.mallocs** | Mallocs is the cumulative count of heap objects allocated. | N/A |
| **runtime.go.mem_stats.frees** | Frees is the cumulative count of heap objects freed. | N/A |
| **runtime.go.mem_stats.stack_inuse** | StackInuse is bytes in stack spans. | N/A |
| **runtime.go.mem_stats.stack_sys** | StackSys is bytes of stack memory obtained from the OS. | N/A |
| **runtime.go.mem_stats.m_span_inuse** | MSpanInuse is bytes of allocated mspan structures. | N/A |
| **runtime.go.mem_stats.m_span_sys** | MSpanSys is bytes of memory obtained from the OS for mspan structures. | N/A |
| **runtime.go.mem_stats.m_cache_inuse** | MCacheInuse is bytes of allocated mcache structures. | N/A |
| **runtime.go.mem_stats.m_cache_sys** | MCacheSys is bytes of memory obtained from the OS for | N/A |
| **runtime.go.mem_stats.buck_hash_sys** | BuckHashSys is bytes of memory in profiling bucket hash tables. | N/A |
| **runtime.go.mem_stats.gc_sys** | GCSys is bytes of memory in garbage collection metadata. | N/A |
| **runtime.go.mem_stats.other_sys** | OtherSys is bytes of memory in miscellaneous off-heap | N/A |
| **runtime.go.mem_stats.next_gc** | NextGC is the target heap size of the next GC cycle. | N/A |
| **runtime.go.mem_stats.last_gc** | LastGC is the time the last garbage collection finished, as nanoseconds since 1970 (the UNIX epoch). | N/A |
| **runtime.go.mem_stats.num_forced_gc** | NumForcedGC is the number of GC cycles that were forced by the application calling the GC function. | N/A |
| **runtime.go.mem_stats.gc_cpu_fraction** | GCCPUFraction is the fraction of this program's available CPU time used by the GC since the program started. | N/A |
| **runtime.go.gc_stats.pause_quantiles.min** | Distribution of GC pause times: minimum values | N/A |
| **runtime.go.gc_stats.pause_quantiles.25p** | Distribution of GC pause times: 25th percentile | N/A |
| **runtime.go.gc_stats.pause_quantiles.50p** | Distribution of GC pause times: 50th percentile | N/A |
| **runtime.go.gc_stats.pause_quantiles.75p** | Distribution of GC pause times: 75th percentile | N/A |
| **runtime.go.gc_stats.pause_quantiles.max** | Distribution of GC pause times: maximum values | N/A |
