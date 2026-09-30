---
aliases:
- /es/integrations/cockroachdb_dedicated
app_id: cockroach-cloud
categories:
- almacenes de datos
custom_kind: integración
description: Envía tus métricas de Cockroach Cloud a Datadog.
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Cockroach Cloud
---
## Información general

La integración de CockroachDB Cloud para Datadog permite la recopilación de datos y alertas sobre un subconjunto de métricas de CockroachDB utilizando la plataforma de Datadog.

## Configuración

### Instalación

Para activar la monitorización de Datadog para un clúster de Cockroach Cloud:

1. En la página **Monitoring** > [**Tools**] (Monitorización > Herramientas) del clúster (https://www.cockroachlabs.com/docs/cockroachcloud/tools-page).

1. Completa los campos **Clave de la API** y **Sitio de Datadog** con los valores correspondientes.

   - La **clave de API** está asociada a tu organización de Datadog. Si no tienes una clave de API para usar con tu clúster de Cockroach Cloud, necesitas crear una. Para obtener instrucciones, consulta la [documentación de Datadog](https://docs.datadoghq.com/account_management/api-app-keys/#add-an-api-key-or-client-token).
   - Tu **Sitio de Datadog** corresponde a la URL de tu sitio de Datadog. Para más detalles, consulta la [documentación de Datadog](https://docs.datadoghq.com/getting_started/site/).

1. Haz clic en **Crear**. En función del tamaño de tu clúster y de la carga actual del sistema, la integración puede tardar algún tiempo para activarse.

1. Una vez registrado en Datadog, el clúster aparecerá en tu [Lista de infraestructuras] de Datadog (https://docs.datadoghq.com/infrastructure/list/). Esto puede tardar varios minutos.

### Configuración

Abre tu [lista de dashboards] de Datadog(https://app.datadoghq.com/dashboard/lists). Hay dos dashboards que presentan las métricas de CockroachDB.

- CockroachDB Cloud serverless (Vista previa limitada)
- CockroachDB Cloud Dedicated

Para crear tu propio dashboard de Cockroach Cloud, puedes [clonar](https://docs.datadoghq.com/dashboards/configure/#configuration-actions) el dashboard predeterminado `CockroachDB Cloud Dedicated` y editar los widgets, o [crear un nuevo dashboard](https://docs.datadoghq.com/dashboards/#new-dashboard).

Las [métricas disponibles](https://docs.datadoghq.com/integrations/cockroachdb_dedicated/#data-collected) están pensadas para utilizarlas como bloques de compilación para tus propios gráficos.

Para previsualizar las métricas que se están recopilando, puedes:

- Haz clic en la entrada de tu clúster en la [Lista de infraestructuras](https://docs.datadoghq.com/infrastructure/list/) para visualizar los gráficos de series temporales de cada métrica disponible.
- Utiliza [Metrics Explorer](https://docs.datadoghq.com/metrics/explorer/) para buscar y ver las métricas `crdb_cloud` o `crdb_dedicated`.

### Validación

Una vez activado, el **estado de integración** en el panel de **Datadog** de la página de **Monitorización** se mostrará como `Active`.

Si se encuentra un problema durante la integración, en su lugar puede aparecer uno de los siguientes estados:

- `Active` indica que la integración se ha desplegado correctamente.
- `Inactive` indica que la integración no se ha desplegado correctamente. No se ha intentado la configuración o se ha producido un error.
- `Unhealthy` indica que la clave de la API de la integración no es válida y necesita ser [actualizada](#update-integration).
- `Unknown` indica que se ha producido un error desconocido. Si aparece este estado, [ponte en contacto con nuestro equipo de asistencia](https://support.cockroachlabs.com/).

La exportación de métricas desde CockroachDB puede interrumpirse en los siguientes casos:

- Una clave de la API obsoleta. En este caso, el estado de la integración será `Unhealthy`. Para resolver el problema, [actualiza tu integración](#update-integration) con una nueva clave de la API.
- No disponibilidad transitoria de CockroachDB. En este caso, el estado de la integración seguirá siendo `Active`. Para resolver el problema, intenta [desactivar](#deactivate-integration) y reactivar la integración desde el panel **Datadog**. Si esto no resuelve el problema, [ponte en contacto con nuestro equipo de soporte](https://support.cockroachlabs.com/).

Para monitorizar el estado de la exportación de métricas, puedes crear un monitor personalizado en Datadog.

### Actualizar la integración

Para actualizar los metadatos asociados a la integración (por ejemplo, para rotar las claves de la API):

1. En el panel de **Datadog**, haz clic en la elipsis y selecciona **Actualizar**.

1. Actualiza los campos **API key** (Clave de API) y **Datadog Site** (Sitio de Datadog) y haz clic en **Create** (Crear). Se volverá a desplegar la integración. 

### Desactivar la integración

Para desactivar la integración:

1. En el panel de **Datadog**, haz clic en la elipsis y selecciona **Desactivar la integración**.

1. Cuando esté desactivada, el **estado de la integración** en el panel se mostrará como `Inactive`.

Tras desactivar una integración, los datos de las métricas permanecerán en Datadog durante un [periodo de retención] predeterminado (https://docs.datadoghq.com/developers/guide/data-collection-resolution-retention/).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **crdb_dedicated.addsstable.applications** <br>(count) | Número de ingestas SSTable aplicadas, es decir, aplicadas por Réplicas. Se muestra como operación<br>_Se muestra como operación_ |
| **crdb_dedicated.addsstable.copies** <br>(count) | Número de ingestas SSTable que requirieron copiar archivos durante la aplicación. Se muestra como operación<br>_Se muestra como operación_ |
| **crdb_dedicated.addsstable.proposals** <br>(count) | Número de ingestas SSTable propuestas, es decir, enviadas a Raft por los arrendatarios. Se muestra como operación<br>_Se muestra como operación_ |
| **crdb_dedicated.admission.wait.sum.kv** <br>(count) | Tiempo total de espera en microsegundos para solicitudes dentro de la capa KV<br>_Se muestra como microsegundo_ |
| **crdb_dedicated.admission.wait.sum.kv.stores** <br>(count) | Tiempo total de espera en microsegundos para solicitudes de escritura en la capa KV<br>_Se muestra como microsegundo_ |
| **crdb_dedicated.admission.wait.sum.sql.kv.response** <br>(count) | Tiempo total de espera en microsegundos para las respuestas entre la capa KV y SQL<br>_Se muestra como microsegundo_ |
| **crdb_dedicated.admission.wait.sum.sql.sql.response** <br>(count) | Tiempo total de espera en microsegundos para respuestas dentro de la capa SQL al recibir respuestas DistSQL<br>_Se muestra como microsegundo_ |
| **crdb_dedicated.capacity** <br>(gauge) | Capacidad total de almacenamiento. Se muestra como byte<br>_Se muestra como byte_ |
| **crdb_dedicated.capacity.available** <br>(gauge) | Capacidad de almacenamiento disponible. Se muestra como byte<br>_Se muestra como byte_ |
| **crdb_dedicated.capacity.reserved** <br>(gauge) | Capacidad reservada para snapshots. Se muestra como byte<br>_Se muestra como byte_ |
| **crdb_dedicated.capacity.used** <br>(gauge) | Capacidad de almacenamiento utilizada. Se muestra como byte<br>_Se muestra como byte_ |
| **crdb_dedicated.changefeed.backfill.count** <br>(gauge) | Número de cambios que se están ejecutando actualmente. Se muestra como recuento.<br>_Se muestra como unidad_ |
| **crdb_dedicated.changefeed.backfill.pending.ranges** <br>(gauge) | Número de rangos de un relleno en curso que aún no se han emitido por completo. Se muestra como recuento<br>_Se muestra como unidad_ |
| **crdb_dedicated.changefeed.commit.latency** <br>(gauge) | Latencia de confirmación de eventos: diferencia entre la marca temporal MVCC del evento y la hora en que fue confirmado por el receptor. Si el sink procesa los eventos por lotes, se registra la diferencia entre el evento más antiguo del lote y la recepción. No incluye la latencia durante el relleno. Se muestra en nanosegundos.<br>_Se muestra como unidad_ |
| **crdb_dedicated.changefeed.emitted.messages** <br>(count) | Mensajes emitidos por todas las fuentes. Se muestra como recuento.<br>_Se muestra como unidad_ |
| **crdb_dedicated.changefeed.error.retries** <br>(count) | Total de errores reintentables encontrados por todas las fuentes de cambio. Se muestra como recuento.<br>_Se muestra como unidad_ |
| **crdb_dedicated.changefeed.failures** <br>(count) | Número total de trabajos de la fuente de cambios que han fallado. Se muestra como recuento.<br>_Se muestra como unidad_ |
| **crdb_dedicated.changefeed.max.behind.nanos** <br>(gauge) | La mayor duración de un envío a otro. Se muestra en nanosegundos.<br>_Se muestra en nanosegundos_ |
| **crdb_dedicated.changefeed.message.size.hist** <br>(gauge) | Histograma de los tamaños de los mensajes para las fuentes de cambio. Se muestra en bytes.<br>_Se muestra como byte_ |
| **crdb_dedicated.changefeed.running** <br>(gauge) | Número de fuentes de cambio en ejecución, incluidas las que no tienen sinks. Se muestra como recuento.<br>_Se muestra como unidad_ |
| **crdb_dedicated.clock.offset.meannanos** <br>(gauge) | Desfase medio del reloj con otros nodos en nanosegundos. Se muestra en nanosegundos<br>_Se muestra en nanosegundos_ |
| **crdb_dedicated.clock.offset.stddevnanos** <br>(gauge) | Desfase del reloj Stdddev con otros nodos en nanosegundos. Se muestra en nanosegundos<br>_Se muestra en nanosegundos_ |
| **crdb_dedicated.distsender.batches** <br>(count) | Número de lotes procesados|
| **crdb_dedicated.distsender.batches.partial** <br>(count) | Número de lotes parciales procesados|
| **crdb_dedicated.distsender.errors.notleaseholder** <br>(count) | Número de NotLeaseHolderErrors encontrados. Se muestra como error<br>_Se muestra como error_ |
| **crdb_dedicated.distsender.rpc.sent** <br>(count) | Número de RPCs enviados<br>_Se muestra como solicitud_ |
| **crdb_dedicated.distsender.rpc.sent.local** <br>(count) | Número de RPC locales enviados<br>_Se muestra como solicitud_ |
| **crdb_dedicated.distsender.rpc.sent.nextreplicaerror** <br>(count) | Número de RPCs enviados debido a errores por réplica. Se muestra como error<br>_Se muestra como solicitud_ |
| **crdb_dedicated.exec.error** <br>(count) | Número de solicitudes KV por lotes que no se han podido ejecutar en este nodo. Se muestra como solicitud<br>_Se muestra como solicitud_ |
| **crdb_dedicated.exec.latency** <br>(count) | Latencia en nanosegundos de las solicitudes KV por lotes ejecutadas en este nodo. Se muestra en nanosegundos<br>_Se muestra en nanosegundos_ |
| **crdb_dedicated.exec.success** <br>(count) | Número de solicitudes KV por lotes ejecutadas con éxito en este nodo. Se muestra como solicitud<br>_Se muestra como solicitud_ |
| **crdb_dedicated.gcbytesage** <br>(gauge) | Antigüedad acumulada de los datos no activos en segundos. Se muestra en segundos<br>_Se muestra en segundos_ |
| **crdb_dedicated.gossip.bytes.received** <br>(count) | Número de bytes gossip recibidos. Se muestra como byte<br>_Se muestra como byte_ |
| **crdb_dedicated.gossip.bytes.sent** <br>(count) | Número de bytes gossip enviados. Se muestra como byte<br>_Se muestra como byte_ |
| **crdb_dedicated.gossip.connections.incoming** <br>(gauge) | Número de conexiones gossip entrantes activas. Se muestra como conexión<br> _Se muestra como conexión_ |
| **crdb_dedicated.gossip.connections.outgoing** <br>(gauge) | Número de conexiones gossip salientes activas. Se muestra como conexión<br> _Se muestra como conexión_ |
| **crdb_dedicated.gossip.connections.refused** <br>(count) | Número de conexiones gossip entrantes rechazadas. Se muestra como conexión<br> _Se muestra como conexión_ |
| **crdb_dedicated.gossip.infos.received** <br>(count) | Número de objetos de información gossip recibidos<br>_Se muestra como mensaje_ |
| **crdb_dedicated.gossip.infos.sent** <br>(count) | Número de objetos de información gossip enviados<br>_Se muestra como mensaje_ |
| **crdb_dedicated.intentage** <br>(gauge) | Antigüedad acumulada de los intentos en segundos. Se muestra en segundos<br>_Se muestra en segundos_ |
| **crdb_dedicated.intentbytes** <br>(gauge) | Número de bytes en pares KV de intento. Se muestra como byte<br>_Se muestra como byte_ |
| **crdb_dedicated.intentcount** <br>(gauge) | Recuento de claves de intento. Se muestra como clave<br>_Se muestra como clave_ |
| **crdb_dedicated.jobs.changefeed.resume.retry.error** <br>(count) | Número de trabajos de la fuente de cambios que fallaron con un error recuperable. Se muestra como recuento.<br>_Se muestra como unidad_ |
| **crdb_dedicated.keybytes** <br>(gauge) | Número de bytes ocupados por las claves. Se muestra como byte<br>_Se muestra como byte_ |
| **crdb_dedicated.keycount** <br>(gauge) | Recuento de todas las claves. Se muestra como clave<br>_Se muestra como clave_ |
| **crdb_dedicated.leases.epoch** <br>(gauge) | Número de arrendatarios de réplica que utilizan arrendamientos basados en epoch<br>_Se muestra como unidad_ |
| **crdb_dedicated.leases.error** <br>(count) | Número de solicitudes de arrendamientos fallidas. Se muestra como solicitud<br>_Se muestra como solicitud_ |
| **crdb_dedicated.leases.expiration** <br>(gauge) | Número de arrendatarios de réplica que utilizan contratos de arrendamiento por expiración<br>_Se muestra como unidad_ |
| **crdb_dedicated.leases.success** <br>(count) | Número de solicitudes de arendamiento aceptadas. Se muestra como solicitud<br>_Se muestra como solicitud_ |
| **crdb_dedicated.leases.transfers.error** <br>(count) | Número de transferencias de arrendamiento fallidas<br>_Se muestra como error_ |
| **crdb_dedicated.leases.transfers.success** <br>(count) | Número de transferencias de arrendamiento con éxito<br>_Se muestra como éxito_ |
| **crdb_dedicated.livebytes** <br>(gauge) | Número de bytes de claves de datos en vivo más valores. Se muestra como byte<br>_Se muestra como byte_ |
| **crdb_dedicated.livecount** <br>(gauge) | Recuento de claves activas. Se muestra como clave<br>_Se muestra como clave_ |
| **crdb_dedicated.liveness.epochincrements** <br>(count) | Número de veces que este nodo ha incrementado su epoch fuera de línea<br>_Se muestra como unidad_ |
| **crdb_dedicated.liveness.heartbeatfailures** <br>(count) | Número de latidos fuera de línea fallidos de este nodo<br>_Se muestra como unidad_ |
| **crdb_dedicated.liveness.heartbeatlatency** <br>(count) | Latencia del latido fuera de línea del nodo en nanosegundos. Se muestra en nanosegundos<br>_Se muestra en nanosegundos_ |
| **crdb_dedicated.liveness.heartbeatsuccesses** <br>(count) | Número de latidos fuera de línea exitosos de este nodo<br>_Se muestra como unidad_ |
| **crdb_dedicated.liveness.livenodes** <br>(gauge) | El número de nodos activos en el clúster será 0 si este nodo no está activo<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.consistency.pending** <br>(gauge) | Número de réplicas pendientes en la cola del verificador de coherencia<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.consistency.process.failure** <br>(count) | Número de réplicas cuyo procesamiento ha fallado en la cola del verificador de coherencia<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.consistency.process.success** <br>(count) | Número de réplicas procesadas con éxito por la cola del verificador de coherencia<br>_Se muestra como éxito_ |
| **crdb_dedicated.queue.consistency.processingnanos** <br>(count) | Nanosegundos empleados en procesar réplicas en la cola del verificador de coherencia. Se muestra como nanosegundo<br>_Se muestra como nanosegundo_ |
| **crdb_dedicated.queue.gc.info.abortspanconsidered** <br>(count) | Número de entradas AbortSpan lo suficientemente antiguas como para considerar su eliminación<br>_Se muestra como transacción_ |
| **crdb_dedicated.queue.gc.info.abortspangcnum** <br>(count) | Número de entradas AbortSpan aptas para la eliminación<br>_Se muestra como transacción_ |
| **crdb_dedicated.queue.gc.info.abortspanscanned** <br>(count) | Número de transacciones presentes en el AbortSpan escaneado desde el motor. Se muestra como transacción<br>_Se muestra como transacción_ |
| **crdb_dedicated.queue.gc.info.intentsconsidered** <br>(count) | Número de intentos "antiguos"<br>_Se muestra como transacción_ |
| **crdb_dedicated.queue.gc.info.intenttxns** <br>(count) | Número de transacciones distintas asociadas. Se muestra como transacción<br>_Se muestra como clave_ |
| **crdb_dedicated.queue.gc.info.numkeysaffected** <br>(count) | Número de claves con datos que se pueden recopilar como elementos no usados. Se muestra como clave<br>_Se muestra como clave_ |
| **crdb_dedicated.queue.gc.info.pushtxn** <br>(count) | Número de intentos de push<br>_Se muestra como intento_ |
| **crdb_dedicated.queue.gc.info.resolvesuccess** <br>(count) | Número de resoluciones de intentos con éxito<br>_Se muestra como éxito_ |
| **crdb_dedicated.queue.gc.info.resolvetotal** <br>(count) | Número de intentos de resolución<br>_Se muestra como intento_ |
| **crdb_dedicated.queue.gc.info.transactionspangcaborted** <br>(count) | Número de entradas que se pueden recopilar como elementos no usados correspondientes a txns abortadas<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.gc.info.transactionspangccommitted** <br>(count) | Número de entradas que se pueden recopilar como elementos no usados correspondientes a txns confirmadas<br>_Se muestra como confirmación_ |
| **crdb_dedicated.queue.gc.info.transactionspangcpending** <br>(count) | Número de entradas que se pueden recopilar como elementos no usados correspondientes a txns pendientes<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.gc.info.transactionspanscanned** <br>(count) | Número de entradas en tramos de transacción escaneados desde el motor<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.gc.pending** <br>(gauge) | Número de réplicas pendientes en la cola de recopilación de elementos no usados<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.gc.process.failure** <br>(count) | Número de réplicas cuyo procesamiento ha fallado en la cola de recopilación de elementos no usados<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.gc.process.success** <br>(count) | Número de réplicas procesadas con éxito por la cola de recopilación de elementos no usados<br>_Se muestra como éxito_ |
| **crdb_dedicated.queue.gc.processingnanos** <br>(count) | Nanosegundos empleados en procesar réplicas en la cola de recopilación de elementos no usados. Se muestra como nanosegundo<br>_Se muestra como nanosegundo_ |
| **crdb_dedicated.queue.raftlog.pending** <br>(gauge) | Número de réplicas pendientes en la cola de logs Raft<br> _Se muestra como unidad_ |
| **crdb_dedicated.queue.raftlog.process.failure** <br>(count) | Número de réplicas cuyo procesamiento ha fallado en la cola de logs Raft<br> _Se muestra como unidad_ |
| **crdb_dedicated.queue.raftlog.process.success** <br>(count) | Número de réplicas procesadas con éxito por la cola de logs Raft<br> _Se muestra como unidad_ |
| **crdb_dedicated.queue.raftlog.processingnanos** <br>(count) | Nanosegundos empleados en procesar réplicas en la cola de logs Raft. Se muestra como nanosegundo<br>_Se muestra como nanosegundo_ |
| **crdb_dedicated.queue.raftsnapshot.pending** <br>(gauge) | Número de réplicas pendientes en la cola de reparación Raft<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.raftsnapshot.process.failure** <br>(count) | Número de réplicas cuyo procesamiento ha fallado en la cola de reparación Raft<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.raftsnapshot.process.success** <br>(count) | Número de réplicas procesadas con éxito por la cola de reparación Raft<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.raftsnapshot.processingnanos** <br>(count) | Nanosegundos empleados en procesar réplicas en la cola de reparación Raft. Se muestra como nanosegundo<br>_Se muestra como nanosegundo_ |
| **crdb_dedicated.queue.replicagc.pending** <br>(gauge) | Número de réplicas pendientes en la cola de recopilación de elementos no usados de réplicas<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.replicagc.process.failure** <br>(count) | Número de réplicas cuyo procesamiento ha fallado en la cola de recopilación de elementos no usados de réplicas<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.replicagc.process.success** <br>(count) | Número de réplicas procesadas con éxito por la cola de recopilación de elementos no usados de réplicas<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.replicagc.processingnanos** <br>(count) | Nanosegundos empleados en procesar réplicas en la cola de recopilación de elementos no usados de réplicas. Se muestra como nanosegundo<br>_Se muestra como nanosegundo_ |
| **crdb_dedicated.queue.replicagc.removereplica** <br>(count) | Número de eliminaciones de réplicas intentadas por la cola de recopilación de elementos no usados de réplicas<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.replicate.addreplica** <br>(count) | Número de adiciones de réplica intentadas por la cola de réplica<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.replicate.pending** <br>(gauge) | Número de réplicas pendientes en la cola de réplicas<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.replicate.process.failure** <br>(count) | Número de réplicas cuyo procesamiento ha fallado en la cola de réplicas<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.replicate.process.success** <br>(count) | Número de réplicas procesadas con éxito por la cola de réplicas<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.replicate.processingnanos** <br>(count) | Nanosegundos empleados en procesar réplicas en la cola de réplicas. Se muestra como nanosegundo<br>_Se muestra como nanosegundo_ |
| **crdb_dedicated.queue.replicate.purgatory** <br>(gauge) | Número de réplicas en el purgatorio de la cola de réplicas, a la espera de opciones de asignación<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.replicate.rebalancereplica** <br>(count) | Número de adiciones iniciadas por el reequilibrador de réplica intentadas por la cola de réplica<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.replicate.removedeadreplica** <br>(count) | Número de eliminaciones de réplicas muertas intentadas por la cola de réplicas normalmente en respuesta a una interrupción del nodo<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.replicate.removereplica** <br>(count) | Número de eliminaciones de réplicas intentadas por la cola de réplicas normalmente en respuesta a una adición iniciada por un reequilibrador<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.replicate.transferlease** <br>(count) | Número de transferencias de arrendamiento de rango intentadas por la cola de réplica<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.split.pending** <br>(gauge) | Número de réplicas pendientes en la cola de división<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.split.process.failure** <br>(count) | Número de réplicas cuyo procesamiento ha fallado en la cola de división<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.split.process.success** <br>(count) | Número de réplicas procesadas con éxito por la cola dividida<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.split.processingnanos** <br>(count) | Nanosegundos empleados en procesar réplicas en la cola de división. Se muestra como nanosegundo<br>_Se muestra como nanosegundo_ |
| **crdb_dedicated.queue.tsmaintenance.pending** <br>(gauge) | Número de réplicas pendientes en la cola de mantenimiento de series temporales<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.tsmaintenance.process.failure** <br>(count) | Número de réplicas cuyo procesamiento ha fallado en la cola de mantenimiento de series temporales<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.tsmaintenance.process.success** <br>(count) | Número de réplicas procesadas con éxito por la cola de mantenimiento de series temporales<br>_Se muestra como unidad_ |
| **crdb_dedicated.queue.tsmaintenance.processingnanos** <br>(count) | Nanosegundos empleados en procesar réplicas en la cola de mantenimiento de series temporales. Se muestra como nanosegundo<br>_Se muestra como nanosegundo_ |
| **crdb_dedicated.raft.commandsapplied** <br>(count) | Recuento de comandos Raft aplicados. Se muestra como comando<br>_Se muestra como comando_ |
| **crdb_dedicated.raft.enqueued.pending** <br>(gauge) | Número de mensajes salientes pendientes en la cola de transporte Raft<br>_Se muestra como unidad_ |
| **crdb_dedicated.raft.heartbeats.pending** <br>(gauge) | Número de latidos pendientes y respuestas a la espera de unirse<br>_Se muestra como unidad_ |
| **crdb_dedicated.raft.process.commandcommit.latency** <br>(count) | Histograma de latencia en nanosegundos de los comandos Raft. Se muestra en nanosegundos<br>_Se muestra en nanosegundos_ |
| **crdb_dedicated.raft.process.logcommit.latency** <br>(count) | Histograma de latencia en nanosegundos para la confirmación de entradas de logs Raft. Se muestra en nanosegundos<br>_Se muestra en nanosegundos_ |
| **crdb_dedicated.raft.process.tickingnanos** <br>(count) | Nanosegundos empleados en store.processRaft procesando replica.Tick. Se muestra como nanosegundo<br>_Se muestra como nanosegundo_ |
| **crdb_dedicated.raft.process.workingnanos** <br>(count) | Nanosegundos empleados en el funcionamiento de store.processRaft. Se muestra como nanosegundo<br>_Se muestra como nanosegundo_ |
| **crdb_dedicated.raft.rcvd.app** <br>(count) | Número de mensajes MsgApp recibidos por este almacén<br>_Se muestra como mensaje_ |
| **crdb_dedicated.raft.rcvd.appresp** <br>(count) | Número de mensajes MsgAppResp recibidos por este almacén<br>_Se muestra como mensaje_ |
| **crdb_dedicated.raft.rcvd.dropped** <br>(count) | Número de mensajes Raft entrantes abandonados<br>_Se muestra como mensaje_ |
| **crdb_dedicated.raft.rcvd.heartbeat** <br>(count) | Número de mensajes MsgHeartbeat fusionados, si están activados, recibidos por este almacén<br>_Se muestra como mensaje_ |
| **crdb_dedicated.raft.rcvd.heartbeatresp** <br>(count) | Número de mensajes MsgHeartbeatResp fusionados, si están activados, recibidos por este almacén<br>_Se muestra como mensaje_ |
| **crdb_dedicated.raft.rcvd.prevote** <br>(count) | Número de mensajes MsgPreVote recibidos por este almacén<br>_Se muestra como mensaje_ |
| **crdb_dedicated.raft.rcvd.prevoteresp** <br>(count) | Número de mensajes MsgPreVoteResp recibidos por este almacén<br>_Se muestra como mensaje_ |
| **crdb_dedicated.raft.rcvd.prop** <br>(count) | Número de mensajes MsgProp recibidos por este almacén<br>_Se muestra como mensaje_ |
| **crdb_dedicated.raft.rcvd.snap** <br>(count) | Número de mensajes MsgSnap recibidos por este almacén<br>_Se muestra como mensaje_ |
| **crdb_dedicated.raft.rcvd.timeoutnow** <br>(count) | Número de mensajes MsgTimeoutNow recibidos por este almacén<br>_Se muestra como mensaje_ |
| **crdb_dedicated.raft.rcvd.transferleader** <br>(count) | Número de mensajes MsgTransferLeader recibidos por este almacén<br>_Se muestra como mensaje_ |
| **crdb_dedicated.raft.rcvd.vote** <br>(count) | Número de mensajes MsgVote recibidos por este almacén<br>_Se muestra como mensaje_ |
| **crdb_dedicated.raft.rcvd.voteresp** <br>(count) | Número de mensajes MsgVoteResp recibidos por este almacén<br>_Se muestra como mensaje_ |
| **crdb_dedicated.raft.ticks** <br>(count) | Número de ticks Raft en cola<br>_Se muestra como unidad_ |
| **crdb_dedicated.raftlog.behind** <br>(gauge) | Número de entradas de logs Raft seguidores en otros almacenes que están retrasados. Se muestra como entrada<br>_Se muestra como unidad_ |
| **crdb_dedicated.raftlog.truncated** <br>(count) | Número de entradas de logs Raft truncados. Se muestra como entrada<br>_Se muestra como unidad_ |
| **crdb_dedicated.range.adds** <br>(count) | Número de adiciones de rango<br>_Se muestra como unidad_ |
| **crdb_dedicated.range.raftleadertransfers** <br>(count) | Número de traslados de líder Raft<br>_Se muestra como unidad_ |
| **crdb_dedicated.range.removes** <br>(count) | Número de eliminaciones de rango<br>_Se muestra como unidad_ |
| **crdb_dedicated.range.snapshots.generated** <br>(count) | Número de instantáneas generadas<br>_Se muestra como unidad_ |
| **crdb_dedicated.range.splits** <br>(count) | Número de divisiones de rango<br>_Se muestra como unidad_ |
| **crdb_dedicated.ranges** <br>(gauge) | Número de rangos<br>_Se muestra como unidad_ |
| **crdb_dedicated.ranges.overreplicated** <br>(gauge) | Número de rangos con más réplicas activas que el destino de replicación<br>_Se muestra como unidad_ |
| **crdb_dedicated.ranges.unavailable** <br>(gauge) | Número de rangos con menos réplicas activas de las necesarias para el quórum<br>_Se muestra como unidad_ |
| **crdb_dedicated.ranges.underreplicated** <br>(gauge) | Número de rangos con menos réplicas activas que el destino de replicación<br>_Se muestra como unidad_ |
| **crdb_dedicated.rebalancing.writespersecond** <br>(gauge) | Número de claves escritas, es decir, aplicadas por Raft por segundo al almacén, promediado durante un período amplio, tal como se utiliza en las decisiones de reequilibrio. Se muestra como clave<br>_Se muestra como unidad_ |
| **crdb_dedicated.replicas** <br>(gauge) | Número de réplicas<br>_Se muestra como unidad_ |
| **crdb_dedicated.replicas.leaders** <br>(gauge) | Número de líderes Raft<br>_Se muestra como unidad_ |
| **crdb_dedicated.replicas.leaders.not_leaseholders** <br>(gauge) | Número de réplicas que son líderes de Raft cuyo rango de arrendamiento está a cargo de otro almacén<br>_Se muestra como unidad_ |
| **crdb_dedicated.replicas.leaseholders** <br>(gauge) | Número de arrendatarios<br>_Se muestra como unidad_ |
| **crdb_dedicated.replicas.quiescent** <br>(gauge) | Número de réplicas en reposo<br>_Se muestra como unidad_ |
| **crdb_dedicated.replicas.reserved** <br>(gauge) | Número de réplicas reservadas para snapshots<br>_Se muestra como unidad_ |
| **crdb_dedicated.requests.backpressure.split** <br>(gauge) | Número de escrituras con contrapresión en espera en una división de rango<br>_Se muestra como unidad_ |
| **crdb_dedicated.requests.slow.distsender** <br>(gauge) | Número de solicitudes que llevan mucho tiempo atascadas en el dist sender. Se muestra como solicitud<br>_Se muestra como solicitud_ |
| **crdb_dedicated.requests.slow.lease** <br>(gauge) | Número de solicitudes que llevan mucho tiempo atascadas adquiriendo un arrendamiento. Se muestra como solicitud<br>_Se muestra como solicitud_ |
| **crdb_dedicated.requests.slow.raft** <br>(gauge) | Número de solicitudes que llevan mucho tiempo atascadas en Raft. Se muestra como solicitud<br>_Se muestra como solicitud_ |
| **crdb_dedicated.rocksdb.block.cache.hits** <br>(gauge) | Recuento de aciertos a la caché de bloques<br>_Se muestra como acierto_ |
| **crdb_dedicated.rocksdb.block.cache.misses** <br>(gauge) | Recuento de fallos de la caché de bloques<br>_Se muestra como fallo_ |
| **crdb_dedicated.rocksdb.block.cache.pinned.usage** <br>(gauge) | Bytes fijados por la caché de bloque. Se muestra como byte<br>_Se muestra como byte_ |
| **crdb_dedicated.rocksdb.block.cache.usage** <br>(gauge) | Bytes utilizados por la caché de bloque. Se muestra como byte<br>_Se muestra como byte_ |
| **crdb_dedicated.rocksdb.bloom_filter.prefix.checked** <br>(gauge) | Número de veces que se ha comprobado el filtro bloom<br>_Se muestra como unidad_ |
| **crdb_dedicated.rocksdb.bloom_filter.prefix.useful** <br>(gauge) | Número de veces que el filtro bloom ayudó a evitar la creación de iteradores<br>_Se muestra como unidad_ |
| **crdb_dedicated.rocksdb.compactions** <br>(gauge) | Número de compactaciones de la tabla<br>_Se muestra como unidad_ |
| **crdb_dedicated.rocksdb.flushes** <br>(gauge) | Número de descargas de la tabla<br>_Se muestra como descarga_ |
| **crdb_dedicated.rocksdb.memtable.total.size** <br>(gauge) | Tamaño actual de la memtable en bytes. Se muestra como byte<br>_Se muestra como byte_ |
| **crdb_dedicated.rocksdb.num_sstables** <br>(gauge) | Número de rocksdb SSTables. Se muestra como tabla<br>_Se muestra como tabla_ |
| **crdb_dedicated.rocksdb.read.amplification** <br>(gauge) | Número de lecturas de disco por consulta. Se muestra como lectura<br>_Se muestra como lectura_ |
| **crdb_dedicated.rocksdb.table.readers.mem.estimate** <br>(gauge) | Memoria utilizada por los bloques de índice y filtro<br>_Se muestra como unidad_ |
| **crdb_dedicated.round_trip.latency** <br>(count) | Distribución de latencias de ida y vuelta con otros nodos en nanosegundos. Se muestra en nanosegundos<br>_Se muestra en nanosegundos_ |
| **crdb_dedicated.sql.bytesin** <br>(count) | Número de bytes sql recibidos. Se muestra como byte<br>_Se muestra como byte_ |
| **crdb_dedicated.sql.bytesout** <br>(count) | Número de bytes sql enviados. Se muestra como byte<br>_Se muestra como byte_ |
| **crdb_dedicated.sql.conn.latency** <br>(count) | Latencia para establecer y autenticar una conexión SQL. Se muestra en nanosegundos.<br>_Se muestra en nanosegundos_ |
| **crdb_dedicated.sql.conns** <br>(gauge) | Número de conexiones sql activas. Se muestra como conexión<br> _Se muestra como conexión_ |
| **crdb_dedicated.sql.ddl.count** <br>(count) | Número de sentencias SQL DDL<br>_Se muestra como consulta_ |
| **crdb_dedicated.sql.delete.count** <br>(count) | Número de sentencias SQL DELETE<br>_Se muestra como consulta_ |
| **crdb_dedicated.sql.distsql.contended.queries.count** <br>(count) | Número de consultas SQL que experimentaron contención. Se muestra como recuento.<br>_Se muestra como consulta_ |
| **crdb_dedicated.sql.distsql.exec.latency** <br>(count) | Latencia en nanosegundos de la ejecución de la sentencia DistSQL. Se muestra como nanosegundo<br>_Se muestra como nanosegundo_ |
| **crdb_dedicated.sql.distsql.flows.active** <br>(gauge) | Número de flujos SQL distribuidos actualmente activos<br>_Se muestra como consulta_ |
| **crdb_dedicated.sql.distsql.flows.total** <br>(count) | Número de flujos SQL distribuidos ejecutados<br>_Se muestra como consulta_ |
| **crdb_dedicated.sql.distsql.queries.active** <br>(gauge) | Número de consultas SQL distribuidas actualmente activas<br>_Se muestra como consulta_ |
| **crdb_dedicated.sql.distsql.queries.total** <br>(count) | Número de consultas SQL distribuidas ejecutadas<br>_Se muestra como consulta_ |
| **crdb_dedicated.sql.distsql.select.count** <br>(count) | Número de sentencias DistSQL SELECT<br>_Se muestra como unidad_ |
| **crdb_dedicated.sql.distsql.service.latency** <br>(count) | Latencia en nanosegundos de la ejecución de la solicitud DistSQL. Se muestra como nanosegundo<br>_Se muestra como nanosegundo_ |
| **crdb_dedicated.sql.exec.latency** <br>(count) | Latencia en nanosegundos de la ejecución de una sentencia SQL. Se muestra como nanosegundo<br>_Se muestra como nanosegundo_ |
| **crdb_dedicated.sql.failure.count** <br>(count) | Número de sentencias que dan lugar a un error de planificación o de ejecución. Se muestra como recuento.<br>_Se muestra como unidad_ |
| **crdb_dedicated.sql.full.scan.count** <br>(count) | Número de escaneos completos de tablas o índices. Se muestra como recuento.<br>_Se muestra como unidad_ |
| **crdb_dedicated.sql.insert.count** <br>(count) | Número de sentencias SQL INSERT<br>_Se muestra como unidad_ |
| **crdb_dedicated.sql.mem.distsql.current** <br>(gauge) | Uso actual de memoria de sentencia sql para distsql<br>_Se muestra como unidad_ |
| **crdb_dedicated.sql.mem.distsql.max** <br>(count) | Uso de memoria por sentencia sql para distsql<br>_Se muestra como unidad_ |
| **crdb_dedicated.sql.mem.internal.session.current** <br>(gauge) | Uso actual de la memoria de la sesión sql para uso interno<br>_Se muestra como unidad_ |
| **crdb_dedicated.sql.mem.internal.session.max** <br>(count) | Uso de memoria por sesión sql para uso interno<br>_Se muestra como unidad_ |
| **crdb_dedicated.sql.mem.internal.txn.current** <br>(gauge) | Uso actual de la memoria de transacciones sql para uso interno<br>_Se muestra como unidad_ |
| **crdb_dedicated.sql.mem.internal.txn.max** <br>(count) | Uso de memoria por transacción sql para uso interno<br>_Se muestra como unidad_ |
| **crdb_dedicated.sql.misc.count** <br>(count) | Número de otras sentencias SQL<br>_Se muestra como consulta_ |
| **crdb_dedicated.sql.new_conns.count** <br>(count) | Número de conexiones SQL creadas<br>_Se muestra como conexión_ |
| **crdb_dedicated.sql.query.count** <br>(count) | Número de consultas SQL<br>_Se muestra como consulta_ |
| **crdb_dedicated.sql.select.count** <br>(count) | Número de sentencias SQL SELECT<br>_Se muestra como consulta_ |
| **crdb_dedicated.sql.service.latency** <br>(count) | Latencia en nanosegundos de la ejecución de la solicitud SQL. Se muestra en nanosegundos<br>_Se muestra en nanosegundos_ |
| **crdb_dedicated.sql.statements.active** <br>(gauge) | Número de sentencias SQL de usuario actualmente activas. Se muestra como recuento.<br>_Se muestra como unidad_ |
| **crdb_dedicated.sql.txn.abort.count** <br>(count) | Número de sentencias ABORT de transacciones SQL<br>_Se muestra como unidad_ |
| **crdb_dedicated.sql.txn.begin.count** <br>(count) | Número de sentencias BEGIN de transacciones SQL<br>_Se muestra como unidad_ |
| **crdb_dedicated.sql.txn.commit.count** <br>(count) | Número de sentencias COMMIT de transacciones SQL<br>_Se muestra como unidad_ |
| **crdb_dedicated.sql.txn.latency** <br>(count) | Latencia de las transacciones SQL. Se muestra en nanosegundos.<br>_Se muestra como unidad_ |
| **crdb_dedicated.sql.txn.rollback.count** <br>(count) | Número de sentencias ROLLBACK de transacciones SQL<br>_Se muestra como unidad_ |
| **crdb_dedicated.sql.txns.open** <br>(gauge) | Número de transacciones SQL abiertas actualmente. Se muestra como recuento.<br>_Se muestra como unidad_ |
| **crdb_dedicated.sql.update.count** <br>(count) | Número de sentencias SQL UPDATE<br>_Se muestra como unidad_ |
| **crdb_dedicated.sys.cgo.allocbytes** <br>(gauge) | Bytes actuales de memoria asignados por cgo. Se muestra como byte<br>_Se muestra como byte_ |
| **crdb_dedicated.sys.cgo.totalbytes** <br>(gauge) | Total de bytes de memoria asignados por cgo, pero no liberados. Se muestra como byte<br>_Se muestra como byte_ |
| **crdb_dedicated.sys.cgocalls** <br>(gauge) | Número total de llamadas de cgo<br>_Se muestra como unidad_ |
| **crdb_dedicated.sys.cpu.combined.percent.normalized** <br>(gauge) | Porcentaje actual de cpu usuario+sistema, normalizado 0-1 por número de núcleos.<br>_Se muestra como fracción_ |
| **crdb_dedicated.sys.cpu.sys.ns** <br>(gauge) | Tiempo total de cpu del sistema en nanosegundos. Se muestra como nanosegundo<br>_Se muestra como nanosegundo_ |
| **crdb_dedicated.sys.cpu.sys.percent** <br>(gauge) | Porcentaje actual de cpu del sistema<br>_Se muestra como núcleo_ |
| **crdb_dedicated.sys.cpu.user.ns** <br>(gauge) | Tiempo total de cpu del usuario en nanosegundos. Se muestra en nanosegundos<br>_Se muestra en nanosegundos_ |
| **crdb_dedicated.sys.cpu.user.percent** <br>(gauge) | Porcentaje actual de cpu del usuario. Se muestra como porcentaje<br>_Se muestra como núcleo_ |
| **crdb_dedicated.sys.fd.open** <br>(gauge) | Procesamiento de descriptores de archivo abiertos<br>_Se muestra como unidad_ |
| **crdb_dedicated.sys.fd.softlimit** <br>(gauge) | Procesamiento de límite movible de FD abiertos<br>_Se muestra como unidad_ |
| **crdb_dedicated.sys.gc.count** <br>(gauge) | Número total de ejecuciones de recopilación de elementos no usados<br>_Se muestra como recopilación de elementos no usados_ |
| **crdb_dedicated.sys.gc.pause.ns** <br>(gauge) | Pausa total de la recopilación de elementos no usados en nanosegundos. Se muestra en nanosegundos<br>_Se muestra en nanosegundos_ |
| **crdb_dedicated.sys.gc.pause.percent** <br>(gauge) | Porcentaje actual de pausa de la recopilación de elementos no usados. Se muestra como fracción<br>_Se muestra como fracción_ |
| **crdb_dedicated.sys.go.allocbytes** <br>(gauge) | Bytes actuales de memoria asignados por go. Se muestra como byte<br>_Se muestra como byte_ |
| **crdb_dedicated.sys.go.totalbytes** <br>(gauge) | Total de bytes de memoria asignados por go, pero no liberados. Se muestra como byte<br>_Se muestra como byte_ |
| **crdb_dedicated.sys.goroutines** <br>(gauge) | Número actual de goroutines<br>_Se muestra como unidad_ |
| **crdb_dedicated.sys.host.net.recv.bytes** <br>(gauge) | Bytes recibidos en todas las interfaces de red desde que se inició este proceso.<br>_Se muestra como byte_ |
| **crdb_dedicated.sys.host.net.send.bytes** <br>(gauge) | Bytes enviados en todas las interfaces de red desde que se inició este proceso.<br>_Se muestra como byte_ |
| **crdb_dedicated.sys.rss** <br>(gauge) | Proceso actual RSS<br>_Se muestra como unidad_ |
| **crdb_dedicated.sys.uptime** <br>(gauge) | Tiempo de actividad del proceso en segundos. Se muestra en segundos<br>_Se muestra en segundos_ |
| **crdb_dedicated.sysbytes** <br>(gauge) | Número de bytes en pares KV del sistema. Se muestra como byte<br>_Se muestra como byte_ |
| **crdb_dedicated.syscount** <br>(gauge) | Recuento de pares KV del sistema<br>_Se muestra como unidad_ |
| **crdb_dedicated.timeseries.write.bytes** <br>(count) | Tamaño total en bytes de las muestras métricas escritas en disco. Se muestra como byte<br>_Se muestra como byte_ |
| **crdb_dedicated.timeseries.write.errors** <br>(count) | Total de errores encontrados al intentar escribir métricas en disco. Se muestra como error<br>_Se muestra como error_ |
| **crdb_dedicated.timeseries.write.samples** <br>(count) | Número total de muestras de métrica escritas en disco<br>_Se muestra como unidad_ |
| **crdb_dedicated.totalbytes** <br>(gauge) | Número total de bytes ocupados por claves y valores, incluidos los datos no activos. Se muestra como byte<br>_Se muestra como byte_ |
| **crdb_dedicated.txn.aborts** <br>(count) | Número de transacciones KV abortadas<br>_Se muestra como unidad_ |
| **crdb_dedicated.txn.commits** <br>(count) | Número de transacciones KV confirmadas incluyendo 1PC<br>_Se muestra como confirmación_ |
| **crdb_dedicated.txn.commits1PC** <br>(count) | Número de transacciones KV de una fase confirmadas<br>_Se muestra como confirmación_ |
| **crdb_dedicated.txn.durations** <br>(count) | Duración de las transacciones KV en nanosegundos<br>_Se muestra en nanosegundos_ |
| **crdb_dedicated.txn.restarts** <br>(count) | Número de transacciones KV reiniciadas<br>_Se muestra como unidad_ |
| **crdb_dedicated.txn.restarts.serializable** <br>(count) | Número de reinicios debidos a una marca temporal de confirmación reenviada y aislamiento=SERIALIZABLE<br>_Se muestra como unidad_ |
| **crdb_dedicated.txn.restarts.writetooold** <br>(count) | Número de reinicios debidos a que un escritor concurrente confirma primero<br>_Se muestra como unidad_ |
| **crdb_dedicated.valbytes** <br>(gauge) | Número de bytes ocupados por los valores. Se muestra como byte<br>_Se muestra como byte_ |
| **crdb_dedicated.valcount** <br>(gauge) | Recuento de todos los valores<br>_Se muestra como unidad_ |
| **crdb_cloud.changefeed.backfill.count** <br>(gauge) | Número de cambios que se están ejecutando actualmente. Se muestra como recuento.<br>_Se muestra como unidad_ |
| **crdb_cloud.changefeed.backfill.pending.ranges** <br>(gauge) | Número de rangos de un relleno en curso que aún no se han emitido por completo. Se muestra como recuento<br>_Se muestra como unidad_ |
| **crdb_cloud.changefeed.commit.latency** <br>(gauge) | Latencia de confirmación de eventos: diferencia entre la marca temporal MVCC del evento y la hora en que fue confirmado por el receptor. Si el sink procesa los eventos por lotes, se registra la diferencia entre el evento más antiguo del lote y la recepción. No incluye la latencia durante el relleno. Se muestra en nanosegundos.<br>_Se muestra como unidad_ |
| **crdb_cloud.changefeed.emitted.messages** <br>(count) | Mensajes emitidos por todas las fuentes. Se muestra como recuento.<br>_Se muestra como unidad_ |
| **crdb_cloud.changefeed.error.retries** <br>(count) | Total de errores reintentables encontrados por todas las fuentes de cambio. Se muestra como recuento.<br>_Se muestra como unidad_ |
| **crdb_cloud.changefeed.failures** <br>(count) | Número total de trabajos de la fuente de cambios que han fallado. Se muestra como recuento.<br>_Se muestra como unidad_ |
| **crdb_cloud.changefeed.max.behind.nanos** <br>(gauge) | La mayor duración de una confirmación a emisión de cualquier fuente. Se muestra en nanosegundos.<br>_Se muestra en nanosegundos_ |
| **crdb_cloud.changefeed.message.size.hist** <br>(gauge) | Histograma de los tamaños de los mensajes para las fuentes de cambio. Se muestra en bytes.<br>_Se muestra como byte_ |
| **crdb_cloud.changefeed.running** <br>(gauge) | Número de fuentes de cambio en ejecución, incluidas las que no tienen sinks. Se muestra como recuento.<br>_Se muestra como unidad_ |
| **crdb_cloud.clock.offset.meannanos** <br>(gauge) | Desfase medio del reloj con otros nodos en nanosegundos. Se muestra en nanosegundos<br>_Se muestra en nanosegundos_ |
| **crdb_cloud.clock.offset.stddevnanos** <br>(gauge) | Desfase del reloj Stdddev con otros nodos en nanosegundos. Se muestra en nanosegundos<br>_Se muestra en nanosegundos_ |
| **crdb_cloud.distsender.batches** <br>(count) | Número de lotes procesados|
| **crdb_cloud.distsender.batches.partial** <br>(count) | Número de lotes parciales procesados|
| **crdb_cloud.distsender.errors.notleaseholder** <br>(count) | Número de NotLeaseHolderErrors encontrados. Se muestra como error<br>_Se muestra como error_ |
| **crdb_cloud.distsender.rpc.sent** <br>(count) | Número de RPCs enviados<br>_Se muestra como solicitud_ |
| **crdb_cloud.distsender.rpc.sent.local** <br>(count) | Número de RPCs locales enviados<br>_Se muestra como solicitud_ |
| **crdb_cloud.distsender.rpc.sent.nextreplicaerror** <br>(count) | Número de RPCs enviados debido a errores por réplica. Se muestra como error<br>_Se muestra como solicitud_ |
| **crdb_cloud.jobs.changefeed.resume.retry.error** <br>(count) | Número de trabajos de cambio de formato que fallaron con un error recuperable. Se muestra como recuento.<br>_Se muestra como unidad_ |
| **crdb_cloud.requests.slow.distsender** <br>(gauge) | Número de solicitudes que llevan mucho tiempo atascadas en el dist sender. Se muestra como solicitud<br>_Se muestra como solicitud_ |
| **crdb_cloud.round_trip.latency** <br>(count) | Distribución de latencias de ida y vuelta con otros nodos en nanosegundos. Se muestra en nanosegundos<br>_Se muestra en nanosegundos_ |
| **crdb_cloud.sql.bytesin** <br>(count) | Número de bytes sql recibidos. Se muestra como byte<br>_Se muestra como byte_ |
| **crdb_cloud.sql.bytesout** <br>(count) | Número de bytes sql enviados. Se muestra como byte<br>_Se muestra como byte_ |
| **crdb_cloud.sql.conn.latency** <br>(count) | Latencia para establecer y autenticar una conexión SQL. Se muestra en nanosegundos.<br>_Se muestra en nanosegundos_ |
| **crdb_cloud.sql.conns** <br>(gauge) | Número de conexiones sql activas. Se muestra como conexión<br> _Se muestra como conexión_ |
| **crdb_cloud.sql.ddl.count** <br>(count) | Número de sentencias SQL DDL<br>_Se muestra como consulta_ |
| **crdb_cloud.sql.delete.count** <br>(count) | Número de sentencias SQL DELETE<br>_Se muestra como consulta_ |
| **crdb_cloud.sql.distsql.contended.queries.count** <br>(count) | Número de consultas SQL que experimentaron contención. Se muestra como recuento.<br>_Se muestra como consulta_ |
| **crdb_cloud.sql.distsql.exec.latency** <br>(count) | Latencia en nanosegundos de la ejecución de la sentencia DistSQL. Se muestra como nanosegundo<br>_Se muestra como nanosegundo_ |
| **crdb_cloud.sql.distsql.flows.active** <br>(gauge) | Número de flujos SQL distribuidos actualmente activos<br>_Se muestra como consulta_ |
| **crdb_cloud.sql.distsql.flows.total** <br>(count) | Número de flujos SQL distribuidos ejecutados<br>_Se muestra como consulta_ |
| **crdb_cloud.sql.distsql.queries.active** <br>(gauge) | Número de consultas SQL distribuidas actualmente activas<br>_Se muestra como consulta_ |
| **crdb_cloud.sql.distsql.queries.total** <br>(count) | Número de consultas SQL distribuidas ejecutadas<br>_Se muestra como consulta_ |
| **crdb_cloud.sql.distsql.select.count** <br>(count) | Número de sentencias DistSQL SELECT<br>_Se muestra como unidad_ |
| **crdb_cloud.sql.distsql.service.latency** <br>(count) | Latencia en nanosegundos de la ejecución de la solicitud DistSQL. Se muestra como nanosegundo<br>_Se muestra como nanosegundo_ |
| **crdb_cloud.sql.exec.latency** <br>(count) | Latencia en nanosegundos de la ejecución de una sentencia SQL. Se muestra como nanosegundo<br>_Se muestra como nanosegundo_ |
| **crdb_cloud.sql.failure.count** <br>(count) | Número de sentencias que dan lugar a un error de planificación o de ejecución. Se muestra como recuento.<br>_Se muestra como unidad_ |
| **crdb_cloud.sql.full.scan.count** <br>(count) | Número de escaneos completos de tablas o índices. Se muestra como recuento.<br>_Se muestra como unidad_ |
| **crdb_cloud.sql.insert.count** <br>(count) | Número de sentencias SQL INSERT<br>_Se muestra como unidad_ |
| **crdb_cloud.sql.mem.distsql.current** <br>(gauge) | Uso actual de memoria de sentencia sql para distsql<br>_Se muestra como unidad_ |
| **crdb_cloud.sql.mem.distsql.max** <br>(count) | Uso de memoria por sentencia sql para distsql<br>_Se muestra como unidad_ |
| **crdb_cloud.sql.mem.internal.session.current** <br>(gauge) | Uso actual de la memoria de la sesión sql para uso interno<br>_Se muestra como unidad_ |
| **crdb_cloud.sql.mem.internal.session.max** <br>(count) | Uso de memoria por sesión sql para uso interno<br>_Se muestra como unidad_ |
| **crdb_cloud.sql.mem.internal.txn.current** <br>(gauge) | Uso actual de la memoria de transacciones sql para uso interno<br>_Se muestra como unidad_ |
| **crdb_cloud.sql.mem.internal.txn.max** <br>(count) | Uso de memoria por transacción sql para uso interno<br>_Se muestra como unidad_ |
| **crdb_cloud.sql.misc.count** <br>(count) | Número de otras sentencias SQL<br>_Se muestra como consulta_ |
| **crdb_cloud.sql.new_conns.count** <br>(count) | Número de conexiones SQL creadas<br>_Se muestra como conexión_ |
| **crdb_cloud.sql.query.count** <br>(count) | Número de consultas SQL<br>_Se muestra como consulta_ |
| **crdb_cloud.sql.select.count** <br>(count) | Número de sentencias SQL SELECT<br>_Se muestra como consulta_ |
| **crdb_cloud.sql.service.latency** <br>(count) | Latencia en nanosegundos de la ejecución de la solicitud SQL. Se muestra en nanosegundos<br>_Se muestra en nanosegundos_ |
| **crdb_cloud.sql.statements.active** <br>(gauge) | Número de sentencias SQL de usuario actualmente activas. Se muestra como recuento.<br>_Se muestra como unidad_ |
| **crdb_cloud.sql.txn.abort.count** <br>(count) | Número de sentencias ABORT de transacciones SQL<br>_Se muestra como unidad_ |
| **crdb_cloud.sql.txn.begin.count** <br>(count) | Número de sentencias BEGIN de transacciones SQL<br>_Se muestra como unidad_ |
| **crdb_cloud.sql.txn.commit.count** <br>(count) | Número de sentencias COMMIT de transacciones SQL<br>_Se muestra como unidad_ |
| **crdb_cloud.sql.txn.latency** <br>(count) | Latencia de las transacciones SQL. Se muestra en nanosegundos.<br>_Se muestra como unidad_ |
| **crdb_cloud.sql.txn.rollback.count** <br>(count) | Número de sentencias ROLLBACK de transacciones SQL<br>_Se muestra como unidad_ |
| **crdb_cloud.sql.txns.open** <br>(gauge) | Número de transacciones SQL abiertas actualmente. Se muestra como recuento.<br>_Se muestra como unidad_ |
| **crdb_cloud.sql.update.count** <br>(count) | Número de sentencias SQL UPDATE<br>_Se muestra como unidad_ |
| **crdb_cloud.sys.uptime** <br>(gauge) | Tiempo de actividad del proceso en segundos. Se muestra en segundos<br>_Se muestra en segundos_ |
| **crdb_cloud.txn.aborts** <br>(count) | Número de transacciones KV abortadas<br>_Se muestra como unidad_ |
| **crdb_cloud.txn.commits** <br>(count) | Número de transacciones KV confirmadas incluyendo 1PC<br>_Se muestra como confirmación_ |
| **crdb_cloud.txn.commits1PC** <br>(count) | Número de transacciones KV de una fase confirmadas<br>_Se muestra como confirmación_ |
| **crdb_cloud.txn.durations** <br>(count) | Duración de las transacciones KV en nanosegundos<br>_Se muestra como nanosegundo_ |
| **crdb_cloud.txn.restarts** <br>(count) | Número de transacciones KV reiniciadas<br>_Se muestra como unidad_ |
| **crdb_cloud.txn.restarts.serializable** <br>(count) | Número de reinicios debidos a una marca temporal de confirmación reenviada y aislamiento=SERIALIZABLE<br>_Se muestra como unidad_ |
| **crdb_cloud.txn.restarts.writetooold** <br>(count) | Número de reinicios debidos a que un escritor concurrente confirma primero<br>_Se muestra como unidad_ |
| **crdb_cloud.tenant.sql_usage.request_units** <br>(count) | Consumo total de unidades de solicitud<br>_Se muestra como unidad_ |
| **crdb_cloud.tenant.sql_usage.kv_request_units** <br>(count) | Consumo de unidades de solicitud atribuible a KV<br>_Se muestra como unidad_ |
| **crdb_cloud.tenant.sql_usage.read_batches** <br>(count) | Número total de lotes de lectura KV<br>_Se muestra como unidad_ |
| **crdb_cloud.tenant.sql_usage.read_requests** <br>(count) | Número total de solicitudes de lectura KV<br>_Se muestra como unidad_ |
| **crdb_cloud.tenant.sql_usage.read_bytes** <br>(count) | Número total de bytes leídos de KV<br>_Se muestra como byte_ |
| **crdb_cloud.tenant.sql_usage.write_batches** <br>(count) | Número total de lotes de escritura KV<br>_Se muestra como unidad_ |
| **crdb_cloud.tenant.sql_usage.write_requests** <br>(count) | Número total de solicitudes de escritura KV<br>_Se muestra como unidad_ |
| **crdb_cloud.tenant.sql_usage.write_bytes** <br>(count) | Número total de bytes escritos en KV<br>_Se muestra como byte_ |
| **crdb_cloud.tenant.sql_usage.sql_pods_cpu_seconds** <br>(count) | Cantidad total de CPU utilizada por los pods SQL<br>_Se muestra como segundo_ |
| **crdb_cloud.tenant.sql_usage.pgwire_egress_bytes** <br>(count) | Número total de bytes transferidos desde un pod SQL al cliente<br>_Se muestra como unidad_ |
| **crdb_cloud.tenant.sql_usage.external_io_ingress_bytes** <br>(count) | Número total de bytes leídos de servicios externos como proveedores de almacenamiento en la nube<br>_Se muestra como byte_ |
| **crdb_cloud.tenant.sql_usage.external_io_egress_bytes** <br>(count) | Número total de bytes escritos en servicios externos como proveedores de almacenamiento en la nube<br>_Se muestra como byte_ |
| **crdb_cloud.tenant.sql_usage.cross_region_network_ru** <br>(count) | Número total de unidades de solicitud cobradas por el tráfico de red interregional<br>_Se muestra como unidad_ |
| **crdb_cloud.storage_bytes** <br>(count) | La cantidad de datos almacenados en el clúster. Es el número lógico de bytes activos y no tiene en cuenta la compresión ni la replicación.<br>_Se muestra como byte_ |

### Checks de servicio

La integración de Cockroach Cloud no incluye ningún check de servicio.

### Eventos

La integración de Cockroach Cloud no incluye ningún evento.

## Soporte

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).