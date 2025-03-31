---
title: Notification Rules
further_reading:
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure monitor notifications"
- link: "/monitors/settings/"
  tag: "Documentation"
  text: "Monitor Settings"
---

## Overview

Monitor notification rules are predefined sets of conditions that automate the process of alerting your team based on predefined conditions and tags. Instead of configuring notification recipients and routing for every monitor individually, Notification rules allow you to define the notification logic and recipients in one place and automatically route all monitor events with matching tags to that list of handles.

## Creating notification rules

<div class="alert alert-warning">You must  have  <a href="/account_management/rbac/permissions/#monitors"><code>monitor_config_policy_write</code> permission</a> to create a rule.</div>

1. Navigate to [**Monitors > Settings > Notification Rules**][1].
1. Click **New Rule**.
1. Set the scope for the rule through specific tags. Notification rules use an AND logic for multiple tags. For an example of this, see [Routing logic](#routing-logic).
1. Add up to 50 notification recipients. Notifications can be sent to emails, Team channels, or Integration channels. For more information, see [Notifications][2].
1. Add a name for the rule.
1. Click **Create Rule**.

{{< img src="/monitors/notifications/notification_rules/notification_rules_config.png" alt="Configuration for a notification rule, showing tag scopes, recipients, and matching monitors" style="width:100%;" >}}

## Managing notification rules

### From Monitor Settings

{{< img src="/monitors/notifications/notification_rules/settings_notification_rules.png" alt="List of notification rules in Monitor Settings" style="width:100%;" >}}

The [Monitor Notification Rules][1] page displays a table of all your notification rules with the following columns:

- **Scopes**: Shows the tag combinations that define when this rule applies (for example, `team:shopist service:web-store env:prod`).
- **Teams**: Lists the teams that this notification rule is associated with (available only when the team tag is added in the scope)
- **Coverage**: Shows the number of monitors that match this rule's scopes. Use this to verify rule coverage and identify rules that need adjustment.
- **Recipients**: Lists the notification channels (such as Slack or email) that will receive alerts when this rule matches.
- **Actions**: Provides options to edit or delete each notification rule. Click the vertical three-dot menu on the notification rule and select **Edit** or **Delete**.

### From an individual monitor

In your monitor configuration you can view the notification recipients that are applied to the monitor under **Recipient Summary**. Notification rules automatically add recipients to monitors that match the configured scopes.

{{< img src="/monitors/notifications/notification_rules/monitor_matching_notification_rule.png" alt="Recipient summary field showing the notification recipients applied by notification rules" style="width:100%;" >}}

## Routing logic

Notification rules apply the recipients to all monitor notifications that match the scopes in the rule configuration. 
- Multiple tags apply an AND logic to the scope.
- Multiple rules can match with one monitor notification, all recipients are added to the monitor alert without duplication.

{{% collapse-content title="Example: Notification Rule Matching" level="h4" expanded=false %}}

The following table demonstrates how monitors with different tag combinations match notification rules and their resulting notifications. This table shows how:
1. Multiple notification rules can match a single monitor notification based on its tags.
2. The AND logic works for multiple tags within a rule.
3. All matching notification rules contribute their recipients to the final notification list.
4. Recipients are deduplicated in the final notification list.

<table>
    <thead>
        <tr>
            <th rowspan="2">Monitor alert tags and notifications </th>
            <th colspan="5" style="text-align: center; border-bottom: 1px solid #ddd; background-color:rgb(98, 92, 92);">Notification Rules</th>
            <th rowspan="2">Notified Handles</th>
        </tr>
        <tr>
            <th><code>team:shopist AND<br>service:web-store</code></th>
            <th><code>team:shopist</code></th>
            <th><code>service:web-store</code></th>
            <th><code>service:web-store AND<br>env:prod</code></th>
            <th><code>service:web-store AND<br>env:dev</code></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="background-color:#E8E8E8"></td>
            <td style="background-color:#E8E8E8"><i>@slack-channel1</i><br><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8"><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8"><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8"><i>@user@datadoghq.com</i></td>
            <td style="background-color:#E8E8E8"><i>@jira-project</i></td>
            <td style="background-color:#E8E8E8">Final Recipients</td>
        </tr>
        <tr>
            <td><code>team:shopist and service:web-store</code><br><i>@user@datadoghq.com</i></td>
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
            <td><code>service:web-store and env:prod</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td><i>@jira-project</i><br><i>@user@datadoghq.com</i></td>
        </tr>
        <tr>
            <td><code>service:web-store and env:dev</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td><i>@jira-project</i></td>
        </tr>
        <tr>
            <td><code>team:shopist and service:web-store and env:prod</code><br><i>@slack-service1</i><br><i>@jira-project</i><br><i>@user@datadoghq.com</i></td>
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
