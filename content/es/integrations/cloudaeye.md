---
app_id: cloudaeye
app_uuid: 4a0bb068-63fa-4cc2-a557-0452e8dca689
assets:
  dashboards:
    CloudAEye Kosal Dashboard: assets/dashboards/CloudAEye_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 26690330
    source_type_name: CloudAEye
author:
  homepage: https://www.cloudaeye.com
  name: CloudAEye
  sales_email: support@cloudaeye.com
  support_email: support@cloudaeye.com
categories:
- ia/ml
- Kubernetes
- rum
- automatización
- seguimiento de problemas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cloudaeye/README.md
display_on_public_website: true
draft: false
git_integration_title: cloudaeye
integration_id: cloudaeye
integration_title: CloudAEye
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cloudaeye
public_title: CloudAEye
short_description: Averigua y resuelve los problemas en cuestión de segundos, elimina
  las molestias y gánate la confianza de los clientes.
supported_os:
- cualquiera
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::IA/ML
  - Categoría::Kubernetes
  - Category::Incidents
  - Category::Automation
  - Categoría::Seguimiento de problemas
  - Offering::Integration
  - Tipo de datos consultados::Métricas
  - Queried Data Type::Logs
  - Queried Data Type::Traces
  - Queried Data Type::Events
  - Tipo de datos enviados::Eventos
  - Supported OS::Any
  configuration: README.md#Configuración
  description: Averigua y resuelve los problemas en cuestión de segundos, elimina
    las molestias y gánate la confianza de los clientes.
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
  overview: README.md#Información general
  support: README.md#Soporte
  title: CloudAEye
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Kosal de CloudAEye actúa como tu copiloto de causas raíz. Esta integración permite a los usuarios de Datadog importar datos de observabilidad (logs, métricas, trazas) y ver análisis automatizados de causa raíz en CloudAEye. Además, identifica problemas similares dentro de Jira y cambios de código relacionados que pueden estar contribuyendo al incidente. Para agilizar la identificación de incidentes, Kosal envía eventos con un resumen y la causa raíz a Datadog.

## Configuración

### Pasos previos a la instalación

- Crea una cuenta de [CloudAEye][1] si aún no tienes una.


### Instalación

- Inicia sesión en tu cuenta de CloudAEye y añade una **Integración de Datadog**. 
  - Para integrar tu cuenta de Datadog con CloudAEye, necesitamos los siguientes datos.

    - `Site`: el sitio de Datadog donde se encuentran tus datos de observabilidad, como **US1-East**. Más información sobre los sitios de Datadog en [la documentación][2].

    - `API Key`: una clave de API de Datadog ayuda a CloudAEye a identificar de forma exclusiva a la organización. Más información sobre las claves de API en [la documentación][3].

    - `Application Key`: además de una clave de API, CloudAEye necesita una clave de aplicación de Datadog para acceder mediante programación a tus datos. Más información sobre las claves de aplicación en [la documentación][3].


- Ahora puedes explorar tus datos de logs, métricas y trazas en el dashboard de CloudAEye.

### Configuración de notificación

Para recibir notificaciones sobre cualquier incidente:
1. En la página [integración de CloudAEye][4], ve a **Settings > Root Cause Analysis** (Configuración > Análisis de causa raíz) desde el cajón de navegación lateral. 
2. Selecciona la casilla **Send Alerts** (Enviar alertas).
3. Elige o añade el canal de alerta de la notificación que desees.


## Desinstalación

Para eliminar la integración de Datadog de CloudAEye:
1. Desde el cajón de navegación lateral de la página [integraciones de CloudAEye][4], navega hasta **Integrations > Datadog** (Integraciones > Datadog).
2. Haz clic en **Remove** (Eliminar).
3. Haz clic en el botón **Uninstall Integration** (Desinstalar integración). Una vez que desinstales esta integración, se revocarán todas las autorizaciones anteriores.
4. Asegúrate de que todas las claves de API asociadas a esta integración se han desactivado buscando el nombre de la integración (CloudAEye) en la [página de gestión de claves de API][5].



## Asistencia

¿Necesitas ayuda? Ponte en contacto con el [soporte de CloudAEye][6].


## Referencias

- Sigue la [guía paso a paso][7] de la documentación de CloudAEye para configurar la integración de Datadog.


[1]: https://docs.cloudaeye.com/user-guide/tasks/register.html
[2]: https://docs.datadoghq.com/es/getting_started/site/#access-the-datadog-site
[3]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[4]: https://console.cloudaeye.com/integrations/datadog
[5]: https://app.datadoghq.com/organization-settings/api-keys?filter=CloudAEye
[6]: mailto:support@cloudaeye.com
[7]: https://docs.cloudaeye.com/user-guide/integrations/datadog.html