---
title: How can I graph the percentage change between an earlier value and a current value?
aliases:
    - /graphing/faq/how-can-i-graph-the-percentage-change-between-an-earlier-value-and-a-current-value
---

If you want to visualize how a metric's values have changed in comparison to an earlier time period, do so by leveraging the [Timeshift functions][1]. You can capture a metric's value from an hour, day, week, or month before.

To calculate this, you can create a query such as this:

```text
((current_value - old_value) / old_value) * 100
```

Here's an example where you can see the percentage change of a system metric from one day ago to the present:

{{< img src="dashboards/faq/percentage_timeshift.png" alt="percentage timeshift" >}}

[1]: /dashboards/functions/timeshift/
