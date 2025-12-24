---
title: Responder Types
aliases:
- /service_management/incident_management/incident_settings/responder_types/
further_reading:
- link: "/service_management/incident_management/describe/#response-team"
  tag: "Documentation"
  text: "Describe an incident"
---

## Overview

Assigning specific roles such as Incident Commander or Communications Lead allows for a more organized and structured response. Notifications and responsibilities can be directed to the appropriate individuals immediately, which helps in reducing confusion and delays. 

The responder types settings provide you with the ability to create custom roles to [assign to your incident responders][1] and to specify if those roles are meant to be held by one person or multiple people per incident. These roles are unrelated to the [Role Based Access Control (RBAC)][2] system. 

## Roles

Responder types allow your responders to understand what their responsibilities are in an incident based on the definitions of your own incident response process. By default there are two roles:

1. `Incident Commander` - The individual responsible for leading the response team 
2. `Responder` - An individual that actively contributes to investigating an incident and resolving its underlying issue

**Note:** The `Incident Commander` responder type appears in Incident Settings so you can customize its description. `Incident Commander` cannot be deleted as a responder type, nor can its name or status as a `One person role` be changed. The `Responder` role is a generic fallback role if a responder is not otherwise assigned a different role, and does not appear in Incident Settings.

## Create a responder type

1. Navigate to [**Incident Settings > Responder Types**][3].
1. Click **+ Add Responder Type**, below the table.
2. Give your new responder type a name.
3. Choose if the responder type is a `One person role` or a `Multi person role`. A `One person role` can be held by a single person per incident, while a `Multi person role` can be held by an unlimited number of people per incident.
4. Give the responder type a description. This description appears in the UI for selecting a role to assign to your teammates.
5. Click **Save**.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/incident_management/response_team
[2]: /account_management/rbac/?tab=datadogapplication#pagetitle
[3]: https://app.datadoghq.com/incidents/settings#Responder-Types
