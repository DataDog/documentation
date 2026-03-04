---
app_id: azure-appserviceenvironment
app_uuid: 918d0126-a4b0-4d8d-b38b-718c6115938d
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.web_hostingenvironments_multirolepools.cpu_percentage
      metadata_path: metadata.csv
      prefix: azure.web_hostingenv
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 278
    source_type_name: Entorno de Azure App Service
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
git_integration_title: azure_appserviceenvironment
integration_id: azure-appserviceenvironment
integration_title: Entorno de Azure App Service
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_appserviceenvironment
public_title: Entorno de Azure App Service
short_description: Rastrea las métricas principales de Azure App Service Environment.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Categoría::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea las métricas principales de Azure App Service Environment.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Entorno de Azure App Service
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure App Service Environment es una característica de Azure App Service que proporciona un entorno totalmente aislado y dedicado para ejecutar de forma segura aplicaciones de App Service a gran escala.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure App Service Environment.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_appserviceenvironment" >}}


### Eventos

La integración Azure App Service Environment no incluye ningún evento.

### Checks de servicio

La integración Azure App Service Environment no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_service_environment/azure_app_service_environment_metadata.csv
[3]: https://docs.datadoghq.com/es/help/