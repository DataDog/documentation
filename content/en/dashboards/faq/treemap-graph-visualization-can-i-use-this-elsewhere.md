---
title: Treemap graph/visualization - can I use this elsewhere?
kind: faq
aliases:
    - /graphing/faq/treemap-graph-visualization-can-i-use-this-elsewhere
---

The treemap visualization found on the Host Dashboards comes from the output of `ps auxww`. This is not continuously run on your hosts. Instead, it's run once on Agent start/restart.

The processes are parsed into the names you see in the Agent in the Processes class, defined in:

https://github.com/DataDog/dd-agent/blob/master/checks/system/unix.py

The treemap is only supported for process data on a single host dashboard—this may not be reused in other dashboards or for other metrics.

If you're interested in visualizing process data outside of the treemap (and have it continuously updated), use the [Process Integration][1].
**Note**: This integration does not support wildcards, so explicitly define each process you'd like to monitor. To display process stats, leverage a [top list][2]—or, if you're monitoring a large number of processes across a large number of hosts, use the [heatmap][3].

[1]: /integrations/process/
[2]: https://www.datadoghq.com/blog/easy-ranking-new-top-lists
[3]: https://www.datadoghq.com/blog/detecting-outliers-cloud-infrastructure-datadog-heatmaps
