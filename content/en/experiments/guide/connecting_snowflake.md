---
title: Connect Snowflake for Warehouse Native Experiment Analysis
description: Connect a Snowflake service account to enable warehouse native experiment analysis.
further_reading:
- link: "/experiments/defining_metrics"
  tag: "Documentation"
  text: "Defining metrics in Datadog Experiments"
- link: "https://www.datadoghq.com/blog/experimental-data-datadog/"
  tag: "Blog"
  text: "How to bridge speed and quality in experiments through unified data"
---

## Overview

This guide walks through connecting Snowflake to Datadog to enable warehouse-native experiment analysis in three steps: preparing a Snowflake service account, connecting it to Datadog, and configuring experiment settings.

The examples in this guide use `datadog_experiments_user` and `datadog_experiments_role` as the service account user and role. Replace these with your own values.

## Step 1: Prepare the Snowflake service account

### Create a dedicated service user and role in Snowflake

1. Use the [Snowflake documentation][6] to create a public and private key-pair for enhanced authentication.
1. Run the following commands in Snowflake to create the user and role in the service account. Replace `<public_key>` with the public key you generated in the previous step.

**Note**: Datadog only supports unencrypted private keys.

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
1. Run the following command to grant read privileges to the new role. Replace `<database>`, `<schema>`, and `<table>` with their appropriate values.

```sql
GRANT USAGE ON DATABASE <database> TO ROLE datadog_experiments_role;
GRANT USAGE ON SCHEMA <database>.<schema> TO ROLE datadog_experiments_role;
GRANT SELECT ON TABLE <database>.<schema>.<table1> TO ROLE datadog_experiments_role;
GRANT SELECT ON TABLE <database>.<schema>.<table2> TO ROLE datadog_experiments_role;
...
GRANT SELECT ON TABLE <database>.<schema>.<tableN> TO ROLE datadog_experiments_role;
```

### Grant access to output schema

Datadog writes experiment exposure logs and intermediate metric results to tables in a dedicated output schema. Run the following command to create the schema and grant the service role full access to it. Replace `<database>` with the appropriate value.

```sql
CREATE SCHEMA IF NOT EXISTS <database>.datadog_experiments_output;
GRANT ALL ON SCHEMA <database>.datadog_experiments_output TO ROLE datadog_experiments_role;
GRANT ALL PRIVILEGES ON FUTURE TABLES IN SCHEMA <database>.datadog_experiments_output TO ROLE datadog_experiments_role;
```

### Create Datadog Experiments warehouse (optional)

Creating a dedicated warehouse for Datadog Experiments is optional. However, the [role you created](#create-a-dedicated-service-user-and-role-in-snowflake) must have access to at least one warehouse to compute results. Provide the warehouse name when [configuring experiment settings](#step-3-configure-experiment-settings).


```sql
CREATE WAREHOUSE IF NOT EXISTS datadog_experiments_wh
    WAREHOUSE_SIZE = <wh_size>
    AUTO_SUSPEND = 300
    INITIALLY_SUSPENDED = true;
GRANT ALL PRIVILEGES ON WAREHOUSE datadog_experiments_wh TO ROLE datadog_experiments_role;
```

## Step 2: Connect Snowflake to Datadog

Follow these steps to connect your Snowflake account to Datadog for warehouse-native experiment analysis:

1. Navigate to [Datadog's integrations page][2] and search for **Snowflake**.
1. Click the **Snowflake** tile to open its modal.
1. Select the **Configure** tab and click **Add Snowflake Account**.
1. Add your **Account URL**. To find your account URL, see the [Snowflake guide][3].
1. **Toggle on** the Product Analytics resource and **toggle off** all other resources. 
1. Enter your **User Name** (for example, `datadog_experiments_user`).
1. Scroll to the **Configure a key pair authentication** section and upload your unencrypted **private key**.
1. Click **Save**.

You can find your new Snowflake account in the Snowflake integration tile under the **Configure** tab.

<div class="alert alert-info">The grants in the <strong>Recommended Warehouse Settings</strong> section of the Snowflake integration tile are not needed for warehouse-native experiment analysis. The privileges granted in <a href="#step-1-prepare-the-snowflake-service-account">step 1</a> are sufficient. If you plan to use other warehouse observability functionality in Datadog, see <a href="https://docs.datadoghq.com/integrations/snowflake-web/">Datadog's Snowflake integration documentation</a>.
</div>

{{< img src="/product_analytics/experiment/guide/snowflake_main_integration.png" alt="The Snowflake integration tile in Datadog showing the Configure tab with the Add a new Snowflake account form, including an Account URL field and resource toggles for Metrics and Logs." style="width:90%;" >}}

## Step 3: Configure experiment settings

After your Snowflake user is connected to Datadog, navigate to the [Experiment Warehouse Connection][5] page and click **Connect a data warehouse** to configure experiment settings. Select the Snowflake integration you created above and enter the **User**, **Role**, **Database**, and **Schema** you created in [step 1](#step-1-prepare-the-snowflake-service-account).
<!-- TODO: Confirm with SME that UI field labels are User, Role, Database, and Schema. Screenshot shows Account, Role, Warehouse, Database, Schema — "User" may need to be "Account" and Warehouse field may need to be added. -->

{{< img src="/product_analytics/experiment/guide/snowflake_experiment_setup.png" alt="The Edit Data Warehouse modal with Snowflake selected, showing two sections: Select Snowflake Account with fields for Account, Role, and Warehouse, and Select Database and Schema with fields for Database and Schema." style="width:90%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.snowflake.com/en/user-guide/key-pair-auth
[2]: https://app.datadoghq.com/integrations
[3]: https://docs.snowflake.com/en/user-guide/organizations-connect#standard-account-urls
[4]: /integrations/snowflake-web/
[5]: https://app.datadoghq.com/product-analytics/experiments/settings/warehouse-connections
[6]: https://docs.snowflake.com/en/user-guide/key-pair-auth#configuring-key-pair-authentication