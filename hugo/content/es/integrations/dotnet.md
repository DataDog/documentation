---
app_id: dotnet
categories:
- lenguajes
custom_kind: integración
description: Recopila métricas, trazas y logs de tus aplicaciones .NET.
media: []
title: Métricas de tiempo de ejecución de .NET
---
## Información general

La integración .NET te permite recopilar y monitorizar logs, trazas (traces) y métricas personalizadas de tu aplicación .NET.

## Configuración

### Recopilación de métricas

Consulta la documentación dedicada para [recopilar métricas personalizadas de .NET con DogStatsD](https://docs.datadoghq.com/developers/dogstatsd/?tab=net).

### Recopilación de trazas

Consulta la documentación dedicada para [instrumentar tu aplicación .NET](https://docs.datadoghq.com/tracing/setup/dotnet/) para enviar sus trazas a Datadog.

### Recopilación de logs

_Disponible para la versión 6.0 o posterior del Agent_

Consulta la documentación dedicada sobre cómo [configurar la recopilación de logs de .NET](https://docs.datadoghq.com/logs/log_collection/csharp/) para reenviar tus logs a Datadog.

### Recopilación de perfiles

Consulta la documentación dedicada para [activar el generador de perfiles de .NET](https://docs.datadoghq.com/profiler/enabling/dotnet/).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **runtime.dotnet.cpu.system** <br>(gauge) | El número de milisegundos que se ejecutan en el kernel<br>_Se muestra como milisegundo_ |
| **runtime.dotnet.cpu.user** <br>(gauge) | El número de milisegundos que se ejecutan fuera del kernel<br>_Se muestra como milisegundo_ |
| **runtime.dotnet.cpu.percent** <br>(gauge) | El porcentaje de CPU total utilizado por la aplicación<br>_Se muestra como porcentaje_. |
| **runtime.dotnet.mem.committed** <br>(gauge) | Uso de memoria<br>_Se muestra como byte_ |
| **runtime.dotnet.threads.count** <br>(gauge) | El número de subprocesos<br>_Se muestra como subproceso_ |
| **runtime.dotnet.threads.workers_count** <br>(gauge) | El número de trabajadores en el threadpool (sólo .NET Core 3.1+)<br>_Se muestra como subproceso_ |
| **runtime.dotnet.threads.contention_time** <br>(gauge) | El tiempo acumulado empleado por los subprocesos que esperan en un bloqueo (sólo .NET Core 3.1+)<br>_Se muestra como milisegundo_ |
| **runtime.dotnet.threads.contention_count** <br>(count) | El número de veces que un subproceso se detuvo para esperar en un bloqueo|
| **runtime.dotnet.exceptions.count** <br>(count) | El número de excepciones de primera oportunidad<br>_Se muestra como excepción_ |
| **runtime.dotnet.gc.size.gen0** <br>(gauge) | El tamaño de la pila gen 0<br>_Se muestra como byte_ |
| **runtime.dotnet.gc.size.gen1** <br>(gauge) | El tamaño de la pila gen 1<br>_Se muestra como byte_ |
| **runtime.dotnet.gc.size.gen2** <br>(gauge) | El tamaño de la pila gen 2<br>_Se muestra como byte_ |
| **runtime.dotnet.gc.size.loh** <br>(gauge) | El tamaño de la pila de objetos grandes<br>_Se muestra como byte_ |
| **runtime.dotnet.gc.memory_load** <br>(gauge) | El porcentaje de la memoria total utilizada por el proceso. La GC cambia su comportamiento cuando este valor supera el 85. (solo .NET Core 3.1+)<br>_Se muestra como porcentaje_ |
| **runtime.dotnet.gc.pause_time** <br>(gauge) | La cantidad de tiempo que la GC pausó los subprocesos de la aplicación (solo .NET Core 3.1+)<br>_Se muestra como milisegundos_ |
| **runtime.dotnet.gc.count.gen0** <br>(count) | El número de recolecciones de basura gen 0<br>_Se muestra como recopilación de basura_ |
| **runtime.dotnet.gc.count.gen1** <br>(count) | El número de recolecciones de basura gen 1<br>_Se muestra como recolección de basura_ |
| **runtime.dotnet.gc.count.gen2** <br>(count) | El número de recolecciones de basura gen 2<br>_Se muestra como recolección de basura_ |
| **runtime.dotnet.aspnetcore.requests.total** <br>(gauge) | El número total de solicitudes HTTP recibidas por el servidor (sólo .NET Core 3.1+)<br>_Se muestra como solicitud_ |
| **runtime.dotnet.aspnetcore.requests.failed** <br>(gauge) | El número de solicitudes HTTP fallidas recibidas por el servidor (sólo .NET Core 3.1+)<br>_Se muestra como solicitud_ |
| **runtime.dotnet.aspnetcore.requests.current** <br>(gauge) | El número total de solicitudes HTTP que se han iniciado pero aún no se han detenido (solo .NET Core 3.1+)<br>_Se muestra como solicitud_ |
| **runtime.dotnet.aspnetcore.requests.queue_length** <br>(gauge) | La longitud actual de la cola de solicitudes HTTP del servidor (solo .NET 5+)<br>_Se muestra como solicitud_ |
| **runtime.dotnet.aspnetcore.connections.total** <br>(gauge) | El número total de conexiones HTTP establecidas con el servidor (solo .NET 5+)<br>_Se muestra como conexión_. |
| **runtime.dotnet.aspnetcore.connections.current** <br>(gauge) | El número actual de conexiones HTTP activas con el servidor (solo .NET 5+)<br>_Se muestra como conexión_ |
| **runtime.dotnet.aspnetcore.connections.queue_length** <br>(gauge) | La longitud actual de la cola de connections (conexiones) del servidor HTTP (solo .NET 5+)<br>_Se muestra como connection (conexión)_ |

### Eventos

La integración .NET no incluye eventos.

### Checks de servicio

La integración .NET no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}