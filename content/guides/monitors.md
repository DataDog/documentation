---
title: Guide to Monitors
kind: guide
listorder: 8
---

***For more detail about monitors, review the [Monitoring Reference](/monitoring) page.***

Monitoring all of your infrastructure in one place wouldn't be complete without
the ability to know when critical changes are occurring. Datadog gives you the
ability to create monitors that will actively check metrics, integration
availability, network endpoints, and more.

Once a monitor is created, you will be notified when its conditions are met.
You can notify team members via email, 3rd party services (e.g. Pagerduty or
Hipchat) or other custom endpoints via webhooks.

Triggered monitors will appear in the event stream, allowing collaboration
around active issues in your applications or infrastructure. Datadog provides a
high-level view of open issues on the
[Triggered Monitors](https://app.datadoghq.com/monitors/triggered)
page as well as general monitor management on the
[Manage Monitors](https://app.datadoghq.com/monitors) page.

## Glossary
{: #glossary}

Here is a quick overview of the different terms used in this guide.

- **Status**: Each check run submits a status of OK, WARNING or CRITICAL.
- **Check**: Emits one more more statuses.
- **Monitor**: Sends notifications based on a sequence of check statuses, metric
  threshold or other alerting conditions.
- **Monitor type**: host-, metric-, integration-, process-, network-, event-based, and custom. See side navigation to drill into a specific type.
- **Tags**: Configurable labels that can be applied to each metric and host. See the [Tagging](/guides/tagging) page for more details.

##Creating a Monitor
{: #create}

Navigate to the [Create Monitors](https://app.datadoghq.com/monitors#/create)
page by highlighting the "Monitors" tab in the main menu and selecting the
"New Monitor" sub-tab (depending on your chosen theme, the main menu may be at the top or on the left).  You will be presented with a list of monitor types
on the left. This guide will walk through the configuration of the Metric type. To learn more about setting up the other types of monitors, go to the [Monitoring Reference](/monitoring) page.

![nav](/static/images/monitor/nav.png)

###Choose what to monitor

1. Select the metric and scope you want to monitor.
  ![metric scope](/static/images/monitor/metric_scope.png)

    You can create a monitor on any metrics that you are currently sending to
    Datadog. The standard scoping rules apply here. Please refer to the
    [scope section](/graphingjson/#scope) of the Graphing Primer using JSON for
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

###Define the conditions
4. {:#metric-conditions :start="4"} Select the alert conditions

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

###Setup Notifications
{: #notification}

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

***Note:*** *To avoid notification storms we now group notifications with the same monitor ID and alert type in 20 second buckets. The first two notifications in the group within a 20 second bucket will be sent as normal. All other notifications within that 20 seconds will be sent as a single message listing all of them after the first two.*


## Scheduling Downtime
{: #downtime}

You may occasionally need to shut systems down or take them offline to perform maintenance or upgrades. Scheduling downtime allows you to do this without triggering monitors.

### Manage Downtime
{: #downtime-manage}

Navigate to the [Manage Downtime](https://app.datadog.com/monitors#/downtime) page by highlighting the "Monitors" tab in the main menu and selecting the "Manage Downtime" link. You may also navigate to the "Manage Downtime" page from other Monitor related pages by clicking the link at the top of the page.

![downtime-nav](/static/images/monitor/downtime-nav.png)

The Manage Downtime page will display a list of active and scheduled downtimes. Select a downtime to view more details about the host and monitors affected.

![downtime-manage](/static/images/monitor/downtime-manage.png)

### Schedule Downtime
{: #downtime-schedule}

To schedule downtime, click the "Schedule Downtime" button in the upper right.

1. Choose what to silence.

   ![downtime-silence](/static/images/monitor/downtime-silence.png)

   You can select a specific monitor to silence, or leave this field empty to silence all monitors. You can also select a scope to constrain your downtime to a specific host, device or arbitrary tag.  Please refer to the [scope section](/graphingjson/#scope) of the Graphing Primer using JSON for further information about scope.

   If you choose to silence all monitors constrained by a scope, clicking the "Preview affected monitors" will show which monitors are currently affected. Any monitors within your scope that are created or edited after the downtime is schedule will also be silenced.

   Note that if a multi alert is included, it will only be silenced for systems covered by the scope. For example, if a downtime scope is set for `host:X` and a multi alert is triggered on both `host:X` and `host:Y`, Datadog will generate a monitor notification for `host:Y`, but not `host:X`.

2. Set a schedule.

   ![downtime-schedule](/static/images/monitor/downtime-schedule.png)

   You can set a start date and time or leave the field empty to immediately start the downtime. You may also set a repeating schedule to accomimodate regularly scheduled downtimes.

3. Add an optional message to notify your team

   ![downtime-notify](/static/images/monitor/downtime-notify.png)

   Enter a message to notify your team about this downtime. The message field allows standard [markdown formatting](http://daringfireball.net/projects/markdown/syntax) as well as Datadog's @-notification syntax. The "Notify your team" field allows you to specify team members or send the message to a service [integration](https://app.datadoghq.com/account/settings#integrations).

## Monitor FAQs
{: #faq}

- *Can I manage my monitors programatically?*

  Yes. Refer to the [Datadog API docs](http://docs.datadoghq.com/api/#alerts)
  for detailed information on managing monitors through the API using the
  available libraries or cURL.

- *Can you alert on a function?*

  Yes, selecting the 'Source' tab of a monitor editor (Step 1) will allow you to
  alert on custom queries and functions, similar to the JSON editor for graphs.

- *Can I manually resolve a monitor?*

  Yes, you can manually resolve monitors but it only makes sense in a couple cases:

    - If the monitor is in a "no data" state then resolving it will hide it from the
      triggered monitors page.
    - If the monitor is in the triggered state but has stopped reporting data then
      resolving it will hide it from the triggered monitors page.

  Otherwise the monitor will pick up the current state on the next evaluation. In other
  words, if the value is still above/below the configured threshold then the monitor may
  re-trigger upon the next evaluation (in about 60 seconds).
