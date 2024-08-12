---
aliases:
- /opentelemetry/runtime_metrics/java/
code_lang: java
code_lang_weight: 10
title: Métricas de tiempo de ejecución de OpenTelemetry Java
type: multi-code-lang
---

## Requisitos previos

- Estás enviando correctamente [métricas de OpenTelemetry a Datadog][1].
- Has instalado la integración de lenguaje para [Java][2].

## Configuración del SDK de OpenTelemetry

Si has instrumentado tus aplicaciones Java con [la instrumentación automática de OpenTelemetry][3], se habilitan automáticamente las métricas de tiempo de ejecución.

Si has instrumentado tu aplicación Java con [la instrumentación manual de OpenTelemetry][4], consulta las siguientes guías para tu versión de Java:
- [Java 8][5]
- [Java 17][6]

## Asignaciones de métricas de tiempos de ejecución

La siguiente tabla enumera las métricas de tiempo de ejecución de Datadog que son compatibles con la asignación de métricas de tiempo de ejecución de OpenTelemetry con "N/A" indicando que no hay homólogo de OpenTelemetry.

| Métrica de Datadog | Descripción |  Homólogo de OpenTelemetry |
| --- | --- | --- |
| `jvm.heap_memory` | El total de memoria heap utilizada en Java. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.heap_memory_committed` | El total de memoria heap comprometida en Java para ser utilizada. | `process.runtime.jvm.memory.committed` <br> `jvm.memory.committed` |
| `jvm.heap_memory_init` | La memoria heap inicial de Java asignada. | `process.runtime.jvm.memory.init` <br> `jvm.memory.init` |
| `jvm.heap_memory_max` | La memoria heap máxima disponible en Java. | `process.runtime.jvm.memory.limit` <br> `jvm.memory.limit` |
| `jvm.non_heap_memory` | El total de memoria no heap de Java utilizada. La memoria no heap es: `Metaspace + CompressedClassSpace + CodeCache`. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.non_heap_memory_committed` | El total de memoria no heap comprometida en Java para ser utilizada. | `process.runtime.jvm.memory.committed` <br> `jvm.memory.committed` |
| `jvm.non_heap_memory_init` | La memoria no heap inicial de Java asignada. | `process.runtime.jvm.memory.init` <br> `jvm.memory.init` |
| `jvm.non_heap_memory_max` | La memoria no heap máxima disponible en Java. | `process.runtime.jvm.memory.limit` <br> `jvm.memory.limit` |
| `jvm.gc.old_gen_size` | El uso actual de memoria heap de Java del grupo de memoria Old Generation. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.gc.eden_size` | El uso actual de memoria heap de Java del grupo de memoria Eden. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.gc.survivor_size` | El uso actual de memoria heap de Java del grupo de memoria Survivor. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.gc.metaspace_size` | El uso actual de memoria no heap de Java del grupo de memoria Metaspace. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.thread_count` | El número de subprocesos en directo. | `process.runtime.jvm.threads.count` <br> `jvm.thread.count` |
| `jvm.loaded_classes` | Número de clases cargadas actualmente. | `process.runtime.jvm.classes.current_loaded` <br> `jvm.class.count` |
| `jvm.cpu_load.system` | Uso reciente de la CPU para todo el sistema. | `process.runtime.jvm.system.cpu.utilization` <br> `jvm.system.cpu.utilization` |
| `jvm.cpu_load.process` | Uso reciente de la CPU en proceso. | `process.runtime.jvm.cpu.utilization` <br> `jvm.cpu.recent_utilization` |
| `jvm.buffer_pool.direct.used` | Medida de la memoria utilizada por buffers. | `process.runtime.jvm.buffer.usage` <br> `jvm.buffer.memory.usage` |
| `jvm.buffer_pool.direct.count` | Número de buffers directos en el grupo. | `process.runtime.jvm.buffer.count`<br> `jvm.buffer.count` |
| `jvm.buffer_pool.direct.limit` | Medida de la capacidad total de memoria de buffers directos. | `process.runtime.jvm.buffer.limit` <br> `jvm.buffer.memory.limit` |
| `jvm.buffer_pool.mapped.used` | Medida de la memoria utilizada por los buffers asignados. | `process.runtime.jvm.buffer.usage`<br> `jvm.buffer.memory.usage` |
| `jvm.buffer_pool.mapped.count` | Número de buffers asignados en el grupo. | `process.runtime.jvm.buffer.count`<br> `jvm.buffer.count` |
| `jvm.buffer_pool.mapped.limit` | Medida de la capacidad total de memoria de buffers asignados. | `process.runtime.jvm.buffer.limit` <br> `jvm.buffer.memory.limit` |
| `jvm.gc.parnew.time` | El tiempo acumulado aproximado de recopilación de elementos no usados transcurrido. | N/A |
|   `jvm.gc.cms.count` | El número total de recopilaciones de elementos no usados que se han producido. | N/A |
|   `jvm.gc.major_collection_count` | El índice de las principales recopilaciones de elementos no usados. Configura `new_gc_metrics: true` para recibir esta métrica. | N/A |
|   `jvm.gc.minor_collection_count` | La tasa de recopilaciones secundarias de elementos no usados. Establece `new_gc_metrics: true` para recibir esta métrica. | N/A |
|   `jvm.gc.major_collection_time` | La fracción de tiempo empleado en la recopilación principal de elementos no usados. Configura `new_gc_metrics: true` para recibir esta métrica. | N/A |
|   `jvm.gc.minor_collection_time` | La fracción de tiempo empleado en la recopilación secundaria de elementos no usados. Configura `new_gc_metrics: true` para recibir esta métrica. | N/A |
|   `jvm.os.open_file_descriptors` | | N/A |


[1]: /es/opentelemetry/otel_metrics
[2]: https://app.datadoghq.com/integrations/java
[3]: https://opentelemetry.io/docs/instrumentation/java/automatic/
[4]: https://opentelemetry.io/docs/instrumentation/java/manual/
[5]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/runtime-telemetry/runtime-telemetry-java8/library
[6]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/runtime-telemetry/runtime-telemetry-java17/library