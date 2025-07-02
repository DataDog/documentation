---
app_id: azure-datafactory
app_uuid: b85b780d-5e7f-4406-b2e6-d958445cb4f6
assets:
  dashboards:
    azure_data_factory: assets/dashboard/azure_data_factory.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.datafactory_factories.integration_runtime_available_memory
      - azure.datafactory_factories.trigger_succeeded_runs
      - azure.datafactory_factories.activity_succeeded_runs
      - azure.datafactory_factories.pipeline_succeeded_runs
      metadata_path: metadata.csv
      prefix: azure.datafactory_factories
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 287
    source_type_name: Azure Data Factory
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
git_integration_title: azure_data_factory
integration_id: azure-datafactory
integration_title: Azure Data Factory
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_data_factory
public_title: Azure Data Factory
short_description: Rastrea las métricas clave de Azure Data Factory.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea las métricas clave de Azure Data Factory.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Data Factory
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Data Factory es un servicio de integración de datos en la nube que permite componer los servicios de almacenamiento, movimiento y procesamiento de datos en pipelines de datos automatizados.

Utiliza la integración de Azure con Datadog para recopilar métricas de Data Factory.

## Configuración

### Instalación

Si aún no lo ha hecho, configure [Microsoft Azure integración][1]. No se requiere ningún paso de instalación adicional.

## Datos recopilados

### Métricas
{{ get-metrics-from-git "azure-datafactory" }}


### Eventos

La integración Azure Data Factory no incluye eventos.

### Checks de servicio

La integración Azure Data Factory no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_factory/azure_data_factory_metadata.csv
[3]: https://docs.datadoghq.com/es/help/