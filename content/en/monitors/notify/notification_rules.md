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
- Notification rule recipients override recipients configured in individual monitors.
- Multiple tags apply an AND logic to the scope.
- Multiple rules can match with one monitor, all recipients are added to the monitor wthout duplication.


Multiple rules can match to one monitor, all recipient from matching notification rules are added to the monitor without duplicates.
<!-- 
{{% collapse-content title="Multiple tag scopes" level="h4" expanded=false %}}
...
{{% /collapse-content %}}

{{% collapse-content title="Multiple notification rules" level="h4" expanded=false %}}
...
{{% /collapse-content %}} -->

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/settings/notifications
[2]: /monitors/notify/#notifications