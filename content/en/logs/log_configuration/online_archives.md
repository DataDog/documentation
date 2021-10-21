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
<div class="alert alert-warning">
  Online Archives is in private beta. To request access, contact <a href="/help/">Datadog Support</a>.</div>

Online Archives is an always-on observability warehousing solution that provides 15 months of storage, live query, and analytics capabilities for logs.

Security, Compliance, and Engineering teams often require access to data over an extended time. For example, it can be weeks, if not months, for a security breach to be detected; legal compliance reviews and audit processes may require log information stretching back more than a year, and Engineering teams conducting post-mortem analysis or troubleshooting support issues may need to look back at log data from many months before the incident itself. 

Using Online Archives, customers can retain and search all of their log data for 15 months. Security, Compliance, and Engineering teams can address use cases requiring historical investigation and analysis, like security audits, or analyze extra high-cardinality trends over long periods and correlate system forensics from metrics with application and user behavior from log data.

## Enabling Online Archives

Set up Online Archives per Log index. So [index filters][1] that apply to that index also apply to Online Archives. Note, however, that [index exclusion filters][2] don’t apply to Online Archives. 

You can configure Online Archive in the [Logs Index Configuration][3] page:

1. Go to [**Logs > Configuration > Indexes**][3].
2. Edit the index where you want to enable Online Archives.
3. Enable Online Archive in Step 3 of the index configuration.

{{< img src="logs/log_configuration/online_archives/enabling.png" alt="How to enable logs archives" style="width:100%;">}}

## Searching and Analytics in Online Archives

Select Online Archives from the dropdown in the Logs Explorer to begin searching in Online Archives instead of indexes. Find this dropdown next to the time picker.

{{< img src="logs/log_configuration/online_archives/searching.png" alt="How to search your online archive" style="width:100%;">}}

[Search][4] by typing in queries or switch to Analytics by either selecting **Group into Fields** or **Visualize as Timeseries/Top List/Table**. Setting the storage type to **Online Archives** lets you query Online Archives instead of indexes. You can switch this back to **indexes** at any time.

**Note:** Patterns and Transactions are not available in Online Archives.

## Selectively send logs to Online Archives and indexes

Users can configure the setup so that some logs go to Online Archives and others to indexes based on log attributes and tags. Users can mix and match logs between storage types depending upon their logging use cases and retention strategy.

To configure storage types,  use index filters that apply to Online Archives, and use index exclusion filters that don’t apply to Online Archives.

Here are examples of different log retention strategies and how to implement them:

### You want to retain all logs tagged with `team:security` in Online Archives but not in indexes

1. Create an index for security logs with filter `team:security`.
2. Enable Online Archives for this index.
3. Add an `*` exclusion filter on the index to filter out all logs from the index but not from the Online Archives.

{{< img src="logs/log_configuration/online_archives/exclusion.png" alt="How to exclude things from your online archive" style="width:100%;">}}

**Note:** Index order matters since `team:security` logs go into the first index that matches the index filter in case there are multiple indexes. 

### User wants to retain all logs in Online Archives and indexes except debug logs, which they want to sample at 10%

1. Create an index for all logs with filter `*`.
2. Enable Online Archives for this index.
3. Add an exclusion filter on the index `status:Debug` with an exclusion percentage set at 90%. This exclusion filter now only applies to the index.

{{< img src="logs/log_configuration/online_archives/retain.png" alt="How to exclude things from your online archive" style="width:100%;">}}

[1]: /logs/log_configuration/indexes/#indexes-filters
[2]: /logs/log_configuration/indexes/#exclusion-filters
[3]: https://app.datadoghq.com/logs/pipelines/indexes
[4]: https://app.datadoghq.com/logs
