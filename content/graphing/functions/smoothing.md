---
title: Smoothing
kind: documentation
--- 

## Exponentially weighted moving average

### Ewma 3

`ewma_3()`

Exponentially weighted moving average with a span of 3.

The span value is the number of data points. So `ewma_3()` uses the last 3 data points to calculate the average.

### Ewma 5

`ewma_5()`

Exponentially weighted moving average with a span of 5.

The span value is the number of data points. So `ewma_5()` uses the last 5 data points to calculate the average.

### Ewma 10

`ewma_10()`

Exponentially weighted moving average with a span of 10.

The span value is the number of data points. So `ewma_10()` uses the last 10 data points to calculate the average.

### Ewma 20

`ewma_20()`

Exponentially weighted moving average with a span of 20.

The span value is the number of data points. So `ewma_20()` uses the last 20 data points to calculate the average.

## Median 

### Median 3

`median_3()`

Rolling median with a span of 3.

The span value is the number of data points. So `median_3()` uses the last 3 data points to calculate the median.

### Median 5

`median_5()`

Rolling median with a span of 5.

The span value is the number of data points. So `median_5()` uses the last 5 data points to calculate the median.

### Median 7

`median_7()`

Rolling median with a span of 7.

The span value is the number of data points. So `median_7()` uses the last 7 data points to calculate the median.

### Median 9

`median_9()`

Rolling median with a span of 9.

The span value is the number of data points. So `median_9()` uses the last 9 data points to calculate the median.

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/graphing/functions/algorithms" >}}Algorithmic: Implement Anomaly or Outlier detection on your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/arithmetic" >}}Arithmetic: Perform Arithmetic operation on your metric.  {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/count" >}}Count: Count non zero or non null value of your metric. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/interpolation" >}}Interpolation: Fill or set default values for your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rank" >}}Rank: Select only a subset of metrics. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rate" >}}Rate: Calculate custom derivative over your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/regression" >}}Regression: Apply some machine learning function to your metric.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rollup" >}}Rollup: Control the number of raw points used in your metric. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
{{< /whatsnext >}}