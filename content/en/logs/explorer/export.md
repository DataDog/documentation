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

- [**Saved View**][1] to use as an investigation starting point for future-yourself or your teammates
- [**Dashboard widget**][2] for reporting or consolidation purpose
- [**Monitor**][3] to trigger alerts on predefined thresholds
- [**Metric**][4] to aggregate your logs into long term KPIs, as they are ingested in Datadog
- **CSV** (for individual logs and transactions). You can export up to 5,000 logs at once for individual logs, 500 for Transactions.
- **Share** View: Share a link to the current view with your teammates through email, Slack, and more. See all of the [Datadog notification integrations][5] available for this feature.

{{< img src="logs/explorer/export.png" alt="Search Filter" style="width:100%;" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/saved_views/
[2]: /dashboards/
[3]: /monitors/create/types/log/
[4]: /logs/logs_to_metrics
[5]: /integrations/#cat-notification
