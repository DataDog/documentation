---
title: Describe an Incident
further_reading:
- link: "/service_management/incident_management/incident_settings"
  tag: "Documentation"
  text: "Customize incidents in Incident Settings"
- link: "/service_management/incident_management/notification"
  tag: "Documentation"
  text: "Configure Incident Notifications"
---

## Overview

No matter where you [declare an incident][1], it’s important to describe it as thoroughly as possible to share the information with other people involved in your organization’s incident management process. The incident details should give information on:
- What happened
- Why it happened
- Attributes associated with the incident

## Incident elements

When you declare an incident, an incident modal comes up. This modal has several core elements:

| Incident elements  | Description |
| ------------------ | ----------- |
| Title              | (Required) Give your incident a descriptive title. |
| Severity Level     | (Required) Denotes the severity of your incident, from SEV-1 (most severe) to SEV-5 (least severe). If your incident is under initial investigation, and you do not know the severity yet, select UNKNOWN. <br> **Note**: You can customize the description of each severity level to fit the requirements of your organization.|
| Incident Commander | (Required) This person is assigned as the leader of the incident investigation. |
| Attributes (Teams) | Assign the appropriate group of users to an incident using [Datadog Teams][2]. Members of the assigned team are automatically invited to the Slack channels. |

## Incident details

An incident's status and details can be updated on the incident's Overview tab. Within an incident, fill out the Overview tab with relevant details—including incident description, customer impact, affected services, incident responders, root cause, detection method, and severity—to give your teams all the information they need to investigate and resolve an incident. 

Update the impact section to specify customer impact, the start and end times of the impact, and whether the incident is still active. This section also requires a description of the scope of impact to be completed.

### Status levels

The default statuses are **Active**, **Stable**, and **Resolved**. You can add the **Completed** status and customize the description of each status level in the Incident Settings page.

* Active: Incident affecting others.
* Stable: Incident no longer affecting others, but investigations incomplete.
* Resolved: Incident no longer affecting others and investigations complete.
* Completed: All remediation complete.

As the status of an incident changes, Datadog tracks time-to-resolution as follows:

| Status Transition | Resolved Timestamp |
| ------------------ | -----------|
| `Active` to `Resolved`, `Active` to `Completed` | Current time |
| `Active` to `Resolved` to `Completed`, `Active` to `Completed` to `Resolved` | Unchanged |
| `Active` to `Completed` to `Active` to `Resolved` | Overridden on last transition |

### Response team

Form your response team by adding other users and assigning them roles to carry out in the process of resolving an incident. There are  two default responder types provided by Datadog.

<div class="alert alert-info">Responder roles are unrelated to the <a href="/account_management/rbac/?tab=datadogapplication">Role Based Access Control (RBAC)</a> system. The Responder Type in Incident Management does not change a user's permissions in any capacity. </a></div>

Incident Commander
: The individual responsible for leading the response team

Responder
: An individual that actively contributes to investigating an incident and resolving its underlying issue

*Responders* are notified through the email associated with their Datadog account. Anyone is able to change the role of a responder, but to remove an individual from an incident's Response Team you must have the general `Responder` role assigned and have no activity in the incident. If there is already an `Incident Commander` assigned to an incident, assigning another individual as the `Incident Commander` transfers that role over to them. The previous `Incident Commander` is reassigned the general `Responder` role. A similar reassignment happens whenever you reassign one of your custom one person roles.

The **Response Team** tab saves the date and time when an individual was originally added to the response team of an incident, as well as the date and time when they last contributed something to the Incident Timeline.

#### Custom responder role

You can create custom responder roles in the [Incident Settings for Responder Types][3]. This allows you to create new responder types with custom names and descriptions. It also allows you to choose if a responder type should be a one person role or a multi person role.

## Attributes

Attributes are the metadata and context that you can define for each incident. These fields are [key:value metric tags][4]. Add these field keys on the [Incident Settings Property Fields][5] page. The values you add are then available when you are assessing the impact of an incident on the Overview tab. The following fields are available for assessment in all incidents:

Root Cause
: This text field allows you to enter the description of the root cause, triggers, and contributing factors of the incident.

Detection Method
: Specify how the incident was detected with these default options: customer, employee, monitor, other, or unknown.

Services
: If you have APM configured, your APM services are available for incident assessment. To learn more about configuring your services in APM, see [the docs][5].<br><ul><li>If you are not using Datadog APM, you can upload service names as a CSV. Any values uploaded through CSV are only available within Incident Management for incident assessment purposes.</li><li>Datadog deduplicates service names case-insensitively, so if you use "My Service" or "my service", only the manually added one is shown.</li><li>Datadog overrides APM service names in favor of the manually uploaded list.</li><li>If the service is an APM service and no metrics are posted in the past seven days, it does not appear in the search results.</li><li>Further integrate with Datadog products and accurately assess service impact. The Services property field is automatically populated with APM services for customers using Datadog APM.</li></ul>

Teams
: Choose from the [teams][2] defined in your organization. It is not necessary to upload a list of teams from a CSV file.

## Notifications

Configure incident notifications to share incident updates with all stakeholders and keep all involved members aware of the current investigation. For more information, see the [Notification][6] page.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/incident_management/declare
[2]: /account_management/teams/
[3]: /service_management/incident_management/incident_settings/responder-types
[4]: /getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments#overview
[5]: https://app.datadoghq.com/incidents/settings#Property-Fields
[6]: /service_management/incident_management/notification
