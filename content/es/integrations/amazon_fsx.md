---
app_id: amazon_fsx
categories:
- aws
- nube
- almacenes de datos
- recopilación de logs
custom_kind: integración
description: Rastrea métricas clave de Amazon FSx.
title: Amazon FSx
---
## Información general

Amazon FSx es un servicio totalmente gestionado que proporciona almacenamiento escalable para sistemas de archivos NetApp ONTAP, OpenZFS, Windows File Server y Lustre.

Activa esta integración para ver todas tus métricas de FSx en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `FSx` está habilitado en la pestaña `Metric Collection`.

1. Añade los siguientes permisos a tu [política IAM de Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) para recopilar métricas de Amazon FSx:

   | Permiso AWS | Descripción |
   | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | `fsx:ListTagsForResource` | Se utiliza para añadir etiquetas (tags) de FSx personalizadas.                                                                                                                                                                                                                    |
   | `fsx:DescribeFileSystems` | Se utiliza para proporcionar capacidad de almacenamiento y rendimiento.                                                                                                                                                                                    |

1. Instala la integración [Datadog - Amazon FSx](https://app.datadoghq.com/integrations/amazon-fsx).

### Recopilación de logs

#### Logs de eventos de auditoría para FSx para Windows File Server

Para rastrear todos los accesos de usuarios a archivos individuales, carpetas y archivos compartidos, integra los logs de eventos de auditoría desde tu FSx para Windows File Server:

1. [Habilita la función de auditoría de acceso a archivos](https://docs.aws.amazon.com/fsx/latest/WindowsGuide/file-access-auditing.html#faa-log-destinations) para tus sistemas de archivos y envía los logs a CloudWatch.
1. Si aún no lo has hecho, configura la [función AWS Lambda de recopilación de logs de Datadog](https://app.datadoghq.com/integrations/amazon-fsx) (versión 3.35.0 o posterior).
1. Una vez instalada la función de Lambda, añade manualmente un activador en el grupo de logs de CloudWatch `/aws/fsx/windows` en la consola de AWS:
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="grupo de logs de CloudWatch" popup="true" style="width:70%;">}}
   Selecciona el grupo de logs de CloudWatch correspondiente, añade un nombre de filtro (o deja el filtro vacío) y añade el activador:
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="Activador de CloudWatch" popup="true" style="width:70%;">}}
1. Ve a la [sección de logs de Datadog](https://app.datadoghq.com/logs) para empezar a explorar tus logs.

**Nota**: También puedes enviar estos logs a Datadog con [Amazon Data Firehose](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=amazondatafirehosedeliverystream), pero debes crear un [procesador](https://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui) de logs personalizado para obtener la misma funcionalidad y experiencia de análisis y búsqueda de logs.

#### Actividad de la API de FSx

Amazon FSx está integrado con AWS CloudTrail, que realiza un seguimiento de cada acción de FSx realizada por un usuario, rol o servicio AWS.
Habilita la [integración CloudTrail](https://docs.datadoghq.com/integrations/amazon_cloudtrail/#log-collection) de Datadog para monitorizar todas las llamadas a la API de FSx en tu cuenta AWS.

### Métricas

| | |
| --- | --- |
| **aws.fsx.age_of_oldest_queued_message** <br>(gauge) | Antigüedad media del mensaje más antiguo que espera ser exportado.<br>_Se muestra como segundos_ |
| **aws.fsx.age_of_oldest_queued_message.maximum** <br>(gauge) | Número máximo de segundos que un mensaje ha permanecido en la cola de exportación.<br>_Se muestra como segundos_ |
| **aws.fsx.age_of_oldest_queued_message.minimum** <br>(gauge) | Número mínimo de segundos que un mensaje ha permanecido en la cola de exportación.<br>_Se muestra como segundos_ |
| **aws.fsx.capacity_pool_read_bytes** <br>(count) | Número total de bytes leídos desde el nivel de reserva de capacidades del sistema de archivos durante un periodo especificado.<br>_Se muestra como bytes_ |
| **aws.fsx.capacity_pool_read_operations** <br>(count) | Número total de operaciones de lectura desde el nivel de reserva de capacidades del sistema de archivos durante un periodo especificado.<br>_Se muestra como operación_ |
| **aws.fsx.capacity_pool_write_bytes** <br>(count) | Número total de bytes escritos en el nivel de reserva de capacidades del sistema de archivos durante un periodo especificado.<br>_Se muestra como bytes_ |
| **aws.fsx.capacity_pool_write_operations** <br>(count) | Número total de operaciones de escritura en el nivel de reserva de capacidades del sistema de archivos durante un periodo especificado.<br>_Se muestra como operación_ |
| **aws.fsx.client_connections** <br>(count) | Número de conexiones activas entre los clientes y el servidor de archivos.<br>_Se muestra como conexión_ |
| **aws.fsx.compression_ratio** <br>(gauge) | Relación entre el uso de almacenamiento comprimido y el uso de almacenamiento sin comprimir.|
| **aws.fsx.cpuutilization** <br>(gauge) | Uso medio de CPU del sistema de archivos durante un periodo especificado.<br>_Se muestra como porcentaje_ |
| **aws.fsx.cpuutilization.maximum** <br>(gauge) | Uso máximo de CPU del sistema de archivos durante un periodo especificado.<br>_Se muestra como porcentaje_ |
| **aws.fsx.cpuutilization.minimum** <br>(gauge) | Uso más bajo de CPU del sistema de archivos durante un periodo especificado.<br>_Se muestra como porcentaje_ |
| **aws.fsx.data_read_bytes** <br>(count) | Número total de bytes para las operaciones de lectura del sistema de archivos.<br>_Se muestra como bytes_ |
| **aws.fsx.data_read_bytes.average** <br>(gauge) | Número medio de bytes asociados a operaciones de lectura por disco.<br>_Se muestra como bytes_ |
| **aws.fsx.data_read_bytes.maximum** <br>(gauge) | Número máximo de bytes asociados a operaciones de lectura en un solo disco.<br>_Se muestra como bytes_ |
| **aws.fsx.data_read_bytes.minimum** <br>(gauge) | Número mínimo de bytes asociados a operaciones de lectura en un solo disco.<br>_Se muestra como bytes_ |
| **aws.fsx.data_read_bytes.samplecount** <br>(count) | Número de discos en el sistema de archivos.|
| **aws.fsx.data_read_operation_time** <br>(count) | Número total de segundos empleados por las operaciones de lectura durante el periodo especificado.<br>_Se muestra como segundos_ |
| **aws.fsx.data_read_operations** <br>(count) | Número de operaciones de lectura.<br>_Se muestra como operación_ |
| **aws.fsx.data_read_operations.average** <br>(gauge) | Número medio de operaciones de lectura por disco.<br>_Se muestra como operación_ |
| **aws.fsx.data_read_operations.maximum** <br>(gauge) | Número máximo de operaciones de lectura en un solo disco.<br>_Se muestra como operación_ |
| **aws.fsx.data_read_operations.minimum** <br>(gauge) | Número mínimo de operaciones de lectura en un solo disco.<br>_Se muestra como operación_ |
| **aws.fsx.data_read_operations.samplecount** <br>(count) | Número de discos en el sistema de archivos.|
| **aws.fsx.data_write_bytes** <br>(count) | Número total de bytes de las operaciones de escritura del sistema de archivos.<br>_Se muestra como bytes_ |
| **aws.fsx.data_write_bytes.average** <br>(gauge) | Número medio de bytes de las operaciones de escritura del sistema de archivos por disco.<br>_Se muestra como bytes_ |
| **aws.fsx.data_write_bytes.maximum** <br>(gauge) | Número máximo de bytes de las operaciones de escritura del sistema de archivos en un solo disco.<br>_Se muestra como bytes_ |
| **aws.fsx.data_write_bytes.minimum** <br>(gauge) | Número mínimo de bytes de las operaciones de escritura del sistema de archivos en un solo disco.<br>_Se muestra como bytes_ |
| **aws.fsx.data_write_bytes.samplecount** <br>(count) | Número de discos en el sistema de archivos.|
| **aws.fsx.data_write_operation_time** <br>(count) | Número total de segundos empleados por las operaciones de escritura durante el periodo especificado.<br>_Se muestra como segundos_ |
| **aws.fsx.data_write_operations** <br>(count) | Número de operaciones de escritura.<br>_Se muestra como operación_ |
| **aws.fsx.data_write_operations.average** <br>(gauge) | Número medio de operaciones de escritura por disco.<br>_Se muestra como operación_ |
| **aws.fsx.data_write_operations.maximum** <br>(gauge) | Número máximo de operaciones de escritura en un solo disco.<br>_Se muestra como operación_ |
| **aws.fsx.data_write_operations.minimum** <br>(gauge) | Número mínimo de operaciones de escritura en un solo disco.<br>_Se muestra como operación_ |
| **aws.fsx.data_write_operations.samplecount** <br>(count) | Número de discos en el sistema de archivos.|
| **aws.fsx.deduplication_saved_storage** <br>(gauge) | Cantidad de espacio de almacenamiento ahorrado mediante la deduplicación de datos, si está activada.<br>_Se muestra como bytes_ |
| **aws.fsx.disk_iops_utilization** <br>(gauge) | Uso medio de IOPS de disco del sistema de archivos durante un periodo especificado.<br>_Se muestra como porcentaje_ |
| **aws.fsx.disk_iops_utilization.maximum** <br>(gauge) | Uso máximo de IOPS de disco del sistema de archivos durante un periodo especificado.<br>_Se muestra como porcentaje_ |
| **aws.fsx.disk_iops_utilization.minimum** <br>(gauge) | Uso mínimo de IOPS de disco del sistema de archivos durante un periodo especificado.<br>_Se muestra como porcentaje_ |
| **aws.fsx.disk_read_bytes** <br>(count) | Número total de bytes leídos del sistema de archivos durante un periodo especificado.<br>_Se muestra como bytes_ |
| **aws.fsx.disk_read_operations** <br>(count) | Número total de operaciones de lectura desde el nivel primario durante un periodo especificado.<br>_Se muestra como operación_ |
| **aws.fsx.disk_throughput_balance** <br>(gauge) | Porcentaje de créditos de ráfaga disponibles para el rendimiento del disco para los volúmenes de almacenamiento.<br>_Se muestra como porcentaje_ |
| **aws.fsx.disk_throughput_utilization** <br>(gauge) | Rendimiento medio del disco entre tu servidor de archivos y tus volúmenes de almacenamiento.<br>_Se muestra como porcentaje_ |
| **aws.fsx.disk_throughput_utilization.maximum** <br>(gauge) | Rendimiento máximo del disco entre tu servidor de archivos y tus volúmenes de almacenamiento.<br>_Se muestra como porcentaje_ |
| **aws.fsx.disk_throughput_utilization.minimum** <br>(gauge) | Rendimiento mínimo del disco entre tu servidor de archivos y tus volúmenes de almacenamiento.<br>_Se muestra como porcentaje_ |
| **aws.fsx.disk_write_bytes** <br>(count) | Número total de bytes escritos desde el sistema de archivos durante un periodo especificado.<br>_Se muestra como bytes_ |
| **aws.fsx.disk_write_operations** <br>(count) | Número total de operaciones de escritura desde el nivel primario durante un periodo especificado.<br>_Se muestra como operación_ |
| **aws.fsx.file_server_cache_hit_ratio** <br>(gauge) | Porcentaje medio de aciertos de caché del sistema de archivos durante un periodo especificado.<br>_Se muestra como porcentaje_ |
| **aws.fsx.file_server_disk_iops_balance** <br>(gauge) | Saldo medio de ráfagas disponible para IOPS de disco durante un periodo especificado.<br>_Se muestra como porcentaje_ |
| **aws.fsx.file_server_disk_iops_balance.maximum** <br>(gauge) | Saldo máximo de ráfagas disponible para IOPS de disco durante un periodo especificado.<br>_Se muestra como porcentaje_ |
| **aws.fsx.file_server_disk_iops_balance.minimum** <br>(gauge) | Saldo mínimo de ráfagas disponible para IOPS de disco durante un periodo especificado.<br>_Se muestra como porcentaje_ |
| **aws.fsx.file_server_disk_iops_utilization** <br>(gauge) | Uso medio de IOPS de disco del sistema de archivos durante un periodo especificado.<br>_Se muestra como porcentaje_ |
| **aws.fsx.file_server_disk_iops_utilization.maximum** <br>(gauge) | Uso máximo de IOPS de disco del sistema de archivos durante un periodo especificado.<br>_Se muestra como porcentaje_ |
| **aws.fsx.file_server_disk_iops_utilization.minimum** <br>(gauge) | Uso mínimo de IOPS de disco del sistema de archivos durante un periodo especificado.<br>_Se muestra como porcentaje_ |
| **aws.fsx.file_server_disk_throughput_balance** <br>(gauge) | Saldo medio de ráfagas disponible para el rendimiento del disco durante un periodo especificado.<br>_Se muestra como porcentaje_ |
| **aws.fsx.file_server_disk_throughput_balance.maximum** <br>(gauge) | Saldo máximo de ráfagas disponible para el rendimiento del disco durante un periodo especificado.<br>_Se muestra como porcentaje_ |
| **aws.fsx.file_server_disk_throughput_balance.minimum** <br>(gauge) | Saldo de ráfaga mínimo disponible para el rendimiento del disco durante un periodo especificado.<br>_Se muestra como porcentaje_ |
| **aws.fsx.file_server_disk_throughput_utilization** <br>(gauge) | Porcentaje medio de uso del rendimiento del disco de los servidores de archivos durante un periodo especificado.<br>_Se muestra como porcentaje_ |
| **aws.fsx.file_server_disk_throughput_utilization.maximum** <br>(gauge) | Porcentaje más elevado de uso del rendimiento del disco de los servidores de archivos durante un periodo especificado.<br>_Se muestra como porcentaje_ |
| **aws.fsx.file_server_disk_throughput_utilization.minimum** <br>(gauge) | Porcentaje más bajo de uso del rendimiento del disco de los servidores de archivos durante un periodo especificado.<br>_Se muestra como porcentaje_ |
| **aws.fsx.files_capacity** <br>(gauge) | Número total de inodos que se pueden crear en el volumen.<br>_Se muestra como archivo_ |
| **aws.fsx.files_used** <br>(count) | Archivos utilizados (número de archivos o inodos) en el volumen.<br>_Se muestra como archivo_ |
| **aws.fsx.free_data_storage_capacity** <br>(gauge) | Número medio de bytes disponibles por disco.<br>_Se muestra como bytes_ |
| **aws.fsx.free_data_storage_capacity.maximum** <br>(gauge) | Número total de bytes disponibles en el disco con el mayor almacenamiento disponible.<br>_Se muestra como bytes_ |
| **aws.fsx.free_data_storage_capacity.minimum** <br>(gauge) | Número total de bytes disponibles en el disco más lleno.<br>_Se muestra como bytes_ |
| **aws.fsx.free_data_storage_capacity.samplecount** <br>(count) | Número de discos en el sistema de archivos.|
| **aws.fsx.free_data_storage_capacity.sum** <br>(count) | Número total de bytes disponibles en el sistema de archivos.<br>_Se muestra como bytes_ |
| **aws.fsx.free_storage_capacity** <br>(gauge) | Cantidad media de capacidad de almacenamiento disponible.<br>_Se muestra como bytes_ |
| **aws.fsx.free_storage_capacity.minimum** <br>(gauge) | Cantidad mínima de capacidad de almacenamiento disponible.<br>_Se muestra como bytes_ |
| **aws.fsx.logical_data_stored** <br>(count) | Cantidad total de datos lógicos almacenados en el sistema de archivos.<br>_Se muestra como bytes_ |
| **aws.fsx.logical_disk_usage** <br>(count) | Número total de bytes lógicos almacenados en el sistema de archivos.<br>_Se muestra como bytes_ |
| **aws.fsx.logical_disk_usage.average** <br>(gauge) | Número medio de bytes lógicos almacenados por disco.<br>_Se muestra como bytes_ |
| **aws.fsx.logical_disk_usage.maximum** <br>(gauge) | Mayor número de bytes lógicos almacenados en un disco en el sistema de archivos.<br>_Se muestra como bytes_ |
| **aws.fsx.logical_disk_usage.minimum** <br>(gauge) | Menor número de bytes lógicos almacenados en un disco en el sistema de archivos.<br>_Se muestra como bytes_ |
| **aws.fsx.memory_utilization** <br>(gauge) | Uso medio de los recursos de memoria de tu servidor de archivos.<br>_Se muestra como porcentaje_ |
| **aws.fsx.memory_utilization.maximum** <br>(gauge) | Uso más elevado de los recursos de memoria de tu servidor de archivos.<br>_Se muestra como porcentaje_ |
| **aws.fsx.memory_utilization.minimum** <br>(gauge) | Uso más bajo de los recursos de memoria de tu servidor de archivos.<br>_Se muestra como porcentaje_ |
| **aws.fsx.metadata_operation_time** <br>(count) | Número total de segundos empleados por las operaciones de lectura durante el periodo especificado.<br>_Se muestra como segundos_ |
| **aws.fsx.metadata_operations** <br>(count) | Número de operaciones de metadatos.<br>_Se muestra como operación_ |
| **aws.fsx.metadata_operations.average** <br>(gauge) | Número medio de operaciones de metadatos por disco.<br>_Se muestra como operación_ |
| **aws.fsx.network_received_bytes** <br>(count) | Número total de bytes recibidos por el sistema de archivos durante un periodo especificado.<br>_Se muestra como bytes_ |
| **aws.fsx.network_sent_bytes** <br>(count) | Número total de bytes enviados por el sistema de archivos durante un periodo especificado.<br>_Se muestra como bytes_ |
| **aws.fsx.network_throughput_utilization** <br>(gauge) | Uso medio del rendimiento de red del sistema de archivos.<br>_Se muestra como porcentaje_ |
| **aws.fsx.network_throughput_utilization.maximum** <br>(gauge) | Uso más bajo del rendimiento de red del sistema de archivos.<br>_Se muestra como porcentaje_ |
| **aws.fsx.network_throughput_utilization.minimum** <br>(gauge) | Uso más bajo del rendimiento de red del sistema de archivos.<br>_Se muestra como porcentaje_ |
| **aws.fsx.nfs_bad_calls** <br>(count) | Número de llamadas rechazadas por el mecanismo de llamada a procedimiento remoto (RPC) del servidor NFS.<br>_Se muestra como unidad_ |
| **aws.fsx.physical_disk_usage** <br>(count) | Número total de bytes ocupados en discos en el sistema de archivos.<br>_Se muestra como bytes_ |
| **aws.fsx.physical_disk_usage.average** <br>(gauge) | Número medio de bytes ocupados por disco.<br>_Se muestra como bytes_ |
| **aws.fsx.physical_disk_usage.maximum** <br>(gauge) | Número total de bytes ocupados en el disco más lleno.<br>_Se muestra como bytes_ |
| **aws.fsx.physical_disk_usage.minimum** <br>(gauge) | Número total de bytes ocupados en el disco más vacío.<br>_Se muestra como bytes_ |
| **aws.fsx.repository_rename_operations** <br>(count) | Número total de operaciones de cambio de nombre como resultado del cambio de nombre de un directorio.<br>_Se muestra como operación_ |
| **aws.fsx.repository_rename_operations.average** <br>(gauge) | Número medio de operaciones de cambio de nombre del sistema de archivos.<br>_Se muestra como operación_ |
| **aws.fsx.storage_capacity** <br>(gauge) | Capacidad total de almacenamiento del nivel (SSD) primario.<br>_Se muestra como bytes_ |
| **aws.fsx.storage_capacity** <br>(gauge) | Capacidad total de almacenamiento.<br>_Se muestra como bytes_ |
| **aws.fsx.storage_capacity.average** <br>(count) | Capacidad total de almacenamiento, igual a la suma de la capacidad de almacenamiento utilizada y disponible.<br>_Se muestra como bytes_ |
| **aws.fsx.storage_capacity_utilization** <br>(gauge) | Porcentaje de espacio físico en disco utilizado del volumen.<br>_Se muestra como porcentaje_ |
| **aws.fsx.storage_capacity_utilization.average** <br>(gauge) | Media de los porcentajes de espacio físico en disco utilizado de los volúmenes.<br>_Se muestra como porcentaje_ |
| **aws.fsx.storage_efficiency_savings** <br>(gauge) | Ahorro medio en eficiencia de almacenamiento durante un periodo especificado.<br>_Se muestra como bytes_ |
| **aws.fsx.storage_used** <br>(count) | Cantidad total de datos físicos almacenados en el sistema de archivos.<br>_Se muestra como bytes_ |
| **aws.fsx.throughput_capacity** <br>(gauge) | Capacidad de rendimiento de tu almacenamiento.<br>_Se muestra como bytes_ |
| **aws.fsx.used_storage_capacity** <br>(gauge) | Cantidad de almacenamiento utilizado.<br>_Se muestra como bytes_ |

### Eventos

La integración de Amazon FSx no incluye ningún evento.

### Checks de servicio

La integración de Amazon FSx no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).