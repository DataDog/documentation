---
title: Federated Logs
description: Search logs stored in Databricks from Log Explorer, without ingesting them into Datadog.
further_reading:
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Explore logs in Datadog"
- link: "/integrations/databricks/"
  tag: "Documentation"
  text: "Databricks integration"
- link: "/observability_pipelines/destinations/databricks/"
  tag: "Documentation"
  text: "Send logs to Databricks with Observability Pipelines"
---

{{< callout url="https://www.datadoghq.com/product-preview/federated-search/" header="Federated Logs is in Preview" >}}
Complete the form to request access.
{{< /callout >}}

## Overview

Federated Logs lets you search logs stored in a Databricks table from [Log Explorer][1], without ingesting them into Datadog. Datadog translates your Log Explorer query into SQL and runs it against your Databricks workspace. The data stays in Databricks.

Use Federated Logs to investigate logs that you keep in Databricks for cost, compliance, or analytics reasons.

With a Databricks source, you can:

- Search and filter logs on mapped fields with the [Log Explorer search syntax][2].
- View results in the list view and in a timeline histogram grouped by status.
- Open a log in the side panel and share a link to it.
- Add or remove columns, and export results to CSV.

## Prerequisites

- A [Databricks integration][3] account configured in Datadog. Note the application (client) ID of the service principal used by the integration.
- A Databricks table, registered in Unity Catalog, that contains your logs. To send logs to Databricks, you can use the [Observability Pipelines Databricks destination][4].
- The permissions listed in [Permissions](#permissions).

## Permissions

### Datadog

| Permission | Grants |
|---|---|
| `logs_federated_query_write` | Connect, edit, and delete Databricks sources on the {{< ui >}}External Sources{{< /ui >}} page. |
| `logs_federated_query_read` | Search Databricks sources in Log Explorer. |

For more information, see [Role Based Access Control][5].

### Databricks

The Databricks integration's service principal needs read access to the table. In Databricks, open the {{< ui >}}SQL Editor{{< /ui >}} and run the following commands. Use the service principal's application (client) ID, not its display name, for `<application_id>`.

```sql
GRANT USE CATALOG ON CATALOG <catalog_name> TO `<application_id>`;
GRANT USE SCHEMA ON SCHEMA <catalog_name>.<schema_name> TO `<application_id>`;
GRANT SELECT ON TABLE <catalog_name>.<schema_name>.<table_name> TO `<application_id>`;
```

The service principal also needs the `CAN USE` permission on the SQL warehouse that runs the queries. Queries run on your SQL warehouse and consume Databricks compute.

## Table requirements

Each log is a row in the table. Datadog reads the following fields, which you map to columns in the next step:

| Datadog field | Required | Supported column types |
|---|---|---|
| Timestamp | Yes | `timestamp`, or `string` in ISO 8601 format |
| Unique identifier (`_id`) | Yes | `string` |
| Status | Yes | `string` |
| Message, Host, Service, Source | No | `string` |
| Tags | No | `array<string>`, with each element in `key:value` format |

Numeric timestamps, such as epoch values, are not supported.

## Connect a source

1. Go to the [External Sources][6] page and click {{< ui >}}Connect source{{< /ui >}}.
2. On the {{< ui >}}Source{{< /ui >}} tab, select {{< ui >}}Databricks{{< /ui >}}, your integration account, and then the catalog, schema, and table that contains your logs.
3. On the {{< ui >}}Schema mapping{{< /ui >}} tab, map each Datadog field to a column of your table. See [Table requirements](#table-requirements).
4. Save the source.

You can connect multiple tables, each with its own schema mapping. After you save a source, you can only edit its schema mapping. To change the integration account or the table, delete the source and connect it again.

## Search federated logs

1. Go to [Log Explorer][1].
2. In the data source selector, select {{< ui >}}Databricks{{< /ui >}}, and then select a connected source.
3. Select a time range and enter a query, such as `service:web status:error`.

Datadog replaces the mapped field names in your query with the corresponding column names.

## Limitations

- Databricks is the only supported source.
- Search and filters apply to mapped fields only. Full-text search and filters on nested JSON fields are not supported.
- Columns that are not mapped to a Datadog field are not displayed as attributes in the side panel.
- Analytics views, such as grouping and timeseries, are not available.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /logs/explorer/search_syntax/
[3]: /integrations/databricks/
[4]: /observability_pipelines/destinations/databricks/
[5]: /account_management/rbac/
[6]: https://app.datadoghq.com/logs/external-sources
