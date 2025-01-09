---
aliases:
- /opentelemetry/runtime_metrics/dotnet/
code_lang: dotnet
code_lang_weight: 20
title: Métricas de tiempo de ejecución de OpenTelemetry .NET
type: multi-code-lang
---

## Requisitos previos

- Estás enviando correctamente [métricas de OpenTelemetry a Datadog][1].
- Has instalado la integración de lenguaje para [.NET][2].
- Versión mínima del SDK de .NET OTel [1.5.0][6].

## Configuración del SDK de OpenTelemetry

Si has instrumentado tus aplicaciones .NET con [la instrumentación automática de OpenTelemetry][3], se habilitan automáticamente las métricas de tiempo de ejecución.

Si has instrumentado tu aplicación .NET con [la instrumentación manual de OpenTelemetry][4], consulta la documentación de [biblioteca de OpenTelemetry.Instrumentation.Runtime][5].

El intervalo de exportación predeterminado de métricas para el SDK de .NET OTel es diferente del intervalo predeterminado del SDK de Datadog .NET. Datadog recomienda configurar la variable de entorno [OTEL_METRIC_EXPORT_INTERVAL][7] en tu servicio de .NET para que coincida con el intervalo de exportación predeterminado de métricas de Datadog para ver los gráficos de métrica de integración:
- `OTEL_METRIC_EXPORT_INTERVAL=10000`

## Asignaciones de métricas de tiempos de ejecución

La siguiente tabla enumera las métricas de tiempo de ejecución de Datadog que son compatibles con la asignación de métricas de tiempo de ejecución de OpenTelemetry con "N/A" indicando que no hay homólogo de OpenTelemetry.

| Métrica de Datadog | Descripción |  Homólogo de OpenTelemetry |
| --- | --- | --- |
| `runtime.dotnet.threads.contention_count` | El número de veces que un subproceso se detuvo para esperar un bloqueo. | `process.runtime.dotnet.`<br/>`monitor.lock_contention.count` |
| `runtime.dotnet.exceptions.count` | El número de excepciones por primera vez. | `process.runtime.dotnet.`<br/>`exceptions.count` |
| `runtime.dotnet.gc.size.gen0` | El tamaño del heap de generación 0. | `process.runtime.dotnet.`<br/>`gc.heap.size` |
| `runtime.dotnet.gc.size.gen1` | El tamaño del heap de generación 1. | `process.runtime.dotnet.`<br/>`gc.heap.size` |
| `runtime.dotnet.gc.size.gen2` | El tamaño del heap de generación 2. | `process.runtime.dotnet.`<br/>`gc.heap.size` |
| `runtime.dotnet.gc.size.loh` | El tamaño del heap de grandes objetos. | `process.runtime.dotnet.`<br/>`gc.heap.size` |
| `runtime.dotnet.gc.count.gen0` | El número de recopilaciones de elementos no usados de generación 0. | `process.runtime.dotnet.`<br/>`gc.collections.count` |
| `runtime.dotnet.gc.count.gen1` | El número de recopilaciones de elementos no usados de generación 1. | `process.runtime.dotnet.`<br/>`gc.collections.count` |
| `runtime.dotnet.gc.count.gen2` | El número de recopilaciones de elementos no usados de generación 2. | `process.runtime.dotnet.`<br/>`gc.collections.count` |
| `runtime.dotnet.cpu.system` | El número de milisegundos de ejecución en el kernel. | N/A |
| `runtime.dotnet.cpu.user` | El número de milisegundos de ejecución fuera del kernel. | N/A |
| `runtime.dotnet.cpu.percent` | El porcentaje de CPU total utilizado por la aplicación. | N/A |
| `runtime.dotnet.mem.committed` | Uso de memoria. | N/A |
| `runtime.dotnet.threads.count` | El número de subprocesos. | N/A |
| `runtime.dotnet.threads.workers_count` | El número de trabajadores en el grupo de subprocesos. (Solo.NET Core) | N/A |
| `runtime.dotnet.threads.contention_time` | El tiempo acumulado que pasan los subprocesos esperando un bloqueo. (Solo .NET Core) | N/A |
| `runtime.dotnet.gc.memory_load` | El porcentaje de la memoria total utilizada por el proceso. La recopilación de elementos no usados (GC) cambia su comportamiento cuando este valor supera el 85. (Solo .NET Core) | N/A |
| `runtime.dotnet.gc.pause_time` | La cantidad de tiempo que la GC pausó los subprocesos de la aplicación. (Solo .NET Core) | N/A |
| `runtime.dotnet.aspnetcore.`<br/>`requests.total` | El número total de solicitudes HTTP recibidas por el servidor. (Solo .NET Core) | N/A |
| `runtime.dotnet.aspnetcore.`<br/>`requests.failed` | El número de solicitudes HTTP fallidas recibidas por el servidor. (Solo .NET Core) | N/A |
| `runtime.dotnet.aspnetcore.`<br/>`requests.current` | El número total de solicitudes HTTP que se han iniciado, pero aún no se han detenido. (Solo .NET Core) | N/A |
| `runtime.dotnet.aspnetcore.`<br/>`requests.queue_length` | La longitud actual de la cola de solicitudes HTTP del servidor. (Solo .NET Core) | N/A |
| `runtime.dotnet.aspnetcore.`<br/>`connections.total` | El número total de conexiones HTTP establecidas con el servidor. (Solo .NET Core) | N/A |
| `runtime.dotnet.aspnetcore.`<br/>`connections.current` | El número actual de conexiones HTTP activas al servidor. (Solo .NET Core) | N/A |
| `runtime.dotnet.aspnetcore.`<br/>`connections.queue_length` | La longitud actual de la cola de conexión del servidor HTTP. (Solo .NET Core) | N/A |


[1]: /es/opentelemetry/otel_metrics
[2]: https://app.datadoghq.com/integrations/dotnet
[3]: https://opentelemetry.io/docs/instrumentation/net/automatic/
[4]: https://opentelemetry.io/docs/instrumentation/net/manual/
[5]: https://github.com/open-telemetry/opentelemetry-dotnet-contrib/tree/main/src/OpenTelemetry.Instrumentation.Runtime
[6]: https://github.com/open-telemetry/opentelemetry-dotnet/releases/tag/core-1.5.0
[7]: https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/#periodic-exporting-metricreader