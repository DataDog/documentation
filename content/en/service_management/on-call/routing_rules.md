---
title: Routing Rules
further_reading:
- link: '/service_management/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
aliases:
    - /service_management/on-call/processing_rules/
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">On-Call is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

### Overview

Routing rules let you define **granular logic** for how alerts are routed within your team. Instead of sending all alerts to a single escalation policy, you can build flexible, condition-based rules that determine exactly how and where each alert should be delivered—based on priority, time of day, tags, and more.

### What You Can Do with Routing Rules

- **Route alerts by priority**
  For example:
  - Send **priority 1** alerts to your **primary escalation policy**.
  - Send **priority 2–4** alerts to **Slack** or **Microsoft Teams** for visibility without noise.

- **Route alerts by time of day**
  - During **business hours**, route all alerts to an escalation policy.
  - After hours, route only critical alerts to paging, and others to chat.

- **Set urgency dynamically**
  The urgency of a page determines how end users are notified, based on their preferences.
  With **Dynamic Urgency**, urgency is automatically inferred from the monitor alert:
  - `warn` status ➝ **low urgency**
  - `alert` status ➝ **high urgency**

- **Trigger workflows (coming soon)**
  In future updates, you’ll be able to use routing rules to trigger automated workflows in response to matching alerts.

<placeholder_screenshot>
_A screenshot of the Routing Rules configuration UI showing multiple conditions (priority, time window, etc.) and destination options (Escalation Policy, Slack, Teams)_

---

### Routing Rule Syntax

Routing rules use the **Datadog query syntax**. You can define multiple rules with `if/else` logic. The engine evaluates rules top-down, and the **last rule must always be a default** fallback that points to an escalation policy.

**⚠️ Note:** Routing rule syntax is **case sensitive**. For example, `tags.env:Prod` will not match `tags.env:prod`.

**Supported attributes:**

| Attribute      | Description                                                                 | Example                                 |
|----------------|-----------------------------------------------------------------------------|-----------------------------------------|
| `tags`         | Tags on the incoming alert                                                  | `tags.env:prod`                         |
| `groups`       | Monitor group names                                                         | `groups:"service:checkout-service"`     |
| `priority`     | Monitor priority (1–5)                                                      | `priority:(1 OR 2)`                     |
| `alert_status` | Monitor status (`error`, `warn`, `success`)                                 | `alert_status:(error OR warn)`          |

<placeholder_screenshot>
_A screenshot showing an example routing rule with syntax input, including `priority:(1)` and `alert_status:error` in the query builder UI_

---

### Best Practices

- Think in terms of **urgency vs visibility**:
  - Use paging + escalation for urgent, high-impact alerts.
  - Use Slack, or Teams for lower-severity, non-paging notifications.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/on-call/teams
[2]: https://app.datadoghq.com/on-call/teams
