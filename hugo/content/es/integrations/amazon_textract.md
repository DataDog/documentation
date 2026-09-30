---
app_id: amazon_textract
categories:
- automatización
- aws
- nube
- recopilación de logs
- ia/ml
custom_kind: integración
description: Rastrea métricas clave de Amazon Textract.
title: Amazon Textract
---
## Información general

Amazon Textract es un servicio de machine learning que extrae de manera automática texto, escritura a mano y datos de documentos escaneados.

Habilita esta integración para ver todas tus métricas de Amazon Textract en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Textract` está activado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y Amazon Textract](https://app.datadoghq.com/integrations/amazon-textract).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.textract.response_time** <br>(gauge) | El tiempo en milisegundos para que Amazon Textract calcule la respuesta.<br>_Se muestra como milisegundo_ |
| **aws.textract.response_time.samplecount** <br>(count) | El número total de solicitudes (tanto fallidas como exitosas).|
| **aws.textract.server_error_count** <br>(count) | La suma del número de errores del servidor.|
| **aws.textract.successful_request_count** <br>(count) | La suma del número de solicitudes aceptadas.|
| **aws.textract.throttled_count** <br>(count) | La suma del número de solicitudes limitadas.|
| **aws.textract.user_error_count** <br>(count) | La suma del número de errores del usuario.|

### Eventos

La integración de Amazon Textract no incluye eventos.

### Checks de servicio

La integración de Amazon Textract no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).