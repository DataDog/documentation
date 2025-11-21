---
title: "Data Quality"
description: "Set up Data Observability for datasets to detect freshness delays, unusual data patterns, and column-level metric changes in Snowflake and BigQuery."
aliases:
  - /data_observability/datasets
further_reading:
  - link: '/data_observability'
    tag: 'Documentation'
    text: 'Data Observability'
  - link: '/data_jobs'
    tag: 'Documentation'
    text: 'Data Jobs Monitoring'
  - link: '/data_streams'
    tag: 'Documentation'
    text: 'Data Streams Monitoring'
  - link: '/database_monitoring'
    tag: 'Documentation'
    text: 'Database Monitoring'
---

<div class="alert alert-info">Data Observability is in Preview.</div>

{{< img src="data_observability/data_quality_tables.png" alt="Datasets page showing a list of tables with columns for query count, storage size, row count, and last data update; two tables are flagged with triggered alerts" style="width:100%;" >}}

Data Observability for Datasets detects issues such as data freshness delays, unusual data patterns, and changes in column-level metrics before they affect dashboards, machine learning models, or other downstream systems. It alerts you to potential problems and provides the context to trace them back to upstream jobs or sources.

## Key capabilities

With Data Observability, you can:

- Detect delayed updates and unexpected row count behavior in your tables
- Surface changes in column-level metrics such as null counts or uniqueness
- Set up monitors using static thresholds or historical baselines
- Trace quality issues using lineage views that show upstream jobs and downstream impact

## Supported data sources

Data Observability supports the following data sources:

- Snowflake
- BigQuery

## Setup

{{< tabs >}}
{{% tab "Snowflake" %}}

To monitor Snowflake data in Datadog, you must configure both your Snowflake account and the Snowflake integration in Datadog. Before you begin, make sure that:

- You have access to the `ACCOUNTADMIN` role in Snowflake.
- You have generated an RSA key pair. For more information, see the [Snowflake key-pair authentication docs][1].

After you confirm the prerequisites above, complete the following setup steps in Snowflake:

1. Define the following variables:
    ```sql
    SET role_name = 'DATADOG_ROLE';
    SET user_name = 'DATADOG_USER';
    SET warehouse_name = 'DATADOG_WH';
    SET database_name  = '<YOUR_DATABASE>';

    ```
1. Create a role, warehouse, and key-pair-authenticated user.

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
1. Grant monitoring privileges to the role.

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

1. Grant read-only access to your data.

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

1. (Optional) If your organization uses [Snowflake event tables][2], you can grant the Datadog role access to them.

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

1. On the [Snowflake integration tile][3], click **Add Snowflake account**.
1. Enter your Snowflake account URL.
1. Under **Logs**, turn on:
   - **Query History Logs**
   - **Enable Query Logs with Access History**
1. Under **Data Observability**, turn on:
   - **Enable Data Observability for Snowflake tables**
1. Set the **User Name** to `DATADOG_USER`.
1. Under **Configure a key pair authentication**, upload your unencrypted RSA private key.
1. Click **Save**.

[1]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-the-private-key
[2]: https://docs.snowflake.com/en/developer-guide/logging-tracing/event-table-setting-up
[3]: https://app.datadoghq.com/integrations?search=snowflake&integrationId=snowflake-web

{{% /tab %}}
{{% tab "BigQuery" %}}

To monitor BigQuery data in Datadog, you must configure permissions in your Google Cloud project and enable the relevant features in the Datadog integration. For detailed instructions, see the [Expanded BigQuery monitoring][1] section of the Datadog Google Cloud Platform documentation.

[1]: /integrations/google_cloud_platform/?tab=dataflowmethodrecommended#expanded-bigquery-monitoring

{{% /tab %}}
{{% tab "Databricks" %}}

To monitor Databricks data in Datadog, you must complete the following steps:

1. Complete the installation instructions in the [Databricks Integration documentation][1].
1. Grant read-only access to the data you want to monitor.

    You can grant access to all current and future data within a catalog:
    ```sql
    GRANT USE_CATALOG ON CATALOG <catalog_name> TO `<application_id>`;
    GRANT USE_SCHEMA ON CATALOG <catalog_name> TO `<application_id>`;
    GRANT SELECT ON CATALOG <catalog_name> TO `<application_id>`;
    ```
    
    Or, you can grant access to specific tables:
    ```sql
    GRANT USE_CATALOG ON CATALOG <catalog_name> TO `<application_id>`;
    GRANT USE_SCHEMA ON SCHEMA <catalog_name>.<schema_name> TO `<application_id>`;
    GRANT SELECT ON TABLE <catalog_name>.<schema_name>.<table_name> TO `<application_id>`;
    ```
1. Enable the **Data Observability** toggle in the Configuration pane of the Databricks account you connected in Step 1.

[1]: https://docs.datadoghq.com/integrations/databricks/?tab=useaserviceprincipalforoauth#setup

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
