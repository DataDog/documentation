---
title: Timeshift
kind: documentation
aliases:
    - /graphing/functions/timeshift/
further_reading:
- link: "/dashboards/faq/how-can-i-graph-the-percentage-change-between-an-earlier-value-and-a-current-value/"
  tag: "FAQ"
  text: "Graph the percentage change between an earlier value and a current value."
---

Here is a set of functions of the pattern `<TIMEPERIOD>_before()`. These functions display the values from the corresponding time period on the graph. On their own, they may not be of high value, but together with the current values they may provide useful insight into the performance of your application.

## Timeshift

| Function      | Description                                                                                    | Example                                          |
|:--------------|:-----------------------------------------------------------------------------------------------|:-------------------------------------------------|
| `timeshift()` | Graph values from an arbitrary `<TIME_IN_SECOND>` before the current timestamp for the metric. | `timeshift(<METRIC_NAME>{*}, -<TIME_IN_SECOND>)` |

For example, if you wanted to use this to compare current system load with load from 2 weeks ago (60\*60\*24\*14 = 1209600), your query would be:

```text
timeshift(avg:system.load.1{*}, -1209600)
```

## Hour before

| Function        | Description                                                            | Example                         |
|:----------------|:-----------------------------------------------------------------------|:--------------------------------|
| `hour_before()` | Graph values from an hour before the current timestamp for the metric. | `hour_before(<METRIC_NAME>{*})` |

Here is an example of `system.load.1` with the `hour_before()` value shown as a dotted line. In this particular example, you can see the machine was started at 6:30am and the `hour_before()` values show up at the 7:30 mark. Of course, this example was created specifically so that you can see the `hour_before()` values match up with the actual values.

{{< img src="dashboards/functions/timeshift/simple_hour_before_example.png" alt="simple hour before example" style="width:80%;">}}

## Day before

| Function       | Description                                                          | Example                        |
|:---------------|:---------------------------------------------------------------------|:-------------------------------|
| `day_before()` | Graph values from a day before the current timestamp for the metric. | `day_before(<METRIC_NAME>{*})` |

Here is an example of `nginx.net.connections` with the `day_before()` value shown as a lighter, thinner line. In this example, you can see a week's worth of data, which makes the `day_before()` data easier to identify.

{{< img src="dashboards/functions/timeshift/simple_day_before_example.png" alt="simple day before example" style="width:80%;">}}

## Week before

| Function        | Description                                                                    | Example                         |
|:----------------|:-------------------------------------------------------------------------------|:--------------------------------|
| `week_before()` | Graph values from a week (7 days) before the current timestamp for the metric. | `week_before(<METRIC_NAME>{*})` |

Here is an example of `cassandra.db.read_count` with the `week_before()` value shown as a dotted line. In this example, you can see about three weeks' worth of data, which makes the `week_before()` data easier to identify.

{{< img src="dashboards/functions/timeshift/simple_week_before_example.png" alt="simple week before example" style="width:80%;">}}

### Month before

| Function         | Description                                                                                | Example                          |
|:-----------------|:-------------------------------------------------------------------------------------------|:---------------------------------|
| `month_before()` | Graph values from a month (28 days / 4 weeks) before the current timestamp for the metric. | `month_before(<METRIC_NAME>{*})` |

Here is an example of `aws.ec2.cpuutilization` with the `month_before()` value shown as a thin, solid line.

{{< img src="dashboards/functions/timeshift/simple_month_before_example.png" alt="simple month before example" style="width:80%;">}}

## Other functions

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithmic: Implement Anomaly or Outlier detection on your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Arithmetic: Perform Arithmetic operation on your metric.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Count: Count non zero or non null value of your metric. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion: Exclude certain values of your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation: Fill or set default values for your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rank: Select only a subset of metrics. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Rate: Calculate custom derivative over your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regression: Apply some machine learning function to your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: Control the number of raw points used in your metric. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Smoothing: Smooth your metric variations.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
