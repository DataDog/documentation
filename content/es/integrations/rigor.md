---
app_id: rigor
app_uuid: f9ab0c97-235c-4f88-8b92-89eb563e18ba
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: rigor.http.dns_time
      metadata_path: metadata.csv
      prefix: rigor.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10029
    source_type_name: Rigor
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Rigor
  sales_email: support@rigor.com
  support_email: support@rigor.com
categories:
- tests
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rigor/README.md
display_on_public_website: true
draft: false
git_integration_title: rigor
integration_id: rigor
integration_title: Rigor
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rigor
public_title: Rigor
short_description: Rigor proporciona monitorización y optimización Synthetic durante
  todo el ciclo del desarrollo.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Categoría::Tests
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Rigor proporciona monitorización y optimización Synthetic durante todo
    el ciclo del desarrollo.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Rigor
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->
## Información general

Rigor proporciona monitorización y optimización Synthetic durante todo el ciclo del desarrollo.

![timeboard][1]

Con Rigor, puedes recopilar métricas de rendimiento del front-end Synthetic y enviarlas a Datadog. También puedes enviar alertas a Datadog como eventos.

## Configuración

Rigor tiene dos integraciones diferentes con Datadog, una integración de métricas y una integración de eventos.

### Configuración
#### Recopilación de métricas

Como administrador, haz clic en el menú "Admin Tools" (Herramientas de administración) en la parte superior derecha de tu pantalla y selecciona "Integrations" (integraciones).

![admin-menu][2]

Añade una nueva integración, haciendo clic en el botón "New" (Nuevo) para habilitar la configuración de la integración.

![push-configuration][3]

Añade un nombre único para esta integración y tu clave de API de Datadog. A continuación, elige qué etiquetas (tags) y métricas quieres enviar. Algunas cosas para recordar:

- Se incluye una versión normalizada del nombre del check como etiqueta predeterminada.
- En el caso de los checks de varios pasos (checks de Real Browser y de API), se incluye la posición de la solicitud de la que proceden las métricas.
- Los checks de tiempo de actividad incluyen HTTP, puerto y checks de API
- Los checks de puertos sólo informan de la métrica "Tiempo de respuesta".
- No todos los navegadores admiten todas las métricas

Si quieres que los checks de Real Browser informen de la temporización de la [API de temporización de usuario][4], asegúrate de que la opción "¿Enviar todas las temporizaciones de usuarios?" está seleccionada. Las marcas se notifican en el espacio de nombres`rigor.real_browser.marks` y las medidas en el espacio de nombres `rigor.real_browser.measures`. **Nota**: La selección de esta opción podría enviar muchas series nuevas a Datadog, especialmente si las marcas y medidas del sitio que está probando se generan dinámicamente.

Una vez que hayas configurado la integración, puedes añadirla a cualquier check de navegador real, HTTP, puerto o API. Sólo tienes que editar el check, ir a la pestaña "Notifications" (Notificaciones) y añadir allí la integración que acabas de crear.

![add-integration-to-check][5]

#### Recopilación de eventos

Como administrador, haz clic en el menú "Admin Tools" (Herramientas de administración) en la parte superior derecha de tu pantalla y selecciona "Alert Webhooks" (Webhooks de alerta).

![webhook-menu][6]

Añade una nueva integración, haciendo clic en el botón "New" (Nuevo) y luego en el cuadro de Datadog.

![webhooks-chooser][7]

Añade un nombre único para este webhook y asegúrate de actualizar los activadores con tu clave de API Datadog.

![webhooks-configuration][8]

Una vez que hayas configurado la integración, puedes añadirla a cualquier check de navegador real, HTTP, puerto o API. Sólo tienes que editar el check, ir a la pestaña "Notifications" (Notificaciones) y añadir allí el webhook que acabas de crear.

![add-webhookto-check][9]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "rigor" >}}


### Eventos

Cuando un check se configura para alertar mediante un evento Datadog, se envían dos tipos de eventos a Datadog:

- **Fallido**: Cuando el check falla lo suficiente como para superar el umbral y enviar una alerta.
- **Nuevamente en línea**: Cuando el check se ejecuta correctamente mientras se encuentra en estado de laerta

![events-example][11]

### Checks de servicio

La integración Rigor no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][12].


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_timeboard_with_metrics.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_admin_menu.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_integration_configuration.png
[4]: https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_add_integration_to_check.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_webhooks_menu.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_webhooks_chooser.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_webhooks_configuration.png
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_add_webhook_to_check.png
[10]: https://github.com/DataDog/integrations-extras/blob/master/rigor/metadata.csv
[11]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_events_example.png
[12]: mailto:support@rigor.com