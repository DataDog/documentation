---
title: Data Quality Monitoring
---

<div class="alert alert-info">Data Quality Monitoring is in Preview.</div>

{{< img src="data_quality/data_quality_tables.png" alt="Data Quality Monitoring page showing a list of tables with columns for query count, storage size, row count, and last data update; one table is flagged with a triggered alert" style="width:100%;" >}}

Data Quality Monitoring helps you detect and troubleshoot issues in your data workflows before they cause problems in reporting dashboards, machine learning models, or other downstream systems. It alerts you to common issues such as data freshness problems, volume anomalies, and column-level quality issues, and provides the context needed to trace them back to upstream jobs or data sources.

Key capabilities include:

- Automatic tracking of when data was last updated and how much was written
- Built-in anomaly detection for metrics like row count, null count, and uniqueness
- Monitor templates for threshold- and anomaly-based alerting
- Lineage views that surface upstream sources and downstream consumers
- Optional usage insights to identify high-value or rarely accessed tables

## Supported data sources

Data Quality Monitoring supports the following platforms:

- Snowflake
- BigQuery

## Setup

{{< tabs >}}
{{% tab "Snowflake" %}}

To monitor Snowflake data quality in Datadog, you must complete both the Snowflake configuration and Datadog integration steps. Before you begin, make sure that:

- You have access to the `ACCOUNTADMIN` role in Snowflake.
- You have generated an RSA key pair. You will paste the public key into Snowflake and upload the private key in Datadog. For more details, refer to the [Snowflake key-pair documentation](https://docs.snowflake.com/en/user-guide/key-pair-auth).

1. Define the required variables, then create a monitoring role, warehouse, and user with key-pair-only authentication.

    ```sql
    SET role_name = 'DATADOG_ROLE';
    SET user_name = 'DATADOG_USER';
    SET warehouse_name = 'DATADOG_WH';
    SET database_name = '<YOUR_DATABASE>';

    CREATE ROLE IF NOT EXISTS IDENTIFIER($role_name);
    GRANT ROLE IDENTIFIER($role_name) TO ROLE SYSADMIN;

    CREATE WAREHOUSE IF NOT EXISTS IDENTIFIER($warehouse_name)
    WAREHOUSE_SIZE = XSMALL
    AUTO_SUSPEND = 30
    AUTO_RESUME = TRUE
    INITIALLY_SUSPENDED = TRUE;

    CREATE USER IF NOT EXISTS IDENTIFIER($user_name)
    LOGIN_NAME = $user_name
    DEFAULT_ROLE = $role_name
    DEFAULT_WAREHOUSE = $warehouse_name
    RSA_PUBLIC_KEY = '<PUBLIC_KEY>';

    GRANT ROLE IDENTIFIER($role_name) TO USER IDENTIFIER($user_name);
    ```

1. Run the following command to grant the necessary privileges to enable Datadog to access warehouse resources, query execution history, and optional usage metadata.

    ```sql
    GRANT USAGE ON WAREHOUSE IDENTIFIER($warehouse_name) TO ROLE IDENTIFIER($role_name);
    GRANT MONITOR EXECUTION ON ACCOUNT TO ROLE IDENTIFIER($role_name);
    GRANT IMPORTED PRIVILEGES ON DATABASE SNOWFLAKE TO ROLE IDENTIFIER($role_name);

    -- (Optional) Grant access to usage and billing metadata to support lineage and optimization insights
    GRANT DATABASE ROLE SNOWFLAKE.OBJECT_VIEWER TO ROLE IDENTIFIER($role_name);
    GRANT DATABASE ROLE SNOWFLAKE.USAGE_VIEWER TO ROLE IDENTIFIER($role_name);
    GRANT DATABASE ROLE SNOWFLAKE.GOVERNANCE_VIEWER TO ROLE IDENTIFIER($role_name);
    GRANT DATABASE ROLE SNOWFLAKE.SECURITY_VIEWER TO ROLE IDENTIFIER($role_name);
    GRANT DATABASE ROLE SNOWFLAKE.ORGANIZATION_USAGE_VIEWER TO ROLE IDENTIFIER($role_name);
    GRANT DATABASE ROLE SNOWFLAKE.ORGANIZATION_BILLING_VIEWER TO ROLE IDENTIFIER($role_name);
    ```

1. Grant the role read-only access to all current and future tables, views, and other supported object types in your database.

    ```sql
    USE DATABASE IDENTIFIER($database_name);

    CREATE OR REPLACE PROCEDURE grantFutureAccess(databaseName string, roleName string)
    RETURNS string NOT NULL
    LANGUAGE javascript
    AS
    $$
    // Procedure logic omitted for brevity
    $$;

    GRANT USAGE ON DATABASE IDENTIFIER($database_name) TO ROLE IDENTIFIER($role_name);
    CALL grantFutureAccess('<DATABASE_NAME>', '<ROLE_NAME>');
    ```

1. (Optional) If your organization uses Snowflake event tables, run the following commands to grant access to the relevant event table and assign application roles for event log access.

    ```sql
    GRANT USAGE ON DATABASE <EVENT_TABLE_DATABASE> TO ROLE IDENTIFIER($role_name);
    GRANT USAGE ON SCHEMA <EVENT_TABLE_DATABASE>.<EVENT_TABLE_SCHEMA> TO ROLE IDENTIFIER($role_name);
    GRANT SELECT ON TABLE <EVENT_TABLE_DATABASE>.<EVENT_TABLE_SCHEMA>.<EVENT_TABLE_NAME> TO ROLE IDENTIFIER($role_name);

    GRANT APPLICATION ROLE SNOWFLAKE.EVENTS_VIEWER TO ROLE IDENTIFIER($role_name);
    GRANT APPLICATION ROLE SNOWFLAKE.EVENTS_ADMIN TO ROLE IDENTIFIER($role_name);
    ```

#### Datadog integration

After completing the Snowflake setup, you must configure the integration in Datadog.

1. Go to the [Snowflake integration tile in Datadog][1] and click **+ Add Snowflake account**.
2. Enter your Snowflake account URL.
3. In the **Data Monitoring** section, enable the following toggles:
   - **Query History Logs**
   - **Enable Query Logs with Access History**
   - **Enable Data Monitoring for Snowflake tables**
4. Set the username to `DATADOG_USER`.
5. Upload your **unencrypted** RSA private key.

[1]: https://app.datadoghq.com/integrations?search=snowflake&integrationId=snowflake-web

{{% /tab %}}
{{% tab "BigQuery" %}}

To monitor BigQuery data quality in Datadog, you must configure both your Google Cloud project and your Datadog integration settings.

1. Follow the steps in the [Datadog GCP integration guide][1] to set up expanded BigQuery monitoring. This includes linking your project and service account.
1. In the Google Cloud IAM console, assign the required roles to your Datadog service account:
    - **BigQuery Resource Viewer** for query performance metrics
    - **BigQuery Metadata Viewer** for data quality and table metadata
1. In the Datadog UI, open the Google Cloud Platform integration tile and navigate to the **BigQuery** section. Enable the following toggles:
    - **Query Performance**
    - **Data Quality**

[1]: /integrations/google_cloud_platform/?tab=dataflowmethodrecommended#expanded-bigquery-monitoring

{{% /tab %}}
{{< /tabs >}}

[1]: https://app.datadoghq.com/integrations?search=snowflake&integrationId=snowflake-web
[2]: https://app.datadoghq.com/integrations?search=bigquery&integrationId=google-cloud-bigquery
[3]: /monitors