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
- link: "/monitors/create/"
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

Add a unique title to your monitor (required). For multi-alert monitors, some tags identifying your triggering scope are automatically inserted. Additionally, you can use [tag variables][2].

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

Add tags to your monitor (optional). Monitor tags are different than metric tags. They are used in the UI to group and search for monitors.

### Renotify

Enable monitor renotification (optional) to remind your team that a problem is not solved.

  {{< img src="monitors/notifications/renotify_options.png" alt="Enable renotify" style="width:90%;" >}}

Configure the renotify interval, the monitor states from which the monitor renotifies (within `alert`, `no data`, and `warn`) and optionally set a limit to the number of renotification messages sent.

For example, configure the monitor to `stop renotifying after 1 occurrence` to receive a single escalation message after the main alert.

If renotification is enabled, you are given the option to include an escalation message that is sent if the monitor remains in one of the chosen states for the specified time period.

The escalation message can be added in the following ways:

* In the `{{#is_renotify}}` block in the original notification message (recommended).
* In the *Renotification message* field in the `Say what's happening` section.
* With the `escalation_message` attribute in the API.

If you use the `{{#is_renotify}}` block, the original notification message is also included in the renotification, so:

1. Include only extra details in the `{{#is_renotify}}` block and don't repeat the original message details.
2. Send the escalation message to a subset of groups.

Learn how to configure your monitors for those use cases in the [example section][6].

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

Use this section to send notifications to your team through email, Slack, PagerDuty, etc. You can search for team members and connected integrations with the drop-down box. When an `@notification` is added to this section, the notification is automatically added to the [message](#message) field.

**Note**: An `@notification` must have a space between it and the last line character, for example:

```text
Disk space is low @ops-team@company.com
```

### Notifications

`@notifications` can be sent to:

#### Email

* Notify an active Datadog user by email with `@<DD_USER_EMAIL_ADDRESS>`. **Note**: An email address associated with a pending Datadog user invitation or a disabled user is considered inactive and does not receive notifications.
* Notify any non-Datadog user by email with `@<EMAIL>`.

#### Integrations

Notify your team through connected integrations by using the format `@<INTEGRATION_NAME>-<VALUES>`. Below is a list of prefixes and example links:

| Integration    | Prefix       | Examples       |
|----------------|--------------|----------------|
| [Jira][7]      | `@jira`      | [Examples][8]  |
| [PagerDuty][9] | `@pagerduty` | [Examples][10]  |
| [Slack][11]     | `@slack`     | [Examples][12]  |
| [Webhooks][13]  | `@webhook`   | [Examples][14] |

See the [list of integrations][15] that can be used to notify your team.

**Note**: Handles that include parentheses (`(`, `)`) are not supported. When a handle with parentheses is used, the handle is not parsed and no alert is created.

### Modifications

An [event][16] is created anytime a monitor is created, modified, silenced, or deleted. Set the `Notify` option to notify team members and chat services of these events.

### Permissions

By default, only users attached to roles with [Monitors Write permissions][17] can edit monitors. [Datadog Admin Role and Datadog Standard Role][18] have Monitors Write permission by default. If your organization uses [Custom Roles][19], other custom roles may have the Monitors Write permission.

You can further restrict your monitor by specifying a list of [roles][20] allowed to edit it. The monitor's creator can always edit the monitor. 

  {{< img src="monitors/notifications/monitor_rbac_restricted.jpg" alt="RBAC Restricted Monitor" style="width:90%;" >}}

Editing includes any updates to the monitor configuration, deleting the monitor, and muting the monitor for any amount of time.

**Note**: The limitations are applied both in the UI and API.

For more information on setting up RBAC for Monitors and migrating monitors from the locked setting to using role restrictions, see [How to set up RBAC for Monitors][21].

## Test notifications

Test notifications are supported for the [monitor types][22]: host, metric, anomaly, outlier, forecast, logs, rum, apm, integration (check only), process (check only), network (check only), custom check, event, and composite.

### Run the test

1. After defining your monitor, test the notifications with the **Test Notifications** button at the bottom right of the monitor page.

2. From the test notifications pop-up, choose the monitor case to test. You can only test states that are available in the monitor’s configuration for the thresholds specified in the alerting conditions. [Recovery thresholds][23] are an exception, as Datadog sends a recovery notification once the monitor either is no longer in alert, or it has no warn conditions.

    {{< img src="monitors/notifications/test-notif-select.png" alt="Test the notifications for this monitor" style="width:70%;" >}}

3. Click **Run Test** to send notifications to the people and services listed in the monitor.

### Events

Test notifications produce events that can be searched within the event stream. These notifications indicate who initiated the test in the message body with `[TEST]` in notification title.

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

[1]: /monitors/create/configuration
[2]: /monitors/notify/variables/#tag-variables
[3]: http://daringfireball.net/projects/markdown/syntax
[4]: /monitors/notify/variables/
[5]: /monitors/notify/variables/#conditional-variables
[6]: /monitors/notify/variables/?tab=is_renotify#examples
[7]: /integrations/jira/
[8]: /integrations/jira/#use-cases
[9]: /integrations/pagerduty/
[10]: /integrations/pagerduty/#troubleshooting
[11]: /integrations/slack/
[12]: /integrations/slack/#mentions-in-slack-from-monitor-alert
[13]: /integrations/webhooks/
[14]: /integrations/webhooks/#usage
[15]: /integrations/#cat-notification
[16]: /events/
[17]: /account_management/rbac/permissions/#monitors
[18]: /account_management/rbac/?tab=datadogapplication#datadog-default-roles
[19]: /account_management/rbac/?tab=datadogapplication#custom-roles
[20]: /account_management/rbac/?tab=datadogapplication
[21]: /monitors/guide/how-to-set-up-rbac-for-monitors/
[22]: /monitors/create/types/
[23]: /monitors/faq/what-are-recovery-thresholds/
