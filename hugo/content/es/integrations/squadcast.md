---
app_id: squadcast
app_uuid: cfa65726-33af-42bf-8be3-7abb43147a47
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: squadcast.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10090
    source_type_name: Squadcast
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Squadcast
  sales_email: it@squadcast.com
  support_email: it@squadcast.com
categories:
- events
- colaboración
- rum
- seguimiento de problemas
- notificaciones
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/squadcast/README.md
display_on_public_website: true
draft: false
git_integration_title: squadcast
integration_id: squadcast
integration_title: Squadcast
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: squadcast
public_title: Squadcast
short_description: Recibe notificaciones de tus alertas de Datadog y toma medidas
  utilizando Squadcast.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Alertas
  - Categoría::Colaboración
  - Categoría::Incidentes
  - Categoría::Seguimiento de problemas
  - Categoría::Notificaciones
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Recibe notificaciones de tus alertas de Datadog y toma medidas utilizando
    Squadcast.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Squadcast
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## Información general

Utiliza la integración Squadcast en Datadog para enviar alertas o incidentes de Datadog a Squadcast y tomar medidas continuas dentro de Squadcast.

Conecta Squadcast a Datadog para:
- Activar, enrutar y resolver las alertas o los incidentes de Datadog.
- Abordar las alertas o los incidentes y definir políticas de escalado a medida que se producen.
- Definir horarios de guardia y configurar recordatorios personalizables de quién está de guardia.

## Configuración

**Nota**: Sólo los usuarios de Squadcast con los privilegios adecuados a nivel de equipo pueden configurar servicios en Squadcast. Debe configurarse al menos una política de escalado antes de poder añadir un servicio.

### Squadcast

Sigue estos pasos en Squadcast:

1. Elige el **Equipo** en el selector de equipos de la parte superior.

2. Abre la página **Services** (Servicios) desde la barra de navegación principal de la izquierda.

3. Elige un servicio existente o crea un nuevo servicio haciendo clic en **Add Service** (Añadir servicio).

4. Haz clic en **Alert Sources** (Fuentes de alerta) y selecciona **Datadog** en el menú desplegable.

5. Copia la **URL del webhook Datadog** mostrada y haz clic en **Done** (Listo).

### Datadog

Sigue estos pasos en Datadog:

1. Abre la página **Integrations** (Integraciones) desde la barra lateral.

2. Utiliza la barra de búsqueda para buscar "webhooks".

3. Una vez que aparezca el cuadro **Webhooks**, pasa el cursor sobre él y haz clic en **Install** (instalar).

4. Ve a la pestaña **Configuración** y desplázate hasta el final de la página.

5. (a) Pon un nombre al webhook en el campo **Name** (Nombre).

   (b) Pega la **URL del webhook Datadog** proporcionada por Squadcast en el campo **URL**.

   (c) Copia y pega el siguiente JSON en el cuadro de texto de la sección **Payload** (Carga útil).

![Webhook Squadcast][1]

```json
    {
       "alertId": "$ALERT_ID",
       "eventMessage": "$TEXT_ONLY_MSG",
       "title": "$EVENT_TITLE",
       "url": "$LINK",
       "alertTransition": "$ALERT_TRANSITION",
       "hostname": "$HOSTNAME",
       "orgName":"$ORG_NAME",
       "priority":"$PRIORITY",
       "snapshot": "$SNAPSHOT",
       "alertQuery": "$ALERT_QUERY",
       "alertScope": "$ALERT_SCOPE",
       "alertStatus": "$ALERT_STATUS",
       "eventType": "$EVENT_TYPE",
       "event_id": "$ID",
       "alert_metric": "$ALERT_METRIC",
       "alert_priority": "$ALERT_PRIORITY",
       "alert_title": "$ALERT_TITLE",
       "alert_type" : "$ALERT_TYPE",
       "event_msg" : "$EVENT_MSG",
       "incident_pub_id" : "$INCIDENT_PUBLIC_ID",
       "incident_title" : "$INCIDENT_TITLE",
       "incident_url" : "$INCIDENT_URL",
       "incident_msg" : "$INCIDENT_MSG",
       "security_rule_id" : "$SECURITY_RULE_ID",
       "security_rule_name" : "$SECURITY_RULE_NAME",
       "security_signal_severity" : "$SECURITY_SIGNAL_SEVERITY",
       "security_signal_title" : "$SECURITY_SIGNAL_TITLE",
       "security_signal_msg" : "$SECURITY_SIGNAL_MSG",
       "security_rule_query" : "$SECURITY_RULE_QUERY",
       "security_rule_type" : "$SECURITY_RULE_TYPE",
       "tags" : "$TAGS"
   }
```

6. Haz clic en **Save** (Guardar) para finalizar la integración del servicio.

   Para obtener más detalles, consulta la [documentación de Squadcast][2].

**Nota**: Una vez configurado el webhook para Squadcast, selecciona el mismo como canal en **Notify your team** (Notificar a tu equipo) en la configuración del monitor Datadog.

## Datos recopilados
### Métricas

La integración Squadcast no incluye métricas.

### Eventos

Los eventos de Squadcast activados y resueltos se muestran en el dashboard de tu plataforma Squadcast.

### Checks de servicio

La integración Squadcast no incluye checks de servicio.

## Solucionar problemas
¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/squadcast/images/datadog-webhook.png
[2]: https://support.squadcast.com/docs/datadog
[3]: https://docs.datadoghq.com/es/help/