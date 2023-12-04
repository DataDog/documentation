---
title: Uptime Calculations
kind: documentation
disable_toc: false
further_reading:
- link: "service_management/service_level_objectives/time_slice/"
  tag: "Documentation"
  text: "Time Slice SLOs"
---

{{< jqmath-vanilla >}}


## Overview

To calculate the uptime percentage for a Time-Slice SLOs, Datadog cuts the timeseries into equal-duration intervals, called "slices". The length of the interval is 5 minutes and not configurable. The space and time aggregation are determined by the metric query. For more information on space and time aggregation, see the [metrics][1] documentation for. 

For each slice, there is a single value for the timeseries, and the uptime condition (such as `value < 1`) is evaluated for each slice. If the condition is met, the slice is considered uptime, otherwise it is considered downtime.

## Groups and overall uptime

Time-Slice SLOs allows you to track uptime for individual groups, where groups are defined in the "group by" portion of the metric query. For example, you can track uptime by environment:

[INSERT IMAGES]

When groups are present, uptime is calculated for each individual group. However, overall uptime works very differently. In order to match existing monitor SLO functionality, time-slice SLOs use the same definition of overall uptime. When **all** groups have uptime, it is considered overall uptime. Conversely, if **any** group has downtime, it is considered overall downtime. Overall uptime is always less than the uptime for any individual group.

In the example above, environment "staging" has 5 minutes of downtime over a 24-hour period, resulting in approximately 99.652% of uptime.

$$ (1440-5)/1440 *100 = ~99.652% $$

Environment "dev" also had 5 minutes of downtime, resulting in the same uptime. That means that overall downtime (such as when either datacenter staging or dev had downtime) was 10 minutes since there is no overlap. This results in approximately 99.305% uptime.

$$ (1440-10)/1440 *100 = ~99.652% $$

## Corrections

Time-slice SLOs count correction periods as uptime in all calculations. Since the total time remains constant, the error budget is always a fixed amount of time as well. This is a significant simplification and improvement over how corrections are handled for monitor-based SLOs.

For monitor-based SLOs, corrections are periods that are removed from the calculation. If a one-day-long correction is added to a 7-day SLO, 1 hour of downtime counts as 0.7% instead of 0.6%

$$ 60/8640 *100 = ~0.7% $$

Instead of 

$$ 60/10080 *100 = ~0.6% $$

The effects on error budget can be unusual. Removing time from an uptime SLO causes time dilation, where each minute of downtime represents a larger fraction of the total time. 

## Missing data

In time-slice SLOs, missing data is always treated as uptime. If missing data is counted as downtime, the SLO product team would like to understand your use case better. Please contact the SLO product team. 

**Note**: While missing data is treated as uptime, it is gray on the timeline visualization.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/#time-and-space-aggregation