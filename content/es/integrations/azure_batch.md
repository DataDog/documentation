---
app_id: azure-batch
app_uuid: 129c72d9-d14b-4ebb-8181-e7b94fbc7682
assets:
  dashboards:
    azure_batch: assets/dashboards/azure_batch.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.batch_batchaccounts.core_count
      metadata_path: metadata.csv
      prefix: azure.batch_batchaccounts
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 163
    source_type_name: Azure Batch
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- configuración y despliegue
- azure
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_batch
integration_id: azure-batch
integration_title: Azure Batch
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_batch
public_title: Azure Batch
short_description: Azure Batch Service es un programador y procesador de tareas gestionado
  para tus aplicaciones de Azure.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Configuration & Deployment
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Batch Service es un programador y procesador de tareas gestionado
    para tus aplicaciones de Azure.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Batch
---

<!--  FUENTE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Batch Service es un programador y procesador de tareas gestionado para tus aplicaciones de Azure. Obtén métricas de Azure Batch Service para:

- Visualizar el rendimiento de tus cuentas de Batch.
- Correlacionar el rendimiento de tus cuentas de Batch con el de tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_batch" >}}


### Eventos

La integración Azure Batch Service no incluye eventos.

### Checks de servicio

La integración Azure Batch Service no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_batch/azure_batch_metadata.csv
[3]: https://docs.datadoghq.com/es/help/