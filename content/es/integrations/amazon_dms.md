---
app_id: amazon_dms
categories:
- aws
- nube
- almacenes de datos
- recopilación de logs
custom_kind: integración
description: Track key AWS Database Migration Service (DMS) metrics.
title: AWS Database Migration Service (DMS)
---
## Información general

AWS Database Migration Service (DMS) es un servicio en la nube que facilita la migración de bases de datos relacionales, almacenes de datos, bases de datos NoSQL y otros tipos de almacenes de datos.

Activa esta integración para ver todas tus métricas de DMS en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Database Migration Service` está habilitado en la pestaña `Metric Collection`.
1. Instala la integración [Datadog - AWS Database Migration Service (DMS)](https://app.datadoghq.com/integrations/amazon-dms).

### Recopilación de logs

#### Activar logging

Configura AWS Database Migration Service para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_dms` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de AWS DMS en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.dms.cdcchanges_disk_source** <br>(gauge) | Cantidad de filas acumuladas en disco y a la espera de ser confirmadas desde la fuente<br> _Se muestra como fila_ |
| **aws.dms.cdcchanges_disk_target** <br>(gauge) | Cantidad de filas acumuladas en disco y a la espera de ser enviadas al destino<br>_Se muestra como fila_ |
| **aws.dms.cdcchanges_memory_source** <br>(gauge) | Cantidad de filas acumuladas en una memoria y a la espera de ser enviadas desde la fuente<br> _Se muestra como fila_ |
| **aws.dms.cdcchanges_memory_target** <br>(gauge) | Cantidad de filas acumuladas en una memoria y a la espera de ser enviadas al destino<br>_Se muestra como fila_ |
| **aws.dms.cdcincoming_changes** <br>(gauge) | Recuento total de filas de cambios de la tarea<br>_Se muestra como fila_ |
| **aws.dms.cdclatency_source** <br>(gauge) | Lectura de latencia desde la fuente<br> _Se muestra como segundos_ |
| **aws.dms.cdclatency_target** <br>(gauge) | Latencia de escritura en el destino<br>_Se muestra como segundos_ |
| **aws.dms.cdcthroughput_bandwidth_source** <br>(gauge) | Ancho de banda de red de las tareas entrantes desde la fuente<br> _Se muestra como kibibytes_ |
| **aws.dms.cdcthroughput_bandwidth_target** <br>(gauge) | Ancho de banda de red de las tareas salientes para el destino<br>_Se muestra como kibibytes_ |
| **aws.dms.cdcthroughput_rows_source** <br>(gauge) | Cambios en tareas entrantes desde la fuente<br>_Se muestra como fila_ |
| **aws.dms.cdcthroughput_rows_target** <br>(gauge) | Cambios en tareas salientes para el destino<br>_Se muestra como fila_ |
| **aws.dms.cpuutilization** <br>(gauge) | Cantidad de CPU utilizada.<br>_Se muestra como porcentaje_ |
| **aws.dms.free_storage_space** <br>(gauge) | Cantidad de espacio de almacenamiento disponible<br>_Se muestra como bytes_ |
| **aws.dms.freeable_memory** <br>(gauge) | Cantidad de memoria de acceso aleatorio disponible.<br>_Se muestra como bytes_ |
| **aws.dms.full_load_throughput_bandwidth_source** <br>(gauge) | Ancho de banda de red entrante de una carga completa desde la fuente<br> _Se muestra como kibibytes_ |
| **aws.dms.full_load_throughput_bandwidth_target** <br>(gauge) | Ancho de banda de red saliente de una carga completa para el destino<br>_Se muestra como kibibytes_ |
| **aws.dms.full_load_throughput_rows_source** <br>(gauge) | Cambios entrantes de una carga completa desde la fuente en filas por segundo<br>_Se muestra como fila_ |
| **aws.dms.full_load_throughput_rows_target** <br>(gauge) | Cambios salientes de una carga completa para el destino<br>_Se muestra como fila_ |
| **aws.dms.network_receive_throughput** <br>(gauge) | Tráfico de red entrante (de recepción) en la instancia de base de datos, incluido el tráfico de la base de datos del cliente y el tráfico de Amazon RDS utilizado para la monitorización y la replicación.<br>_Se muestra como bytes_ |
| **aws.dms.network_transmit_throughput** <br>(gauge) | Tráfico de red saliente (de transmisión) en la instancia de base de datos, incluido el tráfico de la base de datos del cliente y el tráfico de Amazon RDS utilizado para la monitorización y la replicación.<br>_Se muestra como bytes_ |
| **aws.dms.read_iops** <br>(gauge) | Número medio de operaciones de E/S de disco por segundo.<br>_Se muestra como operación_ |
| **aws.dms.read_latency** <br>(gauge) | Tiempo medio que tarda cada operación de lectura de E/S de disco<br>_Se muestra como segundos_ |
| **aws.dms.read_throughput** <br>(gauge) | Número medio de bytes leídos del disco por segundo.<br>_Se muestra como bytes_ |
| **aws.dms.swap_usage** <br>(gauge) | Cantidad de espacio de intercambio utilizado en la Instancia de base de datos<br>_Se muestra como bytes_ |
| **aws.dms.write_iops** <br>(gauge) | Número medio de operaciones de E/S de disco por segundo<br>_Se muestra como operación_ |
| **aws.dms.write_latency** <br>(gauge) | Tiempo medio que tarda cada operación de escritura de E/S en disco<br>_Se muestra como segundos_ |
| **aws.dms.write_throughput** <br>(gauge) | Número medio de bytes escritos en disco por segundo.<br>_Se muestra como bytes_ |

### Eventos

La integración de AWS Database Migration Service (DMS) no incluye eventos.

### Checks de servicio

La integración de AWS Database Migration Service (DMS) no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).