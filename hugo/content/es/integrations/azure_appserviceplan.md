---
app_id: azure-appserviceplan
app_uuid: a44b7b0f-fd60-4a5a-8a18-03498111db31
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.web_serverfarms.cpu_percentage
      metadata_path: metadata.csv
      prefix: azure.web_serverfarms
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 279
    source_type_name: Azure App Service Plan
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- azure
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_appserviceplan
integration_id: azure-appserviceplan
integration_title: Azure App Service Plan
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_appserviceplan
public_title: Azure App Service Plan
short_description: Rastrea las métricas principales de Azure App Service Plan.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea las métricas principales de Azure App Service Plan.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure App Service Plan
---

<!--  FUENTE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure App Service Plan define un conjunto de recursos informáticos utilizados para ejecutar una aplicación web, similar a una granja de servidores en el alojamiento web tradicional. 

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure App Service Plan.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración de Microsoft Azure][1]. No se requiere ningún paso de instalación adicional.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_appserviceplan" >}}


### Eventos

La integración Azure App Service Plan no incluye ningún evento.

### Checks de servicio

La integración Azure App Service Plan no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_service_plan/azure_app_service_plan_metadata.csv
[3]: https://docs.datadoghq.com/es/help/