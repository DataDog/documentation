---
app_id: stackpulse
app_uuid: c42edc68-cb25-43f9-9bd2-657a2b7dea82
assets:
  dashboards:
    StackPulse: assets/dashboards/stackpulse_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: stackpulse.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10173
    source_type_name: StackPulse
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Torq
  sales_email: support@stackpulse.io
  support_email: support@stackpulse.io
categories:
- automatización
- colaboración
- rum
- notificaciones
- orquestación
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/stackpulse/README.md
display_on_public_website: true
draft: false
git_integration_title: stackpulse
integration_id: stackpulse
integration_title: StackPulse
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: stackpulse
public_title: StackPulse
short_description: Automatización de las respuestas a tus alertas y seguimiento de
  las ejecuciones de playbooks en tu flujo (stream) de eventos
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Automatización
  - Categoría::Colaboración
  - Categoría::Incidentes
  - Categoría::Notificaciones
  - Categoría::Orquestación
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Automatización de las respuestas a tus alertas y seguimiento de las
    ejecuciones de playbooks en tu flujo (stream) de eventos
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: StackPulse
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

La integración [StackPulse][1] te permite activar playbooks automáticos en respuesta a alertas de Datadog y te proporciona un enriquecimiento de las alertas, la mitigación de los incidentes y colaboración. Podrás enviar eventos desde las ejecuciones de tus playbooks directamente a tu flujo de eventos de Datadog y a tu dashboard de StackPulse exclusivo.

## Configuración

Para configurar esta integración, debes tener una [cuenta de StackPulse][2] activa y un rol de Propietario de cuenta en esa cuenta. También debes tener permisos de administrador adecuados en Datadog.

### StackPulse

1. En la página **Integrations** (Integraciones), en **Monitoring** (Monitorización), localiza la tarjeta **Datadog** y haz clic en [**New** (Nuevo)][2].

2. Introduce un nombre significativo para la integración y haz clic en **Add** (Añadir).

3. **Copia** el endpoint de webhook recién creado.

### Datadog

1. Ve a **Integrations** (Integraciones) y elige la tarjeta [**Webhooks**][3].

2. Haz clic en **New** (Nuevo) para añadir una nueva integración de webhook.

3. Introduce un nombre para la nueva integración de webhook (recuerda que lo utilizarás más adelante en monitores específicos de Datadog para activar StackPulse) y la URL del webhook del paso anterior.

4. StackPulse recomienda mejorar la carga útil con información de alerta adicional, utilizando partes de una configuración a continuación:

    ```json
    {
        "body": "$EVENT_MSG",
        "title": "$EVENT_TITLE",
        "date": "$DATE",
        "id": "$ID",
        "metadata": {
            "AGGREG_KEY": "$AGGREG_KEY",
            "ALERT_CYCLE_KEY": "$ALERT_CYCLE_KEY",
            "ALERT_ID": "$ALERT_ID",
            "ALERT_METRIC": "$ALERT_METRIC",
            "ALERT_QUERY": "$ALERT_QUERY",
            "ALERT_SCOPE": "$ALERT_SCOPE",
            "ALERT_STATUS": "$ALERT_STATUS",
            "ALERT_TITLE": "$ALERT_TITLE",
            "ALERT_TRANSITION": "$ALERT_TRANSITION",
            "ALERT_TYPE": "$ALERT_TYPE",
            "EMAIL": "$EMAIL",
            "EVENT_MSG": "$EVENT_MSG",
            "EVENT_TITLE": "$EVENT_TITLE",
            "EVENT_TYPE": "$EVENT_TYPE",
            "HOSTNAME": "$HOSTNAME",
            "ID": "$ID",
            "LAST_UPDATED": "$LAST_UPDATED",
            "LINK": "$LINK",
            "METRIC_NAMESPACE": "$METRIC_NAMESPACE",
            "ORG_ID": "$ORG_ID",
            "ORG_NAME": "$ORG_NAME",
            "PRIORITY": "$PRIORITY",
            "SNAPSHOT": "$SNAPSHOT",
            "TAGS": "$TAGS",
            "TEXT_ONLY_MSG": "$TEXT_ONLY_MSG",
            "USER": "$USER",
            "USERNAME": "$USERNAME",
            "LOGS_SAMPLE": "$LOGS_SAMPLE"
        }
    }
    ```

5. Elige monitores para activar playbooks de StackPulse y, en el campo **Alert Your Team** (Alertar a tu equipo), añade una referencia a la integración de webhook recién creada. Para obtener más detalles, consulta [Gestionar monitores][4].

6. Ve a **Integrations -> APIs** (Integraciones -> API) y elige la tarjeta **API Keys** (Claves de API). En **New API Key** (Nueva clave de API), introduce un nombre significativo para la nueva clave, haz clic en **Create API Key** (Crear clave API) y luego **copia** la nueva clave.

### Volver a StackPulse

1. En la página **Integrations** (Integraciones), en **Secrets** (Secretos), localiza la tarjeta **Datadog API Keys** (Claves de API Datadog) y haz clic en [**Add** (Añadir)][5].

2. Introduce un nombre significativo para la integración y haz clic en **Add** (Añadir).

## Datos recopilados

### Métricas

La integración StackPulse no proporciona métricas.

### Eventos

La integración StackPulse te permite enviar eventos a tu flujo (stream) de eventos de Datadog utilizando el paso [Evento post en Datadog][6]. Puedes utilizar el paso con tus playbooks para notificar a Datadog sobre mitigaciones exitosas y fallos de ejecución, y para enviar datos de alerta mejorados a Datadog.

### Checks de servicio

La integración StackPulse no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].

[1]: https://stackpulse.com
[2]: https://stackpulse.com/get-started/
[3]: https://app.datadoghq.com/account/settings#integrations/webhooks
[4]: https://docs.datadoghq.com/es/monitors/manage/
[5]: https://app.stackpulse.io/integrations/datadog%20api%20keys?create=true
[6]: https://github.com/stackpulse/steps/tree/master/steps/datadog/post-event
[7]: https://docs.datadoghq.com/es/help/