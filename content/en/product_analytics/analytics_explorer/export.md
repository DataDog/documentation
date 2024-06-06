---
title: Export Product Analytics Events and Graphs
kind: documentation
further_reading:
- link: "/real_user_monitoring/explorer/search/"
  tag: "Documentation"
  text: "Search for your events"
- link: "/dashboards"
  tag: "Documentation"
  text: "Learn about Dashboards"
- link: "/notebooks"
  tag: "Documentation"
  text: "Learn about Notebooks"
- link: "/monitors"
  tag: "Documentation"
  text: "Learn about Monitors"
---

## Overview

You can use your Product Analytics query and visualization graphs in dashboards, monitors, and notebooks.

## Export the search query or visualization

You can copy, export, or download your aggregated search query and visualization graphs in the [Analytics Explorer][1].

{{< img src="product_analytics/export/export-more.png" alt="Export button in the right hand corner of the RUM Explorer" width="100%" >}}

Click the **More** button on the right hand corner and select an option from the dropdown menu:

- Copy your query as a cURL command to test it in the [Analytics Explorer][2] and build custom reports using [Datadog APIs][3].
- Export your search results to a [monitor][4] that triggers alerts on predefined thresholds.
- Export your search results to an [existing notebook][5] for reporting or consolidation purposes.
- Download your search results as a CSV file for individual RUM events and specific aggregations. You can export up to 5,000 individual RUM events with lists and up to 500 aggregations for timeseries, top lists, and table graphs.
- Generate a [new metric][6] using your search results, which you can then view in the Metrics Explorer.

Options available for some visualization types are not supported in others. For example, you cannot download a distribution graph into a CSV file.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/explorer
[2]: /real_user_monitoring/explorer/
[3]: https://docs.datadoghq.com/api/latest/rum/
[4]: /monitors/types/real_user_monitoring/
[5]: /notebooks/
[6]: /metrics/explorer/
