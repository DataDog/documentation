---
title: DDSQL Editor
description: "Query infrastructure resources and telemetry data using natural language or DDSQL syntax with support for tags as table columns."
aliases:
- /dashboards/ddsql_editor/
- /ddsql_editor/getting_started/
further_reading:
- link: "ddsql_reference/ddsql_default"
  tag: "Documentation"
  text: "DDSQL Reference"
- link: "https://www.datadoghq.com/blog/advanced-analysis-tools/"
  tag: "Blog"
  text: "Explore your data with Sheets, DDSQL Editor, and Notebooks for advanced analysis in Datadog"
---

{{< callout url="https://www.datadoghq.com/product-preview/additional-advanced-querying-data-sources/" header="Advanced Data Sources">}}
If you want to query data sources not yet available, use the following form to submit your request. For a full list of supported data sources, see the <a href="/ddsql_reference/data_directory/">Data Directory</a>.
{{< /callout >}}

## Overview

With [DDSQL Editor][1], you can get deeper visibility into your telemetry by querying your resources with natural language or with [DDSQL](#use-sql-syntax-ddsql), a dialect of SQL with additional support for querying tags.

You can also export the results of a DDSQL query to visualize in a Dashboard or Notebook or to automate in a Datadog Workflow through [DDSQL Action](#save-and-share-queries).

{{< img src="/ddsql_editor/query-results-avg-cpu-usage-by-host.png" alt="The result of a SQL query showing average CPU usage by host on the DDSQL page in Datadog" style="width:100%;" >}}

## Query in natural language

Type your question into the search box, and Datadog builds the SQL query for you. You can accept or discard changes, and can provide feedback to help improve the feature.

{{< img src="ddsql_editor/natural-language-query-2.png" alt="A query inputted into the natural language search box" style="width:90%;" >}}

## Use SQL syntax (DDSQL)

[DDSQL][6] is a query language for Datadog data. It implements several standard SQL operations, such as `SELECT`, and allows queries against unstructured data, such as [tags][2]. Get exactly the data you want by writing your own `SELECT` statement. Query tags as if they are standard table columns. For more information, see the [DDSQL Reference][6].

{{< code-block lang="sql" >}}
SELECT instance_type, count(instance_type)
FROM aws.ec2_instance
WHERE tags->'region' = 'us-east-1' -- region is a tag, not a column
GROUP BY instance_type
{{< /code-block >}}

## Explore your telemetry

View, filter, and built queries in the Data Explorer.

Click a table name to view its columns and relationships:

{{< img src="ddsql_editor/data-tab.png" alt="The data tab showing table information for aws.ec2_instance" style="width:70%;" >}}

For data sources such as Logs, use the query builder to generate table functions.

## Save and share queries

Save useful queries for future reference or download the data as CSV. Browse and re-run recent or saved queries in the side panel.

{{< img src="/ddsql_editor/save-and-actions.png" alt="DDSQL Editor interface showing query results with save and actions downdown highlighted" style="width:90%;" >}}

Export the results of a saved query to:
- A Dashboard or Notebook for visualization and reporting
- Automate using a [DDSQL Action](https://app.datadoghq.com/actions/action-catalog#com.datadoghq.dd/com.datadoghq.dd.ddsql/com.datadoghq.dd.ddsql.tableQuery) in a Datadog Workflow, with which you can:
  - [Create a custom metric from a DDSQL query](https://app.datadoghq.com/workflow/blueprints/create-a-metric-from-a-ddsql-query)
  - [Programmatically export the results of a DDSQL query](https://app.datadoghq.com/workflow/blueprints/export-ebs-volumes-not-in-ddsql-as-s3-csv)
  - [Schedule a Slack message for checking compliance of resources](https://app.datadoghq.com/workflow/blueprints/idle-compute-check-via-ddsql-with-slack-updates)
- Alert on a DDSQL query in Preview (Logs, Metrics, RUM, Spans, and Product Analytics only; [contact support][8] for access)

{{< img src="/ddsql_editor/queries-tab-recent-queries.png" alt="Side panel showing the Queries tab with a list of saved and recent queries in the DDSQL Editor" style="width:70%;" >}}

## Permissions

To access the DDSQL Editor app, users need the `ddsql_editor_read` permission. This permission is included in the Datadog Read Only Role by default. If your organization uses custom roles, add this permission to the appropriate role. For more information on managing permissions, see the [RBAC documentation][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ddsql/editor
[2]: /ddsql_reference/ddsql_default/#tags
[3]: /account_management/rbac/
[4]: /bits_ai
[5]: /help/
[6]: /ddsql_reference/ddsql_default/
[7]: https://docs.datadoghq.com/ddsql_editor/#save-and-share-queries
[8]: /help/