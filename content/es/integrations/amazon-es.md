---
aliases:
- /es/integrations/amazon_es
app_id: amazon-es
categories:
- aws
- métricas
custom_kind: integración
description: Amazon OpenSearch Service facilita la implementación y el funcionamiento
  de OpenSearch.
media: []
title: Amazon OpenSearch Service
---
## Información general

Amazon OpenSearch Service es un servicio administrado que facilita el despliegue, el funcionamiento y el escalado de clústeres de OpenSearch en la nube de AWS. OpenSearch es un motor de análisis y búsqueda de código abierto para casos de uso como análisis de logs, monitorización de aplicaciones en tiempo real y análisis de secuencias de clics.

Habilita esta integración para ver en Datadog todas tus etiquetas personalizadas de OpenSearch Service. Ten en cuenta que esta integración es para OpenSearch Service de Amazon AWS y NO para una instancia independiente de Elasticsearch alojada fuera de Amazon AWS. (Para dichas instancias, utiliza la [integración de Elasticsearch](https://docs.datadoghq.com/integrations/elastic) en su lugar).

Nota: Esta integración requiere que los permisos 'es:ListTags', 'es:ListDomainNames' y 'es:DescribeElasticsearchDomains' estén totalmente habilitados.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `ES` está activado en la pestaña `Metric Collection`.
1. Instala la integración de [Datadog y Amazon OpenSearch Service](https://app.datadoghq.com/integrations/amazon-es).

### Recopilación de logs

#### Activar logging

Configura Amazon OpenSearch Service para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_elasticsearch` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Datadog Forwarder Lambda](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de Amazon Elasticsearch en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el grupo de logs de CloudWatch](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#manually-set-up-triggers)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.es.2xx** <br>(count) | El número de solicitudes a un dominio con el código de respuesta HTTP 2xx.<br>_Se muestra como solicitud_ |
| **aws.es.2xx.average** <br>(gauge) | El número medio de solicitudes a un dominio con el código de respuesta HTTP 2xx.<br>_Se muestra como solicitud_ |
| **aws.es.3xx** <br>(count) | El número de solicitudes a un dominio con el código de respuesta HTTP 3xx.<br>_Se muestra como solicitud_ |
| **aws.es.3xx.average** <br>(gauge) | El número medio de solicitudes a un dominio con el código de respuesta HTTP 3xx.<br>_Se muestra como solicitud_ |
| **aws.es.4xx** <br>(count) | El número de solicitudes a un dominio con el código de respuesta HTTP 4xx.<br>_Se muestra como solicitud_ |
| **aws.es.4xx.average** <br>(gauge) | Número medio de solicitudes a un dominio con el código de respuesta HTTP 4xx.<br>_Se muestra como solicitud_ |
| **aws.es.5xx** <br>(count) | El número de solicitudes a un dominio con el código de respuesta HTTP 5xx.<br>_Se muestra como solicitud_ |
| **aws.es.5xx.average** <br>(gauge) | Número medio de solicitudes a un dominio con el código de respuesta HTTP 5xx.<br>_Se muestra como solicitud_ |
| **aws.es.alerting_degraded** <br>(gauge) | Indica si el servicio de alerta ES está degradado. Un valor de 0 significa "No". Un valor de 1 significa "Sí".|
| **aws.es.alerting_index_exists** <br>(gauge) | Un valor de 1 significa que el índice .opendistro-alerting-config existe. Será 0 hasta que utilices la función de alerta por primera vez.|
| **aws.es.alerting_index_statusgreen** <br>(gauge) | La salud del índice. Un valor de 1 significa que está verde. Un valor de 0 significa que el índice no existe o no está en verde.|
| **aws.es.alerting_index_statusred** <br>(gauge) | El estado del índice. Un valor de 1 significa rojo. Un valor de 0 significa que el índice no existe o no está en rojo.|
| **aws.es.alerting_index_statusyellow** <br>(gauge) | El estado del índice. Un valor de 1 significa amarillo. Un valor de 0 significa que el índice no existe o no es amarillo.|
| **aws.es.alerting_nodes_on_schedule** <br>(gauge) | Un valor de 1 significa que todos los trabajos de alerta se están ejecutando en horario (o que no existe ningún trabajo de alerta).|
| **aws.es.alerting_nodes_not_on_schedule** <br>(gauge) | Un valor de 1 significa que algunos trabajos no se están ejecutando en horario.|
| **aws.es.alerting_scheduled_job_enabled** <br>(gauge) | Un valor de 1 significa que la configuración del clúster opendistro.scheduled_jobs.enabled es verdadera. Un valor de 0 significa que es falso y que los trabajos programados están desactivados.|
| **aws.es.anomaly_detection_failure_count** <br>(count) | El número de solicitudes fallidas para detectar anomalías.<br>_Se muestra como error_ |
| **aws.es.anomaly_detection_plugin_unhealthy** <br>(gauge) | Un valor de 1 significa que el complemento de detección de anomalías no funciona correctamente.|
| **aws.es.anomaly_detection_request_count** <br>(count) | El número de solicitudes para detectar anomalías.<br>_Se muestra como solicitud_ |
| **aws.es.anomaly_detectors_index_status_index_exists** <br>(gauge) | Un valor de 1 significa que el índice .opendistro-anomaly-detectors existe. Hasta que no utilices la función de detección de anomalías por primera vez, este valor seguirá siendo 0.|
| **aws.es.anomaly_detectors_index_statusred** <br>(gauge) | Un valor de 1 significa que el índice .opendistro-anomaly-detectors es rojo. Hasta que no utilices la función de detección de anomalías por primera vez, este valor permanecerá en 0.|
| **aws.es.anomaly_results_index_status_index_exists** <br>(gauge) | Un valor de 1 significa que el índice al que apunta el alias .opendistro-anomaly-results existe. Hasta que utilices la función de detección de anomalías por primera vez, este valor seguirá siendo 0.|
| **aws.es.automated_snapshot_failure** <br>(gauge) | El número de instantáneas automatizadas fallidas para el clúster.<br>_Se muestra como error_ |
| **aws.es.automated_snapshot_failure.minimum** <br>(gauge) | El número mínimo de instantáneas automatizadas fallidas para el clúster.<br>_Se muestra como error_ |
| **aws.es.cluster_index_writes_blocked** <br>(gauge) | Indica si el clúster está aceptando o bloqueando las solicitudes de escritura entrantes. Un valor de 0 significa que el clúster está aceptando solicitudes. Un valor de 1 significa que está bloqueando las solicitudes.|
| **aws.es.cluster_statusgreen** <br>(gauge) | Indica si todos los fragmentos de índice están asignados a nodos del clúster.|
| **aws.es.cluster_statusgreen.maximum** <br>(gauge) | Indica el número máximo de particiones de índice asignados a los nodos del clúster.|
| **aws.es.cluster_statusgreen.minimum** <br>(gauge) | Indica el número mínimo de particiones de índice asignados a los nodos del clúster.|
| **aws.es.cluster_statusred** <br>(gauge) | Indica si tanto las particiones primarias como las particiones réplica de al menos un índice no están asignadas a nodos de un clúster.|
| **aws.es.cluster_statusred.maximum** <br>(gauge) | Indica como máximo si tanto las particiones primarias como las particiones réplica de al menos un índice no están asignadas a nodos de un clúster.|
| **aws.es.cluster_statusred.minimum** <br>(gauge) | Indica como mínimo si tanto las particiones primarias como las particiones réplica de al menos un índice no están asignadas a nodos de un clúster.|
| **aws.es.cluster_statusyellow** <br>(gauge) | Indica si las particiones de réplica no se asignan a los nodos de un clúster.|
| **aws.es.cluster_statusyellow.maximum** <br>(gauge) | Indica el máximo de si las particiones de réplica no se asignan a los nodos de un clúster.|
| **aws.es.cluster_statusyellow.minimum** <br>(gauge) | Indica el mínimo de si no se asignan particiones de réplica a los nodos de un clúster.|
| **aws.es.cluster_used_space** <br>(gauge) | El espacio total utilizado, en MiB, para el clúster.<br>_Se muestra como mebibyte_ |
| **aws.es.cluster_used_space.average** <br>(gauge) | El espacio medio utilizado, en MiB, para el clúster.<br>_Se muestra como mebibyte_ |
| **aws.es.cluster_used_space.minimum** <br>(gauge) | El espacio mínimo utilizado, en MiB, para el clúster.<br>_Se muestra como mebibyte_ |
| **aws.es.cpucredit_balance** <br>(gauge) | Los créditos de CPU restantes disponibles para los nodos de datos del clúster.|
| **aws.es.cpuutilization** <br>(gauge) | Porcentaje medio de recursos de CPU utilizados en todos los nodos del clúster.<br>_Se muestra como porcentaje_ |
| **aws.es.cpuutilization.maximum** <br>(gauge) | El porcentaje máximo de recursos de CPU utilizados por cualquier nodo del clúster.<br>_Se muestra como porcentaje_ |
| **aws.es.cpuutilization.minimum** <br>(gauge) | Porcentaje mínimo de recursos de CPU utilizados por cualquier nodo del clúster.<br>_Se muestra como porcentaje_ |
| **aws.es.cross_cluster_inbound_requests** <br>(count) | Métrica del dominio de destino. Número de solicitudes de conexión entrantes recibidas del dominio fuente.<br>_Se muestra como solicitud_ |
| **aws.es.cross_cluster_outbound_connections** <br>(gauge) | Métrica de dominio fuente. Número de nodos conectados. Si este número desciende a 0, entonces la conexión no está en buen estado.|
| **aws.es.cross_cluster_outbound_requests** <br>(count) | Métrica de dominio fuente. Número de solicitudes de búsqueda enviadas al dominio de destino.<br>_Se muestra como solicitud_ |
| **aws.es.deleted_documents** <br>(gauge) | Número total de documentos marcados para su eliminación en todos los índices del clúster.<br>_Se muestra como documento_ |
| **aws.es.deleted_documents.maximum** <br>(gauge) | El número máximo de documentos marcados para su eliminación en todos los índices del clúster.<br>_Se muestra como documento_ |
| **aws.es.deleted_documents.minimum** <br>(gauge) | El número mínimo de documentos marcados para su eliminación en todos los índices del clúster.<br>_Se muestra como documento_ |
| **aws.es.disk_queue_depth** <br>(gauge) | Número medio de solicitudes de entrada y salida (E/S) pendientes para un volumen EBS, en todos los nodos del clúster<br>_Se muestra como solicitud_ |
| **aws.es.disk_queue_depth.maximum** <br>(gauge) | Número máximo para cualquier nodo del clúster de solicitudes de entrada y salida (E/S) pendientes para un volumen EBS.<br>_Se muestra como solicitud_ |
| **aws.es.disk_queue_depth.minimum** <br>(gauge) | Número mínimo para cualquier nodo del clúster de solicitudes de entrada y salida (E/S) pendientes para un volumen EBS.<br>_Se muestra como solicitud_ |
| **aws.es.elasticsearch_requests** <br>(count) | El número de solicitudes realizadas al clúster de Elasticsearch.<br>_Se muestra como solicitud_ |
| **aws.es.elasticsearch_requests.average** <br>(gauge) | Número medio de solicitudes realizadas al clúster de Elasticsearch.<br>_Se muestra como solicitud_ |
| **aws.es.free_storage_space** <br>(gauge) | La media de espacio libre, en megabytes, en todos los nodos de datos de un clúster.<br>_Se muestra como mebibyte_ |
| **aws.es.free_storage_space.maximum** <br>(gauge) | El espacio libre, en megabytes, para el nodo de datos individual con el mayor espacio libre disponible en un clúster.<br>_Se muestra como mebibyte_ |
| **aws.es.free_storage_space.minimum** <br>(gauge) | El espacio libre, en megabytes, para el nodo de datos individual con menos espacio libre disponible en un clúster.<br>_Se muestra como mebibyte_ |
| **aws.es.free_storage_space.sum** <br>(gauge) | El espacio libre, en megabytes, para todos los nodos de datos del clúster.<br>_Se muestra como mebibyte_ |
| **aws.es.hot_storage_space_utilization** <br>(gauge) | La cantidad total de espacio de almacenamiento de acceso muy frecuente que el clúster está utilizando.<br>_Se muestra como mebibyte_ |
| **aws.es.hot_to_warm_migration_queue_size** <br>(gauge) | Número de índices que están migrando actualmente del almacenamiento de acceso muy frecuente al almacenamiento de acceso frecuente.|
| **aws.es.indexing_latency** <br>(gauge) | El tiempo medio, en milisegundos, que tarda una partición en completar una operación de indexación.<br>_Se muestra como milisegundo_ |
| **aws.es.indexing_rate** <br>(count) | El número de operaciones de indexación por minuto.<br>_Se muestra como operación_ |
| **aws.es.invalid_host_header_requests** <br>(count) | Número de solicitudes HTTP realizadas al clúster de Elasticsearch que incluyen un encabezado de host no válido (o faltante).<br>_Se muestra como solicitud_ |
| **aws.es.invalid_host_header_requests.average** <br>(gauge) | Número medio de solicitudes HTTP realizadas al clúster de Elasticsearch que incluyen un encabezado de host no válido (o faltante).<br>_Se muestra como solicitud_ |
| **aws.es.jvmgcold_collection_count** <br>(gauge) | El número de veces que se ha ejecutado la recopilación de elementos no usados de "vieja generación". En un clúster con recursos suficientes, este número debería permanecer pequeño y crecer con poca frecuencia.<br>_Se muestra como recopilación de elementos no usados_ |
| **aws.es.jvmgcold_collection_time** <br>(gauge) | La cantidad de tiempo, en milisegundos, que el clúster ha pasado realizando la recopilación de elementos no usados de 'vieja generación'.<br>_Se muestra como milisegundo_ |
| **aws.es.jvmgcyoung_collection_count** <br>(gauge) | El número de veces que se ha ejecutado la recopilación de elementos no usados de "generación joven". Un número grande y creciente de ejecuciones es una parte normal de las operaciones de clúster.<br>_Se muestra como recopilación de elementos no usados_ |
| **aws.es.jvmgcyoung_collection_time** <br>(gauge) | La cantidad de tiempo, en milisegundos, que el clúster ha pasado realizando la recopilación de elementos no usados de 'generación joven'.<br>_Se muestra como milisegundo_ |
| **aws.es.jvmmemory_pressure** <br>(gauge) | El porcentaje medio de heap de Java utilizado para todos los nodos de datos en el clúster.<br>_Se muestra como porcentaje_ |
| **aws.es.jvmmemory_pressure.maximum** <br>(gauge) | El porcentaje máximo de heap de Java utilizado por cualquier nodo de datos en el clúster.<br>_Se muestra como porcentaje_ |
| **aws.es.jvmmemory_pressure.minimum** <br>(gauge) | El porcentaje mínimo de heap de Java utilizado por cualquier nodo de datos en el clúster.<br>_Se muestra como porcentaje_ |
| **aws.es.kibana_healthy_nodes** <br>(gauge) | Un check de estado de Kibana. Un valor de 1 indica un comportamiento normal. Un valor de 0 indica que Kibana es inaccesible.|
| **aws.es.kmskey_error** <br>(gauge) | Un valor de 1 indica que se ha desactivado la clave maestra de cliente KMS utilizada para cifrar los datos en reposo. Solo disponible para dominios que cifran datos en reposo.|
| **aws.es.kmskey_inaccessible** <br>(gauge) | Un valor de 1 indica que la clave maestra de cliente KMS utilizada para cifrar datos en reposo se ha eliminado o ha revocado sus concesiones a Amazon ES. Solo disponible para dominios que cifran datos en reposo.|
| **aws.es.master_cpucredit_balance** <br>(gauge) | Los créditos de CPU restantes disponibles para nodos maestros dedicados en el clúster.|
| **aws.es.master_cpuutilization** <br>(gauge) | El porcentaje máximo de recursos de CPU utilizados por los nodos maestros dedicados.<br>_Se muestra como porcentaje_ |
| **aws.es.master_free_storage_space** <br>(gauge) | Esta métrica no es relevante y puede ignorarse. El servicio no utiliza nodos maestros como nodos de datos.<br>_Se muestra como mebibyte_ |
| **aws.es.master_jvmmemory_pressure** <br>(gauge) | El porcentaje máximo de heap de Java utilizado para todos los nodos maestros dedicados en el clúster.<br>_Se muestra como porcentaje_ |
| **aws.es.master_reachable_from_node** <br>(gauge) | Un check de estado para excepciones MasterNotDiscovered. Un valor de 1 indica un comportamiento normal. Un valor de 0 indica que /\_cluster/health/ está fallando.|
| **aws.es.master_reachable_from_node.maximum** <br>(gauge) | Un check de estado para excepciones MasterNotDiscovered. Un valor de 1 indica un comportamiento normal. Un valor de 0 indica que /\_cluster/health/ está fallando.|
| **aws.es.master_sys_memory_utilization** <br>(gauge) | El porcentaje de la memoria de la instancia que está en uso.<br>_Se muestra como porcentaje_ |
| **aws.es.models_checkpoint_index_status_index_exists** <br>(gauge) | Un valor de 1 significa que el índice .opendistro-anomaly-checkpoints existe. Hasta que no utilices la función de detección de anomalías por primera vez, este valor seguirá siendo 0.|
| **aws.es.models_checkpoint_index_statusred** <br>(gauge) | Un valor de 1 significa que el índice .opendistro-anomaly-checkpoints está en rojo. Hasta que no utilices la función de detección de anomalías por primera vez, este valor permanecerá en 0.|
| **aws.es.nodes** <br>(gauge) | El número de nodos del clúster de Amazon ES.<br>_Se muestra como nodo_ |
| **aws.es.nodes.maximum** <br>(gauge) | El número máximo de nodos en el clúster de Amazon ES.<br>_Se muestra como nodo_ |
| **aws.es.nodos.mínimos** <br>(calibre) | El número mínimo de nodos en el clúster de Amazon ES.<br>_Se muestra como nodo_ |
| **aws.es.open_search_dashboards_healthy_nodes** <br>(gauge) | Un check del estado de los dashboards de OpenSearch. Un valor de 1 indica un comportamiento normal. Un valor de 0 indica que los nodos de dashboards son inaccesibles.|
| **aws.es.open_search_requests** <br>(count) | Número de solicitudes realizadas al clúster de OpenSearch.<br>_Se muestra como solicitud_ |
| **aws.es.open_search_requests.average** <br>(gauge) | Número medio de solicitudes realizadas al clúster de OpenSearch.<br>_Se muestra como solicitud_ |
| **aws.es.read_iops** <br>(gauge) | Número de operaciones de entrada y salida (E/S) por segundo para operaciones de lectura en volúmenes EBS.<br>_Se muestra como operación_ |
| **aws.es.read_iops.maximum** <br>(gauge) | Número máximo para cualquier nodo de operaciones de entrada y salida (E/S) por segundo para operaciones de lectura en volúmenes EBS.<br>_Se muestra como operación_ |
| **aws.es.read_iops.minimum** <br>(gauge) | Número mínimo para cualquier nodo de operaciones de entrada y salida (E/S) por segundo para operaciones de lectura en volúmenes EBS.<br>_Se muestra como operación_ |
| **aws.es.read_latency** <br>(gauge) | La latencia, en segundos, para operaciones de lectura en volúmenes EBS.<br>_Se muestra como segundo_ |
| **aws.es.read_latency.maximum** <br>(gauge) | La latencia máxima para cualquier nodo, en segundos, para operaciones de lectura en volúmenes EBS.<br>_Se muestra como segundo_ |
| **aws.es.read_latency.minimum** <br>(gauge) | La latencia mínima para cualquier nodo, en segundos, para operaciones de lectura en volúmenes EBS.<br>_Se muestra como segundo_ |
| **aws.es.read_throughput** <br>(gauge) | El rendimiento, en bytes por segundo, para operaciones de lectura en volúmenes EBS.<br>_Se muestra como byte_ |
| **aws.es.read_throughput.maximum** <br>(gauge) | El rendimiento máximo para cualquier nodo, en bytes por segundo, para operaciones de lectura en volúmenes EBS.<br>_Se muestra como byte_ |
| **aws.es.read_throughput.minimum** <br>(gauge) | El rendimiento mínimo para cualquier nodo, en bytes por segundo, para operaciones de lectura en volúmenes EBS.<br>_Se muestra como byte_ |
| **aws.es.search_latency** <br>(gauge) | El tiempo medio, en milisegundos, que tarda un fragmento en completar una operación de búsqueda.<br>_Se muestra como milisegundo_ |
| **aws.es.search_rate** <br>(count) | Número total de solicitudes de búsqueda por minuto para todas las particiones de un nodo.<br>_Se muestra como solicitud_ |
| **aws.es.searchable_documents** <br>(gauge) | Número total de documentos buscables en todos los índices del clúster.<br>_Se muestra como documento_ |
| **aws.es.searchable_documents.maximum** <br>(gauge) | El número máximo de documentos en los que se puede buscar en todos los índices del clúster.<br>_Se muestra como documento_ |
| **aws.es.searchable_documents.minimum** <br>(gauge) | El número mínimo de documentos buscables en todos los índices del clúster.<br>_Se muestra como documento_ |
| **aws.es.sqldefault_cursor_request_count** <br>(count) | El número de solicitudes de paginación a la API \_opendistro/\_sql.<br>_Se muestra como solicitud_ |
| **aws.es.sqlfailed_request_count_by_cus_err** <br>(count) | El número de solicitudes a la API \_opendistro/\_sql que fallaron debido a un problema del cliente.<br>_Se muestra como solicitud_ |
| **aws.es.sqlfailed_request_count_by_sys_err** <br>(count) | El número de solicitudes a la API \_opendistro/\_sql que fallaron debido a un problema del servidor o limitación de funciones.<br>_Se muestra como solicitud_ |
| **aws.es.sqlrequest_count** <br>(count) | El número de solicitudes a la API \_opendistro/\_sql.<br>_Se muestra como solicitud_ |
| **aws.es.sqlunhealthy** <br>(gauge) | Un valor de 1 indica que, en respuesta a ciertas solicitudes, el complemento SQL está devolviendo códigos de respuesta 5xx o pasando DSL de consulta no válido a Elasticsearch.|
| **aws.es.sys_memory_utilization** <br>(gauge) | El porcentaje de la memoria de la instancia que está en uso.<br>_Se muestra como porcentaje_ |
| **aws.es.sys_memory_utilization.maximum** <br>(gauge) | El porcentaje máximo de la memoria de la instancia que está en uso.<br>_Se muestra como porcentaje_ |
| **aws.es.sys_memory_utilization.minimum** <br>(gauge) | El porcentaje mínimo de la memoria de la instancia que está en uso.<br>_Se muestra como porcentaje_ |
| **aws.es.threadpool_bulk_queue** <br>(count) | El número de tareas en cola en el grupo de subprocesos masivos.<br>_Se muestra como tarea_ |
| **aws.es.threadpool_bulk_rejected** <br>(count) | El número de tareas rechazadas en el grupo de subprocesos masivos.<br>_Se muestra como tarea_ |
| **aws.es.threadpool_bulk_threads** <br>(gauge) | El tamaño del grupo de subprocesos masivos.|
| **aws.es.threadpool_forcemerge_queue** <br>(count) | El número de tareas en cola en el grupo de subprocesos de fusión forzada.<br>_Se muestra como tarea_ |
| **aws.es.threadpool_forcemerge_rejected** <br>(count) | El número de tareas rechazadas en el grupo de subprocesos de fusión forzada.<br>_Se muestra como tarea_ |
| **aws.es.threadpool_forcemerge_threads** <br>(gauge) | El tamaño del grupo de subprocesos de fusión forzada.|
| **aws.es.threadpool_index_queue** <br>(count) | El número de tareas en cola en el grupo de subprocesos de índice.<br>_Se muestra como tarea_ |
| **aws.es.threadpool_index_rejected** <br>(count) | El número de tareas rechazadas en el grupo de subprocesos de índice.<br>_Se muestra como tarea_ |
| **aws.es.threadpool_index_threads** <br>(gauge) | El tamaño del grupo de subprocesos de índice.|
| **aws.es.threadpool_merge_queue** <br>(count) | El número de tareas en cola en el grupo de subprocesos de fusión.<br>_Se muestra como tarea_ |
| **aws.es.threadpool_merge_rejected** <br>(count) | El número de tareas rechazadas en el grupo de subprocesos de fusión.<br>_Se muestra como tarea_ |
| **aws.es.threadpool_merge_threads** <br>(gauge) | El tamaño del grupo de subprocesos de fusión.|
| **aws.es.threadpool_search_queue** <br>(count) | El número de tareas en cola en el grupo de subprocesos de búsqueda.<br>_Se muestra como tarea_ |
| **aws.es.threadpool_search_rejected** <br>(count) | El número de tareas rechazadas en el grupo de subprocesos de búsqueda.<br>_Se muestra como tarea_ |
| **aws.es.threadpool_search_threads** <br>(gauge) | El tamaño del grupo de subprocesos de búsqueda.|
| **aws.es.threadpool_write_queue** <br>(count) | El número de tareas en cola en el grupo de subprocesos de escritura.<br>_Se muestra como tarea_ |
| **aws.es.threadpool_write_rejected** <br>(count) | Número de tareas rechazadas en el grupo de subprocesos de escritura.<br>_Se muestra como tarea_ |
| **aws.es.threadpool_write_threads** <br>(gauge) | El tamaño del grupo de subprocesos de escritura.|
| **aws.es.warm_cpuutilization** <br>(gauge) | El porcentaje de uso de la CPU para los nodos UltraWarm en el clúster.<br>_Se muestra como porcentaje_ |
| **aws.es.warm_free_storage_space** <br>(gauge) | La cantidad de espacio libre de almacenamiento de acceso frecuente en MiB.<br>_Se muestra como mebibyte_ |
| **aws.es.warm_jvmmemory_pressure** <br>(gauge) | El porcentaje máximo de heap de Java utilizado para los nodos UltraWarm.<br>_Se muestra como porcentaje_ |
| **aws.es.warm_search_latency** <br>(gauge) | El tiempo medio, en milisegundos, que tarda una partición en un nodo UltraWarm en completar una operación de búsqueda.<br>_Se muestra como milisegundo_ |
| **aws.es.warm_search_rate** <br>(count) | El número total de solicitudes de búsqueda por minuto para todas las particiones en un nodo UltraWarm.<br>_Se muestra como solicitud_ |
| **aws.es.warm_searchable_documents** <br>(gauge) | El número total de documentos buscables en todos los índices de acceso frecuente del clúster.<br>_Se muestra como documento_ |
| **aws.es.warm_storage_space_utilization** <br>(gauge) | La cantidad total de espacio de almacenamiento de acceso frecuente que está utilizando el clúster.<br>_Se muestra como mebibyte_ |
| **aws.es.warm_sys_memory_utilization** <br>(gauge) | El porcentaje de la memoria del nodo de acceso frecuente que está en uso.<br>_Se muestra como porcentaje_ |
| **aws.es.warm_to_hot_migration_queue_size** <br>(gauge) | Número de índices que están migrando actualmente del almacenamiento de acceso frecuente al almacenamiento de acceso muy frecuente.|
| **aws.es.write_iops** <br>(gauge) | Número de operaciones de entrada y salida (E/S) por segundo para operaciones de escritura en volúmenes de EBS.<br>_Se muestra como operación_ |
| **aws.es.write_iops.maximum** <br>(gauge) | Número máximo para cualquier nodo de operaciones de entrada y salida (E/S) por segundo para operaciones de escritura en volúmenes de EBS.<br>_Se muestra como operación_ |
| **aws.es.write_iops.minimum** <br>(gauge) | Número mínimo para cualquier nodo de operaciones de entrada y salida (E/S) por segundo para operaciones de escritura en volúmenes de EBS.<br>_Se muestra como operación_ |
| **aws.es.write_latency** <br>(gauge) | La latencia, en segundos, de las operaciones de escritura en volúmenes de EBS.<br>_Se muestra en segundos_ |
| **aws.es.write_latency.maximum** <br>(gauge) | La latencia máxima para cualquier nodo, en segundos, para operaciones de escritura en volúmenes de EBS.<br>_Se muestra como segundo_ |
| **aws.es.write_latency.minimum** <br>(gauge) | La latencia mínima para cualquier nodo, en segundos, para operaciones de escritura en volúmenes de EBS.<br>_Se muestra como segundo_ |
| **aws.es.write_throughput** <br>(gauge) | El rendimiento, en bytes por segundo, para operaciones de escritura en volúmenes de EBS.<br>_Se muestra como byte_ |
| **aws.es.write_throughput.maximum** <br>(gauge) | El rendimiento máximo para cualquier nodo, en bytes por segundo, para operaciones de escritura en volúmenes de EBS.<br>_Se muestra como byte_ |
| **aws.es.write_throughput.minimum** <br>(gauge) | El rendimiento mínimo para cualquier nodo, en bytes por segundo, para operaciones de escritura en volúmenes de EBS.<br>_Se muestra como byte_ |

### Eventos

La integración de Amazon OpenSearch Service no incluye ningún evento.

### Checks de servicio

La integración de Amazon OpenSearch Service no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).