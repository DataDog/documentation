---
title: How can I graph the percentage change between an earlier value and a current value?
kind: faq
---

If you want to visualize how a metric's values have changed in comparison to an earlier time period, do so by leveraging the Timeshift functions [detailed in the Timeshift function documentation][1]. You can capture a metric's value from an hour, day, week, or month before.

To calculate this, you can create a query such as this:
```
((current_value - old_value) / old_value) * 100
```

Here's an example where we can see the percentage change of a system metric from one day ago to the present:

{{< img src="graphing/faq/percentage_timeshift.png" alt="percentage timeshift" responsive="true" >}}

[1]: /graphing/functions/timeshift
