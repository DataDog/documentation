---
aliases:
- /es/integrations/azure_file_storage
app_id: azure-filestorage
categories:
- azure
- nube
- almacenes de datos
custom_kind: integración
description: Rastrea las métricas clave de Azure File Storage.
media: []
title: Azure File Storage
---
## Información general

Azure File Storage ofrece recursos compartidos de archivos totalmente gestionados en la nube a los que se puede acceder mediante el protocolo estándar de la industria: Server Message Block (SMB).

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure File Storage.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.storage_storageaccounts_fileservices.availability** <br>(gauge) | El porcentaje de disponibilidad para el servicio de almacenamiento o la operación de API especificada. La disponibilidad se calcula tomando el valor TotalBillableRequests y dividiéndolo por el número de solicitudes aplicables, incluidas las que produjeron errores inesperados. Todos los errores inesperados tienen como resultado una disponibilidad reducida para el servicio de almacenamiento o la operación de API especificada.<br>_Se muestra como porcentaje_ |
| **azure.storage_storageaccounts_fileservices.egress** <br>(count) | La cantidad de datos de salida. Este número incluye la salida al cliente externo desde Azure Storage, así como la salida dentro de Azure. Como resultado, este número no refleja la salida facturable.<br>_Se muestra como byte_ |
| **azure.storage_storageaccounts_fileservices.file_capacity** <br>(gauge) | La cantidad de almacenamiento de archivos utilizado por la cuenta de almacenamiento.<br>_Se muestra como byte_ |
| **azure.storage_storageaccounts_fileservices.file_count** <br>(gauge) | El número de archivos en la cuenta de almacenamiento.|
| **azure.storage_storageaccounts_fileservices.file_share_capacity_quota** <br>(gauge) | El límite superior de la cantidad de almacenamiento que puede utilizar Azure Files Service en bytes.<br>_Se muestra como byte_ |
| **azure.storage_storageaccounts_fileservices.file_share_count** <br>(gauge) | El número de archivos compartidos en la cuenta de almacenamiento.|
| **azure.storage_storageaccounts_fileservices.file_share_provisioned_iops** <br>(gauge) | El número base de IOPS provisionadas para el recurso compartido de archivos premium en la cuenta de almacenamiento de archivos premium. Este número se calcula en función del tamaño provisionado (cuota) de la capacidad del recurso compartido.<br>_Se muestra como elemento_ |
| **azure.storage_storageaccounts_fileservices.file_share_snapshot_count** <br>(gauge) | El número de instantáneas presentes en el recurso compartido en Files Service de la cuenta de almacenamiento.|
| **azure.storage_storageaccounts_fileservices.file_share_snapshot_size** <br>(gauge) | La cantidad de almacenamiento utilizado por las instantáneas en File Service de la cuenta de almacenamiento en bytes.<br>_Se muestra como byte_ |
| **azure.storage_storageaccounts_fileservices.ingress** <br>(count) | La cantidad de datos de entrada, en bytes. Este número incluye la entrada de un cliente externo en Azure Storage, así como la entrada dentro de Azure.<br>_Se muestra como byte_ |
| **azure.storage_storageaccounts_fileservices.success_e2_e_latency** <br>(gauge) | Latencia media de extremo a extremo de las solicitudes realizadas correctamente a un servicio de almacenamiento o a la operación de API especificada, en milisegundos. Este valor incluye el tiempo de procesamiento necesario dentro de Azure Storage para leer la solicitud, enviar la respuesta y recibir el acuse de recibo de la respuesta.<br>_Se muestra en milisegundos_ |
| **azure.storage_storageaccounts_fileservices.success_server_latency** <br>(gauge) | El tiempo medio utilizado para procesar una solicitud correcta por Azure Storage. Este valor no incluye la latencia de red especificada en SuccessE2ELatency.<br>_Se muestra como milisegundo_ |
| **azure.storage_storageaccounts_fileservices.transactions** <br>(count) | Número de solicitudes realizadas a un servicio de almacenamiento o a la operación de API especificada. Este número incluye las solicitudes realizadas con éxito y las fallidas, así como las solicitudes que produjeron errores. Utiliza la dimensión ResponseType para el número de diferentes tipos de respuesta.<br>_Se muestra como solicitud_ |
| **azure.storage_storageaccounts_fileservices.count** <br>(gauge) | El recuento de todos los recursos de Azure File Storage|

### Eventos

La integración Azure File Storage no incluye eventos.

### Checks de servicio

La integración Azure File Storage no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).