---
title: Transition Forms
---

## Overview

As an incident progresses through status changes, you can guide responders to fill out fields on the incident with transition forms. These forms help ensure that information about the incident is collected at the right time in the incident response process. When a responder transitions an incident to a status, they are prompted to fill out the form configured for that status.

{{< img src="/incident_response/incident_management/setup_and_configuration/status_transition_form.png" alt="Status Change form prompting for the required Teams and Postmortem Owner fields when moving an incident to Resolved" style="width:70%;" >}}

## Prerequisites

To set up transition forms, you must have the `Incident Settings Write` permission. For more information, see [Datadog Role Permissions][1].

## Configure a transition form

1. Navigate to [**Incidents > Settings**][2].
1. Select an incident type from the list.
1. Click the **Transition Forms** tab.
1. Select the status you want to configure.
1. Choose which fields appear on the form. You can add [property fields][3] and [responder types][4]. You can mark any field as required.
1. Click **Save**.

[1]: /account_management/rbac/permissions/#case-and-incident-management
[2]: https://app.datadoghq.com/incidents/settings
[3]: /incident_response/incident_management/setup_and_configuration/property_fields
[4]: /incident_response/incident_management/setup_and_configuration/responder_types
