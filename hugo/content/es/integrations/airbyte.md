---
app_id: airbyte
categories:
- ia/ml
- almacenes de datos
custom_kind: integración
description: Monitoriza el estado de tu despliegue Airbyte.
integration_version: 1.0.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: Airbyte
---
## Información general

Este check monitoriza [Airbyte](https://airbyte.com/). Las métricas se envían a Datadog a través de [DogStatsD](https://docs.datadoghq.com/developers/dogstatsd).

## Configuración

### Instalación

Todos los pasos que se indican a continuación son necesarios para que la integración de Airbyte funcione correctamente. Antes de empezar, [instala la versión del Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) `>=6.17` o `>=7.17`, que incluye la función de asignación de StatsD/DogStatsD.

### Configuración

1. Configura tu despliegue de Airbyte [para enviar métricas a Datadog](https://docs.airbyte.com/operator-guides/collecting-metrics/).
1. Actualiza el [archivo de configuración principal del Datadog Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/) `datadog.yaml` añadiendo la siguiente configuración:

```yaml
dogstatsd_mapper_profiles:
  - name: airbyte_worker
    prefix: "worker."
    mappings:
      - match: "worker.temporal_workflow_*"
        name: "airbyte.worker.temporal_workflow.$1"
      - match: "worker.worker_*"
        name: "airbyte.worker.$1"
      - match: "worker.state_commit_*"
        name: "airbyte.worker.state_commit.$1"
      - match: "worker.job_*"
        name: "airbyte.worker.job.$1"
      - match: "worker.attempt_*"
        name: "airbyte.worker.attempt.$1"
      - match: "worker.activity_*"
        name: "airbyte.worker.activity.$1"
      - match: "worker.*"
        name: "airbyte.worker.$1"
  - name: airbyte_cron
    prefix: "cron."
    mappings:
      - match: "cron.cron_jobs_run"
        name: "airbyte.cron.jobs_run"
      - match: "cron.*"
        name: "airbyte.cron.$1"
  - name: airbyte_metrics_reporter
    prefix: "metrics-reporter."
    mappings:
      - match: "metrics-reporter.*"
        name: "airbyte.metrics_reporter.$1"
  - name: airbyte_orchestrator
    prefix: "orchestrator."
    mappings:
      - match: "orchestrator.*"
        name: "airbyte.orchestrator.$1"
  - name: airbyte_server
    prefix: "server."
    mappings:
      - match: "server.*"
        name: "airbyte.server.$1"
  - name: airbyte_general
    prefix: "airbyte."
    mappings:
      - match: "airbyte.worker.temporal_workflow_*"
        name: "airbyte.worker.temporal_workflow.$1"
      - match: "airbyte.worker.worker_*"
        name: "airbyte.worker.$1"
      - match: "airbyte.worker.state_commit_*"
        name: "airbyte.worker.state_commit.$1"
      - match: "airbyte.worker.job_*"
        name: "airbyte.worker.job.$1"
      - match: "airbyte.worker.attempt_*"
        name: "airbyte.worker.attempt.$1"
      - match: "airbyte.worker.activity_*"
        name: "airbyte.worker.activity.$1"
      - match: "airbyte.cron.cron_jobs_run"
        name: "airbyte.cron.jobs_run"
```

3. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent) y Airbyte.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **airbyte.cron.jobs_run** <br>(count) | Número de ejecuciones CRON por tipo de CRON.|
| **airbyte.cron.workflows_healed** <br>(count) | Número de flujos de trabajo que el CRON autorreparable ha solucionado.|
| **airbyte.metrics_reporter.est_num_metrics_emitted_by_reporter** <br>(count) | Estimación de las métricas emitidas por el informador en el último intervalo. Se trata de una estimación, ya que el recuento no es preciso.|
| **airbyte.metrics_reporter.num_orphan_running_jobs** <br>(gauge) | Número de trabajos notificados como en ejecución que están asociados a una conexión inactiva u obsoleta.<br>_Se muestra como trabajo_ |
| **airbyte.metrics_reporter.num_pending_jobs** <br>(gauge) | Número de trabajos pendientes.<br>_Se muestra como trabajo_ |
| **airbyte.metrics_reporter.num_running_jobs** <br>(gauge) | Número de trabajos en ejecución.<br>_Se muestra como trabajo_ |
| **airbyte.metrics_reporter.num_total_scheduled_syncs_last_day** <br>(gauge) | Número total de trabajos de sincronización ejecutados en el último día.<br>_Se muestra como trabajo_ |
| **airbyte.metrics_reporter.num_unusually_long_syncs** <br>(gauge) | Número de trabajos de sincronización inusualmente largos en comparación con su rendimiento histórico.<br>_Se muestra como trabajo_ |
| **airbyte.metrics_reporter.oldest_pending_job_age_secs** <br>(gauge) | La edad del trabajo pendiente más antiguo en segundos.<br>_Se muestra como segundo_ |
| **airbyte.metrics_reporter.oldest_running_job_age_secs** <br>(gauge) | La edad del trabajo más antiguo en segundos.<br>_Se muestra como segundo_ |
| **airbyte.orchestrator.source_hearbeat_failure** <br>(count) | Recuento de fallos de replicación debidos a la falta de un latido en la fuente.|
| **airbyte.server.breaking_change_detected** <br>(count) | Recuento de cambios de esquema de ruptura detectados.|
| **airbyte.server.schema_change_auto_propagated** <br>(count) | Recuento de los cambios de esquema que se han propagado.|
| **airbyte.worker.activity.check_connection** <br>(count) | El recuento de la actividad de check de conexión iniciada.<br>_Se muestra como conexión_ |
| **airbyte.worker.activity.dbt_transformation** <br>(count) | Se inicia el recuento de la actividad de transformación DBT.|
| **airbyte.worker.activity.discover_catalog** <br>(count) | El recuento de la actividad de detección de catálogos iniciada.|
| **airbyte.worker.activity.failure** <br>(count) | El recuento de fallos de la actividad. Etiquetado por actividad.|
| **airbyte.worker.activity.normalization** <br>(count) | Se inicia el recuento de la actividad de normalización.|
| **airbyte.worker.activity.normalization_summary_check** <br>(count) | El recuento de la actividad de check de resumen de normalización iniciada.|
| **airbyte.worker.activity.refresh_schema** <br>(count) | Recuento de actividades de actualización de esquemas iniciadas.|
| **airbyte.worker.activity.replication** <br>(count) | El recuento de la actividad de replicación iniciada.|
| **airbyte.worker.activity.spec** <br>(count) | El recuento de la actividad de especificaciones iniciada.|
| **airbyte.worker.activity.submit_check_destination_connection** <br>(count) | El recuento de envío de actividades de check de conexión iniciadas.<br>_Se muestra como conexión_ |
| **airbyte.worker.activity.submit_check_source_connection** <br>(count) | El recuento de envío de actividades de check de conexión iniciadas.<br>_Se muestra como conexión_ |
| **airbyte.worker.activity.webhook_operation** <br>(count) | El recuento de la actividad de operación de webhook iniciada.|
| **airbyte.worker.attempt.completed** <br>(count) | El recuento de nuevos intentos completados. Se emite uno por intento.<br>_Se muestra como intento_ |
| **airbyte.worker.attempt.created** <br>(count) | El recuento de nuevos intentos creados. Se emite uno por intento.<br>_Se muestra como intento_ |
| **airbyte.worker.attempt.created_by_release_stage** <br>(count) | El recuento de nuevos intentos creados. Los intentos se cuentan dos veces, ya que se etiquetan mediante la fase de publicación.<br>_Se muestra como intento_ |
| **airbyte.worker.attempt.failed_by_failure_origin** <br>(count) | El recuento de orígenes de fallo que tiene un intento fallido. Dado que un fallo puede tener múltiples orígenes, un mismo fallo puede contarse más de una vez. Etiquetado por origen de fallo y tipo de fallo.<br>_Se muestra como intento_ |
| **airbyte.worker.attempt.failed_by_release_stage** <br>(count) | El recuento de intentos fallidos. Los intentos se cuentan dos veces, ya que está etiquetado por fase de la versión.<br>_Se muestra como intento_ |
| **airbyte.worker.attempt.succeeded_by_release_stage** <br>(count) | Recuento de intentos realizados con éxito. Los intentos se cuentan dos veces, ya que está etiquetado por la fase de la versión.<br>_Se muestra como intento_ |
| **airbyte.worker.destination_buffer_size** <br>(gauge) | Tamaño de la cola del búfer de destino del worker de replicación.<br>_Se muestra como registro_ |
| **airbyte.worker.destination_message_read** <br>(count) | El recuento de mensajes leídos desde el destino.<br>_Se muestra como mensaje_ |
| **airbyte.worker.destination_message_sent** <br>(count) | El recuento de mensajes enviados al destino.<br>_Se muestra como mensaje_ |
| **airbyte.worker.job.cancelled_by_release_stage** <br>(count) | Recuento de trabajos cancelados. Los trabajos se cuentan dos veces, ya que se etiquetan mediante la fase de publicación.<br>_Se muestra como trabajo_ |
| **airbyte.worker.job.created_by_release_stage** <br>(count) | Recuento de nuevos trabajos creados. Los trabajos se cuentan dos veces, ya que están etiquetados por fase de publicación.<br>_Se muestra como trabajo_ |
| **airbyte.worker.job.failed_by_release_stage** <br>(count) | El recuento de fallos de trabajo. Los trabajos se cuentan dos veces, ya que está etiquetado por la fase de publicación.<br>_Se muestra como trabajo_ |
| **airbyte.worker.job.succeeded_by_release_stage** <br>(count) | El recuento de trabajos exitosos. Los trabajos se cuentan dos veces, ya que están etiquetados por la fase de publicación.<br>_Se muestra como trabajo_ |
| **airbyte.worker.notifications_sent** <br>(count) | Número de notificaciones enviadas.|
| **airbyte.worker.replication_bytes_synced** <br>(count) | Número de bytes sincronizados durante la replicación.<br>_Se muestra como byte_ |
| **airbyte.worker.replication_records_synced** <br>(count) | Número de registros sincronizados durante la replicación.<br>_Se muestra como registro_ |
| **airbyte.worker.source_buffer_size** <br>(gauge) | El tamaño de la cola del búfer del worker de replicación fuente.<br>_Se muestra como registro_ |
| **airbyte.worker.source_message_read** <br>(count) | El recuento de mensajes leídos de la fuente.<br>_Se muestra como mensaje_ |
| **airbyte.worker.state_commit.close_successful** <br>(count) | Número de finales a conexión que salen con una descarga de estado final exitosa.|
| **airbyte.worker.state_commit.not_attempted** <br>(count) | Número de intentos de estados confirmados abandonados debido a una finalización anticipada.<br>_Se muestra como intento_ |
| **airbyte.worker.temporal_workflow.attempt** <br>(count) | El recuento de intentos de proceso temporales.<br>_Se muestra como intento_ |
| **airbyte.worker.temporal_workflow.failure** <br>(count) | Recuento de fallos de proceso temporales.|
| **airbyte.worker.temporal_workflow.success** <br>(count) | El recuento de sincronizaciones de proceso temporales con éxito.<br>_Se muestra como éxito_ |

### Checks de servicio

El check Airbyte no incluye checks de servicio.

### Eventos

El check Airbyte no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).