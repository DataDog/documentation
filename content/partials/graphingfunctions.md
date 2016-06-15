
| Function | Description |
|----------|-------------|
|cumsum()| cumulative sum over visible time window |
| dt() | time delta between points |
| diff() | value delta between points |
| derivative() | 1st order derivative, diff / dt |
| rate() | 1st order derivate that skips non-monotonically increasing values |
| derived() | synonym for derivative |
| per_second() | synonym for rate |
| per_minute() | 60 * rate |
| per_hour() | 3600 * rate |
| ewma_3() | Exponentially Weighted Moving Average with a span of 3 |
| ewma_5() | EWMA with a span of 5 |
| ewma_10() | EWMA with a span of 10 |
| ewma_20() | EWMA with a span of 20 |
| median_3() | Median filter, useful for reducing noise, with a span of 3 |
| median_5() | Median with a span of 5 |
| median_7() | Median with a span of 7 |
| median_9() | Median with a span of 9 |
| abs() | Absolute value |
| log10() | Base-10 logarithm |
| log2() | Base-2 logarithm |
| hour_before() | Metric values from one hour ago |
| day_before() | Metric values from one day ago |
| week_before() | Metric values from one week ago |
| month_before() | Metric values from one month ago |
| top() | Select the top series responsive to a given query, according to some ranking method.  Takes four parameters shown below.
| top_offset() | Similar to <code>top()</code>, except with an additional offset parameter, which controls where in the ordered sequence of series the graphing starts.  For example, an offset of 2 would start graphing at the number 3 ranked series, according to the chosen ranking metric. |
{:.table}

**Top function parameters**

* a metric query string with some grouping, e.g. ```avg:system.cpu.idle{*} by {host}```
* the number of series to be displayed, as an integer.
* one of ```'max'```, ```'min'```, ```'last'```, ```'l2norm'```, or ```'area'```.  ```'area'``` is the signed area under the curve being graphed, which can be negative.  ```'l2norm'``` uses the <a href="http://en.wikipedia.org/wiki/Norm_(mathematics)#p-norm">L2 Norm</a> of the time series, which is always positive, to rank the series.
* either ```'desc'``` (rank the results in descending order) or ```'asc'``` (ascending order).

The ```top()``` method also has the following convenience functions, all of which take a single series list as input:

top5, top10, top15, top20
: Retrieves top-valued \[5, 10, 15, 20] series using the 'mean' metric.

top5_max, top10_max, top15_max, top20_max
: Retrieves top-valued \[5, 10, 15, 20] series using the 'max' metric.

top5_min, top10_min, top15_min, top20_min
: Retrieves top-valued \[5, 10, 15, 20] series using the 'min' metric.

top5_last, top10_last, top15_last, top20_last
: Retrieves top-valued \[5, 10, 15, 20] series using the 'last' metric.

top5_area, top10_area, top15_area, top20_area
: Retrieves top-valued \[5, 10, 15, 20] series using the 'area' metric.

top5_l2norm, top10_l2norm, top15_l2norm, top20_l2norm
: Retrieves top-valued \[5, 10, 15, 20] series using the 'l2norm' metric.

bottom5, bottom10, bottom15, bottom20
: Retrieves lowest-valued \[5, 10, 15, 20] series using the 'mean' metric.

bottom5_max, bottom10_max, bottom15_max, bottom20_max
: Retrieves lowest-valued \[5, 10, 15, 20] series using the 'max' metric.

bottom5_min, bottom10_min, bottom15_min, bottom20_min
: Retrieves lowest-valued \[5, 10, 15, 20] series using the 'min' metric.

bottom5_last, bottom10_last, bottom15_last, bottom20_last
: Retrieves lowest-valued \[5, 10, 15, 20] series using the 'last' metric.

bottom5_area, bottom10_area, bottom15_area, bottom20_area
: Retrieves lowest-valued \[5, 10, 15, 20] series using the 'area' metric.

bottom5_l2norm, bottom10_l2norm, bottom15_l2norm, bottom20_l2norm
: Retrieves lowest-valued \[5, 10, 15, 20] series using the 'l2norm' metric.

