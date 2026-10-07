---
aliases:
- /es/integrations/azure_logic_app
app_id: azure-logic-app
categories:
- nube
- configuración y despliegue
- red
- azure
custom_kind: integración
description: Logic App permite a los desarrolladores diseñar procesos que articulan
  la intención a través de un activador y una serie de pasos.
media: []
title: Azure Logic App
---
## Información general

Microsoft Azure Logic App permite a los desarrolladores diseñar flujos de trabajo que articulen intenciones a través de un activador y una serie de pasos.

Obtén métricas de Azure Logic App para:

- Visualizar el rendimiento de tus flujos de Azure Logic App.
- Correlacionar el rendimiento de tus flujos de trabajo de Azure Logic App con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración con Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No se requiere ningún paso de instalación adicional.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.logic_workflows.action_latency** <br>(gauge) | Latencia de las acciones completadas del proceso.<br>_Se muestra como segundo_ |
| **azure.logic_workflows.actions_completed** <br>(count) | Número de acciones del proceso completadas.<br>_Se muestra como evento_ |
| **azure.logic_workflows.actions_failed** <br>(count) | Número de acciones del proceso fallidas.<br>_Se muestra como evento_ |
| **azure.logic_workflows.actions_skipped** <br>(count) | Número de acciones del proceso omitidas.<br>_Se muestra como evento_ |
| **azure.logic_workflows.actions_started** <br>(count) | Número de acciones del proceso iniciadas.<br>_Se muestra como evento_ |
| **azure.logic_workflows.actions_succeeded** <br>(count) | Número de acciones del proceso realizadas con éxito.<br>_Se muestra como evento_ |
| **azure.logic_workflows.action_success_latency** <br>(gauge) | Latencia de las acciones del proceso realizadas con éxito.<br>_Se muestra en segundos_ |
| **azure.logic_workflows.action_throttled_events** <br>(count) | Número de eventos limitados de la acción del proceso.<br>_Se muestra como evento_ |
| **azure.logic_workflows.billable_action_executions** <br>(count) | Número de ejecuciones de acción del proceso que se facturan.<br>_Se muestra como evento_ |
| **azure.logic_workflows.billable_trigger_executions** <br>(count) | Número de ejecuciones del activador del proceso que se facturan.<br>_Se muestra como evento_ |
| **azure.logic_workflows.billing_usage_native_operation** <br>(count) | Número de ejecuciones de operaciones nativas que se facturan.<br>_Se muestra como evento_ |
| **azure.logic_workflows.billing_usage_standard_connector** <br>(count) | Número de ejecuciones del conector estándar que se facturan.<br>_Se muestra como evento_ |
| **azure.logic_workflows.billing_usage_storage_consumption** <br>(count) | Número de ejecuciones de consumo de almacenamiento que se facturan.<br>_Se muestra como evento_ |
| **azure.logic_workflows.run_failure_percentage** <br>(gauge) | Porcentaje de ejecuciones fallidas del proceso.<br>_Se muestra como porcentaje_ |
| **azure.logic_workflows.run_latency** <br>(gauge) | Latencia de las ejecuciones completas del proceso.<br>_Se muestra como segundo_ |
| **azure.logic_workflows.runs_cancelled** <br>(count) | Número de ejecuciones del proceso canceladas.<br>_Se muestra como evento_ |
| **azure.logic_workflows.runs_completed** <br>(count) | Número de ejecuciones del proceso completadas.<br>_Se muestra como evento_ |
| **azure.logic_workflows.runs_failed** <br>(count) | Número de ejecuciones fallidas del proceso.<br>_Se muestra como evento_ |
| **azure.logic_workflows.runs_started** <br>(count) | Número de ejecuciones del proceso iniciadas.<br>_Se muestra como evento_ |
| **azure.logic_workflows.runs_succeeded** <br>(count) | Número del proceso ejecutados con éxito.<br>_Se muestra como evento_ |
| **azure.logic_workflows.run_start_throttled_events** <br>(count) | Número de eventos de inicio de ejecución del proceso.<br>_Se muestra como evento_ |
| **azure.logic_workflows.run_success_latency** <br>(gauge) | Latencia de las ejecuciones sucesivas del proceso.<br>_Se muestra como segundo_ |
| **azure.logic_workflows.run_throttled_events** <br>(count) | Número de acción del proceso o eventos limitados del activador.<br>_Se muestra como evento_ |
| **azure.logic_workflows.total_billable_executions** <br>(count) | Número de ejecuciones del proceso que se facturan.<br>_Se muestra como evento_ |
| **azure.logic_workflows.trigger_fire_latency** <br>(gauge) | Latencia de los activadores del proceso activados.<br>_Se muestra en segundos_ |
| **azure.logic_workflows.trigger_latency** <br>(gauge) | Latencia de los activadores del proceso completados.<br>_Se muestra en segundos_ |
| **azure.logic_workflows.triggers_completed** <br>(count) | Número de activadores del proceso completadas.<br>_Se muestra como evento_ |
| **azure.logic_workflows.triggers_failed** <br>(count) | Número de activadores del proceso fallidos.<br>_Se muestra como evento_ |
| **azure.logic_workflows.triggers_fired** <br>(count) | Número de activadores del proceso activados.<br>_Se muestra como evento_ |
| **azure.logic_workflows.triggers_skipped** <br>(count) | Número de activadores del proceso omitidos.<br>_Se muestra como evento_ |
| **azure.logic_workflows.triggers_started** <br>(count) | Número de activadores del proceso iniciados.<br>_Se muestra como evento_ |
| **azure.logic_workflows.triggers_succeeded** <br>(count) | Número de activadores del proceso que han tenido éxito.<br>_Se muestra como evento_ |
| **azure.logic_workflows.trigger_success_latency** <br>(gauge) | Latencia de los activadores sucesivos del proceso.<br>_Se muestra en segundos_ |
| **azure.logic_workflows.trigger_throttled_events** <br>(count) | Número de eventos limitados de activadores del proceso.<br>_Se muestra como evento_ |

### Eventos

La integración Azure Logic App no incluye eventos.

### Checks de servicio

La integración Azure Logic App no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).