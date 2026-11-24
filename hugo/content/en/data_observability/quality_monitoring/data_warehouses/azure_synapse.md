---
title: Azure Synapse
description: "Connect Azure Synapse dedicated SQL pools to Datadog Data Observability to catalog your tables and track row counts and sizes."
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Overview'
  - link: '/monitors/types/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Monitors'
  - link: '/integrations/azure/'
    tag: 'Documentation'
    text: 'Azure integration'
---

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Data Observability for Azure Synapse is in Preview. Contact your Datadog representative to enable it for your organization.
{{< /callout >}}

## Overview

The Azure Synapse integration connects Datadog Data Observability to your Azure Synapse Analytics dedicated SQL pools. Datadog builds a catalog of your pools, schemas, tables, and columns, and tracks row count and size for each table.

Datadog authenticates to Synapse with the app registration (service principal) configured in your Datadog Azure integration. Datadog uses the Azure Resource Manager API to discover your Synapse workspaces and dedicated SQL pools. It then connects to each pool as a Microsoft Entra user to read metadata from the pool's system views.

## Prerequisites

Before you begin, make sure you have:

- The [Datadog Azure integration][1] configured with an app registration. Log forwarding and metric collection are not required for Data Observability.
- One or more Azure Synapse **dedicated SQL pools**. Serverless SQL pools are not supported.
- Permission to assign Azure roles on the subscriptions or Synapse workspaces you want to monitor.
- A Microsoft Entra administrator on each Synapse workspace, to create a database user in each pool.

## Grant Datadog access in Azure

### Step 1: Assign the Reader role

Assign the app registration the **Reader** role on the subscriptions or Synapse workspaces you want to monitor. Datadog uses this role to discover your Synapse workspaces and dedicated SQL pools.

If you already assigned the Reader role on these subscriptions for the Datadog Azure integration, you can skip this step.

### Step 2: Create a database user in each pool

Connect to each dedicated SQL pool you want to monitor as a Microsoft Entra administrator, and run the following T-SQL. Replace `<APP_REGISTRATION_NAME>` with the name of the app registration that the Datadog Azure integration uses:

```sql
-- Run in each dedicated SQL pool you want to monitor
CREATE USER [<APP_REGISTRATION_NAME>] FROM EXTERNAL PROVIDER;
-- Repeat for each schema to monitor
GRANT SELECT ON SCHEMA :: dbo TO [<APP_REGISTRATION_NAME>];
-- Row counts and sizes
GRANT VIEW DATABASE STATE TO [<APP_REGISTRATION_NAME>];
```

- Datadog only sees the schemas you grant `SELECT` on. If your tables aren't in `dbo`, replace `dbo` with the schema that contains them, and repeat the `GRANT SELECT` statement for each schema.
- Without `VIEW DATABASE STATE`, Datadog still catalogs your tables but can't collect row counts and sizes.
- If the app registration name contains a `]`, write it as `]]` inside the brackets.

Datadog runs only read queries.

### Step 3: Allow Datadog in the workspace firewall

Add Datadog's IP addresses to the firewall rules of each Synapse workspace. Use the addresses in the `webhooks` section of the [IP Ranges][2] page. Without these addresses, Datadog cannot connect to your pools.

<div class="alert alert-warning">IP ranges are different for each Datadog site. On the {{< region-param key="ip_ranges_url" link="true" text="IP Ranges" >}} page, use the site selector in the top right to confirm you are fetching IPs from the correct site-specific endpoint URL.</div>

Workspaces that only allow private endpoints are not supported.

## Configure the integration in Datadog

1. In Datadog, go to {{< ui >}}Datadog Data Observability{{< /ui >}} > [{{< ui >}}Settings{{< /ui >}}][3].
2. In the {{< ui >}}Azure Synapse{{< /ui >}} section, click {{< ui >}}Configure{{< /ui >}}.

   If the section shows {{< ui >}}Install Azure integration{{< /ui >}}, configure the [Datadog Azure integration][1] with an app registration first.

3. Select the app registration that you granted access to, and click {{< ui >}}Configure{{< /ui >}}.
4. Turn on {{< ui >}}Monitor Azure Synapse{{< /ui >}}.
5. Optionally, add {{< ui >}}Pool filters{{< /ui >}}. Leave the field empty to monitor every dedicated SQL pool the app registration can access, or add one filter for each workspace or pool:
   - `<WORKSPACE_NAME>`: Matches every dedicated SQL pool in this workspace.
   - `<WORKSPACE_NAME>/<POOL_NAME>`: Matches one dedicated SQL pool.
6. Click {{< ui >}}Save{{< /ui >}}.

To check the setup, click {{< ui >}}Test{{< /ui >}} on the Azure Synapse account card in the [Data Observability Catalog][4]. If your pool filters list several workspaces or pools, choose one in {{< ui >}}Pools to test{{< /ui >}}, or test all allowed pools. The test checks each pool that is online. It skips paused pools and lists them in a note on the result.

## What Datadog collects

Datadog collects metadata and row counts and sizes about once an hour.

### Catalog

Datadog catalogs the schemas, tables, views, and external tables in each dedicated SQL pool, with their columns and column types. For each table, Datadog also collects the primary key and the distribution policy (hash, round robin, or replicated).

### Table metrics

Datadog collects the following metrics for each table:

- **Row count**: The number of rows in the table.
- **Size**: The table size in bytes.

Row count and size require the `VIEW DATABASE STATE` permission. Views and external tables have no row count or size.

## Create data quality monitors

Data quality monitors on Azure Synapse tables, including custom SQL and column-level monitors, are not yet available for this Preview. Contact your Datadog representative for updates.

## Troubleshooting

If tables are missing or the connection test fails, verify the following:

| Problem | Cause and fix |
|---|---|
| A pool is missing or not checked | The pool is paused. Datadog skips paused pools and never resumes them. Datadog collects the pool's metadata again after you resume it. |
| Connection failure | Datadog can't reach the workspace. Add the `webhooks` IP ranges to the workspace firewall, as described in [Allow Datadog in the workspace firewall](#step-3-allow-datadog-in-the-workspace-firewall). Workspaces that only allow private endpoints are not supported. |
| Login failed, or the app registration has no user in the pool | The pool has no database user for the app registration. Run `CREATE USER ... FROM EXTERNAL PROVIDER` in that pool, as described in [Create a database user in each pool](#step-2-create-a-database-user-in-each-pool). |
| Tables are missing from a schema | The user has no `SELECT` on that schema. Grant `SELECT` on each schema you want to monitor. |
| Row counts and sizes are missing | The user doesn't have `VIEW DATABASE STATE`. Run `GRANT VIEW DATABASE STATE` in the pool. |
| A serverless endpoint isn't supported | The host ends in `-ondemand.sql.azuresynapse.net`, which is the serverless SQL pool. Only dedicated SQL pools are supported. |
| Invalid credentials | The client ID, tenant ID, or client secret in the Datadog Azure integration is wrong, or the secret has expired. Update the app registration in the [Datadog Azure integration][1]. |
| A pool is never discovered | The app registration doesn't have the Reader role on the subscription or workspace, or the pool doesn't match your pool filters. |

## Migrate from Metaplane

If you monitored Azure Synapse with Metaplane, Metaplane connected with a SQL login. Datadog connects with the Datadog Azure integration's app registration instead. To migrate:

1. Create a database user for the app registration in each pool, as described in [Create a database user in each pool](#step-2-create-a-database-user-in-each-pool).
2. After Datadog collects your tables, you can drop the Metaplane SQL login and its database users.

## Limitations

- Only dedicated SQL pools are supported. Serverless SQL pools, Spark pools, and Data Explorer pools are not supported.
- Workspaces that only allow private endpoints are not supported.
- Datadog never resumes a paused pool, so paused pools are not collected until you resume them.
- Freshness requires a timestamp column; Datadog doesn't read table freshness from Synapse metadata.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/azure/
[2]: /api/latest/ip-ranges/
[3]: https://app.datadoghq.com/data-obs/settings/integrations
[4]: https://app.datadoghq.com/data-obs/catalog?platform=azuresynapse
