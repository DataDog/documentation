---
title: Notifications
kind: documentation
description: Setting up monitor notifications
aliases:
  - /monitors/faq/how-do-i-add-custom-template-variables-to-my-monitor-message
  - /monitors/faq/how-do-i-setup-conditional-contacts-and-messages-in-a-single-monitor
  - /developers/faq/what-do-notifications-do-in-datadog
further_reading:
- link: "monitors/monitor_types"
  tag: "Documentation"
  text: "Learn how to create a monitor"
- link: "monitors/manage_monitor"
  tag: "Documentation"
  text: "Manage your monitors"
- link: "monitors/downtimes"
  tag: "Documentation"
  text: "Schedule a downtime for your monitor"
- link: "monitors/monitor_status"
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

The message field allows standard [Markdown formatting][2] and [variables](#variables). Use [conditional variables](#conditional-variables) to modulate the notification text sent to different contacts with [@notifications](#notification).

A common use-case for the monitor message is to include a step-by-step way to resolve the problem, for example:

```
Steps to free up disk space:
1. Remove unused packages
2. Clear APT cache
3. Uninstall unnecessary applications
4. Remove duplicate files
```

### Tags

Add tags to your monitor (optional). Monitor tags are different than metric tags. They are used in the UI to group and search for monitors.

### Renotify

Enable monitor renotification (optional), which is useful to remind your team a problem is not solved. If enabled, you are given the option to include an escalation message sent any time the monitor renotifies. The original notification message is also included.

## Notify your team

Use this section to send notifications to your team through email, Slack, PagerDuty, etc. You can search for team members and connected integrations with the drop-down box. When an `@notification` is added to this section, the notification is automatically added to the [message](#message) field.

**Note**: An `@notification` must have a space between it and the last line character, for example:

```
Disk space is low @ops-team@company.com
```

### @notification

`@notifications` can be sent to:

#### Email

* Notify a Datadog user by email with `@<DD_USER_EMAIL_ADDRESS>`. **Note**: An email address associated with a pending Datadog user invitation is considered inactive and does not receive notifications.
* Notify any non-Datadog user by email with `@<EMAIL>`.

#### Integrations

Notify your team through connected integrations by using the format `@<INTEGRATION_NAME>-<VALUES>`. Below is a list of prefixes and example links:

| Integration    | Prefix       | Examples      |
|----------------|--------------|---------------|
| [Jira][3]      | `@jira`      | [Examples][4] |
| [PagerDuty][5] | `@pagerduty` | [Examples][6] |
| [Slack][7]     | `@slack`     | [Examples][7] |
| [Webhooks][8]  | `@webhook`   | [Examples][9] |


### Modifications

An [event][10] is created anytime a monitor is created, modified, silenced, or deleted. Set the `Notify` option to notify team members and chat services of these events.

### Edit restrictions

If changes are restricted, only the monitor's creator or an administrator can change the monitor. Changes include any updates to the monitor definition and muting for any amount of time.

**Note**: The limitations are applied both in the UI and API.

## Test notifications

Test notifications are supported for the [monitor types][1]: host, metric, anomaly, outlier, forecast, integration (check only), process (check only), network (check only), custom check, event, and composite.

### Run the test

1. After defining your monitor, test the notifications with the **Test Notifications** button at the bottom right of the monitor page.

2. From the test notifications pop-up, choose the monitor case to test in. You can only test states that are available in the monitor’s configuration for the thresholds specified in the alerting conditions. [Recovery thresholds][11] are an exception, as Datadog sends a recovery notification once the monitor either is no longer in alert, or it has no warn conditions.

    {{< img src="monitors/notifications/test-notif-select.png" alt="Test the notifications for this monitor"  style="width:70%;" >}}

3. Click **Run Test** to send notifications to the people and services listed in the monitor.

### Events
Test notifications produce events that can be searched within the event stream. These notifications indicate who initiated the test in the message body with `[TEST]` in notification title.

### Variables

Message variables auto-populate with a randomly selected group based on the scope of your monitor's definition, for example:
```text
{{#is_alert}}
{{host.name}} <-- will populate
{{/is_alert}}
```

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

#### Arithmetic

Template variables that return numerical values support arithmetic operations. To perform arithmetic on a template variable use the `eval` syntax, for example:

```text
{{eval "<TEMPLATE_VARIABLE_NAME>+1-2*3/4"}}
```

Below is an example of subtracting 15 minutes from the `{{last_triggered_at_epoch}}`:

```text
{{eval "last_triggered_at_epoch-15*60*1000"}}
```

**Note**: The template variable and arithmetic expression must be wrapped in quotation marks (`"`).

### Tag variables

Tag variables can be used in multi-alert monitors based on the tags selected in the multi-alert group box. This works for any tag following the `key:value` syntax.

For example, if your monitor triggers an alert for each `host`, then the tag variables `{{host.name}}` and `{{host.ip}}` are available. To see a list of tag variables based on your tag selection, click **Use message template variables** in the **Say what's happening** section.

**Notes**:

* Variable content is escaped by default. To prevent content such as JSON or code from being escaped, use triple braces instead of double braces, for example: `{{{event.text}}}`.
* Tag variables are only populated in the text of Datadog child events. The parent event only displays an aggregation summary.

#### Tag key with period

If your tag's key has a period in it, include brackets around the full key when using the tag variable.
For example, if your tag is `dot.key.test:five` and your monitor is grouped by `dot.ket.test`, use:

```text
{{[dot.key.test].name}}
```

### Conditional variables

Conditional variables allow for different text to be sent to different contacts based on the state of the monitor and the details of how it was triggered. These condition variables can be used within either the subject or body of the notification set in section 3 of the monitor definition.

Keep in mind when using conditional tags that they must have an open (example: `{{#is_alert}}`) and closing (example: `{{/is_alert}}`) pair with the desired text and **@-mentions** in between.

The conditional variables available are:

| Conditional Variable       | Description                                                         |
|----------------------------|---------------------------------------------------------------------|
| `{{#is_alert}}`            | Show when monitor alerts                                            |
| `{{^is_alert}}`            | Show unless monitor alerts                                          |
| `{{#is_match}}`            | Show when the context matches a string                              |
| `{{^is_match}}`            | Show unless the context matches a string                            |
| `{{#is_exact_match}}`      | Show when the context matches a string exactly                      |
| `{{^is_exact_match}}`      | Show unless the context matches a string exactly                    |
| `{{#is_no_data}}`          | Show when monitor notifies on missing data                          |
| `{{^is_no_data}}`          | Show unless monitor notifies on missing data                        |
| `{{#is_warning}}`          | Show when monitor warns                                             |
| `{{^is_warning}}`          | Show unless monitor warns                                           |
| `{{#is_recovery}}`         | Show when monitor recovers from either WARNING, ALERT, or NO DATA   |
| `{{^is_recovery}}`         | Show unless monitor recovers from either WARNING, ALERT, or NO DATA |
| `{{#is_warning_recovery}}` | Show when monitor recovers from a WARNING to OK                     |
| `{{^is_warning_recovery}}` | Show unless monitor recovers from a WARNING to OK                   |
| `{{#is_alert_recovery}}`   | Show when monitor recovers from an ALERT to OK                      |
| `{{^is_alert_recovery}}`   | Show unless monitor recovers from an ALERT to OK                    |
| `{{#is_alert_to_warning}}` | Show when monitor transitions from ALERT to WARNING                 |
| `{{^is_alert_to_warning}}` | Show unless monitor transitions from ALERT to WARNING               |
| `{{#is_no_data_recovery}}` | Show when monitor recovers from NO DATA                             |
| `{{^is_no_data_recovery}}` | Show unless monitor recovers from NO DATA                           |

These can also be seen in the "Use message template variables" help box in
Step 3 of the monitor editor.

Here are some examples of their usage:

{{< tabs >}}
{{% tab "is_alert / is_warning" %}}

These variables use simple `if-else` logic to display a different message depending on the event type (*warning*, *recovery*, *no data*...)

{{< img src="monitors/notifications/conditionalvars.png" alt="conditional vars"  style="width:80%;">}}

This is an example in the editor:

{{< img src="monitors/notifications/templateconditionaleditor.png" alt="template conditional editor"  style="width:80%;">}}

The corresponding trigger event notification looks like this:

{{< img src="monitors/notifications/templateconditionaltrigger.png" alt="template conditional trigger"  style="width:80%;">}}

and the recovery notification:

{{< img src="monitors/notifications/templateconditionalrecover.png" alt="template conditional recover"  style="width:80%;">}}

{{% /tab %}}
{{% tab "is_recovery / is_alert_recovery " %}}

* `{{#is_recovery}}` triggers when a monitor recovers indifferently either from a **WARNING** state or an **ALERT** state.
* `{{#is_alert_recovery}}` triggers when a monitor recovers directly from an **ALERT** state to an **OK** state.
* `{{#is_warning_recovery}}` triggers when a monitor recovers from a **WARNING** state to an **OK** state

This means that if the monitor switches from an **ALERT** to a **WARNING** to an **OK** state:

* the `{{#is_recovery}}` would trigger
* the `{{#is_alert_recovery}}` wouldn't trigger
* the `{{#is_warning_recovery}}` would trigger.

{{% /tab %}}
{{% tab "is_match / is_exact_match" %}}

The `{{is_match}}` conditional allows you to match the triggering context to any given string in order to display a different message in your notifications.
Use any of the available tag variables in your conditional statement. **A match is made if the comparison string is anywhere in the resolved variable**.

Tag variables use the following format:

```text
{{#is_match "<TAG_VARIABLE>.name" "<COMPARISON_STRING>"}}
  This shows if <COMPARISON_STRING> is included in <TAG_VARIABLE>
{{/is_match}}
```

For example, if you want to notify your DB team if a triggering host has the `role:db_cassandra` tag or the `role:db_postgres` tag, use the following:

```text
{{#is_match "role.name" "db"}}
  This shows only if the host that triggered the alert has `role` tag variable with `db` in it.
  It would trigger for role:db_cassandra and role:db_postgres
{{/is_match}}
```

**Note**: To check if a `<TAG_VARIABLE>` is **NOT** empty, use the `{{is_match}}` conditional with an empty string.

```text
{{#is_match "<TAG_VARIABLE>.name" ""}}
  This shows if <TAG_VARIABLE> is not empty.
{{/is_match}}
```

##### {{is_exact_match}}

The `{{is_exact_match}}` conditional looks for the exact string in the tag variable, rather than using substring matching. The variable uses the following format:

```text
{{#is_exact_match "<TAG_VARIABLE>.name" "<COMPARISON_STRING>"}}
  This shows if <COMPARISON_STRING> is exactly <TAG_VARIABLE>.
{{/is_exact_match}}
```

For instance, if an alert that can be triggered by two hosts tagged with `role:production` and `role:production-1`:

  ```text
  {{#is_match "role.name" "production"}}
    This shows only if the host that triggered the alert has the tags role:production or the role:production-1 attached.
  {{/is_match}}

  {{#is_exact_match "host.name" "production"}}
    This shows only if the host that triggered has the tag role:production attached.
  {{/is_exact_match}}
  ```

{{% /tab %}}
{{< /tabs >}}

## Advanced

### Dashboard links

Many organizations like to include additional context to their Alerts. Quick links to relevant dashboards as a part of the Alert have proven to reduce the overall time it takes during the break fix process to reduce time to resolution.

Datadog makes message template variables available to each defined monitor. These variables enable dynamic URL building that links Datadog users to an appropriate dashboard using the scope of the monitor.

Here are a few examples of providing links to items like System Dashboards, Integration Dashboards, Host Maps, and Managed Monitors pages.

Example: provide a link to a System Dashboard when a monitor for a specific system metric has exceeded a defined threshold. The message template variable that can be leveraged in this instance is `{{host.name}}`. Include the following URL as a part of your Monitor "Say What's Happening" section:

```text
https://app.datadoghq.com/dash/integration/system_overview?tpl_var_scope=host:{{host.name}}
```

`{{host.name}}` is replaced with the offending host of the monitor in question.

{{< img src="monitors/notifications/system_dashboard_url.png" alt="system_dashboard_url"  style="width:70%;" >}}

Find below additional examples of links that could be added to Monitors to provide Datadog users quick access to common pages leveraged during the break, fix, and triage process:

{{< tabs >}}
{{% tab "hostmap" %}}

To include a link to the HostMap to compare metrics with other similar hosts, use a link like below to be included in your Monitor:

```text
https://app.datadoghq.com/infrastructure/map?fillby=avg%3Acpuutilization&sizeby=avg%3Anometric&filter=cassandra
```

The above link has more customizable options than your standard System Dashboard. Here you have additional variables to define. Most common variables passed into this URL are the following **fillby, sizeby, filter**:

* `fillby` is defined by adding `fillby:avg:<MetricName>`.
* `sizeby` is defined by adding `sizeby:avg:<SecondMetricName>`.
* `filter` is used to specify a specific integration (i.e. Cassandra, mysql, apache, snmp, etc) by adding `filter=<INTEGRATION_NAME>`.

In the example below, colors fill the Hostmap hexagons by `system.cpu.system`. The hexagons are sized by `system.cpu.stolen`, and they are filtered to only include Cassandra hosts.

{{< img src="monitors/notifications/hostmap_url.png" alt="hostmap_url"  style="width:70%;">}}

{{% /tab %}}
{{% tab "Manage Monitors" %}}

To link to a "Manage Monitors" page that displays all of the monitors for the host in question, define a link like below:

```text
https://app.datadoghq.com/monitors/manage?q=scope:host:{{host.name}}
```

The above URL links to all monitors for this host. You have other options available to further refine the link.

For example, to see all monitors in an Alert State, add `status:Alert` (other statuses are `WARN`, `NO%20DATA`, `OK` and `MUTED`). Below is an example link:

```text
https://app.datadoghq.com/monitors/manage?q=scope:host:{{host.name}}&status:Alert
```

If you would like all monitors for a specific application or integration, add the following query to the URL `q=<INTEGRATION_NAME>`:

```text
https://app.datadoghq.com/monitors/manage?q=cassandra
```

{{< img src="monitors/notifications/monitor_url.png" alt="monitor_url"  style="width:70%;">}}

{{% /tab %}}
{{% tab "Integration Dashboards" %}}

If you are building application- or integration-specific monitors, link to that specific Integration Dashboard as well as adding a scope for the host that triggered the monitor.

In the example below, all that is necessary to populate is the `<INTEGRATION_NAME>` section for something like Cassandra, Apache, SNMP, etc., as well as providing the scope for the offending host:

```text
https://app.datadoghq.com/dash/integration/<INTEGRATION_NAME>?tpl_var_scope=host:{{host.name}}
```

{{< img src="monitors/notifications/integration_url.png" alt="integration_url"  style="width:70%;">}}

{{% /tab %}}
{{< /tabs >}}

### Raw format

If your alert message needs to send double curly braces, such as `{{ <TEXT> }}`, use the `{{{{raw}}}}` formatting:

The following template:

```text
{{{{raw}}}}
{{ <TEXT_1> }} {{ <TEXT_2> }}
{{{{/raw}}}}
```

outputs:

```text
{{ <TEXT_1> }} {{ <TEXT_2> }}
```

The `^|#` helpers shown in the [Conditional variables](#conditional-variables) section cannot be used with `{{{{raw}}}}` formatting and must be removed. For instance, to output raw text with the `{{is_match}}` conditional variable use the following template:

```text
{{{{is_match "host.name" "<HOST_NAME>"}}}}
{{ .matched }} the host name
{{{{/is_match}}}}
```

If `host.name` matches `<HOST_NAME>`, the template outputs:

```text
{{ .matched }} the host name
```

### Comments

To include a comment in the monitor message that only shows in the monitor edit screen, use the syntax:

```text
{{!-- this is a comment --}}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/monitor_types
[2]: http://daringfireball.net/projects/markdown/syntax
[3]: /integrations/jira
[4]: /integrations/jira/#use-cases
[5]: /integrations/pagerduty
[6]: /integrations/pagerduty/#troubleshooting
[7]: /integrations/slack
[8]: /integrations/webhooks
[9]: /integrations/webhooks/#usage
[10]: /events
[11]: /monitors/faq/what-are-recovery-thresholds
