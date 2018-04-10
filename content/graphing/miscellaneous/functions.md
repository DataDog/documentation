---
title: Graphing Functions
kind: documentation
aliases: 
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
---

## Arithmetic
### abs()
Absolute value for a given metric.

### log2()
Base-2 logarithm for a given metric.

### log10()
Base-10 logarithm for a given metric.

### cumsum()
Cumulative sum over visible time window for a given metric.

### integral()

Cumulative sum of `\[time delta] x \[value delta]` over all consecutive pairs of points in the visible time window for a given metric.

## Interpolation
### .fill()
Choose how to interpolate missing values for a given metric.
It allows you to tweak the interpolation settings. It takes as parameters a function to use for interpolation and a time in seconds that represents the maximum size of a gap you want to interpolate. You can use 4 different functions for interpolation:

* **linear**: gives you a linear interpolation between the beginning and the end of the gap
* **last**: fills the gap with the value of the beginning of the gap
* **zero**: fills the gap with a zero value
* **null**: deactivates the interpolation

## Timeshift

Here is a set of functions of the pattern &lt;timeperiod&gt;_before(). These functions display the values from the corresponding time period on the graph. On their own, they may not be of high value, but together with the current values they may provide useful insight into the performance of your application.

### hour_before()

Here is an example of system.load.1 with the hour_before value shown as a dotted line. In this particular example, you can see the machine was started at 6:30am and the hour_before values show up at the 7:30 mark. Of course this example was created specifically so you can see the hour_before values match up with the actual values.

{{< img src="graphing/miscellaneous/functions/simple_hour_before_example.png" alt="simple hour before example" responsive="true" popup="true" style="width:80%;">}}

For now, using functions like hour_before is out of scope for the graphical editor so you have to use the JSON editor. Here is the JSON for this graph:

```json
{ "viz": "timeseries",
  "requests": [
    {
      "q": "avg:system.load.1{host:MyMachine.local}",
      "style": {
        "width": "thin",
        "palette": "cool",
        "type": "solid"
      },
      "type": "area"
    },
    {
      "q": "hour_before(avg:system.load.1{host:MyMachine.local})",
      "style": {
        "width": "thin",
        "palette": "warm",
        "type": "dashed"
      },
      "type": "line"
    }
  ],
  "events": []
}
```

### day_before()

Here is an example of nginx.net.connections with the day_before value shown as a lighter, thinner line. In this example, you can see a week's worth of data which makes the day_before data easy to identify.

{{< img src="graphing/miscellaneous/functions/simple_day_before_example.png" alt="simple day before example" responsive="true" popup="true" style="width:80%;">}}

For now, using functions like day_before is out of scope for the graphical editor so you have to use the JSON editor. Here is the JSON for this graph:

```json
{
  "requests": [
    {
      "q": "day_before(avg:nginx.net.connections{*})",
      "type": "line",
      "style": {
        "palette": "cool",
        "width": "thin"
      }
    },
    {
      "q": "avg:nginx.net.connections{*}",
      "style": {
        "palette": "warm"
      }
    }
  ],
  "viz": "timeseries"
}
```

### week_before()

Here is an example of `cassandra.db.read_count` with the week_before value shown as a dotted line. In this example, you can see about three weeks' worth of data which makes the week_before data easy to identify.

{{< img src="graphing/miscellaneous/functions/simple_week_before_example.png" alt="simple week before example" responsive="true" popup="true" style="width:80%;">}}

For now, using functions like week_before is out of scope for the graphical editor so you have to use the JSON editor. Here is the JSON for this graph:

```json
{
  "requests": [
    {
      "q": "week_before(avg:cassandra.db.read_count{*})",
      "type": "line",
      "style": {
        "palette": "cool",
        "width": "normal",
        "type": "dotted"
      }
    },
    {
      "q": "avg:cassandra.db.read_count{*}",
      "style": {
        "palette": "orange"
      },
      "type": "line"
    }
  ],
  "viz": "timeseries"
}
```

### month_before()

Here is an example of `aws.ec2.cpuutilization` with the month_before value shown as a thin, solid line.

{{< img src="graphing/miscellaneous/functions/simple_month_before_example.png" alt="simple month before example" responsive="true" popup="true" style="width:80%;">}}

For now, using functions like month_before is out of scope for the graphical editor so you have to use the JSON editor. Here is the JSON for this graph:

```json
{
  "requests": [
    {
      "q": "avg:aws.ec2.cpuutilization{*}",
      "type": "line",
      "style": {
        "palette": "cool",
        "width": "normal",
        "type": "dotted"
      }
    },
    {
      "q": "month_before(avg:aws.ec2.cpuutilization{*})",
      "type": "line",
      "style": {
        "width": "thin"
      }
    }
  ],
  "viz": "timeseries"
}
```

## Rate
### per_second()

The rate at which the metric changes per second for a given metric.

### per_minute()

Same as ```per_second() * 60```
The rate at which the metric changes per minute for a given metric.

### per_hour()

Same as ```per_second() * 3600```
The rate at which the metric changes per hour for a given metric.

### dt()

Time delta between points for a given metric.

### diff() 

Delta value between points for a given metric

### derivative()

1st order derivative, same as  ```diff() / dt()```

## Smoothing
### ewma_3()

Exponentially weighted moving average with a span of 3.  

The span value is the number of data points. So `ewma_3()` uses the last 3 data points to calculate the average.

### ewma_5()

Exponentially weighted moving average with a span of 5.  

The span value is the number of data points. So `ewma_5()` uses the last 5 data points to calculate the average.

### ewma_10()

Exponentially weighted moving average with a span of 10.  

The span value is the number of data points. So `ewma_10()` uses the last 10 data points to calculate the average.

### ewma_20()

Exponentially weighted moving average with a span of 20.  

The span value is the number of data points. So `ewma_20()` uses the last 20 data points to calculate the average.

### median_3()

Rolling median with a span of 3.  

The span value is the number of data points. So `median_3()` uses the last 3 data points to calculate the median.

### median_5()

Rolling median with a span of 5.  

The span value is the number of data points. So `median_5()` uses the last 5 data points to calculate the median.
### median_7()

Rolling median with a span of 7.  

The span value is the number of data points. So `median_7()` uses the last 7 data points to calculate the median.

### median_9()

Rolling median with a span of 9.  

The span value is the number of data points. So `median_9()` uses the last 9 data points to calculate the median.

## Rollup
### .rollup()

Recommended for expert users only. Appending this function to the end of a query allows you to control the number of raw points rolled up into a single point plotted on the graph. The function takes two parameters, method and time: `.rollup(method,time)`

The method can be sum/min/max/count/avg and time is in seconds. You can use either one individually, or both together like `.rollup(sum,120)`. We impose a limit of 350 points per time range. For example, if you're requesting `.rollup(20)` for a month-long window, we return data at a rollup far greater than 20 seconds in order to prevent returning a gigantic number of points.

### .as_count() or as_rate()

These functions are only intended for metrics submitted as rates or counters via statsd. These functions have no effect for other metric types. For more on details about how to use `.as_count()` and `.as_rate()` see [our blog post][1].

Note: [The only available query with `as_count()` is `sum()`][4] (unless using a rollup summary), which is the only mathematical accurate function with such behavior.

## Rank
### top()

Select the top series responsive to a given query, according to some ranking method:

* a metric query string with some grouping, e.g. `avg:system.cpu.idle{*} by {host}`
* the number of series to be displayed, as an integer.
* one of `max`, `min`, `last`, `l2norm`, or `area`.  `area` is the signed area under the curve being graphed, which can be negative.  `l2norm` uses the <a href="http://en.wikipedia.org/wiki/Norm_(mathematics)#p-norm">L2 Norm</a> of the time series, which is always positive, to rank the series.
* either `desc` (rank the results in descending order) or `asc` (ascending order).

The `top()` method also has convenience functions of the following form, all of which take a single series list as input:

`[top, bottom][5, 10, 15, 20]_[mean, min, max, last, area, l2norm]()`

For example, `bottom10_min()` retrieves lowest-valued 10 series using the `min` metric.

### top_offset()

Similar to `top()`, except with an additional offset parameter that controls where in the ordered sequence of series the graphing starts.  
For example, an offset of 2 would start graphing at the number 3 ranked series, according to the chosen ranking metric.

## Count

### count_nonzero()

Count all the non-zero values for a given metric

### count_not_null()

Count all the non-null values for a given metric

## Regression
### robust_trend()
Fit a robust regression trend line using Huber loss:

The most common type of linear regression -- ordinary least squares (OLS) -- can be heavily influenced by a small number of points with extreme values. Robust regression is an alternative method for fitting a regression line; it is not influenced as strongly by a small number of extreme values. As an example, see the following plot.

{{< img src="graphing/miscellaneous/functions/robust-trend.png" alt="robust trend" responsive="true" popup="true" style="width:80%;">}}

The original metric is shown as a solid blue line. The purple dashed line is an OLS regression line, and the yellow dashed line is a robust regression line. The one short-lived spike in the metric leads to the OLS regression line trending upward, but the robust regression line ignores the spike and does a better job fitting the overall trend in the metric.

### trend_line()

Fit an ordinary least squares regression line through the metric values

### piecewise_constant()

Approximate the metric with a piecewise function composed of constant-valued segments

## Algorithms
### anomalies()
Overlay a gray band showing the expected behavior of a series based on past behavior; see our [anomaly Monitor][2] page for more info.
### outliers()
Highlight outliers series; see our [Outlier Monitor][3] page for more info.

[1]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing/
[2]: /monitors/monitor_types/anomaly
[3]: /monitors/monitor_types/outlier
[4]: /graphing/faq/as_count_validation
