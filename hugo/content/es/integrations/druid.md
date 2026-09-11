---
app_id: druida
categories:
- almacenamiento en caché
- almacenes de datos
- recopilación de logs
custom_kind: integración
description: Realiza el seguimiento de métricas relacionadas con las consultas, la
  ingesta y la coordinación.
integration_version: 5.0.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: Druid
---
![Dashboard de Druid](https://raw.githubusercontent.com/DataDog/integrations-core/master/druid/images/druid_dashboard_overview.png)

## Información general

Datadog Agent recopila métricas de Druid mediante [DogStatsD](https://docs.datadoghq.com/developers/dogstatsd/). DogStatsD recopila métricas sobre consultas, ingesta y datos de coordinación de Druid. Para más información, consulta la [documentación de métricas de Druid](https://druid.apache.org/docs/latest/operations/metrics.html).

Además de recopilar métricas, el Agent también envía un check de servicio relacionado con el estado de Druid.

## Configuración

### Requisito previo

Druid v0.16 o posterior es necesario para que esta integración funcione correctamente.

### Instalación

Los dos pasos siguientes son necesarios para que la integración de Druid funcione correctamente. Antes de empezar, debes [instalar el Datadog Agent](https://docs.datadoghq.com/agent/).

#### Paso 1: Configurar Druid para recopilar métricas de estado y checks de servicio

Configura el check de Druid incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) para recopilar métricas de estado y checks de servicio.

1. Edita el archivo `druid.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para comenzar a recopilar tus checks de servicio de druid. Consulta el [druid.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/druid/datadog_checks/druid/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.
1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

#### Paso 2: Conectar Druid a DogStatsD (incluido en el Datadog Agent) utilizando la extensión `statsd-emitter` para recopilar métricas

Paso para configurar la extensión `statsd-emitter` para recopilar la mayoría de las [métricas de Druid](https://druid.apache.org/docs/latest/operations/metrics.html).

1. Instala la extensión de Druid [`statsd-emitter`](https://druid.apache.org/docs/latest/development/extensions-contrib/statsd.html).

   ```shell
   $ java \
     -cp "lib/*" \
     -Ddruid.extensions.directory="./extensions" \
     -Ddruid.extensions.hadoopDependenciesDir="hadoop-dependencies" \
     org.apache.druid.cli.Main tools pull-deps \
     --no-default-hadoop \
     -c "org.apache.druid.extensions.contrib:statsd-emitter:0.15.0-incubating"
   ```

   Puedes encontrar más información sobre este paso en la [guía oficial para cargar extensiones de Druid](https://druid.apache.org/docs/latest/operations/including-extensions.html)

1. Actualiza las propiedades java de Druid añadiendo las siguientes configuraciones:

   ```conf
   # Add `statsd-emitter` to the extensions list to be loaded
   druid.extensions.loadList=[..., "statsd-emitter"]

   # By default druid emission period is 1 minute (PT1M).
   # We recommend using 15 seconds instead:
   druid.monitoring.emissionPeriod=PT15S

   # Use `statsd-emitter` extension as metric emitter
   druid.emitter=statsd

   # Configure `statsd-emitter` endpoint
   druid.emitter.statsd.hostname=127.0.0.1
   druid.emitter.statsd.port:8125

   # Configure `statsd-emitter` to use dogstatsd format. Must be set to true, otherwise tags are not reported correctly to Datadog.
   druid.emitter.statsd.dogstatsd=true
   druid.emitter.statsd.dogstatsdServiceAsTag=true
   ```

1. Reinicia Druid para empezar a enviar tus métricas de Druid al Agent a través de DogStatsD.

#### Checks de servicio de integraciones

Utiliza la configuración predeterminada de tu archivo `druid.d/conf.yaml` para activar la recopilación de checks de servicio de Druid. Consulta el [druid.d/conf.yaml] de ejemplo(https://github.com/DataDog/integrations-core/blob/master/druid/datadog_checks/druid/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

#### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. La recopilación de logs está desactivada por defecto en el Datadog Agent, actívala en tu archivo datadog.yaml:

   ```yaml
   logs_enabled: true
   ```

1. Deselecciona y edita este bloque de configuración en la parte inferior de tu `druid.d/conf.yaml`:

   ```yaml
   logs:
     - type: file
       path: '<PATH_TO_DRUID_DIR>/var/sv/*.log'
       source: druid
       service: '<SERVICE_NAME>'
       log_processing_rules:
         - type: multi_line
           name: new_log_start_with_date
           pattern: \d{4}\-\d{2}\-\d{2}
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `druid` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **druid.coordinator.segment.count** <br>(gauge) | Recuento de segmentos del coordinador.<br>_Se muestra como segmento_ |
| **druid.historical.segment.count** <br>(gauge) | Recuento histórico de segmentos.<br>_Se muestra como segmento_ |
| **druid.ingest.events.buffered** <br>(gauge) | Número de eventos en cola en el búfer de EventReceiverFirehose.<br>_Se muestra como evento_ |
| **druid.ingest.events.duplicate** <br>(count) | Número de eventos rechazados porque están duplicados.<br>_Se muestra como evento_ |
| **druid.ingest.events.messageGap** <br>(gauge) | Intervalo de tiempo entre la hora de los datos en el evento y la hora actual del sistema.<br>_Se muestra en milisegundos_ |
| **druid.ingest.events.processed** <br>(count) | Número de eventos procesados con éxito por periodo de emisión.<br>_Se muestra como evento_ |
| **druid.ingest.events.thrownAway** <br>(count) | Número de eventos rechazados por estar fuera de windowPeriod.<br>_Se muestra como evento_ |
| **druid.ingest.events.unparseable** <br>(count) | Número de eventos rechazados debido a que los eventos son incomparables.<br>_Se muestra como evento_ |
| **druid.ingest.handoff.failed** <br>(count) | Número de traspasos fallidos.|
| **druid.ingest.kafka.avgLag** <br>(gauge) | Retraso medio entre los desfases consumidos por las tareas de indexación de Kafka y los últimos desfases en los corredores de Kafka en todas las particiones. El periodo de emisión mínimo para esta métrica es un Minuto.<br>_Se muestra como desfase_ |
| **druid.ingest.kafka.lag** <br>(gauge) | Retraso total entre los desfases consumidos por las tareas de indexación de Kafka y los últimos desfases en los corredores de Kafka en todas las particiones. El periodo de emisión mínimo para esta métrica es un Minuto.<br>_Se muestra como desfase_ |
| **druid.ingest.kafka.maxLag** <br>(gauge) | Retraso máximo entre los desfases consumidos por las tareas de indexación de Kafka y los últimos desfases en los corredores de Kafka en todas las particiones. El periodo de emisión mínimo para esta métrica es un Minuto.<br>_Se muestra como desfase_ |
| **druid.ingest.merge.cpu** <br>(gauge) | Tiempo de CPU en nanosegundos empleado en fusionar segmentos intermedios.<br>_Se muestra como nanosegundo_ |
| **druid.ingest.merge.time** <br>(gauge) | Milisegundos empleados en fusionar segmentos intermedios.<br>_Se muestra como milisegundo_ |
| **druid.ingest.persists.backPressure** <br>(gauge) | Milisegundos empleados en crear tareas de persistencia y en bloquearse a la espera de que finalicen.<br>_Se muestra como milisegundo_ |
| **druid.ingest.persists.count** <br>(count) | Número de veces que se ha producido la persistencia.|
| **druid.ingest.persists.cpu** <br>(gauge) | Tiempo de CPU en nanosegundos empleado en hacer persistencia intermedia.<br>_Se muestra como nanosegundo_ |
| **druid.ingest.persists.failed** <br>(count) | Número de persistencias que han fallado.        |
| **druid.ingest.persists.time** <br>(gauge) | Milisegundos dedicados a la persistencia intermedia.<br>_Se muestra como milisegundo_ |
| **druid.ingest.rows.output** <br>(count) | Número de filas de Druid conservadas.<br>_Se muestra como fila_ |
| **druid.jvm.bufferpool.capacity** <br>(gauge) | Capacidad del grupo de búfer en bytes.<br>_Se muestra como byte_ |
| **druid.jvm.bufferpool.count** <br>(gauge) | Recuento del grupo de búfer en bytes.<br>_Se muestra como byte_ |
| **druid.jvm.bufferpool.used** <br>(gauge) | Grupo de búfer utilizado en bytes.<br>_Se muestra como byte_ |
| **druid.jvm.gc.count** <br>(count) | Recuento de recopilación de elementos no usados.|
| **druid.jvm.gc.cpu** <br>(gauge) | Tiempo de CPU en nanosegundos empleado en la recopilación de elementos no usados.<br>_Se muestra como nanosegundo_ |
| **druid.jvm.mem.committed** <br>(gauge) | Memoria comprometida en bytes.<br>_Se muestra como byte_ |
| **druid.jvm.mem.init** <br>(gauge) | Memoria inicial en bytes.<br>_Se muestra como byte_ |
| **druid.jvm.mem.max** <br>(gauge) | Memoria máxima en bytes.<br>_Se muestra como byte_ |
| **druid.jvm.mem.used** <br>(gauge) | Memoria utilizada en bytes.<br>_Se muestra como byte_ |
| **druid.jvm.pool.committed** <br>(gauge) | Grupo comprometido en bytes.<br>_Se muestra como byte_ |
| **druid.jvm.pool.init** <br>(gauge) | Grupo inicial en bytes.<br>_Se muestra como byte_ |
| **druid.jvm.pool.max** <br>(gauge) | Grupo máximo en bytes.<br>_Se muestra como byte_ |
| **druid.jvm.pool.used** <br>(gauge) | Grupo utilizado en bytes.<br>_Se muestra como byte_ |
| **druid.query.bytes** <br>(count) | Número de bytes devueltos en la respuesta a la consulta.<br>_Se muestra como byte_ |
| **druid.query.cache.delta.averageBytes** <br>(count) | Tamaño medio delta del byte de la entrada de caché.<br>_Se muestra como byte_ |
| **druid.query.cache.delta.errors** <br>(count) | Número delta de errores de caché.|
| **druid.query.cache.delta.evictions** <br>(count) | Número delta de desalojos de caché.<br>_Se muestra como desalojo_ |
| **druid.query.cache.delta.hitRate** <br>(count) | Tasa delta de aciertos en la cache.<br>_Se muestra como fracción_ |
| **druid.query.cache.delta.hits** <br>(count) | Número delta de aciertos en la caché.<br>_Se muestra como acierto_ |
| **druid.query.cache.delta.misses** <br>(count) | Número delta de fallos de caché.<br>_Se muestra como fallo_ |
| **druid.query.cache.delta.numEntries** <br>(count) | Número delta de entradas de caché.|
| **druid.query.cache.delta.sizeBytes** <br>(count) | Tamaño delta en bytes de las entradas de la caché.<br>_Se muestra como byte_ |
| **druid.query.cache.delta.timeouts** <br>(count) | Número delta de tiempos de espera de caché.|
| **druid.query.cache.total.averageBytes** <br>(gauge) | Tamaño medio total en bytes de la entrada de caché.<br>_Se muestra como byte_ |
| **druid.query.cache.total.errors** <br>(gauge) | Número total de errores de caché.|
| **druid.query.cache.total.evictions** <br>(gauge) | Número total de desalojos de la caché.<br>_Se muestra como desalojo_ |
| **druid.query.cache.total.hitRate** <br>(gauge) | Tasa total de aciertos de la caché.<br>_Se muestra como fracción_ |
| **druid.query.cache.total.hits** <br>(gauge) | Número total de aciertos en la caché.<br>_Se muestra como acierto_ |
| **druid.query.cache.total.misses** <br>(gauge) | Número total de fallos de caché.<br>_Se muestra como fallo_ |
| **druid.query.cache.total.numEntries** <br>(gauge) | Número total de entradas de caché.|
| **druid.query.cache.total.sizeBytes** <br>(gauge) | Tamaño total en bytes de las entradas de la caché.<br>_Se muestra como byte_ |
| **druid.query.cache.total.timeouts** <br>(gauge) | Número total de tiempos de espera de caché.|
| **druid.query.count** <br>(count) | Número de consultas totales.<br>_Se muestra como consulta_ |
| **druid.query.cpu.time** <br>(gauge) | Microsegundos de tiempo de CPU que se tarda en completar una consulta.<br>_Se muestra como microsegundo_ |
| **druid.query.failed.count** <br>(count) | Número de consultas fallidas.<br>_Se muestra como consulta_ |
| **druid.query.interrupted.count** <br>(count) | Número de consultas interrumpidas por cancelación o tiempo de espera.<br>_Se muestra como consulta_ |
| **druid.query.intervalChunk.time** <br>(gauge) | Solo se emite si la fragmentación de intervalos está activada. Milisegundos necesarios para consultar un fragmento de intervalos. Esta métrica está obsoleta y se eliminará en el futuro porque la fragmentación de intervalos está obsoleta. Consulta Contexto de consulta.<br>_Se muestra como milisegundo_ |
| **druid.query.node.backpressure** <br>(gauge) | Milisegundos que el canal a este proceso ha pasado suspendido debido a la contrapresión.<br>_Se muestra como milisegundo_ |
| **druid.query.node.bytes** <br>(count) | Número de bytes devueltos por la consulta de procesos individuales históricos/en tiempo real.<br>_Se muestra como byte_ |
| **druid.query.node.time** <br>(gauge) | Milisegundos que se tardó en consultar procesos individuales históricos/en tiempo real.<br>_Se muestra como milisegundo_ |
| **druid.query.node.ttfb** <br>(gauge) | Tiempo hasta el primer byte. Milisegundos transcurridos hasta que el broker comienza a recibir la respuesta de los procesos individuales históricos/en tiempo real.<br>_Se muestra como milisegundo_ |
| **druid.query.segment.time** <br>(gauge) | Milisegundos que se tarda en consultar un segmento individual. Incluye el tiempo necesario para paginar en el segmento desde el disco.<br>_Se muestra en milisegundos_ |
| **druid.query.segmentAndCache.time** <br>(gauge) | Milisegundos que se tarda en consultar un segmento individual o en acceder a la caché (si está activada en el proceso histórico).<br>_Se muestra en milisegundos_ |
| **druid.query.success.count** <br>(count) | Número de consultas procesadas con éxito.<br>_Se muestra como consulta_ |
| **druid.query.time** <br>(gauge) | Milisegundos que se tarda en completar una consulta.<br>_Se muestra como milisegundo_ |
| **druid.query.wait.time** <br>(gauge) | Milisegundos de espera para escanear un segmento.<br>_Se muestra como milisegundo_ |
| **druid.segment.added.bytes** <br>(count) | Tamaño en bytes de los nuevos segmentos creados.<br>_Se muestra como byte_ |
| **druid.segment.assigned.count** <br>(count) | Número de segmentos asignados para ser cargados en el cluster.<br>_Se muestra como segmento_ |
| **druid.segment.cost.normalization** <br>(count) | Se utiliza en el equilibrio de costes. La normalización de los segmentos de alojamiento.|
| **druid.segment.cost.normalized** <br>(count) | Se utiliza en el balance de costes. El coste normalizado de los segmentos de alojamiento.|
| **druid.segment.cost.raw** <br>(count) | Se utiliza en el balance de costes. El coste bruto de los segmentos de alojamiento.|
| **druid.segment.deleted.count** <br>(count) | Número de segmentos abandonados debido a las reglas.<br>_Se muestra como segmento_ |
| **druid.segment.dropQueue.count** <br>(gauge) | Número de segmentos a abandonar.<br>_Se muestra como segmento_ |
| **druid.segment.dropped.count** <br>(count) | Número de segmentos abandonados por estar eclipsados.<br>_Se muestra como segmento_ |
| **druid.segment.loadQueue.count** <br>(gauge) | Número de segmentos a cargar.<br>_Se muestra como segmento_ |
| **druid.segment.loadQueue.failed** <br>(gauge) | Número de segmentos que no se han podido cargar.<br>_Se muestra como segmento_ |
| **druid.segment.loadQueue.size** <br>(gauge) | Tamaño en bytes de los segmentos a cargar.<br>_Se muestra como byte_ |
| **druid.segment.max** <br>(gauge) | Límite máximo de bytes disponible para los segmentos.<br>_Se muestra como byte_ |
| **druid.segment.moved.bytes** <br>(count) | Tamaño en bytes de los segmentos movidos/archivados a través de la tarea Mover.<br>_Se muestra como byte_ |
| **druid.segment.moved.count** <br>(count) | Número de segmentos movidos en el clúster.<br>_Se muestra como segmento_ |
| **druid.segment.nuked.bytes** <br>(count) | Tamaño en bytes de los segmentos eliminados mediante la tarea Eliminar.<br>_Se muestra como byte_ |
| **druid.segment.overShadowed.count** <br>(gauge) | Número de segmentos eclipsados.<br>_Se muestra como segmento_ |
| **druid.segment.pendingDelete** <br>(gauge) | Tamaño en disco en bytes de los segmentos que están esperando a ser borrados.<br>_Se muestra como byte_ |
| **druid.segment.scan.pending** <br>(gauge) | Número de segmentos en cola a la espera de ser escaneados.<br>_Se muestra como unidad_ |
| **druid.segment.size** <br>(gauge) | Tamaño en bytes de los segmentos disponibles.<br>_Se muestra como byte_ |
| **druid.segment.unavailable.count** <br>(count) | Número de segmentos (sin incluir las réplicas) que quedan por cargar hasta que los segmentos que deberían cargarse en el clúster estén disponibles para las consultas.<br>_Se muestra como segmento_ |
| **druid.segment.underReplicated.count** <br>(count) | Número de segmentos (incluidas las réplicas) que quedan por cargar hasta que los segmentos que deberían cargarse en el clúster estén disponibles para las consultas.<br>_Se muestra como segmento_ |
| **druid.segment.unneeded.count** <br>(count) | Número de segmentos abandonados por estar marcados como no utilizados.<br>_Se muestra como segmento_ |
| **druid.segment.used** <br>(gauge) | Bytes utilizados para los segmentos servidos.<br>_Se muestra como byte_ |
| **druid.segment.usedPercent** <br>(gauge) | Porcentaje de espacio utilizado por los segmentos servidos.<br>_Se muestra como fracción_ |
| **druid.service.health** <br>(gauge) | 1 si el servicio está en buen estado, 0 en caso contrario|
| **druid.sys.cpu** <br>(gauge) | CPU utilizada.<br>_Se muestra en porcentaje_ |
| **druid.sys.disk.read.count** <br>(count) | Lecturas del disco.<br>_Se muestra como lectura_ |
| **druid.sys.disk.read.size** <br>(count) | Bytes leídos del disco. Se puede utilizar para determinar la cantidad de paginación que se está produciendo con respecto a los segmentos.<br>_Se muestra como byte_ |
| **druid.sys.disk.write.count** <br>(count) | Escrituras del disco.<br>_Se muestra como escritura_ |
| **druid.sys.disk.write.size** <br>(count) | Bytes escritos en el disco. Se puede utilizar para determinar cuánta paginación se está produciendo con respecto a los segmentos.<br>_Se muestra como byte_ |
| **druid.sys.fs.max** <br>(gauge) | Máximo de bytes del sistema de archivos.<br>_Se muestra como byte_ |
| **druid.sys.fs.used** <br>(gauge) | Bytes del sistema de archivos utilizados.<br>_Se muestra como byte_ |
| **druid.sys.mem.max** <br>(gauge) | Máximo de memoria.<br>_Se muestra como byte_ |
| **druid.sys.mem.used** <br>(gauge) | Memoria utilizada.<br>_Se muestra como byte_ |
| **druid.sys.net.read.size** <br>(count) | Bytes leídos de la red.<br>_Se muestra como byte_ |
| **druid.sys.net.write.size** <br>(count) | Bytes escritos en la red.<br>_Se muestra como byte_ |
| **druid.sys.storage.used** <br>(gauge) | Espacio de disco utilizado.<br>_Se muestra como byte_ |
| **druid.sys.swap.free** <br>(gauge) | Swap libre en bytes.<br>_Se muestra como byte_ |
| **druid.sys.swap.max** <br>(gauge) | Swap máximo en bytes.<br>_Se muestra como byte_ |
| **druid.sys.swap.pageIn** <br>(gauge) | Páginas entrantes al swap.<br>_Se muestra como página_ |
| **druid.sys.swap.pageOut** <br>(gauge) | Páginas salientes del swap.<br>_Se muestra como página_ |
| **druid.task.failed.count** <br>(count) | Número de tareas fallidas por periodo de emisión. Esta métrica solo está disponible si se incluye el módulo TaskCountStatsMonitor.<br>_Paged in swap como tarea_ |
| **druid.task.pending.count** <br>(count) | Número de tareas pendientes actuales. Esta métrica solo está disponible si se incluye el módulo TaskCountStatsMonitor.<br>_Se muestra como tarea_ |
| **druid.task.run.time** <br>(gauge) | Milisegundos que tarda en ejecutarse una tarea.<br>_Se muestra como milisegundo_ |
| **druid.task.running.count** <br>(count) | Número de tareas en ejecución. Esta métrica solo está disponible si se incluye el módulo TaskCountStatsMonitor.<br>_Se muestra como tarea_ |
| **druid.task.success.count** <br>(count) | Número de tareas realizadas con éxito por periodo de emisión. Esta métrica solo está disponible si se incluye el módulo TaskCountStatsMonitor.<br>_Se muestra como tarea_ |
| **druid.task.waiting.count** <br>(count) | Número de tareas actuales en espera. Esta métrica solo está disponible si se incluye el módulo TaskCountStatsMonitor.<br>_Se muestra como tarea_ |

### Eventos

El check de Druid no incluye eventos.

### Checks de servicio

**druid.service.can_connect**

Devuelve `CRITICAL` si el check no puede conectarse al servicio de Druid. En caso contrario, devuelve `OK`.

_Estados: ok, critical_

**druid.service.health**

Devuelve `CRITICAL` si el servicio de Druid no está en buen estado. En caso contrario, devuelve `OK`.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).