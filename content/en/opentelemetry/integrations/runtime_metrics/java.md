---
title: OpenTelemetry Java Runtime Metrics
aliases:
- /opentelemetry/runtime_metrics/java/
kind: documentation
code_lang: java
type: multi-code-lang
code_lang_weight: 10
---

## Prerequisites

- You are successfully [sending OpenTelemetry metrics to Datadog][1].
- You have installed the language integration for [Java][2].

## OpenTelemetry SDK configuration

If you have instrumented your Java applications with [OpenTelemetry automatic instrumentation][3], runtime metrics are automatically enabled.

If you have instrumented your Java application with [OpenTelemetry manual instrumentation][4], see the following guides for your Java version:
- [Java 8][5]
- [Java 17][6]

## Runtime metric mappings

The following table lists the Datadog runtime metrics that are supported by mapping OpenTelemetry runtime metrics, with "N/A" indicating that there is no OpenTelemetry counterpart.

| Datadog metric | Description |  OpenTelemetry counterpart |
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
|	`jvm.gc.cms.count` | The total number of garbage collections that have occurred. | N/A |
|	`jvm.gc.major_collection_count` | The rate of major garbage collections. Set `new_gc_metrics: true` to receive this metric. | N/A |
|	`jvm.gc.minor_collection_count` | The rate of minor garbage collections. Set `new_gc_metrics: true` to receive this metric. | N/A |
|	`jvm.gc.major_collection_time` | The fraction of time spent in major garbage collection. Set `new_gc_metrics: true` to receive this metric. | N/A |
|	`jvm.gc.minor_collection_time` | The fraction of time spent in minor garbage collection. Set `new_gc_metrics: true` to receive this metric. | N/A |
|	`jvm.os.open_file_descriptors` | | N/A |


[1]: /opentelemetry/otel_metrics
[2]: https://app.datadoghq.com/integrations/java
[3]: https://opentelemetry.io/docs/instrumentation/java/automatic/
[4]: https://opentelemetry.io/docs/instrumentation/java/manual/
[5]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/runtime-telemetry/runtime-telemetry-java8/library
[6]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/runtime-telemetry/runtime-telemetry-java17/library
