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

If your Databricks workspace restricts network access by IP, add the Datadog webhook IPs to your allowlist. For the list of IPs, see the `webhooks` section of {{< region-param key="ip_ranges_url" link="true" text="IP ranges list" >}}.

## Set up your account in Databricks

### Step 1 - Connect the Databricks integration tile

1. Complete the installation instructions in the [Databricks integration documentation][2] using Datadog's integration tile. Take note of the service principal's application ID and save it somewhere safe, because it will be referenced later.

   **Note**: Workspace Admin permissions are not required for Quality Monitoring.

2. When configuring the integration, turn on the {{< ui >}}Data Observability{{< /ui >}} toggle.
3. Click {{< ui >}}Save Databricks Workspace{{< /ui >}}.

### Step 2 - Grant access

In Databricks, open the {{< ui >}}SQL Editor{{< /ui >}} to run the following commands. Use the service principal's application (client) ID, not its display name, wherever `<application_id>` appears.

First, grant access to system schemas for lineage:
```sql
GRANT USE CATALOG ON CATALOG system TO `<application_id>`;
GRANT USE SCHEMA ON CATALOG system TO `<application_id>`;
GRANT SELECT ON CATALOG system TO `<application_id>`;
```

These grants cover the whole `system` catalog, which includes the [query history system table][4] (`system.query.history`). Datadog reads query history from this table to build lineage between your tables and to give you visibility into the queries running against them. To read the query text in that table, the service principal also needs the group membership described in [Step 3](#step-3---grant-access-to-query-text).

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
- `GRANT SELECT` is required for data quality monitoring, such as custom SQL or distribution checks.

### Step 3 - Grant access to query text

Databricks masks SQL query text for any principal that is not an account administrator or a member of the `databricks_pii_access` account-level group. For a masked principal, query text is returned as `<Redacted>` in the `statement_text` column of `system.query.history`, the [Query History API][5], the [List Queries API][6], and audit log events that capture SQL statement text.

Add the service principal to `databricks_pii_access` to use the following capabilities, which read query text:

- **Databricks serverless job monitoring**: Monitoring jobs that run on [serverless compute][7], where no Datadog Agent runs on the cluster.
- **Query and SQL warehouse monitoring and optimization**: Visibility into the queries running on your SQL warehouses, and the recommendations Datadog generates from them.

Lineage and query-level visibility built from query history are also affected. Table-level metrics such as freshness, row count, and column statistics read table data and metadata rather than query text, so they work without this membership.

Group membership is required in addition to the `system` catalog grants in [Step 2](#step-2---grant-access). A principal that is in the group but lacks `SELECT` on `CATALOG system` still cannot read query history.

To create the group and add the service principal:

1. The `databricks_pii_access` group does not exist in a Databricks account by default, and workspace administrators are not members of it automatically. Create it with the exact name `databricks_pii_access`, which is case-sensitive:
   - If you do not manage groups with SCIM or an external identity provider, go to {{< ui >}}Account Console{{< /ui >}} > {{< ui >}}User Management{{< /ui >}} > {{< ui >}}Groups{{< /ui >}} > {{< ui >}}Add Group{{< /ui >}}.
   - If you manage groups with SCIM or an external identity provider, create the group there instead.
1. Add the service principal from [Step 1](#step-1---connect-the-databricks-integration-tile) to the group.

For more details, see the Databricks documentation on [managing account-level groups][8].

## Next steps

After you configure the integration, Datadog begins syncing your metadata and column-level lineage in the background. Initial syncs can take several hours depending on the size of your Databricks deployment.

After the initial sync completes, create a [Data Observability monitor][3] to start alerting on freshness, row count, column-level metrics, and custom SQL metrics.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_observability/jobs_monitoring/databricks/
[2]: /integrations/databricks/
[3]: /monitors/types/data_observability/
[4]: https://docs.databricks.com/aws/en/admin/system-tables/query-history
[5]: https://docs.databricks.com/api/workspace/queryhistory/list
[6]: https://docs.databricks.com/api/workspace/queries/list
[7]: https://docs.databricks.com/aws/en/compute/serverless/
[8]: https://docs.databricks.com/aws/en/admin/users-groups/groups