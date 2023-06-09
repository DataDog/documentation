---
title: OpenTelemetry Java Runtime Metrics
kind: documentation
code_lang: java
type: multi-code-lang
code_lang_weight: 10
---

## OpenTelemetry SDK Configuration

OpenTelemetry (OTel) Java applications can be instrumented [automatically](https://opentelemetry.io/docs/instrumentation/java/automatic/) or [manually](https://opentelemetry.io/docs/instrumentation/java/manual/). Runtime metrics are automatically enabled when using automatic instrumentation. In order to enable runtime metrics when using manual instrumentation, refer to the following guides for your Java version:
- [Java 8](https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/runtime-metrics/runtime-metrics-java8/library)
- [Java 17](https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/runtime-metrics/runtime-metrics-java17/library)

## Runtime Metric Mappings

This table lists all of the Datadog runtime metrics that we currently support by mapping OTel runtime metrics. At the bottom, metrics with a N/A OTel counterpart are metrics that don't have mappings because there is no OTel counterpart yet.

| Datadog metric | Description |  OTel counterpart |
| --- | --- | --- |
| **jvm.heap_memory** | The total Java heap memory used. | process.runtime.jvm.memory.usage |
| **jvm.heap_memory_committed** | The total Java heap memory committed to be used. | process.runtime.jvm.memory.committed |
| **jvm.heap_memory_init** | The initial Java heap memory allocated. | process.runtime.jvm.memory.init |
| **jvm.heap_memory_max** | The maximum Java heap memory available. | process.runtime.jvm.memory.limit |
| **jvm.non_heap_memory** | The total Java non-heap memory used. Non-heap memory is calculated as follows: `Metaspace + CompressedClassSpace + CodeCache` | process.runtime.jvm.memory.usage |
| **jvm.non_heap_memory_committed** | The total Java non-heap memory committed to be used. | process.runtime.jvm.memory.committed |
| **jvm.non_heap_memory_init** | The initial Java non-heap memory allocated. | process.runtime.jvm.memory.init |
| **jvm.non_heap_memory_max** | The maximum Java non-heap memory available. | process.runtime.jvm.memory.limit |
| **jvm.gc.old_gen_size** | | process.runtime.jvm.memory.usage |
| **jvm.gc.eden_size** | | process.runtime.jvm.memory.usage |
| **jvm.gc.survivor_size** | | process.runtime.jvm.memory.usage |
| **jvm.gc.metaspace_size** | | process.runtime.jvm.memory.usage |
| **jvm.thread_count** | The number of live threads. | process.runtime.jvm.threads.count |
| **jvm.loaded_classes** | Number of classes currently loaded | process.runtime.jvm.classes.loaded |
| **jvm.cpu_load.system** | Recent CPU utilization for the whole system | process.runtime.jvm.system.cpu.utilization |
| **jvm.cpu_load.process** | Recent CPU utilization for the process | process.runtime.jvm.cpu.utilization |
| **jvm.buffer_pool.direct.used** | Measure of memory used by direct buffers | process.runtime.jvm.buffer.usage |
| **jvm.buffer_pool.direct.count** | Number of direct buffers in the pool | process.runtime.jvm.buffer.count |
| **jvm.buffer_pool.direct.capacity** | Measure of total memory capacity of direct buffers | process.runtime.jvm.buffer.limit |
| **jvm.buffer_pool.mapped.used** | Measure of memory used by mapped buffers | process.runtime.jvm.buffer.usage |
| **jvm.buffer_pool.mapped.count** | Number of mapped buffers in the pool | process.runtime.jvm.buffer.count |
| **jvm.buffer_pool.mapped.capacity** | Measure of total memory capacity of mapped buffers | process.runtime.jvm.buffer.limit |
| **jvm.gc.parnew.time** | The approximate accumulated garbage collection time elapsed. | process.runtime.jvm.gc.duration |
|	**jvm.gc.cms.count** | The total number of garbage collections that have occurred. | N/A |
|	**jvm.gc.major_collection_count** | The rate of major garbage collections. Set `new_gc_metrics: true` to receive this metric. | N/A |
|	**jvm.gc.minor_collection_count** | The rate of minor garbage collections. Set `new_gc_metrics: true` to receive this metric. | N/A |
|	**jvm.gc.major_collection_time** | The fraction of time spent in major garbage collection. Set `new_gc_metrics: true` to receive this metric. | N/A |
|	**jvm.gc.minor_collection_time** | The fraction of time spent in minor garbage collection. Set `new_gc_metrics: true` to receive this metric. | N/A |
|	**jvm.os.open_file_descriptors** | | N/A |
