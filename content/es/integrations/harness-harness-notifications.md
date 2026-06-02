---
aliases:
- /es/integrations/harness_harness_notifications
app_id: harness-harness-notifications
categories:
- notificaciones
- gestión de eventos
- events
custom_kind: integración
description: Ingerir notificaciones de pipeline de Harness como eventos de Datadog
integration_version: 1.0.0
media:
- caption: Dashboard de información general sobre la integración para notificaciones
    de Harness en Datadog
  image_url: images/Screenshot 2025-03-05 at 11.45.07 PM-2560x1440.png
  media_type: imagen
- caption: Aprovechar las notificaciones de pipeline ingeridas en Datadog
  image_url: images/Screenshot 2025-03-05 at 9.18.27 AM-2560x1440.png
  media_type: imagen
- caption: Seleccionar eventos de pipeline para notificar en Harness
  image_url: images/Screenshot 2025-02-03 at 2.34.46 PM-2560x1440.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Notificaciones de Harness
---
## Información general

Harness es una plataforma CI/CD de autoservicio que permite a ingenieros y DevOps crear, probar, desplegar y comprobar software bajo demanda. Con esta integración, puedes enviar notificaciones de eventos de pipelines de Harness a Datadog de forma continua, lo que te garantiza una visibilidad en tiempo real de las actualizaciones críticas de pipelines en tus flujos de trabajo de monitorización existentes. Estas notificaciones están disponibles en el [Explorador de eventos](https://docs.datadoghq.com/service_management/events/explorer/) de Datadog y se muestran en el dashboard predefinido.

**Nota**: La posibilidad de configurar las notificaciones de Datadog en Harness está detrás de un indicador de función. Ponte en contacto con el [servicio de asistencia de Harness](mailto:support@harness.io) para activar esta función. Consulta la [documentación de Harness](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events/#datadog-notifications) para obtener más información sobre esta integración.

## Configuración

Una vez instalada la integración, estos eventos se etiquetan con `source:harness_notifications`.

### Configurar notificaciones de pipelines de Datadog en Harness

1. En Harness Pipeline Studio, haz clic en **Notify** (Notificar) en la barra lateral derecha.
1. Haz clic en **+ Notifications** (+ Notificaciones) para crear un nuevo canal.
1. Asigna un nombre a tu canal de notificación Datadog.
1. Selecciona los eventos de pipeline que quieres monitorizar.
1. En Notification Method (Método de notificación), selecciona **Datadog(/v1/events API** como el tipo de canal.
1. Introduce tu URL de Datadog, que debe ir seguida de `/api/v1/events` (por ejemplo, `https://app.datadoghq.com/api/v1/events/`)
1. Introduce tu [clave de API Datadog](https://docs.datadoghq.com/account_management/api-app-keys/).
1. (Opcional) Añade cabeceras si es necesario.
1. Prueba la configuración y haz clic en **Finish** (Finalizar).

## Desinstalación

Los canales de notificación pueden activarse, desactivarse o eliminarse desde la página de notificaciones.

- Para activar o desactivar reglas de notificación, activa el interruptor **Enabled** (Activado).
- Para eliminar, selecciona **:** para ver más opciones y luego haz clic en **Delete** (Eliminar).

## Soporte

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Harness](https://www.harness.io/support).