---
title: Notifications
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
- link: "https://learn.datadoghq.com/courses/alert-monitor-notifications"
  tag: "Learning Center"
  text: "Take a course to customize alert monitor notifications"
- link: "https://www.datadoghq.com/blog/monitor-notification-rules/"
  tag: "Blog"
  text: "Route your monitor alerts with Datadog monitor notification rules"
---

## Overview

Notifications are a key component of monitors that keep your team informed of issues and support troubleshooting. When [creating your monitor][1], configure your response to:
- Craft an actionable message.
- Trigger a workflow or create a workflow from a monitor.
- [Automatically create a case][2].
- Automatically create an incident.

## Constructing effective titles and messages

This approach helps ensure your monitor titles and messages are clear, actionable, and tailored to your audience's needs.
- **Unique titles**: Add a unique title to your monitor (this is required). For multi alert monitors, some tags identifying your triggering scope are automatically inserted. You can use [tag variables][3] to enhance specificity.
- **Message field**: The message field supports standard [Markdown formatting][4] and [variables][5]. Use [conditional variables][6] to modulate the notification text sent to different contacts with [@notifications](#notifications).

{{% collapse-content title="Example monitor message" level="h4" expanded=false %}}
A common use-case for the monitor message is to include a step-by-step way to resolve the problem, for example:

```text
{{#is_alert}} <-- conditional variable

Steps to free up disk space on {{host.name}}: <-- tag variable

1. Remove unused packages
2. Clear APT cache
3. Uninstall unnecessary applications
4. Remove duplicate files

@slack-incident-response <-- channel to send notification

{{/is_alert}}

```

{{% /collapse-content %}}


## Notification recipients
Datadog recommends using [monitor notification rules][22] to manage monitor notifications. With notification rules you can automate which notification recipients are added to a monitor based on predefined sets of conditions. Create different rules to route monitor alerts based on the tags of the monitor notification so you don't have to manually set up recipients nor notification routing logic for each individual monitor.

In both notification rules and individual monitors, you can use an `@notification` to add a team member, integration, workflow, or case to your notification. As you type, Datadog auto-recommends existing options in a drop-down menu. Click an option to add it to your notification. Alternatively, click **@ Add Mention**, **Add Workflow**, or **Add Case**.

An @notification must have a space between it and the last line character:

| 🟢 Correct Format | ❌ Incorrect Format |
|------------------|-------------------|
| `Disk space is low @ops-team@company.com` | `Disk space is low@ops-team@company.com` |

{{% collapse-content title="Email" level="h4" expanded=false %}}
{{% notifications-email %}}
{{% /collapse-content %}}

{{% collapse-content title="Teams" level="h4" expanded=false %}}
If a notification channel is set, you can route notifications to a specific Team. Monitor alerts targeting @team-handle are redirected to the selected communication channel. For more information on setting a notification channel to your Team, see the [Teams][7] documentation.
{{% /collapse-content %}}

{{% collapse-content title="Integrations" level="h4" expanded=false %}}

{{% notifications-integrations %}}

{{% /collapse-content %}}

### Bulk editing monitor @-handles
Datadog supports editing alert message recipients across multiple monitors at once. Use this feature to efficiently add, remove, or replace `@-handles` in the monitor message body. Use cases include:

- **Swap a handle**: Replace one handle with another across multiple monitors. For example, change `@pagerduty-sre` to `@oncall-sre`. You can also swap a single handle with multiple handles, such as replacing `@pagerduty-sre` with both `@pagerduty-sre` and `@oncall-sre`, to support dual paging or expanded alerting coverage.
- **Add a handle**: Add a new recipient without removing existing ones. For example, add `@slack-infra-leads` to all selected monitors.
- **Remove a handle**: Remove a specific handle from monitor messages. For example, remove `@webhook-my-legacy-event-intake`.

## Workflows
You can trigger a [workflow automation][8] or create a new workflow from a monitor.

Before you add a workflow to a monitor, [add a monitor trigger to the workflow][9].

After you add the monitor trigger, [add an existing workflow to your monitor][10] or create a new workflow. To create a new workflow from the monitors page:

1. Click **Add Workflow**.
1. Click the **+** icon and select a Blueprint, or select **Start From Scratch**.
   {{< img src="/monitors/notifications/create-workflow.png" alt="Click the + button to add a new workflow" style="width:90%;">}}

For more information on building a workflow, see [Build workflows][11].

## Incidents
Incidents can be automatically created from a monitor when the monitor transitions to an `alert`, `warn`, or `no data` status. Click on **Add Incident** and select an `@incident-` option. Admins can create `@incident-` options in [Incident Settings][12].

When an incident is created from a monitor, the incident's [field values][13] are automatically populated based on the monitor's tags. For example, if your monitor has a tag `service:payments`, the incident's service field will be set to "payments". To receive notifications for these incidents, make sure the monitor's tags align with your incident notification rules. **Note**: Incident notification rules are configured separately from monitor notification rules and need to be set up independently. For more information, see [Incident Notification][14].

## Toggle additional content

Monitor notifications include content such as the monitor's query, the @-mentions used, metric snapshots (for metric monitors), and links back to relevant pages in Datadog. You have the option to choose which content you would like to include or exclude from notifications for individual monitors.

<div class="alert alert-danger">Distribution metrics with percentile aggregators (such as `p50`, `p75`, `p95`, or `p99`) do not generate a snapshot graph in notifications. </div>

{{< img src="monitors/notifications/monitor_notification_presets.png" alt="Set a monitor preset" style="width:70%;" >}}

The options are:

- **Default**: No content is hidden.
- **Hide Query**: Remove the monitor's query from the notification message.
- **Hide Handles**: Remove the @-mentions that are used in the notification message.
- **Hide All**: Notification message does not include query, handles, any snapshots (for metric monitors), or additional links in footers.

**Note**: Depending on the integration, some content may not be displayed by default.

## Renotify

Enable monitor renotification (optional) to remind your team that a problem is not solved.

  {{< img src="monitors/notifications/renotify_options.png" alt="Enable renotify" style="width:90%;" >}}

Configure the renotify interval, the monitor states from which the monitor renotifies (within `alert`, `no data`, and `warn`) and optionally set a limit to the number of renotification messages sent.

For example, configure the monitor to `stop renotifying after 1 occurrence` to receive a single escalation message after the main alert.
**Note:** [Attribute and tag variables][3] in the renotification are populated with the data available to the monitor during the time period of the renotification.

If renotification is enabled, you are given the option to include an escalation message that is sent if the monitor remains in one of the chosen states for the specified time period.

The escalation message can be added in the following ways:

* In the `{{#is_renotify}}` block in the original notification message (recommended).
* In the *Renotification message* field in the `Configure notifications and automations` section.
* With the `escalation_message` attribute in the API.

If you use the `{{#is_renotify}}` block, the original notification message is also included in the renotification, so:

1. Include only extra details in the `{{#is_renotify}}` block and don't repeat the original message details.
2. Send the escalation message to a subset of groups.

Learn how to configure your monitors for those use cases in the [example section][15].

## Metadata

Add metadata (Priority, Tags, Datadog Team) to your monitor. Monitor Priority allows you to set the importance of your monitor through P-level (P1 to P5). Monitor tag--which are different from metric tags--are used in the UI to group and search for monitors. If tag policies are configured, the required tags and tag values need to be added. To learn more, see [Tag Policies][16]. Datadog Teams allows you to set a layer of ownership to this monitor and view all the monitors linked to your team. To learn more, see [Datadog Teams][17].

{{< img src="monitors/notifications/notifications_metadata.png" alt="View of policy tag configuration. Underneath 'Policy tags' are three example tags, cost_center, product_id, and env, next to a 'Select value' dropdown." style="width:100%;" >}}

{{% collapse-content title="Priority" level="h4" expanded=false %}}

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
{{% /collapse-content %}}


## Aggregation

If the monitor's query is grouped, you can remove one or more of the dimensions from the notification grouping, or remove them all and notify as a Simple Alert.

{{< img src="monitors/notifications/notifications_aggregation.png" alt="View of aggregation configuration set to multi-alert." style="width:100%;" >}}

Find more information on this feature in [Configure Monitors][18]

## Test notifications

After defining your monitor, test the notifications with the **Test Notifications** button at the bottom right of the monitor page.

Test notifications are supported for the [monitor types][19]: host, metric, anomaly, outlier, forecast, logs, rum, apm, integration (check only), process (check only), network (check only), custom check, event, and composite.

1. From the test notifications pop-up, choose the monitor transition to test and the group (available only if the query has [grouping][20]). You can only test states that are available in the monitor's configuration for the thresholds specified in the alerting conditions. [Recovery thresholds][21] are an exception, as Datadog sends a recovery notification once the monitor either is no longer in alert, or it has no warn conditions.

    {{< img src="/monitors/notifications/test_notification_modal.png" alt="Test the notifications for this monitor" style="width:70%;" >}}

1. Click **Run Test** to send notifications to the people and services listed in the monitor.

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
[2]: /incident_response/case_management/create_case/#automatic-case-creation
[3]: /monitors/notify/variables/?tabs=is_alert#attribute-and-tag-variables
[4]: http://daringfireball.net/projects/markdown/syntax
[5]: /monitors/notify/variables/
[6]: /monitors/notify/variables/#conditional-variables
[7]: /account_management/teams/#send-notifications-to-a-specific-communication-channel
[8]: /service_management/workflows/
[9]: /service_management/workflows/trigger/#add-a-monitor-trigger-to-your-workflow
[10]: /service_management/workflows/trigger/#add-the-workflow-to-your-monitor
[11]: /service_management/workflows/build/
[12]: https://app.datadoghq.com/incidents/settings?section=global-settings
[13]: /incident_response/incident_management/incident_settings/property_fields
[14]: /incident_response/incident_management/notification
[15]: /monitors/notify/variables/?tab=is_renotify#examples
[16]: /monitors/settings/#tag-policies
[17]: /account_management/teams/
[18]: /monitors/configuration/#set-alert-aggregation
[19]: /monitors/types
[20]: /monitors/configuration/
[21]: /monitors/guide/recovery-thresholds/
[22]: /monitors/notify/notification_rules
