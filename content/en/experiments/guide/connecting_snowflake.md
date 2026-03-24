---
title: Connect Snowflake for Warehouse-Native Experiment Analysis
description: Connect a Snowflake service account to enable warehouse-native experiment analysis.
further_reading:
- link: "/experiments/defining_metrics"
  tag: "Documentation"
  text: "Defining metrics in Datadog Experiments"
- link: "https://www.datadoghq.com/blog/experimental-data-datadog/"
  tag: "Blog"
  text: "How to bridge speed and quality in experiments through unified data"
---

## Overview

Warehouse-native experiment analysis lets you run statistical computations directly in your data warehouse.

To set this up for Snowflake, connect a Snowflake service account to Datadog and configure your experiment settings. This guide covers:

- [Preparing a Snowflake service account](#step-1-prepare-the-snowflake-service-account)
- [Connecting it to Datadog](#step-2-connect-snowflake-to-datadog)
- [Configuring experiment settings](#step-3-configure-experiment-settings)

## Step 1: Prepare the Snowflake service account

The examples in this guide use `datadog_experiments_user` and `datadog_experiments_role` as the service account's user and role. Replace these with your own values.

### Create a dedicated service user and role in Snowflake

<div class="alert alert-info">Datadog only supports unencrypted private keys.</div>

1. Use the [Snowflake documentation][1] to create a public-private key pair for enhanced authentication.
1. Run the following commands in Snowflake to create the user and role in the service account. Replace `<public_key>` with the public key you generated in the previous step.

```sql
USE ROLE ACCOUNTADMIN;
CREATE ROLE IF NOT EXISTS datadog_experiments_role;
CREATE USER IF NOT EXISTS datadog_experiments_user
    RSA_PUBLIC_KEY = '<public_key>';
GRANT ROLE datadog_experiments_role TO USER datadog_experiments_user;
ALTER USER datadog_experiments_user SET DEFAULT_ROLE = datadog_experiments_role;
```

### Grant privileges to the role

1. Identify the tables in Snowflake from which you intend to create metrics.
1. Run the following commands to grant read privileges to the new role. Replace `<database>`, `<schema>`, and `<table1>` through `<tableN>` with their appropriate values.

```sql
GRANT USAGE ON DATABASE <database> TO ROLE datadog_experiments_role;
GRANT USAGE ON SCHEMA <database>.<schema> TO ROLE datadog_experiments_role;
GRANT SELECT ON TABLE <database>.<schema>.<table1> TO ROLE datadog_experiments_role;
GRANT SELECT ON TABLE <database>.<schema>.<table2> TO ROLE datadog_experiments_role;
...
GRANT SELECT ON TABLE <database>.<schema>.<tableN> TO ROLE datadog_experiments_role;
```

### Grant the role access to the output schema

Datadog writes experiment exposure logs and intermediate metric results to tables in a dedicated output schema. Run the following commands to create the schema and grant the role full access. Replace `<database>` with the appropriate value.

```sql
CREATE SCHEMA IF NOT EXISTS <database>.datadog_experiments_output;
GRANT ALL ON SCHEMA <database>.datadog_experiments_output TO ROLE datadog_experiments_role;
GRANT ALL PRIVILEGES ON FUTURE TABLES IN SCHEMA <database>.datadog_experiments_output TO ROLE datadog_experiments_role;
```

### Create a dedicated warehouse for Datadog Experiments (optional)

<div class="alert alert-info">The <a href="#create-a-dedicated-service-user-and-role-in-snowflake">role you created</a> must have access to at least one warehouse to compute results.</div>

Creating a dedicated warehouse for Datadog Experiments is optional. Run the following commands to create one. Replace `<wh_size>` with the appropriate value, and enter the warehouse name when configuring experiment settings in [Step 3](#step-3-configure-experiment-settings).

```sql
CREATE WAREHOUSE IF NOT EXISTS datadog_experiments_wh
    WAREHOUSE_SIZE = <wh_size>
    AUTO_SUSPEND = 300
    INITIALLY_SUSPENDED = true;
GRANT ALL PRIVILEGES ON WAREHOUSE datadog_experiments_wh TO ROLE datadog_experiments_role;
```

## Step 2: Connect Snowflake to Datadog

To connect your Snowflake account to Datadog for warehouse-native experiment analysis:

1. Navigate to [Datadog's integrations page][2] and search for **Snowflake**.
1. Click the **Snowflake** tile to open its modal.
1. Select the **Configure** tab and click **Add Snowflake Account**.
1. Add your **Account URL**. To find your account URL, see the [Snowflake guide][3].
1. Toggle off all resources (these are not needed for experiment analysis).
1. Enter your **User Name** (for example, `datadog_experiments_user`).
1. Scroll to the **Configure a key pair authentication** section and upload your unencrypted **private key**.
1. Click **Save**.

<div class="alert alert-info">The grants in the <strong>Recommended Warehouse Settings</strong> section of the Snowflake integration tile are not needed for warehouse-native experiment analysis. The privileges granted in <a href="#step-1-prepare-the-snowflake-service-account">Step 1</a> are sufficient.
<br><br> If you plan to use other warehouse observability functionality in Datadog, see <a href="https://docs.datadoghq.com/integrations/snowflake-web/">Datadog's Snowflake integration documentation</a> to determine which resources to enable.</div>

{{< img src="/product_analytics/experiment/guide/snowflake_main_integration.png" alt="The Snowflake integration tile in Datadog showing the Configure tab with the Add a new Snowflake account form, including an Account URL field and resource toggles for Metrics and Logs." style="width:90%;" >}}

## Step 3: Configure experiment settings

After connecting your Snowflake account, configure the experiment settings in [Datadog Product Analytics][4]:

1. In the left navigation, hover over **Settings**, then click **Experiments**.
1. Select the **Warehouse Connections** tab.
1. Click **Connect a data warehouse**. If you already have a warehouse connected, click **Edit** instead.
1. Select the **Snowflake** tile.
1. Enter the **Account**, **Role**, **Warehouse**, **Database**, and **Schema** you configured in [Step 1](#step-1-prepare-the-snowflake-service-account). If your database and schema do not appear in the dropdown, type them in to add them.
1. Click **Save**.

{{< img src="/product_analytics/experiment/guide/snowflake_experiment_setup.png" alt="The Edit Data Warehouse modal with Snowflake selected, showing two sections: Select Snowflake Account with fields for Account, Role, and Warehouse, and Select Database and Schema with fields for Database and Schema." style="width:90%;" >}}

After you save your warehouse connection, create experiment metrics using your Snowflake data. See [Create Experiment Metrics][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.snowflake.com/en/user-guide/key-pair-auth
[2]: https://app.datadoghq.com/integrations
[3]: https://docs.snowflake.com/en/user-guide/organizations-connect
[4]: https://app.datadoghq.com/product-analytics
[5]: /experiments/defining_metrics
