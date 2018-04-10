---
title: Metric monitor
kind: documentation
description: "Compare values of a metric with a user defined threshold"
further_reading:
- link: "monitors/notifications"
  tag: "Documentation"
  text: Configure your monitor notifications
- link: "monitors/downtimes"
  tag: "Documentation"
  text: Schedule a dowtime to mute a monitor
- link: "monitors/faq"
  tag: "FAQ"
  text: Monitors FAQ
---

## Configuration

1. Choose the detection method
    {{< img src="monitors/monitor_types/metric/alert_type.png" alt="alert type" responsive="true" popup="true">}}

    A **[Threshold alert][1]** compares the value in the selected timeframe against a given threshold. There are additional options available in the alerting conditions section. This is the standard alert case where you know what sort values are unexpected.

    A **[Change alert][1]** compares the absolute or percentage change in value between now and some time ago against a given threshold. The compared data points aren't single points but are computed using the parameters in the *alert conditions* section.

    This type of alert is useful to track sudden spikes or drops as well as slow changes in a metric when you might not have an exact "unexpected" threshold.
    *Note:* the calculated value is not the absolute value - meaning it is
    negative for a downward change.

    **[Anomaly Detection][2]** is an algorithmic feature that allows you to identify
    when a metric is behaving differently than it has in the past, taking into
    account trends, seasonal day-of-week and time-of-day patterns. It is well-
    suited for metrics with strong trends and recurring patterns that are hard
    or impossible to monitor with threshold-based alerting.

    **[Outlier Detection][3]** is an algorithmic feature that allows you to detect when some members of a group are behaving strangely compared to the others.  
    For example, you could detect that one web server in a pool is processing an unusual number of requests, and hence should be a target for replacement. Or, you could get an early warning that significantly more 500s are happening in one AWS Availability Zone (AZ) than the others, which might indicate an issue arising in that AZ.

    **[Forecast Detection][4]** is an algorithmic feature that allows you to predict where a metric is heading in the future. It is well-suited for metrics with strong trends or recurring patterns.

2. Select the metric and scope you want to monitor.
  {{< img src="monitors/monitor_types/metric/metric_scope.png" alt="metric scope" responsive="true" popup="true">}}
  You can create a monitor on any metrics that you are currently sending to Datadog. The standard [scoping rules][5] apply here.

3. Select the alert grouping.
    {{< img src="monitors/monitor_types/metric/alert_grouping.png" alt="alert grouping" responsive="true" popup="true">}}

    A **simple alert** aggregates over all reporting sources. You get one
    alert when the aggregated value meets the conditions set below. This works
    best to monitor a metric from a single host, like `avg` of `system.cpu.iowait` over `host:bits`, or for an aggregate metric across many hosts like `sum` of `nginx.bytes.net` over `region:us-east`.

    A **multi alert** applies the alert to each source, according to your group
    parameters. E.g. to alert on disk space you might group by host and device,
    creating the query:

        avg:system.disk.in_use{*} by {host,device}

    This triggers a separate alert for each device on each host that is
    running out of space.

4.  Select the alert conditions:

  * The **threshold** options vary slightly depending on what alert type you have chosen. For either case, you input a threshold and comparison type based on your metric. As you change your threshold, you can see the graph update with a marker showing the cutoff point.
  {{< img src="monitors/monitor_types/metric/metric_threshold.png" alt="metric threshold" responsive="true" popup="true">}}
  Note that you can use formatted values in this input based on the metric itself. For example, if you are monitoring `system.disk.used`, you can give a threshold of `20GB`.  
  For a **threshold alert** you are able to chose a *time aggregation* of the data. The alerting engine generates a single series and perform selected aggregation.  
  Let's look at the details of each option:
    
    * **on average**: The series is averaged to produce a single value that is checked against the threshold. It adds the `avg()` [functions][6] at the beginning of your monitor query. 
    
    * **at least once**: If any single value in the generated series crosses the threshold then an alert is triggered. It adds the `max()` [functions][6] at the beginning of your monitor query.
    
    * **at all times**: If every point in the generated series is outside the threshold then an alert is triggered. It adds the `min()` [functions][6] at the beginning of your monitor query.

    * **in total**: If the summation of every point in the series is outside the threshold then an alert is triggered. It adds the `sum()` [functions][6] at the beginning of your monitor query.
  
    Note the **on average** and **at all times** aggregations *require* a full window of data in the final series. This does *not* mean that each series must be full but that there shouldn't be a gap of more than 1 minute across all aggregated series. In other words, we recommend using **at least once** or **in total** for metrics with > 1 minute interval.

  - When you select the **change alert** option, you have additional parameters you can adjust:
    
    -  *change* is an absolute change of the value whereas *% change* is the percentage change of your value compared to its previous value (so if it was a value of 2 and now 4, the *% change* is 100%).
    - You can compare the change of the value during a given timeframe by selecting the period you want to compare against. This can range from 5 minutes to up to 2 days.
    - Like the **threshold alert**, select the *time aggregation* and a *time window* on which the change is calculated.

    - For details on how to configure Anomaly Detection, see the [Anomaly Detection Guide][2]

    - For details on how to configure Outlier Detection, see the [Outlier Detection Guide][3]

5. Select your **evaluation_delay** Time (in seconds) to delay evaluation, as a non-negative integer. For example, if the value is set to 300 (5min), the timeframe is set to last_5m and the time is 7:00, the monitor evaluates data from 6:50 to 6:55. This is useful for AWS CloudWatch and other backfilled metrics to ensure the monitor is always have data during evaluation.

6. You can optionally **notify on no data** after a configurable timeframe. At the minimum, your chosen timeframe must be greater than 2x the alerting window. For example, if you are alerting over the last 5 minutes then you would need to wait at least 10 minutes before notifying on missing data.

7. You can opt to **automatically resolve the monitor from a triggered state**.  
    In general you'll want to leave this option off as you only want an alert to be resolved when it's fixed.  
  
    The most common use-case for this option is when you have very sparse counters, e.g. for errors. When errors stop occurring, the metric stops reporting. This prevents the monitor from resolving because there are no more values to trigger a resolution. You can also set **Recovery thresholds**: thresholds added to your monitor that define an additional condition to a monitor’s recovery from alert or warning states.  
  
    When you set up a threshold metric monitor, you get alerted when a metric passes the alert threshold. The recovery threshold adds a condition to the monitor’s recovery such that it only enters recovered state once it has passed the recovery threshold.  
  
    **Note**: Your metric value needs to be strictly below/above the recovery threshold for the monitor to recover

8. Configure your **notification options** Refer to the [Notifications][7] dedicated documentation page for a detailed options.

## Further Reading 

{{< partial name="whats-next/whats-next.html" >}}


[1]: /monitors/monitor_types/metric
[2]: /monitors/monitor_types/anomaly
[3]: /monitors/monitor_types/outlier
[4]: /monitors/monitor_types/forecasts
[5]: /graphing/#scope
[6]: /graphing/miscellaneous/functions
[7]: /monitors/notifications
