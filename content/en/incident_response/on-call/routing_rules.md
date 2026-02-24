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

Routing rules determine how alerts are directed within your team. Instead of sending all alerts through a single escalation policy, you can create rules that route alerts based on priority, tags, monitor status, time of day, and more.

## Create a routing rule

Rules are evaluated from top to bottom. The last rule must be a fallback that routes all unmatched alerts to an escalation policy.

To create a routing rule:

1. Go to [**On-Call** > **Teams**][1] and select a team.
1. Find the **Page Routing** section and click **Edit**. The **Configure Page Routing** window opens.
 
   {{< img src="service_management/oncall/configure-page-routing.png" alt="The Configure Page Routing window in Datadog On-Call, showing routing condition fields and target configuration options" style="width:100%;" >}}

1. Click **Add Conditions** to add a routing condition.
1. Define conditions using the [routing rule syntax](#routing-rule-syntax).
1. Optionally, configure [support hours](#support-hours):

   1. Toggle on **Use support hours**.
   1. Click **Add** to add a time interval. For each interval, select a time zone and the days of the week, then set the start and end time.
   1. Optionally, enable the **Outside support hours, hold escalation policy notifications until the next window** toggle.

   {{< img src="service_management/oncall/page-routing-support-hours.png" alt="The support hours configuration panel on a routing condition, showing time interval fields and the option to hold escalation policy notifications outside support hours" style="width:60%;" >}}

1. Under **Set targets**, click **Add** and select a target type:
   - **Page escalation policy**: Select an escalation policy and set the urgency to `DYNAMIC` (based on alert status), `HIGH`, or `LOW`.
   - **Send Slack message** (Preview): Select a Slack workspace and channel.
   - **Send Microsoft Teams message** (Preview): Select a Teams tenant, team, and channel.
   - **Run Workflow** (Preview): Select an existing workflow.

1. Add more rules as needed, and click **Save**.

### Routing rule syntax

Routing rules use [Datadog query syntax][2] and support multiple `if/else` conditions.

<div class="alert alert-info">Routing rule syntax is case-sensitive. For example, <code>tags.env:Prod</code> does not match <code>tags.env:prod</code>.</div>

**Supported attributes:**

| Attribute      | Description                                                                 | Example                               |
|----------------|-----------------------------------------------------------------------------|---------------------------------------|
| `tags`         | Tags on the incoming alert                                                  | `tags.env:prod`                       |
| `groups`       | Monitor group names                                                         | `groups.service:checkout-service`     |
| `priority`     | Monitor priority (1–5)                                                      | `priority:(1 OR 2)`                   |
| `alert_status` | Monitor status (`error`, `warn`, `success`)                                 | `alert_status:(error OR warn)`        |

### Support hours

Support hours define when an escalation policy can notify responders.

When a routing rule includes support hours, Datadog compares the current time to the configured intervals and proceeds as follows:
- **Inside support hours**: Datadog runs the escalation policy immediately and notifies responders.
- **Outside support hours**:
  - If **Outside support hours, hold escalation policy notifications until the next window** is enabled, Datadog creates the Page immediately but postpones escalation policy notifications until the next support window begins. Datadog adds a timeline entry to record the delay.
  - If this option is disabled, Datadog skips the routing rule and does not create a Page. It then evaluates the next matching rule.

#### Example support hour configurations

- Set support hours to standard business hours (Monday–Friday, 9 a.m.–5 p.m.):

  Add one interval: select Monday through Friday, set the time range to 9 a.m.–5 p.m., and select the `America/New_York` time zone. Pages outside this window are postponed until 9 a.m. on the following Monday.

- Create a split support shift (mornings and afternoons):

  Add two intervals: one from 9 a.m.–12 p.m. and one from 2 p.m.–6 p.m, both with Monday through Friday selected. Pages that arrive between 12 p.m. and 2 p.m. are postponed until the afternoon window opens.

**Note**: These examples assume the **Outside support hours, hold escalation policy notifications until the next window** toggle is enabled.

## Send Pages to Slack or Microsoft Teams

{{< img src="service_management/oncall/page_in_slack_or_ms_teams.png" alt="A sample routing rule, which routes all incoming Pages to Slack and Microsoft Teams" style="width:100%;" >}}

When you route Pages to Slack or Microsoft Teams, Datadog sends a notification to the configured channel and creates a Page. Team members can use buttons to acknowledge, escalate, or resolve the Page.

{{< img src="service_management/oncall/page_representation_in_slack.png" alt="A Page notification in Slack with buttons to acknowledge, escalate, or resolve" style="width:70%;" >}}

When a Page is acknowledged or resolved in Slack or Teams, Datadog updates the original notification in place, without sending additional messages. This minimizes notification volume and keeps the current Page status visible in the original thread.

## Routing rule examples

- **Route alerts by priority:**
  - Send **priority 1** alerts to your primary escalation policy.
  - Send **priority 2–4** alerts to Slack or Microsoft Teams.

- **Route alerts by time of day:**
  - During business hours, route alerts to an escalation policy.
  - Outside business hours, route critical alerts to an escalation policy and non-critical alerts to a Slack or Teams channel.

- **Delay escalation outside of support hours:**
  - Define [support hours](#support-hours) on a routing condition to hold escalation policy notifications until the next active window.

- **Use `DYNAMIC` urgency to set urgency based on monitor alert status:** 
  - If the monitor alert has `warn` status, set urgency to `LOW`.
  - If the monitor alert has `error` status, set urgency to `HIGH`.

  Urgency determines how responders are notified based on their notification preferences.

## Best practices

- **Balance visibility with urgency:**
  - Use paging and escalation policies for critical alerts that require immediate action.
  - Use Slack or Teams for lower-severity issues that need awareness but don't warrant an on-call response.

- **Use support hours to protect responders from off-hours notifications:**
  - For non-critical alerts, configure support hours to match your team's working hours. Datadog creates the Page immediately but only notifies responders during active windows.
  - For critical alerts that require immediate attention regardless of time, do not configure support hours on the routing rule.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/on-call/teams
[2]: /tracing/trace_explorer/query_syntax/
