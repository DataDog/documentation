---
title: Transition Forms
description: Configure which fields responders are asked to fill out when an incident moves to a given status, from declaration through resolution.
further_reading:
- link: "/incident_response/incident_management/setup_and_configuration/property_fields"
  tag: "Documentation"
  text: "Property Fields"
- link: "/incident_response/incident_management/investigate/declare"
  tag: "Documentation"
  text: "Declare an Incident"
- link: "/incident_response/incident_management/setup_and_configuration/information"
  tag: "Documentation"
  text: "Customize statuses and severities"
---

## Overview

Transition forms control what Incident Management asks responders for as an incident moves through its lifecycle. Each status can have its own form, with its own fields and its own required values. When a responder moves an incident to a status that has a form, they are prompted to fill out that form before the transition completes.

Configuring a separate form for each status lets you collect information at the point where it is most relevant:

- Keep the form for `Active` short so responders can start remediating instead of filling out fields.
- Ask for impact and customer-facing details at `Stable`, after the immediate response is under control.
- Require a root cause and a summary at `Resolved`, while the details are fresh and before the incident leaves the response team.

Because transition forms are configured per [incident type][1], a security incident and a service disruption can ask for entirely different information at each stage.

## Prerequisites

To view and edit transition forms, you must have the `Incident Settings Write` permission. For more information, see [Datadog Role Permissions][2].

## Available forms

You can configure at most one form for each of the following statuses:

| Status | When the form appears |
| ------ | --------------------- |
| **Active** | A responder declares a new incident from any [declaration surface][3], or moves an existing incident to the `Active` status. |
| **Stable** | A responder moves an incident to the `Stable` status. |
| **Resolved** | A responder moves an incident to the `Resolved` status. |
| **Completed** | A responder moves an incident to the `Completed` status. This form is available only if the optional `Completed` status is [enabled for the incident type][4]. |

Only the form for the target status appears. If a responder moves an incident directly from `Active` to `Resolved`, they see the `Resolved` form, not the `Stable` form. If the target status has no form, the transition completes without a prompt.

## Configure a transition form

1. Navigate to [**Incidents > Settings**][5].
1. Select an incident type from the list.
1. Click the **Transition Forms** tab.
1. Select the status you want to configure.
1. Add, remove, or reorder the fields on the form.
1. Click **Save**.

To stop prompting responders at a status, delete that status's form.

## Choose which fields appear

A form can hold up to ten fields, of two kinds:

**Property fields**
: Any [property field][6] defined for the incident type, including default fields such as **Severity**, **Summary**, and **Root Cause**. You cannot add the incident's status to a form.

**Responder roles**
: Any [responder type][7] defined for the incident type, including **Incident Commander**. The form assigns people to that role. Single-person roles accept one person, and multi-person roles accept several.

Each property field and each responder role can appear at most once on a given form, though the same field can appear on more than one status's form.

Add only the fields a responder can reasonably answer at that point in the incident. A field that responders routinely skip or fill with placeholder text adds friction without adding data. If a field is useful but not urgent, place it on a later form.

Fields appear on the form in the order you set. Group related fields together so responders can move through the form without jumping between topics.

## Require fields

Mark a field as required to block the transition until the responder provides a value. A required property field needs at least one value, and a required responder role needs at least one person assigned.

Required fields are most useful at the statuses that gate downstream work: a required **Root Cause** at `Resolved` helps ensure every [postmortem][8] starts with a stated cause, and a required **Severity** at `Active` helps ensure [notification rules][9] and [automations][10] evaluate correctly from the start.

Requirements apply only to the form they are set on. A field marked required on the `Stable` form does not block the transition to `Resolved` if it is still empty, so add the field to both forms if you need it answered at both points.

Keep requirements on the `Active` form to a minimum. Every required field there is a step between noticing a problem and coordinating a response.

## Deleting fields, roles, and statuses

Transition forms reference other parts of your incident type configuration, so deleting one of those objects also removes it from your forms:

- Deleting a property field removes it from every transition form.
- Deleting a responder type removes it from every transition form.
- Disabling the optional `Completed` status deletes the `Completed` form.

## Relationship to property field settings

Transition forms replace the per-field **Required at declaration** and **Prompt user** options described in [Property Fields][6]. Those options are deprecated. Move each field that uses them onto the transition form for the status where you want responders to answer it.

## Behavior outside the UI

Transition forms apply to status changes that responders make in the Datadog UI, in [Slack][11], and in [Microsoft Teams][12]. They do not apply to status changes made through the [Incident Management API][13] or through [Workflow Automation][10]. An automation that resolves an incident does so without filling out the `Resolved` form.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/incident_management/setup_and_configuration/#incident-types
[2]: /account_management/rbac/permissions/#case-and-incident-management
[3]: /incident_response/incident_management/investigate/declare
[4]: /incident_response/incident_management/setup_and_configuration/information#status-levels
[5]: https://app.datadoghq.com/incidents/settings
[6]: /incident_response/incident_management/setup_and_configuration/property_fields
[7]: /incident_response/incident_management/setup_and_configuration/responder_types
[8]: /incident_response/incident_management/post_incident/postmortems
[9]: /incident_response/incident_management/setup_and_configuration/notification_rules
[10]: /incident_response/incident_management/setup_and_configuration/automations
[11]: /incident_response/incident_management/setup_and_configuration/integrations/slack
[12]: /incident_response/incident_management/setup_and_configuration/integrations/microsoft_teams
[13]: /api/latest/incidents/
