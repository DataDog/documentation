---
app_id: nodo
categories:
- languages
- log collection
- tracing
custom_kind: integración
description: Recopila métricas, trazas y logs de tus aplicaciones Node.js.
further_reading:
- link: https://www.datadoghq.com/blog/node-logging-best-practices/
  tag: blog
  text: Cómo recopilar, personalizar y centralizar los logs de Node.js
- link: https://www.datadoghq.com/blog/node-monitoring-apm/
  tag: blog
  text: Monitorización de Node.js con Datadog APM y rastreo distribuido
media: []
title: Node
---
## Información general

La integración de Node.js te permite recopilar y monitorizar tus logs de aplicación, trazas (traces) y métricas personalizadas de Node.js.

## Configuración

### Recopilación de métricas

La integración de Node.js te permite monitorizar una métrica personalizada al instrumentar unas pocas líneas de código. Por ejemplo, puedes tener una métrica que devuelva el número de páginas vistas o el tiempo de llamada a una función.

Para obtener información adicional sobre la integración de Node.js, consulta la [guía sobre el envío de métricas](https://docs.datadoghq.com/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=nodejs).

```js
// Require dd-trace
const tracer = require('dd-trace').init();

// Increment a counter
tracer.dogstatsd.increment('page.views');
```

Ten en cuenta que, para que las métricas personalizadas funcionen, es necesario habilitar DogStatsD en Agent. La recopilación está habilitada por defecto, pero el Agent solo escucha métricas desde el host local. Para permitir métricas externas, necesitas establecer una variable de entorno o actualizar el archivo de configuración:

```sh
DD_USE_DOGSTATSD=true # default
DD_DOGSTATSD_PORT=8125 # default
DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true # if expecting external metrics
```

```yaml
use_dogstatsd: true # default
dogstatsd_port: 8125 # default
dogstatsd_non_local_traffic: true # if expecting external metrics
```

También necesitarás configurar para que tu aplicación utilice el recopilador de DogStatsD del Agent:

```sh
DD_DOGSTATSD_HOSTNAME=localhost DD_DOGSTATSD_PORT=8125 node app.js
```

### Recopilación de trazas

Consulta la documentación dedicada para [instrumentar tu aplicación Node.js](https://docs.datadoghq.com/tracing/setup/nodejs/) para enviar traces (trazas) a Datadog.

### Recopilación de logs

_Disponible para la versión 6.0 o posterior del Agent_

Consulta la documentación específica para configurar [recopilación de logs de Node.js](https://docs.datadoghq.com/logs/log_collection/nodejs/) para reenviar tus logs a Datadog.

### Recopilación de perfiles

Consulta la documentación dedicada para [activar el perfilador de Node.js](https://github.com/DataDog/dogweb/blob/prod/node/node_metadata.csv).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **runtime.node.cpu.user** <br>(medidor) | Uso de la CPU en código de usuario<br>_Mostrado en porcentaje_. |
| **runtime.node.cpu.system** <br>(medidor) | Uso de la CPU en el código del sistema<br>_Mostrado en porcentaje_. |
| **runtime.node.cpu.total** <br>(medidor) | Uso total de la CPU<br>_Mostrado como porcentaje_. |
| **runtime.node.mem.rss** <br>(medidor) | Tamaño del conjunto residente<br>_Mostrado como byte_ |
| **runtime.node.mem.heap_total** <br>(medidor) | Memoria heap total<br>_Mostrado como byte_ |
| **runtime.node.mem.heap_used** <br>(medidor) | Uso de memoria Heap<br>_Mostrado como byte_ |
| **runtime.node.mem.external** <br>(medidor) | Memoria externa<br>_Mostrado como byte_ |
| **runtime.node.heap.total_heap_size** <br>(medidor) | Tamaño total de heap<br>_Mostrado como byte_ |
| **runtime.node.heap.total_heap_size_executable** <br>(medidor) | Tamaño total de heap ejecutable<br>_Mostrado como byte_ |
| **runtime.node.heap.total_physical_size** <br>(mediidor) | Tamaño físico total de heap<br>_Mostrado como byte_ |
| **runtime.node.heap.used_heap_size** <br>(medidor) | Tamaño de heap utilizado<br>_Mostrado como byte_ |
| **runtime.node.heap.heap_size_limit** <br>(medidor) | Límite de tamaño de heap<br>_Mostrado como byte_ |
| **runtime.node.heap.malloced_memory** <br>(medidor) | Memoria malgastada<br>_Mostrado como byte_ |
| **runtime.node.heap.peak_malloced_memory** <br>(medidor) | Pico de memoria asignada<br>_Mostrado como byte_ |
| **runtime.node.heap.size.by.space** <br>(medidor) | Tamaño del espacio de heap<br>_Mostrado como byte_ |
| **runtime.node.heap.used_size.by.space** <br>(medidor) | Tamaño de espacio heap utilizado<br>_Mostrado como byte_ |
| **runtime.node.heap.available_size.by.space** <br>(medidor) | Tamaño del espacio disponible en heap<br>_Mostrado como byte_ |
| **runtime.node.heap.physical_size.by.space** <br>(medidor) | Tamaño físico del espacio heap<br>_Mostrado como byte_ |
| **runtime.node.process.uptime** <br>(medidor) | Tiempo de actividad del proceso<br>_Mostrado en segundos_ |
| **runtime.node.event_loop.delay.max** <br>(medidor) | Retardo máximo del bucle de eventos<br>_Mostrado en nanosegundos_ |
| **runtime.node.event_loop.delay.min** <br>(medidor) | Retardo mínimo del bucle de eventos<br>_Mostrado en nanosegundos_ |
| **runtime.node.event_loop.delay.avg** <br>(medidor) | Retardo medio del bucle de eventos<br>_Mostrado en nanosegundos_ |
| **runtime.node.event_loop.delay.sum** <br>(tasa) | Retardo total del bucle de eventos<br>_Mostrado en nanosegundos_ |
| **runtime.node.event_loop.delay.median** <br>(medidor) | Mediana del retardo del bucle de eventos<br>_Mostrado en nanosegundos_ |
| **runtime.node.event_loop.delay.95percentile** <br>(medidor) | Percentil 95 del retardo del bucle de eventos<br>_Mostrado en nanosegundos_ |
| **runtime.node.event_loop.delay.count** <br>(tasa) | Count de iteraciones del bucle de eventos donde se detecta un retardo<br>_Mostrado como ejecución_ |
| **runtime.node.gc.pause.max** <br>(medidor) | Pausa máxima de recolección de basura<br>_Mostrado en nanosegundos_ |
| **runtime.node.gc.pause.min** <br>(medidor) | Pausa mínima de recolección de basura<br>_Mostrado en nanosegundos_ |
| **runtime.node.gc.pause.avg** <br>(medidor) | Pausa media de recolección de basura<br>_Mostrado en nanosegundos_ |
| **runtime.node.gc.pause.sum** <br>(tasa) | Pausa total de recolección de basura<br>_Mostrado en nanosegundos_ |
| **runtime.node.gc.pause.median** <br>(medidor) | Mediana de la pausa de recolección de basura<br>_Mostrado en nanosegundos_ |
| **runtime.node.gc.pause.95percentile** <br>(medidor) | Pausa de recolección de basura del percentil 95<br>_Mostrado en nanosegundos_ |
| **runtime.node.gc.pause.count** <br>(tasa) | Número de recolecciones de basura<br>_Mostrado como recolección de basura_ |
| **runtime.node.gc.pause.by.type.max** <br>(medidor) | Pausa máxima de recolección de basura por tipo<br>_Mostrado como nanosegundo_ |
| **runtime.node.gc.pause.by.type.min** <br>(medidor) | Pausa mínima de recolección de basura por tipo<br>_Mostrado en nanosegundos_ |
| **runtime.node.gc.pause.by.type.avg** <br>(medidor) | Pausa media de recolección de basura por tipo<br>_Mostrado en nanosegundos_ |
| **runtime.node.gc.pause.by.type.sum** <br>(tasa) | Pausa total de recolección de basura por tipo<br>_Mostrado en nanosegundos_ |
| **runtime.node.gc.pause.by.type.median** <br>(medidor) | Mediana de la pausa de recolección de basura por tipo<br>_Mostrado en nanosegundos_ |
| **runtime.node.gc.pause.by.type.95percentile** <br>(medidor) | Pausa de recopilación de basura del percentil 95 por tipo<br>_Mostrado en nanosegundos_ |
| **runtime.node.gc.pause.by.type.count** <br>(tasa) | Número de recolecciones de basura por tipo<br>_Mostrado como recolección de basura_ |

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}