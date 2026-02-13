---
title: Routing Rules
further_reading:
- link: '/incident_response/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
aliases:
    - /service_management/on-call/processing_rules/
    - /service_management/on-call/routing_rules/
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

- Delay escalation outside of support hours:
  - Define [support hours](#support-hours) on an escalation policy action to snooze notifications until the next active window.
  - For example, a Page that arrives at 2:00 AM on Saturday creates a case immediately, but does not notify responders until 9:00 AM on Monday.

- Use Dynamic Urgency to automatically detect urgency from the monitor alert:
  - `warn` status ➝ low urgency
  - `alert` status ➝ high urgency

  The urgency of a page determines how end users are notified, based on their preferences. <br><br>

- Trigger workflows (coming soon): Use routing rules to trigger automated workflows in response to matching alerts.

## Send Pages to Slack or Microsoft Teams
{{< img src="service_management/oncall/page_in_slack_or_ms_teams.png" alt="A sample routing rule, which routes all incoming Pages to Slack and Microsoft Teams." style="width:100%;" >}}

When you route Pages to Slack or Microsoft Teams, Datadog sends a notification to the configured channel and creates a corresponding Page object in the On-Call platform. From Slack, team members can use interactive buttons to acknowledge, resolve, escalate, or declare an incident. This streamlines incident response without leaving the chat environment.

{{< img src="service_management/oncall/page_representation_in_slack.png" alt="A sample Page rendered in Slack." style="width:70%;" >}}

When a Page is acknowledged or resolved in Slack, Datadog updates the original notification in place, without sending additional messages. This keeps responders focused by reducing noise and showing the current Page status directly in the original thread.

## Routing rule syntax

Routing rules use [Datadog query syntax][3] and support multiple `if/else` conditions. Rules are evaluated from top to bottom, and the final rule must act as a fallback that routes all unmatched alerts to an escalation policy.

<div class="alert alert-danger">Routing rule syntax is case-sensitive. For example, `tags.env:Prod` will not match `tags.env:prod`.</div>

**Supported attributes:**

| Attribute      | Description                                                                 | Example                                 |
|----------------|-----------------------------------------------------------------------------|-----------------------------------------|
| `tags`         | Tags on the incoming alert                                                  | `tags.env:prod`                         |
| `groups`       | Monitor group names                                                         | `groups.service:checkout-service`     |
| `priority`     | Monitor priority (1–5)                                                      | `priority:(1 OR 2)`                     |
| `alert_status` | Monitor status (`error`, `warn`, `success`)                                 | `alert_status:(error OR warn)`          |

## Support hours

Support hours let you define time windows during which an escalation policy actively notifies responders. When a Page arrives outside of support hours, Datadog creates the Page immediately but **snoozes** the escalation policy until the next active support hours window. After the snooze period ends, the escalation policy begins executing normally.

### How support hours work

1. An alert triggers a Page to an On-Call team.
1. Routing rules are evaluated from top to bottom to find a matching rule.
1. The matching rule's escalation policy action checks the current time against the configured support hours:
   - **Inside support hours**: The escalation policy executes immediately and responders are notified.
   - **Outside support hours**: The Page is created and the escalation policy is snoozed. Datadog records a timeline entry on the Page indicating the snooze. When support hours resume, the escalation policy begins executing.

### Support hours compared to time restrictions

Routing rules support two types of time-based controls. They serve different purposes:

| Feature | What it controls | Behavior outside the time window |
|---------|-----------------|----------------------------------|
| **Time restrictions** | When the routing rule **evaluates** | The rule is skipped and the next rule is tried. No Page is created by this rule. |
| **Support hours** | When the escalation policy **notifies responders** | The Page is created immediately, but notifications are snoozed until the next active window. |

For example, if your team handles priority 2 alerts and wants to track all alerts but only page responders during business hours, use **support hours**. If your team should not handle certain alerts at all outside of business hours (and another rule or team should handle them instead), use **time restrictions**.

<div class="alert alert-warning">You cannot configure both time restrictions and support hours on the same routing rule. Use one or the other.</div>

### Configure support hours

To add support hours to a routing rule's escalation policy action, configure a time zone and one or more time windows (restrictions).

Each support hours configuration includes:
- **Time zone**: An IANA time zone (for example, `America/New_York`, `Europe/Paris`, or `Asia/Tokyo`).
- **Restrictions**: One or more time windows that define when the escalation policy is active. Each restriction specifies:
  - A **start day** and **start time**
  - An **end day** and **end time**

Times use the `HH:MM:SS` format (for example, `09:00:00` for 9:00 AM).

If multiple restriction windows are defined, the escalation policy is active if the current time matches **any** of the windows.

#### Example: Business hours only (Monday through Friday, 9 AM to 5 PM)

Set a single restriction window:
- **Start day**: Monday, **Start time**: 09:00:00
- **End day**: Friday, **End time**: 17:00:00
- **Time zone**: `America/New_York`

Pages that arrive outside this window (for example, at 2:00 AM on Saturday) are snoozed until 9:00 AM on the following Monday.

#### Example: Split shift (mornings and afternoons)

Define two restriction windows to cover non-contiguous hours:

**Window 1:**
- **Start day**: Monday, **Start time**: 09:00:00
- **End day**: Friday, **End time**: 12:00:00

**Window 2:**
- **Start day**: Monday, **Start time**: 14:00:00
- **End day**: Friday, **End time**: 18:00:00

Pages that arrive between 12:00 PM and 2:00 PM are snoozed until the afternoon window opens.

## Best practices

- Balance visibility with urgency:
  - Use paging and escalation policies for critical alerts that require immediate action.
  - Use Slack or Teams for lower-severity issues that need awareness but don't warrant an on-call response.

- Use support hours to protect responders from off-hours notifications:
  - For non-critical alerts, configure support hours to match your team's working hours. Pages are tracked immediately but responders are only notified during active windows.
  - For critical alerts that require immediate attention regardless of time, do **not** set support hours on the escalation policy.

- Choose between time restrictions and support hours based on your routing needs:
  - Use **time restrictions** when a different routing rule or team should handle the alert outside of business hours.
  - Use **support hours** when your team should own the alert at all times but only page responders during defined hours.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/on-call/teams
[2]: https://app.datadoghq.com/on-call/teams
[3]: /tracing/trace_explorer/query_syntax/
