---
description: Una referencia de todas las variables de plantilla disponibles en Incident
  Management que se utilizan en plantillas de notificación, postmortem, Jira y nombres
  de canal.
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/templates
  tag: Documentación
  text: Configure plantillas de notificación y postmortem
- link: /incident_response/incident_management/setup_and_configuration/notification_rules
  tag: Documentación
  text: Configure las reglas de notificación
- link: /incident_response/incident_management/setup_and_configuration/property_fields
  tag: Documentación
  text: Configure campos de propiedad
title: Referencia de variables de incidente
---
## Descripción general {#overview}

Las variables de incidente son variables de plantilla que inyectan dinámicamente datos de incidentes en notificaciones, postmortems, incidencias de Jira y nombres de canal. Utilícelas para completar automáticamente las plantillas con el contexto relevante del incidente, lo que reduce el esfuerzo manual durante y después de un incidente.

Las variables están disponibles en cuatro tipos de plantilla:

- **Notifications**: Se utilizan en notificaciones de incidentes manuales y automatizadas enviadas por correo electrónico, Slack u otros canales.
- **Plantillas de postmortem**: Se utilizan para completar automáticamente Datadog Notebooks o páginas de Confluence al generar un postmortem.
- **Plantillas de Jira**: Se utilizan para asignar campos de incidente a campos de incidencia de Jira cuando se crea una incidencia de Jira a partir de un incidente.
- **Plantillas de nombre de canal**: Se utilizan para generar el nombre del canal de Slack, el canal de Microsoft Teams o el espacio de Google Chat que Datadog crea automáticamente para un incidente.

**Nota**: En las plantillas de Jira, las variables se muestran sin su prefijo. Por ejemplo, `{{incident.title}}` appears as `{{ title }}` en el editor de plantillas de Jira. Las variables se comportan de la misma manera.

## Variables de incidente {#incident-variables}

Las siguientes variables están disponibles en mensajes de notificación, plantillas de postmortem y plantillas de Jira.

| Variable | Descripción |
|---|---|
| `{{incident.<property_field_name>}}` | Any [custom property field][2] configured for your organization. Replace `<property_field_name>` with the field name. |
| `{{incident.id}}` | The incident's public ID. |
| `{{incident.title}}` | The incident title. |
| `{{incident.severity}}` | The incident severity (for example, `SEV-1`, `SEV-2`). |
| `{{incident.severity_number}}` | The numeric part of the incident severity, such as `1` for `SEV-1`. Empty if there is no numeric value. |
| `{{incident.status}}` | The incident [status level][1]. |
| `{{incident.created}}` | Timestamp when the incident was created. |
| `{{incident.detected}}` | Timestamp when the incident was detected. |
| `{{incident.resolved}}` | Timestamp when the incident was resolved. |
| `{{incident.time_to_detect}}` | Time from the earliest impact start to detection. |
| `{{incident.time_to_internal_response}}` | Time from detection to declaration. |
| `{{incident.time_to_repair}}` | Time from detection to the latest recorded impact end. |
| `{{incident.time_to_resolve}}` | Time from declaration to resolution. |
| `{{incident.time_from_detect_to_resolve}}` | Time from detection to resolution. |
| `{{incident.mean_time_to_<metric>_<window>}}` | Average duration for other incidents of the same type. Replace `<metric>` with `detect`, `internal_response`, `repair`, or `resolve`. Replace `<window>` with `30_days`, `90_days`, or `12_months` (365 days). Example: `{{incident.mean_time_to_resolve_30_days}}`. |
| `{{incident.mean_time_from_detect_to_resolve_<window>}}` | Average time from detection to resolution for other incidents of the same type. Replace `<window>` with `30_days`, `90_days`, or `12_months` (365 days). |
| `{{incident.customer_impacted}}` | `True` or `False`, depending on whether an impact has been added to the incident. |
| `{{incident.customer_impact}}` | A description of the impacts and their duration. |
| `{{incident.scope_of_impact}}` | A list of the impact descriptions. |
| `{{incident.customer_impact_start}}` | The start time of the impact. If multiple impacts were added, this is the earliest start time. |
| `{{incident.customer_impact_end}}` | The end time of the impact. If multiple impacts were added, this is the latest end time. |
| `{{incident.customer_impact_duration}}` | The total duration of the impacts,  from `customer_impact_start` to `customer_impact_end`. |
| `{{incident.commander}}` | The incident commander's name. If the user has no name, this is their email. If they have no email, this is their handle. |
| `{{incident.commander_name}}` | The incident commander's name. |
| `{{incident.commander_handle}}` | The incident commander's handle. |
| `{{incident.commander_email}}` | The incident commander's email address. |
| `{{incident.created_by_name}}` | The name of the user who created the incident. |
| `{{incident.created_by_handle}}` | The handle of the user who created the incident. |
| `{{incident.created_by_email}}` | The email address of the user who created the incident. |
| `{{incident.responders_summary}}` | A summary of the incident's responders, truncated if there are many responders. |
| `{{incident.responders_full_list}}` | The full, non-truncated list of the incident's responders. |
| `{{incident.slack_channel_name}}` | The name of the incident's Slack channel. |
| `{{incident.slack_channel_url}}` | The URL of the incident's Slack channel. |
| `{{incident.slack_channel_link}}` | A Markdown link to the incident's Slack channel. |
| `{{incident.slack_channel_id}}` | The ID of the incident's Slack channel. |
| `{{incident.ms_teams_channel_name}}` | The name of the incident's Microsoft Teams channel. |
| `{{incident.ms_teams_channel_url}}` | The URL of the incident's Microsoft Teams channel. |
| `{{incident.ms_teams_channel_link}}` | A Markdown link to the incident's Microsoft Teams channel. |
| `{{incident.ms_teams_channel_id}}` | The ID of the incident's Microsoft Teams channel. |
| `{{incident.ms_teams_meeting_link}}` | A Markdown link to the incident's Microsoft Teams meeting. The display text is `Microsoft Teams Meeting {id}` |
| `{{incident.ms_teams_meeting_id}}` | The ID of the incident's Microsoft Teams meeting. |
| `{{incident.zoom_id}}` | The Zoom meeting ID. |
| `{{incident.zoom_join_url}}` | The Zoom join URL. |
| `{{incident.zoom_password}}` | The Zoom meeting password, if one exists. |
| `{{incident.zoom_link}}` | A Markdown link to the Zoom meeting. The display text is `Zoom Meeting {id}`. |

## Variables disponibles solo en plantillas de postmortem {#variables-available-only-in-postmortem-templates}

Las siguientes variables funcionan solo en plantillas de postmortem. No están disponibles en plantillas de notificación o de Jira.

| Variable | Descripción |
|---|---|
| `{{incident.card}}` | Inserts a self-updating incident card into the postmortem. **Only available for postmortems created in Datadog Notebooks.** This variable does not work for postmortems created in third-party locations such as Confluence or Google Drive. |
| `{{incident.timeline}}` | Copia todos los eventos de la línea de tiempo del incidente en el postmortem cuando se utiliza en una plantilla de postmortem. |

## Variables disponibles solo en plantillas de nombre de canal {#variables-available-only-in-channel-name-templates}

Las plantillas de nombre de canal configuran el nombre del canal de Slack, el canal de Microsoft Teams o el espacio de Google Chat que Datadog crea automáticamente para un incidente. Configure estas plantillas en la configuración de integración de [Slack][3], [Microsoft Teams][4] o [Google Chat][5].

Las plantillas de nombre de canal admiten un conjunto de variables diferente y más pequeño que las plantillas de notificación, postmortem y Jira, y utilizan una sintaxis sin el prefijo `incident.`.

| Variable | Descripción |
|---|---|
| `{{public_id}}` | The incident's numeric ID. |
| `{{title}}` | The incident title. |
| `{{created}}` | The incident's creation date, in `MM_DD_YYYY` format, in the timezone you configure for the channel name template. |
| `{{yyyy}}` | The four-digit year the incident was created, in the timezone you configure for the channel name template. |
| `{{mm}}` | The two-digit month the incident was created, in the timezone you configure for the channel name template. |
| `{{dd}}` | The two-digit day of month the incident was created, in the timezone you configure for the channel name template. |
| `{{severity}}` | The incident's severity. |
| `{{severity_number}}` | The incident's severity, as a number (for example, `1` for `SEV-1`). |
| `{{random_adjective}}` | A random adjective. |
| `{{random_noun}}` | A random noun. |
| `{{slug}}` | A slug value. When the slug source is set to `servicenow`, esto muestra el número de registro de ServiceNow. |

**Nota**: Debido a que Slack, Microsoft Teams y Google Chat aplican sus propias restricciones de nomenclatura de canales, Datadog convierte el nombre del canal renderizado a minúsculas y reemplaza los caracteres no admitidos.

## Variables de IA {#ai-variables}
{{< site-region region="gov,gov2" >}}<div class="alert alert-danger"> Las variables de IA no son compatibles con {{< region-param key="dd_site_name" >}}.</div>{{< /site-region >}}

Las variables de IA están disponibles en las plantillas de notificación y postmortem. Su organización debe tener la IA habilitada.

### Plantillas de notificación {#notification-templates}

| Variable | Descripción |
|---|---|
| `{{incident.ai_issue}}` | An AI-generated description of the issue that occurred. |
| `{{incident.ai_impact}}` | An AI-generated description of the impact. |
| `{{incident.ai_remediation}}` | An AI-generated description of the remediation steps taken. |
| `{{incident.ai_contributing_factors}}` | Un resumen generado por IA de los factores contribuyentes. |

### Plantillas de postmortem {#postmortem-templates}

| Variable | Descripción |
|---|---|
| `{{incident.ai_summary}}` | An AI-generated summary of the incident. |
| `{{incident.ai_system_overview}}` | An AI-generated description of the involved services. |
| `{{incident.ai_key_timeline}}` | An AI-generated key timeline of events. |
| `{{incident.ai_customer_impact}}` | An AI-generated description of the customer impact. |
| `{{incident.ai_lessons_learned}}` | An AI-generated summary of lessons learned. |
| `{{incident.ai_action_items}}` | Una lista de elementos de acción generada por IA. |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/incident_response/incident_management/setup_and_configuration/information#status-levels
[2]: /es/incident_response/incident_management/setup_and_configuration/property_fields
[3]: /es/incident_response/incident_management/setup_and_configuration/integrations/slack/#incident-channels
[4]: /es/incident_response/incident_management/setup_and_configuration/integrations/microsoft_teams/#automatic-channel-creation
[5]: /es/incident_response/incident_management/setup_and_configuration/integrations/google_chat/#incident-spaces