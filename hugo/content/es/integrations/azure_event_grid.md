---
app_id: azure-eventgrid
app_uuid: 55b5c82c-bba0-4bb5-b9a7-50096b97f0bb
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.eventgrid_topics.publish_success_count
      metadata_path: metadata.csv
      prefix: azure.eventgrid
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 291
    source_type_name: Azure eventos Grid
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
git_integration_title: azure_event_grid
integration_id: azure-eventgrid
integration_title: Azure eventos Grid
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_event_grid
public_title: Azure eventos Grid
short_description: Rastrea las métricas principales de Azure Event Grid.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Azure
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Rastrea las métricas principales de Azure Event Grid.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Azure eventos Grid
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Event Grid es un servicio de enrutamiento de eventos inteligente y totalmente gestionado que permite un consumo uniforme de eventos utilizando un modelo de publicación y suscripción.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Event Grid.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{ get-metrics-from-git "azure-eventgrid" }}


### Eventos

La integración Azure Event Grid no incluye eventos.

### Checks de servicio

La integración Azure Event Grid no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_event_grid/azure_event_grid_metadata.csv
[3]: https://docs.datadoghq.com/es/help/