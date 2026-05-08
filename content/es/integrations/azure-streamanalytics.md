---
aliases:
- /es/integrations/azure_stream_analytics
app_id: azure-streamanalytics
categories:
- nube
- azure
custom_kind: integración
description: Rastrea las métricas clave de Azure Stream Analytics.
media: []
title: Azure Stream Analytics
---
## Información general

Azure Stream Analytics es un motor de procesamiento de eventos que te permite examinar grandes volúmenes de transmisión de datos procedentes de dispositivos.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Stream Analytics.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft y Azure](https://docs.datadoghq.com/integrations/azure/). No hay más pasos de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.streamanalytics_streamingjobs.aml_callout_failed_requests** <br>(count) | Solicitudes de función fallidas<br>_Mostrado como solicitud_ |
| **azure.streamanalytics_streamingjobs.aml_callout_input_events** <br>(count) | Eventos de función<br>_Mostrado como evento_ |
| **azure.streamanalytics_streamingjobs.aml_callout_requests** <br>(count) | Solicitudes de función<br>_Mostrado como solicitud_ |
| **azure.streamanalytics_streamingjobs.backlogged_input_events** <br>(count) | Número de eventos de entrada que están pendientes.<br>_Mostrado como evento_ |
| **azure.streamanalytics_streamingjobs.conversion_errors** <br>(count) | Errores de conversión de datos<br>_Mostrado como error_ |
| **azure.streamanalytics_streamingjobs.dropped_or_adjusted_events** <br>(count) | Eventos fuera de servicio<br>_Mostrado como evento_ |
| **azure.streamanalytics_streamingjobs.early_input_events** <br>(count) | Eventos de entrada temprana<br>_Mostrado como evento_ |
| **azure.streamanalytics_streamingjobs.errors** <br>(count) | Errores de tiempo de ejecución<br>_Mostrado como error_ |
| **azure.streamanalytics_streamingjobs.input_deserialization_errors** <br>(count) | Errores de deserialización de entrada<br>_Mostrado como error_ |
| **azure.streamanalytics_streamingjobs.input_event_bytes** <br>(gauge) | Bytes de eventos de entrada<br>_Mostrado como byte_ |
| **azure.streamanalytics_streamingjobs.input_events** <br>(count) | Eventos de entrada<br>_Mostrado como evento_ |
| **azure.streamanalytics_streamingjobs.input_sources_received** <br>(count) | Número de eventos recibidos por el job (generic).<br>_Mostrado como evento_ |
| **azure.streamanalytics_streamingjobs.late_input_events** <br>(count) | Eventos de entrada tardía<br>_Mostrado como evento_ |
| **azure.streamanalytics_streamingjobs.output_events** <br>(count) | Eventos de salida<br>_Mostrado como evento_ |
| **azure.streamanalytics_streamingjobs.resource_utilization** <br>(gauge) | Porcentaje de utilización de SU<br>_Mostrado como porcentaje_. |
| **azure.streamanalytics_streamingjobs.watermark_delay** <br>(rate) | Retraso de la marca de agua<br>_Mostrado como segundo_ |

### Eventos

La integración Azure Stream Analytics no incluye eventos.

### Checks de servicio

La integración Azure Stream Analytics no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Pontee en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).