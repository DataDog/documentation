---
title: Notifications
kind: documentation
description: Setting up monitor notifications
aliases:
  - /monitors/faq/how-do-i-add-custom-template-variables-to-my-monitor-message
  - /monitors/faq/how-do-i-setup-conditional-contacts-and-messages-in-a-single-monitor
  - /developers/faq/what-do-notifications-do-in-datadog
further_reading:
- link: "/monitors/monitor_types/"
  tag: "Documentation"
  text: "Learn how to create a monitor"
- link: "/monitors/manage_monitor/"
  tag: "Documentation"
  text: "Manage your monitors"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime for your monitor"
- link: "/monitors/monitor_status/"
  tag: "Documentation"
  text: "Consult your monitor status"
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

  {{< img src="monitors/notifications/renotify_enabled.jpg" alt="Enable renotify"  style="width:70%;" >}}

If renotification is enabled, you are given the option to include an escalation message that is sent if the monitor remains in the `alert` or `no data` state for the specified time.
The escalation message can be added in the following ways:

* In the `{{#is_renotify}}` block in the original notification message (recommended).
* In the *escalation_message* field in the app.
* With the `escalation_message` attribute in the API.

If you use the `{{#is_renotify}}` block, keep in mind that the original notification message is also included in the renotification, so:

1. Include only extra details in the `{{#is_renotify}}` block and don't repeat the original message details.
2. Send the escalation message to a subset of groups.

Learn how to configure your monitors for those use cases in [the example section](#examples).

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

## Variables

### Template variables

Use template variables to customize your monitor notifications. The built-in variables are:

| Variable                      | Description                                                                  |
|-------------------------------|------------------------------------------------------------------------------|
| `{{value}}`                   | The value that breached the alert for metric based query monitors.           |
| `{{threshold}}`               | The value of the alert threshold set in the monitor's alert conditions.      |
| `{{warn_threshold}}`          | The value of the warning threshold set in the monitor's alert conditions.    |
| `{{ok_threshold}}`            | The value that recovered the monitor.                                        |
| `{{comparator}}`              | The relational value set in the monitor's alert conditions.                  |
| `{{last_triggered_at}}`       | The UTC date and time when the monitor last triggered.                       |
| `{{last_triggered_at_epoch}}` | The UTC date and time when the monitor last triggered in epoch milliseconds. |

#### Evaluation

Template variables that return numerical values support operations and functions, which allow you to perform mathematical operations or formatting changes to the value. For full details, see [Template Variable Evaluation][13].

#### Local time

Use the `local_time` function to transform a date into its local time: `{{local_time 'time_variable' 'timezone'}}`.
For example, to show the last triggered time of the monitor in the Tokyo time zone in your notification, include the following in the notification message:

```
{{local_time 'last_triggered_at' 'Asia/Tokyo'}}
```

The result is displayed in the ISO 8601 format: `yyyy-MM-dd HH:mm:ss±HH:mm`, for example `2021-05-31 23:43:27+09:00`. 
Refer to the [list of tz database time zones][14], particularly the TZ database name column, to see the list of available time zone values.

### Tag variables

Tag variables can be used in multi-alert monitors based on the tags selected in the multi-alert group box. This works for any tag following the `key:value` syntax.
For example, if your monitor triggers for each `env`, then the variable `{{env.name}}` is available in your notification message. 

<div class="alert alert-info"><strong>Note</strong>: Tag variables on single alert monitors are not supported. If you want to know the specific tag value that caused the alert, use a multi-alert monitor instead.</div>

Variable content is escaped by default. To prevent content such as JSON or code from being escaped, use triple braces instead of double braces, for example: `{{{event.text}}}`.

#### Multi-alert group by host

If your monitor triggers an alert for each `host`, then the tag variables `{{host.name}}` and `{{host.ip}}` are available as well as any host tag that is available on this host. 
To see a list of tag variables based on your tag selection, click **Use message template variables** in the **Say what's happening** section.
Some specific host metadata are available as well:

- Agent Version : {{host.metadata_agent_version}}
- Machine       : {{host.metadata_machine}}
- Platform      : {{host.metadata_platform}}
- Processor     : {{host.metadata_processor}}


#### Tag key with period

If your tag's key has a period in it, include brackets around the full key when using a tag variable.
For example, if your tag is `dot.key.test:five` and your monitor is grouped by `dot.key.test`, use:

```text
{{[dot.key.test].name}}
```

If the tag is on an event and you're using an event monitor, use:

```text
{{ event.tags.[dot.key.test] }}
```

#### Log facet variables

Log monitors can use facets as variables if the monitor is grouped by the facets.
For example, if your log monitor is grouped by the `facet`, the variable is:

```text
{{ @facet.name }}
```
**Example**: To include the information in a multi alert log monitor group by `@machine_id`: 

```text
This alert was triggered on {{ @machine_id.name }}
```
If your facet has periods, use brackets around the facet, for example:

```text
{{ [@network.client.ip].name }}
```

#### Composite monitor variables

Composite monitors can access the value associated with the sub-monitors at the time the alert triggers. 

For example, if your composite monitor has sub-monitor `a`, you can include the value of `a` with:

```text
{{ a.value }}
```

Composite monitors can also utilize tag variables in the same way as their underlying monitors. They follow the same format as other monitors bearing in mind that the underlying monitors must all be grouped by the same tag/facet.

### Conditional variables

Conditional variables use `if-else` logic to display a different message depending on the state of the monitor and the details of how it was triggered. These variables can be used within the subject or body of the notification message.

The following conditional variables are available:

| Conditional Variable       | The text is displayed if                                           |
|----------------------------|--------------------------------------------------------------------|
| `{{#is_alert}}`            | The monitor alerts                                                 |
| `{{^is_alert}}`            | The monitor does not alert                                         |
| `{{#is_match}}`            | The context matches the provided substring                         |
| `{{^is_match}}`            | The context does not match the provided substring                  |
| `{{#is_exact_match}}`      | The context exactly matches the provided string                    |
| `{{^is_exact_match}}`      | The context does not exactly match the provided string             |
| `{{#is_no_data}}`          | The monitor is triggered for missing data                          |
| `{{^is_no_data}}`          | The monitor is not triggered for missing data                      |
| `{{#is_warning}}`          | The monitor warns                                                  |
| `{{^is_warning}}`          | The monitor does not warn                                          |
| `{{#is_recovery}}`         | The monitor recovers from `ALERT`, `WARNING`, or `NO DATA`         |
| `{{^is_recovery}}`         | The monitor does not recover from `ALERT`, `WARNING`, or `NO DATA` |
| `{{#is_warning_recovery}}` | The monitor recovers from `WARNING` to `OK`                        |
| `{{^is_warning_recovery}}` | The monitor does not recover from `WARNING` to `OK`                |
| `{{#is_alert_recovery}}`   | The monitor recovers from `ALERT` to `OK`                          |
| `{{^is_alert_recovery}}`   | The monitor does not recover from an ALERT to OK                   |
| `{{#is_alert_to_warning}}` | The monitor transitions from `ALERT` to `WARNING`                  |
| `{{^is_alert_to_warning}}` | The monitor does not transition from `ALERT` to `WARNING`          |
| `{{#is_no_data_recovery}}` | The monitor recovers from `NO DATA`                                |
| `{{^is_no_data_recovery}}` | The monitor does not recover from `NO DATA`                        |
| `{{#is_priority 'value'}}` | The monitor has priority `value`. Value ranges from `P1` to `P5`   |
| `{{#is_unknown}}`          | The monitor is in the unknown state                                |
| `{{^is_unknown}}`          | The monitor is not in the unknown state                            |
| `{{#is_renotify}}`         | The monitor is renotifying                                         |
| `{{^is_renotify}}`         | The monitor is not renotifying.                                    |

#### Examples

Conditional variable must have an opening and closing pair with the text and **@-notifications** in-between.

{{< tabs >}}
{{% tab "is_alert" %}}

To send a notification message when a monitor alerts, use the format:

```text
{{#is_alert}}
  <ALERT_MESSAGE_TEXT> <@-NOTIFICATION>
{{/is_alert}}
```

{{% /tab %}}
{{% tab "is_warning" %}}

To send a notification message when a monitor warns, use the format:

```text
{{#is_warning}}
  <WARNING_MESSAGE_TEXT> <@-NOTIFICATION>
{{/is_warning}}
```

{{% /tab %}}
{{% tab "is_recovery" %}}

To send a notification message when a monitor recovers, use the format:

```text
{{#is_recovery}}
  <RECOVERY_MESSAGE_TEXT> <@-NOTIFICATION>
{{/is_recovery}}
```

{{% /tab %}}
{{% tab "is_match" %}}

Search for a substring in a tag variable with the format:

```text
{{#is_match "<TAG_VARIABLE>.name" "<COMPARISON_STRING>"}}
  This displays if <COMPARISON_STRING> is included in <TAG_VARIABLE>.
{{/is_match}}
```

To notify your DB team if a triggering host has the tag `role:db_cassandra` or `role:db_postgres`, use the following:

```text
{{#is_match "role.name" "db"}}
  This displays if the host triggering the alert contains `db`
  in the role name. @db-team@company.com
{{/is_match}}
```

The `is_match` condition also supports matching multiple strings:

```text
{{#is_match "role.name" "db" "database"}}
  This displays if the host triggering the alert contains `db` or `database`
  in the role name. @db-team@company.com
{{/is_match}}
```

To send a different notification if the tag doesn't contain `db`, use the negation of the condition as follows:

```text
{{^is_match "role.name" "db"}}
  This displays if the role tag doesn't contain `db`.
  @slack-example
{{/is_match}}
```

Or use the `{{else}}` parameter in the first example:

```text
{{#is_match "role.name" "db"}}
  This displays if the host triggering the alert contains `db`
  in the role name. @db-team@company.com
{{else}}
  This displays if the role tag doesn't contain `db`.
  @slack-example
{{/is_match}}
```

**Note**: To check if a `<TAG_VARIABLE>` is **NOT** empty, use an empty string for the `<COMPARISON_STRING>`.

{{% /tab %}}
{{% tab "is_exact_match" %}}

Search for an exact string in a tag variable with the format:

```text
{{#is_exact_match "<TAG_VARIABLE>.name" "<COMPARISON_STRING>"}}
  This displays if <COMPARISON_STRING> is exactly <TAG_VARIABLE>.
{{/is_exact_match}}
```

To notify your dev team if a triggering host has the name `production`, use the following:

```text
{{#is_exact_match "host.name" "production"}}
  This displays if the host that triggered the alert is exactly
  named production. @dev-team@company.com
{{/is_exact_match}}
```

{{% /tab %}}
{{% tab "is_renotify" %}}

To send an escalation message to a different destination just for the `production` environment:

```text
{{#is_renotify}}
{{#is_match "env" "production"}}
  This is an escalation message sent to @dev-team@company.com
{{/is_match}}
{{/is_renotify}}
```

To send a different escalation message that does not contain the original message details, use a combination of `{{^is_renotify}}` and `{{#is_renotify}}` blocks:

```text
{{^is_renotify}}
This monitor is alerting and sending a first message @dev-team@company.com

To solve this monitor follow the steps:
1. Go there
2. Do this
{{/is_renotify}}

This part is generic and sent both for the first trigger and the escalation message.

{{#is_renotify}}
  This is the escalation message @dev-team@company.com
{{/is_renotify}}

```

On monitor renotification, users will get the following escalation message:

```
This part is generic and sent both for the first trigger and the escalation message.

This is the escalation message @dev-team@company.com
``` 

{{% /tab %}}
{{< /tabs >}}

## Test notifications

Test notifications are supported for the [monitor types][1]: host, metric, anomaly, outlier, forecast, logs, rum, apm, integration (check only), process (check only), network (check only), custom check, event, and composite.

### Run the test

1. After defining your monitor, test the notifications with the **Test Notifications** button at the bottom right of the monitor page.

2. From the test notifications pop-up, choose the monitor case to test in. You can only test states that are available in the monitor’s configuration for the thresholds specified in the alerting conditions. [Recovery thresholds][15] are an exception, as Datadog sends a recovery notification once the monitor either is no longer in alert, or it has no warn conditions.

    {{< img src="monitors/notifications/test-notif-select.png" alt="Test the notifications for this monitor"  style="width:70%;" >}}

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

## Advanced

### Dynamic links

Use [tag variables](#tag-variables) to enable dynamic URL building that links your team to an appropriate resource. For example, you can provide links to pages within Datadog such as dashboards, the host map, and monitors.

{{< tabs >}}
{{% tab "Dashboards" %}}

Use the `{{host.name}}` [tag variable](#tag-variables) to provide a link to a system dashboard:

```text
https://app.datadoghq.com/dash/integration/system_overview?tpl_var_scope=host:{{host.name}}
```

Use the `{{host.name}}` [tag variable](#tag-variables) and an `<INTEGRATION_NAME>` to provide a link to an integration dashboard:

```text
https://app.datadoghq.com/dash/integration/<INTEGRATION_NAME>?tpl_var_scope=host:{{host.name}}
```

{{% /tab %}}
{{% tab "Host map" %}}

Use a [tag variable](#tag-variables) such as `{{service.name}}` to provide a link to the host map:

```text
https://app.datadoghq.com/infrastructure/map?filter=service:{{service.name}}
```

The host map link is customizable with additional parameters. The most common are:

| Parameter | Defined with               | Determines                           |
|-----------|----------------------------|--------------------------------------|
| `fillby`  | `fillby=avg:<METRIC_NAME>` | The fill color of the host hexagons. |
| `groupby` | `groupby=<TAG_KEY>`        | The groups for host hexagons.        |
| `sizeby`  | `sizeby=avg:<METRIC_NAME>` | The size of the host hexagons.       |

{{% /tab %}}
{{% tab "Monitors" %}}

Use the `{{host.name}}` [tag variable](#tag-variables) to provide a link to all monitors related to a specific host:

```text
https://app.datadoghq.com/monitors/manage?q=scope:host:{{host.name}}
```

The monitors link is customizable with additional parameters. The most common are:

| Parameter | Example        | Displays                                                                        |
|-----------|----------------|---------------------------------------------------------------------------------|
| `status`  | `status:Alert` | Monitors in an alert state (additional statuses: `WARN`, `NO DATA`, and `OK`)   |
| `muted`   | `muted: true`  | Muted monitors (use `false` for non-muted monitors)                             |
| `type`    | `type:log`     | Log monitors (see other [monitor types][1])                                     |

[1]: /monitors/monitor_types/
{{% /tab %}}
{{< /tabs >}}

### Comments

To include a comment in the monitor message that only displays in the monitor edit screen, use the syntax:

```text
{{!-- this is a comment --}}
```

### Raw format

If your alert message needs to send double curly braces, such as `{{ <TEXT> }}`, use `{{{{raw}}}}` formatting. For example, the following:

```text
{{{{raw}}}}
{{ <TEXT_1> }} {{ <TEXT_2> }}
{{{{/raw}}}}
```

Outputs:

```text
{{ <TEXT_1> }} {{ <TEXT_2> }}
```

The `^|#` helpers used in [conditional variables](#conditional-variables) cannot be used with `{{{{raw}}}}` formatting and must be removed. For instance, to output raw text with the `{{is_match}}` conditional variable use the following template:

```text
{{{{is_match "host.name" "<HOST_NAME>"}}}}
{{ .matched }} the host name
{{{{/is_match}}}}
```

If `host.name` matches `<HOST_NAME>`, the template outputs:

```text
{{ .matched }} the host name
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/monitor_types/
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
[13]: /monitors/guide/template-variable-evaluation/
[14]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[15]: /monitors/faq/what-are-recovery-thresholds/
