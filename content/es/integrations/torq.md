---
app_id: torq
app_uuid: 56e675d8-a461-46ec-93e9-9e8618d21354
assets:
  dashboards:
    Torq: assets/dashboards/torq_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: torq.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10231
    source_type_name: Torq
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Torq
  sales_email: support@torq.io
  support_email: support@torq.io
categories:
- automatización
- notificaciones
- orquestación
- seguridad
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/torq/README.md
display_on_public_website: true
draft: false
git_integration_title: torq
integration_id: torq
integration_title: Torq
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: torq
public_title: Torq
short_description: Automatización sin código para equipos de seguridad y operaciones
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Notifications
  - Category::Orchestration
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Automatización sin código para equipos de seguridad y operaciones
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Torq
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

La integración de [Torq][1] te permite desencadenar flujos de trabajo en respuesta a alertas de Datadog, proporcionando una mejora en las alertas. A continuación, puedes devolver eventos directamente desde tus flujos de trabajo de Torq a tu flujo de eventos de Datadog y dashboard de Torq dedicado.

## Configuración

Para configurar esta integración, debes tener una [cuenta de Torq][2] activa y un rol de Propietario de cuenta en esa cuenta. También debes tener permisos de administrador adecuados en Datadog.

### Crear una integración de disparador de Datadog en Torq

1. Ve a **Integrations** > **Triggers** (Integraciones > Disparadores), ubica la tarjeta **Datadog** y haz clic en **Add** (Añadir).

2. Introduce un nombre significativo para la integración y haz clic en **Add** (Añadir).

3. Copia la URL del webhook generado. Necesitas esta URL para configurar una integración de webhook en tu inquilino de Datadog.

### Definir monitores de Datadog para activar eventos en Torq

1. Ve a **Integrations** > **Integrations** (Integraciones > Integraciones), haz clic en la tarjeta **Webhooks** y haz clic en **New** (Nuevo).
    ![datadog_webhook][3]

2. Introduce un nombre significativo para la integración de webhook y pega la URL del webhook generada por Torq. Necesitas el nombre de la integración para asociar el identificador (utilizado para monitores específicos de Datadog para activar Torq) y la URL de webhook generada desde Torq.
    ![datadog_webhook_2][4]

3. Torq recomienda añadir información adicional de alerta a la carga útil. Puedes utilizar partes de la siguiente configuración:

    ```json linenums="1"
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

4. Elige monitores para activar manuales de Torq y añade una referencia a la integración de webhook recién creada en el campo **Alert Your Team** (Alerta a tu equipo). Para más detalles, consulta [Gestionar monitores][5].

## Utiliza pasos de Datadog en los flujos de trabajo de Torq

Necesitas crear una clave de API de Datadog y una clave de aplicación para utilizarlas como parámetros de entrada para los pasos de Datadog en Torq.

**Nota:** Algunos pasos de Datadog en Torq requieren una clave de API y una clave de aplicación, mientras que otros pasos requieren la integración de Datadog.

### Crear una clave de API en Datadog

Después de crear la clave de API, cópiala y guárdala porque no podrás acceder a ella más tarde. Para obtener más información, consulta [Claves de API y de aplicación][6].

1. Pasa el ratón por encima de tu nombre de usuario y selecciona **Organization Settings** (Parámetros de organización).
2. En el panel izquierdo, haz clic en **API Keys** (Claves de API).
3. Haz clic en **+ New Key** (+ Clave nueva).
    ![datadog_api_key][7]
4. Introduce un nombre significativo para la clave de API, como `Torq`, y haz clic en **Create key** (Crear clave).
5. Copia la `Key` y guárdala. Necesitas esta clave para crear una integración de Datadog en Torq.

### Crear una clave de aplicación en Datadog

Después de crear la clave de aplicación, cópiala y guárdala porque no podrás acceder a ella más tarde. Para obtener más información, consulta [Claves de API y de aplicación][8].

1. Pasa el ratón por encima de tu nombre de usuario y selecciona **Organization Settings** (Parámetros de organización).
2. En el panel izquierdo, haz clic en **Application Keys** (Claves de aplicación).
3. Haz clic en **+ New Key** (+ Clave nueva).
    ![datadog_app_key][9]
4. Introduce un nombre significativo para la clave de aplicación, como `Torq`, y haz clic en **Create key** (Crear clave).
5. Copia la `Key` y guárdala. Necesitas esta clave para crear una integración de Datadog en Torq.

### Crear una integración de Datadog en Torq

Esta integración te permite utilizar pasos de Datadog en tus flujos de trabajo de Torq.

1. Ve a **Integrations** > **Steps** (Integraciones > Pasos), ubica la tarjeta **Datadog** y haz clic en **Add** (Añadir).

2. Introduce un nombre significativo para la integración, como `Datadog-<monitor_type>`, y haz clic en **Add** (Añadir).

## Datos recopilados

### Métricas

La integración de Torq no proporciona ninguna métrica.

### Eventos

La integración de Torq te permite enviar eventos a tu flujo de eventos de Datadog desde un flujo de trabajo de Torq utilizando el paso Post Event (Publicar evento) de Datadog. Puedes utilizar el paso con tus manuales para notificar a Datadog sobre mitigaciones exitosas y fallos de ejecución. También puedes enviar datos de alerta mejorada a Datadog.

### Checks de servicio

La integración de Torq no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

[1]: https://torq.io
[2]: https://torq.io/get-started/
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/torq/images/datadog_webhook_search.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/torq/images/datadog_webhook_config.png
[5]: https://docs.datadoghq.com/es/monitors/manage_monitor/
[6]: https://docs.datadoghq.com/es/account_management/api-app-keys/#add-an-api-key-or-client-token
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/torq/images/datadog_api_key_2.png
[8]: https://docs.datadoghq.com/es/account_management/api-app-keys/#add-application-keys
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/torq/images/datadog_app_key_2.png
[10]: https://docs.datadoghq.com/es/help/