---
title: Reference Tables in DDSQL
further_reading:
- link: "/integrations/guide/reference-tables/"
  tag: "Documentation"
  text: "Add Custom Metadata with Reference Tables"
---

# Overview

Reference tables are an essential feature within DDSQL, designed to help you organize and simplify your data queries. These tables store predefined sets of information that can be easily referenced within your queries, reducing complexity and enhancing query performance. In addition to querying data, you can join reference tables with other datasets, expanding your analytical capabilities and insights.

For more information on adding reference tables, see the [Reference Tables Documentation](1).

## Querying Reference Tables

You can query reference tables directly with the DDSQL Editor. This guide aims to clarify how you can unlock the full potential of reference tables in your data queries.

### Example Query Syntax

To query a reference table, you can use the following syntax. Assume the reference table is named "test":

```sql
SELECT * FROM reference_tables.test
```

This query retrieves all the data from the specified reference table. Modify the query to include specific columns or conditions as needed.

### Joining Data

In addition to querying reference tables, you can also join them with other available datasets. This process allows for richer data analysis and insights. By joining reference tables, you can:

- Combine reference data with live data to enhance your reports and dashboards.
- Integrate static and dynamic data for comprehensive analytics.

Here's a simple example of joining a reference table with another dataset:

```sql
SELECT a.dataset_name, b.dataset.version
FROM reference_tables.test a
  JOIN other_dataset b ON a.key = b.key
ORDER BY b.dataset_version DESC;
```

## Notes and Best Practices

When using reference tables, consider the following:

- **Keep Tables Updated**: Regularly update reference tables to ensure data accuracy.
- **Optimize Queries**: Use indexing and other optimization techniques to improve query performance.
- **Avoid Common Pitfalls**: Ensure your joins and queries are appropriately configured to avoid performance issues.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}



[1]: /integrations/guide/reference-tables/