---
title: Online Archives
kind: documentation
description: Forward all your ingested logs to 15 month online storage.
is_beta: true
further_reading:
- link: "/logs/log_configuration/indexes/#indexes-filters"
  tag: "Documentation"
  text: "Index Filters"
- link: "/logs/log_configuration/indexes/#exclusion-filters"
  tag: "Documentation"
  text: "Exclusion Filters"
---
{{< site-region region="us3,us5,eu,gov" >}}

Online Archives is only available on the US1 Datadog [site][1].

[1]: https://docs.datadoghq.com/getting_started/site/

{{< /site-region >}}

{{< site-region region="us" >}}

<div class="alert alert-warning">
  Online Archives is in limited availibility. To request access, contact <a href="/help/">Datadog Support</a>.</div>

Online Archives is an log warehousing solution that provides 15 months of storage, live query, and analytics capabilities for your logs in Datadog.

Security, Compliance, and Engineering teams often need to query logs over large time windows. Security breaches are often detected after weeks, if not months, of an incident and legal compliance reviews and audit processes may require logs dating back more than a year. Engineering teams conducting high cardinality, year-over-year, long term analysis on millions of users are better served with logs over straight metrics. 

Online Archives allows you to retain and search all of your log data for 15 months. Security, Compliance, and Engineering teams can address use cases requiring historical investigation and analysis, like security audits, or analyze extra high-cardinality trends over long periods and correlate system forensics from metrics with application and user behavior from log data.

## Enabling Online Archives

Online Archives are set up per Log index. [Index filters][1] that apply to that index also apply to Online Archives. 

**Note**: However, that index's [exclusion filters][2] don’t apply to Online Archives.

Configure Online Archives in the [Logs Index Configuration][3] page:

1. Go to [**Logs > Configuration > Indexes**][3].
2. Edit the index you wish to enable with Online Archives.
3. Enable Online Archives in Step 3 of the index configuration.

{{< img src="logs/log_configuration/online_archives/enabling.png" alt="How to enable logs archives" style="width:100%;">}}

## Searching in Online Archives

Select Online Archives from the dropdown in the Logs Explorer to begin searching in Online Archives instead of indexes. Find this dropdown next to the time picker.

{{< img src="logs/log_configuration/online_archives/searching.png" alt="How to search your online archive" style="width:100%;">}}

[Search][4] by typing in queries in the search bar. 

## Analytics in Online Archives

Switch to Analytics by either selecting **Group into Fields** or **Visualize as Timeseries/Top List/Table**. 

Setting the storage type to **Online Archives** lets you query Online Archives instead of indexes. You can switch back to **Indexes** at any time.

## Selectively send logs to Online Archives and Indexes

You can configure the setup to send certain logs to Online Archives while others go to an index based on log attributes and tags. Mix and match logs between storage types depending upon your logging use cases and retention strategy.

To configure storage types, use index filters that apply to Online Archives, and use index exclusion filters that don’t apply to Online Archives.

Here are examples of different log retention strategies and how to implement them:

### Security team wants to retain thier logs in only Online Archives and none in Indexes

1. Create an index for security logs with filter `team:security`.
2. Enable Online Archives for this index.
3. Add an `*` exclusion filter on the index to filter out all logs from the index but not from the Online Archives.

{{< img src="logs/log_configuration/online_archives/exclusion.png" alt="How to exclude things from your online archive" style="width:100%;">}}

**Note:** Index order matters since `team:security` logs go into the first index that matches the index filter in case there are multiple indexes. 

### Engineering team wants to sample Debug logs in Indexes while retaining all logs in Online Archives

1. Create an index for all logs with filter `*`.
2. Enable Online Archives for this index.
3. Add an exclusion filter on the index `status:Debug` with an exclusion percentage set at 90%. This exclusion filter only applies to the index.

{{< img src="logs/log_configuration/online_archives/retain.png" alt="How to exclude things from your online archive" style="width:100%;">}}

**Note:** Dashboards, Log Monitors, Patterns and Transactions are not available in Online Archives.
{{< /site-region >}}

[1]: /logs/log_configuration/indexes/#indexes-filters
[2]: /logs/log_configuration/indexes/#exclusion-filters
[3]: https://app.datadoghq.com/logs/pipelines/indexes
[4]: https://app.datadoghq.com/logs
