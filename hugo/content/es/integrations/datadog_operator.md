---
app_id: datadog-operator
app_uuid: 8ea2f311-02dd-478b-9b3b-3fbef310d82c
assets:
  dashboards:
    Datadog Operator Overview: assets/dashboards/operator_overview.json
  integration:
    auto_install: true
    metrics:
      check: datadog.operator.go_info
      metadata_path: metadata.csv
      prefix: datadog.operator.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10341
    source_type_name: Datadog Operator
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- kubernetes
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/datadog_operator/README.md
display_on_public_website: true
draft: false
git_integration_title: datadog_operator
integration_id: datadog-operator
integration_title: Datadog Operator
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: datadog_operator
public_title: Datadog Operator
short_description: Monitorizar el Datadog Operator
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Kubernetes
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitorizar el Datadog Operator
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Datadog Operator
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza el [Datadog Operator][1] a través del Datadog Agent.

## Configuración

### Instalación

Consulta la documentación del [Datadog Operator][1].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "datadog_operator" >}}


### Eventos

La integración del Datadog Operator no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "datadog_operator" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

[1]: https://docs.datadoghq.com/es/containers/datadog_operator/
[2]: https://github.com/DataDog/integrations-core/blob/master/datadog_operator/metadata.csv
[3]: https://github.com/DataDog/integrations-core/blob/master/datadog_operator/assets/service_checks.json
[4]: https://docs.datadoghq.com/es/help/