---
title: Export Logs
kind: documentation
description: 'Export your Log Explorer view to reuse it later or in different contexts.'
aliases:
    - /logs/explorer/export
    - /logs/export
further_reading:
    - link: 'logs/explorer/search'
      tag: 'Documentation'
      text: 'Filter logs'
    - link: 'logs/explorer/group'
      tag: 'Documentation'
      text: 'Group queried logs'
    - link: 'logs/explorer/visualize'
      tag: 'Documentation'
      text: 'Create visualizations from logs'
---

At any moment, and depending on your current aggregation, **export** your log exploration as a:

- [**Saved View**][1] to use as an investigation starting point for future-yourself or your teammates.
- [**Dashboard widget**][2] for reporting or consolidation purpose.
- [**Monitor**][3] to trigger alerts on predefined thresholds.
- [**Metric**][4] to aggregate your logs into long term KPIs, as they are ingested in Datadog.
- **cURL command** to test your queries in the Log Explorer and then build custom reports using [Datadog APIs][5].
- **CSV** (for individual logs and transactions). You can export up to 5,000 logs at once for individual logs, 500 for Transactions.
- **Share** View: Share a link to the current view with your teammates through email, Slack, and more. See all of the [Datadog notification integrations][6] available for this feature.

{{< img src="logs/explorer/export2.png" alt="Search Filter" style="width:100%;" >}}

You can also export your Log Explorer view to reuse later or in different contexts. For example, download a List view or Table view in a CSV file to do offline processing of your logs or share the results of your query with your teammates.

To retrieve a log list longer than the maximum 1000 logs limit returned by the Logs API, use [the pagination feature][7].

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/saved_views/
[2]: /dashboards/
[3]: /monitors/create/types/log/
[4]: /logs/logs_to_metrics
[5]: /api/latest/logs/
[6]: /integrations/#cat-notification
[7]: /logs/guide/collect-multiple-logs-with-pagination/?tab=v2api
