---
title: Notifications
aliases:
  - /monitors/faq/how-do-i-add-custom-template-variables-to-my-monitor-message
  - /monitors/faq/how-do-i-setup-conditional-contacts-and-messages-in-a-single-monitor
  - /developers/faq/what-do-notifications-do-in-datadog
  - /monitors/notifications/
description: "Send notifications to your teams when monitors trigger alerts"
further_reading:
- link: /monitors/
  tag: Documentation
  text: Create monitors
- link: /monitors/manage/
  tag: Documentation
  text: Manage monitors
---

## Overview

Notifications are a key component of monitors that keep your team informed of issues and support troubleshooting. When [creating your monitor][1], add to the **Configure notifications and automations** section.

## Configure notifications and automations

Use the **Configure notifications and automations** section to:
- Send notifications to your team through email, Slack, PagerDuty, and other integrations. 
- Trigger a workflow or create a workflow from a monitor.
- Add a case to your monitor.

### Title

Add a unique title to your monitor (required). For multi alert monitors, some tags identifying your triggering scope are automatically inserted. Additionally, you can use [tag variables][12].

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

### Notifications

Use an `@notification` to add a team member, integration, workflow, or case to your notification. As you type, Datadog recommends existing options in a drop-down menu. Click an option to add it to your notification. Alternatively, click **@ Add Mention**, **Add Workflow**, or **Add Case**.

**Note**: An `@notification` must have a space between it and the last line character, for example:

```text
Disk space is low @ops-team@company.com
```
`@notifications` can be sent to:

#### Email

{{% notifications-email %}}

#### Teams

If a notification channel is set, you can route notifications to a specific Team. Monitor alerts targeting @team-handle are redirected to the selected communication channel. For more information on setting a notification channel to your Team, see the [Teams][6] documentation.

#### Integrations

{{% notifications-integrations %}}

### Workflows
You can trigger a [workflow automation][7] or create a new workflow from a monitor.

**To add an existing workflow to a monitor**:
1. In the message section, add the full workflow mention name:
   - The mention name should start with `@workflow-`. For example, `@workflow-my-workflow`
   - To pass trigger variables into the workflow, use a comma-separated list with the syntax `@workflow-name(key=value, key=value)`. You can use message template variables as trigger variables. For example, `@workflow-my-workflow(hostname=host.name)`

1. Alternatively, click **Add Workflow** and search for it in the drop-down menu.

For more information on triggering a workflow, see [Trigger a workflow][8].

**To create a workflow**:
1. Click **Add Workflow**.
1. Click the **+** icon and select a Blueprint, or select **Start From Scratch**.
   {{< img src="/monitors/notifications/create-workflow.png" alt="Click the + button to add a new workflow" style="width:90%;">}}

For more information on building a workflow, see [Build workflows][9].

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

### Toggle additional content

Monitor notifications include content such as the monitor's query, the @-mentions used, metric snapshots (for metric monitors), and links back to relevant pages in Datadog. You have the option to choose which content you would like to include or exclude from notifications for individual monitors.

<div class="alert alert-warning">Distribution metrics with percentile aggregators (such as `p50`, `p75`, `p95`, or `p99`) do not generate a snapshot graph in notifications. </div>

{{< img src="monitors/notifications/monitor_notification_presets.png" alt="Set a monitor preset" style="width:70%;" >}}

The options are:

- **Default**: No content is hidden.
- **Hide Query**: Remove the monitor's query from the notification message.
- **Hide Handles**: Remove the @-mentions that are used in the notification message.
- **Hide All**: Notification message does not include query, handles, any snapshots (for metric monitors), or additional links in footers.

**Note**: Depending on the integration, some content may not be displayed by default.

### Metadata

Add metadata (Priority, Tags, Datadog Team) to your monitor. Monitor Priority allows you to set the importance of your monitor through P-level (P1 to P5). Monitor tag--which are different from metric tags--are used in the UI to group and search for monitors. If tag policies are configured, the required tags and tag values need to be added. To learn more, see [Tag Policies][10]. Datadog Teams allows you to set a layer of ownership to this monitor and view all the monitors linked to your team. To learn more, see [Datadog Teams][11].

{{< img src="monitors/notifications/notifications_metadata.png" alt="View of policy tag configuration. Underneath 'Policy tags' are three example tags, cost_center, product_id, and env, next to a 'Select value' dropdown." style="width:100%;" >}}

### Renotify

Enable monitor renotification (optional) to remind your team that a problem is not solved.

  {{< img src="monitors/notifications/renotify_options.png" alt="Enable renotify" style="width:90%;" >}}

Configure the renotify interval, the monitor states from which the monitor renotifies (within `alert`, `no data`, and `warn`) and optionally set a limit to the number of renotification messages sent.

For example, configure the monitor to `stop renotifying after 1 occurrence` to receive a single escalation message after the main alert.
**Note:** [Attribute and tag variables][12] in the renotification are populated with the data available to the monitor during the time period of the renotification.

If renotification is enabled, you are given the option to include an escalation message that is sent if the monitor remains in one of the chosen states for the specified time period.


The escalation message can be added in the following ways:

* In the `{{#is_renotify}}` block in the original notification message (recommended).
* In the *Renotification message* field in the `Configure notifications and automations` section.
* With the `escalation_message` attribute in the API.

If you use the `{{#is_renotify}}` block, the original notification message is also included in the renotification, so:

1. Include only extra details in the `{{#is_renotify}}` block and don't repeat the original message details.
2. Send the escalation message to a subset of groups.

Learn how to configure your monitors for those use cases in the [example section][13].


## Define permissions and audit notifications

### Modifications

An [event][14] is created anytime a monitor is created, modified, silenced, or deleted. Set the `Notify` option to notify team members, chat services, and the monitor creator of these events.

### Permissions

All users can read all monitors, regardless of the role they are associated with.

By default, only users attached to roles with the [Monitors Write permission][15] can edit monitors. [Datadog Admin Role and Datadog Standard Role][16] have the Monitors Write permission by default. If your organization uses [Custom Roles][17], other custom roles may have the Monitors Write permission.

You can further restrict your monitor by specifying a list of [roles][18] allowed to edit it. The monitor's creator can always edit the monitor.

  {{< img src="monitors/notifications/monitor_rbac_restricted.jpg" alt="RBAC Restricted Monitor" style="width:90%;" >}}

Editing includes any updates to the monitor configuration, deleting the monitor, and muting the monitor for any amount of time.

**Note**: The limitations are applied both in the UI and API.

For more information on setting up RBAC for Monitors and migrating monitors from the locked setting to using role restrictions, see [How to set up RBAC for Monitors][19].

## Test notifications

Test notifications are supported for the [monitor types][20]: host, metric, anomaly, outlier, forecast, logs, rum, apm, integration (check only), process (check only), network (check only), custom check, event, and composite.

### Run the test

1. After defining your monitor, test the notifications with the **Test Notifications** button at the bottom right of the monitor page.

2. From the test notifications pop-up, choose the monitor case to test. You can only test states that are available in the monitor's configuration for the thresholds specified in the alerting conditions. [Recovery thresholds][21] are an exception, as Datadog sends a recovery notification once the monitor either is no longer in alert, or it has no warn conditions.

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
[3]: http://daringfireball.net/projects/markdown/syntax
[4]: /monitors/notify/variables/
[5]: /monitors/notify/variables/#conditional-variables
[6]: /account_management/teams/#send-notifications-to-a-specific-communication-channel
[7]: /service_management/workflows/
[8]: /service_management/workflows/trigger/#trigger-a-workflow-from-a-monitor
[9]: /service_management/workflows/build/
[10]: /monitors/settings/#tag-policies
[11]: /account_management/teams/
[12]: /monitors/notify/variables/?tabs=is_alert#attribute-and-tag-variables
[13]: /monitors/notify/variables/?tab=is_renotify#examples
[14]: /events/
[15]: /account_management/rbac/permissions/#monitors
[16]: /account_management/rbac/?tab=datadogapplication#datadog-default-roles
[17]: /account_management/rbac/?tab=datadogapplication#custom-roles
[18]: /account_management/rbac/?tab=datadogapplication
[19]: /monitors/guide/how-to-set-up-rbac-for-monitors/
[20]: /monitors/types
[21]: /monitors/guide/recovery-thresholds/
