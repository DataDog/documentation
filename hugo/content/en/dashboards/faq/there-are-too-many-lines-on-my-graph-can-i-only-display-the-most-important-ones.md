---
title: There are too many lines on my graph, can I only display the most important ones?
aliases:
    - /graphing/faq/there-are-too-many-lines-on-my-graph-can-i-only-display-the-most-important-ones
---

## Problem

When using a grouped query there are sometimes too many lines displayed on the graph, and you might end up with something complicated to read, for example:

{{< img src="dashboards/faq/too_many_metrics_1.png" alt="too_many_metrics_1" >}}

... where you only need to focus on the hosts with high load values here.

## Solution

The top function is a good fit to display only the few relevant lines on the graph:

{{< img src="dashboards/faq/too_many_metrics_2.png" alt="too_many_metrics_2" >}}

See the [Top function documentation][1] for more details.

[1]: /dashboards/functions/rank/
