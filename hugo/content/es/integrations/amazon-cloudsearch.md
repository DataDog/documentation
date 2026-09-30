---
aliases:
- /es/integrations/amazon_cloudsearch
app_id: amazon-cloudsearch
categories:
- aws
- nube
- recopilación de logs
custom_kind: integración
description: Servicio rentable gestionado en la nube para crear, gestionar y ampliar
  soluciones de búsqueda.
media: []
title: Amazon CloudSearch
---
## Información general

Amazon CloudSearch es un servicio administrado en la nube de AWS que hace que sea sencillo y rentable configurar, administrar y escalar una solución de búsqueda.

Habilita esta integración para ver en Datadog todas tus métricas de CloudSearch.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `CloudSearch` está habilitado en la pestaña `Metric Collection`.
1. Instala la integración [Datadog - Amazon CloudSearch](https://app.datadoghq.com/integrations/amazon-cloudsearch).

### Recopilación de logs

#### Activar logging

Configura Amazon CloudSearch para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_cloudsearch` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de Amazon CloudSearch en la consola de AWS:

   - [Añadir un activador manual en el bucket S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.cloudsearch.index_utilization** <br>(gauge) | Porcentaje de la capacidad de índice de la instancia de búsqueda que se ha utilizado.<br>_Se muestra como porcentaje_ |
| **aws.cloudsearch.partitions** <br>(gauge) | Número de particiones en las que se distribuye el índice.|
| **aws.cloudsearch.searchable_documents** <br>(gauge) | Número de documentos consultables en el índice de búsqueda del dominio.|
| **aws.cloudsearch.successful_requests** <br>(count) | Número de solicitudes de búsqueda procesadas con éxito por una instancia de búsqueda.|

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración de Amazon CloudSearch no incluye eventos.

### Checks de servicio

La integración de Amazon CloudSearch no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).