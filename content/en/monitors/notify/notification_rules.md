---
title: Notification Rules
description: "Automate monitor alert routing using predefined notification rules based on tags and conditions to streamline team notifications."
further_reading:
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure monitor notifications"
- link: "/monitors/settings/"
  tag: "Documentation"
  text: "Monitor Settings"
- link: "https://www.datadoghq.com/blog/monitor-notification-rules/"
  tag: "Blog"
  text: "Route your monitor alerts with Datadog monitor notification rules"
---

## Overview
Monitor notification rules are predefined sets of conditions that automate the process of alerting your team based on tags and rule logic. Instead of individually configuring recipients for every monitor, notification rules let you define once and automatically route all monitor notifications whose notification tagset matches the rule's scope.

<div class="alert alert-info">There is a default limit of 1000 rules per organization.</a>.</div>

## Setup
To create a Monitor Notification Rule in Datadog, navigate to the [**Monitors > Settings > Notification Rules**][1] page. Then, click the **New Rule** button in the upper right. 
{{< img src="/monitors/notifications/notification_rules/notification_rules_form_with_conditional_recipients.png" alt="Configuration for a notification rule showing tag scopes, routing conditions, recipients, and matching monitors" style="width:100%;" >}}

### Choose the scope
Define which tags a monitor notification must have to be routed to this rule. Matching evaluates the notification tagset (the union of monitor tags and the firing group's tags for multi alert monitors). Monitor tags alone can satisfy the scope alone and that would still be considered a match. Only monitor and group tags participate in matching. Matching is case-insensitive.

**Note**: Any monitor created or edited after the notification rule is saved will be routed to the defined recipients if it matches the scope of the rule.

#### Rule scope syntax

The Notification Rule scope query supports boolean logic and follows the same common [Search Syntax][3] that many other products across the platform support.

##### Boolean operators
- Supported: AND, OR, NOT
- Implicit operator: AND
- Parentheses: supported
Examples:
- `service:web-store AND (env:prod OR env:staging)`
- `NOT (env:staging OR env:dev)`

##### Wildcards
Only `key:*` is supported (for example, `env:*`). Partial wildcards like `env:prod-*` are not supported. `key:*` matches if the key exists anywhere in the notification tagset.

##### Multiple values for the same key
Use either `env:(prod OR staging)` or `env:prod OR env:staging`.

##### Quoting
Wrap values that contain spaces in quotes, for example: `team:"data platform"`.

##### Examples

| Notification Rule scope | Explanation |
| ------------------- | ---------------------- |
| `service:web-store`       | Route any notification about the `web-store` service. |
| `service:web-store AND env:prod`       | Route any notification about the `web-store` service running on the `prod` environment. |
| `service:webstore AND  NOT env:staging`       | Route any notification about the `web-store` service that is **not** running on the `staging` environment. |
| `env:*`       | Route any notification that carry the `env:<value>` tag (either from monitor tags or group). |

For an example of this, see [Routing logic](#routing-logic).

#### Rule scope limitations
There are a few limitations that are **not supported** which include:

* Keyless tags, such as `prod AND service:(A or B)` or `prod`, aren't supported. Tags need to have a key, in this case for example `env:prod`.
* Partial wildcards (`service:web-*`) and question mark wildcards `service:auth?` are not supported. Wildcard is allowed only if used alone like `service:*`.
* scope lenght up to 3000 characters.

### Configure the recipients
Define the recipients to notify whenever a monitor notification matches the rule's scope. You can specify when and to whom a notification should be sent. Notifications can be sent to email or any integration channel. There is a limit of 50 notification recipients per rule. For more information, see [Notifications][2].

#### Conditional recipients
You can notify a specific recipient only when certain conditions are met. For example, route "alerts" to your on-call recipient, and send "warn" notifications to a Slack channel if they don't require immediate action.

### Name it
Give the rule a clear name so it’s easy to recognize on the Manage page.

## Managing notification rules

### From Monitor Settings

{{< img src="/monitors/notifications/notification_rules/notification_rules_table.png" alt="List of notification rules in Monitor Settings" style="width:100%;" >}}

The [Monitor Notification Rules][1] page displays a table of all your notification rules with the following columns:

- **Name**: Notification rule name
- **Scope**: Shows the tag combinations that define when this rule applies (for example, `team:shopist service:web-store env:prod`).
- **Team**: Lists the teams that this notification rule is associated with (available only when the team tag is added in the scope)
- **Coverage**: Shows the number of monitors that match this rule's scopes. Use this to verify rule coverage and identify rules that need adjustment.
- **Notifies**: Lists the notification channels (such as Slack or email) that will receive alerts when this rule matches.

Additionally, you can click the vertical three-dot menu on the notification rule to **Edit** or **Delete**.

### From an individual monitor
In your monitor configuration, the **Recipient Summary** shows recipients that are applied to the monitor by matching notification rules. On the **Monitor** edit page, you may also see rules that _could_ match when new groups report (multi alert monitors). The **Monitor** status page shows rules that match.

{{< img src="/monitors/notifications/notification_rules/monitor_matching_notification_rule.png" alt="Recipient summary field showing the notification recipients applied by notification rules" style="width:100%;" >}}

## How matching works

- Notification tagset = monitor tags ∪ tags of the firing group (for multi alert monitors). If a key has multiple values across monitor/group, all values are considered.
- Currently matches: A rule matches if at least one reporting group, combined with monitor tags, satisfies the scope; or, if the monitor tags alone do. NOT is evaluated per candidate tagset, so a group with a denied value won't match.
- Could match when new groups report (multi alert monitors, Monitor edit surface): Treat each group-by key as present with any value, constrained by the monitor query's allow/deny filters.
- If multiple rules match a single notification, recipients from all matching rules are merged and de-duplicated.

{{< img src="/monitors/notifications/notification_rules/diagram_notification-rules.png" alt="Flowchart showing how Monitor notification rules match tags, combine recipients from monitors and rules, and remove duplicates before sending alerts" style="width:100%;" >}}

{{% collapse-content title="Example: Notification Rule Matching" level="h4" expanded=false %}}

The following table demonstrates how monitors with different tag combinations match notification rules and their resulting notifications. This table shows how:
1. Multiple notification rules can match a single monitor notification based on its tags.
2. The AND logic works for multiple tags within a rule.
3. All matching notification rules contribute their recipients to the final notification list.
4. Recipients are deduplicated in the final notification list.

<table>
    <thead>
        <tr>
            <th></th>
            <th colspan="5" style="text-align: center; border-bottom: 1px solid #ddd; background-color:rgb(98, 92, 92);">Notification Rules</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th style="background-color:#E8E8E8;"></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>team:shopist,<br>service:web-store</code></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>team:shopist</code></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>service:web-store</code></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>service:web-store<br>env:prod</code></th>
            <th style="background-color:#E8E8E8; border: 1px solid #ddd;"><code>service:web-store<br>env:dev</code></th>
            <th style="background-color:#E8E8E8;"></th>
        </tr>
        <tr>
            <td style="background-color:#E8E8E8;"><strong>MONITOR ALERT TAGS AND NOTIFICATIONS</strong></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@slack-channel1</i><br><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@user@datadoghq.com</i></td>
            <td style="background-color:#E8E8E8; border: 1px solid #ddd;"><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8;"><strong>NOTIFIED HANDLES</strong></td>
        </tr>
        <tr>
            <td><code>team:shopist, service:web-store</code><br><i>@user@datadoghq.com</i></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td><i>@slack-channel1</i><br><i>@jira-project</i><br><i>@user@datadoghq.com</i></td>
        </tr>
        <tr>
            <td><code>team:shopist</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td><i>@jira-project</i></td>
        </tr>
        <tr>
            <td><code>service:web-store</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td><i>@jira-project</i></td>
        </tr>
        <tr>
            <td><code>service:web-store, env:prod</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td><i>@jira-project</i><br><i>@user@datadoghq.com</i></td>
        </tr>
        <tr>
            <td><code>service:web-store, env:dev</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td><i>@jira-project</i></td>
        </tr>
        <tr>
            <td><code>team:shopist and service:web-store, env:prod</code><br><i>@slack-service1</i><br><i>@jira-project</i><br><i>@user@datadoghq.com</i></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td><i>@pagerduty-service1 @slack-service1</i><br><i>@jira-project</i><br><i>@user@datadoghq.com</i></td>
        </tr>
    </tbody>
</table>

{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/settings/notifications
[2]: /monitors/notify/#notifications
