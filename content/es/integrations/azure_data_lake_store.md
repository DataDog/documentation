---
app_id: azure-datalakestore
app_uuid: 56d73475-119f-498c-b8d8-b192f89aaba0
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.datalakestore_accounts.read_requests
      metadata_path: metadata.csv
      prefix: azure.datalakestore_accounts
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 289
    source_type_name: Almacén Azure Data Lake
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
git_integration_title: azure_data_lake_store
integration_id: azure-datalakestore
integration_title: Almacén Azure Data Lake
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_data_lake_store
public_title: Almacén Azure Data Lake
short_description: Rastrea las métricas clave de Azure Data Lake Store.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea las métricas clave de Azure Data Lake Store.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Almacén Azure Data Lake
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Data Lake Store es un lago de datos sin límites que potencia el análisis de big data.

Utiliza la integración de Azure con Datadog para recopilar métricas de Data Lake Store.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{ get-metrics-from-git "azure-datalakestore" }}


**Nota**: Esta integración solo recopila métricas para Data Lake Storage Gen 1. Data Lake Storage Gen 2 está basado en Azure Blob Storage, por lo que sus métricas se pueden encontrar en Datadog en el espacio de nombres Blob Storage: `azure.storage_storageaccounts_blobservices.*`. Para obtener detalles adicionales, consulta la documentación de [Azure Data Lake Storage Gen 2][3].

### Eventos

La integración Azure Data Lake Store no incluye eventos.

### Checks de servicio

La integración Azure Data Lake Store no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_lake_store/azure_data_lake_store_metadata.csv
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-introduction
[4]: https://docs.datadoghq.com/es/help/