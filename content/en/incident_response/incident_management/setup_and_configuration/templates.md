---
title: Templates
aliases:
- /service_management/incident_management/incident_settings/templates/
- /incident_response/incident_management/incident_settings/templates
further_reading:
- link: "/incident_response/incident_management/setup_and_configuration/variables"
  tag: "Documentation"
  text: "Incident variables reference"
- link: "/incident_response/incident_management/notification"
  tag: "Documentation"
  text: "Learn more about Incident Management Notifications"
- link: "/incident_response/incident_management/post_incident/postmortems"
  tag: "Documentation"
  text: "Incident Postmortems"
---

## Overview

Dynamic templates offer a comprehensive framework for improving incident response and operational efficiency. Using custom message templates for both ad-hoc and automated notifications can save time during high-stress incidents. This ensures that messages are consistently accurate and contain relevant context, enabling quicker understanding and action by the recipients.

Customizable settings for postmortem analysis can provide valuable information and long-term optimization. By tailoring reports and dashboards to your organization's unique context, you can identify recurring issues and implement preventative measures more effectively.

## Messages

Message templates are dynamic, reusable messages that can be used in [manual incident notifications][1], or automated notification rules. Message templates use [template variables][4], such as `{{incident.severity}}`, to dynamically inject the corresponding value from the incident that the notification is being sent for. Message templates have Markdown support so that incident notifications can include text formatting, tables, indented lists, and hyperlinks. To better organize a large number of message templates, each template requires a category during the creation process.

To create a message template:

1. Click the **+ New Message Template** button.
2. Give the template a name.
3. Assign it a new or existing category.
4. Give the template a subject line (for emails).
5. Write the template's message.
6. Click **Save**.

**Note:** Template variables are supported in both the message's title and body.

### AI variables for notifications

Incident AI can dynamically populate key details in notifications with AI-generated content. Insert any of the following variables into your message body:

| Field | Variable |
|---|---|
| AI Contributing Factors | `{{incident.ai_contributing_factors}}` |
| AI Impact | `{{incident.ai_impact}}` |
| AI Issue | `{{incident.ai_issue}}` |
| AI Remediation | `{{incident.ai_remediation}}` |

{{< img src="incident_response/incident_management/investigate/incident_ai/message_template_variables.png" alt="New message template with AI variables in it" style="width:80%;" >}}

## Postmortems

Postmortem templates define the structure and content of your postmortems. When you generate a postmortem, Datadog automatically populates the template with data from the incident. Use [template variables][4], such as `{{incident.severity}}`, to control which incident data is included.

To create a postmortem template:

1. Go to [**Incident Management Settings > Postmortem Templates**][8] and click **+ New Postmortem Template**.
2. Give the template a name.
3. Select the save location (see [Save location](#save-location)).
4. Write the template's content (available template variables are listed to the right of the textbox).
5. (Optional) Set the template as the default.
6. Click **Save**.

### Save location

Select where the generated postmortem document is saved:

| Option | Requirements |
|---|---|
| **Datadog Notebooks** | No additional setup required. |
| **Confluence** | Requires the [Confluence integration][3]. Configure your Confluence account in the integration settings before selecting it as a destination. |
| **Google Drive** | Requires the [Google Drive integration][6]. Configure your Google account in the integration settings before selecting it as a destination. |

### Template variables for postmortems

Templates support variables that populate with incident data when the postmortem is generated. For a full list of available variables, see the [Incident Variables][4] reference.

{{% collapse-content title="Standard variables" level="h4" %}}
Standard variables pull directly from incident fields and also include any defined [custom property fields][7].

| Variable | Description |
|---|---|
| `{{incident.title}}` | The incident title |
| `{{incident.state}}` | The current incident state (for example: `active`, `stable`, `resolved`) |
| `{{incident.severity}}` | The incident severity level |
| `{{incident.commander}}` | The incident commander's name, or their email or handle if no name is set |

{{% /collapse-content %}}

{{% collapse-content title="Incident card variable" level="h4" %}}
The incident card variable (`{{incident.card}}`) embeds a summary card that reflects incident fields in real time. When incident fields change, the card in the postmortem updates automatically. The card includes postmortem status and owner fields.

**Note**: The incident card is only supported in Datadog Notebooks.
{{% /collapse-content %}}

{{% collapse-content title="Follow-ups variable" level="h4" %}}
The follow-ups variable (`{{incident.follow-ups}}`) embeds a list of incident follow-ups in the postmortem notebook. From the list view in your notebook, you can set due dates, assign items, or create new follow-up items. Changes are reflected in the incident's follow-ups list.

**Note**: The follow-ups variable is only supported in Datadog Notebooks.
{{% /collapse-content %}}

{{% collapse-content title="AI variables" level="h4" %}}
AI variables use Bits AI to generate suggested content based on incident data. When you generate a postmortem that includes an AI variable, Datadog provides a suggested value that you can accept, edit, or reject before it is saved.

{{% incident-ai-postmortem-variables %}}

To use these variables:
1. Add the variables to the template body.
1. When generating a postmortem, select the **General incident with AI content** out-of-the-box template, or a custom template that includes AI variables.
1. Allow up to one minute for AI-generated content to populate. Datadog recommends reviewing and refining AI-generated content before sharing the postmortem.

**Note**:
- AI variables must be preceded by a section header.
- The incident timeline must contain at least 10 messages for AI variables to generate content.

{{% /collapse-content %}}

For more information on generating postmortems using these templates, see [Incident Postmortems][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/incident_management/notifications
[2]: /notebooks/
[3]: /integrations/confluence/
[4]: /incident_response/incident_management/setup_and_configuration/variables
[5]: /incident_response/incident_management/post_incident/postmortems
[6]: /integrations/google_drive/
[7]: /incident_response/incident_management/setup_and_configuration/property_fields
[8]: https://app.datadoghq.com/incidents/settings?section=postmortem-templates
