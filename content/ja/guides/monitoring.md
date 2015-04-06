---
title: Guide to Monitoring
sidebar:
  nav:
    - header: Guide to Monitoring
    - text: Hosts
      href: "#host"
    - text: Metrics
      href: "#metric"
    - text: Integrations
      href: "#integration"
    - text: Network
      href: "#network"
    - text: Custom Checks
      href: "#custom"
    - text: Notifications
      href: "#notification"
    - text: Monitor FAQs
      href: "#faqs"
---

Monitoring all of your infrastructure in one place wouldn't be complete without
the ability to know when critical changes are occurring. Datadog gives you the
ability to create monitors that will actively check metrics, integration
availability, network endpoints and more.

Once a monitor is created, you will be notified when the its conditions are met.
You can notify team members via email, 3rd party services (e.g. Pagerduty or
Hipchat) or other custom endpoints via webhooks.

Triggered monitors will appear in the event stream, allowing collaboration
around active issues in your applications or infrastructure. Datadog provides a
high-level view of open issues on the
[Triggered Monitors](https://app.datadoghq.com/monitors/triggered)
page as well as general monitor management on the
[Manage Monitors](https://app.datadoghq.com/monitors) page.

## Creating a Monitor {#create}

Nagivate to the [Create Monitors](https://app.datadoghq.com/monitors/create)
page by highlighting the "Monitors" tab in the top menu and selecting the
"Create Monitors" sub-tab.  You will be presented with a list of monitor types
on the left. This guide will walk through the configuration of each type.

![nav](/static/images/monitor/nav.png)

## Host Monitors {#host}

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

## Metric Monitors {#metric}

1. Select the metric and scope you want to monitor.
  ![metric scope](/static/images/monitor/metric_scope.png)

    You can create a monitor on any metrics that you are currently sending to
    Datadog. The standard scoping rules apply here. Please refer to the
    [scope section](/graphing/#scope) of the graphing primer for
    further information.

2. Select the alert type.
    ![alert type](/static/images/monitor/alert_type.png)

    A **threshold alert** will compare the value in the selected
    timeframe against a given threshold. There are additional options available
    in the alerting conditions section. This is the standard alert case where
    you know what sort values are unexpected.

    A **change alert** will look at a recent data point and
    determine the change or % change between that value and a value some minutes
    ago. The compared data points are 1-minute averages and <em>not</em> a
    single point.

    This sort of alert is useful to track fast spikes or drops in a metric
    when you might not have an exact "unexpected" threshold. Note: the
    calculated value is not the absolute value - meaning it will be negative for
    a downward change.

3. Select the alert grouping.
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


## Integration Monitors {#integration}

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
  [alert conditions](#metric-conditions) section for details on the avaialble
  options.

{::comment}

## Process Monitors {#process}

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

2. Pick the **hosts by name or tag(s)**. You will only see hosts or tags that
   are reporting a status for the selected process.

3. Select **alerting options**. Please refer to the
   [custom monitors](check-alerting) section for details on the available options.

4. Configure your **notification options** Refer to the
   [Notifications](#notifications) section of this guide for a detailed
   walkthrough of the common notification options.

{:/comment}

## Network Monitors {#network}

![network monitor](/static/images/monitor/network_monitor.png)

Network monitors cover the TCP and HTTP checks available in the Agent. Read
the [guide to network checks](/guides/network_checks) for details on Agent
configuration.

**Network Status**

1. Choose a **network check**. You will be able to choose from all HTTP and TCP
   checks being submitted by your Agents.

2. Pick **hosts by name or tag(s)**. You will only see hosts or tags reporting
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

2. Pick **hosts by name or tag(s)**. You will only see hosts or tags reporting
   the metric you have chosen.

3. Select **alerting options**. Please refer to the
   [alert-conditions](#metric-conditions) section for details on the available
   options.

4. Configure your **notification options** Refer to the
   [Notifications](#notifications) section of this guide for a detailed
   walkthrough of the common notification options.

## Custom Monitors {#custom}

![custom monitor](/static/images/monitor/custom_monitor.png)

Custom monitors encompass any service checks that are not reported by one of the
out-of-the-box integrations included with the Agent.

Refer to the [Guide to Agent Checks](/guides/agent_checks/) for detailed
information on writing your own checks that send metrics, events,
or service checks.

1. Select your **service check**.

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

4. Configure your **notification options** Refer to the
   [Notifications](#notifications) section of this guide for a detailed
   walkthrough of the common notification options.

## Monitor Notifications {#notification}

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

## Monitor FAQs {#faq}

- *Can I manage my monitors progromatically?*

  Yes. Refer to the [Datadog API docs](http://docs.datadoghq.com/api/#alerts)
  for detailed information on managing monitors through the API using the
  available libraries or cURL.

- *Can you alert on a function?*

  Not currently but this feature is in the works and should be released by the end of 2014.

- *Can you alert on an event?*

  Not currently, but we're discussing how we'd like to implement this. As an
  alternative you can set up an @ notification in the body of the event which
  would deliver the event via email whenever it occurred.


