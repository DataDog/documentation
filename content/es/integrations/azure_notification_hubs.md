---
aliases:
- /es/integrations/azure_notificationhubs
categories:
- azure
- nube
- notificaciones
custom_kind: integración
dependencies: []
description: Rastrea las métricas principales de Azure Notification Hubs.
doc_link: https://docs.datadoghq.com/integrations/azure_notification_hubs/
draft: false
git_integration_title: azure_notification_hubs
has_logo: true
integration_id: azure-notificationhubs
integration_title: Microsoft Azure Notification Hubs
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_notification_hubs
public_title: Integración de Datadog y Microsoft Azure Notification Hubs
short_description: Rastrea las métricas principales de Azure Notification Hubs.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Notification Hubs proporciona un motor de inserción escalable y fácil de usar que te permite enviar notificaciones a cualquier plataforma (iOS, Android, Windows, Kindle, Baidu, etc.) desde cualquier backend (en la nube o en las instalaciones).

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Notification Hubs.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_notification_hubs" >}}


### Eventos

La integración Azure Notification Hubs no incluye ningún evento.

### Checks de servicios

La integración Azure Notification Hubs no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_notification_hubs/azure_notification_hubs_metadata.csv
[3]: https://docs.datadoghq.com/es/help/