---
title: Log Explorer
kind: documentation
description: 'Search through all of your logs and perform Log Analytics'
aliases:
    - /logs/explore
    - /logs/patterns
    - /logs/graph
    - /logs/analytics
    - /logs/explorer/list
    - /logs/explorer/patterns
    - /logs/explorer/analytics
    - /logs/explorer/transactions/
further_reading:
    - link: 'logs/explorer/live_tail'
      tag: 'Documentation'
      text: 'Preview your logs in Live Tail'
    - link: 'logs/explorer/saved_views/'
      tag: 'Documentation'
      text: 'Automatically configure your Log Explorer'
    - link: 'https://www.datadoghq.com/blog/datadog-clipboard/'
      tag: Blog
      text: 'Add a Log Explorer url to your clipboard'
---

## Overview

The [**Log Explorer**][1] is your home base for log troubleshooting and exploration. Whether you start from scratch, from a [Saved View][2], or land here from any other context like monitor notifications or dashboard widgets, the Log Explorer iteratively search and filter, group, visualize, and export.


### Search and filter

**Search** and **Filter** on logs to narrow down, broaden, or shift your focus on a subset of logs tailored to your current interest.

  - To learn more about searching for logs in Log Explorer, see the [Search Logs documentation][3].
  - To start creating queries and using facets in Log Explorer, read the [Log Search Syntax documentation][4].
  - To learn more about how Watchdog Insights surface anomalous logs within your search context, read the [Log Anomaly Detection documentation][8].

### Group

**Group** queried logs into higher-level entities in order to derive or consolidate information. To begin identifying patterns and aggregating logs by subsets of events, see the [Group Logs documentation][5].

### Visualize

**Visualize** the outcome of filters and aggregations to put your logs into the right perspective and bubble up decisive information. For example, view your logs in a list, to organize log data into columns, or in a timeseries, to measure your log data over time. To start visualizing log data in the Log Explorer, see the [Create Log Visualizations documentation][6].

### Export

You can also **export** your Log Explorer view to reuse it later or in different contexts. See the [Export Logs documentation][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /logs/explorer/saved_views/
[3]: /logs/explorer/search
[4]: /logs/explorer/search_syntax/
[5]: /logs/explorer/group
[6]: /logs/explorer/visualize
[7]: /logs/explorer/export
[8]: /logs/explorer/insights
