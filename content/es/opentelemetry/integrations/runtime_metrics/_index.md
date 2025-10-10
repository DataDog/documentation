---
aliases:
- /es/opentelemetry/runtime_metrics/
- /es/opentelemetry/integrations/runtime_metrics/go/
- /es/opentelemetry/integrations/runtime_metrics/dotnet/
- /es/opentelemetry/integrations/runtime_metrics/java/
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: Documentación
  text: Métricas de tiempo de ejecución de APM
- link: /opentelemetry/mapping/metrics_mapping/
  tag: Documentación
  text: Asignación de métricas de OpenTelemetry
title: Métricas de tiempo de ejecución de OpenTelemetry
---

## Información general

Las métricas de tiempo de ejecución proporcionan información sobre el rendimiento de las aplicaciones, incluido el uso de memoria, la recopilación de elementos no usados y la paralelización. Las bibliotecas de rastreo de Datadog ofrece [recopilación de métricas de tiempo de ejecución][5] para cada lenguaje compatible, y OpenTelemetry (OTel) también recopila métricas de tiempo de ejecución compatibles que pueden enviarse a Datadog a través de los SDKs de OpenTelemetry.

## Compatibilidad

Datadog es compatible con las métricas en tiempo de ejecución de OpenTelemetry para los siguientes lenguajes:
- Java
- .NET
- Go

Para más detalles sobre la asignación de métricas de host y contenedor, véase [OpenTelemetry Metrics Mapping][1].

## Instrucciones de instalación

### 1. Requisitos previos

- Has configurado correctamente [las métricas de OpenTelemetry para enviarlas a Datadog][2].
- Has instalado la [integración del lenguaje correspondiente en Datadog][3].

### 2. Configurar la aplicación

Selecciona tu lenguaje para ver las instrucciones de configuración del SDK de OpenTelemetry para enviar métricas en tiempo de ejecución:

{{< tabs >}}
{{% tab "Java" %}}

#### Instrumentación automática

Si utilizas [instrumentación automática de OpenTelemetry][3] para aplicaciones Java, las métricas de tiempo de ejecución están activadas por defecto.

#### Instrumentación manual

Si utilizas [instrumentación manual de OpenTelemetry][4], sigue las guías para tu versión de Java:
- [Java 8][5]
- [Java 17][6]

[3]: https://opentelemetry.io/docs/instrumentation/java/automatic/
[4]: https://opentelemetry.io/docs/instrumentation/java/manual/
[5]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/runtime-telemetry/runtime-telemetry-java8/library
[6]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/runtime-telemetry/runtime-telemetry-java17/library

{{% /tab %}}

{{% tab "Go" %}}

Las aplicaciones de OpenTelemetry Go son [instrumentadas manualmente][3]. Para activar las métricas en tiempo de ejecución, consulta la documentación del [paquete de tiempo de ejecución][4].

[3]: https://opentelemetry.io/docs/instrumentation/go/manual/
[4]: https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/runtime

{{% /tab %}}

{{% tab ".NET" %}}

<div class="alert alert-danger">La versión mínima compatible del SDK de .NET OpenTelemetry es <a href="https://github.com/open-telemetry/opentelemetry-dotnet/releases/tag/core-1.5.0">1.5.0</a></div>

#### Instrumentación automática

Si utilizas [instrumentación automática de OpenTelemetry][3] para aplicaciones .NET, las métricas de tiempo de ejecución están activadas por defecto.

#### Instrumentación manual

Si utilizas [instrumentación manual de OpenTelemetry][4], consulta la documentación de [biblioteca OpenTelemetry.Instrumentation.Runtime][5].

#### Intervalo de exportación de métricas

El intervalo de exportación predeterminado de métricas para el SDK de .NET OTel es diferente del intervalo predeterminado del SDK de Datadog .NET. Datadog recomienda configurar la variable de entorno [OTEL_METRIC_EXPORT_INTERVAL][7] en tu servicio de .NET para que coincida con el intervalo de exportación predeterminado de métricas de Datadog:

```
OTEL_METRIC_EXPORT_INTERVAL=10000
```

[3]: https://opentelemetry.io/docs/instrumentation/net/automatic/
[4]: https://opentelemetry.io/docs/instrumentation/net/manual/
[5]: https://github.com/open-telemetry/opentelemetry-dotnet-contrib/tree/main/src/OpenTelemetry.Instrumentation.Runtime
[7]: https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/#periodic-exporting-metricreader

{{% /tab %}}

{{< /tabs >}}

## Ver dashboards de métricas de tiempo de ejecución

Una vez finalizada la configuración, puedes ver las métricas de tiempo de ejecución en:
- La página de detalles del servicio (véase el ejemplo de Java a continuación)
- La pestaña de métricas de la gráfica de llamas
- [Dashboard de tiempo de ejecución][7] por defecto

{{< img src="opentelemetry/otel_runtime_metrics_service_page.png" alt="Página de servicios que muestra las métricas de tiempo de ejecución de OpenTelemetry en la pestaña de Métricas de JVM" style="width:100%;" >}}

## Datos recopilados

Cuando se utilizan las métricas en tiempo de ejecución de OpenTelemetry con Datadog, se reciben ambas:
- Métricas originales en tiempo de ejecución de OpenTelemetry
- Métricas de tiempo de ejecución de Datadog asignadas para métricas equivalentes

Las métricas en tiempo de ejecución de OpenTelemetry tienen los siguientes prefijos basados en su fuente:

| Fuente | Prefijo |
| --- | --- |
| [OTel Collector Datadog Exporter][100] | `otel.process.runtime.*` |
| [Datadog Agent OTLP Ingest][101] | `process.runtime.*` |

Las siguientes tablas enumeran las métricas de tiempo de ejecución de Datadog que son compatibles a través de la asignación de OpenTelemetry. "N/A" indica que no hay métrica equivalente de OpenTelemetry disponible.

<div class="alert alert-danger"> Las métricas en tiempo de ejecución de OpenTelemetry se asignan a Datadog por el nombre métrica. No cambies el nombre de las métricas de host por métricas de tiempo de ejecución de OpenTelemetry, ya que esto rompe la asignación.</div>

[100]: /es/opentelemetry/setup/collector_exporter/
[101]: /es/opentelemetry/setup/otlp_ingest_in_the_agent

{{< tabs >}}
{{% tab "Java" %}}

| Métrica de Datadog | Descripción |  Métrica de OpenTelemetry |
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
| `jvm.gc.cms.count` | El número total de recopilaciones de elementos no usados que se han producido. | N/A |
| `jvm.gc.major_collection_count` | El índice de las principales recopilaciones de elementos no usados. Configura `new_gc_metrics: true` para recibir esta métrica. | N/A |
| `jvm.gc.minor_collection_count` | La tasa de recopilaciones secundarias de elementos no usados. Establece `new_gc_metrics: true` para recibir esta métrica. | N/A |
| `jvm.gc.major_collection_time` | La fracción de tiempo empleado en la recopilación principal de elementos no usados. Configura `new_gc_metrics: true` para recibir esta métrica. | N/A |
| `jvm.gc.minor_collection_time` | La fracción de tiempo empleado en la recopilación secundaria de elementos no usados. Configura `new_gc_metrics: true` para recibir esta métrica. | N/A |
| `jvm.os.open_file_descriptors` | El número de descriptores de archivo abiertos. | N/A |

{{% /tab %}}

{{% tab "Go" %}}

| Métrica de Datadog | Descripción |  Métrica de OpenTelemetry |
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

{{% /tab %}}

{{% tab ".NET" %}}

| Métrica de Datadog | Descripción |  Métrica de OpenTelemetry |
| --- | --- | --- |
| `runtime.dotnet.threads.contention_count` | El número de veces que un subproceso se detuvo para esperar un bloqueo. | `process.runtime.dotnet.`<br>`monitor.lock_contention.count` |
| `runtime.dotnet.exceptions.count` | El número de excepciones por primera vez. | `process.runtime.dotnet.`<br>`exceptions.count` |
| `runtime.dotnet.gc.size.gen0` | El tamaño del heap de generación 0. | `process.runtime.dotnet.`<br>`gc.heap.size` |
| `runtime.dotnet.gc.size.gen1` | El tamaño del heap de generación 1. | `process.runtime.dotnet.`<br>`gc.heap.size` |
| `runtime.dotnet.gc.size.gen2` | El tamaño del heap de generación 2. | `process.runtime.dotnet.`<br>`gc.heap.size` |
| `runtime.dotnet.gc.size.loh` | El tamaño del heap de grandes objetos. | `process.runtime.dotnet.`<br>`gc.heap.size` |
| `runtime.dotnet.gc.count.gen0` | El número de recopilaciones de elementos no usados de generación 0. | `process.runtime.dotnet.`<br>`gc.collections.count` |
| `runtime.dotnet.gc.count.gen1` | El número de recopilaciones de elementos no usados de generación 1. | `process.runtime.dotnet.`<br>`gc.collections.count` |
| `runtime.dotnet.gc.count.gen2` | El número de recopilaciones de elementos no usados de generación 2. | `process.runtime.dotnet.`<br>`gc.collections.count` |
| `runtime.dotnet.cpu.system` | El número de milisegundos de ejecución en el kernel. | N/A |
| `runtime.dotnet.cpu.user` | El número de milisegundos de ejecución fuera del kernel. | N/A |
| `runtime.dotnet.cpu.percent` | El porcentaje de CPU total utilizado por la aplicación. | N/A |
| `runtime.dotnet.mem.committed` | Uso de memoria. | N/A |
| `runtime.dotnet.threads.count` | El número de subprocesos. | N/A |
| `runtime.dotnet.threads.workers_count` | El número de trabajadores en el grupo de subprocesos. (Solo.NET Core) | N/A |
| `runtime.dotnet.threads.contention_time` | El tiempo acumulado que pasan los subprocesos esperando un bloqueo. (Solo .NET Core) | N/A |
| `runtime.dotnet.gc.memory_load` | El porcentaje de la memoria total utilizada por el proceso. La recopilación de elementos no usados (GC) cambia su comportamiento cuando este valor supera el 85. (Solo .NET Core) | N/A |
| `runtime.dotnet.gc.pause_time` | La cantidad de tiempo que la GC pausó los subprocesos de la aplicación. (Solo .NET Core) | N/A |
| `runtime.dotnet.aspnetcore.`<br>`requests.total` | El número total de solicitudes HTTP recibidas por el servidor. (Solo .NET Core) | N/A |
| `runtime.dotnet.aspnetcore.`<br>`requests.failed` | El número de solicitudes HTTP fallidas recibidas por el servidor. (Solo .NET Core) | N/A |
| `runtime.dotnet.aspnetcore.`<br>`requests.current` | El número total de solicitudes HTTP que se han iniciado, pero aún no se han detenido. (Solo .NET Core) | N/A |
| `runtime.dotnet.aspnetcore.`<br>`requests.queue_length` | La longitud actual de la cola de solicitudes HTTP del servidor. (Solo .NET Core) | N/A |
| `runtime.dotnet.aspnetcore.`<br>`connections.total` | El número total de conexiones HTTP establecidas con el servidor. (Solo .NET Core) | N/A |
| `runtime.dotnet.aspnetcore.`<br>`connections.current` | El número actual de conexiones HTTP activas al servidor. (Solo .NET Core) | N/A |
| `runtime.dotnet.aspnetcore.`<br>`connections.queue_length` | La longitud actual de la cola de conexión del servidor HTTP. (Solo .NET Core) | N/A |

{{% /tab %}}

{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/mapping/metrics_mapping/
[2]: /es/opentelemetry/setup/
[3]: https://app.datadoghq.com/integrations
[5]: /es/tracing/metrics/runtime_metrics/
[7]: https://app.datadoghq.com/dash/integration/256/jvm-metrics