---
title: Reference Tables in DDSQL (Preview)
private: true
aliases:
- /ddsql_editor/reference_tables/
further_reading:
- link: "/integrations/guide/reference-tables/"
  tag: "Documentation"
  text: "Add Custom Metadata with Reference Tables"
---

{{< callout url="https://datadoghq.com/private-beta/ddsql-editor">}}
The DDSQL Editor is in Preview.
{{< /callout >}}

<div class="alert alert-danger">
  There are two different <strong>variants</strong> of DDSQL. The examples in this guide use DDSQL (Preview) Syntax. See the syntax documented in <a href="/ddsql_reference/">DDSQL Reference</a>.
</div>

# Overview

Reference Tables allow you to combine metadata with information already in Datadog. These tables store predefined sets of information that can be easily referenced within your queries, reducing complexity and enhancing query performance. With DDSQL you can query and join reference tables with other tables to expand your analytical insights.

For more information on adding reference tables, see the [Reference Tables documentation][1].

## Querying reference tables

You can query reference tables directly with the DDSQL Editor. This guide aims to clarify how you can unlock the full potential of reference tables in your data queries.

### Example query syntax

To query a reference table, you can use the following syntax. Assume the reference table is named "test":

```sql
SELECT * FROM reference_tables.test
```

This query retrieves all the data from the specified reference table. Modify the query to include specific columns or conditions as needed.

### Joining data

In addition to querying reference tables, you can also join them with other available tables. By joining reference tables, you can:

- Combine reference data with live data to enhance your reports and dashboards.
- Integrate static and dynamic data for comprehensive analytics.

Here's an example of joining a reference table with another table:

```sql
SELECT a.table_name, b.table.version
FROM reference_tables.test a
  JOIN other_table b ON a.key = b.key
ORDER BY b.table_version DESC;
```

## Best practice

Regularly update reference tables to ensure data accuracy.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/guide/reference-tables/
