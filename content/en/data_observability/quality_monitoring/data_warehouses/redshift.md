---
title: Redshift
description: "Connect Amazon Redshift to Datadog Data Observability to monitor data quality, track usage, and detect issues."
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Overview'
  - link: '/monitors/types/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Monitors'
---

## Overview

The Redshift integration connects Datadog to your Amazon Redshift cluster to sync metadata, query history, and table-level metrics. Use it to monitor data freshness, detect anomalies, and trace lineage across your warehouse and downstream tools.

Datadog supports both provisioned Redshift clusters and Redshift Serverless workgroups.

## Prerequisites

Before you begin, make sure you have:

- A Redshift superuser or database user with the ability to create users and grant privileges.
- If your Redshift cluster restricts network access by IP, add Datadog webhook IPs to your cluster's VPC security group inbound rules. For the list of IPs, see the `webhooks` section of {{< region-param key="ip_ranges_url" link="true" text="IP ranges list" >}}.

## Set up your account in Redshift

Connect to your Redshift cluster as a superuser and run the following SQL to create a dedicated group and user for Datadog.

1. Create a group and user.

   ```sql
   -- Create a dedicated group for Datadog monitoring
   CREATE GROUP datadog_group;

   -- Create the Datadog user and add it to the group
   -- Replace <STRONG_PASSWORD> with a secure password
   CREATE USER datadog_user PASSWORD '<STRONG_PASSWORD>';
   ALTER GROUP datadog_group ADD USER datadog_user;
   ```

2. Grant access to system catalog views required for schema discovery.

   ```sql
   -- Required for database enumeration
   -- pg_database is accessible by default to all users

   -- Required for table and column discovery
   GRANT SELECT ON svv_all_tables TO GROUP datadog_group;
   GRANT SELECT ON svv_all_columns TO GROUP datadog_group;
   GRANT SELECT ON svv_all_schemas TO GROUP datadog_group;

   -- Optional: required for row count and table size metrics
   -- If not granted, Datadog continues syncing but row counts and sizes are unavailable
   GRANT SELECT ON svv_table_info TO GROUP datadog_group;
   ```

3. Grant read-only access to your data.

   Run the following for each schema you want Datadog to monitor:

   ```sql
   GRANT USAGE ON SCHEMA "<YOUR_SCHEMA>" TO GROUP datadog_group;
   GRANT SELECT ON ALL TABLES IN SCHEMA "<YOUR_SCHEMA>" TO GROUP datadog_group;
   ALTER DEFAULT PRIVILEGES IN SCHEMA "<YOUR_SCHEMA>"
     GRANT SELECT ON TABLES TO GROUP datadog_group;
   ```

   To generate grant statements for all schemas at once, run:

   ```sql
   SELECT
       'GRANT USAGE ON SCHEMA "' || schema_name || '" TO GROUP datadog_group;' || '\n' ||
       'GRANT SELECT ON ALL TABLES IN SCHEMA "' || schema_name || '" TO GROUP datadog_group;' || '\n' ||
       'ALTER DEFAULT PRIVILEGES IN SCHEMA "' || schema_name || '" GRANT SELECT ON TABLES TO GROUP datadog_group;'
         AS grant_statement
   FROM svv_all_schemas
   WHERE schema_name NOT IN ('information_schema', 'pg_catalog', 'pg_internal', 'catalog_history');
   ```

   Copy and run the output to apply grants to all schemas.

## Configure the Redshift integration in Datadog

To configure the Redshift integration in Datadog:

1. Navigate to [**Datadog Data Observability** > **Settings**][1].
2. Click the **Configure** button for the Redshift option.

   {{< img src="data_observability/data-obs-settings-integrations.png" alt="List of Data Observability integrations on the Settings page" style="width:100%;" >}}

3. Enter your cluster connection details:
   - **AWS account ID**: Your AWS account ID.
   - **Region**: The AWS region where your cluster is hosted (for example, `us-east-1`).
   - **Cluster identifier**: Your Redshift cluster identifier. For Redshift Serverless, enter your workgroup name instead.
   - **Database**: The name of the database to connect to (defaults to `dev`).
   - **Database user**: The Datadog user created during setup (for example, `datadog_user`).
   - **Password**: The password set for the Datadog user.
4. Turn on **Enable Data Observability for Redshift tables**.
5. Click **Save & Test**.

## Next steps

After you save, Datadog begins syncing your information schema and query history in the background. Initial syncs can take up to several hours depending on the size of your Redshift deployment.

After the initial sync completes, create a [Data Observability monitor][2] to start alerting on freshness, row count, column-level metrics, and custom SQL metrics.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/datasets/settings/integrations
[2]: /monitors/types/data_observability/
