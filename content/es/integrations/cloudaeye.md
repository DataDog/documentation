---
app_id: cloudaeye
categories:
- ia/ml
- Kubernetes
- rum
- automatización
- seguimiento de problemas
custom_kind: integración
description: Averigua y resuelve los problemas en cuestión de segundos, elimina las
  molestias y gánate la confianza de los clientes.
integration_version: 1.0.0
media:
- caption: Dashboard de CloudAEye Kosal
  image_url: images/cloudAEyeKosalDashboard.png
  media_type: imagen
- caption: Análisis automatizado de causas raíz
  image_url: images/root-cause-analysis.png
  media_type: imagen
- caption: Notificaciones con un amplio contexto
  image_url: images/notifications.png
  media_type: imagen
- caption: Análisis centralizado de aplicaciones
  image_url: images/global-context.png
  media_type: imagen
- caption: Asistente
  image_url: images/assistant.png
  media_type: imagen
supported_os:
- cualquiera
title: CloudAEye
---
## Información general

Kosal de CloudAEye actúa como tu copiloto de causas raíz. Esta integración permite a los usuarios de Datadog importar datos de observabilidad (logs, métricas, trazas) y ver análisis automatizados de causa raíz en CloudAEye. Además, identifica problemas similares dentro de Jira y cambios de código relacionados que pueden estar contribuyendo al incidente. Para agilizar la identificación de incidentes, Kosal envía eventos con un resumen y la causa raíz a Datadog.

## Configuración

### Pasos previos a la instalación

- Crea una [cuenta de CloudAEye](https://docs.cloudaeye.com/user-guide/tasks/register.html) si aún no tienes una.

### Instalación

- Accede a tu cuenta de CloudAEye y añade una **Datadog Integration** (Integración de Datadog).

  - Para integrar tu cuenta de Datadog con CloudAEye, necesitamos los siguientes datos.

    - `Site`: El sitio Datadog donde se encuentran tus datos de observabilidad, como **US1-East**. Obtén más información sobre los sitios Datadog en [la documentación](https://docs.datadoghq.com/getting_started/site/#access-the-datadog-site)

    - `API Key`: Una clave de la API de Datadog ayuda a CloudAEye a identificar de forma exclusiva a la organización. Obtén más información sobre las claves de API en [la documentación](https://docs.datadoghq.com/account_management/api-app-keys/).

    - `Application Key`: Además de una clave de la API, CloudAEye necesita una clave de la aplicación de Datadog para acceder mediante programación a tus datos. Obtén más información sobre las claves de la aplicación en [la documentación](https://docs.datadoghq.com/account_management/api-app-keys/).

- Ahora puedes explorar tus datos de logs, métricas y trazas en el dashboard de CloudAEye.

### Configuración de notificación

Para recibir notificaciones sobre cualquier incidente:

1. En la [page (página) de integración de CloudAEye](https://console.cloudaeye.com/integrations/datadog), ve a **Settings > Root Cause Analysis** (Parámetros > Análisis de la causa raíz) desde el cajón de navegación lateral.
1. Selecciona la casilla **Send Alerts** (Enviar alertas).
1. Elige o añade el canal de alerta de la notificación que desees.

## Desinstalación

Para eliminar la integración de Datadog de CloudAEye:

1. Desde el cajón de navegación lateral en la [page (página) Integraciones de CloudAEye](https://console.cloudaeye.com/integrations/datadog), ve a **Integrations > Datadog** (Integraciones > Datadog).
1. Haz clic en **Remove** (Eliminar).
1. Haz clic en el botón **Uninstall Integration** (Desinstalar integración). Una vez que desinstales esta integración, se revocarán todas las autorizaciones anteriores.
1. Asegúrate de que todas las claves de API asociadas a esta integración se hayan desactivado buscando el nombre de la integración (CloudAEye) en la [page (página) de gestión de claves de la API](https://app.datadoghq.com/organization-settings/api-keys?filter=CloudAEye).

## Soporte

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de CloudAEye](mailto:support@cloudaeye.com).

## Referencias

- Sigue la [guía step (UI) / paso (generic)-by-step (UI) / paso (generic)](https://docs.cloudaeye.com/user-guide/integrations/datadog.html) en los documentos de CloudAEye para configurar la integración de Datadog.