---
title: Online Archives
kind: documentation
description: Cost effective live query capabilities over long term retention of Logs
private: true
further_reading:
- link: "/logs/log_configuration/indexes/#indexes-filters"
  tag: Documentation
  text: Index Filters
- link: "/logs/log_configuration/indexes/#exclusion-filters"
  tag: Documentation
  text: Exclusion Filters
- link: "https://www.datadoghq.com/blog/online-archives-datadog/"
  tag: Blog
  text: Historical log analysis and investigation with Online Archives
algolia:
  tags: [online archives]
---

<div class="alert alert-warning">
Online Archives is in limited availability. To request access, contact <a href="/help/">Datadog Support</a>.
</div>

## Overview

Online Archives is a log warehousing solution that provides 15 months or more of storage, live query, and analytics capabilities for your logs in Datadog.

Security, Compliance, and Engineering teams often need to query logs over large time windows. Security breaches are often detected after weeks, if not months, of an incident and legal compliance reviews and audit processes may require logs dating back more than a year. Long term analysis requirements are not limited to just security teams however. Engineering teams conducting high cardinality, year-over-year, long term analysis on millions of entities like users, hosts, IP addresses etc are better served with logs over straight metrics.

Online Archives allows you to retain and search all of your log data for 15 months or more. Security, Compliance, and Engineering teams can address use cases requiring historical investigation and analysis, like security audits, or analyze extra high-cardinality trends over long periods and correlate system forensics from metrics with application and user behavior from log data.

## Enabling Online Archives

Online Archives are set up per Log index. [Index filters][1] that apply to that index also apply to Online Archives.

**Note**: However, that index's [exclusion filters][2] and daily quotas don't apply to Online Archives. For instance you may only choose to Index error logs while retaining all logs in Online Archives by excluding non error logs from Indexes.

Configure Online Archives in the [Logs Index Configuration][3] page:

1. Go to [**Logs > Configuration > Indexes**][3].
2. Edit the index you wish to enable with Online Archives.
3. Enable Online Archives in Step 3 of the index configuration.

{{< img src="logs/log_configuration/online_archives/enabling.png" alt="How to enable logs archives" style="width:100%;">}}

## Searching in Online Archives

Select Online Archives from the dropdown in the Logs Explorer to begin searching in Online Archives instead of indexes. Find this dropdown next to the time picker. You can adjust the time picker by selecting pre-set options, up to 3 months, or by selecting the calendar view to search further back in time.


{{< img src="logs/log_configuration/online_archives/searching.png" alt="How to search your online archive" style="width:100%;">}}

[Search][4] by typing in queries in the search bar or by selecting the relevant facet in the facet panel.

**Notes**: 
- You cannot export online archive logs to Dashboards, Notebooks, or Monitors.
- The Transactions and Patterns view is not available for Online Archives.

## Analytics in Online Archives

Switch to Analytics by either selecting **Group into Fields** or **Visualize as Timeseries/Top List/Table**.

Setting the storage type to **Online Archives** lets you query Online Archives instead of indexes. You can switch back to **Indexes** at any time.

## Selectively send logs to Online Archives and Indexes

You can configure the setup to send certain logs to Online Archives while others go to an index based on log attributes and tags. Mix and match logs between storage types depending upon your logging use cases and retention strategy.

To configure storage types, use index filters that apply to Online Archives, and use index exclusion filters that don't apply to Online Archives.

Here are examples of different log retention strategies and how to implement them:

### Engineering team wants to sample Debug logs in Indexes while retaining all logs in Online Archives

1. Create an index for all logs with filter `*`.
2. Enable Online Archives for this index.
3. Add an exclusion filter on the index `status:Debug` with an exclusion percentage set at 90%. This exclusion filter only applies to the index.

{{< img src="logs/log_configuration/online_archives/retain.png" alt="How to exclude things from the index" style="width:100%;">}}

### Security team wants to retain all their logs in Online Archives but none in Indexes

1. Create an index for security logs with filter `team:security`.
2. Enable Online Archives for this index.
3. Add a `*` exclusion filter on the index to filter out all logs from the Index but not from the Online Archives.

{{< img src="logs/log_configuration/online_archives/exclusion.png" alt="How to exclude things from the index" style="width:100%;">}}

### Disabling Online Archives
Select the index where you want to turn off Online Archives and then switch the Online Archives toggle to the OFF position.

**Note:** Index order matters since `team:security` logs go into the first index that matches the index filter in case there are multiple indexes.

[1]: /logs/log_configuration/indexes/#indexes-filters
[2]: /logs/log_configuration/indexes/#exclusion-filters
[3]: https://app.datadoghq.com/logs/pipelines/indexes
[4]: https://app.datadoghq.com/logs

