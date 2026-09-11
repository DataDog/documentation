---
aliases:
- /es/integrations/azure_blob_storage
app_id: azure-blob-storage
categories:
- azure
- nube
- almacenes de datos
custom_kind: integración
description: Rastrea las métricas clave de Azure Blob Storage.
media: []
title: Azure Blob Storage
---
## Información general

Azure Blob Storage es la solución de almacenamiento de objetos de Microsoft para la nube. Blob Storage está optimizado para almacenar cantidades masivas de datos no estructurados. Obtén métricas de Azure Blob Storage para:

- Visualizar el rendimiento de tu Blob Storage.
- Correlacionar el rendimiento de tu Blob Storage con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración de Microsoft Azure] primero (https://docs.datadoghq.com/integrations/azure/). No es necesario ningún otro paso de instalación adicional.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.storage_storageaccounts_blobservices.availability** <br>(gauge) | El porcentaje de disponibilidad para el servicio de almacenamiento o la operación de API especificada. La disponibilidad se calcula tomando el valor TotalBillableRequests y dividiéndolo por el número de solicitudes aplicables, incluidas las que produjeron errores inesperados. Todos los errores inesperados dan como resultado una disponibilidad reducida para el servicio de almacenamiento o la operación de API especificada.<br>_Se muestra como porcentaje_ |
| **azure.storage_storageaccounts_blobservices.blob_capacity** <br>(gauge) | La cantidad de almacenamiento utilizado por el servicio Blob de la cuenta de almacenamiento en bytes.<br>_Se muestra como byte_ |
| **azure.storage_storageaccounts_blobservices.blob_count** <br>(count) | El número de Blob en el servicio Blob de la cuenta de almacenamiento.|
| **azure.storage_storageaccounts_blobservices.container_count** <br>(count) | El número de contenedores en el servicio Blob de la cuenta de almacenamiento.|
| **azure.storage_storageaccounts_blobservices.egress** <br>(gauge) | La cantidad de datos de salida en bytes. Este número incluye la salida desde un cliente externo a Azure Storage, así como la salida dentro de Azure. Como resultado, este número no refleja la salida facturable.<br>_Se muestra como byte_ |
| **azure.storage_storageaccounts_blobservices.ingress** <br>(gauge) | La cantidad de datos de entrada en bytes. Este número incluye la entrada desde un cliente externo a Azure Storage, así como la entrada dentro de Azure.<br>_Se muestra como byte_ |
| **azure.storage_storageaccounts_blobservices.success_e2_elatency** <br>(gauge) | Latencia media de extremo a extremo de las solicitudes realizadas correctamente a un servicio de almacenamiento o a la operación de API especificada en milisegundos. Este valor incluye el tiempo de procesamiento necesario dentro de Azure Storage para leer la solicitud, enviar la respuesta y recibir el acuse de recibo de la respuesta.<br>_Se muestra en milisegundos_ |
| **azure.storage_storageaccounts_blobservices.success_server_latency** <br>(gauge) | La latencia media utilizada por Azure Storage para procesar una solicitud correcta en milisegundos. Este valor no incluye la latencia de red especificada en AverageE2ELatency.<br>_Se muestra en milisegundos_ |
| **azure.storage_storageaccounts_blobservices.transactions** <br>(count) | Número de solicitudes realizadas a un servicio de almacenamiento o a la operación de API especificada. Este número incluye las solicitudes realizadas con éxito y las fallidas, así como las que produjeron errores. Utiliza la dimensión ResponseType para el número de diferentes tipos de respuesta.|
| **azure.storage_storageaccounts_blobservices.blob_provisioned_size** <br>(gauge) | La cantidad de almacenamiento aprovisionado en el servicio Blob de la cuenta de almacenamiento en bytes.<br>_Se muestra como byte_ |
| **azure.storage_storageaccounts_blobservices.index_capacity** <br>(gauge) | Cantidad de almacenamiento utilizada por el índice jerárquico Azure Data Lake Storage Gen2.<br>_Se muestra como byte_ |

### Eventos

La integración Azure Blob Storage no incluye eventos.

### Checks de servicio

La integración Azure Blob Storage no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).