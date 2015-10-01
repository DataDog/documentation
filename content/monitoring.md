---
title: Monitoring Reference
kind: documentation
listorder: 11
sidebar:
  nav:
    - header: Monitoring
    - text: Glossary
      href: "#glossary"
    - text: Host Monitors
      href: "#host"
    - text: Metric Monitors
      href: "#metric"
    - text: Integration Monitors
      href: "#integration"
    - text: Process Monitors
      href: "#process"
    - text: Network Monitors
      href: "#network"
    - text: Event Monitors
      href: "#event"
    - text: Custom Monitors
      href: "#custom"
    - text: Monitor Notifications
      href: "#notification"
    - text: Monitor FAQs
      href: "#faqs"
---

Monitoring in Datadog refers to the ability to notify your team when conditions are met. If you are just starting with monitors in Datadog, please refer to our [Guide to Monitoring](/guides/monitoring) for an introduction.

## Glossary
{: #glossary}

Here is a quick overview of the different terms used in this guide.

- **Status**: Each check run submits a status of OK, WARNING or CRITICAL.
- **Check**: Emits one more more statuses.
- **Monitor**: Sends notifications based on a sequence of check statuses, metric
  threshold or other alerting conditions.
- **Monitor type**: [host](#host)-, [metric](#metric)-, [integration](#integration)-, [process](#process)-, [network](#network)-, [event](#event)-based, and [custom](#custom). See side navigation to drill into a specific type.
- **Tags**: Configurable labels that can be applied to each metric and host. See the [Tagging](/guides/tagging) page for more details.



## Creating a Monitor
{: #create}

Nagivate to the [Create Monitors](https://app.datadoghq.com/monitors#/create)
page by highlighting the "Monitors" tab in the main menu and selecting the
"Create Monitors" sub-tab (depending on your chosen theme, the main menu may be at the top or on the left).  You will be presented with a list of monitor types
on the left. This document will walk through the configuration of each type.

### Host Monitors
{: #host}

*Requires Datadog Agent version >= 5.0.0.*

![host monitor](/static/images/monitor/host_monitor.png)

Every Datadog Agent collection reports a heartbeat called `datadog.agent.up`
with a status `UP`. You can monitor this heartbeat across one or more hosts.

1. Select your **host by name or tag(s)**. Providing a tag will monitor every
   host that has that tag or tag combination.

2. Select the **no-data timeframe**. If the heartbeat stops reporting for more
   than the number of minutes you have selected, then you will get notified.

3. Configure your **notification options** Refer to the
   [Notifications](#notifications) section of this guide for a detailed
   walkthrough of the common notification options.

### Metric Monitors
{: #metric}

1. Select the metric and scope you want to monitor.
  ![metric scope](/static/images/monitor/metric_scope.png)

    You can create a monitor on any metrics that you are currently sending to
    Datadog. The standard scoping rules apply here. Please refer to the
    [scope section](/graphing/#scope) of the graphing primer for
    further information.

2. Select the alert grouping.
    ![alert grouping](/static/images/monitor/alert_grouping.png)

    A **simple alert** aggregates over all reporting sources. You will get one
    alert when the aggregated value meets the conditions set below. This works
    best to monitor a metric from a single host, like `avg` of
    `system.cpu.iowait` over `host:bits`, or for an aggregate metric across many
    hosts like `sum` of `nginx.bytes.net` over `region:us-east`.

    A **multi alert** applies the alert to each source, according to your group
    parameters. E.g. to alert on disk space you might group by host and device,
    creating the query:

        avg:system.disk.in_use{*} by {host,device}

    This will trigger a separate alert for each device on each host that is
    running out of space.

3. Select the alert type.
    ![alert type](/static/images/monitor/alert_type.png)

    A **threshold alert** will compare the value in the selected
    timeframe against a given threshold. There are additional options available
    in the alerting conditions section. This is the standard alert case where
    you know what sort values are unexpected.

    A **change alert** will compare the change or % change of a value between
    now and some time ago against a given threshold.
    The compared data points will not be single points but are computed using
    the parameters in the *alert conditions* section.

    This type of alert is useful to track fast spikes or drops as well as slow
    changes in a metric when you might not have an exact "unexpected" threshold.
    *Note:* the calculated value is not the absolute value - meaning it will be
    negative for a downward change.

4. {:#metric-conditions} Select the alert conditions

    - The **threshold** options vary slightly depending on what alert type you
      have chosen. For either case, you input a threshold and comparison type
      based on your metric. As you change your threshold, you will see the graph
      update with a marker showing the cutoff point.

      ![metric threshold](/static/images/monitor/metric_threshold.png)

      Note that you can use formatted values in this input based on the
      metric itself. For example, if you are monitoring `system.disk.used`, you
      can give a threshold of `20GB`.

      For a **threshold alert** you will be able to chose a *time aggregation*
      of the data. The alerting engine will generate a single series and perform
      selected aggregation.

      Let's look at the details of each option:

        - *on average*: The series will be averaged to produce a single
          value that will be checked against the threshold.

        - *at least once*: If any single value in the generated series crosses
          the threshold then an alert will be triggered.

        - *at all times*: If every point in the generated series is outside the
          threshold then an alert will be triggered.

        - *in total*: If the summation of every point in the series is outside
          the threshold then an alert will be triggered.

      Note the *on average* and *at all times* aggregations *require* a full
      window of data in the final series. This does *not* mean that each series
      must be full but that there shouldn't be a gap of more than 1 minute
      across all aggregated series. In other words, we recommend using *at least
      once* or *in total* for metrics with > 1 minute interval.

    - When you select the **change alert** option, you will have additional
    parameters you can adjust.
      - *change* is an absolute change of the value whereas *% change* is the
        percentage change of your value compared to its previous value (so if
        it was a value of 2 and now 4, the *% change* will be 100%).
      - You can compare the change of the value during a given timeframe by
        selecting the period you want to compare against. This can range from 5
        minutes to up to 2 days.
      - Like the **threshold alert**, you will need to select the
        *time aggregation* and a *time window* on which the change will be
        calculated.

5. You can optionally **notify on no data** after a configurable timeframe. At
   the minimum, your chosen timeframe must be greater than 2x the alerting
   window. For example, if you are alerting over the last 5 minutes then you
   would need to wait at least 10 minutes before notifying on missing data.

6. You can opt to **automatically resolve the monitor from a triggered
   state**. In general you'll want to leave this option off as you only want
   an alert to be resolved when it's fixed.

   This most common use-case for this option is when you have very sparse
   counters, e.g. for errors. When errors stop occuring the metric will stop
   reporting. This means the monitor will not resolve because there are not
   anymore values to trigger a resolution.

7. Configure your **notification options** Refer to the
   [Notifications](#notifications) section of this guide for a detailed
   walkthrough of the common notification options.


### Integration Monitors
{: #integration}

![es status](/static/images/monitor/es_status.png)

On the integration tab you will see a list of your installed integrations. Upon
selection, you can choose to monitor either a "Status" or a "Metric".

- Choosing **Integration Status** will present you with one or more service
  checks for each integration. Please refer to the
  [custom monitors](#check-alerting) section for details on the
  available options.

- Choosing **Integration Metric** will provide a familiar interface used for a
  interface used for a Metric Monitor. You will be able to choose from any of
  the metrics provided by this integration. Please refer to the
  [alert conditions](#metric-conditions) section for details on the available
  options.

### Process Monitors
{: #process}

![process monitor](/static/images/monitor/process_monitor.png)

A process monitor will watch the status produced by the `process.up` service
check reported by the check in the Agent. At the Agent level you can configure
thresholds based on the number of matching processes.

Read more about configuration on the [Process Check](/integrations/process/)
page.

For each process, a single service check status will be produced. Through this
creation interface, you can choose which of those checks to monitor and at what
point they should notify.

1. Pick the **process** to monitor. You will see the names configured in any
   Agent with an active process check.

2. Pick the **monitor scope**. You will only see hosts or tags that
   are reporting a status for the selected process.

3. Select **alerting options**. Please refer to the
   [custom monitors](#check-alerting) section for details on the available options.

4. Configure your **notification options** Refer to the
   [Notifications](#notifications) section of this guide for a detailed
   walkthrough of the common notification options.

### Network Monitors
{: #network}

![network monitor](/static/images/monitor/network_monitor.png)

Network monitors cover the TCP and HTTP checks available in the Agent. Read
the [guide to network checks](/guides/network_checks) for details on Agent
configuration.

**Network Status**

1. Choose a **network check**. You will be able to choose from all HTTP and TCP
   checks being submitted by your Agents.

2. Pick **monitor scope**. You will only see hosts or tags reporting
   the check you have chosen.

3. Select **alerting options**. Please refer to the
   [custom monitors](#check-alerting) section for details on the available
   options.

4. Configure your **notification options** Refer to the
   [Notifications](#notifications) section of this guide for a detailed
   walkthrough of the common notification options.

**Network Metric**

1. Choose a **network metric**. You will be able to choose either the TCP or
   HTTP response time metric.

2. Pick **monitor scope**. You will only see hosts or tags reporting
   the metric you have chosen.

3. Select **alerting options**. Please refer to the
   [alert-conditions](#metric-conditions) section for details on the available
   options.

4. Configure your **notification options** Refer to the
   [Notifications](#notifications) section of this guide for a detailed
   walkthrough of the common notification options.

### Event Monitors
{: #event}

Event monitors allows you to alert when an event matching your query occurs.

![event monitor](/static/images/monitor/event_monitor.png)

1. Select the query and parameters (status, priority, sources and tags) you want
    to monitor.

2. Select the alert gouping

3. Select the **alerting conditions**. The **threshold value** and **timeframe**
    options allows you to set the number of occurence of an event required during
    a timeframe before triggering the monitor.

4. Configure your **notifcation options**. Refer to the [Notifications](#notifications)
    section of this guide for informations.


### Custom Monitors
{: #custom}

![custom monitor](/static/images/monitor/custom_monitor.png)

Custom monitors encompass any service checks that are not reported by one of the
out-of-the-box integrations included with the Agent.

Refer to the [Guide to Agent Checks](/guides/agent_checks/) for detailed
information on writing your own checks that send metrics, events,
or service checks.

1. Select your **custom check**.

2. Select **host or tags** that you would like to monitor. The check will run
   for every unique set of tags from all monitored hosts. For example, the
   `Nginx` service check reports one status per `{host,port}`. So if you have
   multiple servers running on a single host, then each one will alert separately
   in the case of failure.

3. {:#check-alerting} Select your **alert options**.

   While each check run will send a status of either CRITICAL, WARNING or OK,
   you can choose at what consecutive conditions to cause a state change and a
   notification. For example, you might want to know immediately when your check
   fails and only have it recover if it stays that way. In this case you might
   choose to notify on 1 critical status, 1 warning status and 4 OK statuses.

   You can optionally **notify on no data** after a configurable timeframe. You
   must choose at least 2 minutes for your timeframe.

4. Configure your **notification options**. Refer to the
   [Notifications](#notifications) section of this guide for a detailed
   walkthrough of the common notification options.

## Monitor Notifications
{: #notification}

Notifications are a key component of any monitor. You want to make sure the
right people get notified so the problem can be resolved as soon as possible.

![notification](/static/images/monitor/notification.png)

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
    trigger, recover, or no data notification. These variables use simple if-else
    logic with the following syntax:

    ![conditional variables](/static/images/monitor/conditionalvars.png)

    Here is an example of how you can set it up in the editor:

    ![conditional editor](/static/images/monitor/templateconditionaleditor.png)


    The corresponding trigger event notification will look like this:

    ![conditional trigger](/static/images/monitor/templateconditionaltrigger.png)


    and the recovery notification:

    ![conditional recovery](/static/images/monitor/templateconditionalrecover.png)


    The conditional variables available are `is_alert`, `is_recovery`, and `is_no_data`.
    These can also be seen in the "Use message template variables" help box in
    Step 3 of the monitor editor.

2. **Tag variables for multi alerts**: When your monitor is a multi alert, instead
    of having a generic message (and finding the triggering tag scope in the alert
    query definition), a variable can be used in the message for explicitly
    identifying the triggering scope.

    Here is an example of how you can use template variables for a multi alert:

    ![template var editor](/static/images/monitor/templatevareditor.png)


    and the corresponding event notification:

    ![template var trigger](/static/images/monitor/templatevar.png)


    The tag template variables available depend on the tag group selected in Step 1
    of the monitor editor. The possible options will automatically populate at the
    bottom of the "Use message template variables" help box in Step 3 of the editor.
    These variables can also be used in the monitor titles (names), but note that
    the variables are only populated in the text of Datadog child events (not the
    parent, which displays an aggregation summary).

    Some tags identifying your triggering scope will automatically be inserted into
    the title of your multi alert. If your scope is defined by a lot of tags, your
    alert title may end up being undesirably long. If you've used template tag variables
    to include this information in the body of your alert, you can uncheck
    **Include triggering tags in notification title** to save some space. This will make
    your notification title look like this:

    ![short template var trigger](/static/images/monitor/templatevar_short.png)

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

   ![scope match editor](/static/images/monitor/scope_match_editor.png)


## Monitor FAQs
{: #faq}

- *Can I manage my monitors programatically?*

  Yes. Refer to the [Datadog API docs](http://docs.datadoghq.com/api/#alerts)
  for detailed information on managing monitors through the API using the
  available libraries or cURL.

- *Can you alert on a function?*

  Yes, selecting the 'Source' tab of a monitor editor (Step 1) will allow you to
  alert on custom queries and functions, similar to the JSON editor for graphs.
