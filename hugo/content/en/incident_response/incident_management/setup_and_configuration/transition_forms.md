---
title: Transition Forms
description: Configure which fields responders are asked to fill out when an incident moves to a given status, from declaration through resolution.
---

## Overview

As an incident progresses through status changes, you can guide responders to fill out fields on the incident with transition forms. When a responder moves an incident to a status that has a form, they are prompted to fill out that form before the transition completes.

## Prerequisites

To set up transition forms, you must have the `Incident Settings Write` permission. For more information, see [Datadog Role Permissions][1].

## Configure a transition form

1. Navigate to [**Incidents > Settings**][2].
1. Select an incident type from the list.
1. Click the **Transition Forms** tab.
1. Select the status you want to configure.
1. Choose which fields appear on the form. You can add [property fields][3] and [responder types][4].
1. Click **Save**.

To stop prompting responders at a status, delete that status's form.

## Choose which fields appear

A form can hold up to 20 fields, of two kinds:

**Property fields**
: Any [property field][3] defined for the incident type, including default fields such as **Severity**, **Summary**, and **Root Cause**. You cannot add the incident's status to a form.

**Responder roles**
: Any [responder type][4] defined for the incident type, including **Incident Commander**. The form assigns people to that role. Single-person roles accept one person, and multi-person roles accept several.

You can mark any field on the form as required.

Each property field and each responder role can appear at most once on a given form, though the same field can appear on more than one status's form.

Add only the fields a responder can reasonably answer at that point in the incident. A field that responders routinely skip or fill with placeholder text adds friction without adding data. If a field is useful but not urgent, place it on a later form.

Fields appear on the form in the order you set. Group related fields together so responders can move through the form without jumping between topics.

[1]: /account_management/rbac/permissions/#case-and-incident-management
[2]: https://app.datadoghq.com/incidents/settings
[3]: /incident_response/incident_management/setup_and_configuration/property_fields
[4]: /incident_response/incident_management/setup_and_configuration/responder_types
