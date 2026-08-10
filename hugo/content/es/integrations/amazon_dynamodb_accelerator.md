---
app_id: amazon_dynamodb_accelerator
categories:
- aws
- almacenamiento en caché
- nube
- recopilación de logs
custom_kind: integración
description: Realiza un seguimiento de las métricas clave de Amazon DynamoDB Accelerator
  (DAX).
title: Amazon DynamoDB Accelerator (DAX)
---
## Información general

Amazon DynamoDB Accelerator (DAX) es un servicio de almacenamiento en caché compatible con DynamoDB que te permite sacar provecho de un rápido rendimiento en memoria para aplicaciones exigentes.

Habilita esta integración para ver todas tus métricas de Amazon DynamoDB Accelerator (DAX) en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En el [cuadro de la integración AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `DynamoDBAccelerator` está seleccionado.
   en la pestaña de recopilación de métricas.
1. Instala la integración [Datadog - Amazon DynamoDB Accelerator integration](https://app.datadoghq.com/integrations/amazon-DynamoDB-accelerator).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.dax.batch_get_item_request_count** <br>(count) | Número de solicitudes BatchGetItem gestionadas por el nodo o clúster.<br>_Se muestra como solicitud_ |
| **aws.dax.batch_write_item_request_count** <br>(count) | Número de solicitudes BatchWriteItem gestionadas por el nodo o clúster.<br>_Se muestra como solicitud_ |
| **aws.dax.cache_memory_utilization** <br>(gauge) | Porcentaje de memoria caché disponible que está siendo utilizada por la caché de elementos y la caché de consultas en el nodo o clúster.<br>_Se muestra como porcentaje_ |
| **aws.dax.cache_memory_utilization.maximum** <br>(gauge) | Porcentaje máximo de memoria caché disponible utilizado por la caché de elementos y la caché de consultas en el nodo o clúster.<br>_Se muestra como porcentaje_ |
| **aws.dax.client_connections** <br>(gauge) | Número de conexiones simultáneas realizadas por los clientes al nodo o clúster.<br>_Se muestra como conexión_ |
| **aws.dax.cpucredit_balance** <br>(gauge) | Número de créditos de CPU que ha acumulado un clúster.<br>_Se muestra como unidad_ |
| **aws.dax.cpucredit_usage** <br>(gauge) | Número de créditos de CPU gastados por el nodo para el uso de la CPU.<br>_Se muestra como unidad_ |
| **aws.dax.cpusurplus_credit_balance** <br>(gauge) | Número de créditos excedentes que han sido gastados por un nodo DAX cuando su valor CPUCreditBalance es cero.<br>_Se muestra como unidad_ |
| **aws.dax.cpusurplus_credits_charged** <br>(gauge) | Número de créditos excedentes gastados que no se amortizan con créditos de CPU ganados, por lo que incurren en un cargo adicional.<br>_Se muestra como unidad_ |
| **aws.dax.cpuutilization** <br>(gauge) | Porcentaje de uso de la CPU del nodo o clúster.<br>_Se muestra como porcentaje_ |
| **aws.dax.cpuutilization.maximum** <br>(gauge) | Porcentaje máximo de uso de la CPU del nodo o clúster.<br>_Se muestra como porcentaje_ |
| **aws.dax.delete_item_request_count** <br>(count) | Número de solicitudes DeleteItem gestionadas por el nodo o clúster.<br>_Se muestra como solicitud_ |
| **aws.dax.error_request_count** <br>(count) | Número total de solicitudes que han dado lugar a un error de usuario notificado por el nodo o clúster.<br>_Se muestra como solicitud_ |
| **aws.dax.estimated_db_size** <br>(gauge) | Aproximación de la cantidad de datos almacenados en caché en la caché de elementos y en la caché de consultas por el nodo o clúster.<br>_Se muestra como bytes_ |
| **aws.dax.evicted_size** <br>(gauge) | Cantidad de datos que han sido desalojados por el nodo o clúster para hacer espacio a los nuevos datos solicitados.<br>_Se muestra como bytes_ |
| **aws.dax.evicted_size.maximum** <br>(gauge) | Mayor cantidad de datos que han sido desalojados por el nodo o clúster para hacer espacio a los nuevos datos solicitados.<br>_Se muestra como bytes_ |
| **aws.dax.failed_request_count** <br>(count) | Número total de solicitudes que han dado lugar a un error notificado por el nodo o clúster.<br>_Se muestra como solicitud_ |
| **aws.dax.fault_request_count** <br>(count) | Número total de solicitudes que han dado lugar a un error interno notificado por el nodo o clúster.<br>_Se muestra como solicitud_ |
| **aws.dax.get_item_request_count** <br>(count) | Número de solicitudes DeleteItem gestionadas por el nodo o clúster.<br>_Se muestra como solicitud_ |
| **aws.dax.item_cache_hits** <br>(count) | Número de veces que un elemento ha sido devuelto desde la caché por el nodo o clúster.<br>_Se muestra como acierto de caché_ |
| **aws.dax.item_cache_misses** <br>(count) | Número de veces que un elemento no ha estado en la caché del nodo o clúster y ha tenido que ser recuperado de DynamoDB.<br>_Se muestra como fallo_ |
| **aws.dax.network_bytes_in** <br>(count) | Número de bytes recibidos en todas las interfaces de red por el nodo o clúster.<br>_Se muestra como bytes_ |
| **aws.dax.network_bytes_out** <br>(count) | Número de bytes enviados en todas las interfaces de red por el nodo o clúster.<br>_Se muestra como bytes_ |
| **aws.dax.network_packets_in** <br>(count) | Número de paquetes recibidos en todas las interfaces de red por el nodo o clúster.<br>_Se muestra como paquete_ |
| **aws.dax.network_packets_out** <br>(count) | Número de paquetes enviados en todas las interfaces de red por el nodo o clúster.<br>_Se muestra como paquete_ |
| **aws.dax.put_item_request_count** <br>(count) | Número de solicitudes PutItem gestionadas por el nodo o clúster.<br>_Se muestra como solicitud_ |
| **aws.dax.query_cache_hits** <br>(count) | Número de veces que se ha devuelto un resultado de consulta desde la caché del nodo o clúster.<br>_Se muestra como acierto_ |
| **aws.dax.query_cache_misses** <br>(count) | Número de veces que el resultado de una consulta no ha estado en la caché del nodo o clúster y ha tenido que ser recuperado de DynamoDB.<br>_Se muestra como fallo_ |
| **aws.dax.query_request_count** <br>(count) | Número de solicitudes de consultas gestionadas por el nodo o clúster.<br>_Se muestra como solicitud_ |
| **aws.dax.scan_cache_hits** <br>(count) | Número de veces que un resultado de análisis ha sido devuelto desde la caché del nodo o clúster.<br>_Se muestra como acierto_ |
| **aws.dax.scan_cache_misses** <br>(count) | Número de veces que el resultado de un análisis no ha estado en la caché del nodo o clúster y ha tenido que ser recuperado de DynamoDB.<br>_Se muestra como fallo_ |
| **aws.dax.scan_request_count** <br>(count) | Número de solicitudes de análisis gestionadas por el nodo o clúster.<br>_Se muestra como solicitud_ |
| **aws.dax.throttled_request_count** <br>(count) | Número total de solicitudes limitadas por el nodo o clúster.<br>_Se muestra como solicitud_ |
| **aws.dax.total_request_count** <br>(count) | Número total de solicitudes gestionadas por el nodo o clúster.<br>_Se muestra como solicitud_ |
| **aws.dax.transact_get_items_count** <br>(count) | Número de solicitudes TransactGetItems gestionadas por el nodo o clúster.<br>_Se muestra como get_ |
| **aws.dax.transact_write_items_count** <br>(count) | Número de solicitudes TransactWriteItems gestionadas por el nodo o clúster.<br>_Se muestra como write_ |
| **aws.dax.update_item_request_count** <br>(count) | Número de solicitudes UpdateItem gestionadas por el nodo o clúster.<br>_Se muestra como solicitud_ |

### Eventos

La integración de Amazon DynamoDB Accelerator (DAX) no incluye eventos.

### Checks de servicio

La integración de Amazon DynamoDB Accelerator (DAX) no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).