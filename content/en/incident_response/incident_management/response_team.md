---
title: Incident Response Team
aliases:
- /service_management/incident_management/response_team/
further_reading:
- link: "/incident_response/incident_management/incident_settings/responder_types"
  tag: "Documentation"
  text: "Customize responder types in Incident Settings"
---

## Overview

Form your response team by adding other users and assigning them responder types (responder roles) so they know what they should focus on during the incident response.

## Adding responders

A responder is any Datadog user who participates in the response process for a particular incident.

When you add a responder to an incident:
* Datadog notifies the responder about the incident by email.
* If the incident is private, the responder can view it in Datadog.
* If the incident has a Slack channel attached, the responders is automatically added to that channel.

Datadog also automatically adds users as responders when:
* They perform any action that updates the incident, including writing to the timeline.
* They are notified about the incident through a notification rule or a manual incident notification.

The **Response Team** tab of the Incident Details page records the time an individual was added to the incident’s response team. It also records the time the responder last took an action affecting the incident in Datadog, such as updating its attributes or writing to its timeline.

You can remove responders if they are not assigned to any responder types and if they have not yet performed any actions updating the incident.

## Assigning responder types

<div class="alert alert-info">Responder types are unrelated to the <a href="/account_management/rbac/?tab=datadogapplication">Role Based Access Control (RBAC)</a> system. The Responder Type in Incident Management does not affect a user’s permissions.</a></div>

From the **Response Team** tab of the Incident Details page, you can modify the responder types for any responder.

You can define additional single-person or multi-person responder types with custom names and descriptions in [Incident Settings][1].

## Managing responders in Slack

In Slack, you can manage responders and their responder types by entering the command `/dd incident responders` inside an incident channel. You can also click the "Manage Responders" button on the incident action tray.

When you assign a responder type, the assignee is notified about it in Slack.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/incident_management/incident_settings/responder_types
