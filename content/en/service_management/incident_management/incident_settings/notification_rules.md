---
title: Notification Rules
further_reading:
- link: "/service_management/incident_management/incident_settings/templates"
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

You can manage notification rules in [Incident Settings Notification Rules][1]. Here you can search, delete, copy, toggle, and create rules. To modify notification rules, you need the `Incident Notification Settings Write` permission.

### Triggers and conditions

First, select a trigger and define rule conditions.

When the trigger is `Declared`, the notification rule fires whenever an incident is declared that meets the conditions. If there are no conditions defined, the rule fires whenever an incident is declared.
  
When the trigger is `Declared or attributes are updated`, the rule also fires whenever it is changed to meet the conditions. It also fires whenever any of the fields listed under `Renotify on updates to...` are changed and the incident already meets the conditions. Conditions are joined by AND across fields and OR within fields. 

For example, consider a rule that has conditions `severity:SEV-1` and `severity:SEV-2` and `team:shopping` and renotify fields `state` and `service`. This rule fires whenever you...

* ...add the `shopping` team to its `teams` field.
* ...change its `severity` to `SEV-1` or `SEV-2` from some other severity.
* ...change `state` if the incident already has team `shopping` and is either `SEV-1` or `SEV-2`.
* ...change `service` if the incident already has team `shopping` and is either `SEV-1` or `SEV-2`.

### Notification recipients

When defining a notification rule's recipients, you can use `@` handles for any of Datadog's [supported notification integrations][2]. This allows you to define notification rules that notify many types of targets, including:

* **Emails:** To notify via email, type `@` followed by any valid email address. If the email address is a Datadog user's email address, Datadog automatically adds the user as a responder to the incident when the rule fires. If the incident is private, this means the responder gains access to it.
* **Mobile devices:** To notify a Datadog user's mobile device, find the user's name and select the option that includes **(Mobile Push Notification)**. The user must have notifications enabled in the [Datadog mobile app][3] for this option to appear.
* **Slack channels:** To notify a Slack channel, use a `@slack-` handle. To notify the incident Slack channel, use handle `@incident-slack-channel`.
* **On-Call Teams:** Use an `@oncall-` handle to page an on-call team.
* **Microsoft Teams channels**: Use a `@teams-` handle to notify a Microsoft Teams channel.
* **Webhooks:** Use a `@webhook-` handle to fire a [webhook][6]. You must first define a webhook with an "incident" payload type.
* **Workflows:** Use a `@workflows-` handle to fire a [Datadog Workflow][5]. You must first publish a workflow with an **incident** trigger type.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents/settings#Rules
[2]: /monitors/notifications/?tab=is_alert#configure-notifications-and-automations
[3]: /mobile/
[4]: /service_management/on-call/
[5]: /actions/workflows/
[6]: /integrations/webhooks/