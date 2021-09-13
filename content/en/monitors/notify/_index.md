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

Add a unique title to your monitor (required). For multi-alert monitors, some tags identifying your triggering scope are automatically inserted. Additionally, you can use [tag variables](#tag-variables).

### Message

The message field allows standard [Markdown formatting][2] and [variables](#variables). Use [conditional variables](#conditional-variables) to modulate the notification text sent to different contacts with [@notifications](#notifications).

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

  {{< img src="monitors/notifications/renotify_enabled.jpg" alt="Enable renotify" style="width:70%;" >}}

If renotification is enabled, you are given the option to include an escalation message that is sent if the monitor remains in the `alert` or `no data` state for the specified time.

The escalation message can be added in the following ways:

* In the `{{#is_renotify}}` block in the original notification message (recommended).
* In the *escalation_message* field in the app.
* With the `escalation_message` attribute in the API.

If you use the `{{#is_renotify}}` block, keep in mind that the original notification message is also included in the renotification, so:

1. Include only extra details in the `{{#is_renotify}}` block and don't repeat the original message details.
2. Send the escalation message to a subset of groups.

Learn how to configure your monitors for those use cases in the [example section](#examples).

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

* Notify a Datadog user by email with `@<DD_USER_EMAIL_ADDRESS>`. **Note**: An email address associated with a pending Datadog user invitation is considered inactive and does not receive notifications.
* Notify any non-Datadog user by email with `@<EMAIL>`.

#### Integrations

Notify your team through connected integrations by using the format `@<INTEGRATION_NAME>-<VALUES>`. Below is a list of prefixes and example links:

| Integration    | Prefix       | Examples       |
|----------------|--------------|----------------|
| [Jira][3]      | `@jira`      | [Examples][4]  |
| [PagerDuty][5] | `@pagerduty` | [Examples][6]  |
| [Slack][7]     | `@slack`     | [Examples][8]  |
| [Webhooks][9]  | `@webhook`   | [Examples][10] |

See the [list of integrations][11] that can be used to notify your team.

**Note**: Handles that include parentheses (`(`, `)`) are not supported. When a handle with parentheses is used, the handle is not be parsed and no alert is created.

### Modifications

An [event][12] is created anytime a monitor is created, modified, silenced, or deleted. Set the `Notify` option to notify team members and chat services of these events.

### Edit restrictions

If changes are restricted, only the monitor's creator or an administrator can change the monitor. Changes include any updates to the monitor definition and muting for any amount of time.

**Note**: The limitations are applied both in the UI and API.

## Test notifications

Test notifications are supported for the [monitor types][1]: host, metric, anomaly, outlier, forecast, logs, rum, apm, integration (check only), process (check only), network (check only), custom check, event, and composite.

### Run the test

1. After defining your monitor, test the notifications with the **Test Notifications** button at the bottom right of the monitor page.

2. From the test notifications pop-up, choose the monitor case to test in. You can only test states that are available in the monitor’s configuration for the thresholds specified in the alerting conditions. [Recovery thresholds][13] are an exception, as Datadog sends a recovery notification once the monitor either is no longer in alert, or it has no warn conditions.

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

[1]: /monitors/create/monitor_configuration
[2]: http://daringfireball.net/projects/markdown/syntax
[3]: /integrations/jira/
[4]: /integrations/jira/#use-cases
[5]: /integrations/pagerduty/
[6]: /integrations/pagerduty/#troubleshooting
[7]: /integrations/slack/
[8]: /integrations/slack/#mentions-in-slack-from-monitor-alert
[9]: /integrations/webhooks/
[10]: /integrations/webhooks/#usage
[11]: /integrations/#cat-notification
[12]: /events/
[13]: /monitors/faq/what-are-recovery-thresholds/
