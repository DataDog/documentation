---
aliases:
- /es/integrations/google_stackdriver_logging
app_id: google-stackdriver-logging
categories:
- nube
- google cloud
custom_kind: integración
description: Almacena, busca, analiza, monitoriza y alertar sobre datos de logs y
  eventos de Google Cloud.
further_reading:
- link: https://www.datadoghq.com/blog/collect-stackdriver-logs-with-datadog/
  tag: blog
  text: Recopilar logs de Google Stackdriver con Datadog
media: []
title: Generación de logs de Google StackDriver
---
## Información general

El producto Google Cloud Logging te permite almacenar, buscar, analizar, monitorizar y alertar sobre datos y eventos de logs de Google Cloud Platform.

Datadog extrae **métricas** de Google Cloud Logging para:

- Visualizar el rendimiento de tus logs de Google Cloud.
- Correlacionar el rendimiento de tus logs de Google Cloud con tus aplicaciones.

## Configuración

### Instalación

Las métricas de logs de Google Cloud se incluyen como parte de la [integración con Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/).. No se requieren pasos de instalación adicionales.

### Recopilación de logs

Los logs de Google Cloud se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.logging.billing.bytes_ingested** <br>(count) | Bytes de logs ingeridos.<br>_Se muestra en bytes_ |
| **gcp.logging.billing.monthly_bytes_ingested** <br>(gauge) | Bytes de logs del mes hasta la fecha ingeridos.<br>_Se muestra en bytes_ |
| **gcp.logging.byte_count** <br>(count) | Número de bytes en todas las entradas de log ingeridas.<br>_Se muestra en bytes_ |
| **gcp.logging.dropped_log_entry_count** <br>(count) | (Obsoleto) Número de entradas de log que no han contribuido a las métricas definidas por el usuario.<br>_Se muestra como entrada_ |
| **gcp.logging.excluded_byte_count** <br>(count) | Número de bytes en entradas de log que se han excluido.<br>_Se muestra en bytes_ |
| **gcp.logging.excluded_log_entry_count** <br>(count) | Número de entradas de log que se han excluido.<br>_Se muestra como entrada_ |
| **gcp.logging.exports.byte_count** <br>(count) | Número de bytes en entradas de log que se han exportado.<br>_Se muestra en bytes_ |
| **gcp.logging.exports.error_count** <br>(count) | Número de entradas de log que no se han podido exportar.<br>_Se muestra como entrada_ |
| **gcp.logging.exports.log_entry_count** <br>(count) | Número de entradas de log que se han exportado. <br>_Se muestra como entrada_ |
| **gcp.logging.log_entry_count** <br>(count) | Número de entradas de log que han contribuido a las métricas definidas por el usuario.<br>_Se muestra como entrada_ |
| **gcp.logging.logs_based_metrics_error_count** <br>(count) | Número de entradas de log que no han contribuido a las métricas definidas por el usuario.<br>_Se muestra como entrada_ |
| **gcp.logging.metric_throttled** <br>(gauge) | Indica si se están descartando puntos de métricas basadas en logs debido a que se han superado los límites de las series temporales.|
| **gcp.logging.time_series_count** <br>(gauge) | Estimación del recuento de series temporales activas para las métricas basadas en logs.|

**Nota**: Datadog recopila [métricas definidas por el usuario](https://cloud.google.com/logging/docs/logs-based-metrics/#user-defined_metrics_interface) de Google Cloud Logging con el prefijo `gcp.logging.user`.

### Eventos

La integración Google Cloud Logging no incluye eventos.

### Checks de servicio

La integración Google Cloud Logging no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}