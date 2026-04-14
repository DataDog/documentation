---
app_id: amazon_keyspaces
categories:
- aws
- nube
- configuración y despliegue
- recopilación de logs
custom_kind: integración
description: Rastrea métricas clave de Amazon Keyspaces.
title: Amazon Keyspaces (para Apache Cassandra)
---
## Información general

Amazon Keyspaces (para Apache Cassandra) es un servicio de base de datos escalable, de alta disponibilidad y administrada, compatible con Apache Cassandra. Con Amazon Keyspaces, puedes ejecutar tus cargas de trabajo de Cassandra en AWS utilizando el mismo código de aplicación de Cassandra y herramientas de desarrollo que utilizas actualmente.

Habilita esta integración para ver todas tus métricas de Keyspaces en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Cassandra` está habilitado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y Amazon Keyspaces (para Apache Cassandra)](https://app.datadoghq.com/integrations/amazon-keyspaces).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.cassandra.account_max_table_level_reads** <br>(gauge) | El número máximo de unidades de capacidad de lectura que puede utilizar una tabla de una cuenta.<br>_Se muestra como unidad_ |
| **aws.cassandra.account_max_table_level_writes** <br>(gauge) | El número máximo de unidades de capacidad de escritura que puede utilizar una tabla de una cuenta.<br>_Se muestra como unidad_ |
| **aws.cassandra.account_provisioned_read_capacity_utilization** <br>(gauge) | Porcentaje de unidades de capacidad de lectura provisionadas utilizadas por una cuenta.<br>_Se muestra como porcentaje_ |
| **aws.cassandra.account_provisioned_write_capacity_utilization** <br>(gauge) | El porcentaje de unidades de capacidad de escritura provisionadas utilizadas por una cuenta.<br>_Se muestra como porcentaje_ |
| **aws.cassandra.conditional_check_failed_requests** <br>(count) | Número de solicitudes de escritura de transacciones ligeras (LWT) fallidas.<br>_Se muestra como solicitud_ |
| **aws.cassandra.consumed_read_capacity_units** <br>(count) | El total de unidades de capacidad de lectura consumidas.<br>_Se muestra como unidad_ |
| **aws.cassandra.consumed_write_capacity_units** <br>(count) | El total de unidades de capacidad de escritura consumidas.<br>_Se muestra como unidad_ |
| **aws.cassandra.max_provisioned_table_read_capacity_utilization** <br>(gauge) | Porcentaje de unidades de capacidad de lectura aprovisionadas utilizadas por la tabla de lectura aprovisionada más alta de una cuenta.<br>_Se muestra como porcentaje_ |
| **aws.cassandra.max_provisioned_table_write_capacity_utilization** <br>(gauge) | Porcentaje de unidades de capacidad de escritura aprovisionadas utilizadas por la tabla de lectura aprovisionada más alta de una cuenta.<br>_Se muestra como porcentaje_ |
| **aws.cassandra.per_connection_request_rate_exceeded** <br>(count) | Número de solicitudes a Amazon Keyspaces que superan la cuota de tasa de solicitudes por conexión.<br>_Se muestra como solicitud_ |
| **aws.cassandra.provisioned_read_capacity_units** <br>(gauge) | El número medio de unidades de capacidad de lectura provisionadas para una tabla.<br>_Se muestra como unidad_ |
| **aws.cassandra.provisioned_write_capacity_units** <br>(gauge) | El número medio de unidades de capacidad de escritura provisionadas para una tabla.<br>_Se muestra como unidad_ |
| **aws.cassandra.read_throttle_events** <br>(count) | Número de solicitudes a Amazon Keyspaces que superan la capacidad de lectura aprovisionada para una tabla.<br>_Se muestra como solicitud_ |
| **aws.cassandra.returned_item_count** <br>(count) | Número de filas devueltas por consultas SELECT de varias filas durante el periodo especificado.<br>_Se muestra como fila_ |
| **aws.cassandra.storage_partition_throughput_capacity_exceeded** <br>(count) | La suma del número de solicitudes a una partición de almacenamiento de Amazon Keyspaces que superan la capacidad de rendimiento de la partición.<br>_Se muestra como solicitud_ |
| **aws.cassandra.successful_request_latency** <br>(gauge) | El tiempo medio transcurrido de solicitudes exitosas a Amazon Keyspaces durante el periodo especificado.<br>_Se muestra como milisegundo_ |
| **aws.cassandra.successful_request_latency.samplecount** <br>(count) | El número de solicitudes exitosas a Amazon Keyspaces durante el periodo especificado.<br>_Se muestra como milisegundo_ |
| **aws.cassandra.system_errors** <br>(count) | El número de solicitudes a Amazon Keyspaces que generan un ServerError durante el periodo especificado.<br>_Se muestra como solicitud_ |
| **aws.cassandra.ttldeletes** <br>(count) | Las unidades consumidas para borrar o actualizar los datos de una fila utilizando el tiempo de vida (TTL).<br>_Se muestra como unidad_ |
| **aws.cassandra.user_errors** <br>(count) | El número de solicitudes a Amazon Keyspaces que generan un error InvalidRequest durante el periodo especificado.<br>_Se muestra como solicitud_ |
| **aws.cassandra.write_throttle_events** <br>(count) | Número de solicitudes a Amazon Keyspaces que superan la capacidad de escritura aprovisionada para una tabla.<br>_Se muestra como solicitud_ |

### Eventos

La integración de Amazon Keyspaces no incluye ningún evento.

### Checks de servicio

La integración de Amazon Keyspaces no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).