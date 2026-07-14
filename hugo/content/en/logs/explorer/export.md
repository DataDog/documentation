---
title: Export Logs
description: 'Export your Log Explorer view to reuse it later or in different contexts.'
aliases:
    - /logs/export
further_reading:
    - link: 'logs/explorer/search'
      tag: 'Documentation'
      text: 'Learn how to filter logs'
    - link: 'logs/explorer/analytics'
      tag: 'Documentation'
      text: 'Learn how to group logs'
    - link: 'logs/explorer/visualize'
      tag: 'Documentation'
      text: 'Create visualizations from logs'
---

## Overview

At any moment, and depending on your current aggregation, **export** or **save** your log exploration as a:

- [{{< ui >}}Saved View{{< /ui >}}][1] to use as an investigation starting point for future-yourself or your teammates.
- [{{< ui >}}Dashboard widget{{< /ui >}}][2] or [{{< ui >}}Notebooks widget{{< /ui >}}][8] for reporting or consolidation purposes.
- [{{< ui >}}Monitor{{< /ui >}}][3] to trigger alerts on predefined thresholds.
- [{{< ui >}}Metric{{< /ui >}}][4] to aggregate your logs into long term KPIs, as they are ingested in Datadog.
- {{< ui >}}cURL command{{< /ui >}} to test your queries in the Log Explorer and then build custom reports using [Datadog APIs][5].
- {{< ui >}}CSV{{< /ui >}} (for individual logs and transactions). You can export up to 100,000 logs at once for individual logs, 300 for Patterns, and 500 for Transactions. You can also download a timeseries, top list, or table view as a CSV file.
- {{< ui >}}Share{{< /ui >}} View: Share a link to the current view with your teammates through email, Slack, and more. See all of the [Datadog notification integrations][6] available for this feature.

{{< img src="logs/explorer/export3.png" alt="Search Filter" style="width:100%;" >}}

You can also save individual logs to a notebook by selecting {{< ui >}}Save to notebook{{< /ui >}} in the log event side panel. Logs saved to notebooks are displayed in a reader-friendly format, and this display is saved in the Notebook even after the log event itself has aged out of retention.

{{< img src="logs/explorer/save_logs_to_notebooks.png" alt="Save logs to notebooks" style="width:80%;" >}}

To retrieve a log list longer than the maximum 1000 logs limit returned by the Logs API, use [the pagination feature][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/saved_views/
[2]: /dashboards/
[3]: /monitors/types/log/
[4]: /logs/logs_to_metrics
[5]: /api/latest/logs/
[6]: /integrations/#cat-notification
[7]: /logs/guide/collect-multiple-logs-with-pagination/?tab=v2api
[8]: /notebooks/
