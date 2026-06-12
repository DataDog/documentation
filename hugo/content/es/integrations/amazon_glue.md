---
app_id: amazon_glue
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
description: Rastrea métricas clave de AWS Glue.
title: AWS Glue
---
## Información general

AWS Glue es un servicio de ETL (extracción, transformación y carga) totalmente gestionado que hace más simple y rentable la categorización, limpieza, mejora y traslado fiable de datos entre varios almacenes de datos.

Habilita esta integración para ver todas tus métricas de Glue en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Glue` está habilitado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y Amazon Glue](https://app.datadoghq.com/integrations/amazon-glue).

### Recopilación de logs

#### Activar logging

Configura AWS Glue para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_glue` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de AWS Glue en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.glue.driver.executor_allocation_manager.executors.number_all_executors** <br>(gauge) | El número de ejecutores de trabajos en ejecución activa.|
| **aws.glue.driver.executor_allocation_manager.executors.number_max_needed_executors** <br>(gauge) | El número máximo de ejecutores (en ejecución activa y pendientes) de trabajo necesarios para satisfacer la carga actual.|
| **aws.glue.glue_alljvm_heap_usage** <br>(gauge) | La fracción media de memoria utilizada por el heap JVM para este controlador (escala: 0-1) para todos los ejecutores.<br>_Se muestra como porcentaje_ |
| **aws.glue.glue_alljvm_heap_used** <br>(gauge) | El número de bytes de memoria utilizados por el heap JVM para todos los ejecutores.<br>_Se muestra como byte_ |
| **aws.glue.glue_alls_3filesystem_readbytes** <br>(gauge) | El número medio de bytes leídos de Amazon S3 por todos los ejecutores desde el informe anterior.|
| **aws.glue.glue_allsystem_cpu_system_load** <br>(gauge) | Fracción media de la carga del sistema de la CPU utilizada (escala: 0-1) por todos los ejecutores.<br>_Se muestra como porcentaje_ |
| **aws.glue.glue_driver_aggregate_bytes_read** <br>(count) | El número de bytes leídos de todas las fuentes de datos por todas las tareas de Spark completadas que se ejecutan en todos los ejecutores.<br>_Se muestra como byte_ |
| **aws.glue.glue_driver_aggregate_elapsed_time** <br>(count) | El tiempo transcurrido de ETL en milisegundos (no incluye los tiempos de arranque del trabajo).<br>_Se muestra en milisegundos_ |
| **aws.glue.glue_driver_aggregate_num_completed_stages** <br>(count) | El número de etapas completadas en el trabajo.|
| **aws.glue.glue_driver_aggregate_num_completed_tasks** <br>(count) | El número de tareas completadas en el trabajo.|
| **aws.glue.glue_driver_aggregate_num_failed_tasks** <br>(count) | Número de tareas fallidas.|
| **aws.glue.glue_driver_aggregate_num_killed_tasks** <br>(count) | Número de tareas eliminadas.|
| **aws.glue.glue_driver_aggregate_records_read** <br>(count) | El número de registros leídos de todas las fuentes de datos por todas las tareas de Spark completadas que se ejecutan en todos los ejecutores.|
| **aws.glue.glue_driver_aggregate_shuffle_bytes_written** <br>(count) | El número de bytes escritos por todos los ejecutores para mezclar datos entre ellos desde el informe anterior.|
| **aws.glue.glue_driver_aggregate_shuffle_local_bytes_read** <br>(count) | El número de bytes leídos por todos los ejecutores para mezclar datos entre ellos desde el informe anterior.|
| **aws.glue.glue_driver_block_manager_disk_disk_space_used_mb** <br>(gauge) | El número medio de megabytes de espacio en disco utilizado en todos los ejecutores.|
| **aws.glue.glue_driver_jvm_heap_usage** <br>(gauge) | La fracción media de memoria utilizada por el heap JVM para este controlador (escala: 0-1) para el controlador.<br>_Se muestra como porcentaje_ |
| **aws.glue.glue_driver_jvm_heap_used** <br>(gauge) | El número de bytes de memoria utilizados por el heap JVM para el controlador.<br>_Se muestra como byte_ |
| **aws.glue.glue_driver_s3_filesystem_readbytes** <br>(gauge) | El número medio de bytes leídos de Amazon S3 por el controlador desde el informe anterior.|
| **aws.glue.glue_driver_s3_filesystem_writebytes** <br>(gauge) | El número medio de bytes escritos en Amazon S3 por el controlador desde el informe anterior.|
| **aws.glue.glue_driver_system_cpu_system_load** <br>(gauge) | Fracción media de la carga del sistema de la CPU utilizada (escala: 0-1) por el controlador.<br>_Se muestra como porcentaje_ |
| **aws.glue.glue_executor_id_jvm_heap_usage** <br>(gauge) | La fracción media de memoria utilizada por el heap JVM para este controlador (escala: 0-1) para el ejecutor identificado.<br>_Se muestra como porcentaje_ |
| **aws.glue.glue_executor_id_jvm_heap_used** <br>(gauge) | El número de bytes de memoria utilizados por el heap JVM para el ejecutor identificado.<br>_Se muestra como byte_ |
| **aws.glue.glue_executor_id_system_cpu_system_load** <br>(gauge) | La fracción media de la carga del sistema de la CPU utilizada (escala: 0-1) por el ejecutor identificado.<br>_Se muestra como porcentaje_ |
| **aws.glue.glue_executor_ids_3_filesystem_readbytes** <br>(gauge) | El número medio de bytes leídos de Amazon S3 por el ejecutor identificado desde el informe anterior.|
| **aws.glue.glue_executor_ids_3_filesystem_writebytes** <br>(gauge) | El número medio de bytes escritos en Amazon S3 por el ejecutor identificado desde el informe anterior.|

### Eventos

La integración de AWS Glue no incluye ningún evento.

### Checks de servicio

La integración de AWS Glue no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).