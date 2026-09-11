---
app_id: signl4
app_uuid: 07952edd-2dc5-4c11-a697-5cba325f64ee
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: signl4.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10158
    source_type_name: SIGNL4
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: SIGNL4
  sales_email: success@signl4.com
  support_email: success@signl4.com
categories:
- events
- colaboración
- rum
- seguimiento de problemas
- notificaciones
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/signl4/README.md
display_on_public_website: true
draft: false
git_integration_title: signl4
integration_id: signl4
integration_title: SIGNL4
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: signl4
public_title: SIGNL4
short_description: Recibe notificaciones de tus alertas en Datadog y actúa en consecuencia
  con SIGNL4.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Collaboration
  - Category::Incidents
  - Category::Issue Tracking
  - Category::Notifications
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Recibe notificaciones de tus alertas en Datadog y actúa en consecuencia
    con SIGNL4.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: SIGNL4
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->
## Información general

Utiliza la integración de [SIGNL4][1] para enviar alertas de Datadog a los equipos de SIGNL4 y tomar medidas sin problemas sobre estas alertas dentro de la aplicación SIGNL4.

Conecta SIGNL4 a Datadog para:
- Desencadenar y resolver incidencias de Datadog
- Abordar las incidencias y establecer políticas de escalada a medida que se producen
- Establecer un recordatorio diario de quién está de guardia

![SIGNL4 App][2]

## Configuración

### SIGNL4

Sigue estos pasos en SIGNL4:

1. Utiliza tu cuenta existente o crea una cuenta SIGNL4 en [signl4.com][1].

2. En tu aplicación SIGNL4, encuentra la dirección de tu webhook SIGNL4 incluyendo el secreto de tu equipo en *Teams -> Your Team -> Secret* (Equipos -> Tu equipo -> Secreto).

### Alertas de Datadog

Puedes alertar a tu equipo de SIGNL4 sobre nuevas alertas en Datadog. Las alertas que se resuelven en Datadog cierran automáticamente la alerta en SIGNL4. Para ello es necesario configurar:

1. Navega hasta el [cuadro de integración de webhooks][3].

2. En la pestaña **Configuration** (Configuración), ve a webhooks y haz clic en **New** (Nuevo).

3. En **New Webhook** (Nuevo webhook), introduce un `Name` significativo y utiliza la `URL` de webhook de SIGNL4  (creada anteriormente) incluyendo el secreto de tu equipo, por ejemplo:

    ```
    https://connect.signl4.com/webhook/[team-secret]?ExtIDParam=alertId&ExtStatusParam=alertTransition&ResolvedStatus=Recovered
    ```

    Sustituye aquí `[team-secret]` por el secreto de tu equipo de SIGNL4.

    [Webhook de alertas de SIGNL4][4]

4. Copia y pega el siguiente JSON en el cuadro de texto `Payload`:

    ```json
    {
        "title": "$EVENT_TITLE",
        "message": "$TEXT_ONLY_MSG",
        "link": "$LINK",
        "priority": "$ALERT_PRIORITY",
        "host": "$HOSTNAME",
        "alertScope": "$ALERT_SCOPE",
        "alertStatus": "$ALERT_STATUS",
        "alertId": "$ALERT_ID",
        "alertTransition": "$ALERT_TRANSITION",
        "X-S4-SourceSystem": "Datadog",
        "date": "$DATE",
        "org": {
            "id": "$ORG_ID",
            "name": "$ORG_NAME"
        },
        "id": "$ID"
    }
    ```

Puedes adaptar los parámetros según tus necesidades, pero deja `alertId`, `alertTransition` y `X-S4-SourceSystem` sin cambios.

5. Haz clic en **Save** (Guardar) para crear el webhook.

Para más detalles, consulta [Alerta móvil con el seguimiento y escalamiento para Datadog][5].

Ahora puedes utilizar tu webhook como un canal de notificación en tu monitor. Suponiendo que el nombre de tu webhook sea SIGNL4, envía notificaciones utilizando `@webhook-SIGNL4`. Cuando las condiciones del monitor se cumplen, tu equipo recibe una nueva alerta de SIGNL4.

### Incidencias de Datadog

Puedes alertar a tu equipo de SIGNL4 sobre nuevas incidencias en Datadog. Las incidencias que se resuelven en Datadog cierran automáticamente la alerta en SIGNL4. Para ello es necesario configurar lo siguiente:

1. Navega hasta el [cuadro de integración de webhooks][3].

2. En la pestaña **Configuration** (Configuración), ve a webhooks y haz clic en **New** (Nuevo).

3. En **New Webhook** (Nuevo webhook), introduce un `Name` significativo y utiliza la `URL` de webhook de SIGNL4  (creada anteriormente) incluyendo el secreto de tu equipo, por ejemplo:

    ```
    https://connect.signl4.com/webhook/[team-secret]?ExtIDParam=s4ExternalId&ExtStatusParam=incidentStatus&ResolvedStatus=resolved
    ```

    Sustituye `[team-secret]` en la URL por el secreto de tu equipo de SIGNL4.

    ![Webhook de incidencias de SIGNL4][6]

4. Copia y pega el siguiente JSON en el cuadro de texto `Payload`:

    ```json
    {
        "title": "$EVENT_TITLE",
        "message": "$TEXT_ONLY_MSG",
        "link": "$LINK",
        "priority": "$ALERT_PRIORITY",
        "host": "$HOSTNAME",
        "alertScope": "$ALERT_SCOPE",
        "alertStatus": "$ALERT_STATUS",
        "alertId": "$ALERT_ID",
        "incidentPublicId": "$INCIDENT_PUBLIC_ID",
        "incidentStatus": "$INCIDENT_STATUS",
        "alertTransition": "$ALERT_TRANSITION",
        "s4ExternalId": "DATADOG-INCIDENT-$INCIDENT_PUBLIC_ID",
        "X-S4-SourceSystem": "Datadog",
        "date": "$DATE",
        "org": {
            "id": "$ORG_ID",
            "name": "$ORG_NAME"
        },
        "id": "$ID"
    }
    ```

Adapta los parámetros según tus necesidades, pero deja `incidentStatus`, `s4ExternalId` y `X-S4-SourceSystem` sin cambios.

5. Haz clic en **Save** (Guardar) para crear el webhook.

Para más detalles, consulta [Alerta móvil con el seguimiento y escalamiento para Datadog][5].

### Regla sobre incidencias

Puedes crear una regla en Datadog en Monitors ->  Settings (Incidents) Rules (Monitores -> Reglas de configuración (incidencias). En la regla se especifican los criterios, por ejemplo, la gravedad, servicio, etc. Para "Other attributes" (Otros atributos), es recomendado utilizar "state:active" para activar una nueva alerta y "state:resolved" para cerrar la alerta. En "Notify" (Notificar), selecciona tu webhook de incidencias de SIGNL4 tal y como se ha creado anteriormente.

![Regla de incidencias de SIGNL4] [7

Si creas una nueva incidencia, tu equipo de SIGNL4 recibe una alerta. Si reconoce o cierras la alerta en la aplicación de SIGNL4, el estado de la incidencia se establece en Estable o Resuelta.

Además, si estableces el estado de la incidencia en Resuelta en Datadog, esto cierra la alerta en SIGNL4.

### Actualización del estado de las incidencias en Datadog 

Para las incidencias de Datadog, puedes actualizar el estado a Estable o Resuelta directamente desde tu aplicación de SIGNL4 reconociendo o cerrando la alerta respectiva.

Con el fin de configurar este canal de retorno, ve a tu portal web de SIGNL4 y luego a Teams -> Apps (Equipos -> Aplicaciones). Busca la aplicación del conector de Datadog y haz clic en "Create" (Crear) allí. Puedes encontrar más información directamente en la configuración de la aplicación.

![Aplicación del conector de Datadog][8]

Tienes que configurar lo siguiente:

- URL de Datadog: la URL de tu instancia de Datadog, por ejemplo, https://app.datadoghq.com/ o https://app.datadoghq.eu/.  
- Clave de API de Datadog: tu clave de API en Datadog. Puedes encontrar o crear una clave de API en Datadog en tu cuenta, Organization Settings -> API Keys (Parámetros de organización -> Claves de API). 
- Clave de aplicación de Datadog: tu clave de aplicación en Datadog. Puedes encontrar o crear una clave de aplicación en Datadog en tu cuenta,  Organization Settings -> Application Keys (Parámetros de organización -> Claves de aplicación).
- Reconocimiento como Estable: los reconocimientos establecen el estado de la incidencia como Estable.  

## Datos recopilados

### Métricas

La integración de SIGNL4 no incluye ninguna métrica.

### Eventos

Los eventos activados y resueltos por SIGNL4 aparecen en tu aplicación y portal web de SIGNL4.

### Checks de servicio

La integración de SIGNL4 no incluye ningún check de servicio.

## Solucionar problemas
¿Necesitas ayuda? Ponte en contacto con el [Soporte de SIGNL4][9].


[1]: https://www.signl4.com
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/signl4/images/signl4-phone.png
[3]: https://app.datadoghq.com/account/settings#integrations/webhooks
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/signl4/images/datadog-alerts-webhook.png
[5]: https://www.signl4.com/blog/portfolio_item/datadog_mobile_alerting/
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/signl4/images/datadog-incidents-webhook.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/signl4/images/datadog-incidents-rule.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/signl4/images/signl4-datadog-connector-app.png
[9]: mailto:success@signl4.com