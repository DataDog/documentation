---
app_id: etcd
categories:
- orchestration
- containers
- configuration & deployment
- log collection
custom_kind: integración
description: Rastreo de escrituras, actualizaciones, eliminaciones, latencias entre
  nodos y más métricas de Etcd.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-etcd-performance
  tag: blog
  text: Monitorizar el rendimiento de etcd
- link: https://www.datadoghq.com/blog/monitor-etcd-with-datadog/
  tag: blog
  text: Cómo monitorizar etcd con Datadog
- link: https://www.datadoghq.com/blog/etcd-monitoring-tools/
  tag: blog
  text: Herramientas para recopilar métricas y logs de etcd
- link: https://www.datadoghq.com/blog/etcd-key-metrics/
  tag: blog
  text: Métricas clave para monitorizar etcd
integration_version: 9.0.0
media: []
supported_os:
- linux
- macos
- windows
title: etcd
---
![Dashboard de Etcd](https://raw.githubusercontent.com/DataDog/integrations-core/master/etcd/images/etcd_dashboard.png)

## Información general

Recopila métricas de Etcd para:

- Monitorizar el estado de tu clúster Etcd.
- Saber cuándo es posible que las configuraciones de hosts estén desincronizadas.
- Correlacionar el rendimiento de Etcd con el del resto de tus aplicaciones.

## Configuración

### Instalación

El check de Etcd está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus instancias de Etcd.

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `etcd.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para comenzar a recopilar tus datos de rendimiento Etcd. Consulta el [ejemplo etcd.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/conf.yaml.example) para todas las opciones de configuración disponibles.
1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

##### Recopilación de logs

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Descomenta y edita este bloque de configuración en la parte inferior de tu `etcd.d/conf.yaml`:

   ```yaml
   logs:
     - type: file
       path: "<LOG_FILE_PATH>"
       source: etcd
       service: "<SERVICE_NAME>"
   ```

   Cambia los valores de los parámetros `path` y `service` en función de tu entorno. Consulta el [ejemplo etcd.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Containerized" %}}

#### En contenedores

Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                                |
| -------------------- | ---------------------------------------------------- |
| `<INTEGRATION_NAME>` | `etcd`                                               |
| `<INIT_CONFIG>`      | en blanco o `{}`                                        |
| `<INSTANCE_CONFIG>`  | `{"prometheus_url": "http://%%host%%:2379/metrics"}` |

##### Recopilación de logs

La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent. Para activarla, consulta [recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

| Parámetro      | Valor                                             |
| -------------- | ------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "etcd", "service": "<SERVICE_NAME>"}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando del Agent `status` ](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `etcd` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **etcd.debugging.mvcc.db.compaction.keys.total** <br>(count) | Número total de claves de base de datos compactadas.<br>_Se muestra como clave_ |
| **etcd.debugging.mvcc.db.compaction.pause.duration.milliseconds** <br>(gauge) | Histograma en buckets de la duración de la pausa de compactación de base de datos.<br>_Se muestra como milisegundos_ |
| **etcd.debugging.mvcc.db.compaction.total.duration.milliseconds** <br>(gauge) | Histograma en buckets de la duración total de la compactación de base de datos.<br>_Se muestra como milisegundos_ |
| **etcd.debugging.mvcc.db.total.size.in_bytes** <br>(gauge) | Tamaño total de la base de datos subyacente en bytes.<br>_Se muestra como byte_ |
| **etcd.debugging.mvcc.delete.total** <br>(count) | Número total de eliminaciones consultadas por este miembro.<br>_Se muestra como consulta_ |
| **etcd.debugging.mvcc.events.total** <br>(count) | Número total de eventos enviados por este miembro.<br>_Se muestra como evento_ |
| **etcd.debugging.mvcc.index.compaction.pause.duration.milliseconds** <br>(gauge) | Histograma en buckets de la duración de la pausa de compactación de índices.<br>_Se muestra en milisegundos_ |
| **etcd.debugging.mvcc.keys.total** <br>(gauge) | Número total de claves.<br>_Se muestra como clave_ |
| **etcd.debugging.mvcc.pending.events.total** <br>(gauge) | Número total de eventos pendientes de envío.<br>_Se muestra como evento_ |
| **etcd.debugging.mvcc.put.total** <br>(count) | Número total de puestas consultadas por este miembro.<br>_Se muestra como consulta_ |
| **etcd.debugging.mvcc.range.total** <br>(count) | Número total de rangos consultados por este miembro.<br>_Se muestra como consulta_ |
| **etcd.debugging.mvcc.slow_watcher.total** <br>(gauge) | Número total de observadores lentos no sincronizados.<br>_Se muestra como connection (conexión)_ |
| **etcd.debugging.mvcc.txn.total** <br>(count) | Número total de transacciones consultadas por este miembro.<br>_Se muestra como transacción_ |
| **etcd.debugging.mvcc.watch_stream.total** <br>(gauge) | Número total de streams (flujos) de observación.<br>_Se muestra como connection (conexión)_ |
| **etcd.debugging.mvcc.watcher.total** <br>(gauge) | Número total de observadores.<br>_Se muestra como connection (conexión)_ |
| **etcd.debugging.server.lease.expired.total** <br>(count) | El número total de contratos de arrendamiento vencidos.<br>_Se muestra como elemento_ |
| **etcd.debugging.snap.save.marshalling.duration.seconds** <br>(gauge) | Las distribuciones de costos de administración de guardado llamado por instantánea.<br>_Se muestra como segundo_ |
| **etcd.debugging.snap.save.total.duration.seconds** <br>(gauge) | Las distribuciones de latencia total de guardado llamado por instantánea.<br>_Se muestra como segundo_ |
| **etcd.debugging.store.expires.total** <br>(count) | Número total de claves caducadas.<br>_Se muestra como clave_ |
| **etcd.debugging.store.reads.total** <br>(count) | Número total de acción de lecturas (get/getRecursive), local a este miembro.<br>_Se muestra como lectura_ |
| **etcd.debugging.store.watch.requests.total** <br>(count) | Número total de solicitudes de observación entrantes (nuevas o restablecidas).<br>_Se muestra como solicitud_ |
| **etcd.debugging.store.watchers** <br>(gauge) | Count de observadores actualmente activas.<br>_Se muestra como connection (conexión)_ |
| **etcd.debugging.store.writes.total** <br>(count) | Número total de escrituras (por ejemplo, set/compareAndDelete) consultadas por este miembro.<br>_Se muestra como escritura_ |
| **etcd.disk.backend.commit.duration.seconds** <br>(gauge) | Las distribuciones de latencia de confirmación llamada por el backend.<br>_Se muestra como segundo_ |
| **etcd.disk.backend.snapshot.duration.seconds** <br>(gauge) | La distribución de la latencia de las instantáneas del backend.<br>_Se muestra como segundo_ |
| **etcd.disk.wal.fsync.duration.seconds.count** <br>(count) | El count de las distribuciones de latencia de fsync llamado por wal.<br>_Se muestra como segundo_ |
| **etcd.disk.wal.fsync.duration.seconds.sum** <br>(gauge) | La suma de las distribuciones de latencia de fsync llamado por wal.<br>_Se muestra como segundo_ |
| **etcd.disk.wal.write.bytes.total** <br>(gauge) | Número total de bytes escritos en WAL<br>_Se muestra como byte_ |
| **etcd.etcd.server.client.requests.total** <br>(count) | Número total de solicitudes de clientes por versión de cliente<br>_Se muestra como solicitud_ |
| **etcd.go.gc.duration.seconds** <br>(gauge) | Un resumen de las duraciones de invocación GC.<br>_Se muestra como segundo_ |
| **etcd.go.goroutines** <br>(gauge) | Número de goroutines que existen actualmente.<br>_Se muestra como subproceso_ |
| **etcd.go.info** <br>(gauge) | Información sobre el entorno Go.<br>_Se muestra como elemento_ |
| **etcd.go.memstats.alloc.bytes** <br>(gauge) | Número de bytes asignados y aún en uso.<br>_Se muestra como byte_ |
| **etcd.go.memstats.alloc.bytes.total** <br>(count) | Número total de bytes asignados, incluso si se han liberado.<br>_Se muestra como byte_ |
| **etcd.go.memstats.buck.hash.sys.bytes** <br>(gauge) | Número de bytes utilizados por la tabla hash del bucket de generación de perfiles.<br>_Se muestra como byte_ |
| **etcd.go.memstats.frees.total** <br>(count) | Número total de libres.<br>_Se muestra como ocurrencia_ |
| **etcd.go.memstats.gc.cpu.fraction** <br>(gauge) | La fracción del tiempo de CPU disponible de este programa utilizado por el GC desde que se inició el programa.<br>_Se muestra como cpu_ |
| **etcd.go.memstats.gc.sys.bytes** <br>(gauge) | Número de bytes utilizados para los metadatos del sistema de recolección de basura.<br>_Se muestra como byte_ |
| **etcd.go.memstats.heap.alloc.bytes** <br>(gauge) | Número de bytes del montón asignados y aún en uso.<br>_Se muestra como byte_ |
| **etcd.go.memstats.heap.idle.bytes** <br>(gauge) | Número de bytes del montón en espera de ser utilizados.<br>_Se muestra como byte_ |
| **etcd.go.memstats.heap.inuse.bytes** <br>(gauge) | Número de bytes del montón que están en uso.<br>_Se muestra como byte_ |
| **etcd.go.memstats.heap.objects** <br>(gauge) | Número de objetos asignados.<br>_Se muestra como elemento_ |
| **etcd.go.memstats.heap.released.bytes** <br>(gauge) | Número de bytes de montón liberados al sistema operativo.<br>_Se muestra como byte_ |
| **etcd.go.memstats.heap.sys.bytes** <br>(gauge) | Número de bytes del montón obtenidos del sistema.<br>_Se muestra como byte_ |
| **etcd.go.memstats.last.gc.time.seconds** <br>(gauge) | Número de segundos transcurridos desde 1970 de la última recolección de basura.<br>_Se muestra como segundo_ |
| **etcd.go.memstats.lookups.total** <br>(count) | Número total de búsquedas de punteros.<br>_Se muestra como ocurrencia_ |
| **etcd.go.memstats.mallocs.total** <br>(count) | Número total de asignaciones de memoria.<br>_Se muestra como ocurrencia_ |
| **etcd.go.memstats.mcache.inuse.bytes** <br>(gauge) | Número de bytes en uso por las estructuras memoria caché.<br>_Se muestra como byte_ |
| **etcd.go.memstats.mcache.sys.bytes** <br>(gauge) | Número de bytes utilizados para las estructuras memoria caché obtenidas del sistema.<br>_Se muestra como byte_ |
| **etcd.go.memstats.mspan.inuse.bytes** <br>(gauge) | Número de bytes en uso por las estructuras mspan.<br>_Se muestra como byte_ |
| **etcd.go.memstats.mspan.sys.bytes** <br>(gauge) | Número de bytes utilizados para las estructuras mspan obtenidas del sistema.<br>_Se muestra como byte_ |
| **etcd.go.memstats.next.gc.bytes** <br>(gauge) | Número de bytes del montón en que se realizará la próxima recolección de basura.<br>_Se muestra como byte_ |
| **etcd.go.memstats.other.sys.bytes** <br>(gauge) | Número de bytes utilizados para otras asignaciones del sistema.<br>_Se muestra como byte_ |
| **etcd.go.memstats.stack.inuse.bytes** <br>(gauge) | Número de bytes en uso por el asignador de stack tecnológico.<br>_Se muestra como byte_ |
| **etcd.go.memstats.stack.sys.bytes** <br>(gauge) | Número de bytes obtenidos del sistema para el asignador de stack tecnológico.<br>_Se muestra como byte_ |
| **etcd.go.memstats.sys.bytes** <br>(gauge) | Número de bytes obtenidos del sistema.<br>_Se muestra como byte_ |
| **etcd.go.threads** <br>(gauge) | Número de subprocesos del sistema operativo creados.<br>_Se muestra como subproceso_ |
| **etcd.grpc.proxy.cache.hits.total** <br>(gauge) | Número total de accesos a la caché<br>_Se muestra como ocurrencia_ |
| **etcd.grpc.proxy.cache.keys.total** <br>(gauge) | Número total de claves/rangos almacenados en caché<br>_Se muestra como elemento_ |
| **etcd.grpc.proxy.cache.misses.total** <br>(gauge) | Número total de faltas de caché<br>_Se muestra como ocurrencia_ |
| **etcd.grpc.proxy.events.coalescing.total** <br>(count) | Número total de eventos coalescentes<br>_Se muestra como evento_ |
| **etcd.grpc.proxy.watchers.coalescing.total** <br>(gauge) | Número total de observadores actuales coalesciendo<br>_Se muestra como connection (conexión)_ |
| **etcd.grpc.server.handled.total** <br>(count) | Número total de RPC completados en el servidor, independientemente del éxito o fracaso.<br>_Se muestra como operación_ |
| **etcd.grpc.server.msg.received.total** <br>(count) | Número total de mensajes de stream (flujo) RPC recibidos en el servidor.<br>_Se muestra como operación_ |
| **etcd.grpc.server.msg.sent.total** <br>(count) | Número total de mensajes de stream (flujo) gRPC enviados por el servidor.<br>_Se muestra como operación_ |
| **etcd.grpc.server.started.total** <br>(count) | Número total de RPC iniciadas en el servidor.<br>_Se muestra como operación_ |
| **etcd.leader.counts.fail** <br>(gauge) | Tasa de solicitudes RPC de Raft fallidas (solo la API de ETCD V2)<br>_Se muestra como solicitud_ |
| **etcd.leader.counts.success** <br>(gauge) | Tasa de solicitudes RPC Raft realizadas con éxito (solo la API de ETCD V2)<br>_Se muestra como solicitud_ |
| **etcd.leader.latency.avg** <br>(gauge) | Latencia media para cada uno del mismo nivel del clúster (solo la API  de ETCD V2)<br>_Se muestra en milisegundos_. |
| **etcd.leader.latency.current** <br>(gauge) | Latencia actual para cada uno del mismo nivel del clúster (solo la API de ETCD V2)<br>_Se muestra en milisegundos_ |
| **etcd.leader.latency.max** <br>(gauge) | Latencia máxima para cada uno del mismo nivel del clúster (solo la API de ETCD V2)<br>_Se muestra en milisegundos_ |
| **etcd.leader.latency.min** <br>(gauge) | Latencia mínima para cada uno del mismo nivel del clúster (solo la API de ETCD V2)<br>_Se muestra en milisegundos_ |
| **etcd.leader.latency.stddev** <br>(gauge) | Latencia de desviación estándar a cada uno del mismo nivel del clúster (solo la API de ETCD V2)<br>_Se muestra en milisegundos_ |
| **etcd.mvcc.db.total.size.in_use.bytes** <br>(gauge) | Tamaño total de la base de datos subyacente lógicamente en uso<br>_Se muestra como byte_ |
| **etcd.network.active_peers** <br>(gauge) | El número actual de connections (conexiones) activas del mismo nivel<br>_Se muestra como connection (conexión)_ |
| **etcd.network.client.grpc.received.bytes.total** <br>(count) | El número total de bytes recibidos de los clientes grpc.<br>_Se muestra como byte_ |
| **etcd.network.client.grpc.sent.bytes.total** <br>(count) | El número total de bytes enviados a los clientes grpc.<br>_Se muestra como byte_ |
| **etcd.network.disconnected_peers.total** <br>(count) | El número total de pares desconectados<br>_Se muestra como connection (conexión)_ |
| **etcd.network.peer.received.bytes.total** <br>(count) | El número total de bytes recibidos de los pares.<br>_Se muestra como byte_ |
| **etcd.network.peer.received.failures.total** <br>(count) | El número total de fallos de recepción de pares<br>_Se muestra como evento_ |
| **etcd.network.peer.round_trip_time.seconds** <br>(gauge) | Histograma de tiempo de ida y vuelta entre pares.<br>_Se muestra como segundo_ |
| **etcd.network.peer.sent.bytes.total** <br>(count) | El número total de bytes enviados a los pares.<br>_Se muestra como byte_ |
| **etcd.network.peer.sent.failures.total** <br>(count) | El número total de fallos de envío de los pares<br>_Se muestra como evento_ |
| **etcd.network.snapshot.receive.failures.total** <br>(count) | Número total de fallos de recepción de instantáneas<br>_Se muestra como evento_ |
| **etcd.network.snapshot.receive.inflights.total** <br>(gauge) | Número total de envíos de instantáneas a bordo<br>_Se muestra como evento_ |
| **etcd.network.snapshot.receive.success.total** <br>(count) | Número total de instantáneas recibidas con éxito<br>_Se muestra como evento_ |
| **etcd.network.snapshot.receive.total.duration.seconds.count** <br>(gauge) | Distribuciones de latencia total de la instantánea v3 recibida<br>_Se muestra como segundo_ |
| **etcd.network.snapshot.receive.total.duration.seconds.sum** <br>(gauge) | Distribuciones de latencia total de la instantánea v3 recibida<br>_Se muestra como segundo_ |
| **etcd.network.snapshot.send.failures.total** <br>(count) | El número total de fallos de envío de los pares<br>_Se muestra como evento_ |
| **etcd.network.snapshot.send.inflights.total** <br>(gauge) | Número total de instantáneas recibidas durante el vuelo<br>_Se muestra como evento_ |
| **etcd.network.snapshot.send.sucess.total** <br>(count) | Número total de envíos de instantáneas con éxito<br>_Se muestra como evento_ |
| **etcd.network.snapshot.send.total.duration.seconds.count** <br>(gauge) | Distribuciones de latencia total de los envíos de instantáneas v3<br>_Se muestra como segundo_ |
| **etcd.network.snapshot.send.total.duration.seconds.sum** <br>(gauge) | Distribuciones de latencia total de los envíos de instantáneas v3<br>_Se muestra como segundo_ |
| **etcd.os.fd.limit** <br>(gauge) | El límite del descriptor de archivo<br>_Se muestra como objeto_ |
| **etcd.os.fd.used** <br>(gauge) | El número de descriptores de archivo utilizados<br>_Se muestra como objeto_ |
| **etcd.process.cpu.seconds.total** <br>(count) | Tiempo total de CPU del usuario y del sistema empleado en segundos.<br>_Se muestra como cpu_ |
| **etcd.process.max.fds** <br>(gauge) | Número máximo de descriptores de archivo abiertos.<br>_Se muestra como elemento_ |
| **etcd.process.open.fds** <br>(gauge) | Número de descriptores de archivo abiertos.<br>_Se muestra as elemento_ |
| **etcd.process.resident.memory.bytes** <br>(gauge) | Tamaño de la memoria residente en bytes.<br>_Se muestra como byte_ |
| **etcd.process.start.time.seconds** <br>(gauge) | Hora de inicio del proceso desde la época unix en segundos.<br>_Se muestra como segundo_ |
| **etcd.process.virtual.memory.bytes** <br>(gauge) | Tamaño de la memoria virtual en bytes.<br>_Se muestra como byte_ |
| **etcd.self.recv.appendrequest.count** <br>(gauge) | Tasa de solicitudes de anexión que este nodo ha procesado (solo la API de ETCD V2)<br>_Se muestra como solicitud_ |
| **etcd.self.recv.bandwidthrate** <br>(gauge) | Tasa de bytes recibidos (solo la API de ETCD V2)<br>_Se muestra como byte_ |
| **etcd.self.recv.pkgrate** <br>(gauge) | Tasa de paquetes recibidos (soólo la API de ETCD V2)<br>_Se muestra como paquete_ |
| **etcd.self.send.appendrequest.count** <br>(gauge) | Tasa de solicitudes de anexión que ha enviado este nodo (solo la API de ETCD V2)<br>_Mostrado como solicitud_ |
| **etcd.self.send.bandwidthrate** <br>(gauge) | Tasa de bytes enviados (solo la API de ETCD V2)<br>_Se muestra como byte_ |
| **etcd.self.send.pkgrate** <br>(gauge) | Tasa de paquetes enviados (solo la API de ETCD V2)<br>_Se muestra como paquete_ |
| **etcd.server.apply.slow.total** <br>(count) | El número total de solicitudes de aplicación lentas (probablemente sobrecargadas por un disco lento)<br>_Se muestra como solicitud_ |
| **etcd.server.go_version** <br>(gauge) | Con qué versión de Go se está ejecutando el servidor. 1 con etiqueta con la versión actual<br>_Se muestra como unidad_. |
| **etcd.server.has_leader** <br>(gauge) | Si existe o no un líder. 1 es existencia, 0 no.<br>_Se muestra como check_ |
| **etcd.server.health.failures.total** <br>(count) | El número total de checks de estado fallidos<br>_Se muestra como evento_ |
| **etcd.server.health.success.total** <br>(count) | El número total de checks de estado realizados con éxito<br>_Se muestra como evento_ |
| **etcd.server.heartbeat.send.failures.total** <br>(count) | El número total de fallos de envío de heartbeat del líder (probablemente sobrecargado por un disco lento)<br>_Se muestra como evento_ |
| **etcd.server.is_leader** <br>(gauge) | Si este miembro es o no un líder. 1 si lo es, 0 en caso contrario.<br>_Se muestra como check_ |
| **etcd.server.leader.changes.seen.total** <br>(count) | El número de cambios de líder consultados.<br>_Se muestra como evento_ |
| **etcd.server.lease.expired.total** <br>(count) | El número total de contratos de arrendamiento vencidos<br>_Se muestra como ocurrencia_ |
| **etcd.server.proposals.applied.total** <br>(gauge) | Número total de propuestas de consenso aplicadas.<br>_Se muestra como ocurrencia_ |
| **etcd.server.proposals.committed.total** <br>(gauge) | El número total de propuestas de consenso confirmadas.<br>_Se muestra como ocurrencia_ |
| **etcd.server.proposals.failed.total** <br>(count) | El número total de propuestas fallidas consultadas.<br>_S muestra como ocurrencia_ |
| **etcd.server.proposals.pending** <br>(gauge) | El número actual de propuestas con confirmación pendiente.<br>_Se muestra como ocurrencia_ |
| **etcd.server.quota.backend.bytes** <br>(gauge) | Tamaño actual de la cuota de almacenamiento del backend en bytes<br>_Se muestra como byte_ |
| **etcd.server.read_indexes.failed.total** <br>(count) | El número total de índices de lectura fallidos consultados<br>_Se muestra como evento_ |
| **etcd.server.read_indexes.slow.total** <br>(count) | Número total de índices de lectura pendientes no sincronizados con el líder o solicitudes de índice de lectura caducadas<br>_Se muestra como evento_ |
| **etcd.server.version** <br>(gauge) | Qué versión se está ejecutando. 1 para la etiqueta 'server_version' con la versión actual.<br>_Se muestra como elemento_. |
| **etcd.snap.db.fsync.duration.seconds.count** <br>(gauge) | Las distribuciones de latencia del archivo .snap.db fsyncing<br>_Se muestra como segundo_ |
| **etcd.snap.db.fsync.duration.seconds.sum** <br>(gauge) | Las distribuciones de latencia del archivo .snap.db fsyncing<br>_Se muestra como segundo_ |
| **etcd.snap.db.save.total.duration.seconds.count** <br>(gauge) | Las distribuciones de latencia total de instantánea v3 guardada<br>_Se muestra como segundo_ |
| **etcd.snap.db.save.total.duration.seconds.sum** <br>(gauge) | Las distribuciones de latencia total de instantánea v3 guardada<br>_Se muestra como segundo_ |
| **etcd.snap.fsync.duration.seconds.count** <br>(gauge) | Las distribuciones de latencia de fsync llamado por instantánea<br>_Se muestra como segundo_ |
| **etcd.snap.fsync.duration.seconds.sum** <br>(gauge) | Las distribuciones de latencia de fsync llamado por instantánea<br>_Se muestra como segundo_ |
| **etcd.store.compareanddelete.fail** <br>(gauge) | Tasa de solicitudes de comparación y eliminación fallidas (solo la API de ETCD V2)<br>_Se muestra como solicitud_ |
| **etcd.store.compareanddelete.success** <br>(gauge) | Tasa de éxito de las solicitudes de comparación y eliminación (solo la API de ETCD V2)<br>_Se muestra como solicitud_ |
| **etcd.store.compareandswap.fail** <br>(gauge) | Tasa de solicitudes de comparación e intercambio fallidas (solo la API de ETCD V2)<br>_Se muestra como solicitud_ |
| **etcd.store.compareandswap.success** <br>(gauge) | Tasa de éxito de las solicitudes de comparación e intercambio (solo la API de ETCD V2)<br>_Se muestra como solicitud_ |
| **etcd.store.create.fail** <br>(gauge) | Tasa de solicitudes de creación fallidas (solo la API de ETCD V2)<br>_Se muestra como solicitud_ |
| **etcd.store.create.success** <br>(gauge) | Tasa de solicitudes de creación realizadas con éxito (solo la API de ETCD V2)<br>_Se muestra como solicitud_ |
| **etcd.store.delete.fail** <br>(gauge) | Tasa de solicitudes de eliminación fallidas (solo la API de ETCD V2)<br>_Se muestra como solicitud_ |
| **etcd.store.delete.success** <br>(gauge) | Tasa de solicitudes de eliminación con éxito (solo la API de ETCD V2)<br>_Se muestra como solicitud_ |
| **etcd.store.expire.count** <br>(gauge) | Tasa de claves caducadas (solo la API de ETCD V2)<br>_Se muestra como expulsión_ |
| **etcd.store.gets.fail** <br>(gauge) | Tasa de solicitudes de obtención fallidas (solo la API de ETCD V2)<br>_Se muestra como solicitud_ |
| **etcd.store.gets.success** <br>(gauge) | Tasa de solicitudes de obtención con éxito (solo la API de ETCD V2)<br>_Se muestra como solicitud_ |
| **etcd.store.sets.fail** <br>(gauge) | Tasa de solicitudes de configuración fallidas (solo la API de ETCD V2)<br>_Se muestra como solicitud_ |
| **etcd.store.sets.success** <br>(gauge) | Tasa de solicitudes de configuración correctas (solo la API de ETCD V2)<br>_Se muestra como solicitud_ |
| **etcd.store.update.fail** <br>(gauge) | Tasa de solicitudes de actualización fallidas (solo la API de ETCD V2)<br>_Se muestra como solicitud_ |
| **etcd.store.update.success** <br>(gauge) | Tasa de solicitudes de actualización con éxito (solo la API de ETCD V2)<br>_Se muestra como solicitud_ |
| **etcd.store.watchers** <br>(gauge) | Tasa de observadores (solo la API de ETCD V2)|

Las métricas de Etcd se etiquetan con `etcd_state:leader` o `etcd_state:follower`, dependiendo del estado del nodo, por lo que puedes agregar fácilmente métricas por estado.

### Eventos

El check de Etcd no incluye eventos.

### Checks de servicio

**etcd.can_connect**

Devuelve `CRITICAL` si no se pueden obtener métricas de etcd (tiempo de espera o código HTTP no-200). Este check de servicio solo está disponible en la versión heredada del check de etcd.

_Estados: ok, crítico_

**etcd.healthy**

Devuelve `CRITICAL` cuando un miembro no en buen estado. Este check de servicio solo está disponible en la versión heredada del check de etcd.

_Estados: ok, crítico, desconocido_

**etcd.prometheus.health**

Devuelve `CRITICAL` si el check no puede acceder a un endpoint de métricas. En caso contrario, devuelve `OK`. Este check de servicio solo está disponible cuando `use_preview` está activado.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Control Plane Monitoring de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/control_plane/?tab=helm)
- [Monitoriza el rendimiento de etcd para garantizar una configuración coherente de Docker](https://www.datadoghq.com/blog/monitor-etcd-performance)
- [Cómo monitorizar etcd con Datadog](https://www.datadoghq.com/blog/monitor-etcd-with-datadog/)
- [Herramientas para recopilar métricas y logs de etcd](https://www.datadoghq.com/blog/etcd-monitoring-tools/)
- [Métricas clave para la monitorización de etcd](https://www.datadoghq.com/blog/etcd-key-metrics/)