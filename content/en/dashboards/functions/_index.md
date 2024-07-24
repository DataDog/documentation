---
title: Functions
aliases:
  - /examples/
  - /examples/aws-metrics/
  - /examples/month_before/
  - /examples/graphing-functions/
  - /examples/day_before/
  - /examples/json-editing/
  - /examples/nginx-metrics/
  - /examples/dashboards/
  - /examples/hour_before/
  - /examples/os-metrics/
  - /examples/week_before/
  - /examples/cassandra-metrics/
  - /graphing/miscellaneous/functions
  - /graphing/miscellaneous/
  - /getting_started/from_the_query_to_the_graph
  - /graphing/miscellaneous/from_the_query_to_the_graph
  - /graphing/functions/
further_reading:
- link: "/metrics/#querying-metrics"
  tag: "Documentation"
  text: "Querying metrics"
---

## Overview

Functions can modify how the results of a metric query are returned for visualizations. Most functions are applied after the results of the metric query are returned, but functions can also change the parameters before the query is made. 

For example, the Rollup function changes the time aggregation of a query before the results are returned. Alternatively, arithmetic functions apply changes to the returned results of the metric query. See the [Metrics][3] page to learn more about querying metrics. To learn more about the different functions, see the [function types](#function-types).

## Add a function

Functions can be applied to your queries by clicking the Add Function `Σ` icon in the graphing editor. Most of the functions are applied after [time][1] and [space aggregation][2].

{{< img src="dashboards/functions/sigmaaddingfunctions.png" alt="Capital Sigma symbol for Add Function" style="width:100%;" >}}

## Function types

{{< whatsnext desc="Choose a type of function:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithmic: Implement anomaly or outlier detection.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Arithmetic: Perform arithmetic operations.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Count: Count non-zero or non-null values.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion: Exclude certain values of your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation: Fill or set default values.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rank: Select only a subset of metrics. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Rate: Calculate a custom derivative over your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regression: Apply a machine learning function.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: Control the number of raw data points used. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Smoothing: Smooth your metric variations.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/beta" >}}Beta: Compute the rolling average of a metric.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/#time-aggregation
[2]: /metrics/#space-aggregation
[3]: /metrics/#anatomy-of-a-metric-query
