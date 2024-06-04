---
title: Change Alert Monitor
kind: Documentation
disable_toc: false
aliases:
- monitors/guide/change-alert
further_reading:
- link: "/monitors/types/metric/?tab=change#choose-the-detection-method"
  tag: "Documentation"
  text: "Choose the detection method of Metric Monitors"
- link: "/monitors/configuration/"
  tag: "Documentation"
  text: "Learn how to configure monitors"
---

## Overview

Metric monitors are one of the most commonly used type of monitor. This guide clarifies the change alert detection method's behavior and its additional options. Learn how change alert monitors work and how to troubleshoot change alert evaluations.

## What are change alert monitors?
Here is a breakdown of how monitors with the change detection method work: 
1. The monitor takes a query of data points at the current time.
1. It takes a query of data points N minutes, hours, or days ago.
1. Then, it takes a query of the difference of the values between (1) and (2).
1. Aggregation is applied over the query in (3) which returns a single value.
1. The threshold defined in **Set alert conditions** is compared to the single value returned in (4).

## Monitor creation

To create a [Change Alert monitor][9] in Datadog, use the main navigation: *Monitors --> New Monitor --> Change*.

## Evaluation conditions

Here are the different options that you need to configure in a change alert monitor.

{{< img src="/monitors/monitor_types/change-alert/configure_define_the_metrics.png" alt="Configuration options for change alert detection method" style="width:100%;" >}}

The example shows the following alert condition:
The **average** of the **change** over **1 hour** compared to **5 minutes**
| Options selected | Description                                                                                     | Options |
| ---------------  | ------------------------------------------------------------------------------------------------| ----------- |
| average          | The aggregation that is used on the query.                                                      | `Average`, `Maximum`, `Minimum`, `Sum` |
| change           | Choose between the absolute or percentage change of the value.                                  | `change` or `% change`|
| 1 hour           | The evaluation window. For more information, see the [Monitor Configuration][1] documentation.  | This can be N minutes, hours, days, weeks, or at most one month. |
| 5 minutes        | The timeframe that you wish to shift the query by.                                              | This can be N minutes, hours, days, weeks, or at most one month ago.|

### Change and change %

There are two options when configuring a change alert detection, **Change** and **% Change**. 

This determines the way the monitor evaluates as expressed in the formula section in the following table:

| Option   | Description                                                        | Formula              |
| -------  | ------------------------------------------------------------------ | -------------------- |
| Change   | The absolute change of the value.                                  | `a - b`              |
| % Change | The percentage change of the value compared to its previous value. | `((a - b) / b) * 100`|

In both cases, `Change`, and `% Change` can be either positive or negative. 

## Notifications

For instructions on the **Configure notifications and automations** section, see the [Notifications][7] and [Monitor configuration][8] pages.

## Troubleshooting a change alert evaluation

To verify the results of your change alert evaluation, reconstruct the metric queries with a Notebook. 
Take this change alert monitor with the following settings. 

{{< img src="monitors/monitor_types/change-alert/example_monitor_config.png" alt="The create monitor page with a change alert selected, evaluating the percent change of the average of the metric system.load.1 over the last 5 minutes compared to the last 30 minutes" style="width:100%;" >}}

Monitor Query:
```pct_change(avg(last_5m),last_30m):<METRIC> > -50```

This is a break down of the query with the following conditions:
1. Aggregation of **avg**.
2. Uses **% change**.
3. Evaluation window of **5 minutes**.
4. Timeshift of **30 minutes** or 1800 seconds.
5. Threshold of **> -50**.

### Reconstructing the query

1. Use a [notebook][2] and the [timeshift function][3] to reconstruct the data used by the monitor at a specific evaluation. 
    - Query of data points at the current time (this is the normal query <QUERY>).
    - Query of data points N minutes ago (this is the normal query + timeshift(-1800)).
    - The timeshift function uses a **negative** duration because you're shifting the data back. Combine these queries along with the % change formula from the table.
    - **Note**: Since this example only has one metric, it's also possible to use a single query (a) and add the formula `((a - timeshift(a, -1800)) / timeshift(a, -1800)) * 100`
    {{< img src="monitors/monitor_types/change-alert/notebook_query_reconstruct_timeshift.png" alt="The edit screen of a cell in a notebook, titled Reconstruct Change Alert query, configured as a timeseries using the average of the metric system.load.1, from everywhere, with the formula ((a - timeshift(a, -1800)) / timeshift(a, -1800)) * 100 being applied" style="width:100%;" >}}
2. Compare the monitor's history graph with the notebook graph. Are the values comparable?
3. Apply the aggregation. 
    - To compare your notebook graph to the change alert monitor evaluation, scope your timeframe to match the change alert. 
    - For example, if you are looking to verify the value of a monitor evaluation over the last five minutes at 1:30, scope your notebook to 1:25 - 1:30. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/configuration/#evaluation-window
[2]: /monitors/manage/status/#investigate-a-monitor-in-a-notebook
[3]: /dashboards/functions/timeshift/
[7]: /monitors/notify/
[8]: /monitors/configuration/?tab=thresholdalert#configure-notifications-and-automations
[9]: https://app.datadoghq.com/monitors/create/metric/change
