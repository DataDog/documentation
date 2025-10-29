---
app_id: azure-filestorage
app_uuid: a84f1b3d-9675-4f48-9051-9156d8ad406e
assets:
  dashboards:
    azure_file_storage: assets/dashboard/azure_file_storage.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.storage_storageaccounts_fileservices.file_count
      metadata_path: metadata.csv
      prefix: azure.storage_storageaccounts_fileservices
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 293
    source_type_name: Almacenamiento de archivos Azure
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
git_integration_title: azure_file_storage
integration_id: azure-filestorage
integration_title: Almacenamiento de archivos Azure
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_file_storage
public_title: Almacenamiento de archivos Azure
short_description: Rastrea las métricas clave de Azure File Storage.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea las métricas clave de Azure File Storage.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Almacenamiento de archivos Azure
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure File Storage ofrece recursos compartidos de archivos totalmente gestionados en la nube a los que se puede acceder mediante el protocolo estándar de la industria: Server Message Block (SMB).

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure File Storage.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{ get-metrics-from-git "azure-filestorage" }}


### Eventos

La integración Azure File Storage no incluye eventos.

### Checks de servicio

La integración Azure File Storage no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_file_storage/azure_file_storage_metadata.csv
[3]: https://docs.datadoghq.com/es/help/