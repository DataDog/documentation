---
app_id: azure-analysisservices
app_uuid: 1705f0be-a2cb-4ebe-83f4-edc42bf735f6
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.analysisservices_servers.command_pool_job_queue_length
      metadata_path: metadata.csv
      prefix: azure.analysisservices_servers
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 276
    source_type_name: Servicios de Azure Analysis
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
git_integration_title: azure_analysis_services
integration_id: azure-analysisservices
integration_title: Servicios de Azure Analysis
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_analysis_services
public_title: Servicios de Azure Analysis
short_description: Rastrea las métricas clave de Azure Analysis Services.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Categoría::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea las métricas clave de Azure Analysis Services.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Servicios de Azure Analysis
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Analysis Services es una plataforma como servicio (PaaS) totalmente gestionada que proporciona modelos de datos de nivel empresarial en la nube.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Analysis Services.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_analysis_services" >}}


### Eventos

La integración Azure Analysis Services no incluye eventos.

### Checks de servicio

La integración Azure Analysis Services no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_analysis_services/azure_analysis_services_metadata.csv
[3]: https://docs.datadoghq.com/es/help/