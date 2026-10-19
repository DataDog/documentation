---
title: Federated Logs for Databricks
description: Search logs stored in Databricks from Log Explorer, without ingesting them into Datadog.
further_reading:
- link: "/logs/explorer/federated_logs/"
  tag: "Documentation"
  text: "Federated Logs"
- link: "/integrations/databricks/"
  tag: "Documentation"
  text: "Databricks integration"
- link: "/observability_pipelines/destinations/databricks/"
  tag: "Documentation"
  text: "Send logs to Databricks with Observability Pipelines"
---

{{< callout url="https://www.datadoghq.com/product-preview/federated-search/" btn_hidden="false" header="Join the Preview!" >}}
Federated Logs is in Preview. Use this form to submit your request today.
{{< /callout >}}

## Overview

Use [Federated Logs][1] to search logs stored in a Databricks table from Log Explorer. Datadog translates your Log Explorer query into SQL and runs it on your Databricks SQL warehouse.

## Prerequisites

- Access to the Federated Logs Preview. To request access, complete the [Preview form][2].
- A [Databricks integration][3] account configured in Datadog. Note the application (client) ID of the service principal used by the integration.
- A Databricks table, registered in Unity Catalog, that contains your logs. To send logs to Databricks, you can use the [Observability Pipelines Databricks destination][4].
- The Datadog [Federated Logs permissions][5].

## Grant access to the table

The Databricks integration's service principal needs read access to the table. In Databricks, open the {{< ui >}}SQL Editor{{< /ui >}} and run the following commands. Use the service principal's application (client) ID, not its display name, for `<application_id>`.

```sql
GRANT USE CATALOG ON CATALOG <catalog_name> TO `<application_id>`;
GRANT USE SCHEMA ON SCHEMA <catalog_name>.<schema_name> TO `<application_id>`;
GRANT SELECT ON TABLE <catalog_name>.<schema_name>.<table_name> TO `<application_id>`;
```

The service principal also needs the `CAN USE` permission on the SQL warehouse that runs the queries. Queries run on your SQL warehouse and consume Databricks compute.

## Supported column types

| Datadog field | Supported column types |
|---|---|
| Timestamp | `timestamp`, or `string` in ISO 8601 format |
| Unique identifier (`_id`) | `string` |
| Status | `string` |
| Message, Host, Service, Source | `string` |
| Tags | `array<string>`, with each element in `key:value` format |

Numeric timestamps, such as epoch values, are not supported.

## Connect a table

1. Go to [{{< ui >}}Logs{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} > {{< ui >}}External Sources{{< /ui >}}][6] and click {{< ui >}}Connect Source{{< /ui >}}.
2. On the {{< ui >}}Source{{< /ui >}} tab, select {{< ui >}}Databricks{{< /ui >}} as the source type and your integration account. Then select the catalog, schema, and table that contains your logs. Click {{< ui >}}Next{{< /ui >}}.
3. On the {{< ui >}}Schema Mapping{{< /ui >}} tab, map each Datadog field to a column. See [Supported column types](#supported-column-types).
4. Click {{< ui >}}Save{{< /ui >}}.

To change the integration account or the table of a saved source, delete the source and connect it again.

To search the table, select {{< ui >}}Databricks{{< /ui >}} under {{< ui >}}External Sources{{< /ui >}} in the Log Explorer data source dropdown. See [Search federated logs][7].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/federated_logs/
[2]: https://www.datadoghq.com/product-preview/federated-search/
[3]: /integrations/databricks/
[4]: /observability_pipelines/destinations/databricks/
[5]: /logs/explorer/federated_logs/#permissions
[6]: https://app.datadoghq.com/logs/external-sources
[7]: /logs/explorer/federated_logs/#search-federated-logs
