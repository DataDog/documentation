---
app_id: rollbar
app_uuid: 63175032-65a1-4bc8-82da-251a27005f1f
assets:
  integration:
    auto_install: true
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 137
    source_type_name: Rollbar
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- issue tracking
- notifications
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rollbar
integration_id: rollbar
integration_title: Rollbar
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rollbar
public_title: Rollbar
short_description: Envía excepciones, errores y despliegues de código a tu flujo (stream)
  de eventos Datadog.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Recopilación de logs
  - Category::Seguimiento de problemas
  - Category::Notificaciones
  - Offering::Integración
  configuration: README.md#Configuración
  description: Envía excepciones, errores y despliegues de código a tu flujo (stream)
    de eventos Datadog.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Rollbar
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
![Evento de error de Rollbar][1]

## Información general

Rollbar ayuda a los desarrolladores a crear mejores softwares, más rápido. Con Rollbar, los desarrolladores pueden ver las excepciones de todos sus marcos, plataformas y entornos en un solo lugar.

Conecta Rollbar con Datadog para:

- Recibir notificaciones sobre excepciones, errores y despliegues de código en el Explorador de eventos.
- Filtrar notificaciones por gravedad, entorno, host, usuarios y más.
- Buscar excepciones en tus gráficos.
- Discutir las excepciones con tu equipo.
- Dedicar menos tiempo a depurar problemas.

## Configuración

### Instalación

1. Navega hasta el [cuadro de integración de Rollbar][2] y haz clic en **Install Integration** (Instalar integración).
2. En el cuadro de la integración, haz clic para elegir una clave de API existente o para crear una nueva para esta integración.

### Configuración

En Rollbar, la configuración se lleva a cabo por proyecto.

1. En Rollbar, ve a la página de Proyectos.
2. Haz clic en el botón más **[ + \]** para añadir una integración a tu proyecto.

   ![Página del proyecto de Rollbar][3]

3. Elige Datadog en la lista.
4. Copia tu clave de API Key del cuadro de tu integración Rollbar en Datadog y pégala en el cuadro de la clave de API en Rollbar.

Ahora, haz clic en el botón **Send Test Notification** (Enviar notificación de test) para asegurarte de que todo está configurado correctamente. Después de hacer clic, deberías ver un evento de Rollbar en el [Events Explorer][4].

## Datos recopilados

### Métricas

La integración Rollbar no incluye métricas.

### Eventos

La integración Rollbar envía excepciones, errores y despliegues de código a Datadog como eventos.

### Checks de servicio

La integración Rollbar no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: images/rollbar_error.png
[2]: https://app.datadoghq.com/account/settings#integrations/rollbar
[3]: images/rollover_project.png
[4]: https://app.datadoghq.com/event/explorer
[5]: https://docs.datadoghq.com/es/help/