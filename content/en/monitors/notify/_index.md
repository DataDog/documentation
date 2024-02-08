---
title: Notifications
kind: documentation
aliases:
  - /monitors/faq/how-do-i-add-custom-template-variables-to-my-monitor-message
  - /monitors/faq/how-do-i-setup-conditional-contacts-and-messages-in-a-single-monitor
  - /developers/faq/what-do-notifications-do-in-datadog
  - /monitors/notifications/
description: "Send notifications to your teams when monitors trigger alerts"
further_reading:
- link: "/monitors/"
  tag: "Documentation"
  text: "Create monitors"
- link: "/monitors/manage/"
  tag: "Documentation"
  text: "Manage monitors"
---

## Overview

Notifications are a key component of monitors that keep your team informed of issues and support troubleshooting. When [creating your monitor][1], add to the **Say what's happening** and **Notify your team** sections.

## Say what's happening

Use this section to set the notifications sent to your team.

### Title

Add a unique title to your monitor (required). For multi alert monitors, some tags identifying your triggering scope are automatically inserted. Additionally, you can use [tag variables][2].

### Message

The message field allows standard [Markdown formatting][3] and [variables][4]. Use [conditional variables][5] to modulate the notification text sent to different contacts with [@notifications](#notifications).

A common use-case for the monitor message is to include a step-by-step way to resolve the problem, for example:

```text
Steps to free up disk space:
1. Remove unused packages
2. Clear APT cache
3. Uninstall unnecessary applications
4. Remove duplicate files
```

### Tags

Add tags to your monitor. Monitor tags are different from metric tags. They are used in the UI to group and search for monitors. If tag policies are configured, the required tags and tag values need to be added. To learn more, see [Tag Policies][6].

{{< img src="monitors/notifications/notifications_add_required_tags.png" alt="View of policy tag configuration. Underneath 'Policy tags' are three example tags, cost_center, product_id, and env, next to a 'Select value' dropdown." style="width:100%;" >}}

### Renotify

Enable monitor renotification (optional) to remind your team that a problem is not solved.

  {{< img src="monitors/notifications/renotify_options.png" alt="Enable renotify" style="width:90%;" >}}

Configure the renotify interval, the monitor states from which the monitor renotifies (within `alert`, `no data`, and `warn`) and optionally set a limit to the number of renotification messages sent.

For example, configure the monitor to `stop renotifying after 1 occurrence` to receive a single escalation message after the main alert.
**Note:** [Attribute and tag variables][7] in the renotification are populated with the data available to the monitor during the time period of the renotification.

If renotification is enabled, you are given the option to include an escalation message that is sent if the monitor remains in one of the chosen states for the specified time period.


The escalation message can be added in the following ways:

* In the `{{#is_renotify}}` block in the original notification message (recommended).
* In the *Renotification message* field in the `Say what's happening` section.
* With the `escalation_message` attribute in the API.

If you use the `{{#is_renotify}}` block, the original notification message is also included in the renotification, so:

1. Include only extra details in the `{{#is_renotify}}` block and don't repeat the original message details.
2. Send the escalation message to a subset of groups.

Learn how to configure your monitors for those use cases in the [example section][8].

### Priority

Add a priority (optional) associated with your monitors. Values range from P1 through P5, with P1 being the highest priority and the P5 being the lowest.
To override the monitor priority in the notification message, use `{{override_priority 'Pi'}}` where `Pi` is between P1 and P5.

For example, you can set different priorities for `alert` and `warning` notifications:

```
{{#is_alert}}
{{override_priority 'P1'}}
 ...
{{/is_alert}}

{{#is_warning}}
{{override_priority 'P4'}}
...
{{/is_warning}}
```

## Notify your team

Use this section to send notifications to your team through email, Slack, PagerDuty, etc. You can search for team members and connected integrations with the dropdown box. When an `@notification` is added to this section, the notification is automatically added to the [message](#message) field.

**Note**: An `@notification` must have a space between it and the last line character, for example:

```text
Disk space is low @ops-team@company.com
```

### Notifications

`@notifications` can be sent to:

#### Email

{{% notifications-email %}}

#### Integrations

{{% notifications-integrations %}}

### Toggle additional content

Monitor notifications include content such as the monitor's query, the @-mentions used, metric snapshots (for metric monitors), and links back to relevant pages in Datadog. You have the option to choose which content you would like to include or exclude from notifications for individual monitors.

<div class="alert alert-warning">Distribution metrics with percentile aggregators (such as `p50`, `p75`, `p95`, or `p99`), do not generate a snapshot graph in notifications. </div>

{{< img src="monitors/notifications/monitor_notification_presets.png" alt="Set a monitor preset" style="width:70%;" >}}

The options are:

- **Default**: No content is hidden.
- **Hide Query**: Remove the monitor's query from the notification message.
- **Hide Handles**: Remove the @-mentions that are used in the notification message.
- **Hide All**: Notification message does not include query, handles, any snapshots (for metric monitors), or additional links in footers.

**Note**: Depending on the integration, some content may not be displayed by default.

### Modifications

An [event][9] is created anytime a monitor is created, modified, silenced, or deleted. Set the `Notify` option to notify team members, chat services, and the monitor creator of these events.

### Permissions

All users can read all monitors, regardless of the role they are associated with.

By default, only users attached to roles with the [Monitors Write permission][10] can edit monitors. [Datadog Admin Role and Datadog Standard Role][11] have the Monitors Write permission by default. If your organization uses [Custom Roles][12], other custom roles may have the Monitors Write permission.

You can further restrict your monitor by specifying a list of [roles][13] allowed to edit it. The monitor's creator can always edit the monitor.

  {{< img src="monitors/notifications/monitor_rbac_restricted.jpg" alt="RBAC Restricted Monitor" style="width:90%;" >}}

Editing includes any updates to the monitor configuration, deleting the monitor, and muting the monitor for any amount of time.

**Note**: The limitations are applied both in the UI and API.

For more information on setting up RBAC for Monitors and migrating monitors from the locked setting to using role restrictions, see [How to set up RBAC for Monitors][14].

## Test notifications

Test notifications are supported for the [monitor types][15]: host, metric, anomaly, outlier, forecast, logs, rum, apm, integration (check only), process (check only), network (check only), custom check, event, and composite.

### Run the test

1. After defining your monitor, test the notifications with the **Test Notifications** button at the bottom right of the monitor page.

2. From the test notifications pop-up, choose the monitor case to test. You can only test states that are available in the monitor's configuration for the thresholds specified in the alerting conditions. [Recovery thresholds][16] are an exception, as Datadog sends a recovery notification once the monitor either is no longer in alert, or it has no warn conditions.

    {{< img src="monitors/notifications/test-notif-select.png" alt="Test the notifications for this monitor" style="width:70%;" >}}

3. Click **Run Test** to send notifications to the people and services listed in the monitor.

### Events

Test notifications produce events that can be searched within the event explorer. These notifications indicate who initiated the test in the message body with `[TEST]` in notification title.

Tag variables are only populated in the text of Datadog child events. The parent event only displays an aggregation summary.

### Variables {#variables-test-notification}

Message variables auto-populate with a randomly selected group based on the scope of your monitor's definition, for example:

```text
{{#is_alert}}
{{host.name}} <-- will populate
{{/is_alert}}
```
## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/configuration
[2]: /monitors/notify/variables/#tag-variables
[3]: http://daringfireball.net/projects/markdown/syntax
[4]: /monitors/notify/variables/
[5]: /monitors/notify/variables/#conditional-variables
[6]: /monitors/settings/
[7]: /monitors/notify/variables/?tabs=is_alert#attribute-and-tag-variables
[8]: /monitors/notify/variables/?tab=is_renotify#examples
[9]: /events/
[10]: /account_management/rbac/permissions/#monitors
[11]: /account_management/rbac/?tab=datadogapplication#datadog-default-roles
[12]: /account_management/rbac/?tab=datadogapplication#custom-roles
[13]: /account_management/rbac/?tab=datadogapplication
[14]: /monitors/guide/how-to-set-up-rbac-for-monitors/
[15]: /monitors/types
[16]: /monitors/guide/recovery-thresholds/
