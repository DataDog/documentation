---
app_id: neo4j
categories:
- almacenes de datos
custom_kind: integración
description: Recopila métricas de Neo4j
integration_version: 3.0.4
media:
- caption: Dashboard de Neo4j 5
  image_url: images/Neo4j_5_Dashboard.png
  media_type: imagen
- caption: Base de datos de Neo4j 5
  image_url: images/neo4j_graph.png
  media_type: imagen
supported_os:
- linux
- macos
- windows
title: Neo4j
---
## Información general

[Neo4j](https://neo4j.com/) es una base de datos gráfica empresarial que combina almacenamiento gráfico nativo, seguridad avanzada, arquitectura escalable de velocidad optimizada y conformidad con ACID para garantizar la previsibilidad y la integridad de las consultas basadas en relaciones. Neo4j almacena y gestiona los datos en su estado más natural y conectado y mantiene relaciones de datos que ofrecen consultas ultrarrápidas, un contexto más profundo para el análisis y un modelo de datos modificable sin complicaciones.

Las métricas de Neo4j permiten a los administradores de bases de datos monitorizar sus despliegues de Neo4j. Los administradores de bases de datos desean conocer el uso de la memoria (caché de montón y de page (página)), el número de transacciones, el estado del clúster, el tamaño de la base de datos (incluidos el número de nodos, relaciones y propiedades) y el rendimiento de las consultas.

Con esta integración, visualiza importantes métricas de Neo4j en nuestros dashboards predefinidos y permite a tus bases de datos solucionar problemas y monitorizar el estado de tus bases de datos Neo4j.

## Configuración

Sigue las siguientes instrucciones para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/autodiscovery/integrations) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

Para instalar el check de neo4j en tu host:

1. Descarga e instala el [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).

1. Para instalar el check de neo4j en tu host:

   ```shell
   datadog-agent integration install -t datadog-neo4j==<INTEGRATION_VERSION>
   ```

### Configuración

1. Edita el archivo `neo4j.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de neo4j. Consulta el [ejemplo neo4j.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/neo4j/datadog_checks/neo4j/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. Datadog escucha en el puerto 5000 para dogstatsd_stats_port y expvar_port. En tu archivo neo4j.conf, tendrás que cambiar server.discovery.listen_address y el server.discovery.advertised_address para utilizar un puerto distinto de 5000.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `neo4j` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **neo4j.causal_clustering.catchup_tx_pull_requests_received** <br>(gauge) | Número total de solicitudes de extracción de transacciones recibidas. (Neo4j 4)|
| **neo4j.causal_clustering.core.append_index** <br>(gauge) | Índice de anexión del log de RAFT. (Neo4j 4)|
| **neo4j.causal_clustering.core.commit_index** <br>(gauge) | Índice de confirmación del log de RAFT. (Neo4j 4)|
| **neo4j.causal_clustering.core.discovery.cluster.converged** <br>(gauge) | Convergencia del clúster de descubrimiento. (Neo4j 4)|
| **neo4j.causal_clustering.core.discovery.cluster.members** <br>(gauge) | Tamaño de los miembros del clúster de descubrimiento. (Neo4j 4)|
| **neo4j.causal_clustering.core.discovery.cluster.unreachable** <br>(gauge) | Tamaño inalcanzable del clúster de descubrimiento. (Neo4j 4)|
| **neo4j.causal_clustering.core.discovery.replicated_data.cluster_id.per_db_name.invisible** <br>(gauge) | Identificador oculto del clúster. (Neo4j 4)|
| **neo4j.causal_clustering.core.discovery.replicated_data.cluster_id.per_db_name.visible** <br>(gauge) | Identificador compartido del clúster. (Neo4j 4)|
| **neo4j.causal_clustering.core.discovery.replicated_data.member_data.invisible** <br>(gauge) | Estructura de datos invisible que contiene metadatos sobre los miembros del clúster. (Neo4j 4)|
| **neo4j.causal_clustering.core.discovery.replicated_data.member_data.visible** <br>(gauge) | Estructura de datos visible que contiene metadatos sobre los miembros del clúster. (Neo4j 4)|
| **neo4j.causal_clustering.core.discovery.replicated_data.member_db_state.invisible** <br>(gauge) | La parte oculta de la estructura de datos utilizada con fines internos. (Neo4j 4)|
| **neo4j.causal_clustering.core.discovery.replicated_data.member_db_state.visible** <br>(gauge) | La parte visible de la estructura de datos utilizada con fines internos. (Neo4j 4)|
| **neo4j.causal_clustering.core.discovery.replicated_data.per_db.leader_name.invisible** <br>(gauge) | El número total de cambios de liderazgo. (Neo4j 4)|
| **neo4j.causal_clustering.core.discovery.replicated_data.per_db.leader_name.visible** <br>(gauge) | Número de líderes del clúster. (Neo4j 4)|
| **neo4j.causal_clustering.core.discovery.replicated_data.raft_id.published_by_member.invisible** <br>(gauge) | Identificador de Raft visible publicado por el miembro. (Neo4j 4)|
| **neo4j.causal_clustering.core.discovery.replicated_data.raft_id.published_by_member.visible** <br>(gauge) | Identificador de Raft oculto publicado por el miembro. (Neo4j 4)|
| **neo4j.causal_clustering.core.in_flight_cache_element_count** <br>(gauge) | Recuento de elementos de la caché en vuelo. (Neo4j 4)|
| **neo4j.causal_clustering.core.in_flight_cache.hits** <br>(gauge) | Aciertos de la caché en vuelo. (Neo4j 4)|
| **neo4j.causal_clustering.core.in_flight_cache.max_bytes** <br>(gauge) | Bytes máximos de caché en vuelo. (Neo4j 4)|
| **neo4j.causal_clustering.core.in_flight_cache.max_elements** <br>(gauge) | Elementos máximos de caché en vuelo. (Neo4j 4)|
| **neo4j.causal_clustering.core.in_flight_cache.misses** <br>(gauge) | Fallos de caché en vuelo. (Neo4j 4)|
| **neo4j.causal_clustering.core.in_flight_cache.total_bytes** <br>(gauge) | Total de bytes de la caché en vuelo. (Neo4j 4)|
| **neo4j.causal_clustering.core.is_leader** <br>(gauge) | ¿Es este servidor el líder? (Neo4j 4)|
| **neo4j.causal_clustering.core.message_processing_delay** <br>(gauge) | Retraso entre la recepción y el procesamiento de mensajes de RAFT. (Neo4j 4)|
| **neo4j.causal_clustering.core.message_processing_timer** <br>(gauge) | Temporizador para el procesamiento de mensajes de RAFT. (Neo4j 4)|
| **neo4j.causal_clustering.core.message_processing_timer.append_entries_request** <br>(gauge) | Solicitudes invocadas por el líder de RAFT para replicar entradas de logs. (Neo4j 4)|
| **neo4j.causal_clustering.core.message_processing_timer.append_entries_response** <br>(gauge) | Respuestas de los seguidores a las solicitudes del líder de RAFT para replicar las entradas de logs. (Neo4j 4)|
| **neo4j.causal_clustering.core.message_processing_timer.election_timeout** <br>(gauge) | Eventos de tiempo de espera para el procesamiento de mensajes de RAFT. (Neo4j 4)|
| **neo4j.causal_clustering.core.message_processing_timer.heartbeat** <br>(gauge) | Solicitudes de Heartbeat recibidas por los seguidores en el clúster de RAFT. (Neo4j 4)|
| **neo4j.causal_clustering.core.message_processing_timer.heartbeat_response** <br>(gauge) | Respuestas de Heartbeat recibidas por el líder en el clúster de RAFT. (Neo4j 4)|
| **neo4j.causal_clustering.core.message_processing_timer.heartbeat_timeout** <br>(gauge) | Eventos de tiempo de espera para solicitudes de latido. (Neo4j 4)|
| **neo4j.causal_clustering.core.message_processing_timer.log_compaction_info** <br>(gauge) | Compactación de logs (Neo4j 4)|
| **neo4j.causal_clustering.core.message_processing_timer.new_batch_request** <br>(gauge) | Nuevas solicitudes por lotes (Neo4j 4)|
| **neo4j.causal_clustering.core.message_processing_timer.new_entry_request** <br>(gauge) | Nuevas solicitudes de entrada (Neo4j 4)|
| **neo4j.causal_clustering.core.message_processing_timer.pre_vote_request** <br>(gauge) | Solicitudes previas a la votación (Neo4j 4)|
| **neo4j.causal_clustering.core.message_processing_timer.pre_vote_response** <br>(gauge) | Respuestas previas a la votación (Neo4j 4)|
| **neo4j.causal_clustering.core.message_processing_timer.prune_request** <br>(gauge) | Solicitudes de poda (Neo4j 4)|
| **neo4j.causal_clustering.core.message_processing_timer.vote_request** <br>(gauge) | Solicitudes de votación (Neo4j 4)|
| **neo4j.causal_clustering.core.message_processing_timer.vote_response** <br>(gauge) | Respuestas a las votaciones (Neo4j 4)|
| **neo4j.causal_clustering.core.replication_attempt** <br>(gauge) | Count de intentos de réplica de la Raft. (Neo4j 4)|
| **neo4j.causal_clustering.core.replication_fail** <br>(gauge) | Count de fallos en la réplica de Raft. (Neo4j 4)|
| **neo4j.causal_clustering.core.replication_new** <br>(gauge) | Nuevo count de solicitudes de réplica de Raft. (Neo4j 4)|
| **neo4j.causal_clustering.core.replication_success** <br>(gauge) | Count de éxitos de réplica de Raft. (Neo4j 4)|
| **neo4j.causal_clustering.core.term** <br>(gauge) | Término de RAFT de este servidor (Neo4j 4)|
| **neo4j.causal_clustering.core.tx_retries** <br>(gauge) | Reintentos de transacción. (Neo4j 4)|
| **neo4j.causal_clustering.read_replica.pull_update_highest_tx_id_received** <br>(gauge) | El identificador de transacción más alto que se ha extraído en la última actualización de extracción por esta instancia. (Neo4j 4)|
| **neo4j.causal_clustering.read_replica.pull_update_highest_tx_id_requested** <br>(gauge) | El identificador de transacción más alto solicitado en una actualización de incorporación de cambios por esta instancia. (Neo4j 4)|
| **neo4j.causal_clustering.read_replica.pull_updates** <br>(gauge) | El número total de solicitudes de incorporación de cambios realizadas por esta instancia. (Neo4j 4)|
| **neo4j.database.dbname.check_point.duration** <br>(gauge) | La duración, en milisegundos, del último evento de punto de control. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.check_point.events** <br>(count) | El número total de eventos de punto de control ejecutados hasta el momento. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.check_point.io_limit** <br>(gauge) | El límite de entrada/salida utilizado durante el último evento de punto de control. (Neo4j 5)|
| **neo4j.database.dbname.check_point.io_performed** <br>(gauge) | El número de entradas/salidas desde la perspectiva de Neo4j realizadas durante el último evento de punto de control. (Neo4j 5)|
| **neo4j.database.dbname.check_point.limit_millis** <br>(gauge) | (Neo4j 5)|
| **neo4j.database.dbname.check_point.limit_times** <br>(gauge) | (Neo4j 5)|
| **neo4j.database.dbname.check_point.pages_flushed** <br>(gauge) | El número de páginas que se vaciaron durante el último evento de punto de control. (Neo4j 5)|
| **neo4j.database.dbname.check_point.total_time** <br>(count) | El tiempo total, en milisegundos, empleado en el punto de control hasta ahora. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.cluster.catchup.tx_pull_requests_received** <br>(count) | Solicitudes de incorporación de cambios de TX recibidas de secundarios. (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.append_index** <br>(count) | El índice de anexión del log de Raft (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.applied_index** <br>(count) | El índice aplicado del log de Raft (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.commit_index** <br>(count) | El índice de confirmación del log de Raft (Neo4j 4)|
| **neo4j.database.dbname.cluster.core.in_flight_cache.element_count** <br>(gauge) | Count de elementos en caché en vuelo. (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.in_flight_cache.hits** <br>(count) | Aciertos de caché en vuelo. (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.in_flight_cache.max_bytes** <br>(gauge) | Bytes máximos de caché en vuelo. (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.in_flight_cache.max_elements** <br>(gauge) | Elementos máximos de la caché en vuelo. (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.in_flight_cache.misses** <br>(count) | Fallos de caché en vuelo. (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.in_flight_cache.total_bytes** <br>(count) | Total de bytes de la caché en vuelo. (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.is_leader** <br>(count) | ¿Es este servidor el líder? (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.last_leader_message** <br>(count) | El tiempo transcurrido desde el último mensaje de un líder en milisegundos.|
| **neo4j.database.dbname.cluster.core.message_processing_delay** <br>(count) | Retraso entre la recepción y el procesamiento del mensaje de Raft.|
| **neo4j.database.dbname.cluster.core.message_processing_timer** <br>(count) | Temporizador para el procesamiento de mensajes de Raft. (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.message_processing_timer.append_entries_request** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.message_processing_timer.append_entries_response** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.message_processing_timer.election_timeout** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.message_processing_timer.heartbeat** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.message_processing_timer.heartbeat_response** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.message_processing_timer.heartbeat_timeout** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.message_processing_timer.leadership_transfer_proposal** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.message_processing_timer.leadership_transfer_rejection** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.message_processing_timer.leadership_transfer_request** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.message_processing_timer.log_compaction_info** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.message_processing_timer.new_batch_request** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.message_processing_timer.new_entry_request** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.message_processing_timer.pre_vote_request** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.message_processing_timer.pre_vote_response** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.message_processing_timer.prune_request** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.message_processing_timer.status_response** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.message_processing_timer.vote_request** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.message_processing_timer.vote_response** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.raft_log_entry_prefetch_buffer.async_put** <br>(count) | Puts asíncronas de búfer de acceso previo de entrada de logs de Raft (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.raft_log_entry_prefetch_buffer.bytes** <br>(count) | Bytes totales de acceso previo de entrada de logs de Raft. (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.raft_log_entry_prefetch_buffer.lag** <br>(count) | Retraso de acceso previo de entrada de logs de Raft. (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.raft_log_entry_prefetch_buffer.size** <br>(count) | Tamaño del búfer de acceso previo de entrada de logs de Raft (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.raft_log_entry_prefetch_buffer.sync_put** <br>(count) | Puts asíncronas de búfer de acceso previo de entrada de logs de Raft (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.replication_attempt** <br>(count) | El número total de intentos de solicitudes de réplicas de Raft. Es mayor o igual que las solicitudes de réplicas.|
| **neo4j.database.dbname.cluster.core.replication_fail** <br>(count) | El número total de intentos de réplica de Raft que han fallado. (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.replication_maybe** <br>(count) | La réplica de Raft tal vez cuente. (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.replication_new** <br>(count) | La réplica de Raft tal vez cuente. (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.replication_success** <br>(count) | El número total de solicitudes de réplicas de Raft que han tenido éxito. (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.term** <br>(count) | El término de Raft de este servidor. Aumenta en forma monótona si no se desvincula el estado del clúster. (Neo4j 5)|
| **neo4j.database.dbname.cluster.core.tx_retries** <br>(count) | Reintentos de transacción. (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.append_index** <br>(count) | El índice de anexión del log de Raft. Cada índice representa una transacción de escritura (posiblemente interna) propuesta para confirmación. Los valores aumentan en su mayoría, pero a veces pueden disminuir como consecuencia de cambios de líder. El índice de anexión siempre debe ser menor o igual al índice de confirmación. (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.applied_index** <br>(count) | El índice aplicado del log de Raft. Representa la aplicación de las entradas de logs de Raft confirmadas a la base de datos y al estado interno. El índice aplicado siempre debe ser mayor o igual que el índice de confirmación. La diferencia entre este y el índice de confirmación se puede utilizar para monitorizar para saber cuán actualizada está la base de datos de seguimiento. (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.commit_index** <br>(count) | El índice de confirmación de logs de Raft. Representa el compromiso de las entradas añadidas previamente. Su valor aumenta en forma monótona si no se desvincula el estado del clúster. El índice de confirmación siempre debe ser mayor o igual que el índice de anexión. (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.in_flight_cache.element_count** <br>(count) | Count de elementos en caché en vuelo. (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.in_flight_cache.hits** <br>(count) | Aciertos de la caché en vuelo. (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.in_flight_cache.max_bytes** <br>(count) | Bytes máximos de caché en vuelo. (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.in_flight_cache.max_elements** <br>(count) | Elementos máximos de la caché en vuelo. (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.in_flight_cache.misses** <br>(count) | Fallos de caché en vuelo. (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.in_flight_cache.total_bytes** <br>(count) | Total de bytes de la caché en vuelo. (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.is_leader** <br>(count) | ¿Es este servidor el líder? (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.last_leader_message** <br>(count) | El tiempo transcurrido desde el último mensaje de un líder en milisegundos. Debe reiniciarse periódicamente. (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.message_processing_delay** <br>(count) | Retraso entre la recepción y el procesamiento del mensaje de Raft. (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.message_processing_timer** <br>(count) | Temporizador para el procesamiento de mensajes de Raft. (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.message_processing_timer.append_entries_request** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.message_processing_timer.append_entries_response** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.message_processing_timer.election_timeout** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.message_processing_timer.heartbeat** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.message_processing_timer.heartbeat_response** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.message_processing_timer.heartbeat_timeout** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.message_processing_timer.leadership_transfer_proposal** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.message_processing_timer.leadership_transfer_rejection** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.message_processing_timer.leadership_transfer_request** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.message_processing_timer.log_compaction_info** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.message_processing_timer.new_batch_request** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.message_processing_timer.new_entry_request** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.message_processing_timer.pre_vote_request** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.message_processing_timer.pre_vote_response** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.message_processing_timer.prune_request** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.message_processing_timer.status_response** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.message_processing_timer.vote_request** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.message_processing_timer.vote_response** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.raft_log_entry_prefetch_buffer.async_put** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.raft_log_entry_prefetch_buffer.bytes** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.raft_log_entry_prefetch_buffer.lag** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.raft_log_entry_prefetch_buffer.size** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.raft_log_entry_prefetch_buffer.sync_put** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.replication_attempt** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.replication_fail** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.replication_maybe** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.replication_new** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.replication_success** <br>(count) | (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.term** <br>(count) | El término de Raft de este servidor. Aumenta en forma monótona si no se desvincula el estado del clúster. (Neo4j 5)|
| **neo4j.database.dbname.cluster.raft.tx_retries** <br>(count) | Reintentos de transacción. (Neo4j 5)|
| **neo4j.database.dbname.count.node** <br>(gauge) | El número total de nodos en las bases de datos. (Neo4j 4)|
| **neo4j.database.dbname.cypher.cache.ast.entries** <br>(gauge) | Número de entradas de AST en la caché de cifrado (Neo4j 5)|
| **neo4j.database.dbname.cypher.cache.executable_query.cache_flushes** <br>(gauge) | Número de descargas de la caché de consultas ejecutables de la caché de cifrado. (Neo4j 5)|
| **neo4j.database.dbname.cypher.cache.executable_query.compiled** <br>(gauge) | El número de entradas compiladas de consultas ejecutables de la caché de cifrado. (Neo4j 5)|
| **neo4j.database.dbname.cypher.cache.executable_query.discards** <br>(gauge) | El número de descartes de consultas ejecutables de la caché de cifrado. (Neo4j 5)|
| **neo4j.database.dbname.cypher.cache.executable_query.entries** <br>(gauge) | Número de entradas de consultas ejecutables en la caché de cifrado. (Neo4j 5)|
| **neo4j.database.dbname.cypher.cache.executable_query.hits** <br>(gauge) | Número de aciertos de consultas ejecutables en la caché de cifrado. (Neo4j 5)|
| **neo4j.database.dbname.cypher.cache.executable_query.misses** <br>(gauge) | El número de consultas ejecutables fallidas de la caché de cifrado. (Neo4j 5)|
| **neo4j.database.dbname.cypher.cache.executable_query.stale_entries** <br>(gauge) | Número de entradas de consultas obsoletas ejecutables en la caché de cifrado. (Neo4j 5)|
| **neo4j.database.dbname.cypher.cache.execution_plan.cache_flushes** <br>(gauge) | El número de vaciados de caché del plan de ejecución de la caché de cifrado. (Neo4j 5)|
| **neo4j.database.dbname.cypher.cache.execution_plan.compiled** <br>(gauge) | El número de entradas compiladas del plan de ejecución de la caché de cifrado. (Neo4j 5)|
| **neo4j.database.dbname.cypher.cache.execution_plan.discards** <br>(gauge) | El número de descartes del plan de ejecución de la caché de cifrado. (Neo4j 5)|
| **neo4j.database.dbname.cypher.cache.execution_plan.entries** <br>(gauge) | El número de entradas del plan de ejecución de la caché de cifrado. (Neo4j 5)|
| **neo4j.database.dbname.cypher.cache.execution_plan.hits** <br>(gauge) | Número de aciertos en el plan de ejecución de la caché de cifrado. (Neo4j 5)|
| **neo4j.database.dbname.cypher.cache.execution_plan.misses** <br>(gauge) | El número de fallos en el plan de ejecución de la caché de cifrado. (Neo4j 5)|
| **neo4j.database.dbname.cypher.cache.execution_plan.stale_entries** <br>(gauge) | Número de entradas de consultas obsoletas ejecutables en la caché de cifrado. (Neo4j 5)|
| **neo4j.database.dbname.cypher.cache.logical_plan.cache_flushes** <br>(gauge) | El número de vaciados de la caché de planes lógicos de la caché de cifrado. (Neo4j 5)|
| **neo4j.database.dbname.cypher.cache.logical_plan.compiled** <br>(gauge) | El número de entradas compiladas del plan lógico de la caché de cifrado. (Neo4j 5)|
| **neo4j.database.dbname.cypher.cache.logical_plan.discards** <br>(gauge) | El número de descartes del plan lógico de la caché de cifrado. (Neo4j 5)|
| **neo4j.database.dbname.cypher.cache.logical_plan.entries** <br>(gauge) | El número de entradas del plan lógico de la caché de cifrado. (Neo4j 5)|
| **neo4j.database.dbname.cypher.cache.logical_plan.hits** <br>(gauge) | Número de aciertos del plan lógico de la caché de cifrado. (Neo4j 5)|
| **neo4j.database.dbname.cypher.cache.logical_plan.misses** <br>(gauge) | Número de faltas del plan lógico de la caché de cifrado. (Neo4j 5)|
| **neo4j.database.dbname.cypher.cache.logical_plan.stale_entries** <br>(gauge) | Número de entradas de consultas obsoletas ejecutables en la caché de cifrado. (Neo4j 5)|
| **neo4j.database.dbname.cypher.cache.pre_parser.entries** <br>(gauge) | El número de entradas del analizador previo de la caché de cifrado. (Neo4j 5)|
| **neo4j.database.dbname.cypher.replan_events** <br>(count) | El número total de veces que Cypher ha decidido volver a planificar una consulta. Neo4j almacena 1000 planes en forma predeterminada. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.cypher.replan_wait_time** <br>(count) | El número total de segundos esperados entre nuevas planificaciones de consultas. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.db.query.execution.failure** <br>(count) | Count de consultas fallidas ejecutadas. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.db.query.execution.latency.millis** <br>(gauge) | Tiempo de ejecución en milisegundos de las consultas ejecutadas con éxito. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.db.query.execution.success** <br>(count) | Count de consultas ejecutadas con éxito. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.ids_in_use.node** <br>(gauge) | El número total de nodos almacenados en la base de datos. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.ids_in_use.property** <br>(gauge) | El número total de nombres de propiedades diferentes utilizados en la base de datos. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.ids_in_use.relationship** <br>(gauge) | El número total de relaciones almacenadas en la base de datos. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.ids_in_use.relationship_type** <br>(gauge) | El número total de diferentes tipos de relaciones almacenadas en la base de datos. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.log.append_batch_size** <br>(gauge) | El tamaño del último lote de anexiones de transacciones. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.log.appended_bytes** <br>(count) | El número total de bytes añadidos al log de transacción. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.log.flushes** <br>(count) | El número total de vaciados de logs de transacciones. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.log.rotation_duration** <br>(count) | La duración, en milisegundos, del último evento de rotación de logs. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.log.rotation_events** <br>(count) | El número total de rotaciones de logs de transacciones ejecutadas hasta el momento. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.log.rotation_total_time** <br>(count) | El tiempo total, en milisegundos, empleado en rotar logs de transacciones hasta el momento. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.neo4j.count.node** <br>(count) | El número total de nodos en la base de datos.  (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.neo4j.count.relationship** <br>(gauge) | El número total de relaciones en la base de datos. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.neo4j.count.relationship_types** <br>(gauge) | Número total de identificadores generados internamente para los diferentes tipos de relaciones almacenados en la base de datos. (Neo4j 5)|
| **neo4j.database.dbname.pool.other.neo4j.free** <br>(count) | Cantidad estimada de memoria libre en bytes para este grupo. (Neo4j 4)|
| **neo4j.database.dbname.pool.other.neo4j.total_size** <br>(count) | Cantidad estimada de memoria disponible en bytes para este grupo. (Neo4j 4)|
| **neo4j.database.dbname.pool.other.neo4j.total_used** <br>(count) | Cantidad estimada de memoria total utilizada en bytes para este grupo. (Neo4j 4)|
| **neo4j.database.dbname.pool.other.neo4j.used_heap** <br>(count) | Cantidad estimada de montón utilizado en bytes para este grupo. (Neo4j 4)|
| **neo4j.database.dbname.pool.other.neo4j.used_native** <br>(count) | Cantidad estimada de memoria nativa utilizada para este grupo. (Neo4j 4)|
| **neo4j.database.dbname.pool.transaction.neo4j.free** <br>(count) | Cantidad estimada de memoria libre en bytes para este grupo.|
| **neo4j.database.dbname.pool.transaction.neo4j.total_size** <br>(count) | Cantidad estimada de memoria disponible en bytes para este grupo.|
| **neo4j.database.dbname.pool.transaction.neo4j.total_used** <br>(count) | Cantidad estimada de memoria total utilizada en bytes para este pool.|
| **neo4j.database.dbname.pool.transaction.neo4j.used_heap** <br>(count) | Cantidad estimada del montón utilizado en bytes para este grupo.|
| **neo4j.database.dbname.pool.transaction.neo4j.used_native** <br>(count) | Cantidad estimada de memoria nativa utilizada para este grupo.|
| **neo4j.database.dbname.store.size.database** <br>(gauge) | El tamaño de la base de datos, en bytes. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.store.size.total** <br>(gauge) | El tamaño total de la base de datos y de los logs de transacciones, en bytes. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.transaction.active** <br>(gauge) | El número de transacciones actualmente activas. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.transaction.active_read** <br>(gauge) | El número de transacciones de lectura actualmente activas. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.transaction.active_write** <br>(gauge) | El número de transacciones de escritura actualmente activas. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.transaction.committed** <br>(count) | El número total de transacciones confirmadas. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.transaction.committed_read** <br>(count) | El número total de transacciones de lectura confirmadas. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.transaction.committed_write** <br>(count) | El número total de transacciones de escritura confirmadas. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.transaction.last_closed_tx_id** <br>(gauge) | El identificador de la última transacción cerrada. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.transaction.last_committed_tx_id** <br>(gauge) | El identificador de la última transacción confirmada. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.transaction.peak_concurrent** <br>(count) | El pico más alto de transacciones concurrentes. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.transaction.rollbacks** <br>(count) | El número total de transacciones revertidas. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.transaction.rollbacks_read** <br>(count) | El número total de transacciones de lectura revertidas. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.transaction.rollbacks_write** <br>(count) | El número total de transacciones de escritura revertidas. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.transaction.started** <br>(count) | El número total de transacciones iniciadas.|
| **neo4j.database.dbname.transaction.terminated** <br>(count) | El número total de transacciones finalizadas.|
| **neo4j.database.dbname.transaction.terminated_read** <br>(count) | El número total de transacciones de lectura terminadas. (Neo4j 4 y Neo4j 5)|
| **neo4j.database.dbname.transaction.terminated_write** <br>(count) | Número total de transacciones de escritura finalizadas.|
| **neo4j.database.dbname.transaction.tx_size_heap** <br>(count) | El tamaño de las transacciones en el montón en bytes.|
| **neo4j.database.dbname.transaction.tx_size_native** <br>(count) | El tamaño de las transacciones en la memoria nativa en bytes. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.bolt.accumulated_processing_time** <br>(count) | La cantidad total de tiempo en milisegundos que los subprocesos de worker han estado procesando mensajes. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.bolt.accumulated_queue_time** <br>(count) | Cuando internal.server.bolt.thread_pool_queue_size está activado, el tiempo total en milisegundos que un mensaje de Bolt espera en la cola de procesamiento antes de que un subproceso de worker de Bolt esté disponible para procesarlo.  (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.bolt.connections_closed** <br>(gauge) | El número total de conexiones de Bolt cerradas desde que se inició esta instancia. Esto incluye tanto las conexiones finalizadas correctamente como las anormalmente finalizadas.  (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.bolt.connections_idle** <br>(gauge) | El número total de conexiones de Bolt que no están ejecutando actualmente Cypher ni devolviendo resultados.  (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.bolt.connections_opened** <br>(count) | El número total de conexiones de Bolt abiertas desde el inicio. Esto incluye tanto las conexiones finalizadas con éxito como las fallidas. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.bolt.connections_running** <br>(gauge) | El número total de conexiones de Bolt que están ejecutando actualmente Cypher y devolviendo resultados. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.bolt.messages_done** <br>(count) | El número total de mensajes de Bolt que han terminado de procesarse, ya sea con éxito o sin éxito. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.bolt.messages_failed** <br>(count) | El número total de mensajes que han fallado durante el procesamiento. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.bolt.messages_received** <br>(count) | El número total de mensajes recibidos a través de Bolt desde el inicio. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.bolt.messages_started** <br>(count) | El número total de mensajes que han comenzado a procesarse desde que se recibieron. Un mensaje recibido puede haber comenzado a ser procesado hasta que un hilo de worker de Bolt esté disponible. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.bolt.response_failed** <br>(count) | El número total de respuestas de Bolt que han fallado durante el procesamiento. (Neo4j 5)|
| **neo4j.dbms.bolt.response_ignored** <br>(count) | Número total de respuestas de Bolt que se han ignorado durante el procesamiento. (Neo4j 5)|
| **neo4j.dbms.bolt.response_success** <br>(count) | Número total de respuestas de Bolt que se han procesado correctamente. (Neo4j 5)|
| **neo4j.dbms.bolt_driver.api.managed_transaction_function_calls** <br>(count) | Número total de llamadas a funciones de transacciones gestionadas. (Neo4j 5)|
| **neo4j.dbms.bolt_driver.api.unmanaged_transaction_calls** <br>(count) | El número total de llamadas a funciones de transacción no gestionadas. (Neo4j 5)|
| **neo4j.dbms.bolt_driver.api.implicit_transaction_calls** <br>(count) | Número total de llamadas implícitas a funciones de transacción. (Neo4j 5)|
| **neo4j.dbms.bolt_driver.api.execute_calls** <br>(count) | Número total de llamadas a funciones de ejecución a nivel de controlador. . (Neo4j 5)|
| **neo4j.dbms.cluster.catchup.tx_pull_requests_received** <br>(count) | Solicitudes de incorporación de cambios de TX recibidas de réplicas de lectura. (Neo4j 4)|
| **neo4j.dbms.cluster.core.append_index** <br>(gauge) | El índice de anexión del log de Raft (Neo4j 4)|
| **neo4j.dbms.cluster.core.applied_index** <br>(gauge) | El índice aplicado del log de Raft (Neo4j 4)|
| **neo4j.dbms.cluster.core.commit_index** <br>(gauge) | El índice de confirmación del log de Raft (Neo4j 4)|
| **neo4j.dbms.cluster.core.in_flight_cache_element_count** <br>(gauge) | Recuento de elementos de la caché en vuelo. (Neo4j 4)|
| **neo4j.dbms.cluster.core.in_flight_cache.hits** <br>(count) | Aciertos de la caché en vuelo. (Neo4j 4)|
| **neo4j.dbms.cluster.core.in_flight_cache.max_bytes** <br>(gauge) | Número máximo de bytes de caché en vuelo. (Neo4j 4)|
| **neo4j.dbms.cluster.core.in_flight_cache.max_elements** <br>(gauge) | Elementos máximos de caché en vuelo. (Neo4j 4)|
| **neo4j.dbms.cluster.core.in_flight_cache.misses** <br>(count) | Fallos de caché en vuelo. (Neo4j 4)|
| **neo4j.dbms.cluster.core.in_flight_cache.total_bytes** <br>(gauge) | Total de bytes de la caché en vuelo. (Neo4j 4)|
| **neo4j.dbms.cluster.core.is_leader** <br>(gauge) | ¿Es este servidor el líder? (Neo4j 4)|
| **neo4j.dbms.cluster.core.last_leader_message** <br>(gauge) | El tiempo transcurrido desde el último mensaje de un líder en milisegundos. (Neo4j 4)|
| **neo4j.dbms.cluster.core.message_processing_delay** <br>(gauge) | Retraso entre la recepción y el procesamiento de mensajes de RAFT. (Neo4j 4)|
| **neo4j.dbms.cluster.core.message_processsing_timer** <br>(count) | Temporizador para el procesamiento de mensajes de RAFT. (Neo4j 4)|
| **neo4j.dbms.cluster.core.raft_log_entry_prefetch_buffer.async_put** <br>(gauge) | Puts asíncronas de búfer de acceso previo de entrada de logs de Raft (Neo4j 4)|
| **neo4j.dbms.cluster.core.raft_log_entry_prefetch_buffer.bytes** <br>(gauge) | Bytes totales de acceso previo de entrada de logs de Raft. (Neo4j 4)|
| **neo4j.dbms.cluster.core.raft_log_entry_prefetch_buffer.lag** <br>(gauge) | Retraso de acceso previo de entrada de logs de Raft. (Neo4j 4)|
| **neo4j.dbms.cluster.core.raft_log_entry_prefetch_buffer.size** <br>(gauge) | Tamaño del búfer de acceso previo de entrada de logs de Raft. (Neo4j 4)|
| **neo4j.dbms.cluster.core.raft_log_entry_prefetch_buffer.sync_put** <br>(gauge) | Puts asíncronas de búfer de acceso previo de entrada de logs de Raft (Neo4j 4)|
| **neo4j.dbms.cluster.core.replication_attempt** <br>(count) | El número total de intentos de réplica de solicitudes de Raft. (Neo4j 4)|
| **neo4j.dbms.cluster.core.replication_fail** <br>(count) | El número total de intentos de réplicas de Raft que han fallado. (Neo4j 4)|
| **neo4j.dbms.cluster.core.replication_maybe** <br>(count) | Réplica de Raft tal vez cuenta. (Neo4j 4)|
| **neo4j.dbms.cluster.core.replication_new** <br>(count) | El número total de solicitudes de réplicas de Raft. (Neo4j 4)|
| **neo4j.dbms.cluster.core.replication_success** <br>(count) | Count de éxitos de réplicas de Raft. (Neo4j 4)|
| **neo4j.dbms.cluster.core.term** <br>(gauge) | El término de RAFT de este servidor. (Neo4j 4)|
| **neo4j.dbms.cluster.core.tx_retries** <br>(count) | Reintentos de transacción. (Neo4j 4)|
| **neo4j.dbms.cluster.discovery.cluster.converged** <br>(gauge) | Convergencia del clúster de descubrimiento. (Neo4j 5)|
| **neo4j.dbms.cluster.discovery.cluster.members** <br>(gauge) | Tamaño de los miembros del clúster de descubrimiento. (Neo4j 5)|
| **neo4j.dbms.cluster.discovery.cluster.unreachable** <br>(gauge) | Tamaño inalcanzable del clúster de descubrimiento. (Neo4j 5)|
| **neo4j.dbms.cluster.discovery.replicated_data** <br>(gauge) | Tamaño de las estructuras de datos replicadas. (Neo4j 5)|
| **neo4j.dbms.cluster.discovery.replicated_data.bootstrap_data.invisible** <br>(count) | (Neo4j 5)|
| **neo4j.dbms.cluster.discovery.replicated_data.bootstrap_data.visible** <br>(count) | (Neo4j 5)|
| **neo4j.dbms.cluster.discovery.replicated_data.component_versions.invisible** <br>(count) | (Neo4j 5)|
| **neo4j.dbms.cluster.discovery.replicated_data.component_versions.visible** <br>(count) | (Neo4j 5)|
| **neo4j.dbms.cluster.discovery.replicated_data.database_data.invisible** <br>(count) | (Neo4j 5)|
| **neo4j.dbms.cluster.discovery.replicated_data.database_data.visible** <br>(count) | (Neo4j 5)|
| **neo4j.dbms.cluster.discovery.replicated_data.leader_data.invisible** <br>(count) | (Neo4j 5)|
| **neo4j.dbms.cluster.discovery.replicated_data.leader_data.visible** <br>(count) | (Neo4j 5)|
| **neo4j.dbms.cluster.discovery.replicated_data.server_data.invisible** <br>(count) | (Neo4j 5)|
| **neo4j.dbms.cluster.discovery.replicated_data.server_data.visible** <br>(count) | (Neo4j 5)|
| **neo4j.dbms.cluster.discovery.restart.failed_count** <br>(count) | (Neo4j 5)|
| **neo4j.dbms.cluster.discovery.restart.success_count** <br>(count) | (Neo4j 5)|
| **neo4j.dbms.cluster.read_replica.pull_update_highest_tx_id_received** <br>(count) | El identificador de transacción más alto que ha sido extraído en la última actualización de incorporación de cambios por esta instancia. (Neo4j 4)|
| **neo4j.dbms.cluster.read_replica.pull_update_highest_tx_id_requested** <br>(count) | El identificador de transacción más alto solicitado en una actualización incorporación de cambios por esta instancia. (Neo4j 4)|
| **neo4j.dbms.cluster.read_replica.pull_updates** <br>(count) | El número total de solicitudes de incorporación de cambios realizadas por esta instancia. (Neo4j 4)|
| **neo4j.dbms.db.operation.count.create** <br>(count) | Count de operaciones de creación realizadas con éxito. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.db.operation.count.drop** <br>(count) | Count de operaciones de eliminación de bases de datos realizadas con éxito. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.db.operation.count.failed** <br>(count) | Count de operaciones fallidas en la base de datos. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.db.operation.count.recovered** <br>(count) | Count de operaciones de base de datos que fallaron anteriormente, pero se han recuperado. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.db.operation.count.start** <br>(count) | Count de operaciones de inicio de base de datos realizadas con éxito. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.db.operation.count.stop** <br>(count) | Count de operaciones de parada de la base de datos realizadas con éxito. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.page_cache.bytes_read** <br>(count) | El número total de bytes leídos por la caché de page (página). (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.page_cache.bytes_written** <br>(count) | El número total de bytes escritos por la caché de la page (página). (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.page_cache.eviction_exceptions** <br>(count) | El número total de excepciones vistas durante el proceso de desalojo en la caché de la page (página). (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.page_cache.evictions** <br>(count) | El número total de desalojos de la page (página) ejecutados por la caché Page ( página). (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.page_cache.evictions.cooperative** <br>(count) | El número total de desalojos cooperativos de la page (página) ejecutados por la caché de la page (página) debido a la escasez de páginas disponibles. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.page_cache.evictions.flushes** <br>(count) | El número total de páginas vaciadas por el desalojo de la page (página). (Neo4j 5)|
| **neo4j.dbms.page_cache.evictions.cooperative.flushes** <br>(count) | El número total de páginas cooperativas vaciadas por el desalojo de la page (página). (Neo4j 5)|
| **neo4j.dbms.page_cache.flushes** <br>(count) | El número total de descargas ejecutadas por la caché de la page (página).  (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.page_cache.hit_ratio** <br>(gauge) | Relación de aciertos respecto al número total de búsquedas en la caché de la page (página). (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.page_cache.hits** <br>(count) | El número total de aciertos de page (página) que se han producido en la caché de page (página). (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.page_cache.iops** <br>(count) | El número total de operaciones entrada/salida realizadas por la caché de page (página). (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.page_cache.merges** <br>(count) | El número total de fusiones de page (página) ejecutadas por la caché de page (página). (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.page_cache.page_cancelled_faults** <br>(count) | El número total de fallos cancelados de page (página) ocurridos en la caché de page (página).  (Neo4j 5)|
| **neo4j.dbms.page_cache.page_fault_failures** <br>(count) | El número total de fallos de page (página) ocurridos en la caché de page (página). (Neo4j 5)|
| **neo4j.dbms.page_cache.page_faults** <br>(count) | El número total de fallos de page (página) ocurridos en la caché de page (página). (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.page_cache.page_no_pin_page_faults** <br>(count) |  (Neo4j 5)|
| **neo4j.dbms.page_cache.page_vectored_faults** <br>(count) |  (Neo4j 5)|
| **neo4j.dbms.page_cache.page_vectored_faults_failures** <br>(count) |  (Neo4j 5)|
| **neo4j.dbms.page_cache.pages_copied** <br>(count) | El número total de copias de page (página) que se han producido en la caché de page (página). (Neo4j 5)|
| **neo4j.dbms.page_cache.pins** <br>(count) | El número total de pasadores de page (página) ejecutados por la caché de page (página).  (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.page_cache.throttled_millis** <br>(count) | El número total del limitador de entradas/salidas de vaciado de caché de page (página) de millones se alternó durante operaciones de entrada/salida en curso. (Neo4j 4)|
| **neo4j.dbms.page_cache.throttled.times** <br>(count) | El número total de veces que el limitador de vaciado de caché de page (página) cache se alternó durante operaciones de entrada/salida en curso.  (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.page_cache.unpins** <br>(count) | El número total de desclavados de page (página) ejecutados por la caché de page (página). (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.page_cache.usage_ratio** <br>(gauge) | Relación entre el número de páginas utilizadas y el número total de páginas disponibles. (Neo4j 5)|
| **neo4j.dbms.pool.backup.free** <br>(count) | Cantidad estimada de memoria libre en bytes para este grupo.|
| **neo4j.dbms.pool.backup.total_size** <br>(count) | Cantidad estimada de memoria disponible en bytes para este grupo.|
| **neo4j.dbms.pool.backup.total_used** <br>(count) | Cantidad estimada de memoria total utilizada en bytes para este grupo.|
| **neo4j.dbms.pool.backup.used_heap** <br>(count) | Cantidad estimada de montón usado en bytes para este grupo.|
| **neo4j.dbms.pool.backup.used_native** <br>(count) | Cantidad estimada de memoria nativa utilizada para este grupo.|
| **neo4j.dbms.pool.bolt.free** <br>(count) | Cantidad estimada de memoria libre en bytes para este grupo. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.pool.bolt.total_size** <br>(count) | Cantidad estimada de memoria disponible en bytes para este grupo. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.pool.bolt.total_used** <br>(count) | Cantidad estimada de memoria total utilizada en bytes para este grupo (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.pool.bolt.used_heap** <br>(count) | Cantidad estimada de montón utilizado en bytes para este grupo. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.pool.bolt.used_native** <br>(count) | Cantidad estimada de memoria nativa utilizada para este grupo.|
| **neo4j.dbms.pool.cluster.free** <br>(count) | Cantidad estimada de memoria libre en bytes para este grupo.|
| **neo4j.dbms.pool.cluster.total_size** <br>(count) | Cantidad estimada de memoria disponible en bytes para este grupo.|
| **neo4j.dbms.pool.cluster.total_used** <br>(count) | Cantidad estimada de memoria total utilizada en bytes para este grupo.|
| **neo4j.dbms.pool.cluster.used_heap** <br>(count) | Cantidad estimada de montón utilizado en bytes para este grupo.|
| **neo4j.dbms.pool.cluster.used_native** <br>(count) | Cantidad estimada de memoria nativa utilizada para este grupo.|
| **neo4j.dbms.pool.http_transaction.free** <br>(count) | Cantidad estimada de memoria libre en bytes para este grupo.|
| **neo4j.dbms.pool.http_transaction.total_size** <br>(count) | Cantidad estimada de memoria disponible en bytes para este grupo.|
| **neo4j.dbms.pool.http_transaction.total_used** <br>(count) | Cantidad estimada de memoria total utilizada en bytes para este grupo.|
| **neo4j.dbms.pool.http_transaction.used_heap** <br>(count) | Cantidad estimada de montón usado en bytes para este grupo.|
| **neo4j.dbms.pool.http_transaction.used_native** <br>(count) | Cantidad estimada de memoria nativa utilizada para este grupo.|
| **neo4j.dbms.pool.http.free** <br>(count) | Cantidad estimada de memoria libre en bytes para este grupo.|
| **neo4j.dbms.pool.http.total_size** <br>(count) | Cantidad estimada de memoria disponible en bytes para este grupo.|
| **neo4j.dbms.pool.http.total_used** <br>(count) | Cantidad estimada de memoria total utilizada en bytes para este grupo.|
| **neo4j.dbms.pool.http.used_heap** <br>(count) | Cantidad estimada de montón utilizado en bytes para este grupo.|
| **neo4j.dbms.pool.http.used_native** <br>(count) | Cantidad estimada de memoria nativa utilizada para este grupo.|
| **neo4j.dbms.pool.other.free** <br>(count) | Cantidad estimada de memoria libre en bytes para este grupo.|
| **neo4j.dbms.pool.other.total_size** <br>(count) | Cantidad estimada de memoria disponible en bytes para este grupo.|
| **neo4j.dbms.pool.other.total_used** <br>(count) | Cantidad estimada de memoria total utilizada en bytes para este grupo (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.pool.other.used_heap** <br>(count) | Cantidad estimada de montón utilizado en bytes para este grupo. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.pool.other.used_native** <br>(count) | Cantidad estimada de memoria nativa utilizada para este grupo. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.pool.page_cache.free** <br>(count) | Cantidad estimada de memoria libre en bytes para este grupo. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.pool.page_cache.total_size** <br>(count) | Cantidad estimada de memoria disponible en bytes para este grupo. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.pool.page_cache.total_used** <br>(count) | Cantidad estimada de memoria total utilizada en bytes para este grupo (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.pool.page_cache.used_heap** <br>(count) | Cantidad estimada de montón utilizado en bytes para este grupo. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.pool.page_cache.used_native** <br>(count) | Cantidad estimada de memoria nativa utilizada para este grupo. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.pool.pool.database.free** <br>(gauge) | Memoria no utilizada disponible en el grupo, en bytes. (Neo4j 4)|
| **neo4j.dbms.pool.pool.database.total_size** <br>(gauge) | Suma total de tamaño de la capacidad del montón y/o del grupo de memoria nativa. (Neo4j 4)|
| **neo4j.dbms.pool.pool.database.total_used** <br>(gauge) | Suma total de memoria de montón y nativa utilizada en bytes. (Neo4j 4)|
| **neo4j.dbms.pool.pool.database.used_heap** <br>(gauge) | Memoria de montón utilizada o reservada en bytes. (Neo4j 4)|
| **neo4j.dbms.pool.pool.database.used_native** <br>(gauge) | Memoria nativa utilizada o reservada en bytes. (Neo4j 4)|
| **neo4j.dbms.pool.pool.free** <br>(gauge) | Memoria no utilizada disponible en el grupo, en bytes. (Neo4j 4)|
| **neo4j.dbms.pool.pool.total_size** <br>(gauge) | Suma total del tamaño de la capacidad del montón y/o del grupo de memoria nativa. (Neo4j 4)|
| **neo4j.dbms.pool.pool.total_used** <br>(gauge) | Suma total de la memoria de montón y nativa utilizada en bytes. (Neo4j 4)|
| **neo4j.dbms.pool.pool.used_heap** <br>(gauge) | Memoria de montón utilizada o reservada en bytes. (Neo4j 4)|
| **neo4j.dbms.pool.pool.used_native** <br>(gauge) | Memoria nativa utilizada o reservada en bytes. (Neo4j 4)|
| **neo4j.dbms.pool.recent_query_buffer.free** <br>(count) | Cantidad estimada de memoria libre en bytes para este grupo. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.pool.recent_query_buffer.total_size** <br>(count) | Cantidad estimada de memoria disponible en bytes para este grupo. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.pool.recent_query_buffer.total_used** <br>(count) | Cantidad estimada de memoria total utilizada en bytes para este grupo (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.pool.recent_query_buffer.used_heap** <br>(count) | Cantidad estimada de montón utilizado en bytes para este grupo. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.pool.recent_query_buffer.used_native** <br>(count) | Cantidad estimada de memoria nativa utilizada para este grupo. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.pool.transaction.free** <br>(count) | Cantidad estimada de memoria libre en bytes para este grupo. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.pool.transaction.total_size** <br>(count) | Cantidad estimada de memoria disponible en bytes para este grupo. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.pool.transaction.total_used** <br>(count) | Cantidad estimada de memoria total utilizada en bytes para este grupo (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.pool.transaction.used_heap** <br>(count) | Cantidad estimada de montón utilizado en bytes para este grupo. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.pool.transaction.used_native** <br>(count) | Cantidad estimada de memoria nativa utilizada para este grupo. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.routing.query.count.local** <br>(count) | Número de consultas redirigidas localmente. (Neo4j 5)|
| **neo4j.dbms.routing.query.count.remote_internal** <br>(count) | Número de consultas redirigidas internamente. (Neo4j 5)|
| **neo4j.dbms.routing.query.count.remote_external** <br>(count) | Número de consultas redirigidas externamente. (Neo4j 5)|
| **neo4j.dbms.server.threads.jetty.all** <br>(gauge) | El número total de subprocesos (tanto inactivos como ocupados) en el grupo de jetty. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.server.threads.jetty.idle** <br>(gauge) | El número total de subprocesos inactivos en el grupo de jetty. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.vm.file.descriptors.count** <br>(gauge) | El número actual de descriptores de archivo abiertos (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.vm.file.descriptors.maximum** <br>(gauge) | (Configuración del sistema operativo) El número máximo de descriptores de archivo abiertos. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.vm.gc.count.g1_old_generation** <br>(count) |  (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.vm.gc.count.g1_young_generation** <br>(count) |  (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.vm.gc.count.gc** <br>(count) | Número total de recolecciones de basura.|
| **neo4j.dbms.vm.gc.time.g1_old_generation** <br>(count) |  (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.vm.gc.time.g1_young_generation** <br>(count) |  (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.vm.gc.time.gc** <br>(count) | Tiempo acumulado de recolección de basura en milisegundos.|
| **neo4j.dbms.vm.heap.committed** <br>(gauge) | Cantidad de memoria (en bytes) que se garantiza que está disponible para ser utilizada por la JVM. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.vm.heap.max** <br>(gauge) | Cantidad máxima de memoria de montón (en bytes) que se puede utilizar. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.vm.heap.used** <br>(gauge) | Cantidad de memoria (en bytes) utilizada actualmente. (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.vm.memory.buffer.bufferpool.capacity** <br>(gauge) | Capacidad total estimada de los búferes asignados en el grupo.|
| **neo4j.dbms.vm.memory.buffer.bufferpool.count** <br>(gauge) | Número estimado de búferes asignados en el grupo.|
| **neo4j.dbms.vm.memory.buffer.bufferpool.used** <br>(gauge) | Cantidad estimada de memoria asignada utilizada por el grupo.|
| **neo4j.dbms.vm.memory.buffer.direct.capacity** <br>(count) | Capacidad total estimada de búferes en el grupo (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.vm.memory.buffer.direct.count** <br>(count) | Número estimado de búferes en el grupo (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.vm.memory.buffer.direct.used** <br>(count) | Cantidad estimada de memoria utilizada por el grupo (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.vm.memory.buffer.mapped_non_volatile_memory.capacity** <br>(count) | Capacidad total estimada de los búferes en el grupo.|
| **neo4j.dbms.vm.memory.buffer.mapped_non_volatile_memory.count** <br>(count) | Número estimado de búferes en el grupo.|
| **neo4j.dbms.vm.memory.buffer.mapped_non_volatile_memory.used** <br>(count) | Cantidad estimada de memoria utilizada por el grupo.|
| **neo4j.dbms.vm.memory.buffer.mapped.capacity** <br>(count) | Capacidad total estimada de búferes en el grupo (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.vm.memory.buffer.mapped.count** <br>(count) | Número estimado de búferes en el grupo (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.vm.memory.buffer.mapped.used** <br>(count) | Cantidad estimada de memoria utilizada por el grupo (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.vm.memory.pool.codeheap_non_nmethods** <br>(count) | |
| **neo4j.dbms.vm.memory.pool.codeheap_non_profiled_nmethods** <br>(count) | |
| **neo4j.dbms.vm.memory.pool.codeheap_profiled_nmethods** <br>(count) | |
| **neo4j.dbms.vm.memory.pool.compressed_class_space** <br>(count) |  (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.vm.memory.pool.g1_eden_space** <br>(count) |  (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.vm.memory.pool.g1_old_gen** <br>(count) |  (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.vm.memory.pool.g1_survivor_space** <br>(count) |  (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.vm.memory.pool.metaspace** <br>(count) |  (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.vm.memory.pool.pool** <br>(gauge) | Cantidad estimada de memoria en bytes utilizada por el grupo.|
| **neo4j.dbms.vm.pause_time** <br>(count) | Tiempo de pausa detectado acumulado de máquinas virtuales (Neo4j 4 y Neo4j 5)|
| **neo4j.dbms.vm.threads** <br>(gauge) | El número total de subprocesos activos, incluidos los subprocesos daemon y no daemon. (Neo4j 5)|
| **neo4j.transaction.terminated** <br>(count) | El número total de transacciones finalizadas. (Neo4j 4)|
| **neo4j.transaction.terminated_read** <br>(count) | Número total de transacciones de lectura finalizadas.|
| **neo4j.transaction.terminated_write** <br>(count) | Número total de transacciones de escritura finalizadas.|
| **neo4j.transaction.tx_size_heap** <br>(gauge) | El tamaño de las transacciones en el montón en bytes.|
| **neo4j.transaction.tx_size_native** <br>(gauge) | El tamaño de las transacciones en memoria nativa en bytes.|
| **neo4j.vm.thread.count** <br>(gauge) | Número estimado de subprocesos activos en el grupo de subprocesos actual. (Neo4j 4)|
| **neo4j.vm.thread.total** <br>(gauge) | El número total de subprocesos en tiempo real, incluidos subprocesos daemon y no daemon. (Neo4j 4)|
| **neo4j.bolt.accumulated_processing_time** <br>(gauge) | El tiempo acumulado que los subprocesos de worker han pasado procesando mensajes. (neo4j 4)|
| **neo4j.bolt.accumulated_queue_time** <br>(gauge) | El tiempo acumulado que han pasado los mensajes esperando un subproceso de worker. (neo4j 4)|
| **neo4j.bolt.connections_closed** <br>(gauge) | El número total de conexiones de Bolt cerradas desde que se inició esta instancia. Esto incluye tanto las conexiones finalizadas correctamente como las anormalmente finalizadas (neo4j 4).|
| **neo4j.bolt.connections_idle** <br>(gauge) | Número total de conexiones de Bolt inactivas (neo4j 4)|
| **neo4j.bolt.connections_opened** <br>(gauge) | El número total de conexiones de Bolt abiertas desde que se inició esta instancia. Esto incluye tanto las conexiones exitosas como las fallidas (neo4j 4)|
| **neo4j.bolt.connections_running** <br>(gauge) | Número total de conexiones de Bolt ejecutadas actualmente (neo4j 4)|
| **neo4j.bolt.messages_done** <br>(gauge) | El número total de mensajes que se han procesado desde que se inició esta instancia. Esto incluye mensajes de Bolt exitosos y fallidos e ignorados (neo4j 4).|
| **neo4j.bolt.messages_failed** <br>(gauge) | Número total de mensajes que no se han podido procesar desde que se inició esta instancia (neo4j 4)|
| **neo4j.bolt.messages_received** <br>(gauge) | Número total de mensajes recibidos a través de Bolt desde que se inició esta instancia (neo4j 4)|
| **neo4j.bolt.messages_started** <br>(gauge) | El número total de mensajes que comenzaron a procesarse desde que se inició esta instancia. Esto es diferente de los mensajes recibidos en que este contador rastrea cuántos de los mensajes recibidos han sido tomados por un subproceso de worker (neo4j 4)|
| **neo4j.check_point.events** <br>(gauge) | El número total de eventos de punto de control ejecutados hasta el momento. (neo4j 4)|
| **neo4j.check_point.total_time** <br>(gauge) | El tiempo total empleado hasta ahora en el punto de control. (neo4j 4)|
| **neo4j.check_point.duration** <br>(gauge) | La duración del último evento de punto de control. (neo4j 4)|
| **neo4j.cypher.replan_events** <br>(gauge) | Número total de veces que Cypher ha decidido planificar nuevamente una consulta. (neo4j 4)|
| **neo4j.cypher.replan_wait_time** <br>(gauge) | El número total de segundos esperados entre nuevas planificaciones de consultas. (neo4j 4)|
| **neo4j.node_count** <br>(gauge) | El número total de nodos. (neo4j 4)|
| **neo4j.relationship_count** <br>(gauge) | El número total de relaciones. (neo4j 4)|
| **neo4j.ids_in_use.node** <br>(gauge) | El número total de nodos almacenados en la base de datos. (neo4j 4)|
| **neo4j.ids_in_use.property** <br>(gauge) | Número total de nombres de propiedades diferentes utilizados en la base de datos. (neo4j 4)|
| **neo4j.ids_in_use.relationship** <br>(gauge) | Número total de relaciones almacenadas en la base de datos. (neo4j 4)|
| **neo4j.ids_in_use.relationship_type** <br>(gauge) | Número total de tipos de relación diferentes almacenados en la base de datos. (neo4j 4)|
| **neo4j.store.size.total** <br>(gauge) | El tamaño total de la base de datos y los logs de transacciones. (neo4j 4)|
| **neo4j.store.size.database** <br>(gauge) | El tamaño en disco de la base de datos. (neo4j 4)|
| **neo4j.log.appended_bytes** <br>(gauge) | El número total de bytes añadidos al log de la transacción. (neo4j 4)|
| **neo4j.log.rotation_events** <br>(gauge) | El número total de rotaciones de transacciones de logs ejecutadas hasta el momento. (neo4j 4)|
| **neo4j.log.rotation_total_time** <br>(gauge) | El tiempo total empleado en rotar los logs de transacción hasta ahora. (neo4j 4)|
| **neo4j.log.rotation_duration** <br>(gauge) | La duración del último evento de rotación de logs. (neo4j 4)|
| **neo4j.page_cache.eviction_exceptions** <br>(gauge) | El número total de excepciones vistas durante el proceso de desalojo en la caché de page (página). (neo4j 4)|
| **neo4j.page_cache.evictions** <br>(gauge) | El número total de desalojos de page (página) ejecutados por la caché de page (página). (neo4j 4)|
| **neo4j.page_cache.flushes** <br>(gauge) | El número total de descargas ejecutadas por la caché de page (página). (neo4j 4)|
| **neo4j.page_cache.hits** <br>(gauge) | El número total de aciertos de la page (página) ocurridos en la caché de page (página). (neo4j 4)|
| **neo4j.page_cache_hits_total** <br>(gauge) | El número total de aciertos de page (página) ocurridos en la caché de page (página). (neo4j 4)|
| **neo4j.page_cache.page_faults** <br>(gauge) | El número total de fallos de page (página) ocurridos en la caché de page (página). (neo4j 4)|
| **neo4j.page_cache.pins** <br>(gauge) | El número total de pines de page (página) ejecutados por la caché de page (página). (neo4j 4)|
| **neo4j.page_cache.unpins** <br>(gauge) | El número total de desclavados de page (página) ejecutados por la caché de page (página). (neo4j 4)|
| **neo4j.server.threads.jetty.all** <br>(gauge) | El número total de subprocesos (tanto inactivos como ocupados) en el grupo jetty. (neo4j 4)|
| **neo4j.server.threads.jetty.idle** <br>(gauge) | El número total de subprocesos inactivos en el grupo jetty. (neo4j 4)|
| **neo4j.transaction.active** <br>(gauge) | Número de transacciones activas actualmente. (neo4j 4)|
| **neo4j.transaction.active_read** <br>(gauge) | Número de transacciones de lectura actualmente activas. (neo4j 4)|
| **neo4j.transaction.active_write** <br>(gauge) | El número de transacciones de escritura actualmente activas. (neo4j 4)|
| **neo4j.transaction.committed_read** <br>(gauge) | Número total de transacciones confirmadas. (neo4j 4)|
| **neo4j.transaction.committed** <br>(gauge) | Número total de transacciones de lectura confirmadas. (neo4j 4)|
| **neo4j.transaction.committed_write** <br>(gauge) | Número total de transacciones de escritura confirmadas. (neo4j 4)|
| **neo4j.transaction.last_closed_tx_id** <br>(gauge) | El identificador de la última transacción cerrada. (neo4j 4)|
| **neo4j.transaction.last_committed_tx_id** <br>(gauge) | Identificador de la última transacción confirmada. (neo4j 4)|
| **neo4j.transaction.peak_concurrent** <br>(gauge) | El pico más alto de transacciones concurrentes. (neo4j 4)|
| **neo4j.transaction.rollbacks_read** <br>(gauge) | Número total de transacciones de lectura revertidas. (neo4j 4)|
| **neo4j.transaction.rollbacks** <br>(gauge) | Número total de transacciones revertidas. (neo4j 4)|
| **neo4j.transaction.rollbacks_write** <br>(gauge) | Número total de transacciones de escritura revertidas. (neo4j 4)|
| **neo4j.transaction.started** <br>(gauge) | Número total de transacciones iniciadas. (neo4j 4)|
| **neo4j.vm.gc.count.g1_old_generation** <br>(gauge) | Número total de recolecciones de basura para la antigua generación. (neo4j 4)|
| **neo4j.vm.gc.count.g1_young_generation** <br>(gauge) | Número total de recolecciones de basura para la generación joven. (neo4j 4)|
| **neo4j.vm.gc.time.g1_old_generation** <br>(gauge) | Tiempo acumulado de recolección de basura en milisegundos para la generación antigua. (neo4j 4)|
| **neo4j.vm.gc.time.g1_young_generation** <br>(gauge) | Tiempo acumulado de recolección de basura en milisegundos para la generación joven. (neo4j 4)|
| **neo4j.vm.memory.buffer.direct_capacity** <br>(gauge) | Capacidad total estimada de los búferes directos del grupo (neo4j 4)|
| **neo4j.vm.memory.buffer.direct_count** <br>(gauge) | Número estimado de búferes directos en el grupo. (neo4j 4)|
| **neo4j.vm.memory.buffer.direct_used** <br>(gauge) | Cantidad estimada de memoria directa utilizada por el grupo. (neo4j 4)|
| **neo4j.vm.memory.buffer.mapped_capacity** <br>(gauge) | Capacidad total estimada de los búferes asignados en el grupo. (neo4j 4)|
| **neo4j.vm.memory.buffer.mapped_count** <br>(gauge) | Número estimado de búferes asignados en el grupo. (neo4j 4)|
| **neo4j.vm.memory.buffer.mapped_used** <br>(gauge) | Cantidad estimada de memoria asignada utilizada por el grupo. (neo4j 4)|
| **neo4j.vm.memory.pool.compressed_class_space** <br>(gauge) | Número estimado de búferes en el grupo de espacio de clase comprimido. (neo4j 4)|
| **neo4j.vm.memory.pool.g1_eden_space** <br>(gauge) | Número estimado de búferes en el grupo de espacio de g1 eden. (neo4j 4)|
| **neo4j.vm.memory.pool.g1_old_gen** <br>(gauge) | Número estimado de búferes en el grupo de la generación antigua g1. (neo4j 4)|
| **neo4j.vm.memory.pool.g1_survivor_space** <br>(gauge) | Número estimado de búferes en el grupo de espacio de supervivencia g1. (neo4j 4)|
| **neo4j.vm.memory.pool.metaspace** <br>(gauge) | Número estimado de búferes en el grupo de metaespacios (neo4j 4)|

### Checks de servicio

El check de servicio `neo4j.prometheus.health` se presenta en el check base

### Eventos

Neo4j no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Neo4j](mailto:support@neo4j.com).