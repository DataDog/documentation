---
app_id: azure-queue-storage
app_uuid: fafca6a4-8820-4a42-bc84-1d53f322366e
assets:
  dashboards:
    azure_queue_storage: assets/dashboard/azure_queue_storage.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.storage_storageaccounts_queueservices.queue_count
      metadata_path: metadata.csv
      prefix: azure.storage_storageaccounts_queueservices
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 224
    source_type_name: Almacenamiento en cola Azure
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
git_integration_title: azure_queue_storage
integration_id: azure-queue-storage
integration_title: Almacenamiento en cola Azure
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_queue_storage
public_title: Almacenamiento en cola Azure
short_description: Rastrea las métricas clave de Azure Queue Storage.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Categoría::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea las métricas clave de Azure Queue Storage.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Almacenamiento en cola Azure
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Queue Storage es un servicio para almacenar grandes cantidades de mensajes a los que se puede acceder desde cualquier parte del mundo con llamadas autenticadas mediante HTTP o HTTPS.

Obtén métricas de Azure Queue Storage para:

- Visualizar el rendimiento de tu Queue Storage.
- Correlacionar el rendimiento de tu Queue Storage con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure-queue-storage" >}}


### Eventos

La integración Azure Queue Storage no incluye eventos.

### Checks de servicio

La integración Azure Queue Storage no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_queue_storage/azure_queue_storage_metadata.csv
[3]: https://docs.datadoghq.com/es/help/