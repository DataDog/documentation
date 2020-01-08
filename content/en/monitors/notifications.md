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
  text: "Schedule a downtime to mute a monitor"
- link: "monitors/monitor_status"
  tag: "Documentation"
  text: "Consult your monitor status"
---

## Overview

Notifications are a key component of any [monitor][1]. You want to make sure the right people get notified so the problem can be resolved as soon as possible.

{{< img src="monitors/notifications/notification.png" alt="notification"  >}}

1. Give your monitor a **title**. It is often useful to use a succinct
   explanation of the monitor so a notified team member can quickly understand
   what is going on.

2. Enter a **message** for the monitor. This field allows standard [Markdown formatting][2] as well as in-line [variables](#variables) and tag variables.
  Use [conditional variables](#conditional-variables) to modulate the notification text and send them to different contacts with the [Datadog's **@-notification** syntax](#notification).
  A common use-case for the monitor message is to include a step-by-step way to resolve the problem.

3. Optionally enable **monitor renotification**. This option is useful to remind your team that a problem is not solved until the monitor is marked as [resolved][3]. If enabled, an escalation message can be configured to send any time the monitor renotifies. The original message is included as well.

## Variables

Use variables to customize your monitor notifications, the available variables are:

| Variable                      | Description                                                                                    |
|-------------------------------|------------------------------------------------------------------------------------------------|
| `{{value}}`                   | Display the value that breached the alert for metrics based query monitors.                    |
| `{{threshold}}`               | Display the alert threshold selected in the monitor's *Set alert conditions* section.          |
| `{{warn_threshold}}`          | Display the warning threshold selected in the monitor's *Set alert conditions* section if any. |
| `{{ok_threshold}}`            | Display the value that recovered the monitor.                                                  |
| `{{comparator}}`              | Display the relational value selected in the monitor's *Set alert conditions* section.         |
| `{{last_triggered_at}}`       | Display the UTC date/time when the monitor last triggered.                                     |
| `{{last_triggered_at_epoch}}` | Display the UTC date/time when the monitor last triggered in epoch milliseconds format.        |

**Note**: When entering decimal values for thresholds, if your value is `<1`, add a leading `0` to the number. For example, use `0.5`, not `.5`.

### Tag variables

For multi-alert monitors, add tag variables to include information in your alert message that's specific to the tag scope that triggered the alert. This is dependent on the tags you used in the *trigger a separate alert for each* field in Section 1 of your monitor.

For example, if you trigger by each **host** tag, then a number of tag variables related to **host** are available to you in Section 3: **Say what's happening**, such as `{{host.name}}`, `{{host.ip}}`, etc..

This also works for custom tags. If a custom tag is added that follows the `key:value` syntax, then data can be grouped by those tag keys. This enables a multi-alert (separate trigger) for each **value**. Additionally, the tag's `.name` variable can be used in your monitor message.

Note:

* Template variable content is escaped by default. If your variable contains JSON or code that you would NOT like to be escaped, use triple braces instead of double braces (e.g. `{{{event.text}}}`).

* See a complete list of contextual template variables available to your monitor by clicking the **Use message template variables** link or in the list of suggestions that appears when you type `{{` to begin a template variable name. The variables available are different depending on the combination of metric, tags, and other features of the monitor you are working on.

* The tag template variables can also be used in the monitor titles (names), but the variables are only populated in the text of Datadog child events (not the parent, which displays an aggregation summary).

* Some tags identifying your triggering scope are automatically inserted into the title of your multi alert.

#### Examples

Here's an example of where a user had a number of hosts tagged by different `creator:` values, e.g, `creator:wes_anderson` and `creator:saint_exupéry`.

Here, the user was able to set up a multi-alert monitor to trigger a separate alert for each `creator:` tag, so they were able to include the `{{creator.name}}` in their monitor message. When this monitor triggers, the recipient of the alert notification sees whether the monitor was triggered by **wes_anderson**, **saint_exupéry**, or some other `creator:` value.

{{< img src="monitors/faq/multi_alert_templating_notification.png" alt="multi_alert_templating_notification"  style="width:80%;">}}

This is an example of using template variables for a multi-alert:

{{< img src="monitors/notifications/templatevareditor.png" alt="template var editor"  style="width:80%;">}}

and the corresponding event notification:

{{< img src="monitors/notifications/templatevar.png" alt="template var"  style="width:80%;">}}

#### Tag key with period

If your tag group's key has a period in it, you have to hardwire your template variables to include brackets around the full key.
For example, if you submit a metric tagged with `dot.key.test:five` and then set up a multi-alert monitor triggered by the `dot.ket.test` group tag, you have to apply the following syntax in order to use `the dot.key.test.name` tag variable:

{{< img src="monitors/faq/template_with_dot.png" alt="template_with_dot"  style="width:80%;">}}

### Template variable arithmetic

Template variables that return numerical values support arithmetic operations. To perform arithmetic on a template variable use the `eval` syntax like so:

`{{eval "<TEMPLATE_VARIABLE_NAME>+1-2*3/4"}}`

Note: Don’t forget to wrap the name of the template variable and the arithmetic expression in quotation marks (`"`)

For instance, to subtract 15 minutes (15*60*1000 milliseconds) to the `{{last_triggered_at_epoch}}` template variable, inline in your notification message:

`{{eval "last_triggered_at_epoch-15*60*1000"}}`

## Conditional variables

Conditional variables allow for different text to be [sent to different contacts](#notification) based on the state of the monitor and the details of how it was triggered. These condition variables can be used within either the subject or body of the notification set in section 3 of the monitor definition.

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
    This shows only if the host that triggered the alert has the tags role:production or the role:production attached.
  {{/is_match}}

  {{#is_exact_match "host.name" "production"}}
    This shows only if the host that triggered has the tag role:production attached.
  {{/is_exact_match}}
  ```

{{% /tab %}}
{{< /tabs >}}

## Advanced variable usage

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

## @-notification

Send the monitor notification to the appropriate endpoint:

* Notify a Datadog user via email by adding `@<DD_USER_EMAIL>` in your notification message.
* Notify any non-Datadog users via email by adding `@<EMAIL>` to the notification message.
* Install the Slack integration to send your notifications directly in the appropriate channel.

**Notes**:
* An **@-mention** must have a space between it and the last line character: `{{value}}@slack-channel` is invalid `{{value}} @slack-channel` is valid.
* An email address associated with a pending Datadog user invitation is considered inactive and does not receive notifications.

### Integrations

{{< tabs >}}
{{% tab "Slack" %}}

After setting up the [Slack integration][1], type `@slack` in your notification message to see the available list of channels to send your notification to.

#### @-mentions in Slack from monitor alert

Wrap the `@username` in `< >` as seen below in your monitors message template to **@-notify** the defined user within slack notifications.

For example this configuration:
{{< img src="monitors/notifications/notification_template.png" alt="notification_template"  style="width:50%;" >}}

Would produce this slack message:
{{< img src="monitors/notifications/notification_slack_preview.png" alt="notification_slack_preview"  style="width:50%;" >}}

**Note**: If you are having trouble pinging someone, use their Slack `username` instead of the display name. The `username` is located in [Slack account settings][2] under **Username**.

Mention **@here** or **@channel** by using `<!here>` or `<!channel>`, respectively.

For user groups, use `<!subteam^GROUP_ID|GROUP_NAME>`. To find the `GROUP_ID`, [query the `usergroups.list` API endpoint of Slack][3]. For example, for a user group named `testers` you would use the following syntax:

```text
<!subteam^12345|testers>
```

Note: Trailing special characters in a channel name are unsupported for the Slack @-notifications.
e.g. `@----critical_alerts` works, but `@--critical_alerts--` won't receive any notifications.

### Using message template variables to dynamically create @-mentions

Use message template variables within a monitor message to dynamically build **@-mentions**.

For example, if the rendered variable is setup as a channel in the Slack integration:

* `@slack-{{owner.name}}` post a message on the owner's channel for this monitor.

* `@slack-{{host.name}}` post a slack message to the #host.name channel in Slack.

Or create an **@-mention** that goes directly to a specific email:

* `@team-{{team.name}}@company.com` sends an email right to the team's mailing list.

[1]: /integrations/slack
[2]: http://slack.com/account/settings
[3]: https://api.slack.com/methods/usergroups.list
{{% /tab %}}
{{% tab "Jira" %}}

After setting up the [Jira integration][1], type `@jira` in your notification message to see the list of available options. See the example [use cases][2] in the integration documentation.

[1]: /integrations/jira
[2]: /integrations/jira/#use-cases
{{% /tab %}}
{{% tab "PagerDuty" %}}

After setting up the [PagerDuty integration][1], type `@pagerduty` in your notification message to see the available list of service names to send your notification to.

[1]: /integrations/pagerduty
{{% /tab %}}
{{% tab "Webhooks" %}}

After setting up the [Webhooks integration][1], type `@webhook` in your notification message to see the available list of webhooks to trigger. When the monitor alerts, a `POST` request is sent to the webhook URL.

[1]: /integrations/webhooks
{{% /tab %}}
{{< /tabs >}}

## Test monitor notifications

**Testing notifications are supported for the following monitor types**: host, metric, anomaly, outlier, forecast, integration (check only), process (check only), network (check only), custom check, event, and composite.

After you define your monitor, test what your monitor's notification would look like in any applicable state with the *Test Notifications* button at the bottom right of the monitor page:

1. Choose which monitor case you want to test in the following pop-up. You can only test states that are available in the monitor’s configuration, and only for thresholds specified in the alerting conditions. [Recovery thresholds][4] are an exception, as Datadog sends a recovery notification once the monitor either is no longer in alert, or it has no warn conditions.

    {{< img src="monitors/notifications/test-notif-select.png" alt="Test the notifications for this monitor"  style="width:50%;" >}}

2. Click **Run test** to send the notification to any notification handle available in the message box.

**Notes**:

* Test notifications produce events that can be searched for within the event stream. These notifications also indicate who initiated the test in the message body, and `[TEST]` is added into the test notification title.

* Message variables auto-populate with an available randomly selected group based on the scope of your monitor's definition.

  {{< img src="monitors/notifications/test-notif-message.png" alt="Say what's happening"  style="width:50%;" >}}

## Advanced notification configuration

### Include links to appropriate dashboards

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
{{% tab "Manage Monitors Page" %}}

To link to a "Manage Monitors" page that displays all of the monitors for the host in question, define a link like below:

```text
https://app.datadoghq.com/monitors/manage?q=scope:host:{{host.name}}
```

The above URL links to all monitors for this host. You have other options available to further refine the link.

For example, to see all monitors in an Alert State, add `status:Alert` (other statuses are `WARN`, `NO%20DATA`, `OK` and `MUTED`). Below is an example link:

```text
https://app.datadoghq.com/monitors/manage?q=scope:host:{{host.name}}&status:Alert
```

If you would like all monitors for a specific application or integration, add the following query to the URL `q=<INTEGRATION_NAME> `:

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

### Comments

To include a comment in the monitor message that only shows in the monitor edit screen, use the syntax:

```text
{{!-- this is a comment --}}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors
[2]: http://daringfireball.net/projects/markdown/syntax
[3]: /monitors/monitor_types/integration
[4]: /monitors/faq/what-are-recovery-thresholds
