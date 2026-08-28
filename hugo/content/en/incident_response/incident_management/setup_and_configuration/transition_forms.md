---
title: Transition Forms
description: Prompt incident responders to fill out specific fields on status changes.
---

## Overview

Any time an incident progresses through status changes, you can guide responders to fill out fields on the incident with transition forms. These forms help ensure that information about the incident is collected at the right time in the incident response process.

{{< img src="/incident_response/incident_management/setup_and_configuration/status_transition_form.png" alt="Status Change form prompting the user to fill out the required Teams and Postmortem Owner fields when moving an incident to Resolved" style="width:70%;" >}}

## Prerequisites

To set up transition forms, you must have the `Incident Settings Write` permission. For more information, see [Datadog Role Permissions][1].

## Configure a transition form

1. In Datadog, navigate to **Incidents** > [**Settings**][2].
1. Select an incident type from the list.
1. Click the **Transition Forms** tab.
1. Select the status you want to configure.
1. Choose which fields appear on the form. You can add [property fields][3] and [responder types][4]. Any field can be marked as required or optional.
1. Click **Save**.

[1]: /account_management/rbac/permissions/#case-and-incident-management
[2]: https://app.datadoghq.com/incidents/settings
[3]: /incident_response/incident_management/setup_and_configuration/property_fields
[4]: /incident_response/incident_management/setup_and_configuration/responder_types
