---
app_id: azure-blob-storage
app_uuid: 57ef97b4-651a-432d-9dc5-f56a94449d75
assets:
  dashboards:
    azure_blob_storage: assets/dashboards/azure_blob_storage.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.storage_storageaccounts_blobservices.blob_count
      metadata_path: metadata.csv
      prefix: azure.storage_storageaccounts_blobservices
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 226
    source_type_name: Azure Blob Storage
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
git_integration_title: azure_blob_storage
integration_id: azure-blob-storage
integration_title: Azure Blob Storage
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_blob_storage
public_title: Azure Blob Storage
short_description: Rastrea las métricas clave de Azure Blob Storage.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea las métricas clave de Azure Blob Storage.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Blob Storage
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Blob Storage es la solución de almacenamiento de objetos de Microsoft para la nube. Blob Storage está optimizado para almacenar cantidades masivas de datos no estructurados. Obtén métricas de Azure Blob Storage para:

- Visualizar el rendimiento de tu Blob Storage.
- Correlacionar el rendimiento de tu Blob Storage con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_blob_storage" >}}


### Eventos

La integración Azure Blob Storage no incluye eventos.

### Checks de servicio

La integración Azure Blob Storage no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_blob_storage/azure_blob_storage_metadata.csv
[3]: https://docs.datadoghq.com/es/help/