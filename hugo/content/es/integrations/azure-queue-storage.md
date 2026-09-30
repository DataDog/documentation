---
aliases:
- /es/integrations/azure_queue_storage
app_id: azure-queue-storage
categories:
- nube
- azure
custom_kind: integración
description: Rastrea las métricas clave de Azure Queue Storage.
media: []
title: Almacenamiento en cola Azure
---
## Información general

Azure Queue Storage es un servicio para almacenar grandes cantidades de mensajes a los que se puede acceder desde cualquier parte del mundo con llamadas autenticadas mediante HTTP o HTTPS.

Obtén métricas de Azure Queue Storage para:

- Visualizar el rendimiento de tu Queue Storage.
- Correlacionar el rendimiento de tu Queue Storage con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft y Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.storage_storageaccounts_queueservices.availability** <br>(gauge) | Porcentaje de disponibilidad para el servicio de almacenamiento o la operación de API especificada. La disponibilidad se calcula tomando el valor TotalBillableRequests y dividiéndolo por el número de solicitudes aplicables, incluidas las que produjeron errores inesperados. Todos los errores inesperados tienen como resultado una disponibilidad reducida para el servicio de almacenamiento o la operación de API especificada.<br>_Mostrado como porcentaje_. |
| **azure.storage_storageaccounts_queueservices.egress** <br>(count) | Cantidad de datos de salida. Este número incluye la salida a clientes externos desde Azure Storage, así como la salida dentro de Azure. Como resultado, este número no refleja la salida facturable.<br>_Mostrado como byte_ |
| **azure.storage_storageaccounts_queueservices.ingress** <br>(count) | Cantidad de datos de entrada, en bytes. Este número incluye la entrada de un cliente externo en Azure Storage, así como la entrada dentro de Azure.<br>_Mostrado como byte_ |
| **azure.storage_storageaccounts_queueservices.queue_capacity** <br>(gauge) | Cantidad de almacenamiento en cola utilizado por la cuenta de almacenamiento.<br>_Mostrado como byte_ |
| **azure.storage_storageaccounts_queueservices.queue_count** <br>(gauge) | Número de colas en la cuenta de almacenamiento.|
| **azure.storage_storageaccounts_queueservices.queue_message_count** <br>(gauge) | Número de mensajes de cola no caducados en la cuenta de almacenamiento.|
| **azure.storage_storageaccounts_queueservices.success_e2_e_latency** <br>(gauge) | Latencia media de extremo a extremo de las solicitudes realizadas correctamente a un servicio de almacenamiento o a la operación de API especificada, en milisegundos. Este valor incluye el tiempo de procesamiento necesario dentro de Azure Storage para leer la solicitud, enviar la respuesta y recibir el acuse de recibo de la respuesta.<br>_Mostrado en milisegundos_. |
| **azure.storage_storageaccounts_queueservices.success_server_latency** <br>(gauge) | Tiempo medio utilizado para procesar una solicitud correcta por Azure Storage. Este valor no incluye la latencia de red especificada en SuccessE2ELatency.<br>_Mostrado como milisegundo_. |
| **azure.storage_storageaccounts_queueservices.transactions** <br>(count) | Número de solicitudes realizadas a un servicio de almacenamiento o a la operación de API especificada. Este número incluye las solicitudes realizadas con éxito y las fallidas, así como las solicitudes que produjeron errores. Utiliza la dimensión ResponseType para el número de diferentes tipos de respuestas.|
| **azure.storage_storageaccounts_queueservices.count** <br>(gauge) | Count de Storage storageAccounts queueServices.|

### Eventos

La integración Azure Queue Storage no incluye eventos.

### Checks de servicio

La integración Azure Queue Storage no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).