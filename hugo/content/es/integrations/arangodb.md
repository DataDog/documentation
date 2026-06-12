---
app_id: arangodb
categories:
- almacenamiento en caché
- almacenes de datos
- recopilación de logs
custom_kind: integración
description: Realiza un seguimiento de las métricas de tu configuración de ArangoDB.
integration_version: 4.0.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: ArangoDB
---
## Información general

Este check monitoriza [ArangoDB](https://www.arangodb.com/) a través del Datadog Agent. ArangoDB v3.8 y posteriores son compatibles.

Habilita la integración Datadog-ArangoDB para:

- Identificar las consultas lentas en función de umbrales definidos por el usuario.
- Comprender el impacto de una solicitud larga y solucionar problemas de latencia.
- Monitorizar los límites subyacentes de memoria, disco y caché de RocksDB.

## Configuración

Sigue las instrucciones siguientes para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de ArangoDB está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).

### Configuración

1. Edita el archivo `arangodb.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de ArangoDB. Consulta el [ejemplo de arangodb.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/arangodb/datadog_checks/arangodb/data/conf.yaml.example) para ver todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `arangodb` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **arangodb.agency.cache.callback** <br>(gauge) | Número actual de entradas en la tabla de devoluciones de llamadas de caché de la Agencia.|
| **arangodb.agency.callback** <br>(gauge) | Número actual de devoluciones de llamadas de la Agencia registradas.|
| **arangodb.agency.callback.registered.count** <br>(count) | Número total de devoluciones de llamadas de la Agencia registradas.|
| **arangodb.agency.client.lookup.table_size** <br>(gauge) | Número actual de entradas en la tabla de búsqueda de ID de cliente de la Agencia.<br>_Se muestra como entrada_ |
| **arangodb.agency.commit.bucket** <br>(count) | Distribución de los tiempos de confirmación para todas las operaciones de escritura de la Agencia.<br>_Se muestra como milisegundos_ |
| **arangodb.agency.commit.count** <br>(count) | Distribución de los tiempos de confirmación para todas las operaciones de escritura de la Agencia.<br>_Se muestra como milisegundos_ |
| **arangodb.agency.commit.sum** <br>(count) | Distribución de los tiempos de confirmación para todas las operaciones de escritura de la Agencia.<br>_Se muestra como milisegundos_ |
| **arangodb.agency.compaction.bucket** <br>(count) | Distribución de los tiempos de ejecución de compactación de la Agencia.<br>_Se muestra como milisegundos_ |
| **arangodb.agency.compaction.count** <br>(count) | Distribución de los tiempos de ejecución de compactación de la Agencia.<br>_Se muestra como milisegundos_ |
| **arangodb.agency.compaction.sum** <br>(count) | Distribución de los tiempos de ejecución de compactación de la Agencia.<br>_Se muestra como milisegundos_ |
| **arangodb.agency.log.size** <br>(gauge) | Tamaño de la parte en la memoria de la Agencia de logs replicados en bytes.<br>_Se muestra como bytes_ |
| **arangodb.agency.read.no_leader.count** <br>(count) | Número de operaciones de lectura de la Agencia sin líder o seguidores.|
| **arangodb.agency.read.ok.count** <br>(count) | Número de operaciones de lectura de la Agencia que se han realizado correctamente.|
| **arangodb.agency.request.time.bucket** <br>(count) | Tiempo que han tardado las solicitudes a la Agencia.<br>_Se muestra como milisegundos_ |
| **arangodb.agency.request.time.count** <br>(count) | Tiempo que han tardado las solicitudes a la Agencia.<br>_Se muestra como milisegundos_ |
| **arangodb.agency.request.time.sum** <br>(count) | Tiempo que han tardado las solicitudes a la Agencia.<br>_Se muestra como milisegundos_ |
| **arangodb.agency.supervision.failed.server.count** <br>(count) | Este contador se incrementa cada vez que una ejecución de monitorización encuentra un servidor fallido e inicia un trabajo FailedServer.|
| **arangodb.agency.write.bucket** <br>(count) | Histograma de tiempo de escritura de la Agencia.<br>_Se muestra como milisegundos_ |
| **arangodb.agency.write.count** <br>(count) | Histograma de tiempo de escritura de la Agencia.<br>_Se muestra como milisegundos_ |
| **arangodb.agency.write.no_leader.count** <br>(count) | Número de operaciones de escritura de la Agencia sin líder o seguidores.|
| **arangodb.agency.write.ok.count** <br>(count) | Número de operaciones de escritura de la Agencia que se han realizado correctamente.|
| **arangodb.agency.write.sum** <br>(count) | Histograma de tiempo de escritura de la Agencia.<br>_Se muestra como milisegundos_ |
| **arangodb.aql.all.query.count** <br>(count) | Número total de consultas AQL finalizadas.<br>_Se muestra como consulta_ |
| **arangodb.aql.current.query** <br>(gauge) | Número actual de consultas AQL en ejecución.<br>_Se muestra como consulta_ |
| **arangodb.aql.global.memory.limit** <br>(gauge) | Límite total de memoria para todas las consultas AQL combinadas.<br>_Se muestra como bytes_ |
| **arangodb.aql.global.memory.usage** <br>(gauge) | Uso total de memoria de todas las consultas AQL en ejecución; especificidad: pasos de 32768 bytes.<br>_Se muestra como bytes_ |
| **arangodb.aql.global.query.memory.limit.reached.count** <br>(count) | Número de veces que se ha alcanzado el umbral de memoria de consulta global.|
| **arangodb.aql.local.query.memory.limit.reached.count** <br>(count) | Número de veces que se ha alcanzado un umbral de memoria de consulta local.|
| **arangodb.aql.query.time.bucket** <br>(count) | Histograma del tiempo de ejecución de todas las consultas AQL.|
| **arangodb.aql.query.time.count** <br>(count) | Histograma del tiempo de ejecución de todas las consultas AQL.|
| **arangodb.aql.query.time.sum** <br>(count) | Histograma del tiempo de ejecución de todas las consultas AQL.|
| **arangodb.aql.slow.query.time.bucket** <br>(count) | Histograma del tiempo de ejecución de consultas AQL lentas.|
| **arangodb.aql.slow.query.time.count** <br>(count) | Histograma del tiempo de ejecución de consultas AQL lentas.|
| **arangodb.aql.slow.query.time.sum** <br>(count) | Histograma del tiempo de ejecución de consultas AQL lentas.|
| **arangodb.client.connection.bytes.received.bucket** <br>(count) | Bytes recibidos para una solicitud.<br>_Se muestra como bytes_ |
| **arangodb.client.connection.bytes.received.count** <br>(count) | Bytes recibidos para una solicitud.<br>_Se muestra como bytes_ |
| **arangodb.client.connection.bytes.received.sum** <br>(count) | Bytes recibidos para una solicitud.<br>_Se muestra como bytes_ |
| **arangodb.client.connection.io.time.bucket** <br>(count) | Tiempo de entrada/salida necesario para responder a una solicitud.|
| **arangodb.client.connection.io.time.count** <br>(count) | Tiempo de entrada/salida necesario para responder a una solicitud.|
| **arangodb.client.connection.io.time.sum** <br>(count) | Tiempo de entrada/salida necesario para responder a una solicitud.|
| **arangodb.client.connection.queue.time.bucket** <br>(count) | Tiempo de espera necesario para las solicitudes.<br>_Se muestra como segundos_ |
| **arangodb.client.connection.queue.time.count** <br>(count) | Tiempo de espera necesario para las solicitudes.<br>_Se muestra como segundos_ |
| **arangodb.client.connection.queue.time.sum** <br>(count) | Tiempo de espera necesario para las solicitudes.<br>_Se muestra como segundos_ |
| **arangodb.client.connection.request.time.bucket** <br>(count) | Tiempo necesario para responder a una solicitud.<br>_Se muestra como segundos_ |
| **arangodb.client.connection.request.time.count** <br>(count) | Tiempo necesario para responder a una solicitud.<br>_Se muestra como segundos_ |
| **arangodb.client.connection.request.time.sum** <br>(count) | Tiempo necesario para responder a una solicitud.<br>_Se muestra como segundos_ |
| **arangodb.client.connection.time.bucket** <br>(count) | Tiempo total de conexión de un cliente.<br>_Se muestra como segundos_ |
| **arangodb.client.connection.time.count** <br>(count) | Tiempo total de conexión de un cliente.<br>_Se muestra como segundos_ |
| **arangodb.client.connection.time.sum** <br>(count) | Tiempo total de conexión de un cliente.<br>_Se muestra como segundos_ |
| **arangodb.client.connection.total.time.bucket** <br>(count) | Tiempo total necesario para responder a una solicitud.<br>_Se muestra como segundos_ |
| **arangodb.client.connection.total.time.count** <br>(count) | Tiempo total necesario para responder a una solicitud.<br>_Se muestra como segundos_ |
| **arangodb.client.connection.total.time.sum** <br>(count) | Tiempo total necesario para responder a una solicitud.<br>_Se muestra como segundos_ |
| **arangodb.client.connections** <br>(gauge) | Número de conexiones de cliente que están actualmente abiertas.<br>_Se muestra como conexión_ |
| **arangodb.collection.lock.acquisition.count** <br>(count) | Tiempo total de adquisición de bloqueos de colección.<br>_Se muestra como microsegundos_ |
| **arangodb.collection.lock.sequential_mode.count** <br>(count) | Número de transacciones que utilizan el bloqueo secuencial de colección para evitar bloqueos.<br>_Se muestra como transacción_ |
| **arangodb.collection.lock.timeouts_exclusive.count** <br>(count) | Número de tiempos de espera al intentar adquirir bloqueos exclusivos de colección.<br>_Se muestra como tiempo de espera_ |
| **arangodb.collection.lock.timeouts_write.count** <br>(count) | Número de tiempos de espera al intentar adquirir bloqueos de escritura de colección.<br>_Se muestra como tiempo de espera_ |
| **arangodb.connection_pool.connections.created.count** <br>(count) | Número total de conexiones creadas para el grupo de conexiones.|
| **arangodb.connection_pool.connections.current** <br>(gauge) | Número actual de conexiones en el grupo.|
| **arangodb.connection_pool.lease_time.bucket** <br>(count) | Recuento de tiempo para arrendar una conexión del grupo de conexiones.<br>_Se muestra como milisegundos_ |
| **arangodb.connection_pool.lease_time.count** <br>(count) | Recuento de tiempo para arrendar una conexión del grupo de conexiones.<br>_Se muestra como milisegundos_ |
| **arangodb.connection_pool.lease_time.sum** <br>(count) | Recuento de tiempo para arrendar una conexión del grupo de conexiones.<br>_Se muestra como milisegundos_ |
| **arangodb.connection_pool.leases.failed.count** <br>(count) | Número total de arrendamientos fallidos de conexiones.|
| **arangodb.connection_pool.leases.successful.count** <br>(count) | Número total de arrendamientos exitosos de conexiones del grupo de conexiones.|
| **arangodb.health.dropped_followers.count** <br>(count) | Número total de eventos de seguimiento.<br>_Se muestra como evento_ |
| **arangodb.health.heartbeat.sent.time.bucket** <br>(count) | Recuento de veces necesarias para enviar latidos.<br>_Se muestra como milisegundos_ |
| **arangodb.health.heartbeat.sent.time.count** <br>(count) | Recuento de veces necesarias para enviar latidos.<br>_Se muestra como milisegundos_ |
| **arangodb.health.heartbeat.sent.time.sum** <br>(count) | Recuento de veces necesarias para enviar latidos.<br>_Se muestra como milisegundos_ |
| **arangodb.health.heartbeat_failures.count** <br>(count) | Número total de transmisiones de latidos fallidas.|
| **arangodb.http.async.requests.count** <br>(count) | Número de solicitudes HTTP ejecutadas de forma asíncrona.<br>_Se muestra como solicitud_ |
| **arangodb.http.delete.requests.count** <br>(count) | Número de solicitudes HTTP DELETE.<br>_Se muestra como solicitud_ |
| **arangodb.http.get.requests.count** <br>(count) | Número de solicitudes HTTP GET.<br>_Se muestra como solicitud_ |
| **arangodb.http.head.requests.count** <br>(count) | Número de solicitudes HTTP HEAD.<br>_Se muestra como solicitud_ |
| **arangodb.http.options.requests.count** <br>(count) | Número de solicitudes HTTP OPTIONS.<br>_Se muestra como solicitud_ |
| **arangodb.http.other.requests.count** <br>(count) | Número de otras solicitudes HTTP ilegales.<br>_Se muestra como solicitud_ |
| **arangodb.http.patch.requests.count** <br>(count) | Número de solicitudes HTTP PATCH.<br>_Se muestra como solicitud_ |
| **arangodb.http.post.requests.count** <br>(count) | Número de solicitudes HTTP POST.<br>_Se muestra como solicitud_ |
| **arangodb.http.put.requests.count** <br>(count) | Número de solicitudes HTTP PUT.<br>_Se muestra como solicitud_ |
| **arangodb.http.total.requests.count** <br>(count) | Número total de solicitudes HTTP.<br>_Se muestra como solicitud_ |
| **arangodb.http.user.requests.count** <br>(count) | Número total de solicitudes HTTP ejecutadas por clientes usuarios.<br>_Se muestra como solicitud_ |
| **arangodb.http2.connections.count** <br>(count) | Número total de conexiones aceptadas para HTTP/2.|
| **arangodb.network.forwarded.requests.count** <br>(count) | Número de solicitudes reenviadas a otro Coordinador.<br>_Se muestra como solicitud_ |
| **arangodb.network.request.timeouts.count** <br>(count) | Número de solicitudes internas que han expirado.<br>_Se muestra como solicitud_ |
| **arangodb.network.requests.in.flight** <br>(gauge) | Número de solicitudes internas salientes en tránsito.<br>_Se muestra como solicitud_ |
| **arangodb.process.page.faults.major.count** <br>(count) | Número de fallos de página importantes.<br>_Se muestra como fallo_ |
| **arangodb.process.page.faults.minor.count** <br>(count) | Número de fallos de página menores.<br>_Se muestra como fallo_ |
| **arangodb.process.resident_set_size** <br>(gauge) | Tamaño total del número de páginas que el proceso tiene en memoria real.<br>_Se muestra como bytes_ |
| **arangodb.process.system_time** <br>(gauge) | Cantidad de tiempo que este proceso ha estado programado en modo kernel.<br>_Se muestra como segundos_ |
| **arangodb.process.threads** <br>(gauge) | Número de subprocesos.<br>_Se muestra como subproceso_ |
| **arangodb.process.user_time** <br>(gauge) | Cantidad de tiempo que este proceso ha estado programado en modo usuario.<br>_Se muestra como segundos_ |
| **arangodb.process.virtual_memory_size** <br>(gauge) | Lado de la memoria virtual que el proceso está utilizando.<br>_Se muestra como bytes_ |
| **arangodb.rocksdb.actual.delayed.write.rate** <br>(gauge) | Frecuencia real de escritura RocksDB atrasada.|
| **arangodb.rocksdb.archived.wal.files** <br>(gauge) | Número de archivos WAL de RocksDB en el archivo.<br>_Se muestra como archivo_ |
| **arangodb.rocksdb.background.errors** <br>(gauge) | Número total de errores RocksDB en segundo plano.<br>_Se muestra como error_ |
| **arangodb.rocksdb.base.level** <br>(gauge) | Número del nivel al que se compactarán los datos L0.|
| **arangodb.rocksdb.block.cache.capacity** <br>(gauge) | Capacidad de la caché de bloques en bytes.<br>_Se muestra como bytes_ |
| **arangodb.rocksdb.block.cache.pinned.usage** <br>(gauge) | Tamaño de memoria del caché de bloques RocksDB para las entradas que están ancladas.<br>_Se muestra como bytes_ |
| **arangodb.rocksdb.block.cache.usage** <br>(gauge) | Tamaño total de memoria para las entradas que residen en la caché de bloques.<br>_Se muestra como bytes_ |
| **arangodb.rocksdb.cache.allocated** <br>(gauge) | Asignación global actual para la caché de ArangoDB que se encuentra delante de RocksDB.<br>_Se muestra como bytes_ |
| **arangodb.rocksdb.cache.hit.rate.lifetime** <br>(gauge) | Tasa de aciertos reciente de la caché en memoria de ArangoDB que se encuentra delante de RocksDB.|
| **arangodb.rocksdb.cache.limit** <br>(gauge) | Límite de asignación global actual para las cachés de ArangoDB que se encuentran delante de RocksDB.<br>_Se muestra como bytes_ |
| **arangodb.rocksdb.collection_lock.acquisition_time.bucket** <br>(count) | Histograma de los tiempos de adquisición de bloqueos de colección/fragmento.<br>_Se muestra como segundos_ |
| **arangodb.rocksdb.collection_lock.acquisition_time.count** <br>(count) | Histograma de los tiempos de adquisición de bloqueos de colección/fragmento.<br>_Se muestra como segundos_ |
| **arangodb.rocksdb.collection_lock.acquisition_time.sum** <br>(count) | Histograma de los tiempos de adquisición de bloqueos de colección/fragmento.<br>_Se muestra como segundos_ |
| **arangodb.rocksdb.compaction.pending** <br>(gauge) | Número de familias de columnas para las que está pendiente al menos una compactación.|
| **arangodb.rocksdb.cur.size.active.mem.table** <br>(gauge) | Tamaño aproximado de la memtable activa en bytes, sumado en todas las familias de columnas.<br>_Se muestra como bytes_ |
| **arangodb.rocksdb.cur.size.all.mem.tables** <br>(gauge) | Tamaño aproximado de las memtables inmutables activas y no vaciadas en bytes, sumado en todas las familias de columnas.<br>_Se muestra como bytes_ |
| **arangodb.rocksdb.engine.throttle.bps** <br>(gauge) | Límite de frecuencia de escritura actual del límite RocksDB en ArangoDB.<br>_Se muestra como bytes_ |
| **arangodb.rocksdb.estimate.live.data.size** <br>(gauge) | Cálculo de la cantidad de datos activos en bytes, sumado en todas las familias de columnas.<br>_Se muestra como bytes_ |
| **arangodb.rocksdb.estimate.num.keys** <br>(gauge) | Número estimado de claves totales en las memtables y almacenamientos inmutables activos y no vaciados, sumado en todas las familias de columnas.<br>_Se muestra como clave_ |
| **arangodb.rocksdb.estimate.pending.compaction.bytes** <br>(gauge) | Número total estimado de bytes que la compactación necesita reescribir para reducir todos los niveles por debajo del tamaño objetivo.<br>_Se muestra como bytes_ |
| **arangodb.rocksdb.estimate.table.readers.mem** <br>(gauge) | Memoria estimada utilizada para la lectura de tablas SST, excluyendo la memoria utilizada en cachés de bloques (por ejemplo, bloques de filtros e índices), sumada en todas las familias de columnas.<br>_Se muestra como bytes_ |
| **arangodb.rocksdb.free.disk.space** <br>(gauge) | Espacio de disco actualmente libre en bytes en el volumen utilizado por RocksDB.<br>_Se muestra como bytes_ |
| **arangodb.rocksdb.free.inodes** <br>(gauge) | Número actualmente libre de inodos en el volumen de disco utilizado por RocksDB.<br>_Se muestra como inodo_ |
| **arangodb.rocksdb.live.sst.files.size** <br>(gauge) | Tamaño total en bytes de todos los archivos SST pertenecientes al último árbol LSM, sumado en todas las familias de columnas.<br>_Se muestra como bytes_ |
| **arangodb.rocksdb.mem.table.flush.pending** <br>(gauge) | Número de familias de columnas para las que está pendiente un vaciado de memtable.|
| **arangodb.rocksdb.min.log.number.to.keep** <br>(gauge) | Número mínimo de logs de los archivos de log que deben conservarse.|
| **arangodb.rocksdb.num.deletes.active.mem.table** <br>(gauge) | Número total de entradas de borrado en la memtable activa, sumado en todas las familias de columnas.<br>_Se muestra como entrada_ |
| **arangodb.rocksdb.num.deletes.imm.mem.tables** <br>(gauge) | Número total de entradas de borrado en las memtables inmutables no vaciadas, sumado en todas las familias de columnas.<br>_Se muestra como entrada_ |
| **arangodb.rocksdb.num.entries.active.mem.table** <br>(gauge) | Número total de entradas en la memtable activa, sumado en todas las familias de columnas.<br>_Se muestra como entrada_ |
| **arangodb.rocksdb.num.entries.imm_mem.tables** <br>(gauge) | Número total de entradas en las memtables inmutables no vaciadas, sumado en todas las familias de columnas.<br>_Se muestra como entrada_ |
| **arangodb.rocksdb.num.immutable.mem.table** <br>(gauge) | Número de memtables inmutables que aún no se han vaciado.|
| **arangodb.rocksdb.num.immutable.mem.table.flushed** <br>(gauge) | Número de memtables inmutables que ya han sido vaciadas.|
| **arangodb.rocksdb.num.live.versions** <br>(gauge) | Número de versiones activas.|
| **arangodb.rocksdb.num.running.compactions** <br>(gauge) | Número de compactaciones en ejecución.|
| **arangodb.rocksdb.num.running.flushes** <br>(gauge) | Número de descargas en ejecución.<br>_Se muestra como descarga_ |
| **arangodb.rocksdb.num.snapshots** <br>(gauge) | Número de snapshots no lanzados de la base de datos.|
| **arangodb.rocksdb.prunable.wal.files** <br>(gauge) | Número total de archivos WAL de RocksDB en el subdirectorio de archivos que pueden ser eliminados.<br>_Se muestra como archivo_ |
| **arangodb.rocksdb.size.all.mem.tables** <br>(gauge) | Tamaño aproximado de todas las memtables activas, inmutables no vaciadas e inmutables fijadas en bytes, sumado en todas las familias de columnas.<br>_Se muestra como bytes_ |
| **arangodb.rocksdb.total.disk.space** <br>(gauge) | Tamaño total en bytes de todos los archivos SST, sumado en todas las familias de columnas.<br>_Se muestra como bytes_ |
| **arangodb.rocksdb.total.inodes** <br>(gauge) | Número actual de inodos en el volumen de disco utilizado por RocksDB.<br>_Se muestra como inodo_ |
| **arangodb.rocksdb.total.sst.files.size** <br>(gauge) | Tamaño total en bytes de todos los archivos SST, sumado en todas las familias de columnas.<br>_Se muestra como bytes_ |
| **arangodb.rocksdb.write.stalls.count** <br>(count) | Número de veces que RocksDB ha entrado en un estado de escritura frenado (ralentizado).|
| **arangodb.rocksdb.write.stop.count** <br>(count) | Número de veces que RocksDB ha entrado en un estado de escritura detenido.|
| **arangodb.rocksdb.write.stops.count** <br>(count) | Número de veces que ArangoDB ha observado a RocksDB entrar en un estado de escritura detenido.|
| **arangodb.server.cpu_cores** <br>(gauge) | Número de núcleos de CPU visibles para el proceso arangod.|
| **arangodb.server.idle_percent** <br>(gauge) | Porcentaje de tiempo que las CPU del sistema han estado inactivas.<br>_Se muestra como porcentaje_ |
| **arangodb.server.iowait_percent** <br>(gauge) | Porcentaje de tiempo que las CPU del sistema han estado esperando E/S.<br>_Se muestra como porcentaje_ |
| **arangodb.server.kernel_mode.percent** <br>(gauge) | Porcentaje de tiempo que las CPU del sistema han pasado en modo kernel.<br>_Se muestra como porcentaje_ |
| **arangodb.server.physical_memory** <br>(gauge) | Memoria física del sistema en bytes.<br>_Se muestra como bytes_ |
| **arangodb.server.user_mode.percent** <br>(gauge) | Porcentaje de tiempo que las CPU del sistema han pasado en modo usuario.<br>_Se muestra como porcentaje_ |
| **arangodb.transactions.aborted.count** <br>(count) | Número de transacciones canceladas.<br>_Se muestra como transacción_ |
| **arangodb.transactions.committed.count** <br>(count) | Número de transacciones confirmadas.<br>_Se muestra como transacción_ |
| **arangodb.transactions.expired.count** <br>(count) | Número de transacciones expiradas, es decir, transacciones que se han iniciado pero que se han recogido automáticamente como basura debido a la inactividad dentro del periodo de tiempo de vida (TTL) de las transacciones.<br>_Se muestra como transacción_ |
| **arangodb.transactions.read.count** <br>(count) | Número de transacciones de solo lectura.<br>_Se muestra como transacción_ |
| **arangodb.transactions.started.count** <br>(count) | Número de transacciones iniciadas/empezadas.<br>_Se muestra como transacción_ |
| **arangodb.vst.connections.count** <br>(count) | Número total de conexiones aceptadas para VST.|

### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

Para recopilar logs de tu instancia de ArangoDB, primero asegúrate de que tu ArangoDB está configurado para enviar logs a un archivo.
Por ejemplo, si utilizas el archivo `arangod.conf` para configurar tu instancia de ArangoDB, debes incluir lo siguiente:

```
# ArangoDB configuration file
#
# Documentation:
# https://www.arangodb.com/docs/stable/administration-configuration.html
#

...

[log]
file = /var/log/arangodb3/arangod.log 

...
```

Los logs de ArangoDB contienen [muchas opciones](https://www.arangodb.com/docs/3.8/programs-arangod-log.html) de verbosidad de logs y archivos de salida. El pipeline de la integración Datadog admite el patrón de conversión por defecto.

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Descomenta y edita el bloque de configuración de logs en tu archivo `arangodb.d/conf.yaml`:

   ```yaml
   logs:
      - type: file
        path: /var/log/arangodb3/arangod.log
        source: arangodb
   ```

### Eventos

La integración ArangoDB no incluye eventos.

### Checks de servicio

**arangodb.openmetrics.health**

Devuelve `CRITICAL` si el Agent no puede conectarse al endpoint de OpenMetrics, en caso contrario devuelve `OK`.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).