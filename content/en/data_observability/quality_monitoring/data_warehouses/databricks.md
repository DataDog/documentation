---
title: Databricks
description: "Connect Databricks to Datadog Data Observability to monitor data quality, track usage, and detect issues."
aliases:
  - /data_observability/datasets/?tab=databricks
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Overview'

---

<div class="alert alert-info">The Quality Monitoring integration with Databricks only supports Unity Catalog. Reach out to your account representative if you use Hive Metastore.</div>

## Overview

The Databricks integration connects Datadog to your Databricks workspace to sync metadata and table-level metrics. Use it to monitor data freshness, detect anomalies, and trace lineage across your data stack.

**Note**: The instructions below are for Quality Monitoring. For Jobs Monitoring, see [Enable Data Observability: Jobs Monitoring for Databricks][1].

## Set up your account in Databricks

### Step 1 - Connect the Databricks integration tile

1. Complete the installation instructions in the [Databricks integration documentation][2] using Datadog's integration tile. Take note of the service principal's application ID and save it somewhere safe, because it will be referenced later.

   **Note**: Workspace Admin permissions are not required for Quality Monitoring.

2. When configuring the integration, turn on the **Data Observability** toggle.
3. Click **Save Databricks Workspace**.

### Step 2 - Grant access

First, grant access to system schemas for lineage:
```sql
GRANT USE CATALOG ON CATALOG system TO `<application_id>`;
GRANT USE SCHEMA ON CATALOG system TO `<application_id>`;
GRANT SELECT ON CATALOG system TO `<application_id>`;
```

Then, grant read-only access to the scope of data you want to monitor:

{{< tabs >}}
{{% tab "Full catalog access" %}}

Use the full catalog access option for simpler setup. It automatically includes future tables without needing to update permissions.


```sql
GRANT USE_CATALOG ON CATALOG <catalog_name> TO `<application_id>`;
GRANT USE_SCHEMA ON CATALOG <catalog_name> TO `<application_id>`;
GRANT SELECT ON CATALOG <catalog_name> TO `<application_id>`;
```

{{% /tab %}}
{{% tab "Specific tables" %}}

Use the specific tables option for least-privilege access or if you only need to monitor a subset of your data. You must update permissions when adding new tables.

```sql
GRANT USE_CATALOG ON CATALOG <catalog_name> TO `<application_id>`;
GRANT USE_SCHEMA ON SCHEMA <catalog_name>.<schema_name> TO `<application_id>`;
GRANT SELECT ON TABLE <catalog_name>.<schema_name>.<table_name> TO `<application_id>`;
```

{{% /tab %}}
{{< /tabs >}}

These permissions are needed for the following reasons:

- `GRANT USE_CATALOG` is required to navigate into the catalog and discover schemas.
- `GRANT USE_SCHEMA` is required to enumerate tables and monitor schema-level health.
- `GRANT SELECT` is required for data quality monitoring, such as custom SQL or distribution checks.

## Next steps

After you configure the integration, Datadog begins syncing your metadata and column-level lineage in the background. Initial syncs can take several hours depending on the size of your Databricks deployment.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_observability/jobs_monitoring/databricks/
[2]: /integrations/databricks/