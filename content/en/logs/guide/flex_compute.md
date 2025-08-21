---
title: Monitor Flex Compute Usage
description: Learn how to monitor and optimize your Flex Logs compute usage through query performance metrics and visualizations
further_reading:
- link: "/logs/log_configuration/flex_logs/"
  tag: "Documentation"
  text: "Flex Logs"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Log Explorer"
---

## Overview

Monitor the usage of Flex compute through various graphs on the [Flex Logs Controls][1] page. Make informed decisions using data on cost-performance tradeoffs and balance operational success with financial efficiency.

{{< img src="/logs/guide/flex_compute/flex_compute_graphs_1.png" alt="Dashboard showing the query performance and compute size metrics, including query slowdowns, top sources of slowdowns, and compute usage over time" style="width:100%;" >}}

## Monitoring query performance

Flex compute is limited by two factors:
- The number of concurrent queries
- The maximum number of logs that can be scanned per query

Query slowdowns occur when the concurrent query limit is reached, and a query is retrying to find an available slot to run in. If an available slot is not found, the query will not run. Datadog displays an error message advising you to retry your query at a later time.

### Available metrics

- **Concurrent query utilization:** Shows the number of queries running at the same time and the available headroom. If usage reaches the maximum capacity, additional queries are throttled until a slot is available.
- **Slowdowns by day of the week:** Provides an overview of the percentage of query slowdowns by day, helping identify patterns in compute demand.
- **Top sources of slowdowns:** Breaks down whether delays originate from the Log Explorer, dashboards, or API queries, making it easier to target areas for optimization.
- **Drilldowns:** Click on a dashboard or user to open directly to the dashboard or the user history of Flex queries in [Audit Trail][2]. **Note**: Only Logs List queries are audited. This does not include queries used for visualizations, such as timeseries or toplist.

## Optimization recommendations

Use this information to optimize your usage.

1. **Reach out to outlier users to:**
   - Discuss their querying needs
   - Understand if there are logs they query frequently that should be stored in Standard Indexing instead
1. **Improve dashboards experiencing slowdowns by:**
   - Pausing the auto-refresh of dashboards
      {{< img src="/logs/guide/flex_compute/pause_dashboard.png" alt="Dashboard interface showing the pause auto-refresh button to stop automatic dashboard updates" style="width:90%;" >}}
   - Evaluating if logs used to power widgets can be converted into metrics to reduce the heavy Flex compute usage. For example, if dashboard widgets are only looking at a few "error" or "success" instances, but the logs themselves contain low information density, consider turning these logs into a metric
   - Organizing dashboard widgets into groups, and keeping the groups collapsed until needed. Widgets in a collapsed group do not load when the dashboard is opened
1. **Consider upgrading your Flex compute size** to increase the concurrent query limit if you notice sustained query slowdowns.
1. **Scope to the index** you are querying. If the logs you are querying belong to a specific index, scoping to that index can speed up your search.

To learn more about compute sizes, see the [Flex Logs][3] documentation.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines/flex-logs-controls
[2]: /account_management/audit_trail/#explore-audit-events
[3]: /logs/log_configuration/flex_logs/
