---
title: Monitors Type
kind: documentation
aliases:
    - /monitoring
---

## Glossary

Here is a quick overview of the different terms used:

- **Status**: Each check run submits a status of OK, WARNING or CRITICAL.
- **Check**: Emits one or more statuses.
- **Monitor**: Sends notifications based on a sequence of check statuses, metric
  threshold or other alerting conditions.
- **Monitor type**: [host][1]-, [metric][2]-, [integration][3]-, [process][4]-, [outlier][5]-, [anomaly][6]-, [apm][7]-, [composite][8]-, [network][9]-, [event][10]-based, and [custom][11]. See side navigation to drill into a specific type.
- **Tags**: Configurable labels that can be applied to each metric and host. See the [Tagging][12] page for more details.

## Create a monitor
### Choose what to monitor

1. Choose the detection method
    {{< img src="monitors/index/alert_type.png" alt="alert type" responsive="true" popup="true" style="width:60%;">}}

    A **[Threshold Alert][2]** compares the value in the selected timeframe against a given threshold. There are additional options available in the alerting conditions section. This is the standard alert case where you know what sort values are unexpected.

    A **[Change Alert][2]** compares the absolute or percentage change in
    value between now and some time ago against a given threshold.
    The compared data points are not single points but are computed using
    the parameters in the *alert conditions* section.  
    This type of alert is useful to track sudden spikes or drops as well as slow changes in a metric when you might not have an exact "unexpected" threshold.  
    **Note:** the calculated value is not the absolute value - meaning it is
    negative for a downward change.

    **[Anomaly Detection][6]** is an algorithmic feature that allows you to identify when a metric is behaving differently than it has in the past, taking into account trends, seasonal day-of-week and time-of-day patterns. It is well- suited for metrics with strong trends and recurring patterns that are hard or impossible to monitor with threshold-based alerting.

    **[Outlier Detection][5]** is an algorithmic feature that allows you to detect when some members of a group are behaving strangely compared to the others.  
    For example, you could detect that one web server in a pool is processing an unusual number of requests, and hence should be a target for replacement. Or, you could get an early warning that significantly more 500s are happening in one AWS Availability Zone (AZ) than the others, which might indicate an issue arising in that AZ.

2. Select the metric and scope you want to monitor.
  {{< img src="monitors/index/metric_scope.png" alt="metric scope" responsive="true" popup="true" style="width:80%;">}}

    You can create a monitor on any metrics that you are currently sending to
    Datadog. The standard [scoping rules][13] apply here.

3. Select the alert grouping.
  {{< img src="monitors/index/alert_grouping.png" alt="alert grouping" responsive="true" popup="true" style="width:80%;">}}
  A **simple alert** aggregates over all reporting sources. You get one alert when the aggregated value meets the conditions set below. This works best to monitor a metric from a single host, like `avg` of `system.cpu.iowait` over `host:bits`, or for an aggregate metric across many hosts like `sum` of `nginx.bytes.net` over `region:us-east`.  
  A **multi alert** applies the alert to each source, according to your group parameters. E.g. to alert on disk space you might group by host and device, creating the query:
  ```
  avg:system.disk.in_use{*} by {host,device}
  ```
  This triggers a separate alert for each device on each host that is running out of space.

### Define the conditions
4. Select the alert conditions

    - The **threshold** options vary slightly depending on what alert type you
      have chosen. For either case, you input a threshold and comparison type
      based on your metric. As you change your threshold, you see the graph
      update with a marker showing the cutoff point.

      {{< img src="monitors/index/metric_threshold.png" alt="metric threshold" responsive="true" popup="true">}}

      Note that you can use formatted values in this input based on the
      metric itself. For example, if you are monitoring `system.disk.used`, you
      can give a threshold of `20GB`.

      For a **threshold alert** you are able to chose a *time aggregation*
      of the data. The alerting engine generates a single series and perform selected aggregation.

      Let's look at the details of each option:

      * **on average**: The series is averaged to produce a single
        value that is checked against the threshold. It adds the `avg()` [functions][14] at the beggining of your monitor query. 

      * **at least once**: If any single value in the generated series crosses
        the threshold then an alert is triggered. It adds the `max()` [functions][14] at the beggining of your monitor query.

      * **at all times**: If every point in the generated series is outside the
        threshold then an alert is triggered. It adds the `min()` [functions][14] at the beggining of your monitor query.

      * **in total**: If the summation of every point in the series is outside
        the threshold then an alert is triggered. It adds the `sum()` [functions][14] at the beggining of your monitor query.

      Note the **on average** and **at all times** aggregations *require* a full window of data in the final series. This does *not* mean that each series must be full but that there shouldn't be a gap of more than 1 minute across all aggregated series. In other words, we recommend using **at least once** or **in total** for metrics with > 1 minute interval.

    - When you select the **change alert** option, you have additional
    parameters you can adjust.
      - *change* is an absolute change of the value whereas *% change* is the percentage change of your value compared to its previous value (so if it was a value of 2 and now 4, the *% change* is 100%).
      - You can compare the change of the value during a given timeframe by selecting the period you want to compare against. This can range from 5 minutes to up to 2 days.
      - Like the **threshold alert**, select the *time aggregation* and a *time window* on which the change is calculated.

    - For details on how to configure Anomaly Detection, see the [Anomaly Monitor][6]

    - For details on how to configure Outlier Detection, see the [Outlier Monitor][5]

5. Select your **evaluation_delay** Time (in seconds) to delay evaluation, as a non-negative integer. For example, if the value is set to 300 (5min), the timeframe is set to last_5m and the time is 7:00, the monitor evaluates data from 6:50 to 6:55. This is useful for AWS CloudWatch and other backfilled metrics to ensure the monitor always has data during evaluation.

6. You can optionally **notify on no data** after a configurable timeframe. At
   the minimum, your chosen timeframe must be greater than 2x the alerting
   window. For example, if you are alerting over the last 5 minutes then you
   would need to wait at least 10 minutes before notifying on missing data.

7. You can opt to **automatically resolve the monitor from a triggered
   state**. In general you'll want to leave this option off as you only want
   an alert to be resolved when it's fixed.  
   This most common use-case for this option is when you have very sparse
   counters, e.g. for errors. When errors stop occuring the metric stops
   reporting. This means the monitor doesn't resolve because there are not
   anymore values to trigger a resolution.  
    You can also choose a Recovery thresholds, those are additional thresholds added to your monitor that indicates an additional condition to a monitor’s recovery from alert or warning states.  
    When you set up a threshold metric monitor, you get alerted when a metric passes the alert threshold. The recovery threshold adds a condition to the monitor’s recovery such that it only enters recovered state once it has passed the recovery threshold.  
    **Note**: Your metric value needs to be strictly below/above the recovery threshold for the monitor to recover.

### Setup Notifications

{{< img src="monitors/index/notification.png" alt="notification" responsive="true" popup="true" style="width:80%;">}}

1. Give your monitor a **title**. It is often useful to use a succinct
   explanation of the monitor so a notified team member can quickly understand
   what is going on.

2. Enter a **message** for the monitor. This field allows standard
   [markdown formatting][15]
   as well as Datadog's @-notification syntax. Note: you can notify any
   non-Datadog users via email by adding `@their-email` to the
   message.
  A common use-case for the monitor message is to include a step-by-step way to resolve the problem. For example if you are monitoring a database then you might want to include steps for failing over to a standby node. All in all, you should attempt to give as much context to the monitor as possible.

4. Remind your team that a problem is not solved until the monitor is marked as
   resolved. If enabled, you can configure an escalation message to be sent anytime the monitor renotifies. The original message is included as well.

[Learn more about notifications settings][16].  

***Note:*** *To avoid notification storms we now group notifications with the same monitor ID and alert type in 20 second buckets. The first two notifications in the group within a 20 second bucket is sent as normal. All other notifications within that 20 seconds are sent as a single message listing all of them after the first two.*

[1]: /monitors/monitor_types/host
[2]: /monitors/monitor_types/metric
[3]: /monitors/monitor_types/integration
[4]: /monitors/monitor_types/process
[5]: /monitors/monitor_types/outlier
[6]: /monitors/monitor_types/anomaly
[7]: /monitors/monitor_types/apm
[8]: /monitors/monitor_types/composite
[9]: /monitors/monitor_types/network
[10]: /monitors/monitor_types/event
[11]: /monitors/monitor_types/custom_check
[12]: /getting_started/tagging
[13]: /graphing/#scope
[14]: /graphing/miscellaneous/functions
[15]: http://daringfireball.net/projects/markdown/syntax
[16]: /monitors/notifications
