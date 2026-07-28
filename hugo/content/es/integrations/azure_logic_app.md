---
app_id: azure-logic-app
app_uuid: 55fa5cbe-3eec-4be5-8210-fd805458d629
assets:
  dashboards:
    azure_logic_app: assets/dashboards/azure_logic_app.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.logic_workflows.run_latency
      metadata_path: metadata.csv
      prefix: azure.logic_workflows
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 181
    source_type_name: Azure Logic App
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- configuración y despliegue
- network
- azure
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_logic_app
integration_id: azure-logic-app
integration_title: Azure Logic App
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_logic_app
public_title: Azure Logic App
short_description: Logic App permite a los desarrolladores diseñar procesos que articulan
  la intención a través de un activador y una serie de pasos.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Configuration & Deployment
  - Category::Network
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Logic App permite a los desarrolladores diseñar procesos que articulan
    la intención a través de un activador y una serie de pasos.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Logic App
---

<!--  FUENTE https://github.com/DataDog/integrations-internal-core -->
## Información general

Microsoft Azure Logic App permite a los desarrolladores diseñar flujos de trabajo que articulen intenciones a través de un activador y una serie de pasos.

Obtén métricas de Azure Logic App para:

- Visualizar el rendimiento de tus flujos de Azure Logic App.
- Correlacionar el rendimiento de tus flujos de trabajo de Azure Logic App con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración de Microsoft Azure][1]. No se requiere ningún paso de instalación adicional.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_logic_app" >}}


### Eventos

La integración Azure Logic App no incluye eventos.

### Checks de servicio

La integración Azure Logic App no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_logic_app/azure_logic_app_metadata.csv
[3]: https://docs.datadoghq.com/es/help/