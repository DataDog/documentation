---
title: Export RUM Events
kind: documentation
further_reading:
- link: "/real_user_monitoring/explorer/search/"
  tag: "Documentation"
  text: "Search for your events"
---

## Overview

You can use your RUM query in dashboards, monitors, and Datadog's RUM API. Copy, export, and download your aggregated search query in the [RUM Explorer][1]. 

{{< img src="real_user_monitoring/explorer/export/rum_explorer_export.png" alt="Export button in the right hand corner of the RUM Explorer" width="80%" >}}

Click the **Export** button on the right hand corner and select from the following options:

- Create a [saved view][2] of your RUM search as a starting point to learn how to explore RUM data and collaborate with your teammates.
- Export your search results to a [dashboard widget][3] for reporting or consolidation purposes.
- Export your search results to a [monitor][4] to trigger alerts on predefined thresholds.
- Copy your query as a cURL command to test it in the [RUM Explorer][5] and build custom reports using [Datadog APIs][6].
- Download your search results as a CSV file for individual RUM events and specific aggregations. You can export up to 5,000 individual RUM events with lists and up to 500 aggregations for timeseries, top lists, and table graphs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/explorer
[2]: /real_user_monitoring/explorer/saved_views/
[3]: /dashboards/
[4]: /monitors/create/types/real_user_monitoring/
[5]: /real_user_monitoring/explorer/
[6]: https://docs.datadoghq.com/api/latest/rum/
