---
app_id: alertnow
app_uuid: cdb258cc-5e74-4fa2-be21-1489375bb370
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: alertnow.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10279
    source_type_name: AlertNow
author:
  homepage: https://service.opsnow.com
  name: AlertNow
  sales_email: sales@opsnow.com
  support_email: support@opsnow.com
categories:
- events
- automatización
- colaboración
- rum
- móvil
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/alertnow/README.md
display_on_public_website: true
draft: false
git_integration_title: alertnow
integration_id: alertnow
integration_title: AlertNow
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: alertnow
public_title: AlertNow
short_description: Sincroniza las alertas de Datadog con las de AlertNow
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Automation
  - Category::Collaboration
  - Category::Incidents
  - Category::Mobile
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Configuración
  description: Sincroniza las alertas de Datadog con las de AlertNow
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: AlertNow
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

AlertNow es una plataforma integrada de gestión de incidencias que recopila alertas de diversos y complejos entornos de TI y las envía a las personas adecuadas, lo que les permite gestionar las incidencias con rapidez. Al conectar AlertNow con Datadog, se sincronizan de manera automática las alertas de Datadog con las de AlertNow. Puedes gestionar alertas en una única plataforma, notificar a tus equipos y responder a problemas críticos de inmediato.


Lo que ofrece AlertNow:
- Desencadenar y resolver incidencias de Datadog
- Notificar a las personas adecuadas por correo electrónico, SMS, llamada de voz y aplicación móvil cuando ocurran las incidencias

- Notificar a los usuarios en función de la política de escalado
- Informes sobre MTTA y MTTR, informes de análisis


![información general de alertnow][1]

## Configuración

### AlertNow

Para conectar Datadog con AlertNow, crea un webhook y monitores en Datadog.


1. Usa tu cuenta existente o crea una cuenta de AlertNow en opsnow.com.

2. Inicia sesión en AlertNow y dirígete al menú Configuration > Integration (Configuración > Integración).
3. Haz clic en **Create Integration** (Crear integración) y, a continuación, selecciona la opción de **Datadog**.

    ![opción de datadog][2]

4. En la página de crear integración, ingresa la información requerida y, a continuación, haz clic en el botón de aceptar para crear la integración.

    ![integración de datadog][3]

5. Copia la URL de la página de integración de AlertNow.
    ![detalles de datadog][4]


### Datadog

Sigue los pasos que se indican a continuación en tu cuenta de Datadog.


1. Abre el [cuadro de integración de Webhooks][5].

2. Selecciona la pestaña **Configuration** (Configuración), desplázate hasta el final y haz clic en **New** (Nuevo).

3. En el formulario **New Webhook** (Webhook nuevo), ingresa un nombre significativo y la URL del webhook de AlertNow creada en la página de integración de AlertNow. El formato de la URL del webhook de AlertNow copiada es el siguiente. Sustituye tu clave de API por **{ALERTNOW-API-KEY}**.



    <pre><code> https://alertnowitgr.opsnow.com/integration/datadog/v1/{ALERTNOW-API-KEY} </code></pre>

    ![webhook de datadog][6]

4. Copia la siguiente carga útil JSON y pégala en la ventana de carga útil.


    ``` json
    {
        "id":"$ID",
        "email":"$EMAIL",
        "eventTitle":"$EVENT_TITLE",
        "eventMsg":"$EVENT_MSG",
        "textOnlyMsg":"$TEXT_ONLY_MSG",
        "eventType":"$EVENT_TYPE",
        "date":"$DATE",
        "datePosix":"$DATE_POSIX",
        "alertId":"$ALERT_ID",
        "alertType":"$ALERT_TYPE",
        "aggregKey":"$AGGREG_KEY",
        "orgId":"$ORG_ID",
        "alertStatus":"$ALERT_STATUS",
        "alertScope":"$ALERT_SCOPE",
        "hostname":"$HOSTNAME",
        "user":"$USER",
        "username":"$USERNAME",
        "snapshot":"$SNAPSHOT",
        "link":"$LINK",
        "priority":"$PRIORITY",
        "tags":"$TAGS",
        "lastUpdated":"$LAST_UPDATED",
        "lastUpdatedPosix":"$LAST_UPDATED_POSIX",
        "alertMetric":"$ALERT_METRIC",
        "metricNamespace":"$METRIC_NAMESPACE",
        "alertTransition":"$ALERT_TRANSITION",
        "orgName":"$ORG_NAME",
        "alertQuery":"$ALERT_QUERY",
        "alertTitle":"$ALERT_TITLE",
        "alertCycleKey":"$ALERT_CYCLE_KEY"
    }

    ```

5. Consulta la [documentación de alertas][7] de Datadog para crear monitores.



## Soporte

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de AlertNow][8].


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/alertnow_overview.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/integration_card_datadog.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/create_integration_datadog_en.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/datadog_integration_detail.png
[5]: https://app.datadoghq.com/account/login?next=%2Faccount%2Fsettings#integrations/webhooks
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/datadog_webhook.png
[7]: https://docs.datadoghq.com/es/monitors/
[8]: mailto:support@opsnow.com