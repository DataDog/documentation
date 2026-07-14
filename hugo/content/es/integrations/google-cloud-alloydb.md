---
aliases:
- /es/integrations/google_cloud_alloydb
app_id: google-cloud-alloydb
categories:
- nube
- google cloud
- almacenes de datos
- recopilación de logs
custom_kind: integración
description: AlloyDB es una base de datos compatible con PostgreSQL totalmente gestionada
  para cargas de trabajo transaccionales exigentes.
media: []
title: Google Cloud AlloyDB
---
## Información general

AlloyDB es una base de datos totalmente gestionada y compatible con PostgreSQL para cargas de trabajo transaccionales exigentes.
Ofrece un rendimiento y una disponibilidad de nivel empresarial al tiempo que mantiene una compatibilidad del 100 % con PostgreSQL, de código abierto (source (fuente) ).

Obtén métricas de Google AlloyDB para:

- Visualizar el rendimiento de tus clústeres de AlloyDB.
- Correlacionar el rendimiento de tus instancias de AlloyDB con tus bases de datos.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No es necesario realizar ningún otro paso de instalación.

### Recopilación de logs

Los logs de Google AlloyDB se recopilan con Google Cloud Logging y se envían a un job (generic) de Dataflow a través de un tema de Cloud Pub/Sub. Si aún no lo has hecho, [configura el registro con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de Google AlloyDB desde Google Cloud Logging al tema Pub/Sub:

1. Ve a la [page (página) Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra los logs de Google AlloyDB.
1. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.alloydb.cluster.storage.usage** <br>(gauge) | El almacenamiento total de AlloyDB en bytes en todo el clúster.<br>_Mostrado como byte_ |
| **gcp.alloydb.database.postgresql.backends_for_top_databases** <br>(gauge) | El número actual de connections (conexiones) por base de datos a la instancia para las 500 bases de datos principales.|
| **gcp.alloydb.database.postgresql.blks_hit_for_top_databases** <br>(count) | Número de veces que Postgres encontró el bloque solicitado en la caché del búfer por base de datos para las 500 bases de datos principales.|
| **gcp.alloydb.database.postgresql.blks_read_for_top_databases** <br>(count) | Número de bloques leídos por Postgres que no estaban en la caché del búfer por base de datos para las 500 bases de datos principales.|
| **gcp.alloydb.database.postgresql.committed_transactions_for_top_databases** <br>(count) | Número total de transacciones confirmadas por base de datos para las 500 principales bases de datos.|
| **gcp.alloydb.database.postgresql.deadlock_count_for_top_databases** <br>(count) | Número total de bloqueos detectados en la instancia por base de datos para las 500 bases de datos principales.|
| **gcp.alloydb.database.postgresql.deleted_tuples_count_for_top_databases** <br>(count) | El número total de filas eliminadas por base de datos para las 500 bases de datos principales como resultado de las consultas en la instancia.<br>_Mostrado como byte_ |
| **gcp.alloydb.database.postgresql.fetched_tuples_count_for_top_databases** <br>(count) | El número total de filas obtenidas por base de datos para las 500 bases de datos principales como resultado de las consultas en la instancia.|
| **gcp.alloydb.database.postgresql.inserted_tuples_count_for_top_databases** <br>(count) | El número total de filas insertadas por base de datos para las 500 bases de datos principales como resultado de las consultas en la instancia.|
| **gcp.alloydb.database.postgresql.insights.aggregate.execution_time** <br>(count) | Tiempo acumulado de ejecución de la consulta desde el último ejemplo. Es la suma del tiempo de CPU, el tiempo de espera de E/S, el tiempo de espera de bloqueo, el cambio de contexto de proceso y la programación de todos los procesos implicados en la ejecución de la consulta.<br>_Mostrado como microsegundo_. |
| **gcp.alloydb.database.postgresql.insights.aggregate.io_time** <br>(count) | Tiempo de E/S acumulado desde el último ejemplo.<br>_Mostrado como microsegundo_ |
| **gcp.alloydb.database.postgresql.insights.aggregate.latencies** <br>(count) | Distribución de la latencia de consulta.<br>_Mostrado como microsegundo_ |
| **gcp.alloydb.database.postgresql.insights.aggregate.lock_time** <br>(count) | Tiempo de espera de bloqueo acumulado desde el último ejemplo.<br>_Mostrado como microsegundo_ |
| **gcp.alloydb.database.postgresql.insights.aggregate.row_count** <br>(count) | Número de filas recuperadas o afectadas desde el último ejemplo.|
| **gcp.alloydb.database.postgresql.insights.aggregate.shared_blk_access_count** <br>(count) | Bloques compartidos (tablas regulares e indexadas) a los que se accede mediante la ejecución de sentencias.|
| **gcp.alloydb.database.postgresql.insights.perquery.execution_time** <br>(count) | Tiempos de ejecución acumulados por usuario, por base de datos y por consulta. Es la suma del tiempo de CPU, el tiempo de espera de E/S, el tiempo de espera de bloqueo, el cambio de contexto de proceso y la programación de todos los procesos implicados en la ejecución de la consulta.<br>_Mostrado como microsegundo_. |
| **gcp.alloydb.database.postgresql.insights.perquery.io_time** <br>(count) | Tiempo de E/S acumulado desde el último ejemplo.<br>_Mostrado como microsegundo_ |
| **gcp.alloydb.database.postgresql.insights.perquery.latencies** <br>(count) | Distribución de la latencia de consulta.<br>_Mostrado como microsegundo_ |
| **gcp.alloydb.database.postgresql.insights.perquery.lock_time** <br>(count) | Tiempo de espera de bloqueo acumulado desde el último ejemplo.<br>_Mostrado en microsegundos_ |
| **gcp.alloydb.database.postgresql.insights.perquery.row_count** <br>(count) | El número de filas recuperadas o afectadas desde el último ejemplo.|
| **gcp.alloydb.database.postgresql.insights.perquery.shared_blk_access_count** <br>(count) | Bloques compartidos (tablas regulares e indexadas) a los que se accede mediante la ejecución de sentencias.|
| **gcp.alloydb.database.postgresql.insights.pertag.execution_time** <br>(count) | Tiempos de ejecución acumulados desde el último ejemplo. Es la suma del tiempo de CPU, el tiempo de espera de E/S, el tiempo de espera de bloqueo, el cambio de contexto de proceso y la programación de todos los procesos implicados en la ejecución de la consulta.<br>_Mostrado como microsegundo_. |
| **gcp.alloydb.database.postgresql.insights.pertag.io_time** <br>(count) | Tiempo de E/S acumulado desde el último ejemplo.<br>_Mostrado como microsegundo_ |
| **gcp.alloydb.database.postgresql.insights.pertag.latencies** <br>(count) | Distribución de la latencia de consulta.<br>_Mostrado como microsegundo_ |
| **gcp.alloydb.database.postgresql.insights.pertag.lock_time** <br>(count) | Tiempo de espera de bloqueo acumulado desde el último ejemplo.<br>_Mostrado como microsegundo_ |
| **gcp.alloydb.database.postgresql.insights.pertag.row_count** <br>(count) | El número de filas recuperadas o afectadas desde el último ejemplo.|
| **gcp.alloydb.database.postgresql.insights.pertag.shared_blk_access_count** <br>(count) | Bloques compartidos (tablas regulares e indexadas) a los que se accede mediante la ejecución de sentencias.|
| **gcp.alloydb.database.postgresql.new_connections_for_top_databases** <br>(count) | Número total de nuevas connections (conexiones) añadidas por base de datos para las 500 principales bases de datos a la instancia.|
| **gcp.alloydb.database.postgresql.returned_tuples_count_for_top_databases** <br>(count) | El número total de filas escaneadas por base de datos para las 500 bases de datos principales mientras se procesan las consultas en la instancia.|
| **gcp.alloydb.database.postgresql.rolledback_transactions_for_top_databases** <br>(count) | Número total de transacciones revertidas por base de datos para las 500 bases de datos principales.|
| **gcp.alloydb.database.postgresql.statements_executed_count** <br>(count) | Count total de sentencias ejecutadas en la instancia por base de datos por tipo_operación. Solo disponible para instancias con la información de la consulta habilitada.|
| **gcp.alloydb.database.postgresql.temp_bytes_written_for_top_databases** <br>(count) | El count total de datos (en bytes) escritos en archivos temporales por las consultas por base de datos para las 500 bases de datos principales.<br>_Mostrado como byte_ |
| **gcp.alloydb.database.postgresql.temp_files_written_for_top_databases** <br>(count) | El número de archivos temporales utilizados para escribir datos por base de datos mientras se realizan algoritmos internos como la unión o la ordenación para las 500 bases de datos principales.|
| **gcp.alloydb.database.postgresql.tuples** <br>(gauge) | Número de tuplas (filas) por estado por base de datos en la instancia. Esta métrica solo se mostrará cuando el número de bases de datos sea inferior a 50.|
| **gcp.alloydb.database.postgresql.updated_tuples_count_for_top_databases** <br>(count) | El número total de filas actualizadas por base de datos para las 500 bases de datos principales como resultado de las consultas de la instancia.|
| **gcp.alloydb.database.postgresql.vacuum.oldest_transaction_age** <br>(gauge) | Antigüedad actual de la transacción no confirmada más antigua. Se mide en el número de transacciones iniciadas desde la transacción más antigua.|
| **gcp.alloydb.database.postgresql.vacuum.transaction_id_utilization** <br>(gauge) | El porcentaje actual de espacio de ID de transacción consumido por la instancia de AlloyDB. Registra el número de transacciones no evacuadas como porcentaje del máximo de 2000 millones.|
| **gcp.alloydb.database.postgresql.written_tuples_count_for_top_databases** <br>(count) | El número total de filas escritas (insertadas, actualizadas, eliminadas) por base de datos para las 500 bases de datos principales como resultado de las consultas en la instancia.|
| **gcp.alloydb.instance.cpu.average_utilization** <br>(gauge) | Utilización media de la CPU en todos los nodos de servicio de la instancia de 0 a 100.|
| **gcp.alloydb.instance.cpu.maximum_utilization** <br>(gauge) | Utilización máxima de la CPU en todos los nodos que prestan servicio actualmente a la instancia, de 0 a 100.|
| **gcp.alloydb.instance.cpu.vcpus** <br>(gauge) | El número de CPU virtuales asignadas a cada nodo de la instancia.|
| **gcp.alloydb.instance.memory.min_available_memory** <br>(gauge) | La memoria mínima disponible en todos los nodos que prestan servicio actualmente a la instancia. La memoria disponible es una estimación de la memoria en bytes disponible para su asignación en la máquina virtual, incluida la memoria que se utiliza actualmente, pero que puede liberarse.<br>_Mostrado como byte_. |
| **gcp.alloydb.instance.postgres.abort_count** <br>(count) | El número de transacciones que se han revertido en todos los nodos en servicio de la instancia.|
| **gcp.alloydb.instance.postgres.average_connections** <br>(gauge) | El número medio de connections (conexiones) activas e inactivas a AlloyDB en los nodos en servicio de la instancia.|
| **gcp.alloydb.instance.postgres.commit_count** <br>(count) | El número de transacciones confirmadas en todos los nodos en servicio de la instancia.|
| **gcp.alloydb.instance.postgres.connections_limit** <br>(gauge) | El límite actual del número de connections (conexiones) por nodo de la instancia de AlloyDB.|
| **gcp.alloydb.instance.postgres.instances** <br>(gauge) | El número de nodos de la instancia, junto con su estado, que puede ser alto o bajo.|
| **gcp.alloydb.instance.postgres.replication.maximum_lag** <br>(gauge) | El retardo máximo de replicación calculado a través de todas las réplicas de lectura en servicio de la instancia. El retardo de replicación se obtiene del valor de retardo_reproducción.<br>_Mostrado como milisegundos_. |
| **gcp.alloydb.instance.postgres.replication.maximum_secondary_lag** <br>(gauge) | El retardo máximo de replicación calculado desde el clúster principal al secundario. El retardo de replicación obtiene del valor de retardo_reproducción.<br>_Mostrado como milisegundo_. |
| **gcp.alloydb.instance.postgres.replication.network_lag** <br>(gauge) | Tiempo transcurrido entre el vaciado local de la WAL reciente y la recepción de la notificación de que este servidor en espera la ha escrito y vaciado (pero aún no la ha aplicado).<br>_Mostrado como milisegundo_. |
| **gcp.alloydb.instance.postgres.replication.replicas** <br>(gauge) | El número de réplicas de lectura conectadas a la instancia principal.|
| **gcp.alloydb.instance.postgres.total_connections** <br>(gauge) | El número de connections (conexiones) activas e inactivas a la instancia de AlloyDB a través de los nodos en servicio de la instancia.|
| **gcp.alloydb.instance.postgres.transaction_count** <br>(count) | El número de transacciones confirmadas y revertidas en todos los nodos en servicio de la instancia.|
| **gcp.alloydb.instance.postgresql.backends_by_state** <br>(gauge) | El número actual de connections (conexiones) a la instancia agrupadas por el estado: inactivo, active, inactivo_en_transacción, inactivo_en_transacción_abortada, desactivado y ruta_rápida_función_llamada.|
| **gcp.alloydb.instance.postgresql.backends_for_top_applications** <br>(gauge) | El número actual de connections (conexiones) a la instancia de AlloyDB, agrupadas por aplicaciones para las 500 aplicaciones principales.|
| **gcp.alloydb.instance.postgresql.blks_hit** <br>(count) | Número de veces que Postgres ha encontrado el bloque solicitado en la caché del búfer.|
| **gcp.alloydb.instance.postgresql.blks_read** <br>(count) | Número de bloques leídos por Postgres que no estaban en la caché del búfer.|
| **gcp.alloydb.instance.postgresql.deadlock_count** <br>(count) | Número de bloqueos detectados en la instancia.|
| **gcp.alloydb.instance.postgresql.deleted_tuples_count** <br>(count) | Número de filas eliminadas al procesar las consultas en la instancia desde el último ejemplo.|
| **gcp.alloydb.instance.postgresql.fetched_tuples_count** <br>(count) | Número de filas obtenidas al procesar las consultas en la instancia desde el último ejemplo.|
| **gcp.alloydb.instance.postgresql.inserted_tuples_count** <br>(count) | Número de filas insertadas al procesar las consultas en la instancia desde el último ejemplo.|
| **gcp.alloydb.instance.postgresql.new_connections_count** <br>(count) | El número de nuevas connections (conexiones) añadidas a la instancia.|
| **gcp.alloydb.instance.postgresql.returned_tuples_count** <br>(count) | Número de filas escaneadas al procesar las consultas en la instancia desde el último ejemplo.|
| **gcp.alloydb.instance.postgresql.temp_bytes_written_count** <br>(count) | La cantidad total de datos (en bytes) escritos en archivos temporales por las consultas mientras se realizan algoritmos internos como unión u ordenación.<br>_Mostrado como byte_ |
| **gcp.alloydb.instance.postgresql.temp_files_written_count** <br>(count) | El número de archivos temporales utilizados para escribir datos en la instancia mientras se realizan algoritmos internos como unión u ordenación.|
| **gcp.alloydb.instance.postgresql.updated_tuples_count** <br>(count) | Número de filas actualizadas al procesar las consultas en la instancia desde el último ejemplo.|
| **gcp.alloydb.instance.postgresql.version** <br>(gauge) | La versión de la base de datos de Postgres (por ejemplo, `POSTGRES_14`, `POSTGRES_15`).|
| **gcp.alloydb.instance.postgresql.wait_count** <br>(count) | Número total de veces que los procesos esperaron por cada evento de espera en la instancia.|
| **gcp.alloydb.instance.postgresql.wait_time** <br>(count) | Tiempo total de espera transcurrido para cada evento de espera en la instancia.<br>_Mostrado como microsegundo_ |
| **gcp.alloydb.instance.postgresql.written_tuples_count** <br>(count) | Número de filas escritas al procesar las consultas en la instancia desde el último ejemplo.|
| **gcp.alloydb.node.cpu.usage_time** <br>(gauge) | Tasa de utilización de la CPU en el nodo.|
| **gcp.alloydb.node.postgres.replay_lag** <br>(gauge) | El retardo en milisegundos para el nodo individual, viene de retardo_reproducción en `pg_stat_replication`.<br>_Mostrado como milisegundo_ |
| **gcp.alloydb.node.postgres.uptime** <br>(gauge) | Tasa de disponibilidad de la base de datos en el nodo.|
| **gcp.alloydb.quota.storage_usage_per_cluster** <br>(gauge) | Uso de almacenamiento por clúster.|
| **gcp.alloydb.quota.storage_usage_per_cluster.exceeded** <br>(count) | Número de intentos de superar el límite de la métrica de cuota `alloydb.googleapis.com/storage_usage_per_cluster`.|
| **gcp.alloydb.quota.storage_usage_per_cluster.limit** <br>(gauge) | Límite actual de la métrica de cuota `alloydb.googleapis.com/storage_usage_per_cluster`.|
| **gcp.alloydb.quota.storage_usage_per_cluster.usage** <br>(gauge) | Uso actual de la métrica de cuota `alloydb.googleapis.com/storage_usage_per_cluster`.|

### Eventos

La integración de Google AlloyDB no incluye ningún evento.

### Checks de servicio

La integración de Google AlloyDB no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).