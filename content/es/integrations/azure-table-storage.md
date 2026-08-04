---
aliases:
- /es/integrations/azure_table_storage
app_id: azure-table-storage
categories:
- azure
- nube
- almacenes de datos
custom_kind: integración
description: Rastrea las métricas clave de Azure Table Storage.
media: []
title: Azure Table Storage
---
## Información general

Azure Table Storage es un almacén de clave-valor NoSQL para un desarrollo rápido mediante conjuntos de datos semiestructurados masivos.

Obtén métricas de Azure Table Storage para:

- Visualizar el rendimiento de tu Table Storage.
- Correlacionar el rendimiento de tu Table Storage con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft y Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.storage_storageaccounts_tableservices.availability** <br>(gauge) | El porcentaje de disponibilidad para el servicio de almacenamiento o la operación de API especificada. La disponibilidad se calcula tomando el valor TotalBillableRequests y dividiéndolo por el número de solicitudes aplicables, incluidas las que produjeron errores inesperados. Todos los errores inesperados dan como resultado una disponibilidad reducida para el servicio de almacenamiento o la operación de API especificada.<br>_Mostrado como porcentaje_. |
| **azure.storage_storageaccounts_tableservices.egress** <br>(gauge) | La cantidad de datos de salida en bytes. Este número incluye la salida desde un cliente externo a Azure Storage, así como la salida dentro de Azure. Como resultado, este número no refleja la salida facturable.<br>_Mostrado como byte_ |
| **azure.storage_storageaccounts_tableservices.ingress** <br>(gauge) | La cantidad de datos de entrada en bytes. Este número incluye la entrada desde un cliente externo a Azure Storage, así como la entrada dentro de Azure.<br>_Mostrado como byte_ |
| **azure.storage_storageaccounts_tableservices.success_e2_elatency** <br>(gauge) | Latencia media de extremo a extremo de las solicitudes realizadas correctamente a un servicio de almacenamiento o a la operación de API especificada en milisegundos. Este valor incluye el tiempo de procesamiento necesario dentro de Azure Storage para leer la solicitud, enviar la respuesta y recibir el acuse de recibo de la respuesta.<br>_Mostrado en milisegundos_. |
| **azure.storage_storageaccounts_tableservices.success_server_latency** <br>(gauge) | La latencia media utilizada por Azure Storage para procesar una solicitud correcta en milisegundos. Este valor no incluye la latencia de red especificada en AverageE2ELatency.<br>_Mostrado como milisegundo_. |
| **azure.storage_storageaccounts_tableservices.table_capacity** <br>(gauge) | La cantidad de almacenamiento utilizado por el servicio de Tabla de la cuenta de almacenamiento en bytes.<br>_Mostrado como byte_ |
| **azure.storage_storageaccounts_tableservices.table_count** <br>(count) | El número de tabla en el servicio de Tabla de la cuenta de almacenamiento.|
| **azure.storage_storageaccounts_tableservices.table_entity_count** <br>(count) | Número de entidades de tabla en el servicio de Tabla de la cuenta de almacenamiento.|
| **azure.storage_storageaccounts_tableservices.transactions** <br>(count) | Número de solicitudes realizadas a un servicio de almacenamiento o a la operación de API especificada. Este número incluye las solicitudes realizadas con éxito y las fallidas, así como las solicitudes que produjeron errores. Utiliza la dimensión ResponseType para el número de diferentes tipos de respuesta.|

### Eventos

La integración Azure Table Storage no incluye eventos.

### Checks de servicio

La integración Azure Table Storage no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).