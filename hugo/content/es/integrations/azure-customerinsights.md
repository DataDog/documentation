---
aliases:
- /es/integrations/azure_customer_insights
app_id: azure-customerinsights
categories:
- nube
- azure
custom_kind: integración
description: Rastrea las métricas clave de Azure Customer Insights.
media: []
title: Azure Customer Insights
---
## Información general

Azure Customer Insights permite a las organizaciones de todos los tamaños reunir diversos conjuntos de datos y generar conocimientos e información para crear una visión holística de 360° de sus clientes.

Utiliza la integración de Azure con Datadog para recopilar métricas de Customer Insights.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.customerinsights_hubs.adla_job_for_standard_kpi_completed** <br>(gauge) | Trabajo de Adla para Kpi estándar completado en segundos<br>_Se muestra como segundo_ |
| **azure.customerinsights_hubs.adla_job_for_standard_kpi_failed** <br>(gauge) | Trabajo de Adla para Kpi estándar que falló en segundos<br>_Se muestra como segundo_ |
| **azure.customerinsights_hubs.adla_job_for_standard_kpi_time_out** <br>(gauge) | Trabajo de Adla para tiempo de espera de Kpi estándar en segundos<br>_Se muestra como segundo_ |
| **azure.customerinsights_hubs.dciapi_calls** <br>(count) | Llamadas a la API de Customer Insights|
| **azure.customerinsights_hubs.dciinteractions_per_month_count** <br>(count) | Interacciones por recuento mensual|
| **azure.customerinsights_hubs.dcikpis_count** <br>(count) | Recuento de KPI|
| **azure.customerinsights_hubs.dcimapping_import_operation_failed_lines** <br>(count) | Asignación de líneas de operación de importación fallidas|
| **azure.customerinsights_hubs.dcimapping_import_operation_runtime_in_seconds** <br>(gauge) | Asignación de tiempo de ejecución de operación de importación en segundos<br>_Se muestra como segundo_ |
| **azure.customerinsights_hubs.dcimapping_import_operation_successful_lines** <br>(count) | Asignación de líneas de operación de importación exitosas|
| **azure.customerinsights_hubs.dcimapping_import_operation_total_lines** <br>(count) | Asignación de líneas totales de operación de importación|
| **azure.customerinsights_hubs.dcioutbound_initial_kpi_export_failed** <br>(gauge) | Exportación de Kpi inicial saliente fallida<br>_Se muestra como segundo_ |
| **azure.customerinsights_hubs.dcioutbound_initial_kpi_export_succeeded** <br>(gauge) | Exportación de Kpi inicial saliente exitosa<br>_Se muestra como segundo_ |
| **azure.customerinsights_hubs.dcioutbound_initial_profile_export_duration_in_seconds** <br>(gauge) | Duración de la exportación de perfil inicial saliente en segundos<br>_Se muestra como segundo_ |
| **azure.customerinsights_hubs.dcioutbound_initial_profile_export_failed** <br>(gauge) | Exportación de perfil inicial saliente fallida<br>_Se muestra como segundo_ |
| **azure.customerinsights_hubs.dcioutbound_initial_profile_export_succeeded** <br>(gauge) | Exportación de perfil inicial saliente exitosa<br>_Se muestra como segundo_ |
| **azure.customerinsights_hubs.dcioutbound_kpi_export_duration** <br>(gauge) | Duración de la exportación de Kpi saliente<br>_Se muestra como segundo_ |
| **azure.customerinsights_hubs.dcioutbound_kpi_export_failed** <br>(count) | Exportación de Kpi saliente fallida|
| **azure.customerinsights_hubs.dcioutbound_kpi_export_started** <br>(gauge) | Exportación de Kpi saliente iniciada<br>_Se muestra como segundo_ |
| **azure.customerinsights_hubs.dcioutbound_kpi_export_succeeded** <br>(count) | Exportación de Kpi saliente exitosa|
| **azure.customerinsights_hubs.dcioutbound_kpi_record_count** <br>(gauge) | Recuento de registros de Kpi saliente<br>_Se muestra como segundo_ |
| **azure.customerinsights_hubs.dcioutbound_profile_export_count** <br>(gauge) | Recuento de exportación de perfiles saliente<br>_Se muestra como segundo_ |
| **azure.customerinsights_hubs.dcioutbound_profile_export_duration** <br>(gauge) | Duración de la exportación de perfiles saliente<br>_Se muestra como segundo_ |
| **azure.customerinsights_hubs.dcioutbound_profile_export_failed** <br>(count) | Exportación del perfil saliente fallida|
| **azure.customerinsights_hubs.dcioutbound_profile_export_succeeded** <br>(count) | Exportación de perfil saliente exitosa|
| **azure.customerinsights_hubs.dcipredictions_count** <br>(count) | Recuento de predicciones|
| **azure.customerinsights_hubs.dcipredictive_match_policies_count** <br>(count) | Recuento predictivo de coincidencias|
| **azure.customerinsights_hubs.dciprofiles_count** <br>(count) | Recuento de instancias de perfil|
| **azure.customerinsights_hubs.dcisegments_count** <br>(count) | Recuento de segmentos<br>_Se muestra como segmento_ |
| **azure.customerinsights_hubs.import_asavalues_failed** <br>(count) | Recuento de importaciones de valores ASA fallidas|
| **azure.customerinsights_hubs.import_asavalues_succeeded** <br>(count) | Recuento de importaciones de valores ASA exitosas|

### Eventos

La integración Azure Customer Insights no incluye eventos.

### Checks de servicio

La integración Azure Customer Insights no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).