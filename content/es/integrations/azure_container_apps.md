---
app_id: azure-container-apps
app_uuid: 4cfaeef2-96d5-4497-be6a-8d06169e8ddb
assets:
  dashboards:
    azure_container_apps: assets/dashboard/azure_container_apps.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.app_containerapps.requests
      metadata_path: metadata.csv
      prefix: azure.app_containerapps
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 800
    source_type_name: Azure Container Apps
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- nube
- rastreo
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_container_apps
integration_id: azure-container-apps
integration_title: Azure Container Apps
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_container_apps
public_title: Azure Container Apps
short_description: Realice un seguimiento de las métricas clave de Azure Contenedor
  Apps.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Azure
  - Category::Cloud
  - Categoría::Contenedores
  - Offering::Integration
  configuration: README.md#Setup
  description: Realice un seguimiento de las métricas clave de Azure Contenedor Apps.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Container Apps
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Container Apps te permite crear y desplegar aplicaciones y microservicios modernos utilizando contenedores serverless. Para obtener más información, consulta la [documentación de Microsoft][1] para Azure Container Apps.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Microsoft Azure][2].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure-container-apps" >}}


### Eventos

La integración Azure Container Apps no incluye eventos.

### Checks de servicio

La integración Azure Container Apps no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

[1]: https://docs.microsoft.com/en-us/azure/container-apps/overview
[2]: https://docs.datadoghq.com/es/integrations/azure/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_apps/azure_container_apps_metadata.csv
[4]: https://docs.datadoghq.com/es/help/