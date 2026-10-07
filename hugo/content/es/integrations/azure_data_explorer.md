---
app_id: azure_data_explorer
categories:
- azure
- nube
- network
custom_kind: integración
description: Rastrea las métricas clave de Azure Data Explorer.
title: Microsoft Azure Data Explorer
---
## Información general

Azure Data Explorer es un servicio de análisis altamente escalable y seguro que te permite realizar una exploración exhaustiva de datos estructurados y no estructurados para obtener información al instante. Optimizado para consultas ad hoc, Azure Data Explorer permite la exploración de datos sin procesar, estructurados y semiestructurados, lo que permite obtener información rápidamente. Utiliza Datadog para monitorizar el rendimiento y la utilización de Azure Data Explorer en contexto con el resto de tus aplicaciones e infraestructura.

Obtén métricas de Azure Data Explorer para:

- Rastrear el rendimiento de la ingesta, el procesamiento y la latencia de tus instancias de Data Explorer.
- Monitorizar la utilización de tus recursos de computación, memoria y red de Data Explorer.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración de Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.kusto_clusters.batch_blob_count** <br>(gauge) | Número de fuentes de datos en un lote agregado para ingesta.|
| **azure.kusto_clusters.batch_duration** <br>(gauge) | Duración de la fase de agregación en el flujo de ingesta.<br>_Se muestra como segundo_ |
| **azure.kusto_clusters.batches_processed** <br>(count) | Número de lotes agregados para la ingesta. Tipo de procesamiento por lotes: si el lote alcanzó el tiempo de procesamiento por lotes; límite de tamaño de datos o número de archivos establecido por la política de procesamiento por lotes.|
| **azure.kusto_clusters.batch_size** <br>(gauge) | Tamaño de datos esperado sin comprimir en un lote agregado para ingesta.<br>_Se muestra como byte_ |
| **azure.kusto_clusters.blobs_dropped** <br>(count) | Número de blobs rechazados permanentemente por un componente.|
| **azure.kusto_clusters.blobs_processed** <br>(count) | Número de blobs procesados por un componente.|
| **azure.kusto_clusters.blobs_received** <br>(count) | Número de blobs recibidos del flujo de entrada por un componente.|
| **azure.kusto_clusters.cache_utilization** <br>(gauge) | Nivel de utilización en el ámbito del clúster.<br>_Se muestra como porcentaje_ |
| **azure.kusto_clusters.cache_utilization_factor** <br>(gauge) | Diferencia porcentual entre el número actual de instancias y el número óptimo de instancias (por utilización de caché).<br>_Se muestra como porcentaje_. |
| **azure.kusto_clusters.continuous_export_max_lateness_minutes** <br>(gauge) | Retraso (en minutos) notificado por los trabajos de exportación continua en el clúster.|
| **azure.kusto_clusters.continuous_export_num_of_records_exported** <br>(count) | Número de registros exportados; se activa por cada artefacto de almacenamiento escrito durante la operación de exportación.|
| **azure.kusto_clusters.continuous_export_pending_count** <br>(gauge) | Número de trabajos de exportación continua pendientes listos para su ejecución.|
| **azure.kusto_clusters.continuous_export_result** <br>(count) | Indica si la exportación continua se ha realizado correctamente o no.|
| **azure.kusto_clusters.cpu** <br>(gauge) | Nivel de utilización de la CPU.<br>_Se muestra en porcentaje_ |
| **azure.kusto_clusters.discovery_latency** <br>(gauge) | Informado por las conexiones de datos (si existen). Tiempo en segundos desde que se pone en cola un mensaje o se crea un evento hasta que lo detectan por conexión de datos. Este tiempo no se incluye en la duración total de la ingesta de Azure Data Explorer.<br>_Se muestra en segundos_ |
| **azure.kusto_clusters.events_dropped** <br>(count) | Número de eventos descartados permanentemente por la conexión de datos. Se enviará una métrica de resultado de ingesta con un motivo de fallo.|
| **azure.kusto_clusters.events_processed** <br>(count) | Número de eventos procesados por el clúster.|
| **azure.kusto_clusters.events_processed_for_event_hubs** <br>(count) | Número de eventos procesados por el clúster cuando se ingieren desde Event/IoT Hub.|
| **azure.kusto_clusters.events_received** <br>(count) | Número de eventos recibidos por la conexión de datos.|
| **azure.kusto_clusters.export_utilization** <br>(gauge) | Utilización de las exportaciones.<br>_Se muestra en porcentaje_ |
| **azure.kusto_clusters.ingestion_latency_in_seconds** <br>(gauge) | Latencia de los datos ingestados; desde el momento en que los datos se reciben en el clúster hasta que están listos para su consulta. El periodo de latencia de la ingesta depende del escenario de ingesta.<br>_Se muestra como segundo_ |
| **azure.kusto_clusters.ingestion_result** <br>(count) | Número total de fuentes que fallaron o tuvieron éxito al ser ingeridas. Si divides la métrica por estado, puedes obtener información detallada sobre el estado de las operaciones de ingesta.|
| **azure.kusto_clusters.ingestion_utilization** <br>(gauge) | Relación de slots de ingesta utilizados en el clúster.<br>_Se muestra como porcentaje_ |
| **azure.kusto_clusters.ingestion_volume_in_mb** <br>(count) | Volumen total de datos ingeridos al clúster.<br>_Se muestra como byte_ |
| **azure.kusto_clusters.instance_count** <br>(gauge) | Recuento total de instancias.|
| **azure.kusto_clusters.keep_alive** <br>(gauge) | El check de estado indica que el clúster responde a las consultas.|
| **azure.kusto_clusters.materialized_view_age_minutes** <br>(gauge) | Antigüedad de la vista materializada en minutos.|
| **azure.kusto_clusters.materialized_view_age_seconds** <br>(gauge) | Edad de la vista materializada en segundos.<br>_Se muestra como segundo_ |
| **azure.kusto_clusters.materialized_view_data_loss** <br>(gauge) | Indica una posible pérdida de datos en la vista materializada.|
| **azure.kusto_clusters.materialized_view_extents_rebuild** <br>(gauge) | Número de extensiones recompiladas.|
| **azure.kusto_clusters.materialized_view_health** <br>(gauge) | Estado de la vista materializada (1 para en buen estado; 0 para en mal estado).|
| **azure.kusto_clusters.materialized_view_records_in_delta** <br>(gauge) | Número de registros en la parte no materializada de la vista.|
| **azure.kusto_clusters.materialized_view_result** <br>(gauge) | Resultado del proceso de materialización.|
| **azure.kusto_clusters.query_duration** <br>(gauge) | Duración de la consulta en segundos.<br>_Se muestra en milisegundos_ |
| **azure.kusto_clusters.query_result** <br>(count) | Número total de consultas.|
| **azure.kusto_clusters.queue_length** <br>(gauge) | Número de mensajes pendientes en la cola de un componente.|
| **azure.kusto_clusters.queue_oldest_message** <br>(gauge) | Tiempo en segundos desde que se insertó el mensaje más antiguo de la cola.|
| **azure.kusto_clusters.received_data_size_bytes** <br>(gauge) | Tamaño de los datos recibidos por conexión de datos. Este es el tamaño del flujo de datos; o del tamaño de los datos brutos si se proporcionan.<br>_Se muestra como byte_ |
| **azure.kusto_clusters.stage_latency** <br>(gauge) | Tiempo acumulado desde que se detecta un mensaje hasta que lo recibe el componente de notificación para su procesamiento (el tiempo de detección se establece cuando el mensaje se pone en cola para la cola de ingesta; o cuando es detectado por los datos de conexión).<br>_Se muestra como segundo_ |
| **azure.kusto_clusters.streaming_ingest_data_rate** <br>(gauge) | Velocidad de ingesta de datos de streaming (MB por segundo).|
| **azure.kusto_clusters.streaming_ingest_duration** <br>(gauge) | Duración de la ingesta de streaming en milisegundos.<br>_Se muestra en milisegundos_ |
| **azure.kusto_clusters.streaming_ingest_results** <br>(count) | Resultado de la ingesta de streaming.|
| **azure.kusto_clusters.total_number_of_concurrent_queries** <br>(gauge) | Número total de consultas concurrentes.|
| **azure.kusto_clusters.total_number_of_extents** <br>(gauge) | Número total de extensiones de datos.|
| **azure.kusto_clusters.total_number_of_throttled_commands** <br>(count) | Número total de comandos limitados.|
| **azure.kusto_clusters.total_number_of_throttled_queries** <br>(gauge) | Número total de consultas limitadas.|
| **azure.kusto_clusters.weak_consistency_latency** <br>(gauge) | Latencia máxima entre la sincronización de metadatos anterior y la siguiente (en el ámbito db/nodo).<br>_Se muestra como segundo_ |
| **azure.kusto_clusters.count** <br>(gauge) | Recuento de clústeres de Kusto.|

### Eventos

La integración Azure Data Explorer no incluye eventos.

### Checks de servicio

La integración Azure Data Explorer no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).