---
title: Notifications
kind: documentation
autotocdepth: 2
hideguides: true
customnav: monitornav
---

Notifications are a key component of any monitor. You want to make sure the
right people get notified so the problem can be resolved as soon as possible.

{{< img src="monitors/notifications/notification.png" >}}

1. Give your monitor a **title**. It is often useful to use a succinct
   explanation of the monitor so a notified team member can quickly understand
   what is going on.

2. Enter a **message** for the monitor. This field allows standard
   [markdown formatting](http://daringfireball.net/projects/markdown/syntax)
   as well as Datadog's @-notification syntax. Note: you can notify any
   non-Datadog users via email by simply adding `@their-email` to the
   message.

   A common use-case for the monitor message is to include a step-by-step way
   to resolve the problem. For example if you are monitoring a database then you
   might want to include steps for failing over to a standby node. All in all,
   you should attempt to give as much context to the monitor as possible.

4. Optionally enable **monitor renotification**. This option is useful to remind
   your team that a problem is not solved until the monitor is marked as
   resolved. If enabled, you can configure an escalation message to be sent
   anytime the monitor renotifies. The original message will be included as
   well.


### Message template variables

Message template variables can be used to customize your monitor notifications.
This feature is supported in all monitor types. There are two primary use cases
for template variables: 1) displaying a different message depending on the
notification type (e.g. triggered, recovered, no data) and 2) incorporating the
triggering scope into the message of multi alerts.

1. **Conditional variables for different notification types**: You can have a
    monitor event display a different message depending on whether the event is a
    trigger, warning, recovery, or no data notification. These variables use simple if-else
    logic with the following syntax:

    {{< img src="monitors/notifications/conditionalvars.png" >}}

    Here is an example of how you can set it up in the editor:

    {{< img src="monitors/notifications/templateconditionaleditor.png" >}}


    The corresponding trigger event notification will look like this:

    {{< img src="monitors/notifications/templateconditionaltrigger.png" >}}


    and the recovery notification:

    {{< img src="monitors/notifications/templateconditionalrecover.png" >}}


    The conditional variables available are:

    * `is_alert`, 
    * `is_alert_recovery`,
    * `is_warning`, 
    * `is_warning_recovery`, 
    * `is_recovery`, 
    * `is_no_data`.
    
    These can also be seen in the "Use message template variables" help box in
    Step 3 of the monitor editor.

2. **Tag variables for multi alerts**: When your monitor is a multi alert, instead
    of having a generic message (and finding the triggering tag scope in the alert query definition), a variable can be used in the message for explicitly identifying the triggering scope.

    Here is an example of how you can use template variables for a multi alert:

    {{< img src="monitors/notifications/templatevareditor.png" >}}

    and the corresponding event notification:

    {{< img src="monitors/notifications/templatevar.png" >}}


    The tag template variables available depend on the tag group selected in Step 1 of the monitor editor. The possible options will automatically populate at the bottom of the "Use message template variables" help box in Step 3 of the editor.
    These variables can also be used in the monitor titles (names), but note that the variables are only populated in the text of Datadog child events (not the parent, which displays an aggregation summary).

    Some tags identifying your triggering scope will automatically be inserted into the title of your multi alert. If your scope is defined by a lot of tags, your alert title may end up being undesirably long. If you've used template tag variables to include this information in the body of your alert, you can uncheck

    **Include triggering tags in notification title** to save some space. This will make your notification title look like this:

    {{< img src="monitors/notifications/templatevar_short.png" >}}

    Note that template variable content is escaped by default. If your variable
    contains JSON or code that you would NOT like to be escaped, then use triple braces instead of double braces (e.g. `{{{event.text}}}`).

3. **Conditional variables for different triggering scopes**: You can have a
   monitor event display a different message depending on the group that's
   causing a notification.

   The `{{is_match}}` conditional lets you match the triggering context to some
   string. For example, you might want to notify your db team if a triggering
   host has `role:db` but notify your app team if the host has `role:app`.

   You can use any of the available tag variables in your condition. A match
   will be made if the comparison string is anywhere in the resolved variable.

   The variable uses the following format:

       {{#is_match "tag_variable" "comparison_string"}}
       This will show if comparison_string is in tag_variable.
       {{/is_match}}

   Here is an example of how you can give a different message depending on the
   triggering context:

   {{< img src="monitors/notifications/scope_match_editor.png" >}}

#### Variable availability

We provide a number of different types of monitors and not all variables are available for each type of monitor. Integration monitor variables are largely dependent on the specific integration and monitor configuration.

||[host](/monitors/monitor_types/host)| [metric](/monitors/monitor_types/metric)| [integration](/monitors/monitor_types/integration)| [process](/monitors/monitor_types/process)| [network](/monitors/monitor_types/network)| [custom check](/monitors/monitor_types/custom_check)| [event](/monitors/monitor_types/event)|
| :---------------------|:------------------|:------------------------------|:--------------------------------------|:----------------------------------|:------------------------------------------------------|:--------------------------|:------------------|
| **Conditionals**      |
| `is_alert`            | Y                 | Y                             | Y                                     | Y                                 | Y                                                     | Y                         | Y                 |
| `is_alert_recovery`   |                   | Y                             | Y                                     | Y                                 | Y                                                     | Y                         |                   |
| `is_warning`          |                   | Y                             | Y                                     | Y                                 | Y                                                     | Y                         |                   |
| `is_warning_recovery` |                   | Y                             | Y                                     | Y                                 | Y                                                     | Y                         |                   |
| `is_recovery`         | Y                 | Y                             | Y                                     | Y                                 | Y                                                     | Y                         | Y                 |
| `is_no_data`          | Y                 | Y                             | Y                                     | Y                                 | Y                                                     | Y                         | Y                 |
| `is_match`            | Y                 | Y                             | Y                                     | Y                                 | Y                                                     | Y                         | Y                 |
| **Variables**         |
| `{{value}}`           |                   | Y                             | Y                                     |                                   |                                                       |                           |                   |
| `{{threshold}}`       | Y (cluster)       | Y                             | Y                                     | Y                                 | Y                                                     | Y                         | Y                 |
| `{{warn_threshold}}`  | Y (cluster)       | Y                             | Y                                     | Y                                 | Y                                                     | Y                         |                   |
| `{{ok_threshold}}`    |                   |                               | Y                                     | Y                                 | Y                                                     | Y                         |                   |
| `{{comparator}}`      | Y                 | Y                             | Y                                     | Y                                 | Y                                                     | Y                         | Y                 |
| Additional variables  | Contextual        |                               | Contextual<br/>`{{check_message}}`    | Contextual<br/>`{{process.name}}` | Contextual<br/>`{{url.name}}`<br/>`{{instance.name}}` | `{{check_message}}`       |                   |

<style>
  .tpl-var-table tr td {
    text-align: center;
    border: 1px #9d6ebf solid;
    padding: 5px;
  }
  .tpl-var-table tr td:first-child {
    text-align: right;
  }
</style>

Note that some monitors offer addtional contextual variables based on what you are monitoring. For example, host monitors may provide variables for `host.availability-zone` and `host.cloud_provider`. You can see a complete list of contextual template variables available to your monitor by clicking the "Use message template variables" link or in the list of suggestions that appears when you type "{{" to begin a template variable name.