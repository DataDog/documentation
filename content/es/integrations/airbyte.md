---
app_id: airbyte
app_uuid: 5994a02c-8754-40c3-9e99-a39ffc862b1c
assets:
  dashboards:
    airbyte_overview: assets/dashboards/airbyte_overview.json
  integration:
    auto_install: true
    metrics:
      check:
      - airbyte.metrics_reporter.est_num_metrics_emitted_by_reporter
      - airbyte.worker.attempt.created
      - airbyte.cron.jobs_run
      metadata_path: metadata.csv
      prefix: airbyte.
    process_signatures:
    - airbyte-cron
    - airbyte-metrics-reporter
    - airbyte-server
    - airbyte-workers
    - uvicorn connector_builder.entrypoint:app
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10386
    source_type_name: Airbyte
  monitors:
    Sync Jobs are taking a longer time than usual: assets/monitors/long_running_jobs.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- ia/ml
- almacenes de datos
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/airbyte/README.md
display_on_public_website: true
draft: false
git_integration_title: airbyte
integration_id: airbyte
integration_title: Airbyte
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: airbyte
public_title: Airbyte
short_description: Monitoriza el estado de tu despliegue Airbyte.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::IA/ML
  - Categoría::Almacenes de datos
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Tipo de datos enviados::Métricas
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitoriza el estado de tu despliegue Airbyte.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Airbyte
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Airbyte][1]. Las métricas se envían a Datadog a través de [DogStatsD][2].

## Configuración

### Instalación

Todos los pasos que se indican a continuación son necesarios para que la integración Airbyte funcione correctamente. Antes de empezar, [instala la versión del Datadog Agent][3] `>=6.17` o `>=7.17`, que incluye la función de asignación StatsD/DogStatsD.

### Configuración

1. Configura tu despliegue Airbyte [para enviar métricas a Datadog][4].
2. Actualiza el [archivo de configuración principal del Datadog Agent][5] `datadog.yaml` añadiendo la siguiente configuración:

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

3. [Reinicia el Agent][6] y Airbyte.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "airbyte" >}}


### Checks de servicio

El check Airbyte no incluye checks de servicio.

### Eventos

El check Airbyte no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://airbyte.com/
[2]: https://docs.datadoghq.com/es/developers/dogstatsd
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.airbyte.com/operator-guides/collecting-metrics/
[5]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://github.com/DataDog/integrations-core/blob/master/airbyte/metadata.csv
[8]: https://docs.datadoghq.com/es/help/