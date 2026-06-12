---
app_id: azure-notificationhubs
app_uuid: bc192458-afe0-4254-b137-3746261c732a
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.notificationhubs_namespaces_notificationhubs.incoming
      metadata_path: metadata.csv
      prefix: azure.notificationhubs_namespaces
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 298
    source_type_name: Azure Notification Hubs
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- nube
- notificaciones
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_notificationhubs
integration_id: azure-notificationhubs
integration_title: Azure Notification Hubs
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_notificationhubs
public_title: Azure Notification Hubs
short_description: Rastrea las métricas principales de Azure Notification Hubs.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Azure
  - Category::Cloud
  - Categoría::Notificaciones
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea las métricas principales de Azure Notification Hubs.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Notification Hubs
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Notification Hubs proporciona un motor de inserción escalable y fácil de usar que te permite enviar notificaciones a cualquier plataforma (iOS, Android, Windows, Kindle, Baidu, etc.) desde cualquier backend (en la nube o en las instalaciones).

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Notification Hubs.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_notificationhubs" >}}


### Eventos

La integración Azure Notification Hubs no incluye ningún evento.

### Checks de servicio

La integración Azure Notification Hubs no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_notification_hubs/azure_notification_hubs_metadata.csv
[3]: https://docs.datadoghq.com/es/help/