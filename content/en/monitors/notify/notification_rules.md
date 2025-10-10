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

Monitor notification rules are predefined sets of conditions that automate the process of alerting your team based on predefined conditions and tags. Instead of individually configuring notification recipients and routing for every monitor, notification rules allow you to define the notification logic and recipients in one place and automatically route all monitor events with matching tags to that list of handles.

<div class="alert alert-info">There is a default limit of 1000 rules per organization.</a>.</div>

## Creating notification rules

<div class="alert alert-danger">You must have the <a href="/account_management/rbac/permissions/#monitors"><code>monitor_config_policy_write</code> permission</a> to create a rule.</div>

1. Navigate to [**Monitors > Settings > Notification Rules**][1].
1. Click **New Rule**.
1. Add specific tags and values to set the scope for the rule. Notification rules use an AND logic for multiple tags. Both monitor tags and group tags are considered when matching the scope. For an example of this, see [Routing logic](#routing-logic).
1. Define your routing conditions by specifying **when** and **to whom** a notification should be sent. Notifications can be sent to emails, Team channels, or Integration channels. There is a limit of 50 notification recipients per rule. For more information, see [Notifications][2]. 
1. Add a name for the rule.
1. Click **Create Rule**.

{{< img src="/monitors/notifications/notification_rules/notification_rules_form_with_conditional_recipients.png" alt="Configuration for a notification rule showing tag scopes, routing conditions, recipients, and matching monitors" style="width:100%;" >}}

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

In your monitor configuration, you can view the notification recipients that are applied to the monitor under **Recipient Summary**. Notification rules automatically add recipients to monitors that match the configured scopes.

{{< img src="/monitors/notifications/notification_rules/monitor_matching_notification_rule.png" alt="Recipient summary field showing the notification recipients applied by notification rules" style="width:100%;" >}}

## Routing logic

Notification rules apply to all monitor notifications that match the scopes defined in the rule configuration.
- Multiple tags apply an AND logic to the scope.
- Tags can be either from monitor tags or from monitor groups
- Multiple rules can match a single monitor notification, and all recipients are added to the monitor alert without duplication.

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
