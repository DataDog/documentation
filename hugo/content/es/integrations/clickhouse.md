---
app_id: clickhouse
categories:
- almacenamiento en caché
- almacenes de datos
- recopilación de logs
custom_kind: integración
description: Monitoriza el estado y el rendimiento de tus clústeres de ClickHouse.
integration_version: 5.3.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: ClickHouse
---
## Información general

Este check monitoriza [ClickHouse](https://clickhouse.yandex) a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de ClickHouse está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest). No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

#### Recopilación de métricas

1. Para empezar a recopilar los datos de rendimiento de ClickHouse, edita el archivo `clickhouse.d/conf.yaml` en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent. Consulta el [clickhouse.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/clickhouse/datadog_checks/clickhouse/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade los archivos de logs que te interesan a tu archivo `clickhouse.d/conf.yaml` para empezar a recopilar tus logs de ClickHouse:

   ```yaml
     logs:
       - type: file
         path: /var/log/clickhouse-server/clickhouse-server.log
         source: clickhouse
         service: "<SERVICE_NAME>"
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno. Consulta el [clickhouse.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/clickhouse/datadog_checks/clickhouse/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Containerized" %}}

#### En contenedores

Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

#### Recopilación de métricas

| Parámetro            | Valor                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `clickhouse`                                                   |
| `<INIT_CONFIG>`      | en blanco o `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{"server": "%%host%%", "port": "%%port%%", "username": "<USER>", "password": "<PASSWORD>"}`       |

##### Recopilación de logs

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

| Parámetro      | Valor                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "clickhouse", "service": "<SERVICE_NAME>"}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `clickhouse` en la sección **Checks**.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **clickhouse.CompiledExpressionCacheCount** <br>(gauge) | Total de entradas en la caché de código compilado por JIT.<br>_Se muestra como elemento_ |
| **clickhouse.MarkCacheFiles** <br>(gauge) | El número de archivos de marcas almacenados en la caché de marcas.<br>_Se muestra como elemento_ |
| **clickhouse.ReplicasMaxInsertsInQueue** <br>(gauge) | Número máximo de operaciones INSERT en la cola (aún por replicar) en las tablas replicadas.<br>_Se muestra como elemento_ |
| **clickhouse.ReplicasMaxMergesInQueue** <br>(gauge) | Número máximo de operaciones de fusión en cola (aún por aplicar) en las tablas replicadas.<br>_Se muestra como elemento_ |
| **clickhouse.ReplicasMaxQueueSize** <br>(gauge) | Tamaño máximo de la cola (en número de operaciones como get, merge) en las tablas replicadas.<br>_Se muestra como elemento_ |
| **clickhouse.ReplicasSumInsertsInQueue** <br>(gauge) | Suma de las operaciones INSERT en la cola (aún por replicar) en las tablas replicadas.<br>_Se muestra como elemento_ |
| **clickhouse.ReplicasSumMergesInQueue** <br>(gauge) | Suma de las operaciones merge en cola (aún por aplicar) en las tablas replicadas.<br>_Se muestra como elemento_ |
| **clickhouse.UncompressedCacheBytes** <br>(gauge) | Tamaño total de la caché sin comprimir en bytes. La caché sin comprimir no suele mejorar el rendimiento y debería evitarse en la mayoría de los casos.<br>_Se muestra como byte_ |
| **clickhouse.UncompressedCacheCells** <br>(gauge) | Número total de entradas en la caché descomprimida. Cada entrada representa un bloque de datos descomprimido. La caché sin comprimir no suele mejorar el rendimiento y debería evitarse en la mayoría de los casos.<br>_Se muestra como elemento_ |
| **clickhouse.addresses.active** <br>(gauge) | Recuento total de direcciones que se utilizan para conexiones de creación con grupos de conexión|
| **clickhouse.aggregator.threads** <br>(gauge) | Número de subprocesos en el grupo de subprocesos del Aggregator.|
| **clickhouse.aggregator.threads.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos del Aggregator que ejecutan una tarea.|
| **clickhouse.aggregator.threads.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos del Aggregator.|
| **clickhouse.aio.read.count** <br>(count) | Número de lecturas con Linux o interfaz AIO de FreeBSD.<br>_Se muestra como lectura_ |
| **clickhouse.aio.read.size.count** <br>(count) | Número de bytes leídos con Linux o la interfaz AIO de FreeBSD.<br>_Se muestra como byte_ |
| **clickhouse.aio.read.size.total** <br>(gauge) | Número total de bytes leídos con Linux o la interfaz AIO de FreeBSD.<br>_Se muestra como byte_ |
| **clickhouse.aio.read.total** <br>(gauge) | Número total de lecturas con Linux o interfaz AIO de FreeBSD.<br>_Se muestra como lectura_ |
| **clickhouse.aio.write.count** <br>(count) | Número de escrituras con Linux o interfaz AIO de FreeBSD.<br>_Se muestra como escritura_ |
| **clickhouse.aio.write.size.count** <br>(count) | Número de bytes leídos con Linux o la interfaz AIO de FreeBSD.<br>_Se muestra como byte_ |
| **clickhouse.aio.write.size.total** <br>(gauge) | Número total de bytes leídos con Linux o la interfaz AIO de FreeBSD.<br>_Se muestra como byte_ |
| **clickhouse.aio.write.total** <br>(gauge) | Número total de escrituras con Linux o interfaz AIO de FreeBSD.<br>_Se muestra como escritura_ |
| **clickhouse.async.read.time** <br>(gauge) | Tiempo de espera en lectura local asíncrona.<br>_Se muestra como microsegundo_ |
| **clickhouse.async.reader.ignored.bytes.count** <br>(count) | Número de bytes ignorados durante la lectura asíncrona|
| **clickhouse.async.reader.ignored.bytes.total** <br>(gauge) | Número de bytes ignorados durante la lectura asíncrona|
| **clickhouse.async.remote_read.time** <br>(gauge) | Tiempo de espera de las lecturas remotas asíncronas.<br>_Se muestra como microsegundo_ |
| **clickhouse.attached.database** <br>(gauge) | Base de datos activa, utilizada por los SELECT actuales y futuros.|
| **clickhouse.attached.table** <br>(gauge) | Tabla activa, utilizada por los SELECT actuales y futuros.|
| **clickhouse.azure.blob_storage.copy_object.count** <br>(count) | Número de llamadas a la API CopyObject de Azure Blob Storage|
| **clickhouse.azure.blob_storage.copy_object.total** <br>(gauge) | Número de llamadas a la API CopyObject de Azure Blob Storage|
| **clickhouse.azure.blob_storage.delete_object.count** <br>(count) | Número de llamadas a la API DeleteObject(s) de Azure Blob Storage.|
| **clickhouse.azure.blob_storage.delete_object.total** <br>(gauge) | Número de llamadas a la API DeleteObject(s) de Azure Blob Storage.|
| **clickhouse.azure.blob_storage.list_object.count** <br>(count) | Número de llamadas a la API ListObjects de Azure Blob Storage.|
| **clickhouse.azure.blob_storage.list_object.total** <br>(gauge) | Número de llamadas a la API ListObjects de Azure Blob Storage.|
| **clickhouse.azure.blob_storage.upload_part.count** <br>(count) | Número de llamadas a la API UploadPart de Azure Blob Storage|
| **clickhouse.azure.blob_storage.upload_part.total** <br>(gauge) | Número de llamadas a la API UploadPart de Azure Blob Storage|
| **clickhouse.background_pool.buffer_flush_schedule.task.active** <br>(gauge) | Número de tareas activas en BackgroundBufferFlushSchedulePool. Este grupo se utiliza para las descargas periódicas del búfer<br>_Se muestra como tarea_ |
| **clickhouse.background_pool.buffer_flush_schedule.task.limit** <br>(gauge) | Límite del número de tareas en BackgroundBufferFlushSchedulePool|
| **clickhouse.background_pool.common.task.active** <br>(gauge) | Número de tareas activas en un grupo secundario asociado<br>_Se muestra como tarea_ |
| **clickhouse.background_pool.common.task.limit** <br>(gauge) | Límite del número de tareas en un grupo secundario asociado|
| **clickhouse.background_pool.distributed.task.active** <br>(gauge) | Número de tareas activas en BackgroundDistributedSchedulePool. Este grupo se utiliza para los envíos distribuidos que se realizan en segundo plano.<br>_Se muestra como tarea_ |
| **clickhouse.background_pool.distributed.task.limit** <br>(gauge) | Límite del número de tareas en BackgroundDistributedSchedulePool|
| **clickhouse.background_pool.fetches.task.active** <br>(gauge) | Número de tareas activas en BackgroundFetchesPool<br>_Se muestra como tarea_ |
| **clickhouse.background_pool.fetches.task.limit** <br>(gauge) | Límite del número de búsquedas simultáneas en un grupo secundario asociado|
| **clickhouse.background_pool.merges.task.active** <br>(gauge) | Número de fusiones y mutaciones activas en un grupo secundario asociado<br>_Se muestra como tarea_ |
| **clickhouse.background_pool.merges.task.limit** <br>(gauge) | Límite del número de fusiones y mutaciones activas en un grupo secundario asociado|
| **clickhouse.background_pool.message_broker.task.active** <br>(gauge) | Número de tareas activas en BackgroundProcessingPool para el flujo de mensajes<br>_Se muestra como tarea_ |
| **clickhouse.background_pool.message_broker.task.limit** <br>(gauge) | Limitación del número de tareas en BackgroundProcessingPool para la transmisión de mensajes|
| **clickhouse.background_pool.move.memory** <br>(gauge) | Cantidad total de memoria (bytes) asignada en el grupo secundario de procesamiento (dedicado a movimientos en segundo plano). Ten en cuenta que este valor puede incluir un desvío cuando la memoria se asignó en un contexto del grupo secundario de procesamiento y se liberó en otro contexto o viceversa. Esto ocurre de forma natural debido a las cachés de los índices de las tablas y no indica fugas de memoria.<br>_Se muestra como byte_ |
| **clickhouse.background_pool.move.task.active** <br>(gauge) | El número de tareas activas en BackgroundProcessingPool para movimientos.<br>_Se muestra como tarea_ |
| **clickhouse.background_pool.move.task.limit** <br>(gauge) | Límite del número de tareas en BackgroundProcessingPool para movimientos|
| **clickhouse.background_pool.processing.memory** <br>(gauge) | Cantidad total de memoria asignada en el grupo secundario de procesamiento (dedicado a fusiones, mutaciones y búsquedas en segundo plano). Ten en cuenta que este valor puede incluir un desvío cuando la memoria se asignó en un contexto del grupo secundario de procesamiento y se liberó en otro contexto o viceversa. Esto ocurre de forma natural debido a las cachés de los índices de las tablas y no indica fugas de memoria.<br>_Se muestra como byte_ |
| **clickhouse.background_pool.processing.task.active** <br>(gauge) | El número de tareas activas en BackgroundProcessingPool (fusiones, mutaciones, búsquedas o mantenimiento de colas de replicación)<br>_Se muestra como tarea_ |
| **clickhouse.background_pool.schedule.memory** <br>(gauge) | Cantidad total de memoria asignada en un grupo secundario de horario (que se dedica a tareas de mantenimiento de tablas replicadas).<br>_Se muestra como byte_ |
| **clickhouse.background_pool.schedule.task.active** <br>(gauge) | El número de tareas activas en BackgroundSchedulePool. Este grupo se utiliza para tareas periódicas de ReplicatedMergeTree, como la limpieza de partes de datos antiguas, la modificación de partes de datos, la reinicialización de réplicas, etc.<br>_Se muestra como tarea_ |
| **clickhouse.background_pool.schedule.task.limit** <br>(gauge) | Límite en el número de tareas en BackgroundSchedulePool. Este grupo se utiliza para tareas periódicas de ReplicatedMergeTree, como la limpieza de partes de datos antiguas, la modificación de partes de datos, la reinicialización de réplicas, etc.|
| **clickhouse.backup.post_tasks.time** <br>(gauge) | Tiempo empleado en ejecutar tareas posteriores tras realizar entradas de copia de seguridad<br>_Se muestra como microsegundo_ |
| **clickhouse.backup.read.time** <br>(gauge) | Tiempo empleado en leer los metadatos de la copia de seguridad del archivo .backup<br>_Se muestra en microsegundos_ |
| **clickhouse.backup.tables.time** <br>(gauge) | Tiempo empleado en realizar entradas de copia de seguridad de los datos de las tablas<br>_Se muestra en microsegundos_ |
| **clickhouse.backup.time** <br>(gauge) | Tiempo empleado en realizar entradas de copia de seguridad<br>_Se muestra como microsegundo_ |
| **clickhouse.backup.write.time** <br>(gauge) | Tiempo empleado en escribir los metadatos de la copia de seguridad en el archivo .backup<br>_Se muestra en microsegundos_ |
| **clickhouse.backups.read.open.count** <br>(count) | Número de copias de seguridad abiertas para lectura|
| **clickhouse.backups.read.open.total** <br>(gauge) | Número de copias de seguridad abiertas para lectura|
| **clickhouse.backups.threads.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos para BACKUP que ejecutan una tarea.|
| **clickhouse.backups.threads.scheduled** <br>(gauge) | Número de trabajos en cola o activos para BACKUP.|
| **clickhouse.backups.threads.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos para BACKUP.|
| **clickhouse.backups.write.open.count** <br>(count) | Número de copias de seguridad abiertas para escritura|
| **clickhouse.backups.write.open.total** <br>(gauge) | Número de copias de seguridad abiertas para escritura|
| **clickhouse.backups_io.threads.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de BackupsIO que ejecutan una tarea.|
| **clickhouse.backups_io.threads.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos de BackupsIO.|
| **clickhouse.backups_io.threads.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de BackupsIO.|
| **clickhouse.buffer.write.discard.count** <br>(count) | El número de stack traces eliminados por el perfilador de consultas o el controlador de señales debido a que el pipe está lleno o no se puede escribir en el pipe durante el último intervalo.<br>_Se muestra como error_ |
| **clickhouse.buffer.write.discard.total** <br>(gauge) | Número total de stack traces eliminados por el perfilador de consultas o el controlador de señales porque el pipe está lleno o no se puede escribir en él.<br>_Se muestra como error_ |
| **clickhouse.cache.async.insert** <br>(gauge) | Número de identificadores hash de inserción asíncrona en la caché|
| **clickhouse.cache.buffer.time** <br>(gauge) | Tiempo de preparación del búfer<br>_Se muestra como microsegundo_ |
| **clickhouse.cache.distributed.client_access.count** <br>(count) | Número de accesos de clientes|
| **clickhouse.cache.distributed.client_access.total** <br>(gauge) | Número de accesos de clientes|
| **clickhouse.cache.distributed.connection.time** <br>(gauge) | El tiempo empleado en conectarse a la caché distribuida<br>_Se muestra como microsegundo_ |
| **clickhouse.cache.distributed.connections.used.count** <br>(count) | Número de conexiones utilizadas a la caché distribuida|
| **clickhouse.cache.distributed.connections.used.total** <br>(gauge) | Número de conexiones utilizadas a la caché distribuida|
| **clickhouse.cache.distributed.new_read_range.time** <br>(gauge) | Tiempo empleado en iniciar un nuevo rango de lectura con caché distribuida<br>_Se muestra como microsegundo_ |
| **clickhouse.cache.distributed.packets.received.count** <br>(count) | Número total de paquetes recibidos de la caché distribuida|
| **clickhouse.cache.distributed.packets.received.total** <br>(gauge) | Número total de paquetes recibidos de la caché distribuida|
| **clickhouse.cache.distributed.packets.skipped.count** <br>(count) | Número de paquetes no utilizados omitidos de la caché distribuida|
| **clickhouse.cache.distributed.packets.skipped.total** <br>(gauge) | Número de paquetes no utilizados omitidos de la caché distribuida|
| **clickhouse.cache.distributed.read.compute.time** <br>(gauge) | Tiempo empleado en precalcular los rangos de lectura<br>_Se muestra en microsegundos_ |
| **clickhouse.cache.distributed.read.time** <br>(gauge) | Tiempo de lectura de la caché distribuida<br>_Se muestra en microsegundos_ |
| **clickhouse.cache.distributed.read_buffer_next_impl.time** <br>(gauge) | Tiempo empleado en ReadBufferFromDistributedCache::nextImpl<br>_Se muestra como microsegundo_ |
| **clickhouse.cache.distributed.registry.update.time** <br>(gauge) | Tiempo de actualización del registro de caché distribuido<br>_Se muestra en microsegundos_ |
| **clickhouse.cache.distributed.registry.updates.count** <br>(count) | Número de actualizaciones distribuidas del registro de caché|
| **clickhouse.cache.distributed.registry.updates.total** <br>(gauge) | Número de actualizaciones distribuidas del registro de caché|
| **clickhouse.cache.distributed.registry_lock.time** <br>(gauge) | Tiempo empleado en bloquear DistributedCacheRegistry<br>_Se muestra como microsegundo_ |
| **clickhouse.cache.distributed.response.time** <br>(gauge) | Tiempo de espera de la respuesta de la caché distribuida<br>_Se muestra en microsegundos_ |
| **clickhouse.cache.distributed.server.switches.count** <br>(count) | Número de cambios de servidor entre servidores de caché distribuidos en la caché de lectura/escritura|
| **clickhouse.cache.distributed.server.switches.total** <br>(gauge) | Número de cambios de servidor entre servidores de caché distribuidos en la caché de lectura/escritura|
| **clickhouse.cache.file_segments** <br>(gauge) | Número de segmentos de archivo en caché existentes<br>_Se muestra como segmento_ |
| **clickhouse.cache.mark.entry.found.count** <br>(count) | Número de veces que se ha encontrado una entrada en la caché de marcas, por lo que no hemos tenido que cargar un archivo de marcas.|
| **clickhouse.cache.mark.entry.found.total** <br>(gauge) | Número de veces que se ha encontrado una entrada en la caché de marcas, por lo que no hemos tenido que cargar un archivo de marcas.|
| **clickhouse.cache.mark.entry.missed.count** <br>(count) | Número de veces que no se ha encontrado una entrada en la caché de marcas, por lo que hemos tenido que cargar un archivo de marcas en memoria, lo cual es una operación costosa, que se suma a la latencia de la consulta.|
| **clickhouse.cache.mark.entry.missed.total** <br>(gauge) | Número de veces que no se ha encontrado una entrada en la caché de marcas, por lo que hemos tenido que cargar un archivo de marcas en memoria, lo cual es una operación costosa, que se suma a la latencia de la consulta.|
| **clickhouse.cache.mmap.file.found.count** <br>(count) | Número de veces que se ha encontrado un archivo en la caché MMap (para el método de lectura 'mmap') por lo que no hemos tenido que pasarlo por mmap de nuevo.|
| **clickhouse.cache.mmap.file.found.total** <br>(gauge) | Número de veces que se ha encontrado un archivo en la caché MMap (para el método de lectura 'mmap') por lo que no hemos tenido que pasarlo por mmap de nuevo.|
| **clickhouse.cache.mmap.file.missed.count** <br>(count) | Número de veces que no se ha encontrado un archivo en la caché MMap (para el método de lectura 'mmap') por lo que hemos tenido que pasarlo por mmap de nuevo.|
| **clickhouse.cache.mmap.file.missed.total** <br>(gauge) | Número de veces que no se ha encontrado un archivo en la caché MMap (para el método de lectura 'mmap') por lo que hemos tenido que pasarlo por mmap de nuevo.|
| **clickhouse.cache.opened_file.hits.count** <br>(count) | Número de veces que se ha encontrado un archivo en la caché de archivos abiertos, por lo que no hubo que abrirlo de nuevo.|
| **clickhouse.cache.opened_file.hits.total** <br>(gauge) | Número de veces que se ha encontrado un archivo en la caché de archivos abiertos, por lo que no hubo que abrirlo de nuevo.|
| **clickhouse.cache.opened_file.misses.count** <br>(count) | Número de veces que se ha encontrado un archivo en la caché de archivos abiertos, por lo que hemos tenido que abrirlo de nuevo.|
| **clickhouse.cache.opened_file.misses.total** <br>(gauge) | Número de veces que se ha encontrado un archivo en la caché de archivos abiertos, por lo que hemos tenido que abrirlo de nuevo.|
| **clickhouse.cache.opened_file.time** <br>(gauge) | Cantidad de tiempo empleado en ejecutar los métodos de OpenedFileCache.<br>_Se muestra como microsegundo_ |
| **clickhouse.cache.page.chunk.evicted.count** <br>(count) | Número de veces que se ha encontrado un fragmento en la caché de página del espacio de usuario, no en uso, pero todas sus páginas fueron vaciadas por el SO.|
| **clickhouse.cache.page.chunk.evicted.total** <br>(gauge) | Número de veces que se ha encontrado un fragmento en la caché de página del espacio de usuario, no en uso, pero todas sus páginas fueron vaciadas por el SO.|
| **clickhouse.cache.page.chunk.hits.count** <br>(count) | Número de veces que se ha encontrado un fragmento en la caché de página del espacio de usuario, sin usar, con todas las páginas intactas.|
| **clickhouse.cache.page.chunk.hits.partial.count** <br>(count) | Número de veces que se ha encontrado un fragmento en la caché de página del espacio de usuario, no en uso, pero algunas de sus páginas fueron vaciadas por el SO.|
| **clickhouse.cache.page.chunk.hits.partial.total** <br>(gauge) | Número de veces que se ha encontrado un fragmento en la caché de página del espacio de usuario, no en uso, pero algunas de sus páginas fueron vaciadas por el SO.|
| **clickhouse.cache.page.chunk.hits.total** <br>(gauge) | Número de veces que se ha encontrado un fragmento en la caché de página del espacio de usuario, sin usar, con todas las páginas intactas.|
| **clickhouse.cache.page.chunk.misses.count** <br>(count) | Número de veces que no se ha encontrado un fragmento en la caché de página del espacio de usuario.|
| **clickhouse.cache.page.chunk.misses.total** <br>(gauge) | Número de veces que no se ha encontrado un fragmento en la caché de página del espacio de usuario.|
| **clickhouse.cache.page.chunk.shared.count** <br>(count) | Número de veces que se ha encontrado un fragmento en la caché de página del espacio de usuario, ya en uso por otro subproceso.|
| **clickhouse.cache.page.chunk.shared.total** <br>(gauge) | Número de veces que se ha encontrado un fragmento en la caché de página del espacio de usuario, ya en uso por otro subproceso.|
| **clickhouse.cache.page.thread_pool_reader.prepare.time** <br>(gauge) | Tiempo empleado en la preparación (por ejemplo, llamada al método seek() del lector)<br>_Se muestra en microsegundos_ |
| **clickhouse.cache.page.thread_pool_reader.read.miss.time** <br>(gauge) | Tiempo empleado en leer datos dentro del trabajo asíncrono en ThreadPoolReader, cuando la lectura no se ha realizado desde la caché de página.<br>_Se muestra como microsegundo_ |
| **clickhouse.cache.page.thread_pool_reader.read.time** <br>(gauge) | Tiempo empleado en leer datos de la caché de página en ThreadPoolReader.<br>_Se muestra como microsegundo_ |
| **clickhouse.cache.query.hits.count** <br>(count) | Número de veces que se ha encontrado el resultado de una consulta en la caché de consultas (y se ha evitado el cálculo de la consulta). Solo se actualiza para consultas SELECT con SETTING use_query_cache = 1.|
| **clickhouse.cache.query.hits.total** <br>(gauge) | Número de veces que se ha encontrado el resultado de una consulta en la caché de consultas (y se ha evitado el cálculo de la consulta). Solo se actualiza para consultas SELECT con SETTING use_query_cache = 1.|
| **clickhouse.cache.query.misses.count** <br>(count) | Número de veces que el resultado de una consulta no se ha encontrado en la caché de consultas (y ha requerido el cálculo de la consulta). Solo se actualiza para consultas SELECT con SETTING use_query_cache = 1.|
| **clickhouse.cache.query.misses.total** <br>(gauge) | Número de veces que el resultado de una consulta no se ha encontrado en la caché de consultas (y ha requerido el cálculo de la consulta). Solo se actualiza para consultas SELECT con SETTING use_query_cache = 1.|
| **clickhouse.cache.read.bytes.count** <br>(count) | Bytes leídos de la caché del sistema de archivos|
| **clickhouse.cache.read.bytes.total** <br>(gauge) | Bytes leídos de la caché del sistema de archivos|
| **clickhouse.cache.read.hits.count** <br>(count) | Número de veces que la lectura desde la caché del sistema de archivos tiene aciertos en la caché.|
| **clickhouse.cache.read.hits.total** <br>(gauge) | Número de veces que la lectura desde la caché del sistema de archivos tiene aciertos en la caché.|
| **clickhouse.cache.read.misses.count** <br>(count) | Número de veces que la lectura desde la caché del sistema de archivos tiene fallos en la caché.|
| **clickhouse.cache.read.misses.total** <br>(gauge) | Número de veces que la lectura desde la caché del sistema de archivos tiene fallos en la caché.|
| **clickhouse.cache.read.time** <br>(gauge) | Tiempo de lectura de la caché del sistema de archivos<br>_Se muestra como microsegundo_ |
| **clickhouse.cache.remote_file_segments.waiting** <br>(gauge) | Tamaño total de los segmentos de archivos remotos en espera de ser cargados asíncronamente en la caché del sistema de archivos.|
| **clickhouse.cache.schema.evitcted.count** <br>(count) | Número de veces que un esquema de la caché fue vaciado por desbordamiento|
| **clickhouse.cache.schema.evitcted.total** <br>(gauge) | Número de veces que un esquema de la caché fue vaciado por desbordamiento|
| **clickhouse.cache.schema.found.count** <br>(count) | Número de veces que la fuente solicitada se encuentra en la caché de esquemas|
| **clickhouse.cache.schema.found.total** <br>(gauge) | Número de veces que la fuente solicitada se encuentra en la caché de esquemas|
| **clickhouse.cache.schema.found_schemas.count** <br>(count) | Número de veces que el esquema se encuentra en la caché de esquemas durante la inferencia de esquemas|
| **clickhouse.cache.schema.found_schemas.total** <br>(gauge) | Número de veces que el esquema se encuentra en la caché de esquemas durante la inferencia de esquemas|
| **clickhouse.cache.schema.invalid.count** <br>(count) | Número de veces que un esquema de la caché deja de ser válido debido a cambios en los datos|
| **clickhouse.cache.schema.invalid.total** <br>(gauge) | Número de veces que un esquema de la caché deja de ser válido debido a cambios en los datos|
| **clickhouse.cache.schema.missed.count** <br>(count) | Número de veces que la fuente solicitada no se encuentra en la caché de esquemas|
| **clickhouse.cache.schema.missed.total** <br>(gauge) | Número de veces que la fuente solicitada no se encuentra en la caché de esquemas|
| **clickhouse.cache.schema.missed_schemas.count** <br>(count) | Número de veces que la fuente solicitada está en la caché, pero el esquema no está en la caché durante la inferencia del esquema|
| **clickhouse.cache.schema.missed_schemas.total** <br>(gauge) | Número de veces que la fuente solicitada está en la caché, pero el esquema no está en la caché durante la inferencia del esquema|
| **clickhouse.cache.schema.rows.found.count** <br>(count) | Número de veces que se encuentra el número de filas en la caché del esquema durante el recuento desde archivos|
| **clickhouse.cache.schema.rows.found.total** <br>(gauge) | Número de veces que se encuentra el número de filas en la caché del esquema durante el recuento desde archivos|
| **clickhouse.cache.schema.rows.missed.count** <br>(count) | Número de veces que la fuente solicitada está en caché, pero el número de filas no está en caché mientras se cuenta desde archivos|
| **clickhouse.cache.schema.rows.missed.total** <br>(gauge) | Número de veces que la fuente solicitada está en caché, pero el número de filas no está en caché mientras se cuenta desde archivos|
| **clickhouse.cache.source.read.bytes.count** <br>(count) | Bytes leídos de la fuente de la caché del sistema de archivos (desde fs remoto, etc.)|
| **clickhouse.cache.source.read.bytes.total** <br>(gauge) | Bytes leídos de la fuente de la caché del sistema de archivos (desde fs remoto, etc.)|
| **clickhouse.cache.source.read.time** <br>(gauge) | Tiempo de lectura desde fuente de la caché del sistema de archivos (desde fs remoto, etc.)<br>_Se muestra como microsegundo_ |
| **clickhouse.cache.source.write.bytes.count** <br>(count) | Bytes escritos desde la fuente (fs remoto, etc.) a la caché del sistema de archivos|
| **clickhouse.cache.source.write.bytes.total** <br>(gauge) | Bytes escritos desde la fuente (fs remoto, etc.) a la caché del sistema de archivos|
| **clickhouse.cache.source.write.time** <br>(gauge) | Tiempo empleado en escribir datos en la caché del sistema de archivos<br>_Se muestra en microsegundos_ |
| **clickhouse.cache.uncompressed.block_data.count** <br>(count) | Número de veces que se ha encontrado un bloque de datos en la caché sin comprimir (y se ha evitado la descompresión).|
| **clickhouse.cache.uncompressed.block_data.miss.count** <br>(count) | Número de veces que un bloque de datos no se ha encontrado en la caché sin comprimir (y ha requerido descompresión).|
| **clickhouse.cache.uncompressed.block_data.miss.total** <br>(gauge) | Número de veces que un bloque de datos no se ha encontrado en la caché sin comprimir (y ha requerido descompresión).|
| **clickhouse.cache.uncompressed.block_data.total** <br>(gauge) | Número de veces que se ha encontrado un bloque de datos en la caché sin comprimir (y se ha evitado la descompresión).|
| **clickhouse.cache.write.bytes.count** <br>(count) | Bytes escritos desde la fuente (fs remoto, etc.) a la caché del sistema de archivos|
| **clickhouse.cache.write.bytes.total** <br>(gauge) | Bytes escritos desde la fuente (fs remoto, etc.) a la caché del sistema de archivos|
| **clickhouse.cache.write.time** <br>(gauge) | Tiempo empleado en escribir datos en la caché del sistema de archivos<br>_Se muestra en microsegundos_ |
| **clickhouse.cache_dictionary.threads.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de CacheDictionary que ejecutan una tarea.|
| **clickhouse.cache_dictionary.threads.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos de CacheDictionary.|
| **clickhouse.cache_dictionary.threads.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de CacheDictionary.|
| **clickhouse.cache_dictionary.update_queue.batches** <br>(gauge) | Número de "lotes" (un conjunto de claves) en la cola de actualización en CacheDictionaries.|
| **clickhouse.cache_dictionary.update_queue.keys** <br>(gauge) | Número exacto de claves en cola de actualización en CacheDictionaries.<br>_Se muestra como clave_ |
| **clickhouse.cache_file_segments.detached** <br>(gauge) | Número de segmentos de archivo de caché separados existentes<br>_Se muestra como segmento_ |
| **clickhouse.cachewarmer.bytes.downloaded.count** <br>(count) | Cantidad de datos recuperados en la caché del sistema de archivos por subprocesos dedicados en segundo plano.|
| **clickhouse.cachewarmer.bytes.downloaded.total** <br>(gauge) | Cantidad de datos recuperados en la caché del sistema de archivos por subprocesos dedicados en segundo plano.|
| **clickhouse.compilation.attempt.count** <br>(count) | El número de veces que se inició una compilación del código C++ generado durante el último intervalo.<br>_Se muestra como evento_ |
| **clickhouse.compilation.attempt.total** <br>(gauge) | El número total de veces que se inició una compilación del código C++ generado.<br>_Se muestra como evento_ |
| **clickhouse.compilation.function.execute.count** <br>(count) | El número de veces que se ha ejecutado una función compilada durante el último intervalo.<br>_Se muestra como ejecución_ |
| **clickhouse.compilation.function.execute.total** <br>(gauge) | El número total de veces que se ha ejecutado una función compilada.<br>_Se muestra como ejecución_ |
| **clickhouse.compilation.llvm.attempt.count** <br>(count) | El número de veces que se inició una compilación del código LLVM generado (para crear una función fusionada para expresiones complejas) durante el último intervalo.<br>_Se muestra como evento_ |
| **clickhouse.compilation.llvm.attempt.total** <br>(gauge) | El número total de veces que se inició una compilación del código LLVM generado (para crear una función fusionada para expresiones complejas).<br>_Se muestra como evento_ |
| **clickhouse.compilation.regex.count** <br>(count) | El número de expresiones regulares compiladas durante el último intervalo. Las expresiones regulares idénticas se compilan una sola vez y se almacenan en caché para siempre.<br>_Se muestra como evento_ |
| **clickhouse.compilation.regex.total** <br>(gauge) | El número total de expresiones regulares compiladas. Las expresiones regulares idénticas se compilan una sola vez y se almacenan en caché para siempre.<br>_Se muestra como evento_ |
| **clickhouse.compilation.size.count** <br>(count) | El número de bytes utilizados para la compilación de expresiones durante el último intervalo.<br>_Se muestra como byte_ |
| **clickhouse.compilation.size.total** <br>(gauge) | El número total de bytes utilizados para la compilación de expresiones.<br>_Se muestra como byte_ |
| **clickhouse.compilation.success.count** <br>(count) | El número de veces que una compilación de código C++ generado tuvo éxito durante el último intervalo.<br>_Se muestra como evento_ |
| **clickhouse.compilation.success.total** <br>(gauge) | El número total de veces que una compilación de código C++ generado tuvo éxito.<br>_Se muestra como evento_ |
| **clickhouse.compilation.time** <br>(gauge) | El porcentaje de tiempo empleado para la compilación de expresiones a código LLVM durante el último intervalo.<br>_Se muestra como porcentaje_ |
| **clickhouse.configuration.main.reloaded.count** <br>(count) | Número de veces que se ha recargado la configuración principal.|
| **clickhouse.configuration.main.reloaded.total** <br>(gauge) | Número de veces que se ha recargado la configuración principal.|
| **clickhouse.connection.http** <br>(gauge) | El número de conexiones al servidor HTTP<br>_Se muestra como conexión_ |
| **clickhouse.connection.http.create.count** <br>(count) | El número de conexiones HTTP creadas (cerradas o abiertas) durante el último intervalo.<br>_Se muestra como conexión_ |
| **clickhouse.connection.http.create.total** <br>(gauge) | El número total de conexiones HTTP creadas (cerradas o abiertas).<br>_Se muestra como conexión_ |
| **clickhouse.connection.http.stored** <br>(gauge) | Recuento total de sesiones almacenadas en el grupo de sesiones para hosts http|
| **clickhouse.connection.http.total** <br>(gauge) | Recuento total de todas las sesiones: almacenadas en el grupo y utilizadas activamente en este momento para hosts http|
| **clickhouse.connection.interserver** <br>(gauge) | El número de conexiones desde otras réplicas para obtener partes<br>_Se muestra como conexión_ |
| **clickhouse.connection.mysql** <br>(gauge) | Número de conexiones de clientes que utilizan el protocolo MySQL.<br>_Se muestra como conexión_ |
| **clickhouse.connection.send.external** <br>(gauge) | El número de conexiones que están enviando datos de tablas externas a servidores remotos. Las tablas externas se utilizan para implementar operadores GLOBAL IN y GLOBAL JOIN con subconsultas distribuidas.<br>_Se muestra como conexión_ |
| **clickhouse.connection.send.scalar** <br>(gauge) | El número de conexiones que están enviando datos para escalares a servidores remotos.<br>_Se muestra como conexión_ |
| **clickhouse.connection.tcp** <br>(gauge) | El número de conexiones al servidor TCP (clientes con interfaz nativa).<br>_Se muestra como conexión_ |
| **clickhouse.connections.alive.total** <br>(gauge) | Número de conexiones activas<br>_Se muestra como conexión_ |
| **clickhouse.connections.http.created.count** <br>(count) | Número de conexiones http creadas|
| **clickhouse.connections.http.created.time** <br>(gauge) | Tiempo total empleado en crear conexiones http<br>_Se muestra en microsegundos_ |
| **clickhouse.connections.http.created.total** <br>(gauge) | Número de conexiones http creadas|
| **clickhouse.connections.http.expired.count** <br>(count) | Número de conexiones http caducadas|
| **clickhouse.connections.http.expired.total** <br>(gauge) | Número de conexiones http caducadas|
| **clickhouse.connections.http.failed.count** <br>(count) | Número de casos en los que falló la creación de una conexión http|
| **clickhouse.connections.http.failed.total** <br>(gauge) | Número de casos en los que falló la creación de una conexión http|
| **clickhouse.connections.http.preserved.count** <br>(count) | Número de conexiones http conservadas|
| **clickhouse.connections.http.preserved.total** <br>(gauge) | Número de conexiones http conservadas|
| **clickhouse.connections.http.reset.count** <br>(count) | Número de conexiones http restablecidas|
| **clickhouse.connections.http.reset.total** <br>(gauge) | Número de conexiones http restablecidas|
| **clickhouse.connections.http.reused.count** <br>(count) | Número de conexiones http reutilizadas|
| **clickhouse.connections.http.reused.total** <br>(gauge) | Número de conexiones http reutilizadas|
| **clickhouse.connections.outstanding.total** <br>(gauge) | Número de solicitudes pendientes<br>_Se muestra como conexión_ |
| **clickhouse.cpu.time** <br>(gauge) | El porcentaje de tiempo de CPU visto por el SO durante el último intervalo. No incluye esperas involuntarias debidas a la virtualización.<br>_Se muestra como porcentaje_ |
| **clickhouse.data.part.replicated.obsolete.count** <br>(count) | Número de veces que una parte de datos ha sido cubierta por otra parte de datos que se ha obtenido de una réplica (es decir, hemos marcado una parte de datos cubierta como obsoleta y ya no necesaria).|
| **clickhouse.data.part.replicated.obsolete.total** <br>(gauge) | Número de veces que una parte de datos ha sido cubierta por otra parte de datos que se ha obtenido de una réplica (es decir, hemos marcado una parte de datos cubierta como obsoleta y ya no necesaria).|
| **clickhouse.database.total** <br>(gauge) | El número actual de bases de datos.<br>_Se muestra como instancia_ |
| **clickhouse.ddl.max_processed** <br>(gauge) | Entrada DDL máxima procesada de DDLWorker.|
| **clickhouse.dictionary.cache.keys.expired.count** <br>(count) | Número de claves buscadas en los diccionarios de tipos "cache" y encontradas en la caché, pero que estaban obsoletas.|
| **clickhouse.dictionary.cache.keys.expired.total** <br>(gauge) | Número de claves buscadas en los diccionarios de tipos "cache" y encontradas en la caché, pero que estaban obsoletas.|
| **clickhouse.dictionary.cache.keys.found.count** <br>(count) | Número de claves buscadas en los diccionarios de los tipos "cache" y encontradas en la caché.|
| **clickhouse.dictionary.cache.keys.found.total** <br>(gauge) | Número de claves buscadas en los diccionarios de los tipos "cach" y encontradas en la caché.|
| **clickhouse.dictionary.cache.keys.not_found.count** <br>(count) | Número de claves buscadas en los diccionarios de los tipos "cache" y no encontradas.|
| **clickhouse.dictionary.cache.keys.not_found.total** <br>(gauge) | Número de claves buscadas en los diccionarios de los tipos "cache" y no encontradas.|
| **clickhouse.dictionary.cache.keys.requested.count** <br>(count) | Número de claves solicitadas a la fuente de datos para los diccionarios de tipo "cache".|
| **clickhouse.dictionary.cache.keys.requested.total** <br>(gauge) | Número de claves solicitadas a la fuente de datos para los diccionarios de tipo "cache".|
| **clickhouse.dictionary.cache.read.waiting.time** <br>(gauge) | Número de nanosegundos que se tarda en esperar el bloqueo de lectura para buscar los datos de los diccionarios de tipo "cache".<br>_Se muestra como nanosegundo_ |
| **clickhouse.dictionary.cache.request.time** <br>(gauge) | Número de nanosegundos empleados en consultar las fuentes de datos externas para los diccionarios de los tipos 'cache'.<br>_Se muestra como nanosegundo_ |
| **clickhouse.dictionary.cache.requests.count** <br>(count) | Número de solicitudes masivas a las fuentes de datos externas para los diccionarios de tipo "cache".|
| **clickhouse.dictionary.cache.requests.total** <br>(gauge) | Número de solicitudes masivas a las fuentes de datos externas para los diccionarios de tipo "cache".|
| **clickhouse.dictionary.cache.write.waiting.time** <br>(gauge) | Número de nanosegundos que se tarda en esperar el bloqueo de escritura para actualizar los datos de los diccionarios de tipo "cache".<br>_Se muestra como nanosegundo_ |
| **clickhouse.dictionary.item.current** <br>(gauge) | El número de elementos almacenados en un diccionario.<br>_Se muestra como elemento_ |
| **clickhouse.dictionary.load** <br>(gauge) | El porcentaje llenado en un diccionario (para un diccionario con hash, el porcentaje llenado en la tabla hash).<br>_Se muestra como porcentaje_ |
| **clickhouse.dictionary.memory.used** <br>(gauge) | La cantidad total de memoria utilizada por un diccionario.<br>_Se muestra como byte_ |
| **clickhouse.dictionary.request.cache** <br>(gauge) | El número de solicitudes en vuelo a fuentes de datos de diccionarios de tipo caché.<br>_Se muestra como solicitud_ |
| **clickhouse.disk.azure.copy_object.count** <br>(count) | Número de llamadas a la API CopyObject de Azure Blob Storage en disco|
| **clickhouse.disk.azure.copy_object.total** <br>(gauge) | Número de llamadas a la API CopyObject de Azure Blob Storage en disco|
| **clickhouse.disk.azure.upload_part.count** <br>(count) | Número de llamadas a la API UploadPart de Azure Blob Storage en disco|
| **clickhouse.disk.azure.upload_part.total** <br>(gauge) | Número de llamadas a la API UploadPart de Azure Blob Storage en disco|
| **clickhouse.disk.connectioned.active** <br>(gauge) | Recuento total de todas las sesiones: almacenadas en el grupo y utilizadas activamente en este momento para los discos|
| **clickhouse.disk.connections.created.count** <br>(count) | Número de conexiones creadas para el disco|
| **clickhouse.disk.connections.created.time** <br>(gauge) | Tiempo total empleado en crear conexiones para el disco<br>_Se muestra en microsegundos_ |
| **clickhouse.disk.connections.created.total** <br>(gauge) | Número de conexiones creadas para el disco|
| **clickhouse.disk.connections.errors.count** <br>(count) | Número de casos en los que falla la creación de una conexión para disco|
| **clickhouse.disk.connections.errors.total** <br>(gauge) | Número de casos en los que falla la creación de una conexión para disco|
| **clickhouse.disk.connections.expired.count** <br>(count) | Número de conexiones caducadas para disco|
| **clickhouse.disk.connections.expired.total** <br>(gauge) | Número de conexiones caducadas para disco|
| **clickhouse.disk.connections.preserved.count** <br>(count) | Número de conexiones conservadas para disco|
| **clickhouse.disk.connections.preserved.total** <br>(gauge) | Número de conexiones conservadas para disco|
| **clickhouse.disk.connections.reset.count** <br>(count) | Número de conexiones de reinicio del disco|
| **clickhouse.disk.connections.reset.total** <br>(gauge) | Número de conexiones de reinicio del disco|
| **clickhouse.disk.connections.reused.count** <br>(count) | Número de conexiones reutilizadas para disco|
| **clickhouse.disk.connections.reused.total** <br>(gauge) | Número de conexiones reutilizadas para disco|
| **clickhouse.disk.connections.stored** <br>(gauge) | Recuento total de sesiones almacenadas en el grupo de sesiones para discos|
| **clickhouse.disk.read.size.count** <br>(count) | El número de bytes leídos desde discos o dispositivos de bloque durante el último intervalo. No incluye bytes leídos de la caché de página. Puede incluir datos excesivos debido al tamaño del bloque, readahead, etc.<br>_Se muestra como byte_ |
| **clickhouse.disk.read.size.total** <br>(gauge) | El número total de bytes leídos desde discos o dispositivos de bloque. No incluye los bytes leídos de la caché de página. Puede incluir un exceso de datos debido al tamaño del bloque, readahead, etc.<br>_Se muestra como byte_ |
| **clickhouse.disk.write.size.count** <br>(count) | El número de bytes escritos en discos o dispositivos de bloque durante el último intervalo. No incluye bytes que están en páginas sucias de la caché de página. Puede no incluir datos que fueron escritos por el SO de forma asíncrona.<br>_Se muestra como byte_ |
| **clickhouse.disk.write.size.total** <br>(gauge) | El número total de bytes escritos en discos o dispositivos de bloque. No incluye bytes que están en páginas sucias de caché de página. Puede que no incluya datos que fueron escritos por el SO de forma asíncrona.<br>_Se muestra como byte_ |
| **clickhouse.disk_s3.abort_multipart_upload.count** <br>(count) | Número de llamadas a la API AbortMultipartUpload de DiskS3.|
| **clickhouse.disk_s3.abort_multipart_upload.total** <br>(gauge) | Número de llamadas a la API AbortMultipartUpload de DiskS3.|
| **clickhouse.disk_s3.copy_object.count** <br>(count) | Número de llamadas a la API CopyObject de DiskS3.|
| **clickhouse.disk_s3.copy_object.total** <br>(gauge) | Número de llamadas a la API CopyObject de DiskS3.|
| **clickhouse.disk_s3.create_multipart_upload.count** <br>(count) | Número de llamadas a la API CreateMultipartUpload de DiskS3.|
| **clickhouse.disk_s3.create_multipart_upload.total** <br>(gauge) | Número de llamadas a la API CreateMultipartUpload de DiskS3.|
| **clickhouse.disk_s3.delete_object.count** <br>(count) | Número de llamadas a la API DeleteObject(s) de DiskS3.|
| **clickhouse.disk_s3.delete_object.total** <br>(indicador) | Número de llamadas a la API DeleteObject(s) de DiskS3.|
| **clickhouse.disk_s3.get_object.count** <br>(count) | Número de llamadas a la API GetObject de DiskS3.|
| **clickhouse.disk_s3.get_object.total** <br>(gauge) | Número de llamadas a la API GetObject de DiskS3.|
| **clickhouse.disk_s3.get_object_attributes.count** <br>(count) | Número de llamadas a la API GetObjectAttributes de DiskS3.|
| **clickhouse.disk_s3.get_object_attributes.total** <br>(gauge) | Número de llamadas a la API GetObjectAttributes de DiskS3.|
| **clickhouse.disk_s3.get_request.throttler.time** <br>(gauge) | Tiempo total de suspención de una consulta para conformar la limitación de solicitudes GET y SELECT de DiskS3.<br>_Se muestra como microsegundo_ |
| **clickhouse.disk_s3.head_objects.count** <br>(count) | Número de llamadas a la API HeadObject de DiskS3.|
| **clickhouse.disk_s3.head_objects.total** <br>(gauge) | Número de llamadas a la API HeadObject de DiskS3.|
| **clickhouse.disk_s3.list_objects.count** <br>(count) | Número de llamadas a la API ListObjects de DiskS3.|
| **clickhouse.disk_s3.list_objects.total** <br>(gauge) | Número de llamadas a la API ListObjects de DiskS3.|
| **clickhouse.disk_s3.put_object.count** <br>(count) | Número de llamadas a la API PutObject de DiskS3.|
| **clickhouse.disk_s3.put_object.total** <br>(gauge) | Número de llamadas a la API PutObject de DiskS3.|
| **clickhouse.disk_s3.put_request.throttler.time** <br>(gauge) | Tiempo total de suspención de una consulta para ajustarse a la limitación de solicitudes PUT, COPY, POST y LIST de DiskS3.<br>_Se muestra como microsegundo_ |
| **clickhouse.disk_s3.read.requests.count** <br>(count) | Número de solicitudes GET y HEAD al almacenamiento de DiskS3.|
| **clickhouse.disk_s3.read.requests.errors.count** <br>(count) | Número de errores no limitantes en solicitudes GET y HEAD al almacenamiento de DiskS3.|
| **clickhouse.disk_s3.read.requests.errors.total** <br>(gauge) | Número de errores no limitantes en solicitudes GET y HEAD al almacenamiento de DiskS3.|
| **clickhouse.disk_s3.read.requests.redirects.count** <br>(count) | Número de redireccionamientos en solicitudes GET y HEAD al almacenamiento de DiskS3.|
| **clickhouse.disk_s3.read.requests.redirects.total** <br>(gauge) | Número de redireccionamientos en solicitudes GET y HEAD al almacenamiento de DiskS3.|
| **clickhouse.disk_s3.read.requests.throttling.count** <br>(count) | Número de errores 429 y 503 en solicitudes GET y HEAD al almacenamiento de DiskS3.|
| **clickhouse.disk_s3.read.requests.throttling.total** <br>(gauge) | Número de errores 429 y 503 en solicitudes GET y HEAD al almacenamiento de DiskS3.|
| **clickhouse.disk_s3.read.requests.total** <br>(gauge) | Número de solicitudes GET y HEAD al almacenamiento de DiskS3.|
| **clickhouse.disk_s3.read.time** <br>(gauge) | Tiempo de las solicitudes GET y HEAD al almacenamiento de DiskS3.<br>_Se muestra en microsegundos_ |
| **clickhouse.disk_s3.upload_part.count** <br>(count) | Número de llamadas a la API UploadPart de DiskS3.|
| **clickhouse.disk_s3.upload_part.total** <br>(gauge) | Número de llamadas a la API UploadPart de DiskS3.|
| **clickhouse.disk_s3.upload_part_copy.count** <br>(count) | Número de llamadas a la API UploadPartCopy de DiskS3.|
| **clickhouse.disk_s3.upload_part_copy.total** <br>(gauge) | Número de llamadas a la API UploadPartCopy de DiskS3.|
| **clickhouse.disk_s3.write.requests.count** <br>(count) | Número de solicitudes POST, DELETE, PUT y PATCH al almacenamiento de DiskS3.|
| **clickhouse.disk_s3.write.requests.errors.count** <br>(count) | Número de errores no limitantes en solicitudes POST, DELETE, PUT y PATCH al almacenamiento de DiskS3.|
| **clickhouse.disk_s3.write.requests.errors.total** <br>(gauge) | Número de errores no limitantes en solicitudes POST, DELETE, PUT y PATCH al almacenamiento de DiskS3.|
| **clickhouse.disk_s3.write.requests.redirects.count** <br>(count) | Número de redirecciones en solicitudes POST, DELETE, PUT y PATCH al almacenamiento de DiskS3.|
| **clickhouse.disk_s3.write.requests.redirects.total** <br>(gauge) | Número de redirecciones en solicitudes POST, DELETE, PUT y PATCH al almacenamiento de DiskS3.|
| **clickhouse.disk_s3.write.requests.total** <br>(gauge) | Número de solicitudes POST, DELETE, PUT y PATCH al almacenamiento de DiskS3.|
| **clickhouse.disk_s3.write.time** <br>(gauge) | Tiempo de las solicitudes POST, DELETE, PUT y PATCH al almacenamiento de DiskS3.<br>_Se muestra en microsegundos_ |
| **clickhouse.distributed.connection.fail_at_all.count** <br>(count) | Recuento cuando la conexión distribuida falla después de todos los reintentos terminados<br>_Se muestra como conexión_ |
| **clickhouse.distributed.connection.fail_at_all.total** <br>(gauge) | Recuento total cuando la conexión distribuida falla después de que todos los reintentos hayan finalizado<br>_Se muestra como conexión_ |
| **clickhouse.distributed.connection.fail_try.count** <br>(count) | Recuento cuando la conexión distribuida falla con reintento<br>_Se muestra como conexión_ |
| **clickhouse.distributed.connection.fail_try.total** <br>(gauge) | Recuento total cuando la conexión distribuida falla con reintento<br>_Se muestra como conexión_ |
| **clickhouse.distributed.connection.successful.count** <br>(count) | Recuento total de conexiones distribuidas con éxito a un servidor utilizable (con la tabla requerida, pero puede ser obsoleta).|
| **clickhouse.distributed.connection.successful.total** <br>(gauge) | Recuento total de conexiones distribuidas con éxito a un servidor utilizable (con la tabla requerida, pero puede ser obsoleta).|
| **clickhouse.distributed.connection.tries.count** <br>(count) | Recuento total de intentos de conexión distribuida.|
| **clickhouse.distributed.connection.tries.total** <br>(gauge) | Recuento total de intentos de conexión distribuida.|
| **clickhouse.distributed.delayed.inserts.time** <br>(gauge) | Número total de milisegundos transcurridos mientras se aceleraba la acción INSERT de un bloque en una tabla distribuida debido al elevado número de bytes pendientes.<br>_Se muestra como microsegundo_ |
| **clickhouse.distributed.inserts.delayed.count** <br>(count) | Número de veces que el INSERT de un bloque en una tabla distribuida se ha ralentizado debido al elevado número de bytes pendientes.<br>_Se muestra como consulta_ |
| **clickhouse.distributed.inserts.delayed.total** <br>(gauge) | Número total de veces que el INSERT de un bloque en una tabla distribuida se ha ralentizado debido al elevado número de bytes pendientes.<br>_Se muestra como consulta_ |
| **clickhouse.distributed.inserts.rejected.count** <br>(count) | Número de veces que el INSERT de un bloque a una tabla distribuida se rechazó con la excepción "Demasiados bytes" debido al elevado número de bytes pendientes.<br>_Se muestra como consulta_ |
| **clickhouse.distributed.inserts.rejected.total** <br>(gauge) | Número total de veces que el INSERT de un bloque a una tabla distribuida fue rechazado con la excepción 'Demasiados bytes' debido al elevado número de bytes pendientes.<br>_Se muestra como consulta_ |
| **clickhouse.distributed_cache.clickhouse_server.connections.open** <br>(gauge) | Número de conexiones abiertas al servidor ClickHouse desde la caché distribuida|
| **clickhouse.distributed_cache.connections.open.total** <br>(gauge) | Número de conexiones abiertas a la caché distribuida|
| **clickhouse.distributed_cache.connections.open.used** <br>(gauge) | Número de conexiones utilizadas actualmente a la caché distribuida|
| **clickhouse.distributed_cache.read.requests** <br>(gauge) | Número de solicitudes de lectura ejecutadas a la caché distribuida|
| **clickhouse.distributed_cache.write.requests** <br>(gauge) | Número de solicitudes de escritura ejecutadas en la caché distribuida|
| **clickhouse.drained_connections.async** <br>(gauge) | Número de conexiones vaciadas de forma asíncrona.<br>_Se muestra como conexión_ |
| **clickhouse.drained_connections.async.active** <br>(gauge) | Número de conexiones activas vaciadas de forma asíncrona.<br>_Se muestra como conexión_ |
| **clickhouse.drained_connections.sync** <br>(gauge) | Número de conexiones vaciadas sincrónicamente.<br>_Se muestra como conexión_ |
| **clickhouse.drained_connections.sync.active** <br>(gauge) | Número de conexiones activas vaciadas sincrónicamente.<br>_Se muestra como conexión_ |
| **clickhouse.error.dns.count** <br>(count) |  Número de errores en la resolución DNS<br>_Se muestra como error_ |
| **clickhouse.error.dns.total** <br>(gauge) | Recuento total de errores en la resolución DNS<br>_Se muestra como error_ |
| **clickhouse.file.open.count** <br>(count) | El número de archivos abiertos durante el último intervalo.<br>_Se muestra como archivo_ |
| **clickhouse.file.open.read** <br>(gauge) | El número de archivos abiertos para lectura<br>_Se muestra como archivo_ |
| **clickhouse.file.open.total** <br>(gauge) | El número total de archivos abiertos.<br>_Se muestra como archivo_ |
| **clickhouse.file.open.write** <br>(gauge) | El número de archivos abiertos para escribir<br>_Se muestra como archivo_ |
| **clickhouse.file.read.count** <br>(count) | Número de lecturas (read/pread) de un descriptor de archivo durante el último intervalo. No incluye sockets.<br>_Se muestra como lectura_ |
| **clickhouse.file.read.fail.count** <br>(count) | El número de veces que ha fallado la lectura (read/pread) de un descriptor de archivo durante el último intervalo.<br>_Se muestra como lectura_ |
| **clickhouse.file.read.fail.total** <br>(gauge) | El número total de veces que ha fallado la lectura (read/pread) de un descriptor de archivo.<br>_Se muestra como lectura_ |
| **clickhouse.file.read.size.count** <br>(count) | El número de bytes leídos de los descriptores de archivo durante el último intervalo. Si el archivo está comprimido, mostrará el tamaño de los datos comprimidos.<br>_Se muestra como byte_ |
| **clickhouse.file.read.size.total** <br>(gauge) | El número total de bytes leídos de los descriptores de archivo. Si el archivo está comprimido, mostrará el tamaño de los datos comprimidos.<br>_Se muestra como byte_ |
| **clickhouse.file.read.slow.count** <br>(count) | El número de lecturas de un archivo que fueron lentas durante el último intervalo. Esto indica una sobrecarga del sistema. Los umbrales se controlan mediante la configuración de read_backoff\_\*.<br>_Se muestra como lectura_ |
| **clickhouse.file.read.slow.total** <br>(gauge) | El número total de lecturas de un archivo que fueron lentas. Esto indica una sobrecarga del sistema. Los umbrales se controlan mediante la configuración de read_backoff\_\*.<br>_Se muestra como lectura_ |
| **clickhouse.file.read.total** <br>(gauge) | El número total de lecturas (read/pread) de un descriptor de archivo. No incluye sockets.<br>_Se muestra como lectura_ |
| **clickhouse.file.seek.count** <br>(count) | El número de veces que se ha llamado a la función `lseek` durante el último intervalo.<br>_Se muestra como operación_ |
| **clickhouse.file.seek.total** <br>(gauge) | El número total de veces que se ha llamado a la función `lseek`.<br>_Se muestra como operación_ |
| **clickhouse.file.write.count** <br>(count) | Número de escrituras (write/pwrite) en un descriptor de archivo durante el último intervalo. No incluye sockets.<br>_Se muestra como escritura_ |
| **clickhouse.file.write.fail.count** <br>(count) | El número de veces que ha fallado la escritura (write/pwrite) en un descriptor de archivo durante el último intervalo.<br>_Se muestra como escritura_ |
| **clickhouse.file.write.fail.total** <br>(gauge) | El número total de veces que ha fallado la escritura (write/pwrite) en un descriptor de archivo.<br>_Se muestra como escritura_ |
| **clickhouse.file.write.size.count** <br>(count) | El número de bytes escritos en los descriptores de archivo durante el último intervalo. Si el archivo está comprimido, mostrará el tamaño de los datos comprimidos.<br>_Se muestra como byte_ |
| **clickhouse.file.write.size.total** <br>(gauge) | El número total de bytes escritos en los descriptores de archivo durante el último intervalo. Si el archivo está comprimido, mostrará el tamaño de los datos comprimidos.<br>_Se muestra como byte_ |
| **clickhouse.file.write.total** <br>(gauge) | El número total de escrituras (write/pwrite) en un descriptor de archivo. No incluye sockets.<br>_Se muestra como escritura_ |
| **clickhouse.file_segment.cache.complete.time** <br>(gauge) | Duración de FileSegment::complete() en la caché del sistema de archivos<br>_Se muestra como microsegundo_ |
| **clickhouse.file_segment.cache.predownload.time** <br>(gauge) | Métrica por segmento de archivo. Tiempo empleado en predescargar datos en la caché (predescarga; finalización de la descarga del segmento de archivo (después de que alguien no lo haya hecho) hasta el punto en que se solicitó al subproceso actual que lo hiciera)<br>_Se muestra como microsegundo_ |
| **clickhouse.file_segment.cache.write.time** <br>(gauge) | Métrica por segmento de archivo. Tiempo empleado en escribir datos en la caché<br>_Se muestra en microsegundos_ |
| **clickhouse.file_segment.download.wait_time.count** <br>(count) | Espera en estado DOWNLOADING|
| **clickhouse.file_segment.download.wait_time.total** <br>(gauge) | Espera en estado DOWNLOADING|
| **clickhouse.file_segment.holder.complete.time** <br>(gauge) | Tiempo complete() del propietario de segmentos de archivo<br>_Se muestra como microsegundo_ |
| **clickhouse.file_segment.lock.time** <br>(gauge) | Tiempo de segmento de archivo de bloqueo<br>_Se muestra en microsegundos_ |
| **clickhouse.file_segment.read.time** <br>(gauge) | Métrica por segmento de archivo. Tiempo de lectura del archivo<br>_Se muestra en microsegundos_ |
| **clickhouse.file_segment.remove.time** <br>(gauge) | Tiempo remove() del segmento de archivo<br>_Se muestra como microsegundo_ |
| **clickhouse.file_segment.use.bytes.count** <br>(count) | Métrica por segmento de archivo. Cuántos bytes se utilizaron realmente del segmento de archivo actual.|
| **clickhouse.file_segment.use.bytes.total** <br>(gauge) | Métrica por segmento de archivo. Cuántos bytes se utilizaron realmente del segmento de archivo actual.|
| **clickhouse.file_segment.use.time** <br>(gauge) | Tiempo use() del segmento de archivo<br>_Se muestra como microsegundo_ |
| **clickhouse.file_segment.write.timex.count** <br>(count) | Tiempo write() del segmento de archivo|
| **clickhouse.file_segment.write.timex.total** <br>(gauge) | Tiempo write() del segmento de archivo|
| **clickhouse.filesystem.cache.buffers.active** <br>(gauge) | Número de búferes de caché activos<br>_Se muestra como búfer_ |
| **clickhouse.filesystem.cache.cleanup.queue** <br>(gauge) | Elementos de la caché del sistema de archivos en la cola de limpieza en segundo plano|
| **clickhouse.filesystem.cache.download.queue** <br>(gauge) | Elementos de caché del sistema de archivos en la cola de descarga|
| **clickhouse.filesystem.cache.elements** <br>(gauge) | Elementos de caché del sistema de archivos (segmentos de archivos)|
| **clickhouse.filesystem.cache.eviction.bytes.count** <br>(count) | Número de bytes vaciados de la caché del sistema de archivos|
| **clickhouse.filesystem.cache.eviction.bytes.total** <br>(gauge) | Número de bytes vaciados de la caché del sistema de archivos|
| **clickhouse.filesystem.cache.eviction.time** <br>(gauge) | Tiempo de vaciado de la caché del sistema de archivos<br>_Se muestra en microsegundos_ |
| **clickhouse.filesystem.cache.filesegments.hold** <br>(gauge) | Recuento de segmentos de archivos de caché del sistema de archivos, que fueron retenidos|
| **clickhouse.filesystem.cache.get.time** <br>(gauge) | Tiempo get() de la caché del sistema de archivos<br>_Se muestra como microsegundo_ |
| **clickhouse.filesystem.cache.get_set.time** <br>(gauge) | Tiempo getOrSet() de la caché del sistema de archivos<br>_Se muestra como microsegundo_ |
| **clickhouse.filesystem.cache.limit** <br>(gauge) | Límite de tamaño de la caché del sistema de archivos en bytes|
| **clickhouse.filesystem.cache.lock.key.time** <br>(gauge) | Tiempo de la clave de bloqueo de la caché<br>_Se muestra como microsegundo_ |
| **clickhouse.filesystem.cache.lock.metadata.time** <br>(gauge) | Tiempo de metadatos de la caché del sistema de archivos de bloqueo<br>_Se muestra como microsegundo_ |
| **clickhouse.filesystem.cache.lock.time** <br>(gauge) | Tiempo de caché del sistema de archivos de bloqueo<br>_Se muestra en microsegundos_ |
| **clickhouse.filesystem.cache.metadata.load.time** <br>(gauge) | Tiempo empleado en cargar los metadatos de la caché del sistema de archivos<br>_Se muestra en microsegundos_ |
| **clickhouse.filesystem.cache.reserve.time** <br>(gauge) | Tiempo de reserva de espacio en la caché del sistema de archivos<br>_Se muestra en microsegundos_ |
| **clickhouse.filesystem.cache.size** <br>(gauge) | Tamaño de la caché del sistema de archivos en bytes|
| **clickhouse.filesystem.remote.aysnc.read.prefetches.count** <br>(count) | Número de precargas realizadas con lectura asíncrona del sistema de archivos remoto|
| **clickhouse.filesystem.remote.aysnc.read.prefetches.total** <br>(gauge) | Número de precargas realizadas con lectura asíncrona del sistema de archivos remoto|
| **clickhouse.filesystem.remote.buffer.seeks.count** <br>(count) | Número total de búsquedas del búfer asíncrono|
| **clickhouse.filesystem.remote.buffer.seeks.reset.count** <br>(count) | Número de búsquedas que conducen a una nueva conexión|
| **clickhouse.filesystem.remote.buffer.seeks.reset.total** <br>(gauge) | Número de búsquedas que conducen a una nueva conexión|
| **clickhouse.filesystem.remote.buffer.seeks.total** <br>(gauge) | Número total de búsquedas del búfer asíncrono|
| **clickhouse.filesystem.remote.buffers.count** <br>(count) | Número de búferes creados para la lectura asíncrona del sistema de archivos remoto|
| **clickhouse.filesystem.remote.buffers.total** <br>(gauge) | Número de búferes creados para la lectura asíncrona del sistema de archivos remoto|
| **clickhouse.filesystem.remote.lazy_seeks.count** <br>(count) | Número de búsquedas lentas|
| **clickhouse.filesystem.remote.lazy_seeks.total** <br>(gauge) | Número de búsquedas lentas|
| **clickhouse.filesystem.remote.prefetched.reads.count** <br>(count) | Número de lecturas del búfer buscadas anteriormente|
| **clickhouse.filesystem.remote.prefetched.reads.total** <br>(gauge) | Número de lecturas del búfer buscadas anteriormente|
| **clickhouse.filesystem.remote.prefetched.size.count** <br>(count) | Número de bytes del búfer buscado anteriormente|
| **clickhouse.filesystem.remote.prefetched.size.total** <br>(gauge) | Número de bytes del búfer buscado anteriormente|
| **clickhouse.filesystem.remote.prefetches.pending.count** <br>(count) | Número de precargas pendientes en el momento de la destrucción del búfer|
| **clickhouse.filesystem.remote.prefetches.pending.total** <br>(gauge) | Número de precargas pendientes en el momento de la destrucción del búfer|
| **clickhouse.filesystem.remote.unprefetched.size.count** <br>(count) | Número de bytes del búfer precargado|
| **clickhouse.filesystem.remote.unprefetched.size.total** <br>(gauge) | Número de bytes del búfer no precargado|
| **clickhouse.fs.read.size.count** <br>(count) | Número de bytes leídos del sistema de archivos (incluida la caché de página) durante el último intervalo.<br>_Se muestra como byte_ |
| **clickhouse.fs.read.size.total** <br>(gauge) | Número total de bytes leídos del sistema de archivos (incluida la caché de página).<br>_Se muestra como byte_ |
| **clickhouse.fs.write.size.count** <br>(count) | Número de bytes escritos en el sistema de archivos (incluida la caché de página) durante el último intervalo.<br>_Se muestra como byte_ |
| **clickhouse.fs.write.size.total** <br>(gauge) | Número total de bytes escritos en el sistema de archivos (incluida la caché de página).<br>_Se muestra como byte_ |
| **clickhouse.function.filesync.count** <br>(count) | Número de veces que se ha llamado a la función F_FULLFSYNC/fsync/fdatasync para archivos.|
| **clickhouse.function.filesync.time** <br>(gauge) | Tiempo total de espera de F_FULLFSYNC/fsync/fdatasync syscall para archivos.<br>_Se muestra como microsegundo_ |
| **clickhouse.function.filesync.total** <br>(gauge) | Número de veces que se ha llamado a la función F_FULLFSYNC/fsync/fdatasync para archivos.|
| **clickhouse.hash_table.elements.allocated.aggregation.count** <br>(count) | Cuántos elementos se preasignaron en tablas hash para la agregación.|
| **clickhouse.hash_table.elements.allocated.aggregation.total** <br>(gauge) | Cuántos elementos se preasignaron en tablas hash para la agregación.|
| **clickhouse.http_connection.addresses.expired.count** <br>(count) | Recuento total de direcciones caducadas que ya no se presentan en los resultados de resolución dns para conexiones http|
| **clickhouse.http_connection.addresses.expired.total** <br>(gauge) | Recuento total de direcciones caducadas que ya no se presentan en los resultados de resolución dns para conexiones http|
| **clickhouse.http_connection.addresses.faulty.count** <br>(count) | Recuento total de direcciones que se han marcado como defectuosas debido a errores de conexión para conexiones http|
| **clickhouse.http_connection.addresses.faulty.total** <br>(gauge) | Recuento total de direcciones que se han marcado como defectuosas debido a errores de conexión para conexiones http|
| **clickhouse.http_connection.addresses.new.count** <br>(count) | Recuento total de nuevas direcciones en los resultados de resolución dns para conexiones http|
| **clickhouse.http_connection.addresses.new.total** <br>(gauge) | Recuento total de nuevas direcciones en los resultados de resolución dns para conexiones http|
| **clickhouse.index.usearch.distance.compute.count** <br>(count) | Número de veces que se ha calculado la distancia al añadir vectores a los índices de usearch.|
| **clickhouse.index.usearch.distance.compute.total** <br>(gauge) | Número de veces que se ha calculado la distancia al añadir vectores a los índices de usearch.|
| **clickhouse.index.usearch.search.node.visit.count** <br>(count) | Número de nodos visitados al buscar en índices usearch.|
| **clickhouse.index.usearch.search.node.visit.total** <br>(gauge) | Número de nodos visitados al buscar en índices usearch.|
| **clickhouse.index.usearch.search.operation.count** <br>(count) | Número de operaciones de búsqueda realizadas en los índices usearch.|
| **clickhouse.index.usearch.search.operation.total** <br>(gauge) | Número de operaciones de búsqueda realizadas en los índices usearch.|
| **clickhouse.index.usearch.vector.add.count** <br>(count) | Número de vectores añadidos a los índices de usearch.|
| **clickhouse.index.usearch.vector.add.total** <br>(gauge) | Número de vectores añadidos a los índices de usearch.|
| **clickhouse.index.usearch.vector.node.visit.count** <br>(count) | Número de nodos visitados al añadir vectores a los índices usearch.|
| **clickhouse.index.usearch.vector.node.visit.total** <br>(gauge) | Número de nodos visitados al añadir vectores a los índices usearch.|
| **clickhouse.insert.query.time** <br>(gauge) | Tiempo total de las consultas INSERT.<br>_Se muestra en microsegundos_ |
| **clickhouse.insert_queue.async.size** <br>(gauge) | Número de bytes pendientes en la cola AsynchronousInsert.|
| **clickhouse.insert_queue.async.total** <br>(gauge) | Número de tareas pendientes en la cola AsynchronousInsert.|
| **clickhouse.insert_threads.async.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos AsynchronousInsert que ejecutan una tarea.|
| **clickhouse.insert_threads.async.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos AsynchronousInsert.|
| **clickhouse.insert_threads.async.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de AsynchronousInsert.|
| **clickhouse.inserts.async.flush.pending** <br>(gauge) | Número de inserciones asíncronas en espera de descarga.|
| **clickhouse.interface.http.received.bytes.count** <br>(count) | Número de bytes recibidos a través de interfaces HTTP|
| **clickhouse.interface.http.received.bytes.total** <br>(gauge) | Número de bytes recibidos a través de interfaces HTTP|
| **clickhouse.interface.http.sent.bytes.count** <br>(count) | Número de bytes enviados a través de interfaces HTTP|
| **clickhouse.interface.http.sent.bytes.total** <br>(gauge) | Número de bytes enviados a través de interfaces HTTP|
| **clickhouse.interface.mysql.received.bytes.count** <br>(count) | Número de bytes recibidos a través de las interfaces MySQL |
| **clickhouse.interface.mysql.received.bytes.total** <br>(gauge) | Número de bytes recibidos a través de las interfaces MySQL |
| **clickhouse.interface.mysql.sent.bytes.count** <br>(count) | Número de bytes enviados a través de las interfaces MySQL |
| **clickhouse.interface.mysql.sent.bytes.total** <br>(gauge) | Número de bytes enviados a través de las interfaces MySQL |
| **clickhouse.interface.native.received.bytes.count** <br>(count) | Número de bytes recibidos a través de interfaces nativas|
| **clickhouse.interface.native.received.bytes.total** <br>(gauge) | Número de bytes recibidos a través de interfaces nativas|
| **clickhouse.interface.native.sent.bytes.count** <br>(count) | Número de bytes enviados a través de interfaces nativas|
| **clickhouse.interface.native.sent.bytes.total** <br>(gauge) | Número de bytes enviados a través de interfaces nativas|
| **clickhouse.interface.postgresql.sent.bytes.count** <br>(count) | Número de bytes enviados a través de las interfaces PostgreSQL|
| **clickhouse.interface.postgresql.sent.bytes.total** <br>(gauge) | Número de bytes enviados a través de las interfaces PostgreSQL|
| **clickhouse.interface.prometheus.sent.bytes.count** <br>(count) | Número de bytes enviados a través de las interfaces de Prometheus|
| **clickhouse.interface.prometheus.sent.bytes.total** <br>(gauge) | Número de bytes enviados a través de las interfaces de Prometheus|
| **clickhouse.io_buffer.allocated.bytes.count** <br>(count) | Número de bytes asignados a los búferes de E/S (para ReadBuffer/WriteBuffer).<br>_Se muestra como byte_ |
| **clickhouse.io_buffer.allocated.bytes.total** <br>(gauge) | Número de bytes asignados a los búferes de E/S (para ReadBuffer/WriteBuffer).<br>_Se muestra como byte_ |
| **clickhouse.io_buffer.allocated.count** <br>(count) | Número de asignaciones de búferes de E/S (para ReadBuffer/WriteBuffer).|
| **clickhouse.io_buffer.allocated.total** <br>(gauge) | Número de asignaciones de búferes de E/S (para ReadBuffer/WriteBuffer).|
| **clickhouse.io_uring.cqe.completed.count** <br>(count) | Número total de CQEs de io_uring completados con éxito|
| **clickhouse.io_uring.cqe.completed.total** <br>(gauge) | Número total de CQEs de io_uring completados con éxito|
| **clickhouse.io_uring.cqe.failed.count** <br>(count) | Número total de CQE io_uring completados con fallos|
| **clickhouse.io_uring.cqe.failed.total** <br>(gauge) | Número total de CQE io_uring completados con fallos|
| **clickhouse.io_uring.sqe.resubmitted.count** <br>(count) | Número total de reenvíos io_uring SQE realizados|
| **clickhouse.io_uring.sqe.resubmitted.total** <br>(gauge) | Número total de reenvíos io_uring SQE realizados|
| **clickhouse.io_uring.sqe.submitted.count** <br>(count) | Número total de SQEs de io_uring presentados|
| **clickhouse.io_uring.sqe.submitted.total** <br>(gauge) | Número total de SQEs de io_uring presentados|
| **clickhouse.jemalloc.active** <br>(gauge) | (EXPERIMENTAL)<br>_Se muestra como byte_ |
| **clickhouse.jemalloc.allocated** <br>(gauge) | La cantidad de memoria asignada por ClickHouse.<br>_Se muestra como byte_ |
| **clickhouse.jemalloc.background_thread.num_runs** <br>(gauge) | (EXPERIMENTAL)<br>_Se muestra como byte_ |
| **clickhouse.jemalloc.background_thread.num_threads** <br>(gauge) | (EXPERIMENTAL)<br>_Se muestra como subproceso_ |
| **clickhouse.jemalloc.background_thread.run_interval** <br>(gauge) | (EXPERIMENTAL)<br>_Se muestra como byte_ |
| **clickhouse.jemalloc.mapped** <br>(gauge) | La cantidad de memoria en extensiones activas asignadas por el asignador.<br>_Se muestra como byte_ |
| **clickhouse.jemalloc.metadata** <br>(gauge) | La cantidad de memoria dedicada a los metadatos, que comprenden las asignaciones base utilizadas para las estructuras de metadatos del asignador sensibles al arranque y las asignaciones internas.<br>_Se muestra como byte_ |
| **clickhouse.jemalloc.metadata_thp** <br>(gauge) | (EXPERIMENTAL)<br>_Se muestra como byte_ |
| **clickhouse.jemalloc.resident** <br>(gauge) | La cantidad de memoria en páginas de datos residentes físicamente asignadas por el asignador, incluidas todas las páginas dedicadas a metadatos del asignador, las páginas que respaldan asignaciones activas y las páginas sucias no utilizadas.<br>_Se muestra como byte_ |
| **clickhouse.jemalloc.retained** <br>(gauge) | La cantidad de memoria en asignaciones de memoria virtual que se conservaron en lugar de devolverse al sistema operativo.<br>_Se muestra como byte_ |
| **clickhouse.kafka.background.reads** <br>(gauge) | Número de lecturas en segundo plano actualmente en funcionamiento (rellenando vistas materializadas desde Kafka)<br>_Se muestra como lectura_ |
| **clickhouse.kafka.background.reads.count** <br>(count) | Número de lecturas en segundo plano actualmente en funcionamiento (rellenando vistas materializadas desde Kafka)|
| **clickhouse.kafka.background.reads.total** <br>(gauge) | Número de lecturas en segundo plano actualmente en funcionamiento (rellenando vistas materializadas desde Kafka)|
| **clickhouse.kafka.commit.failed.count** <br>(count) | Número de commits fallidas de desplazamientos consumidos a Kafka (normalmente es señal de alguna duplicación de datos)|
| **clickhouse.kafka.commit.failed.total** <br>(gauge) | Número de commits fallidas de desplazamientos consumidos a Kafka (normalmente es señal de alguna duplicación de datos)|
| **clickhouse.kafka.commit.success.count** <br>(count) | Número de commits con éxito de desplazamientos consumidos a Kafka (normalmente debería ser el mismo que KafkaBackgroundReads)|
| **clickhouse.kafka.commit.success.total** <br>(gauge) | Número de commits con éxito de desplazamientos consumidos a Kafka (normalmente debería ser el mismo que KafkaBackgroundReads)|
| **clickhouse.kafka.consumer.errors.count** <br>(count) | Número de errores notificados por librdkafka durante los sondeos|
| **clickhouse.kafka.consumer.errors.total** <br>(gauge) | Número de errores notificados por librdkafka durante los sondeos|
| **clickhouse.kafka.consumers.active** <br>(gauge) | Número de consumidores de Kafka activos|
| **clickhouse.kafka.consumers.assigned** <br>(gauge) | Número de consumidores de Kafka activos que tienen asignadas algunas particiones.|
| **clickhouse.kafka.consumers.in_use** <br>(gauge) | Número de consumidores que utilizan actualmente lecturas directas o en segundo plano|
| **clickhouse.kafka.direct.read.count** <br>(count) | Número de selecciones directas de tablas de Kafka desde el inicio del servidor|
| **clickhouse.kafka.direct.read.total** <br>(gauge) | Número de selecciones directas de tablas de Kafka desde el inicio del servidor|
| **clickhouse.kafka.inserts.running** <br>(gauge) | Número de escrituras (inserts) en las tablas de Kafka <br>_Se muestra como escritura_ |
| **clickhouse.kafka.messages.failed.count** <br>(count) | Número de mensajes de Kafka que ClickHouse no ha podido analizar|
| **clickhouse.kafka.messages.failed.total** <br>(gauge) | Número de mensajes de Kafka que ClickHouse no ha podido analizar|
| **clickhouse.kafka.messages.polled.count** <br>(count) | Número de mensajes de Kafka sondeados desde librdkafka a ClickHouse|
| **clickhouse.kafka.messages.polled.total** <br>(gauge) | Número de mensajes de Kafka sondeados desde librdkafka a ClickHouse|
| **clickhouse.kafka.messages.produced.count** <br>(count) | Número de mensajes enviados a Kafka|
| **clickhouse.kafka.messages.produced.total** <br>(gauge) | Número de mensajes enviados a Kafka|
| **clickhouse.kafka.messages.read.count** <br>(count) | Número de mensajes de Kafka ya procesados por ClickHouse|
| **clickhouse.kafka.messages.read.total** <br>(gauge) | Número de mensajes de Kafka ya procesados por ClickHouse|
| **clickhouse.kafka.partitions.assigned** <br>(gauge) | Número de particiones a las que están asignadas actualmente las tablas de Kafka|
| **clickhouse.kafka.producer.errors.count** <br>(count) | Número de errores durante la producción de los mensajes a Kafka|
| **clickhouse.kafka.producer.errors.total** <br>(gauge) | Número de errores durante la producción de los mensajes a Kafka|
| **clickhouse.kafka.producer.flushes.count** <br>(count) | Número de descargas explícitas al productor de Kafka|
| **clickhouse.kafka.producer.flushes.total** <br>(gauge) | Número de descargas explícitas al productor de Kafka|
| **clickhouse.kafka.producers.active** <br>(gauge) | Número de productores de Kafka activos creados|
| **clickhouse.kafka.rebalance.assignments.count** <br>(count) | Número de asignaciones de particiones (la fase final del reequilibrio de grupos de consumidores)|
| **clickhouse.kafka.rebalance.assignments.total** <br>(gauge) | Número de asignaciones de particiones (la fase final del reequilibrio de grupos de consumidores)|
| **clickhouse.kafka.rebalance.errors.count** <br>(count) | Número de reequilibrios fallidos de grupos de consumidores|
| **clickhouse.kafka.rebalance.errors.total** <br>(gauge) | Número de reequilibrios fallidos de grupos de consumidores|
| **clickhouse.kafka.rebalance.revocations.count** <br>(count) | Número de revocaciones de particiones (la primera fase de reequilibrio de grupos de consumidores)|
| **clickhouse.kafka.rebalance.revocations.total** <br>(gauge) | Número de revocaciones de particiones (la primera fase de reequilibrio de grupos de consumidores)|
| **clickhouse.kafka.rows.read.count** <br>(count) | Número de filas analizadas a partir de mensajes de Kafka|
| **clickhouse.kafka.rows.read.total** <br>(gauge) | Número de filas analizadas a partir de mensajes de Kafka|
| **clickhouse.kafka.rows.rejected.count** <br>(count) | Número de filas analizadas que fueron rechazadas posteriormente (debido a reequilibrios/errores o razones similares). Esas filas se volverán a consumir tras el reequilibrio.|
| **clickhouse.kafka.rows.rejected.total** <br>(gauge) | Número de filas analizadas que fueron rechazadas posteriormente (debido a reequilibrios/errores o razones similares). Esas filas se volverán a consumir tras el reequilibrio.|
| **clickhouse.kafka.rows.written.count** <br>(count) | Número de filas insertadas en las tablas de Kafka|
| **clickhouse.kafka.rows.written.total** <br>(gauge) | Número de filas insertadas en las tablas de Kafka|
| **clickhouse.kafkta.table.writes.count** <br>(count) | Número de escrituras (inserts) en tablas de Kafka|
| **clickhouse.kafkta.table.writes.total** <br>(gauge) | Número de escrituras (inserts) en tablas de Kafka|
| **clickhouse.keeper.cache.hit.count** <br>(count) | Número de veces que se ha respondido a una solicitud de metadatos de almacenamiento de objetos desde la caché sin realizar la solicitud al Keeper.|
| **clickhouse.keeper.cache.hit.total** <br>(gauge) | Número de veces que se ha respondido a una solicitud de metadatos de almacenamiento de objetos desde la caché sin realizar la solicitud al Keeper.|
| **clickhouse.keeper.cache.miss.count** <br>(count) | Número de veces que Keeper ha tenido que responder a una solicitud de metadatos de almacenamiento de objetos|
| **clickhouse.keeper.cache.miss.total** <br>(gauge) | Número de veces que Keeper ha tenido que responder a una solicitud de metadatos de almacenamiento de objetos|
| **clickhouse.keeper.cache.update.time** <br>(gauge) | Tiempo total empleado en actualizar la caché, incluida la espera de respuestas de Keeper<br>_Se muestra en microsegundos_ |
| **clickhouse.keeper.check.requests.count** <br>(count) | Número de solicitudes de check|
| **clickhouse.keeper.check.requests.total** <br>(gauge) | Número de solicitudes de check|
| **clickhouse.keeper.commits.count** <br>(count) | Número de commits correctas|
| **clickhouse.keeper.commits.failed.count** <br>(count) | Número de commits fallidas|
| **clickhouse.keeper.commits.failed.total** <br>(gauge) | Número de commits fallidas|
| **clickhouse.keeper.commits.total** <br>(gauge) | Número de commits correctas|
| **clickhouse.keeper.create.requests.count** <br>(count) | Número de solicitudes create|
| **clickhouse.keeper.create.requests.total** <br>(gauge) | Número de solicitudes create|
| **clickhouse.keeper.exists.requests.count** <br>(count) | Número de solicitudes exists|
| **clickhouse.keeper.exists.requests.total** <br>(gauge) | Número de solicitudes exists|
| **clickhouse.keeper.get.requests.count** <br>(count) | Número de solicitudes get|
| **clickhouse.keeper.get.requests.total** <br>(indicador) | Número de solicitudes get|
| **clickhouse.keeper.latency.count** <br>(count) | Latencia del Keeper|
| **clickhouse.keeper.latency.total** <br>(gauge) | Latencia del Keeper|
| **clickhouse.keeper.list.requests.count** <br>(count) | Número de solicitudes lists|
| **clickhouse.keeper.list.requests.total** <br>(gauge) | Número de solicitudes lists|
| **clickhouse.keeper.log_entry.file.prefetched.count** <br>(count) | Número de entradas de log en el Keeper que se precargan desde el archivo changelog |
| **clickhouse.keeper.log_entry.file.prefetched.total** <br>(gauge) | Número de entradas de log en el Keeper que se precargan desde el archivo changelog |
| **clickhouse.keeper.log_entry.file.read.count** <br>(count) | Número de entradas de log en el Keeper que se leen directamente del archivo changelog |
| **clickhouse.keeper.log_entry.file.read.total** <br>(gauge) | Número de entradas de log en el Keeper que se leen directamente del archivo changelog |
| **clickhouse.keeper.multi.requests.count** <br>(count) | Número de solicitudes multi|
| **clickhouse.keeper.multi.requests.total** <br>(gauge) | Número de solicitudes multi|
| **clickhouse.keeper.multi_read.requests.count** <br>(count) | Número de solicitudes multi read|
| **clickhouse.keeper.multi_read.requests.total** <br>(gauge) | Número de solicitudes multi read|
| **clickhouse.keeper.packets.received.count** <br>(count) | Paquetes recibidos por el servidor del keeper|
| **clickhouse.keeper.packets.received.total** <br>(gauge) | Paquetes recibidos por el servidor del keeper|
| **clickhouse.keeper.packets.sent.count** <br>(count) | Paquetes enviados por el servidor del keeper|
| **clickhouse.keeper.packets.sent.total** <br>(gauge) | Paquetes enviados por el servidor del keeper|
| **clickhouse.keeper.reconfig.requests.count** <br>(count) | Número de solicitudes reconfig|
| **clickhouse.keeper.reconfig.requests.total** <br>(gauge) | Número de solicitudes reconfig|
| **clickhouse.keeper.reconnects.count** <br>(count) | Número de veces que se ha realizado una reconexión al Keeper|
| **clickhouse.keeper.reconnects.total** <br>(gauge) | Número de veces que se ha realizado una reconexión al Keeper|
| **clickhouse.keeper.remove.requests.count** <br>(count) | Número de solicitudes remove|
| **clickhouse.keeper.remove.requests.total** <br>(gauge) | Número de solicitudes remove|
| **clickhouse.keeper.requests.count** <br>(count) | Número de veces que se ha hecho una solicitud al Keeper|
| **clickhouse.keeper.requests.total** <br>(gauge) | Número de veces que se ha hecho una solicitud al Keeper|
| **clickhouse.keeper.requests.total.count** <br>(count) | Número total de solicitudes en el servidor del keeper|
| **clickhouse.keeper.requests.total.total** <br>(gauge) | Número total de solicitudes en el servidor del keeper|
| **clickhouse.keeper.set.requests.count** <br>(count) | Número de solicitudes set|
| **clickhouse.keeper.set.requests.total** <br>(gauge) | Número de solicitudes set|
| **clickhouse.keeper.snapshot.apply.count** <br>(count) | Número de aplicación de instantáneas|
| **clickhouse.keeper.snapshot.apply.failed.count** <br>(count) | Número de aplicación de instantáneas fallidas|
| **clickhouse.keeper.snapshot.apply.failed.total** <br>(gauge) | Número de aplicación de instantáneas fallidas|
| **clickhouse.keeper.snapshot.apply.total** <br>(gauge) | Número de aplicación de instantáneas|
| **clickhouse.keeper.snapshot.create.count** <br>(count) | Número de creaciones de instantáneas|
| **clickhouse.keeper.snapshot.create.total** <br>(gauge) | Número de creaciones de instantáneas|
| **clickhouse.keeper.snapshot.read.count** <br>(count) | Número de lectura de instantáneas (serialización)|
| **clickhouse.keeper.snapshot.read.total** <br>(gauge) | Número de lectura de instantáneas (serialización)|
| **clickhouse.keeper.snapshot.save.count** <br>(count) | Número de guardado de instantáneas|
| **clickhouse.keeper.snapshot.save.total** <br>(gauge) | Número de guardado de instantáneas|
| **clickhouse.keerper.snapshot.create.failed.count** <br>(count) | Número de creaciones de instantáneas fallidas|
| **clickhouse.keerper.snapshot.create.failed.total** <br>(gauge) | Número de creaciones de instantáneas fallidas|
| **clickhouse.lock.context.acquisition.count** <br>(count) | El número de veces que se adquirió o intentó adquirir el bloqueo del contexto durante el último intervalo. Se trata de un bloqueo global.<br>_Se muestra como evento_ |
| **clickhouse.lock.context.acquisition.total** <br>(gauge) | El número total de veces que se adquirió o intentó adquirir el bloqueo del contexto. Se trata de un bloqueo global.<br>_Se muestra como evento_ |
| **clickhouse.lock.context.wait_time.count** <br>(count) | Tiempo de espera de bloqueo del contexto en microsegundos|
| **clickhouse.lock.context.wait_time.total** <br>(gauge) | Tiempo de espera de bloqueo del contexto en microsegundos|
| **clickhouse.lock.read.rwlock.acquired.count** <br>(count) | Número de veces que se adquirió un bloqueo de lectura (en un RWLock pesado).|
| **clickhouse.lock.read.rwlock.acquired.time** <br>(gauge) | Tiempo total de espera para adquirir un bloqueo de lectura (en un RWLock pesado).<br>_Se muestra como microsegundo_ |
| **clickhouse.lock.read.rwlock.acquired.total** <br>(gauge) | Número de veces que se adquirió un bloqueo de lectura (en un RWLock pesado).|
| **clickhouse.lock.write.rwlock.acquired.count** <br>(count) | Número de veces que se adquirió un bloqueo de escritura (en un RWLock pesado).|
| **clickhouse.lock.write.rwlock.acquired.time** <br>(gauge) | Tiempo total de espera para adquirir un bloqueo de escritura (en un RWLock pesado).<br>_Se muestra como microsegundo_ |
| **clickhouse.lock.write.rwlock.acquired.total** <br>(gauge) | Número de veces que se adquirió un bloqueo de escritura (en un RWLock pesado).|
| **clickhouse.log.entry.merge.created.count** <br>(count) | Entrada de log creada con éxito para fusionar partes en ReplicatedMergeTree.<br>_Se muestra como evento_ |
| **clickhouse.log.entry.merge.created.total** <br>(gauge) | Total de entradas de log creadas con éxito para fusionar partes en ReplicatedMergeTree.<br>_Se muestra como evento_ |
| **clickhouse.log.entry.merge.not_created.count** <br>(count) | Entrada de log para fusionar partes en ReplicatedMergeTree que no se crean debido a la actualización concurrente de logs por otra réplica.<br>_Se muestra como evento_ |
| **clickhouse.log.entry.merge.not_created.total** <br>(gauge) | Total de entradas de log para fusionar partes en ReplicatedMergeTree no creadas debido a actualización concurrente de logs por otra réplica.<br>_Se muestra como evento_ |
| **clickhouse.log.entry.mutation.created.count** <br>(count) | Entrada de log creada con éxito para mutar partes en ReplicatedMergeTree.<br>_Se muestra como evento_ |
| **clickhouse.log.entry.mutation.created.total** <br>(gauge) | Total de entradas de log creadas con éxito para mutar partes en ReplicatedMergeTree.<br>_Se muestra como evento_ |
| **clickhouse.log.entry.mutation.not_created.count** <br>(count) | Entrada de logs para mutar partes en ReplicatedMergeTree que no se crea debido a actualización concurrente de logs por otra réplica.<br>_Se muestra como evento_ |
| **clickhouse.log.entry.mutation.not_created.total** <br>(gauge) | Total de entradas de log para mutar partes en ReplicatedMergeTree no creadas debido a actualización concurrente de logs por otra réplica.<br>_Se muestra como evento_ |
| **clickhouse.log.messages.debug.count** <br>(count) | Número de mensajes de log con nivel Debug|
| **clickhouse.log.messages.debug.total** <br>(gauge) | Número de mensajes de log con nivel Debug|
| **clickhouse.log.messages.error.count** <br>(count) | Número de mensajes de log con nivel Error|
| **clickhouse.log.messages.error.total** <br>(gauge) | Número de mensajes de log con nivel Error|
| **clickhouse.log.messages.fatal.count** <br>(count) | Número de mensajes de log con nivel Fatal|
| **clickhouse.log.messages.fatal.total** <br>(gauge) | Número de mensajes de log con nivel Fatal|
| **clickhouse.log.messages.info.count** <br>(count) | Número de mensajes de log con nivel Info|
| **clickhouse.log.messages.info.total** <br>(gauge) | Número de mensajes de log con nivel Info|
| **clickhouse.log.messages.test.count** <br>(count) | Número de mensajes de log con nivel Test|
| **clickhouse.log.messages.test.total** <br>(gauge) | Número de mensajes de log con nivel Test|
| **clickhouse.log.messages.trace.count** <br>(count) | Número de mensajes de log con nivel Trace|
| **clickhouse.log.messages.trace.total** <br>(gauge) | Número de mensajes de log con nivel Trace|
| **clickhouse.log.messages.warning.count** <br>(count) | Número de mensajes de log con nivel Warning|
| **clickhouse.log.messages.warning.total** <br>(gauge) | Número de mensajes de log con nivel Warning|
| **clickhouse.marks.load.time** <br>(gauge) | Tiempo de carga de las marcas<br>_Se muestra en microsegundos_ |
| **clickhouse.marks.loaded.bytes.count** <br>(count) | Tamaño de las representaciones en memoria de las marcas cargadas.|
| **clickhouse.marks.loaded.bytes.total** <br>(gauge) | Tamaño de las representaciones en memoria de las marcas cargadas.|
| **clickhouse.marks.loaded.count.count** <br>(count) | Número de marcas cargadas (total en todas las columnas).|
| **clickhouse.marks.loaded.count.total** <br>(gauge) | Número de marcas cargadas (total en todas las columnas).|
| **clickhouse.memory.allocator.purge.count** <br>(count) | Número total de veces que se ha solicitado la purga del asignador de memoria|
| **clickhouse.memory.allocator.purge.time** <br>(gauge) | Número total de veces que se solicitó la purga del asignador de memoria<br>_Se muestra como microsegundo_ |
| **clickhouse.memory.allocator.purge.total** <br>(gauge) | Número total de veces que se ha solicitado la purga del asignador de memoria|
| **clickhouse.memory.allocator.purge.wait.time** <br>(gauge) | Tiempo total empleado en esperar a que se libere memoria en OvercommitTracker.<br>_Se muestra como microsegundo_ |
| **clickhouse.memory.arena.bytes.count** <br>(count) | Número de bytes asignados para la memoria Arena (utilizada para operaciones GROUP BY y similares)<br>_Se muestra como byte_ |
| **clickhouse.memory.arena.bytes.total** <br>(gauge) | Número de bytes asignados para la memoria Arena (utilizada para operaciones GROUP BY y similares)<br>_Se muestra como byte_ |
| **clickhouse.memory.arena.chunks.count** <br>(count) | Número de fragmentos asignados para la memoria Arena (utilizada para GROUP BY y operaciones similares)|
| **clickhouse.memory.arena.chunks.total** <br>(gauge) | Número de fragmentos asignados para la memoria Arena (utilizada para GROUP BY y operaciones similares)|
| **clickhouse.memory.external.join.files.merged.count** <br>(count) | Número de veces que se fusionaron archivos temporales para JOIN en memoria externa.|
| **clickhouse.memory.external.join.files.merged.total** <br>(gauge) | Número de veces que se fusionaron archivos temporales para JOIN en memoria externa.|
| **clickhouse.memory.external.join.files.num_written.count** <br>(count) | Número de veces que se ha escrito en disco un archivo temporal para JOIN en memoria externa.|
| **clickhouse.memory.external.join.files.num_written.total** <br>(gauge) | Número de veces que se ha escrito en disco un archivo temporal para JOIN en memoria externa.|
| **clickhouse.memory.external.sort.files.num_written.count** <br>(count) | Número de veces que se escribió un archivo temporal en el disco para ordenarlo en la memoria externa.|
| **clickhouse.memory.external.sort.files.num_written.total** <br>(gauge) | Número de veces que se escribió un archivo temporal en el disco para ordenarlo en la memoria externa.|
| **clickhouse.merge.active** <br>(gauge) | El número de fusiones en segundo plano en ejecución<br>_Se muestra como fusión_ |
| **clickhouse.merge.count** <br>(count) | El número de fusiones en segundo plano lanzadas durante el último intervalo.<br>_Se muestra como fusión_ |
| **clickhouse.merge.disk.reserved** <br>(gauge) | Espacio de disco reservado para las fusiones en segundo plano en curso. Es ligeramente superior al tamaño total de las partes que se están fusionando actualmente.<br>_Se muestra como byte_ |
| **clickhouse.merge.memory** <br>(gauge) | Cantidad total de memoria asignada para las fusiones en segundo plano. Incluido en MemoryTrackingInBackgroundProcessingPool. Ten en cuenta que este valor puede incluir un desvío cuando la memoria se asignó en un contexto de grupo de procesamiento secundario y se liberó en otro contexto o viceversa. Esto ocurre de forma natural debido a las memorias caché de los índices de las tablas y no indica fugas de memoria.<br>_Se muestra como byte_ |
| **clickhouse.merge.parts.compact.count** <br>(count) | Número de partes fusionadas en formato compacto.|
| **clickhouse.merge.parts.compact.total** <br>(gauge) | Número de partes fusionadas en formato compacto.|
| **clickhouse.merge.parts.wide.count** <br>(count) | Número de partes fusionadas en formato ancho.|
| **clickhouse.merge.parts.wide.total** <br>(gauge) | Número de partes fusionadas en formato ancho.|
| **clickhouse.merge.read.size.uncompressed.count** <br>(count) | El número de bytes sin comprimir (para las columnas tal y como se almacenan en memoria) que se leyó para las fusiones en segundo plano durante el último intervalo. Este es el número antes de la fusión.<br>_Se muestra como byte_ |
| **clickhouse.merge.read.size.uncompressed.total** <br>(gauge) | El número total de bytes sin comprimir (para columnas tal y como están almacenadas en memoria) que se leyó para las fusiones en segundo plano. Este es el número antes de la fusión.<br>_Se muestra como byte_ |
| **clickhouse.merge.row.read.count** <br>(count) | El número de filas leídas para las fusiones en segundo plano durante el último intervalo. Es el número de filas antes de la fusión.<br>_Se muestra como fila_ |
| **clickhouse.merge.row.read.total** <br>(gauge) | El número total de filas leídas para las fusiones en segundo plano. Es el número de filas antes de la fusión.<br>_Se muestra como fila_ |
| **clickhouse.merge.time** <br>(gauge) | Porcentaje de tiempo dedicado a las fusiones en segundo plano durante el último intervalo.<br>_Se muestra en porcentaje_ |
| **clickhouse.merge.total** <br>(gauge) | El número total de fusiones en segundo plano lanzadas.<br>_Se muestra como fusión_ |
| **clickhouse.merge_tree.announcements.sent** <br>(gauge) | Número de anuncios enviados desde el servidor remoto al servidor iniciador sobre el conjunto de partes de datos (para tablas MergeTree). Medido en el lado del servidor remoto.|
| **clickhouse.merge_tree.read_task.requests.sent** <br>(gauge) | Número de devoluciones de llamada solicitadas desde el servidor remoto al servidor iniciador para elegir la tarea de lectura (para tablas MergeTree). Medido en el lado del servidor remoto.|
| **clickhouse.merges_mutations.bytes.total** <br>(gauge) | Cantidad total de memoria (bytes) asignada por las tareas en segundo plano (fusiones y mutaciones).|
| **clickhouse.mmapped.file.current** <br>(gauge) | Número total de archivos mmapped.<br>_Se muestra como archivo_ |
| **clickhouse.mmapped.file.size** <br>(gauge) | Suma del tamaño de las regiones del archivo mmapped.<br>_Se muestra como byte_ |
| **clickhouse.moves.executing.currently** <br>(gauge) | Número de movimientos en ejecución|
| **clickhouse.network.receive.elapsed.time** <br>(gauge) | Tiempo total de espera para recibir datos de la red.<br>_Se muestra en microsegundos_ |
| **clickhouse.network.receive.size.count** <br>(count) | El número de bytes recibidos de la red.<br>_Se muestra como byte_ |
| **clickhouse.network.receive.size.total** <br>(gauge) | El número total de bytes recibidos de la red.<br>_Se muestra como byte_ |
| **clickhouse.network.send.elapsed.time** <br>(gauge) | Tiempo total de espera de envío de datos a la red o de envío de datos a la red.<br>_Se muestra en microsegundos_ |
| **clickhouse.network.send.size.count** <br>(count) | El número de bytes enviados a la red.<br>_Se muestra como byte_ |
| **clickhouse.network.send.size.total** <br>(gauge) | El número total de bytes enviados a la red.<br>_Se muestra como byte_ |
| **clickhouse.network.threads.receive** <br>(gauge) | Número de subprocesos que reciben datos de la red.<br>_Se muestra como subproceso_ |
| **clickhouse.network.threads.send** <br>(gauge) | Número de subprocesos que envían datos a la red.<br>_Se muestra como subproceso_ |
| **clickhouse.node.remove.count** <br>(count) | El número de veces que se ha producido un error al intentar eliminar un nodo efímero durante el último intervalo. Esto no suele ser un problema, porque la implementación de ClickHouse de la biblioteca ZooKeeper garantiza que la sesión expirará y el nodo se eliminará.<br>_Se muestra como error_ |
| **clickhouse.node.remove.total** <br>(gauge) | El número total de veces que se ha producido un error al intentar eliminar un nodo efímero. Esto no suele ser un problema, porque la implementación de ClickHouse de la biblioteca ZooKeeper garantiza que la sesión expirará y el nodo será eliminado.<br>_Se muestra como error_ |
| **clickhouse.part.max** <br>(gauge) | El número máximo de partes activas en particiones.<br>_Se muestra como elemento_ |
| **clickhouse.parts.active** <br>(gauge) | \[Solo versiones >= 22.7.1\] Parte de datos activa utilizada por SELECTs actuales y futuras.<br>_Se muestra como elemento_ |
| **clickhouse.parts.committed** <br>(gauge) | Parte de datos activa, utilizada por SELECTs actuales y futuras.<br>_Se muestra como elemento_ |
| **clickhouse.parts.compact** <br>(gauge) | Partes compactas.<br>_Se muestra como elemento_ |
| **clickhouse.parts.compact.inserted.count** <br>(count) | Número de partes insertadas en formato compacto.<br>_Se muestra como elemento_ |
| **clickhouse.parts.compact.inserted.total** <br>(gauge) | Número de partes insertadas en formato compacto.<br>_Se muestra como elemento_ |
| **clickhouse.parts.delete_on_destroy** <br>(gauge) | La parte fue movida a otro disco y debe ser borrada en su propio destructor.<br>_Se muestra como elemento_ |
| **clickhouse.parts.deleting** <br>(gauge) | Parte de datos no activa con refcounter de identidad, se está borrando ahora mismo por un limpiador.<br>_Se muestra como elemento_ |
| **clickhouse.parts.inmemory** <br>(gauge) | Partes en memoria.<br>_Se muestra como elemento_ |
| **clickhouse.parts.mutations.applied.fly.count** <br>(count) | Número total de partes para las que se aplicó alguna mutación en fly|
| **clickhouse.parts.mutations.applied.fly.total** <br>(gauge) | Número total de partes para las que se aplicó alguna mutación en fly|
| **clickhouse.parts.outdated** <br>(gauge) | Parte de datos no activa, pero que solo puede ser utilizada por las SELECTs actuales, puede ser borrada una vez finalizadas las SELECTs.<br>_Se muestra como elemento_ |
| **clickhouse.parts.pre_active** <br>(gauge) | \[Solo versiones >= 22.7.1\] La parte está en data_parts, pero no se utiliza para SELECTs.<br>_Se muestra como elemento_ |
| **clickhouse.parts.precommitted** <br>(gauge) | La parte está en data_parts, pero no se utiliza para SELECTs.<br>_Se muestra como elemento_ |
| **clickhouse.parts.temporary** <br>(gauge) | La parte se está generando ahora, no está en la lista data_parts.<br>_Se muestra como elemento_ |
| **clickhouse.parts.wide** <br>(gauge) | Partes anchas.<br>_Se muestra como elemento_ |
| **clickhouse.parts.wide.inserted.count** <br>(count) | Número de partes insertadas en formato ancho.|
| **clickhouse.parts.wide.inserted.total** <br>(gauge) | Número de partes insertadas en formato ancho.|
| **clickhouse.perf.alignment.faults.count** <br>(count) | Número de fallos de alineación. Ocurren cuando se producen accesos a memoria no alineados; el kernel puede manejarlos, pero reduce el rendimiento. Esto ocurre solo en algunas arquitecturas (nunca en x86).<br>_Se muestra como evento_ |
| **clickhouse.perf.alignment.faults.total** <br>(gauge) | Número total de fallos de alineación. Ocurren cuando se producen accesos a memoria no alineados; el kernel puede manejarlos, pero reduce el rendimiento. Esto ocurre solo en algunas arquitecturas (nunca en x86).<br>_Se muestra como evento_ |
| **clickhouse.perf.branch.instructions.count** <br>(count) | Instrucciones de rama retiradas. Antes de Linux 2.6.35, esto utilizaba el evento incorrecto en procesadores AMD.<br>_Se muestra como unidad_ |
| **clickhouse.perf.branch.instructions.total** <br>(gauge) | Total de instrucciones de ramas retiradas. Antes de Linux 2.6.35, esto utilizaba el evento incorrecto en procesadores AMD.<br>_Se muestra como unidad_ |
| **clickhouse.perf.branch.misses.count** <br>(count) | Instrucciones de ramas mal predichas.<br>_Se muestra como unidad_ |
| **clickhouse.perf.branch.misses.total** <br>(gauge) | Total de instrucciones de ramas mal predichas.<br>_Se muestra como unidad_ |
| **clickhouse.perf.bus.cycles.count** <br>(count) | Ciclos de bus, que pueden ser diferentes de los ciclos totales.<br>_Se muestra como unidad_ |
| **clickhouse.perf.bus.cycles.total** <br>(gauge) | Ciclos totales de bus, que pueden ser diferentes de los ciclos totales.<br>_Se muestra como unidad_ |
| **clickhouse.perf.cache.misses.count** <br>(count) | Fallos de caché. Normalmente indica fallos de caché de último nivel; se utiliza junto con el evento PERFCOUNTHWCACHEREFERENCES para calcular los porcentajes de fallos de caché.<br>_Se muestra como fallo_ |
| **clickhouse.perf.cache.misses.total** <br>(gauge) | Fallos de caché. Normalmente indica el total de fallos de caché de último nivel; se utiliza junto con el evento PERFCOUNTHWCACHEREFERENCES para calcular los porcentajes de fallos de caché.<br>_Se muestra como fallo_ |
| **clickhouse.perf.cache.references.count** <br>(count) | Accesos a la caché. Normalmente indica los accesos al último nivel de caché, pero puede variar dependiendo de la CPU. Esto puede incluir precargas y mensajes de coherencia; de nuevo esto depende del diseño de tu CPU.<br>_Se muestra como unidad_ |
| **clickhouse.perf.cache.references.total** <br>(gauge) | Accesos a la caché. Normalmente indica el total de accesos a la caché de último nivel, pero puede variar dependiendo de la CPU. Esto puede incluir precargas y mensajes de coherencia; de nuevo esto depende del diseño de tu CPU.<br>_Se muestra como unidad_ |
| **clickhouse.perf.context.switches.count** <br>(count) | Número de cambios de contexto|
| **clickhouse.perf.context.switches.total** <br>(gauge) | Número total de cambios de contexto|
| **clickhouse.perf.cpu.clock** <br>(gauge) | El reloj de la CPU, un temporizador de alta resolución por CPU.<br>_Se muestra como unidad_ |
| **clickhouse.perf.cpu.cycles.count** <br>(count) | Ciclos de CPU. Ten cuidado con lo que ocurre durante el escalado de frecuencia de la CPU.<br>_Se muestra como unidad_ |
| **clickhouse.perf.cpu.cycles.total** <br>(gauge) | Ciclos totales de la CPU. Ten cuidado con lo que ocurre durante el escalado de frecuencia de la CPU.<br>_Se muestra como unidad_ |
| **clickhouse.perf.cpu.migrations.count** <br>(count) | Número de veces que el proceso ha migrado a una nueva CPU<br>_Se muestra como unidad_ |
| **clickhouse.perf.cpu.migrations.total** <br>(gauge) | Número total de veces que el proceso ha migrado a una nueva CPU<br>_Se muestra como unidad_ |
| **clickhouse.perf.cpu.ref_cycles.count** <br>(count) | Ciclos de CPU; no se ve afectado por el escalado de frecuencia de la CPU.<br>_Se muestra como unidad_ |
| **clickhouse.perf.cpu.ref_cycles.total** <br>(gauge) | Ciclos totales; no se ve afectado por el escalado de frecuencia de la CPU.<br>_Se muestra como unidad_ |
| **clickhouse.perf.data.tlb.misses.count** <br>(count) | Fallos en la TLB de datos<br>_Se muestra como fallo_ |
| **clickhouse.perf.data.tlb.misses.total** <br>(gauge) | Total de fallos en la TLB de datos<br>_Se muestra como fallo_ |
| **clickhouse.perf.data.tlb.references.count** <br>(count) | Referencias de TLB de datos<br>_Se muestra como unidad_ |
| **clickhouse.perf.data.tlb.references.total** <br>(gauge) | Total de referencias de TLB de datos<br>_Se muestra como unidad_ |
| **clickhouse.perf.emulation.faults.count** <br>(count) | Número de fallos de emulación. El kernel a veces atrapa instrucciones no implementadas y las emula para el espacio de usuario. Esto puede afectar negativamente al rendimiento.<br>_Se muestra como fallo_ |
| **clickhouse.perf.emulation.faults.total** <br>(gauge) | Número total de fallos de emulación. El kernel a veces atrapa instrucciones no implementadas y las emula para el espacio de usuario. Esto puede afectar negativamente al rendimiento.<br>_Se muestra como fallo_ |
| **clickhouse.perf.instruction.tlb.misses.count** <br>(count) | Fallos de la TLB de instrucción<br>_Se muestra como fallo_ |
| **clickhouse.perf.instruction.tlb.misses.total** <br>(gauge) | Total de fallos en la TLB de instrucciones<br>_Se muestra como error_ |
| **clickhouse.perf.instruction.tlb.references.count** <br>(count) | Referencias de la TLB de instrucciones<br>_Se muestra como unidad_ |
| **clickhouse.perf.instruction.tlb.references.total** <br>(gauge) | Total de referencias de la LB de instrucción<br>_Se muestra como unidad_ |
| **clickhouse.perf.instructions.count** <br>(count) | Instrucciones retiradas. Ten cuidado, pueden verse afectadas por varios problemas, sobre todo por el recuento de interrupciones de hardware.<br>_Se muestra como unidad_ |
| **clickhouse.perf.instructions.total** <br>(gauge) | Total de instrucciones retiradas. Ten cuidado, esto puede verse afectado por varias cuestiones, sobre todo el recuento de interrupciones de hardware.<br>_Se muestra como unidad_ |
| **clickhouse.perf.local_memory.misses.count** <br>(count) | Fallos de lectura de memoria del nodo NUMA local<br>_Se muestra como fallo_ |
| **clickhouse.perf.local_memory.misses.total** <br>(gauge) | Total de errores de lectura de memoria del nodo NUMA local<br>_Se muestra como fallo_ |
| **clickhouse.perf.local_memory.references.count** <br>(count) | Lecturas de memoria del nodo NUMA local<br>_Se muestra como unidad_ |
| **clickhouse.perf.local_memory.references.total** <br>(gauge) | Total de lecturas de memoria del nodo NUMA local<br>_Se muestra como unidad_ |
| **clickhouse.perf.min_enabled.min_time** <br>(gauge) | Para todos los eventos, tiempo mínimo que un evento estuvo habilitado. Se utiliza para realizar un seguimiento de la influencia de la multiplexación de eventos.<br>_Se muestra como microsegundo_ |
| **clickhouse.perf.min_enabled.running_time** <br>(gauge) | Tiempo de ejecución del evento con tiempo mínimo habilitado. Se utiliza para realizar un seguimiento de la cantidad de multiplexación de eventos<br>_Se muestra como microsegundo_ |
| **clickhouse.perf.stalled_cycles.backend.count** <br>(count) | Ciclos detenidos durante el retiro.<br>_Se muestra como unidad_ |
| **clickhouse.perf.stalled_cycles.backend.total** <br>(gauge) | Total de ciclos detenidos durante el retiro.<br>_Se muestra como unidad_ |
| **clickhouse.perf.stalled_cycles.frontend.count** <br>(count) | Ciclos detenidos durante la emisión.<br>_Se muestra como unidad_ |
| **clickhouse.perf.stalled_cycles.frontend.total** <br>(gauge) | Total de ciclos detenidos durante la emisión.<br>_Se muestra como unidad_ |
| **clickhouse.perf.task.clock** <br>(gauge) | Un recuento de reloj específico de la tarea que se está ejecutando|
| **clickhouse.pool.polygon.added.count** <br>(count) | Se ha añadido un polígono a la caché (grupo) para la función 'pointInPolygon'.|
| **clickhouse.pool.polygon.added.total** <br>(gauge) | Se ha añadido un polígono a la caché (grupo) para la función 'pointInPolygon'.|
| **clickhouse.pool.polygon.bytes.count** <br>(count) | El número de bytes para polígonos añadidos a la caché (grupo) para la función 'pointInPolygon'.|
| **clickhouse.pool.polygon.bytes.total** <br>(gauge) | El número de bytes para polígonos añadidos a la caché (grupo) para la función 'pointInPolygon'.|
| **clickhouse.postgresql.connection** <br>(gauge) | Número de conexiones de clientes que utilizan el protocolo PostgreSQL<br>_Se muestra como conexión_ |
| **clickhouse.processing.external.files.total.count** <br>(count) | Número de archivos utilizados por el tratamiento externo (clasificación/agrupación/unión)|
| **clickhouse.processing.external.files.total.total** <br>(gauge) | Número de archivos utilizados por el tratamiento externo (clasificación/agrupación/unión)|
| **clickhouse.queries.read.new_parts.ignored.count** <br>(count) | Consulta la configuración de ignore_cold_parts_seconds. Número de veces que las consultas de lectura ignoran partes muy nuevas que aún no han sido introducidas en la caché por CacheWarmer.|
| **clickhouse.queries.read.new_parts.ignored.total** <br>(gauge) | Consulta la configuración de ignore_cold_parts_seconds. Número de veces que las consultas de lectura ignoran partes muy nuevas que aún no han sido introducidas en la caché por CacheWarmer.|
| **clickhouse.queries.read.outdated.parts.count** <br>(count) | Consulta la configuración prefer_warmed_unmerged_parts_seconds. Número de veces que las consultas de lectura utilizan partes pre-fusionadas obsoletas que están en la caché en lugar de la parte fusionada que CacheWarmer aún no ha introducido en la caché.|
| **clickhouse.queries.read.outdated.parts.total** <br>(gauge) | Consulta la configuración prefer_warmed_unmerged_parts_seconds. Número de veces que las consultas de lectura utilizan partes pre-fusionadas obsoletas que están en la caché en lugar de la parte fusionada que CacheWarmer aún no ha introducido en la caché.|
| **clickhouse.query.active** <br>(gauge) | El número de consultas en ejecución<br>_Se muestra como consulta_ |
| **clickhouse.query.async.insert.bytes.count** <br>(count) | Tamaño de los datos en bytes de las consultas INSERT asíncronas.|
| **clickhouse.query.async.insert.bytes.total** <br>(gauge) | Tamaño de los datos en bytes de las consultas INSERT asíncronas.|
| **clickhouse.query.async.insert.count** <br>(count) | Igual que InsertQuery, pero solo para consultas INSERT asíncronas.|
| **clickhouse.query.async.insert.failed.count** <br>(count) | Número de consultas ASYNC INSERT fallidas.|
| **clickhouse.query.async.insert.failed.total** <br>(gauge) | Número de consultas ASYNC INSERT fallidas.|
| **clickhouse.query.async.insert.hash_id.duplicate.count** <br>(count) | Número de veces que se ha encontrado un id de hash duplicado en la caché de id de hash de INSERT asíncrono.|
| **clickhouse.query.async.insert.hash_id.duplicate.total** <br>(gauge) | Número de veces que se ha encontrado un id de hash duplicado en la caché de id de hash de INSERT asíncrono.|
| **clickhouse.query.async.insert.rows.count** <br>(count) | Número de filas insertadas por consultas INSERT asíncronas.|
| **clickhouse.query.async.insert.rows.total** <br>(gauge) | Número de filas insertadas por consultas INSERT asíncronas.|
| **clickhouse.query.async.insert.total** <br>(gauge) | Igual que InsertQuery, pero solo para consultas INSERT asíncronas.|
| **clickhouse.query.async.loader.wait.time** <br>(gauge) | Tiempo total que una consulta estuvo esperando los trabajos del cargador asíncrono.<br>_Se muestra como microsegundo_ |
| **clickhouse.query.count** <br>(count) | El número de consultas a interpretar y potencialmente ejecutadas durante el último intervalo. No incluye las consultas que no se han podido analizar o que se han rechazado debido a límites de tamaño AST, límites de cuota o límites en el número de consultas que se ejecutan simultáneamente. Puede incluir consultas internas iniciadas por el propio ClickHouse. No cuenta las subconsultas.<br>_Se muestra como consulta_ |
| **clickhouse.query.failed.count** <br>(count) | Número de consultas fallidas.<br>_Se muestra como consulta_ |
| **clickhouse.query.failed.total** <br>(gauge) | Número total de consultas fallidas.<br>_Se muestra como consulta_ |
| **clickhouse.query.initial.count** <br>(count) | Igual que Query (Consulta), pero solo cuenta las consultas iniciales (consulta is_initial_query).|
| **clickhouse.query.initial.total** <br>(gauge) | Igual que Query (Consulta), pero solo cuenta las consultas iniciales (consulta is_initial_query).|
| **clickhouse.query.insert.count** <br>(count) | El número de consultas INSERT a interpretar y potencialmente ejecutadas durante el último intervalo. No incluye consultas que fallaron al analizar o fueron rechazadas debido a límites de tamaño AST, límites de cuota o límites en el número de consultas ejecutadas simultáneamente. Puede incluir consultas internas iniciadas por el propio ClickHouse. No cuenta las subconsultas.<br>_Se muestra como consulta_ |
| **clickhouse.query.insert.delayed** <br>(gauge) | El número de consultas INSERT que se limitan debido al elevado número de partes de datos activas para la partición en una tabla MergeTree.<br>_Se muestra como consulta_ |
| **clickhouse.query.insert.failed.count** <br>(count) | Igual que FailedQuery, pero solo para consultas INSERT.<br>_Se muestra como consulta_ |
| **clickhouse.query.insert.failed.total** <br>(gauge) | Igual que FailedQuery, pero solo para consultas INSERT.<br>_Se muestra como consulta_ |
| **clickhouse.query.insert.subqueries.count** <br>(count) | Recuento de consultas INSERT con todas las subconsultas|
| **clickhouse.query.insert.subqueries.total** <br>(gauge) | Recuento de consultas INSERT con todas las subconsultas|
| **clickhouse.query.insert.total** <br>(gauge) | El número total de consultas INSERT a interpretar y potencialmente ejecutadas. No incluye las consultas que no se han podido analizar o que se han rechazado debido a límites de tamaño AST, límites de cuota o límites en el número de consultas que se ejecutan simultáneamente. Puede incluir consultas internas iniciadas por el propio ClickHouse. No cuenta las subconsultas.<br>_Se muestra como consulta_ |
| **clickhouse.query.local_timers.active** <br>(gauge) | Número de temporizadores locales de subprocesos creados en QueryProfiler|
| **clickhouse.query.mask.match.count** <br>(count) | El número de veces que las reglas de enmascaramiento de consultas coincidieron correctamente durante el último intervalo.<br>_Se muestra como ocurrencia_ |
| **clickhouse.query.mask.match.total** <br>(gauge) | El número total de veces que las reglas de enmascaramiento de consultas coincidieron con éxito.<br>_Se muestra como ocurrencia_ |
| **clickhouse.query.memory** <br>(gauge) | Cantidad total de memoria asignada en las consultas que se están ejecutando actualmente. Ten en cuenta que algunas asignaciones de memoria pueden no contabilizarse.<br>_Se muestra como byte_ |
| **clickhouse.query.memory.limit_exceeded.count** <br>(count) | Número de veces que se ha superado el límite de memoria para la consulta.|
| **clickhouse.query.memory.limit_exceeded.total** <br>(gauge) | Número total de veces que se ha superado el límite de memoria para la consulta.|
| **clickhouse.query.mutation** <br>(gauge) | El número de mutaciones (ALTER DELETE/UPDATE)<br>_Se muestra como consulta_ |
| **clickhouse.query.other.time** <br>(gauge) | Tiempo total de las consultas que no son SELECT o INSERT.<br>_Se muestra en microsegundos_ |
| **clickhouse.query.overflow.any.count** <br>(count) | Número de veces que GROUP BY aproximado estuvo en efecto: cuando la agregación se realizó solo sobre las primeras claves únicas 'max_rows_to_group_by' y otras claves fueron ignoradas debido a 'group_by_overflow_mode' = 'any'.|
| **clickhouse.query.overflow.any.total** <br>(gauge) | Número de veces que GROUP BY aproximado estuvo en efecto: cuando la agregación se realizó solo sobre las primeras claves únicas 'max_rows_to_group_by' y otras claves fueron ignoradas debido a 'group_by_overflow_mode' = 'any'.|
| **clickhouse.query.overflow.break.count** <br>(count) | Número de veces que el procesamiento de datos se canceló por la limitación de complejidad de la consulta con el parámetro '*\_overflow_mode' = 'break' y el resultado está incompleto.|
| **clickhouse.query.overflow.break.total** <br>(gauge) | Número de veces que el procesamiento de datos se canceló por la limitación de complejidad de la consulta con el parámetro '*\_overflow_mode' = 'break' y el resultado está incompleto.|
| **clickhouse.query.overflow.throw.count** <br>(count) | Número de veces que se canceló el procesamiento de datos por la limitación de complejidad de la consulta con el parámetro '*\_overflow_mode' = 'throw' y se lanzó una excepción.|
| **clickhouse.query.overflow.throw.total** <br>(gauge) | Número de veces que se canceló el procesamiento de datos por la limitación de complejidad de la consulta con el parámetro '*\_overflow_mode' = 'throw' y se lanzó una excepción.|
| **clickhouse.query.profiler.runs.count** <br>(count) | Número de veces que se ha ejecutado QueryProfiler.|
| **clickhouse.query.profiler.runs.total** <br>(gauge) | Número de veces que se ha ejecutado QueryProfiler.|
| **clickhouse.query.read.backoff.count** <br>(count) | El número de veces que el número de subprocesos de procesamiento de consultas se redujo debido a lecturas lentas durante el último intervalo.<br>_Se muestra como ocurrencia_ |
| **clickhouse.query.read.backoff.total** <br>(gauge) | El número total de veces que el número de subprocesos de procesamiento de consultas se redujo debido a lecturas lentas.<br>_Se muestra como ocurrencia_ |
| **clickhouse.query.select.count** <br>(count) | El número de consultas SELECT a interpretar y potencialmente ejecutadas durante el último intervalo. No incluye consultas que fallaron al analizar o fueron rechazadas debido a límites de tamaño AST, límites de cuota o límites en el número de consultas ejecutadas simultáneamente. Puede incluir consultas internas iniciadas por el propio ClickHouse. No cuenta las subconsultas.<br>_Se muestra como consulta_ |
| **clickhouse.query.select.subqueries.count** <br>(count) | Recuento de consultas SELECT con todas las subconsultas|
| **clickhouse.query.select.subqueries.total** <br>(gauge) | Recuento de consultas SELECT con todas las subconsultas|
| **clickhouse.query.select.time** <br>(gauge) | Tiempo total de las consultas SELECT.<br>_Se muestra en microsegundos_ |
| **clickhouse.query.select.total** <br>(gauge) | El número total de consultas SELECT a interpretar y potencialmente ejecutadas. No incluye las consultas que no se han podido analizar o que se han rechazado debido a límites de tamaño AST, límites de cuota o límites en el número de consultas que se ejecutan simultáneamente. Puede incluir consultas internas iniciadas por el propio ClickHouse. No cuenta las subconsultas.<br>_Se muestra como consulta_ |
| **clickhouse.query.signal.dropped.count** <br>(count) | El número de veces que se abandonó el procesamiento de una señal por exceso de ejecuciones más el número de señales que el SO no ha entregado por exceso de ejecuciones durante el último intervalo.<br>_Se muestra como ocurrencia_ |
| **clickhouse.query.signal.dropped.total** <br>(gauge) | El número total de veces que el procesamiento de una señal se ha interrumpido por exceso de ejecuciones más el número de señales que el SO no ha entregado por exceso de ejecuciones.<br>_Se muestra como ocurrencia_ |
| **clickhouse.query.sleep.time** <br>(gauge) | Porcentaje de tiempo que una consulta estuvo suspendida para ajustarse a la configuración de `max_network_bandwidth` durante el último intervalo.<br>_Se muestra como porcentaje_ |
| **clickhouse.query.subqueries.count** <br>(count) | Recuento de consultas con todas las subconsultas|
| **clickhouse.query.subqueries.total** <br>(gauge) | Recuento de consultas con todas las subconsultas|
| **clickhouse.query.time** <br>(gauge) | Tiempo total de todas las consultas.<br>_Se muestra como microsegundo_ |
| **clickhouse.query.timers.active** <br>(gauge) | Número de temporizadores locales de suprocesos activos en QueryProfiler|
| **clickhouse.query.total** <br>(gauge) | El número total de consultas a interpretar y potencialmente ejecutadas. No incluye las consultas que no se han podido analizar o que se han rechazado debido a límites de tamaño AST, límites de cuota o límites en el número de consultas que se ejecutan simultáneamente. Puede incluir consultas internas iniciadas por el propio ClickHouse. No cuenta las subconsultas.<br>_Se muestra como consulta_ |
| **clickhouse.query.waiting** <br>(gauge) | El número de consultas que están detenidas y en espera debido a la configuración de "prioridad".<br>_Se muestra como consulta_ |
| **clickhouse.read.buffer.mmap.created.count** <br>(count) | Número de veces que se creó un búfer de lectura usando 'mmap' para leer datos (mientras se elegía entre otros métodos de lectura).|
| **clickhouse.read.buffer.mmap.created.total** <br>(gauge) | Número de veces que se creó un búfer de lectura usando 'mmap' para leer datos (mientras se elegía entre otros métodos de lectura).|
| **clickhouse.read.buffer.mmap.failed.count** <br>(count) | Número de veces que se intentó crear un búfer de lectura con 'mmap' para leer datos (mientras se elegía entre otros métodos de lectura), pero el SO no lo permitió (por falta de soporte del sistema de archivos u otras razones) y se volvió al método de lectura ordinario.|
| **clickhouse.read.buffer.mmap.failed.total** <br>(gauge) | Número de veces que se intentó crear un búfer de lectura con 'mmap' para leer datos (mientras se elegía entre otros métodos de lectura), pero el SO no lo permitió (por falta de soporte del sistema de archivos u otras razones) y se volvió al método de lectura ordinario.|
| **clickhouse.read.buffer.o_direct.created.count** <br>(count) | Número de veces que se creó un búfer de lectura con O_DIRECT para leer datos (mientras se elegía entre otros métodos de lectura).|
| **clickhouse.read.buffer.o_direct.created.total** <br>(gauge) | Número de veces que se creó un búfer de lectura con O_DIRECT para leer datos (mientras se elegía entre otros métodos de lectura).|
| **clickhouse.read.buffer.o_direct.failed.count** <br>(count) | Número de veces que se intentó crear un búfer de lectura con O_DIRECT para leer datos (mientras se elegía entre otros métodos de lectura), pero el SO no lo permitió (por falta de soporte del sistema de archivos u otras razones) y se volvió al método de lectura ordinario.|
| **clickhouse.read.buffer.o_direct.failed.total** <br>(gauge) | Número de veces que se intentó crear un búfer de lectura con O_DIRECT para leer datos (mientras se elegía entre otros métodos de lectura), pero el SO no lo permitió (por falta de soporte del sistema de archivos u otras razones) y se volvió al método de lectura ordinario.|
| **clickhouse.read.buffer.ordinary.created.count** <br>(count) | Número de veces que se creó un búfer de lectura ordinario para leer datos (mientras se elegía entre otros métodos de lectura).|
| **clickhouse.read.buffer.ordinary.created.total** <br>(gauge) | Número de veces que se creó un búfer de lectura ordinario para leer datos (mientras se elegía entre otros métodos de lectura).|
| **clickhouse.read.compressed.block.count** <br>(count) | El número de bloques comprimidos (los bloques de datos que se comprimen independientemente unos de otros) leídos de fuentes comprimidas (archivos, red) durante el último intervalo.<br>_Se muestra como bloque_ |
| **clickhouse.read.compressed.block.total** <br>(gauge) | El número total de bloques comprimidos (los bloques de datos que se comprimen independientemente unos de otros) leídos de fuentes comprimidas (archivos, red).<br>_Se muestra como bloque_ |
| **clickhouse.read.compressed.raw.size.count** <br>(count) | El número de bytes sin comprimir (el número de bytes después de la descompresión) leídos de fuentes comprimidas (archivos, red) durante el último intervalo.<br>_Se muestra como byte_ |
| **clickhouse.read.compressed.raw.size.total** <br>(gauge) | El número total de bytes sin comprimir (el número de bytes después de la descompresión) leídos de fuentes comprimidas (archivos, red).<br>_Se muestra como byte_ |
| **clickhouse.read.compressed.size.count** <br>(count) | El número de bytes (el número de bytes antes de la descompresión) leídos de fuentes comprimidas (archivos, red) durante el último intervalo.<br>_Se muestra como byte_ |
| **clickhouse.read.compressed.size.total** <br>(gauge) | El número total de bytes (el número de bytes antes de la descompresión) leídos de fuentes comprimidas (archivos, red).<br>_Se muestra como byte_ |
| **clickhouse.read.connections.new.count** <br>(count) | Número de búsquedas que conducen a una nueva conexión (s3, http)|
| **clickhouse.read.connections.new.total** <br>(gauge) | Número de búsquedas que conducen a una nueva conexión (s3, http)|
| **clickhouse.read.synchronous.wait.time** <br>(gauge) | Tiempo de espera de lectura síncrona en lectura local asíncrona.<br>_Se muestra en microsegundos_ |
| **clickhouse.remote.query.read_throttler.sleep.time** <br>(gauge) | Tiempo total de espera de una consulta para ajustarse a la limitación 'max_remote_read_network_bandwidth_for_server'/'max_remote_read_network_bandwidth'.<br>_Se muestra como microsegundo_ |
| **clickhouse.remote.query.write_throttler.sleep.time** <br>(gauge) | Tiempo total de espera de una consulta para ajustarse a la limitación 'max_remote_write_network_bandwidth_for_server'/'max_remote_write_network_bandwidth'.<br>_Se muestra como microsegundo_ |
| **clickhouse.remote.read.synchronous.wait.time** <br>(gauge) | Tiempo de espera para lecturas remotas síncronas.<br>_Se muestra como microsegundo_ |
| **clickhouse.remote.read_throttler.bytes.count** <br>(count) | Bytes pasados a través del limitador 'max_remote_read_network_bandwidth_for_server'/'max_remote_read_network_bandwidth'.|
| **clickhouse.remote.read_throttler.bytes.total** <br>(gauge) | Bytes pasados a través del limitador 'max_remote_read_network_bandwidth_for_server'/'max_remote_read_network_bandwidth'.|
| **clickhouse.remote.write_throttler.bytes.count** <br>(count) | Bytes pasados a través del limitador 'max_remote_write_network_bandwidth_for_server'/'max_remote_write_network_bandwidth'.|
| **clickhouse.remote.write_throttler.bytes.total** <br>(gauge) | Bytes pasados a través del limitador 'max_remote_write_network_bandwidth_for_server'/'max_remote_write_network_bandwidth'.|
| **clickhouse.remote_reader.total** <br>(gauge) | Número de lecturas con lector remoto en fly|
| **clickhouse.replica.delay.absolute** <br>(gauge) | El retraso máximo de la cola de réplica en relación con la hora actual.<br>_Se muestra como milisegundo_ |
| **clickhouse.replica.delay.relative** <br>(gauge) | La diferencia máxima de retraso absoluto con respecto a cualquier otra réplica.<br>_Se muestra como milisegundo_ |
| **clickhouse.replica.leader.election** <br>(gauge) | Número de réplicas que participan en la elección del líder. Equivale al número total de réplicas en los casos habituales.<br>_Se muestra como partición_ |
| **clickhouse.replica.queue.size** <br>(gauge) | El número de tareas de replicación en cola.<br>_Se muestra como tarea_ |
| **clickhouse.replicas.parralel.announcement.handle.time** <br>(gauge) | Tiempo empleado en procesar los anuncios de réplicas<br>_Se muestra como microsegundo_ |
| **clickhouse.replicas.parralel.available.count** <br>(count) | Número de réplicas disponibles para ejecutar una consulta con réplicas paralelas basadas en tareas|
| **clickhouse.replicas.parralel.available.total** <br>(gauge) | Número de réplicas disponibles para ejecutar una consulta con réplicas paralelas basadas en tareas|
| **clickhouse.replicas.parralel.collect_segment.time** <br>(gauge) | Tiempo empleado en recopilar los segmentos significados por hash<br>_Se muestra como microsegundo_ |
| **clickhouse.replicas.parralel.hash.stealing.time** <br>(gauge) | Tiempo empleado en recopilar segmentos destinados al robo mediante hash<br>_Se muestra como microsegundo_ |
| **clickhouse.replicas.parralel.leftover_segment.stealing.time** <br>(gauge) | Tiempo de recopilación de segmentos huérfanos<br>_Se muestra en microsegundos_ |
| **clickhouse.replicas.parralel.processing.time** <br>(gauge) | Tiempo empleado en procesar las partes de datos<br>_Se muestra como microsegundo_ |
| **clickhouse.replicas.parralel.request.handle.time** <br>(gauge) | Tiempo empleado en procesar las solicitudes de marcas de las réplicas<br>_Se muestra en microsegundos_ |
| **clickhouse.replicas.parralel.requests.count** <br>(count) | Número de solicitudes al iniciador.|
| **clickhouse.replicas.parralel.requests.total** <br>(gauge) | Número de solicitudes al iniciador.|
| **clickhouse.replicas.parralel.used.count** <br>(count) | Número de réplicas utilizadas para ejecutar una consulta con réplicas paralelas basadas en tareas|
| **clickhouse.replicas.parralel.used.total** <br>(gauge) | Número de réplicas utilizadas para ejecutar una consulta con réplicas paralelas basadas en tareas|
| **clickhouse.s3.abort_multipart_upload.count** <br>(count) | Número de llamadas a la API de S3 AbortMultipartUpload.|
| **clickhouse.s3.abort_multipart_upload.total** <br>(gauge) | Número de llamadas a la API de S3 AbortMultipartUpload.|
| **clickhouse.s3.client.copy.reuse.count** <br>(count) | Número de copias de clientes de S3 que reutilizan un proveedor de autenticación existente de otro cliente.|
| **clickhouse.s3.client.copy.reuse.total** <br>(gauge) | Número de copias de clientes de S3 que reutilizan un proveedor de autenticación existente de otro cliente.|
| **clickhouse.s3.clients.created.count** <br>(count) | Número de clientes de S3 creados.|
| **clickhouse.s3.clients.created.total** <br>(gauge) | Número de clientes de S3 creados.|
| **clickhouse.s3.complete_multipart_upload.count** <br>(count) | Número de llamadas a la API de S3 CompleteMultipartUpload.|
| **clickhouse.s3.complete_multipart_upload.total** <br>(gauge) | Número de llamadas a la API de S3 CompleteMultipartUpload.|
| **clickhouse.s3.connect.time** <br>(gauge) | Tiempo empleado en inicializar la conexión a S3.<br>_Se muestra como microsegundo_ |
| **clickhouse.s3.copy_object.count** <br>(count) | Número de llamadas a la API CopyObject de S3.|
| **clickhouse.s3.copy_object.total** <br>(gauge) | Número de llamadas a la API CopyObject de S3.|
| **clickhouse.s3.create_multipart_upload.count** <br>(count) | Número de llamadas a la API CreateMultipartUpload de S3.|
| **clickhouse.s3.create_multipart_upload.total** <br>(gauge) | Número de llamadas a la API CreateMultipartUpload de S3.|
| **clickhouse.s3.delete_obkect.count** <br>(count) | Número de llamadas a la API DeleteObject(s) de S3.|
| **clickhouse.s3.delete_obkect.total** <br>(gauge) | Número de llamadas a la API DeleteObject(s) de S3.|
| **clickhouse.s3.get_object.count** <br>(count) | Número de llamadas a la API GetObject de S3.|
| **clickhouse.s3.get_object.total** <br>(gauge) | Número de llamadas a la API GetObject de S3.|
| **clickhouse.s3.get_object_attribute.count** <br>(count) | Número de llamadas a GetObjectAttributes de la API de S3.|
| **clickhouse.s3.get_object_attribute.total** <br>(gauge) | Número de llamadas a GetObjectAttributes de la API de S3.|
| **clickhouse.s3.get_request.throttled.count** <br>(count) | Número de solicitudes GET y SELECT de S3 pasadas por el limitador.|
| **clickhouse.s3.get_request.throttled.time** <br>(gauge) | Tiempo total de espera de una consulta para ajustarse a la limitación de solicitudes GET y SELECT de S3.<br>_Se muestra como microsegundo_ |
| **clickhouse.s3.get_request.throttled.total** <br>(gauge) | Número de solicitudes GET y SELECT de S3 pasadas por el limitador.|
| **clickhouse.s3.head_object.count** <br>(count) | Número de llamadas a la API HeadObject de S3.|
| **clickhouse.s3.head_object.total** <br>(gauge) | Número de llamadas a la API HeadObject de S3.|
| **clickhouse.s3.list_object.count** <br>(count) | Número de llamadas a la API ListObjects de S3.|
| **clickhouse.s3.list_object.total** <br>(gauge) | Número de llamadas a la API ListObjects de S3.|
| **clickhouse.s3.lock_localfile_status.time** <br>(gauge) | Tiempo empleado en bloquear estados de archivos locales<br>_Se muestra como microsegundo_ |
| **clickhouse.s3.put_object.count** <br>(count) | Número de llamadas a la API PutObject de S3.|
| **clickhouse.s3.put_object.total** <br>(gauge) | Número de llamadas a la API PutObject de S3.|
| **clickhouse.s3.put_request.throttled.count** <br>(count) | Número de solicitudes PUT, COPY, POST y LIST de S3 pasadas por el limitador.|
| **clickhouse.s3.put_request.throttled.time** <br>(gauge) | Tiempo total de espera de una consulta para ajustarse a la limitación de solicitudes PUT, COPY, POST y LIST de S3.<br>_Se muestra en microsegundos_ |
| **clickhouse.s3.put_request.throttled.total** <br>(gauge) | Número de solicitudes PUT, COPY, POST y LIST de S3 pasadas por el limitador.|
| **clickhouse.s3.read.bytes.count** <br>(count) | Bytes de lectura (entrantes) en solicitudes GET y HEAD al almacenamiento S3.<br>_Se muestra como byte_ |
| **clickhouse.s3.read.bytes.total** <br>(gauge) | Total de bytes de lectura (entrantes) en solicitudes GET y HEAD al almacenamiento S3.<br>_Se muestra como byte_ |
| **clickhouse.s3.read.errors.count** <br>(count) | Número de excepciones durante la lectura desde S3.|
| **clickhouse.s3.read.errors.total** <br>(gauge) | Número de excepciones durante la lectura desde S3.|
| **clickhouse.s3.read.file.time** <br>(gauge) | Tiempo empleado en leer los datos del archivo<br>_Se muestra como microsegundo_ |
| **clickhouse.s3.read.requests.count** <br>(count) | Número de solicitudes GET y HEAD al almacenamiento S3.<br>_Se muestra como solicitud_ |
| **clickhouse.s3.read.requests.errors.count** <br>(count) | Número de errores de no-limitación en solicitudes GET y HEAD al almacenamiento S3.<br>_Se muestra como error_ |
| **clickhouse.s3.read.requests.errors.total** <br>(gauge) | Número total de errores de no-limitación en solicitudes GET y HEAD al almacenamiento S3.<br>_Se muestra como error_ |
| **clickhouse.s3.read.requests.redirects.count** <br>(count) | Número de redirecciones en solicitudes GET y HEAD al almacenamiento S3.<br>_Se muestra como unidad_ |
| **clickhouse.s3.read.requests.redirects.total** <br>(gauge) | Número total de redirecciones en solicitudes GET y HEAD al almacenamiento S3.<br>_Se muestra como unidad_ |
| **clickhouse.s3.read.requests.throttling.count** <br>(count) | Número de errores 429 y 503 en solicitudes GET y HEAD al almacenamiento S3.<br>_Se muestra como error_ |
| **clickhouse.s3.read.requests.throttling.total** <br>(gauge) | Número total de errores 429 y 503 en solicitudes GET y HEAD al almacenamiento S3.<br>_Se muestra como error_ |
| **clickhouse.s3.read.requests.total** <br>(gauge) | Número total de solicitudes GET y HEAD al almacenamiento S3.<br>_Se muestra como solicitud_ |
| **clickhouse.s3.read.reset.count** <br>(count) | Número de sesiones HTTP que se reiniciaron en ReadBufferFromS3.|
| **clickhouse.s3.read.reset.total** <br>(gauge) | Número de sesiones HTTP que se reiniciaron en ReadBufferFromS3.|
| **clickhouse.s3.read.sessions.preserved..count** <br>(count) | Número de sesiones HTTP que se conservaron en ReadBufferFromS3.|
| **clickhouse.s3.read.sessions.preserved..total** <br>(gauge) | Número de sesiones HTTP que se conservaron en ReadBufferFromS3.|
| **clickhouse.s3.read.size.count** <br>(count) | Bytes leídos de S3.|
| **clickhouse.s3.read.size.total** <br>(gauge) | Bytes leídos de S3.|
| **clickhouse.s3.read.time** <br>(gauge) | Tiempo empleado en leer de S3.<br>_Se muestra como microsegundo_ |
| **clickhouse.s3.requests.count** <br>(gauge) | Recuento de solicitudes S3<br>_Se muestra como solicitud_ |
| **clickhouse.s3.set.file.failed.time** <br>(gauge) | Tiempo empleado en establecer el archivo como fallido<br>_Se muestra como microsegundo_ |
| **clickhouse.s3.set.file.processed.time** <br>(gauge) | Tiempo empleado en establecer el archivo como procesado<br>_Se muestra como microsegundo_ |
| **clickhouse.s3.set.file.processing.time** <br>(gauge) | Tiempo empleado en establecer el archivo como procesamiento<br>_Se muestra como microsegundo_ |
| **clickhouse.s3.set_file.failed.time** <br>(gauge) | Tiempo empleado en establecer el archivo como fallido<br>_Se muestra como microsegundo_ |
| **clickhouse.s3.upload_part.count** <br>(count) | Número de llamadas a la API UploadPart de S3.|
| **clickhouse.s3.upload_part.total** <br>(gauge) | Número de llamadas a la API UploadPart de S3.|
| **clickhouse.s3.upload_part_copy.count** <br>(count) | Número de llamadas a la API UploadPartCopy de S3.|
| **clickhouse.s3.upload_part_copy.total** <br>(gauge) | Número de llamadas a la API UploadPartCopy de S3.|
| **clickhouse.s3.write.bytes.count** <br>(count) | Bytes de escritura (salientes) en solicitudes POST, DELETE, PUT y PATCH al almacenamiento S3.<br>_Se muestra como byte_ |
| **clickhouse.s3.write.bytes.total** <br>(gauge) | Total de bytes de escritura (salientes) en solicitudes POST, DELETE, PUT y PATCH al almacenamiento de S3.<br>_Se muestra como byte_ |
| **clickhouse.s3.write.errors.count** <br>(count) | Número de excepciones al escribir en S3.|
| **clickhouse.s3.write.errors.total** <br>(gauge) | Número de excepciones al escribir en S3.|
| **clickhouse.s3.write.requests.count** <br>(count) | Número de solicitudes POST, DELETE, PUT y PATCH al almacenamiento de S3.<br>_Se muestra como solicitud_ |
| **clickhouse.s3.write.requests.errors.count** <br>(count) | Número de errores de no-limitación en solicitudes POST, DELETE, PUT y PATCH al almacenamiento de S3.<br>_Se muestra como solicitud_ |
| **clickhouse.s3.write.requests.errors.total** <br>(gauge) | Número total de errores de no-limitación en solicitudes POST, DELETE, PUT y PATCH al almacenamiento de S3.<br>_Se muestra como solicitud_ |
| **clickhouse.s3.write.requests.redirects.count** <br>(count) | Número de redirecciones en solicitudes POST, DELETE, PUT y PATCH al almacenamiento de S3.<br>_Se muestra como solicitud_ |
| **clickhouse.s3.write.requests.redirects.total** <br>(gauge) | Número total de redirecciones en solicitudes POST, DELETE, PUT y PATCH al almacenamiento de S3.<br>_Se muestra como solicitud_ |
| **clickhouse.s3.write.requests.throttling.count** <br>(count) | Número de errores 429 y 503 en solicitudes POST, DELETE, PUT y PATCH al almacenamiento de S3.<br>_Se muestra como solicitud_ |
| **clickhouse.s3.write.requests.throttling.total** <br>(gauge) | Número total de errores 429 y 503 en solicitudes POST, DELETE, PUT y PATCH al almacenamiento S3.<br>_Se muestra como solicitud_ |
| **clickhouse.s3.write.requests.total** <br>(gauge) | Número total de solicitudes POST, DELETE, PUT y PATCH al almacenamiento de S3.<br>_Se muestra como solicitud_ |
| **clickhouse.s3.write.size.count** <br>(count) | Bytes escritos en S3.|
| **clickhouse.s3.write.size.total** <br>(gauge) | Bytes escritos en S3.|
| **clickhouse.s3.write.time** <br>(gauge) | Tiempo empleado en escribir en S3.<br>_Se muestra como microsegundo_ |
| **clickhouse.s3.write.wait.time** <br>(gauge) | Tiempo de espera mientras se realiza alguna de las solicitudes actuales cuando su número alcanza el límite definido por s3_max_inflight_parts_for_one_file.<br>_Se muestra como microsegundo_ |
| **clickhouse.select.query.select.failed.count** <br>(count) | Igual que FailedQuery, pero solo para consultas SELECT.<br>_Se muestra como consulta_ |
| **clickhouse.select.query.select.failed.total** <br>(gauge) | Igual que FailedQuery, pero solo para consultas SELECT.<br>_Se muestra como consulta_ |
| **clickhouse.selected.bytes.count** <br>(count) | Número de bytes (sin comprimir; para columnas tal y como se almacenan en memoria) en operaciones SELECT de todas las tablas.<br>_Se muestra como byte_ |
| **clickhouse.selected.bytes.total** <br>(gauge) | Número total de bytes (sin comprimir; para columnas tal y como se almacenan en memoria) en operaciones SELECT de todas las tablas.<br>_Se muestra como byte_ |
| **clickhouse.selected.rows.count** <br>(count) | Número total de filas en operaciones SELECT de todas las tablas.<br>_Se muestra como fila_ |
| **clickhouse.selected.rows.total** <br>(gauge) | Número de filas de operaciones SELECT de todas las tablas.<br>_Se muestra como fila_ |
| **clickhouse.server.startup.time** <br>(gauge) | Tiempo transcurrido desde el inicio del servidor hasta la escucha de sockets en milisegundos<br>_Se muestra como microsegundo_ |
| **clickhouse.sessions_pool.storage.active** <br>(gauge) | Recuento total de todas las sesiones: almacenadas en el grupo y utilizadas activamente en este momento para almacenamientos.|
| **clickhouse.sessions_pool.storage.total** <br>(gauge) | Recuento total de sesiones almacenadas en el grupo de sesiones para almacenamientos|
| **clickhouse.shard.send_query.suspend.count** <br>(count) | Recuento total cuando se suspende el envío de la consulta a la partición cuando async_query_sending_for_remote está activado.|
| **clickhouse.shard.send_query.suspend.total** <br>(gauge) | Recuento total cuando se suspende el envío de la consulta a la partición cuando async_query_sending_for_remote está activado.|
| **clickhouse.shared_merge_tree.fetches.total** <br>(gauge) | Número de búsquedas en curso|
| **clickhouse.shell_command.executions.count** <br>(count) | Número de ejecuciones de comandos shell.|
| **clickhouse.shell_command.executions.total** <br>(gauge) | Número de ejecuciones de comandos shell.|
| **clickhouse.sleep_function.sleep.time** <br>(gauge) | Tiempo pasado suspendido en una función sleep (sleep, sleepEachRow).<br>_Se muestra como microsegundo_ |
| **clickhouse.sqe.io_uring.inflight** <br>(gauge) | Número de io_uring SQE en curso|
| **clickhouse.sqe.io_uring.waiting** <br>(gauge) | Número de SQEs io_uring SQEs en espera de enviarse|
| **clickhouse.sql.ordinary.function.calls.count** <br>(count) | Número de llamadas a funciones SQL ordinarias (las funciones SQL se llaman por bloque, por lo que este número representa el número de bloques).<br>_Se muestra como bloque_ |
| **clickhouse.sql.ordinary.function.calls.total** <br>(gauge) | Número de llamadas a funciones SQL ordinarias (las funciones SQL se llaman por bloque, por lo que este número representa el número de bloques).<br>_Se muestra como bloque_ |
| **clickhouse.storage.buffer.flush.count** <br>(count) | Número de veces que se ha vaciado un búfer de una tabla "Buffer".|
| **clickhouse.storage.buffer.flush.total** <br>(gauge) | Número de veces que se ha vaciado un búfer de una tabla "Buffer".|
| **clickhouse.storage.buffer.flush_error.count** <br>(count) | Número de veces que un búfer de la tabla "Buffer" no se ha podido vaciar debido a un error de escritura en la tabla de destino.|
| **clickhouse.storage.buffer.flush_error.total** <br>(gauge) | Número de veces que un búfer de la tabla "Buffer" no se ha podido vaciar debido a un error de escritura en la tabla de destino.|
| **clickhouse.storage.connection.create.error.count** <br>(count) | Número de casos en los que falla la creación de una conexión para almacenamiento|
| **clickhouse.storage.connection.create.error.total** <br>(gauge) | Número de casos en los que falla la creación de una conexión para almacenamiento|
| **clickhouse.storage.connection.create.expired.count** <br>(count) | Número de conexiones caducadas para almacenamientos|
| **clickhouse.storage.connection.create.expired.total** <br>(gauge) | Número de conexiones caducadas para almacenamientos|
| **clickhouse.storage.connection.created.count** <br>(count) | Número de conexiones creadas para almacenes|
| **clickhouse.storage.connection.created.time** <br>(gauge) | Tiempo total empleado en crear conexiones para almacenamientos<br>_Se muestra en microsegundos_ |
| **clickhouse.storage.connection.created.total** <br>(gauge) | Número de conexiones creadas para almacenes|
| **clickhouse.storage.connection.preserved.count** <br>(count) | Número de conexiones conservadas para almacenamientos|
| **clickhouse.storage.connection.preserved.total** <br>(gauge) | Número de conexiones conservadas para almacenamientos|
| **clickhouse.storage.connection.reused.count** <br>(count) | Número de conexiones reutilizadas para almacenamientos|
| **clickhouse.storage.connection.reused.total** <br>(gauge) | Número de conexiones reutilizadas para almacenamientos|
| **clickhouse.storeage.connection.reset.count** <br>(count) | Número de conexiones de restablecimiento para almacenes|
| **clickhouse.storeage.connection.reset.total** <br>(gauge) | Número de conexiones de restablecimiento para almacenes|
| **clickhouse.subquery.scalar.read.cache.miss.count** <br>(count) | Número de veces que una lectura de una subconsulta escalar no se almacenó en caché y tuvo que calcularse por completo.|
| **clickhouse.subquery.scalar.read.cache.miss.total** <br>(gauge) | Número de veces que una lectura de una subconsulta escalar no se almacenó en caché y tuvo que calcularse por completo.|
| **clickhouse.syscall.directory.sync.count** <br>(count) | Número de veces que se ha llamado a la función F_FULLFSYNC/fsync/fdatasync para los directorios.|
| **clickhouse.syscall.directory.sync.time** <br>(gauge) | Tiempo total de espera para F_FULLFSYNC/fsync/fdatasync syscall para directorios.<br>_Se muestra como microsegundo_ |
| **clickhouse.syscall.directory.sync.total** <br>(gauge) | Número de veces que se ha llamado a la función F_FULLFSYNC/fsync/fdatasync para los directorios.|
| **clickhouse.syscall.read** <br>(gauge) | El número de syscalls de lectura (read, pread, io_getevents, etc.) en fly.<br>_Se muestra como lectura_ |
| **clickhouse.syscall.read.wait** <br>(gauge) | Porcentaje de tiempo dedicado a esperar la llamada al sistema de lectura durante el último intervalo. Esto incluye lecturas de la caché de página.<br>_Se muestra como porcentaje_ |
| **clickhouse.syscall.write** <br>(gauge) | El número de syscalls de escritura (write, pwrite, io_getevents, etc.) en fly.<br>_Se muestra como escritura_ |
| **clickhouse.syscall.write.wait** <br>(gauge) | Porcentaje de tiempo dedicado a esperar la llamada al sistema de escritura durante el último intervalo. Esto incluye escrituras en la caché de página.<br>_Se muestra como porcentaje_ |
| **clickhouse.table.buffer.row** <br>(gauge) | El número de filas en los búferes de las tablas Buffer.<br>_Se muestra como fila_ |
| **clickhouse.table.buffer.size** <br>(gauge) | Tamaño de los búferes de las tablas Buffer.<br>_Se muestra como byte_ |
| **clickhouse.table.distributed.bytes.insert.broken** <br>(gauge) | Número de bytes para la inserción asíncrona en tablas distribuidas que se ha marcado como rota. Se suma el número de bytes de cada partición.|
| **clickhouse.table.distributed.bytes.insert.pending** <br>(gauge) | Número de bytes pendientes de procesamiento para la inserción asíncrona en tablas distribuidas. Se suma el número de bytes de cada partición.|
| **clickhouse.table.distributed.connection.inserted** <br>(gauge) | Número de conexiones a servidores remotos que envían datos por operaciones INSERT a tablas distribuidas. Tanto en modo síncrono como asíncrono.<br>_Se muestra como conexión_ |
| **clickhouse.table.distributed.file.insert.broken** <br>(gauge) | Número de archivos de inserción asíncrona en tablas distribuidas que se han marcado como rotos. Esta métrica comienza en 0 al inicio. Se suma el número de archivos de cada partición.<br>_Se muestra como archivo_ |
| **clickhouse.table.distributed.file.insert.pending** <br>(gauge) | Número de archivos pendientes de procesamiento para su inserción asíncrona en tablas distribuidas. Se suma el número de archivos de cada partición.<br>_Se muestra como archivo_ |
| **clickhouse.table.function.count** <br>(count) | Número de llamadas a funciones de tabla.|
| **clickhouse.table.function.total** <br>(gauge) | Número de llamadas a funciones de tabla.|
| **clickhouse.table.insert.row.count** <br>(count) | El número de filas en operaciones INSERT en todas las tablas durante el último intervalo.<br>_Se muestra como fila_ |
| **clickhouse.table.insert.row.total** <br>(gauge) | El número total de filas en operaciones INSERT en todas las tablas.<br>_Se muestra como fila_ |
| **clickhouse.table.insert.size.count** <br>(count) | El número de bytes (sin comprimir; para columnas tal y como se almacenan en memoria) en operaciones INSERT en todas las tablas durante el último intervalo.<br>_Se muestra como byte_ |
| **clickhouse.table.insert.size.total** <br>(gauge) | El número total de bytes (sin comprimir; para columnas tal y como se almacenan en memoria) en operaciones INSERT en todas las tablas.<br>_Se muestra como byte_ |
| **clickhouse.table.mergetree.announcements.sent.time** <br>(gauge) | Tiempo empleado en enviar el anuncio desde el servidor remoto al servidor iniciador sobre el conjunto de partes de datos (para tablas MergeTree). Medido en el lado del servidor remoto.<br>_Se muestra como microsegundo_ |
| **clickhouse.table.mergetree.calculating.projections.time** <br>(gauge) | Tiempo empleado en calcular las proyecciones<br>_Se muestra como microsegundo_ |
| **clickhouse.table.mergetree.calculating.skip_indices.time** <br>(gauge) | Tiempo empleado en calcular los índices de omisión<br>_Se muestra en microsegundos_ |
| **clickhouse.table.mergetree.calculating.sorting.time** <br>(gauge) | Tiempo empleado en clasificar los bloques<br>_Se muestra como microsegundo_ |
| **clickhouse.table.mergetree.calculating.statistics.time** <br>(gauge) | Tiempo empleado en calcular las estadísticas<br>_Se muestra como microsegundo_ |
| **clickhouse.table.mergetree.insert.block.already_sorted.count** <br>(count) | El número de bloques en operaciones INSERT en tablas MergeTree que parecían ya ordenados durante el último intervalo.<br>_Se muestra como bloque_ |
| **clickhouse.table.mergetree.insert.block.already_sorted.projection.total** <br>(gauge) | Número total de bloques en operaciones INSERT en la proyección de tablas MergeTree que parecían estar ya ordenados.<br>_Se muestra como bloque_ |
| **clickhouse.table.mergetree.insert.block.already_sorted.total** <br>(gauge) | El número total de bloques en operaciones INSERT en tablas MergeTree que parecían estar ya ordenados.<br>_Se muestra como bloque_ |
| **clickhouse.table.mergetree.insert.block.count** <br>(count) | El número de bloques en operaciones INSERT en las tablas MergeTree durante el último intervalo. Cada bloque forma una parte de datos del nivel cero.<br>_Se muestra como bloque_ |
| **clickhouse.table.mergetree.insert.block.projection.count** <br>(count) | Número de bloques en operaciones INSERT en la proyección de tablas MergeTree. Cada bloque forma una parte de datos del nivel cero.<br>_Se muestra como bloque_ |
| **clickhouse.table.mergetree.insert.block.projection.total** <br>(gauge) | Número total de bloques en operaciones INSERT en la proyección de tablas MergeTree. Cada bloque forma una parte de datos del nivel cero.<br>_Se muestra como bloque_ |
| **clickhouse.table.mergetree.insert.block.rejected.count** <br>(count) | El número de veces que el INSERT de un bloque a una tabla MergeTree fue rechazado con la excepción `Too many parts` debido a un elevado número de partes de datos activas para la partición durante el último intervalo.<br>_Se muestra como bloque_ |
| **clickhouse.table.mergetree.insert.block.rejected.total** <br>(gauge) | El número total de veces que el INSERT de un bloque a una tabla MergeTree fue rechazado con la excepción `Too many parts` debido a un alto número de partes de datos activos para la partición.<br>_Se muestra como bloque_ |
| **clickhouse.table.mergetree.insert.block.size.compressed.projection.count** <br>(count) | Número de bloques en operaciones INSERT en la proyección de tablas MergeTree que parecían estar ya ordenados.<br>_Se muestra como bloque_ |
| **clickhouse.table.mergetree.insert.block.total** <br>(gauge) | El número total de bloques en operaciones INSERT en las tablas MergeTree. Cada bloque forma una parte de datos del nivel cero.<br>_Se muestra como bloque_ |
| **clickhouse.table.mergetree.insert.delayed.count** <br>(count) | El número de veces que el INSERT de un bloque a una tabla MergeTree se aceleró debido a un elevado número de partes de datos activas para la partición durante el último intervalo.<br>_Se muestra como limitación_ |
| **clickhouse.table.mergetree.insert.delayed.time** <br>(gauge) | Porcentaje de tiempo transcurrido mientras la inserción de un bloque en una tabla MergeTree se ralentizaba debido a un elevado número de partes de datos activas para la partición durante el último intervalo.<br>_Se muestra como porcentaje_ |
| **clickhouse.table.mergetree.insert.delayed.total** <br>(gauge) | El número total de veces que el INSERT de un bloque a una tabla MergeTree fue limitado debido al elevado número de partes de datos activas para la partición.<br>_Se muestra como limitación_ |
| **clickhouse.table.mergetree.insert.row.count** <br>(count) | El número de filas en operaciones INSERT en las tablas MergeTree durante el último intervalo.<br>_Se muestra como fila_ |
| **clickhouse.table.mergetree.insert.row.total** <br>(gauge) | El número total de filas en operaciones INSERT en las tablas MergeTree.<br>_Se muestra como fila_ |
| **clickhouse.table.mergetree.insert.write.row.projection.count** <br>(count) | Número de filas en operaciones INSERT en la proyección de tablas MergeTree.<br>_Se muestra como fila_ |
| **clickhouse.table.mergetree.insert.write.row.projection.total** <br>(gauge) | Número total de filas en operaciones INSERT en la proyección de tablas MergeTree.<br>_Se muestra como fila_ |
| **clickhouse.table.mergetree.insert.write.size.compressed.count** <br>(count) | El número de bytes escritos en el sistema de archivos para los datos en operaciones INSERT en las tablas MergeTree durante el último intervalo.<br>_Se muestra como byte_ |
| **clickhouse.table.mergetree.insert.write.size.compressed.total** <br>(gauge) | El número total de bytes escritos en el sistema de archivos para los datos en operaciones INSERT en las tablas MergeTree.<br>_Se muestra como byte_ |
| **clickhouse.table.mergetree.insert.write.size.uncompressed.count** <br>(count) | El número de bytes sin comprimir (para columnas tal y como se almacenan en memoria) en operaciones INSERT en tablas MergeTree durante el último intervalo.<br>_Se muestra como byte_ |
| **clickhouse.table.mergetree.insert.write.size.uncompressed.projection.count** <br>(count) | Bytes sin comprimir (para columnas tal como se almacenan en memoria) en operaciones INSERT en la proyección de tablas MergeTree.<br>_Se muestra como byte_ |
| **clickhouse.table.mergetree.insert.write.size.uncompressed.projection.total** <br>(gauge) | Total de bytes sin comprimir (para columnas tal y como se almacenan en memoria) en operaciones INSERT en la proyección de tablas MergeTree.<br>_Se muestra como byte_ |
| **clickhouse.table.mergetree.insert.write.size.uncompressed.total** <br>(gauge) | El número total de bytes sin comprimir (para columnas tal y como se almacenan en memoria) en operaciones INSERT en tablas MergeTree.<br>_Se muestra como byte_ |
| **clickhouse.table.mergetree.mark.selected.count** <br>(count) | El número de marcas (partes pequeñas del índice) seleccionadas para leer de una tabla MergeTree durante el último intervalo.<br>_Se muestra como índice_ |
| **clickhouse.table.mergetree.mark.selected.total** <br>(gauge) | El número total de marcas (partes pequeñas del índice) seleccionadas para leer de una tabla MergeTree.<br>_Se muestra como índice_ |
| **clickhouse.table.mergetree.merging.blocks.time** <br>(gauge) | Tiempo empleado en fusionar los bloques de entrada (para motores MergeTree especiales)<br>_Se muestra como microsegundo_ |
| **clickhouse.table.mergetree.merging.projection.time** <br>(gauge) | Tiempo empleado en fusionar bloques<br>_Se muestra como microsegundo_ |
| **clickhouse.table.mergetree.mutation.delayed.count** <br>(count) | Número de veces que la mutación de una tabla MergeTree se ha ralentizado debido al elevado número de mutaciones no finalizadas de la tabla.|
| **clickhouse.table.mergetree.mutation.delayed.total** <br>(gauge) | Número de veces que la mutación de una tabla MergeTree se ha ralentizado debido al elevado número de mutaciones no finalizadas de la tabla.|
| **clickhouse.table.mergetree.mutation.rejected.count** <br>(count) | Número de veces que se rechazó la mutación de una tabla MergeTree con la excepción "Demasiadas mutaciones" debido al elevado número de mutaciones no finalizadas para la tabla.|
| **clickhouse.table.mergetree.mutation.rejected.total** <br>(gauge) | Número de veces que se rechazó la mutación de una tabla MergeTree con la excepción "Demasiadas mutaciones" debido al elevado número de mutaciones no finalizadas para la tabla.|
| **clickhouse.table.mergetree.part.current** <br>(gauge) | El número total de partes de datos de una tabla MergeTree.<br>_Se muestra como objeto_ |
| **clickhouse.table.mergetree.part.selected.count** <br>(count) | El número de partes de datos seleccionadas para leer de una tabla MergeTree durante el último intervalo.<br>_Se muestra como elemento_ |
| **clickhouse.table.mergetree.part.selected.total** <br>(gauge) | El número total de partes de datos seleccionadas para leer de una tabla MergeTree.<br>_Se muestra como elemento_ |
| **clickhouse.table.mergetree.partslock.hold.time** <br>(gauge) | Tiempo total de bloqueo de partes de datos en tablas MergeTree<br>_Se muestra en microsegundos_ |
| **clickhouse.table.mergetree.partslock.wait.time** <br>(gauge) | Tiempo total de espera de bloqueo de partes de datos en tablas MergeTree<br>_Se muestra en microsegundos_ |
| **clickhouse.table.mergetree.prefetched_read_pool.tasks.time** <br>(gauge) | Tiempo empleado en preparar tareas en MergeTreePrefetchedReadPool<br>_Se muestra como microsegundo_ |
| **clickhouse.table.mergetree.range.selected.count** <br>(count) | El número de rangos no adyacentes en todas las partes de datos seleccionadas para leer de una tabla MergeTree durante el último intervalo.<br>_Se muestra como elemento_ |
| **clickhouse.table.mergetree.range.selected.total** <br>(gauge) | El número total de rangos no adyacentes en todas las partes de datos seleccionadas para leer de una tabla MergeTree.<br>_Se muestra como elemento_ |
| **clickhouse.table.mergetree.read_task_requests.sent.time** <br>(gauge) | Tiempo empleado en devoluciones de llamada solicitadas desde el servidor remoto al servidor iniciador para elegir la tarea de lectura (para tablas MergeTree). Medido en el lado del servidor remoto.<br>_Se muestra como microsegundo_ |
| **clickhouse.table.mergetree.replicated.fetch.merged.count** <br>(count) | El número de veces que ClickHouse prefiere descargar la parte ya fusionada de la réplica de la tabla ReplicatedMergeTree en lugar de realizar una fusión por sí mismo (normalmente prefiere realizar una fusión por sí mismo para ahorrar tráfico de red) durante el último intervalo. Esto ocurre cuando ClickHouse no tiene todas las partes fuente para realizar una fusión o cuando la parte de datos es lo suficientemente antigua.<br>_Se muestra como búsqueda_ |
| **clickhouse.table.mergetree.replicated.fetch.merged.total** <br>(gauge) | El número total de veces que ClickHouse prefiere descargar la parte ya fusionada de la réplica de la tabla ReplicatedMergeTree en lugar de realizar una fusión por sí mismo (normalmente prefiere realizar una fusión por sí mismo para ahorrar tráfico de red). Esto ocurre cuando ClickHouse no tiene todas las partes fuente para realizar una fusión o cuando la parte de datos es lo suficientemente antigua.<br>_Se muestra como búsqueda_ |
| **clickhouse.table.mergetree.replicated.fetch.replica.count** <br>(count) | El número de veces que se descargó una parte de datos de la réplica de una tabla ReplicatedMergeTree durante el último intervalo.<br>_Se muestra como búsqueda_ |
| **clickhouse.table.mergetree.replicated.fetch.replica.fail.count** <br>(count) | Número de veces que se ha producido un error al descargar una parte de datos de la réplica de una tabla ReplicatedMergeTree durante el último intervalo.<br>_Se muestra como byte_ |
| **clickhouse.table.mergetree.replicated.fetch.replica.fail.total** <br>(gauge) | El número total de veces que falló la descarga de una parte de datos desde la réplica de una tabla ReplicatedMergeTree.<br>_Se muestra como byte_ |
| **clickhouse.table.mergetree.replicated.fetch.replica.total** <br>(gauge) | El número total de veces que se descargó una parte de datos de la réplica de una tabla ReplicatedMergeTree.<br>_Se muestra como búsqueda_ |
| **clickhouse.table.mergetree.replicated.insert.deduplicate.count** <br>(count) | El número de veces que el bloque en operaciones INSERT en una tabla ReplicatedMergeTree fue deduplicado durante el último intervalo.<br>_Se muestra como operación_ |
| **clickhouse.table.mergetree.replicated.insert.deduplicate.total** <br>(gauge) | El número total de veces que se deduplicó el bloque en operaciones INSERT en una tabla ReplicatedMergeTree.<br>_Se muestra como operación_ |
| **clickhouse.table.mergetree.replicated.leader.elected.count** <br>(count) | El número de veces que una tabla ReplicatedMergeTree se convirtió en líder durante el último intervalo. La réplica líder es responsable de asignar fusiones, limpiar bloques antiguos para deduplicaciones y algunas tareas más de contabilidad.<br>_Se muestra como evento_ |
| **clickhouse.table.mergetree.replicated.leader.elected.total** <br>(gauge) | El número total de veces que una tabla ReplicatedMergeTree se convirtió en líder. La réplica líder es responsable de asignar fusiones, limpiar bloques antiguos para deduplicaciones y algunas tareas más de contabilidad.<br>_Se muestra como evento_ |
| **clickhouse.table.mergetree.replicated.merge.count** <br>(count) | El número de veces que las partes de datos de las tablas ReplicatedMergeTree se fusionaron correctamente durante el último intervalo.<br>_Se muestra como byte_ |
| **clickhouse.table.mergetree.replicated.merge.total** <br>(gauge) | El número total de veces que las partes de datos de las tablas ReplicatedMergeTree se fusionaron correctamente.<br>_Se muestra como byte_ |
| **clickhouse.table.mergetree.replicated.mutated.count** <br>(count) | Número de veces que las partes de datos de las tablas ReplicatedMergeTree se mutaron con éxito.|
| **clickhouse.table.mergetree.replicated.mutated.total** <br>(gauge) | Número de veces que las partes de datos de las tablas ReplicatedMergeTree se mutaron con éxito.|
| **clickhouse.table.mergetree.row.current** <br>(gauge) | El número total de filas de una tabla MergeTree.<br>_Se muestra como fila_ |
| **clickhouse.table.mergetree.size** <br>(gauge) | El tamaño total de todos los archivos de partes de datos de una tabla MergeTree.<br>_Se muestra como byte_ |
| **clickhouse.table.mergetree.sorting.projection.time** <br>(gauge) | Tiempo empleado en ordenar los bloques (para la proyección puede ser una clave diferente de la clave de ordenación de la tabla)<br>_Se muestra como microsegundo_ |
| **clickhouse.table.mergetree.storage.mark.cache** <br>(gauge) | El tamaño de la caché de `marks` para StorageMergeTree.<br>_Se muestra como byte_ |
| **clickhouse.table.replica.change.hedged_requests.count** <br>(gauge) | Recuento cuando expira el tiempo de espera para cambiar la réplica en las solicitudes cubiertas.<br>_Se muestra como tiempo de espera_ |
| **clickhouse.table.replica.change.hedged_requests.total** <br>(gauge) | Recuento total cuando expiró el tiempo de espera para cambiar la réplica en las solicitudes cubiertas.<br>_Se muestra como tiempo de espera_ |
| **clickhouse.table.replica.partial.shutdown.count** <br>(count) | Cuántas veces tiene que desinicializar su estado la tabla replicada debido a la caducidad de la sesión en ZooKeeper. El estado se reinicia cada vez que ZooKeeper vuelve a estar disponible.|
| **clickhouse.table.replica.partial.shutdown.total** <br>(gauge) | Total de veces que la tabla replicada tiene que desinicializar su estado debido a la expiración de la sesión en ZooKeeper. El estado se reinicia cada vez que ZooKeeper vuelve a estar disponible.|
| **clickhouse.table.replicated.active** <br>(gauge) | El número de réplicas de esta tabla que tienen una sesión en ZooKeeper (es decir, el número de réplicas en funcionamiento).<br>_Se muestra como tabla_ |
| **clickhouse.table.replicated.leader** <br>(gauge) | El número de tablas replicadas que son líderes. La réplica líder es responsable de asignar fusiones, limpiar bloques antiguos para deduplicaciones y algunas tareas más de contabilidad. No puede haber más de un líder en todas las réplicas en un momento dado. Si no hay líder será elegido pronto o indicará un problema.<br>_Se muestra como tabla_ |
| **clickhouse.table.replicated.leader.yield.count** <br>(count) | El número de veces que la tabla replicada cedió su liderazgo debido a un gran retraso de replicación en relación con otras réplicas durante el último intervalo.<br>_Se muestra como evento_ |
| **clickhouse.table.replicated.leader.yield.total** <br>(gauge) | El número total de veces que la tabla replicada cedió su liderazgo debido a un gran retraso de replicación en relación con otras réplicas.<br>_Se muestra como evento_ |
| **clickhouse.table.replicated.log.max** <br>(gauge) | Número máximo de entrada en el log de actividad general.<br>_Se muestra como elemento_ |
| **clickhouse.table.replicated.log.pointer** <br>(gauge) | Número máximo de entrada en el log de la actividad general que la réplica copió a su cola de ejecución, más uno. Si esto es mucho menor que `clickhouse.table.replicated.log.max`, algo va mal.<br>_Se muestra como elemento_ |
| **clickhouse.table.replicated.part.check** <br>(gauge) | El número de partes de datos que comprueban la coherencia<br>_Se muestra como elemento_ |
| **clickhouse.table.replicated.part.check.count** <br>(count) | El número de partes de datos que comprueban la coherencia<br>_Se muestra como elemento_ |
| **clickhouse.table.replicated.part.check.failed.count** <br>(count) | Número de veces que la búsqueda avanzada de una parte de datos en las réplicas no ha dado resultado o cuando se ha encontrado una parte inesperada y se ha alejado.|
| **clickhouse.table.replicated.part.check.failed.total** <br>(gauge) | Número de veces que la búsqueda avanzada de una parte de datos en las réplicas no ha dado resultado o cuando se ha encontrado una parte inesperada y se ha alejado.|
| **clickhouse.table.replicated.part.check.total** <br>(gauge) | El número de partes de datos que comprueban la coherencia<br>_Se muestra como elemento_ |
| **clickhouse.table.replicated.part.fetch** <br>(gauge) | El número de partes de datos que se obtienen de la réplica<br>_Se muestra como elemento_ |
| **clickhouse.table.replicated.part.future** <br>(gauge) | El número de partes de datos que aparecerán como resultado de INSERTs o fusiones que aún no se han realizado.<br>_Se muestra como elemento_ |
| **clickhouse.table.replicated.part.loss.count** <br>(count) | El número de veces que una parte de datos que queríamos no existe en ninguna réplica (incluso en réplicas que están desconectadas en ese momento) durante el último intervalo. Esas partes de datos se han perdido definitivamente. Esto es normal debido a la replicación asíncrona (si las inserciones de quórum no estaban habilitadas), cuando la réplica en la que se escribió la parte de datos falló y cuando se puso en línea después de fallar no contiene esa parte de datos.<br>_Se muestra como elemento_ |
| **clickhouse.table.replicated.part.loss.total** <br>(gauge) | El número total de veces que una parte de datos que queríamos no existe en ninguna réplica (incluso en las réplicas que están desconectadas en este momento). Esas partes de datos están definitivamente perdidas. Esto es normal debido a la replicación asíncrona (si las inserciones de quórum no estaban habilitadas), cuando la réplica en la que se escribió la parte de datos falló y cuando se puso en línea después de fallar no contiene esa parte de datos.<br>_Se muestra como elemento_ |
| **clickhouse.table.replicated.part.send** <br>(gauge) | El número de partes de datos que se envían a las réplicas<br>_Se muestra como elemento_ |
| **clickhouse.table.replicated.part.suspect** <br>(gauge) | Número de partes de datos en la cola de verificación. Una parte se pone en la cola de verificación si se sospecha que puede estar dañada.<br>_Se muestra como elemento_ |
| **clickhouse.table.replicated.queue.insert** <br>(gauge) | El número de inserciones de bloques de datos que deben realizarse. Las inserciones suelen replicarse con bastante rapidez. Si este número es grande, significa que algo va mal.<br>_Se muestra como operación_ |
| **clickhouse.table.replicated.queue.merge** <br>(gauge) | El número de fusiones pendientes de realizar. A veces las fusiones son largas, por lo que este valor puede ser mayor que cero durante mucho tiempo.<br>_Se muestra como fusión_ |
| **clickhouse.table.replicated.queue.size** <br>(gauge) | Tamaño de la cola de operaciones en espera de ejecución. Las operaciones incluyen la inserción de bloques de datos, fusiones y algunas otras acciones. Suele coincidir con `clickhouse.table.replicated.part.future`.<br>_Se muestra como operación_ |
| **clickhouse.table.replicated.readonly** <br>(gauge) | El número de tablas replicadas que se encuentran actualmente en estado de solo lectura debido a la reinicialización tras la pérdida de sesión de ZooKeeper o debido al inicio sin ZooKeeper configurado.<br>_Se muestra como tabla_ |
| **clickhouse.table.replicated.total** <br>(gauge) | El número total de réplicas conocidas de esta tabla.<br>_Se muestra como tabla_ |
| **clickhouse.table.replicated.version** <br>(gauge) | Número de versión de la estructura de la tabla que indica cuántas veces se ha realizado ALTER. Si las réplicas tienen versiones diferentes, significa que algunas réplicas aún no han realizado todos los ALTER.<br>_Se muestra como operación_ |
| **clickhouse.table.total** <br>(gauge) | El número actual de tablas.<br>_Se muestra como tabla_ |
| **clickhouse.table_engines.files.read.count** <br>(count) | Número de archivos leídos en motores de tablas que trabajan con archivos (como File/S3/URL/HDFS).|
| **clickhouse.table_engines.files.read.total** <br>(gauge) | Número de archivos leídos en motores de tablas que trabajan con archivos (como File/S3/URL/HDFS).|
| **clickhouse.tables_to_drop.queue.total** <br>(gauge) | Número de tablas abandonadas, que están a la espera de la eliminación de datos en segundo plano.<br>_Se muestra como tabla_ |
| **clickhouse.task.mutate.calculate.projections.time** <br>(gauge) | Tiempo empleado en calcular las proyecciones<br>_Se muestra como microsegundo_ |
| **clickhouse.task.prefetch.reader.wait.time** <br>(gauge) | Tiempo de espera del lector precargado<br>_Se muestra en microsegundos_ |
| **clickhouse.task.read.requests.received.count** <br>(count) | Número de devoluciones de llamada solicitadas desde el servidor remoto al servidor iniciador para elegir la tarea de lectura (para la función de tabla s3Cluster y similares). Medido en el lado del servidor iniciador.|
| **clickhouse.task.read.requests.received.total** <br>(gauge) | Número de devoluciones de llamada solicitadas desde el servidor remoto al servidor iniciador para elegir la tarea de lectura (para la función de tabla s3Cluster y similares). Medido en el lado del servidor iniciador.|
| **clickhouse.task.read.requests.sent.count** <br>(count) | El número de devoluciones de llamadas solicitadas desde el servidor remoto de vuelta al servidor iniciador para elegir la tarea de lectura (para la función de tabla s3Cluster y similares). Medido en el lado del servidor remoto.|
| **clickhouse.task.read.requests.sent.time** <br>(gauge) | Tiempo empleado en devoluciones de llamada solicitadas desde el servidor remoto al servidor iniciador para elegir la tarea de lectura (para la función de tabla s3Cluster y similares). Medido en el lado del servidor remoto.<br>_Se muestra como microsegundo_ |
| **clickhouse.task.read.requests.sent.total** <br>(gauge) | El número de devoluciones de llamadas solicitadas desde el servidor remoto de vuelta al servidor iniciador para elegir la tarea de lectura (para la función de tabla s3Cluster y similares). Medido en el lado del servidor remoto.|
| **clickhouse.task.requests.callback** <br>(gauge) | El número de devoluciones de llamadas solicitadas desde el servidor remoto de vuelta al servidor iniciador para elegir la tarea de lectura (para la función de tabla s3Cluster y similares). Medido en el lado del servidor remoto.|
| **clickhouse.task.thread_pool_reader.cache.time** <br>(gauge) | Cuánto tiempo pasamos comprobando si el contenido está en caché<br>_Se muestra como microsegundo_ |
| **clickhouse.task.thread_pool_reader.read.count** <br>(count) | Bytes leídos de una tarea de grupo de subprocesos en lectura asíncrona|
| **clickhouse.task.thread_pool_reader.read.size.count** <br>(count) | Bytes leídos de una tarea de grupo de subprocesos en lectura asíncrona|
| **clickhouse.task.thread_pool_reader.read.size.total** <br>(gauge) | Bytes leídos de una tarea de grupo de subprocesos en lectura asíncrona|
| **clickhouse.task.thread_pool_reader.read.sync.time** <br>(gauge) | Cuánto tiempo pasamos leyendo sincrónicamente<br>_Se muestra como microsegundo_ |
| **clickhouse.task.thread_pool_reader.read.time** <br>(gauge) | Tiempo empleado en obtener los datos en lectura asíncrona<br>_Se muestra como microsegundo_ |
| **clickhouse.task.thread_pool_reader.read.total** <br>(gauge) | Bytes leídos de una tarea de grupo de subprocesos en lectura asíncrona|
| **clickhouse.tasks.background.loading_marks.count** <br>(count) | Número de tareas en segundo plano para cargar marcas|
| **clickhouse.tasks.background.loading_marks.total** <br>(gauge) | Número de tareas en segundo plano para cargar marcas|
| **clickhouse.temporary_files.aggregation.total** <br>(gauge) | Número de archivos temporales creados para la agregación externa|
| **clickhouse.temporary_files.join.total** <br>(gauge) | Número de archivos temporales creados para JOIN|
| **clickhouse.temporary_files.sort.total** <br>(gauge) | Número de archivos temporales creados para la clasificación externa|
| **clickhouse.temporary_files.total** <br>(gauge) | Número de archivos temporales creados|
| **clickhouse.temporary_files.unknown.total** <br>(gauge) | Número de archivos temporales creados sin propósito conocido|
| **clickhouse.thread.cpu.wait** <br>(gauge) | El porcentaje de tiempo que un subproceso estuvo listo para ser ejecutado pero esperando a ser programado por el SO (desde el punto de vista del SO) durante el último intervalo.<br>_Se muestra como porcentaje_ |
| **clickhouse.thread.global.active** <br>(gauge) | El número de subprocesos en el grupo de subprocesos global que ejecuta una tarea.<br>_Se muestra como subproceso_ |
| **clickhouse.thread.global.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos global.|
| **clickhouse.thread.global.total** <br>(gauge) | El número de subprocesos en el grupos global de subprocesos.<br>_Se muestra como subproceso_ |
| **clickhouse.thread.io.wait** <br>(gauge) | El porcentaje de tiempo que un subproceso pasó esperando un resultado de operación de E/S (desde el punto de vista del SO) durante el último intervalo. Se trata de E/S real que no incluye la caché de página.<br>_Se muestra como porcentaje_ |
| **clickhouse.thread.local.active** <br>(gauge) | El número de subprocesos en los grupos de subprocesos locales que ejecutan una tarea.<br>_Se muestra como subproceso_ |
| **clickhouse.thread.local.scheduled** <br>(gauge) | Número de trabajos en cola o activos en los grupos de subprocesos locales.|
| **clickhouse.thread.local.total** <br>(gauge) | El número de subprocesos en los grupos de subprocesos locales. Debería ser similar a GlobalThreadActive.<br>_Se muestra como subproceso_ |
| **clickhouse.thread.lock.context.waiting** <br>(gauge) | El número de subprocesos en espera de bloqueo en Context. Se trata de un bloqueo global.<br>_Se muestra como subproceso_ |
| **clickhouse.thread.lock.rw.active.read** <br>(gauge) | El número de subprocesos que mantienen el bloqueo de lectura en una tabla RWLock.<br>_Se muestra como subproceso_ |
| **clickhouse.thread.lock.rw.active.write** <br>(gauge) | El número de subprocesos que mantienen el bloqueo de escritura en una tabla RWLock.<br>_Se muestra como subproceso_ |
| **clickhouse.thread.lock.rw.waiting.read** <br>(gauge) | Número de subproceso en espera de lectura en una tabla RWLock.<br>_Se muestra como subproceso_ |
| **clickhouse.thread.lock.rw.waiting.write** <br>(gauge) | Número de subprocesos en espera de escritura en una tabla RWLock.<br>_Se muestra como subproceso_ |
| **clickhouse.thread.process_time** <br>(gauge) | Porcentaje de tiempo dedicado a procesar subprocesos (consultas y otras tareas) durante el último intervalo.<br>_Se muestra como porcentaje_ |
| **clickhouse.thread.query** <br>(gauge) | El número de subprocesos de procesamiento de consultas<br>_Se muestra como subproceso_ |
| **clickhouse.thread.system.process_time** <br>(gauge) | El porcentaje de tiempo dedicado a procesar (consultas y otras tareas) subprocesos que ejecutan instrucciones de la CPU en el espacio del kernel del SO durante el último intervalo. Esto incluye el tiempo que el pipeline de la CPU estuvo detenido debido a fallos de caché, errores de predicción de ramas, hipergeneración de subprocesos, etc.<br>_Se muestra como porcentaje_ |
| **clickhouse.thread.user.process_time** <br>(gauge) | El porcentaje de tiempo dedicado a procesar (consultas y otras tareas) subprocesos que ejecutan instrucciones de la CPU en el espacio de usuario durante el último intervalo. Esto incluye el tiempo que el pipeline de la CPU estuvo detenido debido a fallos de caché, errores de predicción de bifurcaciones, hipergeneración de subprocesos, etc.<br>_Se muestra como porcentaje_ |
| **clickhouse.threads.async.disk_object_storage.active** <br>(gauge) | Métrica obsoleta, no muestra nada.|
| **clickhouse.threads.async.disk_object_storage.total** <br>(gauge) | Métrica obsoleta, no muestra nada.|
| **clickhouse.threads.async.read** <br>(gauge) | Número de subprocesos en espera de lectura asíncrona.<br>_Se muestra como subproceso_ |
| **clickhouse.threads.azure_object_storage.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de AzureObjectStorage que ejecutan una tarea.|
| **clickhouse.threads.azure_object_storage.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos de AzureObjectStorage.|
| **clickhouse.threads.azure_object_storage.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de AzureObjectStorage.|
| **clickhouse.threads.database_catalog.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de DatabaseCatalog que ejecutan una tarea.|
| **clickhouse.threads.database_catalog.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos DatabaseCatalog.|
| **clickhouse.threads.database_catalog.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de DatabaseCatalog.|
| **clickhouse.threads.database_ondisk.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de DatabaseOnDisk que ejecutan una tarea.|
| **clickhouse.threads.database_ondisk.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos de DatabaseOnDisk.|
| **clickhouse.threads.database_ondisk.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de DatabaseOnDisk.|
| **clickhouse.threads.database_replicated.active** <br>(gauge) | Número de subprocesos activos en el grupo de subprocesos para la creación de tablas en DatabaseReplicated.|
| **clickhouse.threads.database_replicated.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos para la creación de tablas en DatabaseReplicated.|
| **clickhouse.threads.database_replicated.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos para la creación de tablas en DatabaseReplicated.|
| **clickhouse.threads.ddl_worker.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos DDLWORKER para consultas ON CLUSTER que ejecutan una tarea.|
| **clickhouse.threads.ddl_worker.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos DDLWORKER para consultas ON CLUSTER.|
| **clickhouse.threads.ddl_worker.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos DDLWorker para consultas ON CLUSTER.|
| **clickhouse.threads.destroy_aggregates.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos para destruir estados agregados que ejecutan una tarea.|
| **clickhouse.threads.destroy_aggregates.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos para destruir estados agregados.|
| **clickhouse.threads.destroy_aggregates.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos para destruir estados agregados.|
| **clickhouse.threads.distribured.insert.active** <br>(gauge) | Número de subprocesos utilizados para INSERT en tablas distribuidas que ejecutan una tarea.|
| **clickhouse.threads.distribured.insert.scheduled** <br>(gauge) | Número de trabajos en cola o activos utilizados para INSERT en tablas distribuidas.|
| **clickhouse.threads.distribured.insert.total** <br>(gauge) | Número de subprocesos utilizados para INSERT en tablas distribuidas.|
| **clickhouse.threads.dwarf.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de DWARFBlockInputFormat que ejecutan una tarea.|
| **clickhouse.threads.dwarf.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos de DWARFBlockInputFormat.|
| **clickhouse.threads.dwarf.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de DWARFBlockInputFormat.|
| **clickhouse.threads.hashed_dictionary.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de HashedDictionary que ejecutan una tarea.|
| **clickhouse.threads.hashed_dictionary.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos de HashedDictionary.|
| **clickhouse.threads.hashed_dictionary.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de HashedDictionary.|
| **clickhouse.threads.idisk.copier.active** <br>(gauge) | Número de subprocesos para copiar datos entre discos de distintos tipos que ejecutan una tarea.|
| **clickhouse.threads.idisk.copier.scheduled** <br>(gauge) | Número de trabajos en cola o activos para copiar datos entre discos de diferentes tipos.|
| **clickhouse.threads.idisk.copier.total** <br>(gauge) | Número de subprocesos para copiar datos entre discos de distintos tipos.|
| **clickhouse.threads.in_overcommit_tracker.total** <br>(gauge) | Número de subprocesos en espera dentro de OvercommitTracker|
| **clickhouse.threads.io.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de E/S que ejecutan una tarea.|
| **clickhouse.threads.io.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos de E/S.|
| **clickhouse.threads.io.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de E/S.|
| **clickhouse.threads.io_prefetch.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de precarga de E/S que ejecutan una tarea.|
| **clickhouse.threads.io_prefetch.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos de precarga de E/S.|
| **clickhouse.threads.io_prefetch.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de precarga de E/S.|
| **clickhouse.threads.io_writer.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos del escritor de E/S que ejecutan una tarea.|
| **clickhouse.threads.io_writer.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos del escritor de E/S.|
| **clickhouse.threads.io_writer.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos del escritor de E/S.|
| **clickhouse.threads.librdkafka.active** <br>(gauge) | Número de subprocesos librdkafka activos<br>_Se muestra como subproceso_ |
| **clickhouse.threads.marks_loader.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos para las marcas de carga que ejecutan una tarea.|
| **clickhouse.threads.marks_loader.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos para marcas de carga.|
| **clickhouse.threads.marks_loader.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos para cargar marcas.|
| **clickhouse.threads.merge_tree_background_executor.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de MergeTreeBackgroundExecutor que ejecutan una tarea.|
| **clickhouse.threads.merge_tree_background_executor.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos de MergeTreeBackgroundExecutor.|
| **clickhouse.threads.merge_tree_background_executor.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de MergeTreeBackgroundExecutor.|
| **clickhouse.threads.merge_tree_data_selector_executor.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de MergeTreeDataSelectExecutor que ejecutan una tarea.|
| **clickhouse.threads.merge_tree_data_selector_executor.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos de MergeTreeDataSelectExecutor.|
| **clickhouse.threads.merge_tree_data_selector_executor.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de MergeTreeDataSelectExecutor.|
| **clickhouse.threads.merge_tree_outdated_parts_loader.active** <br>(gauge) | Número de subprocesos activos en el grupo de subprocesos para cargar partes de datos obsoletos.|
| **clickhouse.threads.merge_tree_outdated_parts_loader.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos para cargar partes de datos obsoletos.|
| **clickhouse.threads.merge_tree_outdated_parts_loader.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos para cargar partes de datos obsoletos.|
| **clickhouse.threads.merge_tree_parts_cleaner.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos del limpiador de partes de MergeTree que ejecutan una tarea.|
| **clickhouse.threads.merge_tree_parts_cleaner.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos del limpiador de partes de MergeTree.|
| **clickhouse.threads.merge_tree_parts_cleaner.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos del limpiador de partes de MergeTree.|
| **clickhouse.threads.merge_tree_parts_loader.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos del cargador de partes de MergeTree que ejecutan una tarea.|
| **clickhouse.threads.merge_tree_parts_loader.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos del cargador de partes de MergeTree.|
| **clickhouse.threads.merge_tree_parts_loader.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos del cargador de partes de MergeTree.|
| **clickhouse.threads.outdated_parts_loading.active** <br>(gauge) | Número de subprocesos activos en el grupo de subprocesos para cargar partes de datos obsoletos.|
| **clickhouse.threads.outdated_parts_loading.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos para cargar partes de datos obsoletos.|
| **clickhouse.threads.outdated_parts_loading.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos para cargar partes de datos obsoletos.|
| **clickhouse.threads.parallel_formatting_output.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos ParallelFormattingOutputFormatThreads que ejecutan una tarea.|
| **clickhouse.threads.parallel_formatting_output.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos de ParallelFormattingOutputFormatThreads.|
| **clickhouse.threads.parallel_formatting_output.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de ParallelFormattingOutputFormatThreads.|
| **clickhouse.threads.parallel_parsing_input.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos ParallelParsingInputFormat que ejecutan una tarea.|
| **clickhouse.threads.parallel_parsing_input.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos ParallelParsingInputFormat.|
| **clickhouse.threads.parallel_parsing_input.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos ParallelParsingInputFormat.|
| **clickhouse.threads.parquet_decoder.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos ParquetBlockInputFormat que ejecutan una tarea.|
| **clickhouse.threads.parquet_decoder.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos ParquetBlockInputFormat.|
| **clickhouse.threads.parquet_decoder.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos ParquetBlockInputFormat.|
| **clickhouse.threads.parquet_encoder.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos ParquetBlockOutputFormat que ejecutan una tarea.|
| **clickhouse.threads.parquet_encoder.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos ParquetBlockOutputFormat.|
| **clickhouse.threads.parquet_encoder.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos ParquetBlockOutputFormat.|
| **clickhouse.threads.pool.fs_reader.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos para local_filesystem_read_method=threadpool que ejecutan una tarea.|
| **clickhouse.threads.pool.fs_reader.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos para local_filesystem_read_method=threadpool.|
| **clickhouse.threads.pool.fs_reader.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos para local_filesystem_read_method=threadpool.|
| **clickhouse.threads.pool.remote_fs_reader.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos para remote_filesystem_read_method=threadpool que ejecutan una tarea.|
| **clickhouse.threads.pool.remote_fs_reader.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos para remote_filesystem_read_method=threadpool.|
| **clickhouse.threads.pool.remote_fs_reader.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos para remote_filesystem_read_method=threadpool.|
| **clickhouse.threads.query.execution.hard_page_faults.count** <br>(count) | El número de fallos graves de página en subprocesos de ejecución de consultas. Los valores altos indican o bien que olvidaste desactivar swap en tu servidor, o el abandono de páginas de memoria del binario ClickHouse durante una presión de memoria muy alta, o el uso con éxito del método de lectura 'mmap' para los datos de las tablas.<br>_Se muestra como subprocesos_ |
| **clickhouse.threads.query.execution.hard_page_faults.total** <br>(gauge) | El número de fallos graves de página en subprocesos de ejecución de consultas. Los valores altos indican o bien que olvidaste desactivar swap en tu servidor, o el abandono de páginas de memoria del binario ClickHouse durante una presión de memoria muy alta, o el uso con éxito del método de lectura 'mmap' para los datos de las tablas.<br>_Se muestra como subprocesos_ |
| **clickhouse.threads.query.soft_page_faults.count** <br>(count) | El número de fallos leves de página en subprocesos de ejecución de consultas. Un fallo leve de página suele significar un fallo en la caché del asignador de memoria, que requiere una nueva asignación de memoria del sistema operativo y la posterior asignación de un página de memoria física.|
| **clickhouse.threads.query.soft_page_faults.total** <br>(gauge) | El número de fallos leves de página en subprocesos de ejecución de consultas. Un fallo leve de página suele significar un fallo en la caché del asignador de memoria, que requiere una nueva asignación de memoria del sistema operativo y la posterior asignación de un página de memoria física.|
| **clickhouse.threads.query_pipeline_executor.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos PipelineExecutor que ejecutan una tarea.|
| **clickhouse.threads.query_pipeline_executor.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos PipelineExecutor.|
| **clickhouse.threads.query_pipeline_executor.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos PipelineExecutor.|
| **clickhouse.threads.restart_replica.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos RESTART REPLICA que ejecutan una tarea.|
| **clickhouse.threads.restart_replica.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos RESTART REPLICA.|
| **clickhouse.threads.restore.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos para RESTORE que ejecutan una tarea.|
| **clickhouse.threads.restore.scheduled** <br>(gauge) | Número de trabajos en cola o activos para RESTORE.|
| **clickhouse.threads.restore.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos para RESTORE.|
| **clickhouse.threads.s3_object_storage.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de S3ObjectStorage que ejecutan una tarea.|
| **clickhouse.threads.s3_object_storage.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos S3ObjectStorage.|
| **clickhouse.threads.s3_object_storage.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos S3ObjectStorage.|
| **clickhouse.threads.shared_merge_tree.active** <br>(gauge) | Número de subprocesos en los grupos de subprocesos internos de SharedMergeTree que ejecutan una tarea|
| **clickhouse.threads.shared_merge_tree.scheduled** <br>(gauge) | Número de subprocesos en cola o activos en los grupos de subprocesos internos de SharedMergeTree|
| **clickhouse.threads.shared_merge_tree.total** <br>(gauge) | Número de subprocesos en los grupos de subprocesos internos de SharedMergeTree|
| **clickhouse.threads.startup_system_tables.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de StartupSystemTables que ejecutan una tarea.|
| **clickhouse.threads.startup_system_tables.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos StartupSystemTables.|
| **clickhouse.threads.startup_system_tables.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos de StartupSystemTables.|
| **clickhouse.threads.storage_buffer_flush.active** <br>(gauge) | Número de subprocesos para las descargas en segundo plano en StorageBuffer que ejecutan una tarea|
| **clickhouse.threads.storage_buffer_flush.scheduled** <br>(gauge) | Número de subprocesos en cola o activos para las descargas en segundo plano en StorageBuffer|
| **clickhouse.threads.storage_buffer_flush.total** <br>(gauge) | Número de subprocesos para las descargas en segundo plano en StorageBuffer|
| **clickhouse.threads.storage_distributed.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos StorageDistributed que ejecutan una tarea.|
| **clickhouse.threads.storage_distributed.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos StorageDistributed.|
| **clickhouse.threads.storage_distributed.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos StorageDistributed.|
| **clickhouse.threads.storage_hive.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos StorageHive que ejecutan una tarea.|
| **clickhouse.threads.storage_hive.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos StorageHive.|
| **clickhouse.threads.storage_hive.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos StorageHive.|
| **clickhouse.threads.storage_s3.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos StorageS3 que ejecutan una tarea.|
| **clickhouse.threads.storage_s3.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos StorageS3.|
| **clickhouse.threads.storage_s3.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos StorageS3.|
| **clickhouse.threads.system_replicas.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos system.replicas que ejecutan una tarea.|
| **clickhouse.threads.system_replicas.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos system.replicas.|
| **clickhouse.threads.system_replicas.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos system.replicas.|
| **clickhouse.threads.tables_loader_background.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos en segundo plano del cargador de tablas que ejecutan una tarea.|
| **clickhouse.threads.tables_loader_background.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos en segundo plano del cargador de tablas.|
| **clickhouse.threads.tables_loader_background.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos en segundo plano del cargador de tablas.|
| **clickhouse.threads.tables_loader_foreground.active** <br>(gauge) | Número de subprocesos en el grupo de subprocesos en primer plano del cargador de tablas que ejecutan una tarea.|
| **clickhouse.threads.tables_loader_foreground.scheduled** <br>(gauge) | Número de trabajos en cola o activos en el grupo de subprocesos en primer plano del cargador de tablas.|
| **clickhouse.threads.tables_loader_foreground.total** <br>(gauge) | Número de subprocesos en el grupo de subprocesos en primer plano del cargador de tablas.|
| **clickhouse.throttler.local_read.bytes.count** <br>(count) | Bytes pasados a través del limitador 'max_local_read_bandwidth_for_server'/'max_local_read_bandwidth'.|
| **clickhouse.throttler.local_read.bytes.total** <br>(gauge) | Bytes pasados a través del limitador 'max_local_read_bandwidth_for_server'/'max_local_read_bandwidth'.|
| **clickhouse.throttler.local_read.sleep.time** <br>(gauge) | Tiempo total de espera de una consulta para ajustarse a la limitación 'max_local_read_bandwidth_for_server'/'max_local_read_bandwidth'.<br>_Se muestra como microsegundo_ |
| **clickhouse.throttler.local_write.bytes.count** <br>(count) | Bytes pasados a través del limitador 'max_local_write_bandwidth_for_server'/'max_local_write_bandwidth'.|
| **clickhouse.throttler.local_write.bytes.total** <br>(gauge) | Bytes pasados a través del limitador 'max_local_write_bandwidth_for_server'/'max_local_write_bandwidth'.|
| **clickhouse.throttler.local_write.sleep.time** <br>(gauge) | Tiempo total de espera de una consulta para ajustarse a la limitación 'max_local_write_bandwidth_for_server'/'max_local_write_bandwidth'.<br>_Se muestra como microsegundo_ |
| **clickhouse.uptime** <br>(gauge) | El tiempo que ClickHouse ha estado activo.<br>_Se muestra como segundo_ |
| **clickhouse.views.refreshing.current** <br>(gauge) | Número de vistas materializadas que ejecutan actualmente una actualización|
| **clickhouse.views.refreshing.total** <br>(gauge) | Número de vistas materializadas con actualización periódica (REFRESH)|
| **clickhouse.zk.check.count** <br>(count) | Número de solicitudes de "check" a ZooKeeper. Normalmente no tienen sentido de forma aislada, solo como parte de una transacción compleja.|
| **clickhouse.zk.check.total** <br>(gauge) | Número de solicitudes "check" a ZooKeeper. Normalmente no tienen sentido de forma aislada, solo como parte de una transacción compleja.|
| **clickhouse.zk.close.count** <br>(count) | Número de veces que una conexión con ZooKeeper se ha cerrado voluntariamente.|
| **clickhouse.zk.close.total** <br>(gauge) | Número de veces que una conexión con ZooKeeper se ha cerrado voluntariamente.|
| **clickhouse.zk.connection** <br>(gauge) | El número de sesiones (conexiones) a ZooKeeper. No debe ser más de uno, ya que el uso de más de una conexión a ZooKeeper puede dar lugar a errores debido a la falta de linealidad (lecturas obsoletas) que permite el modelo de coherencia de ZooKeeper.<br>_Se muestra como conexión_ |
| **clickhouse.zk.connection.established.count** <br>(count) | Número de veces que se ha establecido una conexión con ZooKeeper.|
| **clickhouse.zk.connection.established.total** <br>(gauge) | Número de veces que se ha establecido una conexión con ZooKeeper.|
| **clickhouse.zk.create.count** <br>(count) | Número de solicitudes "create" a ZooKeeper.<br>_Se muestra como solicitud_ |
| **clickhouse.zk.create.total** <br>(gauge) | Número de solicitudes "create" a ZooKeeper.<br>_Se muestra como solicitud_ |
| **clickhouse.zk.data.exception.count** <br>(count) | Número de excepciones al trabajar con ZooKeeper relacionadas con los datos (ningún nodo, versión incorrecta o similar).|
| **clickhouse.zk.data.exception.total** <br>(gauge) | Número de excepciones al trabajar con ZooKeeper relacionadas con los datos (ningún nodo, versión incorrecta o similar).|
| **clickhouse.zk.ddl_entry.max** <br>(gauge) | Máxima entrada DDL del DDLWorker que se envía a zookeeper.|
| **clickhouse.zk.exist.count** <br>(count) | Número de solicitudes 'exists' a ZooKeeper.<br>_Se muestra como solicitud_ |
| **clickhouse.zk.exist.total** <br>(gauge) | Número de solicitudes 'exists' a ZooKeeper.<br>_Se muestra como solicitud_ |
| **clickhouse.zk.get.count** <br>(count) | Número de solicitudes "get" a ZooKeeper.<br>_Se muestra como solicitud_ |
| **clickhouse.zk.get.total** <br>(gauge) | Número de solicitudes "get" a ZooKeeper.<br>_Se muestra como solicitud_ |
| **clickhouse.zk.list.count** <br>(count) | Número de solicitudes 'list' (getChildren) a ZooKeeper.<br>_Se muestra como solicitud_ |
| **clickhouse.zk.list.total** <br>(gauge) | Número de solicitudes 'list' (getChildren) a ZooKeeper.<br>_Se muestra como solicitud_ |
| **clickhouse.zk.multi.count** <br>(count) | Número de solicitudes "multi" a ZooKeeper (transacciones compuestas).<br>_Se muestra como solicitud_ |
| **clickhouse.zk.multi.total** <br>(gauge) | Número de solicitudes "multi" a ZooKeeper (transacciones compuestas).<br>_Se muestra como solicitud_ |
| **clickhouse.zk.network.exception.count** <br>(count) | Número de excepciones al trabajar con ZooKeeper relacionadas con la red (pérdida de conexión o similar).|
| **clickhouse.zk.network.exception.total** <br>(gauge) | Número de excepciones al trabajar con ZooKeeper relacionadas con la red (pérdida de conexión o similar).|
| **clickhouse.zk.node.ephemeral** <br>(gauge) | El número de nodos efímeros que se mantienen en ZooKeeper.<br>_Se muestra como nodo_ |
| **clickhouse.zk.operation.count** <br>(count) | Número de operaciones de ZooKeeper, que incluyen tanto operaciones de lectura y escritura como multitransacciones.<br>_Se muestra como operación_ |
| **clickhouse.zk.operation.total** <br>(gauge) | Número de operaciones de ZooKeeper, que incluyen tanto operaciones de lectura y escritura como multitransacciones.<br>_Se muestra como operación_ |
| **clickhouse.zk.other.exception.count** <br>(count) | Número de excepciones al trabajar con ZooKeeper distintas de ZooKeeperUserExceptions y ZooKeeperHardwareExceptions.|
| **clickhouse.zk.other.exception.total** <br>(gauge) | Número de excepciones al trabajar con ZooKeeper distintas de ZooKeeperUserExceptions y ZooKeeperHardwareExceptions.|
| **clickhouse.zk.parts.covered.count** <br>(count) | Para fines de depuración. Número de partes en ZooKeeper que tienen una parte de cobertura, pero no existe en el disco. Se comprueba al iniciar el servidor.|
| **clickhouse.zk.parts.covered.total** <br>(gauge) | Para fines de depuración. Número de partes en ZooKeeper que tienen una parte de cobertura, pero no existe en el disco. Se comprueba al iniciar el servidor.|
| **clickhouse.zk.received.size.count** <br>(count) | Número de bytes recibidos a través de la red durante la comunicación con ZooKeeper.<br>_Se muestra como byte_ |
| **clickhouse.zk.received.size.total** <br>(gauge) | Número de bytes recibidos a través de la red durante la comunicación con ZooKeeper.<br>_Se muestra como byte_ |
| **clickhouse.zk.reconfig.count** <br>(count) | Número de solicitudes "reconfig" a ZooKeeper.|
| **clickhouse.zk.reconfig.total** <br>(gauge) | Número de solicitudes "reconfig" a ZooKeeper.|
| **clickhouse.zk.remove.count** <br>(count) | Número de solicitudes "remove" a ZooKeeper.<br>_Se muestra como solicitud_ |
| **clickhouse.zk.remove.total** <br>(gauge) | Número de solicitudes "remove" a ZooKeeper.<br>_Se muestra como solicitud_ |
| **clickhouse.zk.request** <br>(gauge) | El número de solicitudes a ZooKeeper en fly.<br>_Se muestra como solicitud_ |
| **clickhouse.zk.sent.size.count** <br>(count) | Número de bytes enviados a través de la red durante la comunicación con ZooKeeper.<br>_Se muestra como byte_ |
| **clickhouse.zk.sent.size.total** <br>(gauge) | Número de bytes enviados a través de la red durante la comunicación con ZooKeeper.<br>_Se muestra como byte_ |
| **clickhouse.zk.set.count** <br>(count) | Número de solicitudes "set" a ZooKeeper.<br>_Se muestra como solicitud_ |
| **clickhouse.zk.set.total** <br>(gauge) | Número de solicitudes "set" a ZooKeeper.<br>_Se muestra como solicitud_ |
| **clickhouse.zk.sync.count** <br>(count) | Número de solicitudes "sync" a ZooKeeper. Estas solicitudes rara vez son necesarias o utilizables.|
| **clickhouse.zk.sync.total** <br>(gauge) | Número de solicitudes "sync" a ZooKeeper. Estas solicitudes rara vez son necesarias o utilizables.|
| **clickhouse.zk.wait.time** <br>(gauge) | Número de microsegundos transcurridos en espera de respuestas de ZooKeeper después de crear una solicitud, sumados en todos los subprocesos solicitantes.<br>_Se muestra como microsegundo_ |
| **clickhouse.zk.watch** <br>(gauge) | El número de vistas (suscripciones a eventos) en ZooKeeper.<br>_Se muestra como evento_ |
| **clickhouse.zk.watch.count** <br>(count) | El número de vistas (suscripciones a eventos) en ZooKeeper.<br>_Se muestra como evento_ |
| **clickhouse.zk.watch.total** <br>(gauge) | El número de vistas (suscripciones a eventos) en ZooKeeper.<br>_Se muestra como evento_ |

### Eventos

El check de ClickHouse no incluye eventos.

### Checks de servicio

**clickhouse.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse a la base de datos de ClickHouse monitorizada, en caso contrario devuelve `OK`.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).