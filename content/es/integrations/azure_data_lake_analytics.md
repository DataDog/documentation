---
app_id: azure-datalakeanalytics
app_uuid: cf9c8822-5df9-451a-a84b-3acee9f6dc28
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.datalakeanalytics_accounts.job_ended_success
      metadata_path: metadata.csv
      prefix: azure.datalakeanalytics_accounts
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 288
    source_type_name: Análisis de Azure Data Lake
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- nube
- almacenes de datos
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_data_lake_analytics
integration_id: azure-datalakeanalytics
integration_title: Análisis de Azure Data Lake
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_data_lake_analytics
public_title: Análisis de Azure Data Lake
short_description: Rastrea las métricas clave de Azure Data Lake Analytics.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea las métricas clave de Azure Data Lake Analytics.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Análisis de Azure Data Lake
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Data Lake Analytics es un servicio de trabajo de análisis bajo demanda que simplifica el big data.

Utiliza la integración de Azure con Datadog para recopilar métricas de Data Lake Analytics.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{ get-metrics-from-git "azure-datalakeanalytics" }}


### Eventos

La integración Azure Data Lake Analytics no incluye eventos.

### Checks de servicio

La integración Azure Data Lake Analytics no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_lake_analytics/azure_data_lake_analytics_metadata.csv
[3]: https://docs.datadoghq.com/es/help/