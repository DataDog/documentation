---
title: Incident Response Team
aliases:
- /service_management/incident_management/response_team/
- /incident_response/incident_management/response_team
further_reading:
- link: "/incident_response/incident_management/setup_and_configuration/responder_roles"
  tag: "Documentation"
  text: "Customize responder roles in Incident Settings"
---

## Overview

Form your response team by adding other users and assigning them responder roles so they know what they should focus on during the incident response.

## Adding responders

A responder is any Datadog user who participates in the response process for a particular incident.

When you add a responder to an incident:
* Datadog notifies the responder about the incident by email.
* If the incident is private, the responder can view it in Datadog.
* If the incident has a Slack channel attached, the responders is automatically added to that channel.

Datadog also automatically adds users as responders when:
* They perform any action that updates the incident, including writing to the timeline.
* They are notified about the incident through a notification rule or a manual incident notification.

The **Response Team** tab of the Incident Details page records the time an individual was added to the incident's response team. It also records the time the responder last took an action affecting the incident in Datadog, such as updating its attributes or writing to its timeline.

You can remove responders if they are not assigned to any responder roles and if they have not yet performed any actions updating the incident.

## Assigning responder roles

<div class="alert alert-info">Responder roles are unrelated to the <a href="/account_management/rbac/?tab=datadogapplication">Role Based Access Control (RBAC)</a> system. A responder role in Incident Management does not affect a user's permissions.</a></div>

From the **Response Team** tab of the Incident Details page, you can modify the responder roles for any responder.

You can define additional single-person or multi-person responder roles with custom names and descriptions in [Incident Settings][1].

## Managing responders in Slack

In Slack, you can manage responders and their responder roles by entering the command `/dd incident responders` inside an incident channel. You can also click the "Manage Responders" button on the incident action tray.

When you assign a responder role, the assignee is notified about it in Slack.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/incident_management/setup_and_configuration/responder_roles
