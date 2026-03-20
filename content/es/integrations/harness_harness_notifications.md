---
app_id: harness-harness-notifications
app_uuid: 0194c0d4-f822-7117-be7a-1ed1ccf587e7
assets:
  dashboards:
    Harness Notifications Integration Overview: assets/dashboards/harness_notifications_integration_overview.json
  integration:
    auto_install: true
    events:
      creates_events: true
    process_signatures: []
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 38607293
    source_type_name: harness_notifications
author:
  homepage: https://www.harness.io/
  name: Harness
  sales_email: sales@harness.io
  support_email: support@harness.io
  vendor_id: harness
categories:
- notificaciones
- gestión de eventos
- events
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/harness_harness_notifications/README.md
display_on_public_website: true
draft: false
git_integration_title: harness_harness_notifications
integration_id: harness-harness-notifications
integration_title: Harness Notifications
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: harness_harness_notifications
public_title: Harness Notifications
short_description: Ingerir pipelines de notificaciones de Harness como eventos de
  Datadog
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Notifications
  - Categoría::Gestión de eventos
  - Category::Alerting
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Ingerir pipelines de notificaciones de Harness como eventos de Datadog
  media:
  - caption: Dashboard de información general sobre la integración Harness Notifications
      en Datadog
    image_url: images/Screenshot 2025-03-05 at 11.45.07 PM-2560x1440.png
    media_type: imagen
  - caption: Notificaciones de pipelines de Harness ingeridas en Datadog
    image_url: images/Screenshot 2025-03-05 at 9.18.27 AM-2560x1440.png
    media_type: imagen
  - caption: Seleccionar eventos de pipelines para notificaciones en Harness
    image_url: images/Screenshot 2025-02-03 at 2.34.46 PM-2560x1440.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Harness Notifications
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Harness es una plataforma CI/CD de autoservicio que permite a ingenieros y DevOps crear, probar, desplegar y comprobar software bajo demanda. Con esta integración, puedes enviar notificaciones de eventos de Harness a Datadog de forma ininterrumpida, lo que te garantiza una visibilidad en tiempo real de las actualizaciones críticas de pipelines en tus flujos de trabajo de monitorización existentes. Estas notificaciones están disponibles en el [Explorador de eventos][1] de Datadog y se muestran en el dashboard predefinido.

**Nota**: La capacidad de configurar notificaciones de Datadog en Harness está detrás de un marcador de características. Ponte en contacto con el [servicio de asistencia de Harness][2] para activar esta función. Consulta la [documentación de Harness][3] para obtener más información sobre esta integración.

## Configuración

Una vez instalada la integración, estos eventos se etiquetan con `source:harness_notifications`.

### Configurar notificaciones de pipelines de Datadog en Harness

1. En Harness Pipeline Studio, haz clic en **Notify** (Notificar) en la barra lateral derecha.
2. Haz clic en **+ Notifications** (+ notificaciones) para crear un nuevo canal.
3. Asigna un nombre a tu canal de notificación Datadog.
4. Selecciona los eventos de pipeline que quieres monitorizar.
5. En Notification Method (Método de notificación), selecciona **Datadog(/v1/events API)** como el tipo de canal.
6. Introduce tu URL de Datadog, que debe ir seguida de `/api/v1/events` (por ejemplo, `https://app.datadoghq.com/api/v1/events/`)
7. Introduce tu [clave de API Datadog][4].
8. (Opcional) Añade cabeceras, si es necesario.
9. Prueba la configuración y haz clic en **Finish** (Finalizar).

## Desinstalación

Los canales de notificación se pueden activar, desactivar o eliminar desde la página de notificaciones.
-   Para activar o desactivar reglas de notificación, coloca el interruptor en **Enabled** (Activado).
-   Para eliminarlas, selecciona **:** para ver más opciones y luego haz clic en **Delete** (Eliminar).


## Asistencia

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Harness][5].


[1]: https://docs.datadoghq.com/es/service_management/events/explorer/
[2]: mailto:support@harness.io
[3]: https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events/#datadog-notifications
[4]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[5]: https://www.harness.io/support