---
title: Routing Rules
further_reading:
- link: '/service_management/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
aliases:
    - /service_management/on-call/processing_rules/
---

## Overview

With routing rules, you can define granular logic to control how alerts reach your team. Instead of sending alerts through a single escalation policy, you can create flexible, condition-based rules to route them based on priority, time of day, tags, and more.

## Routing rules examples

- Route alerts by priority:
  - Send **priority 1** alerts to your primary escalation policy.
  - Send **priority 2–4** alerts to Slack or Microsoft Teams.

- Route alerts by time of day:
  - During business hours, route alerts to an escalation policy.
  - After hours, route critical alerts to paging, and non-critical alerts to chat.

- Use Dynamic Urgency to automatically detect urgency from the monitor alert:
  - `warn` status ➝ low urgency
  - `alert` status ➝ high urgency

  The urgency of a page determines how end users are notified, based on their preferences. <br><br>

- Trigger workflows (coming soon): Use routing rules to trigger automated workflows in response to matching alerts.

## Send Pages to Slack or Microsoft Teams
{{< img src="service_management/oncall/schedule.png" alt="A sample routing rules, which routes all incoming Pages to Slack and MS Teams." style="width:100%;" >}}

When you route pages to Slack or Microsoft Teams, Datadog sends notifications directly to your configured channels while always creating a corresponding Page object in the On-Call platform. From within Slack, team members can take immediate action on Pages using interactive buttons to acknowledge, resolve, escalate to the next level, or declare an incident—streamlining your incident response workflow without leaving your chat environment.

{{< img src="service_management/oncall/page_representation_in_slack.png" alt="A sample Page rendered in Slack." style="width:70%;" >}}

When a Page is acknowledged or resolved in Slack or Microsoft Teams, Datadog updates the original notification message in place—no additional or duplicate notifications are sent. This ensures that responders see the most current status of the Page directly within the original message thread, reducing noise and keeping the conversation focused.

## Routing rule syntax

Routing rules use [Datadog query syntax][3] and support multiple `if/else` conditions. Rules are evaluated from top to bottom, and the final rule must act as a fallback that routes all unmatched alerts to an escalation policy.

<div class="alert alert-warning">Routing rule syntax is case-sensitive. For example, `tags.env:Prod` will not match `tags.env:prod`.</div>

**Supported attributes:**

| Attribute      | Description                                                                 | Example                                 |
|----------------|-----------------------------------------------------------------------------|-----------------------------------------|
| `tags`         | Tags on the incoming alert                                                  | `tags.env:prod`                         |
| `groups`       | Monitor group names                                                         | `groups:"service:checkout-service"`     |
| `priority`     | Monitor priority (1–5)                                                      | `priority:(1 OR 2)`                     |
| `alert_status` | Monitor status (`error`, `warn`, `success`)                                 | `alert_status:(error OR warn)`          |

## Best practices

- Balance visibility with urgency:
  - Use paging and escalation policies for critical alerts that require immediate action.
  - Use Slack or Teams for lower-severity issues that need awareness but don’t warrant an on-call response.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/on-call/teams
[2]: https://app.datadoghq.com/on-call/teams
[3]: /tracing/trace_explorer/query_syntax/
