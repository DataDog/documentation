---
title: The reason rollups should not be used in monitors
kind: guide
---

## Overview

This guide assumes you already know what rollups are. If you don't, check the [rollup documentation page][3].
It is strongly recommended to avoid using Rollups in [monitor queries][2], because of the possibility of misalignment between the rollup interval and the evaluation window of the monitor. 

**Rollups are aligned on UNIX time.** 

When using rollup functions, data is grouped into buckets which are always aligned with UNIX time. 
For example, when using `rollup(sum, 60)` on a set of points from `17:14 to 17:23`, then the following 1 minute buckets are be created: `17:14:00`, `17:15:00`, `17:16:00`, `17:17:00`, `17:18:00`, `17:19:00`, `17:20:00`, `17:21:00`, `17:22:00`, `17:23:00`.
Each bucket contains the sum of the values of all the points belonging to that bucket.

**Monitors evaluation intervals are not.**

Monitors are evaluated every minute always at the same second with intervals that might not be aligned with UNIX time.

**Leading to alignment problems.**

For instance, the evaluation might use points from `17:13:02 to 17:23:02`. In that case, the monitor won’t consider the `17:13:00` bucket since the start of the query (`17:13:02`) is after the start of the bucket (`17:13:00`). So using a rollup leads to ignoring all the points from `17:13:00 to 17:13:59`.
This is particularly problematic when the rollup period is close to the timeframe. 
For instance, if the rollup period is 1h and the evaluation timeframe is last 4h, the monitor might ignore up to 1 hour of points, which represent 25% of the total points that are present in that 4h timeframe.

**A simple solution: don't use rollups in monitors.**

## Example

A monitor is defined on a metric such as `max(last_10m):sum:aws.s3_getRequests{*}.rollup(sum, 60) < 1` and for that example let's assume that a point is sent every second. 
All the points have a value of 0 except one that is sent every 9min30s and has the value 100:

| Timestamp    | value       |
|--------------|-------------|
| 17:14:49     | 0           |
| 17:14:50     | 100         |
| 17:14:51     | 0           |
| ...          | 0           |
| 17:24:19     | 0           |
| 17:24:20     | 100         |
| 17:24:21     | 0           |
| ...          | 0           |

Given that the monitor timeframe is 10min and that a value of 100 is sent every 9min30s, one might expect this monitor to never trigger. 
However, due to how rollup works, this monitor actually will trigger as only one rollup bucket starting every 9min30s has a data point with a value of `100`.
To see that let’s look at the following table, with evaluation examples. As a reminder, monitors are evaluated every minute always at the same second:

| From         | To          | Rollup buckets (always aligned with UNIX time)                                                    | Result  | Result with no rollup|
|--------------|-------------|---------------------------------------------------------------------------------------------------|---------|----------------------|
| 17:13:02     | 17:23:02    |17:14:00, 17:15:00, 17:16:00, 17:17:00, 17:18:00, 17:19:00, 17:20:00, 17:21:00, 17:22:00, 17:23:00 |100 - OK | 100 - OK             |
| 17:14:02     | 17:24:02    |17:15:00, 17:16:00, 17:17:00, 17:18:00, 17:19:00, 17:20:00, 17:21:00, 17:22:00, 17:23:00, 17:24:00 |0 - ALERT| 100 - OK             |
| 17:15:02     | 17:25:02    |17:16:00, 17:17:00, 17:18:00, 17:19:00, 17:20:00, 17:21:00, 17:22:00, 17:23:00, 17:24:00, 17:25:00 |100 - OK | 100 - OK             |
| 17:16:02     | 17:26:02    |17:17:00, 17:18:00, 17:19:00, 17:20:00, 17:21:00, 17:22:00, 17:23:00, 17:24:00, 17:25:00, 17:26:00 |100 - OK | 100 - OK             |

Therefore we strongly advice **against using rollups in monitors** and let the monitor use the data contained within the `From` and `To`. 

## Troubleshooting

Need help? Contact [Datadog support][1].

[1]: /help/
[2]: /monitors/monitor_types/metric/
[3]: /dashboards/functions/rollup/#pagetitle
