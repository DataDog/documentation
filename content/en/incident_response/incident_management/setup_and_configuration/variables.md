---
title: Incident Variables Reference
description: "A reference for all available template variables in Incident Management used in notification, postmortem, Jira, and channel name templates."
further_reading:
- link: "/incident_response/incident_management/setup_and_configuration/templates"
  tag: "Documentation"
  text: "Configure notification and postmortem templates"
- link: "/incident_response/incident_management/setup_and_configuration/notification_rules"
  tag: "Documentation"
  text: "Set up notification rules"
- link: "/incident_response/incident_management/setup_and_configuration/property_fields"
  tag: "Documentation"
  text: "Configure property fields"
---

## Overview

Incident variables are template variables that dynamically inject incident data into notifications, postmortems, Jira issues, and channel names. Use them to automatically populate templates with relevant incident context, reducing manual effort during and after an incident.

Variables are available in four template types:

- **Notifications**: Used in manual and automated incident notifications sent to email, Slack, or other channels.
- **Postmortem templates**: Used to auto-populate Datadog Notebooks or Confluence pages when generating a postmortem.
- **Jira templates**: Used to map incident fields to Jira issue fields when a Jira issue is created from an incident.
- **Channel name templates**: Used to generate the name of the Slack channel, Microsoft Teams channel, or Google Chat space that Datadog automatically creates for an incident.

**Note**: In Jira templates, variables are displayed without their prefix. For example, `{{incident.title}}` appears as `{{ title }}` in the Jira template editor. The variables behave the same way.

## Incident variables

The following variables are available in notification messages, postmortem templates, and Jira templates.

| Variable | Description |
|---|---|
| `{{incident.<property_field_name>}}` | Any [custom property field][2] configured for your organization. Replace `<property_field_name>` with the field name. |
| `{{incident.id}}` | The incident's public ID. |
| `{{incident.title}}` | The incident title. |
| `{{incident.severity}}` | The incident severity (for example, `SEV-1`, `SEV-2`). |
| `{{incident.status}}` | The incident [status level][1]. |
| `{{incident.created}}` | Timestamp when the incident was created. |
| `{{incident.detected}}` | Timestamp when the incident was detected. |
| `{{incident.resolved}}` | Timestamp when the incident was resolved. |
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

## Variables available only in postmortem templates

The following variables work only in postmortem templates. They are not available in notification or Jira templates.

| Variable | Description |
|---|---|
| `{{incident.card}}` | Inserts a self-updating incident card into the postmortem. **Only available for postmortems created in Datadog Notebooks.** This variable does not work for postmortems created in third-party locations such as Confluence or Google Drive. |
| `{{incident.timeline}}` | Copies all timeline events from the incident into the postmortem when used in a postmortem template. |

## Variables available only in channel name templates

Channel name templates configure the name of the Slack channel, Microsoft Teams channel, or Google Chat space that Datadog automatically creates for an incident. Configure these templates in the [Slack][3], [Microsoft Teams][4], or [Google Chat][5] integration settings.

Channel name templates support a different, smaller set of variables than notification, postmortem, and Jira templates, and use a syntax without the `incident.` prefix.

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
| `{{random_adjective}}` | A random adjective. |
| `{{random_noun}}` | A random noun. |
| `{{slug}}` | A slug value. When the slug source is set to `servicenow`, this displays the ServiceNow record number. |

**Note**: Because Slack, Microsoft Teams, and Google Chat enforce their own channel naming restrictions, Datadog converts the rendered channel name to lowercase and replaces unsupported characters.

## AI variables
{{< site-region region="gov,gov2" >}}<div class="alert alert-danger"> AI variables are not supported in {{< region-param key="dd_site_name" >}}.</div>{{< /site-region >}}

AI variables are available in notification and postmortem templates. Your organization must have AI enabled.

### Notification templates

| Variable | Description |
|---|---|
| `{{incident.ai_issue}}` | An AI-generated description of the issue that occurred. |
| `{{incident.ai_impact}}` | An AI-generated description of the impact. |
| `{{incident.ai_remediation}}` | An AI-generated description of the remediation steps taken. |
| `{{incident.ai_contributing_factors}}` | An AI-generated summary of the contributing factors. |

### Postmortem templates

| Variable | Description |
|---|---|
| `{{incident.ai_summary}}` | An AI-generated summary of the incident. |
| `{{incident.ai_system_overview}}` | An AI-generated description of the involved services. |
| `{{incident.ai_key_timeline}}` | An AI-generated key timeline of events. |
| `{{incident.ai_customer_impact}}` | An AI-generated description of the customer impact. |
| `{{incident.ai_lessons_learned}}` | An AI-generated summary of lessons learned. |
| `{{incident.ai_action_items}}` | An AI-generated list of action items. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/incident_management/setup_and_configuration/information#status-levels
[2]: /incident_response/incident_management/setup_and_configuration/property_fields
[3]: /incident_response/incident_management/setup_and_configuration/integrations/slack/#incident-channels
[4]: /incident_response/incident_management/setup_and_configuration/integrations/microsoft_teams/#automatic-channel-creation
[5]: /incident_response/incident_management/setup_and_configuration/integrations/google_chat/#incident-spaces
