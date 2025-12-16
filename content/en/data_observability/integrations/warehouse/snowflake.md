---
title: Snowflake
description: "Connect Snowflake to Datadog Data Observability to monitor data quality, track usage, and detect issues."
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability'
---

## Overview

The Snowflake integration connects Datadog to your Snowflake account to sync metadata, query history, and table-level metrics. Use it to monitor data freshness, detect anomalies, and trace lineage across your warehouse and downstream tools.

## Prerequisites

Before you begin, make sure you have:

- Access to the `ACCOUNTADMIN` role in Snowflake.
- An RSA key pair. For more information, see the [Snowflake key-pair authentication docs][1].

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

1. Navigate to [**Datadog Data Observability** > **Connect a Warehouse**][3].
2. Click the **Configure** button for the Snowflake option.

   {{< img src="data_observability/data-obs-settings-integrations.png" alt="List of Data Observability integrations on the Settings page" style="width:100%;" >}}

3. Follow the flow to enter your account details and upload a private key.
4. Turn on **Enable Data Observability for Snowflake tables**.
5. Click **Save & Test**.

## Next steps

After you save, Datadog begins syncing your information schema and query history in the background. Initial syncs can take up to several hours depending on the size of your Snowflake deployment.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-the-private-key
[2]: https://docs.snowflake.com/en/developer-guide/logging-tracing/event-table-setting-up
[3]: https://app.datadoghq.com/datasets/settings/integrations