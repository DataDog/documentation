---
title: Monitoring Ranges
---

## Overview

If a monitor supports alerting when a given value is above or below a given threshold, it is possible to be notified if a given value is inside or outside of a range.

## Examples
### Metric

Metric `a` reports discrete values from `0` to `10` representing a status and you want to be notified if the metric is not between `4` and `8`.
Mathematically, the difference between the metric and the center of the range (6) should never be more than 2. 

```
8 > a > 4 <=> abs(6-a) < 2 <=> abs(6-a) - 2 < 0
```

- To be notified if the value is outside the range, the monitor condition should be `abs(6-a) - 2 > 0`.
- To be notified if the value is inside the range, the monitor condition should be `2 - abs(6-a) > 0`.

{{< img src="monitors/faq/monitor_range.png" alt="metric monitor on a range" >}}

### Theoretical

A range is defined by `x > a > y` with `a` being the metric in question. 

- To be notified if the value is outside the range, the monitor condition should be: `abs(x - (x-y)/2 - a) - (x-y)/2 > 0`.
- To be notified if the value is inside the range, the monitor condition should be: `(x-y)/2 - abs(x - (x-y)/2 - a) > 0`.

## Troubleshooting

Need help? Contact [Datadog support][1].

[1]: /help/
