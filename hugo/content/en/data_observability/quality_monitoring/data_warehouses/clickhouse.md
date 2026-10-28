---
title: ClickHouse Cloud
description: "Connect ClickHouse Cloud to Datadog Data Observability to catalog your tables, track row counts and freshness, and run data quality monitors."
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Overview'
  - link: '/monitors/types/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Monitors'
---

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Data Observability for ClickHouse Cloud is in Preview. Contact your Datadog representative to enable it for your organization.
{{< /callout >}}

## Overview

The ClickHouse Cloud for Data Observability integration connects your [ClickHouse Cloud][1] service to Datadog Data Observability. You provide the service endpoint and credentials for a read-only user. Datadog reads metadata from your service's system tables to build a catalog of your databases, tables, and columns, and to track row count, size, and freshness for each table. You can then create data quality monitors on your ClickHouse tables.

This page covers ClickHouse Cloud services only.

**Note**: This integration is different from the [ClickHouse Cloud][2] integration built by ClickHouse, which sends ClickHouse Cloud service metrics to Datadog. The ClickHouse Cloud for Data Observability integration covers the catalog, data quality metrics, and data quality monitors. You can use both integrations at the same time.

## Prerequisites

Before you begin, make sure you have:

- A ClickHouse Cloud service with an HTTPS endpoint. Example: `https://<service>.<region>.<cloud_provider>.clickhouse.cloud:8443`
- Administrator access to your ClickHouse Cloud service, to create a role and a user.
- Preview access enabled for your organization by a Datadog representative.

## Allow Datadog IP addresses

Add Datadog's IP addresses to your service's IP Access List in ClickHouse Cloud. Use the addresses in the `webhooks` section of the [IP Ranges][3] page. Without these addresses, Datadog cannot connect to your service.

<div class="alert alert-warning">IP ranges are different for each Datadog site. On the <a href="/api/latest/ip-ranges/">IP Ranges</a> page, use the site selector in the top right to confirm you are fetching IPs from the correct site-specific endpoint URL.</div>

## Create a Datadog user in ClickHouse Cloud

As an administrator, create a role with read access to the system tables that hold schema and freshness metadata, grant it access to the data you want to monitor, and create a user with that role:

```sql
CREATE ROLE OR REPLACE DD_MONITOR;

GRANT SELECT ON system.databases TO DD_MONITOR;
GRANT SELECT ON system.tables TO DD_MONITOR;
GRANT SELECT ON system.columns TO DD_MONITOR;
GRANT SELECT ON system.parts TO DD_MONITOR;
GRANT SELECT ON information_schema.key_column_usage TO DD_MONITOR;

GRANT SELECT ON <database_name>.* TO DD_MONITOR;

GRANT SELECT ON <database_name>.<table_name> TO DD_MONITOR;

CREATE USER OR REPLACE datadog
IDENTIFIED BY '<password>';

GRANT DD_MONITOR TO datadog;

SET DEFAULT ROLE DD_MONITOR TO datadog;
```

Choose the grant that matches the data you want to monitor:

- `GRANT SELECT ON <database_name>.*` gives access to every table in a database.
- `GRANT SELECT ON <database_name>.<table_name>` limits access to a single table.

Replace `<database_name>`, `<table_name>`, and `<password>` with your own values. Choose a strong password and store it securely. You enter it in Datadog in the next step.

Datadog reads only metadata from ClickHouse system tables. Datadog queries the data in your tables only to run data quality monitors that you create.

## Connect your service to Datadog

1. In Datadog, open the [ClickHouse Cloud for Data Observability integration tile][4].
2. Enter the following:

    | Parameter | Description |
    |---|---|
    | Account name | A name to help you identify this ClickHouse Cloud service later. |
    | ClickHouse Cloud HTTPS URL | The HTTPS URL of your ClickHouse Cloud service. Example: `https://<service>.<region>.<cloud_provider>.clickhouse.cloud:8443` |
    | Username | The ClickHouse user Datadog authenticates as, for example, `datadog`. |
    | Password | The password for that ClickHouse user. |
    | Tags | (Optional) Custom tags applied to datasets collected from this service. |

3. Click {{< ui >}}Save{{< /ui >}}.
4. Click {{< ui >}}Test connection{{< /ui >}}. If the test fails, see [Troubleshooting](#troubleshooting).
5. Confirm the account shows as connected on the tile.

## What Datadog collects

### Catalog

Datadog catalogs your databases, tables, and columns, including column types. ClickHouse has no schema level, so tables appear directly under their database.

### Table metrics

Datadog reads the following metrics for each table from ClickHouse system tables every hour:

- Row count
- Size in bytes
- Freshness: the last change to the table's data parts. Background merges and mutations also update this value, so it can change even when no new rows are inserted.

Some tables report fewer metrics:

- **Views** report freshness only, when it is available.
- **Engines with no stored row count**, such as `Distributed`, the `Log` engine family, and materialized views defined with `TO`, have no row count from metadata. To track row count for these tables, create a monitor, which counts rows with a query.
- **External and streaming engines**, such as `Kafka`, `S3Queue`, `S3`, `URL`, `MySQL`, `PostgreSQL`, and `Remote`, appear in the catalog, but only custom SQL monitors can run on them.

If your service is idle, a metadata read wakes it up, which can take a moment and uses compute in your ClickHouse Cloud service.

## Create data quality monitors

ClickHouse tables support [Data Observability monitors][5], including custom SQL monitors.

- **Custom SQL**: Write the query in the ClickHouse SQL dialect. The query must alias its numeric result as `dd_value`. Other columns that the query returns become groups.
- **Schedule**: Monitors run every hour.
- **Cost**: Monitor queries run on your ClickHouse Cloud service and use its compute. A query on an idle service wakes the service up.
- **Cost control**: You control cost by choosing which monitors to create. Deleting a monitor stops its queries.

## Troubleshooting

If {{< ui >}}Test connection{{< /ui >}} fails, use the error to find the fix:

| Error | Cause and fix |
|---|---|
| Invalid host | The URL isn't the HTTPS endpoint of your service. Use `https://<host>.clickhouse.cloud:8443`. |
| Invalid credentials | The username or password is wrong. Check the credentials and try again. |
| Invalid permissions or insufficient privileges | The user doesn't have the `DD_MONITOR` grants. Run the SQL in [Create a Datadog user in ClickHouse Cloud](#create-a-datadog-user-in-clickhouse-cloud) again. |
| Empty result | No tables are visible to the user. Grant `SELECT` on the databases or tables you want to monitor. |
| Connection failure | Datadog can't reach your service. Add the `webhooks` IP ranges to your service's IP Access List, as described in [Allow Datadog IP addresses](#allow-datadog-ip-addresses), and check the URL. |
| Connection timeout | The service was idle and is waking up. Try again in a minute. |
| Server error | ClickHouse returned an error. Try again, and contact [Datadog support][6] if the problem persists. |

After a successful connection, your ClickHouse tables appear in the [Data Observability Catalog][7] after the first hourly metadata read.

If the integration tile isn't available in your organization, confirm that a Datadog representative has enabled Preview access for your organization.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://clickhouse.com/cloud
[2]: /integrations/clickhouse_cloud/
[3]: /api/latest/ip-ranges/
[4]: https://app.datadoghq.com/integrations/clickhouse-cloud-data-observability
[5]: /monitors/types/data_observability/
[6]: /help/
[7]: https://app.datadoghq.com/data-obs/catalog?platform=clickhouse
