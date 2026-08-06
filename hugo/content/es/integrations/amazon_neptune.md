---
app_id: amazon_neptune
categories:
- aws
- nube
- almacenes de datos
- recopilación de logs
custom_kind: integración
description: Rastrea métricas clave de Amazon Neptune.
title: Amazon Neptune
---
## Información general

Amazon Neptune es un servicio de base de datos de gráficos rápido, fiable y totalmente gestionado que facilita la creación y ejecución de aplicaciones que trabajan con conjuntos de datos altamente conectados.

Habilita esta integración para ver todas tus métricas de Neptune en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Neptune` está activado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y Amazon Neptune](https://app.datadoghq.com/integrations/amazon-neptune).

### Recopilación de logs

#### Activar logging

Configura Amazon Neptune para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_neptune` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de Amazon Neptune en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.neptune.backup_retention_period_storage_used** <br>(count) | La cantidad total de almacenamiento de copia de seguridad.<br>_Se muestra como byte_ |
| **aws.neptune.buffer_cache_hit_ratio** <br>(count) | Porcentaje de solicitudes atendidas por la caché del búfer.|
| **aws.neptune.cluster_replica_lag** <br>(count) | Para una réplica de lectura, la cantidad de retraso al replicar actualizaciones desde la instancia primaria en milisegundos.<br>_Se muestra como milisegundo_ |
| **aws.neptune.cluster_replica_lag_maximum** <br>(count) | La cantidad máxima de retraso entre la instancia principal y cada instancia de base de datos de Neptune en el clúster de base de datos en milisegundos.<br>_Se muestra como milisegundo_ |
| **aws.neptune.cluster_replica_lag_minimum** <br>(count) | La cantidad mínima de retraso entre la instancia principal y cada instancia de base de datos de Neptune en el clúster de base de datos en milisegundos.<br>_Se muestra como milisegundo_ |
| **aws.neptune.cpuutilization** <br>(count) | El porcentaje de utilización de la CPU.|
| **aws.neptune.engine_uptime** <br>(count) | La cantidad de tiempo que la instancia ha estado en ejecución en segundos.<br>_Se muestra como segundo_ |
| **aws.neptune.free_local_storage** <br>(count) | La cantidad de almacenamiento disponible para las tablas temporales y logs en bytes.<br>_Se muestra como byte_ |
| **aws.neptune.freeable_memory** <br>(count) | La cantidad de memoria de acceso aleatorio disponible en bytes.<br>_Se muestra como byte_ |
| **aws.neptune.global_db_data_transfer_bytes** <br>(count) | El número de bytes de datos de log redo transferidos desde la región primaria de AWS a una región secundaria de AWS en una base de datos global de Neptune.<br>_Se muestra como byte_ |
| **aws.neptune.global_db_replicated_write_io** <br>(count) | El número de operaciones de E/S de escritura replicadas desde la región primaria de AWS en la base de datos global al volumen de clúster en una región secundaria de AWS.|
| **aws.neptune.global_db_progress_lag** <br>(count) | El número de milisegundos que un clúster secundario está por detrás del clúster primario tanto para transacciones de usuario como para transacciones de sistema.<br>_Se muestra como milisegundo_ |
| **aws.neptune.gremlin_requests_per_sec** <br>(count) | Número de solicitudes al motor Gremlin por segundo.|
| **aws.neptune.gremlin_web_socket_open_connections** <br>(count) | El número de conexiones WebSocket abiertas a Neptune.|
| **aws.neptune.loader_requests_per_sec** <br>(count) | Número de solicitudes del cargador por segundo.|
| **aws.neptune.main_request_queue_pending_requests** <br>(count) | Número de solicitudes que esperan en la cola de entrada pendientes de ejecución.|
| **aws.neptune.ncuutilization** <br>(count) | Solo aplicable a una instancia de base de datos de Neptune Serverless o a un clúster de base de datos.|
| **aws.neptune.netowrk_transmit_throughput** <br>(count) | El tráfico de red saliente (Transmisión) en la instancia de base de datos, incluyendo tanto el tráfico de la base de datos del cliente como el tráfico de Neptune utilizado para la monitorización y replicación en bytes/segundo.|
| **aws.neptune.network_receieve_throughput** <br>(count) | El tráfico de red entrante (Recepción) en la instancia de base de datos, incluyendo tanto el tráfico de la base de datos del cliente como el tráfico de Neptune utilizado para la monitorización y la replicación en bytes/segundo.|
| **aws.neptune.network_throughput** <br>(count) | La cantidad de rendimiento de red recibida de los clientes y transmitida a ellos por cada instancia del clúster de base de datos de Neptune en bytes por segundo.|
| **aws.neptune.num_tx_committed** <br>(count) | Número de transacciones realizadas con éxito por segundo.|
| **aws.neptune.num_tx_opened** <br>(count) | Número de transacciones abiertas en el servidor por segundo.|
| **aws.neptune.num_tx_rolled_back** <br>(count) | Número de transacciones por segundo revertidas en el servidor debido a errores.|
| **aws.neptune.open_cypher_requests_per_sec** <br>(count) | Número de solicitudes por segundo (tanto HTTPS como Bolt) al motor de openCypher.|
| **aws.neptune.open_cypher_bolt_open_connections** <br>(count) | El número de conexiones Bolt abiertas a Neptuno.|
| **aws.neptune.serverless_database_capacity** <br>(count) | La capacidad actual de una instancia de Neptune sin servidor.|
| **aws.neptune.snapshot_storage_used** <br>(count) | La cantidad total de almacenamiento de copia de seguridad consumida por todas las instantáneas para un clúster de base de datos de Neptune fuera de su periodo de retención de copia de seguridad.<br>_Se muestra como byte_ |
| **aws.neptune.sparql_requests_per_sec** <br>(count) | Número de solicitudes al motor de SPARQL por segundo.|
| **aws.neptune.stats_num_statements_scanned** <br>(count) | Número total de sentencias analizadas en busca de estadísticas DFE desde que se inició el servidor.|
| **aws.neptune.total_backup_storage_billed** <br>(count) | La cantidad total de almacenamiento de copia de seguridad por la que se te factura para un clúster de base de datos de Neptune determinado.<br>_Se muestra como byte_ |
| **aws.neptune.total_client_errors_per_sec** <br>(count) | El número total por segundo de solicitudes que han fallado debido a problemas del lado del cliente.|
| **aws.neptune.total_requests_per_sec** <br>(count) | El número total de solicitudes por segundo al servidor desde todas las fuentes.|
| **aws.neptune.total_server_errors_per_sec** <br>(count) | El número total por segundo de solicitudes que han fallado en el servidor debido a fallos internos.|
| **aws.neptune.undo_log_list_size** <br>(count) | La cantidad de logs undo en la lista de logs undo.<br>_Se muestra como byte_ |
| **aws.neptune.volume_bytes_used** <br>(count) | La cantidad de almacenamiento utilizado por tu instancia de base de datos de Neptune en bytes.<br>_Se muestra como byte_ |
| **aws.neptune.volume_read_iops** <br>(count) | Número medio de operaciones de E/S de lectura facturadas de un volumen de clúster notificado en intervalos de 5 minutos.|
| **aws.neptune.volume_write_iops** <br>(count) | Número medio de operaciones de E/S de disco de escritura en el volumen del clúster notificado en intervalos de 5 minutos.|

### Eventos

La integración de Amazon Neptune no incluye ningún evento.

### Checks de servicio

La integración de Amazon Neptune no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).