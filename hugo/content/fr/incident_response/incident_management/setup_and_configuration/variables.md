---
description: Une référence pour toutes les variables de modèle disponibles dans Incident
  Management, utilisées dans les modèles de notification, de post-mortem, Jira et
  de nom de canal.
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/templates
  tag: Documentation
  text: Configurez les modèles de notification et de post-mortem
- link: /incident_response/incident_management/setup_and_configuration/notification_rules
  tag: Documentation
  text: Configurez les règles de notification
- link: /incident_response/incident_management/setup_and_configuration/property_fields
  tag: Documentation
  text: Configurez les champs de propriété
title: Référence des variables d'incident
---
## Présentation {#overview}

Les variables d'incident sont des variables de modèle qui injectent dynamiquement des données d'incident dans les notifications, les post-mortems, les tickets Jira et les noms de canal. Utilisez-les pour remplir automatiquement les modèles avec les informations pertinentes sur l'incident, ce qui réduit le travail manuel pendant et après celui-ci.

Les variables sont disponibles dans quatre types de modèles :

- **Notifications** : utilisées dans les notifications d'incident manuelles et automatisées envoyées par e-mail, Slack ou d'autres canaux.
- **Modèles de post-mortem** : utilisés pour remplir automatiquement les Datadog Notebooks ou les pages Confluence lors de la génération d'un post-mortem.
- **Modèles Jira** : utilisés pour mapper les champs d'incident aux champs de ticket Jira lorsqu'un ticket Jira est créé à partir d'un incident.
- **Modèles de nom de canal** : utilisés pour générer le nom du canal Slack, du canal Microsoft Teams ou de l'espace Google Chat que Datadog crée automatiquement pour un incident.

**Remarque** : dans les modèles Jira, les variables sont affichées sans leur préfixe. Par exemple, `{{incident.title}}` appears as `{{ title }}` dans l'éditeur de modèles Jira. Les variables se comportent de la même manière.

## Variables d'incident {#incident-variables}

Les variables suivantes sont disponibles dans les messages de notification, les modèles de post-mortem et les modèles Jira.

| Variable | Description |
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

## Variables disponibles uniquement dans les modèles de post-mortem {#variables-available-only-in-postmortem-templates}

Les variables suivantes ne fonctionnent que dans les modèles de post-mortem. Elles ne sont pas disponibles dans les modèles de notification ou Jira.

| Variable | Description |
|---|---|
| `{{incident.card}}` | Inserts a self-updating incident card into the postmortem. **Only available for postmortems created in Datadog Notebooks.** This variable does not work for postmortems created in third-party locations such as Confluence or Google Drive. |
| `{{incident.timeline}}` | Copie tous les événements de la chronologie de l'incident dans le post-mortem lorsque cette variable est utilisée dans un modèle de post-mortem. |

## Variables disponibles uniquement dans les modèles de nom de canal {#variables-available-only-in-channel-name-templates}

Les modèles de nom de canal configurent le nom du canal Slack, du canal Microsoft Teams ou de l'espace Google Chat que Datadog crée automatiquement pour un incident. Configurez ces modèles dans les paramètres d'intégration [Slack][3], [Microsoft Teams][4] ou [Google Chat][5].

Les modèles de nom de canal prennent en charge un ensemble de variables différent et plus restreint que les modèles de notification, de post-mortem et Jira, et utilisent une syntaxe sans le préfixe `incident.`.

| Variable | Description |
|---|---|
| `{{public_id}}` | The incident's numeric ID. |
| `{{title}}` | The incident title. |
| `{{created}}` | The incident's creation date, in `MM_DD_YYYY` format, in the timezone you configure for the channel name template. |
| `{{yyyy}}` | The four-digit year the incident was created, in the timezone you configure for the channel name template. |
| `{{mm}}` | The two-digit month the incident was created, in the timezone you configure for the channel name template. |
| `{{dd}}` | The two-digit day of month the incident was created, in the timezone you configure for the channel name template. |
| `{{severity}}` | The incident's severity. |
| `{{severity_number}}` | The incident's severity, as a number (for example, `1` for `SEV-1`). |
| `{{status}}` | The incident's status (for example, `active`, `stable`, or `resolved`). |
| `{{random_adjective}}` | A random adjective. |
| `{{random_noun}}` | A random noun. |
| `{{slug}}` | A slug value. When the slug source is set to `servicenow`, ceci affiche le numéro d'enregistrement ServiceNow. |

**Remarque** : Étant donné que Slack, Microsoft Teams et Google Chat imposent leurs propres restrictions de nommage de canal, Datadog convertit le nom de canal rendu en minuscules et remplace les caractères non pris en charge.

## Variables IA {#ai-variables}
{{< site-region region="gov,gov2" >}}<div class="alert alert-danger"> Les variables IA ne sont pas prises en charge dans {{< region-param key="dd_site_name" >}}.</div>{{< /site-region >}}

Les variables d'IA sont disponibles dans les modèles de notification et de post-mortem. Votre organisation doit avoir l'IA activée.

### Modèles de notification {#notification-templates}

| Variable | Description |
|---|---|
| `{{incident.ai_issue}}` | An AI-generated description of the issue that occurred. |
| `{{incident.ai_impact}}` | An AI-generated description of the impact. |
| `{{incident.ai_remediation}}` | An AI-generated description of the remediation steps taken. |
| `{{incident.ai_contributing_factors}}` | Un résumé généré par IA des facteurs contributifs. |

### Modèles de post-mortem {#postmortem-templates}

| Variable | Description |
|---|---|
| `{{incident.ai_summary}}` | An AI-generated summary of the incident. |
| `{{incident.ai_system_overview}}` | An AI-generated description of the involved services. |
| `{{incident.ai_key_timeline}}` | An AI-generated key timeline of events. |
| `{{incident.ai_customer_impact}}` | An AI-generated description of the customer impact. |
| `{{incident.ai_lessons_learned}}` | An AI-generated summary of lessons learned. |
| `{{incident.ai_action_items}}` | Une liste d'actions générée par IA. |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/incident_response/incident_management/setup_and_configuration/information#status-levels
[2]: /fr/incident_response/incident_management/setup_and_configuration/property_fields
[3]: /fr/incident_response/incident_management/setup_and_configuration/integrations/slack/#incident-channels
[4]: /fr/incident_response/incident_management/setup_and_configuration/integrations/microsoft_teams/#automatic-channel-creation
[5]: /fr/incident_response/incident_management/setup_and_configuration/integrations/google_chat/#incident-spaces