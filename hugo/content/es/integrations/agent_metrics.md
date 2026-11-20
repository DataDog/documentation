---
app_id: datadog-agent
app_uuid: 4af17310-84ad-4bac-b05d-85917bc378cb
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: datadog.agent.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Métricas del Agent
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories: []
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/agent_metrics/README.md
display_on_public_website: true
draft: false
git_integration_title: agent_metrics
integration_id: datadog-agent
integration_title: Métricas del Agent
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: agent_metrics
public_title: Métricas del Agent
short_description: descripción de agent_metrics.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Offering::Integration
  configuration: README.md#Setup
  description: descripción de agent_metrics.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Métricas del Agent
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Obtén métricas internas del Datadog Agent para crear visualizaciones y monitores en Datadog.

**Nota:** La lista de métricas recopiladas por esta integración puede cambiar entre versiones secundarias del Agent. Es posible que dichos cambios no se mencionen en el registro de cambios del Agent.

## Configuración

### Instalación

La integración de métricas del Agent, basada en el check [go_expvar][1], está incluida en el paquete del [Datadog Agent][2], por lo que no necesitas instalar nada más en tus servidores.

### Configuración

1. Cambia el nombre del archivo [`go_expvar.d/agent_stats.yaml.example`][3], en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent][4], a `go_expvar.d/agent_stats.yaml`.

2. [Reinicia el Agent][5].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `go_expvar` en la sección Checks.

## Datos recopilados

### Métricas

La integración de métricas del Agent recopila las métricas definidas en [`agent_stats.yaml.example`][3].

### Eventos

La integración de métricas del Agent no incluye ningún evento.

### Checks de servicio

La integración de métricas del Agent no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][7].

[1]: https://docs.datadoghq.com/es/integrations/go_expvar/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/go_expvar.d/agent_stats.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/es/help/