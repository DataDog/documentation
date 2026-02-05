---
title: Notification Rules
aliases:
- /service_management/incident_management/incident_settings/notification_rules/
- /incident_response/incident_management/incident_settings/notification_rules/
further_reading:
- link: "/incident_response/incident_management/incident_settings/templates"
  tag: "Documentation"
  text: "Customize message templates"
---

## Overview

Automated notification rules ensure the right stakeholders are alerted about your incidents based on criteria you define. This removes the burden from the incident responders and ensures prompt involvement of the right people, expediting the resolution process. For example, you can set a notification rule to automatically notify team stakeholders whenever a SEV-1 or SEV-2 incident for `service:web-store` AND `application:purchasing` is declared and when that incident moves through different states of progression.

Use notification rules to:
 - Ensure key stakeholders are always made aware of high-priority incidents
 - Notify specific responders when a particular service or team has an incident
 - Trigger automations using [webhooks][6] or [Datadog Workflows][5]

## Creating a notification rule

To create and modify notification rules, you must have the `Incident Notification Settings Write` permission.

You can manage notification rules in [Incident Settings Notification Rules][1], where you can search, delete, copy, toggle, and create rules. 

### Triggers and conditions

Under **When an incident is...**, select a trigger and define rule conditions:

| Condition                              | When the Rule Sends a Notification                                                                                                                                                                                                                     |
|--------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Declared`                           | Sends a notification when an incident is declared and meets the defined conditions. If no conditions are defined, it sends a notification for every incident declaration.                                                                              |
| `Declared or attributes are updated` | Sends a notification when an incident is declared or updated in a way that causes it to meet the conditions. Also sends a notification when any field listed under **Renotify on updates to...** is changed and the incident already meets the conditions. Conditions are joined by `AND` across fields and `OR` within each field. |




For example, consider a rule that has conditions `severity:SEV-1`, `severity:SEV-2`, and `team:shopping`. The rule is also configured to renotify on changes to the `state` and `service` fields. This rule sends a notification when you:

* Add the `shopping` team to the incident's `teams` field.
* Change the incident's `severity` to `SEV-1` or `SEV-2` from some other severity.
* Change `state` field **if** the incident already has team `shopping` **and** is either `SEV-1` or `SEV-2`.
* Change the `service` field **if** the incident already has team `shopping` **and** is either `SEV-1` or `SEV-2`.

### Notification recipients

When defining a notification rule's recipients, you can use `@` handles for any of Datadog's [supported notification integrations][2]. This allows you to define notification rules that notify many types of targets, including:

| Notification Type      | Handle                         | How to Use                                                                                                                                                                                                                                 |
|------------------------|--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Emails**             | `@<email>`                     | Type `@` followed by any valid email address. If it's a Datadog user's email, the user is automatically added as a responder when the rule sends a notification. For private incidents, the user gains access.                            |
| **Mobile devices**     | *(Selected from UI)*           | Select the user's name with **(Mobile Push Notification)**. The user must have notifications enabled in the [Datadog mobile app][3] for this option to appear.                                                                                                      |
| **Slack channels**     | `@slack-<channel>`<br>`@incident-slack-channel`            | Use a `@slack-` handle. To notify the incident Slack channel, use `@incident-slack-channel`.                                                                                                                                                |
| **On-Call Teams**      | `@oncall-<team>`               | Use a `@oncall-` handle to page a [Datadog on-call team][7].                                                                                                                                                                                            |
| **Microsoft Teams**    | `@teams-<channel>`             | Use a `@teams-` handle to notify a Microsoft Teams channel.                                                                                                                                                                                 |
| **Webhooks**           | `@webhook-<name>`              | Use a `@webhook-` handle to trigger a [webhook][6]. You must define the webhook with an **incident** payload type.                                                                                                                          |
| **Workflows**          | `@workflows-<workflow_name>`   | Use a `@workflows-` handle to trigger a [Datadog Workflow][5]. You must publish the workflow with an **incident** trigger type.                                                                                                             |


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents/settings#Rules
[2]: /monitors/notifications/?tab=is_alert#configure-notifications-and-automations
[3]: /mobile/
[4]: /incident_response/on-call/
[5]: /actions/workflows/
[6]: /integrations/webhooks/
[7]: /incident_response/on-call/