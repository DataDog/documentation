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
    - /logs/explorer/transactions/
further_reading:
    - link: logs/explorer/live_tail
      tag: Documentation
      text: Preview your logs in Live Tail
    - link: logs/explorer/saved_views/
      tag: Documentation
      text: Automatically configure your Log Explorer
    - link: "https://www.datadoghq.com/blog/datadog-clipboard/"
      tag: Blog
      text: Add a Log Explorer url to your clipboard
    - link: "https://www.datadoghq.com/blog/send-amazon-vpc-flow-logs-to-data-firehose-and-datadog/"
      tag: Blog
      text: Send Amazon VPC flow logs to Amazon Kinesis Data Firehose and Datadog  
---

## Overview

The [**Log Explorer**][1] is your home base for log troubleshooting and exploration. Whether you start from scratch, from a [Saved View][2], or land here from any other context like monitor notifications or dashboard widgets, you can search and filter, group, visualize, and export logs in the Log Explorer.

{{< img src="/logs/explore.png" alt="Explore your ingested logs" style="width:100%;">}}

## Search and filter

**Search** and **Filter** on logs to narrow down, broaden, or shift your focus on a subset of logs tailored to your current interest.

  - To learn more about searching for logs in the Log Explorer, read [Search Logs][3].
  - To start creating queries and using facets in the Log Explorer, read [Log Search Syntax][4].
  - To learn how [Watchdog Insights][9] surface anomalous logs and outliers in error logs within your search context, read [Watchdog Insights for Logs][5].

## Analyze

**Group** your queried logs into higher-level entities such as fields, patterns, and transactions in order to derive or consolidate information. 

To start identifying patterns and aggregating logs by subsets of events, see [Log Analytics][6].

## Visualize

**Visualize** the outcome of your filters and aggregations to better understand your logs and gather decisive information. For example, you can view your logs in a list to organize your log data into columns, or in a timeseries graph to measure your log data over time. 

To start visualizing log data in the Log Explorer, see [Log Visualizations][7].

## Export

You can also **export** your Log Explorer view to reuse it later or in different contexts. 

To learn how to export your log queries and visualizations, see [Export Logs][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /logs/explorer/saved_views/
[3]: /logs/explorer/search
[4]: /logs/explorer/search_syntax/
[5]: /logs/explorer/insights
[6]: /logs/explorer/analytics
[7]: /logs/explorer/visualize
[8]: /logs/explorer/export
[9]: /watchdog/insights