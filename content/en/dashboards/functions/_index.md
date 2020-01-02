---
title: Functions
kind: documentation
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
---

## Overview

Functions can be applied to your queries by using the `Formula` box in the graphing editor. Most of the functions are applied as the last step (after [time][1] and [space aggregation][2]).

{{< whatsnext desc="Choose a type of function:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithmic: Implement anomaly or outlier detection.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Arithmetic: Perform arithmetic operations.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Count: Count non-zero or non-null values.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation: Fill or set default values.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rank: Select only a subset of metrics. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Rate: Calculate a custom derivative over your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regression: Apply a machine learning function.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: Control the number of raw data points used. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Smoothing: Smooth your metric variations.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
{{< /whatsnext >}}


[1]: /metrics/introduction/#time-aggregation
[2]: /metrics/introduction/#space-aggregation
