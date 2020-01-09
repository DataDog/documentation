---
title: Indexes
kind: documentation
description: Control the volume of logs indexed by Datadog
disable_toc: true
aliases:
  - /logs/dynamic_volume_control
further_reading:
- link: "logs/explorer/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "https://www.datadoghq.com/blog/logging-without-limits/"
  tag: "Blog"
  text: "Logging without Limits*"
---

Indexes are located on the [Configuration page][1] in the Indexes section. Double click on them or click on the *edit* button to see more information about the number of logs that were indexed in the past 3 days, as well as the retention period for those logs:

{{< img src="logs/indexes/index_details.png" alt="index details"  style="width:70%;">}}

You can use indexed logs for [faceted searching][2], [Log Analytics][3], [dashboarding][4], and [monitoring][5].

## Exclusion Filters

Index filters give dynamic control over what goes into your indexes. When set up, logs sampling is uniformly random, meaning the sampling has no impact on relative importance of each log. For example, if some logs were captured only for troubleshooting purposes, you may only want to index a given percentage of those logs with errors and warnings.

**Note**: If a log matches several exclusion filters, only the first exclusion filter rule is applied. A log is not sampled or excluded multiple times by different exclusion filters.

To define a new index filter, click on the "add" button:

{{< img src="logs/indexes/index_filters.png" alt="index filters"  style="width:70%;">}}

To configure an exclusion filter:

1. Define the name of your filter.
2. Define the query for logs to exclude from your index.
    **Note**: It is possible to use any attribute or tag in the index filter query, even those that are not facets. If you are filtering by non-faceted attributes or tags, be sure to hit "enter/return" from the query bar.
3. Define the sampling rate. Optionally, define the [attribute to sample on](#attribute-based-sampling) to ensure complete log information related to a given subset of transactions or traces.
4. Save the filter.

    {{< img src="logs/indexes/index_filter_details.png" alt="index filter details"  style="width:80%;">}}

#### Attribute based sampling

In order to ensure complete log information related to a given subset of transactions, sample on a specific attribute holding an ID, such as User, Session, Request Identifiers.
This feature operates on attribute's values rather than the log itself.

For example,`nginx` Web Access logs are very verbose, therefore sampling is needed.
In order to keep track of the 1% of users’ sessions, define a sampling on the `session_id` attribute for `nginx` logs:
  * All the logs related to the 1% of sessions are indexed: the information of these sessions is "complete",
  * The logs related to the remaining 99% of sessions are not indexed but are still available in livetail and archives.

{{< img src="logs/indexes/index_exclusion_on_attribute.png" alt="attribute-based sampling"  style="width:70%;">}}

**Note**: 

* By default, the log-based sampling is applied (exclusion percentage set on `all logs`).

* The attribute name must be prefixed by `@` (i.e. if the attribute is called `session_id`, in the exclusion filter it must be `@session_id`).

* The attribute-based sampling is recommended for high cardinality attributes (e.g. `session_id`, `trace_id`, etc.).

##### Sample all logs of a trace

Once [logs and traces are connected][10], a `Trace Id` attribute is automatically added in the logs.
In order to be able to sample those logs but make sure that for the chosen traces the full set of logs is indexed, an attribute-based exclusion filter should be set on the `Trace Id` attribute.

For example, setting exclude 60% of `Trace Id`, results in:
* 40% of all traces get all their related logs indexed.
* 60% of all traces have their logs not indexed but are still available in livetail and archives.

### Reorder filters

Order matters for exclusion filters. Contrary to how several pipelines can process a log, if a log matches several exclusion filters, only the first exclusion filter rule is applied.

Reorder your pipeline to make sure the proper exclusion filters apply to your log. For instance, you probably want to set up the filters ordered by least inclusive to most inclusive queries..

To reorder your exclusion filter, drag and drop them into your preferred order.

{{< img src="logs/indexes/reorder_index_filters.png" alt="reorder index filters"  style="width:80%;">}}

### Enable/Disable filters

If not all logs are worth indexing on a daily basis, they might still be important in certain situations.
Debug logs, for instance, are not always useful, but during complex troubleshooting or a production release, they can become very helpful.

Instead of changing your application logging level or using a complex internal filtering tool, you can change what is indexed directly with Datadog index filters.

Enable or disable them in one click on the Pipeline page:

{{< img src="logs/indexes/enable_index_filters.png" alt="enable index filters"  style="width:80%;">}}

### Set daily quota

You can set a daily quota to hard-limit the number of logs that are stored within an Index per day. This quota is applied for all logs that should have been stored (i.e after exclusion filters are applied).
Once the daily quota is reached, logs are no longer indexed but are still available in the [livetail][6], [sent to your archives][7], and used to [generate metrics from logs][8].

Update or remove this quota at any time when editing the Index:

{{< img src="logs/indexes/index_quota.png" alt="index details"  style="width:70%;">}}

**Note**: Indexes daily quotas reset automatically at 2:00pm UTC (4:00pm CET, 10:00am EDT, 7:00am PDT).

## Multi indexes

It is also possible to have multiple indexes with different retention periods (**currently in private beta**).
Logs enter the first index whose filter they match on, so it is important to order your indexes carefully.

For example, if you create a first index filtered to the `status:notice` attribute, a second index filtered to the `status:error` attribute, and a final one without any filter (the equivalent of `*`), all your notice logs would go to the first index, all your error logs to the second index, and the rest would go to the final one.

{{< img src="logs/indexes/multi_index.png" alt="Multi indexes"  style="width:70%;">}}

Multiple indexes also provide the ability to define access rules on the data contained in each index. [More information available in the role base access control documentation][9].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits is a trademark of Datadog, Inc.

[1]: https://app.datadoghq.com/logs/pipelines/indexes
[2]: /logs/explorer/?tab=facets#setup
[3]: /logs/explorer/analytics
[4]: /logs/explorer/analytics/#dashboard
[5]: /monitors/monitor_types/log
[6]: https://docs.datadoghq.com/logs/live_tail/#overview
[7]: https://docs.datadoghq.com/logs/archives/
[8]: https://docs.datadoghq.com/logs/logs_to_metrics/
[9]: /account_management/rbac
[10]: /tracing/advanced/connect_logs_and_traces/?tab=java
