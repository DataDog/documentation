---
app_id: quarkus
categories:
- métricas
- recopilación de logs
custom_kind: integración
description: Monitoriza tu aplicación creada con Quarkus.
integration_version: 2.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Quarkus
---
## Información general

Este control supervisa [Quarkus](https://quarkus.io/) a través del Datadog Agent.

## Configuración

Siga las siguientes instrucciones para instalar y configurar esta comprobación para un Agent que se ejecute en un host. Para entornos en contenedores, consulte las [Autodiscovery Plantillas de integración](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

La comprobación de Quarkus se incluye en el paquete [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) a partir de Agent 7.62.
No es necesaria ninguna instalación adicional en su servidor.

### Configuración

Siga [estos pasos](https://quarkus.io/guides/telemetry-micrometer-tutorial) para configurar la generación de métricas en Quarkus.

Luego, configura el Agent:

1. Edita el archivo `quarkus.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración Agent's para empezar a recoger tus datos de rendimiento de Quarkus. Consulte [sample quarkus.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/quarkus/datadog_checks/quarkus/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicie el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

#### Recopilación de logs

Siga [estos pasos](https://quarkus.io/guides/logging) para configurar Quarkus para que emita registros.

La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

```yaml
logs_enabled: true
```

Edita la sección `logs` de tu archivo `quarkus.d/conf.yaml` para empezar a recopilar tus logs de RabbitMQ:

```yaml
logs:
 - tipo: file
   ruta: /var/log/aplicación.log
  source (fuente) quarkus
   servicio: quarkus-app
```

### Validación

[Ejecute el subcomando de estado de Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busque `quarkus` en la sección Comprobaciones.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **quarkus.http_server.active_requests** <br>(indicador) | Solicitudes al servidor que están activas en este momento.<br>_Mostrado como solicitud_ |
| **quarkus.http_server.bytes_read.count** <br>(count) | Número de veces que algunos bytes fueron recibidos por el servidor.|
| **quarkus.http_server.bytes_read.max** <br>(calibre) | Número máximo de bytes recibidos actualmente por el servidor.<br>_Mostrado como byte_ |
| **quarkus.http_server.bytes_read.sum** <br>(recuento) | Número total de bytes recibidos por el servidor desde que se inició.<br>_Mostrado como byte_ |
| **quarkus.http_server.bytes_written.count** <br>(count) | Número de veces que algunos bytes fueron por el servidor.|
| **quarkus.http_server.bytes_written.max** <br>(calibre) | Número máximo actual de bytes enviados por el servidor.<br>_Mostrado como byte_ |
| **quarkus.http_server.bytes_written.sum** <br>(recuento) | Número total de bytes enviados por el servidor.<br>_Mostrado como byte_ |
| **quarkus.http_server.connections.seconds.max** <br>(calibre) | La duración de las conexiones en segundos.<br>_Mostrado como segundo_ |
| **quarkus.http_server.requests.seconds.count** <br>(count) | El número de solicitudes observadas hasta el momento.|
| **quarkus.http_server.requests.seconds.max** <br>(indicador) | La mayor duración actual de la solicitud en segundos.<br>_Se muestra como segundo_ |
| **quarkus.http_server.requests.seconds.sum** <br>(recuento) | Número total de segundos que han tardado todas las solicitudes hasta el momento.<br>_Se muestra como segundo_ |
| **quarkus.jvm.buffer.count_buffers** <br>(calibre) | Una estimación del número de buffers en el pool.<br>_Shown as buffer_ |
| **quarkus.jvm.buffer.memory_used.bytes** <br>(calibre) | Una estimación de la memoria que la máquina virtual Java está utilizando para este conjunto de búferes.<br>_Mostrado como byte_ |
| **quarkus.jvm.buffer.total_capacity.bytes** <br>(calibre) | Una estimación de la capacidad total de los buffers en este pool.<br>_Mostrado como byte_ |
| **quarkus.jvm.classes.loaded_classes** <br>(calibre) | Número de clases cargadas actualmente en la máquina virtual Java.|
| **quarkus.jvm.gc.live_data_size.bytes** <br>(calibre) | Tamaño de la reserva de memoria heap de larga duración después de la recuperación.<br>_Mostrado como byte_ |
| **quarkus.jvm.gc.max_data_size.bytes** <br>(calibre) | Tamaño máximo de la reserva de memoria heap de larga duración.<br>_Mostrado como byte_ |
| **quarkus.jvm.gc.overhead** <br>(calibre) | Una aproximación del porcentaje de tiempo de CPU utilizado por las actividades de GC durante el último periodo de revisión retrospectiva o desde que comenzó la monitorización, lo que sea más corto, en el rango \[0..1\].|
| **quarkus.jvm.memory.committed.bytes** <br>(calibre) | La cantidad de memoria en bytes que está comprometida para el uso de la máquina virtual Java.<br>_Mostrado como byte_ |
| **quarkus.jvm.memory.max.bytes** <br>(calibre) | La cantidad máxima de memoria en bytes que se puede utilizar para la gestión de la memoria.<br>_Mostrado como byte_ |
| **quarkus.jvm.memory.usage_after_gc** <br>(calibre) | Porcentaje del montón de larga duración utilizado tras el último evento de GC, en el rango \[0..1\].<br>_Mostrado como fracción_ |
| **quarkus.jvm.memory.used.bytes** <br>(calibre) | La cantidad de memoria utilizada.<br>_Se muestra como byte_ |
| **quarkus.jvm.threads.daemon_threads** <br>(calibre) | El número actual de hilos daemon vivos.<br>_Shown as thread_ |
| **quarkus.jvm.threads.live_threads** <br>(calibre) | El número actual de hilos activos, incluidos los hilos demonio y no demonio.<br>_Mostrado como hilo_ |
| **quarkus.jvm.threads.peak_threads** <br>(calibre) | El número máximo de hilos activos desde que se inició la máquina virtual Java o se reinició el número máximo.<br>_Shown as thread_ |
| **quarkus.jvm.threads.states_threads** <br>(calibre) | El número actual de hilos.<br>_Shown as thread_ |
| **quarkus.netty.allocator.memory.pinned** <br>(calibre) | Tamaño, en bytes, de la memoria que utiliza el búfer asignado.<br>_Mostrado como byte_ |
| **quarkus.netty.allocator.memory.used** <br>(calibre) | Tamaño, en bytes, de la memoria que utiliza el asignador.<br>_Shown as byte_ |
| **quarkus.netty.allocator.pooled.arenas** <br>(calibre) | Número de arenas para un asignador agrupado.<br>_Se muestra como byte_ |
| **quarkus.netty.allocator.pooled.cache_size** <br>(calibre) | Tamaño, en bytes, de la caché para un asignador agrupado.<br>_Shown as byte_ |
| **quarkus.netty.allocator.pooled.chunk_size** <br>(calibre) | Tamaño, en bytes, de los trozos de memoria para un asignador agrupado.<br>_Mostrado como byte_ |
| **quarkus.netty.allocator.pooled.threadlocal_caches** <br>(calibre) | Número de cachés ThreadLocal para un asignador agrupado.|
| **quarkus.netty.eventexecutor.tasks_pending** <br>(indicador) | Número de tareas pendientes en el ejecutor de eventos.<br>_Mostrado como tarea_ |
| **quarkus.process.cpu.usage** <br>(calibre) | El uso reciente de cpu para el proceso de la Máquina Virtual Java.|
| **quarkus.process.files.max_files** <br>(calibre) | El recuento máximo de descriptores de archivo.<br>_Shown as file_ |
| **quarkus.process.files.open_files** <br>(calibre) | El recuento del descriptor de archivo abierto.<br>_Shown as file_ |
| **quarkus.process.uptime.seconds** <br>(calibre) | El tiempo de actividad de la máquina virtual Java.<br>_Mostrado como segundo_ |
| **quarkus.system.cpu.count** <br>(calibre) | El número de procesadores disponibles para la máquina virtual Java.|
| **quarkus.system.cpu.usage** <br>(calibre) | El uso reciente de cpu del sistema en el que se está ejecutando la aplicación.|
| **quarkus.system.load_average_1m** <br>(calibre) | La suma del número de entidades ejecutables en cola para los procesadores disponibles y el número de entidades ejecutables que se ejecutan en los procesadores disponibles promediado durante un periodo de tiempo.|
| **quarkus.worker_pool.active** <br>(calibre) | Número de recursos de la reserva utilizados actualmente.|
| **quarkus.worker_pool.idle** <br>(calibre) | Número de recursos de la reserva utilizados actualmente.|
| **quarkus.worker_pool.queue.delay.seconds.count** <br>(count) | Número de artículos que pasaron tiempo en la cola de espera antes de ser procesados.|
| **quarkus.worker_pool.queue.delay.seconds.max** <br>(calibre) | Tiempo máximo actual en la cola de espera antes de ser procesado.<br>_Se muestra como segundo_ |
| **quarkus.worker_pool.queue.delay.seconds.sum** <br>(count) | Tiempo total pasado en la cola de espera antes de ser procesado.|
| **quarkus.worker_pool.queue.size** <br>(calibre) | Número de elementos pendientes en la cola de espera.|
| **quarkus.worker_pool.ratio** <br>(gauge) | Ratio de trabajadores que se están utilizando en este momento.<br>_Se muestra como fracción_ |
| **quarkus.worker_pool.usage.seconds.count** <br>(count) | Número de veces que se han utilizado recursos del pool.<br>_Se muestra como segundo_ |
| **quarkus.worker_pool.usage.seconds.max** <br>(calibre) | Tiempo máximo de utilización de los recursos del pool.<br>_Se muestra como segundo_ |
| **quarkus.worker_pool.usage.seconds.sum** <br>(count) | Tiempo total de utilización de los recursos del pool.<br>_Se muestra como segundo_ |

### Eventos

La integración Quarkus no incluye eventos.

### Checks de servicio

**quarkus.openmetrics.health**

Devuelve `CRITICAL` si el Agent es incapaz de conectarse al punto final Quarkus OpenMetrics, de lo contrario devuelve `OK`.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesita ayuda? Póngase en contacto con [Datadog support](https://docs.datadoghq.com/help/).