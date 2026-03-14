---
title: Incident Postmortems
description: Generate and manage postmortems to document incidents and drive continuous improvement.
further_reading:
- link: "/incident_response/incident_management/setup_and_configuration/templates"
  tag: "Documentation"
  text: "Configure postmortem templates"
- link: "/incident_response/incident_management/setup_and_configuration/variables"
  tag: "Documentation"
  text: "Incident variables reference"
- link: "/incident_response/incident_management/post_incident/follow-ups"
  tag: "Documentation"
  text: "Manage incident follow-up tasks"
- link: "/notebooks/"
  tag: "Documentation"
  text: "Datadog Notebooks"
---

## Overview

A postmortem is a structured document that captures what happened during an incident, why it happened, and what actions to take to prevent recurrence. Generating a postmortem after an incident helps your team:

- Document root cause and impact for future reference
- Drive accountability for remediation work
- Build organizational knowledge to reduce the frequency and severity of future incidents

Datadog automatically populates postmortems with incident data using templates you define. You can generate postmortems directly to [Datadog Notebooks][1], [Confluence][2], or [Google Drive][3].

## Permissions

- To generate a postmortem, you need the **Incidents Write** permission.
- To view a generated postmortem in Datadog Notebooks, you need the **Notebooks Read** permission.

<div class="alert alert-danger">For private incidents, postmortems generated in Datadog Notebooks are accessible to any user with Notebooks read permission, regardless of whether they have access to the private incident. Take this into consideration when generating postmortems for incidents that contain sensitive data.</div>

## Generate a postmortem

{{< img src="/incident_response/incident_management/post_incident/postmortems/generate_postmortem.png" alt="The Post-Incident tab with options to generate a new postmortem or attach an existing one" style="width:100%;" >}}

After an incident is resolved, a **Generate post-mortem** button appears on the incident. You can also generate a postmortem at any time from the incident's **Post-Incident** tab.

To generate a postmortem:

1. Open the incident and go to the **Post-Incident** tab.
1. Click **Generate new post-mortem**.
1. Select a postmortem template. A preview of the template appears on the right.
1. Click **Generate**. Datadog creates the postmortem in the destination configured in the template and links it to the incident.

After generating a postmortem, click the link in the **Post-Incident** tab to open it in the configured destination.

## Configure postmortem templates

{{< img src="/incident_response/incident_management/post_incident/postmortems/configure_postmortem_templates.png" alt="A Postmortem editor with the Datadog Notebook selected as the Save Location" style="width:100%;" >}}

Postmortem templates define the structure of generated postmortems and control where they are saved. To create or edit templates, go to [**Incident Management Settings > Post-Mortem Templates**][4].

### Save location

Use the **Save Location** dropdown in the template editor to select where the generated document is saved:

| Option | Requirements |
|---|---|
| **Datadog Notebooks** | No additional setup required. |
| **Confluence** | Requires the [Confluence integration][2]. Configure your Confluence account in the integration settings before selecting it as a destination. |
| **Google Drive** | Requires the [Google Drive integration][3]. Configure your Google account in the integration settings before selecting it as a destination. |

### Template variables

Templates support variables that populate with incident data when the postmortem is generated. Variables allow you to include relevant incident context automatically without copying it manually. For a full list of available variables, see the [Incident Variables][6] reference.

**Standard variables** pull directly from incident fields:

| Variable | Description |
|---|---|
| `{{incident.title}}` | The incident title |
| `{{incident.state}}` | The current incident state (for example: `active`, `stable`, `resolved`) |
| `{{incident.severity}}` | The incident severity level |
| `{{incident.commander}}` | The incident commander's name, or their email or handle if no name is set |

Any [custom property fields][5] you have defined are also available as variables.

**The incident card variable** (`{{incident.card}}`) embeds a summary card that reflects incident fields in real time. When incident fields change, the card in the postmortem updates automatically, reducing the need to switch between the two. **Note**: The incident card is only supported in Datadog Notebooks.

**AI variables** use Bits AI to generate suggested content based on incident data. When you generate a postmortem that includes an AI variable, Datadog provides a suggested value that you can accept, edit, or reject before it is saved. The `{{incident.ai_summary}}` variable, for example, generates a suggested summary of what occurred during the incident.

## Attach an existing postmortem

If a postmortem for an incident already exists outside of Datadog, or was created before the incident was opened, you can link it directly from the **Post-Incident** tab without generating a new one. The linked postmortem can be any URL—a Datadog Notebook, a Confluence page, a Google Doc, or any external document.

To attach an existing postmortem, open the **Post-Incident** tab and use the **Attach existing post-mortem** option to add the link.

## Remove a postmortem

To remove a postmortem from an incident, open the **Post-Incident** tab, find the postmortem entry, and select the option to remove it. Removing the link does not delete the underlying document.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /notebooks/
[2]: /integrations/confluence/
[3]: /integrations/google_drive/
[4]: https://app.datadoghq.com/incidents/settings?section=postmortem-templates
[5]: /incident_response/incident_management/setup_and_configuration/property_fields
[6]: /incident_response/incident_management/setup_and_configuration/variables
