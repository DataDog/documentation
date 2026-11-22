---
title: Databricks
description: "Connect Databricks to Datadog Data Observability to monitor data quality, track usage, and detect issues."
aliases:
  - /data_observability/datasets/?tab=databricks
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Overview'
  - link: '/monitors/types/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Monitors'

---


## Overview

The Databricks integration connects Datadog to your Databricks workspace to sync metadata and table-level metrics. Use it to monitor data freshness, detect anomalies, and trace lineage across your data stack.

**Note**: The instructions below are for Quality Monitoring. For Jobs Monitoring, see [Enable Data Observability: Jobs Monitoring for Databricks][1].

## Prerequisites

If your Databricks workspace restricts network access by IP, add the Datadog webhook IPs to your allowlist. For the list of IPs, see the `webhooks` section of {{< region-param key="ip_ranges_url" link="true" text="IP ranges list" >}}. For the endpoint and port that Datadog connects to, see [Network Requirements for Data Observability][11].

## Set up your account in Databricks

### Step 1 - Connect the Databricks integration tile

1. Complete the installation instructions in the [Databricks integration documentation][2] using Datadog's integration tile. Take note of the service principal's application ID and save it somewhere safe, because it will be referenced later.

   **Note**: Workspace Admin permissions are not required for Quality Monitoring. Each Databricks workspace supports one service principal for Data Observability, so you can't assign separate service principals to different monitor types in the same workspace.

2. In the integration tile, provide the ID of a Pro or Serverless [SQL warehouse][3] for Datadog to query. Grant the service principal `CAN USE` on that warehouse. Datadog runs Quality Monitoring queries on this warehouse. Classic SQL warehouses are not supported.
3. When configuring the integration, turn on the {{< ui >}}Data Observability{{< /ui >}} toggle.

   <!-- SCREENSHOT: Databricks integration tile, a sample workspace being added, showing the field for the SQL warehouse ID and the Data Observability toggle turned on. -->

4. Click {{< ui >}}Save Databricks Workspace{{< /ui >}}.

### Step 2 - Grant access

In Databricks, open the {{< ui >}}SQL Editor{{< /ui >}} to run the following commands. Use the service principal's application (client) ID, not its display name, wherever `<application_id>` appears.

First, grant access to system schemas for lineage:
```sql
GRANT USE CATALOG ON CATALOG system TO `<application_id>`;
GRANT USE SCHEMA ON CATALOG system TO `<application_id>`;
GRANT SELECT ON CATALOG system TO `<application_id>`;
```

These grants cover the whole `system` catalog. For Quality Monitoring, Datadog reads the following system tables:

- The `system.information_schema` views, for catalog, schema, table, column, and tag metadata.
- `system.access.column_lineage`, for column-level lineage between your tables.

Datadog doesn't read the audit log system table (`system.access.audit`).

Datadog reads query history through the Databricks [Query History API][4]. It uses query history to build lineage from query text and to show the queries that run against your tables. To read the query text, the service principal also needs the group membership described in [Step 3](#step-3---grant-access-to-query-text).

The Query History API returns only the queries that the service principal can view. To include queries that other users run on a SQL warehouse, grant the service principal the CAN MONITOR permission on that warehouse.

Then, grant read-only access to the scope of data you want to monitor:

{{< tabs >}}
{{% tab "Full catalog access" %}}

Use the full catalog access option for simpler setup. It automatically includes future tables without needing to update permissions.


```sql
GRANT USE CATALOG ON CATALOG <catalog_name> TO `<application_id>`;
GRANT USE SCHEMA ON CATALOG <catalog_name> TO `<application_id>`;
GRANT SELECT ON CATALOG <catalog_name> TO `<application_id>`;
```

{{% /tab %}}
{{% tab "Specific tables" %}}

Use the specific tables option for least-privilege access or if you only need to monitor a subset of your data. You must update permissions when adding new tables.

```sql
GRANT USE CATALOG ON CATALOG <catalog_name> TO `<application_id>`;
GRANT USE SCHEMA ON SCHEMA <catalog_name>.<schema_name> TO `<application_id>`;
GRANT SELECT ON TABLE <catalog_name>.<schema_name>.<table_name> TO `<application_id>`;
```

{{% /tab %}}
{{< /tabs >}}

These permissions are needed for the following reasons:

- `GRANT USE CATALOG` is required to navigate into the catalog and discover schemas.
- `GRANT USE SCHEMA` is required to enumerate tables and monitor schema-level health.
- `GRANT SELECT` is required for data quality monitoring, such as Custom SQL or distribution checks.

### Step 3 - Grant access to query text

Databricks masks SQL query text for any principal that is not an account administrator or a member of the `databricks_pii_access` account-level group. For a masked principal, query text is returned as `<Redacted>` in:

- The `statement_text` column of the `system.query.history` system table
- The [Query History API][4]
- The [List Queries API][5]
- Audit log events that capture SQL statement text

When Databricks masks query text for the service principal, the Databricks integration tile in Datadog shows a message about masked query text.

Add the service principal to `databricks_pii_access` to use the following capabilities, which read query text:

- **Lineage from query text**: Datadog parses query text from query history to add lineage between your tables, and skips queries whose text is redacted. Lineage from `system.access.column_lineage` doesn't use query text.
- **Queries page and recommendations**: Datadog lists a Databricks query on the {{< ui >}}Queries{{< /ui >}} page only when it can read the query text. Optimization recommendations also need the query text. See [Optimize][12].

Table-level metrics such as freshness, row count, and column statistics read table data and metadata rather than query text, so they work without this membership.

Group membership doesn't replace the `system` catalog grants in [Step 2](#step-2---grant-access). Datadog needs both.

To create the group and add the service principal:

1. The `databricks_pii_access` group does not exist in a Databricks account by default, and workspace administrators are not members of it automatically. Create it with the exact name `databricks_pii_access`, which is case-sensitive.
   - If you do not manage groups with SCIM or an external identity provider, go to {{< ui >}}Account Console{{< /ui >}} > {{< ui >}}User Management{{< /ui >}} > {{< ui >}}Groups{{< /ui >}} > {{< ui >}}Add Group{{< /ui >}}.
   - If you manage groups with SCIM or an external identity provider, create the group there instead.
1. Add the service principal from [Step 1](#step-1---connect-the-databricks-integration-tile) to the group.

For more details, see the Databricks documentation on [managing account-level groups][6].

## Workspaces that share a metastore

Datadog identifies Unity Catalog catalogs and tables by their metastore, not by the workspace it reads them through. If you connect several workspaces that are attached to the same Unity Catalog metastore, each table appears once in Datadog. Workspaces that use the Hive metastore are identified by workspace ID, so their tables appear separately for each workspace.

## Control data access

Quality Monitoring sends aggregate metric values to Datadog, not row-level data. Custom SQL monitors are the exception and need careful configuration. For details, see [Data sent to Datadog][7].

### Limit what the service principal can read

- **Scope the grants**: Use the {{< ui >}}Specific tables{{< /ui >}} option in [Step 2](#step-2---grant-access), or grant access to a dedicated schema only.
- **Mask sensitive columns**: Apply Unity Catalog [column masks or row filters][8] to sensitive columns for the Datadog service principal. Freshness and row count checks don't read column values, so masking doesn't affect them. Column-level metrics on masked columns reflect the masked values, not the originals.
- **Configure only the monitors you need**: Datadog runs column-level queries and Custom SQL queries only for the monitors you configure.

### Audit queries run by Datadog

Databricks records every query that the service principal runs in the [query history system table][9] (`system.query.history`). To review them, filter on `executed_by` equal to the service principal's application ID:

```sql
SELECT start_time, statement_text
FROM system.query.history
WHERE executed_by = '<application_id>'
ORDER BY start_time DESC
```

To see query text in `statement_text`, you must be an account admin or a member of the `databricks_pii_access` group. Otherwise, the column returns `<Redacted>`. For details, see [Step 3](#step-3---grant-access-to-query-text).

## Next steps

After you configure the integration, Datadog begins syncing your metadata and column-level lineage in the background. Initial syncs can take several hours depending on the size of your Databricks deployment.

After the initial sync completes, create a [Data Observability monitor][10] to start alerting on freshness, row count, column-level metrics, and Custom SQL metrics.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_observability/jobs_monitoring/databricks/
[2]: /integrations/databricks/
[3]: https://docs.databricks.com/aws/en/compute/sql-warehouse/
[4]: https://docs.databricks.com/api/workspace/queryhistory/list
[5]: https://docs.databricks.com/api/workspace/queries/list
[6]: https://docs.databricks.com/aws/en/admin/users-groups/groups
[7]: /data_observability/quality_monitoring/#data-sent-to-datadog
[8]: https://docs.databricks.com/aws/en/data-governance/unity-catalog/filters-and-masks
[9]: https://docs.databricks.com/aws/en/admin/system-tables/query-history
[10]: /monitors/types/data_observability/
[11]: /data_observability/network/
[12]: /data_observability/optimize/