---
app_id: ilert
app_uuid: 12731389-915a-4fb7-baec-3319f87dfc7f
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: ilert.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10154
    source_type_name: iLert
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: ilert
  sales_email: support@ilert.com
  support_email: support@ilert.com
categories:
- events
- colaboración
- rum
- rastreo de problemas
- notificaciones
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/ilert/README.md
display_on_public_website: true
draft: false
git_integration_title: ilert
integration_id: ilert
integration_title: ilert
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: ilert
public_title: ilert
short_description: Recibe notificaciones de las alertas de Datadog y adopte medidas
  con ilert.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Alertas
  - Categoría::Colaboración
  - Categoría::Incidentes
  - Categoría::Rastreo de problemas
  - Categoría::Notificaciones
  - SO compatible::Linux
  - SO compatible::Windows
  - SO compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Recibe notificaciones de las alertas de Datadog y adopte medidas con
    ilert.
  media:
  - caption: lista de alertas de ilert
    image_url: images/ilert-alert-list.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: ilert
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## Información general

La integración de [ilert][1] envía alertas de Datadog a ilert y toma medidas de manera fluida sobre estas alertas dentro de la plataforma ilert.
ilert es una plataforma de gestión de incidentes que permite a los equipos cubrir todas las etapas del ciclo de un incidente. ilert ofrece alertas confiables y procesables, enrutamiento de llamadas, horarios de disponibilidad flexibles, páginas de estado, varias características de ChatOps, asistencia de IA en las comunicaciones de incidentes y creación de autopsias. Con ilert, los equipos de DevOps aumentan el tiempo de actividad y responden los incidentes con mayor rapidez.

Integra ilert para hacer lo siguiente:

- activar y resolver incidentes de Datadog;
- abordar los incidentes y establecer políticas de derivación a medida que se producen;
- establecer un recordatorio diario de quién está de guardia.

## Configuración

### ilert

#### Crear un origen de alertas de Datadog

1. Ve a la pestaña **Alert Sources** (Orígenes de alertas) y haz clic en el botón "Create new alert source" (Crear nuevo origen de alertas).

2. Busca "**Datadog**", selecciona el cuadro de **Datadog** y haz clic en **Next** (Siguiente).

   ![Nuevo origen de alertas de ilert][2]

3. Asígnale un nombre.

   ![Nuevo origen de alertas de ilert 2][3]

4. Selecciona la política de derivación que desees.

   ![Nuevo origen de alertas de ilert 3][4]

5. En la página siguiente, se genera una **Webhook URL** (URL de webhook). Necesitarás esta URL para la configuración de la integración en Datadog.

   ![Vista del origen de alertas de ilert][5]

### Datadog

#### Añadir un webhook de ilert como canal de alertas

1. Desde la página **Datadog Integrations** (Integraciones de Datadog), [**instala la integración de Webhooks**][6].
2. En el cuadro de la integración de Webhooks, añade un nuevo webhook:

   ![Nuevo webhook de Datadog][7]

3. Ingresa un nombre, la **URL del webhook de Datadog** generada anteriormente a partir del origen de alertas de ilert y la **carga útil de la plantilla**:

   ```json
   {
     "body": "$EVENT_MSG",
     "last_updated": "$LAST_UPDATED",
     "event_type": "$EVENT_TYPE",
     "alert_transition": "$ALERT_TRANSITION",
     "alert_id": "$ALERT_ID",
     "link": "$LINK",
     "title": "$EVENT_TITLE",
     "date": "$DATE",
     "org": {
       "id": "$ORG_ID",
       "name": "$ORG_NAME"
     },
     "id": "$ID"
   }
   ```

   ![Vista del webhook de Datadog][8]

4. Haz clic en **Save** (Guardar).

## Datos recopilados

### Métricas

La integración de ilert no incluye métricas.

### Eventos

Los eventos activados y resueltos de ilert aparecen en el dashboard de la plataforma ilert.

### Checks de servicio

La integración de ilert no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][9].

[1]: https://www.ilert.com/?utm_medium=organic&utm_source=integration&utm_campaign=datadog
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-alert-source-new.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-alert-source-new-2.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-alert-source-new-3.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-alert-source-view.png
[6]: https://app.datadoghq.com/integrations/webhooks
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-webhook-new.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-webhook-view.png
[9]: https://docs.datadoghq.com/es/help/