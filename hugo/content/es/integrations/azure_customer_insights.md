---
app_id: azure-customerinsights
app_uuid: 34e71ee6-2bd4-4de6-bd15-60052a12811e
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.customerinsights_hubs.dciapi_calls
      metadata_path: metadata.csv
      prefix: azure.customerinsights_hubs
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 286
    source_type_name: Azure Customer Insights
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
git_integration_title: azure_customer_insights
integration_id: azure-customerinsights
integration_title: Azure Customer Insights
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_customer_insights
public_title: Azure Customer Insights
short_description: Rastrea las métricas clave de Azure Customer Insights.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Azure
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Rastrea las métricas clave de Azure Customer Insights.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Azure Customer Insights
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Customer Insights permite a las organizaciones de todos los tamaños reunir diversos conjuntos de datos y generar conocimientos e información para crear una visión holística de 360° de sus clientes.

Utiliza la integración de Azure con Datadog para recopilar métricas de Customer Insights.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_customer_insights" >}}


### Eventos

La integración Azure Customer Insights no incluye eventos.

### Checks de servicio

La integración Azure Customer Insights no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_customer_insights/azure_customer_insights_metadata.csv
[3]: https://docs.datadoghq.com/es/help/