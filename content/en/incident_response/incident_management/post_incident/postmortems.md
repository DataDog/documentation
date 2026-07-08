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

Datadog automatically populates postmortems with incident data using templates you define. You can generate postmortems to [Datadog Notebooks][1], [Confluence][2], or [Google Drive][3]. Postmortems generated as Datadog Notebooks embed directly in the Post-Incident tab, where you can view, edit, and track their status and ownership without leaving the incident.

## Permissions

- To generate a postmortem, you need the **Incidents Write** permission.
- To view a generated postmortem in Datadog Notebooks, you need the **Notebooks Read** permission.

<div class="alert alert-danger">For private incidents, postmortems generated in Datadog Notebooks are accessible to any user with Notebooks read permission, regardless of whether they have access to the private incident. Take this into consideration when generating postmortems for incidents that contain sensitive data.</div>

## Generate a postmortem

{{< img src="/incident_response/incident_management/post_incident/postmortems/post_incident_tab_generate_postmortem.png" alt="The Post-Incident tab showing the Generate Postmortem button, template preview, and Follow-Ups sidebar." style="width:100%;" >}}

After an incident is resolved, you can generate a postmortem from the incident's **Post-Incident** tab.

To generate a postmortem:

1. Open the incident and go to the **Post-Incident** tab.
1. Select a postmortem template.
1. Click **Generate Postmortem**. Datadog creates the postmortem in the destination configured in the template and links it to the incident.

After generating a postmortem:

- **Datadog Notebooks**: The postmortem embeds directly in the **Post-Incident** tab.
- **Confluence or Google Drive**: A link appears in the **Post-Incident** tab. Click the link to open the document in the configured destination.

## View and edit a postmortem

Postmortems generated as Datadog Notebooks embed directly in the **Post-Incident** tab. You can read and edit the postmortem without leaving the incident view. Changes made in the embedded view are reflected in the underlying notebook.

Multiple users can edit an embedded postmortem at the same time. Cursor markers show where each user is working. You can also add inline comments from within the embedded view.

## Postmortem status and owner

Postmortems have two fields to help track completion and drive accountability:

| Field | Description | Default |
|---|---|---|
| **Status** | The current completion state of the postmortem. | Draft |
| **Owner** | The person responsible for completing the postmortem. | The user who generated the postmortem |

The postmortem status values are:

| Status | Description |
|---|---|
| **Draft** | The postmortem is in progress. |
| **In Review** | The postmortem is ready for review. |
| **Completed** | The postmortem is finished. |

The postmortem owner can be reassigned to any user in your Datadog organization. The owner is a system role that appears in the incident's response team alongside Incident Commander and Responder.

## Configure postmortem templates

To create or manage postmortem templates, including save location and template variables, see [Templates][4].

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
[4]: /incident_response/incident_management/setup_and_configuration/templates
