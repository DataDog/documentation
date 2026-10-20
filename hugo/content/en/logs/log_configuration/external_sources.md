---
title: External Sources
description: Connect tables from your own data platform to search them with Federated Logs.
further_reading:
- link: "/logs/explorer/federated_logs/"
  tag: "Documentation"
  text: "Search external sources with Federated Logs"
- link: "/observability_pipelines/destinations/databricks/"
  tag: "Documentation"
  text: "Send logs to Databricks with Observability Pipelines"
---

{{< callout url="https://www.datadoghq.com/product-preview/federated-search/" btn_hidden="false" header="Join the Preview!" >}}
Federated Logs is in Preview. Use this form to submit your request today.
{{< /callout >}}

## Overview

An external source is a table in your own data platform that contains logs. After you connect it, you can search it from Log Explorer with [Federated Logs][1], without ingesting the logs into Datadog.

The supported source is Databricks.

## Prerequisites

- Access to the Federated Logs Preview. To request access, complete the [Preview form][2].
- The Logs Federated Query Write (`logs_federated_query_write`) permission, to connect, edit, and delete sources. For more information, see [Role Based Access Control][3].

## Set up your source

{{< tabs >}}
{{% tab "Databricks" %}}

### Prerequisites

- A [Databricks integration][1] account configured in Datadog. Note the application (client) ID of the service principal used by the integration.
- A Databricks table, registered in Unity Catalog, that contains your logs. To send logs to Databricks, you can use the [Observability Pipelines Databricks destination][2].

### Grant access to the service principal

Datadog runs queries with the Databricks SQL Statement Execution API, using the service principal of your Databricks integration. Use the service principal's application (client) ID, not its display name, for `<application_id>`.

1. Give the service principal the {{< ui >}}Databricks SQL access{{< /ui >}} entitlement. In your Databricks workspace settings, open the service principal, go to the {{< ui >}}Configurations{{< /ui >}} tab, and select {{< ui >}}Databricks SQL access{{< /ui >}}. New service principals don't inherit this entitlement from the `users` group. For more information, see [Manage entitlements][3] in the Databricks documentation.
2. Give the service principal the `CAN USE` permission on the SQL warehouse that runs the queries. `CAN MANAGE` is not required.
3. Grant read access to the table. In Databricks, open the {{< ui >}}SQL Editor{{< /ui >}} and run the following commands:

   ```sql
   GRANT USE CATALOG ON CATALOG <catalog_name> TO `<application_id>`;
   GRANT USE SCHEMA ON SCHEMA <catalog_name>.<schema_name> TO `<application_id>`;
   GRANT SELECT ON TABLE <catalog_name>.<schema_name>.<table_name> TO `<application_id>`;
   ```

The {{< ui >}}External Sources{{< /ui >}} page only lists the catalogs, schemas, and tables that the service principal has privileges on. Queries run on your SQL warehouse and consume Databricks compute.

### Supported column types

| Datadog field | Supported column types |
|---|---|
| Timestamp | `timestamp`, or `string` in ISO 8601 format |
| Unique identifier (`_id`) | `string` |
| Status | `string` |
| Message, Host, Service, Source | `string` |
| Tags | `array<string>`, with each element in `key:value` format |

Numeric timestamps, such as epoch values, are not supported.

### Source fields

When you [connect the source](#connect-a-source), select {{< ui >}}Databricks{{< /ui >}} as the source type and your integration account. Then select the catalog, schema, and table that contains your logs.

[1]: /integrations/databricks/
[2]: /observability_pipelines/destinations/databricks/
[3]: https://docs.databricks.com/aws/en/security/auth/entitlements
{{% /tab %}}
{{< /tabs >}}

## Schema mapping

Each log is a row in the table. When you connect a source, you map each Datadog field to a column of your table:

| Datadog field | Required |
|---|---|
| Timestamp | Yes |
| Unique identifier (`_id`) | Yes |
| Status | Yes |
| Message, Host, Service, Source | No |
| Tags | No |

Only columns with a compatible type are listed for each field. For the supported column types, see the tab for your source in [Set up your source](#set-up-your-source).

## Connect a source

1. Go to [{{< ui >}}Logs{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} > {{< ui >}}External Sources{{< /ui >}}][4] and click {{< ui >}}Connect Source{{< /ui >}}.
2. On the {{< ui >}}Source{{< /ui >}} tab, select the source type and the table that contains your logs. The fields depend on the source. Click {{< ui >}}Next{{< /ui >}}.
3. On the {{< ui >}}Schema Mapping{{< /ui >}} tab, select the column that each Datadog field is read from. See [Schema mapping](#schema-mapping).
4. Click {{< ui >}}Save{{< /ui >}}.

You can connect multiple tables, each with its own schema mapping. After you save a source, you can only edit its schema mapping. To change the integration account or the table, delete the source and connect it again.

To search a connected source, see [Federated Logs][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/federated_logs/
[2]: https://www.datadoghq.com/product-preview/federated-search/
[3]: /account_management/rbac/
[4]: https://app.datadoghq.com/logs/external-sources
