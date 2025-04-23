---
app_id: taskcall
app_uuid: dd54da03-0a8c-4796-aaa6-61eeb04e611b
assets:
  oauth: assets/oauth_clients.json
author:
  homepage: https://taskcallapp.com
  name: TaskCall
  sales_email: support@taskcallapp.com
  support_email: support@taskcallapp.com
categories:
- events
- colaboración
- rum
- seguimiento de problemas
- notificaciones
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/taskcall/README.md
display_on_public_website: true
draft: false
git_integration_title: taskcall
integration_id: taskcall
integration_title: TaskCall
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: taskcall
public_title: TaskCall
short_description: Monitorizar y centralizar las incidencias en Datadog con TaskCall
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
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Queried Data Type::Incidents
  configuration: README.md#Setup
  description: Monitorizar y centralizar las incidencias en Datadog con TaskCall
  media:
  - caption: Notificaciones de incidencias
    image_url: images/incident_notifications.png
    media_type: imagen
  - caption: Detalles de la incidencia
    image_url: images/incident_details.png
    media_type: imagen
  - caption: Dashboard de visibilidad y estado del impacto
    image_url: images/impact_visibility_status_dashboard.png
    media_type: imagen
  - caption: Gestión de guardias
    image_url: images/on_call_management.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: TaskCall
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

TaskCall es un sistema de respuesta a incidencias en tiempo real que reduce la caída del sistema automatizando el proceso de respuesta. Acepta continuamente información de las herramientas de monitorización para proporcionar una visión completa de tu sistema. Utiliza sus mecanismos de gestión de guardias y respuesta a incidencias para reunir al equipo adecuado y resolver las incidencias en el menor tiempo posible.

La integración de TaskCall permite a los usuarios de Datadog reforzar sus operaciones mejorando su conocimiento de las incidencias y simplificando el proceso en el que se gestionan. Las incidencias se sincronizan bidireccionalmente entre las dos plataformas. Una vez que se reciben las alertas de Datadog en TaskCall, los usuarios pueden gestionar sistemáticamente todas las incidencias sin ser interrumpidos. Los usuarios también se benefician de una mayor visibilidad del impacto gracias a los gráficos de dependencia y los dashboards de estado. Con una mejor comprensión del estado de tu infraestructura general, se pueden lograr resoluciones eficientes.


## Características principales

- En cuanto se recibe una alerta de Datadog se avisa al personal de guardia.
- Las alertas repetidas se silencian automáticamente para no interrumpir al personal de guardia cuando ya está atendiendo la incidencia.
- La integración es bidireccional. El estado y la prioridad se sincronizan entre Datadog y TaskCall.
- Las incidencias se resuelven automáticamente en TaskCall cuando las condiciones de alerta dejan de estar presentes.
- Esta integración está disponible en todos los planes de suscripción de TaskCall.


## Configuración

Es necesario configurar la integración tanto desde TaskCall como desde Datadog.

### Instalar TaskCall App en Datadog

1. [Crea una cuenta de TaskCall][1] si aún no tienes una.
2. **En Datadog**: navega hasta el [cuadro de integración de TaskCall][2].
3. En el cuadro de integración de TaskCall, ve a la pestaña **Configure** (Configurar) y haz clic en **Connect Accounts** (Conectar cuentas). Se te redirigirá a TaskCall.
4. **En TaskCall**: asigna un **nombre** a la integración y selecciona el **servicio** en el que quieres que esté la integración.

![Autorización de TaskCall][3]

5. Haz clic en **Integrate** (Integrar). Se te redirigirá a una página de autorización de Datadog.
6. Autoriza la integración, asegurándote de que dispones de los permisos correctos para hacerlo.
7. Una vez que autorices la integración serás redirigido a TaskCall.
8. **En TaskCall**: copia la **Integration Url** (Url de integración) que se emite para la integración. Necesitarás esto para configurar el webhook en Datadog.

### Crear Webhook en Datadog

1. Ve a [**Integrations** > **Integrations**][4] (Integraciones > Integraciones).
2. Busca **Webhooks** y haz clic en él.
3. Haz clic en el botón **New Webhook** (Nuevo Webhook).
4. Dale un nombre y pega la **Url de integración** que copiaste de TaskCall.
5. Copia la siguiente [carga útil JSON][5] y pégala en la sección Payload (Carga útil).
```json
{
     "body": "$EVENT_MSG",
     "last_updated": "$LAST_UPDATED",
     "event_type": "$EVENT_TYPE",
     "title": "$EVENT_TITLE",
     "date": "$DATE",
     "org": {
         "id": "$ORG_ID",
         "name": "$ORG_NAME"
     },
     "id": "$ID",
     "aggreg_key": "$AGGREG_KEY",
     "alert": {
         "cycle_key": "$ALERT_CYCLE_KEY",
         "id": "$ALERT_ID",
         "metric": "$ALERT_METRIC",
         "scope": "$ALERT_SCOPE",
         "status": "$ALERT_STATUS",
         "title": "$ALERT_TITLE",
         "transition": "$ALERT_TRANSITION",
         "type": "$ALERT_TYPE",
         "query": "$ALERT_QUERY"
     },
     "user": "$USER",
     "username": "$USERNAME",
     "priority": "$PRIORITY",
     "text_msg": "$TEXT_ONLY_MSG",
     "snapshot": "$SNAPSHOT",
     "link": "$LINK",
     "hostname": "$HOSTNAME",
     "incident_uuid": "$INCIDENT_UUID",
     "incident_public_id": "$INCIDENT_PUBLIC_ID",
     "incident_title": "$INCIDENT_TITLE",
     "incident_url": "$INCIDENT_URL",
     "incident_msg": "$INCIDENT_MSG",
     "incident_severity": "$INCIDENT_SEVERITY",
     "security_rule_id": "$SECURITY_RULE_ID",
     "security_rule_name": "$SECURITY_RULE_NAME",
     "security_signal_severity": "$SECURITY_SIGNAL_SEVERITY",
     "security_signal_title": "$SECURITY_SIGNAL_TITLE",
     "security_signal_msg": "$SECURITY_SIGNAL_MSG",
     "security_rule_query": "$SECURITY_RULE_QUERY",
     "security_rule_type": "$SECURITY_RULE_TYPE",
     "tags": "$TAGS"
}
```
6. Una vez introducidos los datos, haz clic en Save (Guardar).

Para más información, consulta la [Guía de la integración de TaskCall Datadog][6].

## Desinstalación

- En TaskCall, elimina la integración de Services > Integrations (Servicios > Integraciones).
- Navega hasta el [cuadro de integración de TaskCall][2] en Datadog y desinstálalo. También debes eliminar el webhook que creaste para enviar notificaciones a TaskCall.
- Una vez desinstalada esta integración, se revocan todas las autorizaciones anteriores.


## Agent

[Ponte en contacto con el servicio de asistencia de TaskCall][7] si tienes alguna pregunta sobre la integración o la plataforma.


[1]: https://app.us.taskcallapp.com/register
[2]: https://app.datadoghq.com/integrations/taskcall
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/taskcall/images/DatadogTaskCallAuthorization.png
[4]: https://app.datadoghq.com/integrations
[5]: https://docs.taskcallapp.com/integrations/v1/datadog-integration-guide#in-datadog
[6]: https://docs.taskcallapp.com/integrations/v1/datadog-integration-guide
[7]: https://www.taskcallapp.com/contact-us