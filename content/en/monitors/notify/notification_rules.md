---
title: Notification Rules
further_reading:
- link: "/monitors/settings/"
  tag: "Documentation"
  text: "Monitor Settings"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure monitor notifications"
---

## Overview

Monitor notification rules are predefined sets of conditions that automate the process of alerting your team. Create different rules to route monitor alerts based on the tags of the monitor notification. Notification rules allow you to define the notification logic and recipients in one place and all the monitor events with matching tags will be routed to that list of handles automatically.

With notification rules, you no longer need to manually set up notifications recipients nor notification routing logic for each individual monitor. 

## Creating notification rules

<div class="alert alert-warning">You must  have  <a href="/account_management/rbac/permissions/#monitors"><code>monitor_config_policy_write</code> permission</a> to create a rule.</div>

1. Navigate to [**Monitors > Settings > Notification Rules**][1].
1. Click **New Rule**.
1. Set the scope for the rule through specific tags. Notification rules use an AND logic for multiple tags. For an example of this, see [Routing logic](#routing-logic).
1. Add notification recipients. Notifications can be sent to emails, Team channels, or Integration channels. For more information, see [Notifications][2].
1. You can view and validate the list of monitors that match the rule. 
1. Click **Create Rule**.

**Note**: Notification rules override individual monitor `@mentions`. 

{{< img src="path/to/your/image-name-here.png" alt="TBD Configuration for a new notification rule, showing tag scopes, recipients, and matching monitors" style="width:100%;" >}}


## Managing notification rules

### From Monitor Settings:

| Action     | Instructions    |
| ---------  | ----------- |
| **Edit**   | Click the vertical three-dot menu on the notification rule and select **Edit**. |
| **Delete** | Click the vertical three-dot menu on the notification rule and select **Delete**. |

### From an individual monitor:

<div class="alert alert-info">Enabling Notification rules overrides individual monitor @mentions. 
</div>

In your monitor configuration you can view the notification recipients that are applied to the monitor under **Configure response**. Notification rules automatically add recipients to monitors that match the configured scopes.

{{< img src="path/to/your/image-name-here.png" alt="TBD Recipient summary field showing the notification recipients applied by notification rules" style="width:100%;" >}}

## Routing logic

Notification rules apply the recipients to all monitors that match the scopes in the rule configuration. 
- Multiple tags apply an AND logic to the scope.
- Multiple rules can match with one monitor, all recipients are added to the monitor wthout duplication.


{{% collapse-content title="Example: Notification Rule Matching" level="h4" expanded=false %}}


The following table demonstrates how monitors with different tag combinations match notification rules and their resulting notifications. This table shows how:
1. Multiple notification rules can match a single monitor based on its tags.
2. The AND logic works for multiple tags within a rule.
3. All matching notification rules contribute their recipients to the final notification list.
4. Recipients are deduplicated in the final notification list.

<table>
    <thead>
        <tr>
            <th style="width: 20%">Alert Tags</th>
            <th colspan="6" style="text-align: center">Notification Rules</th>
            <th style="width: 20%">Notified Handles</th>
        </tr>
        <tr>
            <th></th>
            <th>Rule 1<br><code>team:shopist AND<br>service:web-store</code></th>
            <th>Rule 2<br><code>team:shopist</code></th>
            <th>Rule 3<br><code>service:web-store</code></th>
            <th>Rule 4<br><code>service:web-store AND<br>env:prod</code></th>
            <th>Rule 5<br><code>service:web-store AND<br>env:dev</code></th>
            <th>Rule 6<br><code>team:shopist AND<br>service:web-store AND<br>env:prod</code></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>team:shopist AND service:web-store</code></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td><code>@slack-channel1</code><br><code>@jira-project</code></td>
        </tr>
        <tr>
            <td><code>team:shopist</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td><code>@jira-project</code></td>
        </tr>
        <tr>
            <td><code>service:web-store</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td><code>@jira-project</code></td>
        </tr>
        <tr>
            <td><code>service:web-store AND env:prod</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td><code>@jira-project</code><br><code>@user@datadoghq.com</code></td>
        </tr>
        <tr>
            <td><code>service:web-store AND env:dev</code></td>
            <td style="text-align: center"></td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td><code>@jira-project</code></td>
        </tr>
        <tr>
            <td><code>team:shopist AND service:web-store AND env:prod</code></td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center">{{< X >}}</td>
            <td style="text-align: center"></td>
            <td style="text-align: center">{{< X >}}</td>
            <td><code>@slack-channel1</code><br><code>@jira-project</code><br><code>@pagerduty-service1</code><br><code>@slack-service1</code><br><code>@user@datadoghq.com</code></td>
        </tr>
    </tbody>
</table>


{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/settings/notifications
[2]: /monitors/notify/#notifications