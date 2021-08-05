---
title: Query Metrics
kind: documentation
description: Explore and dig into your database and query performance metrics
further_reading:
- link: "/database_monitoring/"
  tag: "Documentation"
  text: "Database Monitoring"
- link: "/integrations/postgres/"
  tag: "Documentation"
  text: "Postgres integration"
- link: "/integrations/mysql/"
  tag: "Documentation"
  text: "MySQL integration"
- link: "/database_monitoring/data_collected/"
  tag: "Documentation"
  text: "Data Collected"
- link: "/database_monitoring/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting"

  
---

{{< site-region region="us3,gov" >}} 
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

The Query Metrics view shows historical query performance for normalized queries. Visualize performance trends by infrastructure or custom tags such as data center availability zone, and get alerted for anomalies.

Shows top 200 normalized queries, that is top 200 total time running. See data_collected/#which-queries-are-tracked (one-off or very seldom-run fast queries don't get metrics aggregation, but you can probably find a snapshot of it represented in Query Samples, if it has been run once in the last 15 days)

## Filtering and grouping

Select source on at the top (postgres or mysql) and specify search (tags) and group by; or use facets

For Group by: example: host or cluster tag - filter to queries that are running on that cluster of db hosts

{{< img src="database_monitoring/dbm_qm_group_by_cluster.png" alt="Filter with cluster facet" style="width:100%;">}}

Group by up to three things (eg. cluster, host, datacenter) to get grouped sets of filtered results. 

{{< img src="database_monitoring/dbm_qm_group_by_three.png" alt="Grouping by three tags" style="width:100%;">}}

Click **View all queries in this group** to move that group-by into the Search field in the filter bar, filtering the page content to that search result.

## Filtering by facets

Facets on the left:
- core: unified service tagging facets (service), datacenter, host, env
- database facets: specific to db engine (postgres has db and user so you can filter queries by specific database and user)(mysql has schema)
- infrastructure tags

### Filtering the Query Metrics page to a single normalized query

Note key terminology `query_signature` is a hash of a normalized query - a query with the parameters normalized - provides an ID for the normalized query. Don't search on the `query` tag because tags are truncated at 200 chars and you might have different queries whose first 200 char are the same. 

An easy way to filter to a specific query is to click the query from the list, which opens its Query Details page, where you click **Filter to This Query**. This filters the Query Metrics page with the `query_signature`.

 ## Exploring the metrics

Varies by db (postgres or mysql)

both: requests, Average latency, Total time, Percent time
postgres also has: rows updated (update or delete statements) or returned (select statements) per query; also block metrics (shared/cached blocks, local blocks, temporary blocks for sorts) link to postgres docs?

- link to integration metrics collected tables, `postgresql.queries.*` and `mysql.queries.*` metrics

Sorting by clicking column heading

## Query details page

- Full text of query at top
- All tags associated with the query - come from the hosts that the query is running on - pulls in tags from each host that it runs on - Use to see what server the query is running on (screencap dbm_qd_tags.png)

{{< img src="database_monitoring/dbm_qd_tags.png" alt="Tags list for a query" style="width:100%;">}}

- Jump to Query Samples page with the **View Query Samples** button - link to Explore QS page - 
- Jump back to Query Metrics filtered by this query - **Filter by This Query** button

{{< img src="database_monitoring/dbm_qd_jump_buttons.png" alt="Quickly see query sample or metrics for this query" style="width:100%;">}}

For example, when looking at a query details, to find the hosts it's running on, click **Filter by This Query** and then group by hosts -- the metrics table shows each host it's running on. Maybe you'll see that a particular host is responsible for a large percentage of a query's execution (screencap dbm_qm_by_host_usecase.png). 

{{< img src="database_monitoring/dbm_qm_by_host_usecase.png" alt="A query's metrics grouped by host" style="width:100%;">}}

Or if a particular host tends to return a lot more rows, perhaps your sharding is unbalanced across the hosts.

### Graphs

this query vs. all queries except this query. Maybe this query's average latency is a lot higher than the avg of other queries, but also maybe it is requested a lot less often so you don't mind. How much of the database's time is it consuming when it does run, compared to all other queries?

### Explain plans

Not all queries have explain plans (e.g. configuration settings, the data isn't being collected, or is a type of query that doesn't have an explain).

Datadog collects explain plans continuously, so a given query can have multiple plans. Those plans are normalized and shown separately so that you can see if a query has plans that perform better or cost more than others. For example, the following shows two explain plans for a query, but the two plans perform rather similarly:

{{< img src="database_monitoring/dbm_qd_explain_plans.png" alt="Explain plans information for a query" style="width:100%;">}}

Select a plan to see cost metrics or its JSON. Click **View All Samples for This Plan** to jump over to Query Samples explorer for [the samples associated with it][1].

### Metrics graphs for all metrics

### Hosts running this query

Lists the hosts that run this query, with a context menu that lets you jump to other related information for the host, such as logs or the Network data, which can be very useful for troubleshooting where latency problems are coming from.

{{< img src="database_monitoring/dbm_qd_hosts_running_query_menu.png" alt="Host action menu for pivoting to more information" style="width:100%;">}}

## Database Monitoring dashboards

For quick access to dashboards that showcase database-related infrastructure and query metrics visualizations, click the **Dashboards** link at to top of the page. Use the out of the box dashboards, or clone and customize them to suit your needs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /database_monitoring/query_samples/#sample-details
