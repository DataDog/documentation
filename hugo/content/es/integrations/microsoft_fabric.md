---
app_id: microsoft-fabric
app_uuid: 6bc8105a-8d3a-4d3a-9cf2-d28d78e49b31
assets:
  dashboards:
    microsoft-fabric: assets/dashboards/microsoft_fabric_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.synapse_workspaces_sqlpools.active_queries
      metadata_path: metadata.csv
      prefix: azure.synapse_workspaces
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 18661396
    source_type_name: Microsoft Fabric
  monitors:
    Synapse DWU Utilization: assets/monitors/azure_fabric_dwu_usage_high.json
    Synapse SQL CPU Utilization: assets/monitors/azure_fabric_cpu_usage_high.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- ai/ml
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: microsoft_fabric
integration_id: microsoft-fabric
integration_title: Microsoft Fabric
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: microsoft_fabric
public_title: Microsoft Fabric
short_description: Utiliza la integración de Datadog para recopilar métricas de Azure
  Synapse en Microsoft Fabric.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::AI/ML
  - Category::Metrics
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Utiliza la integración de Datadog para recopilar métricas de Azure
    Synapse en Microsoft Fabric.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Microsoft Fabric
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-internal-core -->


## Información general

Microsoft Fabric es una plataforma integral de datos y análisis para empresas. Fabric integra cargas de trabajo como Synapse Data Engineering, Synapse Warehousing y Power BI en una única solución SaaS. Utiliza la integración de Datadog para recopilar métricas de Azure Synapse en Microsoft Fabric.

## Configuración

### Instalación
Si aún no lo has hecho, configura primero la [integración de Microsoft Azure][1]. No hay otros pasos de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "microsoft_fabric" >}}


### Checks de servicio

La integración de Microsoft Fabric no incluye ningún check de servicio.

### Eventos

La integración de Microsoft Fabric no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog][3].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorizar Microsoft Fabric con Datadog][4]

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/integrations-internal-core/blob/main/microsoft_fabric/metadata.csv
[3]: https://docs.datadoghq.com/es/help/
[4]: https://www.datadoghq.com/blog/monitor-microsoft-fabric-datadog/