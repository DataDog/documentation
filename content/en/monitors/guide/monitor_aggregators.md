---
title: Monitor aggregators
disable_toc: false
further_reading:
- link: "https://docs.datadoghq.com/monitors/configuration/"
  tag: "Documentation"
  text: "Configure Monitors"
  
---
{{< jqmath-vanilla >}}

## Overview

{{< img src="monitors/guide/monitor_aggregators/aggregator_dropdown.png" alt="Dropdown under Monitor Configuration showing the four aggregators" style="width:100%;" >}}

Configure your monitor query to send alerts based on how the data is aggregated with one of the four aggregation methods: average, maximum, minimum, and sum. For this guide, take the same example metric values over a 10 minute evaluation window and apply the different aggregators to see how each monitor would react. 

{{< img src="monitors/guide/monitor_aggregators/metric_values_example.png" alt="Example metric values over a 10 minute evaluation window [10, 15, 12, 8, 11, 14, 13, 25, 37, 45, 50]" style="width:100%;" >}}

All the examples assume that:
- Queries are calculated with the [`classic_eval_path`][1].
- The monitor alerts when the values are *above* a certain threshold. 

## Average

The monitor takes the values in the evaluation window and calculates the average of all the data points. This average value is compared to the defined threshold. A common use case for this aggregator is checking if the metric data is too high or too low.

##### Example

You want a monitor to send a notification when the average over the past 10 minutes goes over 30. What state is the monitor in at minute 3:10?

$$(\10+15+12+8+11+14+13+25+37+45+50\)/10 = 24$$

##### Answer

**OK** state, this monitor is not going to alert.

## Maximum and above

The monitor takes the values in the evaluation window and compares **each value** against the defined threshold. If any single data point in the evaluation window is *above* the threshold, the monitor will alert. 

For monitors configured to alert when *below* the threshold, the behavior is reversed.

##### Example

1. You want a monitor to send a notification if at any point in the last 10 minutes the value of the metric is above 40. What state is the monitor in at minute 3:10?

2. You want a monitor to send a notification if at any point in the last 10 minutes the value of the metric is above 50. What state is the monitor in at minute 3:10?
 
##### Answer

1. **ALERT** state, the last two values in the past 10 minutes are 45 and 50. This monitor is going to alert.

2. **OK** state, the threshold is 50 and the last value is not above 50. This monitor is not going to alert.

## Minimum and above

The monitor takes the values in the evaluation window and compares **each value** against the defined threshold. All values in the window must be above the threshold. If the minimum value is *above* the threshold, that means all points in the window are also above the threshold. 

For monitors that are configured to alert when *below* the threshold, the behavior is reversed.

##### Example

You want a monitor to alert if the minimum metric value is above 10 at any point in the last 10 minutes. What state is the monitor in at minute 3:10?

##### Answer

**ALERT** state, the value at 3:01 (15) is above 10.

## Sum

The monitor takes the values in the evaluation window and compares **the sum value** against the defined threshold. This aggregator adds the value of each data point, not the number of data points. A use case would be for a metric that counts occurrences of errors or restarts. This is why *as_count()* metrics have to use the sum aggregator. For more information, see the [as_count() in monitor evaluations][2] guide.

##### Example

You want a monitor to send a notification when the sum of values over the past 10 minutes goes over 250. What state is this monitor in at minute 3:10?

$$10+15+12+8+11+14+13+25+37+45+50 = 240$$

##### Answer

**OK** state, this monitor is not going to alert.

## Visualizing aggregators

You can see different results depending on the aggregation method you are using in your query and your evaluation aggregation. The aggregation methods below use the the same metric. You can see how each method affects the way the metric is aggregated in a timeseries.

| Aggregation | Resulting graph | 
| ---  | ----------- | 
| Average (`avg by`): average value of the metric | {{< img src="monitors/guide/monitor_aggregators/AVG_aggregation.png" alt="Graph visualization of the metric aggregated by the average" style="width:100%;" >}} |
| Maximum (`max by`): maximum value of the metric | {{< img src="monitors/guide/monitor_aggregators/MAX_aggregation.png" alt="Graph visualization of the metric aggregated by the maximum value, visually shows higher values than the average graph" style="width:100%;" >}} |
| Minimum (`min by`): minimum value of the metric | {{< img src="monitors/guide/monitor_aggregators/MIN_aggregation.png" alt="Graph visualization of the metric aggregated by the minimum, visually shows lower values than the average and maximum graphs" style="width:100%;" >}} |
| Sum (`sum by`): total of all metric values added up | {{< img src="monitors/guide/monitor_aggregators/SUM_aggregation.png" alt="Graph visualization of the metric aggregated by the sum, visually shows higher values than the average and maximum graphs" style="width:100%;" >}} | 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/guide/as-count-in-monitor-evaluations/#2-ways-to-calculate
[2]: /monitors/guide/as-count-in-monitor-evaluations
