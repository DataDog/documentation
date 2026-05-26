---
aliases:
- /es/integrations/google_cloud_redis
app_id: google-cloud-redis
categories:
- nube
- almacenes de datos
- google cloud
- recopilación de logs
custom_kind: integración
description: Un servicio de almacén de datos en memoria gestionado en infraestructura
  escalable, seguro y de alta disponibilidad.
media: []
title: Google Cloud Redis
---
## Información general

Google Cloud Memorystore para Redis proporciona un servicio de almacén de datos en memoria totalmente gestionado construido sobre una infraestructura escalable, segura y de alta disponibilidad.

Utiliza la integración Google Cloud Platform en Datadog para recopilar métricas de Google Cloud Memorystore para Redis.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No hay más pasos de instalación.

### Recopilación de logs

Los logs de Google Cloud Memorystore para Redis se recopilan con Google Cloud Logging y se envían a un job (generic) de Dataflow a través de un tema de Cloud Pub/Sub. Si aún no lo has hecho, [configura el registro con la plantilla Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de Google Cloud Memorystore para Redis de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [page (página) Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra logs de Google Cloud Memorystore para Redis.
1. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.redis.clients.blocked** <br>(gauge) | Número de clientes bloqueados.|
| **gcp.redis.clients.connected** <br>(gauge) | Número de connections (conexiones) de clientes.<br>_Mostrado como connection (conexión)_ |
| **gcp.redis.cluster.clients.average_connected_clients** <br>(gauge) | Número medio actual de connections (conexiones) de clientes en todo el clúster.|
| **gcp.redis.cluster.clients.maximum_connected_clients** <br>(gauge) | Número máximo actual de connections (conexiones) de clientes en el clúster.|
| **gcp.redis.cluster.clients.total_connected_clients** <br>(gauge) | Número actual de connections (conexiones) de clientes al clúster.|
| **gcp.redis.cluster.commandstats.total_calls_count** <br>(count) | Count de comandos de Redis.|
| **gcp.redis.cluster.commandstats.total_usec_count** <br>(count) | El tiempo total consumido por comando.<br>_Mostrado como microsegundo_ |
| **gcp.redis.cluster.cpu.average_utilization** <br>(gauge) | Utilización media de la CPU en todo el clúster de 0,0 a 1,0.|
| **gcp.redis.cluster.cpu.maximum_utilization** <br>(gauge) | Utilización máxima de la CPU en todo el clúster de 0,0 a 1,0.|
| **gcp.redis.cluster.cross_cluster_replication.secondary_average_replication_offset_diff** <br>(gauge) | Diferencia media de desplazamiento de replicación entre las particiones principales y las particiones secundarias.<br>_Mostrado como byte_ |
| **gcp.redis.cluster.cross_cluster_replication.secondary_maximum_replication_offset_diff** <br>(gauge) | Diferencia máxima de desplazamiento de replicación entre las particiones principales y las particiones secundarias.<br>_Mostrado como byte_ |
| **gcp.redis.cluster.cross_cluster_replication.secondary_replication_links** <br>(gauge) | Número de enlaces de replicación entre un clúster principal y un clúster secundario.|
| **gcp.redis.cluster.keyspace.total_keys** <br>(gauge) | Número de claves almacenadas en la instancia de clúster.|
| **gcp.redis.cluster.memory.average_utilization** <br>(gauge) | Utilización media de memoria en todo el clúster de 0,0 a 1,0.|
| **gcp.redis.cluster.memory.maximum_utilization** <br>(gauge) | Utilización máxima de memoria en todo el clúster de 0,0 a 1,0.|
| **gcp.redis.cluster.memory.size** <br>(gauge) | Tamaño de la memoria del clúster.<br>_Mostrado como byte_ |
| **gcp.redis.cluster.memory.total_used_memory** <br>(gauge) | Uso total de memoria del clúster.<br>_Mostrado como byte_ |
| **gcp.redis.cluster.node.clients.blocked_clients** <br>(gauge) | Número de connections (conexiones) de cliente bloqueadas por el nodo del clúster.|
| **gcp.redis.cluster.node.clients.connected_clients** <br>(gauge) | Número de clientes conectados al nodo del clúster.|
| **gcp.redis.cluster.node.commandstats.calls_count** <br>(count) | Número total de llamadas para este comando en el nodo del clúster en un minuto.|
| **gcp.redis.cluster.node.commandstats.usec_count** <br>(count) | El tiempo total consumido por comando en el nodo del clúster.<br>_Mostrado como microsegundo_ |
| **gcp.redis.cluster.node.cpu.utilization** <br>(gauge) | Utilización de la CPU para el nodo del clúster de 0,0 a 1,0.|
| **gcp.redis.cluster.node.cross_cluster_replication.follower_replication_offset_diff** <br>(gauge) | Diferencia de desplazamiento de replicación en bytes entre un nodo replicador y su nodo seguidor, notificada por el nodo replicador.<br>_Mostrado como byte_ |
| **gcp.redis.cluster.node.cross_cluster_replication.role** <br>(gauge) | Rol de replicación entre clústeres del nodo.|
| **gcp.redis.cluster.node.keyspace.total_keys** <br>(gauge) | Número de claves almacenadas en el nodo del clúster.|
| **gcp.redis.cluster.node.memory.usage** <br>(gauge) | Uso total de memoria del nodo de clúster.<br>_Mostrado como byte_ |
| **gcp.redis.cluster.node.memory.utilization** <br>(gauge) | Utilización de la memoria en el nodo del clúster de 0,0 a 1,0.|
| **gcp.redis.cluster.node.persistence.aof_fsync_errors_count** <br>(count) | Count de errores AOF fsync en el nodo del clúster.|
| **gcp.redis.cluster.node.persistence.aof_fsync_lag** <br>(gauge) | Desfase de AOF entre la memoria y el almacén persistente en el nodo del clúster.<br>_Mostrado como segundo_ |
| **gcp.redis.cluster.node.persistence.aof_last_bgrewrite_status** <br>(gauge) | Indica el éxito de la última operación AOF bgrewrite en el nodo del clúster.|
| **gcp.redis.cluster.node.persistence.aof_last_write_status** <br>(gauge) | Indica el éxito de la última operación de escritura AOF en el nodo del clúster.|
| **gcp.redis.cluster.node.persistence.aof_rewrites_count** <br>(count) | Count de reescrituras AOF en el nodo del clúster.|
| **gcp.redis.cluster.node.persistence.auto_restore_count** <br>(count) | Count de restauraciones desde el archivo de volcado en el nodo del clúster.|
| **gcp.redis.cluster.node.persistence.current_save_keys_total** <br>(gauge) | Número de claves al principio de la operación de guardado actual.|
| **gcp.redis.cluster.node.persistence.rdb_bgsave_in_progress** <br>(gauge) | Indica si hay un RDB BGSAVE en curso en el nodo del clúster.|
| **gcp.redis.cluster.node.persistence.rdb_last_bgsave_status** <br>(gauge) | Indica el éxito del último BGSAVE en el nodo del clúster.|
| **gcp.redis.cluster.node.persistence.rdb_last_save_age** <br>(gauge) | Mide el tiempo en segundos, desde la última instantánea realizada con éxito.<br>_Mostrado como segundo_ |
| **gcp.redis.cluster.node.persistence.rdb_next_save_time_until** <br>(gauge) | Mide el tiempo en segundos que queda hasta la siguiente instantánea.<br>_Mostrado como segundo_ |
| **gcp.redis.cluster.node.persistence.rdb_saves_count** <br>(count) | Count de RDB guardadas en el nodo del clúster.|
| **gcp.redis.cluster.node.replication.offset** <br>(gauge) | Mide los bytes de desplazamiento de replicación del nodo del clúster.<br>_Mostrado como byte_ |
| **gcp.redis.cluster.node.server.uptime** <br>(gauge) | Mide el tiempo de actividad del nodo del clúster.<br>_Mostrado como segundo_ |
| **gcp.redis.cluster.node.stats.connections_received_count** <br>(count) | Count del total de connections (conexiones) de clientes creadas en el último minuto en el nodo del clúster.|
| **gcp.redis.cluster.node.stats.evicted_keys_count** <br>(count) | Count de claves desalojadas por el nodo del clúster.|
| **gcp.redis.cluster.node.stats.expired_keys_count** <br>(count) | Count de eventos de expiración de claves en el nodo del clúster.|
| **gcp.redis.cluster.node.stats.keyspace_hits_count** <br>(count) | Count de búsquedas con éxito de claves en el nodo del clúster.|
| **gcp.redis.cluster.node.stats.keyspace_misses_count** <br>(count) | Count de búsquedas fallidas de claves en el nodo del clúster.|
| **gcp.redis.cluster.node.stats.net_input_bytes_count** <br>(count) | Count de bytes de red entrantes recibidos por el nodo de clúster.<br>_Mostrado como byte_ |
| **gcp.redis.cluster.node.stats.net_output_bytes_count** <br>(count) | Count de bytes de red salientes enviados desde el nodo del clúster.<br>_Mostrado como byte_ |
| **gcp.redis.cluster.node.stats.rejected_connections_count** <br>(count) | Número de connections (conexiones) rechazadas debido al límite máximo de clientes del nodo del clúster.|
| **gcp.redis.cluster.persistence.aof_fsync_lags.avg** <br>(gauge) | La distribución media del desfase AOF entre la memoria y el almacén persistente en todo el clúster.<br>_Mostrado como segundo_ |
| **gcp.redis.cluster.persistence.aof_fsync_lags.samplecount** <br>(gauge) | El count de ejemplos para la distribución del desfase AOF entre la memoria y el almacén persistente en todo el clúster.<br>_Mostrado como segundo_ |
| **gcp.redis.cluster.persistence.aof_fsync_lags.sumsqdev** <br>(gauge) | La suma de la desviación al cuadrado para la distribución del desfase AOF entre la memoria y el almacén persistente en todo el clúster.<br>_Mostrado como segundo_ |
| **gcp.redis.cluster.persistence.aof_rewrite_count** <br>(count) | Count de reescrituras AOF en todo el clúster.|
| **gcp.redis.cluster.persistence.rdb_last_success_ages.avg** <br>(gauge) | La antigüedad media de las instantáneas RDB en todo el cluster.<br>_Mostrado como segundo_ |
| **gcp.redis.cluster.persistence.rdb_last_success_ages.samplecount** <br>(gauge) | El count de ejemplo para la antigüedad de las instantáneas RDB en todo el clúster.<br>_Mostrado como segundo_ |
| **gcp.redis.cluster.persistence.rdb_last_success_ages.sumsqdev** <br>(gauge) | La suma de la desviación al cuadrado para la antigüedad de las instantáneas RDB en todo el cluster.<br>_Mostrado como segundo_ |
| **gcp.redis.cluster.persistence.rdb_saves_count** <br>(count) | Count de RDB guardadas en todo el clúster.|
| **gcp.redis.cluster.replication.average_ack_lag** <br>(gauge) | Demora media de acuse de recibo de replicación (en segundos) de la réplica en todo el clúster.<br>_Mostrado como segundo_ |
| **gcp.redis.cluster.replication.average_offset_diff** <br>(gauge) | Diferencia media de desplazamiento de replicación (en bytes) en todo el clúster.<br>_Mostrado como byte_ |
| **gcp.redis.cluster.replication.maximum_ack_lag** <br>(gauge) | Demora máxima de acuse de recibo de replicación (en segundos) de la réplica en todo el clúster.<br>_Mostrado como segundo_ |
| **gcp.redis.cluster.replication.maximum_offset_diff** <br>(gauge) | Diferencia máxima de desplazamiento de replicación (en bytes) en todo el clúster.<br>_Mostrado como byte_ |
| **gcp.redis.cluster.stats.average_evicted_keys** <br>(gauge) | Número medio de claves desalojadas debido a la capacidad de memoria.|
| **gcp.redis.cluster.stats.average_expired_keys** <br>(gauge) | Número medio de eventos de expiración de claves.|
| **gcp.redis.cluster.stats.average_keyspace_hits** <br>(gauge) | Número medio de búsquedas de claves realizadas con éxito en todo el clúster.|
| **gcp.redis.cluster.stats.average_keyspace_misses** <br>(gauge) | Número medio de búsquedas fallidas de claves en todo el clúster.|
| **gcp.redis.cluster.stats.maximum_evicted_keys** <br>(gauge) | Número máximo de claves desalojadas por capacidad de memoria.|
| **gcp.redis.cluster.stats.maximum_expired_keys** <br>(gauge) | Número máximo de eventos de expiración de claves.|
| **gcp.redis.cluster.stats.maximum_keyspace_hits** <br>(gauge) | Número máximo de búsquedas correctas de claves en todo el clúster.|
| **gcp.redis.cluster.stats.maximum_keyspace_misses** <br>(gauge) | Número máximo de búsquedas fallidas de claves en todo el clúster.|
| **gcp.redis.cluster.stats.total_connections_received_count** <br>(count) | Count de connections (conexiones) de clientes creadas en el último minuto.|
| **gcp.redis.cluster.stats.total_evicted_keys_count** <br>(count) | Número total de claves desalojadas debido a la capacidad de memoria.|
| **gcp.redis.cluster.stats.total_expired_keys_count** <br>(count) | Número total de eventos de expiración de claves.|
| **gcp.redis.cluster.stats.total_keyspace_hits_count** <br>(count) | Número total de búsquedas de claves realizadas con éxito en todo el clúster.|
| **gcp.redis.cluster.stats.total_keyspace_misses_count** <br>(count) | Número total de búsquedas fallidas de claves en todo el clúster.|
| **gcp.redis.cluster.stats.total_net_input_bytes_count** <br>(count) | Count de bytes de red entrantes recibidos por el clúster.<br>_Mostrado como byte_ |
| **gcp.redis.cluster.stats.total_net_output_bytes_count** <br>(count) | Count de bytes de red salientes enviados desde el clúster.<br>_Mostrado como byte_ |
| **gcp.redis.cluster.stats.total_rejected_connections_count** <br>(count) | Count de connections (conexiones) de clientes rechazadas debido al límite máximo de clientes.|
| **gcp.redis.commands.calls** <br>(count) | Número total de llamadas para este comando.|
| **gcp.redis.commands.total_time** <br>(gauge) | La cantidad de tiempo en microsegundos que tardó este comando en el último segundo.<br>_Mostrado como microsegundo_ |
| **gcp.redis.commands.usec_per_call** <br>(gauge) | Tiempo medio por llamada a lo largo de 1 minuto por comando.<br>_Mostrado como segundo_ |
| **gcp.redis.keyspace.avg_ttl** <br>(gauge) | TTL medio de las claves de esta base de datos.<br>_Mostrado como milisegundo_ |
| **gcp.redis.keyspace.keys** <br>(gauge) | Número de claves almacenadas en esta base de datos.<br>_Mostrado como clave_ |
| **gcp.redis.keyspace.keys_with_expiration** <br>(gauge) | Número de claves con caducidad en esta base de datos.<br>_Mostrado como clave_ |
| **gcp.redis.persistence.rdb.bgsave_in_progress** <br>(gauge) | Marca que indica que se está guardando un RDB.|
| **gcp.redis.rdb.enabled** <br>(gauge) | Indica si la instantánea está en modo RDB.|
| **gcp.redis.rdb.recovery.attempts_since_last_success** <br>(gauge) | Indica el número de intentos de recuperación desde el último intento de recuperación con éxito.|
| **gcp.redis.rdb.recovery.elapsed_time** <br>(gauge) | Indica el tiempo creciente transcurrido para una recuperación en curso a partir de una instantánea RDB. 0 significa que la recuperación está inactiva o completada.<br>_Mostrado como segundo_. |
| **gcp.redis.rdb.recovery.estimated_recovery_time** <br>(gauge) | Indica el tiempo de recuperación previsto cuando se utiliza la última instantánea correcta para la recuperación.<br>_Mostrado como segundo_ |
| **gcp.redis.rdb.recovery.estimated_remaining_time** <br>(gauge) | Indica el tiempo restante para finalizar la recuperación de una instantánea RDB. 0 significa que la recuperación está inactiva o completada.<br>_Mostrado como segundo_. |
| **gcp.redis.rdb.recovery.in_progress** <br>(gauge) | Indica si la recuperación de una instantánea RDB está en curso. Cuando el valor de la métrica es true, entonces hay una recuperación en curso.|
| **gcp.redis.rdb.recovery.last_duration** <br>(gauge) | Indica el tiempo que se tardó en restaurar la última instantánea.<br>_Mostrado como segundo_ |
| **gcp.redis.rdb.recovery.last_status** <br>(gauge) | Indica el estado de la recuperación más reciente.|
| **gcp.redis.rdb.recovery.loaded_bytes_count** <br>(count) | Durante una recuperación, indica cuántos bytes se han cargado. 0 si la recuperación no está activa.<br>_Mostrado como byte_. |
| **gcp.redis.rdb.recovery.total_bytes_count** <br>(count) | Indica el tamaño en bytes de la instantánea.<br>_Mostrado como byte_ |
| **gcp.redis.rdb.snapshot.attempt_count** <br>(count) | Indica el número de intentos de instantáneas cada minuto.|
| **gcp.redis.rdb.snapshot.elapsed_time** <br>(gauge) | Indica el aumento del tiempo transcurrido durante la creación de la instantánea actual.<br>_Mostrado como segundo_ |
| **gcp.redis.rdb.snapshot.in_progress** <br>(gauge) | Indica si la instantánea RDB está en curso. Cuando el valor de la métrica es true, entonces hay una instantánea RDB en curso.|
| **gcp.redis.rdb.snapshot.last_status** <br>(gauge) | Indica el estado del intento de instantánea más reciente.|
| **gcp.redis.rdb.snapshot.last_success_age** <br>(gauge) | Indica el tiempo transcurrido desde el inicio de la última instantánea correcta.<br>_Mostrado como segundo_ |
| **gcp.redis.rdb.snapshot.last_success_duration** <br>(gauge) | Indica el tiempo total necesario para escribir la última instantánea con éxito, sin incluir los intentos fallidos.<br>_Mostrado como segundo_ |
| **gcp.redis.rdb.snapshot.time_until_next_run** <br>(gauge) | Segundos hasta la siguiente instantánea programada.<br>_Mostrado como segundo_ |
| **gcp.redis.replication.master.slaves.lag** <br>(gauge) | El número de segundos que la réplica se atrasa con respecto a la principal.<br>_Mostrado como segundo_ |
| **gcp.redis.replication.master.slaves.offset** <br>(gauge) | El número de bytes reconocidos por las réplicas.<br>_Mostrado como byte_ |
| **gcp.redis.replication.master_repl_offset** <br>(gauge) | El número de bytes que el maestro ha producido y enviado a las réplicas. Debe compararse con el desplazamiento de bytes de replicación de la réplica.<br>_Mostrado como byte_. |
| **gcp.redis.replication.offset_diff** <br>(gauge) | El número de bytes que no se han replicados a la réplica. Es la diferencia entre el desplazamiento de bytes de replicación (maestro) y el desplazamiento de bytes de replicación (réplica).<br>_Mostrado como byte_. |
| **gcp.redis.replication.role** <br>(gauge) | Devuelve un valor que indica el rol del nodo. 1 indica maestro y 0 indica réplica.|
| **gcp.redis.search.attributes** <br>(gauge) | Indica el número de atributos en la búsqueda vectorial.|
| **gcp.redis.search.background_indexing_in_progress** <br>(gauge) | Indica si la indexación en segundo plano está en curso. Cuando el valor de la métrica es true, la indexación en segundo plano está en curso.|
| **gcp.redis.search.indexed_hash_keys** <br>(gauge) | Indica el número de claves hash indexadas en la búsqueda vectorial.|
| **gcp.redis.search.indexes** <br>(gauge) | Indica el número de índices en la búsqueda vectorial.|
| **gcp.redis.search.query_requests_count** <br>(count) | Indica el count de solicitudes de consulta contadas.|
| **gcp.redis.search.used_memory_bytes** <br>(gauge) | Indica la memoria utilizada en bytes en la búsqueda vectorial.<br>_Mostrado como byte_ |
| **gcp.redis.server.uptime** <br>(gauge) | Tiempo de actividad en segundos.<br>_Mostrado como segundo_ |
| **gcp.redis.stats.cache_hit_ratio** <br>(gauge) | Porcentaje de aciertos de caché como fracción.|
| **gcp.redis.stats.connections.total** <br>(gauge) | Número total de connections (conexiones) aceptadas por el servidor.<br>_Mostrado como connection (conexión)_ |
| **gcp.redis.stats.cpu_utilization** <br>(gauge) | CPU, en segundos de utilización, consumida por el servidor Redis desglosado por relación sistema/usuario y principal/secundario.<br>_Mostrado como segundo_ |
| **gcp.redis.stats.cpu_utilization_main_thread** <br>(count) | Segundos de CPU consumidos por el subproceso principal del servidor Redis, desglosados por espacio de sistema/usuario y relación principal/secundario.<br>_Mostrado como segundo_ |
| **gcp.redis.stats.evicted_keys** <br>(count) | Número de claves desalojadas debido al límite máximo de memoria.<br>_Mostrado como clave_ |
| **gcp.redis.stats.expired_keys** <br>(count) | Número total de eventos de expiración de claves.<br>_Mostrado como clave_ |
| **gcp.redis.stats.keyspace_hits** <br>(count) | Número de búsquedas correctas de claves en el diccionario principal.<br>_Mostrado como clave_ |
| **gcp.redis.stats.keyspace_misses** <br>(count) | Número de búsquedas fallidas de claves en el diccionario principal.<br>_Mostrado como clave_ |
| **gcp.redis.stats.memory.maxmemory** <br>(gauge) | Cantidad máxima de memoria que Redis puede consumir.<br>_Mostrado como byte_ |
| **gcp.redis.stats.memory.system_memory_overload_duration** <br>(count) | La cantidad de tiempo en microsegundos que la instancia está en modo de sobrecarga de memoria del sistema.<br>_Mostrado como microsegundo_ |
| **gcp.redis.stats.memory.system_memory_usage_ratio** <br>(gauge) | Uso de la memoria como proporción de la memoria máxima del sistema.<br>_Mostrado como fracción_ |
| **gcp.redis.stats.memory.usage** <br>(gauge) | Número total de bytes asignados por Redis.<br>_Mostrado como byte_ |
| **gcp.redis.stats.memory.usage_ratio** <br>(gauge) | Utilización de memoria como proporción de la memoria máxima.<br>_Mostrado como fracción_ |
| **gcp.redis.stats.network_traffic** <br>(count) | Número total de bytes enviados hacia o desde redis (incluidos bytes de los propios comandos, datos de carga útil y delimitadores).<br>_Mostrado como byte_ |
| **gcp.redis.stats.pubsub.channels** <br>(gauge) | Número global de canales Pub/Sub con suscripciones de clientes.|
| **gcp.redis.stats.pubsub.patterns** <br>(gauge) | Número global de patrones Pub/Sub con suscripciones de clientes.|
| **gcp.redis.stats.reject_connections_count** <br>(count) | Número de connections (conexiones) rechazadas debido al límite máximo de clientes.|

### Eventos

La integración Google Cloud Memorystore para Redis no incluye eventos.

### Checks de servicio

La integración Google Cloud Memorystore para Redis no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).