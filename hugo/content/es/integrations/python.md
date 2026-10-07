---
app_id: python
categories:
- languages
- log collection
- tracing
custom_kind: integración
description: Recopila métricas, trazas (traces) y logs de tus aplicaciones Python.
further_reading:
- link: https://www.datadoghq.com/blog/tracing-async-python-code/
  tag: blog
  text: Rastreo de código Python asíncrono con Datadog APM
- link: https://www.datadoghq.com/blog/python-logging-best-practices/
  tag: blog
  text: 'Formatos de generación de logs de Python: Cómo recopilar y centralizar logs
    de Python'
media: []
title: Python
---
## Información general

La integración Python te permite recopilar y monitorizar tus logs de aplicaciones, trazas y métricas personalizadas de Python.

## Configuración

### Recopilación de métricas

Consulta la documentación exclusiva para [recopilar métricas personalizadas de Python con DogStatsD](https://docs.datadoghq.com/developers/dogstatsd/?tab=python).

### Recopilación de trazas

Consulta la documentación exclusiva para [instrumentar tu aplicación Python](https://docs.datadoghq.com/tracing/setup/python/) para enviar tus trazas a Datadog.

### Recopilación de logs

_Disponible para la versión 6.0 o posterior del Agent_

Consulta la documentación exclusiva sobre cómo [configurar la recopilación de logs Python](https://docs.datadoghq.com/logs/log_collection/python/) para reenviar tus logs a Datadog.

### Recopilación de perfiles

Consulta la documentación exclusiva para [habilitar el generador de perfiles Python](https://docs.datadoghq.com/profiler/enabling/python/).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **runtime.python.cpu.time.sys** <br>(gauge) | Número de segundos de ejecución en el kernel<br>_Se muestra como segundos_ |
| **runtime.python.cpu.time.user** <br>(gauge) | Número de segundos de ejecución fuera del núcleo<br>_Se muestra como segundos_ |
| **runtime.python.cpu.percent** <br>(gauge) | Porcentaje de uso de CPU<br>_Se muestra como porcentaje_ |
| **runtime.python.cpu.ctx_switch.voluntary** <br>(gauge) | Número de cambios de contexto voluntarios<br>_Se muestra como invocación_ |
| **runtime.python.cpu.ctx_switch.involuntary** <br>(gauge) | Número de cambios de contexto involuntarios<br>_Se muestra como invocación_ |
| **runtime.python.gc.count.gen0** <br>(gauge) | Número de objetos de generación 0<br>_Se muestra como recurso_ |
| **runtime.python.gc.count.gen1** <br>(gauge) | Número de objetos de generación 1<br>_Se muestra como recurso_ |
| **runtime.python.gc.count.gen2** <br>(gauge) | Número de objetos de generación 2<br>_Se muestra como recurso_ |
| **runtime.python.mem.rss** <br>(gauge) | Memoria de conjunto residente<br>_Se muestra como bytes_ |
| **runtime.python.thread_count** <br>(gauge) | Número de subprocesos<br>_Se muestra como subproceso_ |

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}