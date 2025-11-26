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
Want to query a data source is not available? Use this form to request access.
{{< /callout >}}

## Overview

With [DDSQL Editor][1], you can get deeper visibility into your infrastructure by querying your resources with natural language or with [DDSQL](#use-sql-syntax-ddsql), a dialect of SQL with additional support for querying tags.

{{< img src="/ddsql_editor/query-results-cloud-provider-host-count.png" alt="The result of a SQL query showing cloud provider host count on the DDSQL page in Datadog" style="width:100%;" >}}

## Query in natural language

Type your question into the search box, and Datadog builds the SQL query for you. You can accept or discard changes, and can provide feedback to help improve the feature.

{{< img src="ddsql_editor/natural-language-query-2.png" alt="A query inputted into the natural language search box" style="width:90%;" >}}

## Use SQL syntax (DDSQL)

DDSQL is a query language for Datadog data. It implements several standard SQL operations, such as `SELECT`, and allows queries against unstructured data, such as [tags][2]. Get exactly the data you want by writing your own `SELECT` statement. Query tags as if they are standard table columns. For more information, see the [DDSQL Reference][6].

{{< code-block lang="sql" >}}
SELECT instance_type, count(instance_type)
FROM aws.ec2_instance
WHERE tags->'region' = 'us-east-1' -- region is a tag, not a column
GROUP BY instance_type
{{< /code-block >}}

## Explore your telemetry

<div class="alert alert-danger">Querying Logs, Metrics, Spans, and RUM through DDSQL is in Preview. Use this <a href="https://www.datadoghq.com/product-preview/logs-metrics-support-in-ddsql-editor/">form</a> to request access.

If you want access to Spans, RUM, or other data sources not listed in the use cases section, mention them in the access request form.
</div>

View, filter, and built queries in the Data Explorer.

{{< img src="/ddsql_editor/data-tab-available-tables.png" alt="Side panel showing a list of available tables for querying in the DDSQL Editor" style="width:90%;" >}}

Click a table name to view its columns and relationships:

{{< img src="ddsql_editor/data-tab.png" alt="The data tab showing table information for aws.ec2_instance" style="width:70%;" >}}

For data sources such as Logs, use the query builder to generate table functions.

## Save and share queries

Save useful queries for future reference or download the data as CSV.

{{< img src="/ddsql_editor/save_export.png" alt="DDSQL Editor interface showing query results with save and export options highlighted" style="width:90%;" >}}

Export a saved query to a dashboard by clicking **Save to Dashboard**. From a dashboard you can visualize results and send Scheduled Reports.

Browse and re-run recent or saved queries in the side panel.

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
