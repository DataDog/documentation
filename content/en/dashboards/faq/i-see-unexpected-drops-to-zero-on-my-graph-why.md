---
title: I see unexpected drops to zero on my graph, why?
kind: faq
aliases:
    - /graphing/faq/i-see-unexpected-drops-to-zero-on-my-graph-why
---

With stacked series ("Graph theses queries as a; b") or grouped queries ("avg by host"), there are several metric lines on the same graph and you may occasionally see some graph lines dropping back to 0:

{{< img src="dashboards/faq/drop_to_zero.png" alt="drop to zero"  >}}

You can see from the graph legend "N/A" (or by graphing the series alone in a graph) that there is actually no data at these times.

Instead of displaying nothing, the system displays 0s and this really improves the visualization for:

* Graphs using the bars visualization.
* Series that only have 1 value within the timeframe of the graph (a single value is not visible at all) (2. on the graph above).
* Detecting when a series stops reporting data when there are many series on the same graph (1. on the graph above).

This feature might be changed in the future. If you find it confusing you may use the following solutions to reduce its visual impact (short data gaps only):

* "grouped by" queries only: increase the [fill interpolation][1] timeframe
* all multi-line graphs: increase the [rollup][1] interval.

[1]: /dashboards/functions/interpolation/
