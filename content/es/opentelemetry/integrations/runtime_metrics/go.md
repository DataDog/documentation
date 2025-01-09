---
aliases:
- /opentelemetry/runtime_metrics/go/
code_lang: go
code_lang_weight: 30
title: Métricas de tiempo de ejecución de OpenTelemetry Go
type: multi-code-lang
---

## Requisitos previos

- Estás enviando correctamente [métricas de OpenTelemetry a Datadog][1].
- Has instalado la integración de lenguaje para [Go][2].

## Configuración del SDK de OpenTelemetry

Las aplicaciones de OpenTelemetry (OTel) Go se [instrumentan manualmente][3]. Para habilitar las métricas de tiempo de ejecución, consulta la documentación del [paquete de tiempo de ejecución][4].

## Asignaciones de métricas de tiempos de ejecución

La siguiente tabla enumera las métricas de tiempo de ejecución de Datadog que son compatibles con la asignación de métricas de tiempo de ejecución de OpenTelemetry con "N/A" indicando que no hay homólogo de OpenTelemetry.

| Métrica de Datadog | Descripción |  Homólogo de OpenTelemetry |
| --- | --- | --- |
| `runtime.go.num_goroutine` | Número de goroutines generadas. | `process.runtime.go.goroutines` |
| `runtime.go.num_cgo_call` | Número de llamadas CGO realizadas. |`process.runtime.go.cgo.calls` |
| `runtime.go.mem_stats.lookups` | Número de búsquedas de punteros realizadas por el tiempo de ejecución. | `process.runtime.go.mem.lookups` |
| `runtime.go.mem_stats.heap_alloc` | Bytes de objetos heap asignados. | `process.runtime.go.mem.heap_alloc` |
| `runtime.go.mem_stats.heap_sys` | Bytes de memoria heap obtenidos del sistema operativo. | `process.runtime.go.mem.heap_sys` |
| `runtime.go.mem_stats.heap_idle` | Bytes en tramos (spans) en reposo (no utilizados). | `process.runtime.go.mem.heap_idle` |
| `runtime.go.mem_stats.heap_inuse` | Bytes de tramos en uso. | `process.runtime.go.mem.heap_inuse` |
| `runtime.go.mem_stats.heap_released` | Bytes de memoria física devueltos al sistema operativo. | `process.runtime.go.mem.heap_released` |
| `runtime.go.mem_stats.heap_objects` | Número de objetos heap asignados. | `process.runtime.go.mem.heap_objects` |
| `runtime.go.mem_stats.pause_total_ns` | Nanosegundos acumulados en la recopilación de elementos no usados (GC). | `process.runtime.go.gc.pause_total_ns` |
| `runtime.go.mem_stats.num_gc` | Número de ciclos de GC completados. | `process.runtime.go.gc.count` |
| `runtime.go.num_cpu` | Número de CPUs detectadas por el tiempo de ejecución. | N/A |
| `runtime.go.mem_stats.alloc` | Bytes de objetos heap asignados. | N/A |
| `runtime.go.mem_stats.total_alloc` | Bytes acumulados asignados a objetos heap. | N/A |
| `runtime.go.mem_stats.sys` | Total de bytes de memoria obtenidos del sistema operativo. | N/A |
| `runtime.go.mem_stats.mallocs` | Recuento acumulativo de objetos heap asignados. | N/A |
| `runtime.go.mem_stats.frees` | Recuento acumulativo de objetos heap liberados. | N/A |
| `runtime.go.mem_stats.stack_inuse` | Bytes en tramos de stack. | N/A |
| `runtime.go.mem_stats.stack_sys` | Bytes de memoria de stack obtenidos del sistema operativo. | N/A |
| `runtime.go.mem_stats.m_span_inuse` | Bytes de las estructuras mspan asignadas. | N/A |
| `runtime.go.mem_stats.m_span_sys` | Bytes de memoria obtenidos del sistema operativo para las estructuras mspan. | N/A |
| `runtime.go.mem_stats.m_cache_inuse` | Bytes de estructuras mcache asignadas. | N/A |
| `runtime.go.mem_stats.m_cache_sys` | Bytes de memoria obtenidos del sistema operativo para las estructuras mcache. | N/A |
| `runtime.go.mem_stats.buck_hash_sys` | Bytes de memoria en tablas hash de buckets de perfiles. | N/A |
| `runtime.go.mem_stats.gc_sys` | Bytes de memoria en metadatos de recopilación de elementos no usados. | N/A |
| `runtime.go.mem_stats.other_sys` | Bytes de memoria en miscelánea fuera de heap. | N/A |
| `runtime.go.mem_stats.next_gc` | Tamaño de heap objetivo del siguiente ciclo de GC. | N/A |
| `runtime.go.mem_stats.last_gc` | Última recopilación de elementos no usados finalizada, en nanosegundos desde la epoch de UNIX. | N/A |
| `runtime.go.mem_stats.num_forced_gc` | Número de ciclos de GC forzados por la aplicación que llama a la función de GC. | N/A |
| `runtime.go.mem_stats.gc_cpu_fraction` | Fracción del tiempo de CPU disponible de este programa utilizado por la GC desde que se inició el programa. | N/A |
| `runtime.go.gc_stats.pause_quantiles.min` | Distribución de los tiempos de pausa de la GC: valores mínimos. | N/A |
| `runtime.go.gc_stats.pause_quantiles.25p` | Distribución de los tiempos de pausa de la GC: percentil 25. | N/A |
| `runtime.go.gc_stats.pause_quantiles.50p` | Distribución de los tiempos de pausa de la GC: percentil 50. | N/A |
| `runtime.go.gc_stats.pause_quantiles.75p` | Distribución de los tiempos de pausa de la GC: percentil 75. | N/A |
| `runtime.go.gc_stats.pause_quantiles.max` | Distribución de los tiempos de pausa de la GC: valores máximos. | N/A |

[1]: /es/opentelemetry/otel_metrics
[2]: https://app.datadoghq.com/integrations/go
[3]: https://opentelemetry.io/docs/instrumentation/go/manual/
[4]: https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/runtime