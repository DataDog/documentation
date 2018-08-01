---
title: Timeshift
kind: documentation
--- 

Here is a set of functions of the pattern `<TIMEPERIOD>_before()`. These functions display the values from the corresponding time period on the graph. On their own, they may not be of high value, but together with the current values they may provide useful insight into the performance of your application.

## Hour before

`hour_before()`

The `hour_before()` function shows data from 1 hour prior.
Here is an example of `system.load.1` with the `hour_before()` value shown as a dotted line. In this particular example, you can see the machine was started at 6:30am and the hour_before values show up at the 7:30 mark. Of course this example was created specifically so you can see the hour_before values match up with the actual values.

{{< img src="graphing/functions/timeshift/simple_hour_before_example.png" alt="simple hour before example" responsive="true" style="width:80%;">}}

## Day before

`day_before()`

The `day_before()` function shows data from 1 day prior.
Here is an example of `nginx.net.connections` with the `day_before()` value shown as a lighter, thinner line. In this example, you can see a week's worth of data which makes the day_before data easy to identify.

{{< img src="graphing/functions/timeshift/simple_day_before_example.png" alt="simple day before example" responsive="true" style="width:80%;">}}

## Week before

`week_before()`

The `week_before()` function shows data from 7 days (1 week) prior.

Here is an example of `cassandra.db.read_count` with the `week_before()` value shown as a dotted line. In this example, you can see about three weeks' worth of data which makes the week_before data easy to identify.

{{< img src="graphing/functions/timeshift/simple_week_before_example.png" alt="simple week before example" responsive="true" style="width:80%;">}}

### Month before

`month_before()`

The `month_before()` function shows data from 28 days (4 weeks) prior.

Here is an example of `aws.ec2.cpuutilization` with the `month_before()` value shown as a thin, solid line.

{{< img src="graphing/functions/timeshift/simple_month_before_example.png" alt="simple month before example" responsive="true" style="width:80%;">}}

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/graphing/functions/algorithms" >}}Algorithmic: Implement Anomaly or Outlier detection on your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/arithmetic" >}}Arithmetic: Perform Arithmetic operation on your metric.  {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/count" >}}Count: Count non zero or non null value of your metric. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/interpolation" >}}Interpolation: Fill or set default values for your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rank" >}}Rank: Select only a subset of metrics. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rate" >}}Rate: Calculate custom derivative over your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/regression" >}}Regression: Apply some machine learning function to your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rollup" >}}Rollup: Control the number of raw points used in your metric. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/smoothing" >}}Soothing: Smooth your metric variations.{{< /nextlink >}}
{{< /whatsnext >}}