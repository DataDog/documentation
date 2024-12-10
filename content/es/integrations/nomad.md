---
app_id: nomad
app_uuid: 245bf496-4185-4407-a0fd-d6ef6fc125bb
assets:
  dashboards:
    Nomad Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: nomad.client.host.cpu.user
      metadata_path: metadata.csv
      prefix: nomad
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10002
    source_type_name: Nomad
  monitors:
    Jobs are in pending status: assets/monitors/nomad_pending_jobs.json
    No Jobs Running: assets/monitors/nomad_no_jobs_running.json
    Nomad has excessive leadership losses: assets/monitors/nomad_excessive_leadership_losses.json
    Nomad heartbeats is low: assets/monitors/nomad_heartbeats_received.json
    Nomad jobs are failing: assets/monitors/nomad_job_is_failing.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Nomad
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- configuration & deployment
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/nomad/README.md
display_on_public_website: true
draft: false
git_integration_title: nomad
integration_id: nomad
integration_title: Nomad
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: nomad
public_title: Nomad
short_description: Programa e implementa aplicaciones fácilmente en cualquier escala
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Programa e implementa aplicaciones fácilmente en cualquier escala
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Nomad
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


![Dashboard de Nomad][1]

## Información general

Recopila métricas de tus clústeres de Nomad para:

- Visualizar y monitorizar el rendimiento de los clústeres
- Alertar sobre el estado y disponibilidad del clúster 

Los monitores recomendados están disponibles para recibir notificaciones sobre diferentes eventos de Nomad.

## Configuración

### Instalación

Nomad emite métricas a Datadog a través de DogStatsD. Para activar la integración de Nomad, [instala el Datadog Agent][2] en cada cliente y host de servidor.

### Configuración

Una vez instalado el Datadog Agent, añade una estrofa de telemetría a la configuración de Nomad para tus clientes y servidores:

```conf
telemetry {
  publish_allocation_metrics = true
  publish_node_metrics       = true
  datadog_address = "localhost:8125"
  disable_hostname = true
  collection_interval = "10s"
}
```

A continuación, recarga o reinicia el Agent del Nomad en cada host. Deberías empezar a ver que las métricas de Nomad fluyen a tu cuenta de Datadog.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "nomad" >}}


### Eventos

El check de Nomad no incluye ningún evento.

### Checks de servicio

El check de Nomad no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][4].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nomad/images/dashboard_overview.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-extras/blob/master/nomad/metadata.csv
[4]: https://docs.datadoghq.com/es/help/