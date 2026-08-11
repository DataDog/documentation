---
title: Snowflake
description: "Connect Snowflake to Datadog Data Observability to monitor data quality, track usage, and detect issues."
aliases:
  - /data_observability/datasets/?tab=snowflake
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Overview'
  - link: '/monitors/types/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Monitors'
---

## Overview

The Snowflake integration connects Datadog to your Snowflake account to sync metadata, query history, and table-level metrics. Use it to monitor data freshness, detect anomalies, and trace lineage across your warehouse and downstream tools.

## Prerequisites

Before you begin, make sure you have:

- Access to the `ACCOUNTADMIN` role in Snowflake.
- An RSA key pair. For more information, see the [Snowflake key-pair authentication docs][1].
- If your Snowflake account restricts network access by IP, Datadog webhook IPs must be included in your network policy allowlist. For the list of IPs, see the `webhooks` section of the [IP Ranges][7] page.

  <div class="alert alert-warning">IP ranges are different for each Datadog site. On the <a href="/api/latest/ip-ranges/">IP Ranges</a> page, use the site selector in the top right to confirm you are fetching IPs from the correct site-specific endpoint URL.</div>

## Set up your account in Snowflake

To set up your account in Snowflake:

1. Define the following variables:

   ```sql
   SET role_name = 'DATADOG_ROLE';
   SET user_name = 'DATADOG_USER';
   SET warehouse_name = 'DATADOG_WH';
   SET database_name  = '<YOUR_DATABASE>';
   ```

2. Create a role, warehouse, and key-pair-authenticated user.

   ```sql
   USE ROLE ACCOUNTADMIN;

   -- Create monitoring role
   CREATE ROLE IF NOT EXISTS IDENTIFIER($role_name);
   GRANT ROLE IDENTIFIER($role_name) TO ROLE SYSADMIN;

   -- Create an X-SMALL warehouse (auto-suspend after 30s)
   CREATE WAREHOUSE IF NOT EXISTS IDENTIFIER($warehouse_name)
   WAREHOUSE_SIZE       = XSMALL
   WAREHOUSE_TYPE       = STANDARD
   AUTO_SUSPEND         = 30
   AUTO_RESUME          = TRUE
   INITIALLY_SUSPENDED  = TRUE;

   -- Create Datadog user—key-pair only (no password)
   -- Replace <PUBLIC_KEY> with your RSA public key (PEM, no headers/newlines)
   CREATE USER IF NOT EXISTS IDENTIFIER($user_name)
   LOGIN_NAME        = $user_name
   DEFAULT_ROLE      = $role_name
   DEFAULT_WAREHOUSE = $warehouse_name
   RSA_PUBLIC_KEY    = '<PUBLIC_KEY>';

   GRANT ROLE IDENTIFIER($role_name) TO USER IDENTIFIER($user_name);
   ```

3. Grant monitoring privileges to the role.

   ```sql
   -- Warehouse usage
   GRANT USAGE ON WAREHOUSE IDENTIFIER($warehouse_name) TO ROLE IDENTIFIER($role_name);

   -- Account‐level monitoring (tasks, pipes, query history)
   GRANT MONITOR EXECUTION ON ACCOUNT TO ROLE IDENTIFIER($role_name);

   -- Imported privileges on Snowflake's ACCOUNT_USAGE
   GRANT IMPORTED PRIVILEGES ON DATABASE SNOWFLAKE TO ROLE IDENTIFIER($role_name);

   -- Imported privileges on any external data shares
   -- GRANT IMPORTED PRIVILEGES ON DATABASE IDENTIFIER($database_name) TO ROLE IDENTIFIER($role_name);

   -- Grant the following ACCOUNT_USAGE views to the new role. Do this if you wish to collect Snowflake account usage logs and metrics.
   GRANT DATABASE ROLE SNOWFLAKE.OBJECT_VIEWER TO ROLE IDENTIFIER($role_name);
   GRANT DATABASE ROLE SNOWFLAKE.USAGE_VIEWER TO ROLE IDENTIFIER($role_name);
   GRANT DATABASE ROLE SNOWFLAKE.GOVERNANCE_VIEWER TO ROLE IDENTIFIER($role_name);
   GRANT DATABASE ROLE SNOWFLAKE.SECURITY_VIEWER TO ROLE IDENTIFIER($role_name);

   -- Grant ORGANIZATION_USAGE_VIEWER to the new role. Do this if you wish to collect Snowflake organization usage metrics.
   GRANT DATABASE ROLE SNOWFLAKE.ORGANIZATION_USAGE_VIEWER TO ROLE IDENTIFIER($role_name);

   -- Grant ORGANIZATION_BILLING_VIEWER to the new role. Do this if you wish to collect Snowflake cost data.
   GRANT DATABASE ROLE SNOWFLAKE.ORGANIZATION_BILLING_VIEWER TO ROLE IDENTIFIER($role_name);
   ```

   <div class="alert alert-info">To avoid missing new tables, use schema-level future grants. Snowflake gives schema-level grants precedence over database-level ones. If Datadog only has database-level grants but other roles have schema-level grants on the same schemas, new tables may not appear in Datadog. See <a href="https://docs.snowflake.com/en/sql-reference/sql/grant-privilege#considerations">Snowflake's documentation</a> for details.</div>

4. Grant read-only access to your data.

   ```sql
   USE DATABASE IDENTIFIER($database_name);

   CREATE OR REPLACE PROCEDURE grantFutureAccess(databaseName string, roleName string)
   returns string not null
   language javascript
   as
   $$
   var schemaResultSet = snowflake.execute({ sqlText: 'SELECT SCHEMA_NAME FROM ' + '"' + DATABASENAME + '"' + ".INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME != 'INFORMATION_SCHEMA';"});

   var numberOfSchemasGranted = 0;
   while (schemaResultSet.next()) {
       numberOfSchemasGranted += 1;
       var schemaAndRoleSuffix = ' in schema "' + DATABASENAME + '"."' + 
       schemaResultSet.getColumnValue('SCHEMA_NAME') + '" to role ' + ROLENAME + ';'

       snowflake.execute({ sqlText: 'grant USAGE on schema "' + DATABASENAME + '"."' +  
       schemaResultSet.getColumnValue('SCHEMA_NAME') + '" to role ' + ROLENAME + ';'});
       snowflake.execute({ sqlText: 'grant SELECT on all tables' + schemaAndRoleSuffix});
       snowflake.execute({ sqlText: 'grant SELECT on all views' + schemaAndRoleSuffix});
       snowflake.execute({ sqlText: 'grant SELECT on all event tables' + schemaAndRoleSuffix});
       snowflake.execute({ sqlText: 'grant SELECT on all external tables' + schemaAndRoleSuffix});
       snowflake.execute({ sqlText: 'grant SELECT on all dynamic tables' + schemaAndRoleSuffix});
       snowflake.execute({ sqlText: 'grant SELECT on future tables' + schemaAndRoleSuffix});
       snowflake.execute({ sqlText: 'grant SELECT on future views' + schemaAndRoleSuffix});
       snowflake.execute({ sqlText: 'grant SELECT on future event tables' + schemaAndRoleSuffix});
       snowflake.execute({ sqlText: 'grant SELECT on future external tables' + schemaAndRoleSuffix});
       snowflake.execute({ sqlText: 'grant SELECT on future dynamic tables' + schemaAndRoleSuffix});
   }

   return 'Granted access to ' + numberOfSchemasGranted + ' schemas';
   $$
   ;

   GRANT USAGE ON DATABASE IDENTIFIER($database_name) TO ROLE IDENTIFIER($role_name);
   CALL grantFutureAccess('<DATABASE_NAME>', '<ROLE_NAME>');
   ```

5. (Optional) If your organization uses [Snowflake event tables][2], you can grant the Datadog role access to them.

   ```sql
   -- Grant usage on the database, schema, and table of the event table
   GRANT USAGE ON DATABASE <EVENT_TABLE_DATABASE> TO ROLE IDENTIFIER($role_name);
   GRANT USAGE ON SCHEMA <EVENT_TABLE_DATABASE>.<EVENT_TABLE_SCHEMA> TO ROLE IDENTIFIER($role_name);
   GRANT SELECT ON TABLE <EVENT_TABLE_DATABASE>.<EVENT_TABLE_SCHEMA>.<EVENT_TABLE_NAME> TO ROLE IDENTIFIER($role_name);

   -- Snowflake-provided application roles for event logs
   GRANT APPLICATION ROLE SNOWFLAKE.EVENTS_VIEWER TO ROLE IDENTIFIER($role_name);
   GRANT APPLICATION ROLE SNOWFLAKE.EVENTS_ADMIN TO ROLE IDENTIFIER($role_name);
   ```

   After completing the Snowflake setup, configure the Snowflake integration in Datadog.

## Configure the Snowflake integration in Datadog

To configure the Snowflake integration in Datadog:

1. Navigate to [{{< ui >}}Datadog Data Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][3].
2. Click the {{< ui >}}Configure{{< /ui >}} button for the Snowflake option.

   {{< img src="data_observability/data-obs-settings-integrations.png" alt="List of Data Observability integrations on the Settings page" style="width:100%;" >}}

3. Follow the flow to enter your account details and upload a private key.
4. Turn on {{< ui >}}Enable Data Observability for Snowflake tables{{< /ui >}}.
5. (Optional) Under {{< ui >}}Custom alias URLs{{< /ui >}}, register any additional names other tools use to reference this Snowflake account. Examples include the account identifier configured in dbt, the connection string used by a BI tool, or an AWS PrivateLink URL. See [Custom alias URLs](#custom-alias-urls) below for when this is needed.
6. Click {{< ui >}}Save & Test{{< /ui >}}.

### Custom alias URLs

This field is optional. Use it when the Snowflake account name Datadog connects to does not match how other tools reference the same account.

Lineage events from outside Datadog include OpenLineage emitters, dbt manifests, and query history from other tools. These events identify the warehouse using whatever name the upstream tool was configured with. If those names differ from the canonical account URL Datadog uses, lineage from those sources is not stitched to this Snowflake integration.

Registering each alternative name as a {{< ui >}}Custom alias URL{{< /ui >}} tells Datadog to treat them as references to the same Snowflake account. Cross-tool lineage then resolves correctly. Common cases include:

- The account is reached through an AWS PrivateLink URL.
- A dbt project, BI tool, or other connector is configured with an account identifier that does not match the canonical URL.

To add an alias, expand {{< ui >}}Configure Data Observability{{< /ui >}} during integration setup and click {{< ui >}}+ Add Alias{{< /ui >}} under {{< ui >}}Custom alias URLs{{< /ui >}}. Add one entry per alternative name. Aliases apply only to the Snowflake account being configured; each Snowflake integration manages its own alias list.

## Snowflake tasks and Snowpipes

Datadog derives lineage from Snowflake tasks and Snowpipes by parsing their SQL definitions.
- For tasks, this includes task-to-task dependencies and lineage to destination tables.
- For Snowpipes, Datadog derives lineage from the source stage to the destination table.

Both features require the `GRANT MONITOR EXECUTION ON ACCOUNT` permission granted during setup.

<div class="alert alert-info">Snowflake tasks traces are in preview. Contact your account representative to enable this feature.</div>

When enabled, each task graph run appears as a trace in APM with individual tasks as spans, including execution details such as status, duration, and errors. To find them:
1. In Datadog, go to {{< ui >}}APM{{< /ui >}} > [{{< ui >}}Trace Explorer{{< /ui >}}][4].
2. Filter the Explorer:
   - For the top-level task graph span, filter by `operation_name:snowflake.task_graph`
   - For individual task spans, filter by `operation_name:snowflake.task`

## Object tags

Datadog ingests [Snowflake object tags][6] applied to your tables and attaches them to the corresponding table in Data Observability. Tags are read from `SNOWFLAKE.ACCOUNT_USAGE.TAG_REFERENCES` using the `SNOWFLAKE.GOVERNANCE_VIEWER` database role granted during setup, so no additional permissions are required.

Ingested tags are available as attributes on the **Data Observability Metrics** data source, alongside `database`, `schema`, `table`, and `entity_id`. In the Metrics Explorer and dashboard widget editor, you can use them to:

- Filter table metrics by a business dimension (for example, `data_source` or `data_domain`).
- Group metrics by a tag value.
- Drive template variables on dashboards.

Datadog ingests up to 50 tags per table, which is Snowflake's documented limit. Tags are refreshed on each crawl, so changes in Snowflake appear after the next sync.

## Next steps

After you save, Datadog begins syncing your information schema and query history in the background. Initial syncs can take up to several hours depending on the size of your Snowflake deployment.

After the initial sync completes, create a [Data Observability monitor][5] to start alerting on freshness, row count, column-level metrics, and custom SQL metrics.

## Troubleshoot permissions

If Datadog is unable to see expected databases, schemas, or tables in your Snowflake account, follow these steps to verify that the Datadog role has the correct access.

<div class="alert alert-info">The Snowflake console enables secondary roles by default, which can make it appear that a role has more access than it actually does. Step 2 below helps ensure you are testing with only the Datadog role's permissions.</div>

1. Set the role and user to the same ones provisioned for Datadog:
   ```sql
   USE ROLE DATADOG_ROLE;
   ```

2. Disable secondary roles so that only the Datadog role's grants are active:
   ```sql
   USE SECONDARY ROLES NONE;
   ```

3. Check that the correct role is set and no secondary roles are in use:
   ```sql
   SELECT CURRENT_ROLE(), CURRENT_SECONDARY_ROLES();
   ```

4. List the databases the Datadog role can access:
   ```sql
   SELECT database_name FROM snowflake.information_schema.databases;
   ```

5. Check access to specific schemas or tables:
   ```sql
   SHOW SCHEMAS IN DATABASE "<DATABASE_NAME>";
   SHOW TABLES IN SCHEMA "<DATABASE_NAME>"."<SCHEMA_NAME>";
   ```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-the-private-key
[2]: https://docs.snowflake.com/en/developer-guide/logging-tracing/event-table-setting-up
[3]: https://app.datadoghq.com/data-obs/settings/integrations
[4]: https://app.datadoghq.com/apm/traces
[5]: /monitors/types/data_observability/
[6]: https://docs.snowflake.com/en/user-guide/object-tagging
[7]: /api/latest/ip-ranges/
