---
title: Optimize
description: "Review recommendations that reduce the cost and duration of Spark and Databricks jobs, warehouse queries, and warehouses, and analyze query activity across your data warehouses."
further_reading:
    - link: '/data_observability/'
      tag: 'Documentation'
      text: 'Data Observability Overview'
    - link: '/data_observability/jobs_monitoring/'
      tag: 'Documentation'
      text: 'Jobs Monitoring'
    - link: '/data_observability/data_catalog/'
      tag: 'Documentation'
      text: 'Data Catalog'
    - link: '/cloud_cost_management/recommendations/'
      tag: 'Documentation'
      text: 'Cloud Cost Management Recommendations'
---

## Overview

Optimize collects the recommendations that Datadog generates to reduce the cost and duration of your data workloads. Datadog analyzes the jobs you monitor with [Jobs Monitoring][1] and the query history it collects from your data warehouses. It then recommends a specific change, such as a Spark configuration change, a smaller cluster, or a rewritten query. Each recommendation shows the estimated monthly savings, the evidence behind it, and the change to make.

To open Optimize, go to {{< ui >}}Data Observability{{< /ui >}} > {{< ui >}}Optimize{{< /ui >}}.

To investigate query cost and performance across your warehouses, use the [Queries page](#analyze-warehouse-queries).

## Recommendation types

### Job recommendations

Datadog generates job recommendations for:

- Spark jobs that you monitor with [Jobs Monitoring][1].
- Databricks jobs that you monitor with [Jobs Monitoring for Databricks][2].

Job recommendations address issues such as skew, spill, shuffle, idle executors, and memory configuration. The recommended change can be a code change, a configuration change, a cluster sizing change, or a combination of code and configuration changes.

For Databricks, Optimize also shows cluster recommendations from [Cloud Cost Management][3], such as downsizing overprovisioned all-purpose clusters.

### Query and warehouse recommendations

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Query and warehouse recommendations are in Preview.
{{< /callout >}}

Datadog generates query and warehouse recommendations from the query history and warehouse usage that it collects through your warehouse integrations.

| Platform | Query recommendations | Warehouse recommendations |
|---|---|---|
| [Snowflake][4] | Issues such as missing partition pruning, expensive joins, redundant scans, and inefficient filters. | Reduce `AUTO_SUSPEND` on idle warehouses, or downsize a warehouse. |
| [BigQuery][5] | Issues such as missing partition pruning, ineffective clustering, shuffle pressure, and slot contention. | Not available. |
| [Databricks][6] | Issues in SQL warehouse queries, such as missing file skipping, heavy shuffles, and low Photon utilization. | Reduce auto stop on idle SQL warehouses. |

A query recommendation can propose a SQL rewrite, a table layout change, or a change to the compute that runs the query.

## How Datadog generates recommendations

Datadog checks for new job and query recommendations once a week, and for new warehouse recommendations once a day. Each recommendation includes:

- **Estimated monthly savings**: The current monthly cost of the resource, the estimated cost after the change, and the percentage saved.
- **Estimated duration**: For recommendations that also reduce duration, the current and estimated duration.
- **Issue type**: The category of problem Datadog found, such as {{< ui >}}Skew{{< /ui >}} or {{< ui >}}Expensive join{{< /ui >}}.
- **Recommended change**: An explanation of the issue, the evidence Datadog used, and the change to make. Job recommendations can include the code change. Query recommendations include the query text.

### Recommendation life cycle

Datadog removes recommendations in {{< ui >}}For Review{{< /ui >}} that no longer apply:

- Datadog reanalyzes a Spark or Databricks job with an open recommendation when the job's cost changes significantly, such as after you apply the fix. If the reanalysis no longer finds the issue, Datadog removes the recommendation.
- Job recommendations expire after 90 days.
- Query recommendations expire after 30 days if the query no longer runs.
- Warehouse recommendations expire after seven days.

## Review recommendations

Optimize shows one platform at a time: {{< ui >}}Databricks{{< /ui >}}, {{< ui >}}Snowflake{{< /ui >}}, {{< ui >}}BigQuery{{< /ui >}}, or {{< ui >}}Spark{{< /ui >}}. If you've set up more than one of these platforms, select one from the platform selector.

The summary at the top of the page shows:

- {{< ui >}}Total potential savings{{< /ui >}}: The estimated yearly savings of the open recommendations.
- {{< ui >}}Total opportunities{{< /ui >}}: The number of open recommendations.
- The open recommendation with the highest estimated savings.

To narrow the list, use the filters:

- {{< ui >}}Resource{{< /ui >}}: The kind of resource, such as {{< ui >}}Job{{< /ui >}}, {{< ui >}}Query{{< /ui >}}, {{< ui >}}Warehouse{{< /ui >}}, or {{< ui >}}Cluster{{< /ui >}}. This filter appears for platforms that have more than one kind of resource.
- {{< ui >}}Issue type{{< /ui >}}: The category of problem.
- A grouping filter for the platform:
  - Databricks: {{< ui >}}Workspace{{< /ui >}} and {{< ui >}}Warehouse{{< /ui >}}
  - Snowflake: {{< ui >}}Account{{< /ui >}} and {{< ui >}}Warehouse{{< /ui >}}
  - BigQuery: {{< ui >}}Project{{< /ui >}}
  - Spark: {{< ui >}}Env{{< /ui >}}
- {{< ui >}}Filter by tag{{< /ui >}}: Any tag on the recommendation.

To choose the platform and filters that Optimize opens with, click {{< ui >}}Edit defaults{{< /ui >}}.

Snowflake recommendations report cost in credits. To show savings in dollars, set {{< ui >}}Savings display{{< /ui >}} to {{< ui >}}Dollars{{< /ui >}} and enter your cost per credit. Datadog stores the rate in your browser.

Recommendations also appear in other parts of Data Observability:

- In [Jobs Monitoring][1], the jobs and clusters tables include an {{< ui >}}Est. Monthly Savings{{< /ui >}} column. Click a value to see the recommendations for that job or cluster.
- On the [Queries page](#analyze-warehouse-queries), the {{< ui >}}Recommendations{{< /ui >}} tab opens Optimize for the selected platform. The query details panel lists the recommendations for that query.

### Apply a recommendation

Click a recommendation to open its details. From the details panel, apply the change in one of these ways:

- Click {{< ui >}}Copy fix prompt{{< /ui >}} to copy a prompt that describes the recommended change, then paste it into your coding agent.
- For job recommendations, click {{< ui >}}Fix with Bits{{< /ui >}} to have [Bits Code][7] start a session that makes the change. If a session for the recommendation already exists, the button opens it. The button reads {{< ui >}}View fix and create PR{{< /ui >}} until the session has a pull request, and {{< ui >}}View fix{{< /ui >}} after.

To use {{< ui >}}Fix with Bits{{< /ui >}}:

- Set up [Bits Code][8].
- Report the job's Git repository and commit on its spans with [Source Code Integration][9].

{{< ui >}}Fix with Bits{{< /ui >}} isn't available for cluster sizing changes.

### Track status

Change a recommendation's status in the {{< ui >}}Status{{< /ui >}} column of the table or in the details panel. Use the status tabs to see the recommendations in each status.

| Status | Description |
|---|---|
| {{< ui >}}For Review{{< /ui >}} | The default status for a new recommendation. |
| {{< ui >}}Reviewed{{< /ui >}} | You've looked at the recommendation but haven't acted on it yet. |
| {{< ui >}}Resolved{{< /ui >}} | You've applied the recommendation. |
| {{< ui >}}Ignored{{< /ui >}} | You've decided not to act on the recommendation. |

When you mark a recommendation {{< ui >}}Ignored{{< /ui >}}, Datadog asks for optional feedback.

## Get notified about new recommendations

A notification rule sends recommendations that match its scope to the recipients you choose. Datadog sends a notification when an analysis finds new recommendations. For the analysis schedule, see [How Datadog generates recommendations](#how-datadog-generates-recommendations).

1. On the Optimize page, click {{< ui >}}Notifications{{< /ui >}}.
2. Click {{< ui >}}Create New Notification{{< /ui >}}.
3. Under {{< ui >}}Set scope{{< /ui >}}, select the {{< ui >}}Platform{{< /ui >}}, {{< ui >}}Resource kind{{< /ui >}}, {{< ui >}}Issue type{{< /ui >}}, and {{< ui >}}Change type{{< /ui >}}. Leave a field empty to include all values. Optionally, filter by recommendation tags.
4. Under {{< ui >}}Choose Recipients{{< /ui >}}, add the recipients.
5. Click {{< ui >}}Create{{< /ui >}}.

To edit, pause, or delete a rule, click {{< ui >}}Notifications{{< /ui >}} and use the actions on the rule.

## Analyze warehouse queries

The Queries page shows the queries that run in your data warehouses. Use it to find failing and long-running queries, and to see which queries drive usage. It uses the query history that Datadog collects from your [Snowflake][4], [BigQuery][5], [Amazon Redshift][10], and [Databricks][6] integrations. Query history for [Amazon Athena][11] and [Microsoft Fabric Warehouse][12] is in Preview.

To open it, go to {{< ui >}}Data Observability{{< /ui >}} > {{< ui >}}Queries{{< /ui >}}. If more than one platform has query activity, select one from the platform selector.

The Queries page has these tabs:

- {{< ui >}}Overview{{< /ui >}}: Charts of the queries, grouped by a field that you choose:
  - {{< ui >}}Total usage{{< /ui >}}
  - {{< ui >}}Failing queries{{< /ui >}}
  - {{< ui >}}Longest running queries{{< /ui >}}

  For Databricks, choose a view. The {{< ui >}}SQL Warehouses{{< /ui >}} view shows warehouse status, query volume, and queued queries. The {{< ui >}}Queries{{< /ui >}} view shows the query charts.
- {{< ui >}}Explore{{< /ui >}}: A searchable table of normalized queries, with facets to filter them. For Snowflake, BigQuery, and Databricks, the {{< ui >}}Recommendations{{< /ui >}} column shows the number of active recommendations for each query.
- {{< ui >}}Recommendations{{< /ui >}}: Appears for Snowflake, BigQuery, and Databricks, and opens [Optimize](#review-recommendations) for that platform.

Click a query in the {{< ui >}}Explore{{< /ui >}} tab to open its details. The details panel shows the SQL text, charts of the query's runs over time, its recommendations, and its individual runs. It also lists the query's {{< ui >}}Input Tables{{< /ui >}} and {{< ui >}}Output Tables{{< /ui >}}.

For Databricks, the service principal needs access to query text. Otherwise, Databricks returns the query text as redacted. See [Grant access to query text][13].

### View the queries for a table

Tables from Snowflake, BigQuery, and Amazon Redshift have a {{< ui >}}Queries{{< /ui >}} tab in the [Data Catalog][14]. Select {{< ui >}}Reads{{< /ui >}} to see the queries that read from the table. Select {{< ui >}}Writes{{< /ui >}} to see the queries that write to it. Click {{< ui >}}View Query Explorer{{< /ui >}} to open these queries in the {{< ui >}}Explore{{< /ui >}} tab of the Queries page.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_observability/jobs_monitoring/
[2]: /data_observability/jobs_monitoring/databricks/
[3]: /cloud_cost_management/recommendations/
[4]: /data_observability/quality_monitoring/data_warehouses/snowflake/
[5]: /data_observability/quality_monitoring/data_warehouses/bigquery/
[6]: /data_observability/quality_monitoring/data_warehouses/databricks/
[7]: /bits_ai/bits_code/
[8]: /bits_ai/bits_code/setup/
[9]: /source_code/
[10]: /data_observability/quality_monitoring/data_warehouses/redshift/
[11]: /data_observability/quality_monitoring/data_lakes/amazon_athena/
[12]: /data_observability/quality_monitoring/data_warehouses/fabric/
[13]: /data_observability/quality_monitoring/data_warehouses/databricks/#step-3---grant-access-to-query-text
[14]: /data_observability/data_catalog/
