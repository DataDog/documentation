---
title: Monitor if a value is inside or outside a range
kind: guide
---

## Overview

If monitors supports to alert when a given value is above or below a given threshold, it is also possible to be notified if a given value is inside or outside of a given range.

### Metric Example

Let's imagine that a metric `a` reports discrete values from `0` to `10` representing a status and you want to be notified if the metric is not between `4` and `8`.
Mathematically, this is the same as saying that the difference between the metric and the center of the range (6) should never be more than 2. 

- `8 > a > 4` <=> `abs(6-a) < 2` <=> `abs(6-a) - 2 < 0`

To be notified if the value is outside the range, the monitor condition should be `abs(6-a) - 2 > 0`.

To be notified if the value is inside the range, the monitor condition should be `2 - abs(6-a) > 0`.

{{< img src="monitors/faq/monitor_range.png" alt="metric monitor on a range"  >}}

### Theoretical Example 

Let's assume the range is defined by `x > a > y` with `a` the metric in question. 

To be notified if the value is inside the range, the monitor condition should be: `abs((x-y/2) - a) - (x-y)/2 > 0`.

To be notified if the value is outside the range, the monitor condition should be: `(x-y)/2 - abs((x-y/2) - a) > 0`.

[Reach out to the Datadog support team][1] if you have any questions.

[1]: /help/
