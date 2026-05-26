---
aliases:
- /es/integrations/google_cloud_apis
app_id: google-cloud-apis
categories:
- google cloud
- métricas
- nube
custom_kind: integración
description: Las API Google Cloud te permiten acceder a los productos de la Google
  Cloud Platform desde tu código.
integration_version: 1.0.0
media: []
title: API Google Cloud
---
## Información general

Las API Google Cloud te permiten acceder a los productos de la Google Cloud Platform desde tu código.

Utiliza la integración de Google Cloud Platform con Datadog para recopilar métricas de las API Google Cloud.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No hay más pasos de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.serviceruntime.api.request_count** <br>(count) | El recuento de solicitudes completadas.<br>_Se muestra como solicitud_ |
| **gcp.serviceruntime.api.request_latencies.avg** <br>(gauge) | Distribución de las latencias en segundos para las solicitudes que no son de flujo continuo.<br>_Se muestra en segundos_ |
| **gcp.serviceruntime.api.request_latencies.samplecount** <br>(count) | Recuento de muestras de latencias de solicitud de API<br>_Se muestra en segundos_ |
| **gcp.serviceruntime.api.request_latencies.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado de las latencias de las solicitudes de API<br>_Se muestra como segundo_ |
| **gcp.serviceruntime.api.request_latencies_backend.avg** <br>(gauge) | Distribución de las latencias de backend en segundos para las solicitudes que no son de flujo continuo.<br>_Se muestra como segundo_ |
| **gcp.serviceruntime.api.request_latencies_backend.samplecount** <br>(count) | Recuento de muestras de latencias de solicitudes de backend de API<br>_Se muestra como segundo_ |
| **gcp.serviceruntime.api.request_latencies_backend.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado de las latencias de las solicitudes del backend de la API<br>_Se muestra como segundo_ |
| **gcp.serviceruntime.api.request_latencies_overhead.avg** <br>(gauge) | Distribución de las latencias de las solicitudes en segundos para las solicitudes que no son de flujo continuo, excluido el backend.<br>_Se muestra como segundo_ |
| **gcp.serviceruntime.api.request_latencies_overhead.samplecount** <br>(count) | Recuento de muestras de latencias de solicitudes de sobrecarga de la API<br>_Se muestra en segundos_ |
| **gcp.serviceruntime.api.request_latencies_overhead.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado de las latencias de las solicitudes de sobrecarga de la API<br>_Se muestra como segundo_ |
| **gcp.serviceruntime.api.request_sizes.avg** <br>(gauge) | Distribución del tamaño de las solicitudes en bytes registrados al finalizar la solicitud.<br>_Se muestra como byte_ |
| **gcp.serviceruntime.api.request_sizes.samplecount** <br>(count) | Recuento de muestras para tamaños de solicitud de API<br>_Se muestra como byte_ |
| **gcp.serviceruntime.api.request_sizes.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado para los tamaños de solicitud de API<br>_Se muestra como byte_ |
| **gcp.serviceruntime.api.response_sizes.avg** <br>(gauge) | Distribución de los tamaños de respuesta en bytes registrados al finalizar la solicitud.<br>_Se muestra como byte_ |
| **gcp.serviceruntime.api.response_sizes.samplecount** <br>(count) | Recuento de muestras para tamaños de respuesta<br>_Se muestra como byte_ |
| **gcp.serviceruntime.api.response_sizes.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado para tamaños de respuesta<br>_Se muestra como byte_ |
| **gcp.serviceruntime.quota.allocation.usage** <br>(gauge) | La cuota de asignación total consumida.|
| **gcp.serviceruntime.quota.exceeded** <br>(gauge) | El error se produjo cuando se superó el límite de cuota.|
| **gcp.serviceruntime.quota.limit** <br>(gauge) | El límite de la cuota.|
| **gcp.serviceruntime.quota.rate.net_usage** <br>(count) | La cuota de tasa total consumida.|

### Eventos

La integración de las API Google Cloud no incluyen eventos.

### Checks de servicio

La integración de las API Google Cloud no incluyen checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).