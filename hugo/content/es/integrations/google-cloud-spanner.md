---
aliases:
- /es/integrations/google_cloud_spanner
app_id: google-cloud-spanner
categories:
- nube
- almacenes de datos
- google cloud
- recopilación de logs
custom_kind: integración
description: El primer y único servicio de base de datos relacional con gran coherencia
  y escalabilidad horizontal.
media: []
title: Google Cloud Spanner
---
## Información general

Google Cloud Spanner es el primer y único servicio de bases de datos relacionales que es altamente coherente y escalable horizontalmente.

Obtén métricas de Google Spanner para:

- Visualizar el rendimiento de tus bases de datos Spanner.
- Correlacionar el rendimiento de tus bases de datos Spanner con tus aplicaciones.

## Configuración

### Recopilación de métricas

#### Instalación

Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No hay más pasos de instalación.

### Recopilación de logs

Los logs de Google Cloud Spanner se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura el registro con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de Google Cloud Spanner de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra logs de Google Cloud Spanner.

1. Haz clic en **Create sink** (Crear sumidero) y asigna al sumidero el nombre correspondiente.

1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.

   {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exportar logs de Google Cloud Pub/Sub a Pub Sub" >}}

1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.spanner.api.api_request_count** <br>(count) | Solicitudes de la API de Cloud Spanner.<br>_Se muestra como segundo_ |
| **gcp.spanner.api.read_request_latencies_by_change_stream.avg** <br>(count) | Distribución media de las latencias de las solicitudes de lectura en función de si se trata de una consulta de flujo de cambios. Esto incluye la latencia del procesamiento de solicitudes en los backends de Cloud Spanner y la capa de API. No incluye la sobrecarga de la red o del proxy inverso entre clientes y servidores.<br>_Se muestra como segundo_ |
| **gcp.spanner.api.read_request_latencies_by_change_stream.samplecount** <br>(count) | El recuento de muestras para la distribución de las latencias de las solicitudes de lectura en función de si se trata de una consulta de flujo de cambios. Esto incluye la latencia del procesamiento de solicitudes en los backends de Cloud Spanner y la capa de API. No incluye la sobrecarga de red o proxy inverso entre clientes y servidores.<br>_Se muestra como segundo_ |
| **gcp.spanner.api.read_request_latencies_by_change_stream.sumsqdev** <br>(count) | La suma de la desviación al cuadrado de la distribución de las latencias de las solicitudes de lectura en función de si se trata de una consulta de flujo de cambios. Incluye la latencia del procesamiento de solicitudes en los backends de Cloud Spanner y la capa de API. No incluye la sobrecarga de red o proxy inverso entre clientes y servidores.<br>_Se muestra como segundo_ |
| **gcp.spanner.api.read_request_latencies_by_serving_location.avg** <br>(count) | La distribución media de las latencias de las solicitudes de lectura por ubicación del servidor, si se trata de una consulta de lectura dirigida y si se trata de una consulta de flujo de cambios. Esto incluye la latencia del procesamiento de solicitudes en los backends de Cloud Spanner y la capa de API. No incluye la sobrecarga de la red o del proxy inverso entre clientes y servidores.<br>_Se muestra como segundo_ |
| **gcp.spanner.api.read_request_latencies_by_serving_location.samplecount** <br>(count) | El recuento de muestras para la distribución de latencias de solicitudes de lectura por ubicación de servicio, si es una consulta de lectura dirigida y si es una consulta de flujo de cambios. Esto incluye la latencia del procesamiento de solicitudes en los backends de Cloud Spanner y la capa de API. No incluye la sobrecarga de la red o del proxy inverso entre clientes y servidores.<br>_Se muestra como segundo_ |
| **gcp.spanner.api.read_request_latencies_by_serving_location.sumsqdev** <br>(count) | La suma de la desviación al cuadrado para la distribución de las latencias de las solicitudes de lectura por ubicación de servicio, si se trata de una consulta de lectura dirigida y si se trata de una consulta de flujo de cambios. Esto incluye la latencia del procesamiento de solicitudes en los backends de Cloud Spanner y la capa de API. No incluye la sobrecarga de la red o del proxy inverso entre clientes y servidores.<br>_Se muestra como segundo_ |
| **gcp.spanner.api.received_bytes_count** <br>(count) | Bytes de solicitud sin comprimir recibidos por Cloud Spanner.<br>_Se muestra como byte_ |
| **gcp.spanner.api.request_count** <br>(rate) | Tasa de solicitudes de la API de Cloud Spanner.<br>_Se muestra como solicitud_ |
| **gcp.spanner.api.request_latencies.avg** <br>(gauge) | Latencia media de las solicitudes del servidor a una base de datos.<br>_Se muestra en segundos_ |
| **gcp.spanner.api.request_latencies.samplecount** <br>(gauge) | Recuento de muestra de las latencias de las solicitudes del servidor para una base de datos.<br>_Se muestra como segundo_ |
| **gcp.spanner.api.request_latencies.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado de las latencias de solicitud del servidor para una base de datos.<br>_Se muestra como segundo_ |
| **gcp.spanner.api.request_latencies_by_transaction_type.avg** <br>(count) | La distribución media de las latencias de solicitud del servidor por tipos de transacción. Incluye la latencia del procesamiento de solicitudes en los backends de Cloud Spanner y la capa de API. No incluye la sobrecarga de la red o del proxy inverso entre clientes y servidores.<br>_Se muestra en segundos_ |
| **gcp.spanner.api.request_latencies_by_transaction_type.samplecount** <br>(count) | El recuento de muestras para la distribución de latencias de solicitudes de servidor por tipos de transacción. Incluye la latencia del procesamiento de solicitudes en los backends de Cloud Spanner y la capa de API. No incluye la sobrecarga de la red o del proxy inverso entre clientes y servidores.<br>_Se muestra en segundos_ |
| **gcp.spanner.api.request_latencies_by_transaction_type.sumsqdev** <br>(count) | La suma de la desviación al cuadrado para la distribución de las latencias de las peticiones del servidor por tipos de transacción. Incluye la latencia del procesamiento de solicitudes en los backends de Cloud Spanner y la capa de API. No incluye la sobrecarga de la red o del proxy inverso entre clientes y servidores.<br>_Se muestra como segundo_ |
| **gcp.spanner.api.sent_bytes_count** <br>(count) | Bytes de respuesta sin comprimir enviados por Cloud Spanner.<br>_Se muestra como byte_ |
| **gcp.spanner.client.attempt_count** <br>(count) | Número total de intentos de RPC realizados por el cliente de Spanner.|
| **gcp.spanner.client.attempt_latencies.avg** <br>(count) | La distribución media de la latencia total de extremo a extremo en un intento de RPC.<br>_Se muestra en milisegundos_ |
| **gcp.spanner.client.attempt_latencies.samplecount** <br>(count) | El recuento de muestras para la distribución de la latencia total de extremo a extremo a través de un intento de RPC.<br>_Se muestra como milisegundo_ |
| **gcp.spanner.client.attempt_latencies.sumsqdev** <br>(count) | La suma de la desviación al cuadrado para la distribución de la latencia total de extremo a extremo a través de un intento de RPC.<br>_Se muestra como milisegundo_ |
| **gcp.spanner.client.operation_count** <br>(count) | Número total de operaciones realizadas por el cliente de Spanner.|
| **gcp.spanner.client.operation_latencies.avg** <br>(count) | Distribución media de la latencia total de extremo a extremo en todos los intentos de RPC asociados a una operación de Spanner.<br>_Se muestra en milisegundos_ |
| **gcp.spanner.client.operation_latencies.samplecount** <br>(count) | El recuento de muestras para la distribución de la latencia total de extremo a extremo a través de todos los intentos de RPC asociados con una operación de Spanner.<br>_Se muestra como milisegundo_ |
| **gcp.spanner.client.operation_latencies.sumsqdev** <br>(count) | La suma de la desviación al cuadrado para la distribución de la latencia total de extremo a extremo a través de todos los intentos de RPC asociados con una operación de Spanner.<br>_Se muestra como milisegundo_ |
| **gcp.spanner.graph_query_stat.total.bytes_returned_count** <br>(count) | Número de bytes de datos que han devuelto las consultas sobre gráficos, excluida la sobrecarga de codificación de la transmisión.<br>_Se muestra como byte_ |
| **gcp.spanner.graph_query_stat.total.execution_count** <br>(count) | Número de veces que Cloud Spanner vio consultas de gráficos durante el intervalo.|
| **gcp.spanner.graph_query_stat.total.failed_execution_count** <br>(count) | Número de veces que fallaron las consultas gráficas durante el intervalo.|
| **gcp.spanner.graph_query_stat.total.query_latencies.avg** <br>(count) | La distribución media de la duración total, en segundos, de las ejecuciones de consultas de gráficos dentro de la base de datos.<br>_Se muestra como segundo_ |
| **gcp.spanner.graph_query_stat.total.query_latencies.samplecount** <br>(count) | El recuento de muestras para la distribución de la duración total, en segundos, de las ejecuciones de consultas de gráficos dentro de la base de datos.<br>_Se muestra como segundo_ |
| **gcp.spanner.graph_query_stat.total.query_latencies.sumsqdev** <br>(count) | La suma de la desviación al cuadrado para la distribución de la duración total, en segundos, de las ejecuciones de consultas de gráficos dentro de la base de datos.<br>_Se muestra como segundo_ |
| **gcp.spanner.graph_query_stat.total.returned_rows_count** <br>(count) | Número de filas que ha devuelto la consulta gráfica.|
| **gcp.spanner.graph_query_stat.total.scanned_rows_count** <br>(count) | Número de filas que las consultas del gráfico han escaneado excluyendo los valores eliminados.|
| **gcp.spanner.instance.autoscaling.high_priority_cpu_utilization_target** <br>(gauge) | Objetivo de utilización de CPU de alta prioridad utilizado para el autoescalado.|
| **gcp.spanner.instance.autoscaling.max_node_count** <br>(gauge) | Número máximo de nodos que el autoescalador puede asignar a la instancia.|
| **gcp.spanner.instance.autoscaling.max_processing_units** <br>(gauge) | Número máximo de unidades de procesamiento que el autoescalador puede asignar a la instancia.|
| **gcp.spanner.instance.autoscaling.min_node_count** <br>(gauge) | Número mínimo de nodos que el autoescalador puede asignar a la instancia.|
| **gcp.spanner.instance.autoscaling.min_processing_units** <br>(gauge) | Número mínimo de unidades de procesamiento que el autoescalador puede asignar a la instancia.|
| **gcp.spanner.instance.autoscaling.storage_utilization_target** <br>(gauge) | Objetivo de utilización de almacenamiento utilizado para el autoescalado.|
| **gcp.spanner.instance.backup.used_bytes** <br>(gauge) | Almacenamiento de copia de seguridad utilizado en bytes.<br>_Se muestra como byte_ |
| **gcp.spanner.instance.cpu.smoothed_utilization** <br>(gauge) | Utilización suavizada de 24 horas de la CPU aprovisionada entre 0,0 y 1,0.<br>_Se muestra como fracción_ |
| **gcp.spanner.instance.cpu.utilization** <br>(gauge) | Utilización de la CPU aprovisionada, entre 0 y 1.<br>_Se muestra como fracción_ |
| **gcp.spanner.instance.cpu.utilization_by_operation_type** <br>(gauge) | Porcentaje de utilización de la CPU aprovisionada, por tipo de operación entre 0,0 y 1,0.<br>_Se muestra como fracción_ |
| **gcp.spanner.instance.cpu.utilization_by_priority** <br>(gauge) | Porcentaje de utilización de la CPU aprovisionada, por prioridad entre 0,0 y 1,0.<br>_Se muestra como fracción_ |
| **gcp.spanner.instance.cross_region_replicated_bytes_count** <br>(count) | Número de bytes replicados desde el líder preferido a las réplicas en todas las regiones.<br>_Se muestra como byte_ |
| **gcp.spanner.instance.data_boost.processing_unit_second_count** <br>(count) | Total de unidades de procesamiento utilizadas para las operaciones DataBoost.|
| **gcp.spanner.instance.dual_region_quorum_availability** <br>(gauge) | Señal de disponibilidad de quórum para configuraciones de instancia de región dual.|
| **gcp.spanner.instance.leader_percentage_by_region** <br>(gauge) | Porcentaje de líderes por región de nubes entre 0,0 y 1,0.<br>_Se muestra como fracción_ |
| **gcp.spanner.instance.node_count** <br>(gauge) | Número total de nodos.<br>_Se muestra como nodo_ |
| **gcp.spanner.instance.peak_split_cpu_usage_score** <br>(gauge) | Puntuación máxima de uso de CPU observada en una base de datos en todas las divisiones.|
| **gcp.spanner.instance.placement_row_limit** <br>(gauge) | Límite superior de las filas de colocación.|
| **gcp.spanner.instance.placement_row_limit_per_processing_unit** <br>(gauge) | Límite superior de filas de colocación por unidad de proceso.|
| **gcp.spanner.instance.placement_rows** <br>(gauge) | Número de filas de colocación en una base de datos.|
| **gcp.spanner.instance.processing_units** <br>(gauge) | Número total de unidades de procesamiento.|
| **gcp.spanner.instance.replica.autoscaling.high_priority_cpu_utilization_target** <br>(gauge) | Objetivo de utilización de CPU de alta prioridad utilizado para la réplica de autoescalado.<br>_Se muestra como porcentaje_ |
| **gcp.spanner.instance.replica.autoscaling.max_node_count** <br>(gauge) | Número máximo de nodos que el autoescalador puede asignar a la réplica.|
| **gcp.spanner.instance.replica.autoscaling.max_processing_units** <br>(gauge) | Número máximo de unidades de procesamiento que el autoescalador puede asignar a la réplica.|
| **gcp.spanner.instance.replica.autoscaling.min_node_count** <br>(gauge) | Número mínimo de nodos que el autoescalador puede asignar a la réplica.|
| **gcp.spanner.instance.replica.autoscaling.min_processing_units** <br>(gauge) | Número mínimo de unidades de procesamiento que el autoescalador puede asignar a la réplica.|
| **gcp.spanner.instance.replica.cmek.total_keys** <br>(gauge) | Número de claves CMEK identificadas por la base de datos y estado de revocación de las claves.|
| **gcp.spanner.instance.replica.node_count** <br>(gauge) | Número de nodos asignados a cada réplica identificada por ubicación y tipo de réplica.|
| **gcp.spanner.instance.replica.processing_units** <br>(gauge) | Número de unidades de procesamiento asignadas a cada réplica identificada por ubicación y tipo de réplica.|
| **gcp.spanner.instance.session_count** <br>(gauge) | Número de sesiones en uso.<br>_Se muestra como sesión_ |
| **gcp.spanner.instance.storage.limit_bytes** <br>(gauge) | Límite de almacenamiento para la instancia en bytes.<br>_Se muestra como byte_ |
| **gcp.spanner.instance.storage.limit_bytes_per_processing_unit** <br>(gauge) | Límite de almacenamiento por unidad de proceso en bytes.<br>_Se muestra como byte_ |
| **gcp.spanner.instance.storage.used_bytes** <br>(gauge) | Almacenamiento utilizado en bytes.<br>_Se muestra como byte_ |
| **gcp.spanner.instance.storage.utilization** <br>(gauge) | Almacenamiento utilizado como fracción del límite de almacenamiento.<br>_Se muestra como fracción_ |
| **gcp.spanner.lock_stat.total.lock_wait_time** <br>(count) | Tiempo total de espera de los conflictos de bloqueo registrados para toda la base de datos.<br>_Se muestra en segundos_ |
| **gcp.spanner.query_count** <br>(count) | Recuento de consultas por nombre de base de datos, estado, tipo de consulta y versión del optimizador utilizada.<br>_Se muestra como consulta_ |
| **gcp.spanner.query_stat.total.bytes_returned_count** <br>(count) | Número de bytes de datos que devolvieron las consultas.<br>_Se muestra como byte_ |
| **gcp.spanner.query_stat.total.cpu_time** <br>(count) | Número de segundos de tiempo de CPU que Cloud Spanner empleó en operaciones para ejecutar las consultas.<br>_Se muestra como segundo_ |
| **gcp.spanner.query_stat.total.execution_count** <br>(count) | Número de veces que Cloud Spanner vio consultas durante el intervalo.<br>_Se muestra como consulta_ |
| **gcp.spanner.query_stat.total.failed_execution_count** <br>(count) | Número de veces que fallaron las consultas durante el intervalo.<br>_Se muestra como consulta_ |
| **gcp.spanner.query_stat.total.query_latencies** <br>(gauge) | Distribución de la duración total, en segundos, de las ejecuciones de consultas en la base de datos.<br>_Se muestra como segundo_ |
| **gcp.spanner.query_stat.total.remote_service_calls_count** <br>(count) | Recuento de llamadas a servicios remotos.|
| **gcp.spanner.query_stat.total.remote_service_calls_latencies.avg** <br>(count) | La latencia media de las llamadas a servicios remotos.<br>_Se muestra en milisegundos_ |
| **gcp.spanner.query_stat.total.remote_service_calls_latencies.samplecount** <br>(count) | El recuento de muestras para la latencia de las llamadas a servicios remotos.<br>_Se muestra como milisegundo_ |
| **gcp.spanner.query_stat.total.remote_service_calls_latencies.sumsqdev** <br>(count) | La suma de la desviación al cuadrado de la latencia de las llamadas a servicios remotos.<br>_Se muestra en milisegundos_ |
| **gcp.spanner.query_stat.total.remote_service_network_bytes_sizes.avg** <br>(count) | La media de bytes de red intercambiados con el servicio remoto.<br>_Se muestra como byte_ |
| **gcp.spanner.query_stat.total.remote_service_network_bytes_sizes.samplecount** <br>(count) | El recuento de muestras de bytes de red intercambiados con el servicio remoto.<br>_Se muestra como byte_ |
| **gcp.spanner.query_stat.total.remote_service_network_bytes_sizes.sumsqdev** <br>(count) | La suma de la desviación al cuadrado de los bytes de red intercambiados con el servicio remoto.<br>_Se muestra como byte_ |
| **gcp.spanner.query_stat.total.remote_service_processed_rows_count** <br>(count) | Recuento de filas procesadas por un servicio remoto.|
| **gcp.spanner.query_stat.total.remote_service_processed_rows_latencies.avg** <br>(count) | La latencia media de las filas procesadas por un servicio remoto.<br>_Se muestra en milisegundos_ |
| **gcp.spanner.query_stat.total.remote_service_processed_rows_latencies.samplecount** <br>(count) | El recuento de muestras para la latencia de filas procesadas por un servicio remoto.<br>_Se muestra como milisegundo_ |
| **gcp.spanner.query_stat.total.remote_service_processed_rows_latencies.sumsqdev** <br>(count) | La suma de la desviación al cuadrado para la latencia de las filas procesadas por un servicio remoto.<br>_Se muestra como milisegundo_ |
| **gcp.spanner.query_stat.total.returned_rows_count** <br>(count) | Número de filas que han devuelto las consultas.<br>_Se muestra como fila_ |
| **gcp.spanner.query_stat.total.scanned_rows_count** <br>(count) | Número de filas que las consultas escanearon excluyendo los valores borrados.<br>_Se muestra como fila_ |
| **gcp.spanner.read_stat.total.bytes_returned_count** <br>(count) | Número total de bytes de datos devueltos por la lectura, excluida la sobrecarga de codificación de la transmisión.<br>_Se muestra como byte_ |
| **gcp.spanner.read_stat.total.client_wait_time** <br>(count) | Número de segundos de espera debido a la limitación.<br>_Se muestra como segundo_ |
| **gcp.spanner.read_stat.total.cpu_time** <br>(count) | Número de segundos de tiempo de CPU que Cloud Spanner empleó en ejecutar las lecturas excluyendo la CPU de prefetch y otros gastos generales.<br>_Se muestra como segundo_ |
| **gcp.spanner.read_stat.total.execution_count** <br>(count) | Número de veces que Cloud Spanner ejecutó las formas de lectura durante el intervalo.|
| **gcp.spanner.read_stat.total.leader_refresh_delay** <br>(count) | Número de segundos dedicados a coordinar lecturas entre instancias en configuraciones multirregión.<br>_Se muestra como segundo_ |
| **gcp.spanner.read_stat.total.locking_delays.avg** <br>(count) | La distribución media del tiempo total en segundos de espera debido al bloqueo.<br>_Se muestra como segundo_ |
| **gcp.spanner.read_stat.total.locking_delays.samplecount** <br>(count) | El recuento de muestras para la distribución del tiempo total en segundos de espera debido al bloqueo.<br>_Se muestra como segundo_ |
| **gcp.spanner.read_stat.total.locking_delays.sumsqdev** <br>(count) | La suma de la desviación al cuadrado para la distribución del tiempo total en segundos de espera debido al bloqueo.<br>_Se muestra como segundo_ |
| **gcp.spanner.read_stat.total.returned_rows_count** <br>(count) | Número de filas que ha devuelto la lectura.<br>_Se muestra como fila_ |
| **gcp.spanner.row_deletion_policy.deleted_rows_count** <br>(count) | Recuento de filas eliminadas por la política desde la última muestra.<br>_Se muestra como fila_ |
| **gcp.spanner.row_deletion_policy.processed_watermark_age** <br>(gauge) | Tiempo entre ahora y la marca de tiempo de lectura de la última ejecución correcta.<br>_Se muestra como segundo_ |
| **gcp.spanner.row_deletion_policy.undeletable_rows** <br>(count) | Número de filas de todas las tablas de la base de datos que no se pueden eliminar.<br>_Se muestra como fila_ |
| **gcp.spanner.transaction_stat.total.bytes_written_count** <br>(count) | Número de bytes escritos por las transacciones.<br>_Se muestra como byte_ |
| **gcp.spanner.transaction_stat.total.commit_attempt_count** <br>(count) | Número de intentos de confirmación de transacciones.|
| **gcp.spanner.transaction_stat.total.commit_retry_count** <br>(count) | Número de intentos de confirmación que son reintentos de intentos de transacción previamente abortados.|
| **gcp.spanner.transaction_stat.total.participants** <br>(gauge) | Distribución del número total de participantes en cada intento de confirmación.|
| **gcp.spanner.transaction_stat.total.transaction_latencies** <br>(gauge) | Distribución del total de segundos que tarda la primera operación de la transacción en confirmarse o cancelarse.<br>_Se muestra como segundo_ |

### Eventos

La integración Google Cloud Spanner no incluye eventos.

### Checks de servicio

La integración Google Cloud Spanner no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).