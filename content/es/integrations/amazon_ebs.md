---
aliases:
- /es/integrations/awsebs/
app_id: amazon_ebs
categories:
- cloud
- data stores
- aws
- log collection
custom_kind: integración
description: Realice un seguimiento de la antigüedad de los snapshots, IOPS, tiempos
  de lectura/escritura y mucho más.
title: Almacén de bloques elástico de Amazon
---
## Información general

Amazon EBS proporciona volúmenes de almacenamiento de bloques persistentes para su uso con instancias de Amazon EC2 en la nube de AWS.

Habilita esta integración para ver en Datadog todas tus métricas de EBS.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `EBS` está habilitado en la pestaña `Metric Collection`.
1. Instala la integración [Datadog - Amazon EBS](https://app.datadoghq.com/integrations/amazon-ebs).

**Nota**: Esta integración recopila métricas de volúmenes EBS adjuntos a un EC2 monitorizado. Para recopilar todas las métricas de EBS, asegúrate de que EC2 está marcado en la [página de la integración AWS](https://app.datadoghq.com/integrations/amazon-web-services) y de que EC2 no está excluido de la monitorización a través del parámetro [limitar la recopilación de recursos](https://docs.datadoghq.com/account_management/billing/aws/#aws-resource-exclusion).

### Recopilación de logs

#### Activar logging

Configura Amazon EBS para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_ebs` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de Amazon EBS en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.ebs.burst_balance** <br>(gauge) | Saldo disponible en el bucket de ráfagas. Esta métrica contiene valores para todos los tipos de volumen, incluido io1.<br>_Se muestra como porcentaje_. |
| **aws.ebs.burst_balance.io1** <br>(gauge) | Saldo disponible en el bucket de ráfagas. Mayor precisión, pero sólo para volúmenes io1.<br>_Se muestra como porcentaje_. |
| **aws.ebs.enable_copied_image_deprecation_completed** <br>(count) | Número de copias de AMI entre regiones, marcadas para su obsolescencia por una política de AMI respaldada por EBS.|
| **aws.ebs.enable_copied_image_deprecation_failed** <br>(count) | Número de copias de AMI entre regiones que no pudieron marcarse para su obsolescencia por una política de AMI respaldada por EBS.|
| **aws.ebs.enable_image_deprecation_completed** <br>(count) | Número de AMI que han sido marcadas para su obsolescencia por una política de AMI respaldada por EBS.|
| **aws.ebs.enable_image_deprecation_failed** <br>(count) | Número de AMI que no pudieron marcarse para su obsolescencia por una política de AMI respaldada por EBS.|
| **aws.ebs.fast_snapshot_restore_credits_balance** <br>(gauge) | Número de créditos de creación de volumen disponibles.|
| **aws.ebs.fast_snapshot_restore_credits_bucket_size** <br>(gauge) | Número máximo de créditos de creación de volumen que se pueden acumular.|
| **aws.ebs.images_copied_region_completed** <br>(count) | Número de copias AMI entre regiones creadas por una política de AMI respaldada por EBS.|
| **aws.ebs.images_copied_region_deregister_completed** <br>(count) | Número de copias AMI entre regiones dadas de baja, según lo designado por la regla de retención, por una política de AMI respaldada por EBS.|
| **aws.ebs.images_copied_region_deregister_failed** <br>(count) | Número de copias de AMI entre regiones que no se pudieron dar de baja, según lo designado por la regla de retención, por una política de AMI respaldada por EBS.|
| **aws.ebs.images_copied_region_failed** <br>(count) | Número de copias de AMI entre regiones que no se pudieron crear mediante una política de AMI respaldada por EBS.|
| **aws.ebs.images_copied_region_started** <br>(count) | Número de acciones de copia entre regiones iniciadas por una política de AMI respaldada por EBS.|
| **aws.ebs.images_create_completed** <br>(count) | Número de AMI creadas por una política de AMI respaldada por EBS.|
| **aws.ebs.images_create_failed** <br>(count) | Número de AMI que no se pudieron crear mediante una política de AMI respaldada por EBS.|
| **aws.ebs.images_create_started** <br>(count) | Número de acciones CreateImage iniciadas por una política de AMI respaldada por EBS.|
| **aws.ebs.images_deregister_completed** <br>(count) | Número de AMI dadas de baja por una política de AMI respaldada por EBS.|
| **aws.ebs.images_deregister_failed** <br>(count) | Número de AMI que no se pudieron dar de baja mediante una política de AMI respaldada por EBS.|
| **aws.ebs.post_script_completed** <br>(count) | Número de instancias para las que se ha completado correctamente un post script.|
| **aws.ebs.post_script_failed** <br>(count) | Número de instancias para las que no se ha completado correctamente un post script.|
| **aws.ebs.post_script_started** <br>(count) | Número de instancias para las que se ha iniciado correctamente un post script.|
| **aws.ebs.pre_script_completed** <br>(count) | Número de instancias para las que se ha completado correctamente un pre script.|
| **aws.ebs.pre_script_failed** <br>(count) | Número de instancias para las que no se ha completado correctamente un pre script.|
| **aws.ebs.pre_script_started** <br>(count) | Número de instancias para las que se ha iniciado correctamente un pre script.|
| **aws.ebs.resources_targeted** <br>(count) | Número de recursos a los que apuntan las etiquetas (tags) especificadas en un snapshot o en una política de AMI respaldada por EBS.<br>_Se muestra como recurso_ |
| **aws.ebs.snapshot_age** <br>(gauge) | Tiempo transcurrido desde la creación del snapshot completo más reciente<br>_Se muestra como segundo_ |
| **aws.ebs.snapshots_archive_deletion_completed** <br>(count) | Número de snapshots archivados, eliminados correctamente del nivel de archivo por una política de snapshots.|
| **aws.ebs.snapshots_archive_deletion_failed** <br>(count) | Número de snapshots archivados que no se pudieron eliminar del nivel de archivo por una política de snapshots.|
| **aws.ebs.snapshots_archive_scheduled** <br>(count) | Número de snapshots que estaban programados para ser archivados por una política de snapshots.|
| **aws.ebs.snapshots_copied_region_completed** <br>(count) | Número de copias de snapshots entre regiones, creadas por una política de snapshots.|
| **aws.ebs.snapshots_copied_region_delete_completed** <br>(count) | Número de copias de snapshots entre regiones eliminadas, según lo designado por la regla de retención, por una política de snapshots.|
| **aws.ebs.snapshots_copied_region_delete_failed** <br>(count) | Número de copias de snapshots entre regiones que no se pudieron eliminar, según lo designado por la regla de retención, por una política de snapshots.|
| **aws.ebs.snapshots_copied_region_failed** <br>(count) | Número de copias de snapshots entre regiones que no se pudieron crear mediante una política de snapshots.|
| **aws.ebs.snapshots_copied_region_started** <br>(count) | Número de acciones de copia de snapshots entre regiones, iniciadas por una política de snapshots.|
| **aws.ebs.snapshots_create_completed** <br>(count) | Número de snapshots creados por una política de snapshots.|
| **aws.ebs.snapshots_create_failed** <br>(count) | Número de snapshots que no se pudieron crear mediante una política de snapshots.|
| **aws.ebs.snapshots_create_started** <br>(count) | Número de acciones de creación de snapshots, iniciadas por una política de snapshots.|
| **aws.ebs.snapshots_delete_completed** <br>(count) | Número de snapshots eliminados por una política de snapshots o de AMI respaldada por EBS.|
| **aws.ebs.snapshots_delete_failed** <br>(count) | Número de snapshots que no se pudieron eliminar mediante una política de snapshots o de AMI respaldada por EBS.|
| **aws.ebs.snapshots_shared_completed** <br>(count) | Número de snapshots compartidos entre cuentas por una política de snapshots.|
| **aws.ebs.snapshots_shared_failed** <br>(count) | Número de snapshots que no se pudieron compartir mediante una política de snapshots.|
| **aws.ebs.status.impaired** <br>(gauge) | Número de volúmenes EBS con el estado deteriorado.|
| **aws.ebs.status.insufficient_data** <br>(gauge) | Número de volúmenes EBS con un estado de datos insuficientes.|
| **aws.ebs.status.ok** <br>(gauge) | Número de volúmenes EBS con un estado ok.|
| **aws.ebs.status.warning** <br>(gauge) | Número de volúmenes EBS con un estado de advertencia.|
| **aws.ebs.volume_consumed_read_write_ops** <br>(count) | Cantidad total de operaciones de lectura y escritura (normalizadas a unidades de capacidad de 256K). Sólo para tipos de volumen io1.|
| **aws.ebs.volume_consumed_read_write_ops.maximum** <br>(count) | Cantidad máxima de operaciones de lectura y escritura (normalizada a unidades de capacidad de 256K). Sólo para tipos de volumen io1.|
| **aws.ebs.volume_idle_time** <br>(gauge) | Número total de segundos en un periodo de tiempo especificado en el que no se enviaron operaciones de lectura o escritura. Esta métrica contiene valores para todos los tipos de volumen, incluido io1.<br>_Se muestra como segundo_. |
| **aws.ebs.volume_idle_time.io1** <br>(gauge) | Número total de segundos en un periodo de tiempo especificado en el que no se realizaron operaciones de lectura o escritura. Mayor precisión pero sólo para volúmenes io1.<br>_Se muestra como segundo_ |
| **aws.ebs.volume_queue_length** <br>(gauge) | Número de solicitudes de operaciones de lectura y escritura que esperan ser completadas. Esta métrica contiene valores para todos los tipos de volumen, incluido io1.|
| **aws.ebs.volume_queue_length.io1** <br>(gauge) | Número de solicitudes de operaciones de lectura y escritura que esperan ser completadas. Mayor precisión pero sólo para volúmenes io1.|
| **aws.ebs.volume_read_bytes** <br>(gauge) | Tamaño medio de cada operación de lectura. Esta métrica contiene valores para todos los tipos de volumen, incluido io1.<br>_Se muestra como byte_. |
| **aws.ebs.volume_read_bytes.io1** <br>(gauge) | Tamaño medio de cada operación de lectura. Mayor precisión pero sólo para volúmenes io1.<br>_Se muestra como byte_ |
| **aws.ebs.volume_read_bytes.sum** <br>(gauge) | Número total de bytes leídos por operaciones de lectura. Esta métrica contiene valores para todos los tipos de volumen, incluido io1.<br>_Se muestra como byte_ |
| **aws.ebs.volume_read_bytes.sum.io1** <br>(gauge) | Número total de bytes leídos por operaciones de lectura. Mayor precisión pero sólo para volúmenes io1.<br>_Se muestra como byte_ |
| **aws.ebs.volume_read_ops** <br>(count) | Número total de operaciones de lectura. Esta métrica contiene valores para todos los tipos de volumen, incluido io1.<br>_Se muestra como operación_. |
| **aws.ebs.volume_read_ops.io1** <br>(count) | Número total de operaciones de lectura. Mayor precisión pero sólo para volúmenes io1.<br>_Se muestra como operación_ |
| **aws.ebs.volume_read_ops.maximum** <br>(count) | Número máximo de operaciones de lectura para un volumen (sólo para volúmenes adjuntos a instancias basadas en Nitro).<br>_Se muestra como operación_ |
| **aws.ebs.volume_stalled_io_check** <br>(gauge) | Informa si un volumen ha aprobado o no una comprobación de E/S bloqueada en el último minuto. Esta métrica puede ser 0 (aprobado) o 1 (fallido).|
| **aws.ebs.volume_throughput_percentage** <br>(gauge) | Porcentaje de operaciones de E/S por segundo (IOPS) entregadas del total de IOPS suministradas para un volumen Amazon EBS. Sólo para tipos de volumen io1.<br>_Se muestra como porcentaje_. |
| **aws.ebs.volume_total_read_time** <br>(gauge) | Tiempo medio empleado por las operaciones de lectura. Esta métrica contiene valores para todos los tipos de volumen, incluido io1.<br>_Se muestra como segundo_. |
| **aws.ebs.volume_total_read_time.io1** <br>(gauge) | Tiempo medio empleado por las operaciones de lectura. Mayor precisión pero sólo para volúmenes io1.<br>_Se muestra como segundo_ |
| **aws.ebs.volume_total_read_time.sum** <br>(gauge) | Número total de segundos empleados por las operaciones de lectura. Esta métrica contiene valores para todos los tipos de volumen, incluido io1.<br>_Se muestra como segundo_. |
| **aws.ebs.volume_total_read_time.sum.io1** <br>(gauge) | Número total de segundos empleados por las operaciones de lectura. Mayor precisión pero sólo para volúmenes io1.<br>_Se muestra como segundo_. |
| **aws.ebs.volume_total_write_time** <br>(gauge) | Tiempo medio empleado por las operaciones de escritura. Esta métrica contiene valores para todos los tipos de volumen, incluido io1.<br>_Se muestra como segundo_. |
| **aws.ebs.volume_total_write_time.io1** <br>(gauge) | Tiempo medio empleado por las operaciones de escritura. Mayor precisión pero sólo para volúmenes io1.<br>_Se muestra como segundo_ |
| **aws.ebs.volume_total_write_time.sum** <br>(gauge) | Número total de segundos empleados por las operaciones de escritura. Esta métrica contiene valores para todos los tipos de volumen, incluido io1.<br>_Se muestra como segundo_. |
| **aws.ebs.volume_total_write_time.sum.io1** <br>(gauge) | Número total de segundos empleados por las operaciones de escritura. Mayor precisión pero sólo para volúmenes io1.<br>_Se muestra como segundo_. |
| **aws.ebs.volume_write_bytes** <br>(gauge) | Tamaño medio de cada operación de escritura. Esta métrica contiene valores para todos los tipos de volumen, incluido io1.<br>_Se muestra como byte_. |
| **aws.ebs.volume_write_bytes.io1** <br>(gauge) | Tamaño medio de cada operación de escritura. Mayor precisión pero sólo para volúmenes io1.<br>_Se muestra como byte_ |
| **aws.ebs.volume_write_bytes.sum** <br>(gauge) | Cantidad total de bytes escritos por operaciones de escritura. Esta métrica contiene valores para todos los tipos de volumen, incluido io1.<br>_Se muestra como byte_ |
| **aws.ebs.volume_write_bytes.sum.io1** <br>(gauge) | Cantidad total de bytes escritos por operaciones de escritura. Mayor precisión pero sólo para volúmenes io1.<br>_Se muestra como byte_ |
| **aws.ebs.volume_write_ops** <br>(count) | Número total de operaciones de escritura. Esta métrica contiene valores para todos los tipos de volumen, incluido io1.<br>_Se muestra como operación_. |
| **aws.ebs.volume_write_ops.io1** <br>(count) | Número total de operaciones de escritura. Mayor precisión pero sólo para volúmenes io1.<br>_Se muestra como operación_ |
| **aws.ebs.volume_write_ops.maximum** <br>(count) | Número máximo de operaciones de escritura para un volumen (sólo para volúmenes adjuntos a instancias basadas en Nitro).<br>_Se muestra como operación_ |
| **aws.ebs.vss_backup_completed** <br>(count) | Número de instancias para las que se ha completado correctamente una copia de seguridad VSS.|
| **aws.ebs.vss_backup_failed** <br>(count) | Número de instancias para las que no se ha completado correctamente una copia de seguridad VSS.|
| **aws.ebs.vss_backup_started** <br>(count) | Número de instancias para las que se ha iniciado correctamente una copia de seguridad VSS.|

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración de Amazon EBS no incluye ningún evento.

### Checks de servicio

La integración de Amazon EBS no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Métricas clave para la monitorización de Amazon EBS](https://www.datadoghq.com/blog/amazon-ebs-monitoring)
- [Recopilación de métricas de Amazon EBS](https://www.datadoghq.com/blog/collecting-amazon-ebs-metrics)
- [Monitorización de volúmenes Amazon EBS con Datadog](https://www.datadoghq.com/blog/monitoring-amazon-ebs-volumes-with-datadog)