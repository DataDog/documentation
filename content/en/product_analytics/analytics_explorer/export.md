---
title: Export RUM Events and Graphs
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

You can use your RUM query and visualization graphs in dashboards, monitors, and notebooks, or programmatically search for events using the [Search RUM Events endpoint][1]. 

## Export the search query or visualization

You can copy, export, or download your aggregated search query and visualization graphs in the [RUM Explorer][2].

{{< img src="real_user_monitoring/explorer/export/rum-explorer-export-5.png" alt="Export button in the right hand corner of the RUM Explorer" width="100%" >}}

Click the **More** button on the right hand corner and select an option from the dropdown menu:

- Copy your query as a cURL command to test it in the [RUM Explorer][3] and build custom reports using [Datadog APIs][4].
- Export your search results to a [monitor][6] that triggers alerts on predefined thresholds.
- Export your search results to an [existing notebook][7] for reporting or consolidation purposes.
- Download your search results as a CSV file for individual RUM events and specific aggregations. You can export up to 5,000 individual RUM events with lists and up to 500 aggregations for timeseries, top lists, and table graphs.
- Generate a [new metric][5] using your search results, which you can then view in the Metrics Explorer.

Options available for some visualization types are not supported in others. For example, you cannot download a distribution graph into a CSV file.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/api/latest/rum/#search-rum-events
[2]: https://app.datadoghq.com/rum/explorer
[3]: /real_user_monitoring/explorer/
[4]: https://docs.datadoghq.com/api/latest/rum/
[5]: /metrics/explorer/
[6]: /monitors/types/real_user_monitoring/
[7]: /notebooks/
