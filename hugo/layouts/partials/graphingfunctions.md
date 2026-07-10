
Function               | Category      | Description
-----------------------|---------------|-------------------
`abs()`                | Arithmetic    | absolute value
`log2()`               | Arithmetic    | base-2 logarithm
`log10()`              | Arithmetic    | base-10 logarithm
`cumsum()`             | Arithmetic    | cumulative sum over visible time window
`integral()`           | Arithmetic    | cumulative sum of (\[time delta] x \[value delta]) over all consecutive pairs of points in the visible time window
`.fill()`              | Interpolation | choose how to interpolate missing values
`hour_before()`        | Timeshift     | metric values from one hour ago
`day_before()`         | Timeshift     | metric values from one day ago
`week_before()`        | Timeshift     | metric values from one week ago
`month_before()`       | Timeshift     | metric values from one month ago
`per_second()`         | Rate          | the rate at which the metric changes per second
`per_minute()`         | Rate          | <code>per_second()</code> * 60
`per_hour()`           | Rate          | <code>per_second()</code> * 3600
`dt()`                 | Rate          | time delta between points
`diff()`               | Rate          | value delta between points
`derivative()`         | Rate          | 1st order derivative; <code>diff()</code> / <code>dt()</code>
`ewma_3()`             | Smoothing     | exponentially weighted moving average with a span of 3
`ewma_5()`             | Smoothing     | EWMA with a span of 5
`ewma_10()`            | Smoothing     | EWMA with a span of 10
`ewma_20()`            | Smoothing     | EWMA with a span of 20
`median_3()`           | Smoothing     | rolling median with a span of 3
`median_5()`           | Smoothing     | rolling median with a span of 5
`median_7()`           | Smoothing     | rolling median with a span of 7
`median_9()`           | Smoothing     | rolling median with a span of 9
`.rollup()`            | Rollup        | override default time aggregation type and time period; see the "Rollup" section below for details
`count_nonzero()`      | Count         | count all the non-zero values
`count_not_null()`     | Count         | count all the non-null values
`top()`                | Rank          | select the top series responsive to a given query, according to some ranking method; see the "Top functions" section below for more details
`top_offset()`         | Rank          | similar to `top()`, except with an additional offset parameter, which controls where in the ordered sequence of series the graphing starts. For example, an offset of 2 would start graphing at the number 3 ranked series, according to the chosen ranking metric.
`robust_trend()`       | Regression    | fit a robust regression trend line using Huber loss; see the "Robust regression" section below for more details
`trend_line()`         | Regression    | fit an ordinary least squares regression line through the metric values
`piecewise_constant()` | Regression    | approximate the metric with a piecewise function composed of constant-valued segments
`anomalies()`          | Algorithms    | overlay a gray band showing the expected behavior of a series based on past behavior; see our [guide to anomaly detection](/monitors/monitor_types/anomaly)
`outliers()`           | Algorithms    | highlight outlier series; see our [guide to outlier detection](/monitors/monitor_types/outlier)
`forecast()`           | Algorithms    | forecast metric series; see our [guide to forecasts](/monitors/monitor_types/forecasts)

**`.as_count()` & `.as_rate()`**

These functions are only intended for metrics submitted as rates or counters via statsd. These functions have no effect for other metric types. For more on details about how to use `.as_count()` and `.as_rate()` please see [our blog post](https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing/).

**Rollup**

`.rollup()` is recommended for expert users only. Appending this function to the end of a query allows you to control the number of raw points rolled up into a single point plotted on the graph. The function takes two parameters, method and time: `.rollup(method,time)`

The method can be sum/min/max/count/avg and time is in seconds. You can use either one individually, or both together like `.rollup(sum,120)`. We impose a limit of 350 points per time range. For example, if you're requesting `.rollup(20)` for a month-long window, we return data at a rollup far greater than 20 seconds in order to prevent returning a gigantic number of points.

**Top functions**

* a metric query string with some grouping, e.g. ```avg:system.cpu.idle{*} by {host}```
* the number of series to be displayed, as an integer.
* one of ```'max'```, ```'min'```, ```'last'```, ```'l2norm'```, or ```'area'```.  ```'area'``` is the signed area under the curve being graphed, which can be negative.  ```'l2norm'``` uses the <a href="http://en.wikipedia.org/wiki/Norm_(mathematics)#p-norm">L2 Norm</a> of the timeseries, which is always positive, to rank the series.
* either ```'desc'``` (rank the results in descending order) or ```'asc'``` (ascending order).

The ```top()``` method also has convenience functions of the following form, all of which take a single series list as input:

`[top, bottom][5, 10, 15, 20]_[mean, min, max, last, area, l2norm]()`

For example, ```bottom10_min()``` retrieves lowest-valued 10 series using the 'min' metric.

**Robust regression**

The most common type of linear regression -- ordinary least squares (OLS) -- can be heavily influenced by a small number of points with extreme values. Robust regression is an alternative method for fitting a regression line; it is not influenced as strongly by a small number of extreme values. As an example, see the following plot.

{{ partial "img.html" (dict "root" . "src" "robust-trend.png") }}

The original metric is shown as a solid blue line. The purple dashed line is an OLS regression line, and the yellow dashed line is a robust regression line. The one short-lived spike in the metric leads to the OLS regression line trending upward, but the robust regression line ignores the spike and does a better job fitting the overall trend in the metric.
