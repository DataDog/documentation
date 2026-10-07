---
app_id: azure-usage-and-quotas
app_uuid: 26bac8f2-d8b8-4623-8d55-3b4a5cc94abd
assets:
  dashboards:
    azure_usage_and_quotas: assets/dashboards/azure_usage_and_quotas.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.usage.current_value
      metadata_path: metadata.csv
      prefix: azure.usage.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 306
    source_type_name: Azure Usage and Quotas
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- nube
- gestión de costes
- network
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_usage_and_quotas
integration_id: azure-usage-and-quotas
integration_title: Azure Usage and Quotas
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_usage_and_quotas
public_title: Azure Usage and Quotas
short_description: Azure Usage and Quotas te permite rastrear tus usos y límites actuales.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Cost Management
  - Category::Network
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Usage and Quotas te permite rastrear tus usos y límites actuales.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Usage and Quotas
---

<!--  FUENTE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure establece límites preconfigurados para los recursos de tu suscripción. Para evitar errores de aprovisionamiento inesperados, ten en cuenta estos límites al diseñar y escalar tu entorno de Azure. Obtén métricas de Azure Usage and Quotas para:

- Visualizar la utilización de los recursos de computación, red y almacenamiento en comparación con tu cuota.
- Comprender y evitar que los errores de aprovisionamiento alcancen los límites de cuota.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_usage_and_quotas" >}}


### Eventos

La integración Azure Quota no incluye eventos.

### Checks de servicio

La integración de Azure Quota no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_usage_and_quotas/azure_usage_and_quotas_metadata.csv
[3]: https://docs.datadoghq.com/es/help/