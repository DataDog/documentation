---
aliases:
- /es/integrations/amazon_opensearch_serverless
app_id: amazon-opensearch-serverless
categories:
- aws
- nube
- métricas
custom_kind: integración
description: Amazon OpenSearch Serverless es una configuración de búsqueda que se
  ajusta automáticamente para manejar las cargas de trabajo versátiles.
integration_version: 1.0.0
media: []
title: Amazon OpenSearch Serverless
---
## Información general

Amazon OpenSearch Serverless es una configuración serverless bajo demanda para OpenSearch, que proporciona una forma sencilla de consultar y analizar grandes volúmenes de datos. Las colecciones de OpenSearch Serverless ofrecen las mismas ventajas que los clústeres autogestionados, sin sumar configuración adicional y ajustes complejos.

Las colecciones vectoriales de búsqueda están diseñadas específicamente para búsquedas de similitudes de alto rendimiento en aplicaciones de Machine Learning (ML) e inteligencia artificial (IA) y pueden utilizarse para crear automáticamente bases de conocimiento en Bedrock.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuración

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que OpenSearch Serverless está habilitado en la pestaña **Metric Collection** (Recopilación de métricas).
1. Instala la [integración de Datadog y Amazon OpenSearch Serverless](https://app.datadoghq.com/integrations/amazon-opensearch-serverless).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.aoss.2xx** <br>(count) | El número de solicitudes 2XX a la colección.<br>_Se muestra como solicitud_ |
| **aws.aoss.3xx** <br>(count) | El número de solicitudes 3XX a la colección.<br>_Se muestra como solicitud_ |
| **aws.aoss.4xx** <br>(count) | El número de solicitudes 4XX a la colección.<br>_Se muestra como solicitud_ |
| **aws.aoss.5xx** <br>(count) | El número de solicitudes 5XX a la colección.<br>_Se muestra como solicitud_ |
| **aws.aoss.active_collection** <br>(gauge) | Indica si una colección está activa. Un valor de 1 significa que la colección está en estado ACTIVE (ACTIVO). Este valor se emite al crear correctamente una colección y permanece 1 hasta que se elimina la colección. La métrica no puede tener un valor 0.|
| **aws.aoss.deleted_documents** <br>(count) | El número total de documentos eliminados.|
| **aws.aoss.indexing_ocu** <br>(count) | El número de unidades de cómputo de OpenSearch (OCUs) utilizadas para ingerir datos de recopilación. Esta métrica se aplica a nivel de cuenta.|
| **aws.aoss.ingestion_data_rate** <br>(rate) | La tasa de indexación en GiB por segundo a una colección o índice. Esta métrica solo se aplica a las solicitudes de indexación masiva.<br>_Se muestra como gibibyte_ |
| **aws.aoss.ingestion_document_errors** <br>(count) | El número total de errores de documentos durante la ingesta para una colección o índice. Después de una solicitud de indexación masiva exitosa, los escritores procesan la solicitud y emiten errores para todos los documentos fallidos dentro de la solicitud.<br>_Se muestra como error_ |
| **aws.aoss.ingestion_document_rate** <br>(rate) | Velocidad por segundo a la que se ingestan documentos en una colección o índice. Esta métrica solo se aplica a las solicitudes de indexación masiva.|
| **aws.aoss.ingestion_request_errors** <br>(count) | El número total de errores de solicitud de indexación masiva a una colección. OpenSearch Serverless emite esta métrica cuando una solicitud de indexación masiva falla por cualquier motivo, como un problema de autenticación o disponibilidad.<br>_Se muestra como error_ |
| **aws.aoss.ingestion_request_latency** <br>(gauge) | La latencia, en segundos, de las operaciones de escritura masiva en una colección.<br>_Se muestra como segundo_ |
| **aws.aoss.ingestion_request_rate** <br>(count) | Número total de operaciones de escritura masiva recibidas por una colección.<br>_Se muestra como operación_ |
| **aws.aoss.ingestion_request_success** <br>(count) | Número total de operaciones de indexación realizadas con éxito en una colección.<br>_Se muestra como operación_ |
| **aws.aoss.search_ocu** <br>(count) | Número de unidades de cálculo de OpenSearch (OCU) utilizadas para buscar datos de recopilación. Esta métrica se aplica a nivel de cuenta.|
| **aws.aoss.search_request_errors** <br>(count) | Número total de errores de consulta de una colección.<br>_Se muestra como error_ |
| **aws.aoss.search_request_latency** <br>(gauge) | El tiempo medio, en milisegundos, que se tarda en completar una operación de búsqueda en una colección.<br>_Se muestra como milisegundo_ |
| **aws.aoss.search_request_rate** <br>(rate) | Número total de solicitudes de búsqueda por minuto en una colección.|
| **aws.aoss.searchable_documents** <br>(count) | Número total de documentos que se pueden buscar en una colección o índice.|
| **aws.aoss.storage_used_in_s3** <br>(gauge) | La cantidad, en bytes, de almacenamiento de Amazon S3 utilizada para los datos indexados.<br>_Se muestra como byte_ |

### Checks de servicio

Amazon OpenSearch Serverless no incluye ningún check de servicio.

### Eventos

Amazon OpenSearch Serverless no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).