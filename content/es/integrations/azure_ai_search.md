---
app_id: azure-ai-search
app_uuid: 915dfd7c-1919-4cb8-a590-74c9a6ab806f
assets:
  dashboards:
    azure-ai-search: assets/dashboards/azure_ai_search_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.search_searchservices.count
      metadata_path: metadata.csv
      prefix: azure.search_searchservices.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 25994737
    source_type_name: Azure AI Search
  monitors:
    Azure AI Search Throttled Queries: assets/monitors/azure_ai_search_queries_throttled.json
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
git_integration_title: azure_ai_search
integration_id: azure-ai-search
integration_title: Azure AI Search
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_ai_search
public_title: Azure AI Search
short_description: Utiliza la integración Azure AI Search para realizar un seguimiento
  del rendimiento y el uso de servicios Azure AI Search.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::AI/ML
  - Category::Metrics
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Instalación
  description: Utiliza la integración Azure AI Search para realizar un seguimiento
    del rendimiento y el uso de servicios Azure AI Search.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Azure AI Search
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

Azure AI Search proporciona una recuperación de la información para aplicaciones tradicionales y generativas de búsqueda IA. Utiliza la integración Datadog para realizar un seguimiento del rendimiento y el uso de servicios Azure AI Search.

## Configuración

### Instalación
Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure-ai-search" >}}


### Checks de servicios

Azure AI Search no incluye checks de servicios.

### Eventos

Azure AI Search no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

## Referencias adicionales
Más enlaces, artículos y documentación útiles:

- [Monitorizar Azure AI Search con Datadog][4]



[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/integrations-internal-core/blob/main/azure_ai_search/metadata.csv
[3]: https://docs.datadoghq.com/es/help/
[4]: https://www.datadoghq.com/blog/monitor-azure-ai-search-datadog/