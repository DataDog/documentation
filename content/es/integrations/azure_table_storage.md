---
app_id: azure-table-storage
app_uuid: 0d649e43-2cb7-4706-8d4b-3d4156c212f1
assets:
  dashboards:
    azure_table_storage: assets/dashboard/azure_table_storage.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.storage_storageaccounts_tableservices.table_count
      metadata_path: metadata.csv
      prefix: azure.storage_storageaccounts_tableservices
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 222
    source_type_name: Almacenamiento de tablas Azure
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
git_integration_title: azure_table_storage
integration_id: azure-table-storage
integration_title: Almacenamiento de tablas Azure
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_table_storage
public_title: Almacenamiento de tablas Azure
short_description: Rastrea las métricas clave de Azure Table Storage.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea las métricas clave de Azure Table Storage.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Almacenamiento de tablas Azure
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Table Storage es un almacén de clave-valor NoSQL para un desarrollo rápido mediante conjuntos de datos semiestructurados masivos.

Obtén métricas de Azure Table Storage para:

- Visualizar el rendimiento de tu Table Storage.
- Correlacionar el rendimiento de tu Table Storage con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure-table-storage" >}}


### Eventos

La integración Azure Table Storage no incluye eventos.

### Checks de servicio

La integración Azure Table Storage no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_table_storage/azure_table_storage_metadata.csv
[3]: https://docs.datadoghq.com/es/help/